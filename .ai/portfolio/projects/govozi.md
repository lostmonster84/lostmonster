<!-- SCAN: head=cab32c9 date=2026-05-14 -->
# GoVozi

> Montenegro's transfer marketplace: pre-booked, fixed-price airport and port transfers from verified local drivers. Pure digital, zero vehicles, all margin. A Hello Monte ecosystem product.

**Status:** Pre-build
**URL:** https://govozi.com
**Industry:** Marketplace / Transfer Booking / Travel
**Repo:** /Volumes/Projects/govozi
**Last updated:** 2026-05-14

## What it is

GoVozi is a digital marketplace connecting passengers with verified local drivers for pre-booked, fixed-price transfers across Montenegro: airport-to-resort, cruise-port-to-town, cross-border runs. It is pure digital: GoVozi owns no vehicles, employs no drivers and carries no insurance liability. It takes a 17.5% platform commission on every booking. It operates under Lost Monster DOO (the existing Montenegrin company) as a product within the Hello Monte ecosystem.

## Origin story

The problem is a clean, validated market gap: Montenegro has no Uber, no Bolt and no transparent transfer-booking platform. The entire market runs on Facebook recommendations, WhatsApp messages and guesswork. Primary research backs this: analysis of 31 posts across 6 active Facebook groups (May 2026) found transport and transfers were the joint most-asked question category, with a consistent pattern - people do not know what a transfer should cost, do not know who to trust, and cannot compare options. Meanwhile demand is large and growing: Montenegro's two airports handled 2.87m passengers in 2024, Kotor's cruise port expects 500,000+ a year, and conservatively 4-5m people a year need ground transport in or to the country. GoVozi exists to convert the question every arriving traveller asks - "how do I get from the airport, and what should it cost?" - into a booking made in under 60 seconds, with the Hello Monte AI bot and community as a built-in, near-zero-CAC demand engine.

## Customers

- **Tourist Tom** - one-off holiday transfer, wants a reliable English-speaking driver, books before landing.
- **Expat Emma** - lives in Montenegro, books regular airport runs 4-6x/year, wants a trusted driver.
- **Cruise Passenger Chris** - docking in Kotor for the day, needs fixed pricing confirmed before the ship docks.
- **Driver Dragan** - an independent driver who currently finds work via Facebook and hotel concierges; wants steady, pre-paid bookings without the marketing hustle, and will pay commission for it.

Average booking value ~EUR 50; GoVozi net ~EUR 7.25 per booking.

## How it works

- **Passenger web app** - route selector (pickup, dropoff, date, time, passengers, luggage), instant fixed-price quotes from 2-4 verified drivers, driver profiles (photo, vehicle, rating, languages), Stripe payment, confirmation with driver details, post-trip ratings, saved routes.
- **Driver dashboard** - web-based, no app download at launch; incoming bookings via SMS / WhatsApp / email, one-tap accept/decline, availability calendar, earnings tracker, weekly EUR payouts.
- **Admin panel** - driver verification workflow, dispute resolution, payout management, a route-based pricing engine with seasonal multipliers (1.0x winter rising to 1.3x in Jun-Aug, plus a +15% night surcharge), analytics.
- **Marketing site** - SEO landing pages targeting real search intent like "Tivat airport transfer to Kotor", cruise-port pages and route guides.
- **Hello Monte integration** - the demand flywheel. The Hello Monte AI bot answers "how much is a transfer from Tivat to Kotor?" and offers to fetch live quotes; the user books; GoVozi earns commission; the booking data feeds back and makes the bot smarter.

## Tech stack

Planned and scaffolded: Next.js 15 (App Router) Turborepo monorepo, React 19, TypeScript. PostgreSQL on Railway (raw `pg` driver), session-based auth (bcrypt + signed cookies). Cloudflare R2 storage, Resend email. Stripe via a UK entity (Stripe is not native to Montenegro) plus Stripe Connect for driver payouts, deferred until ~30 drivers. Twilio + WhatsApp Business API for notifications. Google Maps Platform (Places, Directions, Distance Matrix). shadcn/ui, React Hook Form + Zod, PostHog analytics, in-tree Canary + Sentry error tracking. Playwright + Vitest. Apps: passenger web, driver dashboard, admin, superadmin, marketing.

## Monetisation

A 17.5% platform commission on every booking. At a ~EUR 50 average booking value: ~EUR 8.75 gross take, ~EUR 7.25 net after ~3% payment processing - roughly 83% gross margin. No fleet, no inventory, customer acquisition effectively free via Hello Monte. Year 1 capital requirement is EUR 6,300-15,000; break-even is around 870 bookings, reachable within the first summer season. Documented projections (moderate scenario): Year 1 - 3,650 bookings, EUR 182,500 GMV, EUR 14,463 net profit; Year 3 - 15,000 bookings, EUR 750,000 GMV, EUR 108,750 net profit.

## Status & scale

Pre-build. Full business plan and PRD v1.0 complete (May 2026), technical build plan with 9 milestones in place, Turborepo monorepo scaffolded, The Firm v3.30 integrated. 11 commits, last 8 May 2026 (domain lock to govozi.com). Auth, API and database are stubbed; zero real features shipped. Milestone M0 (pre-sprint hygiene) is active, 1/5 sub-tasks done. MVP ship target ~5 August 2026 (12-13 weeks of active build from the M1 start); first booking targeted ~12 August 2026 once the first 5-10 drivers are verified.

## Team

- **James** - founder, sole builder and decision maker; operates via Lost Monster DOO.
- **The Firm** - AI crew (v3.30, 32 workers) will run delivery: Gaffer routes every task; CODAX/CRUDX build, SOFAX on design, NIGELX on usability against the "Tourist Tom" test persona, MAPX on maps/geolocation, TERRX on testing, Foreman the pre-ship gate.
- **Drivers** - independent contractors, not employees; target 20-30 verified before launch across Tivat, Podgorica, Kotor, Budva, Herceg Novi and the Dubrovnik corridor.

## Agent-first angle

GoVozi's growth model is agent-native at its core. The Hello Monte AI bot is the customer-acquisition channel: it already answers travel questions for the Montenegro community, so wiring GoVozi in as a native booking action turns an existing AI conversation into a near-zero-CAC demand engine. That flywheel (bot creates demand, GoVozi captures revenue, booking data sharpens the bot) is something no standalone transfer app could replicate. On the build side, the business plan's "4-6 week MVP, built in-house, AI-assisted" line only holds because The Firm crew compresses the build; the EUR 3,000-6,000 development-cost estimate assumes the AI-crew model, not a hired team.

## Strategic position

- **Role in the portfolio:** The second Montenegro venture and the clearest ecosystem play. It shares a market, a company (Lost Monster DOO) and an audience with Doma, and it is the first venture explicitly designed to plug into the Hello Monte bot, making it a test of whether an existing AI-community asset can be turned into a distribution channel for a new business.
- **Where the leverage is:** GoVozi is pre-build, so the leverage is execution sequencing, not strategy - the strategy is already validated on paper. Three concrete unlocks gate everything: build the 4-6 week MVP, onboard 20-30 drivers, and resolve the payment/legal setup (UK Stripe entity, local legal opinion). Do those three and it can be live for a summer season.
- **Push or park:** PUSH, but it is a build, not a polish. Unlike WildTrax or HospoJobs, GoVozi is not waiting on a launch decision; it is waiting on a focused 4-6 week build block. The decision is whether to allocate that block now, before the summer demand window.
- **Moat:** The Hello Monte demand engine (a genuine, near-zero-CAC channel competitors cannot copy), local driver relationships, and hyper-local pricing accuracy calibrated from real market data. International aggregators (KiwiTaxi, GetTransfer) have poor local coverage and low trust; the moat is being genuinely local.
- **Biggest risk / next bottleneck:** It is still pre-build, so all validation is on paper. Behind that: the Stripe-not-native workaround is a dependency (if UK banking or Wise availability shifts, revenue flow breaks), driver leakage (drivers taking repeat customers off-platform) is structural, and ~80% of volume concentrates in May-October.

## Open questions / risks

- Still pre-build: nothing live, no drivers signed; all validation is on paper.
- Payment processing: Stripe not native to Montenegro, relies on the UK-entity workaround plus Wise payouts.
- Driver leakage: drivers may take repeat customers off-platform after the first booking.
- Seasonality: ~80% of volume May-October; winter baseline depends on expats and inter-city routes.
- Legal classification: pre-booked transfers vs taxi service; a EUR 300-500 local legal review recommended before launch.

## Links

- Repo: /Volumes/Projects/govozi
- Live: https://govozi.com (domain locked, not yet live)
- Lost Monster brief: none (no brief exists for govozi)
- Key docs: GoVozi_Full_Business_Plan.txt, docs/PRD.md, docs/BUILD-PLAN.md
- Related: shares the Montenegro market and Lost Monster DOO entity with Doma; designed to plug into the Hello Monte AI bot and community.
