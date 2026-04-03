# PLANX Framework

> **Execution Blueprint for Lost Monster**
>
> Milestone-based planning for features with exhaustive todo breakdowns.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
| `[MAP-SERVICE]` | | |
| `[BRAND-PRIMARY]` | #06B6D4 (teal) | CLAUDE.md |
| `[BRAND-BG]` | Dark/black backgrounds | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**PLANX for Lost Monster** creates milestone-based execution blueprints for features spanning the monorepo. Standard milestone order: Database & Types (Neon PostgreSQL), API Routes (Next.js), Components (React + Tailwind), Page Integration, Quality Audit (SOFAX 93+/110).

Tech stack: Next.js 15, TypeScript strict, Tailwind CSS 3.4, Framer Motion 12, React Hook Form + Zod. Deployment via Vercel. All plans reference the design system at `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md`.
---

## The CODAX → PLANX Pipeline

```
CODAX                             PLANX
┌─────────────────────┐           ┌─────────────────────┐
│ WHAT are we         │           │ HOW do we execute   │
│ building?           │    →      │ it step-by-step?    │
│                     │           │                     │
│ • Context           │           │ • Milestones        │
│ • Objective         │           │ • Todos             │
│ • Details           │           │ • Detailed Summaries│
│ • Acceptance        │           │ • Dependencies      │
└─────────────────────┘           └─────────────────────┘
     STRATEGY                         EXECUTION
```

---

## When to Use PLANX

### Use PLANX For

- **Features** requiring 10+ discrete steps
- **Multi-session work** spanning multiple conversations
- **Critical implementations**
- **Uncertain scope** needing full discovery upfront

### Skip PLANX For

- Simple bug fixes
- Single-file changes
- Quick UI tweaks
- Already-planned work (CODAX produced detailed steps)

---

## Milestone Templates

Structure milestones in this order:

1. **Database & Types** — Schema, migrations, TypeScript interfaces
2. **API Routes** — CRUD endpoints with auth guards
3. **Components** — UI components (forms, tables, cards)
4. **Page Integration** — Wire components into pages, navigation
5. **Quality Audit** — Brand compliance, SOFAX audit, performance testing

### Quality Milestone Template

```markdown
## Milestone N: Quality Audit

- [ ] N.1 Brand compliance check (approved backgrounds, page rhythm, AI Slop provenance)
- [ ] N.2 Run SOFAX audit (target 93+/110, including Dimension 11)
- [ ] N.3 Fix identified issues
- [ ] N.4 Final verification
```

---

## Todo Detailed Summary Template

```markdown
#### - [ ] X.X [Task name]
**Status:** Pending
**Summary:** [One sentence]
**Detailed Summary:**
- What: [What to build]
- Why: [Why it matters]
- How: [Technical approach]
- Acceptance: [Done criteria]
- Dependencies: [What must be complete first]
- Files: [File paths]
```

---

## Quick Reference

### PLANX Triggers
```
PLANX: [feature description]
PLANX: [entity] management dashboard
PLANX: [system name]
```

### Depth Guidelines

**Too shallow:** "Build search"
**Too deep:** "Add import on line 3"
**Just right:** "Build EntityCard component with image, title, details"

### Milestone Sizing

- **Target:** 3-8 todos per milestone
- **Total:** 3-7 milestones per feature
- **UI milestones must include:** A "Brand constraints" field specifying approved backgrounds, page rhythm expectations, and any novel visual patterns requiring approval. Reference: `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, AI Slop Test (Provenance Rule)

---


---

## Supplements

Before starting work, check for a relevant supplement in `planners/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
