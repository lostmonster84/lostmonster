/**
 * ADMINX Permission Middleware
 * Role-based access control for Lost Monster Dashboard
 *
 * Customized for owner/admin/member hierarchy
 */

import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';
import type { UserRole } from '@lostmonster/database/types';

// ============================================================================
// Role Hierarchy (Customized for your dashboard)
// ============================================================================

export const roleHierarchy: Record<UserRole, number> = {
  owner: 3,    // Can manage ALL users (your "super_admin")
  admin: 2,    // Can manage regular members only
  member: 1    // Can only manage own profile
} as const;

// ============================================================================
// Permission Checking Functions
// ============================================================================

/**
 * Check if actor has a specific role
 */
export function hasRole(session: Session | null, role: UserRole): boolean {
  if (!session?.user) return false;
  const userRole = (session.user as any).role as UserRole;
  return userRole === role;
}

/**
 * Check if actor has minimum role level
 */
export function hasMinimumRole(session: Session | null, minimumRole: UserRole): boolean {
  if (!session?.user) return false;
  const userRole = (session.user as any).role as UserRole;
  return roleHierarchy[userRole] >= roleHierarchy[minimumRole];
}

/**
 * Check if actor can manage target user
 * Rule: Can only manage users with LOWER hierarchy level
 */
export function canManageUser(actorRole: UserRole, targetRole: UserRole): boolean {
  return roleHierarchy[actorRole] > roleHierarchy[targetRole];
}

/**
 * Require specific role for API route
 * Returns error response if permission denied
 */
export function requireRole(session: Session | null, role: UserRole): NextResponse | null {
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = (session.user as any).role as UserRole;
  if (roleHierarchy[userRole] < roleHierarchy[role]) {
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    );
  }

  return null;
}

/**
 * Require minimum role level for API route
 */
export function requireMinimumRole(session: Session | null, minimumRole: UserRole): NextResponse | null {
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = (session.user as any).role as UserRole;
  if (roleHierarchy[userRole] < roleHierarchy[minimumRole]) {
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    );
  }

  return null;
}

// ============================================================================
// Last Owner Protection
// ============================================================================

/**
 * Check if user is the last active owner
 * Prevents system lockout by protecting the last owner
 */
export async function isLastOwner(userId: string): Promise<boolean> {
  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL!);

    // Count active owners
    const result = await sql`
      SELECT COUNT(*) as count
      FROM users
      WHERE role = 'owner'
        AND status = 'active'
    `;

    const count = parseInt(result[0]?.count || '0');

    if (count <= 1) {
      // Check if this user is an owner
      const userResult = await sql`
        SELECT role, status
        FROM users
        WHERE id = ${userId}
      `;

      const user = userResult[0];
      return user?.role === 'owner' && user?.status === 'active';
    }

    return false;
  } catch (error) {
    console.error('[isLastOwner] Error:', error);
    return false;
  }
}

// ============================================================================
// Permission Validation for User Management
// ============================================================================

/**
 * Validate if actor can delete target user
 * Checks:
 * 1. Actor has higher role than target
 * 2. Target is not the last owner
 */
export async function canDeleteUser(
  actorRole: UserRole,
  targetUserId: string,
  targetUserRole: UserRole
): Promise<{ allowed: boolean; reason?: string }> {
  // Check role hierarchy
  if (!canManageUser(actorRole, targetUserRole)) {
    return {
      allowed: false,
      reason: 'Cannot delete user with same or higher role'
    };
  }

  // Check last owner protection
  if (targetUserRole === 'owner') {
    const isLast = await isLastOwner(targetUserId);
    if (isLast) {
      return {
        allowed: false,
        reason: 'Cannot delete the last active owner. This would lock you out of the system.'
      };
    }
  }

  return { allowed: true };
}

/**
 * Validate if actor can change target user's role
 * Checks:
 * 1. Actor has higher role than current target role
 * 2. Actor has higher role than new target role
 * 3. Not demoting the last owner
 */
export async function canChangeUserRole(
  actorRole: UserRole,
  targetUserId: string,
  currentRole: UserRole,
  newRole: UserRole
): Promise<{ allowed: boolean; reason?: string }> {
  // Check if actor can manage current role
  if (!canManageUser(actorRole, currentRole)) {
    return {
      allowed: false,
      reason: 'Cannot modify user with same or higher role'
    };
  }

  // Check if actor can assign new role
  if (!canManageUser(actorRole, newRole)) {
    return {
      allowed: false,
      reason: 'Cannot assign a role equal to or higher than your own'
    };
  }

  // Check last owner protection (demoting from owner)
  if (currentRole === 'owner' && newRole !== 'owner') {
    const isLast = await isLastOwner(targetUserId);
    if (isLast) {
      return {
        allowed: false,
        reason: 'Cannot demote the last active owner. This would lock you out of the system.'
      };
    }
  }

  return { allowed: true };
}

/**
 * Validate if actor can deactivate target user
 * Checks:
 * 1. Actor has higher role than target
 * 2. Not deactivating the last owner
 */
export async function canDeactivateUser(
  actorRole: UserRole,
  targetUserId: string,
  targetUserRole: UserRole
): Promise<{ allowed: boolean; reason?: string }> {
  // Check role hierarchy
  if (!canManageUser(actorRole, targetUserRole)) {
    return {
      allowed: false,
      reason: 'Cannot deactivate user with same or higher role'
    };
  }

  // Check last owner protection
  if (targetUserRole === 'owner') {
    const isLast = await isLastOwner(targetUserId);
    if (isLast) {
      return {
        allowed: false,
        reason: 'Cannot deactivate the last active owner. This would lock you out of the system.'
      };
    }
  }

  return { allowed: true };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get user role from session (type-safe)
 */
export function getUserRole(session: Session | null): UserRole | null {
  if (!session?.user) return null;
  return (session.user as any).role as UserRole;
}

/**
 * Get user ID from session
 */
export function getUserId(session: Session | null): string | null {
  if (!session?.user) return null;
  return (session.user as any).id as string;
}

/**
 * Check if user owns the resource (for profile editing)
 */
export function isResourceOwner(session: Session | null, resourceUserId: string): boolean {
  const userId = getUserId(session);
  return userId === resourceUserId;
}
