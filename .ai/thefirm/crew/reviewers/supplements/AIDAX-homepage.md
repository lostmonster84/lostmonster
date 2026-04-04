# AIDAX Supplement: Homepage

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Homepage conversion review -- scoring the conversion architecture of a homepage. Hero effectiveness, CTA strategy, social proof placement, trust building, and user journey optimization.

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
| 1 | Vercel (vercel.com) | Dual CTA + tab navigation | Self-selection tabs serve multiple audiences without splitting pages; specific metrics ("7m to 40s") sell harder than vague claims | 2026-04-03 |
| 2 | Stripe (stripe.com) | Gold standard conversion architecture | "$1.9T processed" in hero -- letting the number sell. 13 sections with CTA every 2-3 sections. Dual path: self-serve + sales | 2026-04-03 |
| 3 | Notion (notion.com) | Productivity calculator as conversion tool | Calculator showing cost savings vs 10 competitors -- turns comparison shopping into a self-serve conversion moment | 2026-04-03 |
| 4 | Raycast (raycast.com) | Community-driven social proof | Real Twitter handles and avatars (not anonymous quotes). 24+ testimonials create overwhelming social proof mass | 2026-04-03 |
| 5 | Superhuman (superhuman.com) | Interactive demo as conversion lever | Simulated workflow demo lets visitors experience the product before signing up -- reduces perceived risk | 2026-04-03 |
| 6 | Framer (framer.com) | Triple CTA strategy | "Start for free" / "Start with AI" / "Meet our customers" -- three distinct paths for three intent levels | 2026-04-03 |
| 7 | Loom (loom.com) | CTA frequency champion | 6+ "Get Loom for free" instances across 15 sections. The repetition normalizes the action | 2026-04-03 |
| 8 | Webflow (webflow.com) | Persona segmentation | Persona tabs let each audience see their own value proposition without leaving the page | 2026-04-03 |
| 9 | Retool (retool.com) | Case study metrics as conversion proof | "$6M saved" (DoorDash) -- dollar figures in case studies create FOMO for non-customers | 2026-04-03 |
| 10 | Cal.com (cal.com) | Ultra-low-friction CTA | "Sign up with Google" as primary CTA. Compliance badges (SOC 2, HIPAA) in nav reduce enterprise friction | 2026-04-03 |
| 11 | Railway (railway.com) | Competitor displacement | Each feature names what it replaces -- turns switching cost objection into a feature | 2026-04-03 |
| 12 | Clerk (clerk.com) | Component previews as trust builders | Showing the actual UI components you get -- eliminates "what will I actually get?" objection | 2026-04-03 |
| 13 | Descript (descript.com) | Logo quantity as signal | 16 enterprise logos (Amazon, Apple, NYT) in hero -- quantity and quality of logos signals market validation | 2026-04-03 |
| 14 | Pitch (pitch.com) | CEO testimonial weight | Perplexity CEO testimonial carries more weight than anonymous quotes -- authority matters | 2026-04-03 |
| 15 | PlanetScale (planetscale.com) | Technical proof points | Specific latency numbers (45ms to 5ms) -- developers trust measurable claims over marketing language | 2026-04-03 |
| 16 | Arc (arc.net) | Minimal conversion path | 6 sections, single download CTA. Proves that fewer sections with clearer intent can outperform longer pages | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Conversion Constants (Validated Across 6 Projects)

| # | Pattern | How to Score It |
|---|---------|----------------|
| 1 | **Dual CTA or search-forward hero** | Hospitality: search card overlay is the CTA. SaaS: primary button + secondary link. Both present = full marks |
| 2 | **Trust signals in or directly below hero** | Hospitality: "Welcoming guests since 1973", review scores. SaaS: compliance badges (AES-256, GDPR, SOC2), logo bar. Missing = deduction |
| 3 | **CTA copy is action-specific, not generic** | "Check Availability" / "Create your first Slyde" / "Get early access" -- never "Learn more" or "Submit". Specific action = full marks |
| 4 | **Friction reducer adjacent to every CTA** | "No credit card", "Live in minutes", "Takes 2 minutes". Present within 16px of CTA = full marks |
| 5 | **Dark/light alternation creates reading rhythm** | Evidis alternates midnight/cream. Slydes alternates dark/gray-50. Rhythm present = bonus. All-same-background = deduction for pages over 8 sections |
| 6 | **Testimonials contain specifics** | "Reservations went up 35%" (Slydes), "$6M saved" (Retool pattern). Metrics or named outcomes = full marks per testimonial |

---

## Patterns (What the Best All Do)

### Pattern 1: Dual CTA in Hero (Self-Serve + Sales-Assisted)
**What:** Two CTAs serving different intent levels. Primary: low-friction self-serve ("Start for free", "Get started"). Secondary: high-intent guided ("Get a demo", "Contact sales"). Ensures neither audience is lost.
**Applicability:** Universal (B2B SaaS essential; B2C can use single CTA)
**Evidence:** Vercel (#1), Stripe (#2), Notion (#3), Framer (#6), Retool (#9), Cal.com (#10) -- all use dual CTA. Cal.com adds a third ultra-low-friction option (Google SSO).
**How to score:** Both paths present = full marks. Single CTA = deduct. Primary must be visually dominant (filled button). Secondary must be visually subordinate (outline/ghost/text).

### Pattern 2: Social Proof Ladder (Logos > Quotes > Metrics)
**What:** Social proof escalates in specificity as the page progresses. Logo bar (quick trust) > Named testimonials (credibility) > Quantitative proof (metrics, case studies) near conversion.
**Applicability:** Universal
**Evidence:** Vercel (#1: logos + metrics), Notion (#3: logos > calculator), Retool (#9: logos > case studies with $6M), Loom (#7: 25+ logos > testimonials > case study metrics)
**How to score:** All three layers present and in escalating order = full marks. Missing layer = deduct per missing layer. Logo bar after hero is non-negotiable. Testimonials without metrics or names = half credit.

### Pattern 3: CTA Every 2-3 Sections
**What:** Conversion opportunities are distributed throughout the page, not confined to hero and footer. Visitors at any scroll depth can convert.
**Applicability:** Universal
**Evidence:** Loom (#7: 6+ instances), Cal.com (#10: 18+ CTAs), Stripe (#2: 4x through 13 sections), Retool (#9: 4x)
**How to score:** Count CTA placements. 6+ for standard homepage = full marks. Only hero + footer = significant deduction. CTAs should use consistent primary action text.

### Pattern 4: Quantified Social Proof (Numbers, Not Adjectives)
**What:** Every social proof element contains specific, measurable outcomes rather than vague praise. Logos are paired with metrics. Testimonials cite specific results.
**Applicability:** Universal
**Evidence:** Stripe (#2: "$1.9T processed", 99.999% uptime), Vercel (#1: "7m to 40s build times"), Retool (#9: "$6M saved"), Notion (#3: cost calculator vs 10 tools), PlanetScale (#15: "45ms to 5ms")
**How to score:** Count quantified claims across the page. 3+ specific numbers = full marks. Vague testimonials ("Great product!") = zero credit per instance. Every testimonial should contain either a specific metric, a named competitor replaced, or a quantified time/money outcome.

### Pattern 5: Closing CTA Section Mirrors Hero
**What:** Dedicated conversion section above the footer with fresh headline and same CTA buttons as hero. Catches the fully-scrolled visitor.
**Applicability:** Universal
**Evidence:** Vercel (#1), Framer (#6), Railway (#11), Stripe (#2), Raycast (#4) -- all have a distinct closing CTA section that is NOT the footer.
**How to score:** Present with fresh copy + CTAs = full marks. Missing entirely = significant deduction. Copy-pasted from hero = partial credit (lazy but functional). Must be a dedicated section, not just CTAs in the footer.

### Pattern 6: Sticky Mobile CTA
**What:** On mobile viewports, a persistent CTA bar at the bottom of the screen ensures the conversion action is always accessible regardless of scroll position.
**Applicability:** Universal (mobile viewports only)
**Evidence:** Cal.com (#10: persistent bottom CTA), Loom (#7: sticky bottom bar). Industry data: sticky CTAs drove 18% trial start increase in SaaS testing.
**How to score:** Present on mobile = full marks. Absent on a page with 8+ sections = deduction. The sticky CTA should use the same text and link as the primary CTA.

### Pattern 7: Persona Self-Selection
**What:** For multi-audience products, the homepage lets visitors identify themselves and see relevant content without navigating away. Implemented via tabs, toggles, or segmented sections.
**Applicability:** Multi-persona B2B products
**Evidence:** Webflow (#8: 4 persona tabs), Vercel (#1: 5 use case tabs), Retool (#9: audience-based sections), Pitch (#12: persona comparison)
**How to score:** Present for multi-persona products = full marks. Absent for a product with 3+ distinct audiences = deduction. Implemented as separate pages instead of tabs = partial credit (worse UX, higher bounce risk).

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Logo soup without metrics | Logos alone are table stakes. Without numbers they signal "we exist" but not "we deliver" | Logo bars with 20 logos but no metric, no trust statement, no context |
| 2 | Single CTA path for B2B | Self-serve users won't book demos. Enterprise won't self-serve. One path loses one audience entirely | Pages with only "Book a demo" -- no free trial, no self-serve option |
| 3 | CTAs only in hero and footer | 42% of visitors never scroll past hero CTA. Mid-page converters have no path. Dead zones between hero and footer | 15-section homepage with CTAs at position 1 and position 15 only |
| 4 | Generic testimonials without specifics | "Great product, love it!" provides zero conversion value. Named people with titles and metrics build real trust | Anonymous quotes, star ratings without context, "Customer" as attribution |
| 5 | No audience signal in hero | Visitors who can't identify "this is for me" in 5 seconds bounce. The hero must signal who the product serves | Homepages with "The modern platform for teams" -- which teams? doing what? |
| 6 | Comparison tables on homepage | Homepage is not a comparison page. Direct competitor naming looks defensive. Social proof and displacement do the job better | Feature comparison grids naming competitors by row |

---

## Benchmarks

| Metric | Target | Source |
|--------|--------|--------|
| Hero decision window | 3-5 seconds | User decides to stay or bounce in this window |
| CTA above fold | Mandatory (visible without scroll at 1440px AND 390px) | All 16 studied sites |
| Dual CTA in hero | Mandatory for B2B | All studied B2B sites use dual CTA |
| Social proof within first scroll | Logo bar immediately after hero | 14 of 16 studied sites |
| Total CTAs on page | 6-15 | Raycast 6+15, Cal.com 18+, Stripe 12+ |
| CTA interval | Every 2-3 sections | Observed across all sites |
| Quantified proof points | 3+ specific numbers on page | Stripe 4, Webflow 6, Retool 6 |
| Testimonials with metrics | Every testimonial should contain a number or named outcome | Stripe, Retool, PlanetScale evidence |
| Closing CTA section | Present above footer, fresh headline | 14 of 16 studied sites |
| Sticky mobile CTA | Present for pages with 8+ sections | 18% uplift evidence |

### Scoring Anchors

| Score Range | What It Means |
|-------------|--------------|
| 90-100 | Dual CTA, social proof ladder complete, CTA every 2-3 sections, all proof quantified, closing CTA present, sticky mobile CTA, persona selection (if applicable) |
| 80-89 | Dual CTA, logo bar after hero, 4+ CTA placements, most proof quantified, closing CTA present |
| 70-79 | Single CTA path OR missing closing CTA OR social proof below fold OR fewer than 4 CTA placements |
| 60-69 | Missing social proof ladder OR no mid-page CTAs OR vague testimonials throughout |
| Below 60 | Hero-only CTA, no social proof strategy, no conversion architecture |

---

## Mobile Patterns

| Conversion Element | Desktop | Mobile (390px) |
|-------------------|---------|----------------|
| Hero CTA | 2 buttons side-by-side | 2 buttons stacked, full-width |
| CTA persistence | Inline | Sticky bottom bar |
| Social proof bar | Single row | 2 rows or scroll |
| Form (if any) | Inline fields | Full-width, larger touch targets |
| Testimonials | Grid | Swipeable single-card |
| Closing CTA | Wide section | Full-bleed with stacked buttons |

**Critical:** 60%+ traffic is mobile. Desktop converts ~8% higher than mobile (industry data). Mobile CTA optimization is where the biggest conversion gains live.

---

## Accessibility Patterns

### Conversion-Specific a11y
- CTA buttons use `<button>` or `<a>` with clear role -- never div/span with click handlers
- CTA text must be descriptive: "Start your free trial" not just "Start" or an icon
- If CTA opens a modal: `aria-haspopup="dialog"` on trigger
- All CTAs reachable via Tab, activatable via Enter/Space
- Sticky mobile CTA must not obscure page content -- include padding-bottom on body

### Social Proof a11y
- Logo images need `alt="Company Name logo"`
- Testimonial quotes use `<blockquote>` with `cite` attribute
- Auto-rotating testimonial carousels must pause on focus/hover
- Star ratings need `aria-label="4.9 out of 5 stars"` -- visual stars alone are invisible to screen readers

---

## Performance Patterns

Conversion-relevant performance:
- Each second of load time beyond 2s costs ~7% conversion (Google data)
- LCP target: under 2.5s mobile. Hero content (headline + CTA) must render within 1.5s
- Form inputs above fold must be interactive within 2s (INP under 200ms)
- Sticky CTA bar must not cause layout shift (CLS under 0.1)

---

## Planning Implications

See CODAX supplement for full planning guidance. Key points for AIDAX review:
- Social proof data (logos, testimonials, metrics) is a dependency -- flag if placeholder content is shipped
- Conversion architecture should be reviewed at wireframe stage, not after build. Moving CTAs post-build is expensive
- Persona segmentation strategy should be defined before build -- it affects section structure

---

## Checklist

Before shipping, verify. Every item must be binary-testable.

- [ ] Dual CTA in hero (primary filled + secondary outline/ghost) -- **Verify:** count buttons in hero section, check visual treatment
- [ ] Social proof bar within first scroll (logo bar after hero) -- **Verify:** check section order in DOM
- [ ] CTA placed every 2-3 sections (6+ total for standard homepage) -- **Verify:** count CTA instances
- [ ] Closing CTA section above footer with fresh headline -- **Verify:** check last section before footer
- [ ] All testimonials contain specific metrics or named outcomes -- **Verify:** read each testimonial for quantified claims
- [ ] Primary CTA text consistent across all placements -- **Verify:** search for CTA text, confirm same action
- [ ] Mobile CTA visible without scroll at 390px -- **Verify:** screenshot at 390px viewport
- [ ] Sticky mobile CTA present for pages with 8+ sections -- **Verify:** check for position:sticky/fixed CTA on mobile
- [ ] {MANUAL CHECK REQUIRED} -- Hero communicates "this is for [audience]" within 5 seconds
- [ ] {MANUAL CHECK REQUIRED} -- Social proof ladder escalates: logos > quotes > metrics (not random order)
- [ ] {MANUAL CHECK REQUIRED} -- No vague testimonials ("Great product!") without specific outcomes

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
**Consuming worker:** AIDAX
**Worker type:** reviewer
