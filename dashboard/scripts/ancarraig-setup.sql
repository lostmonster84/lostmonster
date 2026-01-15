-- Ancarraig Revenue Control System - Database Schema
-- Version: 1.0
-- Created: 2026-01-15
--
-- This migration creates all tables for the Ancarraig pricing intelligence system.
-- Supports M1-M6 milestones: Cost Truth, Bookings, Live Rates, Competitors,
-- Recommendations, and Audit capabilities.

-- ============================================================================
-- Helper Functions
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================================
-- M1: COST TRUTH - Core Entities
-- ============================================================================

-- Lodges (Properties)
-- Represents the inventory of rental properties
CREATE TABLE ancarraig_lodges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,              -- Short code (e.g., "FH" for Farmhouse)
    description TEXT,
    capacity_guests INT NOT NULL,
    capacity_bedrooms INT NOT NULL,
    capacity_bathrooms NUMERIC(3,1),
    location TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE ancarraig_lodges IS 'Rental property inventory - the top-level entity for all pricing and cost data';
COMMENT ON COLUMN ancarraig_lodges.code IS 'Short unique identifier used in UI and reports';
COMMENT ON COLUMN ancarraig_lodges.is_active IS 'Inactive lodges excluded from pricing scans and alerts';

-- Cost Items
-- Both fixed (annual/monthly) and variable (per night/booking) costs
CREATE TABLE ancarraig_costs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,                     -- e.g., "Mortgage", "Utilities", "Cleaning"
    category TEXT NOT NULL,                 -- "fixed", "variable", "per_booking"
    amount NUMERIC(10,2) NOT NULL,          -- Base amount in GBP
    period TEXT NOT NULL,                   -- "annual", "monthly", "per_night", "per_booking"
    start_date DATE,                        -- When this cost applies from
    end_date DATE,                          -- When this cost applies until (null = ongoing)
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_category CHECK (category IN ('fixed', 'variable', 'per_booking')),
    CONSTRAINT valid_period CHECK (period IN ('annual', 'monthly', 'per_night', 'per_booking')),
    CONSTRAINT positive_amount CHECK (amount >= 0)
);

COMMENT ON TABLE ancarraig_costs IS 'All costs associated with running a lodge - foundation for breakeven calculations';
COMMENT ON COLUMN ancarraig_costs.category IS 'Cost allocation method: fixed (time-based), variable (usage-based), per_booking (transaction-based)';
COMMENT ON COLUMN ancarraig_costs.period IS 'Time period for cost - determines daily equivalent calculation';

CREATE INDEX idx_costs_lodge ON ancarraig_costs(lodge_id);
CREATE INDEX idx_costs_active ON ancarraig_costs(is_active);

-- Seasonal Modifiers
-- Pricing multipliers applied to specific date ranges
CREATE TABLE ancarraig_seasons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,                     -- e.g., "Summer Peak", "Winter Low"
    start_date DATE NOT NULL,               -- Start of seasonal period (year-agnostic: use same year for annual recurrence)
    end_date DATE NOT NULL,
    multiplier NUMERIC(4,2) NOT NULL,       -- 1.0 = baseline, 1.5 = 150% of base rate
    priority INT DEFAULT 0,                 -- Higher priority wins on overlaps
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_multiplier CHECK (multiplier > 0),
    CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

COMMENT ON TABLE ancarraig_seasons IS 'Seasonal pricing multipliers (peak/shoulder/low) applied to target rate calculations';
COMMENT ON COLUMN ancarraig_seasons.multiplier IS 'Multiplier applied to base costs: 1.0 = no change, 1.5 = 50% increase for peak season';
COMMENT ON COLUMN ancarraig_seasons.priority IS 'Used to resolve overlapping seasons - higher value takes precedence';

CREATE INDEX idx_seasons_lodge ON ancarraig_seasons(lodge_id);
CREATE INDEX idx_seasons_dates ON ancarraig_seasons(start_date, end_date);

-- Target Rates (Cached Calculations)
-- Pre-calculated breakeven and target rates for performance
CREATE TABLE ancarraig_target_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    nightly_breakeven NUMERIC(10,2) NOT NULL,    -- Cost per night (no margin)
    nightly_target NUMERIC(10,2) NOT NULL,       -- Breakeven + margin target
    weekly_breakeven NUMERIC(10,2) NOT NULL,     -- 7 nights breakeven
    weekly_target NUMERIC(10,2) NOT NULL,        -- 7 nights with margin
    seasonal_multiplier NUMERIC(4,2) DEFAULT 1.0,
    calculation_basis JSONB,                     -- Store components for explainability
    calculated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(lodge_id, date)
);

COMMENT ON TABLE ancarraig_target_rates IS 'Pre-calculated target rates cached for performance - regenerated when costs or seasons change';
COMMENT ON COLUMN ancarraig_target_rates.calculation_basis IS 'JSONB breakdown of cost components used in calculation for transparency';

CREATE INDEX idx_target_rates_date ON ancarraig_target_rates(date);
CREATE INDEX idx_target_rates_lodge_date ON ancarraig_target_rates(lodge_id, date);

-- ============================================================================
-- M2 + M2.5: PRICING & BOOKINGS
-- ============================================================================

-- Current/Historical Rates
-- Live pricing data from channels or manual entry
CREATE TABLE ancarraig_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    nightly_rate NUMERIC(10,2),
    weekly_rate NUMERIC(10,2),
    source TEXT NOT NULL,                   -- "manual", "scrape", "api", "import"
    source_url TEXT,                        -- Where this data came from
    channel TEXT,                           -- "airbnb", "booking", "direct", "vrbo"
    confidence_score NUMERIC(3,2),          -- 0.0 to 1.0 (data quality indicator)
    scraped_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(lodge_id, date, channel, source),
    CONSTRAINT valid_confidence CHECK (confidence_score IS NULL OR (confidence_score >= 0 AND confidence_score <= 1))
);

COMMENT ON TABLE ancarraig_rates IS 'Current and historical pricing data - foundation for rate validation and alerts';
COMMENT ON COLUMN ancarraig_rates.source IS 'Origin of data: manual entry, API integration, or web scraping';
COMMENT ON COLUMN ancarraig_rates.confidence_score IS 'Data quality: 1.0 = verified manual entry, 0.7 = API data, 0.3 = estimated';

CREATE INDEX idx_rates_lodge_date ON ancarraig_rates(lodge_id, date);
CREATE INDEX idx_rates_date ON ancarraig_rates(date);
CREATE INDEX idx_rates_channel ON ancarraig_rates(channel);

-- Bookings
-- Confirmed reservations with revenue data
CREATE TABLE ancarraig_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    guest_count INT,
    total_revenue NUMERIC(10,2) NOT NULL,
    channel TEXT NOT NULL,                  -- "airbnb", "booking", "direct"
    channel_fees NUMERIC(10,2) DEFAULT 0,
    cleaning_fee NUMERIC(10,2) DEFAULT 0,
    other_fees NUMERIC(10,2) DEFAULT 0,
    net_revenue NUMERIC(10,2),              -- After all fees
    guest_name TEXT,
    guest_email TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed', -- "confirmed", "cancelled", "pending"
    booking_date DATE,
    source TEXT NOT NULL,                   -- "manual", "import", "api"
    external_id TEXT,                       -- Reference to channel booking ID
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_status CHECK (status IN ('confirmed', 'cancelled', 'pending')),
    CONSTRAINT positive_nights CHECK (nights > 0),
    CONSTRAINT valid_date_range CHECK (check_out > check_in)
);

COMMENT ON TABLE ancarraig_bookings IS 'Confirmed reservations - used for margin analysis and occupancy calculations';
COMMENT ON COLUMN ancarraig_bookings.net_revenue IS 'Revenue after channel fees - used for true margin calculation';

CREATE INDEX idx_bookings_lodge_dates ON ancarraig_bookings(lodge_id, check_in, check_out);
CREATE INDEX idx_bookings_dates ON ancarraig_bookings(check_in, check_out);
CREATE INDEX idx_bookings_status ON ancarraig_bookings(status);

-- Rate Alerts
-- Daily scan results comparing current rates to targets
CREATE TABLE ancarraig_rate_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    current_rate NUMERIC(10,2),
    target_rate NUMERIC(10,2),
    breakeven_rate NUMERIC(10,2),
    variance_percent NUMERIC(5,2),          -- % above/below target
    risk_level TEXT NOT NULL,               -- "critical", "warning", "ok", "excellent"
    is_booked BOOLEAN DEFAULT false,
    recommended_action TEXT,                -- "increase", "decrease", "hold", "review"
    checked_at TIMESTAMPTZ DEFAULT now(),
    dismissed_at TIMESTAMPTZ,
    dismissed_by UUID,                      -- User who dismissed (future: foreign key to users)
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_risk_level CHECK (risk_level IN ('critical', 'warning', 'ok', 'excellent'))
);

COMMENT ON TABLE ancarraig_rate_alerts IS 'Daily pricing validation results - flags dates below cost or target for action';
COMMENT ON COLUMN ancarraig_rate_alerts.risk_level IS 'critical = below breakeven, warning = below target, ok = at target, excellent = above target';
COMMENT ON COLUMN ancarraig_rate_alerts.dismissed_at IS 'User can dismiss alerts for intentional below-target pricing';

CREATE INDEX idx_rate_alerts_date ON ancarraig_rate_alerts(date);
CREATE INDEX idx_rate_alerts_risk ON ancarraig_rate_alerts(risk_level);
CREATE INDEX idx_rate_alerts_lodge_date ON ancarraig_rate_alerts(lodge_id, date);
CREATE INDEX idx_rate_alerts_active ON ancarraig_rate_alerts(dismissed_at) WHERE dismissed_at IS NULL;

-- ============================================================================
-- M3: COMPETITOR INTELLIGENCE
-- ============================================================================

-- Competitor Properties
-- Market comparison properties
CREATE TABLE ancarraig_competitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT,                              -- "direct", "aspirational", "market"
    location TEXT,
    capacity_guests INT,
    distance_km NUMERIC(5,1),
    airbnb_url TEXT,
    booking_url TEXT,
    direct_url TEXT,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE ancarraig_competitors IS 'Competitor properties for market rate comparison - never used alone, always with cost context';
COMMENT ON COLUMN ancarraig_competitors.type IS 'Comparison tier: direct (same features), aspirational (upgrade target), market (general benchmark)';

CREATE INDEX idx_competitors_active ON ancarraig_competitors(is_active);

-- Competitor Rate Tracking
-- Scraped or manually entered competitor pricing
CREATE TABLE ancarraig_competitor_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_id UUID NOT NULL REFERENCES ancarraig_competitors(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    nightly_rate NUMERIC(10,2),
    weekly_rate NUMERIC(10,2),
    available BOOLEAN,
    source TEXT NOT NULL,
    scraped_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(competitor_id, date, source)
);

COMMENT ON TABLE ancarraig_competitor_rates IS 'Historical competitor pricing for market positioning analysis';

CREATE INDEX idx_competitor_rates_date ON ancarraig_competitor_rates(date);
CREATE INDEX idx_competitor_rates_comp_date ON ancarraig_competitor_rates(competitor_id, date);

-- ============================================================================
-- M4: RECOMMENDATIONS & DECISION ENGINE
-- ============================================================================

-- Pricing Recommendations
-- AI/rule-based suggestions for rate adjustments
CREATE TABLE ancarraig_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lodge_id UUID NOT NULL REFERENCES ancarraig_lodges(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    current_rate NUMERIC(10,2),
    recommended_rate NUMERIC(10,2),
    confidence_score NUMERIC(3,2),
    reasoning JSONB,                        -- Explainable factors (cost, market, seasonality)
    rule_applied TEXT,                      -- Which deterministic rule generated this
    created_at TIMESTAMPTZ DEFAULT now(),
    accepted_at TIMESTAMPTZ,
    accepted_by UUID,                       -- User who accepted
    rejected_at TIMESTAMPTZ,
    rejected_by UUID,                       -- User who rejected
    rejection_reason TEXT,
    CONSTRAINT valid_confidence CHECK (confidence_score >= 0 AND confidence_score <= 1)
);

COMMENT ON TABLE ancarraig_recommendations IS 'Pricing recommendations with explainable reasoning - humans approve all changes';
COMMENT ON COLUMN ancarraig_recommendations.reasoning IS 'JSONB breakdown of factors: cost pressure, market position, seasonality, demand signals';

CREATE INDEX idx_recommendations_lodge_date ON ancarraig_recommendations(lodge_id, date);
CREATE INDEX idx_recommendations_pending ON ancarraig_recommendations(accepted_at, rejected_at) WHERE accepted_at IS NULL AND rejected_at IS NULL;

-- ============================================================================
-- M5: TRUST & OPERATIONS - AUDIT LOG
-- ============================================================================

-- Audit Log
-- Complete history of all pricing and cost changes
CREATE TABLE ancarraig_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,                           -- Foreign key to users table
    action TEXT NOT NULL,                   -- "rate_override", "cost_update", "recommendation_accept", etc.
    entity_type TEXT NOT NULL,              -- "rate", "cost", "booking", "recommendation"
    entity_id UUID,
    before_value JSONB,
    after_value JSONB,
    reason TEXT,                            -- User-provided reason for override
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE ancarraig_audit_log IS 'Complete audit trail for accountability and debugging - every change tracked';
COMMENT ON COLUMN ancarraig_audit_log.reason IS 'Required for overrides and manual rate changes - builds trust';

CREATE INDEX idx_audit_user ON ancarraig_audit_log(user_id);
CREATE INDEX idx_audit_entity ON ancarraig_audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON ancarraig_audit_log(created_at DESC);
CREATE INDEX idx_audit_action ON ancarraig_audit_log(action);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at columns
CREATE TRIGGER update_lodges_updated_at
    BEFORE UPDATE ON ancarraig_lodges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_costs_updated_at
    BEFORE UPDATE ON ancarraig_costs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seasons_updated_at
    BEFORE UPDATE ON ancarraig_seasons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON ancarraig_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitors_updated_at
    BEFORE UPDATE ON ancarraig_competitors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUTURE: M6 SAAS READINESS
-- ============================================================================
-- When implementing multi-tenancy:
-- 1. Add tenant_id UUID column to all tables
-- 2. Add Row-Level Security (RLS) policies
-- 3. Create tenant isolation views
-- 4. Update all indexes to include tenant_id

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify tables created
DO $$
DECLARE
    table_count INT;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name LIKE 'ancarraig_%';

    RAISE NOTICE 'Ancarraig migration complete: % tables created', table_count;
END $$;
