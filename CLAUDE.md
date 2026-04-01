# Lost Monster - Monorepo

> **Personal Brand + Universal Framework**

This repository contains two main sections:

---

<!-- FIRM:START — auto-managed by update.sh, do not edit between markers -->
> **The Firm v3.13** — 31 workers | [Reference](.ai/thefirm/FIRM-CONTEXT.md) | [Protocol](.ai/thefirm/PROTOCOL.md) | [Evolution](.ai/thefirm/gaffer/evolution.md)
<!-- FIRM:END -->


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
