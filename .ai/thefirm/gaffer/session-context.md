# Session Context — 2026-05-15

## What Shipped

- Pushed `chore(v4.6.1) strip DOMA project contamination from framework` to lostmonster84/thefirm (commit `9d03bd8`). 23 files, +776/-652 lines.
- 12 worker playbooks generalised upstream (MAPX, BLAZX, INSPX, STANX, TERRX, TESTX, AUDIX, AIDAX, ALLYX, PIXLX, SEOX, SOFAX) + 9 specs/feature-requests swept. SEOX was the biggest (52 DOMA refs) — Dim 6 Hreflang now scales with project locale count, no longer hard-coded to DOMA's 7.
- Local re-pulled cleaned versions and re-onboarded via `/tmp/reonboard.py` — 47 manifest tokens filled across 12 workers. Local DOMA contamination: zero in active workers (only documented KEEP files retain refs).
- Forensic-block scaffold completed: `scripts/install-hooks.sh`, `.githooks/commit-msg`, `.githooks/post-merge`, `.github/pull_request_template.md`. `core.hooksPath` wired to `.githooks/`.
- Firm version: v4.4.2 → v4.6.0 (sync) → v4.6.1 (our cleanup). CLAUDE.md + BLUEPRINT.md + project.json stamped.

## Design Decisions Made

None — backend/infrastructure session.

## Rejected Alternatives

- **Identifier-only tokenisation** vs full generalisation: user picked full generalisation. Worth it — methodology now points at `[DESIGN-GUIDE-PATH]` instead of dictating DOMA's specific palette laws.
- **Leave STRATX worked-example DOMA ref in place**: kept under the same documentation-by-real-example carve-out as GAFFER's contamination-scan section. Flag if the framework's worked examples should be neutralised in a later pass.
- **Strip the "real-estate-shaped" worked examples from calibration-anchors-template.md**: not done — the template now wraps them in a "from a real-estate marketplace project" framing note. Concrete examples kept for usefulness; the wrapper makes the scope explicit.

## In-Progress Work

None — every piece committed locally or pushed upstream.

## Deferred to Next Session

- **Upstream Firm catalogue**: add 11 new tokens to `~/Projects/thefirm/.ai/thefirm/ONBOARDING.md` Token Catalogue + `schemas/project.schema.json`. Without this, the next project that /syncs will treat them as "gaps". (debts.md)
- **Merge reonboard.py pattern into /sync or update.sh** so worker methodology drift gets re-onboarded automatically. Currently ad-hoc at /tmp. (debts.md)
- **Extend subsystems.json** with globs for `.githooks/`, `.github/`, `scripts/install-hooks.sh` — the forensic generator's "uncategorised" bucket flagged this. (debts.md)
- **Pre-existing UX/content debts unchanged**: "2-4 weeks" refs sweep (~60 in .ai/), content pages styling (white bg vs homepage dark gradient), case-study HTML preview fix, content-page CTAs, stale website/projects/ briefs (StayFlo / WildTrax / Barkko). None touched this session.

## Pick Up From Here

1. **/dayclose to push the local commit** — 1 commit ahead of origin after this /wrap. Push triggers nothing critical since the work is framework + docs, but completes the eject.
2. **Close one of the long-running debts**: the website/projects/ briefs sweep (StayFlo / WildTrax / Barkko) is the most actionable — `.ai/portfolio/` OVERVIEWs are fresh, just rewrite the website briefs from them.
3. **OR address upstream catalogue debt** (add new tokens to ONBOARDING.md + project.schema.json) while the SEOX context is fresh in head.
4. The "2-4 weeks" sweep (~60 refs across `.ai/`) is overdue — flagged 6 weeks ago, still open.
