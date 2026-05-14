# Go — Evolution Log

> Per-project learning for the /go skill. Never synced upstream.

### Learned Rules

- **Auto-sync on drift.** If the Step 3 freshness check detects upstream changes on thefirm or thestack, run `/sync` automatically before presenting the briefing. Don't just flag it — fix it. Stale workers mean stale quality gates.
- **Surface SETUP-TODO.md.** During Step 2, read `SETUP-TODO.md` if it exists. Include the next incomplete step in the briefing under "Setup remaining." (Resolves debt logged 2026-04-01.)
- **If /sync ran earlier this session, top priority is committing it.** When `/go` runs right after `/sync` in the same conversation, the working tree holds the framework-sync changes uncommitted and the freshness check shows "current" (because sync just ran). Surface the uncommitted-file count and rank "commit the sync" as priority 1.
- **Flag stale session-context explicitly.** If `session-context.md` is dated weeks before today (or pre-dates a major framework version jump), present it but label it stale — don't surface its "Pick Up From Here" items as if still current.

---

## 2026-05-14 — Post-sync launch

**Caught:**
- 33 uncommitted files from a `/sync` run earlier in the same session — surfaced as priority 1, user picked it.
- session-context.md was ~6 weeks stale and pre-dated the Firm v3.16→v4.4.2 jump that happened during this session's `/sync`. Flagged as stale rather than presenting its priorities as current.

**Missed:** Nothing flagged by user.

**Friction:** Linear / Railway / health checks all skipped (no key, no link, no dev server) — three checks, zero output. Graceful degradation working as intended, but for this repo (framework + marketing site, no Railway) those checks are perennially empty.

**User overrode:** Nothing — picked the top-ranked item (1).

---
