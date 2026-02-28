# INSPX — Automated Inspection Pipeline

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
     +-- CP-01: Navigate to URL → setup actions → screenshot → feed to workers → scores
     +-- CP-02: Navigate to URL → setup actions → screenshot → feed to workers → scores
     |   +-- CRITICAL failure? → HALT pipeline, report, fix, re-run from failed CP
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
Gaffer reviews → populates Review Card → verdict
```

---

## Inspection Spec Format

Every inspection run needs a spec — either loaded from `.ai/gaffer/inspections/` or generated inline.

```markdown
# Inspection Spec: [Page/Feature Name]

## Target
- **What:** [description of what's being inspected]
- **Base URL:** http://localhost:4000

## Viewports
- Desktop: 1280x800
- Mobile: 390x844
(omit mobile for admin-only pages)

## Checkpoints

### CP-01: [Name]
- **URL:** /path/to/page
- **Setup:** [actions before screenshot — login, navigate, fill form, wait for load]
- **Viewport:** desktop | mobile | both
- **Workers:** SOFAX, NIGELX, CONSX
- **Focus:** [what workers should pay special attention to]

### CP-02: [Name]
- **URL:** /path/to/page?state=empty
- **Setup:** [e.g. "ensure no data for empty state"]
- **Viewport:** both
- **Workers:** PIXLX, NIGELX
- **Focus:** Empty state handling, guidance messaging

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

## Checkpoint Execution

For each checkpoint, INSPX does:

1. **Navigate** to the checkpoint URL
2. **Execute setup actions** (login, fill forms, scroll to section, trigger states)
3. **Wait** for page to settle (network idle + any explicit waits)
4. **Screenshot** at the specified viewport(s)
5. **Feed screenshot + metadata to each assigned worker** in Checkpoint Mode
6. **Collect scores** from each worker
7. **Check for CRITICAL** — if any worker flags a CRITICAL issue, HALT the pipeline

### CRITICAL vs Non-CRITICAL

| Severity | Pipeline Action | Examples |
|----------|----------------|---------|
| **CRITICAL** | HALT pipeline. Fix issue. Re-run from failed checkpoint | Broken layout, missing content, JS error visible, form unusable, accessibility blocker |
| **Major** | Continue pipeline. Log for fix. Include in report | Wrong colour, spacing inconsistent, missing hover state, brand violation |
| **Minor** | Continue pipeline. Log for polish. Include in report | Slightly off alignment, minor copy issue, shadow inconsistency |

**Fail-fast rule:** If CP-01 has a CRITICAL, don't waste time running CP-02 through CP-08. Fix the CRITICAL first, then re-run.

---

## Pipeline Report Format

```
+-- INSPX PIPELINE REPORT ----------------------------------------+
| Target: [Page/Feature Name]                                      |
| Checkpoints: [X] run, [Y] passed, [Z] with issues               |
| Duration: [time]                                                 |
|                                                                  |
| CP-01: Homepage default state                                    |
|   Desktop 1280x800: PASS                                         |
|   Mobile 390x844: PASS                                           |
|   SOFAX: 96/110 | NIGELX: PASS | CONSX: PASS                    |
|                                                                  |
| CP-02: Homepage empty featured section                           |
|   Desktop 1280x800: WARNING - PIXLX flagged missing empty state  |
|   PIXLX: 82/100 (-5 empty state, -3 guidance)                   |
|   NIGELX: PASS                                                   |
|                                                                  |
| CP-03: Homepage mobile scroll                                    |
|   Mobile 390x844: PASS                                           |
|   PIXLX: 95/100 | SOFAX: 94/110                                 |
|                                                                  |
| --- AGGREGATED SCORES ---                                        |
| SOFAX:  95/110 (avg across checkpoints)                          |
| NIGELX: PASS                                                     |
| PIXLX:  88/100 (lowest at CP-02)                                |
| CONSX:  PASS — no conflicts                                      |
|                                                                  |
| --- ISSUES ---                                                   |
| 1. [Major] CP-02: Empty featured section shows blank             |
|    → Add empty state with "No featured [entity-primary]" message |
| 2. [Minor] CP-01: Card shadow slightly different from spec       |
|    → Update to shadow-[0_4px_20px_rgba(0,0,0,0.08)]             |
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
3. **The instruction:** "Run your full checklist in Checkpoint Mode. Return structured scores and flag any CRITICAL issues."

Workers receiving this operate in **Checkpoint Mode** — same checklists, structured output format. See each worker's Checkpoint Mode section for their specific output format.

**Workers that support Checkpoint Mode:**
- SOFAX — 11 dimensions, 110 points
- AIDAX — 4 AIDA dimensions, 100 points
- PIXLX — deduction-based, 100 starting
- CONSX — 10 consistency dimensions
- NIGELX — 3-point usability check

---

## Saved Specs vs Inline Specs

### Saved Specs (`.ai/gaffer/inspections/`)

For recurring pages that get inspected repeatedly. The Gaffer loads these automatically at Trigger 3 when the work matches.

**When to save a spec:**
- The page has been inspected 2+ times
- The page is high-traffic or conversion-critical
- The page has known edge cases that should always be checked

**Naming:** `[section]-[page].md` — e.g. `public-homepage.md`, `admin-inbox.md`

### Inline Specs

For one-off work or new pages without a saved spec. The Gaffer generates one based on:
- What was just built (from the task description)
- Which URLs are affected
- Which viewports matter (public = both, admin = desktop)
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
5. If all issues resolved → merge with original report → ready for Gaffer

---

## Manual Invocation

`run INSPX on [page]` — runs a one-off inspection.

**Process:**
1. INSPX asks for (or infers) the page URL and viewports
2. Generates an inline spec with sensible defaults:
   - CP-01: Default state (desktop + mobile)
   - CP-02: Empty/error state if applicable
   - CP-03: Interaction state (after click/submit) if applicable
3. Assigns review workers based on page type (public → SOFAX + AIDAX + NIGELX + CONSX, admin → SOFAX + NIGELX + PIXLX)
4. Runs the pipeline
5. Produces Pipeline Report

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

**Framework Status:** Template — v1.0
**Last Updated:** February 28, 2026
**Type:** Orchestrator (not scorer)
