# Changelog

## 2026-05-16 — Firm v4.6.2: Confidence Tiers + Self-Compliance Gate + Pre-Commit Risk Scan + Telemetry Block

### Major
- **Execution Contract Rule 18 (Confidence Tiers)** — every worker score now reports with HIGH / MEDIUM / LOW. Any LOW → Foreman verdict downgrades to PROVISIONAL by default. Missing tier → BLOCKED. Per-worker criteria table for the 7 most-used reviewers; other workers extrapolate.
- **Execution Contract Rule 19 (Self-Compliance Gate)** — material framework changes must dogfood + upstream-cohere + Q&A + verify install before they can ship. Refined mid-session with a material-vs-trivial carve-out so typo fixes (≤10 lines, non-semantic) skip the gate.
- **Pre-commit risk scan** — `.githooks/firm-risk-scan.sh` greps `session-log.md` + `debts.md` for staged file paths and soft-warns on prior incidents. Wired via new `.githooks/pre-commit`. Exit 0 always (warn-only in v4.6.2). Tested with 30 edge cases; 30/30 PASS.
- **Telemetry block in session-log** — every shipped session entry now carries a structured Telemetry block: workers invoked, retries, skills used, improvement-gate pass record, time-to-Frank, Frank verdict path, confidence tier mix, notable observations. TRAINX gets new Trigger E to spot patterns across sessions.

### Framework
- Foreman bumped 16 → 18 points (added Check 16 Confidence Tier Presence + Check 17 Self-Compliance Gate).
- TRAINX Step 4 (LOG the Learning) now records confidence tier alongside the score.
- GAFFER.md Trigger 4 (POST-SHIP) updated to require Telemetry block and surface risk-scan output.
- Stale Frank point-count references corrected locally (PROTOCOL.md ×2 "currently 14" → "currently 18", SKILL.md ×1 "currently 17" → "currently 18").

### Infrastructure
- New `.githooks/firm-risk-scan.sh` (~110 lines, soft-warn risk scanner — works on fresh projects, monorepo subdirs, weird filenames, deleted files, 100+ staged files).
- New `.githooks/pre-commit` (~20 lines, calls risk-scan, coexists cleanly with existing `commit-msg`).
- `install-hooks.sh` automatically chmods + registers the new hooks (idempotent).

### Verified
- 30/30 edge tests (script robustness + hook integration + doc coherence + real-world).
- 5 governance checks (dogfood, upstream coherence, install/distribution edge, governance Q&A, sample Review Card render).
- Cross-file coherence: Rule 18 referenced in PROTOCOL/GAFFER/FOREMAN/TRAINX; Rule 19 in PROTOCOL/FOREMAN; Telemetry block in all 5 doc files; LOW→PROVISIONAL rule consistent across PROTOCOL/GAFFER/FOREMAN.
- Risk scan run on this session's actual diff — surfaced 1 legitimate signal (PROTOCOL.md prior incident, April 2026), 0 false positives.
- Self-Compliance Gate (Check 17) ran on this session's build: all 4 sub-checks PASS. v4.6.2 itself classified MATERIAL (>10 lines + new rules + new gates + new install machinery).

### Deferred to v4.6.3
- Rebase-aware skip for risk scan (don't fire on every commit during a rebase).
- Risk scan excludes `## Resolved` section in `debts.md` (reduce false positives).
- `FIRM_PATH` env var for monorepo non-standard paths.
- `/sync` auto-triggers `install-hooks.sh` when `.githooks/` files change.
- Opt-in prompt before overriding `.husky` hooksPath.
- Per-reviewer-playbook confidence sections (currently extrapolated from PROTOCOL.md table).
- Formal `confidence-tier-drift` calibration ledger schema.

## 2026-05-15 — Firm v4.6.1: DOMA Contamination Cleanup + Worker Re-Onboarding

### Major
- Pushed `chore(v4.6.1)` upstream to `lostmonster84/thefirm` (commit `9d03bd8`) — stripped DOMA project contamination from the framework. 23 files cleaned, +776/-652 lines.
- 12 worker playbooks generalised: added ONBOARD:START/END manifests where missing, tokenised DOMA identifiers, rewrote DOMA-specific design rules into project-agnostic methodology pointing at `[DESIGN-GUIDE-PATH]`. Affected: MAPX, BLAZX, INSPX, STANX, TERRX, TESTX, AUDIX, AIDAX, ALLYX, PIXLX, SEOX, SOFAX.
- SEOX Dim 6 Hreflang scoring now scales with project locale count (was hard-coded to DOMA's 7 locales).
- TESTX reverse-onboarded — its manifest had `[PROJECT]=DOMA` filled; the whole worker was a leaked DOMA-onboarded copy pushed upstream without reverse-replace. Cleared.
- 9 specs / feature-requests swept of DOMA scaffold refs (calibration-anchors-template had 16).

### Infrastructure
- Firm synced v4.4.2 → v4.6.0 → v4.6.1: pulled SOFAX v4.5.0 Excellence Layer + GAFFER v4.6.0 Project-Contamination Scan, then shipped our own v4.6.1 cleanup upstream.
- Stack synced: firm/gaffer/stack SKILL.md updates.
- Forensic infrastructure completed: scaffolded `scripts/install-hooks.sh`, `.githooks/commit-msg`, `.githooks/post-merge`, `.github/pull_request_template.md`. `core.hooksPath` wired to `.githooks/`.
- New SOFAX-decks supplement added (deck-review job type).
- Local re-onboarded: 47 manifest tokens filled across 12 workers via `/tmp/reonboard.py`.

### Fixes
- AUDIX manifest bug — `[PROJECT-DOMAIN]` row added so the existing body reference resolves.
- `project.json` firmVersion bumped 4.4.2 → 4.6.0.
- `docs/BLUEPRINT.md` updated to v4.6.1.

### Detected (the win that made this session work)
- `/sync` line-count delta scan caught 14 workers with major methodology drift hidden by `update.sh`'s worker-preservation policy. Without that scan, local would still be on v3-era worker playbooks. Keep that scan in `/sync` going forward.

## 2026-05-14 — Framework Sync + Portfolio Intelligence

### Major
- `/portfolio` skill — new project-specific skill that scans `/Volumes/Projects/`, classifies every repo, and maintains `.ai/portfolio/` as Lost Monster's master view of every venture in development
- Portfolio knowledge base populated: 11 deep per-venture OVERVIEWs (doma, evidis, hospojobs, twin, ancarraig, wildtrax, govozi, stayflo, canary, barkko, native) + INDEX tally + CHANGELOG

### Infrastructure
- The Firm synced v3.16 → v4.4.2 (34 workers): 3 new workers (ROADX onboarded, SEOX + STRATX framework-pure); PROTOCOL, GAFFER, FOREMAN, TRAINX, SUPPLEMENTS, lessons, FIRM-CONTEXT refreshed
- The Stack synced: 4 new skills (buildplan, debtloop, devstart, healthcheck), 10 skill files updated
- Forensic logging adopted: `scripts/forensic-log.ts`, `scripts/lint-subsystems.ts`, `subsystems.json` (tailored to the monorepo)
- `docs/BLUEPRINT.md` created — master architecture document
- `.gitignore`: ignore `.vscode/` and nested `node_modules/`

### Fixes
- `project.json` firmVersion bumped to 4.4.2

### Pick Up
> See [TODO.md](TODO.md) for active items from this session

## 2026-04-04 — First Supplements + Cross-Project Analysis

### Major
- 10 supplement files: homepage + landing-pages for DEMX, AIDAX, SOFAX, WORDX, CODAX
- SCOUTX Mode 5 research: 16 external sites per job type (Vercel, Stripe, Notion, etc.)
- Cross-project analysis of 6 owner projects (DOMA, HospoJobs, Ancarraig, WildTrax, Slydes, Evidis)
- Dual-mode framework: hospitality/experience (warm, photographic) vs SaaS/product (dark, mockup-driven)
- 12 owner-validated build constants across both modes
- Owner's Validated Patterns section added to all 10 supplements

### Infrastructure
- `firm-health.sh` added to thefirm repo: 14-check framework integrity validator
- Stack v3.4: /firm (project.json reverse source) + /go (auto-sync + setup check) pushed upstream
- Pushed supplements upstream to thefirm repo
- Full sync verified (Firm + Stack + project)

### Fixes
- Fixed supplement sync path in thefirm repo (supplements were in `crew/` instead of `.ai/thefirm/crew/` -- update.sh couldn't find them)
- Removed orphan `crew/` directory from thefirm repo root

## 2026-04-03b — DEMX v3.4 First Run + Copy Rules

### Features
- DemxScaffold component: reusable dark-theme variation browser with AIDAX score bars, tab navigation, quick comparison grid
- Homepage hero DEMX exploration: 5 rounds of variations testing messaging angles, copy honesty, and dev studio voice
- Demo page at /demo/homepage-hero-variations with live rendering and scores.json sidecar

### Improvements
- Universal Copy Rules added to PROTOCOL.md: no em dashes, no semicolons in UI copy
- WORDX playbook: Punctuation Rules section (em dashes, semicolons, exclamation marks, ellipsis)
- Slop test Red Flag #11: Em dashes (docs/slop-test.md + website/.ai/slop-test.md)
- Removed "2-4 weeks" timeline claims from homepage, design page, and all DEMX variations
- Replaced with verifiable metrics (80/100 quality floor, 4.9/5 client rating)
- Cleaned em dashes from production homepage copy (5 instances)

## 2026-04-03 — Supplement System (The Firm v3.17)

### Major
- Built complete supplement system — universal domain knowledge layer for workers
- 45+ job type taxonomy (pages, components, flows, content types)
- Supplement template with 12 sections (patterns, benchmarks, mobile/a11y/perf, planning)
- SCOUTX Mode 5: research-to-supplement pipeline with refresh protocol
- TRAINX Trigger D: feedback loop with correction classification (craft/project/preference)
- Smart Routing expanded to 9 steps (job type classification + supplement loading)
- Build Gate Check #7: two-way supplement verification
- Supplement lifecycle: provisional → validated → stale → retired
- Learning loop: corrections → Evolution table → SCOUTX refresh → better supplements

### Improvements
- /go skill: auto-syncs when framework drift detected (was just a warning)
- /go skill: surfaces SETUP-TODO.md during orientation
- Resolved debt: /go SETUP-TODO surfacing
- Pushed v3.17 upstream to thefirm repo

## 2026-04-01 — Cleanup + Setup Scaffolding

### Housekeeping
- Deleted 3 stale branches (prepod, preprod, updateddesign) — all merged
- Committed Gaffer Step 0 (setup check in session-start protocol)
- Ran /sync — Firm + Stack confirmed up to date

### Setup Framework
- Scaffolded SETUP-TODO.md (8-step guided checklist for project onboarding)
- Scaffolded docs/PRD.md, docs/DESIGN-GUIDE.md, docs/slop-test.md templates
- Updated SETUP-TODO statuses: 4/8 done (project.json, CLAUDE.md, CLAUDE-SUPPLEMENT.md, worker onboarding), 4 templates need filling (PRD, Design Guide, design-config.json, Slop Test)

## 2026-03-25 — Studio Pivot + Content Sweep

### Major
- Pivoted Lost Monster from personal brand to dev studio ("We Build What We Sell")
- Built 10-section studio homepage: hero, metrics, capabilities, featured work, studio story, industries, tech stack, process, partnership, CTA
- Swept 17 projects from /Volumes/Projects/ — created structured profiles in website/projects/

### Content
- Wrote 5 case studies: Ancarraig, DOMA, HospoJobs, TWIN, Evidis
- Wrote 4 service pages: Booking Systems, E-commerce, Custom Applications, Design Systems
- Wrote Process page (6-phase methodology)
- Wrote FAQ page (20 Q&As across 5 categories)
- Rewrote About page from "I" to studio "we" voice

### Features
- Created /design living design guide (v2, 14 sections, 661 lines)
- Added dynamic [slug] route for case studies (was hardcoded /ancarraig only)
- Fixed FAQ parser (regex-based h3 matching, was broken string split)
- Fixed case studies listing voice ("our" → "my" → "we" with studio pivot)

### Design Guide
- Created docs/design-config.json (v2.0) — colours, typography, gradients, glassmorphism, icons, backgrounds, voice, anti-patterns
- 14 sections with live rendered examples: gradient strips, glassmorphism showcase, button sizes, card variants, metric cards, hover effects
