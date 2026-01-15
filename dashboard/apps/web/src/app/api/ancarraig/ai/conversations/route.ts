import { NextRequest, NextResponse } from 'next/server';
import { deleteAllConversations } from '@/lib/ancarraig/ai-storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * DELETE /api/ancarraig/ai/conversations
 * Delete all conversations for the demo user
 */
export async function DELETE(req: NextRequest) {
  try {
    // For demo purposes, use a demo user ID
    // In production, this would come from authentication
    const userId = '00000000-0000-0000-0000-000000000001';

    // Delete all conversations
    await deleteAllConversations(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete conversations error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
