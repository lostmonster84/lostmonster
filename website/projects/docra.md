---
name: Docra
slug: docra
status: wip
type: saas
industry: Construction / Procurement
stack: [Next.js 16, TypeScript, Tailwind CSS 4, Supabase, Anthropic Claude API, Resend, DnD Kit]
---

# Docra — AI Procurement Reasoning for Construction SMEs

AI-powered tool that helps small construction contractors understand and honestly answer complex tender questions using evidence-backed responses.

## What It Does

Interprets abstract procurement language (PQQs, RFIs, ITTs), matches questions to stored evidence documents, drafts proportionate responses, and identifies evidence gaps. Makes procurement fairer for SMEs.

## Key Features

- **Question interpretation** — AI extracts real intent from corporate procurement language
- **Behaviour decomposition** — Breaks down what each question actually asks
- **Evidence library** — Store policies, certificates, past answers; reuse across tenders
- **Evidence-backed drafting** — AI generates responses tied to real documents (no hallucination)
- **Gap identification** — Shows exactly what evidence is missing and what to provide

## Design Philosophy

Calm, non-judgemental, minimal. Desktop-first (thinking work). AI explains but never decides. Human confirmation required on all claims. No hallucination tolerance.

## Architecture

Three co-located Next.js apps:
- **App** (app.docra.co.uk, port 4000) — Main product
- **Marketing** (docra.co.uk) — Public website
- **HQ** (hq.docra.co.uk) — Operations hub with all product documentation

## Non-Negotiable Principles

1. Evidence First — nothing becomes a claim without stored documents
2. AI Explains, Not Decides — never judges compliance
3. Proportionate to SME Reality — lightweight proof is valid
4. Transparency Over Automation — every AI output is labelled
5. No Hallucination Tolerance — unsupported claims never generated

## Status

Pre-beta / v1 build. Comprehensive documentation (PRD, AI system spec, database schema, design language). Carbon copy from Evidis codebase, being adapted for construction procurement specifically.
