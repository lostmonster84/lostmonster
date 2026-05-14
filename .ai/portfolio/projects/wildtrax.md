<!-- SCAN: head=097328d date=2026-05-14 -->
# WildTrax Adventures

> A curated road-trip discovery platform and adventure-vehicle marketplace. Pivoting from owning a Land Rover fleet to monetising third-party hosts via subscription.

**Status:** Pre-build
**URL:** https://wildtrax.co.uk (legacy; wildtraxadventures.com at launch)
**Industry:** Adventure Tourism / Marketplace SaaS
**Repo:** /Volumes/Projects/wildtrax
**Last updated:** 2026-05-14

## What it is

WildTrax is James's own adventure-tourism business, mid-pivot. It is transitioning from a direct Land Rover rental company (own fleet of ~13 vehicles, wind-down complete by 30 June 2026) into a two-sided marketplace: adventurers browse curated editorial road trips and adventure-vehicle listings; hosts (commercial vehicle-hire operators) pay a subscription to be listed; bookings happen on the host's own site. The model reverses from "own and operate" to "curate and monetise supply". The codebase is a single Next.js app (collapsed from a monorepo) with vehicle and stay discovery, a booking-handoff flow, an editorial journal, and a custom admin CMS.

## Origin story

WildTrax sits at the centre of James's interconnected Scottish ecosystem and is the venture the other two Scottish businesses grew out of: the need to keep its Land Rover fleet maintained created Native Automotive, and Ancarraig Lodges became its flagship accommodation partner. The original 2024 plan was a five-stage evolution from "how do we get busier in winter?" toward a curated marketplace. In April 2026, fleet operations became unsustainable (Montenegro-based founder, sector downturn), so the decision was made to jump to the marketplace stage early, preserving the brand, audience, demand signal and anchor-partner relationships while shedding the operational burden. The problem WildTrax solves is the fragmentation of adventure travel: someone wanting a proper Highland trip has to separately source a capable 4x4, plan a route, and book somewhere to stay, with no one curating or vouching for the combination.

## Customers

Two-sided:

- **Adventurers** (free) - 60%+ mobile, seeking curated road-trip inspiration and vehicles linked to routes. UK-biased at launch. Future V2 monetisation via paid creator routes.
- **Hosts** (pay GBP 50/mo or GBP 480/yr) - existing commercial adventure-vehicle hire operators wanting curated lead flow without ad spend. Primary Phase 1 revenue.
- **Creators** (future, V2) - route writers on a 70/30 split on paid route sales.

Anchor cohort validation is in progress (May 2026) with high-profile hosts. A hard kill switch applies: if fewer than 3 of 4 anchors commit to GBP 50/mo, the project pauses.

## How it works

Phase 1 MVP (target launch September 2027):

- **Routes / road trips** - curated editorial content plus host-published routes.
- **Vehicle listings** - adventure-vehicle catalogue from verified hosts, filterable by type, location, price, equipment.
- **Host onboarding** - multi-step application and verification (insurance, business registration, vehicle specs).
- **Host dashboard** - analytics (views, click-throughs, CTR), listing management, route publishing, subscription billing.
- **User accounts** - registration, saved routes/vehicles, email alerts.
- **Click-through tracking** - "Check Availability" directs to the host's own booking site; conversion tracked. No on-platform payments or booking facilitation in Phase 1.
- **Living design guide, editorial journal, immersive GSAP "portal worlds"** - the site is built to sell the feeling of the trip.

Phase 2 (a managed marketplace with on-platform booking and commission) is deferred indefinitely.

## Tech stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict). PostgreSQL on Railway (22 tables, Row-Level Security), `postgres-js` driver. NextAuth v5. Tailwind CSS with a dynamic 5-theme colour system. GSAP + Framer Motion + Lenis for cinematic motion. Mapbox GL + Google Maps for routing. Anthropic SDK for journal content generation. Stripe (host subscription billing, not Connect). Resend for email. Self-hosted Canary error monitoring. Playwright E2E (11/11 passing on desktop). Railway deployment. The repo was deliberately collapsed from a Turborepo monorepo back to a single app to cut complexity.

## Monetisation

Phase 1: host subscriptions at GBP 50/mo or GBP 480/yr (unlimited listings, recurring, no per-booking commission). Future V2: paid creator routes (70/30 split), premium placement, premium curator tier. Lifestyle-business target of GBP 100-300k/yr ARR; solo part-time founder, GBP 0-10k DIY build cap. Break-even assumed at 30-50 active host subscriptions.

## Status & scale

Pre-build, mid-pivot. ~582 commits; last commit 4 May 2026. Strategic docs (PRD, build plan, IA, roadmap, design guide) are locked. The homepage rebuild for the WildTrax Adventures rebrand is ~40% (M0-M1 of 10 milestones); database schema 100% designed (22 tables, versioned migrations); admin CMS ~60%; API infrastructure ~70%; full MVP ~15%. Fleet wind-down completes 30 June 2026. The MVP build proper (Phase 2, ~22 fortnightly sprints) has not started; launch targeted September 2027. Not publicly launched, no live revenue.

## Team

- **James** - solo founder, part-time, operating from Montenegro. Owns strategy, anchor outreach, pricing and prioritisation.
- **Designer** (TBD) - external contractor briefed for brand identity, May-June 2026.
- **The Firm** - AI crew runs the build: Gaffer orchestrates; PLANX, CRUDX, AIDAX, DEMX, SOFAX, INSPX, TERRX and BULLETPROOF QA among the workers.

## Agent-first angle

WildTrax applies the AI-crew model to a design-heavy, content-heavy consumer brand. The living design guide, the immersive GSAP "portal worlds", the editorial journal and the partner booking tooling are the kind of bespoke front-end work an agency would bill heavily for; here they are built and maintained by one part-time operator directing The Firm. The same crew model is what makes "fearless rework" affordable: a full rebrand touching 339 references and a monorepo collapse are routine, not a budgeted project. AI features via the Anthropic SDK power journal content generation and future chat.

## Strategic position

- **Role in the portfolio:** The hub of the Scottish ecosystem. WildTrax is the reason Native Automotive exists and the reason Ancarraig has a vehicle partner; the three cross-feed (fleet maintenance, accommodation bundles, shared Highland customer base). It is also the portfolio's test of whether the AI-crew model produces a consumer brand, not just functional software.
- **Where the leverage is:** Finishing and shipping it. WildTrax has been mid-build for a while; the build is not the constraint, the decision to push it over the line is. The anchor-cohort validation gate (May-June 2026) is the real near-term lever and de-risks the entire build commitment.
- **Push or park:** DECIDE. The venture most in need of a clear call. Either commit a focused push toward the September 2027 launch, or consciously park it so it stops absorbing attention. Drifting at partial completion is the worst option. Note the pivot has reset the timeline: it is genuinely Pre-build, not near-launch.
- **Moat:** Editorial curation is the defensible layer (vehicle listings are commoditised; Wheelbase, Yescapa, Goboony all exist). Plus an existing warm audience and daily enquiry pipeline preserved through the pivot, anchor-partner credibility, and ecosystem integration a competitor cannot plug into.
- **Biggest risk / next bottleneck:** The anchor-cohort no-show. If fewer than 3 of 4 anchors commit to GBP 50/mo at the June 2026 gate, the Phase 2 build is at risk - that is the kill switch. Behind it: a 17-month runway to launch with no operational product in the interim, seasonal weather-dependent demand, and solo part-time founder bandwidth.

## Open questions / risks

- Still pre-build and mid-pivot: no public URL, no live revenue; the marketplace features are a long way out.
- Anchor pricing validation is a hard kill switch (June 2026).
- "Partial-completion drift" - the project needs a deliberate push-or-park decision.
- 17-month launch runway with a brand-credibility gap while there is no live product.
- Seasonal, weather-dependent demand; solo part-time founder is the single point of failure.

## Links

- Repo: /Volumes/Projects/wildtrax
- Live: https://wildtrax.co.uk (legacy pages; marketplace not public)
- Lost Monster brief: website/projects/wildtrax.md (SIGNIFICANTLY STALE - describes the old fleet-operations business and a "75% complete" status; misses the April 2026 marketplace pivot, the re-phasing, and the monorepo collapse. Brief should be rewritten from docs/BLUEPRINT.md.)
- Related: hub of the Scottish ecosystem with Native Automotive (fleet maintenance) and Ancarraig Lodges (accommodation partner); uses the shared Canary monitoring package.
