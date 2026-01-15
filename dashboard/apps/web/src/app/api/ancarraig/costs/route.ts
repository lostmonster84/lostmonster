import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = createClient();

    const costs = await sql`
      SELECT * FROM ancarraig_costs
      ORDER BY category, name
    `;

    return NextResponse.json(costs);
  } catch (error) {
    console.error('GET /api/ancarraig/costs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch costs' },
      { status: 500 }
    );
  }
}

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
      name,
      category,
      amount,
      period,
      start_date,
      end_date,
      notes,
    } = body;

    // Validation
    if (!lodge_id || !name?.trim() || !category || !amount || !period) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (amount < 0) {
      return NextResponse.json(
        { error: 'Amount must be positive' },
        { status: 400 }
      );
    }

    // Create cost
    const result = await sql`
      INSERT INTO ancarraig_costs (
        lodge_id,
        name,
        category,
        amount,
        period,
        start_date,
        end_date,
        notes
      )
      VALUES (
        ${lodge_id},
        ${name.trim()},
        ${category},
        ${amount},
        ${period},
        ${start_date || null},
        ${end_date || null},
        ${notes || null}
      )
      RETURNING *
    `;

    // TODO: Trigger target rate recalculation for this lodge
    // await recalculateTargetRates(lodge_id);

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/ancarraig/costs error:', error);
    return NextResponse.json(
      { error: 'Failed to create cost' },
      { status: 500 }
    );
  }
}
