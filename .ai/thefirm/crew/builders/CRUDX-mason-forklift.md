# CRUDX Framework

> **CRUD eXtended - Full-Stack Content Management System**
>
> Automatic trigger for complete backend + frontend CRUD systems.
> Optimized for Lost Monster's Projects, Case Studies, and Clients.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[HOSTING-PROVIDER]` | Vercel | CLAUDE.md |
| `[BRAND-PRIMARY]` | #06B6D4 (teal) | CLAUDE.md |
| `[BRAND-BG]` | Dark/black backgrounds | CLAUDE.md |
| `[BRAND-DARK]` | Dark theme with glassmorphism | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**CRUDX for Lost Monster** builds full-stack CRUD systems across the monorepo — Neon PostgreSQL tables, Next.js API routes, and admin interfaces in the dashboard (port 3001). Primary entities are Projects, Case Studies, and Clients.

Auth is handled via NextAuth v5 with Credentials + JWT strategy. The dashboard uses a DARKX semantic colour system with HSL CSS variables. All admin UX must pass the Graduate Grace test — clear labels, obvious actions, zero jargon.
---

## When to Use CRUDX

### Automatic Triggers

✅ **Use CRUDX when:**
- Adding new Projects management features
- Building Case Studies functionality
- Creating user/account management systems
- Managing content entities
- Any content that needs admin CRUD

❌ **Don't use CRUDX when:**
- Hardcoded static content (about page text)
- One-time style changes
- Bug fixes
- Design token updates

### Explicit Trigger

User says: **"CRUDX: [entity]"** → Build complete 6-layer system for that entity

---

## The 6-Layer CRUDX Stack

### Layer 1: Database Schema (Neon PostgreSQL)

**Location:** `migrations/`

Define tables with appropriate columns, constraints, indexes, and timestamps for your entities.

### Layer 2: Type Definitions

**Location:** Shared types package

TypeScript interfaces matching database schema with snake_case → camelCase transforms.

### Layer 3: API Routes

**Location:** `Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/)`

RESTful API routes with auth guards, validation, and error handling.

### Layer 4: Admin Page UI

**Location:** `dashboard/apps/web/ (port 3001)`

Admin interface with tables, forms, status badges, and action buttons.

### Layer 5: Admin Components

**Location:** Admin components directory

Reusable components: forms, widgets, badges, filters.

#### Brand Compliance (Layers 4 & 5)

> **Every UI component CRUDX builds must be brand-compliant.**
> Consult `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md` for the full approved palette, backgrounds, and card treatment.

| Context | Rule |
|---------|------|
| **Public pages** | Use approved background palette. Cards with approved shadow/radius. Never use unapproved background colours. |
| **Admin pages** | Follow existing admin patterns (UXPATX). Existing card class and layout patterns. |
| **Status badges** | Use established badge classes from the design system — never hand-roll badge colours. |
| **Interactive elements** | Use #06B6D4 (teal) for CTAs, Dark theme with glassmorphism for primary text. |

**AI Slop Provenance Rule:** Every visual element (colour, border, shadow, gradient) must already exist on another live Lost Monster page. If it doesn't, it's orphan styling and must be rejected. No thick coloured borders, no gratuitous gradients, no decorative elements that don't appear elsewhere in the product.

All CRUDX UI output must pass **SOFAX Dimension 11 (Brand Compliance & AI Slop)** — see `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md` and the AI Slop Test (10 Red Flags).

---

### Layer 6: Integration Points

#### Admin Navigation

Add new entities to the sidebar/navigation system.

#### Public Site (Public API)

Public endpoints for reading active/published content with appropriate status filters.

---

## CRUDX Checklist

When building a CRUDX system for any entity:

- [ ] **Database:** Table with appropriate columns and indexes
- [ ] **Types:** TypeScript interfaces for entity, create/update inputs, filters
- [ ] **API:** CRUD endpoints with auth guards
- [ ] **UI:** Management table with status indicators
- [ ] **Components:** Form (multi-step if needed), status badges
- [ ] **Integration:** Dashboard widget, navigation link

---

## Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Database columns | `snake_case` | `created_at`, `display_order` |
| TypeScript | `camelCase` | `createdAt`, `displayOrder` |
| API routes | `kebab-case` | `/api/admin/entities` |
| Component files | `PascalCase` | `EntityForm.tsx` |

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

**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
