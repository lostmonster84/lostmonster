# PRDX - PRD Validation Framework

> **Purpose**: Systematic Q&A process to stress-test and validate any Product Requirements Document
> **Output**: Validated PRD + North Star + supporting product documents
> **Time**: 60-90 minutes of focused Q&A

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[HOSTING-PROVIDER]` | Vercel | CLAUDE.md |
| `[STORAGE]` | | |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | CLAUDE.md |
| `[MAP-SERVICE]` | | |
| `[TARGET-USER-A]` | Graduate Grace (21, hospitality grad, non-technical) | CLAUDE.md |
| `[TARGET-USER-B]` | SMB owners and startup founders seeking web development | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**PRDX for Lost Monster** stress-tests product requirements for new features across the website and dashboard. Target users: Graduate Grace (21, hospitality grad, non-technical) as the primary UX benchmark, and SMB owners/startup founders as the business audience.

Lost Monster positions as "framework-driven development that actually works" — 50+ projects, 2-4 week delivery, 70% cost savings. PRDs must align with this positioning and the brand's bold, personal voice.
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

**Red Flags**:
- Problem is too vague
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

**Red Flags**:
- Everything is "must have"
- Can't identify what to cut
- MVP scope keeps growing with each conversation

**Output**: Prioritized feature list with clear MVP/Phase 2 split

---

### Round 5: Pricing

**Goal**: Define how you make money and validate the model makes sense.

**Questions**:
1. What's the pricing model?
2. What's the price point? Does it feel right for the market?
3. What's in free tier vs paid? What triggers upgrade?
4. How do competitors price?
5. What happens with edge cases?

**Red Flags**:
- No clear revenue model
- Pricing doesn't work for target users
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

**Red Flags**:
- Over-engineering for MVP
- Key integration not chosen
- No plan for scaling bottlenecks

**Output**: Tech requirements validated, risks identified

---

### Round 8: Go-to-Market

**Goal**: Define how you get your first 100 customers.

**Questions**:
1. How do the first 10 customers find you?
2. How do you scale to 100?
3. What's the early adopter offer?
4. Can you dogfood this yourself?
5. What's the content/SEO play?

**Red Flags**:
- Plan relies on paid ads from day one
- No access to target user network
- Chicken/egg problem with no solution

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
| **COMPETITIVE** | Competitor analysis | `.ai/product/COMPETITIVE.md` |
| **PRICING** | Pricing logic | `.ai/product/PRICING.md` |
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

- [ ] Target market is specific
- [ ] Problem is validated and urgent
- [ ] Value prop can be stated in 60 seconds
- [ ] Hero feature is identified
- [ ] MVP scope is ruthlessly prioritized
- [ ] Pricing model is sustainable
- [ ] Competitive positioning is clear
- [ ] Technical risks are identified
- [ ] GTM plan exists for first 100 users
- [ ] Success metrics are defined with targets
- [ ] North Star document is created

---

## Session Summary (Template)

**Project**: Lost Monster

| Round | Key Decision |
|-------|--------------|
| 1. Target Market | [To be validated] |
| 2. Problem/Solution | [Key problem] |
| 3. Value Prop | [Hero feature / differentiator] |
| 4. Features | [MVP feature list] |
| 5. Pricing | [Pricing model] |
| 6. Competitive | [Competitive wedge] |
| 7. Technical | [Tech stack + risks] |
| 8. GTM | [Growth strategy] |
| 9. Success | [Targets] |

---

## Tips for Facilitators

1. **Push back** - Don't accept vague answers
2. **Do the math** - Calculate unit economics live
3. **Research competitors** - Pull actual competitor data during session
4. **Document in real-time** - Update the PRD as you go
5. **End with clarity** - Summarize key decisions before closing

---

## When to Re-run PRDX

- Major pivot in strategy
- New competitor enters market
- Pricing model isn't working
- Post-MVP when planning v2
- Expanding to new markets
- Annually as a health check

---

**Framework Status:** Generic
**Version**: 3.0
**Created**: January 2026
