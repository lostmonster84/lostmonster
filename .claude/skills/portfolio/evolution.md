# Portfolio Evolution Log

> How the /portfolio skill learns and improves over time. Per-project state — never synced upstream.

---

### Learned Rules

- **The 90-day cold cutoff is blunt — trust the agent's read.** Classification by last-commit age alone is too crude. If a deep-scan agent reports a project as dormant/stalled/paused even when it is under 90 days (Canary was 77 days but effectively dead), reflect that in the Status line (e.g. "Pre-launch (stalled)") rather than marking it cleanly active.
- **First run is heavy by design.** A first full scan deep-scans every project (~11 parallel Explore agents, 20-36 tool calls each). That is expected and one-off. Subsequent runs use the SCAN stamp for change detection and should only touch repos whose git HEAD moved.

---

## Run #1 — 2026-05-14 — First full scan

- **Caught:** All 11 projects discovered and classified correctly (9 active ventures, 1 cold = Barkko, 1 non-code = Native; lostmonster excluded as master; archive/ listed not scanned). Flagged 5 brief-vs-repo contradictions the deep scans surfaced (StayFlo definition drift, WildTrax stale pre-pivot brief, Barkko "ready for launch" vs cold repo, Canary Redis/Stripe inaccuracies, HospoJobs additive schema growth). Caught Canary as stalled despite being under the 90-day cold threshold.
- **Missed:** Nothing flagged by the user (first run — no baseline to compare against).
- **Friction:** 11 parallel Explore agents is a large, expensive operation. Acceptable for a first run; would be wasteful if it happened every run. The smart-update SCAN-stamp mechanism exists precisely to prevent that — next run should confirm it works (most repos will be UNCHANGED unless committed to since 2026-05-14).
- **User overrode:** Nothing.

---

## Run #0 — 2026-05-14 — Skill created

- **Caught:** N/A — skill scaffolded, not yet run.
- **Notes:** Created as a project-specific skill for lostmonster (the master agency). Scans `/Volumes/Projects/`, maintains `.ai/portfolio/`. Decisions at creation: location `.ai/portfolio/`, invocation `/portfolio`, smart-update + changelog mode. First real run will populate `projects/` and `INDEX.md`.
