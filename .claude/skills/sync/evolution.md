# Sync — Evolution Log

## 2026-05-15 — Firm v4.4.2 → v4.6.0 + worker methodology drift discovered

**What happened:**
- Firm pull: 2 commits — SOFAX v4.5.0 (Excellence Layer + deck supplement) + GAFFER v4.6.0 (Project-Contamination Scan in fitness).
- Stack pull: firm/gaffer/stack SKILL.md updates.
- update.sh ran clean: v4.4.2 → v4.6.0 stamp, preserved 34 workers, added 1 new supplement (SOFAX-decks.md), filled 1 token from project.json.
- 3 Stack-newer skills replaced: firm, gaffer, stack.
- 4 forensic-block scaffold files added (install-hooks.sh, .githooks/commit-msg, .githooks/post-merge, .github/pull_request_template.md). core.hooksPath wired to .githooks.
- project.json firmVersion bumped 4.4.2 → 4.6.0 manually (update.sh doesn't write to it).

**Caught (BIG):**
- **14 worker playbooks have significant methodology drift** (local vs upstream). update.sh's "preserve onboarded workers" policy is shielding methodology updates from propagating. Examples:
  - SOFAX: 353 → 1512 lines (+1159) — entire v4 fan-out subagent architecture missing
  - AIDAX: 499 → 1040 (+541)
  - MAPX: 148 → 635 (+487)
  - TERRX: 370 → 740 (+370)
  - PIXLX: 331 → 660 (+329), STANX +283, TESTX +227, INSPX +206, BLAZX +126, NIGELX +123, APEX +78, CRUDX +64, AUDIX +51
  - ALLYX: 983 → 395 (-588) — upstream shrank (v4 restructure)
- Cause: upstream had v4.0 marathon restructure (commit 1d10a96) + intra-worker fan-out (cc688de) + per-worker v4 rewrites between Firm v3.x and v4.x. update.sh preserves the WHOLE local file when a worker exists, so methodology updates never land.

**Friction:**
- update.sh's preservation policy is too conservative. Onboarding (manifest tokens + Context section) is interleaved with methodology in the same file. Preserving the whole file to protect onboarding also shields methodology from updates.
- /sync didn't previously detect this — it trusted update.sh's "Preserved: N workers" message. Now flagged via line-count delta scan.

**Learned rules (NEW):**
- After update.sh runs, /sync MUST do a line-count delta scan: `wc -l` on every `.ai/thefirm/crew/**/*.md` vs `~/Projects/thefirm/.ai/thefirm/crew/**/*.md`. Surface any file with |Δ| > 50 lines as drift.
- Methodology drift is a real category — flag it in the sync report, don't silently accept update.sh's preservation as "all good".
- Resolution path (not auto-applied): copy upstream worker over local, then re-run the manifest token-fill step. Manifest values come from project.json, so they regenerate cleanly. Context section may need re-write if upstream version touched it.

**Resolution (same session — user chose option 1, overwrite all 14):**
- 14 drifted workers copied from `~/Projects/thefirm/` over local. Onboarding script `/tmp/onboard.py` written to handle ONBOARD:START/END exclusion correctly.
- 5 workers had manifest blocks (APEX, CRUDX, AUDIX, TESTX, NIGELX) — 48 non-N/A tokens filled across them. Zero gaps, zero unreplaced-in-body tokens, zero remaining `## [PROJECT] Context` headings.
- **9 workers have NO `ONBOARD:START/END` block at all** in upstream Firm v4.6 (MAPX, BLAZX, INSPX, STANX, TERRX, AIDAX, ALLYX, PIXLX, SOFAX). They contain 5–27 hard-coded "DOMA" references each (and `# SOFAX Framework - DOMA Edition v4` as the H1) — 184 foreign-project refs across the 9 files. This is upstream Firm contamination: DOMA was the test project for the v4 marathon restructure and references leaked in.
- **Upstream bug:** AUDIX has `[PROJECT-DOMAIN]` in body but missing from its own manifest. Algorithm correctly left it untouched.

**Learned rules (NEW from resolution):**
- Upstream Firm v4.x is not fully generalised. 9 workers were rewritten in v4 with DOMA-as-scenario hard-coded. Until upstream tokenises them or strips the DOMA references, every /sync into any non-DOMA project will inherit DOMA contamination.
- For workers without a manifest block: methodology overwrite is safe; but DOMA references in headings/examples are NOT safe and should be flagged. /firm push (reverse direction) would carry those DOMA refs back upstream, making it worse.
- Action upstream: open issue on thefirm repo to either (a) add manifests to the 9 v4-restructured workers OR (b) strip DOMA references from their bodies. This is a framework-level fix, not project-level.
- Compare to v4.6.0 GAFFER playbook commit (`60cde94 gaffer(playbook): v4.6.0 - Project-Contamination Scan in Gaffer: fitness`) — Gaffer itself ALREADY added a contamination scan in v4.6, but the workers being scanned are still contaminated. The scan exists but the remediation is upstream-only.

**Upstream cleanup applied (same session — user picked "Full generalisation"):**
- Committed and pushed `9d03bd8 chore(v4.6.1): strip DOMA project contamination from framework` to lostmonster84/thefirm. 23 files, +776/-652 lines.
- Workers cleaned upstream: MAPX, BLAZX, INSPX, STANX, TERRX, TESTX, AIDAX, ALLYX, PIXLX, SEOX, SOFAX, AUDIX (manifest fix). SEOX was the biggest — 52 DOMA refs across locale set, scoring caps, page-type checkpoints, red-flag examples. Dim 6 Hreflang now scales with project locale count instead of hard-coded "7 locales".
- TESTX was a full DOMA-onboarded leak (manifest had `[PROJECT]=DOMA`); reverse-onboarded to template state.
- 9 specs/feature-requests also swept (calibration-anchors-template was 16 refs).
- KEEP carve-outs (legitimate, not contamination): GAFFER.md (uses DOMA in contamination-scan documentation), SCOUTX-owner-project-patterns.md (portfolio research), DEMX-homepage / DEMX-landing-pages / WORDX-homepage supplements (portfolio citations), STRATX-stratton-pivot.md (single ref in a labelled worked-example scenario).
- After push: pulled cleaned versions back into local lostmonster via `/tmp/reonboard.py` (12 worker files copied + token-filled from project.json). 47 tokens filled across 12 workers. Local DOMA contamination: 0 in active workers (only KEEP files retain DOMA refs).

**Learned rules (NEW — post-cleanup):**
- The /sync line-count drift detector was the single highest-leverage check this session. Without it, the 14 drifted workers would have stayed at v3 methodology indefinitely. Keep that scan in /sync going forward.
- Word-boundary matters for DOMA scans: `\bDOMA\b` excludes false positives from `[PROJECT-DOMAIN]` (the `DOMA` substring inside the token name). The `doma-` lowercase scan needs explicit class names (`doma-(sea|ink|mist|sand|cream|storage)`) to avoid hitting `doma` inside `domain`.
- SEOX introduced new tokens (`[I18N-ROUTING-PATH]`, `[LOCALE-SET]`, `[HREFLANG-EMISSION-MAP]`, `[CDN-HOST]`, `[ADDRESS-COUNTRY]`, `[PRICE-CURRENCY]`, `[CALLING-CODE]`, `[PRIMARY-INTENT]`, `[PAGE-TYPES]`, `[NAMED-LANDMARKS]`) and AIDAX introduced `[PERSONA-FILE]`. These should be added to ONBOARDING.md catalogue + project.json schema upstream. Marked N/A locally for now (Lost Monster is single-locale).
- The `reonboard.py` script pattern (copy from upstream + parse manifest + fill values + replace body tokens outside manifest, skip N/A) is a candidate to merge into /sync itself or into `update.sh` so this isn't manual next time.

---

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
