# MAPX -- Complete Application Map Framework -- Lost Monster Edition

> **M**ap **A**ll **P**aths e**X**haustively
>
> The most comprehensive wiring diagram for personal brand development agency.
> Every route, every click, every database touch, every action.

---

## Lost Monster Context

**MAPX for Lost Monster** understands:
- **Single Next.js app** - `app/` for pages, `app/api/` for API routes (not a monorepo)
- **Neon PostgreSQL** via **Prisma** - projects, services, testimonials, contacts
- **Public pages** - Marketing (no auth required)
- **Dynamic theming** - 5-colour user-selectable accent system
- **Vercel** hosting

---

## Lost Monster MAPX Output Structure

```
.ai/mapx/
+-- README.md              # Overview + quick reference
+-- STATUS.md              # LIVING AUDIT - What's built & working (checkboxes)
+-- STRUCTURE.md           # App layout
+-- ROUTES.md              # Master route index
+-- PAGES/
|   +-- homepage.md
|   +-- projects.md
|   +-- project-detail.md
|   +-- services.md
|   +-- contact.md
|   +-- about.md
+-- API.md                 # Complete API endpoint index
+-- DATABASE.md            # Schema + page relationships
+-- COMPONENTS.md          # Component dependency graph
+-- NAVIGATION.md          # All nav elements
+-- EXTERNAL.md            # Neon PostgreSQL, Vercel integrations
```

---

## STATUS.md - Living Audit System

**STATUS.md is the living audit document** that tracks what's actually working.

### Structure

```markdown
# Lost Monster System Status

> Living audit of all routes, APIs, and database connections
> Last verified: {date}

## Quick Stats
| Area | Pages | Working | APIs | Working |
|------|-------|---------|------|---------|
| Public | X | X | X | X |

## Legend
| Symbol | Meaning |
|--------|---------|
| [x] | Working & verified |
| [~] | In progress |
| [ ] | Not built / N/A |
| [!] | Has issues |

## Public Pages
### Pages
| Route | Renders | DB | Auth | Notes |
|-------|---------|-----|------|-------|
| `/` | [x] | [x] | N/A | Homepage |

### API Endpoints
| Endpoint | Method | Works | Auth | DB |
|----------|--------|-------|------|-----|
| `/api/projects` | GET | [x] | N/A | [x] |

## Database Tables
| Table | Used By | Prisma |
|-------|---------|--------|
| projects | /projects, / | [x] |

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
2. Check database queries execute (Prisma)
3. Check API endpoints respond correctly
4. Update STATUS.md with [x] or [!]

---

## Lost Monster Structure Map

### STRUCTURE.md

```markdown
# Lost Monster Project Structure

## Single Next.js App Layout

website/
+-- app/                    # Next.js App Router
|   +-- page.tsx            # Homepage
|   +-- projects/           # Projects listing + detail
|   +-- services/           # Services page
|   +-- contact/            # Contact / enquiry form
|   +-- about/              # About page
|   +-- api/                # API routes
|   |   +-- projects/       # Projects CRUD
|   |   +-- contacts/       # Enquiry submission
|   |   +-- testimonials/   # Testimonials
|   |   +-- health/         # Health check
+-- components/             # React components
|   +-- layout/             # SiteHeader, SiteFooter, ColorSwitcher
|   +-- projects/           # ProjectCard, ProjectGrid
|   +-- ui/                 # Shared UI primitives
+-- lib/                    # Utilities
|   +-- db.ts               # Prisma client
|   +-- types/              # TypeScript types
+-- prisma/                 # Database schema
|   +-- schema.prisma       # Neon PostgreSQL schema
+-- .ai/                    # AI instructions & design system
+-- public/                 # Static assets

## Key Connections

| From | To | Type | Trigger |
|------|----|------|---------|
| Homepage | Projects | Link | "See My Work" CTA |
| Homepage | Contact | Link | "Start Your Project" CTA |
| Projects | Neon PostgreSQL | API | Project listing |
| Contact form | Neon PostgreSQL | API | Enquiry submission |
| All pages | Color system | State | User colour selection |
```

---

## Lost Monster Routes Map

### ROUTES.md

```markdown
# Lost Monster Routes Index

## Public Routes
| Route | File | Purpose |
|-------|------|---------|
| / | app/page.tsx | Homepage with hero, metrics, colour switcher |
| /projects | app/projects/page.tsx | Projects listing |
| /projects/[slug] | app/projects/[slug]/page.tsx | Project detail |
| /services | app/services/page.tsx | Services offered |
| /contact | app/contact/page.tsx | Enquiry form |
| /about | app/about/page.tsx | About Lost Monster |

## API Routes
| Route | Methods | Purpose |
|-------|---------|---------|
| /api/health | GET | System health check |
| /api/projects | GET, POST | Projects listing + creation |
| /api/projects/[id] | GET, PUT, DELETE | Single project CRUD |
| /api/contacts | POST | Submit enquiry |
| /api/testimonials | GET | Testimonials listing |
```

---

## Lost Monster Page Map Example

### PAGES/projects.md

```markdown
# /projects

> Projects listing page

## Meta

| Property | Value |
|----------|-------|
| File | app/projects/page.tsx |
| Layout | app/layout.tsx -> SiteHeader + SiteFooter |
| Auth | Public |
| Query Params | ?category=web-app|saas|automation&featured=true |

---

## Navigation OUT (Where you can go FROM here)

### Primary Actions
| Element | Type | Destination | Condition |
|---------|------|-------------|-----------|
| Project card click | Link | /projects/[slug] | Always |
| Filter category | Tab | /projects?category=X | Always |

### Header Navigation
| Element | Destination |
|---------|-------------|
| Logo | / |
| Projects | /projects |
| Services | /services |
| Contact | /contact |
| About | /about |

---

## Navigation IN (What brings users HERE)

| Source Page | Element | Route |
|-------------|---------|-------|
| / (homepage) | "See My Work" CTA | /projects |
| / (homepage) | "View all projects" | /projects |
| /services | "See examples" | /projects?category=X |
| Header | "Projects" nav item | /projects |

---

## Database Operations

### Tables Accessed
| Table | Operation | Columns | Purpose |
|-------|-----------|---------|---------|
| projects | SELECT | id, slug, title, category, description | Project listing |

### Filters Applied
| Filter | Column | Operation |
|--------|--------|-----------|
| category | category | = |
| featured | featured | = |
| status | status | = 'active' |

---

## API Calls

| Endpoint | Method | Trigger | Request | Response |
|----------|--------|---------|---------|----------|
| /api/projects | GET | Page load, filter change | Query params | Project[] |

---

## Components Used

| Component | File | Purpose |
|-----------|------|---------|
| ProjectCard | components/projects/ProjectCard.tsx | Project cards (glassmorphism) |
| ProjectGrid | components/projects/ProjectGrid.tsx | Grid layout |
| ColorSwitcher | components/layout/ColorSwitcher.tsx | Colour theme selector |
| SiteHeader | components/layout/SiteHeader.tsx | Navigation |
| SiteFooter | components/layout/SiteFooter.tsx | Footer |

---

## State Management

| State | Type | Source | Purpose |
|-------|------|--------|---------|
| projects | Server | API fetch | Project results |
| filters | URL | Query params | Active filters |
| selectedColor | Local | useState + localStorage | Dynamic theme colour |

---

## Loading States

| State | Component | Display |
|-------|-----------|---------|
| Initial load | ProjectCardSkeleton | 6 skeleton cards (bg-white/5) |
| Filtering | Overlay | Subtle loading indicator |

---

## Empty States

| Condition | Display | Action |
|-----------|---------|--------|
| No results | "No projects found" | "Clear filters" button |
| No results in category | "No [category] projects yet" | Link to all projects |
```

---

## Lost Monster Database Map

### DATABASE.md

```markdown
# Lost Monster Database Schema (Neon PostgreSQL via Prisma)

## Tables

### projects
| Column | Type | Purpose |
|--------|------|---------|
| id | String (cuid) | Primary key |
| slug | String (unique) | URL identifier |
| title | String | Project title |
| description | String | Project description |
| category | String | Category (web-app, saas, etc.) |
| service_type | String | Service type (build, consult, maintain) |
| client | String? | Client name |
| url | String? | Live project URL |
| featured | Boolean | Featured on homepage |
| display_order | Int | Sort order |
| status | String | draft/active/archived |

### contacts
| Column | Type | Purpose |
|--------|------|---------|
| id | String (cuid) | Primary key |
| name | String | Contact name |
| email | String | Contact email |
| phone | String? | Contact phone |
| message | String? | Enquiry message |
| project_id | String? | FK -> projects |
| status | String | new/contacted/qualified/closed/spam |

### testimonials
| Column | Type | Purpose |
|--------|------|---------|
| id | String (cuid) | Primary key |
| name | String | Client name |
| role | String? | Client role |
| company | String? | Client company |
| quote | String | Testimonial text |
| rating | Int? | Star rating |
| project_id | String? | FK -> projects |
| featured | Boolean | Featured display |
| status | String | active/hidden |

## Page Relationships

| Table | Read By | Write By |
|-------|---------|----------|
| projects | /, /projects, /projects/[slug] | /api/projects (POST/PUT) |
| contacts | (admin views) | /api/contacts (POST - public enquiry form) |
| testimonials | /, /projects/[slug] | /api/testimonials (admin) |
```

---

## Triggers & Modes

| Trigger | Mode | Output |
|---------|------|--------|
| `MAPX` | Full scan | Complete map (all documents) |
| `MAPX: /projects` | Single page | One PAGES/projects.md file |
| `MAPX: update` | Refresh | Update existing map with changes |
| `MAPX: validate` | Audit only | Report orphans, dead links, gaps |
| `MAPX: api` | API focus | API.md + DATABASE.md only |
| `MAPX: nav` | Navigation focus | NAVIGATION.md only |

---

## Lost Monster Validation Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Orphan Pages | Critical | Pages with no incoming routes |
| Dead Links | Critical | Navigation to non-existent routes |
| Unconnected API | Warning | Endpoints defined but never called |
| Missing Brand Compliance | Warning | Pages without dark gradient background |
| Missing Colour System | Warning | Pages not using dynamic accent colour |
| Missing Metrics | Warning | Public pages without key metrics (50+, 70%, 4.9/5, 2-4 wks) |

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CODAX** | Plan new features -> Update MAPX after implementation |
| **CRUDX** | CRUDX builds DB/API layers -> MAPX documents them |
| **DEMX** | MAPX provides component inventory -> DEMX creates variations |
| **UXPATX** | MAPX shows all routes -> UXPATX audits UX patterns |
| **SOFAX** | MAPX provides page list -> SOFAX audits each page |

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 2.1 (Lost Monster Adapted)
