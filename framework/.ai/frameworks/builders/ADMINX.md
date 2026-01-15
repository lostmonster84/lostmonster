# ADMINX Framework

> **Super-Admin System - User Management, RBAC, and Audit Logging**
>
> A complete framework for building production-grade super-admin systems with role-based access control, audit trails, and enterprise security patterns.

---

## What is ADMINX?

**ADMINX** transforms any application into a secure, multi-user system with:
- **User Management** - Complete CRUD for users with soft deletes
- **Role-Based Access Control** - 3-tier hierarchy (Super Admin → Admin → User)
- **Permission Middleware** - Server-side validation for all sensitive operations
- **Audit Logging** - Comprehensive trail of who did what, when
- **Security Patterns** - Last admin protection, bcrypt hashing, rate limiting

**The Rule:** ADMINX manages WHO can access the system. Combine with CRUDX to manage WHAT exists (content).

**Foundation:** ADMINX extends [ADMIN-MASTER-REFERENCE.md](../../docs/ADMIN-MASTER-REFERENCE.md) with super-admin specific features.

---

## Why ADMINX Exists

### The Gap It Fills

| Tool | Purpose | Limitation |
|------|---------|------------|
| NextAuth.js | Authentication (login/logout) | Doesn't provide user management UI or RBAC |
| Generic Admin | Dashboard layouts and components | No built-in user/permission management |
| Manual Implementation | Custom auth + admin | Reinventing security patterns from scratch |

**ADMINX sits between "users can log in" and "admins can manage users"**

It's the **user management layer** - the system that lets super admins control WHO has access.

### What Makes ADMINX Different

1. **Security-first by design** - RBAC, audit logs, last admin protection
2. **Production patterns included** - Delete with undo, soft deletes, IP tracking
3. **Framework-compatible** - Extends ADMIN-MASTER-REFERENCE.md, works with CRUDX
4. **Role hierarchy enforced** - Permission checks built into every operation
5. **Compliance-ready** - Audit logs for SOC2, GDPR, HIPAA requirements

---

## When to Use ADMINX

### Use ADMINX For

- **Multi-user applications** - Any app with more than one user type
- **SaaS platforms** - B2B/B2C products requiring user management
- **Internal tools** - Company dashboards with role-based access
- **Compliance requirements** - SOC2, GDPR, HIPAA audit trails
- **Team management** - Apps where admins manage team members
- **Enterprise applications** - Complex permission hierarchies

### Skip ADMINX For

- **Single-user apps** - Personal projects, solo tools
- **Public-facing sites** - No admin area needed
- **Simple auth only** - Just need login/logout (use NextAuth.js directly)
- **Read-only dashboards** - No user management required

---

## The ADMINX Architecture

### 3-Tier Role Hierarchy

```typescript
const roleHierarchy = {
  super_admin: 3,  // Can manage ALL users (including admins)
  admin: 2,        // Can manage regular users only
  user: 1          // Can only manage own profile
};

// Permission rule: Can manage if actorRole > targetRole
function canManageUser(actorRole: Role, targetRole: Role): boolean {
  return roleHierarchy[actorRole] > roleHierarchy[targetRole];
}
```

**Examples:**
- ✅ Super Admin can create/edit/delete Admins
- ✅ Admin can create/edit/delete Users
- ❌ Admin CANNOT edit/delete Super Admins
- ❌ User CANNOT manage anyone else

### Database Schema

**Users Table:**
```sql
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
```

**Audit Logs Table:**
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL, -- 'user.created', 'user.updated', 'role.changed'
  entity_type VARCHAR(50) NOT NULL, -- 'user', 'settings'
  entity_id UUID,
  metadata JSONB DEFAULT '{}', -- { "old_role": "user", "new_role": "admin" }
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### The 9 Core Features

1. **Dashboard Home** - Stats cards (total users, active, by role, recent activity)
2. **Users List Page** - Searchable, filterable DataTable
3. **Create User** - Modal with email, name, password, role selection
4. **Edit User** - Pre-filled modal with validation
5. **Delete User** - Undo countdown + last admin protection
6. **Role Assignment** - Dropdown with RBAC checks
7. **Audit Logs Page** - Filterable table (who did what, when)
8. **User Profile** - Self-service editing
9. **Settings Page** - System configuration

---

## How to Invoke ADMINX

### Command

```
ADMINX
```

or

```
ADMINX: [specific implementation context]
```

### Examples

```
ADMINX
```
→ Generates complete super-admin system with all 9 features

```
ADMINX: add user management to existing Next.js app
```
→ Tailored implementation for existing codebase

```
ADMINX + CRUDX: build complete SaaS admin
```
→ User management + content management combined

### What Happens Next

1. **Schema Setup** - Create users and audit_logs tables
2. **Auth Configuration** - Extend NextAuth with role in JWT
3. **Permission Middleware** - Build hasRole, requireRole, canManageUser helpers
4. **User CRUD** - Implement all 5 endpoints with RBAC + audit
5. **Admin UI** - Build all 9 pages following ADMIN-MASTER-REFERENCE.md patterns
6. **Security Patterns** - Last admin protection, soft deletes, audit logging
7. **Testing** - Verify permission checks, audit logging, UI responsiveness

---

## The ADMINX Stack

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL (Neon, Supabase, or PlanetScale)
- **ORM:** Drizzle ORM (TypeScript-first)
- **Auth:** NextAuth.js v4 with JWT sessions
- **Styling:** Tailwind CSS (following ADMIN-MASTER-REFERENCE.md)
- **Validation:** Zod schemas
- **Password Hashing:** bcryptjs (cost factor 12)
- **Date Handling:** date-fns

### File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   ├── route.ts          # GET list, POST create (with RBAC)
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE (with RBAC + audit)
│   │   ├── audit-logs/
│   │   │   └── route.ts          # GET with filters
│   │   └── auth/[...nextauth]/
│   │       └── route.ts          # NextAuth with role in JWT
│   ├── (dashboard)/
│   │   ├── users/
│   │   │   └── page.tsx          # Users list + CRUD modals
│   │   ├── audit-logs/
│   │   │   └── page.tsx          # Audit logs table
│   │   ├── profile/
│   │   │   └── page.tsx          # User profile editing
│   │   └── settings/
│   │       └── page.tsx          # System settings
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Modal.tsx                  # From ADMIN-MASTER-REFERENCE.md
│   ├── ConfirmDialog.tsx          # From ADMIN-MASTER-REFERENCE.md
│   ├── CountdownRing.tsx          # From ADMIN-MASTER-REFERENCE.md
│   ├── users/
│   │   ├── UsersList.tsx
│   │   ├── CreateUserModal.tsx
│   │   ├── EditUserModal.tsx
│   │   ├── DeleteUserDialog.tsx
│   │   └── RoleDropdown.tsx
│   └── audit-logs/
│       └── AuditLogsTable.tsx
└── lib/
    ├── auth.ts                    # NextAuth config with role
    ├── auth-helpers.ts            # requireAuth, requireApiAuth
    ├── permissions.ts             # hasRole, requireRole, canManageUser
    ├── audit-logging.ts           # createAuditLog utility
    ├── db.ts                      # Database connection
    └── delete-with-undo.ts        # From ADMIN-MASTER-REFERENCE.md
```

---

## ADMINX Security Patterns

### 1. Server-Side Permission Validation

**Always** validate permissions in API routes, **never** trust client-side checks:

```typescript
// ❌ WRONG: Client-side only
if (session.user.role === 'super_admin') {
  await deleteUser(id);  // Client can bypass this!
}

// ✅ CORRECT: Server-side in API route
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;  // 401/403 response

  // Additional check for role hierarchy
  const targetUser = await getUser(params.id);
  if (!canManageUser(session.user.role, targetUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Safe to proceed
  await deleteUser(params.id);
}
```

### 2. Last Super Admin Protection

**Never** allow deletion or demotion of the last super admin:

```typescript
async function deleteUser(userId: string) {
  const user = await getUserById(userId);

  // Check if deleting last super admin
  if (user.role === 'super_admin') {
    const superAdminCount = await db
      .select({ count: count() })
      .from(users)
      .where(and(
        eq(users.role, 'super_admin'),
        eq(users.status, 'active')
      ));

    if (superAdminCount[0].count <= 1) {
      throw new Error('Cannot delete the last super admin');
    }
  }

  // Safe to delete
  await db
    .update(users)
    .set({ status: 'inactive' })  // Soft delete
    .where(eq(users.id, userId));
}
```

### 3. Comprehensive Audit Logging

Log **all** sensitive operations with full context:

```typescript
// After creating user
await createAuditLog({
  userId: session.user.id,
  action: 'user.created',
  entityType: 'user',
  entityId: newUser.id,
  metadata: {
    email: newUser.email,
    role: newUser.role,
  },
  request,  // Extracts IP and user agent
});

// After changing role
await createAuditLog({
  userId: session.user.id,
  action: 'role.changed',
  entityType: 'user',
  entityId: targetUser.id,
  metadata: {
    old_role: targetUser.role,
    new_role: newRole,
  },
  request,
});
```

**Audit log actions:**
- `user.created`, `user.updated`, `user.deleted`
- `role.changed`
- `password.changed`
- `settings.updated`

### 4. Soft Deletes

Never permanently delete users - set status to 'inactive':

```typescript
// ❌ WRONG: Hard delete
await db.delete(users).where(eq(users.id, userId));

// ✅ CORRECT: Soft delete
await db
  .update(users)
  .set({
    status: 'inactive',
    updated_at: new Date()
  })
  .where(eq(users.id, userId));
```

**Benefits:**
- Preserves audit trail
- Allows account recovery
- Maintains referential integrity

### 5. Password Security

```typescript
import bcrypt from 'bcryptjs';

// Hash passwords with cost factor 12
const hashedPassword = await bcrypt.hash(password, 12);

// Verify passwords
const isValid = await bcrypt.compare(password, user.password_hash);

// NEVER return password_hash in API responses
const { password_hash, ...safeUser } = user;
return NextResponse.json(safeUser);
```

---

## ADMINX + Other Frameworks

### ADMINX + CRUDX (Recommended Combo)

**This is the primary use case.** Combine user management with content management:

```
Step 1: ADMINX
┌────────────────────────────────────────┐
│ Implement user management system       │
│ - Users can log in                     │
│ - Admins can manage users              │
│ - Audit logs track all changes         │
└────────────────────────────────────────┘
                    ↓
Step 2: CRUDX
┌────────────────────────────────────────┐
│ Implement content management           │
│ - Database schemas for content         │
│ - API routes for CRUD operations       │
│ - Admin UI for managing content        │
│ - Public-facing display components     │
└────────────────────────────────────────┘
                    ↓
Result: Complete SaaS
┌────────────────────────────────────────┐
│ User management + content management   │
│ = Production-ready SaaS platform       │
└────────────────────────────────────────┘
```

**Example:**
```
1. ADMINX: Blog Platform User Management
   → Super admin manages writers and editors
   → Audit logs track who published what

2. CRUDX: Blog Content Management
   → Writers create posts
   → Editors review and publish
   → Public sees published content

3. Result: Multi-user blog platform with RBAC
```

### ADMINX + PLANX

Use PLANX for systematic execution of ADMINX implementation:

```
ADMINX with PLANX:
1. Define requirements (ADMINX features needed)
2. PLANX: Break into 10 milestones
   └─ Each milestone has atomic todos
3. Execute: Check off todos, complete milestones
4. Feature done when all checked
```

### ADMINX + DARKX

Add dark mode support to the admin system:

```
ADMINX + DARKX:
1. ADMINX: Build user management system
2. DARKX: Add dark mode theme support
3. Result: Admin system with light/dark mode
```

### ADMINX Standalone

For apps that **only** need user management (no complex content):

```
ADMINX: internal company dashboard
```

Use standalone when:
- Simple internal tools
- Team management apps
- User directory systems
- Permission management only

---

## Permission Middleware Patterns

### hasRole - Check if User Has Specific Role

```typescript
// lib/permissions.ts
export function hasRole(session: Session | null, role: Role): boolean {
  if (!session?.user?.role) return false;
  return roleHierarchy[session.user.role] >= roleHierarchy[role];
}

// Usage in component
if (hasRole(session, 'admin')) {
  // Show admin-only UI
}
```

### requireRole - API Route Protection

```typescript
export function requireRole(session: Session | null, role: Role): NextResponse | null {
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasRole(session, role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;  // No error, proceed
}

// Usage in API route
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  // Safe to proceed
  // ...
}
```

### canManageUser - Role Hierarchy Check

```typescript
export function canManageUser(actorRole: Role, targetRole: Role): boolean {
  return roleHierarchy[actorRole] > roleHierarchy[targetRole];
}

// Usage in API route
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const targetUser = await getUser(params.id);

  if (!canManageUser(session.user.role, targetUser.role)) {
    return NextResponse.json({ error: 'Cannot manage user with same or higher role' }, { status: 403 });
  }

  // Safe to update
  // ...
}
```

---

## Delete with Undo Pattern (from ADMIN-MASTER-REFERENCE.md)

ADMINX leverages the **deleteWithCountdown** pattern for user deletion:

```typescript
const handleDeleteUser = (user: User) => {
  // Check last admin protection first
  if (user.role === 'super_admin' && superAdminCount === 1) {
    toast.error('Cannot delete the last super admin');
    return;
  }

  // Optimistic UI update
  setUsers(prev => prev.filter(u => u.id !== user.id));

  deleteWithCountdown({
    message: `${user.name} will be deleted`,
    toastId: `delete-user-${user.id}`,
    duration: 3000,
    onDelete: async () => {
      await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
      toast.success(`${user.name} deleted`);
    },
    onUndo: () => {
      setUsers(prev => [...prev, user]);
      toast.success(`Delete cancelled`);
    },
  });
};
```

**Features:**
- 3-second countdown with visual ring
- Undo button during countdown
- Optimistic UI (instant feedback)
- Rollback on error
- Last admin check before delete

---

## API Route Patterns

### List Users (GET /api/users)

```typescript
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  // Parse query params
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  // Build query
  let query = db.select().from(users);

  if (role) {
    query = query.where(eq(users.role, role));
  }

  if (status) {
    query = query.where(eq(users.status, status));
  }

  if (search) {
    query = query.where(
      or(
        ilike(users.name, `%${search}%`),
        ilike(users.email, `%${search}%`)
      )
    );
  }

  const result = await query;

  // Remove password hashes
  const safeUsers = result.map(({ password_hash, ...user }) => user);

  return NextResponse.json(safeUsers);
}
```

### Create User (POST /api/users)

```typescript
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  const data = await request.json();

  // Validate
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(8),
    role: z.enum(['super_admin', 'admin', 'user']),
  });

  const validated = schema.parse(data);

  // Check permission to create this role
  if ((validated.role === 'admin' || validated.role === 'super_admin') &&
      session.user.role !== 'super_admin') {
    return NextResponse.json({ error: 'Only super admins can create admin users' }, { status: 403 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(validated.password, 12);

  // Create user
  const [newUser] = await db
    .insert(users)
    .values({
      email: validated.email,
      name: validated.name,
      password_hash: hashedPassword,
      role: validated.role,
    })
    .returning();

  // Audit log
  await createAuditLog({
    userId: session.user.id,
    action: 'user.created',
    entityType: 'user',
    entityId: newUser.id,
    metadata: { email: newUser.email, role: newUser.role },
    request,
  });

  // Remove password hash
  const { password_hash, ...safeUser } = newUser;

  return NextResponse.json(safeUser, { status: 201 });
}
```

### Update User (PUT /api/users/[id])

```typescript
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  const data = await request.json();
  const targetUser = await getUserById(id);

  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check permission to manage this user
  if (!canManageUser(session.user.role, targetUser.role)) {
    return NextResponse.json({ error: 'Cannot manage user with same or higher role' }, { status: 403 });
  }

  // Update user
  const [updated] = await db
    .update(users)
    .set({
      name: data.name ?? targetUser.name,
      email: data.email ?? targetUser.email,
      role: data.role ?? targetUser.role,
      updated_at: new Date(),
    })
    .where(eq(users.id, id))
    .returning();

  // Audit log if role changed
  if (data.role && data.role !== targetUser.role) {
    await createAuditLog({
      userId: session.user.id,
      action: 'role.changed',
      entityType: 'user',
      entityId: id,
      metadata: {
        old_role: targetUser.role,
        new_role: data.role,
      },
      request,
    });
  }

  const { password_hash, ...safeUser } = updated;
  return NextResponse.json(safeUser);
}
```

### Delete User (DELETE /api/users/[id])

```typescript
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const permissionError = requireRole(session, 'admin');
  if (permissionError) return permissionError;

  const targetUser = await getUserById(id);

  if (!targetUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check permission
  if (!canManageUser(session.user.role, targetUser.role)) {
    return NextResponse.json({ error: 'Cannot delete user with same or higher role' }, { status: 403 });
  }

  // Last admin protection
  if (targetUser.role === 'super_admin') {
    const superAdminCount = await db
      .select({ count: count() })
      .from(users)
      .where(and(
        eq(users.role, 'super_admin'),
        eq(users.status, 'active')
      ));

    if (superAdminCount[0].count <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last super admin' }, { status: 400 });
    }
  }

  // Soft delete
  await db
    .update(users)
    .set({ status: 'inactive', updated_at: new Date() })
    .where(eq(users.id, id));

  // Audit log
  await createAuditLog({
    userId: session.user.id,
    action: 'user.deleted',
    entityType: 'user',
    entityId: id,
    metadata: {
      email: targetUser.email,
      role: targetUser.role,
    },
    request,
  });

  return NextResponse.json({ success: true });
}
```

---

## Anti-Patterns (Avoid These)

### Implementation Anti-Patterns

- **Client-side permission checks only** - Always validate server-side
- **Hardcoded admin emails** - Use database roles
- **No audit trail** - Compliance requires logs
- **Hard deletes** - Use soft deletes (status='inactive')
- **Deleting last super admin** - Always protect
- **Password in responses** - Never return password_hash
- **Overly complex permissions** - Start simple (3 roles)

### Security Anti-Patterns

- **Trusting client role** - Validate in API route
- **Missing rate limiting** - Add to sensitive endpoints
- **Weak passwords** - Require min 8 chars, complexity
- **No IP tracking** - Log IP and user agent
- **Synchronous audit logging** - Use try/catch to prevent breaks

---

## Summary

**ADMINX = Super-Admin System Framework**

### Trigger
```
ADMINX
```
or
```
ADMINX: [implementation context]
```

### Output
Complete super-admin system with:
- 3-tier role hierarchy (Super Admin → Admin → User)
- 9 core features (dashboard, users, audit logs, profile, settings)
- Permission middleware (hasRole, requireRole, canManageUser)
- Audit logging (comprehensive trail)
- Security patterns (last admin protection, soft deletes, bcrypt)

### Tech Stack
- Next.js 14, PostgreSQL, Drizzle ORM, NextAuth.js, Tailwind CSS

### Key Differentiator
Manages **WHO** can access (users, roles, permissions). Combine with CRUDX to manage **WHAT** exists (content, data).

### Integration
- **ADMINX + CRUDX**: Complete SaaS (most common)
- **ADMINX + PLANX**: Systematic implementation
- **ADMINX + DARKX**: Dark mode support
- **ADMINX Standalone**: User management only

### Foundation
Extends [ADMIN-MASTER-REFERENCE.md](../../docs/ADMIN-MASTER-REFERENCE.md) with super-admin features.

---

**Framework Status:** Production-ready
**Last Updated:** 2026-01-15
**Version:** 1.0
**Framework Number:** 17th universal framework
