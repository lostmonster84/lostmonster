<!-- SCAN: head=7ca52e9 date=2026-05-14 -->
# TWIN

> A completely bespoke recruitment tool built to solve one creative studio's hiring problem, wrapped in a full bespoke platform with a cinematic public presence. James's flagship client engagement.

**Status:** Live
**URL:** https://www.thetwingroup.com | https://admin.thetwingroup.com
**Industry:** Creative / Film / VFX / Games (bespoke client work)
**Repo:** /Volumes/Projects/twin
**Last updated:** 2026-05-14

## What it is

TWIN is a bespoke platform built for TWIN Group, an independent digital-character studio working in film, visual effects and games. At its core it is a completely bespoke recruitment tool, built to solve a specific hiring problem the studio had, and around that core sits a full platform: a cinematic public marketing site and a quiet internal operating system (task management, content publishing, team coordination). It is not a SaaS product and not a template. It is one client's exact problem, solved with software made to fit it, and the portfolio's only pure paid client engagement.

## Origin story

The engagement started with a problem, and the problem was recruitment. TWIN Group needed a better way to find, pipeline and assess specialist creative talent, and the generic options (off-the-shelf applicant tracking systems, job boards, spreadsheets) did not fit how a high-end creative studio actually hires. Rather than bend the studio's process to fit someone else's software, James built them a recruitment tool from scratch, shaped entirely around how TWIN works. From there the brief widened into a complete bespoke platform: TWIN also needed a digital presence worthy of the work they do, and a calm internal system to run alongside the recruitment tool. Most agencies would have sold them two or three separate products. James delivered one codebase - recruitment tool, marketing site and internal OS - sharing database and auth infrastructure, with two deliberately opposite design philosophies running side by side. The recruitment problem is the reason it began; the bespoke approach is the reason it works.

## Customers

TWIN Group themselves. This is a client engagement, not a multi-tenant product. End users:

- **The studio's hiring team** - the recruitment tool, the core deliverable and the reason the project exists.
- **TWIN's staff** - the internal OS (task boards, blog CMS, team management), across 4 roles (Admin, Recruiter, Editor, Team Member) with role-based access.
- **Prospective film / VFX / games clients** - the cinematic public marketing site.
- **Job applicants** - submit applications via the public form with CV and portfolio uploads, no login.

## How it works

**The bespoke recruitment tool (the core)** - a 5-stage Kanban pipeline (New to In Review to Interviewing to Approved to Declined) with applicant records, CV and portfolio uploads, interview scheduling, internal notes and a full audit trail. Built to match TWIN's actual hiring process rather than a generic ATS workflow. PDF CV text extraction feeds applicant data in automatically; Claude Sonnet generates candidate summaries and suggested interview topics.

**The platform built around it:**
- **Cinematic marketing site** - dark, film-like public presence. Black backgrounds, bold green accent (#20ED8A), slow deliberate Framer Motion animations, a homepage in a three-act structure (Statement, Capability, Credibility). Every page feels like a title sequence.
- **Task boards** - Kanban with drag-drop, priorities, due dates, assignments.
- **Blog CMS** - a Tiptap WYSIWYG editor with draft / scheduled / published states, featured images and SEO metadata; publishes straight to the marketing site.
- **Team management** - 4 roles with granular permissions and email-token invites.
- **Media library** - file management on Vercel Blob.
- **AI integration** - Anthropic SDK with an org-level credit-pooling system.
- **Shared infrastructure** - both apps share one database, one auth system, one email service, one storage layer.

## Tech stack

Next.js 15 (App Router) in a Turborepo monorepo, React 19, TypeScript (strict), Tailwind CSS 4. Neon serverless PostgreSQL (EU region) with Drizzle ORM, 11 core tables across 32 migrations. NextAuth (credentials provider) + bcrypt, custom role-based access control. Tiptap 3 for rich text, TanStack React Table for data grids, @hello-pangea/dnd for the Kanban. Resend with React Email. Anthropic SDK (Claude Sonnet) for CV analysis. Linear API integration. Vercel hosting, two separate projects (`twin` marketing, `twin-admin`) deployed from one repo. A shared self-hosted Canary error-monitoring package wired to Linear. Playwright E2E.

## Monetisation

Bespoke client engagement: revenue is project fees from TWIN Group for the build and ongoing development (Phase 1 MVP delivered, Phase 2 in progress). This is the portfolio's clearest example of services / consulting revenue, distinct from the product ventures. It is paid work for an external client, not a bet on a market. No subscriptions, no per-user pricing.

## Status & scale

Live in production at thetwingroup.com and admin.thetwingroup.com. Phase 1 MVP delivered on schedule; ~139 commits since January 2026; last activity 14 May 2026. Phase 2 (refinement) underway: recently shipped PDF CV extraction (directly serving the recruitment core), the shared Canary error-monitoring package, and a favicon; recovered from a 2-month Vercel build outage (cleared 10 May). 14 marketing pages, ~30 admin routes, ~85 API routes, 32 migrations.

## Team

- **James** - builder and development partner for the engagement.
- **TWIN Group** - the client; their hiring team and staff use the platform daily.
- **The Firm** - AI crew (34 workers) runs delivery: Gaffer orchestrates; planners (CODAX, PLANX), builders (APEX, CRUDX, DEMX), reviewers (SOFAX, AIDAX, NIGELX) and checkers (TERRX, AUDIX). Strict UK-English mandate across all output.

## Agent-first angle

TWIN is the proof that the AI-crew model productises bespoke. The usual economics of custom software push clients toward generic SaaS, because bespoke is "too expensive, too slow". Here, a single engagement delivered a recruitment tool shaped exactly to one studio's process plus a cinematic marketing site plus a full internal OS, on schedule, because The Firm crew compresses the planning, build, design-review and QA labour a traditional studio would staff with a team. The headline is not "we used AI", it is "you can have software built precisely for your problem, instead of forcing your problem to fit someone else's software". That is what agent-first unlocks for a client. The product itself also embeds AI: Claude Sonnet does CV extraction and candidate analysis, with org-level credit pooling.

## Strategic position

- **Role in the portfolio:** The only pure client engagement, and the proof the model works for paid client revenue, not just James's own ventures. It is also the bespoke counterpart to HospoJobs: James has now built recruitment software twice, once made-to-measure for one client, once as a horizontal product. That pairing means the recruitment domain is well understood from both angles.
- **Where the leverage is:** Whether this becomes a repeatable service line. One bespoke-platform engagement delivered well is a case study; a productised "bespoke internal tools and platforms for clients, at agency quality without agency cost" offer is a business. The TWIN build is the template; the question is whether James wants to sell more of them.
- **Push or park:** DELIVER, then decide the offer. Finish Phase 2 cleanly for TWIN Group, then make a deliberate call on whether bespoke client work becomes a real revenue stream or stays a one-off. Do not let it become an open-ended commitment by default.
- **Moat:** For TWIN Group, the moat is lock-in by fit - the recruitment tool matches their process so closely no off-the-shelf product competes. For James as a potential service line, the moat is the demonstrated ability to deliver genuinely bespoke at a speed and price the bespoke market assumes is impossible.
- **Biggest risk / next bottleneck:** Single-client concentration - revenue depends on one ongoing relationship. And bespoke client work competes directly for James's time with the product portfolio; scaling it means a deliberate choice to trade product equity for service revenue. Recruitment-pipeline UI scalability (single Kanban, client-side filtering) is a known debt if TWIN's applicant volume grows.

## Open questions / risks

- Single-client revenue: concentration risk, depends on the ongoing TWIN Group relationship.
- Bespoke, not a product: does not compound into recurring SaaS revenue unless turned into a repeatable service line.
- Infrastructure quirks (two Vercel projects, an orphaned legacy `admin` project, a past 2-month build outage): operational fragility to watch.
- AI candidate analysis accuracy: good, but should keep a human override on every analysis for hiring decisions.
- Repeatability of the bespoke-platform offer depends on James's time, which competes with the product portfolio.

## Links

- Repo: /Volumes/Projects/twin
- Live: https://www.thetwingroup.com | https://admin.thetwingroup.com
- Lost Monster brief: website/projects/twin.md (verified accurate, no major contradictions)
- Lost Monster case study: website/case-studies/twin.md
- Related: the bespoke counterpart to HospoJobs (productised recruitment); the only pure client engagement; uses the shared Canary monitoring package.
