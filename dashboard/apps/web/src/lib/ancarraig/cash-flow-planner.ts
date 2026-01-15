/**
 * Cash Flow Planner
 *
 * Projects annual income based on pricing to determine if target drawings (e.g., £100K) are possible.
 * Provides quarterly income projections and recommended drawings schedule.
 */

import { AncarraigCost } from '@lostmonster/database';

export interface QuarterlyProjection {
  quarter: number;
  label: string;
  months: string[];
  projectedRevenue: number;
  projectedCosts: number;
  projectedProfit: number;
  occupancyRate: number;
}

export interface DrawingsRecommendation {
  quarter: number;
  label: string;
  recommendedDrawing: number;
  reasoning: string;
}

export interface CashFlowProjection {
  // Annual totals
  annualRevenueTarget: number;
  annualCosts: number;
  annualProfit: number;
  availableForDrawings: number;

  // Quarterly breakdown
  quarterlyProjections: QuarterlyProjection[];

  // Drawings plan
  targetDrawings: number;
  isDrawingsFeasible: boolean;
  drawingsRecommendations: DrawingsRecommendation[];

  // Warnings
  warnings: string[];
}

export interface CashFlowInput {
  annualRevenueTarget: number;
  costs: AncarraigCost[];
  targetDrawings?: number;
  quarterlyOccupancy?: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
}

/**
 * Calculate annual costs from cost items
 */
function calculateAnnualCosts(costs: AncarraigCost[]): number {
  let total = 0;

  for (const cost of costs) {
    const amount = Number(cost.amount);

    switch (cost.period) {
      case 'annual':
        total += amount;
        break;
      case 'monthly':
        total += amount * 12;
        break;
      case 'per_night':
        // Assume average 180 nights/year (50% occupancy)
        total += amount * 180;
        break;
      case 'per_booking':
        // Assume 60 bookings/year (average 3-night stays)
        total += amount * 60;
        break;
    }
  }

  return total;
}

/**
 * Calculate cash flow projection with quarterly breakdown
 */
export function calculateCashFlowProjection(input: CashFlowInput): CashFlowProjection {
  const {
    annualRevenueTarget,
    costs,
    targetDrawings = 100000,
    quarterlyOccupancy = { q1: 0.35, q2: 0.55, q3: 0.70, q4: 0.40 },
  } = input;

  // Calculate annual costs
  const annualCosts = calculateAnnualCosts(costs);
  const annualProfit = annualRevenueTarget - annualCosts;
  const availableForDrawings = annualProfit;

  // Quarterly projections
  const quarters = [
    { quarter: 1, label: 'Q1 (Jan-Mar)', months: ['January', 'February', 'March'], occupancy: quarterlyOccupancy.q1 },
    { quarter: 2, label: 'Q2 (Apr-Jun)', months: ['April', 'May', 'June'], occupancy: quarterlyOccupancy.q2 },
    { quarter: 3, label: 'Q3 (Jul-Sep)', months: ['July', 'August', 'September'], occupancy: quarterlyOccupancy.q3 },
    { quarter: 4, label: 'Q4 (Oct-Dec)', months: ['October', 'November', 'December'], occupancy: quarterlyOccupancy.q4 },
  ];

  // Calculate quarterly breakdown
  const totalOccupancy = Object.values(quarterlyOccupancy).reduce((sum, occ) => sum + occ, 0);

  const quarterlyProjections: QuarterlyProjection[] = quarters.map((q) => {
    const revenueWeight = q.occupancy / totalOccupancy;
    const projectedRevenue = annualRevenueTarget * revenueWeight;
    const projectedCosts = annualCosts * 0.25; // Costs spread evenly across quarters
    const projectedProfit = projectedRevenue - projectedCosts;

    return {
      quarter: q.quarter,
      label: q.label,
      months: q.months,
      projectedRevenue: round(projectedRevenue),
      projectedCosts: round(projectedCosts),
      projectedProfit: round(projectedProfit),
      occupancyRate: q.occupancy,
    };
  });

  // Generate drawings recommendations
  const drawingsRecommendations: DrawingsRecommendation[] = quarterlyProjections.map((q) => {
    // Recommend higher drawings in profitable quarters
    const profitWeight = q.projectedProfit / annualProfit;
    const recommendedDrawing = targetDrawings * profitWeight;

    let reasoning = '';
    if (q.occupancyRate >= 0.65) {
      reasoning = `Peak season - strong cash flow allows for higher drawings`;
    } else if (q.occupancyRate >= 0.5) {
      reasoning = `Moderate season - balanced drawings to maintain cash reserves`;
    } else {
      reasoning = `Off-peak season - conservative drawings to preserve cash`;
    }

    return {
      quarter: q.quarter,
      label: q.label,
      recommendedDrawing: round(recommendedDrawing),
      reasoning,
    };
  });

  // Feasibility check
  const isDrawingsFeasible = availableForDrawings >= targetDrawings;

  // Generate warnings
  const warnings: string[] = [];

  if (!isDrawingsFeasible) {
    const shortfall = targetDrawings - availableForDrawings;
    warnings.push(
      `Target drawings of £${targetDrawings.toLocaleString()} exceed available profit by £${shortfall.toLocaleString()}. Consider reducing drawings or increasing revenue.`
    );
  }

  if (annualProfit < annualRevenueTarget * 0.15) {
    warnings.push(
      `Profit margin is only ${((annualProfit / annualRevenueTarget) * 100).toFixed(1)}%. Consider reviewing costs or increasing prices.`
    );
  }

  // Check for negative quarters
  const negativeQuarters = quarterlyProjections.filter((q) => q.projectedProfit < 0);
  if (negativeQuarters.length > 0) {
    warnings.push(
      `${negativeQuarters.length} quarter(s) projected to be unprofitable: ${negativeQuarters.map((q) => q.label).join(', ')}. Review off-peak pricing strategy.`
    );
  }

  return {
    annualRevenueTarget: round(annualRevenueTarget),
    annualCosts: round(annualCosts),
    annualProfit: round(annualProfit),
    availableForDrawings: round(availableForDrawings),
    quarterlyProjections,
    targetDrawings: round(targetDrawings),
    isDrawingsFeasible,
    drawingsRecommendations,
    warnings,
  };
}

/**
 * Helper: Round to 2 decimal places
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
