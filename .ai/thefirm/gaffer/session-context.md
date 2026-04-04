# Session Context -- 2026-04-04

## What Shipped
- First 10 real supplements: homepage + landing-pages for DEMX, AIDAX, SOFAX, WORDX, CODAX
- Cross-project analysis of 6 owner projects (DOMA, HospoJobs, Ancarraig, WildTrax, Slydes, Evidis)
- Owner's Validated Patterns section added to all supplements with dual-mode framework
- firm-health.sh: 14-check framework integrity validator (thefirm repo)
- Fixed supplement sync path bug (supplements now sync correctly to all projects via update.sh)

## Design Decisions Made
- **Dual-mode framework**: Hospitality (warm, photographic, Ken Burns) vs SaaS (dark, mockup-driven, glassmorphism). Workers identify the mode before building
- **Owner's Validated Patterns > external research**: When cross-project evidence conflicts with SCOUTX web research, owner patterns take priority
- **12 build constants are non-negotiable**: Ken Burns, warm canvas, no pure black, hover lift, scroll entrances, generous padding, eyebrow labels, image hover scale, rounded cards, dark footer, two-font strategy, semantic colours

## Rejected Alternatives
- Single-mode framework -- owner operates in two distinct modes
- Putting owner patterns in a separate file workers must load manually -- embedded directly in supplements instead
- grep -P in health check -- not available on macOS, rewrote with sed

## In-Progress Work
- update.sh overwrites PROTOCOL.md and removes Universal Copy Rules section -- needs fixing upstream (add section to master PROTOCOL.md)
- Skills /firm, /gaffer, /go are local-ahead of Stack -- need /stack push

## Deferred to Next Session
- Fix update.sh PROTOCOL.md overwrite (add Universal Copy Rules to upstream PROTOCOL.md)
- Push /go, /firm, /gaffer skill changes to thestack via /stack
- Add 16 missing taxonomy entries to SUPPLEMENTS.md
- Fix framework drift: add SHOWX, WORDX, MIGRX, WIREX to PROTOCOL.md roster + scoring matrix
- Homepage hero: continue DEMX v3.4 exploration (Round 5 started, not scored)
- Sweep .ai/ brand docs for "2-4 weeks" references (~60 remaining)
- Library product: scope as next major build
- Next supplement batch: service-pages, pricing-pages, forms

## Pick Up From Here
1. Add Universal Copy Rules to upstream PROTOCOL.md (permanent fix for update.sh overwrite)
2. `/stack` push for /go, /firm, /gaffer skills
3. `/gaffer DEMX: homepage hero` -- continue v3.4 exploration with supplements now loaded
4. Add missing taxonomy entries to SUPPLEMENTS.md
5. Next supplement batch: service-pages, pricing-pages, forms
