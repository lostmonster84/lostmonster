---
name: Canary
slug: canary
status: active
type: saas
industry: Developer Tools
stack: [Next.js 15, TypeScript, Tailwind CSS 4, PostgreSQL, Cloudflare R2, rrweb, Redis, Resend, Stripe]
---

# Canary — Error Tracking, Session Replay & Performance Monitoring

Developer-focused monitoring SaaS combining error tracking (8 detection modes), session replay (rrweb), and performance monitoring (Web Vitals) in a single lightweight SDK.

## What It Does

2-line SDK setup captures errors, replays user sessions, and monitors performance. Multi-tenant dashboard shows deduped errors with stack traces, session recordings with DOM reconstruction, and Web Vitals breakdowns per page.

## Key Features

- **8 error detection modes** — window.onerror, unhandledrejection, React ErrorBoundary, fetch failures, console.error, performance observer, 404 detection, server-side Next.js hooks
- **Session replay** — rrweb with 3-min circular buffer, 5,000 events max, 10% sample rate
- **Error deduplication** — SHA-256 hashing strips UUIDs, dynamic IDs, Webpack hashes
- **MCP server** — 16 tools for AI IDEs (Claude Code, Cursor) to query errors and resolve issues directly from the editor
- **Screenshot annotation** — "Report a problem" widget with annotated screenshots

## Origin Story

Born inside DOMA's production codebase after 8 detection modes, 600+ lines of error reporting, and battle-testing on real users. Extracted into standalone multi-tenant SaaS.

## Pricing

| Tier | Sessions/mo | Errors/mo | Price |
|------|------------|-----------|-------|
| Free | 1,000 | 10,000 | $0 |
| Pro | 10,000 | 100,000 | $29/mo |
| Team | 50,000 | Unlimited | $79/mo |

## Status

Public beta. Dashboard functional (overview, errors, recordings, reports, performance, settings). SDK with 7 detection modes + event batching. ~70% Phase 1 complete.

## 6-Month Targets

500 signups, 200 active projects, $2,000 MRR, <5 min time to first error.
