# Portfolio Index

> The running tally of every project Lost Monster is developing. Maintained by the `/portfolio` skill.
> **Last scan: 2026-05-14** — first full scan, 11 projects.

## Active Ventures

Ordered by maturity / proximity to revenue. "Strategic call" is the push/park verdict from each OVERVIEW's `## Strategic position` section.

| Project | Status | Strategic call | Last commit | One-liner | OVERVIEW |
|---------|--------|----------------|-------------|-----------|----------|
| Doma Montenegro | Live | **Push — hardest** | 2026-05-14 | The Rightmove of Montenegro: two-sided property marketplace, built in 3 months, real revenue | [doma.md](projects/doma.md) |
| Ancarraig Lodges | Live | **Run, don't push** | 2026-04-26 | 12 self-catering lodges overlooking Loch Ness; the benchmark + StayFlo's Tenant #0 | [ancarraig.md](projects/ancarraig.md) |
| TWIN | Live | **Deliver, then decide the offer** | 2026-05-14 | Bespoke recruitment tool (+ cinematic platform) for a film/VFX studio — pure client work | [twin.md](projects/twin.md) |
| HospoJobs | Live | **Decide — launch or park** | 2026-05-14 | UK hospitality recruitment; free posting, boosts + subscriptions; Montenegro expansion in build | [hospojobs.md](projects/hospojobs.md) |
| Evidis | Pre-launch | **Push** | 2026-05-14 | AI evidence integrity for construction tenders; co-founded B2B SaaS | [evidis.md](projects/evidis.md) |
| Canary | Pre-launch (stalled) | **Park standalone / keep as infra** | 2026-02-26 | Dev error tracking + session replay ("Linear meets Sentry"); shared portfolio infrastructure | [canary.md](projects/canary.md) |
| GoVozi | Pre-build | **Push — it's a build** | 2026-05-08 | Montenegro's pre-booked fixed-price transfer marketplace; a Hello Monte product | [govozi.md](projects/govozi.md) |
| WildTrax Adventures | Pre-build | **Decide — push or park** | 2026-05-04 | Curated adventure-vehicle marketplace; mid-pivot from owning a Land Rover fleet | [wildtrax.md](projects/wildtrax.md) |
| StayFlo | Pre-build | **Hold / sequence** | 2026-04-26 | Multi-tenant white-label hospitality SaaS — productisation of the Ancarraig platform | [stayflo.md](projects/stayflo.md) |

## Portfolio shape at a glance

- **Four Live:** Doma (real revenue), TWIN (live client revenue), HospoJobs (live, paying via boosts), Ancarraig (trading hospitality business). Doma is the flagship and proof-of-model.
- **Two need a decision, not more building:** HospoJobs and WildTrax are both stuck on a launch/push-or-park call. GoVozi is validated on paper and stuck on a focused 4-6 week build block.
- **One pre-launch and ready to push:** Evidis — product built and battle-tested, blocked only on marketing site + pricing + first paying cohort.
- **One long-horizon compounding bet:** StayFlo — strategically the most valuable (it productises Ancarraig and reuses Doma/WildTrax/adminpanel), but earliest-stage; should follow the revenue-closer ventures.
- **One stalled, one cold:** Canary has not been committed to since Feb 2026 (better treated as internal infrastructure than a standalone venture); Barkko is fully built but ~3 months cold and never launched.
- **The clearest single message for an outsider:** one operator, an AI crew (The Firm), nine software ventures plus a physical garage — across real estate, hospitality, construction SaaS, recruitment, travel and developer tools — spanning live businesses, pre-launch products and bespoke client work.

## Non-code / physical businesses

| Project | Status | Strategic call | One-liner | OVERVIEW |
|---------|--------|----------------|-----------|----------|
| Native Automotive | Non-code business | **Run & resource** | Independent Land Rover specialist garage, Scottish Highlands — the portfolio's steady non-seasonal cashflow | [native.md](projects/native.md) |

## Archived / Inactive

**Cold venture (built, not launched, no recent activity):**
- **Barkko** — UK verified pet-services marketplace. Feature-complete, ~3 months cold (last commit 2026-02-10), never launched. [barkko.md](projects/barkko.md)

**Archive container** (`/Volumes/Projects/archive/` — not scanned, listed for reference):
- `_archive-stayflo-evidis-202603`, `adminpanel`, `anchor`, `checkmark`, `docra`, `footballstays`, `guestscore`, `propertyfinders`, `slydes`, `universal-framework`, `visitboka`

## Notes

- **Last scan:** 2026-05-14 (first full scan — all 11 projects deep-scanned).
- **Excluded:** `lostmonster` itself (the master agency, not a venture).
- **Brief-vs-repo drift flagged this scan:** StayFlo (brief calls it a "guest handbook SaaS"; repo is a full white-label platform), WildTrax (brief describes the pre-pivot fleet business and is ~6 months stale), Barkko (brief says "ready for launch"; repo is 3 months cold), Canary (brief lists Redis — unused — and overstates Stripe), HospoJobs (brief pre-dates schema growth; all additive). The Lost Monster `website/projects/` briefs for StayFlo and WildTrax should be rewritten.
- Source repos live on `/Volumes/Projects/` (read-only — the skill scans, never edits).
