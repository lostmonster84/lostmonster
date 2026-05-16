# TODO

## From 2026-05-14

- [ ] **Jack Stanley / Ketchum questionnaire** — react to the Q3 draft (where the human is irreplaceable), then draft Q4-Q7. Q1 and Q2 are drafted with crew-approved voice. Source material: the `.ai/portfolio/` knowledge base. Full state in `.ai/thefirm/gaffer/session-context.md`.
- [ ] **Rewrite stale venture briefs** in `website/projects/` — StayFlo, WildTrax and Barkko briefs contradict current repo reality (see debts.md). Rewrite from the `.ai/portfolio/` OVERVIEWs.

## From 2026-05-16 (v4.6.3 backlog)

- [ ] **Rebase-aware risk scan** — detect `GIT_REFLOG_ACTION=rebase` and skip scan during interactive rebases (currently fires on every replayed commit; ~2s per 20-commit rebase + noisy output)
- [ ] **Resolved-section exclusion in risk scan** — currently scans entire `debts.md` including the `## Resolved` section, generating false positives on files mentioned in old resolved debts. Filter to lines above the `## Resolved` heading.
- [ ] **`FIRM_PATH` env var for monorepo paths** — risk scan hardcodes `.ai/thefirm/gaffer/...` relative to git root. Monorepos with The Firm at `packages/agency/.ai/thefirm/` get a silent no-op. Add upward-search or env var override.
- [ ] **`/sync` auto-triggers install-hooks.sh** — projects upgrading to v4.6.2 receive doc changes via `/sync` but must manually run `scripts/install-hooks.sh` to register the new pre-commit. Add to `/sync` when `.githooks/` files change.
- [ ] **Opt-in prompt before `.husky` override** — `install-hooks.sh` silently overrides existing `core.hooksPath = .husky` to `.githooks`. Projects on Husky get redirected without warning. Add an opt-in prompt.
- [ ] **Per-reviewer-playbook confidence sections** — Rule 18 ships with a per-worker criteria table in PROTOCOL.md only; reviewer playbooks (SOFAX, AIDAX, NIGELX, CONSX, PIXLX, STANX, TERRX) extrapolate. Add a `## Confidence Tier` section to each playbook for direct discoverability.
- [ ] **Formal `confidence-tier-drift` calibration ledger** — TRAINX Trigger E tracks the pattern behaviourally but there's no formal ledger schema in `calibration.md` yet. Add one once we have ~5 sessions of telemetry data to inform the format.
- [ ] **Backfill missing v4.0–v4.6.1 evolution entries** — `evolution.md` jumps from v3.18 (Apr 2026) directly to v4.6.2 (today). All v4.x history is missing from the local copy. Recover from upstream `~/Projects/thefirm/.ai/thefirm/gaffer/evolution.md` and merge.
