# CODAX Planning Framework — Lost Monster Edition

> **C**ontext - **O**bjective - **D**etails - **A**cceptance
>
> A thinking methodology for planning personal brand development agency features.

---

## Lost Monster Context

**CODAX for Lost Monster** understands:
- Single Next.js marketing site (`app/`)
- Neon PostgreSQL with Prisma (projects, services, testimonials)
- Personal brand development agency terminology (project freshness / portfolio currency, trust signals)
- Portfolio industries (SaaS, hospitality, automotive, etc.)
- PRD principles (core UX rules specific to Lost Monster)

### Brand Compliance Gate

When planning any UI work, CODAX must include brand constraints in the plan output:

- **Reference:** `.ai/LOST-MONSTER-DESIGN-SYSTEM.md` (approved backgrounds, page rhythm, card treatment)
- **Reference:** AI Slop Test (Provenance Rule — every visual element must exist on another Lost Monster page)
- The plan's **Details** section must specify which approved backgrounds each section uses (e.g. `dark gradient backgrounds` page background, `bg-white/5 backdrop-blur-md` glassmorphism cards, `dark base` footer)
- The plan's **Acceptance Criteria** must include: "Passes SOFAX Dimension 11 (Brand Compliance & AI Slop)"
- If the plan introduces a visual pattern that doesn't exist elsewhere on the site, **flag it explicitly for approval** before proceeding
- When planning multiple sections for the same page, verify backgrounds alternate (`dark gradient backgrounds` sections ↔ `bg-white/5` elevated cards). Never specify two adjacent sections with the same background

---

## When to Use CODAX

**Use CODAX for:**
- New personal brand development agency features (portfolio page, services page, case study page)
- Contact/enquiry page sections
- Projects flows (create, edit, showcase)
- Services management features
- Industry-specific landing pages
- Anything touching multiple files

**Skip CODAX for:**
- Simple bug fixes
- Single-file style changes
- Obvious, trivial tasks
- Emergency hotfixes

---

## CODAX for Lost Monster Features

### Light CODAX (Default)

**Think in CODAX dimensions, communicate conversationally:**

> "I see we need to add a portfolio filter to the projects page (context). The goal is to help visitors discover case studies by industry — key for business owners evaluating whether I've solved their kind of problem (objective). I'm thinking a tag-based filter, project cards with results metrics, click-through to full case study, and industry grouping (details). We'll verify it works across mobile/desktop, filters respond instantly, and matches the bold personal brand aesthetic (acceptance). Sound good?"

### Heavy CODAX (When Needed)

Write formal document when:
- User requests detailed plan
- Multiple stakeholders involved
- Major architectural decision
- Future reference needed

---

## Lost Monster CODAX Templates

### Template 1: Portfolio/Projects Page

```markdown
# CODAX Plan: Portfolio Page Enhancement

## C - CONTEXT
**Current State:**
- Projects page: `app/projects/page.tsx`
- API: `app/api/projects/route.ts`
- Filters: industry, tech stack, project type (if existing)
- Missing: case study detail pages, results metrics, testimonial integration

**Lost Monster Context:**
- Portfolio industries: SaaS, hospitality, automotive, etc.
- PRD: Real results speak louder than promises — show metrics
- Design: dynamic accent colour, dark gradient backgrounds
- Mobile-first, business owners-friendly

## O - OBJECTIVE
**Primary Goal:**
Add filterable portfolio with industry tags and results-driven case study cards

**Secondary Goals:**
- Show project outcomes (metrics, timelines, cost savings)
- Link to full case study detail pages
- Display client testimonials inline

**Why This Matters:**
- Business owners want proof, not jargon
- Portfolio is primary trust builder (Dave, 42, wants evidence)
- Differentiates from agencies that show screenshots without context

## D - DETAILS
**Layout:**
```
+-----------------------------------------+
| [Industry Filters]    [Grid/List toggle] |
+-----------------------------------------+
|                                         |
|   Project Cards                         |
|   - Card: Screenshot, title, industry   |
|   - Metrics: timeline, savings, rating  |
|   - Click → full case study             |
|                                         |
+-----------------------------------------+
```

**Implementation:**
- Industry tag filter (SaaS, hospitality, automotive, etc.)
- Project card with glassmorphism treatment (bg-white/5 backdrop-blur-md)
- Results metrics per project (delivery time, cost saving, client rating)
- Click-through to `/projects/[slug]` detail page

**API Changes:**
- GET /api/projects with ?industry= filter param
- Return project with metrics and testimonial data
- Performance: paginate if portfolio grows beyond 20

**Responsive:**
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Single column with swipe hints

## A - ACCEPTANCE
**Success Metrics:**
- Project cards display with real metrics
- Industry filter works instantly (client-side)
- Click-through to case study loads correctly
- 60fps scroll performance
- Works on mobile (iOS Safari, Chrome Android)
- Passes SOFAX Dimension 11 (Brand Compliance & AI Slop)
- Matches bold personal brand aesthetic
```

---

### Template 2: Services Page

```markdown
# CODAX Plan: Services Page

## C - CONTEXT
**Current State:**
- Services may be listed on homepage but lack dedicated page
- No detailed service breakdowns
- Database: services table (Neon PostgreSQL, Prisma)

**Lost Monster Context:**
- Project freshness / portfolio currency model (showcase recent work)
- Personal voice: "I build" not "we offer"
- Results-driven: every service ties back to measurable outcomes

## O - OBJECTIVE
**Primary Goal:**
Complete services page showing what I build, how it works, and what it costs (ballpark)

**Secondary Goals:**
- Show project freshness / portfolio currency status per service area
- Link each service to relevant case studies
- Clear CTA to contact/enquiry page

**Why This Matters:**
- Business owners need to understand what they're buying
- Startup founders want to see the process before committing
- Clear services = fewer unqualified enquiries

## D - DETAILS
**Pages:**
- `/services` - Overview of all service offerings
- `/services/[slug]` - Detailed service page with process, pricing ballpark, related projects

**Service Card Layout:**
| Icon | Title | Description | Starting From | Related Projects | CTA |

**Content per Service:**
- What it is (plain English, no jargon)
- Who it's for (business owners? startup founders?)
- How it works (3-5 step process)
- What you get (deliverables)
- Ballpark timeline & investment
- Related case studies

## A - ACCEPTANCE
**Success Metrics:**
- Each service has clear description in personal voice
- Related projects link correctly
- CTAs drive to contact/enquiry page
- Mobile responsive with dark gradient backgrounds
- Passes SOFAX Dimension 11 (Brand Compliance & AI Slop)
```

---

### Template 3: Contact/Enquiry Page

```markdown
# CODAX Plan: Contact/Enquiry Page

## C - CONTEXT
**Current State:**
- Basic contact info may exist
- No structured enquiry form
- No project brief capture

**Lost Monster Context:**
- Target: business owners and startup founders
- Test persona: Dave, 42, small business owner, wants proof not jargon
- Personal voice: direct, honest, no corporate fluff
- Design: dark gradient backgrounds, glassmorphism form cards

## O - OBJECTIVE
**Primary Goal:**
Create compelling contact page that captures qualified project enquiries with enough context to respond meaningfully

**Secondary Goals:**
- Reduce back-and-forth by capturing project type, budget range, timeline
- Show trust signals (testimonials, metrics) alongside form
- Make it feel personal, not like a corporate contact form

## D - DETAILS
**Page Structure:**
```
+-----------------------------------------+
| Hero: Direct headline + personal intro  |
+-----------------------------------------+
| Enquiry Form (glassmorphism card)       |
| - Name, email, company                  |
| - Project type dropdown                 |
| - Budget range selector                 |
| - Timeline                             |
| - Tell me about your project (textarea)|
+-----------------------------------------+
| Trust signals: metrics + testimonial    |
+-----------------------------------------+
| Alternative: Direct email + calendar    |
+-----------------------------------------+
```

**Route:** `/contact`

**Content:**
- Hero: Personal, direct — "Let's talk about your project"
- Form: Clean, not overwhelming, glassmorphism card
- Trust: Metrics strip + featured testimonial
- Alternative: Email address + booking link for those who prefer

## A - ACCEPTANCE
**Success Metrics:**
- Form submits successfully and sends notification
- Validation works (required fields, email format)
- Mobile responsive
- Personal voice throughout
- Trust signals visible alongside form
- Passes SOFAX Dimension 11 (Brand Compliance & AI Slop)
```

---

## Lost Monster CODAX Checklist

### Context Checklist
- [ ] Which part of the site? (app/ pages, app/api/ routes)
- [ ] Which database tables involved?
- [ ] Current file paths
- [ ] Design system tokens (dynamic accent colour, dark gradient backgrounds, etc.)
- [ ] PRD alignment (core UX rules, project freshness / portfolio currency)

### Objective Checklist
- [ ] Primary goal (one sentence)
- [ ] Why it matters for Lost Monster users (business owners, startup founders)
- [ ] How it supports PRD principles
- [ ] Success looks like what?

### Details Checklist
- [ ] Layout diagram (ASCII)
- [ ] API changes needed
- [ ] Components to build/modify
- [ ] Mobile behavior
- [ ] Form validation requirements
- [ ] Type generation updates

### Acceptance Checklist
- [ ] Functional requirements met
- [ ] Mobile tested
- [ ] Accessibility basics
- [ ] PRD principles upheld
- [ ] Framework scores (AIDAX 80+, SOFAX 93+/110)
- [ ] Brand compliance (SOFAX Dimension 11 — approved backgrounds, page rhythm, AI Slop provenance)

---

## CODAX Communication Style

**Good CODAX summary:**
> "The projects page needs industry filtering (context). Goal: help business owners find relevant case studies since they want proof I've solved their kind of problem (objective). Implementation: tag-based filter, project cards with metrics, click-through to case study detail, industry grouping (details). Done when: filters work instantly, cards show real metrics, matches bold personal brand aesthetic (acceptance)."

**Bad CODAX summary:**
> "We should add filters to the portfolio." (too vague)

---

## Quick Reference

| Lost Monster Entity | Typical CODAX Focus |
|---------------------|---------------------|
| **projects** | CRUD, showcase, metrics, screenshots, case studies |
| **services** | Service pages, process, pricing ballpark, related projects |
| **testimonials** | Display, attribution, linking to projects |
| **industries** | Landing pages, filtering, portfolio grouping |
| **enquiries** | Contact form, project brief capture, notifications |

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 2026
**Version:** 2.0 (Adapted from Generic Template)
