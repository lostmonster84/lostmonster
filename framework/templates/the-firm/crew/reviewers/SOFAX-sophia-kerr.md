# SOFAX Framework — [PROJECT] Edition v3

> **SOPHIA: Chief Design Officer**
> Member of The Firm
>
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
| Marketing (homepage, [Page Type A], [Page Type B]) | 93+ / 110 |
| Admin dashboard pages | 88+ / 110 |
| Critical conversion flows ([primary conversion], signup) | 99+ / 110 |

### Rating Levels

| Score | Rating | Meaning |
|-------|--------|---------|
| 99-110 | Exceptional | Ship with pride |
| 93-98 | Sophisticated | Launch-ready |
| 82-92 | Good | Needs polish pass |
| 71-81 | Acceptable | MVP only |
| Below 71 | Needs Work | Do not ship |

---

## The 10 Dimensions

### 1. Typography Hierarchy (0-12)

**What:** Clear visual ranking of text — page title > section title > card title > body > meta.

**Checkpoints:**
- [ ] Page title is largest text on page (text-xl+ on mobile, text-2xl+ on desktop)
- [ ] Clear 3-level hierarchy visible (title -> subtitle/section -> body)
- [ ] Metadata/labels are visually quieter than body text (smaller size OR muted colour)
- [ ] No two adjacent text elements compete at the same size+weight
- [ ] Font weights used intentionally (bold for titles, medium for labels, normal for body)
- [ ] Numbers/stats are prominent when they're the primary data (text-2xl+ bold)

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

**Common violations:**
- All text same size (flat hierarchy)
- Meta text same weight as body
- Stats buried in small text

---

### 2. Spacing & Breathing Room (0-10)

**What:** Consistent rhythm. Related things grouped, unrelated things separated. Nothing cramped, nothing floating.

**Checkpoints:**
- [ ] Sections have clear visual separation (gap/margin between distinct content groups)
- [ ] Card internal padding is consistent across all cards on the page
- [ ] No elements touching or overlapping their containers
- [ ] Related items grouped tightly (e.g. icon + label, stat + subtitle)
- [ ] Page has horizontal padding on mobile (min p-4)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Stat cards crammed against content below
- Inconsistent padding between cards
- Sections blending into each other (no visual break)

---

### 3. Colour & Contrast (0-12)

**What:** Intentional use of colour. Primary actions obvious, status colours meaningful, dark mode fully functional.

**Checkpoints:**
- [ ] Primary CTA uses brand accent ([BRAND-PRIMARY]) — visually distinct from all other buttons
- [ ] Status/state colours are semantically correct (green=good, amber=warning, red=danger)
- [ ] Text meets 4.5:1 contrast ratio against its background
- [ ] No hardcoded light-only colours (bg-white, text-slate-900) — uses semantic classes or dark: variants
- [ ] Muted/secondary text uses `text-theme-muted` or equivalent (not raw slate-500)
- [ ] Interactive elements have distinct colour from static text (links, buttons distinguishable)

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

**Common violations:**
- All buttons same colour (no primary/secondary distinction)
- Status badges all grey (no semantic colour)
- Dark mode broken (white bg, invisible text)
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
- [ ] Urgency/attention items are visually distinct (unread badge, warning state)

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

**Common violations:**
- Everything same visual weight (flat, no emphasis)
- CTA buried or same style as other links
- Zero state is blank with no guidance
- Urgent items not visually flagged

---

### 5. Depth & Polish (0-10)

**What:** The page feels crafted, not flat. Subtle shadows, hover states, transitions, rounded corners.

**Checkpoints:**
- [ ] Cards have elevation (shadow or border — not both competing)
- [ ] Interactive elements have hover/active states (colour change, lift, or darken)
- [ ] Transitions are smooth (200-300ms on state changes, not instant)
- [ ] Icons are used consistently (same icon library, consistent sizing)
- [ ] Border radius is consistent (all cards same rounding, all buttons same rounding)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Flat cards with no shadow or border (floats on nothing)
- No hover states on clickable elements
- Mixed icon sizes (w-4 next to w-6 with no reason)
- Some cards rounded-xl, others rounded-lg

---

### 6. Information Density (0-10)

**What:** Screen real estate used efficiently. Key data visible without scrolling. No wasted space, no overwhelming clutter.

**Checkpoints:**
- [ ] Primary metrics/data visible above the fold (no scroll for the headline info)
- [ ] Cards show essential info at a glance (not truncated or hidden behind clicks)
- [ ] No large empty zones wasting screen space
- [ ] Content doesn't require horizontal scrolling on mobile
- [ ] Tables/lists show 6+ rows without scrolling (desktop)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Stats require scrolling past a large hero/banner
- Cards show only title, everything else behind "view more"
- Massive padding creating unnecessary scroll
- Only 3-4 items visible per screen

---

### 7. Consistency (0-10)

**What:** Same patterns everywhere. If one card has rounded-2xl and shadow-sm, all cards do. If one page uses pill-success, all pages do.

**Checkpoints:**
- [ ] All cards on the page use the same elevation treatment (shadow/border)
- [ ] All status indicators use the same system (pill classes, colour tokens)
- [ ] Button styles match across the page (primary, secondary, ghost)
- [ ] Spacing values follow a predictable scale (not random px values)
- [ ] The page looks like it belongs in the same app as sibling pages

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

**Common violations:**
- Some cards have shadows, others don't
- Status badges: some use pill classes, others hardcode bg-green-100
- Mixed button styles within the same page
- Page feels like a different app from the rest

---

### 8. Dark Mode (0-8)

**What:** Dark mode is a first-class citizen. No broken backgrounds, no invisible text, no hardcoded colours.

**Checkpoints:**
- [ ] Page background uses semantic class (bg-theme, bg-theme-soft) not hardcoded
- [ ] Cards use semantic class (bg-theme-card, card class) not bg-white
- [ ] All text is readable in dark mode (no dark-on-dark, no light-on-light)
- [ ] Borders use semantic tokens (border-theme, border-theme-soft)

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

**Note:** `bg-theme`, `bg-theme-card`, `text-theme`, `text-theme-muted`, `border-theme`, `border-theme-soft` are universal semantic classes that must be defined per project in your design token system.

**Common violations:**
- bg-white with no dark: variant
- text-slate-900 invisible on dark background
- border-black/10 invisible in dark mode
- Coloured backgrounds (bg-blue-50) that look wrong in dark

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
- [ ] Content reflows sensibly (grid collapses, sidebar becomes overlay/header)
- [ ] Primary CTA is thumb-reachable (bottom half of screen or sticky)

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

**Common violations:**
- Tiny action buttons (h-8 instead of h-11)
- Content overflows horizontally on mobile
- Important CTA above the fold but above thumb zone
- Multi-column layout doesn't collapse

---

### 11. Brand Compliance & AI Slop (0-10)

**What:** Every visual element has provenance in the existing [PROJECT] design system. No invented patterns, no AI decoration.

**This dimension enforces two things:**
1. The **Provenance Rule** — can you point to the EXACT same pattern on an existing [PROJECT] page?
2. The **10 Red Flags** — common AI-generated patterns that don't belong in [PROJECT]

**Reference:** [Design Guide]([DESIGN-GUIDE-PATH]) and [AI Slop Test]([SLOP-TEST-PATH])

**Checkpoints:**
- [ ] **Provenance:** Every shadow, border, icon treatment, and background can be found on an existing reference page ([REFERENCE-PAGE-1], [REFERENCE-PAGE-2], [REFERENCE-PAGE-3], [REFERENCE-PAGE-4])
- [ ] **No orphan patterns:** No visual element exists ONLY on this page and nowhere else on the site
- [ ] **No thick coloured borders:** No `border-t-4`, `border-l-4`, `border-b-4` with brand colours. No accent bars (`h-1`, `h-1.5`) at top/bottom of cards
- [ ] **Page rhythm:** Background colours follow the approved pattern — [BRAND-BG] is default canvas, white for elevated cards/section bands, [BRAND-DARK] for footer only. No `bg-[BRAND-DARK]` mid-page content sections
- [ ] **No cold colours on marketing:** No `bg-slate-*` or `bg-gray-*` on marketing pages. Use [BRAND-BG], [BRAND-SECONDARY], shadow cards instead
- [ ] **Card-on-canvas:** All marketing content lives in elevated cards (`bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]`). No bare content floating on [BRAND-BG]. No discrete content items without card wrappers, even inside white band sections
- [ ] **Card spacing:** Cards never touch — [BRAND-BG] breathing room (`gap-4`+) visible between cards in all grids
- [ ] **Card spec exact:** No generic shadow classes (`shadow-sm`/`md`/`lg`), no non-standard rounding (`rounded-lg`/`xl`). The [PROJECT] card is `rounded-2xl` with the approved custom shadow — close isn't good enough

**Scoring:** ~1.1 points per checkpoint. 9 checkpoints = 10 points max. **Any Red Flag is an automatic -4 from total SOFAX score.**

**Note:** The Red Flags list and approved patterns below should be defined per project. The list here provides universal anti-patterns — adapt specific references to your design system.

**The 10 Red Flags (kill on sight):**
1. Thick coloured borders / accent bars on cards
2. Orphan patterns (exists only on this page)
3. Invisible secondary states (too faint to read)
4. Ring/glow decorations on cards
5. Gratuitous gradients on flat elements
6. Over-engineered hover/active states
7. Decoration without function
8. Dashboard-ification of content pages
9. Typography chaos (3+ sizes/weights per card)
10. Cold colours (slate) on marketing pages

**Common violations:**
- `border-t-4 border-[BRAND-PRIMARY]` on cards (Red Flag #1)
- `bg-[BRAND-DARK]` as a mid-page section background (no provenance — [BRAND-DARK] is footer/CTA only)
- `ring-2 ring-[BRAND-PRIMARY]/20` on winner cards (Red Flag #4)
- `bg-slate-50` on marketing pages (Red Flag #10 — use `bg-[BRAND-BG]`)
- Lucide icons as step indicators when big numbers would do (Red Flag #7 — decoration without function)

**Reference pages for provenance checks:**
- `[APP-PUBLIC]/components/[HomePage]` — content cards, sections, testimonials
- `[APP-PUBLIC]/[content-page-a]/page.tsx` — content page patterns
- `[APP-PUBLIC]/[content-page-b]/page.tsx` — pricing cards, split layouts
- `[APP-PUBLIC]/[content-page-c]/page.tsx` — values, mission sections

---

## Output Format

Every SOPHIA audit produces this exact structure:

```
## SOPHIA Audit: [Page Name]

**Page:** [file path]
**Mode:** [Light / Dark / Both]
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

## [PROJECT] Design Tokens Reference

For context during audits. **These tokens must be defined per project in your `globals.css` or equivalent.**

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-theme` | white | #1c1c1e | Page backgrounds |
| `bg-theme-card` | white | #2c2c2e | Card backgrounds |
| `bg-theme-soft` | slate-50 | white/5 | Subtle section backgrounds |
| `text-theme` | [BRAND-DARK] | white | Primary text |
| `text-theme-muted` | slate-500 | #98989d | Secondary text |
| `text-theme-meta` | slate-400 | #636366 | Tertiary/meta text |
| `border-theme` | black/10 | white/10 | Standard borders |
| `border-theme-soft` | black/5 | white/5 | Subtle borders |
| `hover:bg-theme-hover` | black/5 | white/5 | Hover states |
| `[BRAND-PRIMARY]` | [define] | [define] | Primary accent (both modes) |
| `pill-success` | emerald tints | emerald tints | Active/good status |
| `pill-warning` | amber tints | amber tints | Warning status |
| `pill-danger` | red tints | red tints | Error/danger status |
| `pill-info` | blue tints | blue tints | Informational status |

**Note:** `pill-success`, `pill-warning`, `pill-danger`, `pill-info` are universal status patterns. Define project-specific colours for each in your design token system.

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

**Framework Status:** [PROJECT] v4 — On-demand contextual audit with Brand Compliance
**Last Updated:** February 2026
**Checkpoint count:** 55 checkpoints across 11 dimensions
