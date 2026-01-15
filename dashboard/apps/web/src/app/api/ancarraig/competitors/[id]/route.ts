import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigCompetitor } from '@lostmonster/database';

// PUT /api/ancarraig/competitors/[id] - Update competitor
export async function PUT(
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

    // Update competitor
    const result = await sql<AncarraigCompetitor[]>`
      UPDATE ancarraig_competitors
      SET
        name = COALESCE(${name}, name),
        type = COALESCE(${type}, type),
        location = COALESCE(${location}, location),
        capacity_guests = COALESCE(${capacity_guests}, capacity_guests),
        distance_km = COALESCE(${distance_km}, distance_km),
        airbnb_url = COALESCE(${airbnb_url}, airbnb_url),
        booking_url = COALESCE(${booking_url}, booking_url),
        direct_url = COALESCE(${direct_url}, direct_url),
        notes = COALESCE(${notes}, notes),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Competitor not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('PUT /api/ancarraig/competitors/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update competitor' },
      { status: 500 }
    );
  }
}

// DELETE /api/ancarraig/competitors/[id] - Delete competitor
export async function DELETE(
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

    const result = await sql`
      DELETE FROM ancarraig_competitors
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Competitor not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/ancarraig/competitors/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete competitor' },
      { status: 500 }
    );
  }
}
