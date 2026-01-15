import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigChannel, AncarraigCost, AncarraigSeason } from '@lostmonster/database';
import { reverseCalculate } from '@/lib/ancarraig/reverse-calculator';

// POST /api/ancarraig/calculator/reverse - Calculate listing price from target net
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
      target_net_per_night,
      cleaning_fee,
      stay_length,
      start_date,
      include_margin,
      margin_percent,
    } = body;

    // Validation
    if (!lodge_id || !channel_id || !target_net_per_night || !stay_length || !start_date) {
      return NextResponse.json(
        { error: 'Missing required fields: lodge_id, channel_id, target_net_per_night, stay_length, start_date' },
        { status: 400 }
      );
    }

    if (target_net_per_night <= 0) {
      return NextResponse.json(
        { error: 'Target net per night must be greater than 0' },
        { status: 400 }
      );
    }

    if (stay_length < 1) {
      return NextResponse.json(
        { error: 'Stay length must be at least 1 night' },
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

    // Run reverse calculator
    const result = reverseCalculate({
      targetNetPerNight: Number(target_net_per_night),
      channel,
      cleaningFee: Number(cleaning_fee || 0),
      stayLength: Number(stay_length),
      costs,
      seasons,
      startDate: new Date(start_date),
      includeMargin: Boolean(include_margin),
      marginPercent: Number(margin_percent || 30),
    });

    // Save to calculator usage history
    await sql`
      INSERT INTO ancarraig_calculator_usage (
        lodge_id,
        channel,
        target_net,
        calculated_listing_price,
        stay_length,
        date_range_start,
        date_range_end
      ) VALUES (
        ${lodge_id},
        ${channel.channel_name},
        ${target_net_per_night},
        ${result.listingPricePerNight},
        ${stay_length},
        ${start_date},
        ${new Date(new Date(start_date).getTime() + (stay_length - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
      )
    `;

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('POST /api/ancarraig/calculator/reverse error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate listing price', details: error.message },
      { status: 500 }
    );
  }
}
