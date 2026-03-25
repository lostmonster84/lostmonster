---
name: Ancarraig Lodges
slug: ancarraig
status: active
type: booking-website
industry: Hospitality / Tourism
client: Ancarraig Lodges (own business)
url: https://ancarraiglodges.com
stack: [Next.js 16, TypeScript, Tailwind CSS, Vercel Postgres, Drizzle ORM, Stripe, Resend, Framer Motion, Playwright]
---

# Ancarraig Lodges — Premium Self-Catering Booking Site

12 Scandinavian-style lodges in 12 acres of private woodland overlooking Loch Ness. Direct booking website built to maximise conversions and eliminate OTA commissions.

## What It Does

Full booking website with custom admin backend, real-time availability, Stripe payments, and comprehensive SEO. Designed to convert visitors into direct bookers — no middleman.

## Key Features

- **Custom booking flow** — Dates, lodge selection, guest info, Stripe payment
- **Custom admin backend** — 35+ admin routes for content, bookings, offers, email management (no third-party CMS)
- **SEO infrastructure** — Structured data (LodgingBusiness, AggregateRating, FAQ), dynamic sitemap, Open Graph optimisation
- **Email marketing** — Newsletter system via Loops, React Email templates, unsubscribe management
- **Viator tours integration** — Affiliate revenue from local experiences
- **Mobile-first** — 70%+ traffic is mobile; sub-1s load times critical for conversion

## Design Philosophy

**Scandi-Scot Fusion** — Nordic minimalism meets Highland warmth. 60-70% imagery on sales pages. Full-bleed photography with subtle parallax. No gradients, no emojis. Framer Motion scroll reveals with `naturalEase` easing.

## Brand Colours

- Primary (Maroon): `#8B3A52`
- Secondary (Wood Brown): `#8B6F47`
- Accent (Heather Purple): `#7D5BA6`

## Technical Highlights

- Migrated from Sanity CMS to Vercel Postgres + Vercel Blob (full data ownership)
- Domain migration from .co.uk to .com with SEO preservation
- WCAG 2.1 AA accessibility compliance
- Lighthouse targets: Performance 95+, Accessibility 100, SEO 100
- Playwright E2E test suite

## Business Impact

20+ years operating. Direct booking focus eliminates 15-20% OTA commissions. Custom admin gives the business full control over content, pricing, and offers without developer dependency.
