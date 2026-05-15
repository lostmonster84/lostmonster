---
worker: MAPX
identity: Marco Compass - System Cartographer
class: builder
slice_axis: INPUT
child_count: 3-5  # one per route family
child_envelope:
  receives: [route family identifier (e.g. /admin/*, /agencies/*), file glob patterns, dependent symbols, schema slice]
  emits: [per-route-family map fragment with entity inventory, dependency edges, integration points]
synthesis_pattern_ref: B (cross-route patterns surface at MAPX worker-level synthesis)
provides:
  - outputs.system_map
  - outputs.entity_index
---

# MAPX - Complete Application Map Framework

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | Project name |
| `[PROJECT-DOMAIN]` | Framework-driven development that actually works | What the project does (one line) |
| `[OBJECT-STORAGE]` | N/A | Cloud object storage system / bucket reference |
<!-- ONBOARD:END -->

> **M**ap **A**ll **P**aths e**X**haustively
>
> The most comprehensive wiring diagram for Lost Monster - Framework-driven development that actually works.
> Every route, every click, every database touch, every action.

---

## Lost Monster Context

**MAPX for Lost Monster** understands the project's:
- **Monorepo or app structure** - the apps, packages, and services that compose the system
- **Database surface** - the tables and their relationships
- **Public vs Protected** routing boundaries (anonymous, authenticated, privileged tiers)
- **Lifecycle / freshness conventions** the project uses (timestamps, archival, soft-deletion)
- **Discovery primitives** - the project's core query surfaces (search, filter, map, feed)

> Examples throughout this playbook are drawn from a property-portal codebase; treat them as illustrative shape, not as required structure. Adapt to your project's actual layout.

---

## MAPX Output Structure

```
Lost Monster/docs/mapx/
├── README.md              # Overview + quick reference
├── STATUS.md              # 🔥 LIVING AUDIT - What's built & working (checkboxes)
├── STRUCTURE.md           # Monorepo layout
├── ROUTES.md              # Master route index
├── PAGES/
│   ├── marketing/
│   │   ├── homepage.md
│   │   ├── search.md
│   │   ├── property-detail.md
│   │   └── region-landing.md
│   ├── admin/
│   │   ├── dashboard.md
│   │   ├── listings.md
│   │   ├── leads.md
│   │   └── settings.md
│   └── superadmin/
│       ├── overview.md
│       ├── agencies.md
│       ├── canary.md
│       └── settings.md
├── API.md                 # Complete API endpoint index
├── DATABASE.md            # Schema + page relationships
├── COMPONENTS.md          # Component dependency graph
├── NAVIGATION.md          # All nav elements
└── EXTERNAL.md            # Hosting, [OBJECT-STORAGE], payments, third-party integrations
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

## Structure Map (example)

### STRUCTURE.md

> Example below is from a property-portal monorepo. Replace the apps/packages list with your project's real layout.

```markdown
# Lost Monster Project Structure

## Monorepo Layout

Lost Monster/
├── apps/
│   ├── marketing/         # Public website components
│   │   ├── Purpose: Property search, listings, enquiries
│   │   └── Auth: Public (no login required)
│   ├── admin/             # Agent dashboard components
│   │   ├── Purpose: Listing management, lead inbox
│   │   └── Auth: Session (agent role)
│   ├── superadmin/        # Internal ops components
│   │   ├── Purpose: Platform management, agencies, canary
│   │   └── Auth: Session (superadmin role)
│   └── web/               # Next.js app (all routes)
│       ├── Routes: All pages (marketing, admin, superadmin)
│       └── Connects to: PostgreSQL (hosting), [OBJECT-STORAGE]
├── packages/
│   ├── shared/            # Auth, DB, Email, Stripe, Storage
│   ├── database/          # Database types
│   └── ui/                # Shared UI primitives
└── docs/                  # Documentation

## Cross-Project Connections

| From | To | Type | Trigger |
|------|-----|------|---------|
| marketing | admin | Redirect | Agent login CTA |
| marketing | PostgreSQL | API | Property search |
| admin | PostgreSQL | API | CRUD operations |
| superadmin | PostgreSQL | API | Platform management |
| marketing | Google Maps | API | Map rendering |
```

---

## Routes Map (example)

### ROUTES.md

> Example below is from a property-portal monorepo. Adapt routes to your project's actual surface.

```markdown
# Lost Monster Routes Index

## Marketing App (apps/marketing)

### Public Routes
| Route | File | Purpose |
|-------|------|---------|
| / | page.tsx | Homepage with search |
| /search | search/page.tsx | Property search + map |
| /l/[slug] | l/[slug]/page.tsx | Property detail |
| /kotor | kotor/page.tsx | Bay of Kotor landing |
| /budva | budva/page.tsx | Budva landing |
| /podgorica | podgorica/page.tsx | Podgorica landing |
| /agents | agents/page.tsx | Find an agent |
| /about | about/page.tsx | About Lost Monster |

### API Routes
| Route | Methods | Purpose |
|-------|---------|---------|
| /api/health | GET | System health check |
| /api/search | GET | Property search with filters |
| /api/properties/[id] | GET | Single property details |
| /api/inquiries | POST | Submit enquiry |

## Admin App (apps/admin)

### Auth Routes (Public)
| Route | File | Purpose |
|-------|------|---------|
| /login | (auth)/login/page.tsx | Agent login |
| /signup | (auth)/signup/page.tsx | Agent registration |

### Dashboard Routes (Protected)
| Route | File | Purpose | Auth |
|-------|------|---------|------|
| /agent | (agent)/agent/page.tsx | Dashboard overview | Required |
| /agent/listings | (agent)/agent/listings/page.tsx | Manage listings | Required |
| /agent/listings/new | (agent)/agent/listings/new/page.tsx | Create listing | Required |
| /agent/listings/[id]/edit | (agent)/agent/listings/[id]/edit/page.tsx | Edit listing | Required |
| /agent/leads | (agent)/agent/leads/page.tsx | Lead inbox | Required |
| /agent/settings | (agent)/agent/settings/page.tsx | Account settings | Required |

### API Routes
| Route | Methods | Purpose | Auth |
|-------|---------|---------|------|
| /api/health | GET | System health | Public |
| /api/agent/listings | GET, POST | List/create listings | Agent |
| /api/agent/listings/[id] | GET, PUT, DELETE | Single listing CRUD | Agent |
| /api/agent/listings/[id]/confirm | POST | Refresh freshness | Agent |
| /api/agent/leads | GET | List leads | Agent |
| /api/agent/leads/[id] | PUT | Update lead status | Agent |
```

---

## Page Map Example

### PAGES/marketing/search.md

```markdown
# /search

> Property search with map view

## Meta

| Property | Value |
|----------|-------|
| File | apps/marketing/src/app/search/page.tsx |
| Layout | (marketing)/layout.tsx → Header + Footer |
| Auth | Public |
| Query Params | ?type=rent\|sale&region=&city=&minPrice=&maxPrice=&bedrooms=&view=list\|map&bbox= |

---

## Navigation OUT (Where you can go FROM here)

### Primary Actions
| Element | Type | Destination | Condition |
|---------|------|-------------|-----------|
| Property card click | Link | /l/[slug] | Always |
| Map marker click | Modal | Property preview | Always |
| Preview "View Details" | Link | /l/[slug] | Always |
| Filter region | Tab | /search?region=X | Always |
| View toggle | Button | /search?view=list\|map | Always |

### Header Navigation
| Element | Destination |
|---------|-------------|
| Logo | / |
| Search | /search |
| Regions dropdown | /kotor, /budva, /podgorica |
| About | /about |
| For Agents | /agents |

---

## Navigation IN (What brings users HERE)

| Source Page | Element | Route |
|-------------|---------|-------|
| / (homepage) | Search form submit | /search?type=&region= |
| / (homepage) | "View all properties" | /search |
| /kotor | "See all Kotor properties" | /search?region=bay-of-kotor |
| /l/[slug] | "Back to search" | /search (with preserved filters) |
| Header | "Search" nav item | /search |

---

## Database Operations

### Tables Accessed
| Table | Operation | Columns | Purpose |
|-------|-----------|---------|---------|
| listings | SELECT | id, slug, title, price, lat, lng, photos | Search results |
| listing_photos | SELECT | url, order | Card images |

### Filters Applied
| Filter | Column | Operation |
|--------|--------|-----------|
| type | listing_type | = |
| region | region | = |
| city | city | = |
| minPrice | price | >= |
| maxPrice | price | <= |
| bedrooms | bedrooms | >= |
| bbox | lat, lng | BETWEEN |

---

## API Calls

| Endpoint | Method | Trigger | Request | Response |
|----------|--------|---------|---------|----------|
| /api/search | GET | Page load, filter change | Query params | Listing[] |
| /api/search | GET | Map pan/zoom | ?bbox= | Listing[] |

---

## Components Used

| Component | File | Purpose |
|-----------|------|---------|
| SearchFilters | components/search/SearchFilters.tsx | Filter controls |
| PropertyCard | components/property/PropertyCard.tsx | Result cards |
| PropertyMap | components/search/PropertyMap.tsx | Google Maps (@vis.gl/react-google-maps) |
| ViewToggle | components/search/ViewToggle.tsx | List/Map switch |
| PropertyPreviewSheet | components/search/PropertyPreviewSheet.tsx | Mobile preview |
| Pagination | components/ui/Pagination.tsx | Page navigation |

---

## State Management

| State | Type | Source | Purpose |
|-------|------|--------|---------|
| listings | Server | API fetch | Search results |
| filters | URL | Query params | Active filters |
| view | URL | Query param | list or map |
| selectedProperty | Local | useState | Map marker selection |
| mapBounds | Local | useState | Current viewport |

---

## Loading States

| State | Component | Display |
|-------|-----------|---------|
| Initial load | PropertyCardSkeleton | 6 skeleton cards |
| Filtering | Overlay | Subtle loading indicator |
| Map loading | MapSkeleton | Gray placeholder |

---

## Empty States

| Condition | Display | Action |
|-----------|---------|--------|
| No results | "No properties found" | "Clear filters" button |
| No results in area | "No properties in this area" | "Zoom out" suggestion |
```

---

## Database Map (example)

### DATABASE.md

> Example below is from a property-portal database. Adapt to your project's actual schema.

```markdown
# Lost Monster Database Schema

## Tables

### listings
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| slug | text | URL identifier |
| title | text | Property title |
| listing_type | text | rent/sale |
| property_type | text | apartment/house/etc |
| region | text | Montenegro region |
| city | text | City name |
| price | integer | Price in EUR |
| bedrooms | integer | Bedroom count |
| bathrooms | integer | Bathroom count |
| size_sqm | integer | Size in m² |
| lat | decimal | Latitude |
| lng | decimal | Longitude |
| confirmed_at | timestamptz | Freshness date |
| agency_id | uuid | FK → agencies |
| status | text | draft/active/expired |

### leads
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| name | text | Contact name |
| email | text | Contact email |
| phone | text | Contact phone |
| message | text | Enquiry message |
| listing_id | uuid | FK → listings |
| agency_id | uuid | FK → agencies |
| status | text | new/contacted/closed |

### agencies
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| name | text | Agency name |
| slug | text | URL identifier |
| verified | boolean | Verification status |

## Page Relationships

| Table | Read By | Write By |
|-------|---------|----------|
| listings | /search, /l/[slug], /agent/listings | /agent/listings/new, /agent/listings/[id]/edit |
| leads | /agent/leads | /api/inquiries |
| agencies | /agents, /l/[slug] | Admin only |

## Freshness Model

```
confirmed_at + 30 days = expiry
confirmed_at + 23 days = expiring warning
confirmed_at + 30 days = expired (hidden from search)
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

## Validation Checks (example)

| Check | Severity | Description |
|-------|----------|-------------|
| Orphan Pages | Critical | Pages with no incoming routes |
| Dead Links | Critical | Navigation to non-existent routes |
| Missing Freshness | Warning | Listings without confirmed_at |
| Unconnected API | Warning | Endpoints defined but never called |
| Missing Photos | Warning | Listings with < 5 photos |

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

---

## Calibration Anchors (v4.0+ required field)

These anchors are loaded by the agent-identity-loader into every sub-agent dispatch where MAPX is the parent. Without them, parallel fan-out by route family produces severity drift on dependency-edge classification. Do not edit without TRAINX review.

### Severity definitions for this worker

- **CRITICAL**: unmapped consuming surface. A route consumes an API, table, or external integration but MAPX did not catalogue the dependency. Risk of silent breakage on refactor. Examples: an API endpoint being read by a page form but absent from API.md cross-references (would have hidden a route break on rename); admin UI wrote to a history/audit table without that edge appearing on any page map; a route consumed a JSON column on an entity table but no schema cross-link existed.
- **HIGH**: stale dependency edge. The edge is mapped but the current code diverges from MAPX's model. Map says route X queries table Y, code now queries Y joined with Z. Examples: integration edges still present on EXTERNAL.md after the integration was removed; a column referenced under an old name in stale page maps after schema rename; an inbox map said GET-only but a POST endpoint was added for bulk operations.
- **MEDIUM**: cross-route opportunity. Could deduplicate or unify but not blocking. Examples: two surfaces run near-identical filter logic with no shared helper noted; two pages compute the same status pill colour inline; two pages re-implement a shared badge component.
- **LOW**: documentation drift. Function names changed, file paths moved, prop names renamed. Map still navigable. Examples: a component renamed in code but old name appears in COMPONENTS.md; a route segment moved under a new path group.

### Score anchors (depth / accuracy / completeness)

MAPX is graded across three dimensions on every route-family map fragment:

- **Depth** (how many layers from entry-point to data are mapped):
  - **9-10 ("Full-stack chain")**: every page traces Route -> File -> Component tree -> API call -> Database table -> Column. Example: a detail page map that captures the full hero-image -> media-table row -> [OBJECT-STORAGE] signed URL chain.
  - **7-8 ("API-layer reached")**: route -> file -> API call documented; DB column drill-down partial.
  - **5-6 ("Surface only")**: route exists, file noted, no API or DB linkage.
  - **3-4 ("Stub")**: route listed without file path. Example: any half-finished MAPX run.
  - **1-2 ("Ghost")**: route mentioned but no verification it exists.
- **Accuracy** (does the map match reality):
  - **PASS**: 100% of mapped edges verifiable via grep at time of audit.
  - **FAIL (LOW)**: 1-2 documentation-drift entries (renamed symbols).
  - **FAIL (MEDIUM)**: cross-route opportunity missed.
  - **FAIL (HIGH)**: stale dependency edge (code diverged).
  - **FAIL (CRITICAL)**: unmapped consuming surface on a production route.
- **Completeness** (% of routes touched):
  - **9-10**: 100% of routes in scope mapped to API + DB.
  - **7-8**: 100% of routes listed, 80%+ with API + DB.
  - **5-6**: 100% of routes listed, surface only.
  - **3-4**: 80% of routes listed.
  - **1-2**: less than 80% of routes listed.

### Recurring patterns this worker is calibrated against

- **Pattern: Ghost references to a retired stack** - when the project has migrated off a previous data layer / auth provider / service (e.g. an old BaaS), old playbooks, comments, env-var names, and stale page-map entries may still reference the retired stack. When a sub-agent sees one of these in code, it must surface as documentation drift (LOW) AND check whether the referenced surface still exists. If yes, dependency-edge stale (HIGH); if no, ghost reference for cleanup (LOW). Auto-flag any retired-stack token in the active code path as needing review.
- **Pattern: External source mis-classified as an internal entity** - external aggregators, third-party data feeds, or scraped sources must be catalogued as integration surfaces (EXTERNAL.md), NEVER as internal entities under the project's primary tables. If a sub-agent sees an external URL or domain in ingest / scraper code, classify it as an integration surface. Severity HIGH if mis-categorised as an internal entity (corrupts entity-integrity invariants downstream).
- **Pattern: Missing surface dependencies on FK changes** - when a foreign-key semantics changes on a hub entity, every page that filters by that key must be re-mapped. Sub-agents must flag any FK reference whose target schema is not also in the slice's schema view. Severity HIGH (stale dependency edge minimum, CRITICAL if filter is on a production route).
- **Pattern: Freshness / lifecycle propagation** - if the project has a freshness invariant (e.g. a `confirmed_at` or `last_seen` timestamp gating visibility), any route that reads the gated entity must show, in the map, how it filters by that timestamp. Missing filter notation = HIGH (could surface stale records and break a core invariant).
- **Pattern: Cross-app shared dependency (synthesis-only signal)** - two sub-agents both touch a shared table. The sub-agent should NOT attempt to reason cross-route; only flag in rationale that this slice shares a table with adjacent slices. Worker-level synthesis (Pattern B) lifts the shared-table observation into the master index. Sub-agent emitting cross-route claims = pattern misuse, FLAGGED by Frank.
- **Pattern: Media / object-storage edges** - media rows typically index objects stored in [OBJECT-STORAGE] via a `url` or `key` column. Map must trace entity -> media rows -> [OBJECT-STORAGE] path -> CDN domain. Missing storage edge on a media-reading route = HIGH (refactor blindness on storage migrations).

### Calibration cross-reference

- Recent calibration.md entries (last 30 days) for MAPX cluster around two failure modes: under-grading stale retired-stack ghost references (graded as LOW, should be reviewed for HIGH if surface still exists) and over-grading documentation drift on auto-generated types as HIGH (should be LOW).
- Link: `.ai/thefirm/gaffer/calibration.md#mapx`

Last calibration update: 2026-05-12 by APEX (v4 marathon A3).

---

## Slice Envelope (v4 INPUT-sliced)

MAPX fans out by route family. Each sub-agent receives one slice and produces one map fragment. The worker synthesises N fragments into the master index per synthesis-pattern B (input-aggregation with cross-route surfacing).

### Slice axis: per-route-family

Canonical slice keys (3-5 sub-agents per dispatch). Adapt to your project's tiered app/route structure. The example below uses a marketing / admin / superadmin tiering:

1. `marketing` - public, anonymous-access routes
2. `admin` - authenticated, per-user / per-tenant routes
3. `superadmin` - internal-ops / privileged routes
4. `api` (optional, when API surface is the focus) - route handlers
5. `shared` (optional, when refactoring shared packages) - cross-cutting libraries

For most runs, slices 1-3 are dispatched (child_count = 3). When the request scope is API-centric or shared-package-centric, slices 4-5 are added (child_count = 4 or 5).

### Per-slice child envelope

Each sub-agent receives:

```yaml
slice_envelope:
  slice_key: <string>                       # e.g. "marketing", "admin"
  slice_axis: INPUT
  slice_index: <integer>                    # 1-based position in dispatch
  slice_total: <integer>                    # total slices in this dispatch
  parent_dispatch_id: <uuid>
  parent_envelope_hash: <sha256>
  parent_worker: MAPX

  receives:
    route_family_id: <string>               # e.g. "/admin/*"
    file_glob_patterns:                     # what to scan
      - apps/admin/**
      - apps/web/src/app/agent/**
    dependent_symbols:                      # known cross-slice references
      - listings (table)
      - leads (table)
      - agencies (table)
      - createSession (auth)
    schema_slice:                           # subset of DB schema relevant to this route family
      tables: [listings, leads, agencies, profiles]
      columns_of_interest: [confirmed_at, agency_id, listing_id, status]

  emits:
    map_fragment:
      route_inventory:                      # every route in scope
        - route: <string>
          file: <relative path>
          auth: <Public|Agent|Superadmin>
          renders: <PASS|FAIL>
      entity_inventory:                     # tables / external services this slice touches
        - entity: <name>
          kind: <table|api|external|component>
          operations: [SELECT|INSERT|UPDATE|DELETE|CALL]
      dependency_edges:                     # route -> entity links
        - from: <route>
          to: <entity>
          via: <api endpoint | direct query | component prop>
          severity_if_stale: <CRITICAL|HIGH|MEDIUM|LOW>
      integration_points:                   # external surfaces ([OBJECT-STORAGE], email, payments, maps, analytics, etc.)
        - service: <name>
          accessed_via: <file path>
          purpose: <one line>
      cross_slice_signals:                  # observations only - do NOT reason about other slices
        - signal: "<table X is also referenced in adjacent slices>"
          do_not_synthesise: true           # worker-level synthesis handles this
      findings:                             # severity-graded findings against this slice
        - severity: <CRITICAL|HIGH|MEDIUM|LOW>
          pattern: <name from Calibration Anchors>
          description: <one paragraph>
          evidence: <file:line or quote>
```

### Forbidden actions per sub-agent

- No cross-slice reasoning. Sub-agent for `marketing` MUST NOT comment on `admin` routes even if it sees shared imports. Cross-slice synthesis is the worker's job.
- No recursive Agent dispatch (hard ceiling: depth: 2 forbidden).
- No mutation of the parent envelope.
- No re-grading of severity outside the Calibration Anchors definitions above.

### Worker-level synthesis (Pattern B: input-aggregation with cross-route surfacing)

After fan-in, MAPX synthesises:

1. **Concatenate route inventories** into ROUTES.md.
2. **Union entity inventory** across slices. Tables/services touched by more than one slice get a `shared_by:` annotation.
3. **Cross-route pattern surfacing** (the non-trivial synthesis step):
   - Identify entities appearing in `cross_slice_signals` from 2+ sub-agents.
   - Lift these into a `## Cross-Route Patterns` section in the master index (STRUCTURE.md or a new CROSS-ROUTES.md).
   - Flag any inconsistency: same table accessed via API in one slice and via direct query in another = MEDIUM finding worker-level.
4. **Aggregate findings**. Worker-level verdict = worst severity across slices, modulated by the calibration recurring-pattern rules.
5. **Emit STATUS.md update** with verification timestamps per slice.

### Per-slice tolerance policy (Q2 timeout-cascade)

- Default per-sub-agent timeout: 180s.
- If 1 slice errors or times out: worker proceeds with N-1 sub-fragments, marks the missing slice ERROR in STATUS.md, downgrades confidence to MEDIUM.
- If 2+ slices error: worker emits `gate: ERROR` with `sub_fragment_errors` array. No partial map shipped.
- Worker MUST NOT silently downgrade to sequential mid-flight.

### Aggregation arithmetic

- Worker score = mean(depth) across slices, weighted equally per slice.
- Worker accuracy = AND across slices (any slice FAIL on accuracy = worker FAIL on accuracy).
- Worker completeness = mean(completeness) across slices.

---

**Framework Status:** v4 INPUT-sliced
**Last Updated:** 2026-05-12 (v4 restructure)
**Version:** 2.2
