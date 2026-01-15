-- Ancarraig Phase 2: Channel Commission Modeling
-- Migration: Add channel commission tables and seed default channels

-- Channel commission configurations
CREATE TABLE IF NOT EXISTS ancarraig_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name VARCHAR(50) NOT NULL UNIQUE,
  base_commission_percent DECIMAL(5,2) NOT NULL,
  charges_cleaning_commission BOOLEAN DEFAULT false,
  supports_genius BOOLEAN DEFAULT false,
  genius_discount_percent DECIMAL(5,2),
  non_refundable_discount_percent DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Calculator usage history (track how calculator is used)
CREATE TABLE IF NOT EXISTS ancarraig_calculator_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lodge_id UUID REFERENCES ancarraig_lodges(id),
  channel VARCHAR(50),
  target_net DECIMAL(10,2),
  calculated_listing_price DECIMAL(10,2),
  stay_length INT,
  date_range_start DATE,
  date_range_end DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed default channels with correct commission structures
INSERT INTO ancarraig_channels (
  channel_name,
  base_commission_percent,
  charges_cleaning_commission,
  supports_genius,
  genius_discount_percent,
  non_refundable_discount_percent
) VALUES
  -- Booking.com: 15% base + cleaning commission + Genius 10% + Non-refundable 10%
  (
    'booking.com',
    15.00,
    true,
    true,
    10.00,
    10.00
  ),
  -- Airbnb: 15% host fee (simplified - actual varies by region)
  (
    'airbnb',
    15.00,
    false,
    false,
    NULL,
    NULL
  ),
  -- Direct bookings: 0% commission
  (
    'direct',
    0.00,
    false,
    false,
    NULL,
    NULL
  )
ON CONFLICT (channel_name) DO NOTHING;

-- Add index for calculator history lookups
CREATE INDEX IF NOT EXISTS idx_calculator_usage_lodge_id ON ancarraig_calculator_usage(lodge_id);
CREATE INDEX IF NOT EXISTS idx_calculator_usage_created_at ON ancarraig_calculator_usage(created_at);

-- Success message
SELECT 'Channel commission tables created and seeded successfully!' AS status;
