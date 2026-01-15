/**
 * ADMINX Users API - List and Create
 * GET /api/users - List all users (with filtering)
 * POST /api/users - Create new user
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { requireMinimumRole, getUserRole, getUserId } from '@/lib/permissions';
import { createAuditLog, logUserCreated } from '@/lib/audit-log';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// GET /api/users - List all users
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Require at least admin role
    const permissionError = requireMinimumRole(session, 'admin');
    if (permissionError) return permissionError;

    const sql = neon(process.env.DATABASE_URL!);
    const { searchParams } = new URL(request.url);

    // Query parameters
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build WHERE conditions
    const conditions: string[] = [];
    if (role) conditions.push(`role = '${role}'`);
    if (status) conditions.push(`status = '${status}'`);
    if (search) {
      conditions.push(`(
        full_name ILIKE '%${search}%'
        OR email ILIKE '%${search}%'
      )`);
    }

    const whereClause = conditions.length > 0
      ? 'WHERE ' + conditions.join(' AND ')
      : '';

    // Query users (exclude password_hash)
    const query = `
      SELECT
        id,
        email,
        full_name,
        avatar_url,
        role,
        status,
        last_login,
        created_at,
        updated_at
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const users = await sql(query);

    // Get total count
    const [countResult] = await sql(`SELECT COUNT(*) as count FROM users ${whereClause}`);
    const total = parseInt(countResult.count as string);

    return NextResponse.json({
      users,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('[GET /api/users] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Require at least admin role
    const permissionError = requireMinimumRole(session, 'admin');
    if (permissionError) return permissionError;

    const actorId = getUserId(session);
    const actorRole = getUserRole(session);
    if (!actorId || !actorRole) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { email, password, full_name, role, avatar_url } = body;

    // Validation
    if (!email || !password || !full_name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, full_name, role' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['owner', 'admin', 'member'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be: owner, admin, or member' },
        { status: 400 }
      );
    }

    // Check if actor can assign this role
    // Rule: Can't create users with same or higher role
    const roleHierarchy = { owner: 3, admin: 2, member: 1 };
    if (roleHierarchy[actorRole] <= roleHierarchy[role as keyof typeof roleHierarchy]) {
      return NextResponse.json(
        { error: 'Cannot create user with same or higher role than your own' },
        { status: 403 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Check if email already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Create user
    const [newUser] = await sql`
      INSERT INTO users (
        email,
        password_hash,
        full_name,
        avatar_url,
        role,
        status,
        created_at,
        updated_at
      ) VALUES (
        ${email},
        ${password_hash},
        ${full_name},
        ${avatar_url || null},
        ${role},
        'active',
        NOW(),
        NOW()
      )
      RETURNING
        id,
        email,
        full_name,
        avatar_url,
        role,
        status,
        created_at,
        updated_at
    `;

    // Audit log
    await logUserCreated(
      actorId,
      newUser.id,
      {
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role
      },
      request
    );

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: newUser
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/users] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
