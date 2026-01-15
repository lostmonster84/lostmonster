import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigChannel } from '@lostmonster/database';

// PUT /api/ancarraig/channels/[id] - Update channel
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
      channel_name,
      base_commission_percent,
      charges_cleaning_commission,
      supports_genius,
      genius_discount_percent,
      non_refundable_discount_percent,
    } = body;

    // Validation
    if (base_commission_percent !== undefined && (base_commission_percent < 0 || base_commission_percent > 100)) {
      return NextResponse.json(
        { error: 'Commission percent must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Update channel
    const result = await sql<AncarraigChannel[]>`
      UPDATE ancarraig_channels
      SET
        channel_name = COALESCE(${channel_name}, channel_name),
        base_commission_percent = COALESCE(${base_commission_percent}, base_commission_percent),
        charges_cleaning_commission = COALESCE(${charges_cleaning_commission}, charges_cleaning_commission),
        supports_genius = COALESCE(${supports_genius}, supports_genius),
        genius_discount_percent = ${genius_discount_percent !== undefined ? genius_discount_percent : null},
        non_refundable_discount_percent = ${non_refundable_discount_percent !== undefined ? non_refundable_discount_percent : null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('PUT /api/ancarraig/channels/[id] error:', error);

    // Handle unique constraint violation
    if (error?.code === '23505') {
      return NextResponse.json(
        { error: 'Channel name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update channel' },
      { status: 500 }
    );
  }
}

// DELETE /api/ancarraig/channels/[id] - Delete channel
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
      DELETE FROM ancarraig_channels
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/ancarraig/channels/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete channel' },
      { status: 500 }
    );
  }
}
