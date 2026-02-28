# PLANX-SEO-GEO: Search Visibility Execution Blueprint

> **Type:** Execution Framework (PLANX variant)
> **Methodology:** [SEO_GEO_PROMPT.md](../../docs/SEO_GEO_PROMPT.md)
> **Trigger:** `PLANX: SEO-GEO for [project]`
> **Target:** All milestones complete, 80+ visibility score

---

## Overview

Execution blueprint for implementing unified SEO + GEO (AI search optimization). Converts SEO_GEO_PROMPT audit findings into actionable milestones with specific files, acceptance criteria, and dependencies.

### When to Use

- After running `run SEO_GEO_PROMPT audit on [project]`
- When launching a new site that needs search visibility
- When expanding to AI search optimization
- During quarterly SEO/GEO audits

### Workflow

```
SEO_GEO_PROMPT (audit) → PLANX-SEO-GEO (execute) → Measure → Iterate
```

---

## Milestone 1: Technical Foundation

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete
> **Reference:** SEO_GEO_PROMPT Part 1, Section 1

### Why This Milestone

Crawlability is the foundation. If search engines and AI bots can't access your content, nothing else matters. This milestone ensures all crawlers can discover and index your site.

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
- Files: `src/app/robots.ts`

```typescript
// Example AI bot rules to add
{
  userAgent: 'GPTBot',
  allow: '/',
  disallow: ['/api/', '/admin/', '/_next/'],
},
{
  userAgent: 'ClaudeBot',
  allow: '/',
  disallow: ['/api/', '/admin/'],
},
{
  userAgent: 'PerplexityBot',
  allow: '/',
  disallow: ['/api/', '/admin/'],
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
- Files: `src/app/llms.txt/route.ts` (NEW)

```typescript
// llms.txt format
export async function GET() {
  const content = `
# [PROJECT] - [PROJECT-DOMAIN] Platform

## Purpose
[PROJECT] helps people [core value proposition].

## Key Facts
- [Key differentiator statement]
- [Scale/coverage stats]
- [Trust signal]
- Covers: [entity-geo-1], [entity-geo-2], [entity-geo-3], [additional areas]

## Key Pages
- /search - [entity-primary] search with filters
- /about - Company information
- /contact - Contact details
- /for-[TARGET-USER-B] - [TARGET-USER-B] onboarding

## Contact
Email: [contact-email]
Website: [website-url]
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
- Files: `src/app/sitemap.ts`

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
> **Reference:** SEO_GEO_PROMPT Part 1, Section 3

### Why This Milestone

Structured data helps search engines and AI understand your content. Schema markup enables rich results, AI extraction, and knowledge graph inclusion.

### Todos

#### - [ ] 2.1 Organization Schema

**Status:** Pending
**Summary:** Add Organization schema to identify the business
**Detailed Summary:**
- What: JSON-LD Organization schema with name, logo, contact, social profiles
- Why: Establishes entity identity for Knowledge Graph and AI understanding
- How: Add to root layout as JSON-LD script
- Acceptance: Validates in Google Rich Results Test, shows in schema debugger
- Dependencies: None
- Files: `src/app/layout.tsx`

#### - [ ] 2.2 WebSite Schema with SearchAction

**Status:** Pending
**Summary:** Enable sitelinks searchbox in SERPs
**Detailed Summary:**
- What: WebSite schema with SearchAction pointing to search page
- Why: Can trigger sitelinks searchbox, helps Google understand site search
- How: Add JSON-LD in layout with urlTemplate for search
- Acceptance: Schema validates, searchbox may appear after indexing
- Dependencies: Organization schema
- Files: `src/app/layout.tsx`

#### - [ ] 2.3 BreadcrumbList Schema

**Status:** Pending
**Summary:** Add breadcrumb structured data to all pages
**Detailed Summary:**
- What: BreadcrumbList schema showing page hierarchy
- Why: Improves SERP display, helps crawlers understand site structure
- How: Generate breadcrumbs based on URL path, add JSON-LD
- Acceptance: Breadcrumbs show in Google SERP previews
- Dependencies: None
- Files: `src/app/[entity-primary]/[slug]/page.tsx`, `src/app/search/page.tsx`

#### - [ ] 2.4 FAQPage Schema

**Status:** Pending
**Summary:** Add FAQ schema to pages with Q&A content
**Detailed Summary:**
- What: FAQPage schema for FAQ sections
- Why: Can trigger FAQ rich results, AI extracts Q&A pairs
- How: Identify FAQ content, add JSON-LD with question/answer pairs
- Acceptance: FAQ rich results eligible in GSC
- Dependencies: FAQ content exists
- Files: `src/app/contact/page.tsx`, `src/app/about/page.tsx`

#### - [ ] 2.5 [entity-primary] Schema (Detail Pages)

**Status:** Pending
**Summary:** Ensure all [entity-primary] pages have complete schema
**Detailed Summary:**
- What: Appropriate schema type with price, location, features
- Why: Rich results for [PROJECT-DOMAIN] searches, AI can extract [entity-primary] details
- How: Dynamic schema generation from [entity-primary] data
- Acceptance: All [entity-primary] pages have valid schema, test sample in Rich Results
- Dependencies: [entity-primary] data available
- Files: `src/app/[entity-primary]/[slug]/page.tsx`

#### - [ ] 2.6 LocalBusiness Schema (if applicable)

**Status:** Pending
**Summary:** Add LocalBusiness schema for physical presence
**Detailed Summary:**
- What: LocalBusiness schema with address, hours, contact
- Why: Local SEO, Google Maps integration, AI location understanding
- How: Add to about/contact pages with business details
- Acceptance: Business appears in local search results
- Dependencies: Physical address exists
- Files: `src/app/about/page.tsx`, `src/app/contact/page.tsx`

---

## Milestone 3: On-Page Optimization

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete
> **Reference:** SEO_GEO_PROMPT Part 1, Section 2

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
- What: Single H1 per page, logical H2→H3 hierarchy
- Why: Helps crawlers understand content structure, accessibility
- How: Audit all pages, fix header tag usage
- Acceptance: Screaming Frog shows zero H1 issues
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
- Files: Homepage, About, key landing pages

#### - [ ] 3.5 Image Optimization

**Status:** Pending
**Summary:** Alt text, compression, lazy loading for all images
**Detailed Summary:**
- What: Descriptive alt text, WebP/AVIF format, proper sizing
- Why: Image SEO, accessibility, page speed
- How: Audit all images, add alt text, optimize formats
- Acceptance: All images have alt text, Lighthouse image audit passes
- Dependencies: None
- Files: All components with images

---

## Milestone 4: Content & E-E-A-T

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete
> **Reference:** SEO_GEO_PROMPT Part 1, Section 7

### Why This Milestone

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals determine whether your content is cited by AI and ranked by Google.

### Todos

#### - [ ] 4.1 About Page with Company Story

**Status:** Pending
**Summary:** Comprehensive about page with mission, team, history
**Detailed Summary:**
- What: About page with company story, values, team info
- Why: E-E-A-T signal, AI needs to understand who you are
- How: Create /about with mission, values, stats, team
- Acceptance: About page answers "Who is [PROJECT]?" completely
- Dependencies: Company information
- Files: `src/app/about/page.tsx`

#### - [ ] 4.2 Contact Page with Multiple Channels

**Status:** Pending
**Summary:** Contact page with email, location, FAQ
**Detailed Summary:**
- What: Contact page with email, form, coverage info, FAQ
- Why: Trust signal, AI extracts contact info
- How: Create /contact with contact methods and FAQ
- Acceptance: Contact info extractable by AI, form functional
- Dependencies: None
- Files: `src/app/contact/page.tsx`

#### - [ ] 4.3 Trust Signals (Testimonials, Reviews)

**Status:** Pending
**Summary:** Display social proof throughout site
**Detailed Summary:**
- What: Testimonials, review counts, trust badges
- Why: Builds trust, AI cites sites with social proof
- How: Add testimonials to homepage, consider AggregateRating schema
- Acceptance: Homepage displays testimonials with names/locations
- Dependencies: Testimonial content
- Files: Homepage, potentially review schema

#### - [ ] 4.4 Author/Team Pages (if applicable)

**Status:** Pending
**Summary:** Create author pages with credentials
**Detailed Summary:**
- What: Team/author pages with bios, credentials, expertise
- Why: Expertise signal for E-E-A-T
- How: Create /team page or individual author pages
- Acceptance: Authors have visible bios with credentials
- Dependencies: Team information
- Files: `src/app/team/page.tsx` (NEW, if applicable)

#### - [ ] 4.5 Legal Pages (Privacy, Terms)

**Status:** Pending
**Summary:** Complete privacy policy and terms of service
**Detailed Summary:**
- What: Privacy policy, terms of service, cookie policy
- Why: Trust signal, legal requirement
- How: Create/update legal pages
- Acceptance: Legal pages exist, linked from footer
- Dependencies: Legal content
- Files: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

---

## Milestone 5: Authority Building

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete
> **Reference:** SEO_GEO_PROMPT Part 1, Sections 5-6

### Why This Milestone

Authority (backlinks, brand mentions, citations) determines how trustworthy your content appears to search engines and AI.

### Todos

#### - [ ] 5.1 Backlink Profile Audit

**Status:** Pending
**Summary:** Analyze current backlinks, identify gaps vs competitors
**Detailed Summary:**
- What: Export backlink data, analyze quality, compare to competitors
- Why: Backlinks remain major ranking factor
- How: Use Ahrefs/SEMrush, identify link gap opportunities
- Acceptance: Backlink report with opportunities documented
- Dependencies: Access to SEO tools
- Files: N/A (research task)

#### - [ ] 5.2 Brand Mention Audit

**Status:** Pending
**Summary:** Find unlinked brand mentions for conversion
**Detailed Summary:**
- What: Search for brand mentions without links
- Why: Unlinked mentions are easy link wins
- How: Google search, Ahrefs Content Explorer, manual outreach
- Acceptance: List of unlinked mentions with outreach plan
- Dependencies: Brand has some mentions
- Files: N/A (research task)

#### - [ ] 5.3 Directory Submissions

**Status:** Pending
**Summary:** Submit to relevant industry directories
**Detailed Summary:**
- What: Submit to [PROJECT-DOMAIN] directories, local business listings
- Why: Citations build authority, local SEO benefit
- How: Identify relevant directories, submit consistent NAP
- Acceptance: Listed in 10+ relevant directories
- Dependencies: Business information
- Files: N/A (outreach task)

#### - [ ] 5.4 Co-Citation Strategy

**Status:** Pending
**Summary:** Get mentioned alongside competitors in roundups
**Detailed Summary:**
- What: Target "best of" articles, comparison content
- Why: Co-citation signals you belong in the conversation
- How: Identify competitor citations, reach out to same publications
- Acceptance: Mentioned in 3+ industry roundups
- Dependencies: Content/PR outreach
- Files: N/A (outreach task)

---

## Milestone 6: AI Platform Visibility

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete
> **Reference:** SEO_GEO_PROMPT Part 2, Section 13

### Why This Milestone

AI search (ChatGPT, Perplexity, Gemini) is where users increasingly start. Being cited in AI responses drives high-intent traffic.

### Todos

#### - [ ] 6.1 ChatGPT Brand Test

**Status:** Pending
**Summary:** Test brand visibility in ChatGPT responses
**Detailed Summary:**
- What: Query ChatGPT about your niche, check for brand mentions
- Why: Baseline for AI visibility improvement
- How: Test queries like "best [niche] in [location]", document results
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
- What: Audit brand info across ChatGPT, Perplexity, Gemini, Claude
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
- How: Review top pages, add answer capsules, fact blocks
- Acceptance: Key pages optimized for AI citation
- Dependencies: Content audit
- Files: Key landing pages

---

## Milestone 7: Measurement & Iteration

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete
> **Reference:** SEO_GEO_PROMPT Deliverables

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
- [ ] Brand mentioned in AI responses for primary queries

---

## Notes & Decisions

*To be filled during execution*

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| [DATE] | Initial creation | [PROJECT] SEO/GEO initiative |
