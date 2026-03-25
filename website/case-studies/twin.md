# TWIN Group — Cinematic Digital Platform

> Bespoke web presence + internal operating system for a high-end creative studio working in film, VFX, and games.

---

## The Challenge

TWIN Group is an independent digital character collective — they work in film, visual effects, and games. High-end creative work demands a high-end digital presence. But they also needed something behind the scenes: a calm, functional operating system for managing recruitment, tasks, and content publishing.

Most agencies would've sold them two separate products — a marketing site and an admin tool. I built both in one codebase, sharing database and auth infrastructure, with two completely different design philosophies running side by side.

## What I Built

### Cinematic Marketing Site
Dark, dramatic, film-like. Black backgrounds, bold green accent (#20ED8A), slow deliberate Framer Motion animations, generous spacing. The homepage follows a three-act structure: Statement, Capability, Credibility. Every page feels like a film title sequence — because that's the world TWIN works in.

Pages: Homepage, What We Do, Our Team, News/Blog, Contact, Privacy, Terms. All responsive, all SEO-optimised, all deployed to Vercel.

### Internal Admin Dashboard
The opposite energy — calm, functional, utilitarian. Apple OS-style aesthetics. Data-dense layouts. Built for getting work done, not making impressions.

**Recruitment Pipeline** — 5-stage Kanban (New → In Review → Interviewing → Approved → Declined). Applicant records with CV/portfolio uploads, interview scheduling, internal notes, and stage tracking with full audit trail.

**Task Boards** — Kanban-style with drag-drop, priorities, due dates, and team assignments. Multiple boards for different projects.

**Blog CMS** — Tiptap WYSIWYG editor with draft/scheduled/published states, featured images, and SEO metadata. Content published on the marketing site automatically.

**Team Management** — Four roles (Admin, Recruiter, Editor, Team Member) with granular permissions. Invitations via email token.

### Shared Infrastructure
Both apps share one PostgreSQL database (11 core tables, 28 migrations), one auth system (bcrypt + NextAuth), one email service (Resend with React Email templates), and one file storage layer (Vercel Blob).

## Tech Stack

- **Next.js 15** with Turborepo monorepo
- **Neon PostgreSQL** (serverless, EU region)
- **NextAuth v4** with credentials provider
- **Tiptap 3** for rich text editing
- **TanStack React Table** for data grids
- **@hello-pangea/dnd** for drag-drop
- **Anthropic SDK** with org-level credit pooling
- **Vercel** hosting (two separate projects from one repo)

## Results

- **Phase 1 MVP delivered** on schedule
- **Two distinct apps** sharing one codebase and infrastructure
- **11 core database tables** powering recruitment, tasks, content, and team management
- **Two design systems** coexisting — cinematic dark (marketing) and calm functional (admin)
- **Live in production** at thetwingroup.com and admin.thetwingroup.com

## What Makes This Different

This project proves that bespoke doesn't mean expensive or slow. TWIN got a cinematic public presence AND a full internal operating system — recruitment, task management, CMS, team permissions — from a single development engagement.

No WordPress. No Notion. No Trello. One platform, purpose-built for how they actually work.

---

**Industry:** Creative / Film / VFX
**Timeline:** Phase 1 MVP delivered
**Type:** Bespoke platform (marketing site + internal OS)
