# Session Context — 2026-04-01 (final)

## What Shipped
- The Firm v3.15-3.16 pushed to GitHub (project.json, Evidence Gate, mandatory pairings, DEMX overhaul, anti-patterns, score anchors, CRITICAL enforcement)
- Stack upgrades pushed (design feedback loop, session context bridge, skill hardening, /sync auto-generate project.json)
- Setup flow: SETUP-TODO + templates scaffolded by both setup.sh and update.sh
- update.sh now auto-generates project.json from CLAUDE.md + codebase scan when missing
- Gaffer auto-fills SETUP-TODO from codebase on pre-existing projects
- /sync verified clean on lostmonster: v3.16 stamped, all tokens filled, all health checks clear
- Tested on WildTrax in parallel — identified and fixed missing project.json generation + aggressive design guide detection

## Design Decisions Made
- thefirm and thestack stay as separate repos (different evolution speeds)
- project.json is the single source of truth for all token values per project
- update.sh generates project.json if missing (shell script, not AI-dependent)
- Evidence Gate uses NULL scores (not zero) to block pipeline

## Rejected Alternatives
- Merging thefirm + thestack — rejected for separation of concerns
- Requiring manual project.json creation — rejected, now auto-generated

## In-Progress Work
- SETUP-TODO for Lost Monster: 4/8 done. Steps 4-7 (PRD, Design Guide, design-config.json, Slop Test) are templates that need filling
- WildTrax needs /sync re-run to get the project.json auto-generator
- /go skill needs a learned rule to surface SETUP-TODO.md (logged as debt)
- 3 local-ahead skills (firm, gaffer, sync) — project-specific fills, expected

## Deferred to Next Session
- Work through SETUP-TODO Steps 4-7 with the Gaffer (PRD, Design Guide, design-config, Slop Test)
- Gaffer should auto-draft these from the codebase (pre-existing project mode)
- 3 open debts from 2026-03-25 (content pages brand mismatch, no CTAs, raw HTML in previews)
- /go learned rule for SETUP-TODO.md detection (debt logged)

## Pick Up From Here
1. Run /go — Gaffer detects SETUP-TODO, auto-fills Steps 4-7 from codebase
2. Run /design to generate design-config.json
3. Address 3 open content debts from 2026-03-25
4. Run /sync on WildTrax to test project.json auto-generation
