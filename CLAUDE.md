# Lost Monster - Monorepo

> **Personal Brand + Universal Framework**

This repository contains two main sections:

---

<!-- FIRM:START — auto-managed by update.sh, do not edit between markers -->
> **The Firm v4.6.2** - 34 workers | [Reference](.ai/thefirm/FIRM-CONTEXT.md) | [Protocol](.ai/thefirm/PROTOCOL.md) | [Evolution](.ai/thefirm/gaffer/evolution.md)
<!-- FIRM:END -->


## BOOT SEQUENCE (every session, before any output)

> **Restored 2026-08-18.** This section was absent - the Firm was installed here and never
> started. `setup.sh` writes CLAUDE.md from the template once; after that the file is yours,
> and `update.sh` only touches the version stamp between the FIRM markers. So the one section
> nobody thinks of as theirs can be edited away and nothing puts it back. Five of eleven
> projects were in this state. `firm-health.sh` now FAILS when it happens.

1. Read `.ai/thefirm/gaffer/session-log.md` - last 80 lines. What happened last session.
2. Read `.ai/thefirm/gaffer/debts.md` - what is owed. COUNT it with the debt counter, never by
   eye, and rank against this project's own standard, not only Rule 13's cap.
3. Read `.ai/thefirm/crew/GAFFER.md` - the Gaffer playbook. **If it carries an index of
   `crew/GAFFER-parts/`, it is a front desk: load a part when its work comes up, not at boot.**
   (Split upstream 2026-08-18 - the single file was ~76,100 tokens against a 25,000-token read
   cap, so a full read could not be performed and a truncated one looks identical to a complete
   one. This project sees the split on its next `/sync`.)
4. Protocol compliance scan - last 3 session entries for violations (missing Foreman, missing
   Protocol, direct execution).
5. Unverified-claim scan - flag any "ready to ship / nothing urgent / green" claim from last
   session that was not backed by a shipped worker run.
6. Present the briefing - what shipped, open debts, unverified claims, worker gaps.

**The first message of a session is the briefing. Never a status claim not earned by a check
run this session.**

---

## Repository Structure

```
lostmonster/
├── website/          # Lost Monster marketing website (Next.js)
│   ├── CLAUDE.md     # ← Website-specific AI instructions
│   ├── .ai/          # Website design system & docs
│   ├── app/          # Next.js app router
│   ├── components/   # React components
│   └── ...
│
├── framework/        # Universal development framework
│   ├── CLAUDE.md     # ← Framework AI instructions
│   ├── .ai/          # AI development standards
│   ├── agents/       # AI agents (project-spin-up, etc.)
│   ├── templates/    # Project templates
│   ├── docs/         # Admin reference, guides
│   └── ...
│
└── CLAUDE.md         # This file (repo overview)
```

---

## Quick Start

### Working on the Website
```bash
cd website
npm install
npm run dev
```
**Read:** [website/CLAUDE.md](./website/CLAUDE.md) for design system and guidelines.

### Using the Framework
**Read:** [framework/README.md](./framework/README.md) for available templates and tools.

---

## What's What

| Folder | Purpose | Start Here |
|--------|---------|------------|
| `website/` | Lost Monster marketing site | [website/CLAUDE.md](./website/CLAUDE.md) |
| `framework/` | Universal templates & tools | [framework/START-HERE.md](./framework/START-HERE.md) |

---

## Labs (`website/app/labs/`)

Showcase section for small beta products/tools under the Lost Monster brand. Lives as routes on the website at `/labs`.

### Structure
```
website/app/labs/
├── page.tsx              ← Showcase index (auto-renders grid of all products)
├── layout.tsx            ← Shared metadata template
└── [product-slug]/       ← Each product gets its own folder
    └── page.tsx
```

### Current Products
| Product | Slug | Status | Route |
|---------|------|--------|-------|
| BulletProof | `bulletproof` | coming-soon | `/labs/bulletproof` |

### Adding a New Product
1. Create folder: `website/app/labs/my-tool/page.tsx`
2. Add entry to `labProducts` array in `website/lib/labs.ts`
3. Add the Lucide icon to `iconMap` in `website/app/labs/page.tsx`
4. Done. Index page auto-renders it.

### Config (`website/lib/labs.ts`)
- `LabProduct` interface: `slug`, `name`, `description`, `status` (beta/live/coming-soon), `icon`, `tags`
- `labProducts` array — single source of truth
- `getStatusConfig()` — returns badge styling per status
- `getLabProduct()` — lookup by slug

### Design Notes
- Dark gradient background + grid pattern (matches homepage)
- Glassmorphism cards with dynamic theming via `useColor()`
- "Coming Soon" products are muted + not clickable
- Framer Motion staggered entrance animations
- See `website/app/labs/bulletproof/page.tsx` as a template for new product pages

---

## Portfolio Intelligence (`.ai/portfolio/`)

Lost Monster is the master agency — it tracks every project in development across the `/Volumes/Projects/` workspace.

- **`/portfolio`** — project-specific skill. Scans every repo in `/Volumes/Projects/`, maintains a deep `OVERVIEW.md` per venture plus a running `INDEX.md` tally. Smart-updates only what changed since the last scan; logs every run to `CHANGELOG.md`.
- **`.ai/portfolio/INDEX.md`** — the running tally: every project, status, strategic call, one-liner.
- **`.ai/portfolio/projects/<name>.md`** — investor-grade deep-dive per venture.
- Read-only on other repos. This skill and its knowledge base are local to lostmonster and never synced to The Stack.

---

## For AI Assistants

**If working on the website:** Read [website/CLAUDE.md](./website/CLAUDE.md) first.

**If using framework templates:** Read [framework/CLAUDE.md](./framework/CLAUDE.md) first.

**Key principle:** Website-specific vs. universal content are now clearly separated.

### Database Migrations

**You CAN and SHOULD run database migrations directly** when working on the dashboard:

```bash
# Run migrations
cd dashboard
DATABASE_URL="<neon-connection-string>" node scripts/run-migration.js

# Seed sample data
DATABASE_URL="<neon-connection-string>" node scripts/run-seed.js
```

The DATABASE_URL is available in `dashboard/apps/web/.env.local`.
Do not ask permission to run migrations - just run them as part of the development workflow.
