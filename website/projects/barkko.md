---
name: Barkko
slug: barkko
status: active
type: marketplace
industry: Pet Services
stack: [Next.js 15, TypeScript, Tailwind CSS, Supabase, Stripe, Turborepo, pnpm, Playwright]
---

# Barkko — UK Pet Services Marketplace

Comprehensive marketplace connecting pet owners with verified service providers across the UK. Dog walking, grooming, pet sitting, boarding, training, and more.

## What It Does

Two-sided marketplace with three portals: pet owner search and booking, provider dashboard with analytics, and enterprise admin panel (50+ routes). Full authentication, payment processing, and provider verification workflows.

## Key Features

- **Smart search** — Filter by service type, location, provider rating
- **Provider onboarding** — Multi-step verification, service listings, availability calendar
- **Booking system** — One-time bookings with recurring planned
- **Provider plans** — Free (10% commission) or Professional (GBP 9.99/month, 5% commission)
- **Admin panel** — 50+ routes: user management, provider verification queue, review moderation, blog CMS, support tickets, live chat
- **Blog system** — Full CMS with content management
- **Analytics** — Provider earnings dashboard, booking trends, platform-wide metrics

## Architecture

Turborepo monorepo with pnpm workspaces:
- `apps/web` — Main Next.js 15 application
- `packages/ui` — shadcn/ui component library
- `packages/shared` — Supabase, Stripe, email utilities
- `packages/database` — TypeScript type definitions

## Scale

- 317 commits shipping real features
- 26 marketing pages, 20+ admin pages, 12+ dashboard pages
- 50+ documented API endpoints
- Playwright E2E test suite

## Status

Production-ready MVP. Complete marketplace functionality (search, booking, payments), comprehensive provider onboarding, and enterprise admin panel. Ready for launch.
