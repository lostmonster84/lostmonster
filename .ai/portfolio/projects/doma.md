<!-- SCAN: head=e18d0699 date=2026-05-14 -->
# Doma Montenegro

> The Rightmove of Montenegro: a two-sided property marketplace built from scratch in three months, live with real agents, real listings and real revenue. "If it's listed, it's available."

**Status:** Live
**URL:** https://domamontenegro.com
**Industry:** Real Estate / Marketplace
**Repo:** /Volumes/Projects/doma
**Last updated:** 2026-05-14

## What it is

Doma is Montenegro's first central property portal, a two-sided marketplace connecting international property seekers with verified agents, agencies, landlords and private owners. Three audiences (public seekers, agents, internal ops) are served from a single Next.js deployment. It is the flagship of the portfolio: the largest and most mature codebase, the only venture with real revenue traction, and the technical parent from which shared infrastructure (Canary error monitoring) and the marketplace cold-start playbook propagate to other ventures.

## Origin story

James moved to Montenegro, tried to find a flat, and found the market had no central platform: no Rightmove, no Zoopla, just scattered agency sites, WhatsApp groups and stale Facebook posts with half the listings years out of date. Montenegro's property market is booming (10-15% annual appreciation, heavy expat demand from the UK, Germany, Russia and beyond), but agents had no efficient way to reach international buyers and buyers had no way to search, compare or trust what they saw. The problem was personal, the solution practical: Doma went concept to production in three months and has been live since February 2026.

## Customers

Three sides with deliberately asymmetric economics, the free side creating liquidity and the paid sides creating revenue:

- **Seekers** (free) - international buyers and renters plus locals. "Digital Nomad Dan" (25-40, remote worker, English-speaking, values trust) and "Nigel" (58, British expat, low tech tolerance). Friction kept near zero.
- **Agents and agencies** (core paying customer) - subscriptions, featured placement and display ads to reach seekers, plus a full CRM to work the leads.
- **Private owners** - individuals listing a single property, paying a one-time fee rather than a subscription. A low-commitment on-ramp that widens supply beyond agencies.

## How it works

- **Smart property search** - filter by location, price, bedrooms, furnishing, amenities and pet-friendliness across 7 regions, with map view and 100+ landing pages.
- **Agent dashboard / CRM** - the product agents log into daily: listings CRUD, enquiry inbox, Kanban pipeline (new to contacted to viewing to negotiating to won/lost), team management, performance analytics. This justifies the subscription.
- **Shadow agency system** - the cold-start engine. A scraper pulls listings from 4+ external sites; unclaimed agencies get auto-generated shadow profiles so the marketplace looks full from day one. When a seeker enquires on a scraped listing, the agency gets a "claim your profile" email, converting them with no sales calls. The marketplace sells the agency its own leads back.
- **7-locale auto-translation** - every listing auto-translated via Claude API into EN, Montenegrin, Russian, Ukrainian, German, Turkish and Italian. Agents write once, every buyer reads in their language.
- **Freshness model** - the core moat. Rentals expire after 14 days, sales after 30; agents must actively confirm to renew. Listings with no working images auto-deactivate. A validator enforces 7 hard rules and 6 soft warnings before anything goes live.
- **Multi-channel contact** - email, phone, WhatsApp and Viber, unified per-agency, phone now optional.
- **Superadmin / ops console** - scraper management, agency verification, listing moderation, platform analytics.
- **Automation spine** - 7 scheduled cron jobs (auto-scraping, listing expiry, digests, scheduled content). React Native / Expo mobile app shares the same backend.

## Tech stack

Next.js 15 (App Router) in a Turborepo monorepo, TypeScript (strict), Tailwind CSS. PostgreSQL on Railway with a raw `pg` driver, no ORM (28+ tables, 109 migrations). Cloudflare R2 for images (`cdn.domamontenegro.com`, 23,578+ files). Custom session-based auth (bcrypt + cookies, no third-party OAuth). Stripe (subscriptions + one-time payments), Resend (transactional + digest email), Google Maps. Claude API for translation. Playwright E2E with multiple test projects including a "Nigel" usability project. Self-hosted Canary error monitoring (born in this codebase). Auto-deploys to Railway on push to `main`. Linear for issue tracking.

## Monetisation

Four revenue streams running from day one:

1. **Agency subscriptions** - Free (3 listings) or Pro (~EUR 5/property/month, unlimited + analytics).
2. **Sponsored listings** - Featured (~EUR 15/week) and Premium (~EUR 35/week).
3. **Display advertising** - inline and sidebar placements, ~EUR 50+/month.
4. **Private owner listings** - ~EUR 29 one-time, 30-day active period.

All four are production-wired through Stripe.

## Status & scale

Production, revenue-generating, live since February 2026. Extremely active: 772+ commits, last activity 14 May 2026 (a debt-clearance dayclose). 28+ database tables, 109 migrations, 80+ marketing pages, 45+ documented routes, ~1,550 active scraped listings, 23,578+ images on CDN, 4+ external sources scraped, 7 cron jobs. Recent waves: Viber contact channel, private-lister flow, trusted-agent re-architecture, SEO hardening (7-locale hreflang), and a `/debtloop` autonomous debt-clearance pass. 42+ technical debts tracked openly (Rule 13 debt cap currently being overridden for critical features).

## Team

- **James** - founder, operator, builder.
- **The Firm** - 34-worker AI crew runs delivery under a strict execution contract. Gaffer orchestrates and presents crew sheets for approval; CODAX plans and builds, SOFAX audits design, NIGELX checks usability against the "Nigel Test", TERRX verifies, Frank/Foreman runs the 11-point pre-ship gate. Every commit updates a CHANGELOG.

## Agent-first angle

Doma is the clearest proof of what AI agents unlock. Three things here would be impossible or uneconomic without them: (1) **7-language reach from a one-person team** - Claude API turns one agent's listing into seven localised listings instantly; (2) **a self-seeding, self-converting marketplace** - the shadow-agency scraper solves the two-sided cold-start with no sales team, building both supply and the conversion funnel; (3) **the build itself** - a full marketplace with agent CRM, ops console, 7 crons and a mobile app, zero to live revenue in three months, one person directing The Firm. That compression is the entire thesis, and Doma is where it was first proven on real money.

## Strategic position

- **Role in the portfolio:** The flagship and the proof-of-model. Most mature venture, only one with real revenue traction, technical parent (Canary extracted from it, cold-start playbook reused in HospoJobs). If Doma works, the thesis works.
- **Where the leverage is:** Past the "does it work" stage. Leverage is now almost entirely monetisation conversion: turning ~1,550 scraped shadow agencies and free-tier users into paying Pro subscribers and sponsored-listing buyers. The growth lever is commercial, not technical. Secondary: the Montenegro ecosystem play with GoVozi (shared market, shared Lost Monster DOO entity, shared expat/tourist audience).
- **Push or park:** PUSH, hardest. The only venture with revenue momentum and a defensible moat.
- **Moat:** The freshness discipline ("if it's listed, it's available") is a brand-level differentiator no scattered competitor can match without rebuilding their whole operating model. Combined with scraped-liquidity head start and 7-language reach, a new entrant must rebuild three hard things at once.
- **Biggest risk / next bottleneck:** Shadow-agency conversion is unproven at scale. The whole growth model assumes scraped agencies become paying customers, and that conversion rate decides whether Doma is a real business or a beautiful directory. Behind it: scraper fragility, the legal comfort of auto-creating agency profiles, and single-founder dependency.

## Open questions / risks

- Live traction metrics (paying agencies, listings, weekly enquiries) not yet surfaced in repo docs.
- 42+ tracked technical debts, managed openly but accumulating; Rule 13 debt cap being overridden.
- Scraper / shadow-agency model depends on external sites staying scrapeable and the legal comfort of auto-created profiles.
- Mobile app status unclear (separate codebase, not in main commit history).
- Single-founder dependency: James is operator, builder and the only person who understands the whole system.

## Links

- Repo: /Volumes/Projects/doma
- Live: https://domamontenegro.com
- Lost Monster brief: website/projects/doma.md (verified accurate, no contradictions)
- Lost Monster case study: website/case-studies/doma.md
- Related: Canary extracted from this codebase; HospoJobs reuses the cold-start playbook; shares Montenegro market + Lost Monster DOO entity with GoVozi.
