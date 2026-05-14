<!-- SCAN: head=79c50c44 date=2026-05-14 -->
# Evidis

> AI evidence integrity for construction tenders: helps construction SMEs respond to tender questions with clarity and honesty, backed by real documents. Nothing becomes a claim unless a stored document supports it.

**Status:** Pre-launch
**URL:** https://app.evidis.co.uk
**Industry:** Construction / Procurement (B2B SaaS)
**Repo:** /Volumes/Projects/evidis
**Last updated:** 2026-05-14

## What it is

Evidis is an AI reasoning platform that sits between a tender question and an honest answer. A construction SME uploads a tender; the AI extracts every question, explains what each one actually means, matches it to the company's own evidence library, drafts professional responses with citations, and flags the gaps where evidence is missing. Complete responses export as Word, PDF or Excel, ready to submit. It is a co-founded B2B SaaS: James builds it, Mike brings construction-industry domain expertise and customer access.

## Origin story

Construction procurement is broken for small businesses, and the break is specific. Tender questions are written in abstract corporate language that hides what is being asked: a 10-person groundworks contractor gets a 40-page PQQ asking about "your organisation's approach to social value delivery through supply chain engagement" and genuinely cannot tell what response would win. So they guess, copy old submissions, overclaim, or do not bid at all and lose work they could deliver. Existing tools focus on accreditation badges and compliance checklists; nobody was helping the SME understand the question and answer it honestly with real proof. That gap is what Evidis closes. It is built for a specific person the team calls "Nigel": a 55-year-old construction owner who knows his trade but does not read tooltips.

## Customers

UK construction SMEs (2-50 staff) that bid for tenders, RFIs and PQQs: groundworks, civils and building-services contractors who can do the work but keep losing bids on paperwork. Users are bid writers, tender managers, owners and project leads. Currently in waitlist mode, with a pre-baked demo account that lets the team show the full product without burning AI tokens on every demo.

## How it works

- **Question interpreter** - AI extracts every question from an uploaded tender and explains it in plain English ("they want a written environmental policy, evidence you used it on a real project, and what you would do differently if something went wrong").
- **Evidence library** - the SME uploads policies, certificates, project records, training logs; AI auto-categorises each document across 11 evidence categories, with the user confirming. Upload once, reuse across every future tender.
- **Semantic matching** - pgvector embeddings plus category scoring link evidence to questions, each match carrying a qualitative confidence badge: Fully supported (green), Needs editing (amber), Needs work (red). No percentages, because that is what Nigel can act on.
- **Draft generation** - AI writes evidence-backed responses with citations. The non-negotiable rule: nothing becomes a claim unless it traces to a stored document. If the AI cannot find supporting evidence, it says so.
- **Gap analysis** - identifies exactly what evidence is missing and what to provide.
- **Split-screen review** - question list on the left, full answer on the right; review, edit and upload missing evidence mid-flow.
- **Export** - a ZIP with answers (Word / PDF / Excel) plus linked evidence PDFs, ready for systems like Oracle.
- **Inbound by email** - tenders can arrive by email and be parsed automatically.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui. PostgreSQL with pgvector for semantic search, raw `pg` driver. Redis + BullMQ for background document processing. Cloudflare R2 for evidence storage, plus Cloudflare Workers for email parsing and PDF generation. Anthropic Claude API (Opus for heavy synthesis, Sonnet for narrow routes, Haiku for light work) with prompt caching cutting AI cost ~90% on multi-question tenders. Resend for email, Svix for inbound email webhooks. Deployed on Railway as four services (Postgres, Redis, web app, document-processor worker) plus the Cloudflare Workers. Playwright E2E. Self-hosted Canary error monitoring.

## Monetisation

B2B SaaS subscriptions via Stripe, pricing tiers being finalised pre-launch (entry ~GBP 40-75/mo, core ~GBP 120-250/mo, upper ~GBP 400-800/mo). The commercial logic: a contractor that wins even one extra tender per quarter because of Evidis has paid for the tool many times over. It sells against the cost of lost bids, not against other software. Stripe integration is scheduled for Phase 5; cost-tracking infrastructure (per-model, per-endpoint) is already in place.

## Status & scale

Live v1 in waitlist mode at app.evidis.co.uk. Core loop (upload, extract, match, draft, export) shipped and battle-tested with real tenders. Very active: 658 commits, last activity 14 May 2026. 166 API routes, ~12 core database tables, 57+ documentation files. Phase 0 (validation) largely done, moving into Phase 1 (production polish). What is NOT live: payments / Stripe, multi-user / team features, public marketing site. Near-term focus: a HowItWorks demo rebuild and a sales deck for a Procurement Leadership Group meeting on 19 May 2026.

## Team

- **James** - co-founder, builder.
- **Mike** - co-founder, construction-industry partner; domain expertise and customer access.
- **The Firm** - AI crew (v4.4.2, 34 workers) runs delivery under a strict execution contract. Gaffer routes and classifies every task; CODAX plans and builds, SOFAX audits design, NIGELX enforces the Nigel-first copy standard, STANX hardens routes, TERRX verifies, Frank/Foreman runs the 11-point pre-present gate.

## Agent-first angle

Evidis is the venture where AI agents are the product, not just the build tool, and the discipline it imposes is the whole pitch. The AI explains and drafts but never decides or judges compliance; every claim must trace to a stored document; unsupported claims are never generated. That evidence-integrity rule is what makes an AI tender tool trustworthy enough for a regulated, high-stakes context where a hallucinated capability claim could amount to fraud. Prompt caching cuts the cost of that reasoning ~90%, which is what makes the unit economics work. On the build side, the same one-founder-plus-Firm model produces a multi-service, queue-backed, security-hardened SaaS.

## Strategic position

- **Role in the portfolio:** The cleanest pure-SaaS bet and the strongest "AI as the product" story. Where Doma proves the model on a marketplace and TWIN on bespoke client work, Evidis proves it on a defensible vertical-SaaS product with a co-founder and a real go-to-market partner.
- **Where the leverage is:** The product is built and battle-tested; leverage is getting out of waitlist mode, finishing the marketing site, locking pricing, and converting Mike's industry access into the first paying cohort. The constraint is commercial and go-to-market, not technical.
- **Push or park:** PUSH. Live, co-founded, product works, path to revenue is short and clear. Of the pre-revenue ventures, the most ready.
- **Moat:** The evidence-integrity principle is both product and moat. A generic "AI writes your tender" competitor cannot match it without accepting the same constraint (no claim without a document) that makes the tool slower but trustworthy. Plus a co-founder with construction credibility, evidence-library data lock-in, and a UX built for a customer most software ignores.
- **Biggest risk / next bottleneck:** Still pre-revenue: the product is proven, the business is not. Accuracy is existential, one mis-cited claim in a real tender is reputationally fatal. And selling into conservative, non-technical construction SMEs is an unproven motion.

## Open questions / risks

- Still pre-launch (waitlist): no proven paying-customer revenue; needs marketing site and pricing finalised.
- Accuracy is the product: any hallucination or mis-citation in a live tender is reputationally fatal.
- SME willingness to pay GBP 120+/mo is unproven; pricing elasticity unknown.
- Sales channel undefined: direct, partners, or construction consultants.
- Two-founder dependency; James carries all the build.

## Links

- Repo: /Volumes/Projects/evidis
- Live: https://app.evidis.co.uk (product), https://evidis.co.uk (marketing), https://hq.evidis.co.uk (control centre)
- Lost Monster brief: website/projects/evidis.md (verified accurate, conservative if anything)
- Lost Monster case study: website/case-studies/evidis.md
- Related: uses the shared Canary monitoring package.
