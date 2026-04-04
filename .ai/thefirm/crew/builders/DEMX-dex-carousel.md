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

## Scoring — AIDAX Does This, Not DEMX

**DEMX does NOT score its own variations.** DEMX builds. AIDAX scores. Always.

After DEMX builds all 5 variations and takes Playwright screenshots, **AIDAX runs the full 0-100 audit on every variation** (not simplified 0-40). DEMX never assigns AIDA scores — not even provisional ones.

The flow:
1. DEMX builds 5 variations on the demo page (NO scores anywhere)
2. Playwright screenshots of all 5
3. AIDAX scores all 5 (full 0-100: Attention 25, Interest 25, Desire 25, Action 25)
4. Scores written to `scores.json`
5. Presented to James with all 5 scored
6. James picks a winner — or says "variant 3 but push it further"
7. If pushing further → back to step 1 with the chosen variant as the base for 5 new variations
8. Repeat until James is happy

**DEMX self-scoring is a protocol violation.** If you see DEMX writing `AIDAX: A8 I6 D7 A7 = 28` — that's wrong. AIDAX scores. DEMX builds.

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
Each variation checked against design guide rules before building.

### 3. Build 5 Variations (NO scores)

DEMX builds all 5 on the demo page. No scores assigned — AIDAX does that.

**Variation 1: Compact** — Photography 65% of card, square crop, entity name + model below, product type badge top-left, entire card clickable

**Variation 2: Info-Rich** — Photography 50%, entity name prominent, specs row (key details, price/day), product types as chips, primary CTA

**Variation 3: Landscape** — Horizontal layout (photo left 40%, info right 60%), entity name prominent, CTA on right edge

**Variation 4: Immersive Dark** — Full-bleed photography with dark overlay, entity name over photo, minimal info, CTA on hover/focus

**Variation 5: Featured** — Large photography full-width, entity name + model below, product type badge, specs row, full-width CTA

### 4. Demo Page + Screenshots
"Demo page ready at `/demo/entity-card-variations/`"
Playwright screenshots taken of all 5 variations.

### 5. AIDAX Scores All 5
AIDAX runs full 0-100 audit on each variation from the screenshots. Scores written to `scores.json`. Demo page re-renders with real scores.

### 6. Presented to James
All 5 variations with AIDAX scores. James picks:
- **"Ship variant 5"** → done
- **"Variant 3 but make it more immersive"** → DEMX builds 5 new variations based on variant 3 → AIDAX scores → present again
- **"None of these work"** → DEMX rethinks approach, builds 5 fresh variations

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

### DEMX + AIDAX (MANDATORY PAIRING)
```
DEMX: Build 5 variations (no scores)
AIDAX: Score all 5 (full 0-100 audit)
James: Pick winner or request further variants
```
AIDAX is the ONLY scorer. DEMX never scores its own work.

### DEMX + SOFAX
```
SOFAX: Deep audit of the final chosen variation (93+/110 target)
```
SOFAX runs AFTER James picks the winner, not during variation exploration.

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
1. BUILD all 5 variations on demo page (NO scores — DEMX does not score)
2. PLAYWRIGHT screenshot every variation at correct viewport(s)
3. AIDAX scores all 5 variations from the screenshots (full 0-100 audit)
4. AIDAX writes scores to scores.json — demo page re-renders with real scores
5. PRESENT all 5 with screenshots + AIDAX scores to James
6. James picks winner — or says "push variant N further" → loop back to step 1
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

**DEMX = One word → 5 variations → Screenshots → AIDAX scores all 5 → Present to James → Pick winner or push further**

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
| Homepage | `supplements/DEMX-homepage.md` | 2026-04-03 |
| Landing pages | `supplements/DEMX-landing-pages.md` | 2026-04-03 |

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic with Brand Compliance Gate
**Last Updated:** March 2026
**Version:** 3.4 (DEMX never scores — AIDAX scores all variations. Iterative loop added)
