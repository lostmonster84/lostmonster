# CODAX Supplement: Landing Pages

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Planning and scoping for single-purpose landing pages: waitlist signups, product launches, feature announcements, campaign pages, event registrations. What to plan for, what to scope, what dependencies to surface, and what to estimate -- before any building starts.

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
| 1 | Vercel Ship 26 (`vercel.com/ship`) | Simplest landing page -- scope baseline | 3 sections, 1 form, ~200 words. This is the minimum viable landing page. Scope: half-day including form integration | 2026-04-03 |
| 2 | Notion AI (`notion.com/product/ai`) | Complex feature page -- scope ceiling | 18-20 sections, animated GIFs, tabbed interfaces, FAQ accordion, pricing tiers. Scope: multi-day build | 2026-04-03 |
| 3 | Better Stack (`betterstack.com`) | Mid-complexity with data | 14 sections, interactive carousel, pricing comparison, testimonials. Requires real data for every section | 2026-04-03 |
| 4 | Cal.com (`cal.com`) | Dual-path signup | SSO integration + email signup. 11 sections, testimonials, feature cards. OAuth dependency adds scope | 2026-04-03 |
| 5 | Clerk (`clerk.com`) | Interactive demos | Tabbed component previews, framework showcase, integration grid. Interactive elements are the scope risk | 2026-04-03 |
| 6 | Neon (`neon.com`) | Video + animation | Video background, animated visualizations, interactive query demo. Media production is a parallel workstream | 2026-04-03 |
| 7 | Supabase (`supabase.com`) | Content-heavy | 7 product cards, framework grid, case studies, tweet wall. Content gathering is the bottleneck, not building | 2026-04-03 |
| 8 | Raycast (`raycast.com`) | Download-focused | 3D hero, extension grid, 24+ testimonials. Download integration + platform detection as dependencies | 2026-04-03 |
| 9 | Stripe Payments (`stripe.com/payments`) | Interactive product demo | Animated checkout forms as hero visual. The demo IS the product. Building the demo is 60% of the scope | 2026-04-03 |
| 10 | Arc (`arc.net`) | Minimal scope | Few sections, gradient design, direct download. Low complexity but high design craft required | 2026-04-03 |
| 11 | Superhuman (`superhuman.com`) | Product suite page | Suite cards linking to sub-products. Clean scope but requires multi-product coordination | 2026-04-03 |
| 12 | Amie (via Swipe Pages) | Numeric-focused | Entire page serves one specific metric ("47 seconds"). Copy-driven, not feature-driven | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Planning Constants (Validated Across 6 Projects)

| # | Pattern | Planning Implication |
|---|---------|---------------------|
| 1 | **Mode identification first** | Hospitality landing (booking, event) vs SaaS landing (waitlist, signup). Determines hero, palette, section rhythm |
| 2 | **Ken Burns animation** | Always present on hero. CSS keyframes dependency. Not optional |
| 3 | **Warm canvas** | Custom Tailwind tokens for background (#F9F7F3 to #FAFAF8), not default gray |
| 4 | **Framer Motion** | Package dependency. Budget for scroll-triggered entrances on every section |
| 5 | **Friction reducer copy** | CTA copy + friction reducer are a paired dependency. Write both before build |
| 6 | **Form field minimalism** | Waitlist: email only. Signup: name + email max. Every additional field needs justification |
| 7 | **Compliance/trust badges** | SaaS: plan for AES-256, GDPR, SOC2 badge assets. Hospitality: plan for review scores, years operating |
| 8 | **Dark section assets** | If SaaS mode: plan for noise texture SVG, mesh gradient CSS, glassmorphism tokens |

---

## Patterns (What the Best All Do)

### Pattern 1: Copy Before Layout
**What:** Landing page copy must be written and approved before layout begins. The story drives the section structure, not the other way around. Building layout with placeholder copy leads to layouts that don't fit the actual content.
**Applicability:** Universal
**Evidence:** All 12 studied examples have section structures that follow a narrative arc. #2 Notion's 18 sections follow: problem > solution > features > proof > action. This structure only works because the story was planned first.
**How to plan:** WORDX delivers copy first. DEMX builds layout around copy. If copy isn't ready, DEMX cannot start. This is a hard dependency, not a soft one.

### Pattern 2: Content Dependency Mapping
**What:** Landing pages require real content that often doesn't exist yet: testimonials, logos, metrics, screenshots, video. Each is a dependency that can block the build. Map every content dependency before starting.
**Applicability:** Universal
**Evidence:** #7 Supabase needs: logo permissions, case studies, tweet embeds, framework logos. #3 Better Stack needs: competitor pricing data, developer testimonials, product screenshots. #6 Neon needs: video production, compliance badge artwork.
**How to plan:** Create a content dependency matrix before build starts:

| Content Type | Example | Source | Blocking? |
|-------------|---------|--------|-----------|
| Company logos | 6-12 for trust bar | Client provides or public assets | Yes -- can't ship "Logo 1, Logo 2" |
| Testimonials | 3-6 named quotes | Client collects or provides | Yes -- anonymous quotes fail review |
| Product screenshots | Hero + feature sections | Taken from real product | Yes -- mockups only if product doesn't exist |
| Metrics/numbers | "67% ROI", "150K daily" | Client provides, must be truthful | Yes -- fabricated metrics are fraud |
| Video/animation | Hero background or demo | Produced or recorded | Partial -- can ship with poster image |
| Compliance badges | SOC 2, GDPR, etc. | Client confirms compliance status | No -- only include if verified |

### Pattern 3: Page Type Scoping (Not One-Size-Fits-All)
**What:** Landing pages range from 3 sections (Vercel Ship) to 20 sections (Notion AI). Scope must match page type. Under-scoping a feature launch or over-scoping a waitlist both waste time.
**Applicability:** Universal
**Evidence:** #1 Vercel Ship (3 sections, ~200 words), #10 Arc (5-6 sections), #3 Better Stack (14 sections), #2 Notion AI (18-20 sections)
**How to plan:**

| Page Type | Sections | Word Count | Effort Estimate |
|-----------|----------|------------|-----------------|
| Waitlist / coming soon | 3-4 (hero + form + social) | 200-400 | Half day |
| Event registration | 3-5 (hero + form + speakers/agenda) | 300-600 | Half day to 1 day |
| Product signup | 5-8 (hero + social proof + features + testimonials + CTA) | 800-1,200 | 1-2 days |
| Feature launch | 8-12 (hero + social + features deep dive + demos + testimonials + FAQ + CTA) | 1,200-2,100 | 2-3 days |
| Competitor comparison | 6-10 (hero + comparison + features + testimonials + pricing + CTA) | 1,000-1,800 | 1.5-2.5 days |

Effort assumes: copy is ready, content assets are available, design system exists. Add 50-100% if any of these are missing.

### Pattern 4: Form Integration as First-Class Dependency
**What:** The form is the conversion mechanism. It requires backend integration: email service (Resend, SendGrid), CRM (HubSpot, Salesforce), database, or waitlist tool. This integration must be confirmed before build, not discovered during build.
**Applicability:** Universal
**Evidence:** #1 Vercel Ship (email + country + location -> notification system), #4 Cal.com (Google OAuth + email signup), #16 Factors AI (2-field form -> CRM). Every landing page has a form or auth integration.
**How to plan:** Before build starts, confirm: (1) Where does form data go? (email service, database, CRM), (2) What validation is needed? (email format, required fields), (3) What happens after submission? (confirmation message, redirect, email), (4) Is there an existing API/endpoint or does one need to be built? Flag this dependency in the plan. If undecided, it blocks.

### Pattern 5: Mobile-First Build Order
**What:** 83% of landing page traffic is mobile. Desktop converts 8% higher, but mobile is where the volume is. Building desktop-first and then "making it responsive" produces inferior mobile experiences.
**Applicability:** Universal
**Evidence:** Research data: 82.9% mobile traffic, 53% abandon at 3s+ load on mobile, desktop-to-mobile conversion gap of 40-51%. #1 Vercel Ship and #10 Arc work perfectly on mobile because they're simple. Complex pages like #2 Notion and #3 Better Stack require deliberate mobile planning.
**How to plan:** Plan the mobile layout first. Verify hero + CTA fits within 844px viewport height. Plan touch targets (48px min). Plan which sections collapse, stack, or change on mobile. Include mobile screenshot verification in the definition of done.

### Pattern 6: Performance Budget in the Plan
**What:** Performance targets (LCP < 2.5s, page weight < 500KB) must be part of the plan, not an afterthought. Design choices made during planning (video hero, custom fonts, animation library) directly determine whether targets are achievable.
**Applicability:** Universal
**Evidence:** Research: each second of load delay costs 7% conversion. #6 Neon uses video hero -- this requires a poster image fallback and deferred video load (planned upfront). #10 Raycast uses 3D WebGL hero -- this requires code splitting (planned upfront).
**How to plan:**

| Decision | Performance Impact | Plan For |
|----------|-------------------|----------|
| Hero video | +2-5MB initial, LCP risk | Poster image, deferred load, `preload="metadata"` |
| Custom fonts | +100-200KB, render blocking | Subset, WOFF2, 2 weights max, `font-display: swap` |
| Animation library (Framer/GSAP) | +30-100KB JS, INP risk | Code split, load after LCP, respect `prefers-reduced-motion` |
| 3D/WebGL | +200KB+ JS, GPU intensive | Code split, SSR hero text, hydrate 3D after load |
| Image carousel | CLS risk, lazy load complexity | Fixed aspect ratio containers, eager load first image |
| Third-party scripts (analytics, chat) | +100-500KB, INP risk | Defer all until after LCP, lazy load chat widget |

### Pattern 7: Testing Infrastructure
**What:** Landing pages should be testable. Plan for: A/B testing capability (different headlines, CTAs), analytics integration (conversion tracking), and real-device testing (not just browser dev tools).
**Applicability:** Universal (scale based on traffic volume)
**Evidence:** Research: only 17% of companies test actively despite 37% potential gains. Companies testing 10+ variations see 86% better results. 40+ landing pages = 500% more conversions than single-page.
**How to plan:** Minimum: (1) Analytics tracking on CTA clicks and form submissions, (2) UTM parameter handling for traffic source attribution, (3) At least one testable element (headline or CTA text) that can be changed without a code deploy. For high-traffic pages: plan for A/B testing infrastructure (Vercel Edge Config, LaunchDarkly, or custom).

### Pattern 8: Review Gate Definition
**What:** Landing pages must pass three separate reviews before shipping: conversion (AIDAX), design quality (SOFAX), and copy (WORDX). Each reviewer has a supplement-driven checklist. The plan must include review time and define what "done" means.
**Applicability:** Universal
**Evidence:** Every high-quality studied example (#2 Notion, #4 Stripe, #6 Clerk) shows evidence of multi-discipline quality -- the layout serves conversion, the design is polished, and the copy is sharp. This doesn't happen by accident.
**How to plan:** Build plan includes three review gates:
1. **Copy review (WORDX)** -- before design starts (copy drives layout)
2. **Design review (SOFAX)** -- after build, before content integration
3. **Conversion review (AIDAX)** -- after content integration, before ship

Each review adds 1-2 hours. Plan for revision time after each review (30min-2hr depending on findings). Definition of done: all three review checklists pass with zero blocking items.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Starting layout before copy | Layout without copy creates sections that don't fit real content. Leads to awkward text wrapping, orphaned headlines, or copy that's been squeezed to fit | Building a 3-column feature grid before knowing there are 4 features |
| 2 | Scoping without page type classification | A "landing page" could be 3 sections or 20 sections. Without classifying the type first, estimates are meaningless | Estimating "1 day" for both a waitlist page and a feature launch page |
| 3 | Treating content as "client will provide later" | Missing content blocks the build. Logo bar with "TBD", testimonials with "Lorem ipsum", metrics with "XX%" cannot be reviewed or shipped | Delivering a "complete" page with 6 placeholder sections |
| 4 | Desktop-only planning | Planning for 1440px and treating mobile as "make it responsive" produces pages that lose 40-51% of conversions on the 83% of traffic that's mobile | Plan that describes desktop layout in detail but says "responsive" for mobile |
| 5 | No performance budget | Adding a video hero, 4 custom font weights, a Lottie animation, and analytics without a performance budget guarantees LCP > 4s | Build that includes hero video + custom fonts + animation library + three third-party scripts |
| 6 | Single review gate | One "looks good" review misses conversion issues, copy issues, or design issues. Three separate reviews catch what one misses | Plan that has "QA review" as a single step |

---

## Benchmarks

### Planning Benchmarks
| Metric | Value | Notes |
|--------|-------|-------|
| Minimum viable landing page | 3 sections, 1 form, 200 words | Vercel Ship pattern |
| Standard product landing page | 5-8 sections, 800-1,200 words | Most common scope |
| Complex feature launch | 12-20 sections, 1,500-2,100 words | Notion AI pattern |
| Content dependencies (typical) | 4-8 items (logos, quotes, metrics, screenshots) | Each must be resolved before build |
| Form integration | 1-4 hours depending on backend | Email-only = 1hr, CRM integration = 4hr |
| Copy writing time | 2-8 hours depending on page type | Waitlist = 2hr, feature launch = 8hr |
| Build time (with copy ready) | 4-16 hours depending on complexity | Waitlist = 4hr, feature launch = 16hr |
| Review time (3 gates) | 3-6 hours total | 1-2hr per review gate |
| Revision time (after reviews) | 2-6 hours | Depends on findings |

### Total Effort Estimates (End-to-End)
| Page Type | Copy | Build | Review + Revision | Total |
|-----------|------|-------|-------------------|-------|
| Waitlist / coming soon | 2hr | 4hr | 3hr | 9hr (~1 day) |
| Event registration | 3hr | 6hr | 4hr | 13hr (~1.5 days) |
| Product signup | 4hr | 8hr | 5hr | 17hr (~2 days) |
| Feature launch | 6hr | 12hr | 6hr | 24hr (~3 days) |
| Competitor comparison | 5hr | 10hr | 5hr | 20hr (~2.5 days) |

Add 50-100% buffer if: design system doesn't exist, content assets are unavailable, form backend needs building, or animations are complex.

---

## Mobile Patterns

### Mobile Planning Considerations
- Plan mobile layout FIRST, then expand to desktop. Not the reverse
- Hero must contain headline + CTA within 844px viewport height on mobile (iPhone 14/15 viewport)
- Touch targets: 48x48px minimum with 8px spacing -- plan for this in button sizing and form field layout
- Navigation: plan for removal or radical simplification (0-2 links max on mobile landing pages)
- Images: plan for different aspect ratios or crops on mobile vs desktop
- Sticky CTA: plan for a persistent bottom bar on mobile (requires z-index management and footer spacing)
- Form: plan for single-column layout, context-appropriate keyboards (`inputmode` attributes)

### Mobile Testing Requirements
- Real device testing (not just browser dev tools) for touch targets and scroll behavior
- Test on actual 390px viewport (iPhone 14/15 size)
- Test CTA visibility without scrolling
- Test form submission flow end-to-end on mobile
- Test page load time on throttled 4G connection

---

## Accessibility Patterns

### Planning-Level A11y Requirements
- Plan for visible form labels (not placeholder-only) -- this affects layout sizing
- Plan for error state design: inline errors, summary at top, focus management. These are layout components, not afterthoughts
- Plan for focus indicator styling that meets 3:1 contrast -- this affects color palette selection
- Plan for `prefers-reduced-motion` support -- every animation needs a fallback state
- Plan for semantic HTML structure: one `<h1>`, sequential `<h2>`s, `<main>` landmark
- Plan for skip navigation link if nav is present
- Plan for alt text on all meaningful images (this is content -- it needs to be written, not auto-generated)

### A11y Impact on Scope
- Accessible forms add ~30min to form build time (ARIA attributes, focus management, error states)
- `prefers-reduced-motion` support adds ~15min per animated section
- Proper heading structure adds ~15min to verify and correct
- Color contrast verification adds ~30min to review process
- Total a11y overhead: ~2-3 hours on a standard landing page. Not optional.

---

## Performance Patterns

### Performance Planning Checklist
Before the build starts, confirm these decisions:

| Decision | Option A (Lighter) | Option B (Heavier) | Impact |
|----------|-------------------|-------------------|--------|
| Hero visual | Static image (AVIF, <100KB) | Video or animation | 100KB vs 2-5MB |
| Fonts | System font stack | Custom web font | 0KB vs 50-200KB |
| Animation | CSS only | JS library (Framer/GSAP) | 0KB vs 30-100KB |
| Social proof images | SVG logos | Raster headshots | 5KB vs 50-200KB |
| Analytics | Lightweight (Plausible, ~1KB) | Heavy (GA4, 30KB+) | 1KB vs 30KB+ |
| Chat widget | None | Intercom/Drift | 0KB vs 200-500KB |

Target total initial page weight: under 500KB. If Option B choices push past this, something needs to move to Option A or be deferred.

### SSR/SSG Decision
Landing pages should be statically generated (SSG) or server-rendered (SSR) -- not client-side rendered (CSR). The hero content (headline, CTA, background) MUST be in the initial HTML response. Client-side rendered heroes have LCP > 3s on average because they require JS to parse, execute, and render before any content appears.

---

## Planning Implications

This IS the planning supplement, so the implications are the patterns above. Summary of critical planning rules:

1. **Classify the page type first.** Waitlist, event, signup, feature launch, or comparison. This determines section count, word count, and effort estimate.
2. **Map content dependencies before starting.** Every placeholder is a blocker.
3. **Copy before layout.** WORDX delivers, then DEMX builds. Hard dependency.
4. **Form integration is a first-class dependency.** Confirm backend before build.
5. **Plan mobile-first.** 83% of traffic. The mobile layout determines the structure.
6. **Set performance budget upfront.** Hero visual, fonts, animations, third-party scripts -- budget before choosing.
7. **Plan three review gates.** Copy review, design review, conversion review. Each with revision time.
8. **SSG by default.** Static generation for landing pages. No client-side rendering of above-fold content.

---

## Checklist

Before starting the build, verify:

- [ ] Page type classified (waitlist/event/signup/feature/comparison) -- **Verify:** type named in plan document
- [ ] Section list defined with names and order -- **Verify:** numbered list of sections in plan
- [ ] Content dependency matrix created -- **Verify:** table of logos, quotes, metrics, screenshots with source and status
- [ ] Form backend confirmed (where data goes, what fields, what happens after) -- **Verify:** backend endpoint named, validation rules listed
- [ ] Copy delivery scheduled before layout start -- **Verify:** WORDX delivery date in plan, DEMX start date is after
- [ ] Mobile layout planned (hero + CTA within 844px, touch targets, sticky CTA) -- **Verify:** mobile wireframe or description in plan
- [ ] Performance budget set (hero visual choice, font choice, animation choice) -- **Verify:** budget table with KB estimates
- [ ] Three review gates scheduled (copy, design, conversion) -- **Verify:** three review steps in plan with assigned reviewers
- [ ] Effort estimate matches page type benchmark -- **Verify:** estimate within range for the classified page type (see benchmarks)
- [ ] SSG/SSR confirmed for above-fold content -- **Verify:** rendering strategy named in plan
- [ ] {MANUAL CHECK REQUIRED} -- Does the content dependency matrix have real sources (not "TBD") for blocking items?
- [ ] {MANUAL CHECK REQUIRED} -- Has the client/stakeholder confirmed the single conversion goal?

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
**Consuming worker:** CODAX
**Worker type:** planner
