# The Firm — Evolution Log

> Single source of truth for how The Firm evolves.
> Not what was built (session-log.md), but how the system gets better.
> `calibration.md` = git commits. `evolution.md` = release notes.
>
> **Master location:** `~/Projects/thefirm/.ai/thefirm/gaffer/evolution.md`
> **Project instances** (e.g. `~/Projects/doma/.ai/thefirm/gaffer/evolution.md`) sync FROM here.

---

## Instructions

### What This File Is
The single source of truth for how The Firm evolves. Every improvement, every bug caught, every gate added, every lesson learned — gets a version number and an entry here. This is not a build log. This is the system getting better.

### Golden Rules

1. **NEVER overwrite or edit existing entries.** This file is append-only. Every change gets a NEW entry with a NEW version number. History is sacred.
2. **Every entry gets a version number.** No exceptions. Bug fix? New version. New gate? New version. Uptrain? New version. Even small things.
3. **Sync to thefirm master.** After adding an entry in any project, copy to `~/Projects/thefirm/.ai/thefirm/gaffer/evolution.md`, commit, and push to GitHub. This is the single source of truth. Private repo backup at `github.com/lostmonster84/thefirm`.
4. **Auto-trigger — don't wait to be asked.** When the Gaffer detects a trigger event (see below), log it immediately. James should never have to say "update the evolution log".

### Sync Protocol

```
1. Entry added in project instance (.ai/thefirm/gaffer/evolution.md)
2. Copied to ~/Projects/thefirm/.ai/thefirm/gaffer/evolution.md
3. Committed in thefirm repo
4. Pushed to GitHub (private backup)
5. New projects pull latest from thefirm
```

**Direction:** Project discovers improvement → evolution log → thefirm master → push to GitHub → all projects benefit.

### When to Update (Auto-Triggers)
The Gaffer MUST add an entry — without being asked — when any of these happen:

| Trigger | Bump | Example |
|---------|------|---------|
| Bug in Firm process caught | Patch | "Gaffer missed schema error — added smoke test gate" |
| New worker added | Minor | "Added BLAZX to checker phase" |
| New gate or review step added | Minor | "Added Schema Validation gate to Gaffer review" |
| New feedback loop wired | Minor | "CONSX conflicts now propose Design Guide updates" |
| Worker uptrained (playbook updated) | Patch | "SOFAX Dimension 11 recalibrated after slop catch" |
| Threshold or scoring change | Patch | "BULLETPROOF sign-off threshold raised to 85" |
| Protocol tweak (routing, sequencing) | Patch | "STANX now mandatory for touches-auth signal" |
| Instructions or rules updated | Patch | "Evolution log instructions formalised" |
| Architectural overhaul | Major | "Full hierarchy rewrite, new execution model" |

**The rule is simple:** if how we work changed, log it. If only what we built changed, don't.

### How to Write Entries

Every entry follows this format:

```markdown
## vX.Y — Short Title (YYYY-MM-DD)    # major/minor
## vX.Y.Z — Short Title (YYYY-MM-DD)  # patch

**Category:** [Major/Minor/Patch] — one-line summary

### What Changed
- Bullet points of what's new, removed, or modified

### Why
What triggered this change. Bug? Gap? Uptrain? New capability?

### Files Changed (if applicable)
- List of .ai/ files, playbooks, or protocol docs modified
```

**Tone:** Direct, factual, no waffle. Say what changed and why. If there was a failure, own it — "Gaffer missed X" not "an oversight occurred".

**Detail level:** Enough that a future session can understand the change without reading the full diff. Not a commit message (too short), not a PRD (too long).

**Project-agnostic (CRITICAL):** This file is the master for ALL projects using The Firm. Entries must NEVER reference project-specific details — no component names, no file paths, no page names, no CSS classes. Describe the general process improvement and use generic examples (e.g. "a toggle control" not "the Rent/Buy toggle on the homepage hero"). A reader from any project should understand every entry without knowing anything about other projects.

### What NOT to Log
- Features built for any specific project (that's session-log.md)
- Bug fixes in application code (that's git history)
- Routine Gaffer session starts/reviews (that's session-log.md)
- Anything that doesn't change how The Firm operates

## Version Bumping Rules

| Change Type | Bump | Examples |
|-------------|------|---------|
| **Major** (X.0) | Architectural overhaul | Full framework rewrite, new hierarchy model |
| **Minor** (x.Y) | New worker, new gate, new feedback loop | Added INSPX, added Brand Compliance Chain |
| **Patch** (x.y.Z) | Uptrain, threshold change, protocol tweak | SOFAX dimension recalibrated, routing threshold adjusted |

---

## v3.16 — Evidence Gate + Worker Hardening + Setup Flow (2026-04-01)

**Category:** Major — systemic quality enforcement + first-time setup

**What changed:**
- **Evidence Gate** in PROTOCOL.md — screenshots required before any score. NULL scores block pipeline
- **CRITICAL enforcement** — CRITICAL findings halt pipeline. Gaffer cannot override. Fix → re-run → clear
- **Anti-pattern sections** for 7 workers (APEX, CRUDX, DOCKX, AIDAX, SOFAX, NIGELX, DEMX)
- **Score anchors** for AIDAX (4 dims), SOFAX (3 dims), NIGELX (3 dims) — concrete "what does 8/10 look like"
- **Foreman score sanity thresholds** — uniformity trigger, inflation trigger, NULL check
- **DEMX execution protocol** rewritten — 9-step render-before-score + design guide feedback loop (Step 0 loads preferences, Step 8 updates design guide)

**Why:** Workers could score without evidence. CRITICAL was advisory not blocking. Everything drifted to 7-8 without anchors. DEMX wrote fiction scores before rendering.

---

## v3.15 — Universal Industry Support + project.json (2026-04-01)

**Category:** Major — framework now works across any industry

**What changed:**
- **project.json manifest** — machine-readable project identity. One file per project, never pushed upstream
- **update.sh/setup.sh** — `fill_tokens_from_json()` auto-fills ALL tokens from project.json after every overwrite
- **N/A token convention** — unused tokens silently skipped, not reported as gaps
- **Mandatory builder-reviewer pairings** — DEMX→AIDAX, CRUDX→NIGELX, APEX→ALLYX (structural, not score-based)
- **ONBOARDING.md** expanded — project.json section, 11 new tokens, industry N/A table
- **GAFFER.md Smart Routing** step 10 (mandatory pairings)
- **SETUP-TODO** checklist + PRD/Design Guide/Slop Test templates scaffolded by setup.sh and update.sh
- **Gaffer Step 0** — detects SETUP-TODO, auto-fills from codebase on pre-existing projects
- **Session context bridge** — /wrap writes session-context.md, /go reads it. Full session continuity
- **11 skill evolution.md files** bootstrapped (self-learning enabled across entire Stack)

**Why:** Token filling broke on every update.sh run. No project manifest. Workers had no mandatory pairings. Setup was 70% incomplete — templates missing, no guided checklist.

---

## v3.13 — Worker Onboarding System + Full Repo Generalisation (2026-03-22)

**Category:** Major — automated multi-project worker customisation

**What changed:**
- NEW: `ONBOARDING.md` — full spec for token manifests, context sections, gap detection, self-learning loop
- All 28 project-aware workers now have `<!-- ONBOARD:START -->` manifests with empty Value columns
- All DOMA-specific content (15 workers) stripped and replaced with `[BRACKET]` tokens
- All WildTrax-specific content (2 workers: DEMX, AIDAX) stripped and replaced with tokens
- 2 framework-pure workers (UXPATX, INSPX) correctly have no manifests
- `/sync` and `/firm` skills updated to use manifest system (in Stack, not Firm)

**The system:**
- `/sync` pull: reads manifest + CLAUDE.md → fills tokens + writes Context section → worker is project-ready
- `/firm` push: reads manifest → reverses tokens + replaces Context with generic template → worker is repo-ready
- Missing values flag project gaps ("add brand colours to CLAUDE.md")
- Self-learning loop: every failed replacement improves the manifest

**Worker count:** 30 (unchanged). Manifest count: 28.

---

## v3.12 — Three New Workers: TESTX, MIGRX, WORDX (2026-03-22)

**Category:** Minor — three new workers filling department gaps

**Trigger:** Gaffer audit identified missing capabilities in the pipeline. Plan → Build → Review → Check was strong, but lacked:
1. **Test authoring** — TERRX runs tests but nobody writes them
2. **Migration safety** — CRUDX builds schemas but nobody audits migrations for data safety
3. **Copy writing** — SOFAX checks brand compliance but nobody creates marketing copy

**New Workers:**
- **TESTX** (Tessa Proof) — Chief Test Engineer. Writes Playwright tests for shipped features. Sits in Checkers. Pairs with TERRX (TESTX writes, TERRX runs). Assigned whenever new pages, API endpoints, data flow changes, or bug fixes ship
- **MIGRX** (Miles Ledger) — Chief Data Engineer. Audits every migration for safety, rollback plans, data preservation. Sits in Checkers. Grades migrations A-F. Assigned whenever tables are created, altered, or dropped
- **WORDX** (Wren Calloway) — Chief Copywriter. Writes headlines, CTAs, meta descriptions, microcopy in brand voice. Sits in Builders. Produces 3 variations for user to pick. Assigned whenever customer-facing text is needed

**Worker count:** 27 → 30

**How to apply:** Gaffer Smart Routing now has 3 additional signals:
- `needs-tests` → assign TESTX
- `touches-db-schema` → assign MIGRX
- `needs-copy` → assign WORDX

---

## v3.11.1 — Sweep Before You Ask (2026-03-22)

**Category:** Feedback — Gaffer behaviour rule

**Trigger:** User corrected the Gaffer for asking them to provide an API key when it was already in `.env.local`. The Gaffer should have checked local config files first.

**Rule:** Before asking the user for any value (env var, API key, config setting, credential), sweep the project first:
- Check `.env.local`, `.env`, `.env.production`
- Check hosting platform variables
- Check relevant config files
- Only ask the user if the value genuinely can't be found anywhere in the project

**Why:** Users have already provided these values. Asking again wastes time and breaks the partnership feel. The Gaffer should be resourceful, not helpless.

**How to apply:** Any time a worker needs a value to proceed — sweep first, ask second. This applies to all workers, not just infra tasks.

---

## v3.11 — TRAINX Triple Trigger + /wrap Integration (2026-03-17)

**Category:** Minor — new activation triggers for TRAINX, integrated into /wrap pipeline

### What Changed
- **TRAINX playbook:** Expanded from 1 trigger to 3:
  - **Trigger A (existing):** Improvement Loop gate failure — mid-build, immediate
  - **Trigger B (new):** James critical correction — immediate fire for fundamental process failures
  - **Trigger C (new):** /wrap batch scan — scans feedback memories with `needs-trainx: true`, patches playbooks, syncs to thefirm
- **Wrap skill:** Added Step 6B — TRAINX Feedback Scan. Runs between debts check and commit. Scans for unpatched feedback, runs TRAINX root cause + patch, syncs to thefirm, clears flags.
- **Feedback memory format:** New optional `needs-trainx: true/false` frontmatter field. When `true`, /wrap picks it up for TRAINX processing. Set to `false` after patch is applied.

### Why
TRAINX was designed to fire only inside the Improvement Loop (Trigger A), but the Improvement Loop itself rarely ran properly. In practice, James caught mistakes and the Gaffer did manual TRAINX-style patches after the fact. The system had no formal path from "James corrects something" → "playbook gets patched" → "thefirm syncs." Feedback memories captured the learning but didn't trigger playbook updates. The /wrap integration closes this loop: feedback → flag → /wrap scans → TRAINX patches → evolution log → thefirm push → /sync pulls to other projects.

### Files Changed
- `.ai/thefirm/crew/TRAINX-travis-forge.md` — triple trigger system
- `.claude/skills/wrap/SKILL.md` — Step 6B TRAINX Feedback Scan
- `.ai/thefirm/gaffer/evolution.md` — this entry

---

## v3.10 — Score After Render: DEMX + AIDAX + Gaffer Patch (2026-03-17)

**Category:** Minor — new gate added to three workers, prevents scoring unrendered designs

### What Changed
- **DEMX v3.3:** Added "HARD GATE — Score AFTER render, never before." Demo page must be built with placeholder/no scores. Playwright screenshots taken. Visual inspection done. Only then are AIDA scores assigned based on what was actually rendered. Delivery Protocol sequence updated: build → screenshot → inspect → score → update page → present.
- **AIDAX v2.4:** Added "Render Gate" as pre-scoring qualifier. AIDAX must REFUSE to score concepts, descriptions, or ASCII mockups. It only scores from screenshots or live browser. If asked to score an idea, it says "Build it first."
- **GAFFER:** Added Smart Routing step 9 — "DEMX Score Verification." When DEMX is in the crew, the Gaffer must verify scores were assigned post-render. Pre-render scores block presentation.

### Why
Nav panel subtitle variations were DEMX'd with 3 options. All three were scored on paper (concept descriptions) before being built. V3 "Subtitle + Hover Preview" scored highest at 35/40 based on the idea of a hover preview image column. When actually rendered, the 130px image column in a 460px panel produced a useless vertical strip that no photograph works in. The score was fiction — it described an imagined outcome, not reality. James caught it: "you're idiotic to even think this scored higher."

Root cause: PROCESS GAP across three workers. DEMX's Delivery Protocol said "RENDER via Playwright" but didn't mandate that scoring happens AFTER rendering. AIDAX had no rule requiring visual input. The Gaffer had no checkpoint to verify scores were based on rendered output.

### Files Changed
- `.ai/thefirm/crew/builders/DEMX-dex-carousel.md` — v3.3, score-after-render hard gate + delivery protocol rewrite
- `.ai/thefirm/crew/reviewers/AIDAX-aida-sterling.md` — v2.4, render gate added
- `.ai/thefirm/crew/GAFFER.md` — Smart Routing step 9 added
- `.ai/thefirm/gaffer/evolution.md` — this entry

### Pattern Detection
This is the 3rd DEMX process failure (v3.9.1: skipped DEMX gate, v3.2: text-only DEMX, now: pre-render scoring). TRAINX flags: DEMX has a systemic gap around when its own quality checks run relative to its output. All three patches have been about enforcing the correct SEQUENCE, not the correct content. The methodology is sound — the timing enforcement was missing.

---

## v3.9.1 — DEMX Gate: Mandatory Presentation Before Build (2026-03-14)

**Category:** Patch — DEMX must present variations to James before build phase begins

### What Changed
- **New rule: DEMX is a gate, not a label.** When the crew sheet assigns DEMX, the Gaffer must enforce a DEMX presentation checkpoint between plan approval and build start. The flow is: Plan → DEMX presents variations → James picks → THEN build.
- **Root cause:** Conflating system architecture (what section types exist) with experience design (which sections, what order, what layout). Architecture is infrastructure — PLANX territory. The specific design choices are DEMX territory and require James's input via scored variations.
- **Failure mode:** Gaffer assigned DEMX to crew sheet, ran research, designed the system, then jumped to building a single implementation without presenting alternatives. James had to flag the skip.

### Why
During a world page redesign, the crew sheet listed DEMX for "design exploration, layout variations." Research was thorough. Planning was sound. But the transition from plan to build skipped DEMX's core protocol: build ALL variations, score them, present them together, let James choose. The system was built correctly, but the design was chosen unilaterally. This is the second time DEMX has been assigned but not executed (see session-log entry for session 4, 2026-03-14).

### Files Changed
- `.ai/thefirm/gaffer/evolution.md` — this entry

---

## v3.9 — 50-Case Edge Case Hardening (2026-03-10)

**Category:** Minor — comprehensive hardening from PLANX edge case audit

### What Changed
- **git pull resilient** — failure no longer aborts update.sh; continues with local state
- **evolution.md overwrite protection** — detects if project is ahead of master, skips sync with warning
- **YAML frontmatter + code fence safety** — Scenario 2 injection skips `---` inside frontmatter and fenced code blocks
- **Non-interactive mode** — setup.sh accepts `--yes` flag; Stack pipeline no longer hangs
- **Dynamic worker counts** — removed all hardcoded "26 workers" from FIRM-CONTEXT.md, PROTOCOL.md, SKILL.md, setup.sh
- **Version deduplication** — removed version from FIRM-CONTEXT.md header; CLAUDE.md stamp is sole source of truth
- **Health checks step** — new Step 7 validates .gitignore, orphan workers, unfilled placeholders
- **Filename safety** — find loops use `while read` instead of `for in $(find)`
- **--force warning** — explicitly warns that TRAINX playbook patches are lost
- **Migration detection** — uses content signatures not just headings to reduce false positives
- **Orphan worker detection** — warns about project files not in master (renamed/deleted upstream)

### Why
PLANX-level edge case audit across 10 categories (50 cases). Found 14 FAILs and 5 design gaps. All fixed and tested across Evidis and Wildtrax.

### Files Changed
- `update.sh` — 8 steps (was 7), resilient git pull, evolution protection, awk improvements, health checks, while-read loops
- `setup.sh` — `--yes` flag, dynamic header count, placeholder validation
- `FIRM-CONTEXT.md` — removed hardcoded counts and version from header
- `PROTOCOL.md` — removed hardcoded "26 workers" counts
- `SKILL.md` — removed hardcoded "26 workers"
- `thestack/setup.sh` — passes `--yes` to Firm setup

---

## v3.8 — CLAUDE.md Version Stamp Auto-Injection (2026-03-10)

**Category:** Minor — update.sh now auto-stamps Firm version in CLAUDE.md

### What Changed
- New Step 4 in update.sh: extracts version from evolution.md, counts workers from crew/, injects/updates FIRM:START/FIRM:END sentinel markers in CLAUDE.md
- Three scenarios handled: markers exist (replace between), no markers but CLAUDE.md exists (inject after first `---`), no CLAUDE.md (skip)
- CLAUDE-TEMPLATE.md updated with pre-included markers for new projects
- Step count bumped from 6 to 7; header comments updated to reflect new behaviour

### Why
Claude Code auto-loads CLAUDE.md but NOT `.ai/thefirm/` files. A new session had no way to know the current Firm version without reading FIRM-CONTEXT.md first. The version stamp ensures every fresh session immediately sees the version, worker count, and reference links right in CLAUDE.md — auto-managed, zero maintenance.

### Files Changed
- `update.sh` — new Step 4 (version stamp injection), step renumbering
- `CLAUDE-TEMPLATE.md` — pre-included FIRM:START/FIRM:END markers

---

## v3.7 — FIRM-CONTEXT.md: Sync Boundary Fix (2026-03-10)

**Category:** Minor — new auto-synced file eliminates configuration drift between projects

### What Changed
- **New file: FIRM-CONTEXT.md** — single canonical source for all Firm framework content that was previously duplicated in every project's CLAUDE.md and CLAUDE-SUPPLEMENT.md. Contains: greeting protocol, partnership principles, UX rules, worker table (all 26), worker identities, hierarchy diagram, scoring targets, improvement loop, worker execution rules, APEX modes, BULLETPROOF framework, "When to Use Each Worker" decision tree, trigger words, learned patterns, mantras, commitment
- **update.sh now syncs FIRM-CONTEXT.md** — copied from master to project on every `bash update.sh`, same as PROTOCOL.md and evolution.md. Framework content stays current across all projects automatically
- **Project CLAUDE.md files slimmed** — all Firm framework sections replaced with a single reference: `> Full framework reference: [FIRM-CONTEXT.md](.ai/thefirm/FIRM-CONTEXT.md)`. Project CLAUDE.md now contains ONLY project-specific content: personality, user persona, tech stack, brand colours, project structure, infrastructure, product context, design philosophy
- **CLAUDE-SUPPLEMENT.md worker sections made redundant** — the "All Workers" identity table, hierarchy diagram, scoring targets, and BULLETPROOF framework previously duplicated in CLAUDE-SUPPLEMENT.md are now authoritative in FIRM-CONTEXT.md
- **Sync boundary clarified** — three categories of files: (1) always synced from master: PROTOCOL.md, FIRM-CONTEXT.md, evolution.md, new workers (2) never synced: CLAUDE.md, CLAUDE-SUPPLEMENT.md, gaffer state (3) conditionally synced: existing workers (preserved unless --force)

### Why
External audit of a second project (ported from the first) revealed that update.sh synced the engine (PROTOCOL.md, workers) but not the interface (CLAUDE.md, CLAUDE-SUPPLEMENT.md). Framework content — worker tables, hierarchy, scoring targets, improvement loop, partnership principles — was duplicated in project-specific files that update.sh deliberately preserved. When The Firm evolved (v3.5 killed trivial bypass, v3.6 added TRAINX), the engine updated but the duplicated content in CLAUDE.md stayed stale. Result: the Gaffer read "skip for trivial tasks" from CLAUDE.md and followed it, overriding the stricter PROTOCOL.md it was supposed to enforce. Configuration drift — the same framework at two different versions in the same project.

### Lesson
Framework content and project content must never share a file. If they do, you can't auto-sync one without risking the other. The fix isn't "be more careful about syncing" — it's making it structurally impossible for framework content to drift by putting it in a file that's always overwritten. Same principle as separating config from code: if it changes independently, it lives independently.

### Files Changed
- `.ai/thefirm/FIRM-CONTEXT.md` — NEW. Canonical framework reference
- `update.sh` — syncs FIRM-CONTEXT.md alongside PROTOCOL.md and evolution.md
- `.ai/thefirm/gaffer/evolution.md` — this entry

---

## v3.6 — Graduated Improvement Loop + TRAINX Training Officer (2026-03-10)

**Category:** Minor — new worker (TRAINX), new Improvement Loop phase, graduated quality gates

### What Changed
- **New worker: TRAINX (Travis Forge, Training Officer)** — sits at the same level as the Foreman, under the Gaffer. Activates inside the Improvement Loop at every gate failure. Analyses root causes (knowledge/context/clarity/calibration/execution gap), patches worker playbooks, logs every learning to evolution.md with a version bump. The Firm's memory
- **Graduated Improvement Loop** — replaces single-pass scoring. Four quality gates: 80% → 85% → 90% → 95% of each worker's max. At each gate failure: fix → TRAINX analyses → playbook patch → version bump → re-run failing workers → advance. Nothing reaches the user below 95%
- **Per-worker gate thresholds** — SOFAX: 88/94/99/105 (out of 110). All others: 80/85/90/95 (out of 100)
- **Lightweight loop for small tasks** — one pass, 90% threshold, one re-attempt. Travis still analyses failures
- **Loop inserted as Phase 4 in BULLETPROOF** — between QA checks and the Foreman. Frank validates the final polished output, not intermediate states
- **Improvement Loop Summary** — included in presentation to James showing what was caught, fixed, and learned at each gate
- **Compounding effect** — over time the loop runs fewer iterations as workers absorb Travis's patches

### Why
The Firm scored work and presented it, but had no mechanism to systematically improve below-threshold scores before presenting. Scores were either accepted or manually fixed without learning why they failed. The Improvement Loop + TRAINX creates a self-improving system where every failure makes the entire framework smarter. Each gate failure produces a playbook patch and version bump — the system's knowledge base grows with every build.

### Files Changed
- `crew/TRAINX-travis-forge.md` — NEW. Full playbook for the Training Officer
- `PROTOCOL.md` — added Improvement Loop section, updated BULLETPROOF phases, added TRAINX reference
- `crew/GAFFER.md` — added TRAINX to hierarchy, added gate thresholds table, updated score handling
- `gaffer/evolution.md` — this entry

---

## v3.5 — Protocol Enforcement: Kill Trivial Bypass, Mandatory Foreman (2026-03-10)

**Category:** Minor — 8 structural changes to eliminate protocol shortcuts

### What Changed
- **Killed Trivial Bypass** — replaced with Lightweight Mode. Frank's 3-point fast check runs on every task. The old clause "If the Gaffer declares trivial, Foreman is skipped entirely" is deleted
- **Banned "GAFFER (direct execution)"** — the Gaffer manages, workers build. Minimum crew = 1 builder + 1 reviewer/checker + Frank. No exceptions
- **Builder ≠ Approver Rule** — if the Gaffer executes directly (emergency only), Frank escalates to FULL 9-point mode. Penalty for breaking separation of concerns
- **Mandatory Foreman field in session log** — every entry must include `**Foreman:** CLEARED/BLOCKED/FLAGGED (full/lightweight)`. Missing = invalid entry
- **Mandatory Protocol field in session log** — every entry must include `**Protocol:** FULL/LIGHTWEIGHT/VIOLATED`. Missing = invalid entry
- **Protocol Compliance Scan at session start** — Gaffer checks last 3 session log entries for violations, reports compliance status
- **Two new Gaffer principles** — #9 "Protocol is non-negotiable" and #10 "Manage, don't do"
- **Removed all "trivial bypass" language** from PROTOCOL.md, GAFFER.md, and FOREMAN.md

### Why
Audit of session-log.md revealed systematic protocol skipping. 5 of 8 recent sessions used "Workers: GAFFER (direct execution)" — the Gaffer was building AND approving, bypassing all workers and the Foreman. The Trivial Bypass clause was the structural loophole that enabled this. The fix is not "promise to follow protocol" but "make it structurally impossible to write a valid log entry without proof that protocol ran."

### Files Changed
- `FOREMAN.md` — deleted Trivial Bypass section, added Lightweight Mode (3-point check), added Builder ≠ Approver escalation rule
- `GAFFER.md` — added Minimum Crew Rule, banned direct execution, added compliance scan at session start, added mandatory log fields, added principles #9 and #10, replaced all "trivial" references
- `PROTOCOL.md` — replaced trivial bypass with lightweight mode, added Builder ≠ Approver rule, added Minimum Crew Rule, updated session log format, updated Trigger 1 and Trigger 4
- `session-log.md` — updated format comment with mandatory Foreman and Protocol fields

---

## v3.4 — Visual-Value Rule Added to Smart Routing (2026-03-10)

**Category:** Minor — new mandatory override and routing step

**What changed:**
- Added Step 8 to Smart Routing: **VISUAL-VALUE RULE** — if a fix involves guessing a pixel value (crop, spacing, sizing, offset) that can't be verified without seeing it, route through DEMX first
- Added `visual-value-guess` signal to Step 5 mandatory overrides, triggering DEMX assignment

**Why:**
Gaffer applied a blind CSS crop to a screenshot mockup (guessed a pixel value for margin-top). The fix made things worse because the value was wrong. James had to intervene and request DEMX. When DEMX built a comparison page with 5 crop values side-by-side, the right answer was immediately obvious. Lesson: visual pixel values are not guessable — they must be seen. DEMX exists for exactly this. The Gaffer should have routed there automatically.

**The rule:** If you can't verify a visual value without seeing it, don't guess it. Build a comparison page first.

---

## v3.3 — Mass Worker Onboarding Pattern Validated (2026-03-08)

**Category:** Minor — validated that 7 template workers can be onboarded to project-specific context in a single session

### What Changed
- **7 template workers onboarded in one session:** BLAZX, STANX, RIGX, PETRAX, NIGELX, ALLYX, DOCKX. All transitioned from `[BRACKETED]` placeholders to project-specific context
- **Onboarding pattern confirmed:** Context sections rewritten per worker with project paths, entity names, infrastructure details, and domain knowledge. Methodology, scoring, and philosophy sections preserved untouched
- **Parallel agent pattern:** 5 of 7 workers onboarded via parallel agents, 2 manually in main context. Agents work well for workers with clear placeholder-to-value mappings. Workers needing nuanced persona work (e.g. NIGELX) benefit from manual attention
- **All 7 workers upgraded from v1.0 Template to v2.0 Project Edition** — confirms the template-to-project upgrade path works at scale

### Why
Template workers provide methodology but no project context. When invoked, they can't reference actual paths, entity names, or infrastructure details — they give generic advice instead of specific guidance. Mass onboarding means every worker in The Firm speaks the project's language natively. This is the first time all template-flavour workers were onboarded in a single session, confirming the pattern scales.

### Lesson
Workers with deep persona elements (usability testers, accessibility auditors) benefit from manual onboarding — the persona needs to be shaped around the project's actual users, not just find-and-replace on placeholders. Workers with primarily technical context (performance, security, infrastructure) onboard cleanly via parallel agents.

### Files Changed
- 7 worker playbooks (project instance only — thefirm templates unchanged)
- `.ai/thefirm/gaffer/evolution.md`

---

## v3.2 — Department Lead Gate Audit: 5 Gap Fixes (2026-03-07)

**Category:** Patch — ran the gates themselves through The Firm's quality process, found and closed 5 gaps

### What Changed
- **Build Gate check 4 sharpened:** Was a vague "CONSX-style spot check" — tightened to specific instruction: open the actual page/component being replaced, compare the new build side-by-side, flag any visual or structural deviation from existing patterns
- **Build Gate check 6 added (data flow):** New check — does data flow correctly from source to render? API returns the right shape, components receive the right props, no dead data, no missing fields. Catches the class of bug where code compiles but data doesn't connect
- **Review Gate check 5 added (score staleness):** Reviewer scores must be against the CURRENT build, not an older version. If code changed after a reviewer ran, that reviewer's score is stale and must re-run. Prevents "reviewed v1, shipped v2" drift
- **QA Gate check 5 added (new test coverage):** New features or changed behaviour must have corresponding test coverage. Not "100% coverage" but "did we test the thing we just built?" Catches the gap where existing tests pass but the new code has zero coverage
- **Gate execution reassigned:** All 4 department gates now explicitly run by the Foreman, not the Gaffer. This was the biggest gap — the Gaffer running the gates was the same conflict of interest that created the Foreman role in the first place
- **Gate failure logging:** Gate failures now logged to `calibration.md` with date, gate, check number, and what was caught. Enables pattern detection across sessions

### Why
Ran the gates through The Firm's own quality process (assigned PRDX to validate, CONSX for consistency, NIGELX for usability). Found 5 gaps: (1) Build Gate check 4 was too soft to catch real deviations, (2) no data flow verification anywhere in the pipeline, (3) no protection against stale reviewer scores, (4) no check for test coverage on new code, (5) the Gaffer was still running gates despite the Foreman existing specifically to separate building from checking. The last gap was the most ironic — the gates were created to support the Foreman, but nobody assigned them to the Foreman.

### Files Changed
- `.ai/thefirm/PROTOCOL.md` (Build Gate, Review Gate, QA Gate, Gate Rules)
- `.ai/thefirm/gaffer/evolution.md`

---

## v3.1 — Eyes On, Gaffer Override, James Rejection Trace (2026-03-07)

**Category:** Minor — stress-tested v3.0 chain of command, found and closed 3 gaps

### What Changed
- **Gaffer Eyes On (mandatory):** New point 4 in the Gaffer's 5-point checklist. The Gaffer must look at the actual screenshots/output, NOT Frank's report. Ignore scores for 30 seconds. Just look. "Does this look good?" not "did this pass?" Hesitation = FIX FIRST. Frank is a filter, not a replacement for the Gaffer's eyes. This prevents the rubber-stamp problem where the Gaffer trusts the paperwork instead of looking at the product
- **Gaffer Override on Frank's BLOCKED:** All Foreman verdicts (CLEARED, BLOCKED, FLAGGED) are now visible to the Gaffer. If Frank blocks work and the Gaffer disagrees, the Gaffer can override with a logged reason. 3-strike rule: if the Gaffer overrides Frank 3 times on the same type of check, something is miscalibrated — stop, review, recalibrate before continuing
- **James Rejection Trace:** Automatic trigger when James pushes back on chain-approved work. Any form of dissatisfaction ("hmm no", "change this", any redirect) triggers a full forensic trace: which worker should have caught it, did Frank's checklist cover it, did the Gaffer actually do Eyes On, root cause classification, and immediate fix. 3-strike escalation: same root cause 3 times means the fix isn't working, needs deeper methodology review
- **Foreman Key Rules updated:** Frank can no longer silently block — all verdicts visible to Gaffer. BLOCKED can be overridden with logged reason

### Why
Stress-testing the v3.0 chain of command revealed three gaps: (1) The Gaffer's role was reduced to reviewing Frank's report, creating a rubber-stamp risk — the Gaffer stopped looking at the actual work. (2) Frank had unchecked blocking power with no override mechanism. (3) No feedback loop existed for when James rejects chain-approved work — the most important quality signal in the system had no systematic response. All three gaps could lead to the same outcome: technically-passing work that's actually bad.

### Files Changed
- `.ai/thefirm/crew/GAFFER.md` (Eyes On point, James Rejection Trace)
- `.ai/thefirm/crew/FOREMAN.md` (Gaffer Override section, key rules update)
- `.ai/thefirm/PROTOCOL.md` (Quality Gate updated, James Rejection Trace section)
- `.ai/thefirm/gaffer/evolution.md`

---

## v3.0 — The Foreman + Department Lead Gates: Chain of Command (2026-03-07)

**Category:** Major — new management role, 4 department gates, hierarchy restructure

### What Changed
- **New role: The Foreman** (Frank Harmon — Chief Quality Controller) — the Gaffer's right hand. Sits between department workers and the Gaffer. Full playbook at `crew/FOREMAN.md`. 9-point composition checklist covering: department gate verification, "right thing right place" structural check, composition quality, cross-worker conflict detection, scope creep check, score sanity, debt awareness, Review Card assembly, and verdict (CLEARED/BLOCKED/FLAGGED)
- **4 Department Lead Gates added to PROTOCOL.md** — lightweight checklists that run at phase boundaries:
  - **Planning Gate (PG):** Plan complete? Design constraints loaded? Scope clear?
  - **Build Gate (BG):** Output matches plan? Compiles? Structural sense-check? Existing patterns followed? No scope creep? This is the most important gate — catches misplaced furniture (e.g. stats on a queue page) before reviewers waste time scoring something in the wrong place
  - **Review Gate (RG):** All reviewers ran? Cross-worker contradictions? CRITICAL flags resolved?
  - **QA Gate (QG):** All checks passed? Nothing skipped?
- **Hierarchy restructured:** Workers → Department Lead Gates → The Foreman → The Gaffer → James. The Gaffer no longer builds AND checks (conflict of interest). The Foreman provides independent quality oversight
- **Gaffer sign-off streamlined:** Old 7-point checklist reduced to 5-point strategic checklist (Foreman verdict review, strategic alignment, debt impact, Eyes On, gut check). Tactical quality checking delegated to Foreman and gates
- **Execution graph updated:** 4 phases → 7 phases (Planning → Build → Review → QA → Foreman → Gaffer Sign-off → Present)
- **Review Card updated:** Now includes Foreman verdict line alongside Gaffer verdict
- **BULLETPROOF updated:** Steps now explicitly reference department gates and Foreman composition check

### Why
The Gaffer was simultaneously building work AND quality-checking that same work — a fundamental conflict of interest. When building a feature, the Gaffer is in "builder mode" (head down, shipping) and doesn't step back to ask structural questions like "does this element even belong on this page?" The page scope uptrain (v2.9) added the question to the Gaffer's own checklist, but asking the builder to check their own work is inherently unreliable. The Foreman solves this by providing independent quality oversight — someone who ONLY reviews, never builds.

Department lead gates solve the "boundary crossing" problem: issues that are obvious within a department (a build that doesn't match the plan, conflicting reviewer scores) were crossing phase boundaries unchecked. Gates catch these at the boundary, before they compound.

### Files Changed
- `.ai/thefirm/crew/FOREMAN.md` (new — full playbook)
- `.ai/thefirm/PROTOCOL.md` (hierarchy, roster, execution graph, department gates, Foreman section, BULLETPROOF, quality gate, review card, full build)
- `.ai/thefirm/crew/GAFFER.md` (hierarchy, sign-off, pre-present gate)
- `.ai/thefirm/gaffer/evolution.md`

---

## v2.9 — Page Scope Check: 3-Worker Uptrain + Quality Gate (2026-03-07)

**Category:** Minor — new quality dimension + 3 worker uptrains + quality gate expansion

### What Changed
- **NIGELX uptrained:** Cognitive Load dimension sharpened from "one primary action per screen" to "one primary PURPOSE per screen". A stats panel isn't an action, so the old wording let scope violations pass on a technicality. New wording: every page/tab/view has ONE job. If an element serves a different purpose, it belongs on a different page/tab
- **CONSX uptrained:** New Dimension 11 "Page Scope & IA" added. Checks that each view has a single describable purpose, new elements serve that purpose, and "while we're here" additions are flagged. Page scope violation added as CRITICAL flag
- **AIDAX uptrained:** New "Page Focus Gate" added as pre-scoring qualifier alongside Brand Alignment Gate. If a page mixes two purposes, AIDA flow is diluted — flag and split before scoring
- **Gaffer Quality Gate:** Expanded from 6-point to 7-point checklist. New point 5: "Page scope check — does every new UI element belong on this page? Different purpose = different page/tab"

### Why
Gaffer approved a stats/analytics panel placed directly inside a content management queue view. The correct placement was a separate tab. Three workers should have caught this but didn't because: (1) NIGELX checked for competing "actions" but a stats panel isn't an action, (2) CONSX checked visual consistency but not scope consistency, (3) AIDAX had no concept of page focus dilution

### Files Changed
- `crew/reviewers/NIGELX-nigel-mullins.md`
- `crew/reviewers/CONSX-connie-mirror.md`
- `crew/reviewers/AIDAX-aida-sterling.md`
- `crew/GAFFER.md`
- `PROTOCOL.md`
- `gaffer/evolution.md`

---

## v2.8 — DOCKX: Mobile App Specialist (2026-03-07)

**Category:** Minor — new builder worker added to the crew

### What Changed
- **New worker: DOCKX** (Declan Harbour — Chief Mobile Officer) — builder type, lives in `crew/builders/`
- **Purpose:** Designs, prototypes, and builds mobile app screens. Two outputs from one brain: interactive device-frame web prototypes (investor-ready showcase) and production React Native + Expo code
- **Device Frame System:** `<DeviceFrame>` component renders pixel-accurate device chrome (default: iPhone 15 Pro). Prototype screens at `/prototype/*` are clickable, scrollable, navigable — shareable via URL
- **The Stress Test:** 5-point validation — worst-case lighting, impaired grip (48pt targets), glance comprehension, one-handed use, distraction/motion tolerance
- **Integration:** Feeds from CODAX/PLANX/DEMX (specs + variations), reviewed by NIGELX/SOFAX/AIDAX/ALLYX/CONSX/PIXLX, screenshots feed SHOWX for social cards
- **Trigger:** `DOCKX: [app] [screen/flow]`
- **Smart routing:** Scores high on `touches-mobile`, `touches-ui`, `prototype-needed` signals
- **Worker count:** 25 → 26

### Why
Mobile-first products need a worker who thinks in thumb zones, safe areas, and native platform conventions — not just responsive web. No existing worker designed mobile app screens from scratch or produced interactive prototypes. DEMX creates web component variations, SHOWX creates social cards from screenshots, but neither builds full mobile flows. DOCKX fills this gap with a dual-output model: the same brain produces both the investor showcase (device-frame web prototype) and the production React Native code. The prototype IS the design — no Figma handoff, no translation layer.

### Files Changed
- `.ai/thefirm/crew/builders/DOCKX-declan-harbour.md` — new worker playbook
- `.ai/thefirm/PROTOCOL.md` — DOCKX added to builder roster + identity register
- `.ai/thefirm/gaffer/evolution.md` — this entry

---

## v2.7 — Auto-check for Firm updates on git pull (2026-03-05)

**Category:** Minor — new git hook installed by setup.sh and update.sh

### What Changed
- **setup.sh** gains Step 4/5: installs a `post-merge` git hook that checks for Firm updates after every `git pull`
- **update.sh** gains Step 3/4: ensures the hook exists on every update (retroactive install for projects set up before v2.6.3)
- **Hook behaviour:** fetches `~/Projects/thefirm` origin after a pull. If local is behind, prints a one-liner: "The Firm has updates available. Run: bash ~/Projects/thefirm/update.sh". Silent when up to date or when the firm repo doesn't exist on the machine
- **Hook detection:** automatically installs into `.husky/post-merge` (if husky detected) or `.git/hooks/post-merge` (standard git). Appends to existing hooks rather than overwriting. Idempotent - safe to run multiple times
- **No auto-sync:** the hook only notifies. It does not run update.sh or modify files. The user decides when to sync

### Why
The Firm is a separate repo (`~/Projects/thefirm`) synced manually into projects via `update.sh`. When pulling a project, the firm repo was never checked - updates could sit upstream for weeks without anyone noticing. There was no reminder, no nudge, no automated check. The only way to know was to manually `cd ~/Projects/thefirm && git fetch && git status`. This hook closes that gap: every pull triggers a lightweight fetch check, and the user gets told when it's time to update.

### Lesson
Separate repos that feed into a project need a notification mechanism at the project boundary. The cheapest, least intrusive option is a post-merge hook that fetches and compares - no file changes, no side effects, just information at the right moment.

### Files Changed
- `setup.sh` - new Step 4/5 (hook install), step counters updated from /4 to /5
- `update.sh` - new Step 3/4 (hook install), step counters updated from /3 to /4

---

## v2.6.2 — update.sh: safe for onboarded projects (2026-03-04)

**Category:** Patch — critical bug fix in update.sh

### What Changed
- `update.sh` no longer overwrites existing worker playbooks
- Default behaviour: only ADD new workers that don't exist in the project yet. Existing workers are preserved (they may contain onboarded project context from `Gaffer: onboard`)
- `PROTOCOL.md` still always overwritten (pure framework, no project context)
- New `--force` flag: `bash ~/Projects/thefirm/update.sh --force` — overwrites all workers from master. Use after a major framework overhaul, then re-run `Gaffer: onboard` to restore project context
- README and PROTOCOL.md updated to document new behaviour

### Why
`update.sh` was doing `rm -rf crew/` then copying master crew/ wholesale — nuking all project-specific context that `Gaffer: onboard` had written into worker playbooks (entity names, file paths, brand rules, design tokens). Every pull destroyed the onboarding work. Running update.sh on an onboarded project was effectively the same as running setup.sh from scratch.

### Lesson
Framework files and project-context files must be treated differently even when they live in the same directory. Worker playbooks start as framework templates but become project-specific after onboarding. An update script must understand which category each file belongs to and act accordingly. When in doubt, preserve — never silently destroy work.

### Files Changed
- `update.sh` — complete rewrite of update logic
- `.ai/thefirm/PROTOCOL.md` — updated PULL section
- `README.md` — updated Updating section

---

## v2.6 — Clear Pull Instructions + update.sh (2026-03-04)

**Category:** Minor — new script + protocol gap closed

### What Changed
- Added `update.sh` to the thefirm repo root — pulls latest `crew/` and `PROTOCOL.md` into any existing project without touching project-specific state (`gaffer/`, `CLAUDE.md`, `CLAUDE-SUPPLEMENT.md`)
- Added `PULL — Master → Existing Project (Update)` section to `PROTOCOL.md` with exact commands
- Updated `README.md` with canonical local clone path (`~/Projects/thefirm/`), Updating section, and corrected version/worker count
- Added firm location + update command to global `~/.claude/CLAUDE.md` so Claude in every project knows where the firm is without reading project docs

### Why
Projects were getting confused — Claude would ask "where is the updated version?" or "is it in another project?" because no documented update path existed. `setup.sh` overwrites everything (nukes gaffer state), so it was not safe to use on existing projects. No script and no documented procedure = confusion every time a project needed to sync.

### Files Changed
- `update.sh` (new)
- `.ai/thefirm/PROTOCOL.md`
- `README.md`

---

## v2.5 — SHOWX: Social Card Builder (2026-03-03)

**Category:** Minor — new builder worker added to the crew

### What Changed
- **New worker: SHOWX** (Shane Frame — Chief Content Officer) — builder type, lives in `crew/builders/`
- **Purpose:** Takes device mockups (browser, laptop, phone frames) and wraps them in platform-ready branded social cards with headlines, CTAs, and project branding
- **5-stage process:** SOURCE → BRIEF → COMPOSE → RENDER → DELIVER
- **4 platform templates:** LinkedIn (1200x627), Instagram (1080x1080), Twitter (1600x900), Pitch Deck (1920x1080)
- **Unique trait:** The only Firm worker that produces finished image files (PNGs), not code or specs
- **Trigger:** `SHOWX: [page] [platform]`
- **Smart routing:** Scores 9 on `content-change`, 3 on `seo`, 2 on `ui-change`
- **Worker count:** 24 → 25

### Why
Social media assets were being created ad-hoc — screenshots taken manually, no consistent branding, no template system. Every time a feature shipped and needed social promotion, the process started from scratch. SHOWX formalises this into a repeatable pipeline: Playwright generates device mockups, SHOWX wraps them in branded templates per platform. The HTML template approach means cards render at exact pixel dimensions with consistent typography and colour.

### Files Changed
- `.ai/thefirm/crew/builders/SHOWX-shane-frame.md` — new worker playbook
- `.ai/thefirm/gaffer/evolution.md` — this entry

---

## v2.4 — Folder Restructure: .ai/thefirm/ Nesting (2026-03-02)

**Category:** Minor — all Firm framework files now nested under `.ai/thefirm/` instead of loose in `.ai/`

### What Changed
- **All Firm files moved into `.ai/thefirm/`** — crew/, gaffer/, PROTOCOL.md, CLAUDE-SUPPLEMENT.md now live under `.ai/thefirm/` instead of directly in `.ai/`. Project-specific files (guides/, product/) stay at `.ai/` level
- **Thefirm repo mirrors project structure** — the master repo now has `.ai/thefirm/` matching exactly how it lands in projects. No more path translation during setup or sync
- **Firm Sync Protocol simplified** — paths are now 1:1 between project instances and thefirm master. No mapping needed
- **setup.sh rewritten** — source and destination paths updated, directory tree output updated
- **All internal references updated** — every `.ai/crew`, `.ai/gaffer`, `.ai/PROTOCOL.md`, `.ai/CLAUDE-SUPPLEMENT.md` reference across all files updated to `.ai/thefirm/` prefix
- **Relative link depth fixed** — files that moved one level deeper had their `../` links adjusted (CLAUDE-SUPPLEMENT `../docs/` → `../../docs/`, worker files `../../docs/` → `../../../docs/`)

### Why
Firm framework files were scattered loose in `.ai/` alongside project-specific files (guides/, product/). No clear boundary between "The Firm" and "this project". When pulling The Firm into a new project, you couldn't see it as one contained thing. Now `.ai/thefirm/` is one clean folder — obvious what's framework and what's project-local. The repo structure mirrors the install structure, eliminating path confusion during sync.

### Lesson
Framework files should be self-contained in their own folder, not mixed with project files. Same principle as node_modules or .git — one folder, clearly identified, easy to update or remove wholesale.

### Files Changed
- Every file in thefirm repo (git mv + reference updates)
- `setup.sh` — complete rewrite of source/dest paths
- `README.md` — directory tree and path references
- `CLAUDE-TEMPLATE.md` — all .ai/ link references
- `.ai/thefirm/PROTOCOL.md` — all inline paths + directory tree + sync protocol
- `.ai/thefirm/crew/GAFFER.md` — all inline paths + relative doc links
- `.ai/thefirm/CLAUDE-SUPPLEMENT-TEMPLATE.md` — inline paths + relative links
- `.ai/thefirm/gaffer/evolution.md` — master location + sync protocol paths
- 7 worker playbooks — relative doc link depth fixes

---

## v2.3 — Auto-Fill Bootstrap from Codebase Context (2026-03-02)

**Category:** Minor — bootstrap onboarding overhauled to auto-fill placeholders from project context instead of manual Q&A

### What Changed
- **CLAUDE-TEMPLATE.md now includes a "FIRST SESSION BOOTSTRAP" section** — triggers when Claude detects unfilled `[BRACKETED]` placeholders on first contact with a new project
- **Step 3 overhauled: auto-fill from context, not manual walking.** Claude scans the PRD, package.json, tailwind.config, auth files, database config, and deployment config to auto-fill every placeholder it can determine. Only asks about things it genuinely can't figure out from the codebase
- **Priority scan order defined:** PRD → package.json/turbo.json → tailwind.config → auth files → database config → deployment config → existing design docs
- **Placeholder-to-source mapping table added** — tells Claude exactly where to find each placeholder value (e.g. `[BRAND-PRIMARY]` → tailwind.config theme.extend.colors)
- **"Confirm or correct" pattern** — Claude presents what it auto-filled and asks for confirmation, rather than asking questions one by one
- **7-step setup flow:** understand system → read Gaffer → auto-fill placeholders → locate/create design docs → locate/write PRD → onboard The Firm → delete bootstrap section

### Why
The original bootstrap was designed as a manual interview — "Walk James through every placeholder. Ask about the project. Don't guess." This meant 15-20 questions before any work could start. But 80%+ of those answers already exist in the codebase (package.json has the framework, tailwind.config has the colours, deployment config has the host). Claude should be smart enough to read the project and fill those in automatically. The bootstrap now respects the user's time — scan first, ask only what's missing.

### Lesson
Configuration should be discovery, not interrogation. If the answer is already in the codebase, don't ask for it. Auto-fill from context, present what you found, let the user correct. This applies to any onboarding or setup flow — not just The Firm.

### Files Changed
- `CLAUDE-TEMPLATE.md` — FIRST SESSION BOOTSTRAP section added with auto-fill Step 3

---

## v2.2 — Nigel-First Audit Order + Navigation Audit + Phone Squint Test (2026-03-02)

**Category:** Minor — audit execution order changed, two new mandatory checks added after Gaffer failed to catch usability and readability issues

### What Changed
- **NIGELX runs FIRST in every audit, not last.** Previously the Gaffer ran visual/brand checks (SOFAX, CONSX) before usability checks (NIGELX). A page could get approved with perfect shadows and rounded-full buttons but have unreadable text and dead-end navigation. Nigel is now the gatekeeper — if a 58-year-old on a phone can't use it, nothing else matters
- **Navigation Audit added to NIGELX scope.** For any set of related pages, NIGELX now maps the full user journey: every entry point, every exit, every action. Dead ends are flagged before any visual review begins. Previously nobody checked "can the user actually get from A to B?" — a list page had no link to the management page, leaving users stranded
- **Phone Squint Test added to Gaffer pre-check.** Before signing off any UI work, the Gaffer scans every `text-xs`, every light-coloured text class, every badge overlaid on an image, and asks: "would this be readable at 375px width on a sunny terrace?" Any text below 14px (`text-sm`) that carries actionable information must be justified or bumped. `text-xs` on photo overlays is now flagged automatically
- **Audit execution order formalised:** NIGELX (usability + navigation) → SOFAX (design) → CONSX (consistency) → PIXLX (edge cases + brand) → Gaffer sign-off. Visual polish is worthless if the page doesn't work

### Why
Gaffer ran a full audit on three related pages. Caught 17 styling issues (shadows, button radius, toggle styles, background colours) and fixed all of them. But completely missed: (1) a list page with no way to manage listings — users could see their properties but couldn't edit them, (2) a "View" button that didn't say what it viewed, (3) 12px text overlaid on photos that Nigel couldn't read, (4) timestamps in light grey at 12px — invisible on mobile. The styling was perfect. The page was unusable. NIGELX was listed on the crew sheet but was run after the visual checks, essentially as an afterthought. The critical usability and navigation failures were only caught when James explicitly asked "is it Nigel proof?" — which should never happen. The Gaffer should catch this before presenting.

### Lesson
A page with the wrong shadow is slightly off-brand. A page with no navigation is broken. A badge you can't read doesn't exist. Usability must be checked before aesthetics, not after. The order matters because the Gaffer's first pass sets the tone — if visual checks run first, the entire audit anchors on visual correctness and usability becomes a rubber stamp. Nigel first means "does it work?" before "does it look right?"

### Files Changed
- `.ai/gaffer/evolution.md` — this entry

---

## v2.1 — Git Push & Pull Discipline (2026-03-01)

**Category:** Minor — new mandatory gate added to PROTOCOL.md after unauthorised push to project remote

### What Changed
- **PROTOCOL.md:** New section "Git Push & Pull Discipline (MANDATORY)" — explicit rules for when and where `git push` and `git pull` can be executed
- **Core rule:** Only push what was explicitly asked for, to the repo that was explicitly named. Nothing more. Ever
- **Push to any remote is now a confirmation-required action** — before running `git push`, verify: (1) was push explicitly requested for THIS specific repo? (2) if a specific repo was named, push ONLY that repo (3) if ambiguous, ask
- **"Push the firm" disambiguation:** pushing the framework repo does NOT authorise pushing the project repo. "Commit this" does NOT authorise a push. A successful build does NOT authorise a push
- **Pull rules added:** confirm before pulling, check for uncommitted changes, confirm which files will be overwritten

### Why
Agent was asked to "commit this and push the firm to the firms repo". Agent correctly committed in the project and pushed thefirm to GitHub, but ALSO pushed the project to its own remote — which was never requested. This deployed uncommitted-adjacent work to production without authorisation. The instruction was unambiguous ("push the firm to the firms repo") but the agent inferred a broader scope. This gate ensures push scope is always literal, never inferred.

### Lesson
"Push" is a destructive, visible-to-others action. It must be treated like a deployment gate — explicit authorisation per repo, no inference, no chaining. The cost of asking "want me to push this too?" is zero. The cost of an unauthorised push can be significant.

### Files Changed
- `.ai/PROTOCOL.md` — new "Git Push & Pull Discipline" section
- `.ai/gaffer/evolution.md` — this entry
- Project CLAUDE.md — new principle 16 (NEVER PUSH WITHOUT PERMISSION)

---

## v2.0.5 — Proportional Visual Hierarchy Added to INSPX Reviews (2026-03-01)

**Category:** Patch — INSPX checkpoint focus expanded after compositional sizing issue slipped through review

### What Changed
- **INSPX checkpoint guidance:** Review workers must now evaluate **proportional visual hierarchy** — sibling controls that form a decision flow must have proportional visual weight. A primary decision control (e.g. a toggle, tab bar, filter) must not be visually subordinate to secondary controls (e.g. a search input) that depend on it
- **Gap identified in SOFAX/NIGELX/AIDAX:** All three review individual element quality but none evaluated the proportional relationship between adjacent controls. Each element passed in isolation; the composition failed

### Why
A toggle control and a search bar sat next to each other. The toggle was the user's first decision (it determined what the search returned), but it had significantly less visual weight than the search bar. Every review worker scored the elements individually and passed them. Nobody checked whether the visual hierarchy matched the decision hierarchy. The most important control looked like the least important element.

### Lesson
Individual element quality ≠ compositional quality. Controls can be perfectly styled in isolation but wrong in context. INSPX checkpoints now explicitly require proportional hierarchy checks on above-the-fold decision flows so this class of issue gets caught at the inspection level, not by the user.

### Files Changed
- Project-level INSPX inspection specs updated (project-specific, not synced)
- `.ai/gaffer/evolution.md` — this entry

---

## v2.0.4 — Firm Sync Protocol Wired Into Triggers (2026-02-28)

**Category:** Patch — sync protocol enforced at Gaffer trigger level, backed by private GitHub repo

### What Changed
- **PROTOCOL.md:** New section "The Firm — Sync Protocol" — defines PUSH (project → master) and PULL (master → new project) rules, what syncs, what doesn't
- **GAFFER.md Trigger 3 (POST-SHIP):** Now includes step 3 — if any Firm files changed, run Firm Sync Protocol (copy to thefirm, commit, push to GitHub)
- **GAFFER.md Trigger 6 (UPTRAINING):** Now includes step 6 — sync updated evolution.md + modified playbook to thefirm, commit, push
- **GAFFER.md Firm Sync Rule:** Universal rule — any write to `.ai/crew/`, `.ai/PROTOCOL.md`, `.ai/crew/GAFFER.md`, or `.ai/gaffer/evolution.md` triggers the Firm Sync Protocol
- **GAFFER.md Persistent State:** evolution.md description updated — references thefirm master + GitHub backup
- **evolution.md:** Golden Rule 3 updated from lostmonster reference to thefirm + GitHub. Sync Protocol section rewritten with 5-step flow
- **GitHub:** Private repo `lostmonster84/thefirm` created as remote backup

### Why
The sync protocol existed in evolution.md instructions but wasn't wired into the actual Gaffer triggers that fire when changes happen. Changes could be made to Firm files without syncing — the protocol was aspirational, not enforced. Now it's mandatory: every trigger that modifies a Firm file includes an explicit sync step. GitHub provides offsite backup and makes thefirm clonable from anywhere.

### Files Changed
- `.ai/PROTOCOL.md` — new Firm Sync Protocol section
- `.ai/crew/GAFFER.md` — Triggers 3, 6 updated + Firm Sync Rule added + Persistent State updated
- `~/Projects/thefirm/gaffer/evolution.md` — Golden Rule 3 + Sync Protocol rewritten + this entry

## v2.0.3 — The Firm Gets Its Own Repo (2026-02-28)

**Category:** Patch — framework extracted to standalone project

### What Changed
- The Firm extracted from lostmonster template to its own project: `~/Projects/thefirm/`
- Own git repo with full version history
- 34 files: 24 worker playbooks, Gaffer, Protocol, templates, setup script, evolution log
- Evolution log header updated with master location reference
- Sync protocol: project instances (DOMA, slydes, etc.) sync back to this master
- Can be pushed to private GitHub repo as backup

### Why
The Firm was buried inside lostmonster as one template among many. As improvements accumulated (v1.0.0 → v2.0.2), it became clear The Firm needed to be its own source of truth — independent of any single project, accessible from any session, with its own git history. iCloud was considered but lacks version history. A separate `~/Projects/thefirm/` folder gives git history, Claude read/write access from any project, and a clean sync path.

## v2.0.2 — Evolution Log Formalised (2026-02-28)

**Category:** Patch — evolution log elevated to single source of truth with formal rules

### What Changed
- **Append-only rule:** existing entries must never be overwritten or edited. Every change = new version number
- **Every entry versioned:** no exceptions, even small fixes get a version bump
- **Lostmonster sync protocol:** improvements discovered in any project push back to the canonical Firm template in lostmonster. Evolution log is the master, project instances inherit
- **Auto-trigger formalised:** Gaffer must log entries without being asked when trigger events fire
- **"Instructions or rules updated" added as trigger event**

### Why
James flagged that the evolution log had no formal operating rules. It was being used correctly but inconsistently — sometimes updated, sometimes not, no sync-back protocol. Needed to be locked down as the single source of truth for Firm improvements across all projects.

### Files Changed
- `.ai/gaffer/evolution.md` — instructions section rewritten

## v2.0.1 — Gaffer Schema Validation Gate (2026-02-28)

**Category:** Patch — Gaffer review process hardened after production bug

### What Happened
Claim Requests API route selected `sa.slug` from `shadow_agencies` — column doesn't exist. Gaffer reviewed and approved the deliverable without catching it. SQL looked clean structurally but referenced a non-existent column. Page 500'd on load.

### Root Cause
Gaffer review checked patterns, auth, dark mode, parameterised queries — but did not validate SQL column references against actual table schemas. JOIN tables were assumed, not verified.

### Changes
- **Gaffer Review Gate: Schema Validation** — any new API route that queries the database must have its SELECT columns verified against the actual migration files before approval. Not just the primary table — every table in a JOIN.
- **Gaffer Review Gate: Endpoint Smoke Test** — before signing off any new API route, hit it locally (curl/fetch) to confirm it returns 200 with valid shape. Code review alone is not sufficient for SQL correctness.

### Lesson
Code-level review catches pattern and logic errors. Schema errors require cross-referencing migrations. A 2-second curl would have caught this before "APPROVED" was ever said.

## v2.0 — THE FIRM Sync (2026-02-28)

**Category:** Major — full sync with THE FIRM canonical template, 4 new workers, all workers get personas, naming convention aligned

### New Workers (4)
- **STANX** (Stan Padlock — Chief Security Officer) — OWASP Top 10, auth bypass, injection, data exposure. 8 dimensions, 80 points. Checker phase. Replaces the short-lived SECX
- **ALLYX** (Ally Ramp — Chief Accessibility Officer) — WCAG 2.1 AA, semantic HTML, ARIA, keyboard nav, focus management, contrast. 8 dimensions, 80 points. Reviewer phase. Replaces the short-lived AXSX
- **BLAZX** (Blaze Throttle — Chief Performance Officer) — deep perf profiling: bundles, queries, render, network, images, CWV. 7 dimensions. Checker phase. Goes deeper than TERRX's Lighthouse surface scan
- **RIGX** (Rigby Crane — Chief Infrastructure Officer) — builds and wires infra from zero: env, DB, auth, storage, deploy. 6 layers. Builder phase. CONEX monitors, AUDIX audits — Rigby BUILDS

### Promotions (light → full playbook)
- **NIGELX** — promoted from inline light worker to full playbook: `crew/reviewers/NIGELX-nigel-mullins.md`
- **PETRAX** — promoted from inline light worker to full playbook: `crew/planners/PETRAX-petra-stone.md`

### All Workers Get Personas
Every worker now has a name, title, and character. No more "pure process" workers. THE FIRM naming convention: `WORKER-firstname-lastname.md`

| Worker | Persona | Title |
|--------|---------|-------|
| PLANX | Archie Scaffold | Chief Blueprint Officer |
| PRDX | Prue Gauntlet | Chief Requirements Officer |
| APEX | Max Pinnacle | Chief Protocol Officer |
| CRUDX | Mason Forklift | Chief Scaffold Officer |
| DEMX | Dex Carousel | Chief Design Explorer |
| MAPX | Marco Compass | Chief Cartographer |
| UXPATX | Pat Stencil | Chief Pattern Officer |
| CONSX | Connie Mirror | Chief Consistency Officer |
| AUDIX | Audrey Pulse | Chief Health Officer |
| CONEX | Connor Ethernet | Chief Connectivity Officer |
| HARDX | Hardy Anvil | Chief Constants Officer |
| INSPX | Iris Loupe | Chief Inspector |

### Routing Updates
- New signals: `touches-infra` (boosts RIGX, AUDIX, CONEX), `performance-sensitive` (boosts BLAZX), `touches-auth` (boosts STANX)
- STANX mandatory when `touches-api` or `touches-auth` signal present
- ALLYX mandatory when `touches-ui` signal present
- Sign-off sequence expanded: TERRX → STANX → BLAZX → AUDIX → HARDX → GAFFER
- Worker count: 20 → 24 (4 new workers)
- File count: 24 worker playbooks + GAFFER.md

### Files Changed
- All 19 existing playbooks renamed to `WORKER-firstname-lastname.md` convention
- 4 new playbooks copied from THE FIRM template (`lostmonster/framework/templates/the-firm/`)
- 2 promoted playbooks copied from THE FIRM template
- PROTOCOL.md: complete rewrite of roster (24), worker types, phase tables, identity register (all 23 personas), routing matrix, signal boosters, execution graph, mandatory overrides
- GAFFER.md: hierarchy tree, differs table
- CLAUDE.md: worker quick reference table (all 24 listed)
- Deleted: SECX.md, AXSX.md (replaced by canonical STANX, ALLYX from THE FIRM)

## v1.3 — INSPX Pipeline + Evolution Log (2026-02-27)

**Category:** New worker (orchestrator), new infrastructure, new persistent state

- Added INSPX — Automated Inspection Pipeline orchestrator (replaces manual BULLETPROOF steps 2-8)
- Added Checkpoint Mode to 5 review workers (SOFAX, AIDAX, PIXLX, CONSX, NIGELX)
- Created `.ai/gaffer/inspections/` — saved inspection specs for recurring pages
- 3 starter specs: marketing-homepage, search-page, admin-inbox
- Created `.ai/gaffer/evolution.md` — this file. System changelog with semver versioning
- Updated GAFFER.md: Trigger 3 now invokes INSPX, Full Build Phase 3 uses INSPX pipeline
- Updated PROTOCOL.md: BULLETPROOF rewritten, INSPX in roster (20 workers), file structure updated
- Updated CLAUDE.md: INSPX in worker quick ref, evolution.md referenced
- Worker count: 19 → 20 (INSPX added as `orchestrator` type)
- Backfilled evolution history: v1.0.0 (initial), v1.1.0 (Gaffer), v1.2.0 (Brand Chain)

## v1.2 — Brand Compliance Chain (2026-02-26)

**Category:** New gates, new feedback loops, worker uptrains

- Added SOFAX Dimension 11: Brand Compliance & AI Slop (9 checkpoints, 10 points)
- Added DEMX Brand Compliance Gate (5 checks before AIDA scoring)
- Gaffer Trigger 2 now loads Design Guide for UI tasks
- 7 workers updated with brand compliance checks (CODAX, PLANX, CRUDX, DEMX, APEX, AIDAX, PIXLX, CONSX)
- 4 feedback loops wired: Slop→Uptrain, DEMX→Calibration, CONSX→Design Guide, AIDAX→CODAX
- Pre-Present Gate added — no visual work shown without Review Card
- QA Stress Test: 10 adversarial scenarios, all passing
- PIXLX expanded to BC-01 through BC-09
- Semantic Card Boundaries rule added to Design Guide
- `docs/slop-test.md` created as project file (was memory-only)
- CONSX expanded with Dims 8-9 (Page Rhythm, Provenance) and Dim 10 (Dark Mode renumbered)

## v1.1 — The Gaffer (2026-02-25)

**Category:** New worker (meta), architectural change

- Created The Gaffer — Chief Performance Director
- First full audit of all 22 workers
- 6 workers culled (ZPATX, TUCHX, DESKX, RAILWAYX, DEVX, UXAIDA) — suite reduced to 16
- 15 workers fixed (5 RED, 10 AMBER — all Supabase ghost references)
- Created `.ai/gaffer/` persistent state (session-log, debts, calibration)
- 6 automatic triggers defined
- Smart Routing Algorithm created
- Full Gaffer Build (autonomous mode) defined
- Onboarding system (PRD-driven rewrite) defined

## v1.0 — Initial System (2026-01-13)

**Category:** Foundation

- 22 workers created across planning, building, and review phases
- Worker types: planner, executor, auditor, checker, reference
- No central management — each worker operated independently
- No persistent state between sessions
- No scoring calibration or feedback loops
- Workers: CODAX, PLANX, PRDX, PLANX-SEO-GEO, PETRAX, RAPIX, CRUDX, DEMX, MAPX, APEX, UXPATX, SOFAX, AIDAX, PIXLX, CONSX, NIGELX, TERRX, AUDIX, CONEX, HARDX, ZPATX, TUCHX, DESKX, RAILWAYX, DEVX, UXAIDA

---

*Maintained by The Gaffer. Updated after any system change.*
