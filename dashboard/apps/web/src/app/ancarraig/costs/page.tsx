import { AncarraigLayout } from '@/components/ancarraig/AncarraigLayout';
import { createClient } from '@lostmonster/database/client';
import { AncarraigCost, AncarraigLodge, AncarraigSeason } from '@lostmonster/database';
import { CostsManager } from '@/components/ancarraig/CostsManager';
import { Card, CardContent } from '@lostmonster/ui';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

// Fetch all costs data for lodges
async function getCostsData() {
  const sql = createClient();

  // Fetch lodges, costs, and seasons
  const lodges = await sql<AncarraigLodge[]>`
    SELECT * FROM ancarraig_lodges
    ORDER BY name
  `;

  const costs = await sql<AncarraigCost[]>`
    SELECT * FROM ancarraig_costs
    ORDER BY category, name
  `;

  const seasons = await sql<AncarraigSeason[]>`
    SELECT * FROM ancarraig_seasons
    ORDER BY start_date
  `;

  return { lodges, costs, seasons };
}

export default async function CostsPage() {
  const { lodges, costs, seasons } = await getCostsData();

  return (
    <AncarraigLayout
      title="Cost Control Centre"
      description="Add, manage, and understand your costs with AI-powered guidance"
    >
      <CostsManager
        initialLodges={lodges}
        initialCosts={costs}
        initialSeasons={seasons}
      />

      {/* Understanding Your Numbers */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Understanding Your Numbers</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Breakeven Rate</h4>
                <p className="text-muted-foreground">
                  The minimum you must charge to cover all costs. Anything below this means
                  you&apos;re losing money on that night.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                <TrendingUp className="h-4 w-4 text-cyan-500" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Target Rate (30% margin)</h4>
                <p className="text-muted-foreground">
                  The rate that gives you a healthy 30% profit margin. This is what you should
                  aim for when setting prices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Daily Costs</h4>
                <p className="text-muted-foreground">
                  Your total costs per day (fixed + variable). This is the foundation of all
                  your pricing decisions. Add all your costs above to get an accurate picture.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AncarraigLayout>
  );
}
