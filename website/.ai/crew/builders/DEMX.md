# DEMX Framework -- Lost Monster Edition

> **Demo eXplorer - Rapid Design Variation System**
> One command triggers 5 live variations with AIDAX scoring on a demo page.
>
> Customized for personal brand development agency design exploration.

---

## Lost Monster Context

**DEMX for Lost Monster** creates variations for:
- ProjectCard layouts (grid, list, featured)
- Hero sections (homepage, services landing pages)
- Search filters (mobile drawer, desktop sidebar)
- Project detail layouts (photo gallery, info hierarchy)
- Enquiry forms (modal, inline, sticky)
- Testimonial display styles (card, slider, grid)

**Lost Monster Design Constraints:**
- Colors: dynamic accent (5-colour user-selectable system), dark gradient backgrounds, neutral-300/400 for secondary text
- Mobile-first: All variations must work on mobile
- Trust-focused: Clean, professional, personal voice
- Metric-prominent: 50+, 70%, 4.9/5, 2-4 wks always visible
- Dark backgrounds ONLY for pages (no light backgrounds)
- Cards use glassmorphism: `bg-white/5 backdrop-blur-md border`
- Dynamic colour via `style={{ color: color.accent }}`

**Lost Monster Brand Compliance Gate (MANDATORY -- runs before AIDA scoring):**
Every variation MUST pass these checks before it gets an AIDA score. Any variation that fails is disqualified -- it never appears on the demo page.

Reference: `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`

| # | Check | Rule | Violation = Disqualified |
|---|-------|------|--------------------------|
| 1 | **Approved backgrounds only** | Dark gradient (bg-gradient-to-br from-neutral-900 etc.) for all pages. Glassmorphism cards (bg-white/5 backdrop-blur-md). No light page backgrounds. | Using `bg-white` or `bg-gray-50` as page background, using `bg-slate-*` anywhere |
| 2 | **Page rhythm** | Adjacent sections MUST have visually distinct treatments. Pattern: gradient intensity variation or section dividers. Dark base throughout. | Two adjacent sections with identical treatment, any light section mid-page |
| 3 | **No orphan patterns** | Every visual treatment (shadow, border, icon style, card shape) must exist on at least one other Lost Monster page | Inventing a new card style, border treatment, or layout that exists nowhere else |
| 4 | **No AI slop red flags** | No thick coloured borders/accent bars, no ring decorations, no gratuitous gradients, no light backgrounds on marketing pages | Any of the 10 Red Flags from the AI Slop Test at .ai/slop-test.md |
| 5 | **Card treatment consistency** | Cards use `bg-white/5 backdrop-blur-md border rounded-xl` with accent border at 20% opacity. Variations in content layout are fine; variations in card chrome are not | Custom shadows, non-standard rounding, coloured card backgrounds, bg-white cards |

**Process:**
1. Generate 5 variation ideas
2. Run each through the Brand Compliance Gate (5 checks above)
3. Any that fail -> discard and replace with a compliant alternative
4. Only compliant variations get AIDA scored
5. Build demo page with compliant, scored variations only

---

## When to Use DEMX

### Use DEMX For Lost Monster When:
- Designing ProjectCard layouts (how to show title, category, details)
- Exploring homepage hero treatments
- Deciding search filter UX (chips vs dropdown vs drawer)
- Designing testimonial display styles
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

**Lost Monster Examples:**
```
DEMX: project card
DEMX: homepage hero
DEMX: search filters mobile
DEMX: project detail header
DEMX: testimonial display
DEMX: enquiry form
DEMX: services landing hero
```

---

## Lost Monster Variation Types

### ProjectCard Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Compact** | Minimal info, image-forward, fits 6+ per screen |
| 2 | **Info-Rich** | All details visible (category, client, description) |
| 3 | **List View** | Horizontal layout for list browsing |
| 4 | **Featured** | Larger, hero-style for homepage highlights |
| 5 | **Minimal** | Title + category only, clean and focused |

### Homepage Hero Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Metrics Forward** | Key stats (50+, 70%, 4.9/5, 2-4 wks) as hero element |
| 2 | **Lifestyle** | Personal story, emotional connection |
| 3 | **Stats Forward** | "50+ projects built" trust signals prominent |
| 4 | **CTA Forward** | "Start Your Project" as primary focus |
| 5 | **Split Layout** | Personal story left, metrics right |

### Enquiry Form Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Sticky Footer** | Always visible, minimal fields |
| 2 | **Inline Card** | Embedded in project detail page |
| 3 | **Modal** | Triggered by "Start Your Project" button |
| 4 | **Full Page** | Dedicated /contact page |
| 5 | **Two-Step** | Basic info -> Full form on interest |

### Testimonial Display Variations
| # | Approach | Description |
|---|----------|-------------|
| 1 | **Card Grid** | Glassmorphism cards in 2-3 column grid |
| 2 | **Slider** | Horizontal carousel, one at a time |
| 3 | **Featured Quote** | Single large quote with accent colour |
| 4 | **Wall** | Masonry layout, social proof density |
| 5 | **Inline** | Woven between project cards |

---

## AIDAX Scoring for Lost Monster

Score each variation using AIDAX (0-10 per dimension, 40 total).

| Dimension | What It Measures for Lost Monster |
|-----------|-----------------------------------|
| **Attention** | Does it grab visitors immediately? Dark gradient impact, accent colour prominence, typography boldness |
| **Interest** | Does it communicate value? Metrics visible (50+, 70%, 4.9/5, 2-4 wks), personal voice, category clarity |
| **Desire** | Does it create "I want to work with this person"? Personal connection, proof, trust signals |
| **Action** | Is the CTA clear? "Start Your Project" visibility, form accessibility, friction reduction |

**Lost Monster-Specific Scoring:**
| Score | Rating | Meaning |
|-------|--------|---------|
| 36-40 | Exceptional | Industry-leader quality, ship immediately |
| 30-35 | Sophisticated | Minor refinements before launch |
| 24-29 | Acceptable | MVP quality, iterate post-launch |
| <24 | Needs Work | Reconsider approach |

---

## Demo Page for Lost Monster

Create demo pages at `/demo/[feature]-variations/`.

**Lost Monster Demo Page Specs:**
- Background: dark gradient (bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900)
- Accent: dynamic accent colour for scores and highlights
- Text: white for headings, neutral-300 for body
- Cards: glassmorphism (bg-white/5 backdrop-blur-md border)
- Recommended indicator: accent colour badge on winner

**Layout:**
```
+-----------------------------------------------------------------+
| FIXED HEADER (dark background)                                   |
| <- Back to Demo    Project Card Variations    [1] [2] [3] [4] [*5] |
+-----------------------------------------------------------------+

+----------------------------+------------------------------------+
|                            |                                    |
|   LIVE PREVIEW             |   VARIATION DETAILS                |
|   (dark gradient bg)       |   +- Name: "Compact Card"          |
|                            |   +- Description                   |
|   [ProjectCard             |   +- Design Reasoning              |
|    renders with sample     |                                    |
|    data on glassmorphism   |   AIDAX SCORES                     |
|    card]                   |   +- Attention: 8/10               |
|                            |   +- Interest:  7/10               |
|                            |   +- Desire:    9/10               |
|                            |   +- Action:    8/10               |
|                            |   +- Total: 32/40                  |
|                            |                                    |
+----------------------------+------------------------------------+

+-----------------------------------------------------------------+
| QUICK COMPARISON (accent colour bars)                            |
| [Var 1: 28] [Var 2: 31] [Var 3: 29] [Var 4: 33] [*Var 5: 36]   |
+-----------------------------------------------------------------+
```

---

## Lost Monster DEMX Example

**User Input:**
```
DEMX: project card
```

**My Response:**

### 1. Micro-Context Check
"Creating 5 variations of the ProjectCard component for the projects page -- exploring image treatment, info density, and CTA placement. All variations use dynamic accent colour on dark gradient backgrounds with glassmorphism card treatment."

### 2. Generate 5 Variations

**Variation 1: Compact**
- Image 60% of card (bg-white/5 backdrop-blur-md)
- Title below in white, category in accent colour
- Single line: "Category -- Client"
- No CTA button -- entire card is link
- AIDAX: A8 I6 D7 A7 = 28/40

**Variation 2: Info-Rich**
- Image 40% of card
- Title prominent in white
- Full details: category, client, description preview
- "View Project" CTA with accent background
- AIDAX: A7 I9 D7 A8 = 31/40

**Variation 3: List View**
- Horizontal layout (image left, info right)
- Title and category very prominent
- Description preview visible
- "View" CTA on right edge
- AIDAX: A7 I8 D8 A9 = 32/40

**Variation 4: Featured (Recommended)**
- Large image with dark gradient overlay
- Title in white on dark gradient
- Category badge in accent colour
- Personal touch: "I built this for [client]"
- "View Project" CTA button
- AIDAX: A9 I8 D9 A8 = 34/40 *

**Variation 5: Minimal**
- No image, text-only card
- Large title, category badge
- One-line description
- Elegant, content-focused
- AIDAX: A6 I7 D7 A8 = 28/40

### 3. Demo Page
"Demo page ready at `/demo/project-card-variations/`"

### 4. Recommendation
```
**Recommendation: Variation 4 (Featured)**
Score: 34/40

Why this wins:
- Attention (9): Large image with gradient creates immediate visual impact on dark bg
- Interest (8): Category badge and client info build credibility
- Desire (9): Personal voice "I built this for..." creates connection
- Action (8): Clear CTA, balanced info density

Trade-offs:
- Requires high-quality project images
- Takes more screen space than Compact
- Consider using Compact for grid, Featured for homepage highlights

Best for: Homepage featured section, services landing page
Use Compact for: Projects listing grid
```

---

## Sample Data

Use consistent sample data across all DEMX variations:

```typescript
const sampleProject = {
  id: 'demo-1',
  title: 'Ancarraig Lodges Booking System',
  slug: 'ancarraig-lodges',
  category: 'web-app',
  serviceType: 'build',
  description: 'Complete booking and management system for 12 self-catering holiday lodges near Loch Ness.',
  client: 'Ancarraig Lodges',
  url: 'https://ancarraiglodges.co.uk',
  featured: true,
  status: 'active',
  createdAt: new Date().toISOString(),
}

// Test persona: Dave, 42, small business owner
// Dave is browsing the site deciding whether to hire for his business.
// He needs to see proof, speed, and value quickly.
```

---

## Integration with Lost Monster Frameworks

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

### Lost Monster DEMX Triggers
```
DEMX: project card
DEMX: homepage hero
DEMX: search filters
DEMX: project detail
DEMX: enquiry form
DEMX: testimonial display
DEMX: services landing
```

### Variation Naming
| Type | Names |
|------|-------|
| ProjectCard | Compact, Info-Rich, List View, Featured, Minimal |
| Hero | Metrics Forward, Lifestyle, Stats, CTA Forward, Split |
| Enquiry | Sticky Footer, Inline, Modal, Full Page, Two-Step |
| Testimonial | Card Grid, Slider, Featured Quote, Wall, Inline |

---

## Summary

**DEMX = One word -> 5 variations -> Brand Compliance Gate -> AIDAX scores -> Live demo -> Pick winner**

Use DEMX for Lost Monster to:
- Rapidly explore ProjectCard layouts
- Compare homepage hero treatments
- Decide search filter UX patterns
- Design testimonial display components
- Make objective design decisions with scoring

**Key Philosophy:**
*"Don't discuss designs - build them. Don't guess which is best - score them."*

**Lost Monster Brand Rules (enforced by Brand Compliance Gate):**
- Dark backgrounds with gradients ONLY (no light page backgrounds)
- Cards use glassmorphism: `bg-white/5 backdrop-blur-md border`
- Dynamic colour via `style={{ color: color.accent }}`
- Typography: `text-6xl md:text-8xl lg:text-9xl` for heroes
- Personal "I" voice not corporate "we"
- Grid pattern background texture
- Key metrics always visible: 50+, 70%, 4.9/5, 2-4 wks

---

**Framework Status:** Lost Monster Edition (Brand Gate included)
**Last Updated:** February 28, 2026
**Version:** 3.0 (Lost Monster Adapted)
