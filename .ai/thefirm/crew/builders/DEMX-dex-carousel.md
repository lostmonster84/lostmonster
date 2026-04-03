# DEMX Framework

> **Demo eXplorer - Rapid Design Variation System**
> One command triggers 5 live variations with AIDAX scoring on a demo page.
>
> Customized for project-specific design exploration.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| [PROJECT] | Lost Monster | CLAUDE.md |
| [BRAND-PRIMARY] | #06B6D4 (teal) | CLAUDE.md |
| [BRAND-BG] | Dark/black backgrounds | CLAUDE.md |
| [BRAND-DARK] | Dark theme with glassmorphism | CLAUDE.md |
| [BRAND-SECONDARY] | #60A5FA (blue) | CLAUDE.md |
| [BRAND-MUTED] | Muted grays/slate | CLAUDE.md |
| [BRAND-ACCENT-A] | #A855F7 (purple) | CLAUDE.md |
| [ENTITY-PRIMARY] | Projects | CLAUDE.md |
| [PRODUCT-A] | Website (Next.js marketing site, port 3000) | CLAUDE.md |
| [PRODUCT-B] | Dashboard (Turborepo admin app, port 3001) | CLAUDE.md |
| [PRODUCT-C] | Framework (templates + docs) | CLAUDE.md |
| [DESIGN-GUIDE-PATH] | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**DEMX for Lost Monster** explores design variations for the marketing website (port 3000) and admin dashboard (port 3001). The website uses bold dark backgrounds, massive typography (60-128px), glassmorphism, grid patterns, and a 5-colour dynamic theme system (teal default, plus blue, orange, purple, green).

Design explorations must reference `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md` and maintain the personal brand voice ("I" not "we"). All variations scored against AIDAX conversion criteria and SOFAX design rubric.
---

## When to Use DEMX

### Use DEMX When:
- Designing primary entity card layouts (grid, list, featured)
- Exploring hero section treatments
- Deciding filter UX (chips vs drawer vs sidebar)
- Creating detail page layouts
- Designing admin dashboard components
- Exploring booking/enquiry form placements
- Any visual decision with multiple valid approaches

### Don't Use DEMX When:
- Bug fixes (just fix it)
- API changes (no visual component)
- Exact design provided by user (just implement)
- Copy changes only (no layout variation)

---

## Trigger Syntax

```
DEMX: [target element]
```

**Examples:**
```
DEMX: entity card
DEMX: homepage hero
DEMX: filters mobile
DEMX: detail header
DEMX: admin table
DEMX: booking enquiry form
DEMX: product type selector
```

---

## Variation Types

### Entity Card Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Compact** | Minimal info, photography-forward, fits 4+ per screen |
| 2 | **Info-Rich** | All details visible (name, key specs, price, product types) |
| 3 | **Landscape** | Wide horizontal card for list browsing |
| 4 | **Featured** | Full-width hero card for homepage highlights |
| 5 | **Immersive** | Dark background, full-bleed photo, minimal text overlay |

### Homepage Hero Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Cinematic** | Full-viewport video/photo, minimal text |
| 2 | **Product Doors** | Split layout — Website (Next.js marketing site, port 3000) vs Dashboard (Turborepo admin app, port 3001) |
| 3 | **Entity Forward** | Projects photography as hero element |
| 4 | **Map** | Interactive map as hero |
| 5 | **Bold Type** | Large typography over photography |

### Filter Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Product Tabs** | Website (Next.js marketing site, port 3000) / Dashboard (Turborepo admin app, port 3001) / Framework (templates + docs) tabs |
| 2 | **Drawer** | Mobile bottom sheet with all filters |
| 3 | **Sidebar** | Desktop sidebar, sticky on scroll |
| 4 | **Minimal** | Product type only, "More filters" expands |
| 5 | **Date-First** | Date picker as primary filter, product second |

### Booking Enquiry Form Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Sticky Footer** | Always visible, minimal fields (dates + name) |
| 2 | **Inline Card** | Embedded in detail page |
| 3 | **Modal** | Triggered by primary CTA button |
| 4 | **Sidebar** | Fixed position on desktop detail page |
| 5 | **Two-Step** | Dates + product type → Full form on confirm |

---

## AIDAX Scoring

Score each variation using AIDAX (0-10 per dimension, 40 total).

| Dimension | What It Measures |
|-----------|-----------------|
| **Attention** | Does it grab the target audience immediately? Photography impact, entity prominence, atmosphere |
| **Interest** | Does it communicate the value? Specs, context, product type clarity, key info visible |
| **Desire** | Does it create "I need this"? Lifestyle imagery, setting, social proof, trust |
| **Action** | Is the next step clear? CTA visibility (#06B6D4 (teal)), form accessibility, friction reduction |

**Scoring Scale:**
| Score | Rating | Meaning |
|-------|--------|---------|
| 36-40 | Exceptional | Premium quality, ship immediately |
| 30-35 | Sophisticated | Minor refinements before launch |
| 24-29 | Acceptable | MVP quality, iterate post-launch |
| <24 | Needs Work | Reconsider approach |

---

## Demo Page

Create demo pages at `/demo/[feature]-variations/` using the **DemxScaffold** component.

### DemxScaffold (MANDATORY — v3.3)

All DEMX demo pages MUST use `@/components/demo/DemxScaffold`. This component enforces score-after-render by design:

1. **Scores come from a JSON sidecar file** (`scores.json` next to `page.tsx`), not hardcoded in JSX
2. **If `scores.json` doesn't exist**, the page renders "UNSCORED — RENDER FIRST" badges with dash placeholders
3. **After screenshots + visual inspection**, write `scores.json` with real AIDA scores
4. **Page re-renders** with actual scores from the JSON

```typescript
// page.tsx — import scores from sidecar (null if not yet created)
let scores: DemxScores | null = null
try { scores = require('./scores.json') as DemxScores } catch { scores = null }

// Pass to scaffold — NO hardcoded scores anywhere in the page
<DemxScaffold
  title="Feature Variations"
  scores={scores}
  variations={{
    1: { name: 'V1', description: '...', changes: [...], component: <MyV1 /> },
    2: { name: 'V2', description: '...', changes: [...], component: <MyV2 /> },
  }}
/>
```

```json
// scores.json — written AFTER screenshots, NEVER before
{
  "1": { "attention": 7, "interest": 9, "desire": 7, "action": 8 },
  "2": { "attention": 8, "interest": 8, "desire": 7, "action": 8 }
}
```

**DO NOT bypass this by hardcoding scores in the variations object.** The scaffold accepts scores ONLY via the `scores` prop, which reads from JSON.

**Demo Page Specs:**
- Background: Dark theme with glassmorphism - dark, immersive showcase
- Accent: #06B6D4 (teal) for scores and highlights
- Text: Dark/black backgrounds for readability
- Cards: Dark theme with glassmorphism/80 with #60A5FA (blue) border (no rounded corners)
- Recommended indicator: #06B6D4 (teal) badge on winner

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ FIXED HEADER (Dark theme with glassmorphism background)                          │
│ ← Back to Demo    Feature Variations    [1] [2] [3] [4] [★5]   │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────────────┬────────────────────────────────────┐
│                            │                                    │
│   LIVE PREVIEW             │   VARIATION DETAILS                │
│   (Dark/black backgrounds bg)          │   ├─ Name: "Compact Card"          │
│                            │   ├─ Description                   │
│   [Entity card renders     │   └─ Design Reasoning              │
│    with sample data]       │                                    │
│                            │   AIDAX SCORES                     │
│                            │   ├─ Attention: 8/10 ████████      │
│                            │   ├─ Interest:  7/10 ███████       │
│                            │   ├─ Desire:    9/10 █████████     │
│                            │   ├─ Action:    8/10 ████████      │
│                            │   └─ Total: 32/40                  │
│                            │                                    │
└────────────────────────────┴────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ QUICK COMPARISON (#06B6D4 (teal) bars)                         │
│ [Var 1: 28] [Var 2: 31] [Var 3: 29] [Var 4: 33] [★Var 5: 36]   │
└─────────────────────────────────────────────────────────────────┘
```

---

## DEMX Example

**User Input:**
```
DEMX: entity card
```

**My Response:**

### 1. Micro-Context Check
"Creating 5 variations of the entity card component for the listing page — exploring photo treatment, spec prominence, product type display, and CTA placement. All variations use square edges, no gradients, #06B6D4 (teal) CTA, and must work on mobile."

### 2. Brand Compliance Gate (runs first)
Each variation checked against gate rules before AIDA scoring.

### 3. Generate 5 Variations

**Variation 1: Compact**
- Photography 65% of card, square crop
- Entity name + model on two lines below
- Product type badge (top-left)
- "Book" link — entire card is clickable
- AIDAX: A8 I6 D7 A7 = 28/40

**Variation 2: Info-Rich**
- Photography 50% of card
- Entity name + model prominent below photo
- Specs row: key details, price/day
- Product types as chips
- Primary CTA (bg-#06B6D4 (teal))
- AIDAX: A7 I9 D7 A8 = 31/40

**Variation 3: Landscape**
- Horizontal layout (photo left 40%, info right 60%)
- Entity name very prominent
- Specs + product types on right
- CTA on right edge (bg-#06B6D4 (teal))
- AIDAX: A7 I8 D8 A9 = 32/40

**Variation 4: Immersive Dark**
- Full-bleed photography with dark overlay (Dark theme with glassmorphism/60)
- Entity name in Dark/black backgrounds over photo
- Minimal info — model + price/day only
- CTA appears on hover/focus
- AIDAX: A9 I6 D9 A7 = 31/40

**Variation 5: Featured (Recommended)**
- Large photography, square crop, full-width
- Entity name + model below photo in Dark theme with glassmorphism on Dark/black backgrounds
- Product type badge (#60A5FA (blue) background)
- Specs row: key details, price/day
- Full-width CTA (bg-#06B6D4 (teal))
- AIDAX: A9 I8 D9 A8 = 34/40

### 4. Demo Page
"Demo page ready at `/demo/entity-card-variations/`"

### 5. Recommendation
```
Recommendation: Variation 5 (Featured)
Score: 34/40

Why this wins:
- Attention (9): Large photography with clear entity identity
- Interest (8): Specs visible, product types clear, price shown
- Desire (9): Lifestyle imagery does the work
- Action (8): Full-width primary CTA is impossible to miss

Trade-offs:
- Requires high-quality photography
- Takes more screen space than Compact
- Consider Compact for secondary listing, Featured for primary grid

Best for: Main listing page grid, product landing pages
Use Compact for: Comparison rows, featured section inserts
```

---

## Sample Data

Use consistent sample data across all DEMX variations:

```typescript
const sampleEntity = {
  _id: 'demo-1',
  name: 'Sample Entity',
  slug: { current: 'sample-entity' },
  model: 'Model Name',
  productTypes: ['Website (Next.js marketing site, port 3000)', 'Dashboard (Turborepo admin app, port 3001)', 'Framework (templates + docs)'],
  description: 'A sample entity for demo purposes.',
  seats: 5,
  pricePerDay: 185,
  status: 'available',
  featured: true,
  specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4'],
  images: [{ asset: { url: '/demo/sample-entity.jpg' } }],
}
```

---

## Integration with Frameworks

### DEMX + CODAX
```
CODAX: Define WHAT to build (Context, Objective, Details, Acceptance)
DEMX: Explore HOW it should look (5 variations)
```

### DEMX + SOFAX
```
DEMX: Generate 5 variations with AIDAX scores
SOFAX: Deep audit of chosen variation (93+/110 target)
```

### DEMX + AIDAX
DEMX uses simplified AIDAX (0-40 scale) for quick comparison.
For deeper conversion analysis, run full AIDAX audit on winner.

---

## Quick Reference

### DEMX Triggers
```
DEMX: entity card
DEMX: homepage hero
DEMX: filters
DEMX: detail page
DEMX: booking enquiry form
DEMX: admin table
DEMX: product type selector
```

### Variation Naming
| Type | Names |
|------|-------|
| Entity Card | Compact, Info-Rich, Landscape, Immersive Dark, Featured |
| Hero | Cinematic, Product Doors, Entity Forward, Map, Bold Type |
| Filters | Product Tabs, Drawer, Sidebar, Minimal, Date-First |
| Booking Form | Sticky Footer, Inline, Modal, Sidebar, Two-Step |

---

## DEMX Delivery Protocol (MANDATORY)

**When the user says "DEMX", the Gaffer enforces this exact sequence. No shortcuts, no intermediate questions.**

```
1. BUILD all variations silently on demo page (NO pre-assigned scores — use placeholders or omit)
2. PLAYWRIGHT screenshot every variation at correct viewport(s)
3. VISUALLY INSPECT each screenshot — does it actually work at rendered dimensions?
4. SCORE each variation based on what you SEE in the screenshots (not what you imagined)
5. UPDATE the demo page with real post-render scores
6. PRESENT with screenshots, scores, and a clear recommendation
```

**Rules:**
- **One shot.** All variants rendered and presented together. Never drip-feed one at a time.
- **Never dump raw files.** No opening PNGs in Preview. Always a proper comparison page.
- **Never ask mid-build.** Build everything, then present. The user sees the full picture at once.

**HARD GATE — Text descriptions are NOT DEMX output (v3.2 patch — 2026-03-16)**
DEMX output is a LIVE DEMO PAGE with rendered components. If you find yourself writing bullet points describing what a variation *would* look like instead of writing JSX/TSX code, STOP. You are violating DEMX. The deliverable is always `/demo/[feature]-variations/page.tsx` — a page the user can open in a browser and see with their own eyes. Text descriptions of layouts are worthless. Build it or don't call it DEMX. This rule exists because text-only DEMX was presented 3 times before being caught — it will not happen a 4th time.

**HARD GATE — Score AFTER render, never before (v3.3 patch — 2026-03-17)**
AIDA scores must ONLY be assigned AFTER Playwright screenshots of each variation have been taken and visually inspected. The sequence is:
1. BUILD all variations on the demo page (with placeholder scores or no scores)
2. PLAYWRIGHT screenshot every variation
3. VISUALLY INSPECT the screenshots — does the design actually work at the rendered dimensions?
4. ONLY THEN assign AIDA scores based on what you can SEE
5. UPDATE the demo page with the real scores

Pre-rendering scores are fiction. A concept that sounds good ("hover preview image") can render as garbage (130px vertical strip no photo works in). This rule exists because V3 "Subtitle + Preview" was scored 35/40 (highest) on paper, then rendered as unusable. Never again.

---

## Summary

**DEMX = One word → 5 variations → Brand Compliance Gate → AIDAX scores → Live demo → Pick winner**

Use DEMX to:
- Rapidly explore entity card layouts
- Compare homepage hero treatments
- Decide filter UX patterns
- Design admin dashboard components
- Make objective design decisions with scoring

**Key Philosophy:**
*"Don't discuss designs - build them. Don't guess which is best - render them, then score what you see."*

---


---

## Supplements

Before starting work, check for a relevant supplement in `builders/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic with Brand Compliance Gate
**Last Updated:** March 2026
**Version:** 3.3 (Score-after-render gate added)
