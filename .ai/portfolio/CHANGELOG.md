# Portfolio Changelog

> What moved between `/portfolio` scans. Newest first.

---

## 2026-05-14 — First full scan (11 projects)

First real scan. Every project was NEW, so all 11 were deep-scanned by parallel Explore agents.

**New (all 11):**
- **Doma Montenegro** — Live. Two-sided property marketplace, real revenue, 772 commits. Status: Live. Call: Push (hardest).
- **Evidis** — Pre-launch. AI evidence integrity for construction tenders, co-founded, 658 commits. Call: Push.
- **HospoJobs** — Live. UK hospitality recruitment, paying via boosts, 320+ commits, Montenegro expansion in build. Call: Decide (launch or park).
- **TWIN** — Live. Bespoke recruitment tool + platform for TWIN Group, 139 commits, pure client revenue. Call: Deliver, then decide the offer.
- **Ancarraig Lodges** — Live. James & Rose's lodges + the platform that runs them, 409 commits. Call: Run, don't push.
- **WildTrax Adventures** — Pre-build. Mid-pivot from owning a Land Rover fleet to a curated marketplace, 582 commits. Call: Decide (push or park).
- **GoVozi** — Pre-build. Montenegro transfer marketplace, scaffolded, 11 commits, business plan locked. Call: Push (it's a build).
- **StayFlo** — Pre-build. White-label hospitality SaaS, Phase 0, 1 commit (docs only). Call: Hold / sequence.
- **Canary** — Pre-launch (stalled). Dev error tracking, also shared portfolio infra; no commits since Feb 2026. Call: Park standalone / keep as infra.
- **Barkko** — Cold. UK verified pet-services marketplace, feature-complete, last commit 2026-02-10, never launched.
- **Native Automotive** — Non-code business. Physical Land Rover garage; no codebase, summary from the Lost Monster brief.

**Status flags:**
- Canary classified Pre-launch (stalled): last commit 2026-02-26 (77 days, under the 90-day cold line) but the deep scan found it effectively dormant.
- Barkko classified Cold: ~92 days since last commit, never launched.

**Brief-vs-repo contradictions flagged:**
- StayFlo — brief calls it an "AI-powered guest handbook SaaS"; repo defines a full multi-tenant white-label platform. Brief should be rewritten.
- WildTrax — brief describes the pre-pivot fleet-operations business and a stale "75% complete"; misses the April 2026 marketplace pivot. Brief should be rewritten.
- Barkko — brief claims "production-ready MVP, ready for launch"; repo is 3 months cold with no launch activity.
- Canary — brief lists Redis (not used) and overstates Stripe as "in stack" (deferred, not integrated).
- HospoJobs — brief pre-dates schema growth (17→27 tables, 8→13 parent categories); all additive, not a real contradiction.

**Unchanged:** 0 (first run).
