# PLANX: ADMINX Super-Admin System

> **Build a production-ready super-admin system with user management, RBAC, and audit logging**
>
> **Reference:** [ADMINX-TEMPLATE.md](ADMINX-TEMPLATE.md)
>
> **Estimated Effort:** 5-7 days for MVP
> **Complexity:** Medium-High

---

## Pre-Build Checklist

Before starting, confirm:

- [ ] Next.js 14+ project initialized with TypeScript
- [ ] Database provider selected (Neon, Supabase, or PlanetScale)
- [ ] Authentication method confirmed (NextAuth.js recommended)
- [ ] Required features list reviewed (all 9 MVP features)
- [ ] ADMIN-MASTER-REFERENCE.md patterns understood

---

## Milestone 1: Foundation & Database Schema (Day 1)

### Setup

| Todo | Status | Notes |
|------|--------|-------|
| Initialize or verify Next.js 14+ with TypeScript | ⬜ | `npx create-next-app@latest --typescript --app` |
| Install core dependencies | ⬜ | See package list below |
| Create PostgreSQL database | ⬜ | Neon, Supabase, or PlanetScale |
| Install Drizzle ORM | ⬜ | `pnpm add drizzle-orm @neondatabase/serverless` |
| Create database migrations | ⬜ | users + audit_logs tables |
| Create Drizzle schema files | ⬜ | TypeScript schemas for users + audit_logs |
| Run migrations | ⬜ | Apply to database |

### Core Dependencies

```bash
pnpm add next-auth@^4 bcryptjs drizzle-orm @neondatabase/serverless zod date-fns framer-motion sonner lucide-react
pnpm add -D @types/bcryptjs drizzle-kit @types/node @types/react @types/react-dom
```

### Database Schema Files

- [ ] Create `migrations/001_create_users_table.sql`
- [ ] Create `migrations/002_create_audit_logs_table.sql`
- [ ] Create `lib/db/schema/users.ts` (Drizzle schema)
- [ ] Create `lib/db/schema/audit-logs.ts` (Drizzle schema)
- [ ] Create `lib/db/index.ts` (Database connection)

---

## Milestone 2: Authentication with Roles (Day 1-2)

### NextAuth Setup with JWT + Role

| Todo | Status | Notes |
|------|--------|-------|
| Create NextAuth configuration | ⬜ | JWT strategy with role in token |
| Create auth API route | ⬜ | `/api/auth/[...nextauth]/route.ts` |
| Create type definitions | ⬜ | User, Role, UserStatus types |
| Add role to JWT token | ⬜ | In `jwt()` callback |
| Add role to session | ⬜ | In `session()` callback |
| Create route protection middleware | ⬜ | `middleware.ts` for protected routes |
| Build login page | ⬜ | Animated glass card design |
| Add SessionProvider | ⬜ | Wrap app in provider |

### Files to Create

- [ ] `lib/auth.ts` - NextAuth config with Credentials provider
- [ ] `app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- [ ] `middleware.ts` - Route protection
- [ ] `app/login/page.tsx` - Login page
- [ ] `types/user.ts` - User, Role, UserStatus types
- [ ] `types/auth.ts` - SessionUser type
- [ ] `types/role.ts` - Role hierarchy and labels

---

## Milestone 3: Dashboard Shell (Day 2)

### Layout Components

| Todo | Status | Notes |
|------|--------|-------|
| Copy base patterns from ADMIN-MASTER-REFERENCE.md | ⬜ | Color system, typography, theme |
| Build Sidebar component | ⬜ | Fixed 264px with navigation |
| Build Header component | ⬜ | Dynamic title + user menu |
| Create dashboard layout | ⬜ | `(dashboard)/layout.tsx` |
| Add theme toggle | ⬜ | Sun/Moon button in sidebar |
| Add role-based nav items | ⬜ | Show/hide based on role |
| Setup dashboard route group | ⬜ | `(dashboard)/` folder |

### Files to Create

- [ ] `app/globals.css` - Theme variables from ADMIN-MASTER-REFERENCE
- [ ] `lib/theme-context.tsx` - Light/dark mode provider
- [ ] `components/layout/Sidebar.tsx`
- [ ] `components/layout/Header.tsx`
- [ ] `app/(dashboard)/layout.tsx`

### Navigation Items (Customize)

```typescript
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, role: 'user' },
  { name: 'Users', href: '/users', icon: Users, role: 'admin' },
  { name: 'Audit Logs', href: '/audit-logs', icon: Activity, role: 'admin' },
  { name: 'Profile', href: '/profile', icon: User, role: 'user' },
  { name: 'Settings', href: '/settings', icon: Settings, role: 'super_admin' }
];
```

---

## Milestone 4: Dashboard Home (Stats) (Day 2-3)

### Home Page Components

| Todo | Status | Notes |
|------|--------|-------|
| Create StatCard component | ⬜ | Icon + value + label |
| Create stats API endpoint | ⬜ | Count users by role/status |
| Build dashboard home page | ⬜ | Stats grid + quick actions |
| Add loading states | ⬜ | Skeleton cards |
| Add error handling | ⬜ | Error boundaries |

### Files to Create

- [ ] `components/dashboard/StatCard.tsx`
- [ ] `app/(dashboard)/page.tsx` - Dashboard home
- [ ] `app/api/stats/route.ts` - Stats aggregation

### Stats to Display

- Total Users
- Active Users
- Inactive Users
- Super Admins

---

## Milestone 5: Users Management (Day 3-4)

### User CRUD

| Todo | Status | Notes |
|------|--------|-------|
| Create permission middleware | ⬜ | hasRole, requireRole, canManageUser |
| Create users list API (GET) | ⬜ | With search, filter, sort |
| Create user create API (POST) | ⬜ | With RBAC checks |
| Create user read API (GET) | ⬜ | Single user by ID |
| Create user update API (PUT) | ⬜ | With role hierarchy checks |
| Create user delete API (DELETE) | ⬜ | With last admin protection |
| Build Users List Page | ⬜ | DataTable with search/filter |
| Create RoleBadge component | ⬜ | Color-coded role badges |
| Create StatusBadge component | ⬜ | Status indicators |
| Build CreateUserModal | ⬜ | Form with validation |
| Build EditUserModal | ⬜ | Pre-filled form |
| Build DeleteUserDialog | ⬜ | With undo countdown |

### Files to Create

- [ ] `lib/permissions.ts` - Permission helper functions
- [ ] `app/api/users/route.ts` - List + Create
- [ ] `app/api/users/[id]/route.ts` - Read + Update + Delete
- [ ] `app/(dashboard)/users/page.tsx` - Users list
- [ ] `components/users/RoleBadge.tsx`
- [ ] `components/users/StatusBadge.tsx`
- [ ] `components/users/CreateUserModal.tsx`
- [ ] `components/users/EditUserModal.tsx`
- [ ] `components/users/DeleteUserDialog.tsx`

### Permission Checks to Implement

```typescript
// Can only manage users with LOWER role
function canManageUser(actorRole: Role, targetRole: Role): boolean {
  return roleHierarchy[actorRole] > roleHierarchy[targetRole];
}

// Only super_admin can create admin/super_admin users
// Only super_admin can delete/demote the last super_admin (protection)
```

---

## Milestone 6: Role Assignment System (Day 4)

### Role Management UI

| Todo | Status | Notes |
|------|--------|-------|
| Add role change validation | ⬜ | Check permission in PUT route |
| Build RoleDropdown component | ⬜ | Interactive role selector |
| Add role change audit logging | ⬜ | Log old_role → new_role |
| Add role hierarchy visualization | ⬜ | Show Super Admin > Admin > User |
| Test permission enforcement | ⬜ | Verify admins can't edit super admins |

### Files to Create

- [ ] `components/users/RoleDropdown.tsx`
- [ ] Update `app/api/users/[id]/route.ts` with role change logic

### Role Hierarchy Rules

- Super Admin (3) can manage Admin (2) and User (1)
- Admin (2) can manage User (1)
- User (1) cannot manage anyone
- Cannot delete or demote last Super Admin

---

## Milestone 7: Audit Logging System (Day 4-5)

### Comprehensive Audit Trail

| Todo | Status | Notes |
|------|--------|-------|
| Create audit logging utility | ⬜ | createAuditLog() function |
| Add audit logs to user.created | ⬜ | In POST /api/users |
| Add audit logs to user.updated | ⬜ | In PUT /api/users/[id] |
| Add audit logs to user.deleted | ⬜ | In DELETE /api/users/[id] |
| Add audit logs to role.changed | ⬜ | When role is updated |
| Create audit logs API endpoint | ⬜ | GET with filters |
| Build Audit Logs Page | ⬜ | Table with user join |
| Add filtering by action | ⬜ | Dropdown filter |
| Add date range filtering | ⬜ | Start/end date |
| Add export functionality | ⬜ | Export to CSV (optional) |

### Files to Create

- [ ] `lib/audit-logging.ts` - createAuditLog utility
- [ ] `app/api/audit-logs/route.ts` - List with filters
- [ ] `app/(dashboard)/audit-logs/page.tsx` - Audit logs table
- [ ] `types/audit-log.ts` - AuditLog, AuditAction types

### Audit Actions to Track

- `user.created`
- `user.updated`
- `user.deleted`
- `role.changed`
- `password.changed` (optional)
- `settings.updated` (optional)

---

## Milestone 8: User Profile Page (Day 5)

### Self-Service Editing

| Todo | Status | Notes |
|------|--------|-------|
| Create profile update endpoint | ⬜ | PUT /api/users/{currentUserId} |
| Create password change endpoint | ⬜ | PUT /api/users/[id]/password |
| Build Profile Page | ⬜ | Two sections: Info + Password |
| Add form validation | ⬜ | Client + server side |
| Add success/error toasts | ⬜ | User feedback |
| Test password hashing | ⬜ | Verify bcrypt cost factor 12 |

### Files to Create

- [ ] `app/api/users/[id]/password/route.ts` - Password change
- [ ] `app/(dashboard)/profile/page.tsx` - Profile editing page

### Profile Sections

1. **Profile Information** - Name, Email
2. **Change Password** - Current + New + Confirm

---

## Milestone 9: Settings Page (Day 5-6)

### System Configuration

| Todo | Status | Notes |
|------|--------|-------|
| Create settings database table | ⬜ | Key-value store |
| Create settings API endpoints | ⬜ | GET + PUT |
| Build Settings Page | ⬜ | Super admin only |
| Add permission check | ⬜ | Only super_admin can edit |
| Add settings categories | ⬜ | General, Auth, Email, etc. |
| Add audit logging | ⬜ | Log settings changes |

### Files to Create

- [ ] `migrations/003_create_settings_table.sql`
- [ ] `lib/db/schema/settings.ts`
- [ ] `app/api/settings/route.ts`
- [ ] `app/(dashboard)/settings/page.tsx`

### Settings to Include

- Application Name
- Support Email
- Allow Public Signups (boolean)
- Require Email Verification (boolean)

---

## Milestone 10: Polish & Testing (Day 6-7)

### Final Touches

| Todo | Status | Notes |
|------|--------|-------|
| Add loading states | ⬜ | Skeletons for all pages |
| Add error boundaries | ⬜ | Graceful error handling |
| Test all role permissions | ⬜ | Super Admin, Admin, User |
| Test last admin protection | ⬜ | Verify cannot delete last SA |
| Test audit logging completeness | ⬜ | All actions logged |
| Test responsive design | ⬜ | Mobile, tablet, desktop |
| Test light/dark mode | ⬜ | All pages both themes |
| Add JSDoc comments | ⬜ | Document complex functions |
| Write README | ⬜ | Setup instructions |
| Performance audit | ⬜ | Lighthouse check |

### Files to Create

- [ ] `components/ui/Skeleton.tsx` - Loading skeleton
- [ ] `components/ui/Spinner.tsx` - Loading spinner
- [ ] `app/error.tsx` - Error boundary
- [ ] `app/loading.tsx` - Root loading state
- [ ] `README.md` - Documentation

### Testing Checklist

**Permission Tests:**
- [ ] Super Admin can manage all users
- [ ] Admin can manage regular users only
- [ ] Admin cannot edit/delete Super Admins
- [ ] User can only edit own profile
- [ ] Cannot delete last Super Admin

**Audit Log Tests:**
- [ ] User creation logged
- [ ] User update logged
- [ ] User deletion logged
- [ ] Role changes logged
- [ ] IP address captured
- [ ] User agent captured

**Security Tests:**
- [ ] Passwords hashed with bcrypt (cost 12)
- [ ] Password hash never returned in responses
- [ ] Server-side permission checks work
- [ ] Soft deletes preserve data
- [ ] Session expires after inactivity

**UI Tests:**
- [ ] All pages responsive (mobile/tablet/desktop)
- [ ] Light/dark mode works everywhere
- [ ] Delete with undo countdown works
- [ ] Last admin warning shows
- [ ] Loading states show correctly
- [ ] Error messages display properly

---

## Optional Enhancements

Add these based on requirements:

### Email Notifications
- [ ] Email on user created
- [ ] Email on role changed
- [ ] Email on password changed
- [ ] Email verification flow

### Advanced Features
- [ ] Two-factor authentication (2FA)
- [ ] Session management (active sessions list)
- [ ] Rate limiting on sensitive endpoints
- [ ] IP allowlist/blocklist
- [ ] Backup codes for 2FA

### Audit Log Enhancements
- [ ] Export audit logs to CSV
- [ ] Audit log search
- [ ] Audit log retention policy
- [ ] Real-time audit log viewer

### User Management Enhancements
- [ ] Bulk user import (CSV)
- [ ] Bulk user operations
- [ ] User groups/teams
- [ ] Custom permissions beyond 3 roles
- [ ] User impersonation (for support)

---

## Quick Start Commands

```bash
# Create new project
npx create-next-app@latest adminx-app --typescript --tailwind --app

# Install dependencies
cd adminx-app
pnpm add next-auth@^4 bcryptjs drizzle-orm @neondatabase/serverless zod date-fns framer-motion sonner lucide-react
pnpm add -D @types/bcryptjs drizzle-kit

# Create database
# (Use Neon, Supabase, or PlanetScale dashboard)

# Run migrations
psql -d $DATABASE_URL -f migrations/001_create_users_table.sql
psql -d $DATABASE_URL -f migrations/002_create_audit_logs_table.sql

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development
pnpm dev
```

---

## Environment Variables

```bash
# .env.local

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl

# Optional
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
```

Generate secret:
```bash
openssl rand -base64 32
```

---

## Copy-Paste Checklist

When building, copy these from [ADMINX-TEMPLATE.md](ADMINX-TEMPLATE.md):

### Part 1: Universal Base
1. ⬜ Color system CSS variables (from ADMIN-MASTER-REFERENCE.md)
2. ⬜ Typography setup (Poppins)
3. ⬜ Theme context
4. ⬜ Base components (Modal, ConfirmDialog, CountdownRing)
5. ⬜ Delete with undo pattern

### Part 2: ADMINX Extensions
6. ⬜ Database schemas (users, audit_logs)
7. ⬜ Type definitions (User, Role, AuditLog)
8. ⬜ NextAuth configuration
9. ⬜ Permission middleware
10. ⬜ Audit logging utility
11. ⬜ User CRUD API routes (all 5 endpoints)
12. ⬜ Users List Page
13. ⬜ Create/Edit/Delete user modals
14. ⬜ Role assignment UI
15. ⬜ Audit logs page
16. ⬜ User profile page
17. ⬜ Settings page
18. ⬜ Dashboard home with stats

---

## Critical Security Checklist

Before launching to production:

- [ ] All passwords hashed with bcrypt (cost factor 12)
- [ ] Password hashes never returned in API responses
- [ ] All API routes validate session server-side
- [ ] Permission checks enforce role hierarchy
- [ ] Last Super Admin cannot be deleted/demoted
- [ ] Soft deletes preserve audit trail
- [ ] All sensitive actions logged to audit_logs
- [ ] IP address and user agent captured in logs
- [ ] Rate limiting added to login endpoint
- [ ] NEXTAUTH_SECRET is strong and secret
- [ ] DATABASE_URL not exposed to client
- [ ] HTTPS enforced in production
- [ ] Session timeout configured
- [ ] Password requirements enforced (min 8 chars)
- [ ] SQL injection protected (using Drizzle ORM)
- [ ] XSS protected (React escapes by default)

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] First super admin user created manually
- [ ] NEXTAUTH_URL points to production domain
- [ ] NEXTAUTH_SECRET is production-grade (32+ chars)

### Post-Deployment
- [ ] Verify login works
- [ ] Verify user creation works
- [ ] Verify role assignment works
- [ ] Verify audit logs capture actions
- [ ] Verify last admin protection works
- [ ] Test light/dark mode
- [ ] Test responsive design
- [ ] Run Lighthouse audit
- [ ] Monitor error logs

---

## Success Criteria

✅ **All 9 MVP features complete:**
1. Dashboard home (stats working)
2. Users list page (search/filter working)
3. Create user (validation + RBAC working)
4. Edit user (role hierarchy enforced)
5. Delete user (undo + last admin protection)
6. Role assignment (permissions enforced)
7. Audit logs page (all actions logged)
8. User profile (self-edit working)
9. Settings page (super admin only)

✅ **Security patterns implemented:**
- Server-side permission validation
- Last Super Admin protection
- Comprehensive audit logging
- Bcrypt password hashing
- Soft deletes
- IP and user agent tracking

✅ **Quality standards met:**
- Responsive design (mobile/tablet/desktop)
- Light/dark mode support
- Loading states
- Error handling
- JSDoc documentation
- README with setup instructions

---

## Troubleshooting

### Common Issues

**"Cannot read properties of undefined (reading 'role')"**
- Check NextAuth JWT callback adds role to token
- Check session callback adds role to session
- Verify user type includes role field

**"Last admin check not working"**
- Verify countUsersByCriteria function queries correctly
- Check both role='super_admin' AND status='active'
- Test with exactly 1 super admin in database

**"Audit logs not appearing"**
- Check createAuditLog doesn't throw (wrapped in try/catch)
- Verify audit_logs table exists
- Check API routes call createAuditLog after operations

**"Permission denied errors"**
- Verify requireRole middleware in all API routes
- Check canManageUser logic for role hierarchy
- Test with correct role (super_admin for admin operations)

**"Delete with undo not working"**
- Verify deleteWithCountdown imported correctly
- Check CountdownRing component exists
- Verify toast (sonner) is configured in layout

---

**Reference**: [ADMINX-TEMPLATE.md](ADMINX-TEMPLATE.md) for complete code snippets

*Use this PLANX to track progress on ADMINX implementation*

---

**Estimated Timeline**: 5-7 days
**Complexity**: Medium-High
**Status**: Ready to execute
