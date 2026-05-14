<!-- SCAN: head=c21df0d date=2026-05-14 -->
# HospoJobs

> UK hospitality recruitment platform, purpose-built for the industry rather than a generic job board with a hospitality skin. Free unlimited job posting, monetised on boosts and subscriptions.

**Status:** Live
**URL:** https://hospojobs.co.uk (UK live) | https://hospojobs.me (Montenegro, pending)
**Industry:** Hospitality / Recruitment (two-sided marketplace)
**Repo:** /Volumes/Projects/hospojobs
**Last updated:** 2026-05-14

## What it is

HospoJobs is a two-sided recruitment marketplace built from the ground up for UK hospitality: kitchens, hotels, bars, events. It runs three portals - a job-seeker dashboard (search, apply, profile, track applications), a recruiter dashboard (post jobs, work a Kanban applicant pipeline, build an employer brand), and a superadmin panel. The defining idea is that every category, field and workflow reflects how hospitality hiring actually works. The MVP is live in the UK and a Montenegro expansion (hospojobs.me) is in active build as a multi-country proof of concept.

## Origin story

UK hospitality has a structural recruitment crisis: 120,000+ unfilled vacancies, ~52% annual staff turnover, in a sector worth GBP 93bn of GDP and employing 3.5m people. The tooling fails both sides. Recruiters post on Indeed or LinkedIn and get flooded with irrelevant applications from people who do not know a commis chef from a sous chef. Seekers search "hospitality jobs" and get warehouse and office-admin results mixed in. The one specialist board that understands the industry, Caterer.com, charges GBP 80+ per listing. HospoJobs solves that with a platform that genuinely speaks hospitality and uses free unlimited job posting as the wedge to break the incumbents' per-listing pricing. The problem it attacks is a real, quantified, expensive market failure.

## Customers

- **Job seekers** (free) - hospitality professionals: chefs, bartenders, front-of-house, hotel staff, events, kitchen porters, housekeeping, management.
- **Recruiters / employers** (free unlimited posting) - restaurants, hotels, bars, event and catering companies. They pay for optional visibility boosts and premium tools.
- **Superadmin** - internal ops and moderation.

13-month targets: 10,000 seekers, 500 active recruiters, 2,000 live listings, 10,000 MAU.

## How it works

- **Hospitality-native search** - SSR job search by keyword and location across 13 parent categories and 172+ subcategories built for the industry, so a search for "Sommelier" or "Pastry Chef" actually means something.
- **Seeker profiles** - a skills matrix grouped by category, hospitality-specific work history (cuisine type, covers per service, team size), CV upload, availability, and right-to-work tracking (UK citizen, settled status, visa types, sponsorship).
- **Recruiter dashboard** - a job-posting wizard, a 7-stage drag-and-drop Kanban pipeline (Applied to Reviewing to Shortlisted to Interview to Offered to Hired to Rejected), candidate detail drawer, email templates, and a talent pool / CV library for proactive search.
- **AI "Write it for me"** - Claude generates a complete job description from a few inputs, saving 30+ minutes per posting and removing the biggest friction for a time-poor recruiter.
- **Company pages** - public employer-branding pages with hero, perks, team gallery and open roles.
- **Quick Post system** - a superadmin tool that parses real hospitality job posts from Facebook groups via Claude Haiku into structured data, enriches via Google Places, queues for review, then bulk-approves and auto-emails the employer to claim the listing. This is the supply-seeding engine, the same cold-start pattern Doma uses with shadow agencies.
- **Job boosts** - Urgent and Featured paid placements, Stripe-billed recurring subscriptions per job.

## Tech stack

Next.js 15 (App Router, Turbopack) in a Turborepo monorepo, TypeScript (strict), React 19, Tailwind CSS. PostgreSQL 16 on Railway with raw parameterised SQL (no ORM), 27 tables across 41 migrations. Session-based auth (bcrypt + httpOnly cookies). Cloudflare R2 (`cdn.hospojobs.co.uk`) for CVs, logos and galleries. Anthropic Claude API (Haiku 4.5 for parsing and generation) across 5 routes. Stripe for boosts and subscriptions, Resend for email with webhook tracking, Google Places + postcodes.io for location. Self-hosted Canary error monitoring + GA4. Playwright E2E + Vitest. Auto-deploys to Railway on push to `main`.

## Monetisation

Free unlimited job posting is the acquisition wedge. Revenue comes from:

- **Boosts** - Urgent (~GBP 9.99/mo, badge + urgency label + highlight) and Featured (~GBP 29/mo, everything in Urgent + pinned to top). Recurring per-job subscriptions, auto-cancel when the job closes.
- **Premium subscriptions** (planned) - Pro and Business tiers for analytics, team accounts, interview scheduling and CV-library talent search; posting stays free.

Infrastructure runs at roughly GBP 85/month, so the model is structurally cheap to operate and scales without a cost cliff. Caterer.com charges ~GBP 96/job one-time; HospoJobs Featured is ~GBP 29/mo recurring.

## Status & scale

Live MVP in production at hospojobs.co.uk, with paying customers (boost subscriptions). Built in ~9 weeks across 37 development sessions; ~99 sessions and 320+ commits of total history; last commit 14 May 2026. 27 tables, 41 migrations, 48+ pages, ~60,000 lines of TypeScript across 4 app packages. Currently in multi-country expansion: the Montenegro deployment (hospojobs.me) needs strict data isolation (M-ISO) finished before content seeding, EUR Stripe setup and public launch. CV Library (recruiter talent search) is being extended. Autonomous `/debtloop` has run 7 debt-clearance iterations.

## Team

- **James** - founder, builder.
- **The Firm** - AI crew (35 worker roles) runs delivery: Gaffer orchestrates via Smart Routing; NIGELX audits usability against the "Graduate Grace Test" (every label obvious to a 21-year-old first-time user); SOFAX on design, CODAX on build, TERRX on testing, BULLETPROOF QA as the pre-ship gate, Foreman signs off. Forensic commit logging on every change.

## Agent-first angle

Two distinct AI plays. First, AI inside the product: the "Write it for me" generator removes the biggest friction for hospitality recruiters, and the Quick Post pipeline uses Claude Haiku to turn unstructured Facebook-group job posts into a self-seeding listing inventory with a built-in employer-acquisition funnel, the same cold-start solution Doma uses with shadow agencies. Second, AI building the product: a three-portal recruitment marketplace with a full applicant CRM, built in nine weeks by one founder directing The Firm, aimed straight at incumbents with large teams and GBP 80+/listing pricing.

## Strategic position

- **Role in the portfolio:** The horizontal-marketplace bet, and the second time James has built recruitment software (the bespoke route with TWIN, the productised route here). It reuses Doma's cold-start playbook, making it a test of whether that playbook is portable across markets.
- **Where the leverage is:** The MVP is done and launch-ready. Leverage is the launch decision and cold-start sequencing. A two-sided marketplace lives or dies on liquidity: Quick Post can seed supply, but seeker demand has to follow, and that go-to-market sequence is the real work now. The build is no longer the constraint.
- **Push or park:** DECIDE, like WildTrax. It is launch-ready and has been for a moment. Either commit to a launch with a real cold-start plan, or consciously park it; sitting "launch-ready but unlaunched" is wasted potential. The Montenegro expansion adds urgency and a clear next milestone.
- **Moat:** Hospitality-native depth (172+ subcategories, right-to-work tracking, covers-per-service profiling) a generic board would have to rebuild, free posting undercutting the one specialist incumbent, recruiter-grade Kanban tooling at no cost, and a proven multi-country architecture. The moat is real but only activates once there is liquidity.
- **Biggest risk / next bottleneck:** Cold-start liquidity. The free-posting model means revenue depends entirely on converting free users to boosts and subscriptions, an unproven conversion rate on an unlaunched-at-scale product. If M-ISO slips, the Montenegro window is lost.

## Open questions / risks

- Pre-scale: UK MVP is live but the 10k seekers / 500 recruiters targets are not yet achieved; no public Montenegro launch date.
- Cold-start liquidity: needs both jobs and seekers; Quick Post seeds supply but seeker demand must follow.
- Free-posting model means revenue depends entirely on conversion to boosts / subscriptions; repeat-boost rate unknown.
- Local `.env` currently points at the prod DB, a flagged debt; needs a dev-branch setup.
- Single-founder dependency.

## Links

- Repo: /Volumes/Projects/hospojobs
- Live: https://hospojobs.co.uk (Montenegro hospojobs.me pending M-ISO)
- Lost Monster brief: website/projects/hospojobs.md (accurate but pre-dates schema growth: brief says 17 tables / 8 parent categories / 37 routes, repo now 27 tables / 13 parents / 48+ pages, all additive)
- Lost Monster case study: website/case-studies/hospojobs.md
- Related: reuses the marketplace cold-start playbook from Doma; the productised counterpart to the bespoke recruitment tool built for TWIN; uses the shared Canary monitoring package.
