# Stayflo - Product Roadmap & Objectives (PRO)

> **Version**: 1.0
> **Status**: Draft
> **Last Updated**: January 2025

---

## Vision Statement

**In 3 years**: Stayflo is the default way hospitality properties communicate with guests - from pre-arrival to post-stay.

**In 1 year**: Stayflo is the easiest way to create a beautiful, AI-powered guest handbook.

**In 6 months**: Stayflo has 100 paying customers and proven product-market fit.

---

## Strategic Objectives

### O1: Validate Product-Market Fit

**Key Results:**
- [ ] 100 active handbooks (viewed by guests in last 30 days)
- [ ] 50 paying customers
- [ ] NPS score > 40
- [ ] < 10% monthly churn

**Why This Matters:**
Before scaling, we must prove hosts want this and guests use it. Ancarraig is proof of concept, but we need diverse validation.

---

### O2: Build a Product That Sells Itself

**Key Results:**
- [ ] 60% of users create a handbook within first session
- [ ] Time to first handbook < 30 minutes
- [ ] 30% of free users convert to paid
- [ ] 20% of new users come from referrals

**Why This Matters:**
SaaS lives or dies on self-serve. If users can't see value quickly, no amount of marketing saves us.

---

### O3: Establish AI as Core Differentiator

**Key Results:**
- [ ] 80% of users use AI content generation
- [ ] AI Concierge answers 90% of guest questions correctly
- [ ] Average AI response time < 2 seconds
- [ ] "AI" mentioned in 50%+ of positive reviews

**Why This Matters:**
Templates are copyable. AI that actually works is defensible. We're not competing on features, we're competing on magic.

---

### O4: Create a Sustainable Business

**Key Results:**
- [ ] Reach $10K MRR
- [ ] LTV:CAC ratio > 3:1
- [ ] Gross margin > 70%
- [ ] AI costs < 15% of revenue

**Why This Matters:**
Revenue proves value. Margins prove viability. Without both, we're a project not a business.

---

## Roadmap

### Phase 0: Foundation (Now - Week 4)

**Theme**: "Get the bones right"

| Deliverable | Description | Status |
|-------------|-------------|--------|
| Project setup | Next.js 15, auth, database, deployment | Not started |
| Design system | Component library, brand identity | Not started |
| Data model | Properties, handbooks, sections, users | Not started |
| Landing page | stayflo.io marketing site | Not started |

**Exit Criteria:**
- Can create a user account
- Can deploy to production
- Design system documented

---

### Phase 1: MVP Handbook Builder (Weeks 5-10)

**Theme**: "A handbook you're proud to share"

| Deliverable | Description | Priority |
|-------------|-------------|----------|
| Property creation | Add property with basic details | P0 |
| Handbook editor | Rich text sections with ordering | P0 |
| Template library | 3 starter templates (Lodge, Apartment, B&B) | P0 |
| Image upload | Property and section images | P0 |
| Preview mode | See handbook as guest sees it | P0 |
| QR code generation | Downloadable QR for property | P1 |
| Public handbook URL | handbook.stayflo.io/[slug] | P0 |

**Exit Criteria:**
- User can create handbook from template in < 30 minutes
- Handbook looks professional on mobile
- Can share via URL and QR code

---

### Phase 2: AI Content Generation (Weeks 11-14)

**Theme**: "Write my handbook for me"

| Deliverable | Description | Priority |
|-------------|-------------|----------|
| Property onboarding wizard | Guided questions → handbook draft | P0 |
| Section AI generation | "Generate" button per section | P0 |
| Tone selector | Formal, Friendly, Luxury, Quirky | P1 |
| Local area auto-generation | Location → restaurants, attractions | P1 |
| AI edit suggestions | "Improve this section" | P2 |

**Exit Criteria:**
- User can generate full handbook draft in < 10 minutes
- AI content quality rated "good" or better by 80% of users
- Local recommendations are relevant and accurate

---

### Phase 3: Guest Experience & Analytics (Weeks 15-18)

**Theme**: "Know what guests need"

| Deliverable | Description | Priority |
|-------------|-------------|----------|
| Guest handbook UI | Beautiful, mobile-first reading experience | P0 |
| Search within handbook | Find any info quickly | P1 |
| Basic analytics | Views, section popularity | P0 |
| AI Concierge | Chat interface for guest questions | P0 |
| Question logging | Track what guests ask | P1 |
| Unanswered alerts | Notify host of gaps | P2 |

**Exit Criteria:**
- Guests can find any answer in < 30 seconds
- AI answers 85%+ of questions correctly
- Hosts can see which sections are most viewed

---

### Phase 4: Polish & Monetization (Weeks 19-22)

**Theme**: "Worth paying for"

| Deliverable | Description | Priority |
|-------------|-------------|----------|
| Billing integration | Stripe subscription | P0 |
| Tier enforcement | Free vs paid features | P0 |
| Custom branding | Remove Stayflo logo, custom colors | P1 |
| Multi-property management | Dashboard for multiple properties | P0 |
| Team access | Invite editors to properties | P2 |
| Onboarding emails | Activation & engagement sequences | P1 |

**Exit Criteria:**
- Users can pay for Pro features
- Clear value differentiation between tiers
- 30%+ free-to-paid conversion

---

### Phase 5: Growth & Integrations (Weeks 23+)

**Theme**: "Fit into their workflow"

| Deliverable | Description | Priority |
|-------------|-------------|----------|
| PMS integrations | Hostaway, Guesty, Lodgify APIs | P1 |
| Booking channel sync | Auto-send handbook link | P2 |
| Custom domain | yourproperty.com/handbook | P2 |
| API access | Programmatic handbook management | P2 |
| Marketplace | Recommend local experiences | P3 |

**Exit Criteria:**
- At least one PMS integration live
- API documentation published
- 20%+ of users connected to external tools

---

## Feature Prioritization Framework

### P0 - Must Have (MVP)
- Without this, product doesn't work
- Blocks core user journey
- Example: Handbook editor, public URL

### P1 - Should Have (MVP+)
- Significantly improves experience
- High user demand
- Example: QR codes, analytics

### P2 - Nice to Have (Post-MVP)
- Delighters, not essentials
- Competitive parity
- Example: Custom domains, team access

### P3 - Future (Roadmap)
- Strategic bets
- Market expansion
- Example: Marketplace, native app

---

## Key Milestones

| Milestone | Target | Definition of Done |
|-----------|--------|-------------------|
| **Alpha** | Week 6 | First handbook created by internal user |
| **Private Beta** | Week 12 | 10 external beta users with handbooks |
| **Public Beta** | Week 16 | Open sign-ups, free tier live |
| **Launch** | Week 20 | Paid tiers live, Product Hunt launch |
| **PMF Signal** | Week 26 | 50 paying customers, < 10% churn |

---

## Resource Allocation

### Phase 0-2: Build Mode
- 90% product development
- 10% marketing (landing page, waitlist)

### Phase 3-4: Validate Mode
- 70% product development
- 20% customer success
- 10% marketing

### Phase 5+: Growth Mode
- 50% product development
- 25% marketing
- 25% customer success

---

## Risk Register

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI costs explode | High | Medium | Caching, rate limits, model optimization |
| No one pays | Critical | Medium | Early pricing validation, free tier limits |
| Churn too high | High | Medium | Onboarding focus, engagement triggers |
| Competitor launches similar | Medium | High | Move fast, build brand, differentiate on AI |
| Tech debt slows development | Medium | Medium | Refactoring sprints, clean architecture |

---

## Success Criteria by Phase

### End of Phase 1
- [ ] 5 internal test handbooks created
- [ ] Handbook creation time < 45 minutes
- [ ] Mobile experience rated 8+/10

### End of Phase 2
- [ ] AI generates usable content 80% of the time
- [ ] 10 beta users have created handbooks
- [ ] Feedback incorporated into product

### End of Phase 3
- [ ] 50 guest sessions on handbooks
- [ ] AI Concierge accuracy > 85%
- [ ] Analytics dashboard functional

### End of Phase 4
- [ ] First paying customer
- [ ] Stripe billing fully functional
- [ ] < 5 critical bugs in production

### End of Phase 5
- [ ] $10K MRR
- [ ] 50+ paying customers
- [ ] 1 PMS integration live

---

## Decision Log

| Date | Decision | Rationale | Owner |
|------|----------|-----------|-------|
| Jan 2025 | Start with Next.js 15 | Familiarity, Vercel deployment, AI streaming | James |
| Jan 2025 | PostgreSQL over MongoDB | Relational data, Supabase ecosystem | James |
| Jan 2025 | Free tier includes branding | Viral growth > revenue at early stage | James |
| | | | |

---

## Open Questions

1. **Beta pricing?** Discount for early adopters or free → paid transition?
2. **PMS integration priority?** Which integration has most impact?
3. **AI model choice?** OpenAI, Anthropic, or hybrid?
4. **Mobile app timeline?** PWA sufficient for Year 1?
5. **Localization?** English-only or multi-language from start?

---

## Appendix

### A. Competitive Timeline
- Touch Stay: Founded 2014, 10+ years head start
- Hostaway: PMS-first, guidebook secondary
- YourWelcome: Hardware pivot complexity

### B. Market Sizing
- UK short-term rentals: 660,000+ properties
- Addressable (tech-forward hosts): ~200,000
- Target Year 1: 500 customers (0.25%)

### C. Inspiration Products
- Notion (flexibility + templates)
- Intercom (chat + knowledge base)
- Canva (beautiful defaults, easy customization)

---

**Document Owner**: James
**Review Cadence**: Monthly
**Next Review**: February 2025
