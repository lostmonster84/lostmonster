# PLANX Framework — Lost Monster Edition

> **Execution Blueprint for Personal Brand Development Agency**
>
> Milestone-based planning for personal brand development agency features with exhaustive todo breakdowns.

---

## Lost Monster Context

**PLANX for Lost Monster** understands:
- Single Next.js marketing site (`app/`)
- Neon PostgreSQL tables via `Prisma` (projects, services, testimonials)
- Personal brand development agency features (portfolio, services, enquiries, case studies)
- Project freshness / portfolio currency model
- Portfolio industries (SaaS, hospitality, automotive, etc.)

---

## The CODAX -> PLANX Pipeline

```
CODAX                             PLANX
+---------------------+           +---------------------+
| WHAT are we         |           | HOW do we execute   |
| building?           |    ->     | it step-by-step?    |
|                     |           |                     |
| - Context           |           | - Milestones        |
| - Objective         |           | - Todos             |
| - Details           |           | - Detailed Summaries|
| - Acceptance        |           | - Dependencies      |
+---------------------+           +---------------------+
     STRATEGY                         EXECUTION
```

---

## When to Use PLANX

### Use PLANX For

- **Personal brand development agency features** requiring 10+ discrete steps
- **Multi-session work** spanning multiple conversations
- **Critical implementations** (portfolio page, services page, case study system)
- **Uncertain scope** needing full discovery upfront

### Skip PLANX For

- Simple bug fixes
- Single-file changes
- Quick UI tweaks
- Already-planned work (CODAX produced detailed steps)

---

## Lost Monster Milestone Templates

### Portfolio/Projects Page

```markdown
## Milestone 1: Database & Types
- [ ] 1.1 Create projects table schema in Prisma
- [ ] 1.2 Add industry, metrics, and slug fields
- [ ] 1.3 Generate TypeScript types from Prisma
- [ ] 1.4 Create seed script with sample projects

## Milestone 2: API Routes
- [ ] 2.1 GET /api/projects (with industry filter)
- [ ] 2.2 GET /api/projects/[slug] (single project detail)
- [ ] 2.3 Add pagination support
- [ ] 2.4 Add sorting (newest first, by industry)

## Milestone 3: Project Card Component
- [ ] 3.1 Build ProjectCard with glassmorphism treatment
- [ ] 3.2 Add metrics display (timeline, savings, rating)
- [ ] 3.3 Build industry tag badges
- [ ] 3.4 Add hover state with accent color border
- [ ] 3.5 Responsive grid layout (1/2/3 columns)

## Milestone 4: Projects Page
- [ ] 4.1 Build /projects page with hero section
- [ ] 4.2 Add industry filter controls
- [ ] 4.3 Implement client-side filtering
- [ ] 4.4 Add "View Case Study" CTA per card
- [ ] 4.5 Personal voice copy ("My Work" not "Our Portfolio")

## Milestone 5: Case Study Detail Page
- [ ] 5.1 Build /projects/[slug] dynamic route
- [ ] 5.2 Hero with project screenshot + key metrics
- [ ] 5.3 Challenge / Solution / Results sections
- [ ] 5.4 Client testimonial integration
- [ ] 5.5 Related projects section
- [ ] 5.6 CTA to contact/enquiry page

## Milestone 6: Quality Audit
- [ ] 6.1 Brand compliance check (dark gradients, dynamic color, personal voice)
- [ ] 6.2 Run SOFAX audit (target 93+/110, including Dimension 11)
- [ ] 6.3 Fix identified issues
- [ ] 6.4 Test across devices and all 5 color themes
```

### Services Page

```markdown
## Milestone 1: Content & Data Structure
- [ ] 1.1 Define services data model in Prisma
- [ ] 1.2 Create service content (plain English, no jargon)
- [ ] 1.3 Link services to related projects
- [ ] 1.4 Generate TypeScript types

## Milestone 2: Services Overview Page
- [ ] 2.1 Build /services page with hero
- [ ] 2.2 Service cards with icon, title, description
- [ ] 2.3 "Starting from" pricing ballpark per service
- [ ] 2.4 CTA per service linking to detail or contact
- [ ] 2.5 Personal voice throughout ("I build" not "We offer")

## Milestone 3: Service Detail Pages
- [ ] 3.1 Build /services/[slug] dynamic route
- [ ] 3.2 What it is (plain English explanation)
- [ ] 3.3 Who it's for (business owners? startup founders?)
- [ ] 3.4 How it works (3-5 step process)
- [ ] 3.5 What you get (deliverables list)
- [ ] 3.6 Related case studies section
- [ ] 3.7 CTA to contact page

## Milestone 4: Quality Audit
- [ ] 4.1 Brand compliance check (approved backgrounds, page rhythm, AI Slop provenance)
- [ ] 4.2 Run SOFAX audit (target 93+/110, including Dimension 11)
- [ ] 4.3 Fix identified issues
- [ ] 4.4 Test all 5 color themes and mobile
```

### Contact/Enquiry System

```markdown
## Milestone 1: Enquiry Infrastructure
- [ ] 1.1 Create enquiries table schema in Prisma
- [ ] 1.2 Define fields: name, email, company, project type, budget range, timeline, message
- [ ] 1.3 Generate TypeScript types
- [ ] 1.4 Set up email notification service

## Milestone 2: Enquiry Form
- [ ] 2.1 Build EnquiryForm component with glassmorphism card
- [ ] 2.2 POST /api/enquiries route with validation
- [ ] 2.3 Email notification on new enquiry
- [ ] 2.4 Success confirmation UI
- [ ] 2.5 Form validation with Zod + React Hook Form

## Milestone 3: Contact Page
- [ ] 3.1 Build /contact page with personal hero
- [ ] 3.2 Enquiry form section (glassmorphism card)
- [ ] 3.3 Trust signals strip (metrics + testimonial)
- [ ] 3.4 Alternative contact methods (email, calendar booking)
- [ ] 3.5 Personal voice copy ("Let's talk" not "Get in touch")

## Milestone 4: Quality Audit
- [ ] 4.1 Brand compliance check
- [ ] 4.2 Form accessibility audit (labels, focus states, error messages)
- [ ] 4.3 Test submission flow end-to-end
- [ ] 4.4 Mobile form UX verification
```

---

## Lost Monster Todo Detailed Summary Template

```markdown
#### - [ ] 3.1 Build ProjectCard component
**Status:** Pending
**Summary:** Card displaying project preview in portfolio grid
**Detailed Summary:**
- What: Create ProjectCard with screenshot, title, industry tags, key metrics
- Why: Core portfolio display, must build trust with business owners
- How: React component using dynamic color system (dynamic accent colour, dark gradient backgrounds)
- Acceptance:
  - Shows project screenshot with Next.js Image optimization
  - Displays industry tag and key metric (e.g. "70% cost saving")
  - Glassmorphism card treatment (bg-white/5 backdrop-blur-md)
  - Responsive across breakpoints
  - Click navigates to /projects/[slug]
- Dependencies: Prisma schema complete, design tokens exist
- Files: app/projects/components/ProjectCard.tsx
```

---

## Lost Monster-Specific Example

**Input:**
```
PLANX: implement portfolio page with case studies
```

**Output:**

```markdown
# PLANX: Portfolio Page with Case Studies

> **Status:** In Progress
> **Created:** [DATE]
> **Overall Progress:** 0/6 Milestones Complete

---

## Overview

Build the projects portfolio page with industry filtering, metrics-driven project cards, and detailed case study pages. Core feature for building trust with business owners and startup founders.

---

## Milestone 1: Database & Content

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
Data model must support rich case studies before we can build the UI. Projects need metrics, screenshots, testimonials, and industry tags.

### Todos

#### - [ ] 1.1 Create projects schema in Prisma
**Status:** Pending
**Summary:** Define project data model with all required fields
**Detailed Summary:**
- What: Prisma schema for projects table with title, slug, industry, description, challenge, solution, results, metrics, screenshots, testimonial_id FK
- Why: Rich case studies need structured data, not just titles and images
- How: Define in Prisma schema, run migration against Neon PostgreSQL
- Acceptance: Schema migrated, all fields available
- Dependencies: Neon PostgreSQL connection configured
- Files: prisma/schema.prisma

#### - [ ] 1.2 Create testimonials schema
**Status:** Pending
**Summary:** Testimonials linked to projects for social proof
**Detailed Summary:**
- What: Prisma schema for testimonials with client name, company, role, quote, rating, project_id
- Why: Dave (42, business owner) wants proof not jargon — real testimonials build trust
- How: Define in Prisma schema alongside projects
- Acceptance: Testimonials linkable to projects via foreign key
- Dependencies: 1.1 complete
- Files: prisma/schema.prisma

#### - [ ] 1.3 Generate TypeScript types
**Status:** Pending
**Summary:** Type-safe project and testimonial data throughout the app
**Detailed Summary:**
- What: Run Prisma generate to create TypeScript types
- Why: Type safety prevents bugs and improves DX
- How: npx prisma generate
- Acceptance: Types importable in all components
- Dependencies: 1.1, 1.2 complete
- Files: Generated by Prisma

#### - [ ] 1.4 Seed sample projects
**Status:** Pending
**Summary:** Realistic test data for development
**Detailed Summary:**
- What: Seed script with 6-8 sample projects across industries
- Why: Can't build UI without data to display
- How: Prisma seed script with realistic project data
- Acceptance: Projects visible via API, cover multiple industries
- Dependencies: 1.1, 1.2 complete
- Files: prisma/seed.ts

---

## Milestone 2: API Routes

> **Status:** Not Started
> **Progress:** 0/3 Todos Complete

### Why This Milestone
API routes serve project data to the frontend. Must support filtering and individual project lookup.

### Todos

#### - [ ] 2.1 GET /api/projects with industry filter
**Status:** Pending
**Summary:** List projects with optional industry filtering
**Detailed Summary:**
- What: API route returning projects, optionally filtered by ?industry= param
- Why: Portfolio page needs filtered data for industry navigation
- How: Prisma query with optional where clause on industry field
- Acceptance: GET /api/projects returns all; GET /api/projects?industry=saas returns filtered
- Dependencies: Database seeded
- Files: app/api/projects/route.ts

#### - [ ] 2.2 GET /api/projects/[slug]
**Status:** Pending
**Summary:** Single project detail with testimonial
**Detailed Summary:**
- What: API route returning full project data with linked testimonial
- Why: Case study detail page needs complete project information
- How: Prisma query with include for testimonial relation
- Acceptance: Returns project with all fields + testimonial data
- Dependencies: 2.1 complete
- Files: app/api/projects/[slug]/route.ts

#### - [ ] 2.3 Add pagination support
**Status:** Pending
**Summary:** Paginate results for growing portfolio
**Detailed Summary:**
- What: Add ?page= and ?limit= params to projects list endpoint
- Why: Portfolio will grow beyond a single page load
- How: Prisma skip/take with total count
- Acceptance: Pagination metadata in response, default 12 per page
- Dependencies: 2.1 complete
- Files: app/api/projects/route.ts

---

## Milestone 3: Project Card Component

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
Project cards are the core visual element of the portfolio. Must build trust instantly with metrics and quality visuals.

### Brand Constraints
- Cards use glassmorphism treatment (bg-white/5 backdrop-blur-md)
- Border uses accent color at 20% opacity
- Backgrounds: dark gradient page, glassmorphism cards — no adjacent same-background sections
- Reference: `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`

### Todos

#### - [ ] 3.1 Build ProjectCard component
**Status:** Pending
**Summary:** Glassmorphism card with screenshot, title, metrics
**Detailed Summary:**
- What: Project card with Next.js Image, title, industry tag, key metric
- Why: First impression of portfolio — must build trust immediately
- How: Glassmorphism card (bg-white/5 backdrop-blur-md), dynamic accent color borders
- Acceptance: Card displays correctly across all 5 color themes, responsive
- Dependencies: Design tokens exist
- Files: app/projects/components/ProjectCard.tsx

#### - [ ] 3.2 Add metrics display
**Status:** Pending
**Summary:** Show key results on each card (timeline, savings)
**Detailed Summary:**
- What: Inline metrics showing delivery time, cost saving, or client rating
- Why: Dave (test persona) wants proof — metrics on cards deliver proof at a glance
- How: Small metric badges within card, accent color highlighting
- Acceptance: At least one metric visible per card
- Dependencies: 3.1 complete
- Files: app/projects/components/ProjectCard.tsx

#### - [ ] 3.3 Add industry tag badges
**Status:** Pending
**Summary:** Visual tag showing project industry
**Detailed Summary:**
- What: Small badge showing "SaaS", "Hospitality", etc.
- Why: Helps visitors find relevant case studies quickly
- How: Pill-shaped badge with accent color background at low opacity
- Acceptance: Tag visible on every card, consistent styling
- Dependencies: 3.1 complete
- Files: app/projects/components/ProjectCard.tsx

#### - [ ] 3.4 Responsive grid layout
**Status:** Pending
**Summary:** 1/2/3 column grid based on viewport
**Detailed Summary:**
- What: Responsive grid — 1 col mobile, 2 col tablet, 3 col desktop
- Why: Portfolio must look great at all sizes, mobile-first
- How: Tailwind grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Acceptance: Grid renders correctly at all breakpoints
- Dependencies: 3.1 complete
- Files: app/projects/page.tsx

---

## Milestone 4: Projects Page

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
The portfolio page is the primary trust-building page. Business owners will judge credibility here.

### Todos

#### - [ ] 4.1 Build page with hero section
**Status:** Pending
**Summary:** Bold hero with personal voice headline
**Detailed Summary:**
- What: Hero section with dark gradient, bold headline ("My Work" or similar), subheadline
- Why: Sets the tone — personal, confident, results-focused
- How: Match existing hero patterns from app/page.tsx, dynamic accent colour
- Acceptance: Hero matches bold personal brand, works across all 5 themes
- Dependencies: Dynamic color system accessible
- Files: app/projects/page.tsx

#### - [ ] 4.2 Add industry filter controls
**Status:** Pending
**Summary:** Tag-based filter buttons for industries
**Detailed Summary:**
- What: Row of filter buttons (All, SaaS, Hospitality, Automotive, etc.)
- Why: Business owners want to see relevant work, not scroll through everything
- How: Client-side filter buttons, accent color on active state
- Acceptance: Filters work instantly, active state uses accent color
- Dependencies: Project data includes industry field
- Files: app/projects/page.tsx

#### - [ ] 4.3 Implement filtered grid
**Status:** Pending
**Summary:** Grid updates when filter is selected
**Detailed Summary:**
- What: Project card grid filtered by selected industry
- Why: Instant feedback builds confidence in the site
- How: Client-side state filtering, smooth transitions
- Acceptance: Filter changes are instant, grid animates smoothly
- Dependencies: 4.2, 3.4 complete
- Files: app/projects/page.tsx

#### - [ ] 4.4 Personal voice copy
**Status:** Pending
**Summary:** All copy in first-person, direct voice
**Detailed Summary:**
- What: Headlines, descriptions, CTAs all in "I" voice
- Why: Lost Monster is a personal brand — "See My Work" not "View Our Portfolio"
- How: Write all copy following voice guidelines in design system
- Acceptance: Zero instances of "we" or corporate language
- Dependencies: None
- Files: app/projects/page.tsx

---

## Milestone 5: Case Study Detail Page

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone
Full case studies are where business owners make their decision. Detailed proof converts browsers to enquiries.

### Todos

#### - [ ] 5.1 Build dynamic route
**Status:** Pending
**Summary:** /projects/[slug] page with server-side data fetching
**Detailed Summary:**
- What: Dynamic Next.js route fetching project by slug
- Why: Each project needs its own URL for sharing and SEO
- How: generateStaticParams for SSG, Prisma query by slug
- Acceptance: All projects accessible via /projects/[slug]
- Dependencies: API routes complete
- Files: app/projects/[slug]/page.tsx

#### - [ ] 5.2 Challenge / Solution / Results layout
**Status:** Pending
**Summary:** Three-section case study structure
**Detailed Summary:**
- What: Challenge (the problem), Solution (what I built), Results (the outcomes)
- Why: Classic case study structure that business owners expect and trust
- How: Alternating sections with dark gradient backgrounds
- Acceptance: All three sections present, readable, personal voice
- Dependencies: 5.1 complete
- Files: app/projects/[slug]/page.tsx

#### - [ ] 5.3 Metrics hero section
**Status:** Pending
**Summary:** Key metrics prominently displayed at top
**Detailed Summary:**
- What: 3-4 key metrics (timeline, cost saving, rating) in glassmorphism cards
- Why: Results first — Dave wants proof before reading the story
- How: Metric card pattern from homepage, accent color icons
- Acceptance: Metrics visible without scrolling on desktop
- Dependencies: 5.1 complete
- Files: app/projects/[slug]/page.tsx

#### - [ ] 5.4 Testimonial integration
**Status:** Pending
**Summary:** Client testimonial displayed within case study
**Detailed Summary:**
- What: Testimonial block with quote, client name, company, role
- Why: Third-party validation is the strongest trust signal
- How: Styled quote block with accent color left border
- Acceptance: Testimonial displays correctly, attributed properly
- Dependencies: Testimonial data linked to project
- Files: app/projects/[slug]/page.tsx

#### - [ ] 5.5 CTA to contact page
**Status:** Pending
**Summary:** Clear next step after reading case study
**Detailed Summary:**
- What: "Start Your Project" CTA section at bottom of case study
- Why: Convert interest into enquiry — don't let them leave without a next step
- How: Full-width CTA section with accent color button, personal copy
- Acceptance: CTA prominent, links to /contact, uses accent color
- Dependencies: Contact page exists
- Files: app/projects/[slug]/page.tsx

---

## Milestone 6: Quality Audit

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
Launch gate — must pass brand compliance, quality frameworks, and AI Slop Test before shipping.

### Todos

#### - [ ] 6.1 Brand compliance check
**Status:** Pending
**Summary:** Verify all UI against Lost Monster brand rules and AI Slop Test
**Detailed Summary:**
- What: Brand compliance audit — backgrounds, page rhythm, visual provenance
- Why: Every shipped page must follow the Design Guide and pass the AI Slop Test
- How: Check all backgrounds from approved list (dark gradient backgrounds, bg-white/5 glassmorphism cards, dark base footer), page rhythm follows dark↔card alternation, no AI slop red flags, every visual element has provenance on an existing Lost Monster page
- Acceptance: All sections use approved backgrounds, page rhythm is correct, no novel visual patterns without explicit approval
- References: `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, AI Slop Test (Provenance Rule), SOFAX Dimension 11
- Dependencies: All UI complete
- Files: N/A (audit)

#### - [ ] 6.2 Run SOFAX audit
**Status:** Pending
**Summary:** Design quality assessment (target 85+)
**Detailed Summary:**
- What: Full SOFAX audit on portfolio pages
- Why: Quality gate per APEX workflow
- How: Score all 11 dimensions (including Dimension 11: Brand Compliance & AI Slop), identify issues
- Acceptance: Score 85+ or issues documented for fixing
- Dependencies: 6.1 complete, all UI complete
- Files: N/A (audit)

#### - [ ] 6.3 Fix audit issues
**Status:** Pending
**Summary:** Address any issues from brand compliance and SOFAX audits
**Detailed Summary:**
- What: Fix typography, spacing, accessibility, brand compliance issues found
- Why: Must meet quality bar before launch
- How: Targeted fixes based on audit findings
- Acceptance: All issues resolved
- Dependencies: 6.1 and 6.2 complete
- Files: Various based on findings

#### - [ ] 6.4 Final verification
**Status:** Pending
**Summary:** Re-run audits and confirm passing
**Detailed Summary:**
- What: Test across all 5 color themes, mobile, and desktop
- Why: Ensure fixes actually resolved issues
- How: Full re-audit + device testing
- Acceptance: Brand compliance confirmed, SOFAX score 93+/110, all 5 color themes verified
- Dependencies: 6.3 complete
- Files: N/A (audit)

---

## Completion Criteria

- [ ] All milestones marked complete
- [ ] All todos checked off
- [ ] Portfolio shows project cards with real metrics
- [ ] Industry filtering works instantly
- [ ] Case study detail pages render correctly
- [ ] Personal voice throughout (zero "we" instances)
- [ ] Mobile responsive across all pages
- [ ] All 5 color themes tested
- [ ] SOFAX score 93+/110

---

## Notes & Decisions

[To be filled during execution]

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| [DATE] | Created plan | Initial PLANX planning |
```

---

## Quick Reference

### PLANX Triggers
```
PLANX: portfolio page with case studies
PLANX: services page with detail pages
PLANX: contact/enquiry system
PLANX: testimonials showcase
PLANX: blog/content section
```

### Depth Guidelines

**Too shallow:** "Build portfolio"
**Too deep:** "Add import on line 3"
**Just right:** "Build ProjectCard component with screenshot, industry tag, key metric"

### Milestone Sizing

- **Target:** 3-8 todos per milestone
- **Total:** 3-7 milestones per feature
- **UI milestones must include:** A "Brand constraints" field specifying approved backgrounds, page rhythm expectations, and any novel visual patterns requiring approval. Reference: `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, AI Slop Test (Provenance Rule)

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 2026
**Version:** 2.0 (Adapted from Generic Template)
