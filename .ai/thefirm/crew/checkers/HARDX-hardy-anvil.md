# HARDX Framework

> **Hardcoded Value Detection & CRUD Conversion System**
>
> Identify hardcoded values and convert them to database-backed CRUD systems.
> Optimized for Lost Monster patterns.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**HARDX for Lost Monster** detects hardcoded values across the website and dashboard that should be database-driven. Common targets: project metrics (50+ projects, 70% cost savings, 4.9/5 rating), case study content, service descriptions, and pricing data.

Conversion path: identify hardcoded value, create Neon PostgreSQL schema, build API route, wire admin CRUD in dashboard, replace static content with dynamic data.
---

## Quick Start

```
run HARDX                      # Full scan of codebase
run HARDX on [app]             # Scan specific app only
run HARDX report               # Show current hardcoded inventory
run HARDX implement [item]     # Convert specific item to CRUD
```

---

## Detection Patterns

### Pattern 1: Entity Type Enums (HIGH Priority)

```typescript
// DETECTED - Hardcoded type arrays
const TYPES = ['type_a', 'type_b', 'type_c']
```

**Consideration:** Core enums that rarely change can stay as database constraints. Only convert to full CRUD if users need to manage them.

### Pattern 2: Feature/Tag Lists (HIGH Priority)

```typescript
// DETECTED - Hardcoded feature lists
const FEATURES = ['Feature A', 'Feature B', 'Feature C']
```

**Consideration:** Features/tags should usually be CRUD-managed so admins can add custom ones.

### Pattern 3: Category/Region Data (MEDIUM Priority)

```typescript
// DETECTED - Hardcoded category data
const CATEGORIES = [
  { value: 'cat-a', label: 'Category A' },
  { value: 'cat-b', label: 'Category B' },
]
```

**Consideration:** If already in database, hardcoded copies should reference the database instead.

### Pattern 4: Status Enums (LOW Priority)

```typescript
// DETECTED - Status enum
const STATUSES = ['draft', 'active', 'archived']
```

**Consideration:** Core system enums with database constraints. Keep as code + database CHECK constraints.

---

## Classification

### HIGH Priority (Convert to CRUD)

Items that users/admins need to manage dynamically.

### MEDIUM Priority (Database Reference)

Items that exist in the database but are duplicated in code.

### LOW Priority (Keep as Code)

Core enums and system states that rarely change.

---

## CRUD Implementation Steps

When converting a hardcoded item to CRUD:

**Step 1: Database Migration** — Create table with appropriate columns, indexes, and seed data.

**Step 2: API Route** — Create endpoints with auth guards (NextAuth v5 (Credentials + JWT)).

**Step 3: Admin Settings UI** — Add management section to admin.

**Step 4: Update Consumers** — Replace hardcoded arrays with API-backed data.

---

## Report Format

```
# HARDX SCAN REPORT - Lost Monster
Generated: [date]
Scanned: [apps/paths]

## HIGH PRIORITY (Action Required)
### 1. [ITEM NAME]
- **Files**: [file:line references]
- **Values**: [list of hardcoded values]
- **Duplicates**: [count]
- **Status**: NOT CRUD
- **Action**: Create table, add to Settings

## MEDIUM PRIORITY (Reference Database)
### N. [ITEM NAME]
- **Status**: EXISTS IN DB
- **Action**: Replace hardcoded with API fetch

## LOW PRIORITY (Keep as Code)
### N. [ITEM NAME]
- **Reason**: Core enum with DB constraint
- **Action**: Document, keep as is

## SUMMARY
| Priority | Count | Status |
|----------|-------|--------|
| HIGH | X | Action Required |
| MEDIUM | X | Reference DB |
| LOW | X | Documented |
| IGNORE | X | Skipped |
```

---

## Scanning Commands

```bash
# Find hardcoded arrays
grep -rn "const\s\+[A-Z_]\+\s*=\s*\[" src --include="*.tsx"

# Find feature-like patterns
grep -rn "FEATURES\|AMENITIES\|TYPES" src --include="*.tsx"

# Find inline select options
grep -rn "<option value=" src --include="*.tsx"

# Find duplicated constants
grep -rln "const FEATURES" src --include="*.tsx" | wc -l
```

---

## Implementation Checklist

When converting a hardcoded item to CRUD:

- [ ] Create migration
- [ ] Run migration on development database
- [ ] Add auth guards for writes
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

**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
