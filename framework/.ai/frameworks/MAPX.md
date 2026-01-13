# MAPX - Complete Application Map Framework

> **Universal across all projects**
> **M**ap **A**ll **P**aths e**X**haustively - The most comprehensive wiring diagram for any application.

## What is MAPX?

MAPX produces a **complete map** of your entire application - every route, every click, every database touch, every action, every component, every external connection.

Think of it as:
- **Architectural blueprints** for a building - every room, every door, every electrical connection
- **Circuit diagram** - follow any wire from source to destination
- **Project GPS** - know exactly where everything is and how it connects

**Core Principle:** If something isn't on the map, it doesn't exist. If it's on the map, it's connected.

---

## When to Use MAPX

✅ **Use MAPX when:**
- Starting a new project (establish the map from day one)
- Major refactor or migration (understand current state before changing)
- Onboarding new developers (complete system overview)
- Pre-audit or compliance review (prove everything is documented)
- Debugging navigation issues (trace where flows break)
- Identifying orphan pages or dead links
- Planning new features (see where they fit in the system)

❌ **Skip MAPX when:**
- Single bug fix (too heavyweight)
- Quick prototype (not production code)
- Documentation already exists and is current
- Very small project (< 5 pages)

---

## MAPX Output Structure

MAPX produces a **split document set** for manageability:

```
{project}/docs/mapx/
├── README.md           # Overview + quick reference
├── STRUCTURE.md        # Monorepo layout + cross-project links
├── ROUTES.md           # Master route index (all pages)
├── PAGES/              # Individual page maps (detailed)
│   ├── dashboard.md
│   ├── tenders.md
│   └── ...
├── API.md              # Complete API endpoint index
├── DATABASE.md         # Schema + page relationships
├── COMPONENTS.md       # Component dependency graph
├── NAVIGATION.md       # All nav elements (sidebar, header, footer, mobile)
└── EXTERNAL.md         # Emails, webhooks, third-party integrations
```

---

## Document Specifications

### 1. STRUCTURE.md - Monorepo Map

For multi-app projects, document the complete structure:

```markdown
# Project Structure

## Monorepo Layout

project/
├── app/              # Main product (app.example.com)
│   ├── Purpose: Core application
│   ├── Port: 4000
│   ├── Routes: 25 pages
│   └── Connects to: marketing (auth redirect), email-worker (inbound)
├── marketing/        # Marketing site (example.com)
│   ├── Purpose: Landing, pricing, docs
│   ├── Port: 3001
│   └── Connects to: app (signup redirect)
├── hq/               # Internal admin (internal.example.com)
│   ├── Purpose: Docs, admin tools
│   └── Port: 3000
└── email-worker/     # Cloudflare Worker
    ├── Purpose: Inbound email processing
    └── Connects to: app (webhook POST)

## Cross-Project Connections

| From | To | Type | Trigger |
|------|-----|------|---------|
| marketing | app | Redirect | Signup CTA click |
| email-worker | app | Webhook | Inbound email received |
| app | email-worker | Config | Email routing rules |
```

---

### 2. ROUTES.md - Master Route Index

All routes in one quick-reference table:

```markdown
# Routes Index

## app/ (Main Application)

### Auth Routes (Public)
| Route | File | Purpose | Auth |
|-------|------|---------|------|
| /login | (auth)/login/page.tsx | User login | Public |
| /signup | (auth)/signup/page.tsx | Registration | Public |
| /forgot-password | (auth)/forgot-password/page.tsx | Password recovery | Public |

### Dashboard Routes (Protected)
| Route | File | Purpose | Auth | Layout |
|-------|------|---------|------|--------|
| /dashboard | (dashboard)/dashboard/page.tsx | Overview | Required | Sidebar |
| /tenders | (dashboard)/tenders/page.tsx | Tender list | Required | Sidebar |
| /evidence | (dashboard)/evidence/page.tsx | Evidence library | Required | Sidebar |

### API Routes
| Route | Methods | File | Purpose |
|-------|---------|------|---------|
| /api/tenders | GET, POST | api/tenders/route.ts | List/create tenders |
| /api/tenders/[id] | GET, PUT, DELETE | api/tenders/[id]/route.ts | Single tender CRUD |
```

---

### 3. PAGES/*.md - Individual Page Maps (Maximum Depth)

This is the core of MAPX - exhaustive documentation for each page:

```markdown
# /tenders

> List and manage all tenders

## Meta

| Property | Value |
|----------|-------|
| File | app/src/app/(dashboard)/tenders/page.tsx |
| Layout | (dashboard)/layout.tsx → Sidebar + MainContent |
| Auth | Required (redirects to /login if unauthenticated) |
| Query Params | ?status=active\|review\|submitted |

---

## Navigation OUT (Where you can go FROM here)

### Primary Actions
| Element | Type | Destination | Condition | File:Line |
|---------|------|-------------|-----------|-----------|
| "Upload Tender" button | Button | /tenders/new | Always | Sidebar.tsx:45 |
| Tender row click | TableRow | /tenders/[id] | Always | TenderTable.tsx:78 |
| Status tab "Active" | Tab | /tenders?status=active | Always | page.tsx:23 |
| Status tab "Review" | Tab | /tenders?status=review | Always | page.tsx:24 |
| Status tab "Submitted" | Tab | /tenders?status=submitted | Always | page.tsx:25 |

### Sidebar Navigation
| Element | Destination |
|---------|-------------|
| Dashboard | /dashboard |
| Inbox | /inbox |
| Evidence | /evidence |
| Settings | /settings |

### Footer Links
| Element | Destination |
|---------|-------------|
| Help | /docs/help |
| Support | mailto:support@example.com |

---

## Navigation IN (What brings users HERE)

| Source Page | Element | Route |
|-------------|---------|-------|
| /dashboard | "View All Tenders" link | /tenders |
| /dashboard | Tenders widget "Active" | /tenders?status=active |
| /inbox/[id] | "Convert to Tender" success | /tenders (via redirect) |
| Sidebar | "Active" nav item | /tenders?status=active |
| Sidebar | "In Review" nav item | /tenders?status=review |
| Sidebar | "Submitted" nav item | /tenders?status=submitted |

---

## Database Operations

### Tables Accessed
| Table | Operation | Columns | Purpose | Query Location |
|-------|-----------|---------|---------|----------------|
| tenders | SELECT | id, title, status, deadline, created_at | List display | api/tenders/route.ts:34 |
| questions | COUNT | tender_id | Question count badge | api/tenders/route.ts:45 |
| organizations | SELECT | id | Auth filter | api/tenders/route.ts:28 |

### Relationships
tenders.organization_id → organizations.id
questions.tender_id → tenders.id

---

## API Calls

| Endpoint | Method | Trigger | Request | Response | Error |
|----------|--------|---------|---------|----------|-------|
| /api/tenders | GET | Page load | ?status, ?page | Tender[] | Toast + retry |
| /api/tenders | POST | Upload form | FormData | Tender | Toast + reset |
| /api/tenders/[id] | DELETE | Confirm modal | - | void | Toast |

---

## State Management

| State | Type | Source | Purpose |
|-------|------|--------|---------|
| tenders | Server | API fetch | Table data |
| selectedStatus | URL | Query param | Tab selection |
| isUploading | Local | useState | Button disable |
| deleteConfirm | Local | useState | Modal visibility |

---

## Components Used

| Component | File | Props | Purpose |
|-----------|------|-------|---------|
| TenderTable | components/tenders/TenderTable.tsx | tenders, onDelete | Data display |
| StatusTabs | components/ui/StatusTabs.tsx | status, onChange | Filter tabs |
| UploadDialog | components/tenders/UploadDialog.tsx | open, onUpload | File upload |
| EmptyState | components/ui/EmptyState.tsx | title, action | No data view |
| Pagination | components/ui/Pagination.tsx | page, total | Page nav |
| DeleteConfirm | components/ui/DeleteConfirm.tsx | open, onConfirm | Confirm modal |

---

## Actions & Side Effects

| Trigger | Action | API | Side Effect | Success | Error |
|---------|--------|-----|-------------|---------|-------|
| Upload button | Open modal | - | - | - | - |
| Modal submit | Upload file | POST /api/tenders | Creates tender | Redirect to /tenders/[id] | Toast |
| Delete button | Show confirm | - | - | - | - |
| Confirm delete | Delete tender | DELETE /api/tenders/[id] | Remove from list | Toast + refetch | Toast |
| Tab click | Filter | GET /api/tenders?status=X | Update URL | Refresh table | - |

---

## Loading States

| State | Component | Display |
|-------|-----------|---------|
| Initial load | TableSkeleton | 5 skeleton rows |
| Uploading | UploadDialog | Spinner + "Uploading..." |
| Deleting | Row | Opacity 50% + disabled |
| Fetching | Table | Subtle loading indicator |

---

## Error States

| Error | Display | Recovery |
|-------|---------|----------|
| Fetch failed | Toast + "Try again" button | Retry fetch |
| Upload failed | Toast + form preserved | Re-submit |
| Delete failed | Toast | Dismiss or retry |
| Network error | Toast + offline indicator | Auto-retry on reconnect |

---

## Empty States

| Condition | Display | Action |
|-----------|---------|--------|
| No tenders | EmptyState illustration | "Upload your first tender" CTA |
| No results (filtered) | "No tenders match filter" | "Clear filter" button |
```

---

### 4. API.md - Complete API Index

```markdown
# API Reference

## Endpoints by Resource

### Tenders
| Method | Route | Auth | Request | Response |
|--------|-------|------|---------|----------|
| GET | /api/tenders | Org | ?status, ?page | Tender[] |
| POST | /api/tenders | Org | FormData | Tender |
| GET | /api/tenders/[id] | Org | - | Tender |
| PUT | /api/tenders/[id] | Org | Partial<Tender> | Tender |
| DELETE | /api/tenders/[id] | Org | - | void |
| POST | /api/tenders/[id]/extract | Org | - | Question[] |

### Evidence
| Method | Route | Auth | Request | Response |
|--------|-------|------|---------|----------|
| GET | /api/evidence | Org | ?category | Evidence[] |
| POST | /api/evidence | Org | FormData | Evidence |
| ... | ... | ... | ... | ... |

## Consumers (Who calls what)

| Endpoint | Called By Pages | Called By Components |
|----------|-----------------|---------------------|
| GET /api/tenders | /tenders, /dashboard | TenderWidget |
| POST /api/tenders | /tenders/new | UploadDialog |
| GET /api/evidence | /evidence, /tenders/[id] | EvidencePanel |

## Database Access

| Endpoint | Tables | Operations |
|----------|--------|------------|
| GET /api/tenders | tenders, questions | SELECT, COUNT |
| POST /api/tenders | tenders, documents | INSERT |
| DELETE /api/tenders/[id] | tenders, questions, evidence_links | DELETE (cascade) |
```

---

### 5. DATABASE.md - Schema & Relationships

```markdown
# Database Schema

## Tables

### tenders
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| title | text | NO | - | Tender name |
| status | text | NO | 'active' | active, review, submitted |
| deadline | timestamptz | YES | - | Submission deadline |
| organization_id | uuid | NO | - | FK → organizations |
| created_at | timestamptz | NO | now() | Creation timestamp |
| updated_at | timestamptz | NO | now() | Last update |

### questions
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| tender_id | uuid | NO | - | FK → tenders |
| text | text | NO | - | Question text |
| status | text | NO | 'pending' | pending, drafted, reviewed |
| ... | ... | ... | ... | ... |

## Page Relationships

| Table | Read By | Write By |
|-------|---------|----------|
| tenders | /tenders, /dashboard, /tenders/[id] | /tenders/new, /tenders/[id] |
| questions | /tenders/[id], /questions/[id] | /api/tenders/[id]/extract |
| evidence | /evidence, /questions/[id] | /evidence/new, /evidence/[id] |

## Foreign Keys

tenders.organization_id → organizations.id (CASCADE DELETE)
questions.tender_id → tenders.id (CASCADE DELETE)
evidence_links.question_id → questions.id (CASCADE DELETE)
evidence_links.evidence_id → evidence.id (CASCADE DELETE)

## Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| tenders | idx_tenders_org_status | organization_id, status | Filter by org + status |
| questions | idx_questions_tender | tender_id | Join performance |
```

---

### 6. COMPONENTS.md - Dependency Graph

```markdown
# Component Dependencies

## Component → Pages

| Component | Used By Pages | Props Interface |
|-----------|---------------|-----------------|
| TenderCard | /tenders, /dashboard | { tender: Tender, onDelete: fn } |
| StatusBadge | /tenders, /inbox, /evidence | { status: string, variant?: string } |
| Sidebar | All (dashboard) pages | { children: ReactNode } |
| EmptyState | /tenders, /evidence, /inbox | { title, description, action } |

## Component → Components

| Component | Uses | Used By |
|-----------|------|---------|
| StatusBadge | - | TenderCard, EvidenceCard, OpportunityCard |
| Button | - | All forms, dialogs, CTAs |
| Dialog | Button, X icon | UploadDialog, DeleteConfirm, SettingsModal |
| Card | - | TenderCard, EvidenceCard, DashboardWidget |

## Impact Analysis

"If I change X, what breaks?"

| Component | Direct Impact | Pages Affected |
|-----------|---------------|----------------|
| StatusBadge | TenderCard, EvidenceCard | /tenders, /evidence, /inbox |
| Button | UploadDialog, DeleteConfirm | All pages with forms |
| Sidebar | SidebarNav | All dashboard pages |
```

---

### 7. NAVIGATION.md - All Nav Elements

```markdown
# Navigation Map

## Desktop Sidebar

| Section | Item | Icon | Route | Badge | Condition |
|---------|------|------|-------|-------|-----------|
| Main | Dashboard | LayoutDashboard | /dashboard | - | Always |
| Main | Inbox | Inbox | /inbox | {newCount} | Always |
| Tenders | Active | FileText | /tenders?status=active | {count} | Always |
| Tenders | In Review | CheckCircle | /tenders?status=review | {count} | Always |
| Tenders | Submitted | Send | /tenders?status=submitted | {count} | Always |
| Evidence | Attention | AlertTriangle | /evidence/attention | - | hasAttention |
| Evidence | All Evidence | Folder | /evidence | {count} | Always |
| Footer | Settings | Settings | /settings | - | Always |
| Footer | Sign Out | LogOut | (action: logout) | - | Always |

## Mobile Navigation

| Item | Route | Icon | Badge |
|------|-------|------|-------|
| Dashboard | /dashboard | Home | - |
| Tenders | /tenders | FileText | - |
| Evidence | /evidence | Folder | - |
| Menu | (toggle) | Menu | - |

## Header Actions

| Element | Action | Destination |
|---------|--------|-------------|
| Logo | Navigate | /dashboard |
| Search | Open search | (modal) |
| Notifications | Toggle panel | (dropdown) |
| Profile | Toggle menu | (dropdown) |

## Breadcrumbs

| Page | Trail |
|------|-------|
| /tenders | Dashboard |
| /tenders/[id] | Dashboard > Tenders > {title} |
| /tenders/[id]/questions/[qid] | Dashboard > Tenders > {title} > Q{number} |
| /evidence/[id] | Dashboard > Evidence > {title} |
```

---

### 8. EXTERNAL.md - External Connections

```markdown
# External Connections

## Email Sends

| Trigger | Template | Recipient | Variables |
|---------|----------|-----------|-----------|
| Team invite | invite-member | invitee email | {inviter, org, acceptUrl} |
| Deadline reminder | deadline-reminder | org members | {tender, deadline, daysLeft} |
| Password reset | password-reset | user email | {resetUrl, expiresIn} |

## Webhooks

### Inbound
| Source | Endpoint | Payload | Handler | Creates |
|--------|----------|---------|---------|---------|
| Cloudflare Email | POST /api/inbound-email | EmailPayload | parseEmail() | Opportunity |

### Outbound
| Trigger | Destination | Payload | Retry |
|---------|-------------|---------|-------|
| (none currently) | - | - | - |

## Third-Party Integrations

| Service | Purpose | Config Location | Docs |
|---------|---------|-----------------|------|
| Supabase | Database + Auth | .env.local | supabase.com/docs |
| Anthropic | AI (Claude) | .env.local | docs.anthropic.com |
| Vercel | Hosting | vercel.json | vercel.com/docs |
| Cloudflare | Email worker | wrangler.toml | developers.cloudflare.com |

## Environment Variables

| Variable | Service | Required | Description |
|----------|---------|----------|-------------|
| SUPABASE_URL | Supabase | Yes | Project URL |
| SUPABASE_ANON_KEY | Supabase | Yes | Public anon key |
| SUPABASE_SERVICE_KEY | Supabase | Yes | Service role key (server only) |
| ANTHROPIC_API_KEY | Anthropic | Yes | Claude API key |
```

---

## Triggers & Modes

| Trigger | Mode | Output |
|---------|------|--------|
| `MAPX` | Full scan | Complete map (all documents) |
| `MAPX: /route` | Single page | One PAGES/route.md file |
| `MAPX: update` | Refresh | Update existing map with changes |
| `MAPX: validate` | Audit only | Report orphans, dead links, gaps |
| `MAPX: api` | API focus | API.md + DATABASE.md only |
| `MAPX: nav` | Navigation focus | NAVIGATION.md only |
| `MAPX: structure` | Structure only | STRUCTURE.md for monorepo |

---

## Validation Checks

When running MAPX, automatically flag:

| Check | Severity | Description |
|-------|----------|-------------|
| Orphan Pages | Critical | Pages with no incoming routes |
| Dead Links | Critical | Navigation to non-existent routes |
| Unconnected API | Warning | Endpoints defined but never called |
| Missing DB Docs | Warning | Tables used but not documented |
| Stale Components | Info | Components not used by any page |
| Missing Error States | Info | Pages without error handling documented |

---

## Agent-Assisted Generation

MAPX is designed to be **agent-assisted** - automated scanning with human verification.

### Scanning Agents

| Agent | Scans | Produces |
|-------|-------|----------|
| Route Scanner | `**/page.tsx`, `**/route.ts` | ROUTES.md draft |
| API Scanner | `**/api/**/route.ts` | API.md draft |
| DB Scanner | Types, migrations, queries | DATABASE.md draft |
| Component Scanner | `components/**/*.tsx` | COMPONENTS.md draft |
| Nav Scanner | Sidebar, Header, Footer, MobileNav | NAVIGATION.md draft |
| Import Scanner | All imports across files | Cross-reference data |

### Human Verification Required

- **Navigation IN** - What brings users here (requires UX understanding)
- **Actions & Side Effects** - Business logic knowledge needed
- **Error/Empty States** - Design decisions
- **External Connections** - Infrastructure knowledge
- **Cross-project Links** - Architectural understanding

### Workflow

```
1. Run agents to scan codebase → Draft documents
2. Human reviews + fills gaps → Final documents
3. Commit to docs/mapx/
4. On changes: Run MAPX: update → Diff report
```

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CODA** | Plan new features → Update MAPX after implementation |
| **CRUDX** | CRUDX builds DB/API layers → MAPX documents them |
| **CONSTX** | MAPX provides component inventory → CONSTX audits consistency |
| **HARDCODEX** | MAPX shows all routes → HARDCODEX scans each for hardcoded values |
| **PIXELX** | MAPX provides page list → PIXELX audits each page |
| **PLANX** | MAPX informs what exists → PLANX plans changes |

---

## MAPX Best Practices

✅ **Do:**
- Update MAPX when adding new routes/pages
- Include file:line references for traceability
- Document all query params a page accepts
- Track component → page relationships
- Keep cross-project connections current

❌ **Don't:**
- Skip error/empty states documentation
- Forget to document mobile nav separately
- Ignore API consumers (who calls what)
- Leave validation checks unresolved
- Let the map get stale (update as you build)

---

## Example: Complete Page Map

See the `/tenders` example in PAGES/*.md section above for the full depth expected.

Key sections for each page:
1. Meta (file, layout, auth, query params)
2. Navigation OUT (all outbound links/buttons)
3. Navigation IN (all inbound links)
4. Database (tables, columns, relationships)
5. API Calls (endpoints, triggers, responses)
6. State Management (server/local state)
7. Components (what's used on this page)
8. Actions (user triggers and side effects)
9. Loading States
10. Error States
11. Empty States

---

## Summary

**MAPX = Complete Application Wiring Diagram**

- **Universal** - Works for any project, any tech stack
- **Monorepo-aware** - First-class multi-app support
- **Maximum depth** - Every route, click, database touch, action
- **Agent-assisted** - Automated scanning + human verification
- **Living document** - Update as you build

**When you have MAPX:**
- New devs onboard in hours, not weeks
- Navigation bugs are caught before shipping
- Database relationships are always clear
- Nothing is orphaned or forgotten
- The entire system is traceable

---

**Created:** 2026-01-12
**Status:** Universal framework, production-ready
