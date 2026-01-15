import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { ChatInterface } from '@/components/ancarraig/ai/ChatInterface';
import { createClient } from '@lostmonster/database/client';
import { AncarraigAIConversation } from '@lostmonster/database';

export default async function AncarraigAIPage() {
  const sql = createClient();

  // For demo purposes, use a demo user ID
  // In production, this would come from authentication
  const demoUserId = '00000000-0000-0000-0000-000000000001';

  // Fetch recent conversation history (last 50 messages)
  const conversationHistory = await sql<AncarraigAIConversation[]>`
    SELECT *
    FROM ancarraig_ai_conversations
    WHERE user_id = ${demoUserId}
    ORDER BY created_at DESC
    LIMIT 50
  `;

  // Reverse to show oldest first
  conversationHistory.reverse();

  return (
    <AncarraigLayout
      title="AI Pricing Assistant"
      description="Your intelligent pricing advisor that learns from every conversation"
    >
      <ChatInterface
        initialMessages={conversationHistory}
        userId={demoUserId}
      />
    </AncarraigLayout>
  );
}
