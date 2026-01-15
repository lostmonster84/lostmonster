import { createClient } from '@lostmonster/database/client';
import { AncarraigAIConversation, AIMessageRole } from '@lostmonster/database';

/**
 * Save a conversation message to the database
 */
export async function saveConversation(
  userId: string,
  role: AIMessageRole,
  message: string,
  metadata: Record<string, any> = {}
): Promise<AncarraigAIConversation> {
  const sql = createClient();

  const [conversation] = await sql<AncarraigAIConversation[]>`
    INSERT INTO ancarraig_ai_conversations (user_id, role, message, metadata)
    VALUES (${userId}, ${role}, ${message}, ${JSON.stringify(metadata)})
    RETURNING *
  `;

  return conversation;
}

/**
 * Get recent conversation history for a user
 */
export async function getConversationHistory(
  userId: string,
  limit: number = 50
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
 * Delete a conversation by ID
 */
export async function deleteConversation(
  conversationId: string,
  userId: string
): Promise<void> {
  const sql = createClient();

  await sql`
    DELETE FROM ancarraig_ai_conversations
    WHERE id = ${conversationId} AND user_id = ${userId}
  `;
}

/**
 * Delete all conversations for a user
 */
export async function deleteAllConversations(userId: string): Promise<void> {
  const sql = createClient();

  await sql`
    DELETE FROM ancarraig_ai_conversations
    WHERE user_id = ${userId}
  `;
}
