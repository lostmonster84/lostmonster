# Session Context -- 2026-05-14

## What Shipped
- `/sync` ran: The Firm v3.16 → v4.4.2 (34 workers), The Stack synced (4 new skills: buildplan, debtloop, devstart, healthcheck). ROADX worker onboarded.
- New `/portfolio` skill -- project-specific, scans `/Volumes/Projects/`, maintains `.ai/portfolio/` knowledge base. Never synced to The Stack.
- First full portfolio scan: 11 deep venture OVERVIEWs (doma, evidis, hospojobs, twin, ancarraig, wildtrax, govozi, stayflo, canary, barkko, native) + INDEX + CHANGELOG.
- Forensic logging infrastructure adopted (`scripts/`, `subsystems.json`). `docs/BLUEPRINT.md` created.
- 3 commits pushed: 02913ec (sync), 160472b (portfolio), + dayclose wrap.

## Design Decisions Made
- **`/portfolio` lives only in lostmonster.** It is the "master agency" view -- read-only on every sibling repo, never pushed to The Stack. Output goes to `.ai/portfolio/` (chosen over `docs/` or extending `website/projects/`).
- **Smart-update via SCAN stamps.** Each `projects/*.md` carries `<!-- SCAN: head=<sha> date=... -->`. Re-runs only deep-scan repos whose git HEAD moved -- the first run was the expensive one (11 parallel agents).
- **subsystems.json tailored, not copied.** The Stack template's example manifest is app-shaped (apps/, packages/); lostmonster is a marketing-site + framework monorepo, so the manifest was authored fresh.
- **Forensic block hand-written.** No `tsx` at repo root -- the generator self-heals into `scripts/` but cannot run here. Captured as dayclose learned rule 3.

## Rejected Alternatives
- Putting the portfolio KB in `website/projects/` -- rejected: mixes internal strategic intel with publishable website content.
- Full-regenerate-every-run for `/portfolio` -- rejected in favour of smart-update + changelog.
- Copying the Stack template's subsystems.json verbatim -- rejected: globs would never match this repo's shape.

## In-Progress Work
- **Jack Stanley / Ketchum questionnaire** -- 7-question research questionnaire on how AI is changing what brands are for. Q1 + Q2 drafted (voice crew-approved). Q3 (where the human is irreplaceable) has a draft on the table awaiting James's react -- one accuracy note flagged: "the Nigel test" is shorthand; the persona actually varies by project (Nigel/Evidis, Graduate Grace/HospoJobs, Tourist Tom/GoVozi). Q4-Q7 unstarted. Source material: the `.ai/portfolio/` knowledge base (fresh, fact-checked).

## Deferred to Next Session
- React to Ketchum Q3, then draft Q4-Q7 (belief questions -- need James's actual take, crew can propose positions from how he operates).
- Rewrite stale `website/projects/` briefs (StayFlo, WildTrax, Barkko) from the `.ai/portfolio/` OVERVIEWs -- logged in debts.md.
- Forensic generator + lint-subsystems can't run without tsx -- decide whether to add a minimal root toolchain or keep hand-writing blocks.

## Pick Up From Here
1. **Ketchum questionnaire** -- react to the Q3 draft, then draft Q4-Q7. This is the live task James paused. See TODO.md + the Q3 draft in the last session transcript.
2. Rewrite the 3 stale venture briefs in `website/projects/` from the portfolio OVERVIEWs.
3. Existing open debts unchanged: content pages don't match Bold Personal Brand, no CTA on content pages, "2-4 weeks" doc sweep, case-study listing raw HTML.
