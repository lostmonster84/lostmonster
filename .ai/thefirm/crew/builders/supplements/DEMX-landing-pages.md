# DEMX Supplement: Landing Pages

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Single-purpose conversion pages: waitlist signups, product launches, feature announcements, campaign pages, event registrations. One goal, one CTA, minimal navigation. NOT homepages.

**This supplement is universal.** It must NEVER reference a specific project, brand, colour, or client. It teaches the craft -- the patterns that make this job type work regardless of who it's for. The project's design guide handles brand identity. This handles quality.

---

## Related Supplements

These supplements were created from the same research. They MUST stay in sync -- when one is updated, all must be updated in the same session.

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
| 1 | Vercel Ship 26 (`vercel.com/ship`) | Event registration landing page | Pure single-CTA page: 1 primary button, 3 form fields, zero product links. The cleanest landing page in the set | 2026-04-03 |
| 2 | Notion AI (`notion.com/product/ai`) | Feature launch page | Story-driven hero ("Meet your 24/7 AI team") with animated GIFs showing product in action. 18-20 sections but single conversion thread | 2026-04-03 |
| 3 | Better Stack (`betterstack.com`) | Competitor comparison landing | Direct price comparison ($687/mo vs Datadog $55,574/mo) as primary conversion lever. Dark theme matches developer audience | 2026-04-03 |
| 4 | Stripe Payments (`stripe.com/payments`) | Feature landing page | Interactive payment form mockups as hero visual -- showing the product working, not describing it | 2026-04-03 |
| 5 | Cal.com (`cal.com`) | Product signup page | Dual-path CTA (Google SSO + email). 15 CTAs but all funnel to signup. "More elegant than Calendly" testimonial positioning | 2026-04-03 |
| 6 | Clerk (`clerk.com`) | Developer product page | Tabbed component showcases replacing traditional screenshots. "Start building for free" repeated 4 times | 2026-04-03 |
| 7 | Neon (`neon.com`) | Developer database signup | Video background hero with CLI command as secondary CTA. Compliance badges (HIPAA, SOC2, ISO 27001) prominent | 2026-04-03 |
| 8 | Supabase (`supabase.com`) | Developer platform signup | "Build in a weekend, Scale to millions" -- outcome-focused headline. Logo carousel immediately after hero | 2026-04-03 |
| 9 | Superhuman (`superhuman.com`) | Product signup page | "Superpowers, everywhere you work" -- aspirational headline. Product mockup showing AI assistant in action | 2026-04-03 |
| 10 | Raycast (`raycast.com`) | Product download page | 3D interactive cube hero. 24+ testimonials including Guillermo Rauch, Marques Brownlee. Direct download, no signup gate | 2026-04-03 |
| 11 | Arc (`arc.net`) | Browser download page | Gradient-heavy design with no signup friction -- direct download. Minimal sections, personality-driven | 2026-04-03 |
| 12 | Betterstack (via Swipe Pages analysis) | Monitoring signup | Email-only signup form. Real developer tweets as social proof. "Get started in 30 seconds" friction reducer | 2026-04-03 |
| 13 | Deel (via Swipe Pages analysis) | HR platform signup | "67% ROI" from Forrester study + 6,000+ reviews. Third-party credibility as primary trust mechanism | 2026-04-03 |
| 14 | Amie (via Swipe Pages analysis) | Meeting tool signup | "47 seconds to summarize meetings" -- specific numeric promise in hero. Measurable outcome beats vague benefit | 2026-04-03 |
| 15 | Linear (`linear.app`) | Project management signup | Minimal, story-driven hero with micro-animations. Grid dot animations, staggered text reveals | 2026-04-03 |
| 16 | Factors AI (via Swipe Pages analysis) | Analytics signup | Only asks first name + work email. Compliance logos displayed. Extreme form minimization | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects (DOMA, HospoJobs, Ancarraig, WildTrax, Slydes, Evidis). These are not theory -- they are patterns the owner consistently builds. When they conflict with external research, these take priority. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Two Modes of Landing Page Design

**Mode 1: Hospitality / Experience** (booking pages, event pages, location pages)
- Warm canvas with full-bleed photography hero
- Ken Burns zoom on hero image (6-25s)
- White cards on warm off-white background
- Trust signals: years in business, review scores, real guest photos
- CTA: "Check Availability", "Book Now", "Reserve" -- action-specific, not generic

**Mode 2: SaaS / Product** (waitlist, signup, feature launch)
- Dark hero with mesh gradient blobs or product mockup
- Alternating dark/light sections
- Product-as-hero visual (phone mockup, dashboard preview, interactive demo)
- Trust signals: compliance badges (SOC2, GDPR), company logos, specific metrics
- CTA: "Get early access", "Create your first X", "Start for free"

### Build Constants (Both Modes)

| # | Pattern | How to Build It |
|---|---------|----------------|
| 1 | **Ken Burns on hero** | scale(1) to scale(1.05-1.08), 6-25s ease-out. Even on dark SaaS heroes |
| 2 | **Warm canvas** | #F9F7F3 to #FAFAF8 range for light sections. Never pure white page background |
| 3 | **No pure black** | Darkest: #0A0E27 to #1A1940. Never #000000 |
| 4 | **Card hover lift** | `-translate-y-1` + layered shadow, 300ms transition |
| 5 | **Scroll-triggered entrances** | Framer Motion whileInView, naturalEase [0.25, 0.46, 0.45, 0.94], 0.1s child stagger |
| 6 | **Generous padding** | Desktop py-20 to py-32. Mobile py-12 to py-16 |
| 7 | **Eyebrow labels** | text-xs uppercase tracking-wide in accent colour, above section headings |
| 8 | **Noise texture on dark sections** | SVG turbulence overlay at 0.03 opacity (SaaS mode) |
| 9 | **Friction reducer below CTA** | Always present. "No credit card", "Live in minutes", "Free forever" |
| 10 | **Rounded cards (12-20px)** | rounded-xl to rounded-2xl standard |

---

## Patterns (What the Best All Do)

### Pattern 1: Story-Driven Hero (Not Tagline Hero)
**What:** The hero section tells a narrative -- problem to solution -- rather than stating a tagline. The headline names an outcome ("Meet your 24/7 AI team", "Build in a weekend, Scale to millions") and the visual demonstrates the product working, not a static screenshot.
**Applicability:** Universal
**Evidence:** #2 Notion AI (animated agent GIFs), #4 Stripe (interactive payment forms), #9 Superhuman (AI assistant mockup), #10 Raycast (3D product visualization), #7 Neon (video background showing product)
**How to apply:** Build the hero as a 3-part structure: (1) outcome-focused headline, 5-12 words max, (2) one-sentence supporting copy explaining mechanism, (3) product visual -- animated, interactive, or video -- never a static marketing illustration. Hero should occupy 80-100vh.

### Pattern 2: Single CTA Repeated, Not Multiple CTAs Competing
**What:** One conversion action (e.g., "Start building for free") repeated 3-5 times throughout the page at strategic points -- hero, mid-page after value build, and final section. Secondary CTAs (docs, demo) are visually subordinate.
**Applicability:** Universal
**Evidence:** #6 Clerk (4x "Start building for free"), #5 Cal.com (6x "Get started"), #3 Better Stack (8x "Start for free"), #1 Vercel Ship (1x "Notify me" -- the purest form)
**How to apply:** Define ONE primary CTA text. Place it: (1) hero section, (2) after the strongest social proof section, (3) final section before footer. Use a ghost/text variant for any secondary action. Never give equal visual weight to two different actions.

### Pattern 3: Social Proof Ladder (Logos then Testimonials then Data)
**What:** Social proof escalates in specificity as the page progresses. Logo bar immediately after hero (quick trust), named testimonials mid-page (credibility), and quantitative proof (metrics, case studies) near conversion point.
**Applicability:** Universal (adjust depth for audience)
**Evidence:** #8 Supabase (logos > customer stories > tweet wall), #5 Cal.com (trust statement > 18 testimonials), #3 Better Stack (integration logos > developer tweets), #13 Deel (review count > Forrester ROI study)
**How to apply:** Section order: hero > logo bar (6-12 logos, single row) > features > testimonial block (3-6 named quotes) > quantitative proof near final CTA. Each layer answers a different objection: "Who uses this?" > "Do people like it?" > "Does it actually work?"

### Pattern 4: Friction Reducers Adjacent to CTA
**What:** Text near the CTA button that actively reduces perceived risk: "No credit card required", "Get started in 30 seconds", "Free tier available", "Cancel anytime".
**Applicability:** Universal
**Evidence:** #12 Betterstack ("Get started in 30 seconds"), #7 Neon (free tier messaging), #6 Clerk ("Start building for free"), #11 Arc (direct download, no signup)
**How to apply:** Add a single friction-reducing line directly below or beside every CTA button. Keep it under 8 words. Use the specific friction reducer that addresses the primary objection for the page type: waitlist = "We won't spam you", signup = "No credit card required", download = "Free, no account needed".

### Pattern 5: Numeric Specificity in Value Props
**What:** Specific numbers outperform vague claims. "47 seconds", "12x faster", "67% ROI", "$687/mo vs $55,574/mo" are all more persuasive than "faster", "better value", "high ROI".
**Applicability:** Universal
**Evidence:** #14 Amie ("47 seconds"), #3 Better Stack ("30x cheaper", exact pricing), #13 Deel ("67% ROI from Forrester"), #7 Neon ("150,000+ compute endpoints provisioned daily")
**How to apply:** Every value proposition section should contain at least one specific number. Audit vague benefits and replace with measured outcomes. If no real data exists, use a specific comparison instead ("2 fields vs 11 fields").

### Pattern 6: Product-as-Hero Visual
**What:** The hero visual IS the product -- an interactive demo, animated UI, video walkthrough, or live component preview -- not a marketing illustration or abstract graphic.
**Applicability:** Universal (especially B2B SaaS, developer tools)
**Evidence:** #4 Stripe (interactive checkout forms), #6 Clerk (tabbed component showcase), #2 Notion AI (animated GIFs of agents working), #10 Raycast (3D product cube), #7 Neon (video of product), #9 Superhuman (product mockup)
**How to apply:** Default to showing the actual product UI in the hero. Acceptable formats: autoplay video (muted), animated screenshot sequence, interactive demo, or tabbed component preview. Avoid: stock photography, abstract 3D shapes, marketing illustrations. The visual should answer "What does this actually look like?"

### Pattern 7: Conversion-Optimized Navigation (Minimal, Sticky CTA)
**What:** Landing page navigation is drastically reduced compared to the main site. Many remove nav entirely. Those that keep it use 3-5 links maximum with a persistent CTA button in the header.
**Applicability:** Universal
**Evidence:** #1 Vercel Ship (FAQ link only), #11 Arc (logo + download button), #3 Better Stack (products + sticky "Start for free"), #5 Cal.com (solutions/dev/resources + sticky "Get started")
**How to apply:** For pure landing pages (waitlist, event): remove navigation entirely or limit to 1-2 anchor links. For feature/product landing pages: keep nav but reduce to 3-5 items with a sticky CTA button that remains visible on scroll. Never include full site navigation on a landing page.

### Pattern 8: Dual-Path Entry (Low Friction + High Friction)
**What:** Offer two entry points: an instant-start option (SSO, email-only, direct download) and an enterprise/guided option (book a demo, talk to sales). The instant option is primary; the guided option is secondary.
**Applicability:** B2B SaaS, developer tools
**Evidence:** #5 Cal.com ("Sign up with Google" + "Sign up with email"), #2 Notion AI ("Try for free" + "Request a demo"), #8 Supabase ("Start your project" + "Request a demo"), #3 Better Stack ("Start for free" + "Book a consultation")
**How to apply:** Primary CTA = instant action (signup/download/join). Secondary CTA = human-assisted path (demo/consultation). Primary gets the filled/solid button treatment. Secondary gets outline/ghost/text link treatment. Place both in hero; repeat only the primary throughout the page.

### Pattern 9: Dark Theme for Developer Audiences
**What:** Developer-facing landing pages consistently use dark backgrounds with light text, code-editor-inspired color palettes, and terminal-style elements.
**Applicability:** Developer tools, technical products
**Evidence:** #3 Better Stack (dark UI), #7 Neon (dark with video), #15 Linear (dark minimal), #10 Raycast (dark with 3D elements), #6 Clerk (dark with circuit patterns)
**How to apply:** When the target audience is developers: default to dark background (not pure black -- use #0a0a0a to #1a1a1a range). Use monospace font for code snippets and CLI commands. Accent colors should be vibrant against dark (neon green, electric blue, warm amber). Include at least one code snippet or CLI command visible.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Multiple competing CTAs with equal visual weight | Forces premature decisions, splits conversion focus. Pages with one CTA convert significantly higher than multi-CTA pages | Generic SaaS pages with "Sign up", "Book demo", "Watch video", "Download PDF" all as primary buttons in the hero |
| 2 | Abstract hero illustrations instead of product visuals | Visitors can't answer "what does this actually do?" in 5 seconds. 2026 trend strongly favors real product UI | Pages using generic 3D blob illustrations or stock photography in hero instead of showing the product |
| 3 | Full site navigation on landing pages | Every nav link is an exit. Landing pages that keep full nav lose conversion focus. Vercel Ship uses 1 link; that's the benchmark | Campaign/waitlist pages that include the full header with blog, about, careers, etc. |
| 4 | Vague benefit headlines without specificity | "The better way to manage your work" tells the visitor nothing measurable. Compare to "47 seconds to summarize meetings" -- specificity builds trust | Headlines like "Streamline your workflow" or "Work smarter, not harder" with no quantifiable claim |
| 5 | Long forms on first interaction | Form abandonment rate is 81%. Each field beyond email reduces conversion. Reducing from 11 to 4 fields lifts conversion 120% | Waitlist pages asking for name, email, company, role, company size, phone number, and "how did you hear about us?" |
| 6 | Social proof without names or specifics | "Thousands of happy customers" provides zero persuasion. Named individuals with titles and specific outcomes build real trust | Generic star ratings, unnamed "customer" quotes, or "10,000+ users" without context |
| 7 | Hero animations that block LCP | Lottie/GSAP animations above the fold that initialize before content loads push LCP past 2.5s. Content must render first, animation second | Hero sections with complex SVG path animations that must fully load before any text appears |

---

## Benchmarks

| Metric | Target | Source |
|--------|--------|--------|
| Hero height | 80-100vh (fills viewport, no scroll needed to see CTA) | Studied examples #1-#16 |
| Hero word count | 20-40 words (headline + subheadline + CTA) | Notion AI hero: ~30 words, Neon: ~15 words, Supabase: ~20 words |
| Total page sections | 5-8 for pure landing pages, 12-18 for feature pages | Vercel Ship: 3, Cal.com: 11, Notion AI: 18-20 |
| Form fields (waitlist) | 1 (email only) | Factors AI, Betterstack, Vercel Ship |
| Form fields (signup) | 2 max (email + name OR SSO button) | Cal.com, Clerk, Supabase |
| CTA repetitions | 3-5 placements of the same primary CTA | Clerk: 4x, Cal.com: 6x, Better Stack: 8x |
| Logo bar count | 6-12 companies | Supabase: 8+, Clerk: 12+, Cal.com: implicit in testimonials |
| Testimonial count | 3-6 named quotes (not generic) | Cal.com: 18 (excessive), Raycast: 24+ (wall-of-love style) |
| Total page word count | 800-2,100 words total body copy | Notion AI: ~1,800-2,100, pure waitlist: ~200-400 |
| Scroll depth to primary CTA | 0vh (visible without scrolling in hero) | All 16 studied examples |
| CTA button contrast | 4.5:1 minimum against background | WCAG AA requirement |
| Total page weight target | Under 500KB initial load (excluding lazy-loaded assets) | Performance research |
| Primary CTA text length | 2-4 words | "Get started", "Start for free", "Join waitlist", "Notify me" |

---

## Mobile Patterns

| Pattern | Desktop | Mobile (390px) |
|---------|---------|----------------|
| Hero layout | Side-by-side (text + visual) or centered with visual below | Stacked: headline > CTA > visual (CTA moves UP to stay above fold) |
| Hero visual | Full product screenshot/animation | Cropped to key UI element, 60vh max, or replaced with simplified graphic |
| Navigation | Horizontal links + CTA button | Hamburger hidden OR removed entirely. Sticky CTA bar at bottom |
| Logo bar | Single horizontal row | Two rows or horizontal scroll |
| Testimonials | Grid or side-by-side cards | Single column, swipeable carousel |
| Form fields | Side-by-side possible | Full width, single column, larger touch targets (48x48px min) |
| Pricing comparison | Side-by-side table | Stacked cards with swipe between plans |
| CTA button | Inline within section | Sticky bottom bar on scroll (persistent) |
| Section padding | 80-120px vertical | 40-60px vertical |
| Font sizes | Hero headline 48-72px | Hero headline 28-36px |

**Critical mobile rule:** The CTA must be visible without scrolling on mobile. If the hero visual pushes the CTA below the fold, restructure: headline > CTA > visual, not headline > visual > CTA.

**Thumb zone:** Primary CTA should sit in the bottom 40% of the screen on mobile -- the natural thumb reach zone. Sticky bottom bars solve this.

---

## Accessibility Patterns

### Form Handling
- `aria-invalid="true"` on fields that fail validation
- `aria-describedby` linking each error message to its input field
- `aria-live="polite"` region for dynamic error messages
- Validate on blur (not keystroke) to avoid premature interruption
- Error summary at form top with anchor links to each error field
- Required fields: both visual asterisk AND `aria-required="true"`

### Focus Management
- On form submission error: programmatically move focus to first error field
- After successful submission: move focus to confirmation message
- Visible focus indicators with 3:1 minimum contrast ratio
- Never remove default focus outlines without replacement

### CTA Accessibility
- CTA buttons use `<button>` or `<a>` with `role="button"` -- never div/span
- CTA text must be descriptive: "Start your free trial" not just "Start"
- If CTA opens a modal: `aria-haspopup="dialog"` on trigger
- Keyboard: all CTAs reachable via Tab, activatable via Enter/Space

### Content Structure
- Single `<h1>` for the page (the hero headline)
- Sections use landmarks: `<main>`, `<section aria-label="...">`, `<footer>`
- Skip link to main content (especially important when nav is present)
- Image alt text: describe what the product screenshot shows, not "hero image"

---

## Performance Patterns

| Metric | Target | How |
|--------|--------|-----|
| LCP | Under 2.5s (aim for under 1.5s) | Hero image/video eager-loaded, not lazy. Preload hero assets in `<head>`. No render-blocking animation |
| INP | Under 200ms | Minimal JS in critical path. Defer analytics, chat widgets, animation libraries |
| CLS | Under 0.1 | Set explicit width/height on all images/videos. Reserve space for async-loaded logos |
| Above-fold weight | Under 200KB | Hero image: WebP/AVIF, max 100KB. Fonts: subset to used characters, max 50KB. Critical CSS inlined |
| Total page weight | Under 500KB initial | Lazy-load everything below fold. Code-split non-critical JS. Defer third-party scripts |
| Font loading | FOUT over FOIT | `font-display: swap`. Preload primary heading font. Maximum 2 font families, 3-4 weights total |
| Animation | Deferred | No above-fold animation that blocks LCP. Use `will-change` sparingly. CSS animations over JS where possible. Lottie/GSAP loaded after LCP fires |
| Hero image | Eager, preloaded | `<link rel="preload" as="image">` for hero visual. Use `fetchpriority="high"`. AVIF with WebP fallback |
| Video | Poster + lazy | Hero video: set `poster` attribute for immediate visual. `preload="metadata"`. Autoplay only if under 2MB |

**Critical rule:** The hero content (headline + CTA + background) must render within 1.5s on 4G mobile. If the hero depends on JS to render (e.g., React client-side), SSR/SSG the hero section and hydrate after.

---

## Planning Implications

See CODAX supplement for full planning guidance. Key points for DEMX:

- Landing pages are NOT homepages. Scope should be 5-8 sections, not 15+
- Copy must be written BEFORE layout. The story drives the structure
- Hero section is 40% of the build effort -- it contains the product visual, animation, and primary conversion element
- Social proof needs real data (logos, quotes, metrics) -- placeholder content cannot ship
- Form integration is a dependency: email service, CRM, or database must be confirmed before build
- Mobile is not an afterthought: 83% of traffic is mobile. Build mobile-first, expand to desktop

---

## Checklist

Before shipping, verify. Every item must be binary-testable.

- [ ] Hero occupies 80-100vh with CTA visible without scrolling -- **Verify:** measure hero height in browser dev tools at 1440px and 390px
- [ ] Single primary CTA repeated 3-5 times, same text each time -- **Verify:** search codebase for CTA component/button text, count instances
- [ ] Product visual in hero (not illustration/stock) -- **Verify:** hero visual shows actual product UI, screenshots, or demo
- [ ] Social proof present: logo bar + named testimonials -- **Verify:** logo bar component exists after hero, testimonial section with name + title + quote
- [ ] Friction reducer text adjacent to every CTA -- **Verify:** text element within 16px of each CTA button
- [ ] Navigation minimal (0-5 links) with no full site nav -- **Verify:** count nav links, confirm no mega-menu or full site header
- [ ] Form fields minimal (1 for waitlist, 2 for signup) -- **Verify:** count form input elements
- [ ] Mobile CTA above fold at 390px viewport -- **Verify:** screenshot at 390px, CTA visible without scroll
- [ ] Hero image/video eager-loaded with preload hint -- **Verify:** check `<head>` for preload, check hero img for `loading="eager"` or absent lazy
- [ ] LCP under 2.5s on simulated 4G -- **Verify:** Lighthouse mobile audit
- [ ] All form fields have associated labels and aria attributes -- **Verify:** grep for `aria-invalid`, `aria-describedby` on form elements
- [ ] Page has single `<h1>` (hero headline) -- **Verify:** grep for `<h1>` or `as="h1"`, expect exactly 1
- [ ] Total page weight under 500KB initial load -- **Verify:** Network tab, filter to initial load (not lazy)
- [ ] {MANUAL CHECK REQUIRED} -- Hero headline communicates a specific outcome, not a vague tagline
- [ ] {MANUAL CHECK REQUIRED} -- Social proof uses real names, real titles, real companies

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
**Consuming worker:** DEMX
**Worker type:** builder
