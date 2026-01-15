import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { SeasonalCalendar } from '@/components/ancarraig/SeasonalCalendar';
import { createClient } from '@lostmonster/database/client';
import { AncarraigLodge, AncarraigSeason } from '@lostmonster/database';

export default async function AncarraigCalendarPage() {
  const sql = createClient();

  // Fetch all lodges
  const lodges = await sql<AncarraigLodge[]>`
    SELECT * FROM ancarraig_lodges
    ORDER BY name
  `;

  // Fetch all seasons
  const seasons = await sql<AncarraigSeason[]>`
    SELECT * FROM ancarraig_seasons
    WHERE is_active = true
    ORDER BY start_date
  `;

  return (
    <AncarraigLayout
      title="Seasonal Calendar"
      description="View peak and off-peak periods with dynamic pricing multipliers"
    >
      <SeasonalCalendar initialLodges={lodges} initialSeasons={seasons} />
    </AncarraigLayout>
  );
}
