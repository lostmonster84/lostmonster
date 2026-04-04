# AIDAX Supplement: Landing Pages

> Researched by SCOUTX -- Created 2026-04-03
> Last updated: 2026-04-04

---

## What This Covers

Conversion review for single-purpose landing pages: waitlist signups, product launches, feature announcements, campaign pages, event registrations. Evaluating whether the page will convert -- not whether it looks good (that's SOFAX) or whether the copy works (that's WORDX).

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
| 1 | Vercel Ship 26 (`vercel.com/ship`) | Event registration -- purest landing page | 1 primary CTA, 3 form fields, zero exit links. The conversion benchmark | 2026-04-03 |
| 2 | Notion AI (`notion.com/product/ai`) | Feature launch with deep funnel | Multi-layered social proof: logos > named quotes > specific metrics. Dual-path (free trial + demo) | 2026-04-03 |
| 3 | Better Stack (`betterstack.com`) | Competitor comparison conversion | Direct pricing comparison as conversion mechanism. $687 vs $55,574 -- objection-destroying specificity | 2026-04-03 |
| 4 | Stripe Payments (`stripe.com/payments`) | Feature page with product-as-demo | Interactive checkout forms replace static copy. Visitors experience the product before committing | 2026-04-03 |
| 5 | Cal.com (`cal.com`) | Dual-path signup | Google SSO + email paths. 15 CTAs but all drive to signup. "More elegant than Calendly" competitive positioning | 2026-04-03 |
| 6 | Clerk (`clerk.com`) | Developer signup | Tabbed component preview builds confidence before signup. "Start building for free" x4 | 2026-04-03 |
| 7 | Neon (`neon.com`) | Developer database signup | Video hero + CLI command + compliance badges. Trust signals match enterprise buyer objections | 2026-04-03 |
| 8 | Supabase (`supabase.com`) | Developer platform signup | Outcome headline ("Build in a weekend, Scale to millions") + logo bar + tweet wall + case studies | 2026-04-03 |
| 9 | Superhuman (`superhuman.com`) | Product signup | Aspirational headline + 6 trust logos + product mockup. Clean funnel to "Get Superhuman" | 2026-04-03 |
| 10 | Raycast (`raycast.com`) | Product download | 24+ celebrity testimonials (Guillermo Rauch, MKBHD). Direct download, zero friction | 2026-04-03 |
| 11 | Arc (`arc.net`) | Browser download | No signup gate -- direct download. Personality-driven design. Minimal sections | 2026-04-03 |
| 12 | Deel (via Swipe Pages) | HR platform signup | Third-party credibility: Forrester "67% ROI" study + 6,000 reviews + 4.7/5 rating | 2026-04-03 |
| 13 | Amie (via Swipe Pages) | Meeting tool signup | "47 seconds" -- specific numeric promise. Measurable outcome in headline | 2026-04-03 |
| 14 | Factors AI (via Swipe Pages) | Analytics signup | 2-field form (first name + work email). Compliance logos. Maximum friction reduction | 2026-04-03 |
| 15 | Woodpecker (via Swipe Pages) | Email tool signup | "No credit card required" as primary message. Friction reducer IS the value prop | 2026-04-03 |
| 16 | ActiveCampaign (via Swipe Pages) | Marketing automation signup | G2 "Leader" badges as social proof. Third-party credential validation | 2026-04-03 |

---

## Owner's Validated Patterns

> Cross-referenced from 6 shipped projects. Full research: `researchers/supplements/SCOUTX-owner-project-patterns.md`

### Conversion Constants (Validated Across 6 Projects)

| # | Pattern | How to Score It |
|---|---------|----------------|
| 1 | **Single primary CTA, repeated** | Slydes: "Create your first Slyde" repeated 3x. Evidis: "Get early access" throughout. One action, consistent text = full marks |
| 2 | **Friction reducer always present** | "No credit card. Live in minutes." (Slydes), "Takes 2 minutes" (HospoJobs). Within 16px of every CTA = full marks |
| 3 | **Trust signals match audience** | B2B SaaS: compliance badges (AES-256, UK hosted, GDPR). Hospitality: review scores, years operating, real photos. Wrong type for audience = deduction |
| 4 | **Form fields minimal** | Slydes waitlist: name + email + industry (3 fields). Evidis: email only for early access. More than 3 fields without justification = deduction |
| 5 | **Product-as-hero visual** | Slydes: floating phone mockup. Evidis: laptop with dashboard. Stripe: interactive forms. Show the product, not an illustration = full marks |
| 6 | **Dark/light section rhythm** | Alternating backgrounds create visual pacing. All-same-background on 5+ sections = deduction |

---

## Patterns (What the Best All Do)

### Pattern 1: Single Conversion Goal (Zero Competing Actions)
**What:** The highest-converting landing pages have ONE primary action. Every element on the page exists to drive toward that action. Secondary actions (docs, demo) are visually subordinate and contextually appropriate.
**Applicability:** Universal
**Evidence:** #1 Vercel Ship (1 CTA total), #11 Arc (download only), #10 Raycast (download only), #14 Factors AI (signup only)
**How to review:** Count distinct primary CTAs. If more than ONE distinct action has equal visual weight (same button style, same size), flag it. Acceptable: same action repeated 3-5 times. Unacceptable: "Sign up", "Book a demo", and "Watch video" all as filled buttons.

### Pattern 2: Above-Fold Conversion Readiness
**What:** The visitor can convert without scrolling. Hero must contain: value proposition (headline), supporting context (subheadline), and conversion mechanism (CTA button or inline form).
**Applicability:** Universal
**Evidence:** All 16 studied examples place primary CTA in hero. #1 Vercel Ship puts the entire form above fold. #6 Clerk, #8 Supabase, #5 Cal.com all have hero CTA visible at 1440px and 390px.
**How to review:** Screenshot at 1440x900 and 390x844. Is the primary CTA visible without scrolling in both? If no, this is a blocking conversion failure.

### Pattern 3: Objection Handling Through Social Proof Ladder
**What:** Social proof escalates in specificity down the page. Each layer answers a different objection: "Who uses this?" (logos), "Do they like it?" (testimonials), "Does it work?" (metrics/case studies).
**Applicability:** Universal
**Evidence:** #8 Supabase (logos > stories > tweets), #5 Cal.com (statement > 18 quotes), #12 Deel (reviews > Forrester study > ROI metric)
**How to review:** Map each social proof element to the objection it answers. If all social proof answers the same objection (e.g., all logo bars, no named quotes), flag as "single-layer proof -- add depth". If no social proof exists, flag as critical conversion gap.

### Pattern 4: Friction Reduction at Point of Action
**What:** Text adjacent to CTA buttons that reduces perceived risk. The specific reducer should match the primary objection for the page type.
**Applicability:** Universal
**Evidence:** #15 Woodpecker ("No credit card required"), #12 Betterstack ("Get started in 30 seconds"), #7 Neon (free tier messaging), #6 Clerk ("Start building for free" -- free IS the friction reducer)
**How to review:** Check within 16px of each CTA button for supporting text. Missing friction reducer = conversion leak. Verify the reducer addresses the actual primary objection: signup pages need "no credit card", waitlists need "we won't spam you", downloads need "free, no account needed".

### Pattern 5: Specificity Over Vagueness (The Number Test)
**What:** Every value proposition should contain at least one specific, measurable claim. Vague benefits ("faster", "better", "streamlined") fail the persuasion test.
**Applicability:** Universal
**Evidence:** #13 Amie ("47 seconds"), #3 Better Stack ("30x cheaper", "$687 vs $55,574"), #12 Deel ("67% ROI"), #7 Neon ("150,000+ endpoints daily")
**How to review:** Read each value proposition. Apply the "number test": does this claim contain a specific number, comparison, or measurable outcome? If the answer is no, flag for specificity improvement. At minimum, the hero headline or subheadline must pass this test.

### Pattern 6: Exit Link Minimization
**What:** Every link that does not drive toward conversion is an exit. Landing pages minimize exits by removing or reducing navigation, hiding footer links, and avoiding external links.
**Applicability:** Universal (strictest for waitlist/event pages, slightly relaxed for feature pages)
**Evidence:** #1 Vercel Ship (1 nav link), #11 Arc (no nav on landing), #3 Better Stack (product-focused nav only)
**How to review:** Count total non-conversion links on the page. Categorize: nav links, footer links, social links, content links. For waitlist/event pages: more than 5 non-conversion links is a flag. For feature pages: more than 15 is a flag. Each link is a potential exit from the conversion funnel.

### Pattern 7: Form Field Economy
**What:** Every additional form field reduces conversion. The minimum viable data should be collected at first touch. Additional data can be gathered post-conversion.
**Applicability:** Universal
**Evidence:** #14 Factors AI (2 fields), #12 Betterstack (email only), #1 Vercel Ship (3 fields for event with location logic), #5 Cal.com (SSO = 0 fields). Research: reducing fields from 11 to 4 = 120% conversion lift.
**How to review:** Count form input fields. Thresholds: waitlist = 1 (email). Signup = 2 max (email + name or SSO). Event = 3 max (email + name + relevant qualifier). Every field beyond these thresholds needs justification.

### Pattern 8: Trust Signal Placement for Enterprise
**What:** Enterprise-facing pages place compliance badges (SOC 2, HIPAA, GDPR, ISO 27001) prominently -- often near the hero or CTA. Developer tools show GitHub stars and community size.
**Applicability:** B2B SaaS, enterprise, regulated industries
**Evidence:** #7 Neon (HIPAA, SOC2, ISO 27001, GDPR, CCPA badges), #5 Cal.com (compliance banner at top), #14 Factors AI (compliance logos), #8 Supabase (GitHub 100.1K stars)
**How to review:** If the target audience includes enterprise buyers: are compliance/security badges present? Are they placed near a conversion point (not buried in footer)? Missing compliance signals for enterprise = trust gap.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Multiple equal-weight CTAs | Forces choice paralysis. Research: single CTA pages convert significantly higher. Personalized CTAs convert 202% better than generic | Hero with "Sign up", "Book demo", "Watch video" all as filled primary buttons |
| 2 | CTA below the fold | Visitor must scroll to discover the action. 83% mobile traffic means fold matters more than ever | Pages where hero image/animation pushes CTA below 100vh |
| 3 | Generic social proof | "Thousands of customers" provides zero persuasion. Named individuals with specific outcomes build actual trust | Unnamed testimonials, round-number user counts, no company attribution |
| 4 | Form asking for unnecessary data | 81% form abandonment rate. Each additional field costs conversion. "How did you hear about us?" on a waitlist form is conversion self-sabotage | Waitlist form asking for company size, role, phone number |
| 5 | No friction reducer near CTA | Visitor pauses at the moment of action with unaddressed objections. A 5-word line below the button can prevent this | CTA button with no supporting text about cost, commitment, or risk |
| 6 | Full site navigation on campaign page | Every nav link is an exit path. Waitlist and event pages should have near-zero navigation | Campaign landing page with full header including blog, about, careers, pricing |
| 7 | Vague headline with no measurable claim | "The better way to work" tells the visitor nothing actionable. No specificity = no trust = no conversion | Headlines like "Streamline your workflow" or "Work smarter" |

---

## Benchmarks

### Conversion Rate Benchmarks
| Metric | Value | Source |
|--------|-------|--------|
| Industry median conversion rate | 6.6% | Genesys Growth 2026 stats |
| SaaS-specific conversion rate | 3.8% (42% below median) | Genesys Growth 2026 stats |
| Top 10% performers | 11.45%+ | Genesys Growth 2026 stats |
| Email traffic conversion | 19.3% (highest channel) | Genesys Growth 2026 stats |
| Paid search conversion | 11.3% | Genesys Growth 2026 stats |
| Desktop vs mobile | 12.1% vs 11.2% (desktop 8% higher) | Genesys Growth 2026 stats |

### Conversion Lift Benchmarks
| Change | Lift | Source |
|--------|------|--------|
| Form fields 11 to 4 | +120% (single highest-impact change) | Lovable guide, Genesys Growth |
| Personalized CTAs | +202% vs generic | Genesys Growth 2026 stats |
| Customer testimonials | +34% | Genesys Growth 2026 stats |
| Video testimonials vs text | +80-86% | Genesys Growth 2026 stats |
| Review integration | Up to +270% | Genesys Growth 2026 stats |
| Video on landing page | +86% | Genesys Growth 2026 stats |
| AI-powered personalization | +40% | Genesys Growth 2026 stats |
| Headline optimization | +27-104% | Lovable guide |
| Chatbot integration | 3-4x higher (17-35% rates) | Genesys Growth 2026 stats |

### Scoring Thresholds (AIDAX-specific)
| Element | Pass | Flag | Fail |
|---------|------|------|------|
| Primary CTA count (distinct actions) | 1 | 2 | 3+ |
| CTA above fold (both viewports) | Yes at both 1440 and 390 | Yes at 1440 only | No |
| Social proof layers | 3+ (logos + quotes + data) | 2 | 0-1 |
| Form fields (waitlist) | 1 | 2 | 3+ |
| Form fields (signup) | 1-2 | 3 | 4+ |
| Friction reducer present | At every CTA | At hero CTA only | None |
| Exit links (waitlist/event) | 0-5 | 6-10 | 11+ |
| Exit links (feature page) | 0-10 | 11-15 | 16+ |
| Specificity (number test) | Hero + 2 sections pass | Hero passes | No sections pass |
| Page load time (mobile 4G) | Under 2.5s | 2.5-4s | Over 4s |

---

## Mobile Patterns

### Mobile Conversion Gaps to Audit
- Desktop converts ~4.8-5.06% vs mobile ~2.49-2.9% -- a 40-51% gap. This gap IS the mobile optimization opportunity
- 83% of landing page traffic is mobile. Optimizing for desktop first is optimizing for the minority
- 53% abandon if load time exceeds 3 seconds on mobile

### Mobile-Specific Review Checklist
- CTA visible without scrolling at 390x844 viewport
- Touch targets minimum 48x48px with 8px spacing between interactive elements
- Single-column form layout (never side-by-side fields on mobile)
- Sticky bottom CTA bar present on scroll
- Hero headline readable without zooming (28px minimum)
- No horizontal scroll at any point
- Context-appropriate mobile keyboards (numeric for phone, email keyboard for email fields)

---

## Accessibility Patterns

### Conversion-Specific A11y (Not Generic WCAG)
- Form errors announced to screen readers via `aria-live` region -- silent errors = invisible conversion blocker for 15%+ of users
- Error summary at form top with anchor links -- users must find errors without visual scanning
- Focus moves to first error field on submission failure -- keyboard users can't hunt for the problem
- "Required" communicated two ways: visual asterisk AND `aria-required` -- color-only indication fails for colorblind users
- CTA buttons use semantic elements (`<button>` or `<a role="button">`) -- div/span buttons are invisible to assistive tech
- Single `<h1>` = hero headline. Screen reader users navigate by heading level. Multiple h1s break the page structure
- Skip link present if navigation exists -- screen reader users should reach the CTA without traversing nav

### Why This Matters for Conversion
- 15-20% of web users have some form of disability
- Inaccessible forms don't just fail WCAG -- they fail conversion for those users
- Legal risk: EAA enforcement began June 2025. Inaccessible landing pages in EU markets are now a compliance risk

---

## Performance Patterns

| Metric | Target | Why It Matters for Conversion |
|--------|--------|-------------------------------|
| LCP | Under 2.5s (aim 1.5s) | Each second of delay costs 7% conversion. 1s vs 5s = 3x difference |
| Page load (mobile 4G) | Under 3s | 53% abandon at 3s+. This is the single biggest mobile conversion killer |
| INP | Under 200ms | Sluggish CTA click response feels broken. Users may double-click or abandon |
| CLS | Under 0.1 | Layout shift under a form or CTA causes misclicks. Misclicks cause rage abandonment |
| Total page weight | Under 500KB initial | Lighter = faster = higher conversion. Every KB is a ms |
| Hero render | Under 1.5s | The hero IS the landing page for 60%+ of visitors who never scroll. If it's slow, they're gone |

---

## Planning Implications

See CODAX supplement for full planning guidance. Key points for AIDAX review:

- Review should happen on BOTH desktop (1440px) and mobile (390px) -- not just desktop
- Conversion review is separate from design review (SOFAX) and copy review (WORDX). AIDAX focuses on: CTA clarity, friction, social proof, form economy, exit links, specificity
- Test with real content, not placeholder. "Lorem ipsum" landing pages cannot be conversion-reviewed
- Check the traffic source assumption: a page designed for email traffic (19.3% expected CR) has different requirements than one designed for paid search (11.3% expected CR)

---

## Checklist

Before passing, verify:

- [ ] Single primary CTA with no equal-weight competitors -- **Verify:** count distinct primary actions, check button styling parity
- [ ] CTA visible above fold at 1440px AND 390px -- **Verify:** screenshot both viewports, CTA must be visible without scroll
- [ ] Social proof ladder: logos + named quotes + metrics -- **Verify:** identify each social proof element and the objection it addresses
- [ ] Friction reducer within 16px of every CTA -- **Verify:** inspect spacing between CTA button and supporting text
- [ ] Form fields at minimum (1 waitlist, 2 signup) -- **Verify:** count input elements in form
- [ ] Hero headline passes number test (specific claim) -- **Verify:** does headline contain a number, comparison, or measurable outcome?
- [ ] Exit links within threshold (5 for campaign, 15 for feature) -- **Verify:** count all non-conversion links
- [ ] Page loads under 3s on mobile 4G -- **Verify:** Lighthouse mobile audit or WebPageTest
- [ ] Form errors accessible (aria-live, aria-invalid, focus management) -- **Verify:** trigger a form error, inspect DOM for ARIA attributes
- [ ] {MANUAL CHECK REQUIRED} -- Social proof uses real data (names, companies, metrics), not placeholders
- [ ] {MANUAL CHECK REQUIRED} -- Friction reducer addresses the actual primary objection for this page type

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
**Consuming worker:** AIDAX
**Worker type:** reviewer
