-- ============================================================================
-- Ancarraig AI Pricing Assistant - Database Schema
-- ============================================================================
-- Created: 2026-01-15
-- Purpose: Store AI conversations and extracted business knowledge
-- ============================================================================

-- ============================================================================
-- Table: ancarraig_ai_conversations
-- Purpose: Store all chat messages between users and AI assistant
-- ============================================================================
CREATE TABLE IF NOT EXISTS ancarraig_ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Indexes for fast queries
  CONSTRAINT valid_role CHECK (role IN ('user', 'assistant', 'system'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ancarraig_ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created_at ON ancarraig_ai_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_created ON ancarraig_ai_conversations(user_id, created_at DESC);

-- ============================================================================
-- Table: ancarraig_ai_knowledge
-- Purpose: Store extracted business knowledge from conversations
-- ============================================================================
CREATE TABLE IF NOT EXISTS ancarraig_ai_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('preference', 'rule', 'insight', 'competitor')),
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  confidence DECIMAL(3,2) DEFAULT 0.80 CHECK (confidence >= 0 AND confidence <= 1),
  source_conversation_id UUID REFERENCES ancarraig_ai_conversations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure valid category
  CONSTRAINT valid_category CHECK (category IN ('preference', 'rule', 'insight', 'competitor'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_user_id ON ancarraig_ai_knowledge(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_category ON ancarraig_ai_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_key ON ancarraig_ai_knowledge(key);
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_user_category ON ancarraig_ai_knowledge(user_id, category);

-- ============================================================================
-- Comments for documentation
-- ============================================================================
COMMENT ON TABLE ancarraig_ai_conversations IS 'Stores all AI assistant chat messages for learning and context';
COMMENT ON TABLE ancarraig_ai_knowledge IS 'Stores extracted business knowledge from conversations';

COMMENT ON COLUMN ancarraig_ai_conversations.role IS 'Message sender: user, assistant, or system';
COMMENT ON COLUMN ancarraig_ai_conversations.metadata IS 'Additional data like model, tokens, duration, topics';

COMMENT ON COLUMN ancarraig_ai_knowledge.category IS 'Type of knowledge: preference, rule, insight, or competitor';
COMMENT ON COLUMN ancarraig_ai_knowledge.confidence IS 'Confidence score 0-1 for extracted knowledge';
COMMENT ON COLUMN ancarraig_ai_knowledge.source_conversation_id IS 'Reference to conversation where knowledge was extracted';

-- ============================================================================
-- Migration Complete
-- ============================================================================
