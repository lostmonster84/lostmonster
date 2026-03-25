---
name: HospoJobs
slug: hospojobs
status: active
type: recruitment-platform
industry: Hospitality
stack: [Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Cloudflare R2, Stripe, Resend, Anthropic Claude API, Turborepo, pnpm, Playwright]
---

# HospoJobs — UK Hospitality Recruitment Platform

Purpose-built recruitment platform connecting hospitality professionals with employers. Not a generic job board retrofitted for the industry — built by hospitality people, for hospitality people.

## What It Does

Three portals: job seeker dashboard (apply, profile, track applications), recruiter dashboard (post jobs, Kanban pipeline, talent pool), and superadmin panel. Full authentication, AI-powered job writing, and comprehensive employer branding.

## Key Features

- **SSR job search** — Keyword, location, 8 parent + 112 subcategories tailored to hospitality
- **Seeker profiles** — Skills, experience, education, CV upload, availability, right-to-work tracking
- **Recruiter dashboard** — Job posting wizard, AI description writer, 7-stage Kanban pipeline (DnD), talent pool
- **AI integration** — "Write it for me" button generates job descriptions and company descriptions via Claude API
- **Company pages** — Public employer branding with hero, perks, locations, team gallery, open jobs
- **Business finder** — Google Places + postcodes.io for universal location search across the platform
- **Groundhog demo system** — Resettable demo account with transaction-based data refresh

## Architecture

Turborepo monorepo with 4 packages. Raw SQL with parameterised queries (no ORM). Session-based auth with bcrypt + httpOnly cookies. Cloudflare R2 for logos, CVs, galleries. Railway deployment.

## Brand

Teal (`#0D7377`) + Copper (`#C2703E`). Card-on-canvas. Warm but professional — "like walking into a well-run restaurant."

## Database

17 tables across 11 migrations. Job categories (8 parents + 112 subcategories), 7-stage application pipeline, skills matrix, and provider verification.

## Status

MVP Phase 1 complete. 37 routes live, clean build passing. Launch-ready. Apply flow was the last blocker — now resolved.
