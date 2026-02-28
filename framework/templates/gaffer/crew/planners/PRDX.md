# PRDX - PRD Validation Framework — [PROJECT] Edition

> **Purpose**: Systematic Q&A process to stress-test and validate any Product Requirements Document
> **Output**: Validated PRD + North Star + supporting product documents
> **Time**: 60-90 minutes of focused Q&A

---

## [PROJECT] Context

**PRDX for [PROJECT]** understands:
- [PROJECT-DOMAIN] platform
- Two-sided marketplace ([TARGET-USER-B] + [TARGET-USER-A])
- [BUSINESS-LOGIC-KEY] model as core differentiator
- Core UX principles specific to [PROJECT]
- Phase 1 [entity-geo]: [entity-geo-1], [entity-geo-2], [entity-geo-3]

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

**[PROJECT] Considerations**:
- [TARGET-USER-A]: What sub-segments exist? Which is most urgent?
- [TARGET-USER-B]: Independent operators, organizations, large players?
- Geographic: [entity-geo-1] first? All [PROJECT-DOMAIN] coverage?

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

**[PROJECT] Considerations**:
- Current state: What existing solutions exist and what are their shortcomings?
- Pain point: What specific frustrations do [TARGET-USER-A] experience?
- Why now: What market changes create the opportunity?

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

**[PROJECT] Considerations**:
- Hero feature candidates: [BUSINESS-LOGIC-KEY], core differentiating features
- Emotional: Trust, confidence, time saved
- Grandmother test: "It's like [well-known benchmark] but for [PROJECT-DOMAIN], and [key differentiator]"

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

**[PROJECT] Feature Buckets**:

| Must Have (MVP) | Phase 2 | Can Cut |
|-----------------|---------|---------|
| [entity-primary] search + filters | [Feature B] view | Saved searches |
| [entity-primary] detail page | Photo lightbox | Price alerts |
| Enquiry form | Messaging integration | User accounts |
| [TARGET-USER-B] dashboard | [BUSINESS-LOGIC-KEY] automation | Favourites |
| Basic auth | Email notifications | Analytics dashboard |

**Red Flags**:
- Everything is "must have"
- Can't identify what to cut
- MVP scope keeps growing with each conversation

**Output**: Prioritized feature list with clear MVP/Phase 2 split

---

### Round 5: Pricing

**Goal**: Define how you make money and validate the model makes sense.

**Questions**:
1. What's the pricing model? (per [entity-primary], per [TARGET-USER-B], subscription, etc.)
2. What's the price point? Does it feel right for [PROJECT-DOMAIN]?
3. What's in free tier vs paid? What triggers upgrade?
4. How do competitors price?
5. What happens with edge cases? ([entity-tertiary] with 100+ [entity-primary], individual owners)

**[PROJECT] Pricing Considerations**:
- Free launch period to build supply?
- Per-[entity-primary] vs per-[TARGET-USER-B] vs subscription?
- Individual vs [entity-tertiary] - different pricing?
- Featured [entity-primary] as upsell?

**Stress Tests**:
- Calculate: 50 [TARGET-USER-B] × [PRICE]/month = break-even?
- What if [entity-tertiary] want to list 200 [entity-primary]?
- Free tier abuse - [TARGET-USER-B] gaming the system?

**Red Flags**:
- No clear revenue model
- Pricing doesn't work for small independent [TARGET-USER-B]
- Can't compete with free alternatives

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

**[PROJECT] Competitive Landscape**:

| Competitor | Weakness | [PROJECT] Advantage |
|------------|----------|---------------------|
| [Competitor A] | [Weakness A] | [Advantage A] |
| [Competitor B] | [Weakness B] | [Advantage B] |
| [Competitor C] | [Weakness C] | [Advantage C] |
| [Competitor D] | [Weakness D] | [Advantage D] |

**Red Flags**:
- Don't know the [PROJECT-DOMAIN] competition
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

**[PROJECT] Tech Stack**:
- Next.js 15+ (App Router, Turbopack)
- [DATABASE] ([DB-DRIVER]), custom session auth (bcrypt + cookies), [OBJECT-STORAGE]
- Tailwind CSS
- [MAP-SERVICE]
- Hosting platform

**Technical Risks**:
- Map integration complexity
- Storage costs at scale ([OBJECT-STORAGE])
- [BUSINESS-LOGIC-KEY] system automation
- [entity-tertiary] data isolation (custom auth + query-level filtering)

**Red Flags**:
- Over-engineering for MVP (don't need microservices)
- Map provider not chosen
- No plan for image optimization

**Output**: Tech requirements validated, risks identified

---

### Round 8: Go-to-Market

**Goal**: Define how you get your first 100 customers.

**Questions**:
1. How do the first 10 [TARGET-USER-B] find you?
2. How do you scale to 100?
3. What's the early adopter offer? (Free period, etc.)
4. Can you dogfood this yourself? (Do you know [TARGET-USER-B]?)
5. What's the content/SEO play?

**[PROJECT] GTM Phases**:

| Phase | Target | Strategy |
|-------|--------|----------|
| 1. Seed | 5-10 [TARGET-USER-B] | Personal outreach, free forever tier |
| 2. Validate | 20-30 [TARGET-USER-B] | Referrals, early adopter pricing |
| 3. Scale | 100+ [TARGET-USER-B] | SEO, content marketing, partnerships |

**Demand Side ([TARGET-USER-A])**:
- SEO: "[entity-primary] in [entity-geo-1]"
- Content: [TARGET-USER-A] guides, area comparisons
- Communities: Target audience groups, forums

**Red Flags**:
- Plan relies on paid ads from day one
- No access to [TARGET-USER-B] network
- Can't get initial supply without demand (chicken/egg)

**Output**: GTM phases documented, early adopter strategy defined

---

### Round 9: Success Metrics

**Goal**: Define what success looks like, concretely.

**Questions**:
1. What's the North Star metric? The ONE number that matters most.
2. What does success look like in 6 months? ([entity-primary], [TARGET-USER-B], enquiries)
3. What does success look like in 12 months?
4. What metrics will you track weekly?
5. What would make you kill the project?

**[PROJECT] Metrics Framework**:

| Metric | 6 Month Target | 12 Month Target |
|--------|----------------|-----------------|
| Active [entity-primary] | [target] | [target] |
| Verified [TARGET-USER-B] | [target] | [target] |
| Monthly enquiries | [target] | [target] |
| Enquiry response rate | 80%+ | 90%+ |

**North Star Candidates**:
- Monthly enquiries sent (demand health)
- Active [entity-primary] (supply health)
- Enquiry-to-response rate (quality signal)

**Kill Criteria**:
- Can't get [X] [entity-primary] in 3 months
- Zero enquiries after 6 months
- [TARGET-USER-B] churn faster than acquisition

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
| **COMPETITIVE** | [PROJECT-DOMAIN] competitor analysis | `.ai/product/COMPETITIVE.md` |
| **PRICING** | [TARGET-USER-B] pricing logic | `.ai/product/PRICING.md` |
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

- [ ] Target market is specific (which [TARGET-USER-A]? which [TARGET-USER-B]?)
- [ ] Problem is validated and urgent (specific pain points identified)
- [ ] Value prop can be stated in 60 seconds
- [ ] Hero feature is identified ([BUSINESS-LOGIC-KEY]?)
- [ ] MVP scope is ruthlessly prioritized
- [ ] Pricing model is sustainable for [PROJECT-DOMAIN] market
- [ ] Competitive positioning vs alternatives is clear
- [ ] Technical risks are identified (map, storage, auth)
- [ ] GTM plan exists for first 100 [TARGET-USER-B]
- [ ] Success metrics are defined with targets
- [ ] North Star document is created

---

## [PROJECT] Session Summary (Template)

**Project**: [PROJECT] ([PROJECT-DOMAIN])

| Round | Key Decision |
|-------|--------------|
| 1. Target Market | [To be validated] |
| 2. Problem/Solution | [Core pain points identified] |
| 3. Value Prop | "[Key differentiator statement]" |
| 4. Features | [Feature A], [entity-primary], enquiry, [TARGET-USER-B] dashboard = MVP |
| 5. Pricing | [To be validated - free launch? per-[entity-primary]?] |
| 6. Competitive | [Key differentiator] = wedge vs [Competitor A]/[Competitor B] |
| 7. Technical | Next.js + [DATABASE] + [MAP-SERVICE], aggressive caching |
| 8. GTM | Network → referrals → SEO → scale |
| 9. Success | [X] [entity-primary] @ 6mo, [Y] @ 12mo |

**Time**: ~75 minutes

---

## Tips for Facilitators

1. **Push back** - Don't accept "all [TARGET-USER-A]" or "all features are important"
2. **Do the math** - Calculate unit economics live for [PROJECT-DOMAIN] (local currency, local pricing)
3. **Research competitors** - Pull actual competitor data during session
4. **Document in real-time** - Update the PRD as you go
5. **End with clarity** - Summarize key decisions before closing

---

## When to Re-run PRDX

- Major pivot in strategy
- New competitor enters [PROJECT-DOMAIN] market
- Pricing model isn't working
- Post-MVP when planning v2
- Expanding to new [entity-geo] (adjacent markets)
- Annually as a health check

---

**Framework Status:** Generic Template
**Version**: 2.0 (Template Edition)
**Created**: February 2026
**Based on**: PRDX validation methodology
