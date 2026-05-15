---
worker: INSPX
identity: Iris Loupe - Automated Inspection Pipeline
class: checker
slice_axis: INPUT
child_count: 6-12  # one per checkpoint (URL + viewport + setup actions)
child_envelope:
  receives: [checkpoint name, URL, viewport, setup actions, baseline screenshot if any]
  emits: [per-checkpoint screenshot + metadata + accessibility tree + console errors]
synthesis_pattern_ref: B (cross-checkpoint patterns: e.g. same broken modal on 3 pages)
provides:
  - outputs.inspx_manifest
  - outputs.checkpoints
---

# INSPX - Automated Inspection Pipeline

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | Project name |
<!-- ONBOARD:END -->

> **The pipeline orchestrator.** Not a scorer - coordinates Playwright + review workers.
> Replaces BULLETPROOF steps 2-8 with structured, repeatable, honest inspection.
> Invoke: Gaffer Trigger 3 (auto) or `run INSPX on [page]` (manual)

---

## Why INSPX Exists

BULLETPROOF steps 2-8 were manual: the agent took screenshots, then mentally applied each worker's checklist. This was:

1. **Inconsistent** - different rigour depending on context pressure
2. **Self-generous** - the agent that built it also reviewed it
3. **Unstructured** - no defined checkpoints, no systematic coverage
4. **Unrepeatable** - no saved spec to re-run after fixes

INSPX fixes all four. It defines checkpoints, captures evidence (screenshots), feeds that evidence to review workers with their full checklists, and produces a structured Pipeline Report.

---

## How It Works

```
Gaffer Trigger 3 fires (or manual: `run INSPX on [page]`)
     │
     ├── 1. Load inspection spec (saved or inline)
     ├── 2. Assign review workers (from Gaffer crew sheet)
     │
     ▼
INSPX Pipeline runs
     │
     ├── CP-01: Navigate to URL → setup actions → screenshot → feed to workers → scores
     ├── CP-02: Navigate to URL → setup actions → screenshot → feed to workers → scores
     │   └── CRITICAL failure? → HALT pipeline, report, fix, re-run from failed CP
     ├── CP-03: ...
     │   └── ...
     │
     ▼
Pipeline Report produced
     │
     ├── All checkpoint screenshots
     ├── All worker scores per checkpoint
     ├── Aggregated scores per worker
     ├── CRITICAL issues list
     ├── Fix recommendations
     │
     ▼
Gaffer reviews → populates Review Card → verdict
```

---

## Inspection Spec Format

Every inspection run needs a spec - either loaded from `.ai/thefirm/gaffer/inspections/` or generated inline.

```markdown
# Inspection Spec: [Page/Feature Name]

## Target
- **What:** [description of what's being inspected]
- **Base URL:** http://localhost:4000

## Viewports
- Desktop: 1280×800
- Mobile: 390×844
(omit mobile for admin-only pages)

## Checkpoints

### CP-01: [Name]
- **URL:** /path/to/page
- **Setup:** [actions before screenshot - login, navigate, fill form, wait for load]
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
5. **Focus** tells workers what to prioritise - not what to skip. Workers always run their full checklist

---

## Checkpoint Execution

For each checkpoint, INSPX does:

1. **Navigate** to the checkpoint URL
2. **Execute setup actions** (login, fill forms, scroll to section, trigger states)
3. **Wait** for page to settle (network idle + any explicit waits)
4. **Screenshot** at the specified viewport(s)
5. **Feed screenshot + metadata to each assigned worker** in Checkpoint Mode
6. **Collect scores** from each worker
7. **Check for CRITICAL** - if any worker flags a CRITICAL issue, HALT the pipeline

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
┌─ INSPX PIPELINE REPORT ──────────────────────────────────┐
│ Target: [Page/Feature Name]                                │
│ Checkpoints: [X] run, [Y] passed, [Z] with issues         │
│ Duration: [time]                                           │
│                                                            │
│ CP-01: Homepage default state                              │
│   Desktop 1280×800: ✓                                      │
│   Mobile 390×844: ✓                                        │
│   SOFAX: 96/110 | NIGELX: PASS | CONSX: PASS              │
│                                                            │
│ CP-02: Homepage empty featured section                     │
│   Desktop 1280×800: ⚠ PIXLX flagged missing empty state   │
│   PIXLX: 82/100 (-5 empty state, -3 guidance)             │
│   NIGELX: PASS                                             │
│                                                            │
│ CP-03: Homepage mobile scroll                              │
│   Mobile 390×844: ✓                                        │
│   PIXLX: 95/100 | SOFAX: 94/110                           │
│                                                            │
│ ─── AGGREGATED SCORES ───                                  │
│ SOFAX:  95/110 (avg across checkpoints)                    │
│ NIGELX: PASS                                               │
│ PIXLX:  88/100 (lowest at CP-02)                           │
│ CONSX:  PASS - no conflicts                                │
│                                                            │
│ ─── ISSUES ───                                             │
│ 1. [Major] CP-02: Empty featured section shows blank       │
│    → Add empty state with "No featured properties" message │
│ 2. [Minor] CP-01: Card shadow slightly different from spec │
│    → Update to shadow-[0_4px_20px_rgba(0,0,0,0.08)]       │
│                                                            │
│ ─── VERDICT ───                                            │
│ READY FOR GAFFER SIGN-OFF (1 major fix recommended)        │
└────────────────────────────────────────────────────────────┘
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

Workers receiving this operate in **Checkpoint Mode** - same checklists, structured output format. See each worker's Checkpoint Mode section for their specific output format.

**Workers that support Checkpoint Mode:**
- SOFAX - 11 dimensions, 110 points
- AIDAX - 4 AIDA dimensions, 100 points
- PIXLX - deduction-based, 100 starting
- CONSX - 10 consistency dimensions
- NIGELX - 3-point usability check

---

## Saved Specs vs Inline Specs

### Saved Specs (`.ai/thefirm/gaffer/inspections/`)

For recurring pages that get inspected repeatedly. The Gaffer loads these automatically at Trigger 3 when the work matches.

**When to save a spec:**
- The page has been inspected 2+ times
- The page is high-traffic or conversion-critical
- The page has known edge cases that should always be checked

**Naming:** `[section]-[page].md` - e.g. `marketing-homepage.md`, `admin-inbox.md`

### Inline Specs

For one-off work or new pages without a saved spec. The Gaffer generates one based on:
- What was just built (from the task description)
- Which URLs are affected
- Which viewports matter (marketing = both, admin = desktop)
- Which workers are on the crew sheet

Inline specs are used once and discarded. If the page becomes recurring, the spec gets saved.

---

## Re-Running Failures

`INSPX: re-run failures` - re-runs only the checkpoints that had issues in the last run.

**Process:**
1. Read the last Pipeline Report
2. Identify checkpoints with Major or CRITICAL issues
3. Re-run only those checkpoints with the same spec
4. Produce an updated Pipeline Report
5. If all issues resolved → merge with original report → ready for Gaffer

---

## Manual Invocation

`run INSPX on [page]` - runs a one-off inspection.

**Process:**
1. INSPX asks for (or infers) the page URL and viewports
2. Generates an inline spec with sensible defaults:
   - CP-01: Default state (desktop + mobile)
   - CP-02: Empty/error state if applicable
   - CP-03: Interaction state (after click/submit) if applicable
3. Assigns review workers based on page type (marketing → SOFAX + AIDAX + NIGELX + CONSX, admin → SOFAX + NIGELX + PIXLX)
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

**Framework Status:** New - v1.0
**Last Updated:** February 2026
**Type:** Orchestrator (not scorer)

---

## Calibration Anchors (v4.0+ required field)

These anchors are loaded by the agent-identity-loader into every sub-agent dispatch where INSPX is the parent. INSPX is INPUT-sliced (one sub-agent per checkpoint), so calibration travels per-checkpoint and tells each sub-agent how to recognise "passed", "failed", "flaky". Without these anchors, parallel checkpoint capture produces drift between sub-agents on what counts as a usable screenshot.

INSPX does NOT emit a numeric worker score. It emits a manifest and per-checkpoint state. Calibration here governs state classification, not point bands.

### Severity definitions for this worker

- **CRITICAL**: page fails to render at the checkpoint. The sub-agent cannot produce a usable screenshot or DOM snapshot because the page itself is broken. Examples: 5xx from the hosting platform during checkpoint capture; blank white screen after navigate (chunk mismatch from stale dev server vs new build); JS crash before paint (`Cannot read properties of undefined` in client bundle); dev server returning compile error overlay instead of the page. Sub-agent emits checkpoint state `failed-cannot-capture` and halts the slice. Pipeline reports this as a HALT condition.
- **HIGH**: critical UI element missing or broken in a way that affects multiple checkpoints. The capture succeeds but the artefact is unusable for downstream review workers. Examples: navigation bar absent on all three viewports captured; primary CTA missing on the listing-detail and search-result variants; modal that should be open in two checkpoint setups never appears. Sub-agent emits `failed-element-missing` with the absent selector recorded. Pipeline continues other checkpoints but logs the HIGH for synthesis cross-checkpoint pattern detection.
- **MEDIUM**: visual regression vs baseline on a single checkpoint. The page renders, the elements are present, but the screenshot diff against a stored baseline exceeds the per-pixel tolerance on one checkpoint only. Examples: card padding drift on `/about` post-Morena rewrite; hero image swapped without updating the baseline; one badge colour shifted from sea to mist. Sub-agent emits `passed-with-regression` and includes diff image path.
- **LOW**: minor pixel drift within acceptable variance. The diff is below the configured tolerance OR caused by known sources (font anti-aliasing on macOS vs Linux runners, scrollbar width variance). Sub-agent emits `passed` and notes the drift in metadata. Pipeline ignores at synthesis.

### Score anchors (state classification, not numeric)

INSPX checkpoints classify into one of four states. Anchor each state with a concrete artefact the sub-agent can reason from.

- **Checkpoint passed**: capture succeeded, page rendered fully, all setup actions completed, no console errors above warn-level, network idle reached before screenshot. Reference artefact: 2026-04-25 `/agencies` trusted-list capture at 1280x800 - clean Playwright run, 0 console errors, screenshot bytes >100KB (proxy for "real content present").
- **Checkpoint passed-with-regression**: capture succeeded but pixel diff vs baseline exceeds tolerance on one checkpoint. Reference artefact: post-Morena-palette-shift homepage capture - intentional regression because baseline pre-dated the colour move; required baseline refresh, not page fix.
- **Checkpoint failed-element-missing**: capture succeeded but a required selector from the spec is absent. Reference artefact: 2026-05-11 broken-image-listings capture - the listing card rendered but the `img.listing-photo` selector returned an empty element list because the R2 URL 404'd. HIGH severity, surfaced to synthesis.
- **Checkpoint failed-cannot-capture**: navigate or setup-action threw, OR `page.screenshot` itself failed, OR the page stayed at the compile-error overlay. Reference artefact: any v3.30 dev-server-stale-after-pull capture - chunk hash mismatch, `next dev` served the new HTML against the old JS chunks, capture is `_error.tsx`. CRITICAL severity, halt slice.
- **Checkpoint flaky**: two consecutive captures of the same checkpoint with the same setup produced different states. Pipeline retries once; if still flaky, emit `flaky` with both screenshot variants attached. Reference artefact: any homepage capture with cookie banner mid-paint - banner present in screenshot A, dismissed in screenshot B because hydration timing differed by ~150ms.

### Recurring patterns this worker is calibrated against

The five failure modes INSPX has been TRAINX-patched to detect across the 2026-Q1 and Q2 sessions. Sub-agents load these as "known classification overrides" - if the sub-agent sees one of these, it classifies according to the pattern's prescribed state, not by its own intuition.

- **Pattern: Cookie banner mid-paint** - banner is present in the screenshot because the sub-agent captured before `cookie-banner-defer` script ran (v3.30 Tier 1 image perf sweep deferred this to LCP+50ms). State: `flaky` if banner presence varies between retries; `passed` if banner is consistently present (it is part of the page in that case). Do NOT classify as `failed-element-missing` just because expected content is partly occluded - the banner is intentional and the screenshot is the truth of what a real user sees.
- **Pattern: Stale-server-vs-new-build chunk mismatch** - `next dev` is running on port 4000 from before the last `git pull`, but the page source was rebuilt after pull. Sub-agent sees `_error.tsx` chunk-load-error overlay. State: `failed-cannot-capture`, CRITICAL. Synthesis must surface this as "kill dev server, restart, re-run pipeline" - it is NOT a code bug. Common after `/sync` runs or branch switches mid-session.
- **Pattern: Screenshot before hydration** - sub-agent fired `page.screenshot` before client JS hydrated, so interactive elements render in their server-rendered (default) state instead of their hydrated state. State: `passed-with-regression` if a baseline exists for the hydrated state; sub-agent must wait for `networkidle` AND `domcontentloaded` AND any explicit `waitForSelector` from the setup actions. The setup-action `wait: networkidle` is not always sufficient on its own - pages with analytics beacons or background polling keep network busy past hydration; pair with a specific element wait.
- **Pattern: Screenshot before lazy-loaded image** - hero or above-the-fold image has `loading="lazy"` and was below the viewport at capture time, OR is `next/image` with priority not set and hasn't unblurred yet. State: `passed-with-regression` (the image baseline is what we expect to see, the captured blur is the regression). Resolution: setup actions should include `await page.locator('img.hero').waitFor({ state: 'visible' })` before screenshot, or set viewport tall enough to include the image.
- **Pattern: Network failure during checkpoint capture** - object-storage image fetch failed, webhook timed out, third-party tile request 5xx'd. Page is otherwise fine. State: `passed-with-regression` if the failure is cosmetic (one tile, one image); `failed-element-missing` if the failure is a required content surface (e.g. primary photo on a detail page). Sub-agent attaches the failed-network-requests array to checkpoint metadata so synthesis can distinguish "Lost Monster is broken" from "the network was lossy this run".

### Calibration cross-reference

`.ai/thefirm/gaffer/calibration.md#inspx` - the entries to load are:
- Iris historically over-classifies "passed-with-regression" as `failed-element-missing` when the regression source is a known pattern (cookie banner, lazy image). Calibration: if the regression matches a Pattern entry above, use that pattern's prescribed state.
- Iris historically under-classifies `flaky` - retries once but does not always mark the second-run state as flaky if both runs eventually pass. Calibration: two different states across retries = `flaky` even if both are "passed" states (the difference itself is the signal for synthesis).

Last calibration update: 2026-05-12 by APEX (initial v4 anchor draft, awaiting TRAINX review).

---

## Slice Envelope (v4 INPUT-sliced)

INSPX fans out one sub-agent per checkpoint. Each sub-agent receives an envelope that extends `envelope-integrity.md` v2.0 with v4-specific INPUT-slice fields. The sub-agent's job is to capture ONE checkpoint, classify its state, and return a sub-fragment that the parent INSPX worker stitches into the unified manifest.

### Per-checkpoint sub-envelope template

```yaml
# Inherited from envelope-integrity.md base (role, playbook, mode, artefact, context,
# allowed_tools, budgets, output_contract, dispatch_id, dispatch_timestamp,
# gaffer_session_id) carried verbatim. INSPX-specific additions below.

parent_worker: INSPX
parent_envelope_hash: <sha256 of the parent INSPX envelope>
parent_dispatch_id: <uuid - correlates sub-fragment to parent envelope>

slice_axis: INPUT
slice_index: <integer, 1-indexed>      # CP-01 = 1, CP-02 = 2, etc
slice_total: <integer>                  # total checkpoint count for this run
slice_key: <string>                     # checkpoint identifier, e.g. "CP-03-mobile-empty-search"

slice_specific_input:
  checkpoint:
    name: <string>                      # human label, e.g. "Mobile empty search"
    url: <string>                       # repo-rooted or absolute, e.g. http://localhost:4000/search
    viewport:
      width: <integer>                  # 1280 desktop, 390 mobile
      height: <integer>                 # 800 desktop, 844 mobile
      device_scale_factor: <float>      # 1 desktop, 2 mobile (retina)
    setup_actions:                      # ordered list of Playwright operations
      - action: <navigate|click|fill|wait|scroll|evaluate>
        selector: <string|null>
        value: <string|null>            # for fill / evaluate
        timeout_ms: <integer>           # default 5000
    wait_conditions:                    # all must satisfy before screenshot
      - networkidle
      - domcontentloaded
      - <selector-wait>                 # e.g. "img.hero:visible"
    expected_selectors:                 # selectors that MUST be present for state=passed
      - <css selector>
    baseline_screenshot:                # optional - if provided, diff against this
      path: <repo-rooted path|null>
      sha256: <hex|null>
      tolerance_pct: <float>            # default 0.5 (per-pixel difference threshold)
    review_workers:                     # workers to feed this checkpoint to in Checkpoint Mode
      - <SOFAX|NIGELX|PIXLX|ALLYX|CONSX|AIDAX>
    focus: <string|null>                # what review workers should prioritise

slice_specific_rubric:                  # state classification rules for THIS checkpoint
  state_classifications:                # see Calibration Anchors > Score anchors
    - passed
    - passed-with-regression
    - failed-element-missing
    - failed-cannot-capture
    - flaky
  pattern_overrides:                    # apply these before generic classification
    - cookie-banner-mid-paint
    - stale-server-chunk-mismatch
    - screenshot-before-hydration
    - screenshot-before-lazy-image
    - network-failure-during-capture

depth: 1                                # MUST be 1 for sub-agents (parent INSPX is depth 0)
forbidden_actions:
  - recursive_Agent_calls               # depth: 2 is forbidden
  - parent_envelope_modification
  - edits_to_artefact                   # read-only inspection
```

### Per-checkpoint sub-fragment shape

Each sub-agent returns one sub-fragment conforming to `fragment-schema.md` v2.0 with INSPX-specific extensions. The parent INSPX worker reads N sub-fragments from `.ai/thefirm/gaffer/runs/<timestamp>/sub-fragments/INSPX/` and synthesises the unified manifest.

```yaml
# All fragment-schema.md v2.0 base fields carried verbatim. INSPX-specific:

slice_axis: INPUT
slice_index: <integer>                  # echoed from sub-envelope
slice_key: <string>                     # echoed from sub-envelope
parent_dispatch_id: <uuid>              # correlates back to parent INSPX envelope

checkpoint_result:
  name: <string>
  state: <passed|passed-with-regression|failed-element-missing|failed-cannot-capture|flaky>
  state_reason: <string>                # 1-2 sentence justification rooted in calibration
  pattern_override_applied: <string|null>  # which Pattern (if any) drove the classification

  artefacts:
    screenshot_path: <repo-rooted path>     # under .inspx-runs/<run_id>/
    screenshot_sha256: <hex>
    screenshot_bytes: <integer>
    diff_image_path: <repo-rooted|null>     # if baseline existed and was compared
    diff_pct: <float|null>                  # percentage of pixels differing
    accessibility_tree_path: <repo-rooted|null>
    console_errors:                         # captured during the run
      - level: <error|warn|info>
        message: <string>
        source: <string>
    failed_network_requests:                # any request with status >= 400
      - url: <string>
        status: <integer>
        method: <string>

  setup_actions_executed: <integer>     # how many setup actions completed before capture
  setup_actions_total: <integer>        # how many were in the envelope
  wait_conditions_met: <array>          # which wait conditions actually fired

  review_worker_invocations:            # if review workers ran in Checkpoint Mode
    - worker: <SOFAX|NIGELX|...>
      output_fragment_path: <repo-rooted>
      severity: <CRITICAL|MAJOR|MINOR|PASS>
```

### Synthesis Pattern B - cross-checkpoint manifest assembly

INSPX uses Pattern B from `synthesis-discipline.md` (input-aggregation with de-dup + cross-slice pattern detection). The parent worker's synthesis pass does the following, in order:

1. Validate every sub-fragment against the schema. Any malformed fragment downgrades worker confidence to MEDIUM; two or more = `gate: ERROR`.
2. Verify `parent_envelope_hash` and `parent_dispatch_id` on every sub-fragment match the dispatched envelope. Mismatch = BLOCKED per `envelope-integrity.md`.
3. Assemble the unified `inspx_manifest` per the format in `envelope-integrity.md` Section "INSPX manifest format". Every passing checkpoint contributes one entry; every failing checkpoint contributes one entry with `state` set accordingly.
4. Run cross-checkpoint pattern detection - the load-bearing v4 synthesis step. Look for:
   - **Same broken modal on N >= 2 pages**: if checkpoints CP-X and CP-Y both have `failed-element-missing` on the same selector, surface as cross-page pattern.
   - **Same console error on N >= 3 checkpoints**: indicates a global bundle bug, not a page bug. Severity HIGH; surface to synthesis with the error message and the checkpoints affected.
   - **Same failed network request on N >= 2 checkpoints**: indicates an integration outage, not a page bug. Sub-agent recommends `/healthcheck deep` before re-run.
   - **Pattern override applied on N >= 3 checkpoints**: e.g. cookie-banner-mid-paint hit on 3 checkpoints means the deferral is not landing in this run. Surface as infrastructure signal.
5. Emit the unified Pipeline Report. Halt-conditions (any CRITICAL from a `failed-cannot-capture`) surface immediately for re-run after fix; non-halt issues are aggregated and presented to Gaffer for sign-off.

### Storage layout per run

```
.inspx-runs/<run_id>/
  manifest.json                         # unified manifest (envelope-integrity.md format)
  checkpoints/
    CP-01-<slug>/
      screenshot.png
      screenshot.sha256
      accessibility-tree.json
      console.log
      network.log
      diff.png                          # if baseline existed
    CP-02-<slug>/
      ...

.ai/thefirm/gaffer/runs/<timestamp>/
  fragments/
    INSPX-FULL.yaml                     # parent INSPX worker's fragment (Gaffer-facing)
  sub-fragments/
    INSPX/
      CP-01-<slug>.yaml                 # one sub-fragment per checkpoint
      CP-02-<slug>.yaml
      ...
```

Retention: 30 days minimum (matches v2/v3 fragment retention). `.inspx-runs/` is gitignored.

### Failure modes specific to INSPX INPUT-slicing

- **Sub-agent timeout on one checkpoint**: per `internal-fanout-v4.md` Q2, INSPX waits up to 180s per sub-agent, then proceeds with N-1 checkpoints. The missing checkpoint emits `state: failed-cannot-capture` with `state_reason: "sub-agent timeout"`. Worker confidence downgrades to MEDIUM if any slice timed out.
- **Catastrophic sub-wave failure (all sub-agents fail)**: per Q6, no fallback to single-context single-pass. INSPX emits worker ERROR. Sequential fallback would hide the v4-specific failure mode (likely the parent envelope is corrupt or the run_id directory is unwritable).
- **Cross-checkpoint contradiction**: per Q7, if CP-X says `passed` and CP-Y on the same URL different viewport says `failed-element-missing`, synthesis must articulate the contradiction in the cross-checkpoint pattern section. Hiding the contradiction = Frank #19 fail.

Last updated: 2026-05-12 (v4 INSPX restructure).
