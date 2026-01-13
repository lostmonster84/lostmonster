# DESKX Framework

> **Desktop Experience Design Framework**
> Desktop-first design principles for marketing pages, dashboards, and web applications.

## What is DESKX?

**D**esktop **E**xperience **S**creen **K**it e**X**cellence

A comprehensive framework for desktop web design that ensures premium visual presence, optimal information density, and professional UX on large screens (1024px+).

---

## DESKX Dimensions

### 1. Screen Presence (0-15 points)

**Evaluates:** Visual impact, section heights, viewport utilization

**Standards:**
- **Hero section:** min-h-[600px] or min-h-screen
- **Primary sections:** min-h-[450px] to min-h-[550px]
- **Secondary sections:** min-h-[350px] to min-h-[400px]
- **Compact sections:** min-h-[200px] to min-h-[300px]

**Scoring:**
- ✅ Sections fill viewport meaningfully: 15/15
- ⚠️ Some sections too short/cramped: 11-14/15
- ❌ No minimum heights, content-dependent only: 8-10/15

**Common Violations:**
- Sections that collapse to content height only
- Hero that doesn't command attention
- Uneven section rhythm (some huge, some tiny)
- Too much scrolling for too little content

---

### 2. Horizontal Balance (0-15 points)

**Evaluates:** Use of horizontal space, grid layouts, left/right composition

**Standards:**
- **Max content width:** 1200-1400px
- **Grid system:** 12-column grid
- **Gutters:** 24-32px
- **Alternating layouts:** Z-pattern (text left/image right, then flip)
- **Split sections:** 50/50 or 60/40 on two-column layouts

**Scoring:**
- ✅ Full-width utilized with proper constraints: 15/15
- ⚠️ Some sections not using horizontal space: 12-14/15
- ❌ Everything centered/narrow: 8-11/15

**Common Violations:**
- All content centered in narrow column
- No left/right visual variety
- Inconsistent max-widths between sections
- Wasted horizontal space on wide screens

---

### 3. Typography Scale (0-15 points)

**Evaluates:** Desktop-appropriate sizing, hierarchy, readability at distance

**Standards:**
- **Hero headline (H1):** 48-72px
- **Section headlines (H2):** 32-48px
- **Subsection headlines (H3):** 24-32px
- **Body text:** 16-20px
- **Captions/metadata:** 12-14px
- **Line heights:** 1.3-1.5 for headings, 1.6-1.8 for body

**Scoring:**
- ✅ Clear hierarchy, desktop-appropriate sizes: 15/15
- ⚠️ Slightly under/over sized: 12-14/15
- ❌ Mobile-sized text on desktop: 8-11/15

**Common Violations:**
- Headlines too small for desktop (< 40px for H1)
- Body text too small (< 16px)
- Inconsistent sizing across sections
- Poor line-height making text hard to read

---

### 4. Visual Density (0-15 points)

**Evaluates:** Information per viewport, scroll economy, content richness

**Standards:**
- **Scroll economy:** Full page in 4-6 viewport heights
- **Content per section:** Substantial but not overwhelming
- **Visual-to-text ratio:** 70/30 to 60/40 depending on context
- **White space:** Generous but purposeful (not padding for padding's sake)

**Scoring:**
- ✅ Rich content, efficient scrolling: 15/15
- ⚠️ Slightly sparse or dense: 12-14/15
- ❌ Too sparse (wasted space) or too dense (overwhelming): 8-11/15

**Common Violations:**
- Single paragraph sections with massive padding
- 10+ scrolls for a landing page
- Sections with no visual content at all
- Cramming too much into single viewport

---

### 5. Visual Hierarchy (0-10 points)

**Evaluates:** Clear focal points, emphasis levels, reading flow

**Standards:**
- **One hero per viewport:** Each section has a clear primary element
- **Size = importance:** Larger elements draw attention first
- **Color = emphasis:** Brand colors for key elements
- **Position = priority:** Top-left starts the reading path

**Scoring:**
- ✅ Clear hierarchy, obvious reading flow: 10/10
- ⚠️ Minor hierarchy issues: 7-9/10
- ❌ Unclear what to look at: 4-6/10

**Common Violations:**
- All elements same size/weight
- No clear primary action per section
- Competing focal points
- Color used randomly, not for emphasis

---

### 6. Section Rhythm (0-10 points)

**Evaluates:** Visual variety, alternating patterns, flow between sections

**Standards:**
- **Background alternation:** Light/dark or white/cream rhythm
- **Layout alternation:** Left-heavy, then right-heavy (Z-pattern)
- **Density alternation:** Dense section, then breathing room
- **Transitions:** Smooth flow between sections

**Scoring:**
- ✅ Clear rhythm, visual variety: 10/10
- ⚠️ Some monotony: 7-9/10
- ❌ All sections look the same: 4-6/10

**Common Violations:**
- Same background color for all sections
- Same layout for all sections
- No visual differentiation between sections
- Jarring transitions

---

### 7. Interaction Polish (0-10 points)

**Evaluates:** Hover states, transitions, micro-interactions, feedback

**Standards:**
- **Hover states:** All interactive elements respond to hover
- **Transitions:** 150-300ms duration, ease-out curves
- **Button feedback:** Scale, brightness, or color change
- **Scroll animations:** Subtle fade/slide reveals (optional)

**Scoring:**
- ✅ Polished, consistent interactions: 10/10
- ⚠️ Some missing hover states: 7-9/10
- ❌ No interaction feedback: 4-6/10

**Common Violations:**
- Buttons with no hover state
- Instant state changes (no transitions)
- Inconsistent hover behavior
- Over-animated (bouncing, excessive movement)

---

### 8. Desktop Navigation (0-10 points)

**Evaluates:** Header, anchor links, sticky behavior, scroll handling

**Standards:**
- **Sticky header:** Remains visible on scroll
- **Header blur/shadow:** Subtle effect on scroll
- **Anchor smooth scroll:** Smooth scrolling to sections
- **Scroll offset:** Account for sticky header height

**Scoring:**
- ✅ Excellent navigation UX: 10/10
- ⚠️ Minor navigation issues: 7-9/10
- ❌ Navigation problems: 4-6/10

**Common Violations:**
- Header disappears on scroll
- Anchor links jump behind sticky header
- No smooth scrolling
- Header too tall, wastes space

---

## DESKX Scoring System

**Total Score: 0-100 points**

**Rating Levels:**
- **90-100:** Exceptional (Premium desktop experience)
- **85-89:** Excellent (Professional, polished)
- **75-84:** Good (Solid, needs minor refinement)
- **65-74:** Acceptable (Functional but basic)
- **Below 65:** Needs Work (Significant improvements needed)

**Target Score:** 85+ for marketing/landing pages

---

## Quick Reference: Desktop Standards

### Section Heights

```css
/* Hero */
min-h-[600px]  /* or min-h-screen for full-viewport hero */

/* Primary content sections */
min-h-[500px]

/* Secondary sections */
min-h-[400px]

/* Compact sections (social proof, dividers) */
min-h-[250px]
```

### Typography Scale

```css
/* Desktop typography */
--text-hero: 56-72px;
--text-h1: 40-56px;
--text-h2: 32-40px;
--text-h3: 24-28px;
--text-body: 18px;
--text-small: 14px;
```

### Section Padding

```css
/* Desktop section padding */
py-20 lg:py-24  /* 80-96px - standard */
py-16 lg:py-20  /* 64-80px - compact */
py-24 lg:py-32  /* 96-128px - generous */
```

### Content Width

```css
/* Max content widths */
max-w-[1200px]  /* Standard */
max-w-[1400px]  /* Wide */
max-w-[800px]   /* Narrow (text-heavy) */
max-w-[1000px]  /* Medium */
```

### Vertical Centering

```css
/* Center content in fixed-height sections */
min-h-[500px] flex items-center

/* Full structure */
<section className="min-h-[500px] flex items-center py-20">
  <div className="max-w-[1200px] mx-auto px-6 w-full">
    {/* Content */}
  </div>
</section>
```

---

## Z-Pattern for Desktop

Desktop layouts benefit from alternating left/right content:

```
Section 1: [TEXT LEFT    |    IMAGE RIGHT]
Section 2: [IMAGE LEFT   |    TEXT RIGHT ]
Section 3: [TEXT LEFT    |    IMAGE RIGHT]
```

This creates:
- Natural reading flow (Z-pattern eye movement)
- Visual variety (sections feel different)
- Better horizontal space utilization
- More engaging scroll experience

### Implementation

```tsx
// Section with text left, visual right
<section>
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    <div>{/* Text content */}</div>
    <div>{/* Visual content */}</div>
  </div>
</section>

// Section with visual left, text right
<section>
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    <div className="order-2 lg:order-1">{/* Visual content */}</div>
    <div className="order-1 lg:order-2">{/* Text content */}</div>
  </div>
</section>
```

---

## DESKX vs SOPHIA

| Aspect | SOPHIA (Mobile-First) | DESKX (Desktop-First) |
|--------|----------------------|----------------------|
| Section padding | 24-32px | 80-96px |
| H1 size | 30-48px | 48-72px |
| H2 size | 18-24px | 32-48px |
| Min section height | Not specified | 400-600px |
| Scroll economy | 2-3 screens | 4-6 screens |
| Content width | Device width | 1200-1400px |
| Touch targets | 44px minimum | 44px+ (comfortable) |

**Use SOPHIA for:** Mobile apps, responsive components
**Use DESKX for:** Marketing sites, dashboards, desktop-first pages

---

## DESKX Checklist

**For Every Desktop Page:**

**Screen Presence:**
- [ ] Hero has min-h-[600px] or equivalent
- [ ] Primary sections have min-h-[450px]+
- [ ] Content is vertically centered in sections
- [ ] No sections collapse to tiny heights

**Horizontal Balance:**
- [ ] Content constrained to 1200-1400px max
- [ ] 12-column grid system in use
- [ ] Some sections use left/right layouts
- [ ] Horizontal space utilized meaningfully

**Typography Scale:**
- [ ] Hero headline 48px+ (desktop)
- [ ] Section headlines 32px+
- [ ] Body text 16-18px
- [ ] Clear size hierarchy

**Visual Density:**
- [ ] Page fits in 4-6 viewport heights
- [ ] Each section has meaningful content
- [ ] No wasted space sections
- [ ] Visual-to-text ratio appropriate

**Visual Hierarchy:**
- [ ] One clear focal point per section
- [ ] Size indicates importance
- [ ] Color used for emphasis
- [ ] Reading flow is obvious

**Section Rhythm:**
- [ ] Background colors alternate
- [ ] Layouts alternate (Z-pattern)
- [ ] Visual variety between sections
- [ ] Smooth transitions

**Interaction Polish:**
- [ ] All buttons have hover states
- [ ] Transitions are 150-300ms
- [ ] Cards/interactive elements respond
- [ ] No jarring state changes

**Desktop Navigation:**
- [ ] Sticky header on scroll
- [ ] Smooth anchor scrolling
- [ ] Scroll offset for sticky header
- [ ] Header has blur/shadow on scroll

---

## Example Audit

### Marketing Landing Page

**Screen Presence: 14/15**
- Hero: 600px ✅
- Most sections: 450-550px ✅
- One section too short ⚠️

**Horizontal Balance: 13/15**
- Max-width: 1200px ✅
- Z-pattern used ✅
- One section too narrow ⚠️

**Typography Scale: 15/15**
- Hero: 56px ✅
- H2s: 40px ✅
- Body: 18px ✅

**Visual Density: 14/15**
- Page: 5 viewports ✅
- Good content per section ✅
- One sparse section ⚠️

**Visual Hierarchy: 9/10**
- Clear focal points ✅
- Good size hierarchy ✅
- One competing element ⚠️

**Section Rhythm: 10/10**
- Alternating backgrounds ✅
- Z-pattern layouts ✅
- Good variety ✅

**Interaction Polish: 9/10**
- Hovers present ✅
- Good transitions ✅
- Missing one animation ⚠️

**Desktop Navigation: 10/10**
- Sticky header ✅
- Smooth scroll ✅
- Proper offset ✅

**Total: 94/100** ✅ (Exceptional)

---

## Summary

**DESKX = Desktop-first design excellence**

Use DESKX to:
- Audit desktop marketing pages
- Ensure premium screen presence
- Optimise horizontal space usage
- Create visual variety and rhythm
- Polish interactions for desktop users

**Key Philosophy:**
*"Desktop is not mobile stretched. It's a canvas for premium visual presence, generous typography, and sophisticated layouts. Fill the screen meaningfully."*

---

## Integration with Other Frameworks

### AIDA + DESKX
- **AIDA:** Content structure (Attention → Interest → Desire → Action)
- **DESKX:** Visual execution (Screen presence, typography, rhythm)

### SOPHIA + DESKX
- **SOPHIA:** Mobile and component-level quality
- **DESKX:** Desktop page-level quality

### Z-Pattern + DESKX
- **Z-Pattern:** Layout alternation strategy
- **DESKX:** Full desktop experience framework

**Together:** AIDA for content → DESKX for desktop execution → SOPHIA for responsive refinement

---

*Last updated: January 2026*
