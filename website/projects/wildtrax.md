---
name: WildTrax
slug: wildtrax
status: active
type: booking-website
industry: Adventure Tourism
client: WildTrax (own business)
stack: [Next.js 16, TypeScript, Tailwind CSS, PostgreSQL, Stripe, Mapbox, Cloudflare R2, Resend, GSAP, Lenis, Framer Motion, Zustand, Turborepo]
---

# WildTrax — Scotland's Premier Land Rover Adventure Company

Direct Land Rover rental company operating in the Scottish Highlands. Owns and operates 100% of its fleet, partners with curated accommodation, and provides expert Highland route planning.

## Three Products

1. **Land Rover + Camping** — Vehicle rental with rooftop tent and camping equipment for wild Highland camping
2. **Lodge & Landy** — Vehicle bundled with accommodation (flagship partner: Ancarraig Lodges)
3. **Just Drive** — Vehicle-only rental for flexible travellers

## Key Features

- **Vehicle booking system** — Real-time calendar, vehicle selection, add-ons
- **Custom admin CMS** — 24 routes for content management (not Sanity Studio)
- **Living design guide** — Config-driven `/design` page (sections 01-11)
- **Journal/blog system** — Scheduled publishing with cron endpoint
- **Immersive portal components** — Full-viewport worlds with GSAP animations and Lenis smooth scroll
- **SSR content** — Contact, Reviews, Home render from DB (no loading flash)
- **Route guides** — Highland driving itineraries and recommendations

## Design Philosophy

**"Porsche chassis, Patagonia soul"** — Sharp design framing nature, not competing with it. Square edges everywhere. Photography-first. British Racing Red (`#C41E3A`) as primary accent on warm chalk (`#FDFBF7`) backgrounds.

## Sister Companies

- **Native Automotive** — Maintains the entire WildTrax Land Rover fleet
- **Ancarraig Lodges** — Flagship "Lodge & Landy" accommodation partner

## Architecture

Transitioning from single Next.js app to Turborepo monorepo. Custom admin CMS, PostgreSQL database, Cloudflare R2 storage, Railway deployment with standalone Next.js build mode.

## Status

75% complete. Phases 1-3 done (Core CMS, Public Pages, Search). Phase 4 (Design System) at 40%, Phase 5 (Partner Dashboard + E-commerce) at 60%. 30+ routes live.
