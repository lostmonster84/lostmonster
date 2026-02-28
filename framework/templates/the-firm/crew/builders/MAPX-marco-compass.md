# MAPX — Complete Application Map Framework — [PROJECT] Edition

> **Marco Compass: Chief Cartography Officer**
> "If it's not on the map, it doesn't exist."
> Member of The Firm
>
> The most comprehensive wiring diagram for [PROJECT-DOMAIN].
> Every route, every click, every database touch, every action.
---

## [PROJECT] Context

**MAPX for [PROJECT]** understands:
- **Monorepo structure** - `[APP-PUBLIC]`, `[APP-ADMIN]`, `[APP-SUPERADMIN]`, `[APP-API]` + `packages/shared`, `packages/database`, `packages/ui`
- **PostgreSQL tables** - [entity-primary], [entity-secondary], [entity-tertiary], profiles, [entity-geo]
- **Public vs Protected** - Marketing (public), Admin ([TARGET-USER-B] auth), Superadmin (internal ops)
- **[BUSINESS-LOGIC-KEY]** - Core business rule tracking
- **Map-centric discovery** - Bounding box filtering (if applicable)

---

## [PROJECT] MAPX Output Structure

```
[project]/docs/mapx/
├── README.md              # Overview + quick reference
├── STATUS.md              # 🔥 LIVING AUDIT - What's built & working (checkboxes)
├── STRUCTURE.md           # Monorepo layout
├── ROUTES.md              # Master route index
├── PAGES/
│   ├── marketing/
│   │   ├── homepage.md
│   │   ├── search.md
│   │   ├── [entity-primary]-detail.md
│   │   └── [entity-geo]-landing.md
│   ├── admin/
│   │   ├── dashboard.md
│   │   ├── [entity-primary].md
│   │   ├── [entity-secondary].md
│   │   └── settings.md
│   └── superadmin/
│       ├── overview.md
│       ├── [entity-tertiary].md
│       ├── canary.md
│       └── settings.md
├── API.md                 # Complete API endpoint index
├── DATABASE.md            # Schema + page relationships
├── COMPONENTS.md          # Component dependency graph
├── NAVIGATION.md          # All nav elements
└── EXTERNAL.md            # [DATABASE], [OBJECT-STORAGE], [PAYMENT-SERVICE] integrations
```

---

## STATUS.md - Living Audit System

**STATUS.md is the living audit document** that tracks what's actually working.

### Structure

```markdown
# Project System Status

> Living audit of all routes, APIs, and database connections
> Last verified: {date}

## Quick Stats
| App | Pages | Working | APIs | Working |
|-----|-------|---------|------|---------|
| Marketing | X | X | X | X |
| Admin | X | X | X | X |
| Superadmin | X | X | X | X |

## Legend
| Symbol | Meaning |
|--------|---------|
| ✅ | Working & verified |
| 🚧 | In progress |
| ❌ | Not built / N/A |
| ⚠️ | Has issues |

## Marketing App
### Pages
| Route | Renders | DB | Auth | Notes |
|-------|---------|-----|------|-------|
| `/` | ✅ | ✅ | N/A | Homepage |

### API Endpoints
| Endpoint | Method | Works | Auth | DB |
|----------|--------|-------|------|-----|
| `/api/search` | GET | ✅ | N/A | ✅ |

## Database Tables
| Table | App1 | App2 | RLS |
|-------|------|------|-----|
| profiles | ✅ | ✅ | ✅ |

## MVP Checklist
- [x] Feature 1
- [ ] Feature 2

## Verification Log
| Date | Verified By | Scope |
|------|-------------|-------|
| 2026-01-20 | Claude | Full audit |
```

### Verification Process

To verify a route/endpoint:
1. Check page renders (200 status)
2. Check database queries execute
3. Check auth guards work (if applicable)
4. Check API endpoints respond correctly
5. Update STATUS.md with ✅ or ⚠️

---

## [PROJECT] Structure Map

### STRUCTURE.md

```markdown
# [PROJECT] Project Structure

## Monorepo Layout

[project]/
├── apps/
│   ├── [APP-PUBLIC]/          # Public website components
│   │   ├── Purpose: [entity-primary] search, display, enquiries
│   │   └── Auth: Public (no login required)
│   ├── [APP-ADMIN]/           # [TARGET-USER-B] dashboard components
│   │   ├── Purpose: [entity-primary] management, [entity-secondary] inbox
│   │   └── Auth: Session ([TARGET-USER-B] role)
│   ├── [APP-SUPERADMIN]/      # Internal ops components
│   │   ├── Purpose: Platform management, [entity-tertiary], canary
│   │   └── Auth: Session (superadmin role)
│   └── [APP-API]/             # Next.js app (all routes)
│       ├── Routes: All pages (marketing, admin, superadmin)
│       └── Connects to: [DATABASE], [OBJECT-STORAGE]
├── packages/
│   ├── shared/                # Auth, DB, [EMAIL-SERVICE], [PAYMENT-SERVICE], Storage
│   ├── database/              # Database types
│   └── ui/                    # Shared UI primitives
└── docs/                      # Documentation

## Cross-Project Connections

| From | To | Type | Trigger |
|------|-----|------|---------|
| marketing | admin | Redirect | [TARGET-USER-B] login CTA |
| marketing | PostgreSQL | API | [entity-primary] search |
| admin | PostgreSQL | API | CRUD operations |
| superadmin | PostgreSQL | API | Platform management |
| marketing | [MAP-SERVICE] | API | Map rendering |
```

---

## [PROJECT] Routes Map

### ROUTES.md

```markdown
# [PROJECT] Routes Index

## Marketing App ([APP-PUBLIC])

### Public Routes
| Route | File | Purpose |
|-------|------|---------|
| / | page.tsx | Homepage with search |
| /search | search/page.tsx | [entity-primary] search + map |
| /[detail-route]/[slug] | [detail-route]/[slug]/page.tsx | [entity-primary] detail |
| /[geo-1] | [geo-1]/page.tsx | [entity-geo] landing 1 |
| /[geo-2] | [geo-2]/page.tsx | [entity-geo] landing 2 |
| /[geo-3] | [geo-3]/page.tsx | [entity-geo] landing 3 |
| /[TARGET-USER-B] | [target-user-b]/page.tsx | Find a [TARGET-USER-B] |
| /about | about/page.tsx | About [PROJECT] |

### API Routes
| Route | Methods | Purpose |
|-------|---------|---------|
| /api/health | GET | System health check |
| /api/search | GET | [entity-primary] search with filters |
| /api/[entity-primary]/[id] | GET | Single [entity-primary] details |
| /api/inquiries | POST | Submit enquiry |

## Admin App ([APP-ADMIN])

### Auth Routes (Public)
| Route | File | Purpose |
|-------|------|---------|
| /login | (auth)/login/page.tsx | [TARGET-USER-B] login |
| /signup | (auth)/signup/page.tsx | [TARGET-USER-B] registration |

### Dashboard Routes (Protected)
| Route | File | Purpose | Auth |
|-------|------|---------|------|
| /[target-user-b] | (dashboard)/page.tsx | Dashboard overview | Required |
| /[target-user-b]/[entity-primary] | (dashboard)/[entity-primary]/page.tsx | Manage [entity-primary] | Required |
| /[target-user-b]/[entity-primary]/new | (dashboard)/[entity-primary]/new/page.tsx | Create [entity-primary] | Required |
| /[target-user-b]/[entity-primary]/[id]/edit | (dashboard)/[entity-primary]/[id]/edit/page.tsx | Edit [entity-primary] | Required |
| /[target-user-b]/[entity-secondary] | (dashboard)/[entity-secondary]/page.tsx | [entity-secondary] inbox | Required |
| /[target-user-b]/settings | (dashboard)/settings/page.tsx | Account settings | Required |

### API Routes
| Route | Methods | Purpose | Auth |
|-------|---------|---------|------|
| /api/health | GET | System health | Public |
| /api/[target-user-b]/[entity-primary] | GET, POST | List/create [entity-primary] | [TARGET-USER-B] |
| /api/[target-user-b]/[entity-primary]/[id] | GET, PUT, DELETE | Single [entity-primary] CRUD | [TARGET-USER-B] |
| /api/[target-user-b]/[entity-primary]/[id]/confirm | POST | Refresh [BUSINESS-LOGIC-KEY] | [TARGET-USER-B] |
| /api/[target-user-b]/[entity-secondary] | GET | List [entity-secondary] | [TARGET-USER-B] |
| /api/[target-user-b]/[entity-secondary]/[id] | PUT | Update [entity-secondary] status | [TARGET-USER-B] |
```

---

## [PROJECT] Page Map Example

### PAGES/marketing/search.md

```markdown
# /search

> [entity-primary] search with map view

## Meta

| Property | Value |
|----------|-------|
| File | [APP-PUBLIC]/src/app/search/page.tsx |
| Layout | (marketing)/layout.tsx → Header + Footer |
| Auth | Public |
| Query Params | ?[field-1]=[value-a]\|[value-b]&[entity-geo]=&[field-3]=&min[Field5]=&max[Field5]=&[field-6]=&view=list\|map&bbox= |

---

## Navigation OUT (Where you can go FROM here)

### Primary Actions
| Element | Type | Destination | Condition |
|---------|------|-------------|-----------|
| [entity-primary] card click | Link | /[detail-route]/[slug] | Always |
| Map marker click | Modal | [entity-primary] preview | Always |
| Preview "View Details" | Link | /[detail-route]/[slug] | Always |
| Filter [entity-geo] | Tab | /search?[entity-geo]=X | Always |
| View toggle | Button | /search?view=list\|map | Always |

### Header Navigation
| Element | Destination |
|---------|-------------|
| Logo | / |
| Search | /search |
| [entity-geo] dropdown | /[geo-1], /[geo-2], /[geo-3] |
| About | /about |
| For [TARGET-USER-B] | /[target-user-b] |

---

## Navigation IN (What brings users HERE)

| Source Page | Element | Route |
|-------------|---------|-------|
| / (homepage) | Search form submit | /search?[field-1]=&[entity-geo]= |
| / (homepage) | "View all [entity-primary]" | /search |
| /[geo-1] | "See all [geo-1] [entity-primary]" | /search?[entity-geo]=[geo-1] |
| /[detail-route]/[slug] | "Back to search" | /search (with preserved filters) |
| Header | "Search" nav item | /search |

---

## Database Operations

### Tables Accessed
| Table | Operation | Columns | Purpose |
|-------|-----------|---------|---------|
| [entity-primary] | SELECT | id, slug, title, [field-5], lat, lng, photos | Search results |
| [entity-primary]_photos | SELECT | url, order | Card images |

### Filters Applied
| Filter | Column | Operation |
|--------|--------|-----------|
| [field-1] | [field_1] | = |
| [entity-geo] | [entity_geo] | = |
| [field-3] | [field_3] | = |
| min[Field5] | [field_5] | >= |
| max[Field5] | [field_5] | <= |
| [field-6] | [field_6] | >= |
| bbox | lat, lng | BETWEEN |

---

## API Calls

| Endpoint | Method | Trigger | Request | Response |
|----------|--------|---------|---------|----------|
| /api/search | GET | Page load, filter change | Query params | [EntityPrimary][] |
| /api/search | GET | Map pan/zoom | ?bbox= | [EntityPrimary][] |

---

## Components Used

| Component | File | Purpose |
|-----------|------|---------|
| SearchFilters | components/search/SearchFilters.tsx | Filter controls |
| [EntityPrimary]Card | components/[entity-primary]/[EntityPrimary]Card.tsx | Result cards |
| [EntityPrimary]Map | components/search/[EntityPrimary]Map.tsx | [MAP-SERVICE] |
| ViewToggle | components/search/ViewToggle.tsx | List/Map switch |
| [EntityPrimary]PreviewSheet | components/search/[EntityPrimary]PreviewSheet.tsx | Mobile preview |
| Pagination | components/ui/Pagination.tsx | Page navigation |

---

## State Management

| State | Type | Source | Purpose |
|-------|------|--------|---------|
| items | Server | API fetch | Search results |
| filters | URL | Query params | Active filters |
| view | URL | Query param | list or map |
| selectedItem | Local | useState | Map marker selection |
| mapBounds | Local | useState | Current viewport |

---

## Loading States

| State | Component | Display |
|-------|-----------|---------|
| Initial load | [EntityPrimary]CardSkeleton | 6 skeleton cards |
| Filtering | Overlay | Subtle loading indicator |
| Map loading | MapSkeleton | Gray placeholder |

---

## Empty States

| Condition | Display | Action |
|-----------|---------|--------|
| No results | "No [entity-primary] found" | "Clear filters" button |
| No results in area | "No [entity-primary] in this area" | "Zoom out" suggestion |
```

---

## [PROJECT] Database Map

### DATABASE.md

```markdown
# [PROJECT] Database Schema

## Tables

### [entity-primary]
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| slug | text | URL identifier |
| title | text | Title |
| [field_1] | text | Category type |
| [field_2] | text | Sub-type |
| [entity_geo] | text | [entity-geo] reference |
| [field_3] | text | Location name |
| [field_5] | integer | Key metric |
| [field_6] | integer | Attribute count |
| [field_7] | integer | Attribute count |
| [field_8] | integer | Size/quantity |
| lat | decimal | Latitude |
| lng | decimal | Longitude |
| [business_logic_field] | timestamptz | [BUSINESS-LOGIC-KEY] date |
| [entity_tertiary]_id | uuid | FK → [entity-tertiary] |
| status | text | draft/active/expired |

### [entity-secondary]
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| name | text | Contact name |
| email | text | Contact email |
| phone | text | Contact phone |
| message | text | Enquiry message |
| [entity_primary]_id | uuid | FK → [entity-primary] |
| [entity_tertiary]_id | uuid | FK → [entity-tertiary] |
| status | text | new/contacted/closed |

### [entity-tertiary]
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| name | text | Organisation name |
| slug | text | URL identifier |
| verified | boolean | Verification status |

## Page Relationships

| Table | Read By | Write By |
|-------|---------|----------|
| [entity-primary] | /search, /[detail-route]/[slug], /[target-user-b]/[entity-primary] | /[target-user-b]/[entity-primary]/new, /[target-user-b]/[entity-primary]/[id]/edit |
| [entity-secondary] | /[target-user-b]/[entity-secondary] | /api/inquiries |
| [entity-tertiary] | /[target-user-b], /[detail-route]/[slug] | Admin only |

## [BUSINESS-LOGIC-KEY]

```
[business_logic_field] + [BUSINESS_LOGIC_THRESHOLD] days = expiry
[business_logic_field] + ([BUSINESS_LOGIC_THRESHOLD] - 7) days = expiring warning
[business_logic_field] + [BUSINESS_LOGIC_THRESHOLD] days = expired (hidden from search)
```
```

---

## Triggers & Modes

| Trigger | Mode | Output |
|---------|------|--------|
| `MAPX` | Full scan | Complete map (all documents) |
| `MAPX: /search` | Single page | One PAGES/search.md file |
| `MAPX: update` | Refresh | Update existing map with changes |
| `MAPX: validate` | Audit only | Report orphans, dead links, gaps |
| `MAPX: api` | API focus | API.md + DATABASE.md only |
| `MAPX: nav` | Navigation focus | NAVIGATION.md only |

---

## [PROJECT] Validation Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Orphan Pages | Critical | Pages with no incoming routes |
| Dead Links | Critical | Navigation to non-existent routes |
| Missing [BUSINESS-LOGIC-KEY] | Warning | [entity-primary] without [business_logic_field] |
| Unconnected API | Warning | Endpoints defined but never called |
| Missing Photos | Warning | [entity-primary] with < 5 photos |

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CODAX** | Plan new features → Update MAPX after implementation |
| **CRUDX** | CRUDX builds DB/API layers → MAPX documents them |
| **CONSX** | MAPX provides component inventory → CONSX audits consistency |
| **HARDX** | MAPX shows all routes → HARDX scans each for hardcoded values |
| **PIXLX** | MAPX provides page list → PIXLX audits each page |
| **PLANX** | MAPX informs what exists → PLANX plans changes |

---

**Framework Status:** Template (customise for project)
**Last Updated:** February 28, 2026
**Version:** 2.1 (Generic Template)
