import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';
import { auth } from '@/lib/auth';
import { AncarraigCost } from '@lostmonster/database';
import { calculateCashFlowProjection } from '@/lib/ancarraig/cash-flow-planner';

// POST /api/ancarraig/cashflow - Calculate cash flow projection
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
      annual_revenue_target,
      target_drawings,
      quarterly_occupancy,
    } = body;

    // Validation
    if (!lodge_id || !annual_revenue_target) {
      return NextResponse.json(
        { error: 'Missing required fields: lodge_id, annual_revenue_target' },
        { status: 400 }
      );
    }

    // Fetch costs for lodge
    const costs = await sql<AncarraigCost[]>`
      SELECT * FROM ancarraig_costs
      WHERE lodge_id = ${lodge_id}
      ORDER BY created_at
    `;

    // Calculate projection
    const projection = calculateCashFlowProjection({
      annualRevenueTarget: Number(annual_revenue_target),
      costs,
      targetDrawings: target_drawings ? Number(target_drawings) : 100000,
      quarterlyOccupancy: quarterly_occupancy || { q1: 0.35, q2: 0.55, q3: 0.70, q4: 0.40 },
    });

    return NextResponse.json(projection);
  } catch (error: any) {
    console.error('POST /api/ancarraig/cashflow error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate cash flow projection', details: error.message },
      { status: 500 }
    );
  }
}
