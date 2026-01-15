/**
 * ADMINX Users API - Single User Operations
 * GET /api/users/[id] - Get user details
 * PUT /api/users/[id] - Update user
 * DELETE /api/users/[id] - Delete user (soft delete with last owner protection)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  requireMinimumRole,
  getUserRole,
  getUserId,
  canDeleteUser,
  canChangeUserRole,
  canDeactivateUser,
  isResourceOwner
} from '@/lib/permissions';
import {
  logUserUpdated,
  logUserDeleted,
  logRoleChanged,
  logPermissionDenied
} from '@/lib/audit-log';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import type { UserRole } from '@lostmonster/database/types';

// GET /api/users/[id] - Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    // Check auth
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const actorRole = getUserRole(session);
    const actorId = getUserId(session);

    // Users can view their own profile
    // Admins and owners can view all profiles
    const isOwnProfile = isResourceOwner(session, id);
    if (!isOwnProfile && actorRole === 'member') {
      return NextResponse.json(
        { error: 'Forbidden: Cannot view other user profiles' },
        { status: 403 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    const [user] = await sql`
      SELECT
        id,
        email,
        full_name,
        avatar_url,
        role,
        status,
        last_login,
        metadata,
        created_at,
        updated_at
      FROM users
      WHERE id = ${id}
    `;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('[GET /api/users/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const actorRole = getUserRole(session);
    const actorId = getUserId(session);
    if (!actorRole || !actorId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Get target user's current data
    const [targetUser] = await sql`
      SELECT id, email, full_name, avatar_url, role, status
      FROM users
      WHERE id = ${id}
    `;

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse request body
    const body = await request.json();
    const { email, full_name, avatar_url, role, status, password } = body;

    // Check permissions
    const isOwnProfile = isResourceOwner(session, id);
    const isAdmin = actorRole === 'admin' || actorRole === 'owner';

    // Members can only edit their own profile (not role/status)
    if (!isAdmin && !isOwnProfile) {
      return NextResponse.json(
        { error: 'Forbidden: Cannot edit other users' },
        { status: 403 }
      );
    }

    // Build update object
    const updates: any = {};
    const beforeValue: any = {};
    const afterValue: any = {};

    // Basic fields (all users can update their own)
    if (email !== undefined && email !== targetUser.email) {
      // Check email uniqueness
      const [existing] = await sql`SELECT id FROM users WHERE email = ${email} AND id != ${id}`;
      if (existing) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
      }
      updates.email = email;
      beforeValue.email = targetUser.email;
      afterValue.email = email;
    }

    if (full_name !== undefined && full_name !== targetUser.full_name) {
      updates.full_name = full_name;
      beforeValue.full_name = targetUser.full_name;
      afterValue.full_name = full_name;
    }

    if (avatar_url !== undefined && avatar_url !== targetUser.avatar_url) {
      updates.avatar_url = avatar_url;
      beforeValue.avatar_url = targetUser.avatar_url;
      afterValue.avatar_url = avatar_url;
    }

    // Password change
    if (password) {
      updates.password_hash = await bcrypt.hash(password, 12);
      afterValue.password_changed = true;
    }

    // Role change (admins only)
    if (role !== undefined && role !== targetUser.role) {
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Forbidden: Only admins can change roles' },
          { status: 403 }
        );
      }

      // Validate role change permission
      const roleCheck = await canChangeUserRole(
        actorRole,
        id,
        targetUser.role as UserRole,
        role as UserRole
      );

      if (!roleCheck.allowed) {
        await logPermissionDenied(actorId, 'change_user_role', roleCheck.reason || '', request);
        return NextResponse.json({ error: roleCheck.reason }, { status: 403 });
      }

      updates.role = role;
      beforeValue.role = targetUser.role;
      afterValue.role = role;
    }

    // Status change (admins only)
    if (status !== undefined && status !== targetUser.status) {
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Forbidden: Only admins can change status' },
          { status: 403 }
        );
      }

      // Check if trying to deactivate
      if (status !== 'active') {
        const deactivateCheck = await canDeactivateUser(
          actorRole,
          id,
          targetUser.role as UserRole
        );

        if (!deactivateCheck.allowed) {
          await logPermissionDenied(actorId, 'deactivate_user', deactivateCheck.reason || '', request);
          return NextResponse.json({ error: deactivateCheck.reason }, { status: 403 });
        }
      }

      updates.status = status;
      beforeValue.status = targetUser.status;
      afterValue.status = status;
    }

    // If no updates, return early
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: 'No changes detected', user: targetUser });
    }

    // Add updated_at
    updates.updated_at = 'NOW()';

    // Build UPDATE query
    const setClause = Object.keys(updates)
      .map((key) => {
        if (key === 'updated_at') return 'updated_at = NOW()';
        return `${key} = $${Object.keys(updates).indexOf(key) + 1}`;
      })
      .join(', ');

    const values = Object.values(updates).filter((v) => v !== 'NOW()');

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${values.length + 1}
      RETURNING id, email, full_name, avatar_url, role, status, last_login, created_at, updated_at
    `;

    const [updatedUser] = await sql(query, [...values, id]);

    // Audit logging
    await logUserUpdated(
      actorId,
      id,
      beforeValue,
      afterValue,
      body.reason,
      request
    );

    // Special audit for role changes
    if (beforeValue.role && afterValue.role) {
      await logRoleChanged(
        actorId,
        id,
        beforeValue.role,
        afterValue.role,
        body.reason,
        request
      );
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('[PUT /api/users/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    // Require at least admin role
    const permissionError = requireMinimumRole(session, 'admin');
    if (permissionError) return permissionError;

    const actorRole = getUserRole(session);
    const actorId = getUserId(session);
    if (!actorRole || !actorId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Get target user
    const [targetUser] = await sql`
      SELECT id, email, full_name, role, status
      FROM users
      WHERE id = ${id}
    `;

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user can delete
    const deleteCheck = await canDeleteUser(
      actorRole,
      id,
      targetUser.role as UserRole
    );

    if (!deleteCheck.allowed) {
      await logPermissionDenied(actorId, 'delete_user', deleteCheck.reason || '', request);
      return NextResponse.json({ error: deleteCheck.reason }, { status: 403 });
    }

    // Soft delete - set status to 'inactive'
    await sql`
      UPDATE users
      SET status = 'inactive', updated_at = NOW()
      WHERE id = ${id}
    `;

    // Audit log
    await logUserDeleted(
      actorId,
      id,
      {
        email: targetUser.email,
        full_name: targetUser.full_name,
        role: targetUser.role
      },
      undefined,
      request
    );

    return NextResponse.json({
      message: 'User deleted successfully (soft delete)',
      userId: id
    });
  } catch (error) {
    console.error('[DELETE /api/users/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
