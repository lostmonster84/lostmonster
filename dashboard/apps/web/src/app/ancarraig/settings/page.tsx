import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { ChannelConfig } from '@/components/ancarraig/ChannelConfig';
import { createClient } from '@lostmonster/database/client';
import { AncarraigChannel } from '@lostmonster/database';

export default async function AncarraigSettingsPage() {
  const sql = createClient();

  // Fetch all channels
  const channels = await sql<AncarraigChannel[]>`
    SELECT * FROM ancarraig_channels
    ORDER BY channel_name
  `;

  return (
    <AncarraigLayout
      title="Channel Settings"
      description="Configure OTA commission structures for accurate pricing calculations"
    >
      <ChannelConfig initialChannels={channels} />
    </AncarraigLayout>
  );
}
