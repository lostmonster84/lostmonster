# Evidis — AI Evidence Integrity for Construction

> AI-powered SaaS helping construction SMEs respond to tenders with clarity and evidence, not guesswork and boilerplate.

---

## The Challenge

Construction procurement is broken for small businesses. Tender questions are written in abstract corporate language that obscures what's actually being asked. A 10-person groundworks contractor gets a 40-page PQQ asking about "your organisation's approach to social value delivery through supply chain engagement" — and they have no idea how to respond.

So they guess. They copy from previous submissions. They overclaim capabilities they can't evidence. Or they just don't bid at all — losing work they're perfectly capable of delivering.

The industry's existing tools focus on accreditation and compliance checklists. Nobody was helping SMEs actually understand what's being asked and respond honestly with real evidence.

## What I Built

An AI-powered evidence management platform that sits between tender questions and honest answers.

### Question Interpreter
Upload a tender, and AI extracts every question, then explains what each one actually means in plain English. "What is your organisation's approach to environmental management?" becomes "They want to see: a written environmental policy, evidence you've used it on a real project, and what you'd do differently if something went wrong."

### Evidence Library
Upload policies, certificates, past project records, training logs — anything that proves capability. AI auto-categorises and tags each document. 11 evidence categories from health & safety to case studies. Upload once, reuse across every tender.

### Semantic Matching
AI matches evidence to questions using pgvector embeddings and category-based scoring. Each match comes with a confidence badge: "Fully supported" (green), "Needs editing" (amber), or "Needs work" (red). When evidence is missing, the system tells you exactly what to provide.

### Draft Generation
AI writes professional responses backed by cited evidence. No hallucination — if it can't find supporting documents, it says so. Prompt caching cuts AI costs by 90% across multi-question tenders.

### Split-Screen Review
Question list on the left, full answer on the right. Click through questions, review drafts, upload missing evidence mid-flow. Export the complete tender as Word, PDF, or Excel with linked evidence files.

## Tech Stack

- **Next.js 16** with App Router
- **PostgreSQL** + **pgvector** for semantic search
- **Redis** + **BullMQ** for background document processing
- **Cloudflare R2** for evidence file storage
- **Anthropic Claude API** with prompt caching
- **Resend** for email
- **Railway** deployment (4 services)

## Design

Warm and trustworthy — white cards on warm cream canvas. Deep midnight brand colour. Teal-green for AI confidence indicators. Built for Nigel: a 55-year-old construction business owner who knows his trade but doesn't read tooltips. If it's not obvious, it's wrong.

No percentages — qualitative badges only ("Good", "Needs Attention"). No jargon. No dashboards pretending to be clever. Just clear answers backed by real evidence.

## Results

- **30+ API routes** powering the full tender response pipeline
- **90% AI cost reduction** through prompt caching
- **57 documentation files** covering every aspect of the product
- **Co-founded** with a construction industry partner
- **Active users** in waitlist mode with demo account for zero-token demonstrations
- **Background processing** handles document analysis without blocking the UI

## What Makes This Different

Evidis doesn't judge whether you're "compliant." It helps you demonstrate real capability with real evidence. The principle is non-negotiable: nothing becomes a claim unless it's backed by a stored document.

That's not a feature. That's the entire philosophy of the product.

---

**Industry:** Construction / Procurement
**Timeline:** Active development (v1)
**Type:** AI-powered SaaS with co-founder
