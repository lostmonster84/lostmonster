---
name: Anchor
slug: anchor
status: wip
type: marketplace-app
industry: Marine Transport / Tourism
stack: [React Native, Expo, Next.js 15, TypeScript, PostgreSQL, PostGIS, Socket.io, Redis, Stripe, Mapbox, Twilio, Prisma]
---

# Anchor — On-Demand Water Taxi Platform

Uber-style water taxi platform connecting tourists and residents across Boka Bay, Montenegro with local boat operators. Digital bookings, real-time tracking, transparent pricing, verified operators.

## What It Does

Two-sided marketplace with three UI surfaces: Passenger mobile app (14 screens), Operator mobile app (9 screens), and Admin/Superadmin web dashboards. Real-time GPS tracking, automated operator matching, and in-app payments.

## Key Features

- **Real-time operator matching** — PostGIS radius query, ETA ranking, 15-second decision ping window
- **Trip state machine** — REQUESTED > MATCHED > EN_ROUTE > ARRIVED > IN_PROGRESS > COMPLETED
- **Transparent pricing** — Base fare + distance (EUR 0.50/km) + passenger surcharge. 15% platform commission
- **Dual-rating system** — Both sides rate 1-5 stars. Operators below 4.0 after 20 trips flagged for review
- **Payment processing** — Stripe UK account, SEPA payouts to operator IBANs, 100% tips to operators

## Architecture

- **Mobile apps** — React Native + Expo (single codebase iOS/Android, OTA updates)
- **Real-time layer** — Socket.io + Redis for GPS broadcasting, ride matching, trip updates
- **Geospatial** — PostgreSQL + PostGIS for proximity queries and routing
- **Maps** — Mapbox GL with custom styling, geocoding, navigation SDK

## Market Context

2.6M foreign visitors to Montenegro in 2024. No unified water transport platform exists. Fragmented cash-in-hand market with no quality assurance. Anchor brings Uber-level reliability to Boka Bay water transport.

## Status

Fully scaffolded monorepo. PRD complete (715 lines). Comprehensive screen-by-screen audits written for all three apps. Design system defined. Database schema drafted. Ready for active build.

## MVP Success Targets

- 15+ active operators within 30 days
- 50+ completed trips in first 30 days
- 4.5+ App Store rating within 90 days
- 80%+ operator retention at 90 days
