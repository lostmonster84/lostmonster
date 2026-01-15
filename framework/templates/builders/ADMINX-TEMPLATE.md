# ADMINX Template - Production-Ready Code

> **Super-Admin System with User Management, RBAC, and Audit Logging**
>
> **Foundation**: Extends [ADMIN-MASTER-REFERENCE.md](../docs/ADMIN-MASTER-REFERENCE.md)
>
> **Total Size**: ~2,500 lines of production-ready code
>
> **Status**: Copy-paste ready for Next.js 14 + PostgreSQL + Drizzle

---

## 📋 Table of Contents

### Part 1: Universal Base (Reference ADMIN-MASTER-REFERENCE.md)
1. [Color System](#1-color-system-from-admin-master-reference)
2. [Typography](#2-typography-from-admin-master-reference)
3. [Base Components](#3-base-components-from-admin-master-reference)
4. [Delete with Undo](#4-delete-with-undo-from-admin-master-reference)
5. [Modal Pattern](#5-modal-pattern-from-admin-master-reference)
6. [Theme Context](#6-theme-context-from-admin-master-reference)

### Part 2: ADMINX Extensions (New Content)
7. [Database Schema](#7-database-schema-adminx)
8. [Type Definitions](#8-type-definitions-adminx)
9. [NextAuth Configuration](#9-nextauth-configuration-adminx)
10. [Permission Middleware](#10-permission-middleware-adminx)
11. [Audit Logging System](#11-audit-logging-system-adminx)
12. [User CRUD API Routes](#12-user-crud-api-routes-adminx)
13. [Users List Page](#13-users-list-page-adminx)
14. [Create User Modal](#14-create-user-modal-adminx)
15. [Edit User Modal](#15-edit-user-modal-adminx)
16. [Delete User Dialog](#16-delete-user-dialog-adminx)
17. [Role Assignment UI](#17-role-assignment-ui-adminx)
18. [Audit Logs Page](#18-audit-logs-page-adminx)
19. [User Profile Page](#19-user-profile-page-adminx)
20. [Settings Page](#20-settings-page-adminx)
21. [Dashboard Home Stats](#21-dashboard-home-stats-adminx)

---

## Part 1: Universal Base

### Reference ADMIN-MASTER-REFERENCE.md

For the following universal patterns, **copy directly from** [ADMIN-MASTER-REFERENCE.md](../docs/ADMIN-MASTER-REFERENCE.md):

1. **Color System** (Section 1) - Semantic variables + accent color
2. **Typography** (Section 2) - Poppins font setup and scales
3. **Component Patterns** (Section 3) - Cards, buttons, inputs, glass effects
4. **Delete with Undo** (Section 4) - CountdownRing + deleteWithCountdown
5. **Modal Pattern** (Section 5) - Animated modal component
6. **ConfirmDialog Pattern** (Section 6) - Confirmation dialogs
7. **Theme Context** (Section 7) - Light/dark mode system
8. **Animation Patterns** (Section 8) - Framer Motion easing and timings
9. **API Route Patterns** (Section 9) - Basic patterns with auth checks
10. **Auth Helpers** (Section 10) - requireAuth, requireApiAuth
11. **Tailwind Config** (Section 11) - Complete configuration
12. **Dependencies** (Section 12) - Package list

**These sections are UNIVERSAL and work for any admin dashboard.**

---

## Part 2: ADMINX Extensions

### 7. Database Schema (ADMINX)

#### PostgreSQL Migrations

```sql
-- migrations/001_create_users_table.sql

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'user')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  avatar_url VARCHAR(500),
  metadata JSONB DEFAULT '{}'
);

-- Indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- migrations/002_create_audit_logs_table.sql

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for filtering and sorting
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

#### Drizzle ORM Schema

```typescript
// lib/db/schema/users.ts
import { pgTable, uuid, varchar, timestamp, jsonb, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().$type<'super_admin' | 'admin' | 'user'>(),
  status: varchar('status', { length: 50 }).notNull().default('active').$type<'active' | 'inactive' | 'suspended'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastLogin: timestamp('last_login'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  metadata: jsonb('metadata').default({})
}, (table) => ({
  roleIdx: index('idx_users_role').on(table.role),
  statusIdx: index('idx_users_status').on(table.status),
  emailIdx: index('idx_users_email').on(table.email),
  createdAtIdx: index('idx_users_created_at').on(table.createdAt)
}));

// lib/db/schema/audit-logs.ts
import { pgTable, uuid, varchar, timestamp, jsonb, index, text } from 'drizzle-orm/pg-core';
import { users } from './users';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id'),
  metadata: jsonb('metadata').default({}),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow()
}, (table) => ({
  userIdIdx: index('idx_audit_logs_user_id').on(table.userId),
  actionIdx: index('idx_audit_logs_action').on(table.action),
  entityIdx: index('idx_audit_logs_entity').on(table.entityType, table.entityId),
  createdAtIdx: index('idx_audit_logs_created_at').on(table.createdAt)
}));
```

---

### 8. Type Definitions (ADMINX)

```typescript
// types/user.ts

export type Role = 'super_admin' | 'admin' | 'user';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  avatarUrl: string | null;
  metadata: Record<string, any>;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  role: Role;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: Role;
  status?: UserStatus;
  avatarUrl?: string | null;
}

// types/audit-log.ts

export type AuditAction =
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'role.changed'
  | 'password.changed'
  | 'settings.updated';

export interface AuditLog {
  id: string;
  userId: string | null;
  action: AuditAction;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, any>;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export interface CreateAuditLogInput {
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
  request: Request;
}

// types/auth.ts

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

// types/role.ts

export const roleHierarchy: Record<Role, number> = {
  super_admin: 3,
  admin: 2,
  user: 1
};

export const roleLabels: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  user: 'User'
};

export const roleBadgeColors: Record<Role, string> = {
  super_admin: 'badge-accent',  // Green
  admin: 'badge-blue',           // Blue
  user: 'badge-slate'            // Gray
};
```

---

### 9. NextAuth Configuration (ADMINX)

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { users } from './db/schema/users';
import { eq } from 'drizzle-orm';
import type { Role } from '@/types/user';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        if (!user) {
          return null;
        }

        // Check if user is active
        if (user.status !== 'active') {
          throw new Error('Account is inactive or suspended');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValidPassword) {
          return null;
        }

        // Update last login
        await db
          .update(users)
          .set({ lastLogin: new Date() })
          .where(eq(users.id, user.id));

        // Return user (will be in token)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to token on sign in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role as Role;
      }
      return session;
    }
  }
};

// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

---

### 10. Permission Middleware (ADMINX)

```typescript
// lib/permissions.ts
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import type { Role } from '@/types/user';
import { roleHierarchy } from '@/types/role';

/**
 * Check if user has specific role or higher
 */
export function hasRole(session: Session | null, role: Role): boolean {
  if (!session?.user) return false;
  const userRole = (session.user as any).role as Role;
  if (!userRole) return false;

  return roleHierarchy[userRole] >= roleHierarchy[role];
}

/**
 * Require specific role for API routes (returns error response if unauthorized)
 */
export function requireRole(
  session: Session | null,
  role: Role
): NextResponse | null {
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const userRole = (session.user as any).role as Role;

  if (!userRole || roleHierarchy[userRole] < roleHierarchy[role]) {
    return NextResponse.json(
      { error: 'Forbidden - insufficient permissions' },
      { status: 403 }
    );
  }

  return null;
}

/**
 * Check if actor can manage target user based on role hierarchy
 * Rule: Can only manage users with LOWER hierarchy level
 */
export function canManageUser(actorRole: Role, targetRole: Role): boolean {
  return roleHierarchy[actorRole] > roleHierarchy[targetRole];
}

/**
 * Count users by role and status (for last admin protection)
 */
export async function countUsersBy Criteria(
  role?: Role,
  status?: 'active' | 'inactive' | 'suspended'
): Promise<number> {
  const { db } = await import('./db');
  const { users } = await import('./db/schema/users');
  const { eq, and, count } = await import('drizzle-orm');

  const conditions = [];
  if (role) conditions.push(eq(users.role, role));
  if (status) conditions.push(eq(users.status, status));

  const [result] = await db
    .select({ count: count() })
    .from(users)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return result.count;
}

/**
 * Check if deleting/demoting this user would leave zero super admins
 */
export async function isLastSuperAdmin(userId: string): Promise<boolean> {
  const { db } = await import('./db');
  const { users } = await import('./db/schema/users');
  const { eq, and } = await import('drizzle-orm');

  // Check if user is super admin
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user || user.role !== 'super_admin') {
    return false;
  }

  // Count active super admins
  const activeSuperAdminCount = await countUsersByCriteria('super_admin', 'active');

  return activeSuperAdminCount <= 1;
}
```

---

### 11. Audit Logging System (ADMINX)

```typescript
// lib/audit-logging.ts
import { db } from './db';
import { auditLogs } from './db/schema/audit-logs';
import type { CreateAuditLogInput } from '@/types/audit-log';

/**
 * Create audit log entry
 * Never throws - logs error and continues to prevent audit logging from breaking main operations
 */
export async function createAuditLog(input: CreateAuditLogInput): Promise<void> {
  try {
    // Extract IP address and user agent from request
    const ipAddress = getIpAddress(input.request);
    const userAgent = input.request.headers.get('user-agent');

    await db.insert(auditLogs).values({
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId || null,
      metadata: input.metadata || {},
      ipAddress,
      userAgent: userAgent || null
    });
  } catch (error) {
    // Log error but don't throw - audit logging should never break operations
    console.error('[Audit Log Error]', error);
  }
}

/**
 * Extract IP address from request (handles proxies)
 */
function getIpAddress(request: Request): string | null {
  // Try x-forwarded-for (behind proxy)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Try x-real-ip
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Try CF-Connecting-IP (Cloudflare)
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp;
  }

  return null;
}

// app/api/audit-logs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireRole } from '@/lib/permissions';
import { db } from '@/lib/db';
import { auditLogs } from '@/lib/db/schema/audit-logs';
import { users } from '@/lib/db/schema/users';
import { desc, eq, and, ilike, gte, lte } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  // Parse query params
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const userId = searchParams.get('userId');
  const entityType = searchParams.get('entityType');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const limit = parseInt(searchParams.get('limit') || '100');
  const offset = parseInt(searchParams.get('offset') || '0');

  // Build conditions
  const conditions = [];
  if (action) conditions.push(eq(auditLogs.action, action));
  if (userId) conditions.push(eq(auditLogs.userId, userId));
  if (entityType) conditions.push(eq(auditLogs.entityType, entityType));
  if (startDate) conditions.push(gte(auditLogs.createdAt, new Date(startDate)));
  if (endDate) conditions.push(lte(auditLogs.createdAt, new Date(endDate)));

  // Fetch logs with user join
  const logs = await db
    .select({
      id: auditLogs.id,
      action: auditLogs.action,
      entityType: auditLogs.entityType,
      entityId: auditLogs.entityId,
      metadata: auditLogs.metadata,
      ipAddress: auditLogs.ipAddress,
      userAgent: auditLogs.userAgent,
      createdAt: auditLogs.createdAt,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role
      }
    })
    .from(auditLogs)
    .leftJoin(users, eq(auditLogs.userId, users.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ logs, count: logs.length });
}
```

---

### 12. User CRUD API Routes (ADMINX)

#### List Users (GET /api/users)

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireRole } from '@/lib/permissions';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { eq, or, ilike, and, desc } from 'drizzle-orm';
import type { Role, UserStatus } from '@/types/user';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  // Parse query params
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') as Role | null;
  const status = searchParams.get('status') as UserStatus | null;
  const search = searchParams.get('search');

  // Build conditions
  const conditions = [];
  if (role) conditions.push(eq(users.role, role));
  if (status) conditions.push(eq(users.status, status));
  if (search) {
    conditions.push(
      or(
        ilike(users.name, `%${search}%`),
        ilike(users.email, `%${search}%`)
      )
    );
  }

  // Fetch users
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      lastLogin: users.lastLogin,
      avatarUrl: users.avatarUrl,
      metadata: users.metadata
    })
    .from(users)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(users.createdAt));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  const data = await request.json();

  // Validate
  const { z } = await import('zod');
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['super_admin', 'admin', 'user'])
  });

  const validated = schema.parse(data);

  // Check permission to create this role
  const actorRole = (session.user as any).role as Role;
  if (
    (validated.role === 'admin' || validated.role === 'super_admin') &&
    actorRole !== 'super_admin'
  ) {
    return NextResponse.json(
      { error: 'Only super admins can create admin/super_admin users' },
      { status: 403 }
    );
  }

  // Check if email already exists
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, validated.email))
    .limit(1);

  if (existing) {
    return NextResponse.json(
      { error: 'Email already exists' },
      { status: 400 }
    );
  }

  // Hash password
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash(validated.password, 12);

  // Create user
  const [newUser] = await db
    .insert(users)
    .values({
      email: validated.email,
      name: validated.name,
      passwordHash: hashedPassword,
      role: validated.role,
      status: 'active'
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      lastLogin: users.lastLogin,
      avatarUrl: users.avatarUrl,
      metadata: users.metadata
    });

  // Create audit log
  const { createAuditLog } = await import('@/lib/audit-logging');
  await createAuditLog({
    userId: (session.user as any).id,
    action: 'user.created',
    entityType: 'user',
    entityId: newUser.id,
    metadata: {
      email: newUser.email,
      role: newUser.role
    },
    request
  });

  return NextResponse.json(newUser, { status: 201 });
}
```

#### Single User Operations (GET/PUT/DELETE /api/users/[id])

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireRole, canManageUser, isLastSuperAdmin } from '@/lib/permissions';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { eq } from 'drizzle-orm';
import type { Role } from '@/types/user';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      lastLogin: users.lastLogin,
      avatarUrl: users.avatarUrl,
      metadata: users.metadata
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  const data = await request.json();

  // Get target user
  const [targetUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check permission to manage this user
  const actorRole = (session.user as any).role as Role;
  if (!canManageUser(actorRole, targetUser.role as Role)) {
    return NextResponse.json(
      { error: 'Cannot manage user with same or higher role' },
      { status: 403 }
    );
  }

  // If changing role, check permission
  if (data.role && data.role !== targetUser.role) {
    if ((data.role === 'admin' || data.role === 'super_admin') && actorRole !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only super admins can assign admin/super_admin roles' },
        { status: 403 }
      );
    }

    // Check if demoting last super admin
    if (targetUser.role === 'super_admin' && data.role !== 'super_admin') {
      const isLast = await isLastSuperAdmin(id);
      if (isLast) {
        return NextResponse.json(
          { error: 'Cannot demote the last super admin' },
          { status: 400 }
        );
      }
    }
  }

  // Update user
  const [updated] = await db
    .update(users)
    .set({
      name: data.name ?? targetUser.name,
      email: data.email ?? targetUser.email,
      role: data.role ?? targetUser.role,
      status: data.status ?? targetUser.status,
      avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : targetUser.avatarUrl,
      updatedAt: new Date()
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      lastLogin: users.lastLogin,
      avatarUrl: users.avatarUrl,
      metadata: users.metadata
    });

  // Create audit log if role changed
  if (data.role && data.role !== targetUser.role) {
    const { createAuditLog } = await import('@/lib/audit-logging');
    await createAuditLog({
      userId: (session.user as any).id,
      action: 'role.changed',
      entityType: 'user',
      entityId: id,
      metadata: {
        old_role: targetUser.role,
        new_role: data.role
      },
      request
    });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  // Get target user
  const [targetUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check permission
  const actorRole = (session.user as any).role as Role;
  if (!canManageUser(actorRole, targetUser.role as Role)) {
    return NextResponse.json(
      { error: 'Cannot delete user with same or higher role' },
      { status: 403 }
    );
  }

  // Last admin protection
  if (targetUser.role === 'super_admin') {
    const isLast = await isLastSuperAdmin(id);
    if (isLast) {
      return NextResponse.json(
        { error: 'Cannot delete the last super admin' },
        { status: 400 }
      );
    }
  }

  // Soft delete
  await db
    .update(users)
    .set({
      status: 'inactive',
      updatedAt: new Date()
    })
    .where(eq(users.id, id));

  // Create audit log
  const { createAuditLog } = await import('@/lib/audit-logging');
  await createAuditLog({
    userId: (session.user as any).id,
    action: 'user.deleted',
    entityType: 'user',
    entityId: id,
    metadata: {
      email: targetUser.email,
      role: targetUser.role
    },
    request
  });

  return NextResponse.json({ success: true });
}
```

---

### 13. Users List Page (ADMINX)

```typescript
// app/(dashboard)/users/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Plus, Filter } from 'lucide-react';
import { CreateUserModal } from '@/components/users/CreateUserModal';
import { EditUserModal } from '@/components/users/EditUserModal';
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog';
import { RoleBadge } from '@/components/users/RoleBadge';
import { StatusBadge } from '@/components/users/StatusBadge';
import type { User, Role, UserStatus } from '@/types/user';
import { motion } from 'framer-motion';

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    if (statusFilter !== 'all') params.set('status', statusFilter);

    const res = await fetch(`/api/users?${params.toString()}`);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-theme">Users</h1>
          <p className="text-sm text-theme-muted mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold text-black rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add User
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-theme-card border border-theme rounded-2xl p-6"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-meta" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-theme-input border border-theme rounded-lg pl-10 pr-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as Role | 'all')}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-theme-input border-b border-theme">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-theme-muted">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-theme-muted">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-theme-hover transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-theme">{user.name}</div>
                        <div className="text-xs text-theme-muted">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-theme-muted">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="px-3 py-1.5 text-xs font-medium text-theme-muted hover:text-theme hover:bg-theme-hover rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingUser(user)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={() => {
          setCreateModalOpen(false);
          fetchUsers();
        }}
      />

      {editingUser && (
        <EditUserModal
          isOpen={true}
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            setEditingUser(null);
            fetchUsers();
          }}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          isOpen={true}
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onSuccess={() => {
            setDeletingUser(null);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}
```

#### Role Badge Component

```typescript
// components/users/RoleBadge.tsx
import type { Role } from '@/types/user';
import { roleBadgeColors, roleLabels } from '@/types/role';

interface RoleBadgeProps {
  role: Role;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${roleBadgeColors[role]}`}>
      {roleLabels[role]}
    </span>
  );
}
```

#### Status Badge Component

```typescript
// components/users/StatusBadge.tsx
import type { UserStatus } from '@/types/user';

interface StatusBadgeProps {
  status: UserStatus;
}

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge-success' },
  inactive: { label: 'Inactive', className: 'badge-slate' },
  suspended: { label: 'Suspended', className: 'badge-warning' }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
```

---

### 14. Create User Modal (ADMINX)

```typescript
// components/users/CreateUserModal.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Modal } from '@/components/Modal';
import { toast } from 'sonner';
import type { Role } from '@/types/user';
import { Loader2 } from 'lucide-react';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateUserModal({ isOpen, onClose, onSuccess }: CreateUserModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'user' as Role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      toast.success('User created successfully');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const userRole = (session?.user as any)?.role as Role;
  const canCreateAdmin = userRole === 'super_admin';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create User">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            placeholder="Minimum 8 characters"
          />
          <p className="text-xs text-theme-meta mt-1">
            Must be at least 8 characters long
          </p>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors"
          >
            <option value="user">User</option>
            <option value="admin" disabled={!canCreateAdmin}>
              Admin {!canCreateAdmin && '(Super Admin only)'}
            </option>
            <option value="super_admin" disabled={!canCreateAdmin}>
              Super Admin {!canCreateAdmin && '(Super Admin only)'}
            </option>
          </select>
          {!canCreateAdmin && (
            <p className="text-xs text-theme-meta mt-1">
              Only super admins can create admin users
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium border border-theme bg-theme-input rounded-lg hover:bg-theme-hover transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold bg-accent text-black rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create User
          </button>
        </div>
      </form>
    </Modal>
  );
}
```

---

### 15. Edit User Modal (ADMINX)

```typescript
// components/users/EditUserModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Modal } from '@/components/Modal';
import { toast } from 'sonner';
import type { User, Role, UserStatus } from '@/types/user';
import { Loader2 } from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditUserModal({ isOpen, user, onClose, onSuccess }: EditUserModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      toast.success('User updated successfully');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const userRole = (session?.user as any)?.role as Role;
  const canEditRole = userRole === 'super_admin' || user.role === 'user';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
            disabled={!canEditRole}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          {!canEditRole && (
            <p className="text-xs text-theme-meta mt-1">
              You cannot change the role of users with same or higher role
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium border border-theme bg-theme-input rounded-lg hover:bg-theme-hover transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold bg-accent text-black rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
```

---

### 16. Delete User Dialog (ADMINX)

```typescript
// components/users/DeleteUserDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { deleteWithCountdown } from '@/lib/delete-with-undo';
import { toast } from 'sonner';
import type { User } from '@/types/user';

interface DeleteUserDialogProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteUserDialog({ isOpen, user, onClose, onSuccess }: DeleteUserDialogProps) {
  const [superAdminCount, setSuperAdminCount] = useState<number>(0);

  useEffect(() => {
    if (user.role === 'super_admin') {
      // Fetch super admin count
      fetch('/api/users?role=super_admin&status=active')
        .then(res => res.json())
        .then(data => setSuperAdminCount(data.length));
    }
  }, [user.role]);

  const handleDelete = () => {
    // Check last admin protection
    if (user.role === 'super_admin' && superAdminCount === 1) {
      toast.error('Cannot delete the last super admin');
      onClose();
      return;
    }

    // Close modal immediately
    onClose();

    // Use delete with undo pattern
    deleteWithCountdown({
      message: `${user.name} will be deleted`,
      toastId: `delete-user-${user.id}`,
      duration: 3000,
      onDelete: async () => {
        const res = await fetch(`/api/users/${user.id}`, {
          method: 'DELETE'
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to delete user');
        }

        toast.success(`${user.name} deleted successfully`);
        onSuccess();
      },
      onUndo: () => {
        toast.success('Delete cancelled');
      }
    });
  };

  const isLastSuperAdmin = user.role === 'super_admin' && superAdminCount === 1;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title={isLastSuperAdmin ? 'Cannot Delete' : 'Delete User'}
      message={
        isLastSuperAdmin
          ? 'This is the last super admin. You cannot delete it to prevent system lockout.'
          : `Are you sure you want to delete ${user.name}? This action can be undone within 3 seconds.`
      }
      confirmText={isLastSuperAdmin ? 'OK' : 'Delete User'}
      cancelText={isLastSuperAdmin ? undefined : 'Cancel'}
      variant={isLastSuperAdmin ? 'warning' : 'danger'}
    />
  );
}
```

---

### 17. Role Assignment UI (ADMINX)

```typescript
// components/users/RoleDropdown.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import type { User, Role } from '@/types/user';
import { roleLabels, roleHierarchy } from '@/types/role';
import { ChevronDown, Check } from 'lucide-react';

interface RoleDropdownProps {
  user: User;
  onUpdate: () => void;
}

export function RoleDropdown({ user, onUpdate }: RoleDropdownProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userRole = (session?.user as any)?.role as Role;
  const canChangeRole = roleHierarchy[userRole] > roleHierarchy[user.role];

  const handleRoleChange = async (newRole: Role) => {
    if (newRole === user.role) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update role');
      }

      toast.success(`Role changed to ${roleLabels[newRole]}`);
      onUpdate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update role');
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const roles: Role[] = ['super_admin', 'admin', 'user'];

  if (!canChangeRole) {
    return <span className="text-sm text-theme-muted">{roleLabels[user.role]}</span>;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-theme hover:bg-theme-hover rounded-lg transition-colors"
      >
        {roleLabels[user.role]}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-theme-card border border-theme rounded-lg shadow-lg z-20 py-1">
            {roles.map((role) => {
              const canAssignThisRole = userRole === 'super_admin' || role === 'user';
              const isCurrentRole = role === user.role;

              return (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  disabled={!canAssignThisRole || isCurrentRole}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-theme hover:bg-theme-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{roleLabels[role]}</span>
                  {isCurrentRole && <Check className="w-4 h-4 text-accent" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
```

---

### 18. Audit Logs Page (ADMINX)

```typescript
// app/(dashboard)/audit-logs/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import type { AuditLog, AuditAction } from '@/types/audit-log';
import { format } from 'date-fns';

interface AuditLogWithUser extends AuditLog {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState<AuditAction | 'all'>('all');
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, limit]);

  const fetchLogs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (actionFilter !== 'all') params.set('action', actionFilter);
    params.set('limit', limit.toString());

    const res = await fetch(`/api/audit-logs?${params.toString()}`);
    const data = await res.json();
    setLogs(data.logs);
    setLoading(false);
  };

  const getActionBadgeClass = (action: AuditAction) => {
    if (action.includes('created')) return 'badge-success';
    if (action.includes('deleted')) return 'badge-danger';
    if (action.includes('changed')) return 'badge-warning';
    return 'badge-blue';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-theme">Audit Logs</h1>
        <p className="text-sm text-theme-muted mt-1">
          Track all system activities and changes
        </p>
      </div>

      {/* Filters */}
      <div className="bg-theme-card border border-theme rounded-2xl p-6"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value as AuditAction | 'all')}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors"
          >
            <option value="all">All Actions</option>
            <option value="user.created">User Created</option>
            <option value="user.updated">User Updated</option>
            <option value="user.deleted">User Deleted</option>
            <option value="role.changed">Role Changed</option>
            <option value="password.changed">Password Changed</option>
            <option value="settings.updated">Settings Updated</option>
          </select>

          {/* Limit */}
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme focus:border-accent/50 focus:outline-none transition-colors"
          >
            <option value={50}>Last 50 entries</option>
            <option value={100}>Last 100 entries</option>
            <option value={250}>Last 250 entries</option>
            <option value={500}>Last 500 entries</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-theme-input border-b border-theme">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-theme-muted">
                    Loading audit logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-theme-muted">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-theme-hover transition-colors">
                    <td className="px-6 py-4 text-sm text-theme-muted whitespace-nowrap">
                      {format(new Date(log.createdAt), 'MMM d, yyyy HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4">
                      {log.user ? (
                        <div>
                          <div className="text-sm font-medium text-theme">{log.user.name}</div>
                          <div className="text-xs text-theme-muted">{log.user.email}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-theme-muted">System</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getActionBadgeClass(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-theme">
                      {Object.keys(log.metadata).length > 0 ? (
                        <pre className="text-xs text-theme-muted max-w-md overflow-x-auto">
                          {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                      ) : (
                        <span className="text-theme-muted">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-theme-muted">
                      {log.ipAddress || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

---

### 19. User Profile Page (ADMINX)

```typescript
// app/(dashboard)/profile/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Loader2, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = (session?.user as any)?.id;
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      toast.success('Profile updated successfully');
      await update();  // Refresh session
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const userId = (session?.user as any)?.id;
      const res = await fetch(`/api/users/${userId}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-theme">Profile</h1>
        <p className="text-sm text-theme-muted mt-1">
          Manage your account settings
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-theme-card border border-theme rounded-2xl p-6"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <h2 className="text-lg font-semibold text-theme mb-4">Profile Information</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 text-sm font-semibold bg-accent text-black rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </motion.button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-theme-card border border-theme rounded-2xl p-6"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <h2 className="text-lg font-semibold text-theme mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            />
            <p className="text-xs text-theme-meta mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 text-sm font-semibold bg-accent text-black rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Change Password
          </motion.button>
        </form>
      </div>
    </div>
  );
}
```

---

### 20. Settings Page (ADMINX)

```typescript
// app/(dashboard)/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { requireRole } from '@/lib/permissions';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    appName: 'My App',
    supportEmail: 'support@example.com',
    allowSignups: true,
    requireEmailVerification: false
  });

  const userRole = (session?.user as any)?.role;
  const canEditSettings = userRole === 'super_admin';

  useEffect(() => {
    // Fetch current settings
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditSettings) {
      toast.error('Only super admins can change system settings');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-theme">Settings</h1>
        <p className="text-sm text-theme-muted mt-1">
          Configure system-wide settings
        </p>
      </div>

      {!canEditSettings && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Only super admins can change system settings
          </p>
        </div>
      )}

      {/* General Settings */}
      <div className="bg-theme-card border border-theme rounded-2xl p-6"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <h2 className="text-lg font-semibold text-theme mb-4">General Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* App Name */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              Application Name
            </label>
            <input
              type="text"
              required
              disabled={!canEditSettings}
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Support Email */}
          <div>
            <label className="block text-sm font-medium text-theme-muted mb-1">
              Support Email
            </label>
            <input
              type="email"
              required
              disabled={!canEditSettings}
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-accent/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Allow Signups */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-theme">
                Allow Public Signups
              </label>
              <p className="text-xs text-theme-muted mt-1">
                Let new users create accounts
              </p>
            </div>
            <button
              type="button"
              disabled={!canEditSettings}
              onClick={() => setSettings({ ...settings, allowSignups: !settings.allowSignups })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.allowSignups ? 'bg-accent' : 'bg-theme-input'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.allowSignups ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Require Email Verification */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-theme">
                Require Email Verification
              </label>
              <p className="text-xs text-theme-muted mt-1">
                Users must verify email before accessing the system
              </p>
            </div>
            <button
              type="button"
              disabled={!canEditSettings}
              onClick={() => setSettings({ ...settings, requireEmailVerification: !settings.requireEmailVerification })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.requireEmailVerification ? 'bg-accent' : 'bg-theme-input'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Submit */}
          {canEditSettings && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 text-sm font-semibold bg-accent text-black rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Settings
            </motion.button>
          )}
        </form>
      </div>
    </div>
  );
}
```

---

### 21. Dashboard Home Stats (ADMINX)

```typescript
// app/(dashboard)/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  superAdmins: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    superAdmins: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      color: 'text-[#20ED8A]',
      bgColor: 'bg-[#20ED8A]/10'
    },
    {
      label: 'Inactive Users',
      value: stats.inactiveUsers,
      icon: UserX,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      label: 'Super Admins',
      value: stats.superAdmins,
      icon: Activity,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-theme">Dashboard</h1>
        <p className="text-sm text-theme-muted mt-1">
          Welcome back! Here's an overview of your system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-theme-card border border-theme rounded-2xl p-6"
              style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-theme-muted">{stat.label}</p>
                  <p className="text-3xl font-bold text-theme mt-2">
                    {loading ? '...' : stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-theme-card border border-theme rounded-2xl p-6"
        style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
        <h2 className="text-lg font-semibold text-theme mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.a
            href="/users"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-theme-input hover:bg-theme-hover rounded-lg transition-colors"
          >
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-theme">Manage Users</p>
              <p className="text-xs text-theme-muted">View and edit all users</p>
            </div>
          </motion.a>

          <motion.a
            href="/audit-logs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-theme-input hover:bg-theme-hover rounded-lg transition-colors"
          >
            <Activity className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-theme">View Audit Logs</p>
              <p className="text-xs text-theme-muted">Track system activities</p>
            </div>
          </motion.a>

          <motion.a
            href="/settings"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-theme-input hover:bg-theme-hover rounded-lg transition-colors"
          >
            <Activity className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-theme">System Settings</p>
              <p className="text-xs text-theme-muted">Configure your app</p>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
}

// app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requireRole } from '@/lib/permissions';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { eq, count, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  // Count total users
  const [totalResult] = await db
    .select({ count: count() })
    .from(users);

  // Count active users
  const [activeResult] = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.status, 'active'));

  // Count inactive users
  const [inactiveResult] = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.status, 'inactive'));

  // Count super admins
  const [superAdminResult] = await db
    .select({ count: count() })
    .from(users)
    .where(and(
      eq(users.role, 'super_admin'),
      eq(users.status, 'active')
    ));

  return NextResponse.json({
    totalUsers: totalResult.count,
    activeUsers: activeResult.count,
    inactiveUsers: inactiveResult.count,
    superAdmins: superAdminResult.count
  });
}
```

---

## Quick Start

### Installation

```bash
# 1. Install dependencies
pnpm add next-auth@^4 bcryptjs drizzle-orm @neondatabase/serverless zod date-fns framer-motion sonner lucide-react

pnpm add -D @types/bcryptjs drizzle-kit

# 2. Create database tables
psql -d your_database -f migrations/001_create_users_table.sql
psql -d your_database -f migrations/002_create_audit_logs_table.sql

# 3. Configure environment variables
DATABASE_URL=your_postgresql_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# 4. Copy files from this template
# - Copy all lib/ files
# - Copy all components/ files
# - Copy all app/ files
# - Copy types/ files

# 5. Start development
pnpm dev
```

---

## Summary

This template provides **complete, production-ready code** for building a super-admin system with:

✅ **Foundation** (from ADMIN-MASTER-REFERENCE.md)
- Color system, typography, base components
- Modal, ConfirmDialog, Delete with Undo patterns
- Theme context, animations

✅ **ADMINX Extensions**
- User management (CRUD)
- Role-based access control (3-tier hierarchy)
- Permission middleware
- Audit logging system
- Security patterns (last admin protection, soft deletes, bcrypt)

✅ **9 Core Pages**
- Dashboard home with stats
- Users list with search/filter
- Create/Edit/Delete user modals
- Role assignment UI
- Audit logs page
- User profile page
- Settings page

**Total:** ~2,500 lines of copy-paste ready code

---

**Framework:** ADMINX
**Last Updated:** 2026-01-15
**Version:** 1.0
