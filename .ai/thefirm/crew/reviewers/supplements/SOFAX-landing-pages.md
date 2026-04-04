# SOFAX Supplement: Landing Pages

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Design quality review for single-purpose landing pages: waitlist signups, product launches, feature announcements, campaign pages, event registrations. Evaluating visual hierarchy, spacing, typography, layout quality, and design polish -- not conversion (that's AIDAX) or copy (that's WORDX).

**This supplement is universal.** It must NEVER reference a specific project, brand, colour, or client. It teaches the craft -- the patterns that make this job type work regardless of who it's for. The project's design guide handles brand identity. This handles quality.

---

## Related Supplements

| Worker | File | Department |
|--------|------|------------|
| DEMX | `supplements/DEMX-landing-pages.md` | builders |
| AIDAX | `supplements/AIDAX-landing-pages.md` | reviewers |
| SOFAX | `supplements/SOFAX-landing-pages.md` | reviewers |
| WORDX | `supplements/WORDX-landing-pages.md` | builders |
| CODAX | `supplements/CODAX-landing-pages.md` | planners |

---

## Studied Examples

| # | Name / URL | Why It's Here | Key Takeaway | Date Accessed |
|---|-----------|---------------|--------------|---------------|
| 1 | Vercel Ship 26 (`vercel.com/ship`) | Event page -- design restraint | Radical simplicity: hero + form + decorative element + footer. Proves that less IS more when design quality is high | 2026-04-03 |
| 2 | Notion AI (`notion.com/product/ai`) | Feature page -- visual hierarchy at scale | 18-20 sections that never feel overwhelming because of consistent spacing rhythm, clear hierarchy, and animated transitions between sections | 2026-04-03 |
| 3 | Better Stack (`betterstack.com`) | Dark theme excellence | Dark UI with interactive carousel, clear typography hierarchy, and neon accents. Product sections use consistent card pattern | 2026-04-03 |
| 4 | Stripe Payments (`stripe.com/payments`) | Interactive visual design | Payment form mockups as design elements. Gradient theming differentiates 4 product groups. Animation enhances comprehension | 2026-04-03 |
| 5 | Cal.com (`cal.com`) | Clean dual-path layout | SOC 2/HIPAA/GDPR compliance banner integrated elegantly at top. 3-step "how it works" section with visual clarity | 2026-04-03 |
| 6 | Clerk (`clerk.com`) | Component showcase design | Tabbed interface showing real UI components. Circuit/geometric background pattern adds depth without distraction | 2026-04-03 |
| 7 | Neon (`neon.com`) | Video-first hero design | Autoplay video background with fallback. Tab-based feature sections. Animated autoscaling visualizations | 2026-04-03 |
| 8 | Supabase (`supabase.com`) | Content-heavy but organized | 7 product cards, framework grid, customer stories, tweet wall -- all feel cohesive through consistent card patterns and spacing | 2026-04-03 |
| 9 | Superhuman (`superhuman.com`) | Aspirational design | Product mockup with AI assistant in hero. Minimal sections, maximum visual impact. Suite cards as modular grid | 2026-04-03 |
| 10 | Raycast (`raycast.com`) | 3D and glassmorphism done right | Interactive 3D cube in hero, glass morphism effects with chromatic aberration. Extension grid categorized cleanly | 2026-04-03 |
| 11 | Arc (`arc.net`) | Personality-driven design | Gradient-heavy (blue/purple), wavy SVG dividers, noise textures. Playful without sacrificing clarity | 2026-04-03 |
| 12 | Linear (`linear.app`) | Minimal animation excellence | Grid dot animations with staggered timing, up/down motion effects. Multiple text styling tiers. Dark, refined, precise | 2026-04-03 |
| 13 | Amie (via Swipe Pages) | Specific numeric hero | Visual design serves the "47 seconds" claim -- everything subordinate to that number | 2026-04-03 |
| 14 | Factors AI (via Swipe Pages) | Ultra-minimal form design | 2-field form with compliance logos. Clean, uncluttered, maximum whitespace around conversion point | 2026-04-03 |
| 15 | Freshdesk (via Swipe Pages) | Pricing table design | Exact pricing in table format with clear interface screenshots. Functional design over decorative | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Design Quality Constants (Validated Across 6 Projects)

| # | Pattern | How to Score It |
|---|---------|----------------|
| 1 | **Warm canvas** | Light sections: #F9F7F3 to #FAFAF8. Never pure #FFFFFF as background |
| 2 | **No pure black** | Darkest: #0A0E27 to #1A1940. Never #000000 |
| 3 | **Generous padding** | py-20 to py-32 desktop. Under 80px = cramped |
| 4 | **Rounded cards (12-20px)** | Consistent radius across all cards |
| 5 | **Ken Burns on hero** | Subtle zoom animation present = full marks |
| 6 | **Scroll-triggered entrances** | naturalEase, 0.1s child stagger. Not linear, not bounce |
| 7 | **Dark sections: noise + mesh gradients** | SVG turbulence 0.03 + gradient blobs (low opacity). SaaS landing pages |
| 8 | **Hover lift on cards** | -translate-y-1 + shadow increase. 200-300ms transition |
| 9 | **Eyebrow labels** | text-xs uppercase tracking-wide accent colour above section headings |
| 10 | **Layered shadows** | 2-3 shadow layers, not flat single-value shadows |

---

## Patterns (What the Best All Do)

### Pattern 1: Vertical Rhythm Consistency
**What:** Spacing between sections follows a consistent rhythm -- typically a base unit (24-32px) with multipliers (2x, 3x, 4x) for section breaks. The eye should never feel "jammed" or "lost" between sections.
**Applicability:** Universal
**Evidence:** #2 Notion AI (consistent section padding despite 18+ sections), #8 Supabase (7 product cards + multiple sections feel cohesive), #12 Linear (precise spacing control)
**How to review:** Measure vertical padding between 3+ consecutive sections. If the values are inconsistent (e.g., 60px, 40px, 100px, 48px), flag as broken rhythm. Expected: consistent base (80-120px desktop, 40-60px mobile) with intentional variation only for emphasis.

### Pattern 2: Visual Hierarchy Through Scale, Not Decoration
**What:** Importance is communicated through size, weight, and contrast -- not through borders, shadows, or decorative elements. The hero headline should be the largest text on the page. Section headings should be visually distinct from body copy through scale alone.
**Applicability:** Universal
**Evidence:** #9 Superhuman (headline dominates, minimal decoration), #12 Linear (hierarchy through font weight and size tiers), #1 Vercel Ship (one large headline, one form, nothing else)
**How to review:** Identify the 3 most important elements on the page (headline, CTA, key value prop). Are they the 3 most visually prominent elements? If a decorative element, illustration, or secondary heading draws more attention than the primary CTA, the hierarchy is broken.

### Pattern 3: Hero Visual Integration (Not Floating Screenshot)
**What:** The hero visual (product screenshot, animation, video) is integrated into the page design -- it flows from or into the background, has consistent border radius with other elements, and uses the page's color palette. It's not a rectangular screenshot dropped onto a flat background.
**Applicability:** Universal
**Evidence:** #4 Stripe (payment forms blend into gradient background), #10 Raycast (3D cube with matching chromatic effects), #7 Neon (video background fills hero), #6 Clerk (component previews in styled containers matching circuit background)
**How to review:** Does the hero visual feel "of the page" or "on the page"? Check: does it share border radius with other elements? Does it use the page's color palette or feel like a separate world? Is there a transition (gradient, fade, mask) between the visual and background?

### Pattern 4: Typographic Hierarchy (3-4 Levels Max)
**What:** Landing pages use a strict type scale: display/hero (48-72px desktop), section heading (28-36px), body (16-18px), and caption/meta (12-14px). More than 4 levels creates visual noise.
**Applicability:** Universal
**Evidence:** #12 Linear (multiple text styling tiers, precisely controlled), #9 Superhuman (display > heading > body, clean hierarchy), #2 Notion AI (consistent heading scale across 18 sections)
**How to review:** Count distinct font size levels used on the page. If more than 5 (excluding navigation), flag as over-fragmented. Check that hero headline is 48-72px desktop / 28-36px mobile. Body text should be 16-18px (never below 16px on mobile).

### Pattern 5: CTA Button Design Distinction
**What:** The primary CTA button is visually distinct from everything else on the page. It should be the most saturated, highest-contrast interactive element. Secondary CTAs use ghost/outline treatment.
**Applicability:** Universal
**Evidence:** #3 Better Stack (neon accent CTA on dark), #5 Cal.com ("Get started" filled vs "Sign in" text), #2 Notion AI ("Try for free" filled vs "Request a demo" outline)
**How to review:** Is the primary CTA the single most visually prominent interactive element? Check contrast ratio against background (4.5:1 minimum). Is there clear visual distinction between primary (filled) and secondary (ghost/outline/text) CTAs? If they look similar, flag.

### Pattern 6: Dark Theme Execution (When Applicable)
**What:** Developer-facing landing pages use dark themes that feel premium, not muddy. Key: never pure black (#000), use near-black (#0a0a0a to #1a1a1a). Accent colors must be vibrant. Code blocks and terminal elements use monospace. Sufficient contrast on all text.
**Applicability:** Developer tools, technical products
**Evidence:** #3 Better Stack (Helvetica Now on dark, neon accents), #12 Linear (dark with grid dot animations), #7 Neon (dark with video + vibrant accents), #10 Raycast (dark with glassmorphism)
**How to review:** If dark theme: check background is not pure #000 (should be #0a-#1a range). Check text contrast (4.5:1 body, 3:1 large text). Check that accents are vibrant enough to read as interactive. Check code blocks use monospace. Check images/logos are adapted for dark background (no white rectangles around logos).

### Pattern 7: Animation with Purpose
**What:** Motion serves comprehension or delight, never decoration. Acceptable: product demos, scroll-triggered reveals, hover feedback, loading states. Unacceptable: spinning logos, floating particles with no meaning, entrance animations that delay content visibility.
**Applicability:** Universal
**Evidence:** #12 Linear (grid dot stagger = ambient texture), #4 Stripe (animated checkout = demonstrates product), #10 Raycast (3D cube = represents product metaphor), #2 Notion AI (GIFs showing agents working = product proof)
**How to review:** For each animation, ask: "What does this help the user understand?" If the answer is "nothing -- it just looks cool", flag it. Check that no animation delays content visibility (LCP concern). Verify animations respect `prefers-reduced-motion` media query.

### Pattern 8: Whitespace as Design Element
**What:** The space around elements is as intentional as the elements themselves. High-converting landing pages use generous whitespace around CTAs, form fields, and testimonials to create focus and reduce cognitive load.
**Applicability:** Universal
**Evidence:** #14 Factors AI (maximum whitespace around 2-field form), #1 Vercel Ship (hero + form + massive whitespace), #9 Superhuman (few sections, generous padding)
**How to review:** Check padding around CTA buttons (minimum 16px on all sides from nearest element). Check form fields have breathing room (not crammed together). Check testimonial cards have consistent internal padding. If elements feel crowded, the whitespace budget is insufficient.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Inconsistent border radius | Mixing sharp corners, slightly rounded, and pill shapes on the same page creates visual dissonance. Pick one radius system and apply everywhere | Cards with 8px radius, buttons with 24px radius, images with 0px radius on the same page |
| 2 | Floating screenshots on flat backgrounds | Product screenshots dropped onto a solid color without integration (shadow, gradient transition, matching border) look like PowerPoint slides, not design | Rectangular browser-chrome screenshot centered on a white section with no visual integration |
| 3 | Over-decoration of hero | Particles, gradient meshes, floating shapes, AND animated text simultaneously. Each competes for attention. Best heroes use 1-2 visual techniques, not 5 | Hero with animated gradient background + floating 3D shapes + particle system + typewriter text effect |
| 4 | Inconsistent section width | Some sections full-bleed, others max-width 1200px, others max-width 800px, with no pattern. Content width should follow a grid system | Alternating between 100% width, 1200px, 1000px, 800px containers with no visual logic |
| 5 | Logo bar on wrong background | Company logos designed for white backgrounds placed on dark sections (or vice versa) without color inversion. Creates jarring white rectangles or invisible logos | Color company logos on dark background appearing as bright rectangles; or dark logos invisible on dark background |
| 6 | Typography soup | Using 4+ different font families, or more than 5 size levels, or mixing serif/sans-serif without intention. Creates visual noise | Heading in serif, subheading in sans-serif, body in a third font, CTA in a fourth, captions in yet another |

---

## Benchmarks

| Metric | Target | Notes |
|--------|--------|-------|
| Hero headline font size (desktop) | 48-72px | #9 Superhuman, #12 Linear, #2 Notion in this range |
| Hero headline font size (mobile) | 28-36px | Must be readable without zooming at 390px |
| Body text size | 16-18px | Never below 16px on mobile (WCAG readability) |
| Section vertical padding (desktop) | 80-120px | Consistent across sections |
| Section vertical padding (mobile) | 40-60px | ~50% of desktop padding |
| CTA button padding | 12-16px vertical, 24-32px horizontal | Must feel "clickable", not cramped |
| CTA button contrast ratio | 4.5:1 minimum vs background | WCAG AA compliance |
| Border radius consistency | 1 system (e.g., 8px cards, 8px buttons, 8px inputs) | Allow 2 max: one for containers, one for small elements |
| Max content width | 1200-1440px for feature content, 600-800px for text-heavy | Text line length should not exceed 75 characters |
| Text line length | 55-75 characters per line | Beyond 75 chars, reading comprehension drops |
| Font families | 2 maximum (1 heading, 1 body) | Monospace as third only for code blocks |
| Font weights used | 3-4 total across entire page | Regular (400), Medium (500), Semi-bold (600), Bold (700) |
| Logo bar logo count | 6-12 | Fewer than 6 looks thin, more than 12 gets busy |
| Color palette | 1 primary, 1 accent, 2-3 neutrals | Plus semantic colors (error red, success green) |

---

## Mobile Patterns

### Mobile Design Quality Checks
- Hero headline must not exceed 3 lines at 390px -- if it wraps to 4+, the headline is too long for mobile
- CTA buttons should be full-width or near-full-width on mobile (not small centered buttons)
- Touch target minimum: 48x48px with 8px spacing between targets
- Logo bar: switch to 2-row grid or horizontal scroll -- never shrink logos below recognizable size
- Testimonial cards: single column, swipeable. Never side-by-side on mobile
- Section headings: centered alignment often works better than left-aligned on narrow viewports
- Images: aspect ratio may need to change (landscape on desktop, square or portrait on mobile). Never letterbox

### Mobile Typography Adjustments
| Element | Desktop | Mobile (390px) |
|---------|---------|----------------|
| Hero headline | 48-72px | 28-36px |
| Section heading | 28-36px | 22-28px |
| Body text | 16-18px | 16px minimum (never reduce below 16) |
| Caption/meta | 12-14px | 12px minimum |
| Line height | 1.4-1.6 | 1.5-1.7 (slightly more generous on mobile) |

---

## Accessibility Patterns

### Design-Specific A11y (Not Form Handling -- That's AIDAX)
- Color contrast: 4.5:1 for body text, 3:1 for large text (24px+ or 18.66px+ bold), 3:1 for UI components (buttons, inputs, focus rings)
- Color alone must not convey meaning: error states need icon + text, not just red border. Status badges need text, not just color
- Focus indicators: visible 2px outline with 3:1 contrast ratio against adjacent colors. Custom focus styles must be MORE visible than browser defaults, not less
- Animation: all decorative motion respects `@media (prefers-reduced-motion: reduce)`. Functional animation (carousel, accordion) can remain but should be simplified
- Touch targets: minimum 48x48px for all interactive elements, 8px minimum spacing between adjacent targets
- Text alternatives: every meaningful image has descriptive alt text. Decorative images use `alt=""` or `aria-hidden="true"`
- Text over images/video: ensure 4.5:1 contrast via overlay, text shadow, or background behind text. Dynamic backgrounds (video) need a semi-opaque overlay

---

## Performance Patterns

### Design Decisions That Impact Performance
| Decision | Impact | Better Alternative |
|----------|--------|-------------------|
| Custom web fonts (4+ weights) | 200KB+ font payload, render blocking | 2 weights max, subset to Latin, `font-display: swap` |
| Hero background video | 2-5MB, blocks LCP | Poster image + deferred video load. Or CSS gradient with deferred animation |
| High-res product screenshots | 500KB+ per image | WebP/AVIF, responsive `srcset`, max 100KB per hero image |
| Lottie animations above fold | Delays LCP, blocks INP | CSS animation for simple motion. Defer Lottie until after LCP |
| Particle/canvas backgrounds | Continuous GPU usage, battery drain | CSS gradient or static SVG pattern. Reserve canvas for product demos only |
| Glassmorphism (backdrop-filter) | GPU-intensive, janky on low-end mobile | Use sparingly, never on more than 2 elements visible simultaneously |

### Design Asset Budget
| Asset | Budget | Format |
|-------|--------|--------|
| Hero image/visual | Under 100KB | AVIF primary, WebP fallback |
| Logo bar (all logos combined) | Under 30KB | SVG sprites, single file |
| Fonts (total) | Under 50KB | WOFF2, subsetted |
| Icons (total) | Under 15KB | SVG inline or sprite |
| Decorative assets (total) | Under 50KB | CSS where possible, SVG fallback |

---

## Planning Implications

See CODAX supplement for full planning guidance. Key points for SOFAX review:

- Design review should happen at BOTH desktop and mobile viewports -- not just one
- Design review is separate from conversion review (AIDAX). SOFAX focuses on: visual hierarchy, spacing rhythm, typography, color, animation quality, polish
- Check the design guide conflict hierarchy: project design guide overrides supplement patterns for brand-specific decisions (colors, typography, border radius)
- Dark theme is a design system decision, not a supplement mandate -- but if the audience is developers, expect dark theme and review accordingly
- Animation quality matters more than animation quantity. One well-executed product demo beats five decorative flourishes

---

## Checklist

Before passing, verify:

- [ ] Vertical spacing rhythm consistent across all sections -- **Verify:** measure padding on 5+ consecutive sections, check for consistent base unit
- [ ] Typography hierarchy: 3-4 levels max, hero headline 48-72px desktop / 28-36px mobile -- **Verify:** inspect font sizes, count distinct levels
- [ ] CTA button is most visually prominent interactive element -- **Verify:** compare CTA visual weight (size, contrast, saturation) to all other buttons/links
- [ ] Primary vs secondary CTA visually distinct -- **Verify:** primary filled, secondary ghost/outline/text
- [ ] Hero visual integrated into page design (not floating screenshot) -- **Verify:** visual shares border radius, color palette, and transitions with page
- [ ] Border radius consistent across page -- **Verify:** inspect 5+ elements (cards, buttons, inputs, images), check for consistent system
- [ ] Body text 16px minimum on mobile -- **Verify:** inspect at 390px viewport
- [ ] Color contrast passes WCAG AA -- **Verify:** check hero headline, body text, CTA button text, form labels (4.5:1 body, 3:1 large)
- [ ] Animations respect `prefers-reduced-motion` -- **Verify:** enable reduced motion in OS settings, verify no decorative animation plays
- [ ] Logo bar adapted for page background -- **Verify:** logos visible and clean on actual background (no white rectangles on dark, no invisible logos)
- [ ] Text line length under 75 characters -- **Verify:** count characters in a typical body text line at max width
- [ ] {MANUAL CHECK REQUIRED} -- Overall visual quality: does this feel premium or template-grade?
- [ ] {MANUAL CHECK REQUIRED} -- Animation serves comprehension, not decoration

---

## Evolution

| Date | What Changed | Why | Scope | Project | Occurrences |
|------|-------------|-----|-------|---------|-------------|
| 2026-04-03 | Created | SCOUTX research mission: landing-pages supplement set | universal | -- | 1 |
| 2026-04-04 | Added Owner's Validated Patterns | Cross-project analysis of 6 shipped projects. Dual-mode framework, validated constants | universal | -- | 1 |

---

**Source research:** SCOUTX Mode 5 (Supplement Research)
**Status:** provisional
**Confidence:** High
**Review by:** 2026-10-03
**Consuming worker:** SOFAX
**Worker type:** reviewer
