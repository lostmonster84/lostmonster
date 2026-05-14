<!-- SCAN: head=1e504f5 date=2026-05-14 -->
# Barkko

> A UK-wide verified pet-services marketplace connecting pet owners with screened professionals. Technically built, but cold for 3 months and never launched.

**Status:** Cold
**URL:** _none live_
**Industry:** Pet Services / Two-Sided Marketplace
**Repo:** /Volumes/Projects/barkko
**Last updated:** 2026-05-14

## What it is

Barkko is a two-sided marketplace (Next.js 15) for UK pet services: dog walking, grooming, boarding, training, pet sitting, daycare. Every provider is verified (DBS checks, insurance, identity) before listing. Pet owners search by location and service type, view verified profiles with reviews, and book through a secure flow. Providers manage availability, respond to enquiries, track earnings and view analytics. The platform operates UK-wide with comprehensive admin tooling for support, verification, moderation and reporting.

## Origin story

The UK pet-services market is fragmented across Facebook groups, Rover (closed to new providers) and scattered reviews, with no central verified marketplace. Pet owners struggle with trust ("who vets these people?"); providers have no central platform to build reputation. Barkko's answer is verification-first: providers are screened before they can list, building owner confidence and giving providers a professional home.

## Customers

- **Pet owners** - UK, 25-65, digitally engaged, willing to pay for verified providers. Free to search.
- **Providers** - dog walkers, groomers, sitters, trainers, boarders. Two tiers: Free (10% commission on bookings) or Professional (GBP 9.99/month + 5% commission).
- **Admin team** - support, verification, moderation, platform management.

## How it works

- **For owners** - smart search (service type, location, rating), verified provider profiles with badges and reviews, a booking-enquiry flow with soft email verification (no friction on discovery), booking management.
- **For providers** - multi-step onboarding into a verification queue (DBS, insurance, business registration), a dashboard for bookings, service listings and pricing, an earnings dashboard, reviews, analytics and an availability calendar.
- **For admin** - 50+ documented routes: provider verification queue, user management, booking and dispute moderation, review moderation, a blog CMS, analytics, support tooling.

## Tech stack

Next.js 15 (App Router), TypeScript (strict), React 18, Tailwind CSS, shadcn/ui (49 components). Supabase (PostgreSQL + Auth + Storage + RLS). Stripe (subscription + one-time). SendGrid for email (transitioning to Resend). Anthropic SDK present in dependencies but not used. React Query + React Hook Form + Zod. Turborepo + pnpm monorepo (4 packages). Vercel hosting. Playwright E2E. The AI framework suite (112 files: APEX, CODAX, CRUDX, MAPX, PLANX etc.) is integrated.

## Monetisation

Commission + subscription hybrid: Free tier providers earn 90% (Barkko takes 10%), Professional tier providers pay GBP 9.99/month and earn 95% (Barkko takes 5%). Planned future streams: premium owner features, premium provider features (featured listings, advanced analytics), featured placement. No live revenue - the platform is pre-launch and has never processed a real transaction.

## Status & scale

Cold. 317 commits all-time, but the last commit was 10 February 2026 - roughly 3 months cold at scan time, with zero activity since. What was built is genuine and complete: 26+ marketing pages, 20+ provider/dashboard pages, 50+ admin pages all documented as working, ~6,000 lines of TypeScript, a full Playwright E2E suite, the monorepo restructure with shared packages. Feature-complete on paper (auth, onboarding, search, booking enquiry, dashboards, payments infrastructure, reviews, blog CMS, analytics). Not built: mobile app, the AI recommendation engine (SDK imported, never implemented).

## Team

- **James** - founder, sole builder. No co-founders or employees.
- **The Firm** - AI crew via CLAUDE.md (1,260 lines of agent instructions) and the 112-file framework suite: Gaffer orchestration plus quality-gate personas. Heavy AI involvement in the build, zero AI in the product.

## Agent-first angle

In the build: Barkko is comprehensively agent-built - a 1,260-line CLAUDE.md, the full 112-file framework suite, agent-aware acceptance criteria on every feature, quality-gate personas. In the product: nothing yet. The Anthropic SDK is in dependencies with a TODO to "integrate AI-powered features", but no AI is live in the product. Infrastructure ready, never activated.

## Strategic position

- **Role in the portfolio:** A cautionary data point. Barkko demonstrates strong full-stack execution (a complete two-sided marketplace with sophisticated admin tooling) but it is the clearest example of the portfolio's recurring pattern: built, not launched. All code, zero distribution.
- **Where the leverage is:** Not in engineering - the code is done. The only leverage left is a launch push: a conversion-optimised landing page, provider recruitment, a waitlist funnel, market validation. None of that exists.
- **Push or park:** PARK (cold park, preservable). The code is production-ready and well-documented; it does not need more engineering, it needs distribution and a decision. As of the last scan it has had neither for 3 months. Note: in a separate triage (the 01 Business folder exercise, 2026-05-14) James classified Barkko as archive - this Cold status reflects the repo still being live on disk, but the strategic intent is effectively "archived pending a launch decision".
- **Moat:** Verification-first provider network (a trust moat), UK-wide coverage, admin/moderation tooling. All real, but none of it matters without users.
- **Biggest risk / next bottleneck:** It is cold. 92+ days of zero activity with no launch, no signups, no revenue is the honest signal that this is parked, not paused. The brief's "production-ready MVP, ready for launch" is true on code and false on business readiness.

## Open questions / risks

- Cold for ~3 months: is this project alive, or effectively archived?
- "Production-ready" is true for code, false for go-to-market: no landing page optimisation, no provider recruitment, no waitlist, no validation.
- Two-sided marketplace cold-start problem with no documented bootstrap plan.
- DBS verification takes 4-8 weeks - a structural onboarding bottleneck.
- Single-founder attention split across Barkko, Doma and other ventures - Barkko lost the contest.

## Links

- Repo: /Volumes/Projects/barkko
- Live: none
- Lost Monster brief: website/projects/barkko.md (claims "production-ready MVP, ready for launch" - accurate on code, contradicted by a 3-month-cold repo with zero launch activity)
- Related: standalone venture; in the 2026-05-14 portfolio-folder triage James classified it as archive.
