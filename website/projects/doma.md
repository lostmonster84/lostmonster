---
name: DOMA
slug: doma
status: active
type: marketplace
industry: Real Estate
url: https://domamontenegro.com
stack: [Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Cloudflare R2, Stripe, Resend, Turborepo, pnpm, Playwright]
---

# DOMA — The Rightmove of Montenegro

Comprehensive real estate listing platform for Montenegro. Two-sided marketplace connecting property seekers with agents, landlords, and private owners.

## What It Does

Full property portal with agent dashboards, CRM pipeline, automated scraping from 4+ external sources, 7-locale auto-translation, and Stripe billing. Built from scratch in 3 months, now live with real users and real revenue.

## Key Features

- **Property search** — Advanced filtering (location, price, bedrooms, amenities, pet-friendly, 7 regions)
- **Agent dashboard** — Listings CRUD, enquiry inbox, Kanban CRM pipeline, analytics, team management
- **Shadow agencies** — Auto-scraped listings from external sources; agencies can claim their profiles
- **7-locale i18n** — All content auto-translated via Claude API (EN, MNE, RU, UA, DE, TR, IT)
- **Freshness model** — Listings auto-expire (14-day rentals, 30-day sales), require confirmation. "If it's listed, it's available."
- **Listing quality validation** — 7 hard rules, 6 soft warnings prevent junk data
- **Superadmin** — User management, listing moderation, platform analytics

## Monetisation

1. **Agency subscriptions** — Free (3 listings) or Pro (EUR 5/property/month)
2. **Sponsored listings** — Featured (EUR 15/week) or Premium (EUR 35/week)
3. **Display ads** — Inline and sidebar placements from EUR 50/month
4. **Private owner listings** — EUR 29 one-time fee, 30-day active period

## Architecture

Domain-organised monorepo. Marketing, admin, superadmin all compile into one Next.js app deployed to Railway. 28+ database tables across auth, business, listings, CRM, payments, and analytics domains.

## Design System

**Card-on-Canvas** — White cards on warm sand canvas. Adriatic blue (`#1A5F7A`) CTAs. Morena cream (`#F9F7F3`) backgrounds. Airbnb meets Rightmove, warmed by Mediterranean luxury.

## Scale

- 28+ production database tables
- 7 scheduled cron jobs (auto-scrape, scheduled posts, digests)
- 23,578 images on CDN
- 4+ external data sources scraped automatically
- Canary self-monitoring with Linear integration

## Status

Production. Live platform with real agents, real listings, real enquiries, real revenue. Daily active development — latest work spans listing quality, platform-wide i18n (5 phases), and infrastructure hardening.
