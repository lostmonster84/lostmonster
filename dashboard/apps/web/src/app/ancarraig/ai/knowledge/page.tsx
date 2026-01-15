import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { KnowledgeViewer } from '@/components/ancarraig/ai/KnowledgeViewer';
import { createClient } from '@lostmonster/database/client';
import { AncarraigAIKnowledge } from '@lostmonster/database';

export default async function AncarraigAIKnowledgePage() {
  const sql = createClient();

  // For demo purposes, use a demo user ID
  // In production, this would come from authentication
  const demoUserId = 'demo-user-ancarraig';

  // Fetch all knowledge for user
  const knowledge = await sql<AncarraigAIKnowledge[]>`
    SELECT *
    FROM ancarraig_ai_knowledge
    WHERE user_id = ${demoUserId}
    ORDER BY category, confidence DESC, created_at DESC
  `;

  return (
    <AncarraigLayout
      title="AI Knowledge Base"
      description="What the AI has learned from your conversations"
    >
      <KnowledgeViewer knowledge={knowledge} />
    </AncarraigLayout>
  );
}
