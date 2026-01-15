import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { ReverseCalculator } from '@/components/ancarraig/ReverseCalculator';
import { createClient } from '@lostmonster/database/client';
import { AncarraigChannel, AncarraigLodge } from '@lostmonster/database';

export default async function AncarraigCalculatorPage() {
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
      title="Reverse Rate Calculator"
      description="Work backwards from target net income to determine your listing price"
    >
      <ReverseCalculator lodges={lodges} channels={channels} />
    </AncarraigLayout>
  );
}
