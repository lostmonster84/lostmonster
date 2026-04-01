# PLANX-SEO-GEO: Search Visibility Execution Blueprint

> **Type:** Execution Framework (PLANX variant)
> **Methodology:** [SEO_GEO_PROMPT.md](../../../docs/SEO_GEO_PROMPT.md)
> **Trigger:** `PLANX: SEO-GEO for [project]`
> **Target:** All milestones complete, 80+ visibility score

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-URL]` | https://lostmonster.io | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
<!-- ONBOARD:END -->

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
- Acceptance: All AI bots can access /sitemap.xml and content pages; Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) remains blocked
- Dependencies: None
- Files: `src/app/robots.ts`

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
# Lost Monster - lostmonster.io

## Purpose
Lost Monster helps people [value proposition].

## Key Pages
- /search - Search with filters
- /about - Company information
- /contact - Contact details

## Contact
Email: [contact email]
Website: https://lostmonster.io
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

#### - [ ] 2.2 WebSite Schema with SearchAction

**Status:** Pending
**Summary:** Enable sitelinks searchbox in SERPs

#### - [ ] 2.3 BreadcrumbList Schema

**Status:** Pending
**Summary:** Add breadcrumb structured data to all pages

#### - [ ] 2.4 FAQPage Schema

**Status:** Pending
**Summary:** Add FAQ schema to pages with Q&A content

#### - [ ] 2.5 Entity-Specific Schema (Projects Pages)

**Status:** Pending
**Summary:** Ensure all Projects pages have complete schema markup

#### - [ ] 2.6 LocalBusiness Schema (if applicable)

**Status:** Pending
**Summary:** Add LocalBusiness schema for physical presence

---

## Milestone 3: On-Page Optimization

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete
> **Reference:** SEO_GEO_PROMPT Part 1, Section 2

### Why This Milestone

On-page elements (titles, descriptions, headers, content structure) directly impact rankings and AI extraction. Optimized content gets cited more.

### Todos

#### - [ ] 3.1 Title Tag Optimization
#### - [ ] 3.2 Meta Description Optimization
#### - [ ] 3.3 Header Hierarchy (H1-H6)
#### - [ ] 3.4 Answer Capsules
#### - [ ] 3.5 Image Optimization

---

## Milestone 4: Content & E-E-A-T

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Todos

#### - [ ] 4.1 About Page with Company Story
#### - [ ] 4.2 Contact Page with Multiple Channels
#### - [ ] 4.3 Trust Signals (Testimonials, Reviews)
#### - [ ] 4.4 Author/Team Pages (if applicable)
#### - [ ] 4.5 Legal Pages (Privacy, Terms)

---

## Milestone 5: Authority Building

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Todos

#### - [ ] 5.1 Backlink Profile Audit
#### - [ ] 5.2 Brand Mention Audit
#### - [ ] 5.3 Directory Submissions
#### - [ ] 5.4 Co-Citation Strategy

---

## Milestone 6: AI Platform Visibility

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Todos

#### - [ ] 6.1 ChatGPT Brand Test
#### - [ ] 6.2 Perplexity Citation Check
#### - [ ] 6.3 Cross-Platform Consistency
#### - [ ] 6.4 AI Citation Optimization

---

## Milestone 7: Measurement & Iteration

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Todos

#### - [ ] 7.1 Google Search Console Setup
#### - [ ] 7.2 Bing Webmaster Tools Setup
#### - [ ] 7.3 AI Citation Tracking Setup
#### - [ ] 7.4 Baseline Metrics Documentation

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
