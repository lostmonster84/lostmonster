---
name: StayFlo
slug: stayflo
status: active
type: saas
industry: Hospitality
stack: [Next.js 16, TypeScript, Tailwind CSS 4, PostgreSQL, Redis, BullMQ, Cloudflare R2, Anthropic Claude API, Resend, Stripe]
---

# StayFlo — AI-Powered Guest Handbook SaaS

Digital guest handbook platform for self-catering accommodation providers. Replaces paper welcome books with beautiful, always-updated digital guides.

## What It Does

Accommodation providers create digital handbooks for their properties — covering check-in instructions, local recommendations, house rules, emergency contacts, and area guides. Guests access via QR code or link. AI assists with content generation.

## Key Features

- **Digital handbooks** — Beautiful, mobile-optimised guest guides
- **AI content generation** — Claude API helps write property descriptions and local recommendations
- **Multi-property support** — Manage handbooks for entire portfolios
- **QR code access** — Guests scan on arrival, no app download needed
- **Custom branding** — Match handbooks to property branding
- **Analytics** — Track which sections guests actually read
- **Multi-language** — Auto-translation for international guests

## Architecture

Monorepo with background workers:
- Next.js web app (main product + admin)
- BullMQ document processor on Railway
- Cloudflare Workers for email and PDF generation
- PostgreSQL + Redis infrastructure

## Origin

Built from real-world experience running Ancarraig Lodges. Paper welcome books were always out of date, expensive to print, and guests never read them. StayFlo solves this for the entire self-catering industry.

## Status

Active v1 development. Core features shipped. Evidence-first AI approach ensures handbook content is accurate and helpful.
