# Architecture: Multi-Tenant B2B SaaS

> **When to Use**: B2B SaaS with organizations/workspaces, team collaboration, role-based access control, subscription billing per organization.

---

## 🎯 IDEAL FOR

- Team collaboration tools (like Slack, Notion)
- Project management platforms (like Linear, Asana)
- CRM systems (like Pipedrive, HubSpot)
- Business intelligence dashboards
- Team communication tools
- Document collaboration platforms
- Studio/builder tools (like Slydes)

**User Model**: B2B, organizations with multiple members
**Complexity**: Medium to High
**Team Size**: 2-5 developers
**Time to MVP**: 4-8 weeks

---

## 🏗️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER'S BROWSER                             │
│                      (Next.js + React)                           │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ HTTPS + Session Cookies
                 │
┌────────────────▼────────────────────────────────────────────────┐
│                    VERCEL EDGE + MIDDLEWARE                      │
│             (Org Context + Auth + Rate Limiting)                 │
└──────────────────┬─────────────────────────────────────────────┘
                   │
        ┌──────────┼──────────┬──────────────┐
        │          │          │              │
 ┌──────▼─────┐ ┌─▼────────┐ ┌▼───────────┐ ┌▼──────────┐
 │  SUPABASE  │ │ POSTGRES │ │   STRIPE   │ │   REDIS   │
 │    AUTH    │ │          │ │            │ │ (optional)│
 │            │ │ • Multi- │ │ • Per-Org  │ │           │
 │ • Magic    │ │   tenant │ │   Billing  │ │ • Session │
 │   Links    │ │   Data   │ │ • Usage    │ │ • Cache   │
 │ • OAuth    │ │ • RBAC   │ │   Tracking │ │           │
 └────────────┘ └──────────┘ └────────────┘ └───────────┘
```

---

## 🛠️ COMPLETE TECH STACK

### **Frontend**

- **Framework**: Next.js (Latest - currently 15.x)
- **Language**: TypeScript (Latest - currently 5.x, Strict mode)
- **Styling**: Tailwind CSS (Latest - currently 4.x)
- **State Management**:
  - Zustand (global state)
  - React Query / SWR (server state + caching)
  - Organization context provider

### **Backend**

- **API**: Next.js API Routes
- **Organization Middleware**:
  ```typescript
  // Inject org context into every request
  const org = await getOrgFromRequest(req);
  if (!org || !userHasAccess(user, org)) {
    return forbidden();
  }
  req.org = org; // Available in all subsequent handlers
  ```

### **Database**

- **Database**: PostgreSQL (Supabase, Neon, or Vercel Postgres)
- **Query Method**: Supabase Client OR Raw SQL (via @vercel/postgres or @neondatabase/serverless)
- **NO ORM REQUIRED** - Direct queries, type your own interfaces
- **Key Pattern**: Every query filters by `organization_id`

**Schema Design**:
```sql
-- Organizations (the tenant)
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan_id text NOT NULL DEFAULT 'free',
  settings jsonb DEFAULT '{}',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Users (can belong to multiple orgs)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamp DEFAULT now()
);

-- Organization Members (junction table with roles)
CREATE TABLE organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text CHECK(role IN ('owner', 'admin', 'member', 'viewer')) NOT NULL,
  invited_by uuid REFERENCES users(id),
  joined_at timestamp DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- Pending Invitations
CREATE TABLE organization_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL,
  invited_by uuid REFERENCES users(id),
  token text UNIQUE NOT NULL,
  expires_at timestamp NOT NULL,
  accepted_at timestamp,
  created_at timestamp DEFAULT now()
);

-- Example: Projects (multi-tenant entity)
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES users(id),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Example: Tasks (nested multi-tenant entity)
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  assignee_id uuid REFERENCES users(id),
  status text DEFAULT 'todo',
  created_at timestamp DEFAULT now()
);

-- Organization Subscriptions (per-org billing)
CREATE TABLE organization_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE UNIQUE,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id text,
  plan_id text NOT NULL,
  status text NOT NULL,
  seats_included int NOT NULL DEFAULT 5,
  seats_used int NOT NULL DEFAULT 1,
  current_period_end timestamp,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamp DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_tasks_org ON tasks(organization_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
```

---

### **Authentication & Authorization**

**TWO OPTIONS - Choose based on needs:**

#### Option A: Supabase Auth (Consumer-facing, magic links)
- **When**: Consumer-style B2B, magic links, social auth
- **How**: Supabase Auth with organization context
- **Pattern**: Link Supabase auth user to your `users` table

```typescript
// After Supabase auth, sync to your users table
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  await db.query(`
    INSERT INTO users (id, email, name)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO UPDATE SET name = $3
  `, [user.id, user.email, user.user_metadata?.name]);
}
```

#### Option B: Custom Auth (Admin dashboards, full control)
- **When**: Internal tools, admin areas, password-based
- **How**: bcrypt + session cookies (same as Simple SaaS)
- **This is our preferred pattern for admin areas**

```typescript
// lib/auth.ts
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres"; // or your DB client

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "member" | "viewer";
  organizationId: string;
  permissions: string[];
}

export async function login(email: string, password: string): Promise<AuthUser | null> {
  // 1. Find user
  const result = await sql`
    SELECT u.*, om.role, om.organization_id, o.name as org_name
    FROM users u
    JOIN organization_members om ON om.user_id = u.id
    WHERE u.email = ${email}
    LIMIT 1
  `;

  const user = result.rows[0];
  if (!user) return null;

  // 2. Verify password
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  // 3. Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organization_id,
    permissions: getPermissionsForRole(user.role),
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;

  const result = await sql`
    SELECT u.*, om.role, om.organization_id
    FROM users u
    JOIN organization_members om ON om.user_id = u.id
    WHERE u.id = ${session.value}
    LIMIT 1
  `;

  const user = result.rows[0];
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organization_id,
    permissions: getPermissionsForRole(user.role),
  };
}

// Role-based permissions
const ROLE_PERMISSIONS = {
  owner: ["*"],
  admin: ["read", "write", "delete", "invite", "settings"],
  member: ["read", "write"],
  viewer: ["read"],
};

function getPermissionsForRole(role: string): string[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function hasPermission(user: AuthUser, permission: string): boolean {
  if (user.permissions.includes("*")) return true;
  return user.permissions.includes(permission);
}
```

**NEVER use Clerk** - we build our own auth. It's simpler, cheaper, and we own the code.

---

### **Authorization Middleware**

```typescript
// lib/auth.ts (continued)
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireRole(minimumRole: "owner" | "admin" | "member" | "viewer") {
  const user = await requireAuth();

  const roleHierarchy = { owner: 4, admin: 3, member: 2, viewer: 1 };
  if (roleHierarchy[user.role] < roleHierarchy[minimumRole]) {
    throw new Error("Insufficient permissions");
  }

  return user;
}

export async function requirePermission(permission: string) {
  const user = await requireAuth();
  if (!hasPermission(user, permission)) {
    throw new Error(`Permission required: ${permission}`);
  }
  return user;
}
```

---

### **Multi-Tenancy Pattern**

**Data Isolation Strategy**: Shared database, organization_id filter

```typescript
// EVERY query must include org filter
async function getProjects(orgId: string) {
  const result = await sql`
    SELECT * FROM projects
    WHERE organization_id = ${orgId}
    ORDER BY created_at DESC
  `;
  return result.rows;
}

// Helper for org-scoped queries
async function withOrg<T>(
  orgId: string,
  query: (orgId: string) => Promise<T>
): Promise<T> {
  if (!orgId) throw new Error("Organization ID required");
  return query(orgId);
}

// Usage
const projects = await withOrg(user.organizationId, getProjects);
```

**Security Checklist**:
- ✅ Every table has `organization_id` column (except cross-org tables like `users`)
- ✅ Every query filters by `organization_id`
- ✅ Middleware validates org access before request hits handler
- ✅ Never trust client-provided org ID - always use session

---

### **Organization Switching**

```typescript
// For users in multiple orgs
export async function getUserOrganizations(userId: string) {
  const result = await sql`
    SELECT o.*, om.role
    FROM organizations o
    JOIN organization_members om ON om.organization_id = o.id
    WHERE om.user_id = ${userId}
    ORDER BY o.name
  `;
  return result.rows;
}

export async function switchOrganization(userId: string, orgId: string) {
  // Verify user has access
  const result = await sql`
    SELECT * FROM organization_members
    WHERE user_id = ${userId} AND organization_id = ${orgId}
  `;

  if (result.rows.length === 0) {
    throw new Error("Access denied");
  }

  // Update session cookie with new org
  const cookieStore = await cookies();
  cookieStore.set("current-org", orgId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}
```

---

### **Payments & Billing**

- **Provider**: Stripe (Customer Portal + Subscriptions)

- **Billing Model**: Per-organization with seat-based pricing
  ```javascript
  const PLANS = {
    free: {
      price: 0,
      seats: 3,
      features: ['basic_features'],
    },
    starter: {
      priceId: 'price_starter',
      price: 29,
      seats: 5,
      features: ['basic_features', 'priority_support'],
    },
    professional: {
      priceId: 'price_pro',
      price: 99,
      seats: 15,
      features: ['all_features', 'priority_support', 'api_access'],
    },
    enterprise: {
      price: 'custom',
      seats: 'unlimited',
      features: ['all_features', 'sso', 'dedicated_support'],
    },
  };
  ```

- **Seat Management**:
  - Track `seats_used` vs `seats_included`
  - Block adding members if at seat limit
  - Offer "Add seats" upgrade flow

---

### **Email**

- **Provider**: Resend
- **Templates**: React Email

- **Email Types**:
  - Organization invitation
  - Member joined notification
  - Role changed notification
  - Subscription updates
  - Usage limit warnings

---

### **Monitoring**

- **Error Tracking**: Sentry (with org context)
  ```typescript
  Sentry.setContext('organization', {
    id: org.id,
    name: org.name,
    plan: org.plan_id,
  });
  ```

- **Analytics**: PostHog or Vercel Analytics
- **Performance**: Vercel Analytics (built-in)

---

## 💰 COST BREAKDOWN

### **Free Tier (Development Only)**
- Vercel: Free
- Supabase/Neon: Free
- **Total**: $0/month

### **Early Stage (10-50 orgs, ~200 users)**
- Vercel: $20/month (Pro)
- Database: $25/month
- Stripe: Transaction fees
- Resend: $20/month
- Sentry: $26/month (optional)
- **Total**: ~$90/month

**Revenue to cover**: 3 paying orgs at $29/month

### **Growth Stage (200+ orgs, 2k+ users)**
- Vercel: $150/month
- Database: $200/month (larger instance)
- Stripe: Transaction fees
- Resend: $80/month
- **Total**: ~$500/month

**Revenue to cover**: 17 orgs at $29/month or 5 at $99/month

---

## 📈 SCALING CHARACTERISTICS

### **Bottlenecks to Watch**

1. **Database Queries**:
   - Add indexes on `organization_id` + frequently queried columns
   - Monitor slow queries (n+1 problems common in multi-tenancy)
   - Consider read replicas at scale

2. **Large Organizations**:
   - Paginate everything
   - Implement query result limits

3. **Session Management**:
   - Consider Redis for session storage at scale

### **Scaling Strategy**

**0-1k users**: Current stack handles easily
**1k-10k users**: Add caching, optimize queries
**10k-50k users**: Read replicas, background job workers

---

## 🎯 KEY BENEFITS

✅ **Enterprise-Ready**: RBAC, audit logs from day one
✅ **Scalable Architecture**: Proven pattern for B2B SaaS
✅ **Great Team Experience**: Organization switching, invitations, roles
✅ **Flexible Billing**: Seat-based, usage-based, or hybrid
✅ **Own Your Auth**: No vendor lock-in, full control
✅ **No ORM Bloat**: Direct SQL, type your own interfaces

---

## ⚠️ TRADEOFFS & LIMITATIONS

❌ **Complexity**: Significantly more complex than simple SaaS
❌ **Development Time**: 2x the time vs single-tenant
❌ **Query Overhead**: Every query needs org filter (easy to forget)
❌ **Testing Complexity**: Need to test multi-org scenarios

### **Common Pitfalls**

⚠️ **Forgetting org_id filter**: Leaks data across organizations
⚠️ **N+1 Queries**: Loading org data for every item
⚠️ **Cascading Deletes**: Deleting org should clean up all data
⚠️ **Invitation Logic**: Edge cases with existing users, expired invites

---

## 📚 FILE STRUCTURE

```
my-b2b-saas/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── accept-invitation/[token]/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Org-scoped layout
│   │   ├── page.tsx                # Dashboard home
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx            # Org settings
│   │   │   ├── members/page.tsx    # Team management
│   │   │   └── billing/page.tsx
│   │   └── switch-org/page.tsx     # Org switcher
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/route.ts
│   │   ├── organizations/
│   │   │   ├── route.ts            # Create org
│   │   │   └── [id]/
│   │   │       ├── route.ts        # Get/update org
│   │   │       ├── members/route.ts
│   │   │       └── invitations/route.ts
│   │   ├── projects/route.ts
│   │   └── webhooks/
│   │       └── stripe/route.ts
│   ├── layout.tsx
│   └── page.tsx                    # Landing page
├── components/
│   ├── ui/
│   ├── auth/
│   ├── dashboard/
│   ├── org/
│   │   ├── OrgSwitcher.tsx
│   │   ├── MemberList.tsx
│   │   └── InviteModal.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── db/
│   │   └── client.ts               # Database client
│   ├── auth.ts                     # Auth + RBAC
│   ├── organizations.ts            # Org helpers
│   ├── stripe.ts
│   └── utils.ts
├── middleware.ts                   # Auth + org context
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🚨 CRITICAL REMINDERS

1. **NO CLERK** - Build custom auth with bcrypt + cookies or use Supabase Auth
2. **NO ORM REQUIRED** - Use raw SQL or Supabase client
3. **LATEST VERSIONS ALWAYS** - Next.js 15+, React 19+, TypeScript 5.9+
4. **ALWAYS FILTER BY ORG_ID** - Every query, no exceptions
5. **HEADER & FOOTER FIRST** - Before any pages
6. **TEST MULTI-ORG SCENARIOS** - Data isolation is critical

---

**This architecture powers most successful B2B SaaS companies. It's complex but worth it for the enterprise-grade features.**




