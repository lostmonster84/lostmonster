# THE FIRM — Quality Orchestration System

> **The Firm.** 24 workers. 1 Gaffer. Automated quality gates.
> Drop into any project's `.ai/` directory and go.

---

## What Is This?

The Firm is a quality orchestration framework managed by The Gaffer for AI-assisted development. It provides:

- **The Gaffer** — Chief Performance Director who manages all workers
- **24 specialised workers** across planning, building, review, and sign-off phases
- **Smart Routing Algorithm** — automatically assigns the right workers for each task
- **6 automatic triggers** — runs at session start, job assignment, pre-review, post-ship, bug fixes, uptraining
- **BULLETPROOF pipeline** — automated quality gates before any work reaches the user
- **Persistent state** — scores, debts, and calibrations tracked between sessions
- **Brand Compliance Chain** — every UI worker enforces design system rules

---

## Quick Setup (2 minutes)

### Step 1: Run the setup script

```bash
# From your project root
bash /path/to/lostmonster/framework/templates/the-firm/setup.sh
```

This automatically:
- Copies all 24 workers, GAFFER, PROTOCOL into `.ai/`
- Places `CLAUDE.md` at your project root (from the template)
- Places `CLAUDE-SUPPLEMENT.md` inside `.ai/` (from the template)
- Sets up `gaffer/` state directory (session-log, debts, calibration, evolution, inspections)

Your project will now have:
```
your-project/
├── CLAUDE.md                              # Project instructions (ready to customise)
└── .ai/
    ├── CLAUDE-SUPPLEMENT.md               # Deep reference (workers, infra, patterns)
    ├── PROTOCOL.md                        # Master orchestration
    ├── crew/
    │   ├── GAFFER.md                      # The Gaffer's playbook
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
    └── gaffer/
        ├── session-log.md                 # Work history
        ├── debts.md                       # Open quality issues
        ├── calibration.md                 # Scoring adjustments
        ├── evolution.md                   # System changelog
        └── inspections/                   # Saved inspection specs
```

### Step 2: Replace placeholders

Every template file uses `[BRACKETED]` placeholders. Find and replace these in `CLAUDE.md` and `.ai/CLAUDE-SUPPLEMENT.md` with your project specifics:

| Placeholder | Replace With | Example |
|-------------|-------------|---------|
| `[PROJECT]` | Your project name | `Acme App` |
| `[PROJECT-DOMAIN]` | Your domain/industry | `e-commerce platform` |
| `[PROJECT-URL]` | Your production URL | `acmeapp.com` |
| `[BRAND-PRIMARY]` | Primary accent colour | `brand-blue` (#2563EB) |
| `[BRAND-BG]` | Page background colour | `brand-cream` (#FAFAF5) |
| `[BRAND-DARK]` | Dark/text colour | `brand-ink` (#0F172A) |
| `[BRAND-SECONDARY]` | Secondary accent | `brand-grey` (#94A3B8) |
| `[entity-primary]` | Main entity (plural) | `products` |
| `[entity-secondary]` | Secondary entity | `orders` |
| `[entity-tertiary]` | Tertiary entity | `customers` |
| `[entity-geo]` | Geographic entity | `regions` |
| `[entity-users]` | User entity | `profiles` |
| `[APP-PUBLIC]` | Public app path | `apps/storefront` |
| `[APP-ADMIN]` | Admin app path | `apps/dashboard` |
| `[APP-SUPERADMIN]` | Internal ops path | `apps/internal` |
| `[APP-API]` | API app path | `apps/api` |
| `[DATABASE]` | Database system | `Neon PostgreSQL` |
| `[DB-DRIVER]` | Database driver | `prisma` |
| `[HOSTING-PROVIDER]` | Hosting platform | `Vercel` |
| `[OBJECT-STORAGE]` | File storage | `AWS S3` |
| `[EMAIL-SERVICE]` | Email provider | `Resend` |
| `[PAYMENT-SERVICE]` | Payments provider | `Stripe` |
| `[MAP-SERVICE]` | Maps provider | `Google Maps` |
| `[ISSUE-TRACKER]` | Issue tracking tool | `Linear` |
| `[TEST-PERSONA]` | Your test persona | `Sarah, 45, non-tech user` |
| `[TARGET-USER-A]` | Primary user type | `shoppers` |
| `[TARGET-USER-B]` | Secondary user type | `merchants` |
| `[DESIGN-GUIDE-PATH]` | Path to design guide | `docs/DESIGN-GUIDE.md` |
| `[SLOP-TEST-PATH]` | Path to slop test | `docs/slop-test.md` |
| `[PRD-PATH]` | Path to PRD | `docs/PRD.md` |
| `[BUSINESS-LOGIC-KEY]` | Core business rule | `30-day freshness model` |
| `[BUSINESS-TIMESTAMP]` | Key timestamp field | `confirmed_at` |
| `[BUSINESS-CYCLE-DAYS]` | Business cycle length | `30` |
| `[AUTH-METHOD]` | Auth implementation | `JWT + httpOnly cookies` |

### Step 3: Create your design docs

The Firm references two project docs:
1. **Design Guide** — your approved colours, backgrounds, page rhythm, card treatments
2. **Slop Test** — your provenance rules and red flags for AI-generated patterns

Create these at the paths you specified in `[DESIGN-GUIDE-PATH]` and `[SLOP-TEST-PATH]`.

### Step 4: Onboard

Write your PRD, then tell Claude:

```
Gaffer: onboard
```

The Gaffer reads your PRD and rewrites all 24 worker context sections automatically. Worker names, identities, and methodologies stay the same — only project-specific context gets rewritten.

### Step 5: Create inspection specs (optional)

Copy `gaffer/inspections/example-spec.md` for each key page you want to inspect regularly. These are used by INSPX for automated quality checks.

---

## How It Works

### The Hierarchy

```
                    THE GAFFER (manages all)
                         |
    Planning ──> Building ──> Review ──> Sign-off ──> Present
    CODAX        APEX         SOFAX      TERRX         User
    PLANX        CRUDX        AIDAX      AUDIX         approval
    PRDX         DEMX         PIXLX      STANX
    PETRAX       MAPX         CONSX      BLAZX
    RAPIX        UXPATX       NIGELX     HARDX
                 RIGX         ALLYX      INSPX (pipeline)
```

### 6 Automatic Triggers

| # | Trigger | When | What Happens |
|---|---------|------|--------------|
| 1 | Session Start | New conversation | Read session-log + debts, surface flags |
| 2 | Job Assignment | Task described | Smart Route the task, present crew sheet |
| 3 | Pre-BULLETPROOF | Before quality review | Run INSPX pipeline (screenshots + worker evaluation, includes ALLYX accessibility) |
| 4 | Post-Ship | Work approved | Log to session-log, update debts |
| 5 | Bug Fix | Fixing a bug | Check if bug was missed by a worker, log to calibration |
| 6 | Uptraining | Worker underperforms | Edit the worker's .md file to fix gaps |

### Smart Routing

The Gaffer analyses every task and assigns the right workers automatically:
1. **Classify** the task type (new feature, bug fix, UI polish, etc.)
2. **Extract signals** (touches-ui, api-change, database-migration, etc.)
3. **Score workers** against the signal matrix
4. **Build dependency graph** (planning before building before review)
5. **Apply overrides** (always TERRX, never skip NIGELX for UI)
6. **Present crew sheet** to user

### Quality Gates

- **Pre-Present Gate** — no visual work shown without a Review Card (scores from every assigned worker)
- **Brand Compliance Chain** — every UI worker checks design guide compliance at their phase
- **BULLETPROOF** — automated Playwright screenshots fed to review workers for scoring
- **Gaffer Sign-off** — APPROVED / FIX FIRST / NOT READY verdict before presenting

---

## The 24 Workers

### Planners (6)
| Worker | Identity | Role |
|--------|----------|------|
| **CODAX** | Cody Cross | Context-Objective-Details-Acceptance planning |
| **PLANX** | Archie Scaffold | Milestone-based execution blueprints |
| **PRDX** | Prue Gauntlet | PRD validation (9-round Q&A) |
| **PLANX-SEO-GEO** | Archie Scaffold (SEO) | SEO + AI search optimisation planning |
| **PETRAX** | Petra Stone | Execution validation (are todos atomic?) |
| **RAPIX** | Rafi Blurt | Rapid requirements interpretation |

### Builders (6)
| Worker | Identity | Role |
|--------|----------|------|
| **APEX** | Max Pinnacle | All-Protocol EXecution (meta-framework) |
| **CRUDX** | Mason Forklift | Full-stack CRUD (6-layer stack) |
| **DEMX** | Dex Carousel | Design variations (5 options + AIDA scoring) |
| **MAPX** | Marco Compass | Application mapping + living audit |
| **UXPATX** | Pat Stencil | UX patterns reference (consulted, not invoked) |
| **RIGX** | Rigby Crane | Infrastructure setup (6-layer foundation) |

### Reviewers (6)
| Worker | Identity | Role |
|--------|----------|------|
| **SOFAX** | Sophia Kerr | Design audit (11 dimensions, 110 points) |
| **AIDAX** | Aida Sterling | Conversion audit (AIDA, 100 points) |
| **PIXLX** | Pixie Edge | Edge case audit (deduction-based, 100 points) |
| **CONSX** | Connie Mirror | Consistency scanner (10 dimensions) |
| **NIGELX** | Nigel Mullins | Simplicity/usability check (7 dimensions, 100 points) |
| **ALLYX** | Ally Ramp | Accessibility audit (WCAG 2.1, 100 points) |

### Checkers (6) + Orchestrator (1)
| Worker | Identity | Role |
|--------|----------|------|
| **TERRX** | Terry Stone | Automated test execution (real pass/fail) |
| **AUDIX** | Audrey Pulse | System health audit (5 phases) |
| **CONEX** | Connor Ethernet | Database connection framework (5 layers) |
| **HARDX** | Hardy Anvil | Hardcoded value detection |
| **INSPX** | Iris Loupe | Inspection pipeline orchestrator |
| **STANX** | Stan Padlock | Security audit (OWASP, auth, injection) |
| **BLAZX** | Blaze Throttle | Performance audit (Core Web Vitals, bundle analysis) |

---

## Scoring Targets

| Worker | Target | What |
|--------|--------|------|
| SOFAX | 93+ / 110 | Design quality (marketing pages) |
| SOFAX | 88+ / 110 | Design quality (admin pages) |
| AIDAX | 80+ / 100 | Conversion effectiveness |
| PIXLX | 85+ / 100 | Edge case coverage |
| NIGELX | 85+ / 100 | Usability |
| ALLYX | 85+ / 100 | Accessibility compliance |
| STANX | 90+ / 100 | Security (0 critical/major issues) |
| BLAZX | 85+ / 100 | Performance (Core Web Vitals) |

---

## Commands

| Command | What Happens |
|---------|-------------|
| `run Gaffer` | Full Gaffer debrief — scores, debts, worker review |
| `full Gaffer build` | Autonomous mode — plans, builds, reviews, signs off, presents |
| `Gaffer: onboard` | Rewrite all worker context from PRD |
| `Gaffer: scores` | Show all worker scores from recent sessions |
| `Gaffer: fitness` | Audit all worker files for staleness |
| `Gaffer: uptrain` | Fix underperforming workers |
| `MAPX` | Generate application map |
| `PLANX: [feature]` | Create execution blueprint |
| `CRUDX: [entity]` | Generate full-stack CRUD |
| `DEMX: [element]` | Create 5 design variations |
| `APEX: [feature]` | Full feature build (all protocols) |
| `run SOPHIA on [page]` | Design audit (SOFAX) |
| `run PIXELX` | Edge case audit (PIXLX) |
| `run CONSTX on [page]` | Consistency scan (CONSX) |
| `run INSPX on [page]` | Automated inspection pipeline |
| `run ALLYX on [page]` | Accessibility audit |
| `run STANX` | Security audit |
| `run BLAZX on [page]` | Performance audit |
| `RIGX: [service]` | Infrastructure setup |
| `run BULLETPROOF` | Full quality gate |
| `run Terry` | Automated tests (types + lint + E2E) |

---

## Onboarding a New Project

The GAFFER system has a built-in onboarding protocol. After replacing placeholders:

1. **Write your PRD** — define target users, entities, tech stack, design system
2. **Run `Gaffer: onboard`** — The Gaffer rewrites all worker context sections from the PRD
3. **What changes:** Project context, file paths, design tokens, entities, brand rules
4. **What never changes:** Worker names, identities, methodologies, scoring systems

See PROTOCOL.md "Portability" section for the complete onboarding guide.

---

## Files Reference

| File | Purpose | Updated By |
|------|---------|-----------|
| `PROTOCOL.md` | Master orchestration — hierarchy, routing, gates | The Gaffer |
| `crew/GAFFER.md` | The Gaffer's playbook — triggers, sign-off, build mode | The Gaffer |
| `crew/planners/*.md` | Planning worker playbooks | The Gaffer (uptrains) |
| `crew/builders/*.md` | Building worker playbooks | The Gaffer (uptrains) |
| `crew/reviewers/*.md` | Review worker playbooks | The Gaffer (uptrains) |
| `crew/checkers/*.md` | Checker worker playbooks | The Gaffer (uptrains) |
| `gaffer/session-log.md` | Shipped work history | Auto (post-ship trigger) |
| `gaffer/debts.md` | Open quality issues | Auto (when issues found) |
| `gaffer/calibration.md` | Scoring adjustments | Auto (when scores miscalibrate) |
| `gaffer/evolution.md` | System changelog | Auto (after system changes) |
| `gaffer/inspections/*.md` | Saved inspection specs | Manual (per page) |

---

## Origin

Originally developed as The Gaffer system for the DOMA platform (Montenegro real estate portal) by James Munday. Battle-tested across 20+ features, 3 QA stress tests, and 4 system evolution cycles. Extracted as The Firm -- a universal quality orchestration template in the Lost Monster framework.

**Version:** 1.3.0 (template)
**Workers:** 24
**Last Updated:** February 2026
