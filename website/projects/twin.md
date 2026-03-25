---
name: TWIN Digital Platform
slug: twin
status: active
type: bespoke-platform
industry: Creative / Film / VFX
client: TWIN Group
url: https://www.thetwingroup.com
stack: [Next.js 15, TypeScript, Tailwind CSS 4, Neon PostgreSQL, Drizzle, NextAuth, Resend, Tiptap, Vercel Blob, Anthropic SDK, Turborepo, pnpm]
---

# TWIN — Cinematic Web Presence + Internal Operating System

Bespoke platform for TWIN Group (independent digital character collective). Combines a cinematic public marketing site with a quiet internal operating system for recruitment, task management, and content publishing.

## What It Does

Two apps in one monorepo:
- **Marketing site** — Cinematic, film-like public presence for high-end creative industry clients (film, VFX, games)
- **Admin dashboard** — Calm internal OS for recruitment pipeline, task boards, blog CMS, and team management

## Key Features

- **Recruitment pipeline** — 5-stage Kanban (New > In Review > Interviewing > Approved > Declined) with applicant profiles, CV/portfolio uploads, interview scheduling
- **Task boards** — Kanban-style with drag-drop, priorities, due dates, assignments
- **Blog CMS** — Tiptap WYSIWYG editor, draft/scheduled/published states, featured images, SEO metadata
- **Team management** — 4 roles (Admin, Recruiter, Editor, Team Member) with granular permissions
- **AI integration** — Anthropic SDK with org-level credit pooling system
- **Media library** — File management with Vercel Blob storage

## Design Philosophy

**Two distinct aesthetics in one codebase:**
- Marketing: Dark cinematic palette (#000000 bg, #20ED8A accent), slow Framer Motion animations, generous spacing, film-like energy
- Admin: Calm, functional, utilitarian, Apple OS-style aesthetics, data-dense layouts

## Architecture

Turborepo monorepo:
- `apps/marketing` — Public site (thetwingroup.com)
- `apps/admin` — Internal dashboard (admin.thetwingroup.com)
- `packages/database` — Neon PostgreSQL with 11 core tables + 28 migrations
- `packages/auth` — Custom auth with bcrypt + NextAuth v4

## Status

Phase 1 MVP complete and deployed to Vercel. Both apps live in production. Phase 2 (refinement) planned — file uploads, email notifications, advanced search.
