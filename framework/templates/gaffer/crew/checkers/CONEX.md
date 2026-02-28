# CONEX — Database Connection Framework — [PROJECT] Edition

> **Purpose:** Connect [PROJECT] features to [DATABASE] with type-safe, production-ready patterns.
> **Usage:** Say "CONEX: [feature]" to generate database connection layer.
> **Database:** [DATABASE] with `[DB-DRIVER]` driver

---

## [PROJECT] Context

**CONEX for [PROJECT]** understands:
- **[DATABASE]** with `[DB-DRIVER]` driver as the database
- **App-layer auth middleware** for organization isolation (no RLS)
- **Monorepo structure** - `packages/database` for shared types, `packages/shared` for DB client
- **Tables:** [entity-primary], [entity-secondary], [entity-tertiary], [entity-users], [entity-geo], [entity-primary]_photos
- **[BUSINESS-CYCLE-DAYS]-day freshness model** with [BUSINESS-TIMESTAMP] timestamps
- **snake_case** in database, **camelCase** in TypeScript

---

## When to Use CONEX

### Use CONEX When

- Adding a new feature that needs database storage
- Connecting frontend to database via API routes
- Adding new tables to [PROJECT] schema
- Need type-safe database queries

### CONEX vs CRUDX

| Framework | Purpose | When to Use |
|-----------|---------|-------------|
| **CONEX** | Database connection layer | Connecting features to database |
| **CRUDX** | Full admin UI + API | Building complete management systems |

**CONEX** = Database layer only
**CRUDX** = Database + API + Admin UI (uses CONEX patterns internally)

---

## The [PROJECT] CONEX Stack

### 5 Layers (Bottom to Top)

```
+---------------------------------------------+
|  5. QUERIES      Type-safe DB driver access  |
+---------------------------------------------+
|  4. TYPES        TypeScript interfaces       |
+---------------------------------------------+
|  3. MIGRATIONS   SQL migrations              |
+---------------------------------------------+
|  2. SCHEMA       Table definitions           |
+---------------------------------------------+
|  1. CONNECTION   DB client setup             |
+---------------------------------------------+
```

---

## Layer 1: Connection (DB Client)

### Database Client

**Location:** `packages/shared/lib/db/client.ts`

```typescript
import { db } from '@[PROJECT]/shared/lib/db/client'

// Use db.query() for parameterised queries
const result = await db.query('SELECT * FROM [entity-primary] WHERE id = $1', [id])

// Or import query directly
import { query } from '@[PROJECT]/shared/lib/db/client'
const result = await query('SELECT * FROM [entity-primary] WHERE status = $1', ['active'])
```

### Auth ([AUTH-METHOD])

**Location:** `packages/shared/lib/auth/`

[PROJECT] uses [AUTH-METHOD] for authentication.

```typescript
import { getSession } from '@[PROJECT]/shared/lib/auth/session'

// Get current user session
const session = await getSession()
const userId = session.user?.id

// Protect API routes
import { requireAuth } from '@[PROJECT]/shared/lib/auth/session'
const auth = await requireAuth()
if (auth) return auth // Returns error response if not authenticated

// Protect superadmin routes
import { requireSuperadmin } from '@[PROJECT]/shared/lib/auth/session'
const auth = await requireSuperadmin()
if (auth) return auth
```

### Middleware (Route Protection)

**Location:** `[APP-API]/src/middleware.ts`

[PROJECT] uses Next.js middleware with session handling for route protection:

```typescript
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')

  // Protect admin routes
  if (!sessionCookie && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

---

## Layer 2: Schema ([PROJECT] Tables)

### [PROJECT] Table Templates

#### [entity-primary] Table

```sql
create table public.[entity-primary] (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text not null,

  -- Type
  [entity-primary]_type text not null check ([entity-primary]_type in ('[EntityType-1]', '[EntityType-2]')),
  category text not null check (category in ('[CategoryType-1]', '[CategoryType-2]', '[CategoryType-3]')),

  -- Location
  [entity-geo] text not null,
  city text not null,
  area text,
  address text,
  lat decimal(10, 8),
  lng decimal(11, 8),

  -- Details
  price integer not null,
  features text[],

  -- Freshness ([BUSINESS-CYCLE-DAYS]-day model)
  [BUSINESS-TIMESTAMP] timestamptz default now(),

  -- Relationships
  [entity-tertiary]_id uuid references public.[entity-tertiary](id) on delete cascade,

  -- Status
  status text default 'active' check (status in ('[StatusType-1]', '[StatusType-2]', '[StatusType-3]')),
  featured boolean default false,
  display_order integer default 0,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for [PROJECT] queries
create index [entity-primary]_status_idx on public.[entity-primary](status);
create index [entity-primary]_[entity-geo]_idx on public.[entity-primary]([entity-geo]);
create index [entity-primary]_city_idx on public.[entity-primary](city);
create index [entity-primary]_type_idx on public.[entity-primary]([entity-primary]_type);
create index [entity-primary]_[entity-tertiary]_id_idx on public.[entity-primary]([entity-tertiary]_id);
create index [entity-primary]_[BUSINESS-TIMESTAMP]_idx on public.[entity-primary]([BUSINESS-TIMESTAMP]);
create index [entity-primary]_lat_lng_idx on public.[entity-primary](lat, lng);

-- No RLS — [PROJECT] uses app-layer auth middleware for access control
-- Organization isolation is enforced in API routes via session checks
```

#### [entity-secondary] Table

```sql
create table public.[entity-secondary] (
  id uuid default gen_random_uuid() primary key,

  -- Contact
  name text not null,
  email text not null,
  phone text,
  message text,

  -- Relationships
  [entity-primary]_id uuid references public.[entity-primary](id) on delete cascade,
  [entity-tertiary]_id uuid references public.[entity-tertiary](id) on delete cascade,

  -- Status
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- No RLS — organization isolation enforced in API routes
-- Public creation handled via unauthenticated API endpoint
```

#### [entity-tertiary] Table

```sql
create table public.[entity-tertiary] (
  id uuid default gen_random_uuid() primary key,

  -- Info
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  website text,

  -- Contact
  email text not null,
  phone text,
  address text,

  -- Verification
  verified boolean default false,
  verified_at timestamptz,

  -- Status
  status text default 'pending' check (status in ('pending', 'active', 'suspended')),

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### [entity-users] Table (User-Organization Link)

```sql
create table public.[entity-users] (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.[entity-users-base](id) on delete cascade,
  [entity-tertiary]_id uuid references public.[entity-tertiary](id) on delete cascade,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz default now(),

  unique(user_id, [entity-tertiary]_id)
);
```

---

## Layer 3: Migrations

### [PROJECT] Migration Structure

```
migrations/
    ├── 00001_create_[entity-tertiary].sql
    ├── 00002_create_[entity-users].sql
    ├── 00003_create_[entity-primary].sql
    ├── 00004_create_[entity-primary]_photos.sql
    ├── 00005_create_[entity-secondary].sql
    └── 00006_create_[entity-geo].sql
```

Migrations live in the `migrations/` directory with sequential numbering (`00001_`, `00002_`, etc.).

### Running Migrations

```bash
# Migrations run against [DATABASE]
# Use the db:migrate script or apply directly:
pnpm db:migrate

# For a full database reset and reseed:
pnpm clean-reset
```

---

## Layer 4: Types

### [PROJECT] Type Definitions

**Location:** `packages/database/src/types/`

```typescript
// packages/database/src/types/[entity-primary].ts

export type [EntityType] = '[EntityType-1]' | '[EntityType-2]'
export type CategoryType = '[CategoryType-1]' | '[CategoryType-2]' | '[CategoryType-3]'
export type [StatusType] = '[StatusType-1]' | '[StatusType-2]' | '[StatusType-3]'
export type FreshnessStatus = 'fresh' | 'expiring' | 'expired'

export interface EntityPrimary {
  id: string
  slug: string
  title: string
  description: string
  entityType: [EntityType]
  category: CategoryType
  region: string
  city: string
  area?: string
  address?: string
  lat?: number
  lng?: number
  price: number
  features?: string[]
  confirmedAt?: string
  freshnessStatus?: FreshnessStatus
  daysUntilExpiry?: number
  organizationId: string
  status: [StatusType]
  featured: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface EntityFilters {
  entityType?: [EntityType]
  category?: CategoryType
  region?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  status?: [StatusType]
  bbox?: [number, number, number, number] // [minLng, minLat, maxLng, maxLat]
}
```

### Transform Functions

```typescript
// packages/database/src/transforms/[entity-primary].ts

import type { EntityPrimary } from '../types/[entity-primary]'

// Database row → Application type
export function transformEntity(row: any): EntityPrimary {
  const freshness = calculateFreshness(row.[BUSINESS-TIMESTAMP])

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    entityType: row.[entity-primary]_type,
    category: row.category,
    region: row.[entity-geo],
    city: row.city,
    area: row.area,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    price: row.price,
    features: row.features || [],
    confirmedAt: row.[BUSINESS-TIMESTAMP],
    freshnessStatus: freshness.status,
    daysUntilExpiry: freshness.daysUntilExpiry,
    organizationId: row.[entity-tertiary]_id,
    status: row.status,
    featured: row.featured,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function calculateFreshness(confirmedAt: string | null) {
  if (!confirmedAt) return { status: 'expired', daysUntilExpiry: 0 }

  const days = Math.floor(
    (Date.now() - new Date(confirmedAt).getTime()) / (1000 * 60 * 60 * 24)
  )
  const daysLeft = [BUSINESS-CYCLE-DAYS] - days

  if (daysLeft <= 0) return { status: 'expired', daysUntilExpiry: 0 }
  if (daysLeft <= 7) return { status: 'expiring', daysUntilExpiry: daysLeft }
  return { status: 'fresh', daysUntilExpiry: daysLeft }
}
```

---

## Layer 5: Queries

### [PROJECT] Query Patterns

**Location:** API routes at `[APP-API]/src/app/api/` and server-side in `packages/shared/lib/`

```typescript
// Example: Fetching [entity-primary] with filters using [DB-DRIVER]

import { db } from '@[PROJECT]/shared/lib/db/client'
import { transformEntity } from '../transforms/[entity-primary]'
import type { EntityPrimary, EntityFilters } from '../types/[entity-primary]'

export async function getEntities(filters: EntityFilters = {}): Promise<EntityPrimary[]> {
  const conditions: string[] = ["status = 'active'"]
  const params: any[] = []
  let paramIndex = 1

  if (filters.entityType) {
    conditions.push(`[entity-primary]_type = $${paramIndex++}`)
    params.push(filters.entityType)
  }
  if (filters.region) {
    conditions.push(`[entity-geo] = $${paramIndex++}`)
    params.push(filters.region)
  }
  if (filters.city) {
    conditions.push(`city = $${paramIndex++}`)
    params.push(filters.city)
  }
  if (filters.minPrice) {
    conditions.push(`price >= $${paramIndex++}`)
    params.push(filters.minPrice)
  }
  if (filters.maxPrice) {
    conditions.push(`price <= $${paramIndex++}`)
    params.push(filters.maxPrice)
  }

  // Bounding box for map
  if (filters.bbox) {
    const [minLng, minLat, maxLng, maxLat] = filters.bbox
    conditions.push(`lng >= $${paramIndex++}`)
    params.push(minLng)
    conditions.push(`lng <= $${paramIndex++}`)
    params.push(maxLng)
    conditions.push(`lat >= $${paramIndex++}`)
    params.push(minLat)
    conditions.push(`lat <= $${paramIndex++}`)
    params.push(maxLat)
  }

  const where = conditions.join(' AND ')
  const result = await db.query(
    `SELECT * FROM [entity-primary] WHERE ${where} ORDER BY display_order`,
    params
  )

  return result.rows.map(transformEntity)
}

export async function getEntityBySlug(slug: string): Promise<EntityPrimary | null> {
  const result = await db.query(
    `SELECT e.*,
       json_build_object('id', o.id, 'name', o.name, 'slug', o.slug, 'logo_url', o.logo_url, 'phone', o.phone, 'email', o.email) as organization,
       COALESCE(json_agg(json_build_object('id', p.id, 'url', p.url, 'order', p.display_order)) FILTER (WHERE p.id IS NOT NULL), '[]') as photos
     FROM [entity-primary] e
     LEFT JOIN [entity-tertiary] o ON e.[entity-tertiary]_id = o.id
     LEFT JOIN [entity-primary]_photos p ON p.[entity-primary]_id = e.id
     WHERE e.slug = $1 AND e.status = 'active'
     GROUP BY e.id, o.id`,
    [slug]
  )

  if (result.rows.length === 0) return null
  return transformEntity(result.rows[0])
}

export async function confirmEntity(id: string): Promise<EntityPrimary | null> {
  const result = await db.query(
    `UPDATE [entity-primary] SET [BUSINESS-TIMESTAMP] = NOW() WHERE id = $1 RETURNING *`,
    [id]
  )

  if (result.rows.length === 0) return null
  return transformEntity(result.rows[0])
}
```

---

## [PROJECT] Access Control Patterns

[PROJECT] does **not** use database-level RLS. All access control is enforced at the **app layer** via auth middleware in API routes.

### Organization Isolation

All data is isolated by organization. Users can only access their organization's data via API route checks:

```typescript
// Pattern: User's organization filter in API routes
import { requireAuth } from '@[PROJECT]/shared/lib/auth/session'
import { db } from '@[PROJECT]/shared/lib/db/client'

export async function GET(request: NextRequest) {
  const auth = await requireAuth()
  if (auth) return auth // Returns 401 if not authenticated

  const session = await getSession()
  const userId = session.user!.id

  // Get user's organization_id, then filter data by it
  const memberResult = await db.query(
    'SELECT [entity-tertiary]_id FROM [entity-users] WHERE user_id = $1',
    [userId]
  )
  const organizationId = memberResult.rows[0]?.[entity-tertiary]_id
  if (!organizationId) return NextResponse.json({ error: 'No organization' }, { status: 403 })

  const result = await db.query(
    'SELECT * FROM [entity-primary] WHERE [entity-tertiary]_id = $1',
    [organizationId]
  )
  return NextResponse.json(result.rows)
}
```

### Public Read Access

Public site reads active entities via public API endpoints (no auth required):

```typescript
// Pattern: Public read for active items — no auth check
export async function GET() {
  const result = await db.query(
    "SELECT * FROM [entity-primary] WHERE status = 'active' ORDER BY display_order"
  )
  return NextResponse.json(result.rows)
}
```

### Public Create ([entity-secondary])

Enquiry forms create [entity-secondary] via unauthenticated API endpoints:

```typescript
// Pattern: Public create — no auth check
export async function POST(request: NextRequest) {
  const body = await request.json()
  // Validate with zod, then insert
  const result = await db.query(
    'INSERT INTO [entity-secondary] (name, email, phone, message, [entity-primary]_id, [entity-tertiary]_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [body.name, body.email, body.phone, body.message, body.entityId, body.organizationId]
  )
  return NextResponse.json(result.rows[0])
}
```

---

## [PROJECT] CONEX Checklist

When adding a new [PROJECT] feature:

- [ ] **Schema:** Table created with [PROJECT] conventions
- [ ] **Auth:** App-layer access control in API routes (requireAuth / requireSuperadmin)
- [ ] **Migration:** SQL file in `migrations/` with sequential numbering
- [ ] **Types:** TypeScript interface in `packages/database/src/types/`
- [ ] **Transform:** snake_case → camelCase function
- [ ] **Queries:** [DB-DRIVER] query functions using `db.query()` with parameterised SQL
- [ ] **Indexes:** Added for frequently queried columns

### [PROJECT] Index Guidelines

```sql
-- Always index these for [entity-primary]
create index [entity-primary]_status_idx on [entity-primary](status);
create index [entity-primary]_[entity-geo]_idx on [entity-primary]([entity-geo]);
create index [entity-primary]_city_idx on [entity-primary](city);
create index [entity-primary]_[entity-tertiary]_id_idx on [entity-primary]([entity-tertiary]_id);
create index [entity-primary]_lat_lng_idx on [entity-primary](lat, lng);

-- For [entity-secondary]
create index [entity-secondary]_[entity-tertiary]_id_idx on [entity-secondary]([entity-tertiary]_id);
create index [entity-secondary]_[entity-primary]_id_idx on [entity-secondary]([entity-primary]_id);
create index [entity-secondary]_status_idx on [entity-secondary](status);
```

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CRUDX** | Uses CONEX patterns for database layer |
| **PLANX** | Plan database schema before implementing CONEX |
| **MAPX** | CONEX documents table relationships |

---

**Framework Status:** Template
**Last Updated:** February 28, 2026
**Version:** 2.0 (Template Edition)
