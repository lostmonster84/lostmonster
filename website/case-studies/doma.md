# DOMA — The Rightmove of Montenegro

> Full real estate marketplace built from scratch in 3 months. Live with real agents, real listings, real revenue, and 7-language auto-translation.

---

## The Challenge

Montenegro's property market is booming — 10-15% price appreciation annually, waves of expat interest from the UK, Germany, and beyond. But there was no central property portal. No Rightmove. No Zoopla. Just scattered agency websites, WhatsApp groups, and stale Facebook posts.

Agents had no way to reach international buyers efficiently. Buyers had no way to search, compare, or trust what they were seeing. Half the listings online were years out of date.

## What I Built

A two-sided real estate marketplace serving agents, landlords, private owners, and property seekers across Montenegro. From zero to production in 3 months.

### Agent Dashboard
Full CRM with enquiry inbox, Kanban pipeline (new → contacted → viewing → negotiating → won/lost), listing management, team invites, and analytics. Agents can create, edit, feature, pause, and renew listings — all from a clean dashboard.

### Smart Search
Advanced filtering by location, price range, bedrooms, furnishing, amenities, and pet-friendliness across 7 regions. Results update instantly. Every listing links to the responsible agent with one-click enquiry.

### Shadow Agency System
An automated scraper pulls listings from 4+ external agency websites. Unclaimed agencies get "shadow" profiles. When someone enquires, the agency gets an email with a "claim your profile" link — converting them into platform users without cold outreach.

### 7-Language Auto-Translation
Every listing title and description is automatically translated into English, Montenegrin, Russian, Ukrainian, German, Turkish, and Italian using Claude API. Agents write once; buyers read in their language.

### Freshness Model
The core competitive advantage: "If it's listed, it's available." Rentals expire after 14 days, sales after 30. Agents must confirm to renew. Dead listings with zero working images are automatically deactivated. Listing quality validation enforces 7 hard rules and 6 soft warnings.

## Tech Stack

- **Next.js 15** with Turborepo monorepo
- **PostgreSQL** on Railway (28+ tables)
- **Cloudflare R2** for images (23,578 on CDN)
- **Stripe** for subscriptions and one-time payments
- **Claude API** for auto-translation
- **Playwright** for E2E testing
- **7 scheduled cron jobs** for scraping, digest emails, and content publishing

## Monetisation

Four revenue streams running from day one:
- **Agency subscriptions** — Free (3 listings) or Pro (€5/property/month)
- **Sponsored listings** — Featured (€15/week) or Premium (€35/week)
- **Display advertising** — Inline and sidebar placements from €50/month
- **Private owner listings** — €29 one-time, 30-day active period

## Results

- **Live platform** with real agents, listings, enquiries, and revenue
- **28+ database tables** powering auth, CRM, listings, payments, analytics
- **23,578 property images** served via CDN
- **4+ external sources** scraped automatically
- **7 languages** served without manual translation effort
- **3 months** from concept to production

## What Makes This Different

I didn't build DOMA because someone hired me. I built it because I moved to Montenegro, tried to find a flat, and discovered the market had no central platform. The problem was personal. The solution was practical.

Every feature exists because a real user needed it — not because a product manager added it to a backlog.

---

**Industry:** Real Estate / Marketplace
**Timeline:** 3 months to production
**Type:** Two-sided marketplace with agent CRM
