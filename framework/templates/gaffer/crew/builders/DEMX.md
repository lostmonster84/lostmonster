# DEMX Framework — [PROJECT] Edition

> **Demo eXplorer - Rapid Design Variation System**
> One command triggers 5 live variations with AIDAX scoring on a demo page.
>
> Customized for [PROJECT-DOMAIN] design exploration.

---

## [PROJECT] Context

**DEMX for [PROJECT]** creates variations for:
- [EntityPrimary]Card layouts (grid, list, map preview)
- Hero sections (homepage, [entity-geo] landing pages)
- Search filters (mobile drawer, desktop sidebar)
- [entity-primary] detail layouts (photo gallery, info hierarchy)
- [TARGET-USER-B] dashboard components ([entity-primary] table, [entity-secondary] inbox)
- Enquiry forms (modal, inline, sticky)
- Map marker styles (key metric badges, cluster indicators)

**[PROJECT] Design Constraints:**
- Colors: [BRAND-PRIMARY], [BRAND-BG], [BRAND-DARK]
- Mobile-first: All variations must work on mobile
- Trust-focused: Clean, professional, no gimmicks
- Key metric-prominent: Clear formatting for primary metric display

**[PROJECT] Brand Compliance Gate (MANDATORY — runs before AIDA scoring):**
Every variation MUST pass these checks before it gets an AIDA score. Any variation that fails is disqualified — it never appears on the demo page.

Reference: [DESIGN-GUIDE-PATH]

| # | Check | Rule | Violation = Disqualified |
|---|-------|------|--------------------------|
| 1 | **Approved backgrounds only** | [BRAND-BG] (default canvas), White (cards/section bands), [BRAND-SECONDARY]/20 (loading), [BRAND-DARK] (footer/cinematic CTA only), Hero gradients (hero sections only) | Using `bg-[BRAND-DARK]` as a mid-page content section, using `bg-slate-*` on marketing |
| 2 | **Page rhythm** | Adjacent sections MUST have visually distinct backgrounds. Pattern: `[BRAND-BG] ↔ white` alternation. [BRAND-DARK] reserved for page-end CTA/footer only | Two adjacent sections with same background, [BRAND-DARK] used mid-page |
| 3 | **No orphan patterns** | Every visual treatment (shadow, border, icon style, card shape) must exist on at least one other [PROJECT] page | Inventing a new card style, border treatment, or layout that exists nowhere else |
| 4 | **No AI slop red flags** | No thick coloured borders/accent bars, no ring decorations, no gratuitous gradients, no cold colours (slate) on marketing | Any of the 10 Red Flags from the AI Slop Test |
| 5 | **Card treatment consistency** | Cards use `bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]` — the proven [PROJECT] card. Variations in content layout are fine; variations in card chrome are not | Custom shadows, non-standard rounding, coloured card backgrounds |

**Process:**
1. Generate 5 variation ideas
2. Run each through the Brand Compliance Gate (5 checks above)
3. Any that fail → discard and replace with a compliant alternative
4. Only compliant variations get AIDA scored
5. Build demo page with compliant, scored variations only

---

## When to Use DEMX

### Use DEMX For [PROJECT] When:
- Designing [EntityPrimary]Card layouts (how to show key metric, details, location)
- Exploring homepage hero treatments
- Deciding search filter UX (chips vs dropdown vs drawer)
- Creating map marker styles
- Designing [TARGET-USER-B] dashboard tables
- Exploring enquiry form placements
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

**[PROJECT] Examples:**
```
DEMX: [entity-primary] card
DEMX: homepage hero
DEMX: search filters mobile
DEMX: [entity-primary] detail header
DEMX: map marker style
DEMX: [TARGET-USER-B] [entity-primary] table
DEMX: enquiry form
DEMX: [entity-geo] landing hero
```

---

## [PROJECT] Variation Types

### [EntityPrimary]Card Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Compact** | Minimal info, photo-forward, fits 6+ per screen |
| 2 | **Info-Rich** | All details visible (key attributes, [TARGET-USER-B] info) |
| 3 | **Map Preview** | Optimized for map popup display |
| 4 | **List View** | Horizontal layout for list browsing |
| 5 | **Featured** | Larger, hero-style for homepage highlights |

### Homepage Hero Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Search Forward** | Search box is the hero element |
| 2 | **Lifestyle** | Aspirational imagery, emotional appeal |
| 3 | **Stats Forward** | "X [entity-primary] available" trust signals |
| 4 | **[entity-geo] Cards** | Featured [entity-geo] as primary navigation |
| 5 | **Split Layout** | Search left, featured [entity-primary] right |

### Search Filter Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Chip Bar** | Horizontal scrolling filter chips |
| 2 | **Drawer** | Mobile bottom sheet with all filters |
| 3 | **Sidebar** | Desktop sidebar, sticky on scroll |
| 4 | **Minimal** | Primary filter only, "More filters" expands |
| 5 | **Map Integrated** | Filters embedded in map control bar |

### Enquiry Form Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Sticky Footer** | Always visible, minimal fields |
| 2 | **Inline Card** | Embedded in [entity-primary] detail page |
| 3 | **Modal** | Triggered by "Enquire" button |
| 4 | **Sidebar** | Fixed position on desktop |
| 5 | **Two-Step** | Basic info → Full form on interest |

---

## AIDAX Scoring for [PROJECT]

Score each variation using AIDAX (0-10 per dimension, 40 total).

| Dimension | What It Measures for [PROJECT] |
|-----------|-------------------------------|
| **Attention** | Does it grab users immediately? Photo quality, key metric prominence, location clarity |
| **Interest** | Does it communicate value? Key attributes visible, activity signals, context |
| **Desire** | Does it create "I want this"? Lifestyle imagery, social proof, [TARGET-USER-B] trust |
| **Action** | Is the CTA clear? CTA visibility, form accessibility, friction reduction |

**[PROJECT]-Specific Scoring:**
| Score | Rating | Meaning |
|-------|--------|---------|
| 36-40 | Exceptional | Industry-leader quality, ship immediately |
| 30-35 | Sophisticated | Minor refinements before launch |
| 24-29 | Acceptable | MVP quality, iterate post-launch |
| <24 | Needs Work | Reconsider approach |

---

## Demo Page for [PROJECT]

Create demo pages at `/demo/[feature]-variations/`.

**[PROJECT] Demo Page Specs:**
- Background: [BRAND-BG] - light, clean
- Accent: [BRAND-PRIMARY] for scores and highlights
- Text: [BRAND-DARK] for readability
- Cards: White background with subtle shadow
- Recommended indicator: [BRAND-PRIMARY] badge on winner

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ FIXED HEADER ([BRAND-DARK] background)                          │
│ ← Back to Demo    [Entity] Card Variations    [1] [2] [3] [4] [⭐5]  │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────────────┬────────────────────────────────────┐
│                            │                                    │
│   LIVE PREVIEW             │   VARIATION DETAILS                │
│   ([BRAND-BG] background)  │   ├─ Name: "Compact Card"          │
│                            │   ├─ Description                   │
│   [[EntityPrimary]Card     │   └─ Design Reasoning              │
│    renders with sample     │                                    │
│    data]                   │   AIDAX SCORES                     │
│                            │   ├─ Attention: 8/10 ████████      │
│                            │   ├─ Interest:  7/10 ███████       │
│                            │   ├─ Desire:    9/10 █████████     │
│                            │   ├─ Action:    8/10 ████████      │
│                            │   └─ Total: 32/40                  │
│                            │                                    │
└────────────────────────────┴────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ QUICK COMPARISON ([BRAND-PRIMARY] bars)                         │
│ [Var 1: 28] [Var 2: 31] [Var 3: 29] [Var 4: 33] [⭐Var 5: 36]   │
└─────────────────────────────────────────────────────────────────┘
```

---

## [PROJECT] DEMX Example

**User Input:**
```
DEMX: [entity-primary] card
```

**My Response:**

### 1. Micro-Context Check
"Creating 5 variations of the [EntityPrimary]Card component for search results - exploring photo treatment, key metric prominence, info density, and CTA placement. All variations use [BRAND-PRIMARY] accent and must work on mobile."

### 2. Generate 5 Variations

**Variation 1: Compact**
- Photo 60% of card, rounded corners
- Key metric overlay on photo (bottom-left)
- Single line: "[field-6] [label] · [location] · [key-metric]"
- No CTA button - entire card is link
- AIDAX: A8 I6 D7 A7 = 28/40

**Variation 2: Info-Rich**
- Photo 40% of card (square crop)
- Key metric prominent below photo
- Full details: key attributes, area, features
- [TARGET-USER-B] logo visible
- "View Details" CTA button
- AIDAX: A7 I9 D7 A8 = 31/40

**Variation 3: Map Preview**
- Landscape photo, tight crop
- Key metric as primary element
- Location + key attribute on second line
- Designed for map popup use
- AIDAX: A8 I7 D6 A8 = 29/40

**Variation 4: List View**
- Horizontal layout (photo left, info right)
- Key metric and attributes very prominent
- Description preview visible
- "Enquire" CTA on right edge
- AIDAX: A7 I8 D8 A9 = 32/40

**Variation 5: Featured (Recommended)**
- Large photo with gradient overlay
- Key metric in white on dark gradient
- Activity/freshness badge
- [TARGET-USER-B] info with verified checkmark
- "View [EntityPrimary]" CTA button
- AIDAX: A9 I8 D9 A8 = 34/40 ⭐

### 3. Demo Page
"Demo page ready at `/demo/[entity-primary]-card-variations/`"

### 4. Recommendation
```
**Recommendation: Variation 5 (Featured)**
Score: 34/40

Why this wins:
- Attention (9): Large photo with gradient creates immediate visual impact
- Interest (8): Activity badge and verified [TARGET-USER-B] build trust
- Desire (9): Lifestyle-focused, makes users envision the outcome
- Action (8): Clear CTA, balanced info density

Trade-offs:
- Requires high-quality photos (won't work with poor imagery)
- Takes more screen space than Compact
- Consider using Compact for grid, Featured for homepage highlights

Best for: Homepage featured section, [entity-geo] landing heroes
Use Compact for: Search results grid, map popups
```

---

## Sample Data

Use consistent sample data across all DEMX variations:

```typescript
const sampleItem = {
  id: 'demo-1',
  title: 'Sample [EntityPrimary] Title',
  slug: 'sample-[entity-primary]-title',
  [field5]: 1500,
  [field1]: '[value-a]',
  [field2]: '[type-a]',
  [field6]: 2,
  [field7]: 1,
  [field8]: 85,
  [field3]: '[Location]',
  [entityGeo]: '[Region]',
  lat: 0.0000,
  lng: 0.0000,
  [businessLogicField]: new Date().toISOString(),
  photos: [{ url: '/demo/item-1.jpg', order: 0 }],
  [entityTertiary]: {
    name: '[Sample Organisation]',
    verified: true,
    logo: '/demo/org-logo.png'
  }
}
```

---

## Integration with [PROJECT] Frameworks

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

### [PROJECT] DEMX Triggers
```
DEMX: [entity-primary] card
DEMX: homepage hero
DEMX: search filters
DEMX: [entity-primary] detail
DEMX: enquiry form
DEMX: map markers
DEMX: [TARGET-USER-B] dashboard
DEMX: [entity-geo] landing
```

### Variation Naming
| Type | Names |
|------|-------|
| [EntityPrimary]Card | Compact, Info-Rich, Map Preview, List View, Featured |
| Hero | Search Forward, Lifestyle, Stats, [entity-geo] Cards, Split |
| Filters | Chip Bar, Drawer, Sidebar, Minimal, Map Integrated |
| Enquiry | Sticky Footer, Inline, Modal, Sidebar, Two-Step |

---

## Summary

**DEMX = One word → 5 variations → Brand Compliance Gate → AIDAX scores → Live demo → Pick winner**

Use DEMX for [PROJECT] to:
- Rapidly explore [EntityPrimary]Card layouts
- Compare homepage hero treatments
- Decide search filter UX patterns
- Design [TARGET-USER-B] dashboard components
- Make objective design decisions with scoring

**Key Philosophy:**
*"Don't discuss designs - build them. Don't guess which is best - score them."*

---

**Framework Status:** Template (customise for project) with Brand Compliance Gate
**Last Updated:** February 28, 2026
**Version:** 3.0 (Generic Template — Brand Gate included)
