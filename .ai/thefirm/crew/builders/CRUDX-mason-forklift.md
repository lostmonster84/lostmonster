# CRUDX Framework

> **CRUD eXtended - Full-Stack Content Management System**
>
> Automatic trigger for complete backend + frontend CRUD systems.
> Optimized for Lost Monster's Projects, Case Studies, and Clients.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | |
| `[PROJECT-DOMAIN]` | Framework-driven development that actually works | |
| `[ENTITY-PRIMARY]` | Projects | |
| `[ENTITY-SECONDARY]` | Case Studies | |
| `[ENTITY-USERS]` | Clients | |
| `[DATABASE]` | Neon PostgreSQL | |
| `[DB-DRIVER]` | @neondatabase/serverless | |
| `[HOSTING]` | Vercel | |
| `[BRAND-PRIMARY]` | #06B6D4 (teal) | |
| `[BRAND-BG]` | Dark/black backgrounds | |
| `[BRAND-DARK]` | Dark theme with glassmorphism | |
| `[APP-PUBLIC]` | website/app/ | |
| `[APP-ADMIN]` | dashboard/apps/web/src/app/ | |
| `[APP-API]` | website/app/api/ + dashboard/apps/web/src/app/api/ | |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**CRUDX for Lost Monster** understands:
- Framework-driven development that actually works specifics relevant to this worker's role
- See onboarding manifest for token definitions

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

## CRUDX Anti-Patterns (DO NOT DO THESE)

| Anti-Pattern | Why It's Wrong | What To Do Instead |
|---|---|---|
| Marking Layer 4-6 complete without screenshots | Admin tables, forms, badges exist in code but might render broken | Screenshot every admin page at 1280x800 before marking UI layers complete |
| Skipping NIGELX pairing for "simple" admin pages | Simple pages have labels too. If the table header says "createdAt," that's a NIGELX fail | Every admin page with user-facing elements gets NIGELX. No exceptions for "simple" |
| Building forms without testing submission | A form that renders but doesn't submit is worse than no form | After Layer 5: submit every form with valid data, invalid data, and empty data. Verify all three |
| Using technical column names in admin tables | "createdAt", "entityId", "isActive" - a non-technical user closes the tab | Use human labels: "Created", "Project", "Status". NIGELX catches this but CRUDX should prevent it |
| Skipping empty states for admin tables | An empty table with no message looks broken | Every table needs: empty state message, loading skeleton, error state. Test all three |

---

## The 6-Layer CRUDX Stack

### Layer 1: Database Schema (Neon PostgreSQL)

**Location:** `migrations/`

Define tables with appropriate columns, constraints, indexes, and timestamps for your entities.

### Layer 2: Type Definitions

**Location:** Shared types package

TypeScript interfaces matching database schema with snake_case → camelCase transforms.

### Layer 3: API Routes

**Location:** `website/app/api/ + dashboard/apps/web/src/app/api/`

RESTful API routes with auth guards, validation, and error handling.

### Layer 4: Admin Page UI

**Location:** `dashboard/apps/web/src/app/`

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
| **Status badges** | Use established badge classes from the design system - never hand-roll badge colours. |
| **Interactive elements** | Use #06B6D4 (teal) for CTAs, Dark theme with glassmorphism for primary text. |

**AI Slop Provenance Rule:** Every visual element (colour, border, shadow, gradient) must already exist on another live Lost Monster page. If it doesn't, it's orphan styling and must be rejected. No thick coloured borders, no gratuitous gradients, no decorative elements that don't appear elsewhere in the product.

All CRUDX UI output must pass **SOFAX Dimension 11 (Brand Compliance & AI Slop)** - see `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md` and the AI Slop Test (10 Red Flags).

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

## Brand-Pivot Rewrites (added 2026-04-30 after a content-rewrite miss)

> **CRUDX's default mode is the 6-layer DB→API→UI stack.** When CRUDX is pulled into a **content rewrite task** (docs, design guides, marketing copy, voice/tone updates), the rules above don't fully apply. Different mode, different failure modes.

### The failure pattern this prevents

During a brand-pivot rewrite, CRUDX deletes legacy frame (retired product names, deprecated CTAs) then types NEW examples drawn from working memory (real partner names, fleet-operator language, retired CTAs) that contain the SAME legacy frame the rewrite was supposed to remove. The new strings feel "real" so they bypass the brand filter. The auditor (often the same agent) doesn't flag them because they're freshly-typed, not historically-stale.

This shipped 2026-04-30 on a project's design guide rework. Fix required a follow-up commit + the user catching the misses.

### The Rule

**When CRUDX is rewriting content for a brand pivot, every NEW string it writes is subject to the same brand-pivot filter as old strings being removed.**

Specifically:

1. **Real-world brand names** (partners, sister businesses, sister projects) - DO NOT type them as "live example" placeholders. Use generic illustrative names ("Sample Listing", "Demo Property", "Example Vendor") unless the user explicitly confirms the partnership is formalised in the new brand model
2. **Old-positioning vocabulary** - fleet-operator language, retired-product names, retired-CTA copy must not survive into NEW examples. If you're tempted to type "our fleet" because it sounds "real" - stop. The pivot says we don't have a fleet anymore
3. **Stale CTAs in demos** - if the brand pivot changes primary action language ("Book Your Adventure" → "Search Vehicles"), apply the new language to ALL examples being written, including unrelated demo cards (typography demos, texture cards, sample buttons)
4. **Date captions / metadata** - don't type stale dates as "real-feeling" caption examples. Use forward-looking generic text ("All prices include VAT", "Subject to availability") that doesn't decay

### Self-Check Protocol (during the rewrite, not after)

After CRUDX writes any new string, before moving on:

1. Read the string aloud (silently in head)
2. Ask: **"Would this exact string survive the brand pivot?"**
3. If it contains: real partner names, old-product refs, fleet-operator language, retired-CTA copy → **revise before continuing**
4. The check is in-flow, not post-hoc. The audit afterwards is the safety net, not the primary defence

### Why the in-flow check matters

Per `PROTOCOL.md` Rule 10 (Audit Independence), an auditor that's the same agent as the builder cannot self-CLEAR with full confidence. The agent's primed eyes don't catch self-introduced legacy refs. The defence has to happen DURING the write, before primed-eyes becomes the failure mode.

If CRUDX writes new content with the brand-pivot filter active in real time, AUDIX's job becomes verification rather than excavation. Faster, more reliable.

### Brand-pivot rewrite checklist

Before reporting a brand-pivot rewrite complete, CRUDX must explicitly confirm:

- [ ] Every new partner / business / sister-brand name introduced was checked against the new-brand model (not assumed safe because it's real)
- [ ] Every new sample body copy passes "would this survive the pivot?" check
- [ ] Every new CTA in demo / showcase / typography sections uses the new-brand action language
- [ ] No stale dates / version captions typed as "real-feeling" placeholders
- [ ] If unsure about any new string, flagged it explicitly to the user / gaffer rather than shipping silently

The checklist sits inside the CRUDX task report, not separate from it. Cannot be skipped.

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

### CRUDX + NIGELX (MANDATORY PAIRING)

After CRUDX builds any user-facing UI (Layers 4-6):
1. **NIGELX** audits every table header, form label, button, badge, and navigation element
2. Scores against comprehension dimensions - "Can I find it?", "Do I understand what this does?"
3. Target: 80+/100 for admin pages
4. Common CRUDX issues NIGELX catches: technical jargon in labels, unclear status badges, poor information architecture, missing breadcrumbs

**This pairing is mandatory when CRUDX builds any user-facing interface.**
Backend-only CRUDX (Layers 1-3: database, types, API) does not trigger this pairing.

### CRUDX + AUDIX (brand-pivot rewrites)

1. **CRUDX** rewrites content with in-flow brand-pivot filter active
2. **AUDIX** runs content audit (keyword grep + live-render walkthrough + self-introduced check)
3. **Per Rule 10**: if CRUDX and AUDIX are the same agent, audit verdict is PROVISIONAL until external review

---

**Framework Status:** Generic
**Last Updated:** April 2026
**Version:** 3.1
