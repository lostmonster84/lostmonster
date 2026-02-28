# PIXLX Framework — Lost Monster Edition

> **Pixel-Perfect Experience Audit**
> Systematic UI/UX bug hunting for personal brand development agency.
>
> Find the broken forms. Catch the hardcoded colours. Verify the glassmorphism.

---

## Lost Monster Context

**PIXLX for Lost Monster** hunts bugs in:
- Homepage (hero, metrics, services, testimonials, contact)
- Portfolio/project showcase pages
- Services pages
- Contact/enquiry flow
- Case study detail pages
- Colour switcher and dynamic theming

**Lost Monster-Specific Audit Focus:**
- Dynamic colour system working across all 5 themes (blue, teal, orange, purple, green)
- Glassmorphism cards rendering correctly (backdrop-blur visible)
- Grid pattern background texture visible
- Contact form submitting properly
- Metrics displaying correctly (50+, 70%, 4.9/5, 2-4 wks)
- Mobile browsing experience (swipe colour change)
- Colour switcher persistence (localStorage)

---

## Scoring System

### Start at 100, Deduct Per Issue

| Severity | Deduction | Icon | Lost Monster Example |
|----------|-----------|------|----------------------|
| **Critical** | -10 | RED | Contact form won't submit |
| **Major** | -5 | ORANGE | Dynamic colour system broken (hardcoded colours) |
| **Minor** | -2 | YELLOW | Metric card border opacity inconsistent |
| **Nitpick** | -1 | WHITE | Shadow slightly different between cards |

### Grade Thresholds

| Score | Grade | Ship Decision |
|-------|-------|---------------|
| 95-100 | A+ | Ship it |
| 85-94 | A | Ship, polish later |
| 70-84 | B | Fix majors first |
| 50-69 | C | Needs work |
| <50 | F | Blocked |

**Lost Monster Targets:**
| Page | Target |
|------|--------|
| Homepage | 90+ |
| Portfolio/Projects | 90+ |
| Services | 90+ |
| Contact/Enquiry | 95+ |
| Case Study Detail | 90+ |

---

## Audit Context: Marketing Pages

Lost Monster is a marketing-only site (no admin dashboard). All pages are public-facing and require **full rigor** — every pixel, animation, and interaction matters.

| Context | Rigor | Focus | Ignore |
|---------|-------|-------|--------|
| **All pages (public)** | Full | Every pixel, animations, polish, brand compliance | Nothing |

---

## Lost Monster Audit Categories

### Category 1: Portfolio/Projects Display (PD)
*Are projects showing correctly?*

| Check | Severity |
|-------|----------|
| PD-01 | Project screenshots/visuals load correctly | Critical |
| PD-02 | Project titles and descriptions display properly | Major |
| PD-03 | Technology tags render consistently | Minor |
| PD-04 | Live project links work (no 404s) | Critical |
| PD-05 | Glassmorphism cards render correctly (backdrop-blur visible) | Major |
| PD-06 | Dynamic accent colour applied to all interactive elements | Major |
| PD-07 | Project cards consistent across the grid | Minor |
| PD-08 | No placeholder content in production | Major |
| PD-09 | Project gallery/carousel navigates correctly | Major |
| PD-10 | "No projects" state handled gracefully | Major |

**PD-01: Project Visuals Not Loading**
```
Issue: Project screenshot shows broken image icon
Severity: Critical (-10)
Location: app/portfolio/page.tsx (or component)

Diagnosis:
- Check image paths and CDN (lostmonster.dev)
- Verify Next.js Image component configuration
- Check for CORS issues

Fix:
// Before
<img src={project.screenshot} />

// After - with error handling
<Image
  src={project.screenshot}
  onError={(e) => e.currentTarget.src = '/images/no-preview.jpg'}
  alt={`${project.name} - ${project.type}`}
  width={800}
  height={450}
/>
```

**PD-05: Glassmorphism Not Rendering**
```
Issue: Cards appear as solid bg instead of frosted glass
Severity: Major (-5)
Location: components/ProjectCard.tsx

Diagnosis:
- Check backdrop-blur-md is present
- Verify bg-white/5 (not bg-white)
- Check parent has content behind it (gradient bg)

Fix:
// Before - missing glassmorphism
<div className="bg-white rounded-xl p-6">

// After - proper Lost Monster card
<div
  className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
  style={{ borderColor: `${color.accent}20` }}
>
```

### Category 2: Services Showcase (SS)
*Are services displaying correctly?*

| Check | Severity |
|-------|----------|
| SS-01 | All service cards render | Critical |
| SS-02 | Service descriptions are outcome-focused (not just tech jargon) | Major |
| SS-03 | Icons render in accent colour | Minor |
| SS-04 | Pricing/timeline info displays correctly (if present) | Major |
| SS-05 | Service cards use glassmorphism consistently | Major |
| SS-06 | CTA buttons work on each service card | Critical |
| SS-07 | Grid layout collapses correctly on mobile | Major |
| SS-08 | No lorem ipsum or placeholder text | Major |
| SS-09 | Service page links work from homepage | Major |
| SS-10 | "I" voice used consistently (not "we") | Major |

**SS-10: Corporate Voice Detected**
```
Issue: Service descriptions use "We provide" instead of "I build"
Severity: Major (-5)
Location: app/services/page.tsx

Diagnosis:
- Lost Monster is a personal brand — "I" not "we"
- Corporate language kills trust for the target audience (Dave)

Fix:
// Before
"We provide comprehensive web development solutions"

// After
"I build fast, reliable web apps that save you money"
```

### Category 3: Contact/Enquiry Flow (CE)
*Can visitors actually get in touch?*

| Check | Severity |
|-------|----------|
| CE-01 | Contact form renders | Critical |
| CE-02 | Form validation works (name, email required) | Major |
| CE-03 | Submit button works | Critical |
| CE-04 | Success message shows after submission | Major |
| CE-05 | Error handling works (network failure, server error) | Major |
| CE-06 | Email input validates format | Major |
| CE-07 | Message textarea works (no character limit issues) | Major |
| CE-08 | Loading state during submit (button disabled, spinner) | Major |
| CE-09 | Form accessible on mobile (keyboard doesn't obscure) | Major |
| CE-10 | Alternative contact info visible (email address) | Major |

**CE-03: Submit Button Does Nothing**
```
Issue: Clicking submit has no effect
Severity: Critical (-10)

Diagnosis:
- Check if onSubmit attached to form
- Check for JavaScript errors in console
- Check network tab for API call
- Verify API endpoint exists

Fix:
// Before - missing form submission
<form>
  <button type="submit">Submit</button>
</form>

// After - proper form handling
<form onSubmit={handleSubmit}>
  <button
    type="submit"
    disabled={isSubmitting}
    style={{ backgroundColor: color.accent }}
  >
    {isSubmitting ? 'Sending...' : 'Start Your Project'}
  </button>
</form>
```

### Category 4: Case Studies (CS)
*Do case studies tell a compelling story?*

| Check | Severity |
|-------|----------|
| CS-01 | Case study pages load correctly | Critical |
| CS-02 | Problem/solution/result structure clear | Major |
| CS-03 | Measurable results displayed prominently | Major |
| CS-04 | Client testimonial quote renders | Major |
| CS-05 | Before/after comparison visible (if applicable) | Minor |
| CS-06 | Live project link works | Major |
| CS-07 | Navigation between case studies works | Major |
| CS-08 | CTA at bottom works ("Want Similar Results?") | Major |
| CS-09 | Case study cards on index page link correctly | Critical |
| CS-10 | Rich content (images, metrics) displays properly | Major |

**CS-03: Results Not Prominent**
```
Issue: Measurable results buried in paragraph text
Severity: Major (-5)

Diagnosis:
- Results should be in prominent metric cards (glassmorphism)
- Numbers should be text-4xl+ font-bold
- Dave needs to see the outcome at a glance

Fix:
// Before - buried in text
<p>The project resulted in a 60% cost reduction and 3x faster delivery.</p>

// After - prominent metric cards
<div className="grid grid-cols-2 gap-6">
  <div className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
       style={{ borderColor: `${color.accent}20` }}>
    <div className="text-4xl font-bold text-white">60%</div>
    <div className="text-sm text-neutral-300">Cost Reduction</div>
  </div>
  <div className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
       style={{ borderColor: `${color.accent}20` }}>
    <div className="text-4xl font-bold text-white">3x</div>
    <div className="text-sm text-neutral-300">Faster Delivery</div>
  </div>
</div>
```

### Category 5: Brand Compliance (BC)
*Does it look like Lost Monster?*

| Check | Severity |
|-------|----------|
| BC-01 | All pages use dark gradient backgrounds (not bg-white, bg-gray-50 as page bg) | Major |
| BC-02 | Cards use glassmorphism: `bg-white/5 backdrop-blur-md border rounded-xl` with accent border | Major |
| BC-03 | CTAs and accent colours use dynamic system (`style={{ color: color.accent }}`) — not hardcoded hex | Major |
| BC-04 | Personal "I" voice throughout — no corporate "we" | Major |
| BC-05 | No accent bars, thick coloured borders, or decorative gradients on cards (AI slop) | Minor |
| BC-06 | Grid pattern background texture visible | Major |
| BC-07 | Colour switcher present and working (5 options, localStorage persistence) | Major |
| BC-08 | Key metrics present where relevant (50+, 70%, 4.9/5, 2-4 wks) | Major |
| BC-09 | Typography bold enough (text-4xl+ for section headlines, font-bold for headings) | Major |

**BC-01: Light Backgrounds on Marketing Pages**
```
Issue: Page section uses bg-white or bg-gray-50 instead of dark gradient
Severity: Major (-5)

Diagnosis:
- Brand violation — Lost Monster is a dark-first design
- AI-generated code often defaults to light backgrounds

Fix:
// Before
<section className="bg-white py-20">

// After
<section className="py-20 md:py-32" style={{ background: color.bgGradient }}>
```

**BC-03: Hardcoded Colours**
```
Issue: Accent elements use hardcoded hex/tailwind colours instead of dynamic system
Severity: Major (-5)

Diagnosis:
- Lost Monster uses user-selectable dynamic colours
- Every accent element must read from color.accent

Fix:
// Before
<h2 className="text-blue-500">Section Title</h2>
<button className="bg-teal-600">Click Me</button>

// After
<h2 style={{ color: color.accent }}>Section Title</h2>
<button style={{ backgroundColor: color.accent }}>Click Me</button>
```

**BC-05: AI Slop — Decorative Card Borders**
```
Issue: Cards have coloured left borders, gradient accents, or thick top stripes
Severity: Minor (-2)

Diagnosis:
- These patterns don't exist in the Lost Monster design system
- Classic AI slop — generated code adding "flair" that breaks brand

Fix:
// Remove decorative borders — Lost Monster cards are glassmorphism with subtle accent border
// No border-l-4, border-t-2 with accent colours, or gradient overlays
// The ONLY card border is: style={{ borderColor: `${color.accent}20` }}
```

---

### Category 6: Colour System (CX)
*Does the dynamic colour system work correctly?*

| Check | Severity |
|-------|----------|
| CX-01 | All 5 colour themes render correctly (blue, teal, orange, purple, green) | Critical |
| CX-02 | Colour switcher buttons display all options | Critical |
| CX-03 | Colour selection persists across page reload (localStorage) | Major |
| CX-04 | Transitions between colours are smooth (duration-700) | Major |
| CX-05 | Background gradient changes with colour | Major |
| CX-06 | Accent colour applies to all interactive elements | Major |
| CX-07 | Card borders update with accent colour | Minor |
| CX-08 | Mobile swipe colour change works | Major |
| CX-09 | No flash of wrong colour on page load | Major |
| CX-10 | Selected colour indicator (ring) displays correctly | Minor |

**CX-01: Colour Theme Not Rendering**
```
Issue: Selecting a colour shows no change or partial change
Severity: Critical (-10)

Diagnosis:
- Check ColorContext provider wrapping the app
- Verify color object destructuring
- Check for hardcoded colours bypassing the system

Fix:
// Ensure all colour-dependent elements use the dynamic system
// Background: style={{ background: color.bgGradient }}
// Accent text: style={{ color: color.accent }}
// Accent bg: style={{ backgroundColor: color.accent }}
// Border: style={{ borderColor: `${color.accent}20` }}
```

### Category 7: Responsive & Mobile (RM)
*Does it work on mobile?*

| Check | Severity |
|-------|----------|
| RM-01 | No horizontal scroll | Critical |
| RM-02 | Touch targets 44px+ | Major |
| RM-03 | Hero headline scales (text-6xl sm:text-7xl md:text-8xl lg:text-9xl) | Major |
| RM-04 | Metric cards grid collapses to 2-col | Major |
| RM-05 | Contact form fields fillable on mobile | Critical |
| RM-06 | Colour switcher dots visible on mobile | Major |
| RM-07 | Swipe gesture for colour change works | Major |
| RM-08 | Navigation works on mobile | Critical |
| RM-09 | CTA buttons full-width on mobile | Major |
| RM-10 | Text readable without zoom | Major |

---

## Lost Monster PIXLX Audit Template

```markdown
# PIXLX Audit: [Page Name]

**Date:** [Date]
**Auditor:** PIXLX
**Page:** [file path]

---

## Summary

| Category | Issues | Points Lost |
|----------|--------|-------------|
| Portfolio/Projects Display | X | -XX |
| Services Showcase | X | -XX |
| Contact/Enquiry Flow | X | -XX |
| Case Studies | X | -XX |
| Brand Compliance | X | -XX |
| Colour System | X | -XX |
| Responsive/Mobile | X | -XX |
| **TOTAL** | **X** | **-XX** |

**Final Score:** XX/100
**Grade:** [A+/A/B/C/F]
**Ship Decision:** [GO/FIX FIRST/BLOCKED]

---

## Critical Issues (Block Ship)

### [Check ID] - [Description]
- **Severity:** Critical (-10)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

---

## Major Issues (Fix Before Launch)

### [Check ID] - [Description]
- **Severity:** Major (-5)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

---

## Recommendations

1. [Priority fix 1]
2. [Priority fix 2]
3. [Priority fix 3]
```

---

## Lost Monster Quick Audit Checklist

### Portfolio/Projects
- [ ] All project visuals loading
- [ ] Live links working
- [ ] Glassmorphism cards rendering
- [ ] Dynamic accent colour applied

### Services
- [ ] All service cards displaying
- [ ] Outcome-focused descriptions (not tech jargon)
- [ ] Personal "I" voice (not "we")
- [ ] CTAs working

### Contact/Enquiry
- [ ] Form renders
- [ ] Validation works
- [ ] Submit sends message
- [ ] Success/error states show
- [ ] Email alternative visible

### Colour System
- [ ] All 5 themes work
- [ ] Colour persists on reload
- [ ] Smooth transitions (700ms)
- [ ] Mobile swipe works

### Mobile
- [ ] No horizontal scroll
- [ ] Typography scales down cleanly
- [ ] Forms fillable
- [ ] Touch targets 44px+

---

## Integration with Lost Monster Frameworks

### PIXLX + SOFAX
```
SOFAX: Is this well-designed? (quality scoring)
PIXLX: Is anything broken? (bug hunting)
Together: Design quality + bug-free = shippable
```

### PIXLX in Pipeline
```
1. CODAX -> PLANX -> Build
2. SOFAX audit (93+/110 target)
3. PIXLX audit (90+ target)
4. Ship
```

---

## PIXLX Triggers

```
run PIXLX on homepage
run PIXLX on portfolio
run PIXLX on services
run PIXLX on contact
run PIXLX on case study [name]
run PIXLX on colour system
run PIXLX quick check
```

---

---

## Checkpoint Mode (INSPX Integration)

When invoked by INSPX during the automated inspection pipeline, PIXLX operates in **Checkpoint Mode** — same deduction-based scoring, same audit categories, structured output format.

**What PIXLX receives:**
- Screenshot from Playwright (specific viewport)
- Checkpoint metadata (page name, URL, viewport, focus area)
- Feature context (what was built/changed)

**What PIXLX returns:**

```
PIXLX CHECKPOINT: [Checkpoint Name] ([viewport])
  Starting score: 100
  Deductions:
    - [Check ID] [description]: -X ([severity])
    - [Check ID] [description]: -X ([severity])
  SCORE: XX/100
  CRITICAL: [none | list of critical issues]
```

**CRITICAL flag rules:**
- Any Critical-severity deduction (-10) -> CRITICAL
- Score drops below 70/100 -> CRITICAL (Needs Work)
- Contact form broken (CE-01/CE-03) -> always CRITICAL
- Horizontal scroll on mobile (RM-01) -> CRITICAL
- Colour system broken (CX-01) -> CRITICAL

**Non-CRITICAL issues** logged with check ID, severity, and fix recommendation.

---

**Framework Status:** Lost Monster-Customized
**Last Updated:** February 2026
**Version:** 2.1 (Lost Monster Edition — INSPX Checkpoint Mode)
