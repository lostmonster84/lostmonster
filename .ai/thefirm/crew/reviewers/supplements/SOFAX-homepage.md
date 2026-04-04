# SOFAX Supplement: Homepage

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Homepage design quality review -- scoring visual craft, spacing, typography, colour usage, visual hierarchy, consistency, and the overall "does this feel premium?" assessment.

**This supplement is universal.** It must NEVER reference a specific project, brand, colour, or client. It teaches the craft -- the patterns that make this job type work regardless of who it's for. The project's design guide handles brand identity. This handles quality.

---

## Related Supplements

These supplements were created from the same research. They MUST stay in sync -- when one is updated, all must be updated in the same session.

| Worker | File | Department |
|--------|------|------------|
| DEMX | `supplements/DEMX-homepage.md` | builders |
| AIDAX | `supplements/AIDAX-homepage.md` | reviewers |
| SOFAX | `supplements/SOFAX-homepage.md` | reviewers |
| WORDX | `supplements/WORDX-homepage.md` | builders |
| CODAX | `supplements/CODAX-homepage.md` | planners |

---

## Studied Examples

| # | Name / URL | Why It's Here | Key Takeaway | Date Accessed |
|---|-----------|---------------|--------------|---------------|
| 1 | Vercel (vercel.com) | Spacing and whitespace mastery | 96-128px vertical section padding creates breathing room. Dark/light theme execution is seamless | 2026-04-03 |
| 2 | Stripe (stripe.com) | Typographic hierarchy at scale | 13 sections maintain consistent type scale. System fonts keep it fast. Gradient accents are subtle, never overwhelming | 2026-04-03 |
| 3 | Notion (notion.com) | Clean, warm design language | Light theme with warm neutrals. Illustrations and product shots coexist without clashing. Typography is restrained -- 2 weights max | 2026-04-03 |
| 4 | Raycast (raycast.com) | Dark theme with personality | 3D animated hero adds character without sacrificing load time. Consistent card treatments throughout | 2026-04-03 |
| 5 | Superhuman (superhuman.com) | Premium minimalism | 8 sections only. Every section earns its space. No filler. Product screenshots are the visual hero, not illustrations | 2026-04-03 |
| 6 | Framer (framer.com) | Design-forward brand expression | Bold typography, generous whitespace, confident colour choices. The homepage IS the portfolio | 2026-04-03 |
| 7 | Loom (loom.com) | Logo bar treatment | 25+ logos, all desaturated/monochrome. Single visual weight. The logos support trust without creating visual noise | 2026-04-03 |
| 8 | Webflow (webflow.com) | Complex page, consistent system | 20 sections maintaining visual consistency through repeated card treatments, consistent spacing, and a tight colour palette | 2026-04-03 |
| 9 | Railway (railway.com) | Developer-tool dark theme | Deep navy/black with vibrant accents. Terminal-inspired elements. Monospace for code. The theme IS the brand | 2026-04-03 |
| 10 | Arc (arc.net) | SVG personality | Squiggle dividers and hand-drawn SVG elements create personality within a minimal layout. Proves personality doesn't need complexity | 2026-04-03 |
| 11 | PlanetScale (planetscale.com) | Technical visual language | ASCII diagrams and code blocks as visual elements. Design that speaks the audience's language | 2026-04-03 |
| 12 | Clerk (clerk.com) | Component previews as design | Showing real UI components in marketing context. The design bridge between marketing and product | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Design Quality Constants (Validated Across 6 Projects)

| # | Pattern | How to Score It |
|---|---------|----------------|
| 1 | **Warm canvas, never pure white** | Page background: #F9F7F3 to #FAFAF8 range. Pure #FFFFFF as page bg = deduction. White is for cards only |
| 2 | **No pure black anywhere** | Darkest value: #0A0E27 to #1A1940. Pure #000000 = immediate deduction. Check footer, text, dark sections |
| 3 | **Generous section padding (80-128px desktop)** | Measure py values. Under 80px desktop = cramped. Inconsistent across sections = deduction |
| 4 | **Card radius 12-20px (rounded-xl to rounded-2xl)** | Consistent across all cards. Mismatched radii = deduction. Exception: if project design guide specifies 0px |
| 5 | **Two-font strategy** | Display font (headings) differs from body font. Same font everywhere = deduction unless design guide explicitly calls for it (Evidis/Geist exception) |
| 6 | **Semantic colour naming** | Colours should be named semantically (ink, sand, midnight) not generically (gray-200). Check tailwind config |
| 7 | **Layered shadows, not flat** | Owner uses 2-3 layer shadows (oklch or rgba). Default `shadow-md` feels flat. Custom layered shadows = full marks |
| 8 | **Eyebrow labels above sections** | text-xs uppercase tracking-wide in accent colour. Present on section headings = full marks. Missing = deduction |
| 9 | **Ken Burns on hero visual** | Subtle zoom animation on hero image/visual. Present = full marks. Static hero = missed opportunity |
| 10 | **Noise texture on dark sections** | SVG turbulence at ~0.03 opacity. SaaS mode only. Present on dark backgrounds = premium signal |

### Mode-Specific Design Quality

**Mode 1 (Hospitality):** Warm, photographic, restrained. Score for: photography quality, gradient overlays on hero, warm neutral palette, card-on-canvas clarity, testimonial carousel polish.

**Mode 2 (SaaS):** Dark, gradient-driven, mockup-forward. Score for: mesh gradient blob quality (low opacity, heavy blur, not garish), noise texture subtlety, glassmorphism consistency (backdrop-blur + white/10), dark/light section alternation rhythm.

---

## Patterns (What the Best All Do)

### Pattern 1: Generous Vertical Spacing (96-128px Sections)
**What:** Premium homepages use significantly more vertical padding between sections than most developers default to. This breathing room signals quality and confidence.
**Applicability:** Universal
**Evidence:** Vercel (#1: 96-128px padding), Stripe (#2: ~100px), Framer (#6: generous whitespace), Superhuman (#5: minimalism requires space)
**How to score:** Measure vertical padding between sections. 80-128px desktop = full marks. 40-60px = deduction (feels cramped). Inconsistent padding across sections = deduction. Mobile should be 40-64px (proportionally reduced, not identical).

### Pattern 2: Restrained Typography (2-3 Weights, 1 Family)
**What:** Premium homepages use a single font family with 2-3 weights maximum. Headlines: bold/semibold. Body: regular. Optional: medium for subheadlines. No more.
**Applicability:** Universal
**Evidence:** Vercel (#1: Geist, 2-3 weights), Stripe (#2: system fonts), Notion (#3: 2 weights), Railway (#9: monospace accent + system), PlanetScale (#11: 2 families, one for code)
**How to score:** Count distinct font families and weights. 1 family, 2-3 weights = full marks. 4+ weights = deduction. 2+ decorative families = significant deduction. Exception: monospace for code snippets is acceptable as a second family for developer tools.

### Pattern 3: 3-Size Type Scale Per Section
**What:** Each section uses at most 3 text sizes: section headline, supporting text, and detail/caption. This creates clear hierarchy without visual noise.
**Applicability:** Universal
**Evidence:** Observed across all 16 studied sites. Sections with 4+ text sizes feel chaotic. Superhuman (#5) and Arc (#10) are particularly disciplined.
**How to score:** Audit each section for distinct text sizes. 3 or fewer = full marks. 4 = warning. 5+ = significant deduction. Consistent sizing across equivalent sections (all section headlines same size) = bonus.

### Pattern 4: Dark Theme Done Right (Developer Tools)
**What:** Developer-facing homepages consistently use dark backgrounds -- but never pure black. The range is #0a0a0a to #1a1a1a. Accent colours are vibrant against dark. Code elements use monospace.
**Applicability:** Developer tools, technical products
**Evidence:** Vercel (#1), Raycast (#4), Railway (#9), PlanetScale (#11), Clerk (#12) -- all dark theme. None use pure #000000.
**How to score:** For developer tools: dark theme = expected. Pure black (#000) = deduction (harsh, causes halation). Dark gray (#0a-#1a) = correct. Accent contrast against dark must be 4.5:1+. Light mode for broader audiences (Notion, Loom, Pitch) = equally valid.

### Pattern 5: Logo Bar Visual Discipline
**What:** Customer logos in the trust bar must be uniform in visual weight -- same height, desaturated/monochrome, SVG format. They support trust without creating visual noise.
**Applicability:** Universal
**Evidence:** Loom (#7: 25+ logos, all monochrome), Vercel (#1: desaturated), Descript (#9: 16 logos, consistent treatment), Clerk (#12: monochrome carousel)
**How to score:** All SVG = full marks. Mixed raster/SVG = deduction. Inconsistent heights = deduction. Full-colour logos = deduction (creates visual chaos). Desaturated or single-colour treatment = full marks.

### Pattern 6: Card Treatments Are Consistent
**What:** When a homepage uses cards (feature cards, testimonial cards, use case cards), every card follows the same treatment: same border-radius, same shadow, same padding, same hover behavior.
**Applicability:** Universal
**Evidence:** Webflow (#8: 20 sections with consistent cards), Clerk (#12: uniform card borders), Raycast (#4: consistent card grid), Superhuman (#5: minimal but consistent)
**How to score:** Measure border-radius, padding, shadow across all cards on the page. All identical = full marks. Inconsistent = deduction per deviation. Exception: intentionally different card types (feature card vs testimonial card) can differ if both types are internally consistent.

### Pattern 7: Whitespace as Premium Signal
**What:** The ratio of content to whitespace signals quality. Premium brands use more whitespace. Dense layouts feel cheap. This applies to hero, between sections, within cards, and around CTAs.
**Applicability:** Universal
**Evidence:** Vercel (#1), Framer (#6), Superhuman (#5), Arc (#10) -- all use whitespace aggressively. Webflow (#8) and Loom (#7) occasionally feel dense in their feature sections.
**How to score:** Subjective but measurable: content should occupy less than 60% of each section's vertical space. CTAs should have 32px+ breathing room above and below. Hero should not feel "packed."

### Pattern 8: Animation Restraint
**What:** The best homepages use animation sparingly -- scroll-triggered fade/slide for section entrances, subtle hover states on cards. Heavy animation is reserved for a single hero moment at most.
**Applicability:** Universal
**Evidence:** Raycast (#4: 3D hero but restrained everywhere else), Framer (#6: subtle hover interactions), Vercel (#1: runway animation is the one big moment). Contrast with sites that animate everything -- it becomes noise.
**How to score:** Animation that enhances understanding = good. Animation that delays content = bad. Hero can have one "moment." Section entrances: fade/slide only. Hover: translate-y + shadow. Auto-playing anything must respect `prefers-reduced-motion`.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Inconsistent section spacing (40px, 80px, 120px, 60px on same page) | Creates visual rhythm problems. The eye can't settle into a pattern. Feels unfinished | Pages where "just adding sections" without systematic spacing |
| 2 | Full-colour logo bars | Customer logos in brand colours create a visual circus. The logos compete with each other and with the page's colour palette | Logo bars with red/blue/green/orange logos at full saturation |
| 3 | 4+ font weights | Every additional weight dilutes hierarchy. When everything is emphasized, nothing is | Pages using thin, light, regular, medium, semibold, and bold on the same page |
| 4 | Pure black (#000000) backgrounds | Causes halation (text glows) on OLED screens. Feels harsh. Every studied dark-theme site uses near-black, never pure black | Dark themes with #000000 background and #FFFFFF text |
| 5 | Animation everywhere | When every section fades, slides, scales, and rotates, animation becomes noise. The eye has no resting point. Also tanks performance | Pages where scrolling triggers 15+ distinct animation sequences |
| 6 | Inconsistent card treatments (different radii, shadows, padding) | Signals a lack of design system. Cards should look like they belong to the same family | Feature cards with 8px radius next to testimonial cards with 16px radius and different shadow |

---

## Benchmarks

| Metric | Target | Source |
|--------|--------|--------|
| Section vertical padding (desktop) | 80-128px | Vercel 96-128px, Stripe ~100px |
| Section vertical padding (mobile) | 40-64px | Proportional reduction |
| Content max-width | 1280-1440px | Most sites cap at 1440px |
| Font families | 1 (+ optional monospace for dev tools) | All 16 studied sites |
| Font weights | 2-3 maximum | Regular + Bold + optional Medium |
| Text sizes per section | 3 maximum | Headline, body, caption |
| Hero headline size (desktop) | 48-72px | Observed range across sites |
| Hero headline size (mobile) | 28-36px | Proportional reduction |
| Card border-radius | Consistent across all cards | One value for the entire page |
| CTA breathing room | 32px+ above and below | Measured from CTA edge to nearest content |
| Logo bar logo height | Uniform (20-32px typical) | All logos same visual weight |
| Animation duration | 200-400ms for transitions | Shorter = snappier, premium feel |
| Hover lift | 2-4px translate-y | -translate-y-1 to -translate-y-2 |

### Scoring Anchors

| Score Range | What It Means |
|-------------|--------------|
| 90-100 | Consistent spacing, restrained typography, disciplined animation, uniform card treatments, premium whitespace, logo bar treated correctly, dark/light theme executed flawlessly |
| 80-89 | Good spacing and typography. Minor inconsistencies in card treatments or animation. Logo bar mostly correct |
| 70-79 | Spacing inconsistencies OR typography overload (4+ weights) OR inconsistent card treatments. Fixable issues |
| 60-69 | Multiple visual system failures: inconsistent spacing + logo treatment + card inconsistencies. Needs systematic review |
| Below 60 | No visual system. Random spacing, random card treatments, animation chaos. Needs design system before review |

---

## Mobile Patterns

| Element | Desktop | Mobile (390px) |
|---------|---------|----------------|
| Section padding | 80-128px | 40-64px |
| Headline size | 48-72px | 28-36px |
| Body text | 16-18px | 16px minimum (never smaller) |
| Card grid | 2-3 columns | 1 column, full width |
| Logo bar | Single row | 2 rows or horizontal scroll |
| Content padding | 24-32px gutters | 16-20px gutters |
| Hero visual | Full-width or contained | Cropped or below text content |

**Key rule:** Mobile isn't "desktop shrunk down." It's a different layout with different proportions. Section padding, text sizes, and grid layouts all need explicit mobile values.

---

## Accessibility Patterns

### Visual Design a11y
- Colour contrast: 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+ regular)
- Test contrast at lightest point of gradient backgrounds
- Focus indicators: visible with 3:1 contrast against adjacent colours
- Never rely on colour alone to convey information (add icons, text, or patterns)
- `prefers-reduced-motion`: all animations must respect this. Serve static content to users who disable motion
- `prefers-contrast`: high-contrast mode should not break the layout

### Typography a11y
- Body text minimum 16px (never 14px or smaller for body copy)
- Line height: 1.5 minimum for body text, 1.2-1.3 for headlines
- Paragraph max-width: 75 characters (for readability)
- Never justify text (creates uneven word spacing)

---

## Performance Patterns

Design-relevant performance:
- SVG logos over raster (smaller, sharper, dark-mode-adaptable)
- CSS animations over JS animations (GPU-accelerated, no main thread blocking)
- `will-change` used sparingly (only on elements that actually animate)
- Font subsetting: only load characters used (Latin subset for English sites)
- Hero visual: WebP/AVIF, under 200KB, with explicit width/height to prevent CLS

---

## Planning Implications

See CODAX supplement for full planning guidance. Key points for SOFAX review:
- Design system (spacing, typography, card treatments) should be defined before build, not discovered during review
- Logo bar assets must be SVG, desaturated, and uniform height before build starts
- Animation should be specced (which elements, which triggers, which properties) before build
- Dark mode/light mode is a design decision, not a development afterthought

---

## Checklist

Before shipping, verify. Every item must be binary-testable.

- [ ] Section padding consistent (80-128px desktop, 40-64px mobile) -- **Verify:** measure in dev tools across all sections
- [ ] Single font family (+ optional monospace) -- **Verify:** check computed styles, count font-family values
- [ ] 2-3 font weights maximum -- **Verify:** grep for font-weight values in CSS
- [ ] 3 or fewer text sizes per section -- **Verify:** audit each section for distinct sizes
- [ ] Logo bar: all SVG, desaturated, uniform height -- **Verify:** check file format, visual treatment, measured heights
- [ ] Card treatments consistent (radius, shadow, padding) -- **Verify:** measure across all card instances
- [ ] Animation uses only transform/opacity -- **Verify:** grep for animation/transition properties
- [ ] `prefers-reduced-motion` media query present -- **Verify:** grep for the query
- [ ] Body text minimum 16px -- **Verify:** check computed font-size on body elements
- [ ] Content max-width capped at 1440px -- **Verify:** check container max-width
- [ ] {MANUAL CHECK REQUIRED} -- Whitespace feels generous, not cramped
- [ ] {MANUAL CHECK REQUIRED} -- Visual hierarchy clear (eye follows headline > subhead > body > CTA)
- [ ] {MANUAL CHECK REQUIRED} -- Dark theme uses near-black (#0a-#1a), never pure #000 (if dark theme)

---

## Evolution

| Date | What Changed | Why | Scope | Project | Occurrences |
|------|-------------|-----|-------|---------|-------------|
| 2026-04-03 | Created | SCOUTX research mission: homepage supplement set | universal | -- | 1 |
| 2026-04-04 | Added Owner's Validated Patterns | Cross-project analysis of 6 shipped projects. Dual-mode framework, validated constants | universal | -- | 1 |

---

**Source research:** SCOUTX Mode 5 (Supplement Research)
**Status:** provisional
**Confidence:** High
**Review by:** 2026-10-03
**Consuming worker:** SOFAX
**Worker type:** reviewer
