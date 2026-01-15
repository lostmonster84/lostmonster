/**
 * Stay Length Profitability Analysis
 *
 * Shows how cleaning costs (fixed per booking) dramatically affect short stays.
 * Example: £120 cleaning ÷ 1 night = £120/night vs ÷ 7 nights = £17/night
 */

import { AncarraigCost, AncarraigSeason, AncarraigChannel } from '@lostmonster/database';
import { calculateDailyCosts, getSeasonalMultiplier } from './calculations';
import { calculateNetReceived } from './channel-commissions';

export interface StayLengthComparison {
  stayLength: number;
  listingPricePerNight: number;
  cleaningFee: number;
  cleaningFeePerNight: number;
  channelCommission: number;
  channelCommissionPerNight: number;
  netReceived: number;
  netReceivedPerNight: number;
  dailyCosts: number;
  totalCostsPerNight: number;
  profitPerNight: number;
  marginPercent: number;
  riskLevel: 'critical' | 'warning' | 'ok' | 'excellent';
}

export interface StayLengthComparisonInput {
  channel: AncarraigChannel;
  listingPricePerNight: number;
  cleaningFee: number;
  costs: AncarraigCost[];
  seasons: AncarraigSeason[];
  date: Date;
  stayLengths: number[]; // e.g., [1, 2, 3, 7, 14]
}

/**
 * Compare profitability across different stay lengths
 *
 * Shows user: "1-night stays at £200/night lose money, but 3-night stays are profitable"
 */
export function compareStayLengths(
  input: StayLengthComparisonInput
): StayLengthComparison[] {
  const { channel, listingPricePerNight, cleaningFee, costs, seasons, date, stayLengths } =
    input;

  // Calculate daily costs (independent of stay length)
  const costBreakdown = calculateDailyCosts(costs, date);
  const dailyCosts = costBreakdown.totalDaily;

  // Get seasonal multiplier (same for all stay lengths on this date)
  const { multiplier: seasonalMultiplier } = getSeasonalMultiplier(seasons, date);

  return stayLengths.map((stayLength) => {
    // Total listing price for entire stay
    const totalListingPrice = listingPricePerNight * stayLength;

    // Calculate net received after channel commissions
    const commissionBreakdown = calculateNetReceived(
      totalListingPrice,
      cleaningFee,
      channel
    );

    const netReceived = commissionBreakdown.finalNetReceived;
    const netReceivedPerNight = netReceived / stayLength;

    // Cleaning fee per night (KEY INSIGHT: fixed cost spread across nights)
    const cleaningFeePerNight = cleaningFee / stayLength;

    // Channel commission per night
    const channelCommission = commissionBreakdown.totalDeductions;
    const channelCommissionPerNight = channelCommission / stayLength;

    // Total costs per night = daily operating costs + cleaning per night
    const totalCostsPerNight = dailyCosts + cleaningFeePerNight;

    // Profit per night = net received - costs
    const profitPerNight = netReceivedPerNight - totalCostsPerNight;

    // Margin percent
    const marginPercent =
      netReceivedPerNight > 0 ? (profitPerNight / netReceivedPerNight) * 100 : 0;

    // Risk level
    let riskLevel: StayLengthComparison['riskLevel'] = 'ok';
    if (profitPerNight < 0) {
      riskLevel = 'critical'; // Losing money
    } else if (marginPercent < 15) {
      riskLevel = 'warning'; // Low margin (<15%)
    } else if (marginPercent > 40) {
      riskLevel = 'excellent'; // Great margin (>40%)
    }

    return {
      stayLength,
      listingPricePerNight: round(listingPricePerNight),
      cleaningFee: round(cleaningFee),
      cleaningFeePerNight: round(cleaningFeePerNight),
      channelCommission: round(channelCommission),
      channelCommissionPerNight: round(channelCommissionPerNight),
      netReceived: round(netReceived),
      netReceivedPerNight: round(netReceivedPerNight),
      dailyCosts: round(dailyCosts),
      totalCostsPerNight: round(totalCostsPerNight),
      profitPerNight: round(profitPerNight),
      marginPercent: round(marginPercent),
      riskLevel,
    };
  });
}

/**
 * Calculate recommended 1-night uplift percentage
 *
 * Returns the % increase needed for 1-night stays to match multi-night profitability
 */
export function calculateRecommended1NightUplift(
  cleaningFee: number,
  dailyCosts: number,
  targetMarginPercent: number = 30
): {
  recommendedUplift: number;
  explanation: string;
} {
  // For 1-night: cleaning cost is full £120
  // For 3-night: cleaning cost is £40/night
  const cleaningCost1Night = cleaningFee;
  const cleaningCost3Night = cleaningFee / 3;

  const extraCost1Night = cleaningCost1Night - cleaningCost3Night;

  // Need to increase price to cover extra cost + maintain margin
  const marginFactor = 1 - targetMarginPercent / 100;
  const priceIncrease = extraCost1Night / marginFactor;

  // Express as percentage of base (3-night) costs
  const baseCosts = dailyCosts + cleaningCost3Night;
  const upliftPercent = (priceIncrease / baseCosts) * 100;

  const explanation = `To maintain ${targetMarginPercent}% margin on 1-night stays, add ${Math.round(upliftPercent)}% to cover £${round(extraCost1Night)} extra cleaning cost per night.`;

  return {
    recommendedUplift: round(upliftPercent),
    explanation,
  };
}

/**
 * Helper: Round to 2 decimal places
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
