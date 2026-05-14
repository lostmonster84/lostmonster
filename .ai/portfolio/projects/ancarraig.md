<!-- SCAN: head=c8c10501 date=2026-05-14 -->
# Ancarraig Lodges

> 12 Scandinavian-style self-catering lodges in 12 acres of private woodland overlooking Loch Ness. James and Rose's own hospitality business, plus the custom software that runs it.

**Status:** Live
**URL:** https://www.ancarraiglodges.co.uk
**Industry:** Hospitality / Tourism
**Repo:** /Volumes/Projects/ancarraig
**Last updated:** 2026-05-14

## What it is

Ancarraig Lodges is two things at once: James and Rose's own hospitality business (Scandinavian-style self-catering lodges set in private woodland on the Great Glen Way, above Loch Ness near Drumnadrochit) and the custom software that runs it. The codebase is a direct-booking website plus a full in-house CMS/admin backend handling bookings, content, special offers, guest communications, email marketing and SEO. It is not a product James sells; it is the operating system of a real, trading business he owns. Inside the portfolio it has a second life: it is the design and quality benchmark every other venture is measured against ("Ancarraig-quality"), and the proof that one operator with an AI crew can run a real business end to end.

## Origin story

James and Rose took ownership in 2016 and spent years renovating the lodges (log burners, new kitchens, floors, double glazing, balconies). The business had run for 20+ years, but the online presence had not kept up, and that gap was costing real money: GBP 500+/month on channel-manager subscriptions, 15-20% of every booking lost to OTA commission, recurring double bookings because separate systems did not talk to each other, and hours a week of manual admin. The website was built to take all of that back: own the data, own the booking flow, own the guest relationship, and stop paying middlemen for traffic the business could earn directly. The problem it solves is margin leakage and operational drag in an established small business, a P&L problem, not a hypothetical.

## Customers

Holiday guests booking Highland self-catering breaks: couples, families, walkers, wildlife watchers and remote workers. 70%+ browse on mobile, often in the evening comparing three to five options. They get a fast booking experience with real-time availability and a post-booking digital guest handbook. The business gets every booking commission-free and a direct line to the guest for repeat stays. The admin team (Rose, James) and the business owner are the other users.

## How it works

- **Booking funnel** - lodge browsing, availability checks, deep-link into Avantio (the external booking engine) for reservations. Zero double bookings since launch because the single system is the source of truth.
- **Custom admin backend** - 35+ admin routes for lodges, content, special offers, walks guides, enquiries, newsletter, landing pages and analytics. No third-party CMS, no per-seat fees, no developer dependency: Rose and James update descriptions, pricing and seasonal offers themselves.
- **SEO infrastructure** - schema.org structured data (LodgingBusiness, AggregateRating, FAQ), dynamic sitemap, Open Graph. The site ranks for "Loch Ness self-catering" and "Highland lodges", earning direct traffic instead of renting it from OTAs.
- **Email marketing** - newsletter system, React Email templates, seasonal and Black Friday campaigns run straight from the admin panel.
- **Guest handbook** - a token-gated post-booking digital welcome guide with an AI chat assistant answering local-recommendation and FAQ questions, replacing the out-of-date paper welcome book and the staff time it ate.
- **Viator tours integration** - affiliate revenue from local experiences.
- **Stripe** - special-offer and booking deposits.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS, Framer Motion. Neon / Vercel Postgres via `@vercel/postgres` with raw SQL (migrated off Sanity CMS in February 2026 specifically for full data ownership; Drizzle ORM also removed in favour of raw SQL). Vercel Blob for media, Supabase Auth for the admin dashboard. Stripe (deposits), Resend (email), Twilio (SMS). Google Analytics 4 + Hotjar. Hosted on Vercel, auto-deploys on push. Playwright E2E. Self-hosted Canary error monitoring. ~409 commits of history.

## Monetisation

Direct booking revenue. The website's commercial job is not to make revenue, it is to stop losing it: eliminating the 15-20% OTA commission on every booking and the GBP 500+/month channel-manager cost, which on a 12-lodge operation is a material share of margin. Secondary streams: Viator affiliate revenue on tour referrals and Stripe-collected deposits on special offers.

## Status & scale

Live and mature. ~409 commits, last active late April 2026. Domain migrated .co.uk to .com with SEO preserved (.com 308-redirects to .co.uk); Sanity to Postgres migration complete. Booking.com rating 8.8. Lighthouse targets: Performance 95+, Accessibility 100, SEO 100. 35+ admin routes, 11+ public pages, ~441 TypeScript files. Operates seasonally, March to October.

## Team

- **James** - owner/operator; also builds and maintains the platform.
- **Rose** - co-owner; runs the business day to day and uses the admin backend directly.
- **The Firm** - James's AI crew runs the build. Gaffer orchestrates; SOFAX on design, CODAX on planning/code, NIGELX on usability copy, PIXLX on pixel and edge-case QA, TERRX on testing, Frank/Foreman as the pre-ship gate. Plus Claude Code agents (ui-builder, seo-builder, code-reviewer) and autonomous loops for repetitive SEO/lint/type work.

## Agent-first angle

Ancarraig is where the whole thesis was first proven on real money. A 12-lodge hospitality business carries a full custom booking platform, CMS, email-marketing system and SEO infrastructure with no in-house dev team - The Firm crew is the dev team. The guest handbook's AI chat assistant also gives guests instant, accurate local knowledge with zero staff time. Nothing else in the portfolio, StayFlo most directly, exists without Ancarraig first proving an AI crew could build and run something a real business depends on.

## Strategic position

- **Role in the portfolio:** The anchor and the benchmark. A running business with real guests and real cashflow, not a bet, and the reference standard ("Ancarraig-quality") and Tenant #0 for StayFlo. It de-risks the rest of the portfolio by being the thing that already works.
- **Where the leverage is:** Ancarraig itself is largely built; leverage is no longer in the lodge business, it is in what Ancarraig spawns. The platform is the prototype StayFlo productises and sells to the whole self-catering industry. The highest-value move is treating Ancarraig as the live R&D environment for StayFlo, not a project to keep expanding.
- **Push or park:** RUN, do not push. A stable operating business: maintain and optimise it, but the growth energy belongs in the ventures it seeded.
- **Moat:** Owned freehold-style asset (12 lodges, 12 acres), 20+ years of operating history, an 8.8 rating, and direct-booking infrastructure that means it does not depend on OTAs for demand.
- **Biggest risk / next bottleneck:** Seasonality concentrates revenue into March to October, and the whole operation (business and platform) runs on James and Rose. It is robust, but it does not scale, and it is not meant to. Secondary: over-reliance on Avantio for availability and payment; an Avantio API integration is on the roadmap.

## Open questions / risks

- Seasonal business (March to October): revenue concentrated in a short window.
- Key-person dependency: James and Rose are the entire operation.
- Avantio dependency: booking and payment run through the external engine; deep-link only, API integration planned but not started.
- Schema drift: no migration system, schema evolves via ad-hoc SQL; local dev DB missing some tables. Tracked as debt.
- Legacy cleanup: Sanity schema files and a stale API token still present; needs a final audit and token rotation.

## Links

- Repo: /Volumes/Projects/ancarraig
- Live: https://www.ancarraiglodges.co.uk
- Lost Monster brief: website/projects/ancarraig.md (mostly accurate; overstates the booking flow as "custom" - it is a custom marketing funnel deep-linking to Avantio - and lists Drizzle ORM, which was removed)
- Lost Monster case study: website/case-studies/ancarraig.md
- Related: seed tenant ("Tenant #0") for StayFlo; "Lodge & Landy" accommodation partner for WildTrax; uses the shared Canary monitoring package.
