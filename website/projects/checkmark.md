---
name: Checkmark
slug: checkmark
status: active
type: saas
industry: Professional Services / Construction
domain: checkmark.app
stack: [Next.js 15, TypeScript, Tailwind CSS 4, PostgreSQL, Cloudflare R2, Anthropic Claude API, Stripe, Resend]
---

# Checkmark — AI Report Defence Tool

AI-powered tool for professionals who submit reports for external review. Predicts what reviewers will flag, then intelligently triages incoming feedback to separate genuine concerns from ChatGPT-generated noise.

## What It Does

**Pre-Review Mode:** Submit a report, optionally with reviewer profiles. AI predicts flags with severity scoring and paragraph-level precision. Suggests defences for each predicted flag.

**Post-Review Mode:** Paste incoming feedback. AI categorises each item as Predicted (already flagged), New Concern (genuine), or Noise (AI-generated fluff). Generates draft responses.

## Key Features

- **Reviewer persona simulation** — Upload reviewer CVs/emails, AI simulates their specific perspective
- **AI detection scoring** — Identifies if feedback is ChatGPT-generated
- **Severity scoring** — Critical, High, Medium, Low per flag
- **Paragraph-level predictions** — Exact location + likely comment + suggested defence
- **Draft response generation** — Editable responses for each feedback item
- **Free trial** — No signup required, IP-based rate limiting (3 analyses/day)

## Architecture

- Magic link auth only (no passwords) — Resend + session cookies
- Streaming AI analysis via SSE (Claude Sonnet)
- Cloudflare R2 for file storage
- Stripe billing: Free (3/day) or Pro (GBP 15/month, unlimited)

## Target User

Engineers, consultants, compliance officers who submit reports for external review and face ChatGPT-weaponised feedback.

## Status

MVP complete. All features built, database migrations ready, auth implemented, AI integration complete, Stripe billing integrated. Pre-deployment — 11-milestone checklist to go live.
