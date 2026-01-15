import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';

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

    // Delete cost
    const result = await sql`
      DELETE FROM ancarraig_costs
      WHERE id = ${id}
      RETURNING lodge_id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Cost not found' }, { status: 404 });
    }

    // TODO: Trigger target rate recalculation for this lodge
    // await recalculateTargetRates(result[0].lodge_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/ancarraig/costs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete cost' },
      { status: 500 }
    );
  }
}

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
      category,
      amount,
      period,
      start_date,
      end_date,
      notes,
    } = body;

    // Validation
    if (!name?.trim() || !category || !amount || !period) {
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

    // Update cost (don't update lodge_id to prevent accidental changes)
    const result = await sql`
      UPDATE ancarraig_costs
      SET
        name = ${name.trim()},
        category = ${category},
        amount = ${amount},
        period = ${period},
        start_date = ${start_date || null},
        end_date = ${end_date || null},
        notes = ${notes || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Cost not found' }, { status: 404 });
    }

    // TODO: Trigger target rate recalculation for this lodge
    // await recalculateTargetRates(result[0].lodge_id);

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('PUT /api/ancarraig/costs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update cost' },
      { status: 500 }
    );
  }
}
