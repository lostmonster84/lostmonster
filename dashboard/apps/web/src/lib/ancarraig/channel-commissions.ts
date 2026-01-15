/**
 * Channel Commission Calculations
 *
 * Handles OTA commission structures including compound discounts (Booking.com Genius, etc.)
 */

import { AncarraigChannel } from '@lostmonster/database';

/**
 * Commission breakdown showing deductions step-by-step
 */
export interface CommissionBreakdown {
  listingPrice: number;
  baseCommission: number;
  cleaningFee: number;
  cleaningCommission: number;
  afterBaseCommission: number;
  geniusDiscount: number;
  afterGenius: number;
  nonRefundableDiscount: number;
  finalNetReceived: number;
  totalDeductions: number;
  effectiveCommissionPercent: number;
}

/**
 * Calculate net received from a listing price (FORWARD calculation)
 *
 * Example (Booking.com):
 * Guest pays £200 listing + £120 cleaning
 * - Base commission (15%): £30 from listing + £18 from cleaning = £48
 * - After commission: £170
 * - Genius discount (10% of reduced): £17
 * - After Genius: £153
 * - Non-refundable discount (10% of further reduced): £15.30
 * - Final net: £137.70 + £102 cleaning = £239.70
 */
export function calculateNetReceived(
  listingPrice: number,
  cleaningFee: number,
  channel: AncarraigChannel
): CommissionBreakdown {
  const {
    base_commission_percent,
    charges_cleaning_commission,
    supports_genius,
    genius_discount_percent,
    non_refundable_discount_percent,
  } = channel;

  // Step 1: Base commission on listing price
  const baseCommissionRate = base_commission_percent / 100;
  const baseCommission = listingPrice * baseCommissionRate;
  const afterBaseCommission = listingPrice - baseCommission;

  // Step 2: Cleaning fee commission (if applicable)
  const cleaningCommission = charges_cleaning_commission
    ? cleaningFee * baseCommissionRate
    : 0;
  const netCleaningFee = cleaningFee - cleaningCommission;

  // Step 3: Genius discount (applied to REDUCED price after base commission)
  let geniusDiscount = 0;
  let afterGenius = afterBaseCommission;
  if (supports_genius && genius_discount_percent) {
    const geniusRate = genius_discount_percent / 100;
    geniusDiscount = afterBaseCommission * geniusRate;
    afterGenius = afterBaseCommission - geniusDiscount;
  }

  // Step 4: Non-refundable discount (applied to FURTHER REDUCED price)
  let nonRefundableDiscount = 0;
  let afterNonRefundable = afterGenius;
  if (non_refundable_discount_percent) {
    const nonRefundableRate = non_refundable_discount_percent / 100;
    nonRefundableDiscount = afterGenius * nonRefundableRate;
    afterNonRefundable = afterGenius - nonRefundableDiscount;
  }

  // Final net received = reduced listing price + net cleaning fee
  const finalNetReceived = afterNonRefundable + netCleaningFee;

  // Total deductions
  const totalDeductions =
    baseCommission + cleaningCommission + geniusDiscount + nonRefundableDiscount;

  // Effective commission percentage
  const totalGuestPayment = listingPrice + cleaningFee;
  const effectiveCommissionPercent =
    totalGuestPayment > 0 ? (totalDeductions / totalGuestPayment) * 100 : 0;

  return {
    listingPrice: round(listingPrice),
    baseCommission: round(baseCommission),
    cleaningFee: round(cleaningFee),
    cleaningCommission: round(cleaningCommission),
    afterBaseCommission: round(afterBaseCommission),
    geniusDiscount: round(geniusDiscount),
    afterGenius: round(afterGenius),
    nonRefundableDiscount: round(nonRefundableDiscount),
    finalNetReceived: round(finalNetReceived),
    totalDeductions: round(totalDeductions),
    effectiveCommissionPercent: round(effectiveCommissionPercent),
  };
}

/**
 * Calculate listing price from desired net income (REVERSE calculation)
 *
 * This is the HERO feature - work backwards from "I want to net £150" to "List at £220"
 *
 * We reverse through the commission layers:
 * 1. Start with desired net
 * 2. Reverse non-refundable discount: net / 0.9 (if 10% discount)
 * 3. Reverse Genius discount: result / 0.9 (if 10% discount)
 * 4. Reverse base commission: result / 0.85 (if 15% commission)
 * 5. Result is the listing price needed
 */
export function calculateListingPriceFromNet(
  desiredNet: number,
  cleaningFee: number,
  channel: AncarraigChannel
): { listingPrice: number; breakdown: CommissionBreakdown } {
  const {
    base_commission_percent,
    charges_cleaning_commission,
    supports_genius,
    genius_discount_percent,
    non_refundable_discount_percent,
  } = channel;

  // Calculate net cleaning fee (what we receive after cleaning commission)
  const cleaningCommissionRate = charges_cleaning_commission
    ? base_commission_percent / 100
    : 0;
  const netCleaningFee = cleaningFee * (1 - cleaningCommissionRate);

  // Subtract cleaning from desired net to get required net from listing price
  const requiredNetFromListing = desiredNet - netCleaningFee;

  // Now reverse through the discount layers
  let priceBeforeLayer = requiredNetFromListing;

  // Step 1: Reverse non-refundable discount
  if (non_refundable_discount_percent) {
    const nonRefundableRate = non_refundable_discount_percent / 100;
    // If guest gets 10% off, we receive 90%, so divide by 0.9
    priceBeforeLayer = priceBeforeLayer / (1 - nonRefundableRate);
  }

  // Step 2: Reverse Genius discount
  if (supports_genius && genius_discount_percent) {
    const geniusRate = genius_discount_percent / 100;
    priceBeforeLayer = priceBeforeLayer / (1 - geniusRate);
  }

  // Step 3: Reverse base commission
  const baseCommissionRate = base_commission_percent / 100;
  const listingPrice = priceBeforeLayer / (1 - baseCommissionRate);

  // Verify by calculating forward
  const breakdown = calculateNetReceived(listingPrice, cleaningFee, channel);

  return {
    listingPrice: round(listingPrice),
    breakdown,
  };
}

/**
 * Calculate effective commission rate for a channel
 *
 * Useful for showing users "Booking.com actually takes 35% when you factor in Genius!"
 */
export function calculateEffectiveCommissionRate(
  channel: AncarraigChannel,
  includeGenius: boolean = false,
  includeNonRefundable: boolean = false
): number {
  const {
    base_commission_percent,
    supports_genius,
    genius_discount_percent,
    non_refundable_discount_percent,
  } = channel;

  let effectiveRate = base_commission_percent;

  // Add Genius discount (compounding)
  if (includeGenius && supports_genius && genius_discount_percent) {
    const afterBase = 100 - effectiveRate;
    const geniusImpact = afterBase * (genius_discount_percent / 100);
    effectiveRate += geniusImpact;
  }

  // Add non-refundable discount (further compounding)
  if (includeNonRefundable && non_refundable_discount_percent) {
    const afterPrevious = 100 - effectiveRate;
    const nonRefImpact = afterPrevious * (non_refundable_discount_percent / 100);
    effectiveRate += nonRefImpact;
  }

  return round(effectiveRate);
}

/**
 * Helper: Round to 2 decimal places
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
