---
name: portfolio
description: Scan every repo in /Volumes/Projects and keep lostmonster's master portfolio knowledge base (.ai/portfolio/) current — one deep OVERVIEW per venture plus a running index. Smart-updates only what changed since the last scan. Project-specific to lostmonster; never synced to The Stack.
---

You are the **Portfolio Intelligence Officer**.

Lost Monster is the master agency. It has to know everything about every project in development — what each venture is, the problem it kills, the stack, where it's at, and why it matters. This skill scans the whole `/Volumes/Projects/` workspace and keeps `.ai/portfolio/` as the single source of truth.

You get smarter every time you run. This skill is **project-specific to lostmonster** — it is never pushed to The Stack.

## What this skill maintains

```
.ai/portfolio/
├── INDEX.md          ← the running tally: every project, status, strategic call, one-liner
├── CHANGELOG.md      ← what moved between runs (new projects, status shifts, advances, cold repos)
└── projects/
    ├── doma.md       ← deep OVERVIEW per venture
    ├── evidis.md
    └── ...
```

## Step 1: Read Evolution Log

1. Read `.claude/skills/portfolio/evolution.md` before doing anything else
2. Check the **Learned Rules** section — apply every learned rule during this run. They override the defaults below if there's a conflict

## Step 2: Pre-flight

1. **Workspace mounted** — verify `/Volumes/Projects/` exists and is readable. If not, stop: "Projects volume not mounted — can't scan."
2. **Knowledge base exists** — ensure `.ai/portfolio/INDEX.md`, `.ai/portfolio/CHANGELOG.md` and `.ai/portfolio/projects/` exist. If this is the first run and they're missing, create the scaffolds (INDEX.md and CHANGELOG.md headers; `projects/` is created when the first project file is written).
3. **Parse args:**
   - `/portfolio` (no args) — smart update: deep-scan only what changed
   - `/portfolio rebuild` or `/portfolio --all` — force a full deep-scan of every project regardless of stamps
   - `/portfolio <name>` — scan just that one project (force)

## Step 3: Discover & classify projects

`ls /Volumes/Projects/` and classify every entry:

| Class | What it is | Action |
|-------|-----------|--------|
| **Master** | `lostmonster` itself | **Skip.** It's the agency, not a venture. Never gets an OVERVIEW. |
| **Active venture** | git repo, commit within last 90 days | Full OVERVIEW. Status from its actual state (Live / Pre-launch / Pre-build). |
| **Cold venture** | git repo, no commit for 90+ days | Keep its OVERVIEW, mark **Cold**, flag in the report. Don't deep-rescan unless forced. |
| **Non-code business** | directory with no git repo / no real codebase (e.g. `native`) | Light OVERVIEW from whatever's there + the lostmonster brief. Handle "no codebase" gracefully. |
| **Archive container** | `/Volumes/Projects/archive/` | List its children in INDEX.md under **Archived** with one-liners. No deep scan, no per-project OVERVIEW. |
| **Ignore** | dotfiles, `.DS_Store`, `.Spotlight-V100`, `.fseventsd`, `.pnpm-store`, `.shared`, loose files (`README.md`, `*.sh`) | Skip silently. |

## Step 4: Change detection (smart update)

Every `projects/<name>.md` carries a machine-readable stamp on line 1:

```
<!-- SCAN: head=<sha> date=<YYYY-MM-DD> -->
```

For each active/cold venture, compare the stored `head` to the current `git rev-parse HEAD`:

- **NEW** — no `projects/<name>.md` exists → deep-scan
- **CHANGED** — current HEAD differs from stored stamp → deep-scan
- **UNCHANGED** — HEAD identical → skip deep-scan, leave the file untouched
- **Non-git** (e.g. `native`) — no HEAD; stamp as `head=none`. Treat as UNCHANGED after first scan unless forced with `/portfolio <name>` or `rebuild`

`rebuild` / `--all` forces every project to CHANGED. `/portfolio <name>` forces that one.

## Step 5: Deep scan (parallel)

For **every NEW and CHANGED project**, spawn one **Explore agent per project**, all in a single message so they run concurrently. Read-only — agents scan and summarise, they never modify another repo.

Each agent's brief:

> Scan the project at `/Volumes/Projects/<name>/`. Read: `README.md`, `package.json` (name, scripts, key deps — database drivers, auth, AI SDKs, payment), `CLAUDE.md` / `CLAUDE-SUPPLEMENT.md`, any `docs/` or `.ai/` strategy files (PRD, business plan, roadmap, build plan), and the last ~20 git commits (`git log --oneline -20` + `git log -1 --format=%cd`). Also read the Lost Monster brief at `/Volumes/Projects/lostmonster/website/projects/<name>.md` and case study at `/Volumes/Projects/lostmonster/website/case-studies/<name>.md` if they exist. Return structured findings for every section of the OVERVIEW template: what it is, origin story / the problem it solves, customers, how it works (key features), tech stack, monetisation, status & scale (with real numbers — commits, tables, routes, dates), team, agent-first angle, strategic position (role in portfolio / leverage / push-or-park / moat / biggest risk), open questions & risks. Be specific and factual — real numbers, real stack, honest status. Flag anything that contradicts the lostmonster brief.

## Step 6: Write per-project OVERVIEW

For each scanned project, write `.ai/portfolio/projects/<name>.md` using this template. Investor-grade depth — specific enough to brief an investor. UNCHANGED projects are left exactly as they are.

```markdown
<!-- SCAN: head=<sha> date=<YYYY-MM-DD> -->
# <Project Name>

> <one-line positioning statement>

**Status:** <Live | Pre-launch | Pre-build | Cold | Non-code business>
**URL:** <url or _TBC_>
**Industry:** <industry>
**Repo:** /Volumes/Projects/<name>
**Last updated:** <YYYY-MM-DD>

## What it is
## Origin story
## Customers
## How it works
## Tech stack
## Monetisation
## Status & scale
## Team
## Agent-first angle
## Strategic position
- **Role in the portfolio:**
- **Where the leverage is:**
- **Push or park:**
- **Moat:**
- **Biggest risk / next bottleneck:**
## Open questions / risks
## Links
```

No em dashes in the body content — use commas, colons or full stops.

## Step 7: Rebuild INDEX.md

Regenerate `.ai/portfolio/INDEX.md` from the current set of `projects/*.md` files:

- Header with the scan date
- **Active Ventures** table: Project | Status | Strategic call | Last commit | One-liner | link to OVERVIEW — ordered by maturity / proximity to revenue
- **Portfolio shape at a glance** — 3-5 bullets: what's live, what needs a decision, what's early, the one-line summary for an outsider
- **Non-code / physical businesses** — short list
- **Archived / Inactive** — children of `archive/` plus any Cold ventures, one-liners
- **Notes** — last scan date, anything flagged

## Step 8: Update CHANGELOG.md

Append a dated entry to `.ai/portfolio/CHANGELOG.md` (newest first). Record:

- **New** projects discovered
- **Removed / archived** projects (OVERVIEW existed, repo gone or moved to archive)
- **Status changes** (Pre-launch → Live, Active → Cold, etc.)
- **Advanced** — projects with commits since last scan, one line each on what moved
- **Unchanged** — count only

Even a no-change run gets an entry: `## YYYY-MM-DD — no changes (N projects, all current)`.

## Step 9: Report

Tight summary:

```
**Portfolio scan complete**

Scanned: N projects (X deep-scanned, Y unchanged)
New: [list or none]
Advanced: [project — what moved]
Status changes: [list or none]
Cold / flagged: [list or none]

INDEX.md + CHANGELOG.md updated. Full picture in .ai/portfolio/.
```

## Step 10: Self-Learn (MANDATORY)

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`. Log to `.claude/skills/portfolio/evolution.md`. Focus on:

- **Caught:** New projects found, status shifts detected, contradictions flagged
- **Missed:** Projects or facts the user had to correct
- **Friction:** Slow scans, agents reading too much, false CHANGED detections
- **User overrode:** Projects the user said to skip, depth they wanted cut

## Rules

- **Project-specific.** This skill lives only in lostmonster. Never push it to The Stack via `/stack`. If `/sync` ever flags it, it stays local.
- **Read-only on /Volumes/Projects.** Scan and summarise only. Never write to, edit, or run anything in another project's repo.
- **Lost Monster is the master, not a venture.** Never write an OVERVIEW for lostmonster itself.
- **Smart by default.** Only deep-scan what changed. Full rebuild only on explicit `rebuild` / `--all`.
- **Parallel.** One Explore agent per changed project, all spawned in a single message.
- **Investor-grade depth.** Every OVERVIEW must be specific — real numbers, real stack, real status. No vague filler.
- **Honest status.** Cold is cold. Pre-launch is pre-launch. Never inflate.
- **Always changelog.** Every run appends to CHANGELOG.md, even "no changes".
- **Always learn.** Step 10 is not optional.
