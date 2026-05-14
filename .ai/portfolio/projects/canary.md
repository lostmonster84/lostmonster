<!-- SCAN: head=4978db7 date=2026-05-14 -->
# Canary

> Developer error tracking, session replay and Web Vitals monitoring: "Linear meets Sentry." Extracted from Doma's production codebase; now both a standalone SaaS bet and shared portfolio infrastructure.

**Status:** Pre-launch (stalled since Feb 2026)
**URL:** https://app.canary.sh (public domain TBD)
**Industry:** Developer Tools (SaaS) / Error Tracking & Monitoring
**Repo:** /Volumes/Projects/canary
**Last updated:** 2026-05-14

## What it is

Canary is a monitoring platform: error tracking, rrweb-based session replay and Web Vitals, bundled as a lightweight SDK with a dark-mode dashboard and an MCP server for AI IDEs. It was born inside Doma (a real-estate SaaS) as internal error tracking, battle-tested on real users, then extracted as a standalone multi-tenant SaaS. The positioning is "Linear meets Sentry": developer-first, dark, fast, no marketing fluff. Critically, Canary has a dual nature - it is both a standalone product bet and the shared error-monitoring package embedded across Doma, HospoJobs, TWIN, WildTrax, Evidis and Ancarraig.

## Origin story

Doma went live with real agents and tenants browsing properties, and users reported bugs nobody could reproduce ("the button doesn't work", zero context). The team built internal error tracking to catch unhandled JS errors, fetch failures, React crashes, performance violations and rage clicks. Phase by phase it grew: 8 detection modes, SHA-256 deduplication, Linear integration, rrweb session replay, a superadmin dashboard inside Doma, and finally extraction into a standalone SaaS. The insight that defines it: every feature was battle-tested on real users in production before extraction. Nothing speculative.

## Customers

- **Direct SaaS customers** - solo developers and small teams (2-10 people) shipping fast, indie SaaS founders who cannot justify heavyweight APM pricing, agencies managing multiple client sites. Anyone who finds Sentry overkill or LogRocket too expensive.
- **Internal embedded customers** - every Lost Monster venture embeds Canary's SDK for production monitoring. This dual role is the strategic core: each portfolio product gets monitoring for free, and each one's real errors become a dataset that validates the product.

## How it works

- **SDK** (`@canarydev/sdk` + `@canarydev/react`) - 8 automatic detection modes (window.onerror, unhandledrejection, React ErrorBoundary, fetch interceptor, console.error interceptor, Web Vitals observer, 404 detector, rage-click detector), a manual report widget, SHA-256 deduplication that collapses repeat errors into an occurrence counter, event batching, breadcrumbs, and rrweb session-replay recording (circular buffer, 10% sample rate, gzip compression).
- **Dashboard** (Next.js 15 on Railway) - 6 pages: overview, errors (list + detail with stack trace, context, screenshot), recordings, user-submitted reports, performance (Web Vitals p50/p75/p95), settings.
- **MCP server** (`@canarydev/mcp`) - 16 tools letting AI IDEs (Claude Code, Cursor) query errors and replay sessions without leaving the editor. This is the core differentiation.
- **Session replay player** - rrweb-player wrapper with timeline, event markers and synced console/network panels. Code exists but the dashboard detail page still says "Coming soon" - integration incomplete.

## Tech stack

Next.js 15+ (App Router, Turbopack), TypeScript (strict), Tailwind CSS 4. PostgreSQL on Railway, 7 tables with multi-tenant scoping. Custom session-based auth (bcryptjs + httpOnly cookies). Cloudflare R2 for screenshots and recordings. Resend (scaffolded, not fully wired). Stripe (schema fields present but deferred, not integrated). rrweb 2.0 + pako for replay. @modelcontextprotocol/sdk for the MCP server. pnpm + Turborepo monorepo. API key scheme `cnry_`.

## Monetisation

SaaS tiers (documented, not yet billable - Stripe deferred to Phase 2): Free ($0, 1 project), Pro ($29/mo, 5 projects), Team ($79/mo, unlimited), Enterprise (custom). Org-level or per-project billing modes. No revenue is currently collected; all instances are on Free tier.

## Status & scale

Pre-launch, and effectively stalled. 11 commits total, all in a 3-day burst (24-26 February 2026), then dormant - no commits since 26 Feb 2026 (~2.5 months at scan time). Phase 1 is ~70% complete: the SDK, dashboard (all 6 pages functional with real queries), auth, multi-tenant architecture and MCP server (16 tools) are built. What is stubbed or missing: the session-replay player UI integration ("Coming soon"), email notifications, the marketing site (`apps/web/` scaffolded but empty), Stripe billing, team invites, source-map upload. Not abandoned, but not actively developed - likely deprioritised against the revenue-bearing ventures.

## Team

- **James** - founder, product vision, code review.
- **The Firm** - AI crew (Gaffer + ~12 workers: PLANX, CRUDX, APEX, MAPX, PIXLX, SOFAX, CONSX, INSPX, TERRX, BULLETPROOF QA), ported from Doma in the final Feb commits.

## Agent-first angle

Two angles. In the build: the same Gaffer-orchestrated worker crew, ported wholesale from Doma. In the product: the MCP server is the core AI integration and the headline differentiation - 16 tools that expose errors, recordings, reports and performance data to any AI IDE, so error tracking is not trapped in a separate dashboard but integrated into the developer's editor workflow. This positions Canary as one of the first monitoring tools designed natively for AI-IDE developers.

## Strategic position

- **Role in the portfolio:** Shared infrastructure first, standalone venture second. Canary's dual nature is uncommon and valuable: every Lost Monster product gets production monitoring at zero internal cost, and every product's real errors feed a dataset that validates the SaaS. It also has built-in distribution (Doma's users could sign up with one click).
- **Where the leverage is:** Phase 1 is ~70% done; the leverage is finishing the replay player and shipping a marketing site - then deciding whether Canary is a product to push or just internal infrastructure to maintain. The MCP differentiation is real but time-sensitive: Sentry or LogRocket could ship their own.
- **Push or park:** PARK as a standalone venture for now; KEEP as internal infrastructure. The 2.5-month commit gap is the honest signal - it has been deprioritised, correctly, against revenue-bearing work. It does not need to be a SaaS to be valuable to the portfolio. Revisit the standalone bet only when a revenue-closer venture frees up attention, and only if the MCP window is still open.
- **Moat:** The MCP-server-first design (a head start on AI-IDE-native monitoring), the real error dataset from the Lost Monster portfolio, and developer-first "Linear meets Sentry" positioning. All real, all narrow.
- **Biggest risk / next bottleneck:** As a standalone product, the flagship feature (session replay) shows "Coming soon", there is no marketing site and no billing - it cannot actually be sold. As infrastructure, the risk is lower. The deeper risk is opportunity cost: time spent finishing Canary-the-SaaS is time not spent on Doma or Evidis conversion.

## Open questions / risks

- Stalled: no commits since 26 Feb 2026. Is the standalone SaaS still a goal, or is Canary now infrastructure-only?
- Session-replay player code exists but is not wired into the dashboard - blocks any public launch.
- No marketing site, no billing - cannot be sold in current state.
- Is Canary's SDK actually deployed across the other portfolio ventures yet, or still optional?
- Competitive: Sentry / LogRocket could close the MCP gap.

## Links

- Repo: /Volumes/Projects/canary
- Live: https://app.canary.sh (beta deployment; public domain undecided - canary.sh vs canarydev.com vs getcanary.dev)
- Lost Monster brief: website/projects/canary.md (85% accurate; lists Redis - not actually used - and overstates Stripe as "in stack" when it is deferred and not integrated)
- Related: extracted from the Doma codebase; embedded as shared error-monitoring infrastructure across Doma, HospoJobs, TWIN, WildTrax, Evidis and Ancarraig.
