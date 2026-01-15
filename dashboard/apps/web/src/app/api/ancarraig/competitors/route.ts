import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigCompetitor } from '@lostmonster/database';

// GET /api/ancarraig/competitors - List all competitors
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();
    const competitors = await sql<AncarraigCompetitor[]>`
      SELECT * FROM ancarraig_competitors
      ORDER BY name
    `;

    return NextResponse.json(competitors);
  } catch (error) {
    console.error('GET /api/ancarraig/competitors error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitors' },
      { status: 500 }
    );
  }
}

// POST /api/ancarraig/competitors - Create new competitor
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();
    const body = await request.json();

    const {
      name,
      type,
      location,
      capacity_guests,
      distance_km,
      airbnb_url,
      booking_url,
      direct_url,
      notes,
    } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: 'Competitor name is required' },
        { status: 400 }
      );
    }

    // Insert competitor
    const result = await sql<AncarraigCompetitor[]>`
      INSERT INTO ancarraig_competitors (
        name,
        type,
        location,
        capacity_guests,
        distance_km,
        airbnb_url,
        booking_url,
        direct_url,
        notes
      ) VALUES (
        ${name},
        ${type || null},
        ${location || null},
        ${capacity_guests || null},
        ${distance_km || null},
        ${airbnb_url || null},
        ${booking_url || null},
        ${direct_url || null},
        ${notes || null}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('POST /api/ancarraig/competitors error:', error);
    return NextResponse.json(
      { error: 'Failed to create competitor' },
      { status: 500 }
    );
  }
}
