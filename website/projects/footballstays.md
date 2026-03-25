---
name: FootballStays
slug: footballstays
status: active
type: affiliate-network
industry: Sports / Travel
url: https://footballstays.com
stack: [Next.js 16, TypeScript, Tailwind CSS 4, Neon PostgreSQL, Mapbox, Framer Motion, Resend, Puppeteer]
---

# FootballStays — Stadium Hotel Affiliate Network

Multi-stadium hotel affiliate network targeting Premier League and major UK football venues. Premium design, match-day context, and transparent affiliate bookings.

## What It Does

Hub site (footballstays.com) connects to individual stadium domains (stamfordbridgestays.com, etc.). Each stadium site curates nearby hotels with match-day filters, live fixtures, and booking affiliate links.

## Key Features

- **Airbnb-style hotel browser** — List, split, and full-screen map views with Mapbox
- **7 match-day filters** — Walking distance, budget/luxury, parking, bar, breakfast, 24hr reception
- **Dual-brand colour system** — Network uses Football Green; stadium sites use team colours
- **Fixtures integration** — Live API ready (football-data.org + API-Football)
- **Affiliate tracking** — Database-backed click tracking, UTM generation, multi-network support
- **Web scraping pipeline** — Puppeteer scrapes hotel details and images from Booking.com

## Monetisation

- Booking.com affiliate (CJ Network): ~GBP 250/month per stadium
- Hotels.com affiliate: ~GBP 160/month per stadium
- Travelpayouts integration
- Projected: GBP 16,400+/year across 40 stadiums

## Architecture

Single Next.js codebase, multi-tenant capable. One domain per stadium with team-specific branding. Neon PostgreSQL for property data (40+ records). Vercel deployment (London region).

## Scale Potential

Replicable template for 40+ Premier League and major stadiums. Each new stadium is a configuration change, not a rebuild.

## Status

Production on Vercel. 132 commits. Chelsea template live. Ready for additional stadium deployments. Lighthouse scores: 95+ across all categories.
