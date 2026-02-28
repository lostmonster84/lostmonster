# PLANX-SEO-GEO: Search Visibility Execution Blueprint — Lost Monster Edition

> **Type:** Execution Framework (PLANX variant)
> **Trigger:** `PLANX: SEO-GEO for Lost Monster`
> **Target:** All milestones complete, 80+ visibility score

---

## Overview

Execution blueprint for implementing unified SEO + GEO (AI search optimization) for the Lost Monster website. Converts SEO_GEO_PROMPT audit findings into actionable milestones with specific files, acceptance criteria, and dependencies.

### When to Use

- After running `run SEO_GEO_PROMPT audit on Lost Monster`
- When launching or relaunching the site for search visibility
- When expanding to AI search optimization
- During quarterly SEO/GEO audits

### Workflow

```
SEO_GEO_PROMPT (audit) -> PLANX-SEO-GEO (execute) -> Measure -> Iterate
```

---

## Milestone 1: Technical Foundation

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone

Crawlability is the foundation. If search engines and AI bots can't access your content, nothing else matters. This milestone ensures all crawlers can discover and index the Lost Monster site.

### Todos

#### - [ ] 1.1 Audit & Optimize robots.txt

**Status:** Pending
**Summary:** Configure robots.txt for both traditional and AI crawlers
**Detailed Summary:**
- What: Review robots.txt, add AI bot directives (GPTBot, ClaudeBot, PerplexityBot, GoogleOther)
- Why: AI bots need explicit permission to crawl; blocking them = invisible to AI search
- How: Add User-agent rules allowing AI bots access to content pages
- Acceptance: All AI bots can access /sitemap.xml and content pages; /api/ remains blocked
- Dependencies: None
- Files: `app/robots.ts`

```typescript
// Example AI bot rules to add
{
  userAgent: 'GPTBot',
  allow: '/',
  disallow: ['/api/'],
},
{
  userAgent: 'ClaudeBot',
  allow: '/',
  disallow: ['/api/'],
},
{
  userAgent: 'PerplexityBot',
  allow: '/',
  disallow: ['/api/'],
},
```

#### - [ ] 1.2 Create llms.txt

**Status:** Pending
**Summary:** AI-specific site guide for LLM crawlers
**Detailed Summary:**
- What: Create /llms.txt route with structured site information for AI consumption
- Why: Emerging standard for helping LLMs understand site purpose and key content
- How: Create Next.js route handler returning plain text with site summary
- Acceptance: GET /llms.txt returns parseable guide with site name, purpose, key pages
- Dependencies: None
- Files: `app/llms.txt/route.ts` (NEW)

```typescript
// llms.txt format
export async function GET() {
  const content = `
# Lost Monster - Personal Brand Development Agency

## Purpose
Lost Monster helps business owners and startup founders get professional web presence at 70% less than traditional agencies.

## Key Facts
- Built by someone who runs businesses (not just codes them)
- 50+ projects delivered on time
- 70% cost savings vs traditional agencies
- 2-4 week typical build time
- 4.9/5 client rating from real reviews
- Industries: SaaS, hospitality, automotive, and more

## Key Pages
- /projects - Portfolio with case studies and results
- /services - What I build and how it works
- /contact - Start your project
- /about - My story and background

## Contact
Email: james@lostmonster.dev
Website: https://lostmonster.dev
`
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
```

#### - [ ] 1.3 Optimize XML Sitemap

**Status:** Pending
**Summary:** Ensure sitemap includes all indexable pages with proper priorities
**Detailed Summary:**
- What: Audit sitemap.ts for completeness, add lastmod, changefreq, priority
- Why: Sitemaps guide crawlers to important content efficiently
- How: Review dynamic generation, ensure all public pages included
- Acceptance: Sitemap includes all pages, validates in GSC, proper priorities
- Dependencies: None
- Files: `app/sitemap.ts`

#### - [ ] 1.4 Core Web Vitals Audit

**Status:** Pending
**Summary:** Ensure LCP <2.5s, INP <200ms, CLS <0.1
**Detailed Summary:**
- What: Run PageSpeed Insights, identify and fix performance issues
- Why: Core Web Vitals are ranking factors; slow sites get deprioritized
- How: Analyze with PSI, optimize images, fonts, JS bundles
- Acceptance: Green scores on mobile and desktop in PageSpeed Insights
- Dependencies: None
- Files: Multiple (images, layout, components)

#### - [ ] 1.5 Mobile-First Verification

**Status:** Pending
**Summary:** Confirm mobile version is fully crawlable and functional
**Detailed Summary:**
- What: Test all pages on mobile, check GSC mobile usability report
- Why: Google uses mobile-first indexing; mobile issues = ranking drops
- How: Use Chrome DevTools, GSC Mobile Usability, real device testing
- Acceptance: Zero mobile usability errors in GSC
- Dependencies: None
- Files: Various responsive components

---

## Milestone 2: Schema & Structured Data

> **Status:** Not Started
> **Progress:** 0/6 Todos Complete

### Why This Milestone

Structured data helps search engines and AI understand Lost Monster's content. Schema markup enables rich results, AI extraction, and knowledge graph inclusion.

### Todos

#### - [ ] 2.1 Organization/Person Schema

**Status:** Pending
**Summary:** Add ProfessionalService or Person schema to identify the brand
**Detailed Summary:**
- What: JSON-LD schema with name, description, contact, social profiles
- Why: Establishes entity identity for Knowledge Graph and AI understanding
- How: Add to root layout as JSON-LD script
- Acceptance: Validates in Google Rich Results Test, shows in schema debugger
- Dependencies: None
- Files: `app/layout.tsx`

#### - [ ] 2.2 WebSite Schema with SearchAction

**Status:** Pending
**Summary:** Enable sitelinks searchbox in SERPs
**Detailed Summary:**
- What: WebSite schema with SearchAction pointing to projects/search
- Why: Can trigger sitelinks searchbox, helps Google understand site structure
- How: Add JSON-LD in layout with urlTemplate for search
- Acceptance: Schema validates, searchbox may appear after indexing
- Dependencies: Organization schema
- Files: `app/layout.tsx`

#### - [ ] 2.3 BreadcrumbList Schema

**Status:** Pending
**Summary:** Add breadcrumb structured data to all pages
**Detailed Summary:**
- What: BreadcrumbList schema showing page hierarchy
- Why: Improves SERP display, helps crawlers understand site structure
- How: Generate breadcrumbs based on URL path, add JSON-LD
- Acceptance: Breadcrumbs show in Google SERP previews
- Dependencies: None
- Files: `app/projects/[slug]/page.tsx`, `app/services/[slug]/page.tsx`

#### - [ ] 2.4 FAQPage Schema

**Status:** Pending
**Summary:** Add FAQ schema to pages with Q&A content
**Detailed Summary:**
- What: FAQPage schema for FAQ sections
- Why: Can trigger FAQ rich results, AI extracts Q&A pairs
- How: Identify FAQ content, add JSON-LD with question/answer pairs
- Acceptance: FAQ rich results eligible in GSC
- Dependencies: FAQ content exists
- Files: `app/contact/page.tsx`, `app/about/page.tsx`

#### - [ ] 2.5 Project/Case Study Schema

**Status:** Pending
**Summary:** Ensure all project pages have complete schema
**Detailed Summary:**
- What: CreativeWork or Article schema with project details, results, testimonials
- Why: Rich results for portfolio searches, AI can extract project details
- How: Dynamic schema generation from project data via Prisma
- Acceptance: All project pages have valid schema, test sample in Rich Results
- Dependencies: Project data available
- Files: `app/projects/[slug]/page.tsx`

#### - [ ] 2.6 Service Schema

**Status:** Pending
**Summary:** Add Service schema for each service offered
**Detailed Summary:**
- What: Service schema with description, provider, area served
- Why: Helps search engines understand service offerings, AI can cite specifics
- How: Add to service detail pages with dynamic data
- Acceptance: Service schema validates for all service pages
- Dependencies: Service content exists
- Files: `app/services/[slug]/page.tsx`

---

## Milestone 3: On-Page Optimization

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone

On-page elements (titles, descriptions, headers, content structure) directly impact rankings and AI extraction. Optimized content gets cited more.

### Todos

#### - [ ] 3.1 Title Tag Optimization

**Status:** Pending
**Summary:** Unique, keyword-rich titles for all pages (50-60 chars)
**Detailed Summary:**
- What: Audit all page titles, optimize for primary keywords + brand
- Why: Titles are the strongest on-page signal, affect CTR
- How: Use generateMetadata or static metadata export per page
- Acceptance: All pages have unique titles, no truncation in SERPs
- Dependencies: Keyword research
- Files: All page.tsx files

#### - [ ] 3.2 Meta Description Optimization

**Status:** Pending
**Summary:** Compelling descriptions for all pages (150-160 chars)
**Detailed Summary:**
- What: Unique meta descriptions with CTA and keywords
- Why: Affects CTR, sometimes shown in AI responses
- How: Add description to metadata export per page
- Acceptance: All pages have unique descriptions, include call-to-action
- Dependencies: None
- Files: All page.tsx files

#### - [ ] 3.3 Header Hierarchy (H1-H6)

**Status:** Pending
**Summary:** Proper header structure on all pages
**Detailed Summary:**
- What: Single H1 per page, logical H2->H3 hierarchy
- Why: Helps crawlers understand content structure, accessibility
- How: Audit all pages, fix header tag usage
- Acceptance: Zero H1 issues in SEO audit tools
- Dependencies: None
- Files: All page.tsx files

#### - [ ] 3.4 Answer Capsules

**Status:** Pending
**Summary:** Clear, standalone answers in first 100 words of key pages
**Detailed Summary:**
- What: Structure content so key answer appears immediately
- Why: AI extracts first 100 words for citations; featured snippet opportunity
- How: Rewrite intros to lead with the answer, not context
- Acceptance: Each key page has quotable answer in first paragraph
- Dependencies: None
- Files: Homepage, About, Services, key landing pages

#### - [ ] 3.5 Image Optimization

**Status:** Pending
**Summary:** Alt text, compression, lazy loading for all images
**Detailed Summary:**
- What: Descriptive alt text, WebP/AVIF format, proper sizing via next/image
- Why: Image SEO, accessibility, page speed
- How: Audit all images, add alt text, use Next.js Image optimization
- Acceptance: All images have alt text, Lighthouse image audit passes
- Dependencies: None
- Files: All components with images

---

## Milestone 4: Content & E-E-A-T

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals determine whether Lost Monster's content is cited by AI and ranked by Google. Personal brand sites have a natural E-E-A-T advantage — lean into it.

### Todos

#### - [ ] 4.1 About Page with Personal Story

**Status:** Pending
**Summary:** Comprehensive about page with personal background, business experience
**Detailed Summary:**
- What: About page with personal story, businesses run, philosophy, track record
- Why: E-E-A-T signal — AI needs to understand who Lost Monster is. Personal story is the core differentiator
- How: Create /about with background, experience, values, metrics
- Acceptance: About page answers "Who is behind Lost Monster?" completely, personal voice throughout
- Dependencies: Content written
- Files: `app/about/page.tsx`

#### - [ ] 4.2 Contact Page with Multiple Channels

**Status:** Pending
**Summary:** Contact page with email, enquiry form, FAQ
**Detailed Summary:**
- What: Contact page with form, email, calendar booking link, FAQ
- Why: Trust signal, AI extracts contact info
- How: Create /contact with enquiry form and alternative contact methods
- Acceptance: Contact info extractable by AI, form functional
- Dependencies: None
- Files: `app/contact/page.tsx`

#### - [ ] 4.3 Trust Signals (Testimonials, Metrics)

**Status:** Pending
**Summary:** Display social proof throughout site
**Detailed Summary:**
- What: Testimonials from real clients, metric cards (50+, 70%, 4.9/5, 2-4 wks)
- Why: Builds trust, AI cites sites with social proof. Dave wants proof not jargon
- How: Testimonials on homepage and project pages, metrics strip on key pages
- Acceptance: Homepage displays testimonials with names/companies, metrics always visible
- Dependencies: Testimonial content collected
- Files: Homepage, project pages, contact page

#### - [ ] 4.4 Experience Demonstration

**Status:** Pending
**Summary:** Showcase business ownership experience as E-E-A-T signal
**Detailed Summary:**
- What: Content demonstrating first-hand business experience (Ancarraig, Native Automotive, etc.)
- Why: "Built by someone who runs businesses" is the core brand claim — must be substantiated
- How: Weave business experience into about page, case studies, service descriptions
- Acceptance: Visitor can clearly understand the real-world business experience behind Lost Monster
- Dependencies: Content written
- Files: `app/about/page.tsx`, service pages

#### - [ ] 4.5 Legal Pages (Privacy, Terms)

**Status:** Pending
**Summary:** Complete privacy policy and terms of service
**Detailed Summary:**
- What: Privacy policy, terms of service, cookie policy
- Why: Trust signal, legal requirement
- How: Create/update legal pages
- Acceptance: Legal pages exist, linked from footer
- Dependencies: Legal content
- Files: `app/privacy/page.tsx`, `app/terms/page.tsx`

---

## Milestone 5: Authority Building

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone

Authority (backlinks, brand mentions, citations) determines how trustworthy Lost Monster appears to search engines and AI.

### Todos

#### - [ ] 5.1 Backlink Profile Audit

**Status:** Pending
**Summary:** Analyze current backlinks, identify gaps vs competitors
**Detailed Summary:**
- What: Export backlink data, analyze quality, compare to competitor agencies/freelancers
- Why: Backlinks remain major ranking factor
- How: Use Ahrefs/SEMrush, identify link gap opportunities
- Acceptance: Backlink report with opportunities documented
- Dependencies: Access to SEO tools
- Files: N/A (research task)

#### - [ ] 5.2 Brand Mention Audit

**Status:** Pending
**Summary:** Find unlinked brand mentions for conversion
**Detailed Summary:**
- What: Search for "Lost Monster" or James Munday mentions without links
- Why: Unlinked mentions are easy link wins
- How: Google search, Ahrefs Content Explorer, manual outreach
- Acceptance: List of unlinked mentions with outreach plan
- Dependencies: Brand has some mentions
- Files: N/A (research task)

#### - [ ] 5.3 Directory Submissions

**Status:** Pending
**Summary:** Submit to relevant industry and business directories
**Detailed Summary:**
- What: Submit to web development directories, UK business listings, freelancer directories
- Why: Citations build authority, local SEO benefit
- How: Identify relevant directories, submit consistent business info
- Acceptance: Listed in 10+ relevant directories
- Dependencies: Business information finalized
- Files: N/A (outreach task)

#### - [ ] 5.4 Co-Citation Strategy

**Status:** Pending
**Summary:** Get mentioned alongside competitors in roundups
**Detailed Summary:**
- What: Target "best web developers", "affordable website builders" articles
- Why: Co-citation signals you belong in the conversation
- How: Identify competitor citations, reach out to same publications
- Acceptance: Mentioned in 3+ industry roundups or comparison articles
- Dependencies: Content/PR outreach
- Files: N/A (outreach task)

---

## Milestone 6: AI Platform Visibility

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone

AI search (ChatGPT, Perplexity, Gemini) is where users increasingly start. Being cited in AI responses for "web developer for small business" or "affordable website development" drives high-intent traffic.

### Todos

#### - [ ] 6.1 ChatGPT Brand Test

**Status:** Pending
**Summary:** Test brand visibility in ChatGPT responses
**Detailed Summary:**
- What: Query ChatGPT about web development for small businesses, check for Lost Monster mentions
- Why: Baseline for AI visibility improvement
- How: Test queries like "best affordable web developer UK", "web developer who understands business", document results
- Acceptance: Baseline documented, improvement opportunities identified
- Dependencies: None
- Files: N/A (testing task)

#### - [ ] 6.2 Perplexity Citation Check

**Status:** Pending
**Summary:** Test visibility in Perplexity search results
**Detailed Summary:**
- What: Search Perplexity for relevant queries, check citations
- Why: Perplexity drives 6-10x higher CTR than Google
- How: Test queries, document citation frequency
- Acceptance: Baseline documented with target queries
- Dependencies: None
- Files: N/A (testing task)

#### - [ ] 6.3 Cross-Platform Consistency

**Status:** Pending
**Summary:** Ensure brand representation is consistent across AI platforms
**Detailed Summary:**
- What: Audit Lost Monster brand info across ChatGPT, Perplexity, Gemini, Claude
- Why: Inconsistent info confuses AI models
- How: Query each platform, document discrepancies
- Acceptance: Brand info consistent across platforms
- Dependencies: AI platform tests
- Files: N/A (audit task)

#### - [ ] 6.4 AI Citation Optimization

**Status:** Pending
**Summary:** Optimize content structure for AI extraction
**Detailed Summary:**
- What: Ensure content has answer capsules, structured data, clear facts
- Why: Structured content gets cited more by AI
- How: Review top pages, add answer capsules, fact blocks (50+ projects, 70% savings, etc.)
- Acceptance: Key pages optimized for AI citation
- Dependencies: Content audit
- Files: Key landing pages

---

## Milestone 7: Measurement & Iteration

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone

What gets measured gets improved. Setting up proper tracking enables data-driven optimization.

### Todos

#### - [ ] 7.1 Google Search Console Setup

**Status:** Pending
**Summary:** Verify ownership, submit sitemap, configure alerts
**Detailed Summary:**
- What: Full GSC setup with property verification and sitemap submission
- Why: Primary source of Google search data
- How: Verify via DNS/HTML, submit sitemap, set up email alerts
- Acceptance: GSC showing data, sitemap submitted, alerts configured
- Dependencies: Domain access
- Files: N/A (configuration task)

#### - [ ] 7.2 Bing Webmaster Tools Setup

**Status:** Pending
**Summary:** Configure Bing Webmaster Tools
**Detailed Summary:**
- What: Verify site in Bing, submit sitemap
- Why: Bing powers Copilot, DuckDuckGo, etc.
- How: Import from GSC or verify separately
- Acceptance: Bing WMT showing data
- Dependencies: GSC setup
- Files: N/A (configuration task)

#### - [ ] 7.3 AI Citation Tracking Setup

**Status:** Pending
**Summary:** Establish method for tracking AI mentions
**Detailed Summary:**
- What: Set up regular AI platform queries and tracking
- Why: Need to measure AI visibility improvement
- How: Manual tracking spreadsheet or tool like Otterly.AI
- Acceptance: Tracking system in place, baseline documented
- Dependencies: None
- Files: N/A (process task)

#### - [ ] 7.4 Baseline Metrics Documentation

**Status:** Pending
**Summary:** Document starting metrics for future comparison
**Detailed Summary:**
- What: Record current rankings, traffic, AI citations
- Why: Need baseline to measure improvement
- How: Export GSC data, document AI test results
- Acceptance: Baseline document with all key metrics
- Dependencies: GSC setup, AI tests
- Files: N/A (documentation task)

---

## Completion Criteria

- [ ] All 7 milestones marked complete
- [ ] Technical SEO score: 80+
- [ ] AI Visibility score: 80+
- [ ] Zero critical issues in GSC
- [ ] Core Web Vitals: All green
- [ ] Schema: Zero validation errors
- [ ] Lost Monster mentioned in AI responses for primary queries

---

## Notes & Decisions

*To be filled during execution*

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| [DATE] | Initial creation | Lost Monster SEO/GEO initiative |
