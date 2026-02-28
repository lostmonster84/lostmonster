# INSPX — Automated Inspection Pipeline — Lost Monster Edition

> **The pipeline orchestrator.** Not a scorer — coordinates Playwright + review workers.
> Replaces BULLETPROOF steps 2-8 with structured, repeatable, honest inspection.
> Invoke: Gaffer Trigger 3 (auto) or `run INSPX on [page]` (manual)

---

## Why INSPX Exists

BULLETPROOF steps 2-8 were manual: the agent took screenshots, then mentally applied each worker's checklist. This was:

1. **Inconsistent** — different rigour depending on context pressure
2. **Self-generous** — the agent that built it also reviewed it
3. **Unstructured** — no defined checkpoints, no systematic coverage
4. **Unrepeatable** — no saved spec to re-run after fixes

INSPX fixes all four. It defines checkpoints, captures evidence (screenshots), feeds that evidence to review workers with their full checklists, and produces a structured Pipeline Report.

---

## Lost Monster Context

**INSPX for Lost Monster** understands:
- **Single Next.js marketing site** — `app/` directory
- **Dev server** at `localhost:3000`
- **Production** at `lostmonster.dev`
- **5-color dynamic theming** — inspections should verify across themes
- **Bold Personal Brand** aesthetic — dark backgrounds, massive type, glassmorphism
- **Key pages:** Homepage, Services, Portfolio, Contact, About

---

## How It Works

```
Gaffer Trigger 3 fires (or manual: `run INSPX on [page]`)
     |
     +-- 1. Load inspection spec (saved or inline)
     +-- 2. Assign review workers (from Gaffer crew sheet)
     |
     v
INSPX Pipeline runs
     |
     +-- CP-01: Navigate to URL -> setup actions -> screenshot -> feed to workers -> scores
     +-- CP-02: Navigate to URL -> setup actions -> screenshot -> feed to workers -> scores
     |   +-- CRITICAL failure? -> HALT pipeline, report, fix, re-run from failed CP
     +-- CP-03: ...
     |   +-- ...
     |
     v
Pipeline Report produced
     |
     +-- All checkpoint screenshots
     +-- All worker scores per checkpoint
     +-- Aggregated scores per worker
     +-- CRITICAL issues list
     +-- Fix recommendations
     |
     v
Gaffer reviews -> populates Review Card -> verdict
```

---

## Inspection Spec Format

Every inspection run needs a spec — either loaded from `.ai/gaffer/inspections/` or generated inline.

```markdown
# Inspection Spec: [Page/Feature Name]

## Target
- **What:** [description of what's being inspected]
- **Base URL:** http://localhost:3000

## Viewports
- Desktop: 1280x800
- Mobile: 390x844

## Checkpoints

### CP-01: [Name]
- **URL:** /path/to/page
- **Setup:** [actions before screenshot — navigate, click color switcher, scroll, wait for load]
- **Viewport:** desktop | mobile | both
- **Workers:** SOFAX, NIGELX, CONSX
- **Focus:** [what workers should pay special attention to]

### CP-02: [Name]
- **URL:** /path/to/page
- **Setup:** [e.g. "switch to purple theme, scroll to metrics section"]
- **Viewport:** both
- **Workers:** PIXLX, NIGELX
- **Focus:** Color theme consistency, glassmorphism rendering

### CP-03: [Name]
...
```

### Spec Rules

1. **Minimum 2 checkpoints** per inspection (default state + edge case)
2. **Maximum 8 checkpoints** per inspection (beyond this, split into separate specs)
3. **Every checkpoint must have at least one assigned worker**
4. **Setup actions** are Playwright operations: navigate, click, fill, wait, scroll
5. **Focus** tells workers what to prioritise — not what to skip. Workers always run their full checklist

---

## Lost Monster Default Inspection Specs

### Homepage Spec

```markdown
# Inspection Spec: Lost Monster Homepage

## Target
- **What:** Main homepage — hero, metrics, featured work, testimonials
- **Base URL:** http://localhost:3000

## Viewports
- Desktop: 1280x800
- Mobile: 390x844

## Checkpoints

### CP-01: Homepage Default State (Orange Theme)
- **URL:** /
- **Setup:** Clear localStorage, reload (default orange theme)
- **Viewport:** both
- **Workers:** SOFAX, NIGELX, AIDAX
- **Focus:** Hero impact, metric card visibility, CTA prominence

### CP-02: Homepage Purple Theme
- **URL:** /
- **Setup:** Click purple in color switcher, wait 700ms for transition
- **Viewport:** desktop
- **Workers:** SOFAX, CONSX
- **Focus:** Color transition smoothness, accent consistency across all elements

### CP-03: Homepage Mobile Scroll
- **URL:** /
- **Setup:** Scroll through entire page on mobile viewport
- **Viewport:** mobile
- **Workers:** PIXLX, NIGELX
- **Focus:** Touch targets (44px+), text readability, metric card layout at small width

### CP-04: Homepage Below-Fold Content
- **URL:** /
- **Setup:** Scroll past hero to featured projects section
- **Viewport:** both
- **Workers:** SOFAX, AIDAX
- **Focus:** Content hierarchy, project card rendering, CTA for portfolio
```

### Services Spec

```markdown
# Inspection Spec: Lost Monster Services Page

## Target
- **What:** Services listing with pricing and features
- **Base URL:** http://localhost:3000

## Viewports
- Desktop: 1280x800
- Mobile: 390x844

## Checkpoints

### CP-01: Services Default State
- **URL:** /services
- **Setup:** Navigate, wait for content load
- **Viewport:** both
- **Workers:** SOFAX, NIGELX, AIDAX
- **Focus:** Service card layout, pricing visibility, CTA clarity

### CP-02: Services All Themes
- **URL:** /services
- **Setup:** Cycle through all 5 themes, screenshot each
- **Viewport:** desktop
- **Workers:** CONSX
- **Focus:** Accent color consistency on cards, borders, icons, buttons
```

### Portfolio Spec

```markdown
# Inspection Spec: Lost Monster Portfolio Page

## Target
- **What:** Project portfolio / showcase grid
- **Base URL:** http://localhost:3000

## Viewports
- Desktop: 1280x800
- Mobile: 390x844

## Checkpoints

### CP-01: Portfolio Grid View
- **URL:** /portfolio
- **Setup:** Navigate, wait for images to load
- **Viewport:** both
- **Workers:** SOFAX, NIGELX
- **Focus:** Image loading, grid layout, project card consistency

### CP-02: Portfolio Empty State
- **URL:** /portfolio
- **Setup:** Ensure no published projects (test data)
- **Viewport:** both
- **Workers:** PIXLX, NIGELX
- **Focus:** Empty state messaging, guidance for visitor
```

---

## Checkpoint Execution

For each checkpoint, INSPX does:

1. **Navigate** to the checkpoint URL
2. **Execute setup actions** (click color switcher, scroll, trigger states)
3. **Wait** for page to settle (network idle + any explicit waits + 700ms for theme transitions)
4. **Screenshot** at the specified viewport(s)
5. **Feed screenshot + metadata to each assigned worker** in Checkpoint Mode
6. **Collect scores** from each worker
7. **Check for CRITICAL** — if any worker flags a CRITICAL issue, HALT the pipeline

### CRITICAL vs Non-CRITICAL

| Severity | Pipeline Action | Examples |
|----------|----------------|---------|
| **CRITICAL** | HALT pipeline. Fix issue. Re-run from failed checkpoint | Broken layout, missing hero, JS error visible, color system broken, form unusable |
| **Major** | Continue pipeline. Log for fix. Include in report | Wrong accent color, glassmorphism not rendering, spacing inconsistent, brand voice violation |
| **Minor** | Continue pipeline. Log for polish. Include in report | Slightly off alignment, minor copy tweak, shadow inconsistency |

**Fail-fast rule:** If CP-01 has a CRITICAL, don't waste time running CP-02 through CP-08. Fix the CRITICAL first, then re-run.

---

## Pipeline Report Format

```
+-- INSPX PIPELINE REPORT ----------------------------------------+
| Target: Lost Monster Homepage                                    |
| Checkpoints: 4 run, 3 passed, 1 with issues                     |
| Duration: 45s                                                    |
|                                                                  |
| CP-01: Homepage default state (orange)                           |
|   Desktop 1280x800: PASS                                         |
|   Mobile 390x844: PASS                                           |
|   SOFAX: 96/110 | NIGELX: PASS | AIDAX: 92/100                  |
|                                                                  |
| CP-02: Homepage purple theme                                     |
|   Desktop 1280x800: PASS                                         |
|   SOFAX: 95/110 | CONSX: PASS                                    |
|                                                                  |
| CP-03: Homepage mobile scroll                                    |
|   Mobile 390x844: WARNING - PIXLX flagged metric card overflow   |
|   PIXLX: 85/100 (-10 card overflow, -5 touch target)             |
|   NIGELX: PASS                                                   |
|                                                                  |
| CP-04: Homepage below-fold content                               |
|   Desktop 1280x800: PASS                                         |
|   Mobile 390x844: PASS                                           |
|   SOFAX: 94/110 | AIDAX: 88/100                                  |
|                                                                  |
| --- AGGREGATED SCORES ---                                        |
| SOFAX:  95/110 (avg across checkpoints)                          |
| NIGELX: PASS                                                     |
| AIDAX:  90/100 (avg across checkpoints)                          |
| PIXLX:  85/100 (lowest at CP-03)                                 |
| CONSX:  PASS - no conflicts                                      |
|                                                                  |
| --- ISSUES ---                                                   |
| 1. [Major] CP-03: Metric cards overflow on mobile 390px          |
|    -> Reduce font-size or switch to single column below 400px    |
| 2. [Minor] CP-03: Color switcher touch target is 32px            |
|    -> Increase to 44px minimum for WCAG compliance               |
|                                                                  |
| --- VERDICT ---                                                  |
| READY FOR GAFFER SIGN-OFF (1 major fix recommended)              |
+------------------------------------------------------------------+
```

---

## Worker Integration (Checkpoint Mode)

When INSPX invokes a review worker, it sends:

1. **The screenshot** (Playwright capture)
2. **Checkpoint metadata:**
   - Page name and URL
   - Viewport dimensions
   - What was changed (feature context from Gaffer)
   - Focus area (from the spec)
   - Active color theme
3. **The instruction:** "Run your full checklist in Checkpoint Mode. Return structured scores and flag any CRITICAL issues."

Workers receiving this operate in **Checkpoint Mode** — same checklists, structured output format. See each worker's Checkpoint Mode section for their specific output format.

**Workers that support Checkpoint Mode:**
- SOFAX — 11 dimensions, 110 points
- AIDAX — 4 AIDA dimensions, 100 points
- PIXLX — deduction-based, 100 starting
- CONSX — 10 consistency dimensions
- NIGELX — 3-point usability check

### Lost Monster-Specific Worker Focus Areas

| Worker | Lost Monster Focus |
|--------|-------------------|
| **SOFAX** | Bold Personal Brand compliance, dark theme execution, glassmorphism quality |
| **AIDAX** | Hero headline impact, metric card conversion, CTA visibility |
| **PIXLX** | Color switcher edge cases, 5-theme consistency, localStorage persistence |
| **CONSX** | Cross-theme consistency, accent color application across all elements |
| **NIGELX** | Color switcher UX, mobile navigation, contact form usability |

---

## Saved Specs vs Inline Specs

### Saved Specs (`.ai/gaffer/inspections/`)

For recurring pages that get inspected repeatedly. The Gaffer loads these automatically at Trigger 3 when the work matches.

**When to save a spec:**
- The page has been inspected 2+ times
- The page is high-traffic or conversion-critical
- The page has known edge cases that should always be checked

**Naming:** `[page].md` — e.g. `homepage.md`, `services.md`, `portfolio.md`, `contact.md`

### Inline Specs

For one-off work or new pages without a saved spec. The Gaffer generates one based on:
- What was just built (from the task description)
- Which URLs are affected
- Which viewports matter (Lost Monster = both desktop + mobile, always)
- Which workers are on the crew sheet

Inline specs are used once and discarded. If the page becomes recurring, the spec gets saved.

---

## Re-Running Failures

`INSPX: re-run failures` — re-runs only the checkpoints that had issues in the last run.

**Process:**
1. Read the last Pipeline Report
2. Identify checkpoints with Major or CRITICAL issues
3. Re-run only those checkpoints with the same spec
4. Produce an updated Pipeline Report
5. If all issues resolved -> merge with original report -> ready for Gaffer

---

## Manual Invocation

`run INSPX on [page]` — runs a one-off inspection.

**Process:**
1. INSPX asks for (or infers) the page URL and viewports
2. Generates an inline spec with sensible defaults:
   - CP-01: Default state with default theme (desktop + mobile)
   - CP-02: Alternative color theme (verify theme system)
   - CP-03: Interaction state (after click/scroll) if applicable
3. Assigns review workers: SOFAX + AIDAX + NIGELX + CONSX (Lost Monster is all public-facing)
4. Runs the pipeline
5. Produces Pipeline Report

### Lost Monster Page Targets

| Page | URL | Key Checkpoints |
|------|-----|-----------------|
| Homepage | `/` | Hero, metrics, featured projects, color switcher |
| Services | `/services` | Service cards, pricing, CTAs |
| Portfolio | `/portfolio` | Project grid, image loading, empty state |
| Contact | `/contact` | Form validation, submission, success state |
| About | `/about` | Personal story, metrics, trust signals |

---

## Integration with Gaffer

| Gaffer Action | INSPX Role |
|---------------|-----------|
| Trigger 3 (Pre-BULLETPROOF) | Gaffer loads spec, INSPX runs pipeline |
| Full Gaffer Build Phase 3 | INSPX replaces manual review phase |
| Sign-off | Gaffer reads Pipeline Report, populates Review Card |
| Manual `run INSPX` | INSPX runs independently, reports back |

**INSPX does NOT:**
- Make fix/ship decisions (that's the Gaffer)
- Run automated tests (that's TERRX)
- Edit code (it's read-only, inspection-only)
- Score anything itself (it delegates to review workers)

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 1.0 (Lost Monster Edition)
**Type:** Orchestrator (not scorer)
