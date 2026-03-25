---
name: Admin Panel v2
slug: adminpanel
status: active
type: framework
industry: Multi-vertical SaaS
stack: [Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion]
---

# Admin Panel v2 — Universal Admin Infrastructure

Universal, industry-agnostic admin panel framework providing reusable UI components, composable patterns, and three portal layouts (Business, Consumer, Superadmin). Drop into any Next.js project with optional industry presets.

## What It Does

Provides battle-tested admin UI infrastructure extracted from 4+ production projects. Instead of rebuilding dashboards from scratch, scaffold a complete admin experience in minutes.

## Architecture

- **5 Base UI Components** — MetricCard, SearchFilter, Pagination, SortableHeader, StatusBadge
- **6 Composable Patterns** — KanbanBoard, MultiStepForm, CrudList, ProfileEditor, MetricsDashboard, SearchWithFilters
- **3 Portal Layouts** — BusinessShell (sidebar), ConsumerShell (top nav + mobile tabs), SuperadminShell (dark sidebar, desktop-only)

## Industry Presets (6 Domains)

| Industry | Source Project | Status |
|----------|---------------|--------|
| Recruitment | HospoJobs | Production-tested |
| Property | DOMA | Production-tested |
| Hospitality | WildTrax + Ancarraig | Production-tested |
| B2B SaaS | EVIDIS | Production-tested |
| E-Commerce | Template | Ready |
| Marketplace | Template | Ready |

## Key Principles

1. **Share components, not pages** — MetricCard is shared; Dashboard pages are custom
2. **Share patterns, not implementations** — KanbanBoard structure is shared; pipeline data is project-specific
3. **Share shells, not navigation** — Sidebar chrome is shared; nav items differ per industry
4. **Never share database code** — Each project brings its own ORM + schema
5. **Presets = config, not code** — Industry presets configure; they don't contain pages

## Usage

```bash
bash setup.sh /path/to/project --preset=recruitment
bash update.sh /path/to/project  # Updates shared packages only
```

## Why It Matters

Eliminates weeks of dashboard boilerplate. Every component is extracted from real production apps — not theoretical. Type-safe, mobile-responsive, accessible, and lightweight (Tailwind + Lucide icons, no external UI library).
