/**
 * ADMINX Audit Logging Utility
 * Enhanced audit trail with before/after values and reason
 *
 * Follows your existing Ancarraig audit pattern
 */

import { NextRequest } from 'next/server';
import type { AuditLog } from '@lostmonster/database/types';

// ============================================================================
// Audit Log Creation
// ============================================================================

export interface CreateAuditLogParams {
  userId: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  beforeValue?: Record<string, any> | null;
  afterValue?: Record<string, any> | null;
  reason?: string | null;
  metadata?: Record<string, any>;
  request?: NextRequest;
}

/**
 * Create an audit log entry
 * Enhanced with before/after values and reason (like your Ancarraig system)
 */
export async function createAuditLog(params: CreateAuditLogParams): Promise<void> {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL!);

    // Extract IP address and user agent from request
    let ipAddress: string | null = null;
    let userAgent: string | null = null;

    if (params.request) {
      ipAddress =
        params.request.headers.get('x-forwarded-for')?.split(',')[0] ||
        params.request.headers.get('x-real-ip') ||
        null;
      userAgent = params.request.headers.get('user-agent') || null;
    }

    await sql`
      INSERT INTO audit_logs (
        user_id,
        action,
        entity_type,
        entity_id,
        before_value,
        after_value,
        reason,
        metadata,
        ip_address,
        user_agent,
        created_at
      ) VALUES (
        ${params.userId},
        ${params.action},
        ${params.entityType},
        ${params.entityId || null},
        ${params.beforeValue ? JSON.stringify(params.beforeValue) : null},
        ${params.afterValue ? JSON.stringify(params.afterValue) : null},
        ${params.reason || null},
        ${params.metadata ? JSON.stringify(params.metadata) : '{}'},
        ${ipAddress},
        ${userAgent},
        NOW()
      )
    `;
  } catch (error) {
    // Don't throw - audit logging should never break the main flow
    console.error('[createAuditLog] Error:', error);
  }
}

// ============================================================================
// Common Audit Actions (for consistency)
// ============================================================================

export const AuditActions = {
  // User actions
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_ACTIVATED: 'user.activated',
  USER_DEACTIVATED: 'user.deactivated',
  USER_SUSPENDED: 'user.suspended',
  USER_ROLE_CHANGED: 'user.role_changed',
  USER_PASSWORD_CHANGED: 'user.password_changed',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',

  // System actions
  SYSTEM_SETTINGS_UPDATED: 'system.settings_updated',
  SYSTEM_BACKUP_CREATED: 'system.backup_created',

  // Security actions
  SECURITY_PERMISSION_DENIED: 'security.permission_denied',
  SECURITY_SUSPICIOUS_ACTIVITY: 'security.suspicious_activity'
} as const;

// ============================================================================
// Helper Functions for Common Audit Scenarios
// ============================================================================

/**
 * Log user creation
 */
export async function logUserCreated(
  actorId: string,
  newUserId: string,
  userData: Partial<{ email: string; full_name: string; role: string }>,
  request?: NextRequest
) {
  await createAuditLog({
    userId: actorId,
    action: AuditActions.USER_CREATED,
    entityType: 'user',
    entityId: newUserId,
    afterValue: userData,
    request
  });
}

/**
 * Log user update with before/after
 */
export async function logUserUpdated(
  actorId: string,
  targetUserId: string,
  beforeValue: Record<string, any>,
  afterValue: Record<string, any>,
  reason?: string,
  request?: NextRequest
) {
  await createAuditLog({
    userId: actorId,
    action: AuditActions.USER_UPDATED,
    entityType: 'user',
    entityId: targetUserId,
    beforeValue,
    afterValue,
    reason,
    request
  });
}

/**
 * Log user deletion
 */
export async function logUserDeleted(
  actorId: string,
  targetUserId: string,
  userData: Partial<{ email: string; full_name: string; role: string }>,
  reason?: string,
  request?: NextRequest
) {
  await createAuditLog({
    userId: actorId,
    action: AuditActions.USER_DELETED,
    entityType: 'user',
    entityId: targetUserId,
    beforeValue: userData,
    reason,
    request
  });
}

/**
 * Log role change
 */
export async function logRoleChanged(
  actorId: string,
  targetUserId: string,
  oldRole: string,
  newRole: string,
  reason?: string,
  request?: NextRequest
) {
  await createAuditLog({
    userId: actorId,
    action: AuditActions.USER_ROLE_CHANGED,
    entityType: 'user',
    entityId: targetUserId,
    beforeValue: { role: oldRole },
    afterValue: { role: newRole },
    reason,
    metadata: {
      role_change: `${oldRole} → ${newRole}`
    },
    request
  });
}

/**
 * Log user login
 */
export async function logUserLogin(
  userId: string,
  request?: NextRequest
) {
  await createAuditLog({
    userId,
    action: AuditActions.USER_LOGIN,
    entityType: 'user',
    entityId: userId,
    request
  });
}

/**
 * Log permission denied attempt
 */
export async function logPermissionDenied(
  userId: string | null,
  attemptedAction: string,
  reason: string,
  request?: NextRequest
) {
  await createAuditLog({
    userId,
    action: AuditActions.SECURITY_PERMISSION_DENIED,
    entityType: 'security',
    metadata: {
      attempted_action: attemptedAction,
      denial_reason: reason
    },
    request
  });
}

// ============================================================================
// Query Helpers
// ============================================================================

/**
 * Get audit logs for a specific user
 */
export async function getUserAuditLogs(
  userId: string,
  limit: number = 50,
  offset: number = 0
): Promise<AuditLog[]> {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL!);

    const results = await sql<AuditLog[]>`
      SELECT
        id,
        user_id,
        action,
        entity_type,
        entity_id,
        before_value,
        after_value,
        reason,
        metadata,
        ip_address,
        user_agent,
        created_at
      FROM audit_logs
      WHERE entity_type = 'user' AND entity_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return results;
  } catch (error) {
    console.error('[getUserAuditLogs] Error:', error);
    return [];
  }
}

/**
 * Get recent audit logs (for audit logs page)
 */
export async function getRecentAuditLogs(
  limit: number = 100,
  offset: number = 0,
  filters?: {
    action?: string;
    entityType?: string;
    userId?: string;
  }
): Promise<AuditLog[]> {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL!);

    // Build WHERE clause based on filters
    let whereClause = '';
    const conditions: string[] = [];

    if (filters?.action) {
      conditions.push(`action = '${filters.action}'`);
    }
    if (filters?.entityType) {
      conditions.push(`entity_type = '${filters.entityType}'`);
    }
    if (filters?.userId) {
      conditions.push(`user_id = '${filters.userId}'`);
    }

    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    const query = `
      SELECT
        al.id,
        al.user_id,
        al.action,
        al.entity_type,
        al.entity_id,
        al.before_value,
        al.after_value,
        al.reason,
        al.metadata,
        al.ip_address,
        al.user_agent,
        al.created_at,
        u.full_name as user_name,
        u.email as user_email
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ${whereClause}
      ORDER BY al.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const results = await sql(query);
    return results as AuditLog[];
  } catch (error) {
    console.error('[getRecentAuditLogs] Error:', error);
    return [];
  }
}

/**
 * Get audit log statistics
 */
export async function getAuditLogStats(): Promise<{
  totalLogs: number;
  todayLogs: number;
  userActions: number;
  securityEvents: number;
}> {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL!);

    const [stats] = await sql`
      SELECT
        COUNT(*) as total_logs,
        COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_logs,
        COUNT(CASE WHEN action LIKE 'user.%' THEN 1 END) as user_actions,
        COUNT(CASE WHEN action LIKE 'security.%' THEN 1 END) as security_events
      FROM audit_logs
    `;

    return {
      totalLogs: parseInt(stats.total_logs || '0'),
      todayLogs: parseInt(stats.today_logs || '0'),
      userActions: parseInt(stats.user_actions || '0'),
      securityEvents: parseInt(stats.security_events || '0')
    };
  } catch (error) {
    console.error('[getAuditLogStats] Error:', error);
    return {
      totalLogs: 0,
      todayLogs: 0,
      userActions: 0,
      securityEvents: 0
    };
  }
}
