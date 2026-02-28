# HARDX Framework — [PROJECT] Edition

> **Hardcoded Value Detection & CRUD Conversion System**
>
> Identify hardcoded values and convert them to database-backed CRUD systems.
> Optimized for [PROJECT-DOMAIN] patterns.

---

## [PROJECT] Context

**HARDX for [PROJECT]** understands:
- **Entity categories** - e.g. category-1, category-2, category-3
- **Entity types** - e.g. type-1, type-2
- **[entity-geo]** - e.g. region-1, region-2, region-3
- **Status enums** - e.g. draft, active, expired, completed
- **Features lists** - e.g. feature-1, feature-2, feature-3
- **Monorepo structure** - `[APP-PUBLIC]`, `[APP-ADMIN]`

---

## Quick Start

```
run HARDX                      # Full scan of [PROJECT] codebase
run HARDX on public            # Scan public app only
run HARDX on admin             # Scan admin app only
run HARDX report               # Show current hardcoded inventory
run HARDX implement [item]     # Convert specific item to CRUD
```

---

## [PROJECT] Detection Patterns

### Pattern 1: Entity Categories (HIGH Priority)

```typescript
// DETECTED - Hardcoded entity categories
const CATEGORIES = [
  '[CategoryType-1]',
  '[CategoryType-2]',
  '[CategoryType-3]',
  '[CategoryType-4]',
  '[CategoryType-5]',
]

// Also detected inline
<select>
  <option value="[CategoryType-1]">[CategoryType-1]</option>
  <option value="[CategoryType-2]">[CategoryType-2]</option>
  ...
</select>
```

**[PROJECT] Consideration:** Entity categories are core to the platform and rarely change. Keep as database enum constraint, but don't need full CRUD.

### Pattern 2: Features List (HIGH Priority)

```typescript
// DETECTED - Hardcoded features
const FEATURES = [
  'Feature 1',
  'Feature 2',
  'Feature 3',
  'Feature 4',
  'Feature 5',
  'Feature 6',
  'Feature 7',
  'Feature 8',
]
```

**[PROJECT] Consideration:** Features should be CRUD-managed. Users may want to add custom features specific to [PROJECT-DOMAIN].

### Pattern 3: [entity-geo] (MEDIUM Priority)

```typescript
// DETECTED - Hardcoded [entity-geo]
const REGIONS = [
  { value: 'region-1', label: 'Region 1' },
  { value: 'region-2', label: 'Region 2' },
  { value: 'region-3', label: 'Region 3' },
]
```

**[PROJECT] Consideration:** [entity-geo] are already in database (`[entity-geo]` table). If hardcoded elsewhere, should reference database.

### Pattern 4: Cities by Region (HIGH Priority)

```typescript
// DETECTED - Hardcoded city lists
const REGION_1_CITIES = ['City A', 'City B', 'City C', 'City D']
const REGION_2_CITIES = ['City E', 'City F', 'City G']
```

**[PROJECT] Consideration:** Cities should be in database with [entity-geo] relationship. CRUD required for expansion.

### Pattern 5: Status Enums (LOW Priority)

```typescript
// DETECTED - Status enum
const ENTITY_STATUSES = ['draft', 'active', 'expired', 'completed']
const SECONDARY_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'spam']
```

**[PROJECT] Consideration:** Core system enums with database constraints. Keep as code + database CHECK constraints.

---

## [PROJECT] Classification

### HIGH Priority (Convert to CRUD)

| Item | Reason | Action |
|------|--------|--------|
| Features | Users need custom features | Create `features` table |
| Cities | New cities as coverage expands | Create `cities` table |
| Amenities | Similar to features | Create `amenities` table |
| Price ranges | Filter presets | Create `price_ranges` table |

### MEDIUM Priority (Database Reference)

| Item | Reason | Action |
|------|--------|--------|
| [entity-geo] | Already in database | Reference `[entity-geo]` table |
| [entity-tertiary] | Already in database | Reference `[entity-tertiary]` table |

### LOW Priority (Keep as Code)

| Item | Reason | Action |
|------|--------|--------|
| Entity categories | Core enum, rarely changes | Keep as CHECK constraint |
| Entity types | Limited set only | Keep as CHECK constraint |
| Status enums | System states | Keep as CHECK constraint |

---

## [PROJECT] CRUD Implementation

### Example: Features Table

**Step 1: Database Migration**

```sql
-- migrations/XXXXX_create_features.sql

CREATE TABLE public.features (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT 'general',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default features
INSERT INTO public.features (name, slug, category, sort_order) VALUES
  ('Feature 1', 'feature-1', 'exterior', 1),
  ('Feature 2', 'feature-2', 'exterior', 2),
  ('Feature 3', 'feature-3', 'exterior', 3),
  ('Feature 4', 'feature-4', 'views', 4),
  ('Feature 5', 'feature-5', 'views', 5),
  ('Feature 6', 'feature-6', 'interior', 6),
  ('Feature 7', 'feature-7', 'interior', 7),
  ('Feature 8', 'feature-8', 'exterior', 8);

-- Auth is enforced at the app layer via requireSuperadmin() / getSession()
-- No RLS — [DATABASE], app-layer auth
```

**Step 2: API Route**

```typescript
// [APP-API]/src/app/api/settings/features/route.ts

import { db } from '@[PROJECT]/shared/lib/db/client'
import { requireSuperadmin } from '@[PROJECT]/shared/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const { rows: features } = await db.query(
    `SELECT * FROM features WHERE is_active = true ORDER BY sort_order`
  )

  return NextResponse.json({ features })
}

export async function POST(request: Request) {
  const error = await requireSuperadmin()
  if (error) return error

  const { name, category, icon } = await request.json()
  const slug = name.toLowerCase().replace(/\s+/g, '-')

  const { rows } = await db.query(
    `INSERT INTO features (name, slug, category, icon)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, slug, category, icon]
  )

  return NextResponse.json({ feature: rows[0] }, { status: 201 })
}
```

**Step 3: Admin Settings UI**

Add "Features" section to admin Settings page:
- List view with drag-to-reorder
- Add new feature button
- Edit feature name/category
- Soft delete (deactivate)

**Step 4: Update Consumers**

```typescript
// BEFORE (hardcoded)
const FEATURES = ['Feature 1', 'Feature 2', 'Feature 3']

// AFTER (API-backed)
const [features, setFeatures] = useState<Feature[]>([])

useEffect(() => {
  fetch('/api/settings/features')
    .then(res => res.json())
    .then(data => setFeatures(data.features))
}, [])

// In entity form
{features.map(feature => (
  <Checkbox
    key={feature.id}
    id={feature.slug}
    label={feature.name}
    checked={selectedFeatures.includes(feature.slug)}
    onChange={() => toggleFeature(feature.slug)}
  />
))}
```

---

## [PROJECT] Report Format

```
# HARDX SCAN REPORT - [PROJECT]
Generated: 2026-01-13
Scanned: [APP-PUBLIC], [APP-ADMIN]

## HIGH PRIORITY (Action Required)

### 1. FEATURES
- **Files**: EntityForm.tsx:45, SearchFilters.tsx:23
- **Values**: Feature 1, Feature 2, Feature 3, Feature 4, etc. (8 total)
- **Duplicates**: 2 files
- **Status**: NOT CRUD
- **Action**: Create `features` table, add to Settings

### 2. CITIES
- **Files**: LocationPicker.tsx:12, SearchFilters.tsx:67
- **Values**: City A, City B, City C, City D, etc. (12 total)
- **Duplicates**: 2 files
- **Status**: NOT CRUD
- **Action**: Create `cities` table with [entity-geo] FK

## MEDIUM PRIORITY (Reference Database)

### 3. [entity-geo]
- **Files**: SearchFilters.tsx:34
- **Values**: Region 1, Region 2, Region 3
- **Status**: EXISTS IN DB ([entity-geo] table)
- **Action**: Replace hardcoded with API fetch

## LOW PRIORITY (Keep as Code)

### 4. ENTITY_CATEGORIES
- **Files**: EntityForm.tsx:8
- **Values**: [CategoryType-1], [CategoryType-2], [CategoryType-3]
- **Reason**: Core enum with DB constraint
- **Action**: Document, keep as is

### 5. ENTITY_STATUSES
- **Files**: EntitiesTable.tsx:15
- **Values**: draft, active, expired, completed
- **Reason**: System state enum
- **Action**: Keep as code + DB constraint

## SUMMARY

| Priority | Count | Status |
|----------|-------|--------|
| HIGH | 2 | Action Required |
| MEDIUM | 1 | Reference DB |
| LOW | 5 | Documented |
| IGNORE | 3 | Skipped |
```

---

## [PROJECT] Scanning Commands

```bash
# Find hardcoded arrays in [PROJECT]
grep -rn "const\s\+[A-Z_]\+\s*=\s*\[" apps/*/src --include="*.tsx"

# Find feature-like patterns
grep -rn "FEATURES\|AMENITIES\|CATEGORIES" apps/*/src --include="*.tsx"

# Find region/city patterns
grep -rn "REGIONS\|CITIES\|LOCATIONS" apps/*/src --include="*.tsx"

# Find inline select options
grep -rn "<option value=" apps/*/src --include="*.tsx"

# Find duplicated constants
grep -rln "const FEATURES" apps/*/src --include="*.tsx" | wc -l
```

---

## [PROJECT] Implementation Checklist

When converting a [PROJECT] hardcoded item to CRUD:

- [ ] Create migration in `migrations/` ([DATABASE])
- [ ] Run migration on development database
- [ ] Add app-layer auth guards (`requireSuperadmin()` for writes, public reads)
- [ ] Create API route for listing (GET)
- [ ] Create API route for creating (POST)
- [ ] Create API route for updating (PUT)
- [ ] Create API route for deleting (DELETE)
- [ ] Add Settings UI section in admin
- [ ] Update all consuming components to fetch from API
- [ ] Remove hardcoded constants
- [ ] Seed default values in migration
- [ ] Test full CRUD flow
- [ ] Run CONSX on new Settings UI
- [ ] Run AUDIX to verify endpoints

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CRUDX** | Use CRUDX patterns for CRUD implementation |
| **CONEX** | HARDX findings become CONEX schema |
| **CONSX** | Run after implementing to verify UI consistency |
| **AUDIX** | Verify new endpoints with AUDIX |

---

**Framework Status:** Template
**Last Updated:** February 28, 2026
**Version:** 2.0 (Template Edition)
