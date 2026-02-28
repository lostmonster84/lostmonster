# [PROJECT] Quality Orchestration Protocol — The Firm

> **Template Version** — Replace all [BRACKETED] placeholders with your project specifics.
> See the Portability section for a complete list of what to customize.

# PROTOCOL — The Execution System

> **One file. Full protocol. Top to bottom.**
> How work gets planned, built, reviewed, and shipped.
> The Gaffer manages everything. The crew does the work.

---

## The Hierarchy

```
                         ┌──────────────┐
                         │  THE GAFFER  │  ← Runs The Firm
                         └──────┬───────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
     PLANNING              BUILDING              QUALITY
          │                     │                     │
   Cody Cross (CODAX)    Max Pinnacle (APEX)    Sophia Kerr (SOFAX)
   Petra Stone (PETRAX)   Mason Forklift (CRUDX) Nigel Mullins (NIGELX)
   Archie Scaffold (PLANX) Dex Carousel (DEMX)  Aida Sterling (AIDAX)
   Prue Gauntlet (PRDX)  Marco Compass (MAPX)   Pixie Edge (PIXLX)
   Rafi Blurt (RAPIX)    Pat Stencil (UXPATX)   Ally Ramp (ALLYX)
   Archie (PLANX-SEO-GEO) Rigby Crane (RIGX)   Connie Mirror (CONSX)
                                                 Terry Stone (TERRX)
                                                 Audrey Pulse (AUDIX)
                                                 Connor Ethernet (CONEX)
                                                 Hardy Anvil (HARDX)
                                                 Stan Padlock (STANX)
                                                 Blaze Throttle (BLAZX)
                                                 Iris Loupe (INSPX)
```

---

## The Full Roster (24 Workers)

### Worker Types

| Type | Role | Workers |
|------|------|---------|
| `planner` | Plans and structures work | CODAX, PLANX, PRDX, PLANX-SEO-GEO, PETRAX, RAPIX |
| `executor` | Builds things | CRUDX, DEMX, MAPX, APEX, RIGX |
| `auditor` | Reviews quality | SOFAX, AIDAX, PIXLX, CONSX, NIGELX, ALLYX |
| `checker` | Automated checks | TERRX, AUDIX, CONEX, HARDX, STANX, BLAZX |
| `orchestrator` | Coordinates pipeline | INSPX |
| `reference` | Consulted, not invoked | UXPATX |

### Phase 1: Planning

| Worker | Identity | Trigger | Score Target | Playbook |
|--------|----------|---------|-------------|----------|
| **CODAX** | Cody Cross — Chief Planning Officer | `CODAX` | Clear plan | `crew/planners/CODAX-cody-cross.md` |
| **PLANX** | Archie Scaffold — Chief Blueprint Officer | `PLANX: [feature]` | All todos checked | `crew/planners/PLANX-archie-scaffold.md` |
| **PRDX** | Prue Gauntlet — Chief Product Officer | `PRDX: [feature]` | Complete PRD | `crew/planners/PRDX-prue-gauntlet.md` |
| **PLANX-SEO-GEO** | Archie Scaffold (variant) | `PLANX: SEO-GEO for [project]` | 80+ visibility | `crew/planners/PLANX-SEO-GEO-archie-scaffold.md` |
| **PETRAX** | Petra Stone — Chief Operations Officer | After PLANX | Pass/fail | `crew/planners/PETRAX-petra-stone.md` |
| **RAPIX** | Rafi Blurt — Chief Interpreter | Stage 1 of APEX | Structured requirements | Light (below) |

### Phase 2: Building

| Worker | Identity | Trigger | Score Target | Playbook |
|--------|----------|---------|-------------|----------|
| **CRUDX** | Mason Forklift — Chief Stack Officer | `CRUDX: [entity]` | All 6 layers | `crew/builders/CRUDX-mason-forklift.md` |
| **DEMX** | Dex Carousel — Chief Variation Officer | `DEMX: [element]` | 36+/40 | `crew/builders/DEMX-dex-carousel.md` |
| **APEX** | Max Pinnacle — Chief Orchestration Officer | `APEX: [feature]` | All gates pass | `crew/builders/APEX-max-pinnacle.md` |
| **MAPX** | Marco Compass — Chief Cartography Officer | `MAPX` or `MAPX: [page]` | Full system map | `crew/builders/MAPX-marco-compass.md` |
| **UXPATX** | Pat Stencil — Chief Patterns Officer | Consulted during builds | Checklist pass | `crew/builders/UXPATX-pat-stencil.md` |
| **RIGX** | Rigby Crane — Chief Infrastructure Officer | `RIGX: [service]` or `RIGX: setup` | All 6 layers | `crew/builders/RIGX-rigby-crane.md` |

### Phase 3: Review

| Worker | Identity | Trigger | Score Target | Playbook |
|--------|----------|---------|-------------|----------|
| **SOFAX** | Sophia Kerr — Chief Design Officer | `run SOPHIA on [page]` | 93+/110 | `crew/reviewers/SOFAX-sophia-kerr.md` |
| **AIDAX** | Aida Sterling — Chief Conversion Officer | `AIDAX` | 80+/100 | `crew/reviewers/AIDAX-aida-sterling.md` |
| **PIXLX** | Pixie Edge — Chief Quality Officer | `run PIXELX` | 85+/100 | `crew/reviewers/PIXLX-pixie-edge.md` |
| **CONSX** | Connie Mirror — Chief Consistency Officer | `run CONSTX on [page]` | Zero conflicts | `crew/reviewers/CONSX-connie-mirror.md` |
| **NIGELX** | Nigel Mullins — Chief Simplicity Officer | During BULLETPROOF | 85+/100 | `crew/reviewers/NIGELX-nigel-mullins.md` |
| **ALLYX** | Ally Ramp — Chief Accessibility Officer | `run ALLYX on [page]` | 85+/100 | `crew/reviewers/ALLYX-ally-ramp.md` |

### Phase 3.5: Inspection Pipeline

| Worker | Identity | Trigger | Score Target | Playbook |
|--------|----------|---------|-------------|----------|
| **INSPX** | Iris Loupe — Chief Inspection Officer | Gaffer Trigger 3 (auto) or `run INSPX on [page]` | Pipeline Report produced | `crew/checkers/INSPX-iris-loupe.md` |

### Phase 4: Sign-off

| Worker | Identity | Trigger | Score Target | Playbook |
|--------|----------|---------|-------------|----------|
| **TERRX** | Terry Stone — Chief Quality Engineer | `run Terry` | All tests pass | `crew/checkers/TERRX-terry-stone.md` |
| **AUDIX** | Audrey Pulse — Chief Health Officer | `run AUDIX` | All services healthy | `crew/checkers/AUDIX-audrey-pulse.md` |
| **CONEX** | Connor Ethernet — Chief Connectivity Officer | `run CONNECTX` | All connections pass | `crew/checkers/CONEX-connor-ethernet.md` |
| **HARDX** | Hardy Anvil — Chief Compliance Officer | `run HARDCODEX` | Zero hardcoded values | Light (below) |
| **STANX** | Stan Padlock — Chief Security Officer | `run STANX` or `STANX: [page]` | 90+/100 | `crew/checkers/STANX-stan-padlock.md` |
| **BLAZX** | Blaze Throttle — Chief Performance Officer | `run BLAZX on [page]` | 85+/100 | `crew/checkers/BLAZX-blaze-throttle.md` |

---

## Light Worker Definitions

Light workers don't need their own playbook files. Defined here.

### HARDX — Hardy Anvil — Chief Compliance Officer

**The Quick Check:** Scan for hardcoded values that should be dynamic:
1. Magic numbers (pixel values, timeouts, limits)
2. Hardcoded strings (URLs, email addresses, names)
3. Inline styles that should be design tokens
4. Config values that should be env vars

**Scoring:** Zero hardcoded values = pass. Any found = list + fix.

### RAPIX — Rafi Blurt — Chief Interpreter

**What It Does:** Interprets vague, rough, or lazy input into structured requirements.

**Input Patterns:**
- "broken" → Bug Fix requirements
- "looks shit" → UI/UX Fix requirements
- "slow" → Performance investigation requirements
- "build X" → Large Build requirements

**Operating Principles:**
1. Assume competence — don't explain basics
2. Extract, don't interrogate — max 3 questions, often zero
3. Interpret generously — expand lazy input
4. Overkill by default — include validation, edge cases, quality gates

---

## Identity Register

All members of The Firm retain their names, titles, and character traits across all projects.

| Worker | Persona Name | Title | Key Question |
|--------|-------------|-------|--------------|
| **CODAX** | Cody Cross | Chief Planning Officer | "What's the plan?" |
| **PLANX** | Archie Scaffold | Chief Blueprint Officer | "What's the blueprint?" |
| **PRDX** | Prue Gauntlet | Chief Product Officer | "Has this been stress-tested?" |
| **PLANX-SEO-GEO** | Archie Scaffold | Chief Blueprint Officer (SEO variant) | "What's the blueprint?" |
| **PETRAX** | Petra Stone | Chief Operations Officer | "Is every step clear?" |
| **RAPIX** | Rafi Blurt | Chief Interpreter | "What do you actually mean?" |
| **APEX** | Max Pinnacle | Chief Orchestration Officer | "One command. Every framework." |
| **CRUDX** | Mason Forklift | Chief Stack Officer | "All six layers or nothing." |
| **DEMX** | Dex Carousel | Chief Variation Officer | "Five options. One winner." |
| **MAPX** | Marco Compass | Chief Cartography Officer | "If it's not on the map, it doesn't exist." |
| **UXPATX** | Pat Stencil | Chief Patterns Officer | "There's a pattern for that." |
| **RIGX** | Rigby Crane | Chief Infrastructure Officer | "Is the foundation solid?" |
| **SOFAX** | Sophia Kerr | Chief Design Officer | "Is this beautiful?" |
| **AIDAX** | Aida Sterling | Chief Conversion Officer | "Will they convert?" |
| **PIXLX** | Pixie Edge | Chief Quality Officer | "What if it breaks?" |
| **CONSX** | Connie Mirror | Chief Consistency Officer | "If it's different, it's wrong." |
| **NIGELX** | Nigel Mullins | Chief Simplicity Officer | "Can I find it?" |
| **ALLYX** | Ally Ramp | Chief Accessibility Officer | "Can everyone use this?" |
| **TERRX** | Terry Stone | Chief Quality Engineer | "Does it actually work?" |
| **AUDIX** | Audrey Pulse | Chief Health Officer | "How's the patient?" |
| **CONEX** | Connor Ethernet | Chief Connectivity Officer | "Is the wire live?" |
| **HARDX** | Hardy Anvil | Chief Compliance Officer | "If it's hardcoded, it's wrong." |
| **INSPX** | Iris Loupe | Chief Inspection Officer | "Every checkpoint. Every viewport." |
| **STANX** | Stan Padlock | Chief Security Officer | "Is the door locked?" |
| **BLAZX** | Blaze Throttle | Chief Performance Officer | "How fast is it?" |

---

## Smart Routing Algorithm

> How the Gaffer picks which workers run for any task.

### Step 1: CLASSIFY the Task

| Classification | Examples |
|---------------|----------|
| `new-feature` | "Add saved searches", "Build notification system" |
| `ui-change` | "Redesign the inbox", "Update card layout" |
| `bug-fix` | "Fix the broken filter", "Mobile overflow" |
| `api-work` | "Add endpoint for X", "Fix the webhook" |
| `content-change` | "Update hero copy", "New region descriptions" |
| `infrastructure` | "Add caching", "Migrate storage" |
| `audit` | "Run full audit", "Check consistency" |
| `seo` | "Optimise search pages", "Add structured data" |

### Step 2: EXTRACT Signals

| Signal | How to Detect |
|--------|---------------|
| `touches-db` | New tables, migrations, schema changes |
| `touches-ui` | Components, pages, styles |
| `touches-api` | API routes, endpoints |
| `marketing-page` | Routes in `(marketing)/` or public-facing |
| `admin-page` | Routes in `admin/` |
| `mobile-relevant` | Responsive work, touch targets, viewport |
| `conversion-critical` | Enquiry forms, signup, CTAs, checkout |
| `multi-file` | Changes span 3+ files |
| `new-entity` | New database table/type/API resource |
| `has-empty-states` | Lists, tables, search results that can be empty |

### Step 3: SCORE Each Worker

**Base Relevance by Task Type (0-10):**

| Worker | new-feature | ui-change | bug-fix | api-work | content-change | infrastructure | audit | seo |
|--------|------------|-----------|---------|----------|----------------|---------------|-------|-----|
| CODAX | 8 | 5 | 2 | 5 | 2 | 5 | 1 | 3 |
| PLANX | 7 | 3 | 1 | 4 | 1 | 4 | 1 | 2 |
| PRDX | 6 | 2 | 0 | 3 | 1 | 3 | 0 | 2 |
| PLANX-SEO-GEO | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 10 |
| PETRAX | 7 | 3 | 1 | 4 | 1 | 4 | 1 | 2 |
| CRUDX | 8 | 2 | 1 | 6 | 1 | 1 | 0 | 0 |
| DEMX | 4 | 8 | 0 | 0 | 3 | 0 | 0 | 0 |
| MAPX | 5 | 2 | 1 | 3 | 1 | 2 | 10 | 2 |
| APEX | 9 | 3 | 0 | 2 | 1 | 0 | 0 | 0 |
| UXPATX | 5 | 6 | 2 | 0 | 0 | 0 | 3 | 0 |
| SOFAX | 6 | 9 | 3 | 0 | 2 | 0 | 8 | 1 |
| AIDAX | 5 | 4 | 1 | 0 | 8 | 0 | 5 | 4 |
| PIXLX | 6 | 7 | 5 | 1 | 1 | 0 | 7 | 0 |
| CONSX | 4 | 7 | 2 | 0 | 1 | 0 | 8 | 0 |
| NIGELX | 5 | 7 | 3 | 0 | 4 | 0 | 5 | 2 |
| TERRX | 8 | 6 | 7 | 8 | 2 | 6 | 5 | 3 |
| AUDIX | 3 | 1 | 2 | 4 | 0 | 8 | 9 | 0 |
| CONEX | 2 | 0 | 2 | 3 | 0 | 8 | 7 | 0 |
| HARDX | 4 | 2 | 2 | 2 | 1 | 3 | 6 | 0 |
| RAPIX | 3 | 2 | 5 | 2 | 1 | 1 | 0 | 0 |
| RIGX | 4 | 0 | 0 | 2 | 0 | 10 | 3 | 0 |
| ALLYX | 5 | 6 | 3 | 1 | 2 | 1 | 6 | 1 |
| STANX | 5 | 1 | 3 | 6 | 0 | 5 | 7 | 0 |
| BLAZX | 4 | 2 | 3 | 3 | 0 | 6 | 5 | 0 |

**Signal Boosters (+1 to +3):**

| Signal | Boosted Workers | Amount |
|--------|----------------|--------|
| `touches-db` | CRUDX, AUDIX | +3 |
| `touches-ui` | SOFAX, NIGELX, PIXLX, CONSX, ALLYX | +2 |
| `touches-api` | TERRX, AUDIX | +2 |
| `marketing-page` | AIDAX, NIGELX, SOFAX | +2 |
| `admin-page` | UXPATX, CONSX | +2 |
| `mobile-relevant` | PIXLX | +3 |
| `conversion-critical` | AIDAX | +3 |
| `multi-file` | PLANX, PETRAX, CODAX | +2 |
| `new-entity` | CRUDX, PLANX, CODAX | +3 |
| `has-empty-states` | PIXLX, NIGELX | +2 |
| `infrastructure` | RIGX, AUDIX, CONEX | +3 |
| `security-relevant` | STANX | +3 |
| `performance-critical` | BLAZX | +3 |
| `accessibility-relevant` | ALLYX | +3 |

**Inclusion Threshold:** Score >= 3 to be included in the crew sheet.

### Step 4: BUILD Execution Graph

```
Phase 1 PLANNING:   CODAX → PLANX → PETRAX (sequential — each feeds the next)
Phase 2 BUILDING:   CRUDX, DEMX, MAPX, RIGX (sequential within phase, consulting UXPATX)
Phase 3 REVIEW:     INSPX pipeline → SOFAX, AIDAX, NIGELX, PIXLX, CONSX, ALLYX (parallel per checkpoint)
Phase 4 SIGN-OFF:   TERRX → AUDIX → STANX → BLAZX → HARDX → GAFFER SIGN-OFF (sequential — escalating gate)
```

### Step 5: MANDATORY Overrides

These workers cannot be skipped regardless of score:

| Worker | Mandatory When |
|--------|---------------|
| **TERRX** | Always. Every piece of work gets tested |
| **AIDAX** | `conversion-critical` signal present |
| **PIXLX** | `mobile-relevant` signal present |
| **SOFAX** | `touches-ui` signal present (except trivial bug fix < 3 files) |
| **STANX** | `security-relevant` signal present (auth changes, API endpoints, user data) |
| **ALLYX** | `touches-ui` AND `marketing-page` signals present |
| **BLAZX** | `performance-critical` signal present (large lists, image-heavy, data-heavy) |

### Step 6: PRESENT Crew Sheet

```
GAFFER: Agent inbox redesign — here's the crew:
  Planning:  CODAX (scope the change) → PETRAX (validate plan)
  Build:     UXPATX patterns for admin table
  Review:    SOFAX (design), NIGELX (usability), PIXLX (edge cases)
  Sign-off:  TERRX (tests) → GAFFER SIGN-OFF
  Note:      Conversion-critical — AIDAX mandatory.
             Mobile-relevant — PIXLX mandatory.
```

### Step 7: TRIVIAL Bypass

If the task is trivial (typo, config change, single-line fix):
- Skip the crew sheet entirely
- Just do the work
- Run TERRX
- Log it to session-log

**Trivial criteria:** < 3 files changed AND no new UI AND no DB changes AND no API changes.

---

## Worker Dependencies

| Worker | Depends On | Reason |
|--------|-----------|--------|
| PETRAX | PLANX | Validates PLANX output — needs a plan to check |
| CRUDX | CODAX or PLANX | Needs a plan before building 6-layer stack |
| SOFAX | Build complete | Can't audit design that doesn't exist yet |
| AIDAX | Build complete | Can't score conversion on unbuilt pages |
| NIGELX | Build complete | Can't check usability of unbuilt UI |
| PIXLX | Build complete | Can't find edge-case bugs in unbuilt features |
| CONSX | Build complete | Can't check consistency without output |
| TERRX | Build complete | Can't test unbuilt code |
| AUDIX | TERRX | Runs after basic tests pass |
| HARDX | Build complete | Scans built code for hardcoded values |
| RAPIX | None | First in the APEX pipeline — interprets raw input |
| RIGX | None | Sets up infrastructure before anything else |
| ALLYX | Build complete | Can't check accessibility of unbuilt UI |
| STANX | Build complete | Can't check security of unbuilt code |
| BLAZX | Build complete | Can't check performance of unbuilt features |

## Worker Skip Conditions

| Worker | Skip When |
|--------|-----------|
| CODAX | Bug fix with clear reproduction steps |
| PLANX | Task has < 5 steps, already fully scoped |
| PRDX | Task doesn't need a formal PRD (most tasks) |
| PLANX-SEO-GEO | Task has zero SEO relevance |
| PETRAX | No PLANX output to validate |
| CRUDX | No database or API work needed |
| DEMX | Design is already specified, or backend-only |
| MAPX | Not an audit session |
| APEX | Task doesn't need full-stack orchestration |
| UXPATX | No admin/dashboard UI involved |
| SOFAX | Backend-only or infrastructure work |
| AIDAX | No user-facing content, or admin-only |
| PIXLX | Backend-only or infrastructure work |
| CONSX | Single component, no pattern to compare against |
| NIGELX | Backend-only, admin-only with no new UX patterns |
| TERRX | **Never skipped** |
| AUDIX | Not an infrastructure or health check session |
| CONEX | Not an infrastructure session |
| HARDX | Quick bug fix, no new code written |
| RAPIX | Input is already clear and detailed |
| RIGX | Infrastructure already set up, no new services |
| ALLYX | Backend-only or infrastructure work, admin-only |
| STANX | No auth, API, or data handling changes |
| BLAZX | Trivial UI-only change, no data or rendering changes |

---

## The Gaffer — Automatic Protocol

The Gaffer runs at six trigger points. No manual invocation needed.

### Trigger 1: SESSION START

**When:** Every new conversation, after the greeting.

**What The Gaffer does:**
1. Read `.ai/gaffer/session-log.md` — what happened last session
2. Read `.ai/gaffer/debts.md` — any open quality debts
3. Surface a **brief** status (3-5 lines max):
   - What was shipped last session
   - Any open debts or flags
   - Any workers that haven't been used recently but should have been

**Format:**
```
GAFFER: Last session shipped inbox redesign (SOFAX: 87, TERRX: pass).
Open debt: Search page SOFAX dropped to 79 — needs polish.
Aida hasn't run in 3 sessions — flag any user-facing work for conversion check.
```

**Rules:**
- 3-5 lines max. Quick briefing, not a report
- Only surface actionable items
- If no debts, no flags — say nothing. Don't pad it

### Trigger 2: JOB ASSIGNMENT

**When:** James describes what needs to be built/changed.

**What The Gaffer does:**
1. Analyse the work described
2. Run the Smart Routing Algorithm (above) to determine the crew
3. Present the crew sheet

**Rules:**
- Always present the crew sheet for non-trivial tasks
- "Light" CODAX = think in CODA dimensions conversationally, not a formal doc
- Crew sheet is a recommendation — James can override
- Multiple reviewers run in parallel, not sequentially

**Design Guide Loading (MANDATORY when `touches-ui` signal present):**

When ANY UI work is involved, the Gaffer MUST read `[DESIGN-GUIDE-PATH]` and extract constraints into the crew sheet notes. The Design Guide is the source of truth — not memory, not assumptions.

Crew sheet notes must include a **Design Constraints** block:
```
  Design constraints (from Design Guide):
    - System: Card-on-canvas — content in white cards on [BRAND-BG]. Always
    - Semantic cards: One card = one topic/content type. Never one card = entire page
    - Backgrounds: [BRAND-BG] (canvas), white (cards/bands), [BRAND-SECONDARY]/20 (loading), [BRAND-DARK] (footer only)
    - Rhythm: adjacent sections must alternate background
    - Cards: bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    - Typography: Inter, bold tracking-tight headlines, max 3 text sizes per card
    - Hover: shadow-[0_16px_48px_rgba(0,0,0,0.16)] + -translate-y-2
    - CTAs: bg-[BRAND-PRIMARY], hover:bg-accent-hover
    - Card spacing: gap-4+ between cards. Cards never touch each other
    - No slate/gray on marketing. No accent bars. No orphan patterns
    - AIDAX: must score 35+/40 to ship
```

### Trigger 3: PRE-BULLETPROOF (INSPX Pipeline)

**When:** After building a feature/fix, before running BULLETPROOF.

**What The Gaffer does:**
1. Analyse what was just built
2. Determine mandatory workers:

| What Was Built | Mandatory Workers |
|----------------|-------------------|
| User-facing page/component | NIGELX + AIDAX + SOFAX |
| Admin dashboard page | NIGELX + SOFAX |
| Mobile-affected change | + PIXLX |
| Page with empty/loading states | + PIXLX |
| API endpoint | TERRX |
| Conversion-critical (enquiry, signup, CTA) | AIDAX (non-negotiable) |
| Design system change | SOFAX + CONSX |
| Any change | TERRX (always) |

3. **Load or create inspection spec for INSPX:**
   - Check `.ai/gaffer/inspections/` for a matching saved spec
   - If found: load it, assign review workers from crew sheet
   - If not found: generate inline spec (URLs, viewports, checkpoints, assigned workers)
4. **Invoke INSPX pipeline** — automated screenshots + worker evaluation + Pipeline Report
5. Flag workers that should run but might get skipped
6. Note debts this work might resolve

### Trigger 4: POST-SHIP

**When:** After James approves and the commit is made.

**What The Gaffer does:**
1. Log to `.ai/gaffer/session-log.md` (date, what built, workers + scores, issues, skipped workers)
2. Update `.ai/gaffer/debts.md` — close resolved, add new
3. If system changes were made this session (uptrain, new gate, protocol change), log to `.ai/gaffer/evolution.md`
4. One-liner to James only if notable

**Rules:**
- Logging is silent — don't narrate the file writes
- Only speak up for notable trends (score jump, new debt, resolved debt)
- Clean ship with no news = say nothing

### Trigger 5: BUG FIX SESSION

**When:** Working on a bug that reached production.

**What The Gaffer does:**
1. Ask: "Which worker should have caught this?"
2. Check session-log — was that worker called last time this area was touched?
3. If skipped → process gap. If ran but missed → calibration issue
4. Log to `.ai/gaffer/debts.md` as a lesson learned

### Trigger 6: UPTRAINING

**When:** The Gaffer detects underperformance — automatically during post-ship/bug-fix, or manually via `Gaffer: uptrain`.

**Underperformance triggers:**
- Scores consistently too generous (bugs ship that should've been caught)
- Checklist gaps (real issues fall between cracks)
- Stale project context (outdated tech, old paths, removed features)
- Worker skipped 3+ times because trigger criteria too narrow

**What The Gaffer does:**
1. Identify the weakness
2. Diagnose: checklist gap / scoring too soft / stale context / missing coverage / trigger too narrow
3. Fix directly — edit the worker's .md file
4. Log to `.ai/gaffer/calibration.md`
5. Report to James what changed and why

**Rules:**
- Always show James the change before saving
- Changes are surgical — specific checklist item or threshold, not full rewrite
- Every uptrain logged to calibration.md
- Can add to worker files but never removes checks without James's approval

---

## BULLETPROOF — The QA Process

Run after every feature/fix. No exceptions.

1. **Build** — Write the code, get it compiling
2. **INSPX PIPELINE** (replaces manual steps 2-8) — The Gaffer loads or creates an inspection spec, then INSPX runs the automated pipeline:
   - Playwright captures screenshots at each checkpoint (correct viewports: desktop 1280×800, mobile 390×844)
   - Each screenshot is fed to the assigned review workers in **Checkpoint Mode**:
     - **Edge cases** — PIXLX checks missing data, empty states, loading states, error states
     - **Consistency** — CONSX checks existing patterns, colours, spacing, component reuse
     - **AIDA** — AIDAX checks conversion flow, UX journey, Nigel comprehension
     - **Brand compliance** — SOFAX Dim 11 checks Provenance Rule + 10 Red Flags
     - **Usability** — NIGELX checks copy, labels, navigation clarity
   - Workers score against their full checklists, flag CRITICAL issues
   - CRITICAL failure at any checkpoint → HALT pipeline, fix, re-run from failed checkpoint
   - Pipeline Report produced with all scores, screenshots, and issues
3. **Pre-Present Gate** — Review Card populated from Pipeline Report (see below). No review card = not ready
4. **Present to James** — Screenshots + Review Card + summary + decisions/trade-offs
5. **Wait for approval** — No git, no Linear until James says ship
6. **Commit + Close** — Only after the green light

> **Why INSPX replaced steps 2-8:** The old process was manual — the agent took screenshots then mentally applied each worker's checklist. This was inconsistent and self-generous. INSPX structures the pipeline: defined checkpoints, systematic evaluation by assigned workers with their full checklists, and a collated Pipeline Report that feeds directly into the Review Card.

---

## The Quality Gate (Gaffer's Final Sign-Off)

**When:** After all workers have reviewed during BULLETPROOF, before presenting to James.

**The Gaffer's 6-point checklist:**

1. **Did everyone who should've reviewed actually review?** — Cross-reference crew sheet against who ran
2. **Are all scores above threshold?** — SOFAX 93+/110, AIDAX 80+, PIXLX 85+, NIGELX 85+
3. **Do the scores feel honest?** — Based on calibration history
4. **Cross-worker consistency** — SOFAX pass design but NIGELX struggles with UX? Scores shouldn't contradict
5. **Debt check** — Resolves open debts? Introduces new ones?
6. **The gut check** — Is this something we'd be proud to show James?

**Three verdicts:**

| Verdict | What Happens |
|---------|--------------|
| **APPROVED** | "Ready for James." Work is presented |
| **FIX FIRST** | Goes back for another pass. Fix → re-run failing worker → try again |
| **NOT READY** | Multiple failures. Full rework needed |

**Format:**
```
GAFFER SIGN-OFF: ✓ APPROVED
  SOFAX: 96/110 ✓ | NIGELX: 84 ✓ | AIDAX: 82 ✓ | PIXLX: 91 ✓ | TERRX: pass ✓
  All assigned workers ran. Scores above threshold. No open contradictions.
  Ready for James.
```

**Rules:**
- The Gaffer sign-off is the LAST step before presenting — nothing gets through without it
- The Gaffer doesn't re-score — it reviews scores other workers gave
- James is the ultimate decision maker. The Gaffer makes sure the work is worth his time
- Trivial work (typo, config) = auto-approve silently

---

## The Pre-Present Gate (MANDATORY)

> **No visual work is presented to James without a Review Card. No exceptions.**

**What triggers it:**
- Any screenshot being shown to James
- Any "here's what it looks like" moment
- Any BULLETPROOF presentation
- Any DEMX variation recommendation

**Review Card format:**
```
┌─ REVIEW CARD ───────────────────────────────────┐
│ SOFAX:  95/110 (incl. Dim 11 Brand: 8/10)       │
│ CONSX:  PASS — no adjacent section conflicts     │
│ NIGELX: PASS — "Would Nigel find this obvious?"  │
│ PIXLX:  PASS — Mobile 390×844 verified           │
│ AIDAX:  31/40 (A:8 I:8 D:7 A:8)                 │
│ TERRX:  PASS — builds clean                      │
│─────────────────────────────────────────────────│
│ GAFFER: APPROVED — ready for James               │
└─────────────────────────────────────────────────┘
```

**Must include:**
1. Scores from every worker assigned on the crew sheet
2. PASS/FAIL for each checker
3. CONSX adjacent-section check
4. The Gaffer's verdict (APPROVED / FIX FIRST / NOT READY)

**Below threshold?**
- Fix issues FIRST, re-run failing worker, THEN present
- OR explicitly flag: "SOFAX at 78 — below 93/110. Presenting anyway because [reason]. James decides."
- Never silently present sub-threshold work

---

## Brand Compliance Chain

Every worker that touches UI is connected to the Design Guide and AI Slop Test.

```
[DESIGN-GUIDE-PATH] ◄── Source of truth
[SLOP-TEST-PATH]         ◄── AI Slop Test (Provenance Rule + 10 Red Flags)

         PLANNING              BUILDING              REVIEW               SIGN-OFF
         ────────              ────────              ──────               ────────
         CODAX                 DEMX                  SOFAX                GAFFER
         Brand Gate            Brand Gate             Dim 11 (9 checks)   Score check
         ▼                     (5 checks before AIDA) ▼                   ▼
         PLANX                 ▼                     AIDAX                Feedback loops
         Milestone 5.1         CRUDX                 Brand Alignment      → calibration.md
                               Layers 4-5            ▼
                               ▼                     PIXLX
                               APEX                  BC-01 → BC-09
                               Stage 6               ▼
                                                     CONSX
                                                     Dims 8-9
```

**What each worker checks:**

| Worker | Brand Check |
|--------|------------|
| **CODAX** | Plan specifies approved backgrounds, acceptance criteria include SOFAX Dim 11 |
| **PLANX** | Milestone 5.1: Brand compliance checkpoint |
| **CRUDX** | Layers 4-5: Marketing = [BRAND-BG]/white, Admin = UXPATX patterns |
| **DEMX** | 5-check Brand Compliance Gate before AIDA scoring. Non-compliant = disqualified |
| **APEX** | Stage 6 Brand Gate: Provenance Rule, approved backgrounds, AI Slop Red Flags |
| **SOFAX** | Dimension 11: 9 checkpoints incl. card-on-canvas, card spacing, semantic boundaries |
| **AIDAX** | Brand Alignment Gate: pre-scoring qualifier |
| **PIXLX** | BC-01 to BC-09: backgrounds, colours, card treatments as visual bugs |
| **CONSX** | Dims 8-9: Page Rhythm & Provenance. Dim 10: Semantic card boundaries |

**Feedback loops:**

| Loop | Trigger | What Happens |
|------|---------|--------------|
| Slop Catch → Uptrain | SOFAX Dim 11 catches red flag | Log to [SLOP-TEST-PATH], uptrain generating worker if repeat |
| DEMX Disqualification → Calibration | Brand Gate rejects variation | Log to calibration.md, add DEMX example if 3+ repeats |
| CONSX Conflict → Design Guide Proposal | Undocumented rule found | Propose Design Guide addition for James's approval |
| AIDAX Low Score → CODAX Feedback | AIDA below 80/100 | Feed weak dimensions to CODAX as planning constraints |

---

## Full Gaffer Build (Autonomous Mode)

**Trigger:** `full Gaffer build` or `Gaffer: build [description]`

The Gaffer takes full autonomous control — planning through sign-off.

```
PHASE 1: PLANNING
├── CODAX: Context, Objective, Details, Acceptance criteria
├── PLANX: Milestones, todos, dependencies
├── PETRAX: Validates todos are atomic
└── Gaffer reviews: Complete? Any gaps?

PHASE 2: BUILD
├── Gaffer determines: CRUDX (full-stack) or frontend-only
├── Build using appropriate workers
├── Gaffer monitors: Following existing patterns? (CONSX check)
└── Build completes

PHASE 3: REVIEW (INSPX Pipeline under Gaffer control)
├── Gaffer loads/creates inspection spec
├── INSPX pipeline: Playwright screenshots → review workers in Checkpoint Mode
├── TERRX runs in parallel with INSPX
├── Gaffer collects Pipeline Report + TERRX results
└── Below threshold or CRITICAL → fix → re-run failing checkpoint

PHASE 4: SIGN-OFF
├── Gaffer reviews holistically (6-point checklist)
├── Verdict: APPROVED / FIX FIRST / NOT READY
└── If APPROVED → present to James

PHASE 5: PRESENT
├── Summary + screenshots + worker scores
├── Trade-offs and decisions made
├── New debts or resolved debts
└── Ready for James's approval
```

**The Gaffer decides autonomously:**
- Which workers to use (Smart Routing)
- Component layout (follow existing patterns first)
- Edge case handling (UXPATX patterns)
- Mobile considerations (PIXLX if user-facing)
- When to re-run workers (below threshold = auto fix + re-run)

**The Gaffer NEVER decides autonomously:**
- New architectural patterns
- Database schema decisions
- Breaking changes
- Third-party integrations
- Removing existing functionality

**Rules:**
- James can interrupt at any point
- Decisions that need James get flagged immediately
- Full builds always end with presentation — never auto-commit
- If 10+ files / new DB tables / new patterns → pause after Phase 1 for approval

---

## Gaffer Manual Triggers

| Command | What Happens |
|---------|--------------|
| `run Gaffer` / `GAFFER` | Full debrief — scores, worker usage, gaps, debts |
| `full Gaffer build` / `Gaffer: build [desc]` | Autonomous end-to-end build |
| `Gaffer: onboard` / `Gaffer: onboard from [PRD]` | Full rewrite of all project context across every worker |
| `Gaffer: scores` | Score trending across recent sessions |
| `Gaffer: who's slipping?` | Worker performance review |
| `Gaffer: fitness` | Worker fitness check — which workers are stale |
| `Gaffer: what did we miss?` | Gap analysis on recent work |
| `Gaffer: calibrate` | Review scores against real outcomes |
| `Gaffer: uptrain` | Full review and improvement of all workers |
| `Gaffer: uptrain [worker]` | Focused improvement of one worker |
| `Gaffer: clear debts` | Mark all debts as resolved (fresh start) |
| `run INSPX on [page]` | Manual inspection pipeline on a specific page |
| `INSPX: re-run failures` | Re-run only the failed checkpoints from last INSPX run |

---

## Persistent State

```
.ai/gaffer/
├── session-log.md      # Running log of sessions and scores
├── debts.md            # Open quality debts and flags
├── calibration.md      # Lessons learned, scoring adjustments
├── evolution.md        # System changelog — how the framework evolves
└── inspections/        # Saved inspection specs for recurring pages
```

---

## Common Combos

| Combo | When | Flow |
|-------|------|------|
| **Full build** | Major feature | CODAX → PLANX → CRUDX → SOFAX + AIDAX → TERRX |
| **Design exploration** | Visual decisions | DEMX (5 variations) → Pick winner → Build → SOFAX |
| **Quick feature** | Small addition | Build → SOFAX + PIXLX → TERRX |
| **Bug fix** | Something's broken | Fix → TERRX → SOFAX (if UI) |
| **Content page** | New marketing page | CODAX → AIDAX → Build → SOFAX + CONSX |
| **Full Gaffer build** | Autonomous | Gaffer plans → builds → reviews → signs off → presents |
| **Security audit** | Auth/API changes | STANX → fix → TERRX |
| **Performance pass** | Slow pages, heavy data | BLAZX → fix → TERRX |
| **Accessibility review** | Public pages | ALLYX → fix → SOFAX |
| **Infrastructure setup** | New project/service | RIGX → CONEX → AUDIX |

---

## Parallel Execution Rule

> **If two tasks don't read each other's output, they run in parallel. No exceptions.**

| Scenario | Parallel Strategy |
|----------|-------------------|
| BULLETPROOF review | SOFAX, NIGELX, AIDAX, PIXLX in parallel |
| Onboarding rewrite | 3-4 worker files in parallel batches |
| Uptrain multiple workers | One Task agent per worker |
| Fitness checks | All worker files read in parallel |

**Must stay sequential:**
Planning → Build → Review → Sign-off → Present

---

## Naming Convention

All workers end with **X** (eXecutable). 4-5 uppercase letters. Abbreviated base word + X.

```
PLAN + X = PLANX    SOPHIA + X = SOFAX    DEMO + X = DEMX
CRUD + X = CRUDX    RAPID + X = RAPIX     PIXEL + X = PIXLX
```

---

## Portability — Copying to a New Project

### The Golden Rule

**Never change worker names. Never change identity names. Never change methodologies.**

Only the **project context** changes — examples, entities, tech stack, file paths, user scenarios.

### Option A: Gaffer Onboard (Recommended)

```
Gaffer: onboard from docs/PRD.md
```

The Gaffer reads the PRD and rewrites all project-specific context across every worker in one pass. Shows every change for approval before saving.

No PRD? Run `Gaffer: onboard` and answer 6 questions (project name, target user, core action, entities, tech stack, design inspiration).

### Option B: Manual Setup

Each worker file is structured:
```
# WORKERX — [PROJECT] Edition          ← CHANGE project name
> Description                           ← KEEP universal description
## [PROJECT] Context                    ← CHANGE entire section
## Universal Methodology                ← KEEP all of this
## Scoring / Dimensions / Steps         ← KEEP all of this
## [PROJECT] Examples                   ← CHANGE to your examples
```

### What to Customise Per Worker

| Worker | What to Customise |
|--------|-------------------|
| **APEX** | "What gets built" examples |
| **PLANX** | Milestone templates with your domain features |
| **CRUDX** | Entity schemas, API routes, admin UI examples |
| **CODAX** | Planning examples |
| **SOFAX** | Target scores by page type |
| **PIXLX** | Common issues examples |
| **AIDAX** | Conversion flow examples |
| **TERRX** | Test commands, file locations, health check endpoints |
| **MAPX** | Route structure, output dirs |
| **CONSX** | Design system references |
| **DEMX** | Demo route pattern |
| **PRDX** | Domain-specific sections |
| **UXPATX** | Component library refs |
| **PLANX-SEO-GEO** | Keywords, regions, competitors |
| **AUDIX/CONEX** | Service list, health check targets |
| **HARDX** | File paths |
| **NIGELX** | User scenarios, test persona description |
| **ALLYX** | Accessibility targets, page-type specific requirements |
| **STANX** | Auth patterns, API security rules, data handling |
| **BLAZX** | Performance budgets, page-type specific targets |
| **RIGX** | Infrastructure services, setup checklists |

### Placeholder Reference

When adapting this template for a specific project, replace these placeholders:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `[PROJECT]` | Project name | DOMA, ACME, etc. |
| `[PROJECT-DOMAIN]` | Project domain description | "Montenegrin property portal", "UK car marketplace" |
| `[PROJECT-URL]` | Production URL | domamontenegro.com, acme.com |
| `[BRAND-PRIMARY]` | Primary brand colour token | doma-sea, acme-blue |
| `[BRAND-BG]` | Background/canvas colour token | doma-sand, acme-cream |
| `[BRAND-DARK]` | Dark colour token | doma-ink, acme-charcoal |
| `[BRAND-SECONDARY]` | Secondary colour token | doma-mist, acme-gray |
| `[APP-PUBLIC]` | Public/marketing app path | apps/marketing |
| `[APP-ADMIN]` | Admin app path | apps/admin |
| `[APP-SUPERADMIN]` | Superadmin app path | apps/superadmin |
| `[APP-API]` | API/web app path | apps/web |
| `[entity-primary]` | Primary entity type | listings, products, articles |
| `[entity-secondary]` | Secondary entity type | leads, orders, comments |
| `[entity-tertiary]` | Tertiary entity type | agencies, vendors, authors |
| `[entity-geo]` | Geographic entity type | regions, territories, zones |
| `[TEST-PERSONA]` | Nigel's character description | "58-year-old expat looking for a rental" |
| `[DATABASE]` | Database provider | Railway PostgreSQL, PlanetScale, Supabase |
| `[DB-DRIVER]` | Database driver | pg driver, mysql2, prisma |
| `[OBJECT-STORAGE]` | Object storage service | Cloudflare R2, AWS S3, Vercel Blob |
| `[EMAIL-SERVICE]` | Email service provider | Resend, SendGrid, Postmark |
| `[PAYMENT-SERVICE]` | Payment service provider | Stripe, Paddle, LemonSqueezy |
| `[DESIGN-GUIDE-PATH]` | Path to design guide | docs/DOMA-DESIGN-GUIDE.md |
| `[SLOP-TEST-PATH]` | Path to AI slop test | docs/slop-test.md |

---

## File Structure

```
.ai/
├── PROTOCOL.md              ← THIS FILE — the single reference
├── gaffer/                  ← Runtime state
│   ├── session-log.md
│   ├── debts.md
│   ├── calibration.md
│   ├── evolution.md         ← System changelog (versioned)
│   └── inspections/         ← Saved inspection specs
│       ├── marketing-homepage.md
│       ├── search-page.md
│       └── admin-inbox.md
├── crew/                    ← The Gaffer + all worker playbooks
│   ├── GAFFER.md            ← The boss (deep reference)
│   ├── planners/
│   │   ├── CODAX-cody-cross.md
│   │   ├── PLANX-archie-scaffold.md
│   │   ├── PLANX-SEO-GEO-archie-scaffold.md
│   │   ├── PRDX-prue-gauntlet.md
│   │   └── PETRAX-petra-stone.md
│   ├── builders/
│   │   ├── APEX-max-pinnacle.md
│   │   ├── CRUDX-mason-forklift.md
│   │   ├── DEMX-dex-carousel.md
│   │   ├── MAPX-marco-compass.md
│   │   ├── UXPATX-pat-stencil.md
│   │   └── RIGX-rigby-crane.md
│   ├── reviewers/
│   │   ├── SOFAX-sophia-kerr.md
│   │   ├── AIDAX-aida-sterling.md
│   │   ├── CONSX-connie-mirror.md
│   │   ├── PIXLX-pixie-edge.md
│   │   ├── NIGELX-nigel-mullins.md
│   │   └── ALLYX-ally-ramp.md
│   └── checkers/
│       ├── TERRX-terry-stone.md
│       ├── AUDIX-audrey-pulse.md
│       ├── CONEX-connor-ethernet.md
│       ├── HARDX-hardy-anvil.md
│       ├── INSPX-iris-loupe.md
│       ├── STANX-stan-padlock.md
│       └── BLAZX-blaze-throttle.md
└── guides/                  ← Reference docs
```

---

*This is the single source of truth for how work gets done.*
*Individual worker playbooks live in `.ai/crew/` for deep methodology. Members of The Firm.*
*The Gaffer's runtime state lives in `.ai/gaffer/`.*
*Last updated: February 2026*
