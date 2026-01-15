import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigChannel } from '@lostmonster/database';

// GET /api/ancarraig/channels - List all channels
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();

    const channels = await sql<AncarraigChannel[]>`
      SELECT * FROM ancarraig_channels
      ORDER BY channel_name
    `;

    return NextResponse.json(channels);
  } catch (error) {
    console.error('GET /api/ancarraig/channels error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
      { status: 500 }
    );
  }
}

// POST /api/ancarraig/channels - Create new channel
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();
    const body = await request.json();

    const {
      channel_name,
      base_commission_percent,
      charges_cleaning_commission = false,
      supports_genius = false,
      genius_discount_percent = null,
      non_refundable_discount_percent = null,
    } = body;

    // Validation
    if (!channel_name || base_commission_percent === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: channel_name, base_commission_percent' },
        { status: 400 }
      );
    }

    if (base_commission_percent < 0 || base_commission_percent > 100) {
      return NextResponse.json(
        { error: 'Commission percent must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Insert channel
    const result = await sql<AncarraigChannel[]>`
      INSERT INTO ancarraig_channels (
        channel_name,
        base_commission_percent,
        charges_cleaning_commission,
        supports_genius,
        genius_discount_percent,
        non_refundable_discount_percent
      )
      VALUES (
        ${channel_name},
        ${base_commission_percent},
        ${charges_cleaning_commission},
        ${supports_genius},
        ${genius_discount_percent},
        ${non_refundable_discount_percent}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    console.error('POST /api/ancarraig/channels error:', error);

    // Handle unique constraint violation
    if (error?.code === '23505') {
      return NextResponse.json(
        { error: 'Channel already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create channel' },
      { status: 500 }
    );
  }
}
