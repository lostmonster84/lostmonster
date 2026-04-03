# CONSX — Consistency Scanner v3

> **Purpose:** Cross-page and cross-component consistency audit.
> **Invoke:** `run CONSX on [page/app]` or `CONSX`
> **Last Updated:** March 2026

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[BRAND-PRIMARY]` | #06B6D4 (teal) | CLAUDE.md |
| `[BRAND-BG]` | Dark/black backgrounds | CLAUDE.md |
| `[BRAND-DARK]` | Dark theme with glassmorphism | CLAUDE.md |
| `[BRAND-MUTED]` | Muted grays/slate | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
<!-- ONBOARD:END -->

---

## SOPHIA vs CONSX

| | SOPHIA | CONSX |
|---|--------|-------|
| **Scope** | Single page, in depth | Across pages, breadth |
| **Question** | "Is this page well-designed?" | "Are all pages consistent with each other?" |
| **Output** | Design quality score (0-100) | Conflict list with resolution |
| **When** | Evaluating a specific page | After building multiple pages, or before shipping |

**Run SOPHIA first** on individual pages. **Run CONSX after** to catch cross-page drift.

---

## How It Works

1. **Pick a scope** — a single app or a set of pages
2. **CONSX reads the actual code** across all files in scope
3. **Compares patterns** — same element types should use same classes
4. **Flags conflicts** with file:line references and resolution

---

## 10 Consistency Dimensions

Each dimension has binary checkpoints. Failures produce a conflict entry with both sides shown.

### 1. Surface & Elevation (cards, containers)

**Rule:** Same type of container = same treatment everywhere.

**Checkpoints:**
- [ ] All content cards use the same class
- [ ] All cards use the same border-radius
- [ ] Elevation is consistent across same-type cards
- [ ] Modal/drawer backgrounds use the same treatment
- [ ] Section containers use consistent background tokens

**What to flag:**
```
CONFLICT: Card elevation mismatch
  File A: page-a.tsx:45      → shadow-sm dark:shadow-none
  File B: page-b.tsx:120     → no shadow
  Resolution: All dashboard cards should use shadow-sm dark:shadow-none
```

---

### 2. Colour Tokens

**Rule:** No raw colours. Everything uses semantic tokens or design system classes.

**Checkpoints:**
- [ ] No `bg-white` without `dark:` variant — use semantic class
- [ ] No raw text colours without `dark:` variant — use semantic classes
- [ ] No raw border colours without `dark:` variant — use semantic classes
- [ ] Status indicators use design system classes, not raw colour combinations
- [ ] Accent colour is #06B6D4 (teal) for primary actions (not arbitrary alternatives)
- [ ] Hover states use semantic hover classes

**Scan commands (what CONSX actually greps for):**
- `bg-white` without adjacent `dark:bg-` → needs semantic class
- Raw colour classes without adjacent `dark:` → needs semantic class
- Status badge colours not from design system → should be standardised

---

### 3. Typography Scale

**Rule:** Same element type = same text size + weight across all pages.

**Checkpoints:**
- [ ] Page titles all use the same size
- [ ] Section headings all use the same size
- [ ] Card titles all use the same size
- [ ] Body text consistent across same app context
- [ ] Meta/label text uses consistent sizing
- [ ] Stat numbers all use consistent large bold treatment

---

### 4. Spacing Scale

**Rule:** Padding and gaps follow a consistent scale. Same context = same spacing.

**Checkpoints:**
- [ ] Page padding is consistent across all pages
- [ ] Card internal padding is consistent
- [ ] Grid gaps are consistent
- [ ] Section margins are consistent
- [ ] List item spacing is consistent

---

### 5. Interactive Patterns

**Rule:** Same interaction = same visual pattern.

**Checkpoints:**
- [ ] All clickable cards have the same hover treatment
- [ ] All primary buttons use the same style (#06B6D4 (teal) based)
- [ ] All secondary/ghost buttons use the same style
- [ ] All links use the same colour treatment
- [ ] All destructive actions use the same pattern

---

### 6. Status & Badge System

**Rule:** One system for all status indicators.

**Checkpoints:**
- [ ] All status badges use design system classes (not manual bg/text combinations)
- [ ] Colour mapping is consistent (success/warning/danger/info/neutral)
- [ ] Badge sizing is consistent
- [ ] Entity-specific badges use established classes
- [ ] Stages/pipelines use shared config, not hardcoded colours

---

### 7. Icon Usage

**Rule:** Same icon library, consistent sizing, consistent colour treatment.

**Checkpoints:**
- [ ] All icons from one library (no mixing)
- [ ] Icon sizes follow a scale
- [ ] Icon colours match their context
- [ ] No raw SVGs when a library icon exists

---

### 8. Page Rhythm & Background Strategy

**Rule:** Adjacent sections must have different backgrounds. Pages follow an approved rhythm.

**Checkpoints:**
- [ ] Page sections alternate backgrounds per approved pattern. No two adjacent sections share the same background
- [ ] Dark backgrounds used only for footer/cinematic CTA — never mid-page content sections
- [ ] No unapproved background colours on public pages
- [ ] Background strategy matches the approved pattern in website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md

**What to flag:**
```
CONFLICT: Page rhythm broken — adjacent identical background sections
  File A: Hero.tsx:12          → Dark/black backgrounds
  File B: FeaturedSection.tsx:8 → Dark/black backgrounds
  Resolution: One should use alternate background to maintain rhythm
```

---

### 9. Provenance & Orphan Patterns

**Rule:** Every pattern must exist on at least two pages. If it exists only on the page being audited, it's an orphan.

Cross-reference against the Provenance Rule from the AI Slop Test — if a pattern exists only on the page being audited, it's an orphan pattern and a consistency failure.

**Checkpoints:**
- [ ] Card treatments match cards used elsewhere in the same app
- [ ] Section layouts follow patterns established on other pages
- [ ] Colour combinations used in badges, pills, or accents appear in the design system
- [ ] No one-off decorative elements that appear nowhere else
- [ ] Reference website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md as the source of truth for approved patterns

---

### 10. Dark Mode Coverage

**Rule:** Every page works in both modes. No page is "light only".

**Checkpoints:**
- [ ] All files in scope use semantic colour classes (or explicit dark: variants)
- [ ] No orphaned light-only colours without dark handling
- [ ] Coloured backgrounds have dark variants
- [ ] Shadows have dark handling
- [ ] Images/illustrations have appropriate contrast in both modes

---

### 11. Page Scope & Information Architecture

**Rule:** Each page/tab/view has one clear purpose.

**Checkpoints:**
- [ ] Each view/tab has a single, describable purpose (5 words or fewer)
- [ ] New elements serve that purpose, not a tangential one
- [ ] No "while we're here" additions that serve a different job
- [ ] Tabs within a page have distinct, non-overlapping scopes
- [ ] If a page has grown a new section, ask: should this be its own tab/page instead?

---

## Output Format

Every CONSX audit produces this structure:

```
## CONSX Audit: [Scope]

**Scope:** [which files/pages were scanned]
**Files scanned:** [count]
**Conflicts found:** [count]

### Conflict List

| # | Dimension | Conflict | Files | Resolution |
|---|-----------|----------|-------|------------|

### Summary by Dimension

| Dimension | Status | Conflicts |
|-----------|--------|-----------|

### Actions Required
1. [file:line] — [what to change] → [what it should be]
```

---

## Quick Commands

| Command | What it does |
|---------|-------------|
| `run CONSX on [app]` | Scan all components + pages |
| `run CONSX colours` | Colour token audit only |
| `run CONSX dark` | Dark mode coverage scan only |
| `run CONSX badges` | Status badge consistency scan |
| `run CONSX on [file]` | Single file against established patterns |

---

## Integration

**CONSX + SOPHIA:** SOPHIA scores a single page. CONSX ensures all pages match each other. Run SOPHIA per-page, then CONSX across pages.

**CONSX + HARDX:** HARDX finds hardcoded values (magic numbers, inline strings). CONSX finds inconsistent patterns. Different angles on the same problem.

**CONSX + TERRX:** After fixing CONSX conflicts, run Terry to verify nothing broke.

---

## Checkpoint Mode (INSPX Integration)

When invoked by INSPX during the automated inspection pipeline, CONSX operates in **Checkpoint Mode** — same consistency dimensions, structured output format.

**What CONSX receives:**
- Screenshot from Playwright (specific viewport)
- Checkpoint metadata (page name, URL, viewport, focus area)
- Feature context (what was built/changed)

**What CONSX returns:**

```
CONSX CHECKPOINT: [Checkpoint Name] ([viewport])
  Dimensions checked:
    1. Surface & Elevation:    PASS | CONFLICT [details]
    2. Colour Tokens:          PASS | CONFLICT [details]
    3. Typography Scale:       PASS | CONFLICT [details]
    4. Spacing Scale:          PASS | CONFLICT [details]
    5. Interactive Patterns:   PASS | CONFLICT [details]
    6. Status & Badge System:  PASS | CONFLICT [details]
    7. Icon Usage:             PASS | CONFLICT [details]
    8. Page Rhythm:            PASS | CONFLICT [details]
    9. Provenance:             PASS | CONFLICT [details]
    10. Dark Mode Coverage:    PASS | CONFLICT [details]
    11. Page Scope & IA:       PASS | CONFLICT [details]
  Conflicts: X
  CRITICAL: [none | list of critical conflicts]
```

**CRITICAL flag rules:**
- Page rhythm broken with adjacent identical backgrounds → CRITICAL (brand violation)
- Orphan pattern detected (exists only on this page) → CRITICAL
- Dark background mid-page content section → CRITICAL
- 5+ conflicts on a single page → CRITICAL (systemic inconsistency)
- Page scope violation (element serves different purpose than page) → CRITICAL

**Non-CRITICAL conflicts** logged with file references and resolution.

---


---

## Supplements

Before starting work, check for a relevant supplement in `reviewers/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic v3 — On-demand cross-page consistency audit
**Last Updated:** March 2026
**Version:** 3.2 (Page Scope & IA dimension added)
