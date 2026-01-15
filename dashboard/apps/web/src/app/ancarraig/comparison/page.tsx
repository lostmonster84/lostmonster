import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { StayLengthComparison } from '@/components/ancarraig/StayLengthComparison';
import { createClient } from '@lostmonster/database/client';
import { AncarraigChannel, AncarraigLodge } from '@lostmonster/database';

export default async function AncarraigComparisonPage() {
  const sql = createClient();

  // Fetch all lodges
  const lodges = await sql<AncarraigLodge[]>`
    SELECT * FROM ancarraig_lodges
    ORDER BY name
  `;

  // Fetch all channels
  const channels = await sql<AncarraigChannel[]>`
    SELECT * FROM ancarraig_channels
    ORDER BY channel_name
  `;

  return (
    <AncarraigLayout
      title="Stay Length Analysis"
      description="Compare profitability across different stay lengths to optimize pricing strategy"
    >
      <StayLengthComparison lodges={lodges} channels={channels} />
    </AncarraigLayout>
  );
}
