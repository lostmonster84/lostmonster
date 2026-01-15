import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { CompetitorPricing } from '@/components/ancarraig/CompetitorPricing';
import { createClient } from '@lostmonster/database/client';
import { AncarraigCompetitor } from '@lostmonster/database';

export default async function AncarraigRatesPage() {
  const sql = createClient();

  // Fetch all competitors
  const competitors = await sql<AncarraigCompetitor[]>`
    SELECT * FROM ancarraig_competitors
    ORDER BY name
  `;

  return (
    <AncarraigLayout
      title="Competitor Pricing"
      description="Track and compare rates from similar properties to optimize your pricing"
    >
      <CompetitorPricing initialCompetitors={competitors} />
    </AncarraigLayout>
  );
}
