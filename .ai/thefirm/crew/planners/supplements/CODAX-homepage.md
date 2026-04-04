# CODAX Supplement: Homepage

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Homepage planning -- scoping, section structure, dependencies, breakpoints, and timeline estimation for homepage builds. What a planner needs before DEMX starts building.

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
| 1 | Vercel (vercel.com) | 11 sections, tab architecture | Tab-based use case sections are a reusable component. Plan for keyboard navigation and mobile fallback | 2026-04-03 |
| 2 | Stripe (stripe.com) | 13 sections, maximum complexity | Persona segmentation adds 30-50% to build time. Each persona tab is effectively a mini-page | 2026-04-03 |
| 3 | Notion (notion.com) | Content-driven homepage | Productivity calculator is a custom interactive component -- scope it separately from standard sections | 2026-04-03 |
| 4 | Superhuman (superhuman.com) | 8 sections, lean execution | Proof that fewer sections done well beats many sections done adequately. Interactive demo is the centrepiece | 2026-04-03 |
| 5 | Webflow (webflow.com) | 20 sections, content-heavy | The longest homepage studied. Diminishing returns after section 12-15. Content fatigue is real | 2026-04-03 |
| 6 | Loom (loom.com) | 15 sections, progressive disclosure | Well-structured long page: overview > features > use cases > deep-dives. The order matters as much as the content | 2026-04-03 |
| 7 | Arc (arc.net) | 6 sections, minimal | Proves the minimum viable homepage: hero + trust + features + CTA. Everything else is optional | 2026-04-03 |
| 8 | Raycast (raycast.com) | 13 sections, extension showcase | Tabbed extension grid is a data-driven component -- needs a content model (name, icon, category, URL) | 2026-04-03 |
| 9 | Railway (railway.com) | Developer-focused, real-time elements | Live deploy counter is a real-time API call -- plan for the API dependency and fallback | 2026-04-03 |
| 10 | Clerk (clerk.com) | 12 sections, component previews | Product UI components embedded in marketing page need a separate build pipeline from the marketing components | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Planning Constants (Validated Across 6 Projects)

| # | Pattern | Planning Implication |
|---|---------|---------------------|
| 1 | **Two build modes** | Step 0: identify if this is hospitality/experience (warm, photographic) or SaaS/product (dark, mockup-driven). This decision affects hero treatment, colour palette, section rhythm, and animation budget |
| 2 | **Ken Burns is always present** | Budget for hero animation: CSS keyframes, 6-25s duration, scale(1) to scale(1.08). Works on photos (Mode 1) and product visuals (Mode 2). Not optional |
| 3 | **Warm canvas is standard** | Background colour: #F9F7F3 to #FAFAF8 range. Plan for custom Tailwind colour tokens, not default gray scale |
| 4 | **Framer Motion scroll entrances** | Dependency: framer-motion package. Plan for whileInView on every section. naturalEase easing. 0.1s child stagger. Budget 0.5 days for animation pass |
| 5 | **Dark/light section alternation** | For SaaS pages (8+ sections): plan alternating dark/light backgrounds. Dependencies: noise texture SVG, mesh gradient blobs (CSS), glassmorphism tokens |
| 6 | **Two-font strategy** | Plan for 2 Google Font imports: 1 display (Outfit, Montserrat, Space Grotesk) + 1 body (Inter, Plus Jakarta Sans, Karla). Budget for next/font setup |
| 7 | **Social proof is a dependency** | Start collecting on day 1: logo SVGs (desaturated), testimonials (named + metric), compliance badges. These block launch |
| 8 | **Eyebrow + heading + body per section** | Every section has 3 text layers: eyebrow label (accent), heading (display font), body (body font). Plan content for all 3 per section |

---

## Patterns (What the Best All Do)

### Pattern 1: Standard Section Sequence
**What:** Every high-performing homepage follows a proven section order. Deviations should be intentional, not accidental.
**Applicability:** Universal
**Evidence:** Consistent across all 16 studied sites: Vercel (#1), Stripe (#2), Notion (#3), Clerk (#10), Railway (#9), Cal.com
**How to apply:** Default section order:
1. Navigation (5-7 items + dual CTA)
2. Hero (headline + subhead + dual CTA + visual) -- 80-100vh
3. Social proof bar (6-12 logos)
4. Product overview (3-4 tabs or cards)
5. Feature deep-dives (2-4 alternating sections)
6. Testimonials / case studies (3-6 quotes with metrics)
7. Secondary features or integrations (optional)
8. Closing CTA (fresh headline, same CTAs as hero)
9. Footer

Plan sections in this order. Add persona segmentation after step 4 for multi-audience products. Add integration grids at step 7 for platform products.

### Pattern 2: Hero Is 30% of Build Effort
**What:** The hero section (headline, subheadline, CTAs, visual/animation, social proof bar) takes disproportionate effort because it establishes the design system for the entire page. Get it approved before building anything else.
**Applicability:** Universal
**Evidence:** Every studied site has a polished hero that sets the visual tone. Superhuman (#4: interactive demo hero), Raycast (#8: 3D hero), Vercel (#1: animated runway hero) -- these are custom, high-effort components.
**How to apply:** Scope hero as a standalone deliverable. Include: layout, responsive behaviour, animation (if any), CTA interactivity, social proof bar. Get James's approval on the hero before proceeding to remaining sections. Hero changes cascade through the entire page.

### Pattern 3: Content Blocks the Build
**What:** Headlines, subheadlines, CTA copy, testimonials, logo assets, and social proof data must exist before development starts. Placeholder content leads to layout breakage when real content arrives.
**Applicability:** Universal
**Evidence:** Stripe (#2: 4 specific metrics needed), Retool (#10: case study dollar figures), Loom (#6: 25+ logos needed). Content is always the critical path.
**How to apply:** Content checklist before build starts:
- [ ] Hero headline + subheadline (final)
- [ ] All CTA text (final)
- [ ] Section headlines (at least draft)
- [ ] Logo assets (SVG, desaturated, permissions cleared)
- [ ] Testimonials (named, with metrics, approved)
- [ ] Case study metrics (verified numbers)
- [ ] Feature descriptions (at least bullet-point drafts)

WORDX delivers copy before DEMX starts building. Social proof collection starts on day 1 -- it's always the last thing received.

### Pattern 4: Section Count Drives Scope
**What:** The number of sections is the primary scope driver. Each section is a distinct design/development unit with its own responsive layout, content, and animations.
**Applicability:** Universal
**Evidence:** Arc (#7: 6 sections -- minimal), Superhuman (#4: 8 sections -- lean), Vercel (#1: 11 sections -- standard), Stripe (#2: 13 sections -- complex), Webflow (#5: 20 sections -- enterprise)
**How to apply:** Scope estimation:
| Section count | Complexity | Build estimate |
|---------------|-----------|---------------|
| 6-8 | Minimal / consumer | 1-2 days |
| 8-12 | Standard SaaS | 2-4 days |
| 12-15 | Complex / multi-persona | 4-6 days |
| 15-20 | Enterprise / platform | 6-10 days |

Add 1-2 days for animation. Add 1 day for interactive demos or calculators. These are build estimates, not including copy writing, design review, or testing.

### Pattern 5: Animation Must Be Specced
**What:** "Add some animations" is not a spec. Animation scope must define: which sections, what triggers (scroll/load/hover), what properties animate, and whether they respect `prefers-reduced-motion`.
**Applicability:** Any homepage with animation
**Evidence:** Raycast (#8: 3D hero is a dedicated build), Vercel (#1: runway animation is custom), Framer (#6: hover interactions are specified). Animation without spec leads to scope creep.
**How to apply:** Before build, document:
- Which sections animate (list by name)
- What triggers each animation (on-load, on-scroll-into-view, on-hover)
- What CSS properties animate (transform, opacity only for performance)
- Whether `prefers-reduced-motion` is required (always yes)
- Any third-party libraries needed (Framer Motion, GSAP, Lottie)

### Pattern 6: Mobile Is a Parallel Track
**What:** With 60%+ traffic on mobile, the mobile layout should be designed alongside desktop, not retrofitted. Mobile often requires different section structures, not just narrower versions.
**Applicability:** Universal
**Evidence:** All 16 sites have distinct mobile layouts. Tab interfaces become scrollers (#1 Vercel, #8 Webflow). Logo bars reflow (#7 Loom). Sticky CTAs appear (#10 Cal.com). None are "just the desktop version on a smaller screen."
**How to apply:** Plan responsive breakpoints from the start:
- 390px (iPhone 14/15 -- primary mobile target)
- 768px (iPad portrait)
- 1024px (iPad landscape / small laptop)
- 1280px (standard laptop)
- 1440px (design target -- content max-width)

Each section needs explicit mobile behaviour: tab > accordion, grid > stack, side-by-side > stacked, etc.

### Pattern 7: Performance Is a Gate, Not a Nice-to-Have
**What:** LCP > 2.5s, CLS > 0.1, or INP > 200ms should block deployment. These are measurable thresholds, not opinions.
**Applicability:** Universal
**Evidence:** Google Core Web Vitals are ranking signals. Each second over 2s load time costs ~7% conversion. Heavy hero animations (#8 Raycast, #1 Vercel) are carefully optimized to stay within budget.
**How to apply:** Lighthouse audit is a gate in the build pipeline. Targets:
- LCP: under 2.5s (aim for 1.5s)
- INP: under 200ms
- CLS: under 0.1
- Total page weight: under 2MB
Run Lighthouse before every merge. Automate if possible.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Starting build before copy is final | Layout breaks when real content replaces placeholders. Headlines that change length force layout rework. CTA changes cascade | Building with "Lorem ipsum" and then discovering the real headline is 3x longer |
| 2 | "Add animations later" | Animation scope creep. What starts as "subtle fades" becomes "can we make it like Stripe's?" halfway through. Spec upfront | Animations added as an afterthought push delivery by 2-3 days |
| 3 | Treating mobile as an afterthought | Tab components, card grids, and side-by-side layouts all need mobile-specific designs. Retrofitting takes longer than parallel design | Desktop-first build that discovers tabs don't work at 390px during QA |
| 4 | Scoping by feature count, not section count | "We need 5 features" doesn't determine scope. A 3-feature homepage could be 6 sections or 15 sections depending on depth | Feature list that doesn't translate to a section plan |
| 5 | Skipping social proof collection | Logos need permissions. Testimonials need approval. Metrics need verification. Starting late = shipping with placeholders or blocking the launch | Week-before-launch scramble for logo SVGs and testimonial approvals |

---

## Benchmarks

| Planning Metric | Target | Source |
|----------------|--------|--------|
| Sections (minimal) | 6-8 | Arc (6), Superhuman (8) |
| Sections (standard) | 8-12 | Vercel (11), Stripe (13), Clerk (12) |
| Sections (complex) | 12-20 | Loom (15), Webflow (20) |
| Hero approval | Before building remaining sections | All studied sites -- hero sets the tone |
| Content completion | Before build starts | Copy, logos, testimonials, metrics |
| Breakpoints to plan for | 5 (390, 768, 1024, 1280, 1440px) | Current device landscape |
| Navigation items | 5-7 top-level + 2 CTAs in nav | All 16 studied sites |
| Performance gate | LCP <2.5s, INP <200ms, CLS <0.1 | Google "Good" thresholds |

---

## Mobile Patterns

Planning-specific mobile considerations:
- Tab component needs mobile alternative (horizontal scroll or accordion)
- Logo bar needs mobile layout (2 rows or scroll)
- Feature grids need single-column mobile layout
- Sticky mobile CTA bar is a separate component to plan
- Touch targets: 44x44px minimum throughout
- Section padding reduces from 80-128px to 40-64px

---

## Accessibility Patterns

Planning-specific a11y:
- Heading hierarchy must be planned (h1 hero, h2 sections, h3 subsections)
- Skip navigation link needed
- Tab components need keyboard navigation (arrow keys + Tab)
- All interactive elements need focus states
- `prefers-reduced-motion` support must be planned for every animation

---

## Performance Patterns

Planning-specific performance:
- Hero visual format/size must be decided before build (WebP/AVIF, under 200KB)
- Font loading strategy must be decided (system fonts vs web fonts, preload strategy)
- Image strategy for all sections (lazy-load below fold, eager above)
- Animation library choice affects bundle size (Framer Motion ~30KB, GSAP ~45KB, CSS only = 0KB)
- Third-party scripts (analytics, chat, etc.) must be deferred

---

## Planning Implications

This entire supplement is planning guidance. Key cross-references for other workers:
- DEMX builders: see the section count estimates in Pattern 4 for build timeline
- WORDX copy: content must be finalized before DEMX starts (Pattern 3)
- SOFAX review: design system (spacing, typography, card treatments) should be defined before build, not discovered during review

---

## Checklist

Before build starts, verify. Every item must be binary-testable.

- [ ] Section plan documented (names, order, content type per section) -- **Verify:** section plan exists as a list
- [ ] Hero headline + subheadline finalized -- **Verify:** approved copy exists
- [ ] All CTA text finalized -- **Verify:** approved CTA copy exists
- [ ] Logo assets collected (SVG, desaturated, permissions) -- **Verify:** logo files exist in assets
- [ ] Testimonials collected (named, with metrics, approved) -- **Verify:** testimonial content exists
- [ ] Responsive breakpoints defined (390, 768, 1024, 1280, 1440px) -- **Verify:** breakpoint plan exists
- [ ] Animation spec documented (sections, triggers, properties) -- **Verify:** animation spec exists
- [ ] Performance budget agreed (LCP <2.5s, page weight <2MB) -- **Verify:** documented as a gate
- [ ] Mobile behaviour per section documented -- **Verify:** each section has mobile variant noted
- [ ] {MANUAL CHECK REQUIRED} -- Scope matches section count estimate (not over-scoped)
- [ ] {MANUAL CHECK REQUIRED} -- Content dependencies identified and collection started

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
**Consuming worker:** CODAX
**Worker type:** planner
