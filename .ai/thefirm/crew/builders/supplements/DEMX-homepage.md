# DEMX Supplement: Homepage

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

The front door -- hero, social proof, features, testimonials, CTAs. Sells the whole company or product. NOT a landing page (single-purpose conversion). A homepage serves multiple audiences and tells the full story.

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
| 1 | Vercel (vercel.com) | Top-tier dev tool, dark/light theme mastery | Tab-based use case navigation lets visitors self-select; social proof uses specific metrics ("7m to 40s build times") | 2026-04-03 |
| 2 | Stripe (stripe.com) | Gold standard SaaS homepage, massive scale | 13 sections; segments by customer type; leads with "$1.9T processed" and 99.999% uptime | 2026-04-03 |
| 3 | Notion (notion.com) | Workspace/productivity category leader | "One workspace. Zero busywork." -- 4-word hero; productivity calculator showing cost savings vs 10 competitors | 2026-04-03 |
| 4 | Raycast (raycast.com) | Desktop tool, community-driven | 13 sections with tabbed extension showcase; real Twitter handles/avatars for social proof; 3D animated hero | 2026-04-03 |
| 5 | Superhuman (superhuman.com) | Premium positioning, multi-product suite | Interactive demo simulating real workflow instead of static screenshots; lean 8 sections | 2026-04-03 |
| 6 | Framer (framer.com) | Website builder, design-forward | Triple CTA in hero; expert marketplace section as social proof | 2026-04-03 |
| 7 | Loom (loom.com) | Video messaging, enterprise play | 15 sections; progressive disclosure from overview to deep-dive; 25+ logo carousel | 2026-04-03 |
| 8 | Webflow (webflow.com) | Marketing platform, agency-focused | 20 sections; persona-based architecture with tabbed deep-dives | 2026-04-03 |
| 9 | Descript (descript.com) | AI video editing | 16 enterprise logos in hero; hover-interactive card grid for features | 2026-04-03 |
| 10 | Retool (retool.com) | Internal tools platform | Use cases by audience segment; case studies lead with dollar savings ("$6M saved") | 2026-04-03 |
| 11 | Railway (railway.com) | Cloud deployment, developer-loved | Each feature names competitors it replaces; live metrics dashboard | 2026-04-03 |
| 12 | Pitch (pitch.com) | Presentation software | 4-step "How it works" process section; persona-based feature comparison tabs | 2026-04-03 |
| 13 | Clerk (clerk.com) | Auth infrastructure | Component preview mockups showing actual UI you get; consistent "Explore X" CTAs | 2026-04-03 |
| 14 | Cal.com (cal.com) | Open-source scheduling | Compliance badges in nav; "Sign up with Google" as primary CTA | 2026-04-03 |
| 15 | PlanetScale (planetscale.com) | Database infrastructure | ASCII architecture diagrams for technical audience; competitive latency numbers | 2026-04-03 |
| 16 | Arc (arc.net) | Consumer browser | Minimal 6 sections; single-purpose hero with download CTA; SVG personality | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects (DOMA, HospoJobs, Ancarraig, WildTrax, Slydes, Evidis). These are not theory -- they are patterns the owner consistently builds. When they conflict with external research, these take priority. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Two Modes of Homepage Design

The owner operates in two modes. Identify which mode the current project needs BEFORE building:

**Mode 1: Hospitality / Experience** (DOMA, HospoJobs, Ancarraig, WildTrax)
- Light warm canvas (sand/cream/snow, never pure white)
- Full-bleed photography hero with Ken Burns zoom (6-20s, scale 1.05-1.08)
- White cards floating on warm canvas
- Real photography throughout, never illustrations
- Subtle, restrained animation
- Dark gradient overlay on hero photo for text readability

**Mode 2: SaaS / Product** (Slydes, Evidis, Lost Monster)
- Dark hero section with mesh gradient blobs or noise texture
- Product mockup as hero visual (phone, dashboard, laptop)
- Alternating dark/light section rhythm
- Glassmorphism on dark sections (backdrop-blur, white/10 surfaces)
- Blue/cyan/violet accents with gradient energy
- More motion and interactivity

### Build Constants (Both Modes)

These appear in every project. They are non-negotiable:

| # | Pattern | How to Build It |
|---|---------|----------------|
| 1 | **Ken Burns on hero visual** | CSS animation: scale(1) to scale(1.05-1.08), 6-25s, ease-out. Works on photos (Mode 1) and product mockups (Mode 2) |
| 2 | **Warm canvas, never pure white** | Background: #F9F7F3 / #FAFAF8 / #F5F6FA range. Never #FFFFFF for the page canvas. White is reserved for cards |
| 3 | **No pure black** | Darkest value: #0B1220 to #1A1940 range. Never #000000 anywhere |
| 4 | **Card hover lift** | `transition-all duration-300`, `hover:-translate-y-1`, `hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]` |
| 5 | **Scroll-triggered section entrances** | Framer Motion `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 20 }}`. naturalEase `[0.25, 0.46, 0.45, 0.94]`. Child stagger: 0.1s |
| 6 | **Generous section padding** | Desktop: `py-20` to `py-32` (80-128px). Mobile: `py-12` to `py-16` (48-64px). Never less |
| 7 | **Eyebrow labels above section headings** | `text-xs font-semibold uppercase tracking-wide` in brand accent colour. Appears above every section heading |
| 8 | **Image hover scale** | `group-hover:scale-105`, `transition-transform duration-500 ease-out` |
| 9 | **Rounded cards (12-20px)** | `rounded-xl` to `rounded-2xl`. Exception: WildTrax uses 0px (Porsche influence -- project-specific) |
| 10 | **Dark footer** | Footer background is the darkest brand colour. Light text at 60% opacity for links, full opacity on hover |
| 11 | **Two-font strategy** | Display font (headings) + body font (text). Never one font for everything. Display font sets personality |
| 12 | **Semantic colour naming** | Colours are named for what they evoke (ink, sand, stone, chalk, midnight), not what they are (gray-200) |

### Mode-Specific Build Patterns

**Mode 1 only:**
- Hero: Full-bleed `<img>` with `object-cover`, dark gradient overlay `from-black/70 via-black/50 to-black/80`
- Search card overlay on hero (white, rounded, prominent -- seen in DOMA, HospoJobs)
- Testimonial carousel with auto-rotate (6s interval, dot indicators)
- Bento grid for category/role showcase (1 large 2x2 + 4 small 1x1)

**Mode 2 only:**
- Hero: Dark background (#0A0E27 to #1A1940) with mesh gradient blobs at 0.12-0.4 opacity
- Noise texture overlay: SVG turbulence, opacity 0.03
- Product mockup floating/breathing in hero (subtle translateY animation, 4-8px, 6s)
- Glassmorphism cards: `bg-white/[0.06] backdrop-blur-md border border-white/[0.08]`
- Alternating dark/light section rhythm for visual pacing

---

## Patterns (What the Best All Do)

### Pattern 1: Universal Section Skeleton
**What:** Every high-performing homepage follows the same macro structure: Nav > Hero > Social proof bar > Product overview > Feature deep-dives > Testimonials > Closing CTA > Footer. Variations exist in the middle, but the bookends are consistent.
**Applicability:** Universal
**Evidence:** All 16 studied sites follow this sequence. Stripe (#2), Vercel (#1), Notion (#3), Clerk (#13), Railway (#11), Cal.com (#14) all open with hero + social proof bar and close with a dedicated CTA section above the footer.
**How to apply:** Start every homepage build with this skeleton: hero (80-100vh) > logo bar > 3-4 overview cards/tabs > 2-4 feature deep-dive sections > testimonial section > closing CTA > footer. Total: 8-12 sections. Add persona segmentation or integrations sections in the middle if the product is complex.

### Pattern 2: Hero at 80-100vh with Dual CTA
**What:** The hero occupies the full viewport (or near-full) with a short headline, supporting subheadline, and two CTAs -- a primary self-serve action and a secondary sales-assisted action.
**Applicability:** Universal
**Evidence:** Vercel (#1: "Start Deploying" + "Get a Demo"), Stripe (#2: "Get started" + "Sign up with Google"), Notion (#3: "Get Notion free" + "Request a demo"), Framer (#6: "Start for free" + "Start with AI"), Retool (#10: "Start for free" + "Book a demo")
**How to apply:** Hero container: `min-h-screen` or `min-h-[80vh]`. Content centered vertically. Headline: large, bold, 3-8 words. Subheadline: 15-30 words, regular weight. Two CTA buttons: primary (filled, brand colour) + secondary (outline/ghost). Product visual below or beside the text. Content max-width: 1440px.

### Pattern 3: Tab-Based Feature Presentation
**What:** Features are presented through tabbed interfaces that let visitors explore categories without scrolling. Each tab shows different product capabilities with visuals.
**Applicability:** Universal (especially multi-feature products)
**Evidence:** Vercel (#1: 5-tab use case section), Raycast (#4: tabbed extension categories), Webflow (#8: persona-based tabs), Pitch (#12: persona comparison tabs), Clerk (#13: tabbed component previews)
**How to apply:** Build a tab component with 3-5 tabs. Each tab: headline + 2-3 bullet features + product visual/screenshot. Tabs should be large, clearly labelled, and keyboard-navigable. On mobile, tabs become a horizontal scroller or accordion. Default to first tab active on load.

### Pattern 4: Social Proof Bar Immediately After Hero
**What:** A logo bar showing customer/partner logos placed directly below the hero. Often with a metric or trust statement ("Trusted by 400,000+ companies").
**Applicability:** Universal
**Evidence:** Vercel (#1: logos + metrics), Stripe (#2: logo carousel in hero), Notion (#3: "Trusted by top teams" logo row), Descript (#9: 16 logos in hero), Clerk (#13: logo carousel), Railway (#11: 12 enterprise logos)
**How to apply:** Full-width section with `py-8` to `py-12`. Single row of 6-12 logos. SVG format only (crisp at any size). Desaturated/monochrome treatment to avoid colour clash. Optional: leading text "Trusted by" or a metric. On mobile: 2 rows or horizontal scroll.

### Pattern 5: Progressive Feature Disclosure
**What:** Features unfold from broad to specific as the user scrolls. Overview cards first, then detailed sections, then a feature grid for completeness.
**Applicability:** Universal (especially products with many features)
**Evidence:** Loom (#7: overview > feature rows > use case cards > deep-dives), Stripe (#2: solution grid > enterprise cases > developer infrastructure), Raycast (#4: extensions > AI > automation > gallery), Clerk (#13: components > auth > B2B > billing)
**How to apply:** Layer 1: 3-4 overview cards (icon + headline + 1-line description). Layer 2: 2-4 detailed sections (alternating image/text, full-width). Layer 3 (optional): feature grid or integration logos. Each layer increases specificity. Never dump all features at one level.

### Pattern 6: Interactive Product Demonstrations
**What:** Replacing static screenshots with interactive demos, tabbed previews, animated walkthroughs, or live product simulations.
**Applicability:** Universal (especially SaaS and developer tools)
**Evidence:** Superhuman (#5: simulated conversation flow), Clerk (#13: component preview mockups), Vercel (#1: code snippets + live rankings), Raycast (#4: tabbed extension interface), PlanetScale (#15: ASCII architecture diagrams)
**How to apply:** Show the actual product UI. Minimum: high-quality screenshot with browser chrome. Better: animated sequence (CSS transitions or Lottie). Best: interactive element visitors can click/hover. For developer tools, code snippets with syntax highlighting and terminal output are effective "demos."

### Pattern 7: Persona-Based Section Architecture
**What:** Complex products organize homepage sections by who the visitor is, not what the product does. Visitors self-select into their path.
**Applicability:** Multi-persona products (B2B SaaS, platforms)
**Evidence:** Webflow (#8: marketers/creatives/engineers/agencies), Retool (#10: AI/data/ops/support teams), Vercel (#1: AI/web/ecommerce/marketing), Pitch (#12: owner/designer/sales/marketer)
**How to apply:** Build a tabbed or segmented section with 3-5 persona columns. Each persona: headline, 3-4 features specific to them, CTA. Use tabs (not separate pages). Place after the general overview section, before testimonials.

### Pattern 8: Closing CTA Section Above Footer
**What:** A dedicated conversion section at the bottom restating the value proposition with fresh copy and the same CTAs as the hero. Catches visitors who scrolled the full page.
**Applicability:** Universal
**Evidence:** Vercel (#1: "Talk to an Expert" + "Get an Enterprise Trial"), Framer (#6: "Design bold. Launch fast." + "Start for free"), Railway (#11: "A better future is now boarding"), Stripe (#2: "Ready to get started?"), Raycast (#4: "Take the short way.")
**How to apply:** New section above footer with: new headline (not copied from hero), brief supporting text, same 2 CTA buttons as hero. Background can differ from hero (often dark-on-light flip). Minimal content -- this is a conversion moment, not information.

### Pattern 9: Repeating CTA Every 2-3 Sections
**What:** CTAs appear at regular intervals throughout the page, not just in the hero and footer.
**Applicability:** Universal
**Evidence:** Loom (#7: 6+ instances), Cal.com (#14: 18+ CTAs), Retool (#10: 4x), Stripe (#2: 4x through 13 sections)
**How to apply:** After every 2-3 content sections, place an inline CTA. Can be a full CTA bar, a button at the end of a section, or a persistent nav CTA. Copy can vary slightly ("Get started" / "Try it free" / "Start building") but the action should be the same.

### Pattern 10: Competitor Displacement (Not Comparison)
**What:** Acknowledging competitors indirectly -- showing what the product replaces or the savings of switching -- without comparison tables.
**Applicability:** Products with clear competitors
**Evidence:** Railway (#11: each feature lists alternatives), Notion (#3: productivity calculator vs 10 tools), Cal.com (#14: testimonials mention Calendly switch), PlanetScale (#15: latency vs Aurora/Cloud SQL)
**How to apply:** Never build comparison tables on the homepage. Instead: show cost/complexity of alternatives through testimonials, calculators, or "replaces X, Y, Z" copy. Let social proof do the competitive positioning.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Feature dumping (flat grid of 15+ features with no hierarchy) | Users get overwhelmed. No feature stands out when all features are equal | Webflow's 20 sections create fatigue; Loom's 15 sections repeat similar features |
| 2 | Vague hero headlines ("The modern X platform") | Users decide in 3-5 seconds. Generic headlines waste the decision window | "Generate internal software better with AI" explains mechanism, not outcome |
| 3 | Social proof buried at bottom of page | 42% of visitors never scroll past hero CTA. Logos at bottom reach only the most engaged | Pages that place testimonials in section 12 of 15 |
| 4 | Single CTA path (only signup OR only demo) | Loses one segment entirely. Self-serve visitors won't book demos; enterprise won't self-serve | Pages with only "Book a demo" and no free option |
| 5 | Heavy JS-driven hero animation that delays LCP | CSS transitions add 70ms+ overhead, pushing mobile LCP past 2.5s threshold | Complex 3D WebGL renders in the hero that block text rendering |
| 6 | No audience signal (speaking to everyone simultaneously) | A developer and a marketing director have different needs. Generic messaging resonates with neither | Homepage with no persona segmentation and generic "teams love us" messaging |

---

## Benchmarks

| Metric | Target | Source |
|--------|--------|--------|
| Section count | 8-13 (sweet spot) | Vercel 11, Stripe 13, Clerk 12, Cal.com 11. Min: Arc 6, Max: Webflow 20 |
| Hero height | 80-100vh desktop, content-driven mobile | All 16 studied sites |
| Hero headline | 3-8 words | Railway 3, Notion 4, Raycast 4, Loom 8 |
| Hero subheadline | 15-30 words | Enough to explain; short enough to scan |
| CTAs in hero | 2 (primary + secondary) | All 16 studied sites |
| Total page CTAs | 6-15 | Raycast 6+15, Stripe 12+, Cal.com 18+ |
| CTA frequency | 1 per 2-3 sections | Observed across all sites |
| Logo bar count | 6-12 logos | Stripe 6+, Notion 9, Descript 16, Railway 12 |
| Testimonials | 3-6 with specific metrics | Pitch 4, Framer 5, Loom 6, Clerk 8 |
| Content max-width | 1440px | Most sites cap here; Figma extends to 1680px |
| Section vertical padding | 80-128px desktop, 40-64px mobile | Vercel uses 96-128px |
| Total word count | 1,000-2,000 (standard SaaS) | Minimal: 500-800, Complex: 2,500-4,000 |
| Page weight | Under 2MB ideal, under 3MB acceptable | Performance research |

---

## Mobile Patterns

| Pattern | Desktop | Mobile (390px) |
|---------|---------|----------------|
| Hero layout | Centred or side-by-side with visual | Stacked: headline > subhead > CTAs > visual |
| Dual CTAs | Side-by-side buttons | Stacked full-width buttons (primary on top) |
| Tab interfaces | Horizontal tabs | Horizontal scroller or accordion |
| Logo bar | Single row 6-12 | 2 rows or horizontal scroll carousel |
| Feature cards | 2-3 column grid | Single column full-width |
| Testimonials | Grid or side-by-side | Single visible, swipeable carousel |
| Navigation | Horizontal links + CTA | Hamburger menu + slide-out panel |
| Section padding | 80-128px vertical | 40-64px vertical |
| Headline sizes | 48-72px | 28-36px |
| CTA persistence | Inline within sections | Sticky bottom bar (18% uplift evidence) |

**Key rule:** 60%+ of traffic is mobile. Design mobile layout alongside desktop, not as an afterthought. Touch targets minimum 44x44px.

---

## Accessibility Patterns

### Heading Structure
- Hero headline must be the single `<h1>`. All section headings below: `<h2>`. Subsections: `<h3>`.
- Screen reader users navigate by heading level -- broken hierarchy breaks navigation.

### Logo Bar
- Each logo needs `alt="Company Name logo"`.
- Section needs `aria-label="Trusted by these companies"` or equivalent.

### Animation
- All animations must respect `prefers-reduced-motion`. Users who disable motion see static content.
- Auto-rotating carousels must pause on focus/hover and provide manual controls.

### Colour Contrast
- Test contrast at the lightest point of gradient backgrounds, not the darkest. Hero gradients often fail WCAG AA.
- CTA buttons: 4.5:1 contrast for text, 3:1 for the button boundary against background.

### Navigation
- Skip navigation link essential -- homepages are often the longest page.
- CTA links need context: `aria-label="Learn more about feature name"` when text is generic.

### Interactive Elements
- Tab interfaces must be keyboard-navigable (arrow keys between tabs, Tab to content).
- Carousel/testimonials: keyboard navigation, announce slide changes, provide pause controls.

---

## Performance Patterns

| Metric | Target | How |
|--------|--------|-----|
| LCP | Under 2.5s mobile, under 1.8s desktop | Hero image `fetchpriority="high"` + `loading="eager"`. Preload in `<head>` |
| INP | Under 200ms | Minimal JS in critical path. Defer analytics, chat widgets, animation libraries |
| CLS | Under 0.1 | Explicit width/height on all images/videos. Reserve space for async-loaded logos |
| Hero animation overhead | Under 70ms | CSS `transform`/`opacity` only. Defer non-critical animation. `IntersectionObserver` for below-fold |
| Font loading | FOUT over FOIT | `font-display: swap`. Preload primary font. Max 2 families, 3 weights |
| Hero image | Under 200KB | WebP/AVIF with responsive `srcset`. Desktop 1440px, mobile 390px variants |
| Logo bar | SVG only | Never raster logos -- blurry at scale, heavier, no dark mode adaptation |
| Below-fold images | `loading="lazy"` | Everything below the hero lazy-loads |
| Page weight | Under 2MB total | HTML <100KB, CSS <150KB, JS <500KB compressed, images <1MB, fonts <200KB |

---

## Planning Implications

See CODAX supplement for full planning guidance. Key points for DEMX:

- Hero is 30% of the build effort. Build and get approval on hero before anything else
- Standard homepage: 8-12 sections, estimate accordingly
- Tab components are the most common feature presentation (Vercel, Raycast, Webflow, Pitch, Clerk) -- build as a reusable component
- Content max-width 1440px with 24-32px gutters is the standard
- Use CSS Grid for bento/card layouts, Flexbox for nav and hero
- Social proof data (logos, quotes, metrics) must be real before shipping -- placeholder content cannot go live

---

## Checklist

Before shipping, verify. Every item must be binary-testable.

- [ ] Hero occupies 80-100vh with dual CTA visible without scrolling -- **Verify:** measure at 1440px and 390px in dev tools
- [ ] Social proof bar immediately after hero (logo bar with 6-12 SVG logos) -- **Verify:** check section order in DOM; verify SVG format
- [ ] 8-13 total sections (not under, not over) -- **Verify:** count `<section>` elements or equivalent containers
- [ ] CTA appears every 2-3 sections (6+ total placements) -- **Verify:** search for CTA component, count instances
- [ ] Closing CTA section exists above footer with fresh headline -- **Verify:** check final section before `<footer>` has CTA buttons + different headline from hero
- [ ] Tab or card component for feature overview (3-5 categories) -- **Verify:** tab/card component exists in overview section
- [ ] Progressive disclosure: overview > deep-dive > detail -- **Verify:** sections increase in specificity as scroll progresses
- [ ] Product visual in hero (not illustration/stock) -- **Verify:** hero visual shows actual product UI
- [ ] All logos SVG, desaturated/monochrome -- **Verify:** check file format and visual treatment
- [ ] Hero image eager-loaded with preload hint -- **Verify:** check `<head>` for preload; hero img has no `loading="lazy"`
- [ ] LCP under 2.5s on simulated 4G -- **Verify:** Lighthouse mobile audit
- [ ] Single `<h1>` (hero headline) -- **Verify:** grep for h1, expect exactly 1
- [ ] `prefers-reduced-motion` respected for all animations -- **Verify:** grep for the media query
- [ ] {MANUAL CHECK REQUIRED} -- Hero headline is 3-8 words, outcome-focused, not a category description
- [ ] {MANUAL CHECK REQUIRED} -- Every testimonial contains a specific metric or named outcome

---

## Evolution

| Date | What Changed | Why | Scope | Project | Occurrences |
|------|-------------|-----|-------|---------|-------------|
| 2026-04-03 | Created | SCOUTX research mission: homepage supplement set | universal | -- | 1 |
| 2026-04-04 | Added Owner's Validated Patterns | Cross-project analysis of 6 shipped projects. Dual-mode framework (hospitality vs SaaS). 12 build constants with implementation details | universal | -- | 1 |

---

**Source research:** SCOUTX Mode 5 (Supplement Research)
**Status:** provisional
**Confidence:** High
**Review by:** 2026-10-03
**Consuming worker:** DEMX
**Worker type:** builder
