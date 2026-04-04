# Changelog

## 2026-04-04 — Firm Health Check + System Audit

### Features
- `firm-health.sh` added to thefirm repo: 14-check framework integrity validator
- Supports master repo and project installation modes, --fix and --verbose flags

### Audit Findings
- Full Firm system review: 31 workers, 47 files, 5 departments
- Identified 4 orphan workers (SHOWX, WORDX, MIGRX, WIREX not in PROTOCOL.md roster)
- 7 workers missing from scoring matrix (invisible to Smart Routing)
- 29/31 workers missing ## Supplements section in master playbooks
- FIRM-CONTEXT.md worker table out of sync with PROTOCOL.md

## 2026-04-03b — DEMX v3.4 First Run + Copy Rules

### Features
- DemxScaffold component: reusable dark-theme variation browser with AIDAX score bars, tab navigation, quick comparison grid
- Homepage hero DEMX exploration: 5 rounds of variations testing messaging angles, copy honesty, and dev studio voice
- Demo page at /demo/homepage-hero-variations with live rendering and scores.json sidecar

### Improvements
- Universal Copy Rules added to PROTOCOL.md: no em dashes, no semicolons in UI copy
- WORDX playbook: Punctuation Rules section (em dashes, semicolons, exclamation marks, ellipsis)
- Slop test Red Flag #11: Em dashes (docs/slop-test.md + website/.ai/slop-test.md)
- Removed "2-4 weeks" timeline claims from homepage, design page, and all DEMX variations
- Replaced with verifiable metrics (80/100 quality floor, 4.9/5 client rating)
- Cleaned em dashes from production homepage copy (5 instances)

## 2026-04-03 — Supplement System (The Firm v3.17)

### Major
- Built complete supplement system — universal domain knowledge layer for workers
- 45+ job type taxonomy (pages, components, flows, content types)
- Supplement template with 12 sections (patterns, benchmarks, mobile/a11y/perf, planning)
- SCOUTX Mode 5: research-to-supplement pipeline with refresh protocol
- TRAINX Trigger D: feedback loop with correction classification (craft/project/preference)
- Smart Routing expanded to 9 steps (job type classification + supplement loading)
- Build Gate Check #7: two-way supplement verification
- Supplement lifecycle: provisional → validated → stale → retired
- Learning loop: corrections → Evolution table → SCOUTX refresh → better supplements

### Improvements
- /go skill: auto-syncs when framework drift detected (was just a warning)
- /go skill: surfaces SETUP-TODO.md during orientation
- Resolved debt: /go SETUP-TODO surfacing
- Pushed v3.17 upstream to thefirm repo

## 2026-04-01 — Cleanup + Setup Scaffolding

### Housekeeping
- Deleted 3 stale branches (prepod, preprod, updateddesign) — all merged
- Committed Gaffer Step 0 (setup check in session-start protocol)
- Ran /sync — Firm + Stack confirmed up to date

### Setup Framework
- Scaffolded SETUP-TODO.md (8-step guided checklist for project onboarding)
- Scaffolded docs/PRD.md, docs/DESIGN-GUIDE.md, docs/slop-test.md templates
- Updated SETUP-TODO statuses: 4/8 done (project.json, CLAUDE.md, CLAUDE-SUPPLEMENT.md, worker onboarding), 4 templates need filling (PRD, Design Guide, design-config.json, Slop Test)

## 2026-03-25 — Studio Pivot + Content Sweep

### Major
- Pivoted Lost Monster from personal brand to dev studio ("We Build What We Sell")
- Built 10-section studio homepage: hero, metrics, capabilities, featured work, studio story, industries, tech stack, process, partnership, CTA
- Swept 17 projects from /Volumes/Projects/ — created structured profiles in website/projects/

### Content
- Wrote 5 case studies: Ancarraig, DOMA, HospoJobs, TWIN, Evidis
- Wrote 4 service pages: Booking Systems, E-commerce, Custom Applications, Design Systems
- Wrote Process page (6-phase methodology)
- Wrote FAQ page (20 Q&As across 5 categories)
- Rewrote About page from "I" to studio "we" voice

### Features
- Created /design living design guide (v2, 14 sections, 661 lines)
- Added dynamic [slug] route for case studies (was hardcoded /ancarraig only)
- Fixed FAQ parser (regex-based h3 matching, was broken string split)
- Fixed case studies listing voice ("our" → "my" → "we" with studio pivot)

### Design Guide
- Created docs/design-config.json (v2.0) — colours, typography, gradients, glassmorphism, icons, backgrounds, voice, anti-patterns
- 14 sections with live rendered examples: gradient strips, glassmorphism showcase, button sizes, card variants, metric cards, hover effects
