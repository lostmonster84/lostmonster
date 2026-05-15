# Wrap — Evolution Log

> Per-project learning for the /wrap skill. Never synced upstream.

### Learned Rules

- macOS `bash` doesn't expand `*.env*` globs in `git reset` when no .env files exist -- use `2>/dev/null || true` or avoid glob expansion
- update.sh overwrites PROTOCOL.md from upstream master, which can nuke project-specific additions (e.g. Universal Copy Rules). Always `git checkout -- PROTOCOL.md` after update.sh if it has local additions

---

## Wrap #3 — 2026-05-15

- **Session type:** Framework cleanup — pushed `chore(v4.6.1)` upstream stripping DOMA contamination; local re-onboarded 12 workers from cleaned upstream.
- **Caught:** All work this session is genuinely from this conversation (no parallel-instance interference — single linear flow). `git add -A` was safe. Forensic generator's "uncategorised" bucket usefully exposed the scaffold files (`.githooks/`, `.github/`, `scripts/install-hooks.sh`) that have no subsystem mapping yet — logged as debt.
- **Missed:** Initially under-scoped the contamination — first pass thought it was 9 workers (the v3-drifted set with no manifest). Second scan caught SEOX (52 refs) + TESTX (full DOMA-onboard leak) + 9 specs/FRs. Lesson: the line-count delta scan must be paired with a word-boundary `\bDOMA\b` scan across the whole .ai/thefirm/ tree, not just the workers that drifted by line count.
- **Friction:** `pnpm exec tsx scripts/forensic-log.ts` failed with `ERR_PNPM_RECURSIVE_EXEC_NO_PACKAGE` (no pnpm workspace at repo root). Fell back to `npx tsx`. The forensic-log script needs `--include-working` to detect uncommitted dirty files when HEAD == session-start commit — without it, the script reports "No changed files" even though `git status` shows 26.
- **Learning:** When the forensic-log call lives in a project without pnpm-at-root, invoke via `npx tsx` instead. When the wrap session hasn't committed yet (HEAD == session start), the generator MUST get `--include-working`. Add both to wrap Step 2b's runbook.

---

## Wrap #2 -- 2026-04-04

- **Session type:** Research + infrastructure (supplements, cross-project analysis, upstream sync)
- **Caught:** update.sh nuked Universal Copy Rules from PROTOCOL.md during /sync. Restored via `git checkout`
- **Missed:** Nothing -- all supplements verified, all repos synced
- **Learning:** After /sync runs update.sh, check PROTOCOL.md diff before committing. Project-specific sections get overwritten

---

## Wrap #1 — 2026-04-04

- **Session type:** Framework tooling (no lostmonster code changes, work shipped to thefirm repo)
- **Issue:** `git reset HEAD -- .env*` fails with "no matches found" on zsh when no .env files exist
- **Fix:** Removed glob patterns from safety unstage, committed directly
- **Learning:** For sessions where all code ships to external repos, wrap is mostly logging -- keep it fast
