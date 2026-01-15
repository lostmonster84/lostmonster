import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigChannel, AncarraigCost, AncarraigSeason } from '@lostmonster/database';
import { compareStayLengths, calculateRecommended1NightUplift } from '@/lib/ancarraig/stay-length-comparison';
import { calculateDailyCosts } from '@/lib/ancarraig/calculations';

// POST /api/ancarraig/calculator/stay-comparison - Compare profitability across stay lengths
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();
    const body = await request.json();

    const {
      lodge_id,
      channel_id,
      listing_price_per_night,
      cleaning_fee,
      date,
      stay_lengths,
    } = body;

    // Validation
    if (!lodge_id || !channel_id || !listing_price_per_night || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: lodge_id, channel_id, listing_price_per_night, date' },
        { status: 400 }
      );
    }

    // Fetch channel
    const channels = await sql<AncarraigChannel[]>`
      SELECT * FROM ancarraig_channels
      WHERE id = ${channel_id}
    `;

    if (channels.length === 0) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const channel = channels[0];

    // Fetch costs for lodge
    const costs = await sql<AncarraigCost[]>`
      SELECT * FROM ancarraig_costs
      WHERE lodge_id = ${lodge_id}
      ORDER BY created_at
    `;

    // Fetch seasons
    const seasons = await sql<AncarraigSeason[]>`
      SELECT * FROM ancarraig_seasons
      ORDER BY start_date
    `;

    // Default stay lengths if not provided
    const stayLengthsToCompare = stay_lengths || [1, 2, 3, 7, 14];

    // Run comparison
    const comparison = compareStayLengths({
      channel,
      listingPricePerNight: Number(listing_price_per_night),
      cleaningFee: Number(cleaning_fee || 0),
      costs,
      seasons,
      date: new Date(date),
      stayLengths: stayLengthsToCompare,
    });

    // Calculate daily costs for uplift calculation
    const costBreakdown = calculateDailyCosts(costs, new Date(date));

    // Calculate recommended 1-night uplift
    const upliftRecommendation = calculateRecommended1NightUplift(
      Number(cleaning_fee || 0),
      costBreakdown.totalDaily,
      30
    );

    return NextResponse.json({
      comparison,
      upliftRecommendation,
      channelName: channel.channel_name,
    });
  } catch (error: any) {
    console.error('POST /api/ancarraig/calculator/stay-comparison error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate stay length comparison', details: error.message },
      { status: 500 }
    );
  }
}
