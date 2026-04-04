# Session Context -- 2026-04-04

## What Shipped
- First 10 real supplements: homepage + landing-pages for DEMX, AIDAX, SOFAX, WORDX, CODAX
- Cross-project analysis of 6 owner projects (DOMA, HospoJobs, Ancarraig, WildTrax, Slydes, Evidis)
- Owner's Validated Patterns section added to all supplements with dual-mode framework
- Pushed upstream to thefirm repo. Synced back via /sync
- firm-health.sh added to thefirm repo (separate session)

## Design Decisions Made
- **Dual-mode framework**: Hospitality (warm, photographic, Ken Burns) vs SaaS (dark, mockup-driven, glassmorphism). Workers identify the mode before building
- **Owner's Validated Patterns > external research**: When cross-project evidence conflicts with SCOUTX web research, owner patterns take priority
- **12 build constants are non-negotiable**: Ken Burns, warm canvas, no pure black, hover lift, scroll entrances, generous padding, eyebrow labels, image hover scale, rounded cards, dark footer, two-font strategy, semantic colours

## Rejected Alternatives
- Putting owner patterns in a separate file workers must load manually -- instead embedded directly in each supplement for zero-friction access
- Making supplements project-specific -- kept universal per the supplement system design. Project design guide handles brand, supplement handles craft
- Single-mode framework -- owner clearly operates in two distinct modes. Pretending one size fits all would produce generic output

## In-Progress Work
- 16 proposed taxonomy additions (comparison pages, listing pages, changelog, etc.) still not added to SUPPLEMENTS.md
- update.sh overwrites PROTOCOL.md and removes Universal Copy Rules section -- needs fixing upstream
- Skills /firm, /gaffer, /go are local-ahead of Stack -- need /stack push

## Deferred to Next Session
- Push /go, /firm, /gaffer skill changes to thestack via /stack
- Fix update.sh to preserve Universal Copy Rules in PROTOCOL.md (or add to upstream PROTOCOL.md)
- Add 16 missing taxonomy entries to SUPPLEMENTS.md
- Fix framework drift: add SHOWX, WORDX, MIGRX, WIREX to PROTOCOL.md roster + scoring matrix
- Library product: scope as next major build (browsable pattern library on lostmonster.io)
- Homepage hero: continue DEMX v3.4 exploration (Round 5 started, not scored)
- Sweep .ai/ brand docs for "2-4 weeks" references (~60 remaining)

## Pick Up From Here
1. Fix update.sh PROTOCOL.md overwrite issue (Universal Copy Rules get nuked on sync)
2. `/stack` push for /go, /firm, /gaffer skills
3. `/gaffer DEMX: homepage hero` -- continue the v3.4 exploration with supplements now loaded
4. Add missing taxonomy entries to SUPPLEMENTS.md
5. Next supplement batch: service-pages, pricing-pages, forms
