# SOFAX Framework v3

> **SOPHIA: Chief Design Officer**
> On-demand design audit with measurable pass/fail criteria.
> Run contextually on any page, screenshot, or component.

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
<!-- ONBOARD:END -->

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
| Public pages (homepage, search, detail) | 93+ / 110 |
| Admin dashboard pages | 88+ / 110 |
| Critical conversion flows (enquiry, signup) | 99+ / 110 |

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
- [ ] Page title is largest text on page
- [ ] Clear 3-level hierarchy visible
- [ ] Metadata/labels are visually quieter than body text
- [ ] No two adjacent text elements compete at the same size+weight
- [ ] Font weights used intentionally
- [ ] Numbers/stats are prominent when they're the primary data

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

---

### 2. Spacing & Breathing Room (0-10)

**What:** Consistent rhythm. Related things grouped, unrelated things separated.

**Checkpoints:**
- [ ] Sections have clear visual separation
- [ ] Card internal padding is consistent
- [ ] No elements touching or overlapping their containers
- [ ] Related items grouped tightly
- [ ] Page has horizontal padding on mobile (min p-4)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

---

### 3. Colour & Contrast (0-12)

**What:** Intentional use of colour. Primary actions obvious, status colours meaningful, dark mode fully functional.

**Checkpoints:**
- [ ] Primary CTA uses #06B6D4 (teal) — visually distinct from all other buttons
- [ ] Status/state colours are semantically correct
- [ ] Text meets 4.5:1 contrast ratio
- [ ] No hardcoded light-only colours — uses semantic classes or dark: variants
- [ ] Muted/secondary text uses semantic muted class
- [ ] Interactive elements have distinct colour from static text

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

---

### 4. Visual Hierarchy & Focus (0-12)

**What:** The user's eye is guided. Most important thing hits first.

**Checkpoints:**
- [ ] One clear focal point per section
- [ ] Primary action is visually louder than secondary actions
- [ ] Empty/zero states don't feel dead — they guide toward action
- [ ] Cards/rows have a clear primary label
- [ ] Navigation/chrome is visually recessive
- [ ] Urgency/attention items are visually distinct

**Scoring:** 2 points per checkpoint. 6 checkpoints = 12 points max.

---

### 5. Depth & Polish (0-10)

**What:** The page feels crafted, not flat.

**Checkpoints:**
- [ ] Cards have elevation (shadow or border)
- [ ] Interactive elements have hover/active states
- [ ] Transitions are smooth (200-300ms)
- [ ] Icons are used consistently
- [ ] Border radius is consistent

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

---

### 6. Information Density (0-10)

**What:** Screen real estate used efficiently.

**Checkpoints:**
- [ ] Primary metrics/data visible above the fold
- [ ] Cards show essential info at a glance
- [ ] No large empty zones wasting space
- [ ] Content doesn't require horizontal scrolling on mobile
- [ ] Tables/lists show 6+ rows without scrolling (desktop)

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

---

### 7. Consistency (0-10)

**What:** Same patterns everywhere.

**Checkpoints:**
- [ ] All cards on the page use the same elevation treatment
- [ ] All status indicators use the same system
- [ ] Button styles match across the page
- [ ] Spacing values follow a predictable scale
- [ ] The page looks like it belongs in the same app as sibling pages

**Scoring:** 2 points per checkpoint. 5 checkpoints = 10 points max.

---

### 8. Dark Mode (0-8)

**What:** Dark mode is a first-class citizen.

**Checkpoints:**
- [ ] Page background uses semantic class
- [ ] Cards use semantic class
- [ ] All text is readable in dark mode
- [ ] Borders use semantic tokens

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

---

### 9. Interactive Feedback (0-8)

**What:** Every clickable thing tells you it's clickable. Every action gives feedback.

**Checkpoints:**
- [ ] All clickable elements have cursor-pointer
- [ ] Buttons/links change appearance on hover
- [ ] Loading states exist
- [ ] Empty states are helpful

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

---

### 10. Touch & Mobile (0-8)

**What:** Works beautifully on mobile.

**Checkpoints:**
- [ ] All tap targets are 44px+
- [ ] No horizontal overflow at 375px width
- [ ] Content reflows sensibly
- [ ] Primary CTA is thumb-reachable

**Scoring:** 2 points per checkpoint. 4 checkpoints = 8 points max.

---

### 11. Brand Compliance & AI Slop (0-10)

**What:** Every visual element has provenance in the existing Lost Monster design system. No invented patterns, no AI decoration.

**This dimension enforces two things:**
1. The **Provenance Rule** — can you point to the EXACT same pattern on an existing Lost Monster page?
2. The **10 Red Flags** — common AI-generated patterns that don't belong

**Reference:** website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md and AI Slop Test

**Checkpoints:**
- [ ] **Provenance:** Every shadow, border, icon treatment, and background can be found on an existing reference page
- [ ] **No orphan patterns:** No visual element exists ONLY on this page
- [ ] **No thick coloured borders:** No accent bars at top/bottom of cards
- [ ] **Page rhythm:** Backgrounds follow the approved pattern
- [ ] **No cold colours on public pages:** Use approved palette only
- [ ] **Card-on-canvas:** All public content lives in elevated cards with approved treatment
- [ ] **Card spacing:** Cards never touch — breathing room visible between cards
- [ ] **Card spec exact:** No generic shadow classes, no non-standard rounding. The approved card spec is exact

**Scoring:** ~1.1 points per checkpoint. 8 checkpoints = 10 points max. **Any Red Flag is an automatic -4 from total SOFAX score.**

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
10. Cold colours on public pages

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

1. **[Issue]** — [file:line] — [what's wrong] → [concrete fix]
2. **[Issue]** — [file:line] — [what's wrong] → [concrete fix]
3. **[Issue]** — [file:line] — [what's wrong] → [concrete fix]

### Quick Wins (< 5 min each)
- [ ] [Fix description] — [file:line]
```

---

## Integration

**SOPHIA + AIDA:** SOPHIA scores HOW it looks. AIDA scores WHETHER it converts. Run both on public pages.

**SOPHIA + PIXLX:** SOPHIA scores design quality. PIXLX catches edge cases. SOPHIA flags missing empty states, PIXLX defines what they should say.

**SOPHIA + CONSX:** CONSX finds inconsistencies across pages. SOPHIA quantifies how bad they are within a single page.

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
- Score below 71/110 → CRITICAL (Needs Work — do not ship)
- Any Red Flag from Dimension 11 → CRITICAL
- Broken layout visible in screenshot → CRITICAL

**Non-CRITICAL issues** are logged with severity (Major/Minor) and fix recommendations, but the pipeline continues.

---

**Framework Status:** Generic v4 — On-demand contextual audit with Brand Compliance
**Last Updated:** March 2026
**Checkpoint count:** 55 checkpoints across 11 dimensions
