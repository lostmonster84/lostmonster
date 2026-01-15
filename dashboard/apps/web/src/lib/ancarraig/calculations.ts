/**
 * Ancarraig Calculation Engine
 *
 * Core business logic for cost-to-rate calculations.
 * All functions are pure and return explainable breakdowns.
 */

import { AncarraigCost, AncarraigSeason } from '@lostmonster/database';

/**
 * Cost breakdown for a specific date
 */
export interface DailyCostBreakdown {
  date: string;
  fixedCosts: number;
  variableCosts: number;
  perBookingCosts: number;
  totalDaily: number;
  breakdown: Array<{
    name: string;
    category: string;
    amount: number;
    period: string;
    dailyEquivalent: number;
  }>;
}

/**
 * Target rate calculation result
 */
export interface TargetRateResult {
  date: string;
  breakeven: number;
  target: number;
  targetMargin: number;
  seasonalMultiplier: number;
  costBreakdown: DailyCostBreakdown;
}

/**
 * Margin analysis result
 */
export interface MarginAnalysis {
  revenue: number;
  totalCosts: number;
  profit: number;
  marginPercent: number;
  vsBreakeven: number;
  vsTarget: number;
  riskLevel: 'critical' | 'warning' | 'ok' | 'excellent';
}

/**
 * Convert a cost to its daily equivalent
 */
function costToDailyRate(cost: AncarraigCost): number {
  const amount = Number(cost.amount);

  switch (cost.period) {
    case 'annual':
      return amount / 365;
    case 'monthly':
      return amount / 30.44; // Average days per month
    case 'per_night':
      return amount;
    case 'per_booking':
      // Per-booking costs are handled separately
      return 0;
    default:
      return 0;
  }
}

/**
 * Calculate daily costs for a specific date
 *
 * Converts all costs (fixed, variable, per-booking) to daily equivalents.
 * Returns breakdown showing how each cost contributes.
 */
export function calculateDailyCosts(
  costs: AncarraigCost[],
  date: Date
): DailyCostBreakdown {
  const dateStr = date.toISOString().split('T')[0];

  let fixedCosts = 0;
  let variableCosts = 0;
  let perBookingCosts = 0;
  const breakdown: DailyCostBreakdown['breakdown'] = [];

  for (const cost of costs) {
    // Check if cost is active on this date
    const startDate = cost.start_date ? new Date(cost.start_date) : null;
    const endDate = cost.end_date ? new Date(cost.end_date) : null;

    if (startDate && date < startDate) continue;
    if (endDate && date > endDate) continue;

    const dailyEquivalent = costToDailyRate(cost);

    // Categorize costs
    if (cost.category === 'fixed') {
      fixedCosts += dailyEquivalent;
    } else if (cost.category === 'variable') {
      variableCosts += dailyEquivalent;
    } else if (cost.category === 'per_booking') {
      perBookingCosts += Number(cost.amount);
    }

    breakdown.push({
      name: cost.name,
      category: cost.category,
      amount: Number(cost.amount),
      period: cost.period,
      dailyEquivalent: Math.round(dailyEquivalent * 100) / 100,
    });
  }

  const totalDaily = fixedCosts + variableCosts;

  return {
    date: dateStr,
    fixedCosts: Math.round(fixedCosts * 100) / 100,
    variableCosts: Math.round(variableCosts * 100) / 100,
    perBookingCosts: Math.round(perBookingCosts * 100) / 100,
    totalDaily: Math.round(totalDaily * 100) / 100,
    breakdown,
  };
}

/**
 * Get seasonal multiplier for a specific date
 *
 * Finds the active season for the date and returns its multiplier.
 * If multiple seasons overlap, returns the highest multiplier.
 */
export function getSeasonalMultiplier(
  seasons: AncarraigSeason[],
  date: Date
): { multiplier: number; seasonName: string | null } {
  let maxMultiplier = 1.0;
  let matchedSeason: string | null = null;

  for (const season of seasons) {
    const startDate = new Date(season.start_date);
    const endDate = new Date(season.end_date);

    // Check if date falls within season
    if (date >= startDate && date <= endDate) {
      const multiplier = Number(season.multiplier);
      if (multiplier > maxMultiplier) {
        maxMultiplier = multiplier;
        matchedSeason = season.name;
      }
    }
  }

  return {
    multiplier: maxMultiplier,
    seasonName: matchedSeason,
  };
}

/**
 * Calculate target rates for a specific date
 *
 * Computes:
 * - Breakeven: minimum rate to cover costs
 * - Target: rate needed to achieve target margin
 *
 * Applies seasonal multiplier to both rates.
 */
export function calculateTargetRates(
  costs: AncarraigCost[],
  seasons: AncarraigSeason[],
  date: Date,
  targetMarginPercent: number = 30
): TargetRateResult {
  const dateStr = date.toISOString().split('T')[0];

  // Calculate base costs
  const costBreakdown = calculateDailyCosts(costs, date);

  // Get seasonal multiplier
  const { multiplier, seasonName } = getSeasonalMultiplier(seasons, date);

  // Calculate breakeven (costs only, no margin)
  const breakeven = costBreakdown.totalDaily * multiplier;

  // Calculate target rate (costs + desired margin)
  // Formula: target = costs / (1 - margin%)
  // Example: £100 costs, 30% margin → £100 / 0.7 = £142.86
  const marginFactor = 1 - (targetMarginPercent / 100);
  const target = breakeven / marginFactor;

  return {
    date: dateStr,
    breakeven: Math.round(breakeven * 100) / 100,
    target: Math.round(target * 100) / 100,
    targetMargin: targetMarginPercent,
    seasonalMultiplier: multiplier,
    costBreakdown,
  };
}

/**
 * Analyze margin for a given rate vs costs
 *
 * Determines profitability and risk level:
 * - critical: below breakeven (losing money)
 * - warning: below target - 20% (low margin)
 * - ok: within ±20% of target (acceptable)
 * - excellent: above target + 20% (great margin)
 */
export function analyzeMargin(
  currentRate: number,
  breakeven: number,
  target: number
): MarginAnalysis {
  const revenue = currentRate;
  const totalCosts = breakeven; // Breakeven is the cost floor
  const profit = revenue - totalCosts;
  const marginPercent = totalCosts > 0 ? (profit / revenue) * 100 : 0;

  const vsBreakeven = revenue - breakeven;
  const vsTarget = revenue - target;
  const vsTargetPercent = target > 0 ? (vsTarget / target) * 100 : 0;

  // Determine risk level
  let riskLevel: MarginAnalysis['riskLevel'] = 'ok';

  if (revenue < breakeven) {
    riskLevel = 'critical'; // Below cost - losing money
  } else if (vsTargetPercent < -20) {
    riskLevel = 'warning'; // More than 20% below target
  } else if (vsTargetPercent > 20) {
    riskLevel = 'excellent'; // More than 20% above target
  } else {
    riskLevel = 'ok'; // Within acceptable range
  }

  return {
    revenue: Math.round(revenue * 100) / 100,
    totalCosts: Math.round(totalCosts * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    marginPercent: Math.round(marginPercent * 100) / 100,
    vsBreakeven: Math.round(vsBreakeven * 100) / 100,
    vsTarget: Math.round(vsTarget * 100) / 100,
    riskLevel,
  };
}

/**
 * Determine risk level from margin analysis
 *
 * Simpler version that just returns the risk level string.
 */
export function determineRiskLevel(
  currentRate: number,
  breakeven: number,
  target: number
): 'critical' | 'warning' | 'ok' | 'excellent' {
  const analysis = analyzeMargin(currentRate, breakeven, target);
  return analysis.riskLevel;
}
