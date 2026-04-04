# AIDAX Framework

> **Marketing & Content Framework for Booking Conversion**
>
> Structure product pages and funnels to maximize booking enquiries through proven psychology.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| [PROJECT] | Lost Monster | CLAUDE.md |
| [BRAND-PRIMARY] | #06B6D4 (teal) | CLAUDE.md |
| [BRAND-BG] | Dark/black backgrounds | CLAUDE.md |
| [BRAND-DARK] | Dark theme with glassmorphism | CLAUDE.md |
| [BRAND-SECONDARY] | #60A5FA (blue) | CLAUDE.md |
| [BRAND-MUTED] | Muted grays/slate | CLAUDE.md |
| [ENTITY-PRIMARY] | Projects | CLAUDE.md |
| [PRODUCT-A] | Website (Next.js marketing site, port 3000) | CLAUDE.md |
| [PRODUCT-B] | Dashboard (Turborepo admin app, port 3001) | CLAUDE.md |
| [PRODUCT-C] | Framework (templates + docs) | CLAUDE.md |
| [DESIGN-GUIDE-PATH] | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**AIDAX for Lost Monster** structures pages and funnels using Attention-Interest-Desire-Action methodology to convert visitors into clients. The website (port 3000) is a personal brand site targeting SMB owners and startup founders seeking premium web development.

Key conversion points: services pages, case study showcases, contact/enquiry forms (with Cloudflare Turnstile CAPTCHA), and the `/demo` page. Design uses bold dark backgrounds, massive typography, and a 5-colour dynamic theme system with teal (#06B6D4) as default.
---

## What is AIDA?

**A**ttention → **I**nterest → **D**esire → **A**ction

A marketing framework for structuring content to guide users from discovery to booking enquiry submission.

---

## AIDA for Product Pages

### A - ATTENTION
*"Make the offering stand out immediately"*

**Purpose:** Hook potential customers in 3 seconds

**Product Elements:**
- Hero photo (real photography — actual Projects in context)
- Clear product name + one-line explanation (what it IS, in plain language)
- Key package details visible (what's included, starting price)
- Available dates indicator (not a wall of unavailability)
- Product type badge (Website (Next.js marketing site, port 3000) / Dashboard (Turborepo admin app, port 3001) / Framework (templates + docs))

**Implementation:**
```
┌─────────────────────────────────────┐
│ [Hero Photo — Projects      │
│  in compelling context]             │
│                                     │
│ Website (Next.js marketing site, port 3000)           From £X/night │
│ Short plain-English description     │
│ Key details · X nights from £XXX    │
│ ✓ Dates available                   │
└─────────────────────────────────────┘
```

**Best Practices:**
- Real photography (not stock imagery)
- Price prominent and clear (from £X/night or total from £X)
- Product type explained in plain English, not just the product name
- Availability signal visible early
- Do not bury what the package actually includes
- Do not use generic stock photos
- Do not omit the "what you get" summary

### I - INTEREST
*"Build interest with context"*

**Purpose:** Keep potential customers engaged with valuable information

**Product Elements:**
- Detailed package contents (exactly what's included)
- Context about the experience (where, what, why)
- Projects highlights relevant to the trip (not full spec sheet)
- What makes this Lost Monster experience different
- Area/domain context (for customers unfamiliar with the offering)

**Implementation:**
```
## What's Included
- Projects (fully equipped)
- Key equipment and gear
- Full briefing + suggestions
- Support during the experience

## Where / What
- Context about the experience location/nature
- What makes this accessible
- Unique access or advantages
```

**Best Practices:**
- Lead with what customers care about (what they CAN do, not just specs)
- Provide context (not just a list of features)
- Explain unfamiliar concepts for newcomers
- Highlight what makes Lost Monster different from competitors
- Do not just list features without context
- Do not assume domain knowledge
- Be honest about limitations

### D - DESIRE
*"Create desire through the experience vision"*

**Purpose:** Make viewers imagine themselves in the experience

**Product Elements:**
- Experience-focused description (the feeling, not just the logistics)
- High-quality photo gallery (in-action shots — not just static product shots)
- Trust signals (maintenance partner, accommodation partner, real customer reviews)
- Social proof (reviews, repeat customers)
- Experience highlights (what they'll remember)

**Implementation:**
```
## Picture Your Experience
Evocative description that paints the experience,
appeals to emotion, and creates desire.

## Trust Signals
├── Maintained by [trusted partner]
├── Quality Projects fleet/inventory
├── Fully equipped — nothing forgotten
└── [Partner name] — accommodation/service partner

## Gallery
[Action shot 1]
[Action shot 2]
[Action shot 3]
[Action shot 4]
[Action shot 5]
```

**Best Practices:**
- Paint the experience, not just the product spec
- Show Projects in use in real conditions
- Trust signals from maintenance/service partners
- Real customer reviews, not generic "5 stars"
- Do not oversell (be honest about demands, conditions)
- Do not use generic descriptions or stock photography
- Do not skip trust signals

### A - ACTION
*"Make booking enquiry effortless"*

**Purpose:** Convert interest into a booking enquiry with zero friction

**Product Elements:**
- Prominent enquiry/booking form (dates, party size, which package)
- Clear next steps (what happens after they submit)
- Multiple contact options (phone for users who won't fill in a form)
- No account required to enquire
- Reassurance that it's not a commitment — just getting in touch

**Implementation:**
```
┌─────────────────────────────────────┐
│ Plan Your Experience                │
│                                     │
│ [Your Name             ]            │
│ [Your Email            ]            │
│ [Your Phone (optional) ]            │
│ [When are you thinking? ]           │
│ [How many people?      ]            │
│ [Tell us more...       ]            │
│                                     │
│ [    Send Enquiry    ]              │
│                                     │
│ Or call us:                         │
│ [phone number]                      │
└─────────────────────────────────────┘

What happens next?
1. We'll reply within 24 hours (usually same day)
2. We'll check availability for your dates
3. No deposit until you're happy to confirm
4. No pressure — just a conversation
```

**Best Practices:**
- Minimal form fields (reduce friction)
- No account/signup required to enquire
- Phone number visible — some users will call rather than submit a form
- Set clear expectations (response time, what confirmation looks like)
- Reassure commitment-phobes — it's just an enquiry
- Do not hide the enquiry form
- Do not require phone number
- Do not make them guess what happens after they click Send

---

## AIDAX Scoring System

**Score each section: 0-25 points per letter**
**Total: 0-100 points**
**Target: 80+ for high-converting product pages**

### Render Gate (Pre-Scoring Qualifier — v2.4 patch)

**AIDAX must ONLY score from rendered output — screenshots or live browser.** If you are asked to score a concept, description, ASCII mockup, or unrendered idea, REFUSE. Say: "I need a screenshot or live page to score. Build it first."

This rule exists because AIDAX scored a nav panel variation 35/40 based on the concept "subtitles + hover preview image." When rendered, the 130px image column was a useless vertical strip. The score was fiction. AIDAX scores reality, not ideas.

**Scoring sequence:**
1. Receive screenshot or live page URL
2. Visually inspect the rendered output
3. Score what you SEE — not what was intended

### Brand Alignment Gate (Pre-Scoring Qualifier)

**Before scoring, the page must pass brand alignment. If it fails, the AIDA score is invalid** — you can't measure conversion of something that doesn't look like the product.

**Brand Alignment:** Does the page feel like Lost Monster? On-brand energy, not generic. Dark/black backgrounds backgrounds, Dark theme with glassmorphism for hero sections, #06B6D4 (teal) CTAs. Consistent with the design guide. If it could belong to any generic competitor, it fails brand alignment.

**Provenance Rule:** Before scoring, verify the page passes the Provenance Rule — every visual element must exist on another Lost Monster page. If a hero section, card treatment, or layout pattern appears nowhere else on the site, it's orphaned and unscored until resolved.

If brand alignment fails, stop. Fix the visual identity first, then re-run AIDAX.

**Page Focus Gate:** Before scoring, verify the page has a single clear purpose. If a page is trying to serve two jobs (e.g. a product listing AND a blog), the AIDA flow is diluted. Flag it: "This page mixes [purpose A] and [purpose B]. Split into separate views before scoring."

### Scoring Criteria

**Attention (0-25 points):**
| Criteria | Points |
|----------|--------|
| Hero photo quality (real, on-brand) | 5 |
| Price clarity and prominence | 5 |
| Package contents summarised above fold | 5 |
| Availability signal visible | 5 |
| Mobile-optimised hero | 5 |

**Interest (0-25 points):**
| Criteria | Points |
|----------|--------|
| Package contents detailed (not just labelled) | 5 |
| Experience context provided | 5 |
| Domain explained for unfamiliar visitors | 5 |
| Unique selling points highlighted | 5 |
| Honest about requirements and conditions | 5 |

**Desire (0-25 points):**
| Criteria | Points |
|----------|--------|
| Experience-focused description (not just specs) | 5 |
| Quality photo gallery (in-action, not static) | 5 |
| Trust signals present (partners, credentials) | 5 |
| Customer reviews or social proof | 5 |
| Experience highlights included | 5 |

**Action (0-25 points):**
| Criteria | Points |
|----------|--------|
| Enquiry form prominent and accessible | 5 |
| Minimal form fields (low friction) | 5 |
| Phone number visible as alternative | 5 |
| Next steps explained clearly | 5 |
| No signup required | 5 |

---

## Page Templates

### Product Detail Page (Website (Next.js marketing site, port 3000) / Dashboard (Turborepo admin app, port 3001) / Framework (templates + docs))

```
1. HERO SECTION (AIDA: Attention)
   - Full-width hero photo (Projects in context)
   - Product name + one-line plain-English explanation
   - Starting price (from £X/night or total from £X)
   - Key package summary (what's included in 5 words)
   - Availability indicator

2. WHAT'S INCLUDED (AIDA: Interest)
   - Projects details (model, capacity, key features)
   - Equipment list (specific, not vague)
   - What's NOT included (honest — users need to know)
   - Suitable for (solo, couples, families, beginners)

3. WHERE / WHAT (AIDA: Interest)
   - Experience context and suggestions
   - Map or overview
   - What you can access that competitors can't
   - Domain context for newcomers

4. THE EXPERIENCE (AIDA: Desire)
   - Lifestyle-focused narrative (the feeling, the freedom)
   - In-action photo gallery
   - "A typical day" — paint the picture

5. TRUST SECTION (AIDA: Desire)
   - Maintenance/service partner credentials
   - Real customer reviews
   - Real photos (actual products, not renders)
   - Partner info (Dashboard (Turborepo admin app, port 3001) only if applicable)

6. BOOKING ENQUIRY (AIDA: Action)
   - Sticky CTA button on mobile
   - Simple enquiry form (name, email, dates, party size, message)
   - Phone number as alternative
   - Next steps explained
   - No commitment language ("just an enquiry")

7. OTHER PRODUCTS (AIDA: Action)
   - Cross-sell the other products
   - Brief description each
   - Keep browsers exploring
```

### Homepage

```
1. HERO (AIDA: Attention)
   - Dramatic Projects imagery in context
   - Tagline / value proposition
   - Product CTAs: Website (Next.js marketing site, port 3000) / Dashboard (Turborepo admin app, port 3001) / Framework (templates + docs)
   - Each with a one-line plain-English explanation

2. PRODUCTS (AIDA: Interest)
   - Website (Next.js marketing site, port 3000): Short description
   - Dashboard (Turborepo admin app, port 3001): Short description
   - Framework (templates + docs): Short description
   - Each with a "From £X" price entry point

3. WHY Lost Monster (AIDA: Interest)
   - Key differentiators
   - Maintenance/service partner credentials
   - Expert knowledge
   - Fully equipped — nothing extra needed

4. THE EXPERIENCE (AIDA: Desire)
   - 4-6 editorial-quality action shots
   - Real customers or lifestyle photography
   - "View all experiences" CTA

5. TRUST (AIDA: Desire)
   - Customer reviews
   - Partner credentials
   - Fleet/inventory credentials

6. CTA (AIDA: Action)
   - Primary action CTA
   - Content/guide links
   - Phone number
```

---

## AIDA Checklist

**For Every Product Page:**

**ATTENTION:**
- [ ] Real hero photo (not stock)
- [ ] Product name + plain-language explanation visible
- [ ] Price (starting from) displayed
- [ ] Package contents summarised above fold
- [ ] Availability signal present

**INTEREST:**
- [ ] Contents detailed (specific, not vague)
- [ ] Experience context provided
- [ ] Domain explained for unfamiliar visitors
- [ ] Honest about requirements and conditions
- [ ] Unique Lost Monster differentiators highlighted

**DESIRE:**
- [ ] Experience-focused description (not just specs)
- [ ] Quality in-action photo gallery (5+ photos)
- [ ] Trust signals present (partners, credentials)
- [ ] Real customer reviews included
- [ ] Experience highlights covered

**ACTION:**
- [ ] Enquiry form prominent
- [ ] Minimal form fields (name, email, dates, message)
- [ ] Phone number visible
- [ ] Next steps explained
- [ ] No signup required

---

## Score Interpretation

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 90-100 | A | Excellent — high enquiry rate expected |
| 80-89 | B | Good — meets target |
| 70-79 | C | Needs improvement |
| 60-69 | D | Significant gaps |
| <60 | F | Major restructure needed |

---

## Conversion Killers (Avoid!)

- "Price on application" or no visible pricing
- Static product-only photos (no experience context)
- No trust signals (who maintains the fleet? who are these people?)
- Complex signup before enquiry
- Hidden phone number (some users will not fill in the form)
- Jargon product names with no plain-language explanation
- No "what happens next" after submitting an enquiry

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| CODAX | Use CODAX to plan new features, AIDAX for content structure |
| SOFAX | AIDAX content + SOFAX design quality = high conversion |
| PIXLX | Verify AIDAX implementation is pixel-perfect |
| NIGELX | AIDAX ensures conversion structure, NIGELX ensures usability |

---

## Quick Reference

### AIDAX Triggers
```
AIDAX: audit Website (Next.js marketing site, port 3000) product page
AIDAX: score homepage conversion
AIDAX: review Dashboard (Turborepo admin app, port 3001) page
AIDAX: score booking enquiry flow
```

### Product Page Must-Haves
1. **Hero**: Real Projects in context
2. **Explanation**: Plain English — what is this product?
3. **Price**: Starting from, clear and visible
4. **Contents**: Specific list of what's included
5. **Trust**: Partner credentials + real reviews
6. **Enquiry**: Simple form + phone number

---

## Checkpoint Mode (INSPX Integration)

When invoked by INSPX during the automated inspection pipeline, AIDAX operates in **Checkpoint Mode** — same AIDA dimensions, same scoring, structured output format.

**What AIDAX receives:**
- Screenshot from Playwright (specific viewport)
- Checkpoint metadata (page name, URL, viewport, focus area)
- Feature context (what was built/changed)

**What AIDAX returns:**

```
AIDAX CHECKPOINT: [Checkpoint Name] ([viewport])
  Attention: X/25  [key observations]
  Interest:  X/25  [key observations]
  Desire:    X/25  [key observations]
  Action:    X/25  [key observations]
  TOTAL: XX/100
  Brand Alignment: PASS | FAIL [reason]
  CRITICAL: [none | list of critical issues]
```

**CRITICAL flag rules:**
- Total score below 60/100 → CRITICAL (Major restructure needed)
- Brand Alignment fails → CRITICAL (fix visual identity first)
- Enquiry form not visible or broken → CRITICAL
- Price hidden or missing → CRITICAL (for product pages)
- No trust signals present → CRITICAL (for conversion pages)

**Non-CRITICAL issues** are logged with severity and recommendations, pipeline continues.

---


---

## Supplements

Before starting work, check for a relevant supplement in `reviewers/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|
| Homepage | `supplements/AIDAX-homepage.md` | 2026-04-03 |
| Landing pages | `supplements/AIDAX-landing-pages.md` | 2026-04-03 |

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 2.4 (Render Gate added, score-from-screenshots-only)
