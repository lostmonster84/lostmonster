# Dayclose — Evolution Log

> Per-project learning for the /dayclose skill. Never synced upstream.

### Learned Rules

1. **Session-context.md may have been modified by another process** — always re-read before writing (got file-modified error this session)
2. **Check if session log already has an entry for today** — this project had two sessions on the same day. Use date suffixes (2026-04-01b) to disambiguate
3. **Forensic generator needs tsx — this repo has none.** No root `package.json`, no `tsx`. Self-heal copies `scripts/forensic-log.ts` in (correct, idempotent) but it cannot be executed here. Hand-write the forensic block — the generator is a convenience, the block is the requirement. Same applies to `lint-subsystems.ts`.
4. **Framework/docs/skills sessions have no deploy surface.** When a session only touches `.ai/`, `.claude/`, `docs/`, `CLAUDE.md` etc. and never `website/`, skip Step 10 (deploy verify) — the website deploys to Vercel and was untouched, nothing else deploys anywhere. Note it in the session log rather than waiting on a non-existent deploy.

---

## 2026-05-15 — Firm v4.6.1 DOMA Cleanup + Worker Re-Onboarding

**Caught:** Framework sync check correctly detected zero drift to push — Firm push (commit `9d03bd8 chore(v4.6.1) strip DOMA project contamination`) already happened mid-session via `git push origin main` in `~/Projects/thefirm/`, and Stack was unchanged. Local Firm HEAD matched `ls-remote origin main` exactly, so no false `/firm` invoke. /wrap already handled CHANGELOG / session-log / debts / BLUEPRINT / session-context / forensic block; /dayclose was lean — push + cache + volume release. No sensitive files, no demo pages, no stashes. The line-count delta scan in /sync was the win that surfaced the contamination — keep that scan going forward (it caught 14 drifted workers update.sh's preservation policy was shielding).
**Missed:** Initially under-scoped the contamination scope — first pass saw only the 9 workers without manifests; SEOX (52 refs) + TESTX (full DOMA-onboard leak) + 9 specs/FRs were caught only on a second wider scan. Next time: pair the line-count delta with a `\bDOMA\b` word-boundary grep across the whole `.ai/thefirm/` tree before declaring scope.
**Friction:** Forensic generator needed `--include-working` and `npx tsx` (vs `pnpm exec tsx`) at /wrap because HEAD was still at session start and pnpm has no workspace at repo root. Logged in /wrap evolution; both nuances belong in the runbook for both skills. `git reset HEAD -- .env*` errors on zsh with "no matches found" when no `.env` files exist — known issue from /wrap evolution learned rule, ignored via `2>/dev/null`.
**User overrode:** Deploy check skipped (framework/docs session — consistent with prior framework/docs dayclose pattern, per learned rule 4). Nothing app-side was touched; website untouched.

---

## 2026-05-14 — Framework Sync + Portfolio Intelligence

**Caught:** Two unpushed session commits detected and pushed. Step 7 correctly filtered ROADX onboarding (manifest fill — must not push upstream) and the project-specific `/portfolio` skill (no upstream equivalent) — nothing genuine to push, no false `/firm` or `/stack` invoke. `.vscode/` and `website/node_modules/` untracked-since-session-start caught and gitignored (monorepo `/node_modules` only anchored root). Forensic infra self-healed from Stack template. `docs/BLUEPRINT.md` was missing — created. No sensitive files, no demo pages, no stashes, on `main`.
**Missed:** Nothing flagged by the user.
**Friction:** Forensic generator unrunnable (no tsx) — had to hand-write the block. subsystems.json had to be authored from scratch and tailored (Stack template's example is app-shaped, not monorepo-shaped). New learned rules 3 + 4 capture both so future runs do not re-derive them.
**User overrode:** Deploy check skipped (no application code touched — consistent with prior framework/docs sessions).

---

## 2026-04-04b — Supplements + Cross-Project Analysis + Path Fix

**Caught:** Supplement sync path bug in thefirm repo (supplements at `crew/` instead of `.ai/thefirm/crew/`). update.sh PROTOCOL.md overwrite (Universal Copy Rules stripped twice -- restored both times). CODAX-homepage missing Planning Implications section.
**Missed:** The path bug should have been caught during the initial /firm push. The /firm skill copies to `crew/` at repo root, but update.sh reads from `.ai/thefirm/crew/`. Need to fix /firm skill to use correct path.
**Friction:** Multiple wrap/dayclose cycles on same day from different conversations. Session log and changelog need careful append-not-overwrite.
**User overrode:** No deploy check (no production code). Deferred /stack push to next session.

---

## 2026-04-04 — Firm Health Check + Supplements + Stack Sync

**Caught:** Stack skill drift (3 skills), committed stack/evolution.md from mid-session /stack run. Session context updated with full day's work across 3 conversations.
**Missed:** Nothing -- this was a continuation conversation, most work already wrapped by other instances.
**Friction:** Multiple conversations on same day means changelog/session-log entries already exist. Need to append not overwrite. Handled correctly this time.
**User overrode:** No deploy check needed (no production code changes this session -- all framework/docs).

---

## 2026-04-03b — DEMX v3.4 First Run + Copy Rules

**Caught:** DEMX screenshots cleaned (25+ PNGs), .playwright-mcp/ artifacts removed, 90MB .next cache purged, Firm local-ahead detected (PROTOCOL.md, WORDX). Em dashes caught in production homepage. "2-4 weeks" timeline claims caught and removed.
**Missed:** Firm push not executed this session (flagged as debt). Round 5 not scored before dayclose.
**Friction:** Dev server was on wrong port (Evidis on 3000, LM on 3002). Playwright browser died mid-session. Both cost ~5 min. Should detect active port at session start.
**User overrode:** Skipped AIDAX scoring on Round 5 to dayclose. Declined framework push (deferred to next session).

---

## 2026-04-01b — Cleanup + Setup Scaffolding

**Caught:** Clean tree, no sensitive files, 3 local-ahead Stack skills flagged, 83MB cache purged
**Missed:** Nothing — light session, straightforward wrap
**Friction:** session-context.md had been modified by another commit in this session, caused write error. Need to always re-read before overwriting
**User overrode:** N/A

---
