---
name: Visit Boka
slug: visitboka
status: active
type: content-platform
industry: Tourism
url: https://visitboka.com
stack: [Next.js 15, TypeScript, Tailwind CSS, Supabase, OpenAI API, Leaflet, Framer Motion, Resend, ConvertKit, Stripe]
---

# Visit Boka — Automated Tourism Discovery Platform

AI-powered, self-sustaining tourism platform curating experiences across Boka Bay, Montenegro. Aggregates tours, accommodations, restaurants, and activities from affiliate partners with AI-generated SEO content.

## What It Does

Automated content platform that aggregates tourism experiences from Viator, GetYourGuide, Booking.com, and DiscoverCars. AI generates SEO-optimised descriptions. Cron jobs keep everything fresh with <2 hours/month maintenance.

## Key Features

- **5 destination guides** — Kotor, Perast, Herceg Novi, Tivat, Kumbor
- **Content hub** — 3-Day Itinerary, Travel Guide, Kotor vs Dubrovnik, Top 10 Things to Do, Best Time to Visit, Budget Guide
- **AI itinerary builder** — Personalised travel plan generation
- **Interactive maps** — Leaflet-based destination exploration
- **Automated content pipeline** — Weekly AI rewrites for SEO freshness
- **Email marketing** — ConvertKit integration with exit-intent popups

## Automation System

4 scheduled cron jobs (Supabase):
1. Monday 3am — Sync tours from affiliate APIs
2. Tuesday 4am — AI content generation and SEO optimisation
3. Wednesday 5am — Rebuild site (Vercel deploy, sitemap update)
4. First Sunday 10am — Auto-generate and send newsletter

## Revenue Model

- **Tours** — Viator/GetYourGuide (8-12% commission)
- **Hotels** — Booking.com (3-6%)
- **Car rentals** — DiscoverCars (6-10%)
- **Sponsored listings** — Local businesses EUR 50-100/year
- **Digital guides** — PDF downloads EUR 5-10 each

## Revenue Targets

Year 1: EUR 25,000 | Year 2: EUR 45,000 | Year 3: EUR 70,000

## Status

Active development. Core features functional. Focus on conversion optimisation and content quality refinement.
