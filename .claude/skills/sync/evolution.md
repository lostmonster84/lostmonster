# Sync — Evolution Log

## 2026-04-01 — Second sync (same session)

**What happened:**
- Both repos already up to date — no new commits
- Firm update.sh ran — overwrote gaffer SKILL.md again (reverted the [DESIGN-GUIDE-PATH] fix)
- Re-applied [DESIGN-GUIDE-PATH] → website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md in gaffer SKILL.md
- All 11 skills in sync (gaffer still local-ahead)
- Workers still fully onboarded — update.sh preserved them correctly
- Templates in sync

**Caught:**
- update.sh overwrites gaffer SKILL.md every run, reverting project-specific token fills. This is a recurring issue — the upstream SKILL.md template has `[DESIGN-GUIDE-PATH]` and update.sh copies it fresh each time

**Friction:**
- The [DESIGN-GUIDE-PATH] in gaffer SKILL.md will need re-fixing after every /sync until either: (a) update.sh learns to preserve project fills in SKILL.md, or (b) the token is removed from the upstream template

**Learned rules (NEW):**
- After every Firm update.sh run, re-check gaffer SKILL.md for `[DESIGN-GUIDE-PATH]` and re-fill it
- update.sh does NOT preserve project-specific edits to .claude/skills/gaffer/SKILL.md — it overwrites from template

---

## 2026-04-01 — First sync on this project

**What happened:**
- Both repos (thefirm, thestack) already up to date on main
- Firm update.sh ran clean — updated PROTOCOL.md, GAFFER.md, FOREMAN.md, TRAINX, evolution.md, FIRM-CONTEXT.md
- 4 skills updated from Stack: dayclose, design, go, wrap (Stack newer)
- 1 skill local-ahead: gaffer (local newer than Stack)
- Templates and README synced from Stack
- 34 worker files onboarded with project tokens (28 with manifests, 6 root/misc)
- Fixed [DESIGN-GUIDE-PATH] placeholder in gaffer SKILL.md

**Caught:**
- [DESIGN-GUIDE-PATH] placeholder in GAFFER.md and SKILL.md — filled to website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md

**Gaps (unfillable from CLAUDE.md):**
- [APP-SUPERADMIN], [BUSINESS-CYCLE-DAYS], [BUSINESS-LOGIC-KEY], [CDN-URL], [MAP-SERVICE], [OBJECT-STORAGE], [STORAGE], [PAYMENT-SERVICE], [PRD], [TEST-FRAMEWORK], [UPLOAD-SERVICE]

**Learned rules:**
- No ONBOARDING.md exists yet — onboarding was done by reading worker manifests directly and mapping tokens from CLAUDE.md
- Token column in manifests will always show [TOKEN] — don't count those as "unfilled"
- Longest tokens first for sed replacement to avoid partial matches
- gaffer SKILL.md has project-specific paths that need filling after Firm update (update.sh can't fill them)
