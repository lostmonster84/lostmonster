# Session Context -- 2026-04-04

## What Shipped
- First 10 real supplements: homepage + landing-pages for DEMX, AIDAX, SOFAX, WORDX, CODAX
- Cross-project analysis of 6 owner projects with dual-mode framework (hospitality vs SaaS)
- `firm-health.sh`: 14-check framework integrity validator (thefirm repo)
- Stack v3.4: /firm project.json reverse source + /go auto-sync + setup check

## Design Decisions Made
- **Dual-mode framework**: Hospitality (warm, photographic, Ken Burns) vs SaaS (dark, mockup-driven, glassmorphism). Workers identify the mode before building
- **Owner's Validated Patterns > external research**: When cross-project evidence conflicts with SCOUTX web research, owner patterns take priority
- **12 build constants are non-negotiable**: Ken Burns, warm canvas, no pure black, hover lift, scroll entrances, generous padding, eyebrow labels, image hover scale, rounded cards, dark footer, two-font strategy, semantic colours
- **Health check lives in thefirm root**: alongside setup.sh and update.sh, dual-mode (master/project)

## Rejected Alternatives
- Single-mode framework -- owner operates in two distinct modes
- grep -P in health check -- not available on macOS, rewrote with sed
- Syncing /gaffer SKILL.md to Stack -- only diff is project-specific design guide path

## In-Progress Work
- 16 proposed taxonomy additions not yet added to SUPPLEMENTS.md
- update.sh overwrites PROTOCOL.md Universal Copy Rules section -- needs upstream fix

## Deferred to Next Session
- Fix update.sh to preserve Universal Copy Rules in PROTOCOL.md
- Add 16 missing taxonomy entries to SUPPLEMENTS.md
- Fix framework drift: add SHOWX, WORDX, MIGRX, WIREX to PROTOCOL.md roster + scoring matrix
- Add ## Supplements section to 29 master playbooks missing it
- Library product: scope as next major build
- Homepage hero: continue DEMX v3.4 exploration (Round 5 started, not scored)
- Sweep .ai/ brand docs for "2-4 weeks" references (~60 remaining)

## Pick Up From Here
1. Fix update.sh PROTOCOL.md overwrite issue (Universal Copy Rules get nuked on sync)
2. `/gaffer DEMX: homepage hero` -- continue v3.4 exploration with supplements loaded
3. Add missing taxonomy entries to SUPPLEMENTS.md
4. Next supplement batch: service-pages, pricing-pages, forms
5. Fix framework drift surfaced by firm-health.sh (orphan workers, scoring matrix)
