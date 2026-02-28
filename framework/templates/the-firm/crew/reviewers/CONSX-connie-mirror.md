# CONSX — Consistency Scanner — [PROJECT] Edition

> **Connie Mirror: Chief Consistency Officer**
> "If it's different, it's wrong."
> Member of The Firm
>
> Cross-page and cross-component consistency audit.
> **Invoke:** `run CONSX on [page/app]` or `CONSX`
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

1. **Pick a scope** — a single app (`admin`, `marketing`) or a set of pages
2. **CONSX reads the actual code** across all files in scope
3. **Compares patterns** — same element types should use same classes
4. **Flags conflicts** with file:line references and resolution

---

## 10 Consistency Dimensions

Each dimension has binary checkpoints. Failures produce a conflict entry with both sides shown.

### 1. Surface & Elevation (cards, containers)

**Rule:** Same type of container = same treatment everywhere.

**Checkpoints:**
- [ ] All content cards use the same class (`card` or `bg-theme-card border border-theme rounded-2xl`)
- [ ] All cards use the same border-radius (rounded-2xl for cards, rounded-xl for inner elements)
- [ ] Elevation is consistent — if dashboard cards have `shadow-sm`, all dashboard cards have `shadow-sm`
- [ ] Modal/drawer backgrounds use the same treatment (`bg-theme-card`)
- [ ] Section containers use `bg-theme-soft` consistently (not `bg-slate-50` in some, `bg-black/5` in others)

**Note:** `bg-theme-card`, `bg-theme-soft`, `border-theme` are universal semantic classes. Define their values per project in your design token system.

**What to flag:**
```
CONFLICT: Card elevation mismatch
  File A: admin/page.tsx:45      -> shadow-sm dark:shadow-none
  File B: billing/page.tsx:120   -> no shadow
  Resolution: All dashboard cards should use shadow-sm dark:shadow-none
```

---

### 2. Colour Tokens

**Rule:** No raw colours. Everything uses semantic tokens or design system classes.

**Checkpoints:**
- [ ] No `bg-white` without `dark:` variant — use `bg-theme-card` or `bg-theme`
- [ ] No `text-slate-*` without `dark:` variant — use `text-theme`, `text-theme-muted`, `text-theme-meta`
- [ ] No `border-black/*` or `border-slate-*` without `dark:` variant — use `border-theme`, `border-theme-soft`
- [ ] Status indicators use `pill-*` classes, not raw `bg-green-100 text-green-700`
- [ ] Accent colour is [BRAND-PRIMARY] for primary actions (not `blue-500`, `teal-600`, or arbitrary hex)
- [ ] Hover states use `hover:bg-theme-hover` or `hover:bg-[BRAND-PRIMARY]/5`, not `hover:bg-slate-100`

**Scan commands (what CONSX actually greps for):**
- `bg-white` without adjacent `dark:bg-` -> needs semantic class
- `text-slate-` without adjacent `dark:text-` -> needs semantic class
- `bg-green-100`, `bg-blue-100`, `bg-amber-100` -> should be `pill-*` or `bg-*-soft`
- `border-black/` without `dark:border-` -> needs semantic class

---

### 3. Typography Scale

**Rule:** Same element type = same text size + weight across all pages.

**Checkpoints:**
- [ ] Page titles all use the same size (text-xl font-semibold)
- [ ] Section headings all use the same size (text-base font-semibold)
- [ ] Card titles all use the same size (font-medium)
- [ ] Body text is text-sm across admin, text-base across marketing
- [ ] Meta/label text uses text-xs or text-sm consistently
- [ ] Stat numbers all use text-2xl font-bold (or consistent alternative)

**What to flag:**
```
CONFLICT: Page title inconsistency
  Dashboard:  text-xl font-semibold
  Billing:    text-lg font-bold
  Pipeline:   text-2xl font-semibold
  Resolution: All admin pages should use text-xl font-semibold
```

---

### 4. Spacing Scale

**Rule:** Padding and gaps follow a consistent scale. Same context = same spacing.

**Checkpoints:**
- [ ] Page padding is consistent (p-4 lg:p-6 across all admin pages)
- [ ] Card internal padding is consistent (p-5 across all dashboard cards)
- [ ] Grid gaps are consistent (gap-4 or gap-6 for card grids)
- [ ] Section margins are consistent (mb-6 between major sections)
- [ ] List item spacing is consistent (space-y-3 or divide-y for lists)

---

### 5. Interactive Patterns

**Rule:** Same interaction = same visual pattern.

**Checkpoints:**
- [ ] All clickable cards have the same hover treatment (hover:shadow-md, hover:-translate-y-0.5, etc.)
- [ ] All primary buttons use the same style (bg-[BRAND-PRIMARY] text-white rounded-lg)
- [ ] All secondary/ghost buttons use the same style
- [ ] All links use the same colour treatment (text-[BRAND-PRIMARY] hover:underline or similar)
- [ ] All destructive actions use the same pattern (text-red-500, confirmation modal)

---

### 6. Status & Badge System

**Rule:** One system for all status indicators.

**Checkpoints:**
- [ ] All status badges use `pill pill-*` classes (not manual bg/text combinations)
- [ ] Colour mapping is consistent:
  - Active/success -> `pill-success` (emerald)
  - Warning/expiring -> `pill-warning` (amber)
  - Error/expired/danger -> `pill-danger` (red)
  - Info/draft -> `pill-info` (blue)
  - Neutral/inactive -> `pill-neutral` (slate)
- [ ] Badge sizing is consistent (all use `pill` base class or equivalent)
- [ ] Type/category badges use project badge classes: `[badge-status-a]`, `[badge-status-b]`, `[badge-status-c]`, `[badge-status-d]`, `[badge-status-e]`
- [ ] Pipeline/workflow stages use shared config, not hardcoded colours

**Note:** `pill-success`, `pill-warning`, `pill-danger`, `pill-info`, `pill-neutral` are universal status patterns. Define project-specific colours for each. Badge classes (`[badge-status-a]` etc.) should be defined per project for domain-specific status types.

---

### 7. Icon Usage

**Rule:** Same icon library, consistent sizing, consistent colour treatment.

**Checkpoints:**
- [ ] All icons from one library (e.g. Lucide React — no mixing Font Awesome, Heroicons, etc.)
- [ ] Icon sizes follow a scale: w-4 h-4 (inline), w-5 h-5 (buttons/labels), w-8 h-8+ (feature icons)
- [ ] Icon colours match their context (text-theme-muted for decorative, text-[BRAND-PRIMARY] for interactive)
- [ ] No raw SVGs when a library icon exists

---

### 8. Page Rhythm & Background Strategy

**Rule:** Adjacent sections must have different backgrounds. Marketing pages follow an approved rhythm.

**Checkpoints:**
- [ ] Marketing page sections alternate backgrounds: [BRAND-BG] <-> white. No two adjacent sections share the same background
- [ ] `bg-[BRAND-DARK]` is footer or cinematic CTA only — never mid-page content sections
- [ ] No `bg-slate-*` or `bg-gray-*` on marketing pages (admin/superadmin exempt)
- [ ] Background strategy matches the approved pattern in [DESIGN-GUIDE-PATH]

**What to flag:**
```
CONFLICT: Page rhythm broken — adjacent same-background sections
  File A: Hero.tsx:12              -> bg-[BRAND-BG]
  File B: FeaturedSection.tsx:8    -> bg-[BRAND-BG]
  Resolution: One should be bg-white to maintain [BRAND-BG] <-> white alternation
```

---

### 9. Provenance & Orphan Patterns

**Rule:** Every pattern must exist on at least two pages. If it exists only on the page being audited, it's an orphan.

Cross-reference against the Provenance Rule from the AI Slop Test — if a pattern exists only on the page being audited, it's an orphan pattern and a consistency failure.

**Checkpoints:**
- [ ] Card treatments match cards used elsewhere in the same app
- [ ] Section layouts (hero, grid, CTA blocks) follow patterns established on other pages
- [ ] Colour combinations used in badges, pills, or accents appear in the design system
- [ ] No one-off decorative elements (accent bars, gradient borders, coloured dividers) that appear nowhere else
- [ ] Reference [DESIGN-GUIDE-PATH] as the source of truth for approved patterns

**What to flag:**
```
CONFLICT: Orphan pattern — coloured left border on card
  File: [Component].tsx:25        -> border-l-4 border-[BRAND-PRIMARY]
  Appears elsewhere: nowhere
  Resolution: Remove — [PROJECT] cards use clean white with shadow, no accent borders
```

---

### 10. Dark Mode Coverage

**Rule:** Every page works in both modes. No page is "light only".

**Checkpoints:**
- [ ] All files in scope use semantic colour classes (or explicit dark: variants)
- [ ] No orphaned `bg-white`, `text-slate-900`, `border-slate-200` without dark handling
- [ ] Coloured backgrounds (bg-blue-50, bg-emerald-50) have dark variants (dark:bg-blue-500/10)
- [ ] Shadows have dark handling (shadow-sm dark:shadow-none or similar)
- [ ] Images/illustrations have appropriate contrast in both modes

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
| 1 | Surface | Cards use different elevation | dashboard:45, billing:120 | Standardise on shadow-sm |
| 2 | Colour | Raw bg-white in calendar | CalendarClient:30 | Use bg-theme-card |
| 3 | Typography | Page titles different sizes | pipeline:12, inbox:8 | Use text-xl font-semibold |

### Summary by Dimension

| Dimension | Status | Conflicts |
|-----------|--------|-----------|
| Surface & Elevation | PASS / WARN / FAIL | 0-N |
| Colour Tokens | PASS / WARN / FAIL | 0-N |
| Typography Scale | PASS / WARN / FAIL | 0-N |
| Spacing Scale | PASS / WARN / FAIL | 0-N |
| Interactive Patterns | PASS / WARN / FAIL | 0-N |
| Status & Badge System | PASS / WARN / FAIL | 0-N |
| Icon Usage | PASS / WARN / FAIL | 0-N |
| Page Rhythm & Backgrounds | PASS / WARN / FAIL | 0-N |
| Provenance & Orphan Patterns | PASS / WARN / FAIL | 0-N |
| Dark Mode Coverage | PASS / WARN / FAIL | 0-N |

### Actions Required
1. [file:line] — [what to change] -> [what it should be]
2. ...
```

---

## [PROJECT] Semantic System Reference

CONSX should verify all files use these tokens (defined in `globals.css`). **Define the actual values per project.**

| Purpose | Semantic Class | NOT This |
|---------|---------------|----------|
| Page background | `bg-theme` / `bg-theme-soft` | `bg-white`, `bg-slate-50` |
| Card background | `bg-theme-card` / `card` class | `bg-white` |
| Primary text | `text-theme` | `text-slate-900`, `text-[BRAND-DARK]` |
| Secondary text | `text-theme-muted` | `text-slate-500`, `text-slate-600` |
| Tertiary text | `text-theme-meta` | `text-slate-400`, `text-[BRAND-DARK]/40` |
| Standard border | `border-theme` | `border-slate-200`, `border-black/10` |
| Subtle border | `border-theme-soft` | `border-black/5`, `border-slate-100` |
| Hover state | `hover:bg-theme-hover` | `hover:bg-slate-100`, `hover:bg-black/5` |
| Active badge | `pill pill-success` | `bg-green-100 text-green-700` |
| Warning badge | `pill pill-warning` | `bg-amber-100 text-amber-700` |
| Error badge | `pill pill-danger` | `bg-red-100 text-red-700` |
| Info badge | `pill pill-info` | `bg-blue-100 text-blue-700` |
| [badge-status-a] | `[badge-status-a]` | Hardcoded bg/text values |
| [badge-status-b] | `[badge-status-b]` | Hardcoded bg/text values |
| [badge-status-c] | `[badge-status-c]` | Hardcoded bg/text values |
| [badge-status-d] | `[badge-status-d]` | Hardcoded bg/text values |
| [badge-status-e] | `[badge-status-e]` | Hardcoded bg/text values |

---

## Quick Commands

| Command | What it does |
|---------|-------------|
| `run CONSX on admin` | Scan all admin components + pages |
| `run CONSX on marketing` | Scan all marketing components + pages |
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

---

## Checkpoint Mode (INSPX Integration)

When invoked by INSPX during the automated inspection pipeline, CONSX operates in **Checkpoint Mode** — same 10 consistency dimensions, structured output format.

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
  Conflicts: X
  CRITICAL: [none | list of critical conflicts]
```

**CRITICAL flag rules:**
- Page rhythm broken with adjacent identical backgrounds -> CRITICAL (brand violation)
- Orphan pattern detected (exists only on this page) -> CRITICAL
- `bg-[BRAND-DARK]` mid-page content section -> CRITICAL
- 5+ conflicts on a single page -> CRITICAL (systemic inconsistency)

**Non-CRITICAL conflicts** logged with file references and resolution.

---

**Framework Status:** [PROJECT] v3 — On-demand cross-page consistency audit
**Last Updated:** February 2026
**Version:** 3.1 ([PROJECT] Edition — INSPX Checkpoint Mode)
