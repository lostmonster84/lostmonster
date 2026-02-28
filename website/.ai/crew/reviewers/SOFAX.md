# SOFAX Framework — Lost Monster Edition v3

> **SOPHIA: Chief Design Officer**
> On-demand design audit with measurable pass/fail criteria.
> Run contextually on any page, screenshot, or component.

---

## How to Invoke

Say any of:
- `SOPHIA` (with a screenshot or page reference)
- `run SOPHIA on [page]`
- `run SOFAX on [page]`

SOPHIA reads the actual code (or screenshot), scores against the rubric below, and returns a structured report with line-level issues and concrete fixes.

---

## Scoring: 11 Dimensions, 110 Points

Each dimension has **binary checkpoints** — they pass or fail. No vibes. Points are awarded based on checkpoint pass rate within each dimension.

### Target Scores

| Page Type | Target |
|-----------|--------|
| Marketing (homepage, services, portfolio) | 93+ / 110 |
| Contact/enquiry flow | 99+ / 110 |
| Case study detail pages | 93+ / 110 |

### Rating Levels

| Score | Rating | Meaning |
|-------|--------|---------|
| 99-110 | Exceptional | Ship with pride |
| 93-98 | Sophisticated | Launch-ready |
| 82-92 | Good | Needs polish pass |
| 71-81 | Acceptable | MVP only |
| Below 71 | Needs Work | Do not ship |

---

## The 11 Dimensions

### 1. Typography Hierarchy (0-12)

**What:** Clear visual ranking of text — page title > section title > card title > body > meta.

**Checkpoints:**
- [ ] Page title is largest text on page (text-4xl+ on mobile, text-6xl+ on desktop — Lost Monster uses up to text-9xl for heroes)
- [ ] Clear 3-level hierarchy visible (title -> subtitle/section -> body)
- [ ] Metadata/labels are visually quieter than body text (smaller size OR muted colour — text-neutral-400)
- [ ] No two adjacent text elements compete at the same size+weight
- [ ] Font weights used intentionally (font-bold for titles, font-semibold for labels, normal for body)
- [ ] Numbers/stats are prominent when they're the primary data (text-4xl+ bold)

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

**Common violations:**
- All text same size (flat hierarchy)
- Meta text same weight as body
- Stats buried in small text
- Section headlines below text-4xl (Lost Monster demands bold typography)

---

### 2. Spacing & Breathing Room (0-10)

**What:** Consistent rhythm. Related things grouped, unrelated things separated. Nothing cramped, nothing floating.

**Checkpoints:**
- [ ] Sections have clear visual separation (py-20 md:py-32 between distinct content groups)
- [ ] Card internal padding is consistent across all cards on the page
- [ ] No elements touching or overlapping their containers
- [ ] Related items grouped tightly (e.g. icon + label, stat + subtitle)
- [ ] Page has horizontal padding on mobile (min px-6)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Metric cards crammed against content below
- Inconsistent padding between cards
- Sections blending into each other (no visual break)

---

### 3. Colour & Contrast (0-12)

**What:** Intentional use of colour. Dynamic accent system used properly. Dark mode is the default.

**Checkpoints:**
- [ ] Primary CTA uses dynamic accent (`style={{ backgroundColor: color.accent }}`) — visually distinct from all other buttons
- [ ] Status/state colours are semantically correct (green=good, amber=warning, red=danger)
- [ ] Text meets 4.5:1 contrast ratio against its background (white on dark gradient = AAA)
- [ ] No hardcoded light backgrounds (bg-white, bg-gray-50) as PAGE backgrounds — dark gradients only
- [ ] Secondary text uses `text-neutral-300` for subtitles, `text-neutral-400` for meta/labels
- [ ] Interactive elements use dynamic accent colour, not hardcoded hex values

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

**Common violations:**
- All buttons same colour (no primary/secondary distinction)
- Hardcoded `text-blue-500` instead of `style={{ color: color.accent }}`
- Light backgrounds breaking the dark aesthetic
- Links indistinguishable from body text

---

### 4. Visual Hierarchy & Focus (0-12)

**What:** The user's eye is guided. Most important thing hits first. Clear scan path.

**Checkpoints:**
- [ ] One clear focal point per section (the "hero" element — stat, title, CTA)
- [ ] Primary action is visually louder than secondary actions (size, colour, or weight)
- [ ] Empty/zero states don't feel dead — they guide toward action
- [ ] Cards/rows have a clear primary label (what you read first)
- [ ] Navigation/chrome is visually recessive (doesn't compete with content)
- [ ] Accent colour draws the eye to the right element (headline punchline, CTA, key metrics)

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

**Common violations:**
- Everything same visual weight (flat, no emphasis)
- CTA buried or same style as other links
- Zero state is blank with no guidance
- Accent colour used everywhere, diluting its impact

---

### 5. Depth & Polish (0-10)

**What:** The page feels crafted, not flat. Glassmorphism, hover states, transitions.

**Checkpoints:**
- [ ] Cards have glassmorphism treatment (`bg-white/5 backdrop-blur-md` with accent border)
- [ ] Interactive elements have hover/active states (colour change, lift, or darken)
- [ ] Transitions are smooth (200-300ms on state changes, 700ms for colour theme transitions)
- [ ] Icons are used consistently (Lucide React only, consistent sizing)
- [ ] Border radius is consistent (rounded-xl for cards, rounded-lg for buttons)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Flat cards with no glassmorphism (missing backdrop-blur-md)
- No hover states on clickable elements
- Mixed icon libraries or sizes
- Instant transitions instead of smooth 700ms colour changes

---

### 6. Information Density (0-10)

**What:** Screen real estate used efficiently. Key data visible without scrolling. No wasted space, no overwhelming clutter.

**Checkpoints:**
- [ ] Primary metrics/data visible above the fold (no scroll for the headline info)
- [ ] Cards show essential info at a glance (not truncated or hidden behind clicks)
- [ ] No large empty zones wasting screen space
- [ ] Content doesn't require horizontal scrolling on mobile
- [ ] Key metrics (50+, 70%, 4.9/5, 2-4 wks) are prominently placed where relevant

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Stats require scrolling past a large hero/banner
- Cards show only title, everything else behind "view more"
- Massive padding creating unnecessary scroll
- Key metrics missing entirely

---

### 7. Consistency (0-10)

**What:** Same patterns everywhere. If one card has glassmorphism, all cards do. If one page uses the accent system, all pages do.

**Checkpoints:**
- [ ] All cards on the page use the same elevation treatment (bg-white/5 backdrop-blur-md)
- [ ] All status indicators use the same system (semantic colours)
- [ ] Button styles match across the page (primary = accent bg, secondary = border-neutral-700)
- [ ] Spacing values follow a predictable scale (not random px values)
- [ ] The page looks like it belongs in the same site as the homepage

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Some cards have glassmorphism, others don't
- Mixed button styles within the same page
- Page feels like a different site from the homepage
- Inconsistent use of dynamic colour system

---

### 8. Dark Mode (0-8)

**What:** Lost Monster IS dark mode. The entire site runs on dark gradient backgrounds. There is no light mode toggle — dark is the identity.

**Checkpoints:**
- [ ] Page background uses dark gradient (`bg-gradient-to-br ${color.bg}` or equivalent)
- [ ] Cards use glassmorphism (`bg-white/5 backdrop-blur-md`) not `bg-white`
- [ ] All text is readable on dark backgrounds (white for primary, neutral-300 for secondary, neutral-400 for meta)
- [ ] Borders use accent at low opacity (`borderColor: color.accent + '20'`) or `border-neutral-700`

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

**Common violations:**
- bg-white anywhere as a page or section background
- text-slate-900 invisible on dark background
- border-black/10 invisible on dark background
- Cards without backdrop-blur breaking the glassmorphism aesthetic

---

### 9. Interactive Feedback (0-8)

**What:** Every clickable thing tells you it's clickable. Every action gives feedback. Nothing feels dead.

**Checkpoints:**
- [ ] All clickable elements have cursor-pointer
- [ ] Buttons/links change appearance on hover (colour, opacity, or elevation)
- [ ] Loading states exist (skeleton, spinner, or disabled state during async operations)
- [ ] Empty states are helpful (suggest what to do, not just "No data")

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

**Common violations:**
- Clickable cards with no hover state
- No loading state (content pops in)
- Empty state is just "No items" with no guidance
- No visual feedback on button click

---

### 10. Touch & Mobile (0-8)

**What:** Works beautifully on mobile. Touch targets big enough. Nothing broken at small widths.

**Checkpoints:**
- [ ] All tap targets are 44px+ (buttons, links, interactive elements)
- [ ] No horizontal overflow at 375px width
- [ ] Content reflows sensibly (grid collapses from 4-col to 2-col)
- [ ] Primary CTA is thumb-reachable (bottom half of screen or sticky)

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

**Common violations:**
- Tiny action buttons (h-8 instead of h-11)
- Content overflows horizontally on mobile
- Important CTA above the fold but above thumb zone
- Multi-column layout doesn't collapse

---

### 11. Brand Compliance & AI Slop (0-10)

**What:** Every visual element has provenance in the existing Lost Monster design system. No invented patterns, no AI decoration.

**This dimension enforces two things:**
1. The **Provenance Rule** — can you point to the EXACT same pattern on the existing Lost Monster homepage?
2. The **10 Red Flags** — common AI-generated patterns that don't belong in Lost Monster

**Reference:** [Design Guide](.ai/LOST-MONSTER-DESIGN-SYSTEM.md) and [AI Slop Test](.ai/slop-test.md)

**Checkpoints:**
- [ ] **Provenance:** Every shadow, border, icon treatment, and background can be found on the existing homepage (`app/page.tsx`)
- [ ] **No orphan patterns:** No visual element exists ONLY on this page and nowhere else on the site
- [ ] **No thick coloured borders:** No `border-t-4`, `border-l-4`, `border-b-4` with brand colours. No accent bars (`h-1`, `h-1.5`) at top/bottom of cards
- [ ] **Page rhythm:** Dark gradient backgrounds throughout. No `bg-white` or `bg-gray-50` as page/section backgrounds. Cards are `bg-white/5 backdrop-blur-md` on dark canvas
- [ ] **No cold colours on marketing:** No `bg-slate-*` or `bg-gray-*` on marketing pages. Dark gradients and glassmorphism only
- [ ] **Card-on-canvas:** Marketing content lives in glassmorphism cards (`bg-white/5 backdrop-blur-md border rounded-xl`). No bare content floating on dark backgrounds without card wrappers
- [ ] **Card spacing:** Cards never touch — breathing room (`gap-6`+) visible between cards in all grids
- [ ] **Card spec exact:** Lost Monster cards use `bg-white/5 backdrop-blur-md border rounded-xl` with `borderColor: accent + '20'`. No generic shadow classes (`shadow-sm`/`md`/`lg`), no `bg-white` cards

**Scoring:** ~1.1 points per checkpoint. 9 checkpoints = 10 points max. **Any Red Flag is an automatic -4 from total SOFAX score.**

**The 10 Red Flags (kill on sight):**
1. Light/white page backgrounds (`bg-white`, `bg-gray-50` as PAGE background — cards can be `bg-white/5`)
2. Small/timid typography (below text-4xl for section headlines)
3. Corporate "we" voice instead of personal "I"
4. Hardcoded colours instead of dynamic colour system (`text-blue-500` instead of `style={{ color: color.accent }}`)
5. Missing glassmorphism on cards (should be `bg-white/5 backdrop-blur-md`)
6. Missing grid pattern background texture
7. Generic stock-photo aesthetic instead of bold personal brand
8. Thin/light font weights for headlines (should be `font-bold`)
9. Missing colour switcher (user choice is core to brand)
10. Missing key metrics (50+, 70%, 4.9/5, 2-4 wks)

**Common violations:**
- `border-t-4 border-blue-500` on cards (Red Flag #1 — hardcoded colour + accent bar)
- `bg-white` as a section background (Red Flag #1 — light page background)
- `ring-2 ring-blue-500/20` on cards (Red Flag #4 — hardcoded colour + decoration)
- `bg-slate-50` on marketing pages (Red Flag #1 — cold light background)
- `className="text-blue-600"` instead of `style={{ color: color.accent }}` (Red Flag #4)
- Corporate "We build solutions" instead of "I build systems" (Red Flag #3)

**Reference pages for provenance checks:**
- `app/page.tsx` — homepage (hero, metrics, services, testimonials, contact)

---

## Output Format

Every SOPHIA audit produces this exact structure:

```
## SOPHIA Audit: [Page Name]

**Page:** [file path]
**Mode:** Dark (Lost Monster is dark-only)
**Viewport:** [Desktop / Mobile / Both]

### Scorecard

| # | Dimension | Score | Pass/Fail Details |
|---|-----------|-------|-------------------|
| 1 | Typography Hierarchy | X/12 | [which checkpoints failed] |
| 2 | Spacing & Breathing Room | X/10 | ... |
| 3 | Colour & Contrast | X/12 | ... |
| 4 | Visual Hierarchy & Focus | X/12 | ... |
| 5 | Depth & Polish | X/10 | ... |
| 6 | Information Density | X/10 | ... |
| 7 | Consistency | X/10 | ... |
| 8 | Dark Mode | X/8 | ... |
| 9 | Interactive Feedback | X/8 | ... |
| 10 | Touch & Mobile | X/8 | ... |
| 11 | Brand Compliance & AI Slop | X/10 | ... |

### TOTAL: XX/110 ([Rating])

### Top 3 Issues (by impact)

1. **[Issue]** — [file:line] — [what's wrong] -> [concrete fix]
2. **[Issue]** — [file:line] — [what's wrong] -> [concrete fix]
3. **[Issue]** — [file:line] — [what's wrong] -> [concrete fix]

### Quick Wins (< 5 min each)
- [ ] [Fix description] — [file:line]
- [ ] [Fix description] — [file:line]
```

---

## Lost Monster Design Tokens Reference

For context during audits. These are the actual tokens used in the Lost Monster codebase.

| Token | Value | Usage |
|-------|-------|-------|
| Page bg | Dark gradient (`bg-gradient-to-br ${color.bg}` — from-neutral-900 etc.) | ALL page backgrounds |
| Card bg | `bg-white/5 backdrop-blur-md` | Glassmorphism cards |
| Primary text | `text-white` | Headlines, body |
| Secondary text | `text-neutral-300` | Subtitles |
| Muted text | `text-neutral-400` | Meta, labels |
| Accent | `style={{ color: color.accent }}` | Dynamic per user selection |
| Border | `borderColor: color.accent + '20'` | Card borders |
| Primary CTA | `style={{ backgroundColor: color.accent }}` | Main action buttons |
| Secondary CTA | `border-2 border-neutral-700 text-white` | Secondary buttons |
| Card border-radius | `rounded-xl` | All glassmorphism cards |
| Button border-radius | `rounded-lg` | All buttons |
| Section padding | `py-20 md:py-32` | Vertical section spacing |
| Grid pattern | SVG 60x60, stroke rgba(255,255,255,0.02) | Background texture |
| Colour transition | `transition-colors duration-700` | Theme colour changes |

---

## Integration

**SOPHIA + AIDA:** SOPHIA scores HOW it looks. AIDA scores WHETHER it converts. Run both on marketing pages.

**SOPHIA + PIXLX:** SOPHIA scores design quality. PIXLX catches edge cases (empty states, errors, slow connections). SOPHIA flags missing empty states, PIXLX defines what they should say.

**SOPHIA + CONSTX:** CONSTX finds inconsistencies across pages. SOPHIA quantifies how bad they are within a single page.

---

---

## Checkpoint Mode (INSPX Integration)

When invoked by INSPX during the automated inspection pipeline, SOFAX operates in **Checkpoint Mode** — same 11 dimensions, same checklists, structured output format.

**What SOFAX receives:**
- Screenshot from Playwright (specific viewport)
- Checkpoint metadata (page name, URL, viewport, focus area)
- Feature context (what was built/changed)

**What SOFAX returns:**

```
SOFAX CHECKPOINT: [Checkpoint Name] ([viewport])
  1. Typography:     X/12  [pass/fail notes]
  2. Spacing:        X/10  [pass/fail notes]
  3. Colour:         X/12  [pass/fail notes]
  4. Visual Hierarchy: X/12 [pass/fail notes]
  5. Depth & Polish: X/10  [pass/fail notes]
  6. Info Density:   X/10  [pass/fail notes]
  7. Consistency:    X/10  [pass/fail notes]
  8. Dark Mode:      X/8   [pass/fail notes]
  9. Feedback:       X/8   [pass/fail notes]
  10. Touch/Mobile:  X/8   [pass/fail notes]
  11. Brand:         X/10  [pass/fail notes]
  TOTAL: XX/110
  CRITICAL: [none | list of critical issues]
```

**CRITICAL flag rules:**
- Score below 71/110 -> CRITICAL (Needs Work — do not ship)
- Any Red Flag from Dimension 11 -> CRITICAL
- Broken layout visible in screenshot -> CRITICAL

**Non-CRITICAL issues** are logged with severity (Major/Minor) and fix recommendations, but the pipeline continues.

---

**Framework Status:** Lost Monster v4 — On-demand contextual audit with Brand Compliance
**Last Updated:** February 2026
**Checkpoint count:** 55 checkpoints across 11 dimensions
