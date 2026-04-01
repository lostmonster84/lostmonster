# Changelog

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
