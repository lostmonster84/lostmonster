import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { CashFlowPlanner } from '@/components/ancarraig/CashFlowPlanner';
import { createClient } from '@lostmonster/database/client';
import { AncarraigLodge } from '@lostmonster/database';

export default async function AncarraigCashFlowPage() {
  const sql = createClient();

  // Fetch all lodges
  const lodges = await sql<AncarraigLodge[]>`
    SELECT * FROM ancarraig_lodges
    ORDER BY name
  `;

  return (
    <AncarraigLayout
      title="Cash Flow Planner"
      description="Project annual income and plan drawings to match seasonal cash flow"
    >
      <CashFlowPlanner lodges={lodges} />
    </AncarraigLayout>
  );
}
