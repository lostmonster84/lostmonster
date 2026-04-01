# Project Setup — Checklist

> Created by `setup.sh`. Work through each item with the Gaffer.
> Run `/gaffer` — it reads this file and guides you through the next incomplete step.
> When all items are complete, this file is archived and the project is ready to build.

---

## Progress

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Project Identity (project.json) | `TODO` | Industry, entities, colours, stack |
| 2 | CLAUDE.md | `TODO` | Fill all [BRACKETED] placeholders |
| 3 | CLAUDE-SUPPLEMENT.md | `TODO` | Routes, APIs, patterns, deep reference |
| 4 | PRD | `TODO` | Product requirements — run PRDX 9-round validation |
| 5 | Design Guide | `TODO` | Brand colours, typography, cards, CTAs, spacing, anti-patterns |
| 6 | design-config.json | `TODO` | Config-driven design page — run /design |
| 7 | Slop Test | `TODO` | AI slop detection rules — Provenance Rule + 10 red flags |
| 8 | Worker Onboarding | `TODO` | Run Gaffer: onboard — rewrites all 31 workers from PRD + project.json |

**Status values:** `TODO` → `IN PROGRESS` → `DONE`

---

## Step 1: Project Identity (project.json)

**What:** Create `project.json` at the project root — the machine-readable manifest that tells every worker who this project is.

**How:** The Gaffer will ask you:
- Project name and one-line description
- Industry type (real-estate, car-hire, saas, healthcare, etc.)
- Primary entity (properties, vehicles, patients, products, etc.)
- Secondary entity and user entity
- Brand colours (primary, background, dark, secondary, muted, accent)
- Tech stack (database, hosting, auth, email, payments, maps)
- Key paths (public app, admin app, API)
- Test persona and target users

**Output:** `project.json` saved to project root. All subsequent steps read from this.

**Mark complete when:** `project.json` exists with no empty required fields.

---

## Step 2: CLAUDE.md

**What:** Fill all `[BRACKETED]` placeholders in CLAUDE.md with project-specific content.

**How:** The Gaffer reads `project.json` and auto-fills what it can. You fill the rest:
- Project structure (monorepo layout, package names)
- Personality core (brand voice, energy level)
- Auth patterns (if applicable)
- Deployment details (hosting, CI/CD)
- Success metrics
- Auto-context loading triggers

**Output:** CLAUDE.md with zero `[BRACKETED]` placeholders remaining.

**Mark complete when:** `grep '\[.*\]' CLAUDE.md` returns zero matches (excluding code blocks and markdown links).

---

## Step 3: CLAUDE-SUPPLEMENT.md

**What:** Fill the deep reference doc with project-specific routes, APIs, database schema, and patterns.

**How:** The Gaffer scans your codebase and fills what it can:
- Route inventory (scan `app/` directories)
- API endpoints (scan `app/api/` directories)
- Database tables (scan migrations or schema files)
- Component patterns (scan component directories)
- Environment variables (scan `.env.example` or `.env.local`)

You fill:
- Business logic explanations
- Domain-specific terminology
- Integration details (third-party services)

**Output:** CLAUDE-SUPPLEMENT.md with project-specific content throughout.

**Mark complete when:** No generic placeholder text remains.

---

## Step 4: PRD (Product Requirements Document)

**What:** Define what this project is, who it's for, and what it does. This is the foundation that worker onboarding reads from.

**How:** Run PRDX — the 9-round validation process:
1. **The Pitch** — explain in 30 seconds what you're building
2. **Target Market** — who are the users? Why do they need this?
3. **Core Features** — what are the 3-5 things it must do?
4. **User Flows** — walk through the main journeys
5. **Entities & Data** — what objects exist? How do they relate?
6. **Competitors** — who else does this? What's your edge?
7. **Tech Constraints** — what's non-negotiable about the stack?
8. **Success Metrics** — how do you know it's working?
9. **Red Flags** — what could kill this project?

**Output:** A validated PRD at `docs/PRD.md`.

**Mark complete when:** PRD passes PRDX validation (all 9 rounds complete, no TBDs).

---

## Step 5: Design Guide

**What:** The visual identity document that every UI worker checks against. Without this, brand compliance doesn't work.

**How:** Start from the template at `docs/DESIGN-GUIDE.md` (scaffolded by setup.sh). Fill in:
- Approved colours (with hex values and usage rules)
- Typography scale (fonts, sizes, weights)
- Card treatments (shadows, borders, hover states)
- CTA styles (primary, secondary, action buttons)
- Spacing rules (section gaps, card gaps, internal padding)
- Background strategy (which colours go where)
- Photography/imagery rules
- Anti-patterns (what NOT to do)

**Pro tip:** Run `DEMX: homepage hero` as your first design exploration. The winning variation establishes the visual direction, and `/design` captures it automatically.

**Output:** `docs/DESIGN-GUIDE.md` with all sections filled.

**Mark complete when:** SOFAX can audit a page against the guide and score Brand Compliance without guessing.

---

## Step 6: design-config.json

**What:** The machine-readable version of the Design Guide. Powers the `/design` living page.

**How:** Run `/design` — it scaffolds `docs/design-config.json` from your codebase:
- Scans Tailwind config for colours, fonts, breakpoints
- Scans CSS variables for custom properties
- Scans layout.tsx for font imports
- Asks you for brand-specific content (philosophy, voice, photography rules)

**Output:** `docs/design-config.json` + a live `/design` page.

**Mark complete when:** `/design` page renders at `http://localhost:PORT/design` with all sections populated.

---

## Step 7: Slop Test

**What:** AI-generated content detection rules. Ensures nothing ships that looks or reads like generic AI output.

**How:** Start from the template at `docs/slop-test.md` (scaffolded by setup.sh). Customise:
- The Provenance Rule (every element must trace to a design guide reference)
- 10 Red Flags (generic headings, stock CTAs, filler paragraphs, etc.)
- Project-specific red flags (industry jargon that AI overuses, generic value props)

**Output:** `docs/slop-test.md` ready for PIXLX to check against.

**Mark complete when:** PIXLX can reference every red flag in the slop test.

---

## Step 8: Worker Onboarding

**What:** Rewrite all 31 worker playbooks with project-specific context from your PRD and project.json.

**How:** Run `Gaffer: onboard` (or the Gaffer will offer when Steps 1-7 are complete). The Gaffer:
1. Reads your PRD, project.json, CLAUDE.md, CLAUDE-SUPPLEMENT.md
2. Rewrites every worker's `## [PROJECT] Context` section with project-specific prose
3. Fills all manifest tokens from project.json
4. Verifies: no `[PROJECT]` placeholders remaining in body text

**Output:** 31 worker files with fully project-specific context.

**Mark complete when:** `grep -r '\[PROJECT\]' .ai/thefirm/crew/` returns only manifest Token column matches (not body text).

---

## After Completion

When all 8 items show `DONE`:
1. Delete the `## Progress` table's TODO column (everything is DONE)
2. Move this file to `.ai/thefirm/SETUP-COMPLETE.md` as an archive
3. The project is **fully set up**. Every worker knows the project. Every quality gate has references. Every score has evidence to check against
4. Start building: `/gaffer [your first feature]`
