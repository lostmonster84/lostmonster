# Lost Monster — Blueprint

> Master architecture document for the Lost Monster monorepo. Living document, kept current by `/dayclose`.
> Created 2026-05-14.

## What this is

Lost Monster is James's personal brand / agency, and this repo is two things in one:

1. **The marketing website** (`website/`) — the public Lost Monster site, a Next.js marketing site that positions the agency ("We Build What We Sell") with case studies, service pages, a living design guide and the Labs showcase.
2. **The universal framework** (`framework/`) — reusable templates, agents and docs for spinning up new projects.

It also carries two pieces of operational infrastructure that are not "the product" but run the operation:

3. **The Firm** (`.ai/thefirm/`) — the AI worker-crew framework (34 workers + the Gaffer) that runs delivery on every venture.
4. **Portfolio intelligence** (`.ai/portfolio/`) — Lost Monster's master view of every venture in development across `/Volumes/Projects/`.

## Repository structure

```
lostmonster/
├── website/              Next.js marketing site
│   ├── app/              App Router pages (incl. app/labs/, app/design/)
│   ├── components/       React components
│   ├── lib/              Helpers (incl. lib/labs.ts — Labs config)
│   ├── projects/         Per-venture briefs (source content)
│   ├── case-studies/     Case study content
│   ├── .ai/              Website design system + brand docs
│   └── CLAUDE.md         Website-specific AI instructions
├── framework/            Universal development framework (templates, agents, docs)
├── .ai/
│   ├── thefirm/          The Firm v4.4.2 — 34 workers, protocol, gaffer state
│   └── portfolio/        Portfolio knowledge base (INDEX + CHANGELOG + projects/)
├── .claude/skills/       Slash-command skills (synced from The Stack + project-specific)
├── scripts/              Repo tooling (forensic-log.ts, lint-subsystems.ts)
├── docs/                 This blueprint + project docs
├── subsystems.json       Subsystem-to-glob map (powers forensic logging)
├── project.json          Machine-readable project manifest (drives Firm token fills)
└── CLAUDE.md             Repo-level AI instructions
```

## Tech stack

- **Website:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons.
- **Hosting:** Vercel (the website). The framework, Firm and portfolio layers are repo-only — they do not deploy anywhere.
- **No root package.json:** the repo is a loose monorepo; `website/` carries its own `package.json` and `node_modules/`. There is no workspace tooling at the root, and no `tsx` at the root (forensic generator must be run from a context that has it, or the block hand-written).

## Systems

### Website (`website/`)
The public marketing site. App Router under `website/app/`. Content is file-driven: `website/projects/*.md` are per-venture briefs and `website/case-studies/*.md` are case studies, rendered through dynamic `[slug]` routes. The homepage uses the dark "Bold Personal Brand" system (gradients, glassmorphism, dynamic 5-colour theming); some content pages still use plain light backgrounds (tracked as a quality debt).

### Labs (`website/app/labs/`)
A showcase section for small beta products under the Lost Monster brand, served at `/labs`. `website/app/labs/page.tsx` auto-renders a grid of every product in the `labProducts` array in `website/lib/labs.ts` (the single source of truth). Each product gets a folder `website/app/labs/[slug]/page.tsx`. Adding a product: create the folder, add a `labProducts` entry, add the Lucide icon to `iconMap` in the index page. Current products: BulletProof (`/labs/bulletproof`, coming-soon).

### Design system (`website/.ai/`, `website/app/design/`)
Brand docs live in `website/.ai/` (including `LOST-MONSTER-DESIGN-SYSTEM.md`). The living `/design` page is generated from `docs/design-config.json` via the `/design` skill.

### Universal framework (`framework/`)
Reusable project-spin-up templates, agents and docs. Not wired into the website — it is a toolkit consumed when starting new projects.

### The Firm (`.ai/thefirm/`)
The AI worker-crew framework, currently v4.4.2 with 34 workers. `PROTOCOL.md` is the execution contract; `crew/` holds worker playbooks (GAFFER, FOREMAN, planners, builders, reviewers, checkers); `gaffer/` holds per-project state (session-log, debts, calibration, evolution, session-context). Synced down from `lostmonster84/thefirm` via `/sync` (which runs `update.sh`); genuine improvements pushed back via `/firm`. Project-specific context is filled into workers by an onboarding mechanism (manifest token tables + `## Project Context` sections) driven by `project.json` — this onboarding state must never be pushed upstream.

### Portfolio intelligence (`.ai/portfolio/`, `.claude/skills/portfolio/`)
The `/portfolio` skill (project-specific, never synced to The Stack) scans every repo in `/Volumes/Projects/`, classifies each, and maintains:
- `.ai/portfolio/INDEX.md` — the running tally of all ventures with status and strategic call.
- `.ai/portfolio/CHANGELOG.md` — what moved between scans.
- `.ai/portfolio/projects/*.md` — a deep, investor-grade OVERVIEW per venture, each stamped with a `<!-- SCAN: head=<sha> date=... -->` line so re-runs only deep-scan repos whose git HEAD moved.
The skill is read-only on `/Volumes/Projects/` — it scans sibling repos, never edits them.

### Skills (`.claude/skills/`)
Slash-command skills. Most are synced from The Stack (`/go`, `/wrap`, `/dayclose`, `/sync`, `/gaffer`, `/firm`, `/stack`, `/design`, `/canary`, `/railway`, `/linear`, `/buildplan`, `/debtloop`, `/devstart`, `/healthcheck`). `/portfolio` is project-specific to this repo. Each skill carries an `evolution.md` (per-project learning state, never synced).

### Forensic logging (`scripts/`, `subsystems.json`)
`subsystems.json` maps file-path globs to logical subsystems. `scripts/forensic-log.ts` reads it plus `git diff` to generate the forensic block embedded in every commit and session-log entry. `scripts/lint-subsystems.ts` validates the manifest. Note: there is no `tsx` at the repo root, so the generator currently has to be hand-run elsewhere or the block written by hand.

## Operational flow

- `/go` — session launchpad (orient, surface urgent items, auto-sync if Firm/Stack drifted).
- `/sync` — pull latest Firm + Stack into the repo, onboard workers.
- `/portfolio` — scan `/Volumes/Projects/`, refresh the portfolio knowledge base.
- `/wrap` — light conversation close (commit locally, update logs, no push).
- `/dayclose` — full shutdown (commit + push, changelog, session log, debts, blueprint, session-context, forensic block, cache purge, release the volume).

## File index

| Path | Purpose |
|------|---------|
| `CLAUDE.md` | Repo-level AI instructions + Firm version stamp |
| `project.json` | Machine-readable manifest driving Firm token fills |
| `subsystems.json` | Subsystem-to-glob map for forensic logging |
| `website/CLAUDE.md` | Website-specific AI instructions |
| `website/lib/labs.ts` | Labs product registry (single source of truth) |
| `.ai/thefirm/PROTOCOL.md` | The Firm execution contract |
| `.ai/thefirm/gaffer/` | Per-project Firm state (logs, debts, calibration, context) |
| `.ai/portfolio/INDEX.md` | Portfolio running tally |
| `.claude/skills/portfolio/SKILL.md` | The /portfolio skill definition |
| `docs/BLUEPRINT.md` | This document |
