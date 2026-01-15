/**
 * Reverse Rate Calculator - HERO FEATURE
 *
 * Works backwards from target net income to determine the listing price needed.
 *
 * User inputs: "I need to net £150/night"
 * Calculator outputs: "List at £220 on Booking.com"
 */

import { AncarraigCost, AncarraigSeason, AncarraigChannel } from '@lostmonster/database';
import { calculateDailyCosts, getSeasonalMultiplier } from './calculations';
import { calculateListingPriceFromNet, CommissionBreakdown } from './channel-commissions';

/**
 * Calculator input parameters
 */
export interface ReverseCalculatorInput {
  targetNetPerNight: number; // What you want to net per night
  channel: AncarraigChannel; // OTA channel config
  cleaningFee: number; // Fixed cleaning fee
  stayLength: number; // Number of nights (1, 3, 7, etc.)
  costs: AncarraigCost[]; // All costs for the lodge
  seasons: AncarraigSeason[]; // Seasonal multipliers
  startDate: Date; // First night of stay
  includeMargin: boolean; // Add profit margin on top of costs?
  marginPercent?: number; // Desired margin % (default 30%)
}

/**
 * Calculator result with full breakdown
 */
export interface ReverseCalculatorResult {
  // PRIMARY OUTPUT
  listingPricePerNight: number; // What to list on OTA (per night)

  // BREAKDOWN
  targetNetPerNight: number;
  dailyCosts: number;
  stayLength: number;
  cleaningFeePerNight: number; // Cleaning cost distributed across nights
  seasonalMultiplier: number;
  seasonName: string | null;

  // CHANNEL DEDUCTIONS
  channelName: string;
  commissionBreakdown: CommissionBreakdown;
  effectiveCommissionPercent: number;

  // STAY LENGTH ADJUSTMENT
  stayLengthUplift: number; // Percentage uplift for short stays (e.g., 35% for 1-night)
  stayLengthUpliftAmount: number; // Monetary amount of uplift

  // VALIDATION
  netReceivedPerNight: number; // Actual net after all deductions
  netVsTarget: number; // Difference from target net
  isAccurate: boolean; // Within £1 of target?

  // WATERFALL DATA (for visualization)
  waterfallSteps: WaterfallStep[];
}

export interface WaterfallStep {
  label: string;
  value: number;
  isDeduction: boolean; // true = red (money leaving), false = green (money staying)
  runningTotal: number;
}

/**
 * REVERSE RATE CALCULATOR
 *
 * This is the core algorithm that powers the hero feature.
 */
export function reverseCalculate(input: ReverseCalculatorInput): ReverseCalculatorResult {
  const {
    targetNetPerNight,
    channel,
    cleaningFee,
    stayLength,
    costs,
    seasons,
    startDate,
    includeMargin,
    marginPercent = 30,
  } = input;

  // STEP 1: Calculate daily costs for the start date
  const costBreakdown = calculateDailyCosts(costs, startDate);
  const dailyCosts = costBreakdown.totalDaily;

  // STEP 2: Calculate cleaning fee per night
  const cleaningFeePerNight = cleaningFee / stayLength;

  // STEP 3: Add margin if requested
  let targetWithMargin = targetNetPerNight;
  if (includeMargin) {
    // If user wants 30% margin, they need revenue = costs / 0.7
    const marginFactor = 1 - marginPercent / 100;
    targetWithMargin = targetNetPerNight / marginFactor;
  }

  // STEP 4: Get seasonal multiplier
  const { multiplier: seasonalMultiplier, seasonName } = getSeasonalMultiplier(
    seasons,
    startDate
  );

  // STEP 5: Apply seasonal multiplier to target
  const targetWithSeason = targetWithMargin * seasonalMultiplier;

  // STEP 6: Calculate base listing price (before stay length adjustment)
  // This is the listing price per night that would net us the target
  const { listingPrice: baseListingPrice, breakdown: commissionBreakdown } =
    calculateListingPriceFromNet(
      targetWithSeason, // Desired net per night (with margin + season)
      cleaningFee, // Total cleaning fee for entire stay
      channel
    );

  // STEP 7: Apply stay length uplift
  // 1-night stays need higher rates because cleaning cost is not distributed
  // Formula: 1-night = +35%, 2-night = +15%, 3-night = +5%, 4+ = 0%
  let stayLengthUplift = 0;
  if (stayLength === 1) {
    stayLengthUplift = 35; // 35% uplift for 1-night stays
  } else if (stayLength === 2) {
    stayLengthUplift = 15; // 15% uplift for 2-night stays
  } else if (stayLength === 3) {
    stayLengthUplift = 5; // 5% uplift for 3-night stays
  }

  const upliftMultiplier = 1 + stayLengthUplift / 100;
  const listingPricePerNight = baseListingPrice * upliftMultiplier;
  const stayLengthUpliftAmount = listingPricePerNight - baseListingPrice;

  // STEP 8: Calculate effective commission rate
  const effectiveCommissionPercent =
    ((listingPricePerNight - commissionBreakdown.finalNetReceived / stayLength) /
      listingPricePerNight) *
    100;

  // STEP 9: Verify accuracy (calculate forward to check)
  const netReceivedPerNight = commissionBreakdown.finalNetReceived / stayLength;
  const netVsTarget = netReceivedPerNight - targetNetPerNight;
  const isAccurate = Math.abs(netVsTarget) < 1; // Within £1

  // STEP 10: Build waterfall visualization data
  const waterfallSteps = buildWaterfallSteps(
    listingPricePerNight,
    commissionBreakdown,
    dailyCosts,
    cleaningFeePerNight,
    stayLength
  );

  return {
    listingPricePerNight: round(listingPricePerNight),
    targetNetPerNight: round(targetNetPerNight),
    dailyCosts: round(dailyCosts),
    stayLength,
    cleaningFeePerNight: round(cleaningFeePerNight),
    seasonalMultiplier,
    seasonName,
    channelName: channel.channel_name,
    commissionBreakdown,
    effectiveCommissionPercent: round(effectiveCommissionPercent),
    stayLengthUplift,
    stayLengthUpliftAmount: round(stayLengthUpliftAmount),
    netReceivedPerNight: round(netReceivedPerNight),
    netVsTarget: round(netVsTarget),
    isAccurate,
    waterfallSteps,
  };
}

/**
 * Build waterfall chart data showing money flow
 *
 * Example:
 * Guest pays: £220
 * - Base commission (15%): -£33 → £187
 * - Genius (10%): -£18.70 → £168.30
 * - Non-refundable (10%): -£16.83 → £151.47
 * - Cleaning costs: -£40 → £111.47
 * - Daily costs: -£60 → £51.47
 * = You net: £51.47
 */
function buildWaterfallSteps(
  listingPrice: number,
  commissionBreakdown: CommissionBreakdown,
  dailyCosts: number,
  cleaningFeePerNight: number,
  stayLength: number
): WaterfallStep[] {
  const steps: WaterfallStep[] = [];
  let runningTotal = listingPrice;

  // Start: Guest payment
  steps.push({
    label: 'Guest Pays (Listed Price)',
    value: listingPrice,
    isDeduction: false,
    runningTotal,
  });

  // Deduction: Base commission
  if (commissionBreakdown.baseCommission > 0) {
    runningTotal -= commissionBreakdown.baseCommission / stayLength;
    steps.push({
      label: `${commissionBreakdown.listingPrice > 0 ? Math.round((commissionBreakdown.baseCommission / commissionBreakdown.listingPrice) * 100) : 0}% Base Commission`,
      value: commissionBreakdown.baseCommission / stayLength,
      isDeduction: true,
      runningTotal,
    });
  }

  // Deduction: Genius discount
  if (commissionBreakdown.geniusDiscount > 0) {
    runningTotal -= commissionBreakdown.geniusDiscount / stayLength;
    steps.push({
      label: 'Genius Discount',
      value: commissionBreakdown.geniusDiscount / stayLength,
      isDeduction: true,
      runningTotal,
    });
  }

  // Deduction: Non-refundable discount
  if (commissionBreakdown.nonRefundableDiscount > 0) {
    runningTotal -= commissionBreakdown.nonRefundableDiscount / stayLength;
    steps.push({
      label: 'Non-Refundable Discount',
      value: commissionBreakdown.nonRefundableDiscount / stayLength,
      isDeduction: true,
      runningTotal,
    });
  }

  // Deduction: Cleaning commission
  if (commissionBreakdown.cleaningCommission > 0) {
    runningTotal -= commissionBreakdown.cleaningCommission / stayLength;
    steps.push({
      label: 'Cleaning Fee Commission',
      value: commissionBreakdown.cleaningCommission / stayLength,
      isDeduction: true,
      runningTotal,
    });
  }

  // Deduction: Cleaning costs
  if (cleaningFeePerNight > 0) {
    runningTotal -= cleaningFeePerNight;
    steps.push({
      label: 'Cleaning Costs',
      value: cleaningFeePerNight,
      isDeduction: true,
      runningTotal,
    });
  }

  // Deduction: Daily operating costs
  if (dailyCosts > 0) {
    runningTotal -= dailyCosts;
    steps.push({
      label: 'Daily Operating Costs',
      value: dailyCosts,
      isDeduction: true,
      runningTotal,
    });
  }

  // End: Net profit
  steps.push({
    label: 'You Net (Profit)',
    value: runningTotal,
    isDeduction: false,
    runningTotal,
  });

  return steps.map((step) => ({
    ...step,
    value: round(step.value),
    runningTotal: round(step.runningTotal),
  }));
}

/**
 * Helper: Round to 2 decimal places
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
