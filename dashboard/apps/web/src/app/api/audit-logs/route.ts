/**
 * ADMINX Audit Logs API
 * GET /api/audit-logs - Get audit logs with filtering
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { requireMinimumRole } from '@/lib/permissions';
import { getRecentAuditLogs, getAuditLogStats } from '@/lib/audit-log';

// GET /api/audit-logs - List audit logs
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Require at least admin role to view audit logs
    const permissionError = requireMinimumRole(session, 'admin');
    if (permissionError) return permissionError;

    const { searchParams } = new URL(request.url);

    // Query parameters
    const action = searchParams.get('action') || undefined;
    const entityType = searchParams.get('entity_type') || undefined;
    const userId = searchParams.get('user_id') || undefined;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const includeStats = searchParams.get('include_stats') === 'true';

    // Get audit logs
    const logs = await getRecentAuditLogs(limit, offset, {
      action,
      entityType,
      userId
    });

    const response: any = { logs };

    // Include stats if requested
    if (includeStats) {
      response.stats = await getAuditLogStats();
    }

    // Add pagination info
    response.pagination = {
      limit,
      offset,
      count: logs.length,
      hasMore: logs.length === limit
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[GET /api/audit-logs] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
