# Wrap — Evolution Log

> Per-project learning for the /wrap skill. Never synced upstream.

### Learned Rules

- macOS `bash` doesn't expand `*.env*` globs in `git reset` when no .env files exist -- use `2>/dev/null || true` or avoid glob expansion
- update.sh overwrites PROTOCOL.md from upstream master, which can nuke project-specific additions (e.g. Universal Copy Rules). Always `git checkout -- PROTOCOL.md` after update.sh if it has local additions

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
