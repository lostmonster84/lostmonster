# Dayclose — Evolution Log

> Per-project learning for the /dayclose skill. Never synced upstream.

### Learned Rules

1. **Session-context.md may have been modified by another process** — always re-read before writing (got file-modified error this session)
2. **Check if session log already has an entry for today** — this project had two sessions on the same day. Use date suffixes (2026-04-01b) to disambiguate

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
