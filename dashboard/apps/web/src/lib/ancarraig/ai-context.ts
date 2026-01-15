import { createClient } from '@lostmonster/database/client';
import {
  AIContext,
  AncarraigAIConversation,
  AncarraigAIKnowledge,
  AncarraigLodge,
  AncarraigChannel,
  AncarraigCost,
} from '@lostmonster/database';

/**
 * Load all context needed for AI prompt generation
 */
export async function loadAIContext(userId: string): Promise<AIContext> {
  const sql = createClient();

  // Load conversation history (last 20 messages for context)
  const conversationHistory = await sql<AncarraigAIConversation[]>`
    SELECT *
    FROM ancarraig_ai_conversations
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 20
  `;
  conversationHistory.reverse(); // Oldest first

  // Load knowledge base
  const knowledgeBase = await sql<AncarraigAIKnowledge[]>`
    SELECT *
    FROM ancarraig_ai_knowledge
    WHERE user_id = ${userId}
    ORDER BY confidence DESC, created_at DESC
  `;

  // Load business data (lodges)
  const lodgeData = await sql<AncarraigLodge[]>`
    SELECT *
    FROM ancarraig_lodges
    WHERE is_active = true
    ORDER BY name
  `;

  // Load channel data
  const channelData = await sql<AncarraigChannel[]>`
    SELECT *
    FROM ancarraig_channels
    ORDER BY channel_name
  `;

  // Load cost data (active costs only)
  const costData = await sql<AncarraigCost[]>`
    SELECT *
    FROM ancarraig_costs
    WHERE is_active = true
    ORDER BY lodge_id, category
  `;

  // Load wizard responses (for personalization)
  let wizardData = null;
  try {
    const wizardResult = await sql`
      SELECT * FROM ancarraig_ai_wizard_responses
      WHERE user_id = ${userId}
      LIMIT 1
    `;
    if (wizardResult.length > 0) {
      wizardData = wizardResult[0];
    }
  } catch (error) {
    // Table might not exist yet
    console.log('Wizard table not found');
  }

  return {
    conversationHistory,
    knowledgeBase,
    lodgeData,
    channelData,
    costData,
    wizardData,
  };
}

/**
 * Load conversation history only
 */
export async function loadConversationHistory(
  userId: string,
  limit: number = 20
): Promise<AncarraigAIConversation[]> {
  const sql = createClient();

  const conversations = await sql<AncarraigAIConversation[]>`
    SELECT *
    FROM ancarraig_ai_conversations
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return conversations.reverse(); // Oldest first
}

/**
 * Load knowledge base only
 */
export async function loadKnowledgeBase(userId: string): Promise<AncarraigAIKnowledge[]> {
  const sql = createClient();

  const knowledge = await sql<AncarraigAIKnowledge[]>`
    SELECT *
    FROM ancarraig_ai_knowledge
    WHERE user_id = ${userId}
    ORDER BY confidence DESC, created_at DESC
  `;

  return knowledge;
}
