# Sync — Evolution Log

## 2026-05-14 — Major version jump (Firm v3.16 → v4.4.2)

**What happened:**
- Both repos already up to date on pull (changes were already fetched, just not applied locally)
- Firm update.sh: v3.16 → **v4.4.2**, 31 → 34 workers. 3 new workers added:
  - `reviewers/SEOX-saoirse-sage.md` — framework-pure (no manifest, no tokens)
  - `planners/ROADX-roy-roadmap.md` — has manifest, onboarded this sync
  - `planners/STRATX-stratton-pivot.md` — framework-pure (no manifest, no tokens)
- update.sh also updated PROTOCOL, GAFFER, FOREMAN, TRAINX, SUPPLEMENTS, _templates, lessons/, FIRM-CONTEXT, evolution.md. Preserved all 31 existing workers + 12 supplements.
- ROADX onboarded: 13 manifest tokens filled (11 real, 2 N/A — `[BUSINESS-PLAN-PATH]`, `[TECH-BUILD-PLAN-PATH]`, no business/tech-build-plan files in this repo). Heading renamed `## [PROJECT] Context` → `## Lost Monster Context`. All body tokens replaced. De-hedged "fill in per project" prose.
- project.json firmVersion bumped 3.13 → 4.4.2
- Stack: 4 new skills copied in — **buildplan, debtloop, devstart, healthcheck**. 10 existing skills all Stack-newer (replaced). railway already in sync. No extra files in any skill dir.
- _templates (self-learn.md) + README synced from Stack.

**Caught:**
- The 28 existing workers all show exactly 1 `[PROJECT]` — confirmed it's the manifest token-column entry only (nonManifestLines=0, ctxHeading=0). Correctly NOT treated as unfilled, per the standing rule.
- Skill SKILL.md files contain bracket tokens (`[PROJECT]`, `[DEV_URL]`, `[PRODUCTION_URL]`, `[ISSUE-ID]` etc) — verified ALL are part of the skill instruction text by design (examples, runtime-resolved curl placeholders, regex). NOT project tokens. Step 5 correctly does not fill skill tokens.

**Confirmed resolved:**
- The historical `[DESIGN-GUIDE-PATH]` recurring issue is GONE. Both the Stack `gaffer/SKILL.md` and the Firm `crew/GAFFER.md` now have zero bracket tokens. The obsolete "re-fill gaffer SKILL.md" rule stays obsolete.

**Friction:**
- `replace_all` is unsafe for body token replacement when the same token appears in the manifest table (would corrupt the manifest). Used per-line targeted Edits instead. Worth noting for future worker onboarding.

**Learned rules (NEW):**
- For new workers with a `## [PROJECT] Context` section: fill manifest tokens, rename heading, de-hedge "fill in per project" language, but DON'T wholesale-rewrite genuinely-good generic prose — token fills + heading rename is enough when the prose is already token-driven.
- When onboarding a worker, replace body tokens with per-line Edits, never global `replace_all` — the manifest table holds the same tokens in backticks and would be clobbered.

---

## 2026-04-01c — Third sync (verification after all upgrades)

**What happened:**
- Both repos already up to date
- update.sh v3.16: Filled 7 tokens from project.json, stamped v3.16 in CLAUDE.md
- **All clear on health checks** — no more [DESIGN-GUIDE-PATH] warning (FIXED)
- Templates all present (SETUP-TODO, Design Guide, PRD, Slop Test)
- 9/11 skills in sync with Stack. 2 local-ahead (firm, gaffer — expected)
- evolution.md synced from master (now shows v3.16)

**Caught:**
- The [DESIGN-GUIDE-PATH] recurring issue is RESOLVED. update.sh now reads project.json and fills all tokens including design guide path after every overwrite

**Learned rules (UPDATED):**
- The old rule "re-check gaffer SKILL.md for [DESIGN-GUIDE-PATH] after update.sh" is NOW OBSOLETE — update.sh handles it via project.json
- project.json is the fix. If a project has project.json, all token fills are automatic
- If project.json doesn't exist, update.sh auto-generates it from CLAUDE.md + codebase scan (new in v3.16)

---

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
