-- Ancarraig AI Wizard Responses
-- Stores onboarding wizard answers to personalize the AI

CREATE TABLE IF NOT EXISTS ancarraig_ai_wizard_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,

  -- Business Basics (Step 1)
  property_name TEXT,
  property_location TEXT,
  property_type TEXT,
  number_of_bedrooms INTEGER,

  -- Pricing Goals (Step 2)
  primary_goal TEXT, -- 'maximize-revenue' | 'high-occupancy' | 'balanced' | 'premium-positioning'
  average_nightly_rate TEXT,
  occupancy_target TEXT,

  -- Challenges (Step 3)
  biggest_challenge TEXT,
  competitors TEXT,
  seasonality_impact TEXT, -- 'high' | 'moderate' | 'low'

  -- Distribution (Step 4)
  main_channels TEXT[], -- Array of channel names
  commission_concern TEXT, -- 'high' | 'moderate' | 'low'

  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_wizard_responses_user
  ON ancarraig_ai_wizard_responses(user_id);

-- Prevent multiple wizard completions per user (optional - can be removed if you want to allow re-runs)
CREATE UNIQUE INDEX IF NOT EXISTS idx_wizard_responses_user_unique
  ON ancarraig_ai_wizard_responses(user_id);
