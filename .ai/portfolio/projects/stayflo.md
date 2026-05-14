<!-- SCAN: head=6c25c44 date=2026-05-14 -->
# StayFlo

> Multi-tenant white-label hospitality SaaS: premium marketing site, admin and guest experience for independent operators. "Keep your booking system. Get everything else."

**Status:** Pre-build
**URL:** https://stayflo.io
**Industry:** Hospitality SaaS (multi-tenant)
**Repo:** /Volumes/Projects/stayflo
**Last updated:** 2026-05-14

## What it is

StayFlo is a multi-tenant white-label SaaS that gives an independent hospitality business a premium-quality marketing site, an admin dashboard, lead-capture tools and guest-experience features, without forcing them off the booking system they already use. Each tenant gets a beautiful, mobile-first marketing site (Ancarraig-quality, white-labelled), a custom admin dashboard, enquiry forms / newsletter / waitlists / offers / landing pages, a guest handbook, a custom domain and email infrastructure, all deep-linking into whatever booking engine they already run (Avantio, FreeToBook, SuperControl, Booking.com, custom).

> **Definition drift flagged:** the older Lost Monster brief calls StayFlo an "AI-powered guest handbook SaaS". The repo is authoritative and now defines it as a full white-label hospitality platform, with the guest handbook just one Phase 8 feature of a larger offering. This OVERVIEW reflects the repo.

## Origin story

StayFlo is the productisation of Ancarraig Lodges. Running Ancarraig proved two things: the design quality of its bespoke booking/marketing platform was replicable, and independent hospitality operators are stuck with a bad choice. They can use a generic site builder (WordPress, Squarespace) that looks amateur and does nothing hospitality-specific, or an all-in-one platform (Lodgify, Cloudbeds) that locks them into a proprietary booking engine they may not want. StayFlo's answer is a deliberate, non-negotiable product decision: it does not build a booking engine. Tenants keep their booking system; StayFlo deep-links into it and owns everything else - the marketing, the lead capture, the guest experience, the brand. The problem it solves is that a small operator cannot get an GBP 8k-quality web presence without GBP 8k and a developer, and should not have to switch booking systems to get it. Ancarraig is "Tenant #0", and the migration plan to bring it onto StayFlo already exists.

## Customers

UK independent hospitality operators with 1-30 properties: self-catering operators (Highland lodges, Lake District cottages, coastal cabins), boutique B&Bs and guesthouses, small luxury hotels (sub-30 rooms), holiday-let portfolios, GBP 200k-GBP 2M annual revenue. The buyer is the owner-operator; the end users are their guests, browsing the tenant's marketing site on mobile (~70% of traffic). Target: 50+ paying tenants within 12 months, piloting with James's Highland network first. Out of scope for V1: hotel chains, hostels, campsites, agencies, non-UK markets.

## How it works

Four apps in one monorepo, org-scoped multi-tenancy:

- **`apps/marketing`** (`stayflo.io`) - the prospect-facing site and signup.
- **`apps/web`** (`{slug}.stayflo.io` or custom domain) - the white-labelled tenant marketing sites guests actually visit.
- **`apps/admin`** (`app.stayflo.io`) - the dashboard property managers use for content, media, analytics and lead capture.
- **`apps/hq`** (`hq.stayflo.io`) - internal superadmin, ops and support.

The defining principle is constraint over flexibility. Tenants override colours, fonts, content and photography via theme tokens, but cannot change layout, components or animations. That constraint is what guarantees every tenant site looks like a GBP 5k-8k bespoke build rather than a DIY mess. Features: a premium marketing-site engine, custom admin dashboard, lead capture (enquiries, newsletter, waitlists, offers, landing pages), guest handbook / check-in / local recommendations, email infrastructure, deep-link booking adapters (5 providers at MVP), and custom-domain mapping (Pro+ tier).

## Tech stack

Planned and scoped (Phase 0, not yet built): Next.js 16 (App Router) in a Turbo monorepo, TypeScript, Tailwind CSS 4 + shadcn/ui (ported from the adminpanel project). Railway Postgres (raw SQL via `pg` / `@vercel/postgres`) with org-scoped multi-tenancy and row-level security. Auth is still TBD (Supabase Auth or NextAuth, a week-1 decision). Cloudflare R2 storage, Resend email, Stripe for SaaS subscriptions only (no Stripe Connect, no booking payments). BullMQ on Railway for background jobs. A custom CMS (TipTap rich text + media library). Playwright tests. Linear for issue tracking. Hosted on Railway. Component reuse is planned from Ancarraig (design system), the adminpanel project (shadcn components) and WildTrax patterns.

## Monetisation

SaaS subscriptions via Stripe, three tiers:

- **Starter** - GBP 49/mo, 1-3 properties, GBP 0 setup (DIY).
- **Pro** - GBP 149/mo, up to 10 properties, GBP 500 setup (done-for-you).
- **Premium** - GBP 299/mo, unlimited properties, GBP 1,000 setup (white-glove).

No transaction fees (Lodgify charges 1.9% on bookings). Add-ons for extra properties, newsletter contacts, custom integrations, photography and copywriting. Positioned against WordPress and Squarespace, not Lodgify: the pitch is "looks like an GBP 8k bespoke build, costs GBP 149/mo". Documented projections: Year 1 - 50 tenants, ~GBP 113k cash; Year 3 - 500 tenants, ~GBP 1.05M.

## Status & scale

Pre-launch, Phase 0 (Foundation). 1 commit (the initial product + engineering plan, 26 April 2026). The codebase is not started: the repo contains documentation only - 15 substantial strategy/engineering docs (PRD, ARCHITECTURE, ROADMAP, GTM, PRICING, SCHEMA, BOOKING-ADAPTERS, ONBOARDING-FLOW, CUSTOM-DOMAINS, THEMING, ANCARRAIG-MIGRATION). The monorepo scaffold has not been built. Several decisions are still open (auth provider, ORM strategy, default theme strategy). Ancarraig is the planned Tenant #0.

## Team

- **James** - founder, builder. Building StayFlo because Ancarraig proved the design quality is replicable.
- **The Firm** - AI crew (v3.18) runs delivery: Gaffer orchestrates; SOFAX enforces the design system, CODAX builds, NIGELX on usability copy, TERRX on testing, Foreman the pre-ship gate. A project-specific "slop-test" guards against generic AI-template aesthetics.

## Agent-first angle

StayFlo is a bet that the AI-crew model makes a premium white-label platform viable at budget pricing. The whole value proposition - "GBP 8k-quality site for GBP 149/mo" - only works if building and maintaining a constrained, opinionated, four-app multi-tenant platform is cheap, and that is exactly what The Firm crew enables. It also leans hard on reuse over rebuild: StayFlo is explicitly assembled from components and patterns already proven in Ancarraig, Doma, WildTrax and the adminpanel project - the crew's institutional memory across the whole portfolio is the real asset. Per-tenant onboarding (theme tokens, content, custom domains) is designed to be largely self-serve or DFY-light, so the agent model also keeps the cost-to-serve low as tenant count grows.

## Strategic position

- **Role in the portfolio:** The compounding bet. StayFlo is where the portfolio turns in on itself - it productises Ancarraig and is built from the reusable parts of Doma, WildTrax and adminpanel. If it works, it proves the portfolio is not nine separate efforts but an accumulating asset base where each venture makes the next one cheaper.
- **Where the leverage is:** StayFlo is Phase 0, so the leverage is the build plus the pilot loop. Two things de-risk it fastest: getting Ancarraig live as Tenant #0 (a real, demanding tenant the team already controls), and a tight pilot with James's Highland network. The reuse strategy means the build should be faster than a cold start - that assumption is the thing to prove early.
- **Push or park:** HOLD / SEQUENCE. StayFlo is the most strategically valuable long-horizon bet, but it is the earliest-stage venture in the portfolio. It should not jump the queue ahead of ventures closer to revenue (Evidis, Doma). Sequence it deliberately: let it follow the ventures that can fund attention, rather than competing with them for it now.
- **Moat:** Design quality at a price point competitors cannot match (enabled by the AI-crew cost structure), the "keep your booking system" wedge that removes the biggest switching objection, and portfolio reuse that makes StayFlo cheaper to build and run than any standalone competitor's equivalent.
- **Biggest risk / next bottleneck:** It is the earliest-stage venture - nothing is live, and multi-tenancy, custom domains and SSL at scale are genuinely hard infrastructure. The core product risk: does the default design quality translate beyond Ancarraig (Highland self-catering) to boutique B&Bs and coastal properties? If not, the differentiation collapses. Behind that: a crowded adjacent market and a go-to-market that depends, for now, on James's personal Highland network.

## Open questions / risks

- Earliest-stage venture: Phase 0, nothing live, no tenants, 1 commit.
- Multi-tenancy, custom domains and SSL at scale are hard infrastructure problems.
- Open decisions: auth provider, ORM strategy, default theme strategy (all week-1 calls).
- Does the default theme translate beyond Ancarraig? Mitigated by a Phase 1 success gate (test 2-3 mock tenants in different verticals).
- Go-to-market depends on James's Highland network for the pilot, unproven beyond that.
- Scope discipline: the product broadened from "guest handbook" to a full platform; must avoid accidentally building a booking engine.

## Links

- Repo: /Volumes/Projects/stayflo
- Live: https://stayflo.io (domain target, not yet live)
- Docs: docs/ (PRD, ARCHITECTURE, ROADMAP, GTM, PRICING, ANCARRAIG-MIGRATION)
- Lost Monster brief: website/projects/stayflo.md (STALE - calls StayFlo an "AI-powered guest handbook SaaS"; the repo is authoritative and defines a full multi-tenant white-label platform. Brief should be rewritten.)
- Lost Monster case study: none
- Related: productisation of the Ancarraig Lodges platform; Ancarraig is planned Tenant #0; reuses components from Doma, WildTrax and the adminpanel project.
