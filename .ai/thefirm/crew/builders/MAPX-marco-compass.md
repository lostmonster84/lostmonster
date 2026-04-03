# MAPX — Complete Application Map Framework

> **M**ap **A**ll **P**aths e**X**haustively
>
> The most comprehensive wiring diagram for Lost Monster.
> Every route, every click, every database touch, every action.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[HOSTING-PROVIDER]` | Vercel | CLAUDE.md |
| `[STORAGE]` | | |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
| `[MAP-SERVICE]` | | |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**MAPX for Lost Monster** maps every route, click path, database touch, and action across the monorepo. The website (port 3000) serves public routes: `/`, `/about`, `/services`, `/case-studies`, `/contact`, `/demo`, `/process`, `/faq`, `/apps`, `/m/*`. The dashboard (port 3001) serves admin routes: `/`, `/login`, `/ancarraig/*`, `/tasks`, `/settings`, `/investments`, `/pricing`.

Cross-origin auth flows connect website to dashboard via HMAC-SHA256 token exchange. Both apps share Neon PostgreSQL as the data layer.
---

## MAPX Output Structure

```
docs/mapx/
├── README.md              # Overview + quick reference
├── STATUS.md              # LIVING AUDIT - What's built & working (checkboxes)
├── STRUCTURE.md           # Project layout
├── ROUTES.md              # Master route index
├── PAGES/
│   ├── public/            # Public-facing pages
│   └── admin/             # Admin pages
├── API.md                 # Complete API endpoint index
├── DATABASE.md            # Schema + page relationships
├── COMPONENTS.md          # Component dependency graph
├── NAVIGATION.md          # All nav elements
└── EXTERNAL.md            # External service integrations
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

## Legend
| Symbol | Meaning |
|--------|---------|
| ✅ | Working & verified |
| 🚧 | In progress |
| ❌ | Not built / N/A |
| ⚠️ | Has issues |

## Verification Log
| Date | Verified By | Scope |
|------|-------------|-------|
```

### Verification Process

To verify a route/endpoint:
1. Check page renders (200 status)
2. Check database queries execute
3. Check auth guards work (if applicable)
4. Check API endpoints respond correctly
5. Update STATUS.md with ✅ or ⚠️

---

## Triggers & Modes

| Trigger | Mode | Output |
|---------|------|--------|
| `MAPX` | Full scan | Complete map (all documents) |
| `MAPX: /page` | Single page | One PAGES/page.md file |
| `MAPX: update` | Refresh | Update existing map with changes |
| `MAPX: validate` | Audit only | Report orphans, dead links, gaps |
| `MAPX: api` | API focus | API.md + DATABASE.md only |
| `MAPX: nav` | Navigation focus | NAVIGATION.md only |

---

## Validation Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Orphan Pages | Critical | Pages with no incoming routes |
| Dead Links | Critical | Navigation to non-existent routes |
| Unconnected API | Warning | Endpoints defined but never called |

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

## Supplements

Before starting work, check for a relevant supplement in `builders/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
