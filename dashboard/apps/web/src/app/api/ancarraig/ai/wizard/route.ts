import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/ancarraig/ai/wizard
 * Save wizard onboarding responses
 */
export async function POST(req: NextRequest) {
  try {
    const sql = createClient();

    // For demo purposes, use a demo user ID
    // In production, this would come from authentication
    const userId = '00000000-0000-0000-0000-000000000001';

    const body = await req.json();

    // Validate required fields
    if (!body.propertyName || !body.propertyType || !body.primaryGoal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if wizard already completed
    const existing = await sql`
      SELECT id FROM ancarraig_ai_wizard_responses
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      // Update existing record
      await sql`
        UPDATE ancarraig_ai_wizard_responses
        SET
          property_name = ${body.propertyName || null},
          property_location = ${body.propertyLocation || null},
          property_type = ${body.propertyType || null},
          number_of_bedrooms = ${body.numberOfBedrooms ? parseInt(body.numberOfBedrooms) : null},
          primary_goal = ${body.primaryGoal || null},
          average_nightly_rate = ${body.averageNightlyRate || null},
          occupancy_target = ${body.occupancyTarget || null},
          biggest_challenge = ${body.biggestChallenge || null},
          competitors = ${body.competitors || null},
          seasonality_impact = ${body.seasonalityImpact || null},
          main_channels = ${body.mainChannels || []},
          commission_concern = ${body.commissionConcern || null},
          completed_at = NOW()
        WHERE user_id = ${userId}
      `;
    } else {
      // Insert new record
      await sql`
        INSERT INTO ancarraig_ai_wizard_responses (
          user_id,
          property_name,
          property_location,
          property_type,
          number_of_bedrooms,
          primary_goal,
          average_nightly_rate,
          occupancy_target,
          biggest_challenge,
          competitors,
          seasonality_impact,
          main_channels,
          commission_concern
        ) VALUES (
          ${userId},
          ${body.propertyName || null},
          ${body.propertyLocation || null},
          ${body.propertyType || null},
          ${body.numberOfBedrooms ? parseInt(body.numberOfBedrooms) : null},
          ${body.primaryGoal || null},
          ${body.averageNightlyRate || null},
          ${body.occupancyTarget || null},
          ${body.biggestChallenge || null},
          ${body.competitors || null},
          ${body.seasonalityImpact || null},
          ${body.mainChannels || []},
          ${body.commissionConcern || null}
        )
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Wizard save error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ancarraig/ai/wizard
 * Check if wizard has been completed
 */
export async function GET(req: NextRequest) {
  try {
    const sql = createClient();
    const userId = '00000000-0000-0000-0000-000000000001';

    const result = await sql`
      SELECT * FROM ancarraig_ai_wizard_responses
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json({ completed: false, data: null });
    }

    return NextResponse.json({ completed: true, data: result[0] });
  } catch (error) {
    console.error('Wizard check error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
