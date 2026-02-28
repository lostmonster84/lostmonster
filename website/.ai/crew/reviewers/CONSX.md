# CONSX — Consistency Scanner — Lost Monster Edition v3

> **Purpose:** Cross-page and cross-component consistency audit.
> **Invoke:** `run CONSX on [page/app]` or `CONSX`
> **Last Updated:** February 2026

---

## SOPHIA vs CONSX

| | SOPHIA | CONSX |
|---|--------|-------|
| **Scope** | Single page, in depth | Across pages, breadth |
| **Question** | "Is this page well-designed?" | "Are all pages consistent with each other?" |
| **Output** | Design quality score (0-110) | Conflict list with resolution |
| **When** | Evaluating a specific page | After building multiple pages, or before shipping |

**Run SOPHIA first** on individual pages. **Run CONSX after** to catch cross-page drift.

---

## How It Works

1. **Pick a scope** — the full site or a set of pages
2. **CONSX reads the actual code** across all files in scope
3. **Compares patterns** — same element types should use same classes
4. **Flags conflicts** with file:line references and resolution

---

## 10 Consistency Dimensions

Each dimension has binary checkpoints. Failures produce a conflict entry with both sides shown.

### 1. Surface & Elevation (cards, containers)

**Rule:** Same type of container = same treatment everywhere.

**Checkpoints:**
- [ ] All content cards use glassmorphism (`bg-white/5 backdrop-blur-md border rounded-xl`)
- [ ] All cards use the same border-radius (`rounded-xl` for cards, `rounded-lg` for buttons/inner elements)
- [ ] Card borders all use accent at 20% opacity (`borderColor: color.accent + '20'`)
- [ ] All sections use dark gradient background (`style={{ background: color.bgGradient }}`)
- [ ] No competing card treatments (some glassmorphism, some bg-white, some shadow-md)

**What to flag:**
```
CONFLICT: Card elevation mismatch
  File A: app/portfolio/page.tsx:45      -> bg-white/5 backdrop-blur-md
  File B: app/services/page.tsx:120      -> bg-white rounded-xl shadow-md
  Resolution: All cards should use bg-white/5 backdrop-blur-md (glassmorphism)
```

---

### 2. Colour Tokens

**Rule:** No hardcoded colours. Everything uses the dynamic colour system.

**Checkpoints:**
- [ ] No `bg-white` as page/section backgrounds — all pages use dark gradient via `color.bgGradient`
- [ ] No hardcoded accent colours (`text-blue-500`, `bg-teal-600`) — use `style={{ color: color.accent }}`
- [ ] No `text-slate-*` for body text — use `text-white`, `text-neutral-300`, or `text-neutral-400`
- [ ] No `border-black/*` or `border-slate-*` — use `borderColor: color.accent + '20'` or `border-neutral-700`
- [ ] Accent colour is always from `color.accent` for primary actions (never hardcoded hex)
- [ ] Hover states use opacity/scale changes, not hardcoded hover colours (`hover:bg-slate-100` is wrong)

**Scan commands (what CONSX actually greps for):**
- `bg-white` without being `bg-white/5` -> needs glassmorphism
- `text-blue-`, `text-teal-`, `text-purple-`, `text-green-`, `text-orange-` as accent -> should use `color.accent`
- `bg-blue-`, `bg-teal-`, `bg-purple-` etc. -> should use dynamic system
- `text-slate-` -> should be `text-white`, `text-neutral-300`, or `text-neutral-400`
- `bg-gray-`, `bg-slate-` as backgrounds -> should be dark gradient

---

### 3. Typography Scale

**Rule:** Same element type = same text size + weight across all pages.

**Checkpoints:**
- [ ] Hero headlines all use the same responsive scale (`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold`)
- [ ] Section headings all use `text-4xl md:text-6xl font-bold` (or consistent alternative)
- [ ] Card titles all use the same size (`text-xl font-bold` or consistent alternative)
- [ ] Body text is `text-lg` or `text-xl` for marketing content
- [ ] Meta/label text uses `text-sm` or `text-xs` with `text-neutral-400`
- [ ] Stat numbers all use `text-4xl font-bold text-white` (or consistent alternative)

**What to flag:**
```
CONFLICT: Section headline inconsistency
  Homepage:   text-4xl md:text-6xl font-bold
  Services:   text-3xl font-semibold
  Portfolio:  text-5xl font-bold
  Resolution: All section headlines should use text-4xl md:text-6xl font-bold
```

---

### 4. Spacing Scale

**Rule:** Padding and gaps follow a consistent scale. Same context = same spacing.

**Checkpoints:**
- [ ] Page container padding is consistent (`container mx-auto px-6` across all pages)
- [ ] Card internal padding is consistent (`p-6` across all glassmorphism cards)
- [ ] Grid gaps are consistent (`gap-6` for card grids)
- [ ] Section vertical padding is consistent (`py-20 md:py-32` between major sections)
- [ ] Headline bottom margin is consistent (`mb-8` after headlines)

---

### 5. Interactive Patterns

**Rule:** Same interaction = same visual pattern.

**Checkpoints:**
- [ ] All clickable cards have the same hover treatment (`hover:bg-white/10 transition-all`)
- [ ] All primary buttons use dynamic accent (`style={{ backgroundColor: color.accent }}` with `rounded-lg font-bold`)
- [ ] All secondary buttons use `border-2 border-neutral-700 text-white`
- [ ] All links use accent colour for interactive state (`style={{ color: color.accent }}`)
- [ ] All transitions use consistent timing (`duration-300` for interactions, `duration-700` for colour theme changes)

---

### 6. Status & Badge System

**Rule:** One system for all status indicators.

**Checkpoints:**
- [ ] All status badges use consistent semantic colours (green=success, amber=warning, red=danger)
- [ ] Colour mapping is consistent:
  - Active/success -> emerald tints
  - Warning -> amber tints
  - Error/danger -> red tints
  - Info -> accent colour
  - Neutral/inactive -> neutral-400/500
- [ ] Badge sizing is consistent (same padding, font-size, border-radius)
- [ ] Technology/category tags use consistent treatment (subtle, doesn't compete with content)
- [ ] All badges respect the glassmorphism aesthetic (no solid bright backgrounds)

---

### 7. Icon Usage

**Rule:** Same icon library, consistent sizing, consistent colour treatment.

**Checkpoints:**
- [ ] All icons from Lucide React (no mixing Font Awesome, Heroicons, etc.)
- [ ] Icon sizes follow a scale: `w-4 h-4` (inline), `w-5 h-5` (buttons/labels), `w-8 h-8`+ (feature icons)
- [ ] Icon colours match their context (`text-neutral-400` for decorative, `style={{ color: color.accent }}` for interactive/featured)
- [ ] No raw SVGs when a Lucide icon exists
- [ ] Arrow icons use `ArrowRight` consistently (not mixed with ChevronRight)

---

### 8. Page Rhythm & Background Strategy

**Rule:** All pages use dark gradient backgrounds. No light sections. Glassmorphism cards provide contrast.

**Checkpoints:**
- [ ] All pages use `color.bgGradient` (or equivalent dark gradient) as the base
- [ ] No `bg-white` or `bg-gray-*` as section backgrounds
- [ ] Grid pattern background texture present on all pages
- [ ] Sections are separated by spacing (`py-20 md:py-32`), not by background colour changes
- [ ] Background strategy matches the homepage pattern (`.ai/LOST-MONSTER-DESIGN-SYSTEM.md`)

**What to flag:**
```
CONFLICT: Page background inconsistency
  File A: app/page.tsx:80            -> style={{ background: color.bgGradient }}
  File B: app/services/page.tsx:12   -> className="bg-white"
  Resolution: All pages use dark gradient background via color.bgGradient
```

---

### 9. Provenance & Orphan Patterns

**Rule:** Every pattern must exist on at least two pages. If it exists only on the page being audited, it's an orphan.

Cross-reference against the Provenance Rule from the AI Slop Test — if a pattern exists only on the page being audited, it's an orphan pattern and a consistency failure.

**Checkpoints:**
- [ ] Card treatments match cards used on the homepage
- [ ] Section layouts (hero, grid, CTA blocks) follow patterns established on the homepage
- [ ] Colour usage matches the dynamic colour system (no one-off hex values)
- [ ] No one-off decorative elements (accent bars, gradient borders, coloured dividers) that appear nowhere else
- [ ] Reference `.ai/LOST-MONSTER-DESIGN-SYSTEM.md` as the source of truth for approved patterns

**What to flag:**
```
CONFLICT: Orphan pattern — coloured left border on card
  File: app/services/ServiceCard.tsx:25     -> border-l-4 border-blue-500
  Appears elsewhere: nowhere
  Resolution: Remove — Lost Monster cards use glassmorphism with subtle accent border, no accent bars
```

---

### 10. Dark Mode Coverage

**Rule:** Lost Monster IS dark mode. Every element must be designed for dark backgrounds. There is no light mode.

**Checkpoints:**
- [ ] All files use dark-compatible colour classes (text-white, text-neutral-300, text-neutral-400)
- [ ] No orphaned `bg-white`, `text-slate-900`, `border-slate-200` without dark context
- [ ] All cards use `bg-white/5` (not `bg-white`)
- [ ] Borders use accent opacity or neutral-700 (not `border-gray-200`)
- [ ] All text is readable on dark gradient backgrounds

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
| 1 | Surface | Cards use different treatments | portfolio:45, services:120 | Standardise on bg-white/5 backdrop-blur-md |
| 2 | Colour | Hardcoded blue-500 accent | ServicesPage:30 | Use style={{ color: color.accent }} |
| 3 | Typography | Section headlines different sizes | services:12, portfolio:8 | Use text-4xl md:text-6xl font-bold |

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

## Lost Monster Design System Reference

CONSX should verify all files use these patterns consistently.

| Purpose | Correct Pattern | NOT This |
|---------|----------------|----------|
| Page background | `style={{ background: color.bgGradient }}` | `bg-white`, `bg-gray-50`, `bg-slate-50` |
| Card background | `bg-white/5 backdrop-blur-md` | `bg-white`, `bg-gray-100`, `shadow-md` |
| Primary text | `text-white` | `text-slate-900`, `text-gray-900` |
| Secondary text | `text-neutral-300` | `text-slate-500`, `text-gray-600` |
| Muted/meta text | `text-neutral-400` | `text-slate-400`, `text-gray-400` |
| Standard border | `borderColor: color.accent + '20'` | `border-slate-200`, `border-gray-200` |
| Neutral border | `border-neutral-700` | `border-black/10`, `border-slate-300` |
| Primary CTA | `style={{ backgroundColor: color.accent }}` | `bg-blue-600`, `bg-teal-500` |
| Secondary CTA | `border-2 border-neutral-700 text-white` | `bg-gray-200 text-gray-800` |
| Hover state | `hover:bg-white/10` or opacity/scale change | `hover:bg-slate-100`, `hover:bg-gray-50` |
| Accent text | `style={{ color: color.accent }}` | `text-blue-500`, `text-teal-600` |
| Card border-radius | `rounded-xl` | `rounded-lg`, `rounded-2xl` |
| Hero typography | `text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold` | `text-4xl font-medium` |
| Section headline | `text-4xl md:text-6xl font-bold` | `text-2xl font-semibold` |

---

## Quick Commands

| Command | What it does |
|---------|-------------|
| `run CONSX on site` | Scan all pages and components |
| `run CONSX on app/` | Scan all page files |
| `run CONSX colours` | Colour token audit only (find hardcoded colours) |
| `run CONSX typography` | Typography consistency scan |
| `run CONSX cards` | Card treatment consistency scan |
| `run CONSX on [file]` | Single file against established patterns |

---

## Integration

**CONSX + SOPHIA:** SOPHIA scores a single page. CONSX ensures all pages match each other. Run SOPHIA per-page, then CONSX across pages.

**CONSX + PIXLX:** PIXLX finds bugs. CONSX finds inconsistencies. Different angles on the same problem.

**CONSX + AIDAX:** AIDAX ensures conversion structure. CONSX ensures that structure is applied consistently across all marketing pages.

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
- Light background detected on any page -> CRITICAL (brand violation)
- Orphan pattern detected (exists only on this page) -> CRITICAL
- Hardcoded accent colours bypassing dynamic system -> CRITICAL
- 5+ conflicts on a single page -> CRITICAL (systemic inconsistency)

**Non-CRITICAL conflicts** logged with file references and resolution.

---

**Framework Status:** Lost Monster v3 — On-demand cross-page consistency audit
**Last Updated:** February 2026
**Version:** 3.1 (Lost Monster Edition — INSPX Checkpoint Mode)
