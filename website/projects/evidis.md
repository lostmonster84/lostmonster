---
name: Evidis
slug: evidis
status: active
type: saas
industry: Construction / Procurement
url: https://app.evidis.co.uk
stack: [Next.js 16, TypeScript, Tailwind CSS 4, PostgreSQL, Redis, BullMQ, Cloudflare R2, Anthropic Claude API, Resend, Stripe, Playwright]
---

# Evidis — AI Evidence Integrity for Construction Tenders

AI-powered evidence management tool helping construction SMEs respond to tender questions with clarity and honesty, backed by real documents.

## What It Does

Upload a tender. AI extracts questions, matches them to your evidence library, drafts professional responses with citations, and identifies gaps. Export complete tender responses as Word, PDF, or Excel.

## Key Features

- **Question interpreter** — AI explains what each tender question actually means
- **Evidence library** — Upload documents (policies, certs, past answers), AI auto-tags with user confirmation
- **Semantic matching** — pgvector embeddings + category matching link evidence to questions
- **Draft generation** — AI writes evidence-backed responses with confidence badges
- **Gap analysis** — Identifies missing evidence with specific guidance
- **Export** — ZIP with answers + linked evidence PDFs (Oracle upload ready)
- **Split-screen review** — Question list (left) + full answer (right)
- **Prompt caching** — 90% cost reduction for multi-question drafting
- **MCP server** — AI IDE integration for developers

## Architecture

Monorepo with 4 Railway services:
- PostgreSQL database + Redis cache
- Next.js web app with 30+ API routes
- BullMQ document processor (background worker)
- Cloudflare Workers for email and PDF processing

## Design System

Warm & Trustworthy — white cards on warm cream canvas (`#FAFAF8`). Deep midnight brand (`#1A1940`), teal-green for AI confidence. Built for Nigel (55-year-old construction owner, not tech savvy).

## Business Context

Co-founded with Mike. Currently in waitlist mode. Demo account with pre-baked data for zero-token demonstrations.

## Status

Active v1 development. Core features shipped and battle-tested. Recent work: prompt caching (90% cost savings), split-screen review UX, evidence download with linking. 57 documentation files. Daily development.
