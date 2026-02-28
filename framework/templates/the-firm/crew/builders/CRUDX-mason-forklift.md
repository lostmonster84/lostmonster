# CRUDX Framework — [PROJECT] Edition

> **Mason Forklift: Chief Stack Officer**
> "All six layers or nothing."
> Member of The Firm
>
> Full-stack CRUD systems — database to UI in one pass.
> Optimized for [PROJECT-DOMAIN]: [entity-primary], [entity-secondary], [entity-tertiary], [entity-geo].
---

## [PROJECT] Context

**CRUDX for [PROJECT]** understands:
- **[entity-primary]** - Core content items with [BUSINESS-LOGIC-KEY]
- **[entity-secondary]** - Enquiries/interactions linked to [entity-primary]
- **[entity-tertiary]** - Verified organisations/providers
- **[entity-geo]** - Geographic/category areas
- **[entity-primary] Photos** - Images with ordering
- **Monorepo structure** - `[APP-PUBLIC]`, `[APP-ADMIN]`, `packages/*`

---

## When to Use CRUDX

### Automatic Triggers for [PROJECT]

✅ **Use CRUDX when:**
- Adding new [entity-primary] management features
- Building [entity-secondary] inbox functionality
- Creating [entity-tertiary] verification system
- Managing [entity-geo] content
- Any content that [TARGET-USER-B] needs to update

❌ **Don't use CRUDX when:**
- Hardcoded static content (about page text)
- One-time style changes
- Bug fixes
- Design token updates

### Explicit Trigger

User says: **"CRUDX: [entity-primary]"** → Build complete 6-layer system for [entity-primary]

---

## The 6-Layer [PROJECT] CRUDX Stack

### Layer 1: Database Schema (PostgreSQL)

**Location:** `supabase/migrations/` (or project-specific migration folder)

#### [entity-primary] Table

```sql
-- Migration: create_[entity-primary]_table.sql
create table public.[entity-primary] (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text not null,

  -- Type
  [field-1] text not null check ([field-1] in ('[value-a]', '[value-b]')),
  [field-2] text not null check ([field-2] in ('[type-a]', '[type-b]', '[type-c]')),

  -- Location
  [entity-geo] text not null,
  [field-3] text not null,
  [field-4] text,
  address text,
  lat decimal(10, 8),
  lng decimal(11, 8),

  -- Details
  [field-5] integer not null,
  [field-6] integer,
  [field-7] integer,
  [field-8] integer,
  features text[],

  -- [BUSINESS-LOGIC-KEY]
  [business_logic_field] timestamptz default now(),

  -- Relationships
  [entity-tertiary]_id uuid references public.[entity-tertiary](id) on delete cascade,

  -- Status
  status text default 'active' check (status in ('draft', 'active', 'expired', 'completed')),
  featured boolean default false,
  display_order integer default 0,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id)
);

-- Indexes
create index [entity-primary]_slug_idx on public.[entity-primary](slug);
create index [entity-primary]_status_idx on public.[entity-primary](status);
create index [entity-primary]_[entity-geo]_idx on public.[entity-primary]([entity-geo]);
create index [entity-primary]_[field-3]_idx on public.[entity-primary]([field-3]);
create index [entity-primary]_[field-1]_idx on public.[entity-primary]([field-1]);
create index [entity-primary]_[entity-tertiary]_id_idx on public.[entity-primary]([entity-tertiary]_id);
create index [entity-primary]_[business_logic_field]_idx on public.[entity-primary]([business_logic_field]);
create index [entity-primary]_lat_lng_idx on public.[entity-primary](lat, lng);

-- Access control is handled at the application layer via getSession() and requireSuperadmin()
-- Public queries filter by status = 'active'
-- [TARGET-USER-B] queries filter by [entity-tertiary]_id matching the authenticated user's [entity-tertiary]
```

#### [entity-secondary] Table

```sql
-- Migration: create_[entity-secondary]_table.sql
create table public.[entity-secondary] (
  id uuid default gen_random_uuid() primary key,

  -- Contact info
  name text not null,
  email text not null,
  phone text,
  message text,

  -- Relationship
  [entity-primary]_id uuid references public.[entity-primary](id) on delete cascade,
  [entity-tertiary]_id uuid references public.[entity-tertiary](id) on delete cascade,

  -- Status
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index [entity-secondary]_[entity-primary]_id_idx on public.[entity-secondary]([entity-primary]_id);
create index [entity-secondary]_[entity-tertiary]_id_idx on public.[entity-secondary]([entity-tertiary]_id);
create index [entity-secondary]_status_idx on public.[entity-secondary](status);
create index [entity-secondary]_created_at_idx on public.[entity-secondary](created_at desc);

-- Access control is handled at the application layer via getSession()
-- [TARGET-USER-B] queries filter by [entity-tertiary]_id matching the authenticated user's [entity-tertiary]
-- Public enquiry form creates [entity-secondary] via API route (no auth required)
```

#### [entity-tertiary] Table

```sql
-- Migration: create_[entity-tertiary]_table.sql
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

-- Indexes
create index [entity-tertiary]_slug_idx on public.[entity-tertiary](slug);
create index [entity-tertiary]_status_idx on public.[entity-tertiary](status);
create index [entity-tertiary]_verified_idx on public.[entity-tertiary](verified);
```

---

### Layer 2: Type Definitions

**Location:** `packages/database/src/types/`

#### [entity-primary] Types

```typescript
// packages/database/src/types/[entity-primary].ts

export type [EntityPrimaryField1] = '[value-a]' | '[value-b]'
export type [EntityPrimaryField2] = '[type-a]' | '[type-b]' | '[type-c]'
export type [EntityPrimary]Status = 'draft' | 'active' | 'expired' | 'completed'

export interface [EntityPrimary] {
  id: string
  slug: string
  title: string
  description: string

  // Type
  [field1]: [EntityPrimaryField1]
  [field2]: [EntityPrimaryField2]

  // Location
  [entityGeo]: string
  [field3]: string
  [field4]?: string
  address?: string
  lat?: number
  lng?: number

  // Details
  [field5]: number
  [field6]?: number
  [field7]?: number
  [field8]?: number
  features?: string[]

  // Photos (joined)
  photos?: [EntityPrimary]Photo[]

  // [BUSINESS-LOGIC-KEY]
  [businessLogicField]?: string
  [businessLogicStatus]?: 'fresh' | 'expiring' | 'expired'
  [businessLogicCountdown]?: number

  // Relationships
  [entityTertiary]Id: string
  [entityTertiary]?: [EntityTertiary]

  // Status
  status: [EntityPrimary]Status
  featured: boolean
  displayOrder: number

  // [entity-secondary] count (computed)
  [entitySecondary]Count?: number

  // Timestamps
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

export interface Create[EntityPrimary]Input {
  slug: string
  title: string
  description: string
  [field1]: [EntityPrimaryField1]
  [field2]: [EntityPrimaryField2]
  [entityGeo]: string
  [field3]: string
  [field4]?: string
  address?: string
  lat?: number
  lng?: number
  [field5]: number
  [field6]?: number
  [field7]?: number
  [field8]?: number
  features?: string[]
  status?: [EntityPrimary]Status
  featured?: boolean
}

export interface Update[EntityPrimary]Input extends Partial<Create[EntityPrimary]Input> {}

export interface [EntityPrimary]Filters {
  [field1]?: [EntityPrimaryField1]
  [field2]?: [EntityPrimaryField2]
  [entityGeo]?: string
  [field3]?: string
  min[Field5]?: number
  max[Field5]?: number
  min[Field6]?: number
  status?: [EntityPrimary]Status
  featured?: boolean
  bbox?: [number, number, number, number] // [minLng, minLat, maxLng, maxLat]
}

// [BUSINESS-LOGIC-KEY] helper
export function calculate[BusinessLogicStatus]([businessLogicField]: string | null): {
  status: 'fresh' | 'expiring' | 'expired'
  [businessLogicCountdown]: number
} {
  if (![businessLogicField]) {
    return { status: 'expired', [businessLogicCountdown]: 0 }
  }

  const fieldDate = new Date([businessLogicField])
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - fieldDate.getTime()) / (1000 * 60 * 60 * 24))
  const daysRemaining = [BUSINESS_LOGIC_THRESHOLD] - daysSince

  if (daysRemaining <= 0) {
    return { status: 'expired', [businessLogicCountdown]: 0 }
  } else if (daysRemaining <= 7) {
    return { status: 'expiring', [businessLogicCountdown]: daysRemaining }
  } else {
    return { status: 'fresh', [businessLogicCountdown]: daysRemaining }
  }
}
```

#### [entity-secondary] Types

```typescript
// packages/database/src/types/[entity-secondary].ts

export type [EntitySecondary]Status = 'new' | 'contacted' | 'qualified' | 'closed' | 'spam'

export interface [EntitySecondary] {
  id: string
  name: string
  email: string
  phone?: string
  message?: string
  [entityPrimary]Id: string
  [entityTertiary]Id: string
  status: [EntitySecondary]Status
  createdAt: string
  updatedAt: string

  // Joined
  [entityPrimary]?: {
    id: string
    slug: string
    title: string
    [field3]: string
    [field5]: number
  }
}

export interface Create[EntitySecondary]Input {
  name: string
  email: string
  phone?: string
  message?: string
  [entityPrimary]Id: string
}

export interface Update[EntitySecondary]Input {
  status?: [EntitySecondary]Status
}

export interface [EntitySecondary]Filters {
  status?: [EntitySecondary]Status
  [entityPrimary]Id?: string
}
```

---

### Layer 3: API Routes

**Location:** `[APP-API]/src/app/api/admin/`

#### [entity-primary] API

```typescript
// [APP-API]/src/app/api/admin/[entity-primary]/route.ts

import { db } from '@[project]/shared/lib/db/client'
import { getSession } from '@[project]/shared/lib/auth'
import { NextResponse } from 'next/server'
import type { [EntityPrimary], Create[EntityPrimary]Input, [EntityPrimary]Filters } from '@[project]/database/types'

// Helper: snake_case → camelCase
function transform[EntityPrimary](row: any): [EntityPrimary] {
  const { status, [businessLogicCountdown] } = calculate[BusinessLogicStatus](row.[business_logic_field])

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    [field1]: row.[field_1],
    [field2]: row.[field_2],
    [entityGeo]: row.[entity_geo],
    [field3]: row.[field_3],
    [field4]: row.[field_4],
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    [field5]: row.[field_5],
    [field6]: row.[field_6],
    [field7]: row.[field_7],
    [field8]: row.[field_8],
    features: row.features || [],
    [businessLogicField]: row.[business_logic_field],
    [businessLogicStatus]: status,
    [businessLogicCountdown],
    [entityTertiary]Id: row.[entity_tertiary]_id,
    status: row.status,
    featured: row.featured,
    displayOrder: row.display_order,
    [entitySecondary]Count: row.[entity_secondary]_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * GET /api/admin/[entity-primary]
 * List [TARGET-USER-B]'s [entity-tertiary] [entity-primary]
 */
export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    // Get [TARGET-USER-B]'s [entity-tertiary]
    const userResult = await db.query(
      'SELECT [entity-tertiary]_id FROM [target-user-b-table] WHERE user_id = $1 LIMIT 1',
      [session.user.id]
    )

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: '[TARGET-USER-B] not found' }, { status: 401 })
    }

    const [entityTertiary]Id = userResult.rows[0].[entity_tertiary]_id

    // Build query with optional status filter
    const status = searchParams.get('status')
    const params: any[] = [[entityTertiary]Id]
    let sql = `
      SELECT e.*,
        (SELECT COUNT(*) FROM [entity-secondary] WHERE [entity-primary]_id = e.id) AS [entity_secondary]_count
      FROM [entity-primary] e
      WHERE e.[entity-tertiary]_id = $1
    `

    if (status) {
      sql += ' AND e.status = $2'
      params.push(status)
    }

    sql += ' ORDER BY e.display_order ASC'

    const { rows } = await db.query(sql, params)

    const items = rows.map(transform[EntityPrimary])

    return NextResponse.json({ [entityPrimary]: items })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/admin/[entity-primary]
 * Create new [entity-primary]
 */
export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const body: Create[EntityPrimary]Input = await request.json()

    // Get [TARGET-USER-B]'s [entity-tertiary]
    const userResult = await db.query(
      'SELECT [entity-tertiary]_id FROM [target-user-b-table] WHERE user_id = $1 LIMIT 1',
      [session.user.id]
    )

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: '[TARGET-USER-B] not found' }, { status: 401 })
    }

    const [entityTertiary]Id = userResult.rows[0].[entity_tertiary]_id

    // Validate required fields
    const requiredFields = ['slug', 'title', 'description', '[field1]', '[field2]', '[entityGeo]', '[field3]', '[field5]']
    for (const field of requiredFields) {
      if (!body[field as keyof Create[EntityPrimary]Input]) {
        return NextResponse.json({ error: `Missing: ${field}` }, { status: 400 })
      }
    }

    const { rows } = await db.query(
      `INSERT INTO [entity-primary] (
        slug, title, description, [field_1], [field_2],
        [entity_geo], [field_3], [field_4], address, lat, lng,
        [field_5], [field_6], [field_7], [field_8], features,
        status, featured, [entity_tertiary]_id, [business_logic_field]
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16,
        $17, $18, $19, NOW()
      ) RETURNING *`,
      [
        body.slug, body.title, body.description, body.[field1], body.[field2],
        body.[entityGeo], body.[field3], body.[field4] || null, body.address || null, body.lat || null, body.lng || null,
        body.[field5], body.[field6] || null, body.[field7] || null, body.[field8] || null, body.features || [],
        body.status || 'active', body.featured || false, [entityTertiary]Id,
      ]
    )

    return NextResponse.json({ [entityPrimary]: transform[EntityPrimary](rows[0]) }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

#### [entity-primary] Actions

```typescript
// [APP-API]/src/app/api/admin/[entity-primary]/[id]/confirm/route.ts

import { db } from '@[project]/shared/lib/db/client'
import { getSession } from '@[project]/shared/lib/auth'
import { NextResponse } from 'next/server'

/**
 * POST /api/admin/[entity-primary]/[id]/confirm
 * Refresh [BUSINESS-LOGIC-KEY]
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSession()
    if (!session.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    // Verify ownership via [TARGET-USER-B]'s [entity-tertiary]
    const userResult = await db.query(
      'SELECT [entity-tertiary]_id FROM [target-user-b-table] WHERE user_id = $1 LIMIT 1',
      [session.user.id]
    )

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: '[TARGET-USER-B] not found' }, { status: 401 })
    }

    const [entityTertiary]Id = userResult.rows[0].[entity_tertiary]_id

    const { rows } = await db.query(
      `UPDATE [entity-primary]
       SET [business_logic_field] = NOW(), updated_at = NOW()
       WHERE id = $1 AND [entity-tertiary]_id = $2
       RETURNING *`,
      [id, [entityTertiary]Id]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: '[entity-primary] not found' }, { status: 404 })
    }

    return NextResponse.json({ [entityPrimary]: transform[EntityPrimary](rows[0]) })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

### Layer 4: Admin Page UI

**Location:** `[APP-API]/src/app/admin/(dashboard)/[entity-primary]/page.tsx`

```tsx
'use client'

import { useState, useEffect } from 'react'
import { Plus, RefreshCw, Edit2, Trash2, Eye, ExternalLink } from 'lucide-react'
import type { [EntityPrimary] } from '@[project]/database/types'
import Image from 'next/image'
import Link from 'next/link'

export default function [EntityPrimary]Page() {
  const [items, setItems] = useState<[EntityPrimary][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring' | 'expired'>('all')

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/[entity-primary]')
      const data = await res.json()
      if (res.ok) setItems(data.[entityPrimary])
    } catch (error) {
      console.error('Error loading [entity-primary]:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function confirmItem(id: string) {
    try {
      const res = await fetch(`/api/admin/[entity-primary]/${id}/confirm`, {
        method: 'POST',
      })
      if (res.ok) await loadItems()
    } catch (error) {
      console.error('Error confirming [entity-primary]:', error)
    }
  }

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'active') return item.[businessLogicStatus] === 'fresh'
    if (filter === 'expiring') return item.[businessLogicStatus] === 'expiring'
    if (filter === 'expired') return item.[businessLogicStatus] === 'expired'
    return true
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[BRAND-PRIMARY]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[BRAND-DARK]">[EntityPrimary]</h1>
          <p className="text-[BRAND-DARK]/60 text-sm">
            Manage your [entity-primary]
          </p>
        </div>
        <Link
          href="/admin/[entity-primary]/new"
          className="flex items-center gap-2 px-4 py-2 bg-[BRAND-PRIMARY] text-white rounded-lg hover:bg-[BRAND-PRIMARY]/90"
        >
          <Plus size={20} />
          Add [EntityPrimary]
        </Link>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2">
        {(['all', 'active', 'expiring', 'expired'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-[BRAND-PRIMARY] text-white'
                : 'bg-[BRAND-BG] text-[BRAND-DARK] hover:bg-[BRAND-BG]/80'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">[EntityPrimary]</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Location</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">[Field5]</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">[BUSINESS-LOGIC-KEY]</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">[entity-secondary]</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {item.photos?.[0] && (
                      <div className="relative w-16 h-12 rounded overflow-hidden">
                        <Image
                          src={item.photos[0].url}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-[BRAND-DARK]">{item.title}</div>
                      <div className="text-sm text-gray-500">
                        {item.[field6]} [field-6] · {item.[field7]} [field-7] · {item.[field8]}[unit]
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.[field3]}, {item.[entityGeo]}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-[BRAND-DARK]">
                  [currency]{item.[field5].toLocaleString()}
                  {item.[field1] === '[value-a]' && '/[unit]'}
                </td>
                <td className="px-4 py-3">
                  <[BusinessLogic]Badge item={item} />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.[entitySecondary]Count || 0}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {item.[businessLogicStatus] !== 'fresh' && (
                      <button
                        onClick={() => confirmItem(item.id)}
                        className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                        title="Confirm [BUSINESS-LOGIC-KEY]"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}
                    <Link
                      href={`/admin/[entity-primary]/${item.id}/edit`}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <a
                      href={`/[detail-route]/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="View on site"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No [entity-primary] found
          </div>
        )}
      </div>
    </div>
  )
}

function [BusinessLogic]Badge({ item }: { item: [EntityPrimary] }) {
  const colors = {
    fresh: 'bg-green-100 text-green-800',
    expiring: 'bg-amber-100 text-amber-800',
    expired: 'bg-red-100 text-red-800',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.[businessLogicStatus] || 'expired']}`}>
      {item.[businessLogicStatus] === 'fresh' && `${item.[businessLogicCountdown]}d left`}
      {item.[businessLogicStatus] === 'expiring' && `${item.[businessLogicCountdown]}d left`}
      {item.[businessLogicStatus] === 'expired' && 'Expired'}
    </span>
  )
}
```

---

### Layer 5: Admin Components

**Location:** `[APP-ADMIN]/components/`

#### [entity-primary] Form

```tsx
// [APP-ADMIN]/components/[entity-primary]/[EntityPrimary]Form.tsx
// Multi-step form for creating/editing [entity-primary]
// Step 1: Type selection
// Step 2: Location ([entity-geo], area, map pin)
// Step 3: Details ([field-6], [field-7], [field-8], features)
// Step 4: Photos (drag to reorder, min 5)
// Step 5: [field-5] (exact value, no TBD!)
// Step 6: Review & publish
```

#### [BUSINESS-LOGIC-KEY] Widget

```tsx
// [APP-ADMIN]/components/dashboard/[BusinessLogic]Widget.tsx
// Dashboard widget showing [entity-primary] requiring attention
// - Count of expiring (≤7 days)
// - Count of expired
// - Bulk confirm action
```

#### Brand Compliance (Layers 4 & 5)

> **Every UI component CRUDX builds must be brand-compliant.**
> Consult `[DESIGN-GUIDE-PATH]` for the full approved palette, backgrounds, and card treatment.

| Context | Rule |
|---------|------|
| **Marketing pages** | `bg-[BRAND-BG]` canvas, `bg-white` cards with `shadow-[0_4px_20px_rgba(0,0,0,0.08)]`, rounded-2xl. **Never** use `bg-slate-*` or `bg-gray-*` as page/section backgrounds. |
| **Admin pages** | Follow existing admin patterns (UXPATX). White/dark mode, existing card class. |
| **Status badges** | Use project-defined badge classes from globals.css — never hand-roll badge colours. |
| **Interactive elements** | `bg-[BRAND-PRIMARY]` for CTAs, `text-[BRAND-DARK]` for primary text, `[BRAND-SECONDARY]/20` for loading skeletons. |

**AI Slop Provenance Rule:** Every visual element (colour, border, shadow, gradient) must already exist on another live [PROJECT] page. If it doesn't, it's orphan styling and must be rejected. No thick coloured borders, no gratuitous gradients, no decorative elements that don't appear elsewhere in the product.

All CRUDX UI output must pass **SOFAX Dimension 11 (Brand Compliance & AI Slop)** — see `[DESIGN-GUIDE-PATH]` and the AI Slop Test (10 Red Flags).

---

### Layer 6: Integration Points

#### Admin Navigation

```typescript
// [APP-ADMIN]/components/layout/AdminNav.tsx
const navItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: '[EntityPrimary]', href: '/admin/[entity-primary]', icon: Building },
  { name: '[EntitySecondary]', href: '/admin/inbox', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]
```

#### Marketing Site (Public API)

```typescript
// [APP-API]/src/app/api/[entity-primary]/route.ts (or /api/search/)
// Public endpoint for [entity-primary] search
// Uses db.query() with status='active' filter
// Supports bbox for [MAP-SERVICE] filtering
```

---

## [PROJECT] CRUDX Checklist

### [entity-primary] CRUDX

- [ ] **Database:** `[entity-primary]` table with [BUSINESS-LOGIC-KEY] columns
- [ ] **Types:** `[EntityPrimary]`, `Create[EntityPrimary]Input`, `[EntityPrimary]Filters`
- [ ] **API:** `/api/admin/[entity-primary]/*` with CRUD + confirm
- [ ] **UI:** [entity-primary] table with [BUSINESS-LOGIC-KEY] badges
- [ ] **Components:** [EntityPrimary]Form (multi-step), [BusinessLogic]Badge
- [ ] **Integration:** Dashboard widget, navigation link

### [entity-secondary] CRUDX

- [ ] **Database:** `[entity-secondary]` table linked to [entity-primary]
- [ ] **Types:** `[EntitySecondary]`, `Create[EntitySecondary]Input`
- [ ] **API:** `/api/admin/[entity-secondary]/*` with status updates
- [ ] **UI:** [entity-secondary] inbox with status workflow
- [ ] **Components:** [EntitySecondary]Card, StatusSelect
- [ ] **Integration:** [entity-secondary] count on [entity-primary], dashboard stats

### [entity-tertiary] CRUDX

- [ ] **Database:** `[entity-tertiary]` table with verification
- [ ] **Types:** `[EntityTertiary]`, verification status
- [ ] **API:** Admin verification endpoints
- [ ] **UI:** [entity-tertiary] management (admin only)
- [ ] **Integration:** [entity-tertiary] branding on [entity-primary]

---

## [PROJECT] Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Database columns | `snake_case` | `[field_1]`, `[business_logic_field]` |
| TypeScript | `camelCase` | `[field1]`, `[businessLogicField]` |
| API routes | `kebab-case` | `/api/admin/[entity-primary]` |
| Component files | `PascalCase` | `[EntityPrimary]Form.tsx` |

---

## Integration with Other Frameworks

### CRUDX + CODAX

1. **CODAX** plans the feature (what, why, how)
2. **CRUDX** builds the complete system (6 layers)

### CRUDX + TUCHX

1. **CRUDX** builds admin interface (desktop)
2. **TUCHX** optimizes public interfaces (mobile)

### CRUDX + SOFAX

1. **CRUDX** builds the admin UI
2. **SOFAX** audits the UX quality

---

**Framework Status:** Template (customise for project)
**Last Updated:** February 28, 2026
**Version:** 2.0 (Generic Template)
