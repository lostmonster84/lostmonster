import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { ChatInterface } from '@/components/ancarraig/ai/ChatInterface';
import { AIOnboardingWrapper } from '@/components/ancarraig/ai/AIOnboardingWrapper';
import { createClient } from '@lostmonster/database/client';
import { AncarraigAIConversation } from '@lostmonster/database';

export default async function AncarraigAIPage() {
  const sql = createClient();

  // For demo purposes, use a demo user ID
  // In production, this would come from authentication
  const demoUserId = '00000000-0000-0000-0000-000000000001';

  // Check if wizard has been completed
  let wizardCompleted = false;
  try {
    const wizardResult = await sql`
      SELECT id FROM ancarraig_ai_wizard_responses
      WHERE user_id = ${demoUserId}
      LIMIT 1
    `;
    wizardCompleted = wizardResult.length > 0;
  } catch (error) {
    // Table might not exist yet, that's fine
    console.log('Wizard table not found - will show wizard');
  }

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
      <AIOnboardingWrapper
        userId={demoUserId}
        wizardCompleted={wizardCompleted}
      >
        <ChatInterface
          initialMessages={conversationHistory}
          userId={demoUserId}
        />
      </AIOnboardingWrapper>
    </AncarraigLayout>
  );
}
