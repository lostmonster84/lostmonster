import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigCompetitorRate } from '@lostmonster/database';

// GET /api/ancarraig/competitors/[id]/rates - Get rates for a competitor
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    let rates;
    if (startDate && endDate) {
      rates = await sql<AncarraigCompetitorRate[]>`
        SELECT * FROM ancarraig_competitor_rates
        WHERE competitor_id = ${id}
          AND date >= ${startDate}
          AND date <= ${endDate}
        ORDER BY date DESC
      `;
    } else {
      rates = await sql<AncarraigCompetitorRate[]>`
        SELECT * FROM ancarraig_competitor_rates
        WHERE competitor_id = ${id}
        ORDER BY date DESC
        LIMIT 30
      `;
    }

    return NextResponse.json(rates);
  } catch (error) {
    console.error('GET /api/ancarraig/competitors/[id]/rates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitor rates' },
      { status: 500 }
    );
  }
}

// POST /api/ancarraig/competitors/[id]/rates - Add rate for a competitor
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();
    const { id } = await params;
    const body = await request.json();

    const { date, nightly_rate, weekly_rate, available, source } = body;

    // Validation
    if (!date || !source) {
      return NextResponse.json(
        { error: 'Date and source are required' },
        { status: 400 }
      );
    }

    // Insert or update rate
    const result = await sql<AncarraigCompetitorRate[]>`
      INSERT INTO ancarraig_competitor_rates (
        competitor_id,
        date,
        nightly_rate,
        weekly_rate,
        available,
        source
      ) VALUES (
        ${id},
        ${date},
        ${nightly_rate || null},
        ${weekly_rate || null},
        ${available !== undefined ? available : null},
        ${source}
      )
      ON CONFLICT (competitor_id, date, source)
      DO UPDATE SET
        nightly_rate = EXCLUDED.nightly_rate,
        weekly_rate = EXCLUDED.weekly_rate,
        available = EXCLUDED.available,
        scraped_at = NOW()
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('POST /api/ancarraig/competitors/[id]/rates error:', error);
    return NextResponse.json(
      { error: 'Failed to add competitor rate' },
      { status: 500 }
    );
  }
}
