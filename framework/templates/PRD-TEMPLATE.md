# Stayflo - Product Requirements Document (PRD)

> **Version**: 1.0
> **Status**: Draft
> **Last Updated**: January 2025

---

## Executive Summary

**Stayflo** is a white-label digital guest handbook SaaS platform for the hospitality industry. It replaces outdated laminated folders and static PDFs with beautiful, AI-powered digital handbooks that guests actually use.

**Core Value Proposition**: Every hospitality property gets a professional, AI-powered digital guest handbook in minutes - not weeks.

---

## Problem Statement

### The Current State

**For Property Owners/Managers:**
- Guest handbooks are an afterthought (laminated folders, tatty binders)
- Same questions asked repeatedly (WiFi password, check-out time, local restaurants)
- No analytics on what guests actually need help with
- Updating information is painful (reprint everything)
- No way to personalize for different guest types

**For Guests:**
- Information is hard to find or outdated
- Can't search a paper folder
- Have to contact host for simple questions
- No single source of truth
- Mobile-unfriendly PDFs

### The Opportunity

- 660,000+ Airbnb listings in UK alone
- 45,000+ hotels in UK
- Growing "experience economy" demands better guest communication
- Post-COVID digital acceleration in hospitality
- Hosts want to reduce repetitive guest inquiries

---

## Target Users

### Primary: Short-Term Rental Hosts

**Persona: "Sarah the Superhost"**
- Manages 3-10 properties
- Uses Airbnb, VRBO, Booking.com
- Tech-comfortable but time-poor
- Wants professional appearance
- Currently uses: PDF handbook or nothing

**Pain Points:**
- "I answer the same 5 questions every week"
- "My handbook looks unprofessional"
- "Guests don't read it anyway"
- "Updating across multiple properties is a nightmare"

### Secondary: Boutique Hotels & B&Bs

**Persona: "David the B&B Owner"**
- 1 property, 4-12 rooms
- Personal touch is the brand
- Older demographic, less tech-savvy
- Wants to modernize without losing character

### Tertiary: Property Management Companies

**Persona: "PropertyCo"**
- Manages 50-500 properties for owners
- Needs consistency across portfolio
- Wants white-label solution
- Requires multi-user access

---

## Product Vision

### Year 1: Foundation
> "The easiest way to create a beautiful guest handbook"

- Core handbook builder (templates, sections, AI generation)
- QR code distribution
- Basic analytics
- Single property tier + multi-property tier

### Year 2: Intelligence
> "A handbook that learns and improves"

- AI concierge that answers any question
- Analytics-driven content suggestions
- Guest satisfaction correlation
- Integrations (PMS, booking channels)

### Year 3: Platform
> "The guest experience operating system"

- Pre-arrival communication automation
- In-stay messaging
- Review generation
- Marketplace for local experiences

---

## Core Features (MVP)

### 1. Handbook Builder

**Description**: Intuitive interface to create digital handbooks

**Features:**
- Pre-built templates (Lodge, Apartment, Hotel, B&B, Glamping)
- Section library (Welcome, WiFi, Property Guide, Local Area, House Rules, Emergency)
- Rich text editor with image upload
- Property-specific variables (property name, address, codes)
- Preview across devices

**User Stories:**
- As a host, I want to create a handbook in under 30 minutes
- As a host, I want templates so I don't start from scratch
- As a host, I want to add my own photos

### 2. AI Content Generation

**Description**: Generate handbook content from minimal input

**Features:**
- "Describe your property" → Full handbook draft
- Section-by-section AI suggestions
- Tone adjustment (formal, friendly, luxury)
- Local area recommendations auto-generated from location

**User Stories:**
- As a host, I want AI to write my handbook based on basic info
- As a host, I want to adjust the tone to match my brand

### 3. AI Concierge (Guest-Facing)

**Description**: Natural language Q&A for guests

**Features:**
- "What's the WiFi password?" → Instant answer
- "Good restaurants nearby?" → Personalized recommendations
- "What time is check-out?" → Property-specific response
- Escalation to host for unanswered questions

**User Stories:**
- As a guest, I want to ask questions in plain English
- As a guest, I want answers instantly without waiting for host

### 4. Distribution

**Description**: Get the handbook to guests

**Features:**
- Unique URL per property (handbook.stayflo.io/sarah-cottage)
- Custom QR code generation (printable)
- Embed code for existing websites
- SMS/email share links
- Booking confirmation integration (API)

**User Stories:**
- As a host, I want a QR code to print and frame in my property
- As a host, I want to send the link in my welcome message

### 5. Dashboard & Analytics

**Description**: Understand how guests use the handbook

**Features:**
- Views per section
- Most common AI questions
- Unanswered question alerts
- Time on handbook
- Device breakdown

**User Stories:**
- As a host, I want to see what sections guests read most
- As a host, I want to know what questions aren't being answered

---

## Technical Requirements

### Architecture

**Stack:**
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes + tRPC or similar
- **Database**: PostgreSQL (Supabase or PlanetScale)
- **Auth**: Clerk or NextAuth.js
- **AI**: OpenAI GPT-4 / Anthropic Claude
- **Storage**: Cloudflare R2 or AWS S3 (images)
- **Hosting**: Vercel
- **Analytics**: PostHog or Mixpanel

**Multi-Tenancy:**
- Workspace-based isolation
- Custom subdomains per workspace (optional)
- Role-based access (Owner, Editor, Viewer)

### Performance

- Handbook load time: < 2 seconds
- AI response time: < 3 seconds
- 99.9% uptime SLA
- Mobile-first, works offline (PWA)

### Security

- SOC 2 compliance (future)
- GDPR compliant
- Data encryption at rest and in transit
- No guest PII stored unless necessary

---

## Pricing Strategy

### Tier 1: Starter (Free)
- 1 property
- Basic templates
- Stayflo branding on handbook
- Community support
- **Goal**: Acquisition funnel

### Tier 2: Host ($15/month per property)
- Unlimited properties
- All templates
- AI content generation
- Basic analytics
- Remove Stayflo branding
- Email support

### Tier 3: Pro ($29/month per property)
- Everything in Host
- AI Concierge (guest-facing)
- Advanced analytics
- Custom domain
- Priority support
- API access

### Tier 4: Portfolio (Custom)
- 20+ properties
- White-label
- Dedicated account manager
- Custom integrations
- SLA

**Volume Discounts:**
- 5-9 properties: 10% off
- 10-19 properties: 20% off
- 20+ properties: Custom pricing

---

## Success Metrics

### North Star Metric
**Monthly Active Handbooks** (handbooks viewed by at least 1 guest in last 30 days)

### Supporting Metrics

**Acquisition:**
- Sign-ups per week
- Activation rate (create first handbook)
- Time to first handbook

**Engagement:**
- Handbooks per user
- Sections per handbook
- AI questions per handbook

**Retention:**
- Monthly churn rate
- NPS score
- Support ticket volume

**Revenue:**
- MRR (Monthly Recurring Revenue)
- ARPU (Average Revenue Per User)
- LTV:CAC ratio

---

## Go-to-Market Strategy

### Phase 1: Proof of Concept
- Use Ancarraig Lodges as flagship example
- Build case study with metrics
- Soft launch to 10 beta users (friends, network)

### Phase 2: Early Adopter Launch
- Product Hunt launch
- Airbnb host community outreach
- Content marketing (SEO for "digital guest handbook")
- Referral program

### Phase 3: Growth
- Paid acquisition (Google, Facebook)
- Partnerships (PMS integrations, cleaning services)
- Conference presence (Host conferences, VRMA)

---

## Competitive Landscape

### Direct Competitors

| Product | Strength | Weakness |
|---------|----------|----------|
| **Hostaway Guidebook** | PMS integration | Tied to Hostaway |
| **Touch Stay** | Established player | Dated UX, expensive |
| **YourWelcome** | Tablet-first | Hardware dependency |
| **Notion/Google Docs** | Free | No guest features, unprofessional |

### Stayflo Differentiation

1. **AI-first** - Content generation + guest concierge
2. **Beautiful by default** - Premium templates, no design skill needed
3. **Speed** - Handbook in 30 minutes, not 3 hours
4. **Modern UX** - Built for 2025, not 2015

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| AI costs too high | High | Medium | Cache common queries, rate limits |
| Low activation | High | Medium | Onboarding optimization, templates |
| Churn after trial | Medium | High | Value demonstration, engagement emails |
| Competitor copies | Medium | Medium | Move fast, build brand, integrate deeper |
| GDPR/privacy issues | High | Low | Privacy-first design, legal review |

---

## Open Questions

1. **Free tier scope** - How generous to drive adoption without cannibalization?
2. **AI provider** - OpenAI vs Anthropic vs open-source?
3. **White-label priority** - Build early for portfolio clients or later?
4. **Mobile app** - PWA sufficient or native app needed?
5. **Marketplace** - Local experiences integration (Year 2+)?

---

## Appendix

### A. User Research Sources
- Airbnb host forums
- VRMA community discussions
- Direct interviews (TBD)
- Ancarraig Lodges (first-party data)

### B. Technical Debt Considerations
- Start simple, avoid premature optimization
- Build for 100 users first, then 10,000
- Monolith first, microservices later (if ever)

### C. Design Principles
- **Mobile-first**: 70%+ of guests access on phone
- **Scannable**: Guests want quick answers, not reading
- **Brandable**: Must feel like host's property, not generic SaaS
- **Accessible**: WCAG 2.1 AA compliance

---

**Document Owner**: James
**Next Review**: After MVP scope finalization
