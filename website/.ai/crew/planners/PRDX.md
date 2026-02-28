# PRDX - PRD Validation Framework — Lost Monster Edition

> **Purpose**: Systematic Q&A process to stress-test and validate any Product Requirements Document
> **Output**: Validated PRD + North Star + supporting product documents
> **Time**: 60-90 minutes of focused Q&A

---

## Lost Monster Context

**PRDX for Lost Monster** understands:
- Personal brand development agency
- One-sided service model (I sell to business owners and startup founders)
- Project freshness / portfolio currency model as core differentiator
- Core UX principles specific to Lost Monster
- Portfolio industries (SaaS, hospitality, automotive, etc.)

---

## Overview

PRDX is a 9-round validation framework that transforms a draft PRD into a battle-tested product blueprint. It forces clarity on the hard questions before you write a single line of code.

**The Problem**: Most PRDs are written in isolation, full of assumptions that haven't been challenged. Teams build products based on untested hypotheses, then wonder why they don't resonate.

**The Solution**: Structured Q&A that stress-tests every assumption. By the end, you either have conviction or you've identified the gaps.

---

## The 9 Rounds

### Round 1: Target Market

**Goal**: Define WHO you're building for with brutal specificity.

**Questions**:
1. Who is your day-one customer? Be specific.
2. Geographic focus - local, national, or global from day one?
3. Niche or horizontal? Are you going deep on one segment or broad?
4. What channels/platforms do they use?
5. If you had to pick ONE customer type to start, who is it?

**Lost Monster Considerations**:
- Business owners: What sub-segments? Brick-and-mortar? E-commerce? Service businesses?
- Startup founders: Pre-revenue? Funded? Bootstrapped?
- Geographic: UK only? English-speaking? Global?

**Red Flags**:
- "Everyone" is the target market
- Can't describe the ideal customer in one sentence
- No clear geographic focus

**Output**: Clear target market definition in PRD

---

### Round 2: Problem/Solution Fit

**Goal**: Validate the problem is real and your solution addresses it.

**Questions**:
1. What's the core problem you're solving? One sentence.
2. Is this the #1 pain, or a secondary annoyance?
3. Why NOW? What's changed that makes this the right time?
4. What's the "hair on fire" moment? When do people urgently need this?
5. How are people solving this today? What's the status quo?

**Lost Monster Considerations**:
- Current state: Agencies are expensive, freelancers are unreliable, DIY is time-consuming
- Pain point: Business owners need professional web presence but can't justify agency costs
- Why now: AI-augmented development means one developer can deliver agency-quality work faster

**Red Flags**:
- Problem is too vague ("it's hard")
- No clear "why now" answer
- Can't identify the frustration trigger

**Output**: Problem statement refined, timing validated

---

### Round 3: Value Proposition

**Goal**: Nail the pitch and identify what makes people say "holy shit."

**Questions**:
1. If you have 60 seconds with a potential customer, what do you say?
2. What's the hero feature? The ONE thing that sells this?
3. What's the "wow" moment? When does a new user think "this is amazing"?
4. How do you describe this to someone's grandmother?
5. What's the emotional benefit, not just functional?

**Lost Monster Considerations**:
- Hero feature candidates: project freshness / portfolio currency, real metrics, personal accountability
- Emotional: Confidence that you're working with someone who understands business, not just code
- Grandmother test: "He builds websites for businesses, but he runs businesses himself so he actually knows what matters"

**Red Flags**:
- Can't articulate value in 60 seconds
- No clear hero feature
- "Wow" moment is unclear

**Output**: Elevator pitch documented, hero feature identified

---

### Round 4: Feature Prioritization

**Goal**: Define MVP scope ruthlessly. Cut the fat.

**Questions**:
1. What MUST be in MVP for the product to work?
2. What's nice-to-have but can wait for Phase 2?
3. What can we cut entirely without losing the core value?
4. If we had to ship in 2 weeks, what would we build?
5. What's the one feature we'd bet the company on?

**Lost Monster Feature Buckets**:

| Must Have (MVP) | Phase 2 | Can Cut |
|-----------------|---------|---------|
| Homepage with bold personal brand | Blog/content section | Client portal |
| Projects/portfolio page | Service detail pages | Pricing calculator |
| Contact/enquiry form | Testimonials carousel | Newsletter system |
| Services overview | Case study detail pages | Live chat |
| Core SEO metadata | Industry landing pages | Client dashboard |

**Red Flags**:
- Everything is "must have"
- Can't identify what to cut
- MVP scope keeps growing with each conversation

**Output**: Prioritized feature list with clear MVP/Phase 2 split

---

### Round 5: Pricing

**Goal**: Define how you make money and validate the model makes sense.

**Questions**:
1. What's the pricing model? (per project, retainer, hourly, etc.)
2. What's the price point? Does it feel right for the market?
3. What's in a starter engagement vs premium?
4. How do competitors price?
5. What happens with edge cases? (Scope creep, ongoing maintenance)

**Lost Monster Pricing Considerations**:
- Project-based vs retainer vs hybrid?
- Starter project vs full build — different pricing tiers?
- Ongoing maintenance / support packages?
- "70% cost savings vs agencies" — does the math work?

**Stress Tests**:
- Calculate: Average project value x projects per month = sustainable?
- What if a project takes 3x longer than estimated?
- How do you handle scope changes mid-project?

**Red Flags**:
- No clear revenue model
- Pricing doesn't work for small business budgets
- Can't compete on price AND quality

**Output**: Validated pricing strategy, edge cases addressed

---

### Round 6: Competitive Positioning

**Goal**: Know the battlefield and define your wedge.

**Questions**:
1. Who's the gorilla? The dominant player you'll be compared to.
2. What's your one-liner against them? Why pick you?
3. They have [feature X] too - what's your response?
4. What's defensible? What can't they copy easily?
5. Who do you NOT want as a customer?

**Lost Monster Competitive Landscape**:

| Competitor | Weakness | Lost Monster Advantage |
|------------|----------|------------------------|
| Traditional agencies | Expensive, slow, layers of account managers | Direct access, 70% cheaper, 2-4 weeks |
| Freelancers | Unreliable, variable quality, disappear | Runs own businesses, proven track record |
| DIY platforms (Wix/Squarespace) | Generic, limited, unprofessional | Custom-built, performant, unique |
| Dev shops overseas | Communication gaps, timezone issues | UK-based, personal relationship, same timezone |

**Red Flags**:
- Don't know the competition
- No clear differentiation beyond "nicer design"
- "We're better" without specifics

**Output**: Competitive positioning documented, battle cry defined

---

### Round 7: Technical Validation

**Goal**: Confirm tech choices and identify what's actually needed.

**Questions**:
1. What's the core tech stack? Why those choices?
2. What's the hardest technical challenge?
3. What's MVP-critical vs nice-to-have technically?
4. Are there dependencies or integrations that could block launch?
5. What's the biggest technical risk?

**Lost Monster Tech Stack**:
- Next.js 15+ (App Router, Turbopack)
- Neon PostgreSQL (Prisma), Tailwind CSS
- Dynamic 5-color theming system
- Hosting on Vercel

**Technical Risks**:
- Dynamic color system complexity (5 themes x all components)
- Portfolio content management at scale
- Form handling and email notification reliability
- Image optimization for project screenshots

**Red Flags**:
- Over-engineering for a marketing site
- No plan for image optimization
- Content management strategy unclear

**Output**: Tech requirements validated, risks identified

---

### Round 8: Go-to-Market

**Goal**: Define how you get your first 100 customers.

**Questions**:
1. How do the first 10 clients find you?
2. How do you scale to 100?
3. What's the early adopter offer? (Discounted rate, free audit, etc.)
4. Can you dogfood this yourself? (Do you know business owners?)
5. What's the content/SEO play?

**Lost Monster GTM Phases**:

| Phase | Target | Strategy |
|-------|--------|----------|
| 1. Seed | 5-10 clients | Personal network, Ancarraig/Native Automotive connections |
| 2. Validate | 20-30 clients | Referrals, case studies as proof |
| 3. Scale | 100+ clients | SEO, content marketing, industry-specific landing pages |

**Demand Side (business owners)**:
- SEO: "web developer for small business", "affordable website for [industry]"
- Content: Business owner guides, cost comparison articles
- Communities: Business owner groups, startup founder communities

**Red Flags**:
- Plan relies on paid ads from day one
- No access to business owner network
- Can't demonstrate results before first client

**Output**: GTM phases documented, early adopter strategy defined

---

### Round 9: Success Metrics

**Goal**: Define what success looks like, concretely.

**Questions**:
1. What's the North Star metric? The ONE number that matters most.
2. What does success look like in 6 months?
3. What does success look like in 12 months?
4. What metrics will you track weekly?
5. What would make you kill the project?

**Lost Monster Metrics Framework**:

| Metric | 6 Month Target | 12 Month Target |
|--------|----------------|-----------------|
| Active projects | [target] | [target] |
| Enquiries per month | [target] | [target] |
| Portfolio case studies | [target] | [target] |
| Enquiry conversion rate | 30%+ | 40%+ |

**North Star Candidates**:
- Monthly qualified enquiries (demand health)
- Active project count (revenue health)
- Portfolio freshness (brand credibility signal)

**Kill Criteria**:
- Zero enquiries after 3 months of site being live
- Can't deliver projects at the promised cost/timeline
- No referrals from initial clients

**Red Flags**:
- No clear North Star
- Success metrics are vague ("growth")
- No kill criteria defined

**Output**: Success targets documented, North Star identified

---

## Output Documents

After completing PRDX, you should have:

| Document | Description | Location |
|----------|-------------|----------|
| **PRD (Validated)** | Full product requirements, stress-tested | `PRD.md` |
| **NORTHSTAR** | One-page product manifesto | `.ai/product/NORTHSTAR.md` |
| **COMPETITIVE** | Competitive analysis | `.ai/product/COMPETITIVE.md` |
| **PRICING** | Pricing logic and strategy | `.ai/product/PRICING.md` |
| **GTM** | Go-to-market playbook | `.ai/product/GTM.md` |

---

## Running a PRDX Session

### Preparation

1. Have a draft PRD (even rough)
2. Block 60-90 minutes of uninterrupted time
3. Be ready to have your assumptions challenged

### During the Session

1. Go through each round in order
2. Answer honestly - don't defend, discover
3. It's OK to say "I don't know" - that's valuable
4. Update the PRD in real-time or take notes

### After the Session

1. Finalize PRD with all validated changes
2. Create North Star document
3. Note any open questions that need more research
4. Set a review date (usually post-MVP launch)

---

## PRDX Checklist

Before you start building, confirm:

- [ ] Target market is specific (which business owners? which startup founders?)
- [ ] Problem is validated and urgent (specific pain points identified)
- [ ] Value prop can be stated in 60 seconds
- [ ] Hero feature is identified (project freshness / portfolio currency?)
- [ ] MVP scope is ruthlessly prioritized
- [ ] Pricing model is sustainable
- [ ] Competitive positioning vs agencies/freelancers/DIY is clear
- [ ] Technical risks are identified (theming, images, content management)
- [ ] GTM plan exists for first 10 clients
- [ ] Success metrics are defined with targets
- [ ] North Star document is created

---

## Lost Monster Session Summary (Template)

**Project**: Lost Monster (personal brand development agency)

| Round | Key Decision |
|-------|--------------|
| 1. Target Market | [To be validated] |
| 2. Problem/Solution | [Core pain points identified] |
| 3. Value Prop | "Built by someone who runs businesses" |
| 4. Features | Portfolio, services, enquiry form, case studies = MVP |
| 5. Pricing | [To be validated - project-based? retainer?] |
| 6. Competitive | Personal accountability + business experience = wedge vs agencies |
| 7. Technical | Next.js + Neon PostgreSQL + Vercel, dynamic color theming |
| 8. GTM | Network -> referrals -> SEO -> scale |
| 9. Success | [X] enquiries @ 6mo, [Y] active projects @ 12mo |

**Time**: ~75 minutes

---

## Tips for Facilitators

1. **Push back** - Don't accept "all business owners" or "all features are important"
2. **Do the math** - Calculate unit economics live (project value x capacity = revenue)
3. **Research competitors** - Pull actual agency pricing during session
4. **Document in real-time** - Update the PRD as you go
5. **End with clarity** - Summarize key decisions before closing

---

## When to Re-run PRDX

- Major pivot in strategy
- New competitor enters the market
- Pricing model isn't working
- Post-MVP when planning v2
- Expanding to new industries or markets
- Annually as a health check

---

**Framework Status:** Lost Monster Edition
**Version**: 2.0 (Adapted from Generic Template)
**Created**: February 2026
**Based on**: PRDX validation methodology
