---
name: firm
description: Sync improvements to The Firm framework repo (lostmonster84/thefirm). Use when workers, protocol, gaffer playbook, or any .ai/thefirm/ files have been improved within the current project and need pushing upstream.
argument-hint: "[summary of what changed] or leave blank for auto-detect"
---

# Push to The Firm

You are syncing improvements made to The Firm framework (inside this project's `.ai/thefirm/`) upstream to the standalone Firm repo.

## Repo details

- **Local clone:** `~/Projects/thefirm/`
- **Remote:** `https://github.com/lostmonster84/thefirm.git`
- **Branch:** `main`

## What gets synced

The Firm lives at `.ai/thefirm/` in every project. The standalone repo at `~/Projects/thefirm/` is the canonical source. When we improve workers, protocol, or gaffer mechanics inside a project, those improvements need to go upstream.

**The repo mirrors the project path exactly.** The thefirm clone keeps the framework under `~/Projects/thefirm/.ai/thefirm/...` - the same `.ai/thefirm/` prefix the project uses. There is no path translation: `.ai/thefirm/crew/reviewers/X.md` in the project maps to `.ai/thefirm/crew/reviewers/X.md` in the clone. (Older versions of this skill listed a stripped `crew/...` repo path - that was wrong.)

**Syncable files (project -> thefirm repo, same relative path):**

| Path (identical in project and repo) |
|--------------------------------------|
| `.ai/thefirm/PROTOCOL.md` |
| `.ai/thefirm/SUPPLEMENTS.md` |
| `.ai/thefirm/crew/GAFFER.md`, `crew/FOREMAN.md`, `crew/TRAINX-travis-forge.md` |
| `.ai/thefirm/crew/researchers/*.md` |
| `.ai/thefirm/crew/planners/*.md` |
| `.ai/thefirm/crew/builders/*.md` |
| `.ai/thefirm/crew/reviewers/*.md` |
| `.ai/thefirm/crew/checkers/*.md` |
| `.ai/thefirm/crew/**/supplements/*.md` (universal supplements only) |
| `CHANGELOG.md`, `README.md` (repo root - audited every push) |
| `.claude/skills/gaffer/SKILL.md` | Via thestack (not thefirm) |

**`gaffer/evolution.md` - does NOT sync. The upstream record is the `CHANGELOG.md` entry.** Each project's `evolution.md` is that project's own local framework-change log. The thefirm repo's upstream log is `CHANGELOG.md` (root). Every `/firm` push records the change there (Procedure step 4) - that IS the upstream record; the project's `evolution.md` entry stays local. Note: `evolution.md`'s own header still claims "master location: ~/Projects/thefirm/... project instances sync FROM here" - that header is **stale**, describing a superseded model (the thefirm `evolution.md` has not been maintained since the CHANGELOG.md became the active log). Correcting that header is a separate thefirm-repo task; until then, trust this skill: CHANGELOG.md upstream, evolution.md per-project.

**NEVER sync (genuine project-specific state):**
- `gaffer/session-log.md`
- `gaffer/debts.md`
- `gaffer/calibration.md`
- `gaffer/evolution.md` (per-project log - upstream record is CHANGELOG.md, see above)
- `gaffer/inspections/`
- `CLAUDE-SUPPLEMENT.md` (project-specific)
- `project.json` (project manifest)

## Step 0: Sync the clone FIRST (MANDATORY - before any edits)

**Do this before touching a single file in the clone.** The most common `/firm` failure is building the push against a stale local clone, then having `git push` bounce non-fast-forward - or worse, rebasing edits built against an old base file onto a structurally-changed master and clobbering upstream work.

```bash
cd ~/Projects/thefirm
git fetch origin main
git status --short                      # must be clean - if not, STOP and surface
git rev-list --left-right --count HEAD...origin/main   # behind/ahead count
```

- **Clone is dirty** (uncommitted changes): STOP. Surface to the user - do not build a push on top of someone else's uncommitted work.
- **Clone is behind origin** (right-side count > 0): `git reset --hard origin/main` to bring it current BEFORE making any edits. Then re-read the target files from the now-current clone - they may have changed structurally since you last saw them.
- **Clone has local commits not on origin** (left-side count > 0): a previous `/firm` left a commit unpushed. Inspect it (`git log origin/main..HEAD`). If it is good, keep it and continue; if it was built on a stale base, `git reset --hard origin/main` and redo against current.
- **Clone is current** (0 behind, 0 ahead): proceed.

**Why this is Step 0:** worker playbooks get restructured upstream (v3 -> v4 rewrites, OUTPUT-slicing, etc.). An improvement ported against last month's copy of a file will not apply cleanly to today's master. Always port against the *current* master, never the project's copy of an old master. Two separate sessions have burned time on exactly this - it is the single highest-frequency `/firm` and `/stack` failure mode.

## Procedure

1. **Identify what changed** - diff the project's `.ai/thefirm/` against the repo clone to find improvements (the clone is now current, post-Step-0)
2. **Auto-generalise workers** - for each changed worker file, use the onboarding manifest to reverse project-specific content back to generic tokens. See "Worker Generalisation" below. **Then run the Generalisation Gate (hard - blocks the push) on every file before it is copied upstream.**
3. **Copy files** to `~/Projects/thefirm/` at matching paths
4. **Update `~/Projects/thefirm/CHANGELOG.md`** - add a new version entry at the top with what changed and why. This is the upstream record of the change. The project's `gaffer/evolution.md` entry stays local and does not sync (see "What gets synced" above)
5. **README.md audit (MANDATORY every push)** - count actual files in the repo and verify README matches reality:
   - Worker counts per department (planners, builders, reviewers, checkers) - count `ls .ai/thefirm/crew/*/` files
   - Total worker count in tagline, "What Is This?", worker tables, hierarchy diagram, directory tree
   - All workers listed in their department table (no missing entries)
   - Version number matches latest evolution/changelog entry
   - Any new commands, quality gates, or structural changes reflected
   - **If anything is wrong, fix it in the same commit.** The README must never be stale after a push
6. **Bump version** in README if it's a significant change (new worker, protocol overhaul)
7. **Commit** with a clear message describing the improvement
8. **Pre-push verification (MANDATORY):**
   - `git fetch origin main` again - confirm the clone is STILL current (no one pushed while you worked). If origin moved, STOP, `git reset --hard origin/main`, and re-apply your changes against the new base
   - **Re-run the Generalisation Gate** (the three greps) on every staged worker/playbook file. This is the last line of defence - if anything leaked, it stops here, not in the master
   - Run `git diff --stat HEAD~1` - review the diff one last time. Does it look right? Any accidental overwrites, state files slipping in, or project-specific references left in?
   - Count files in `.ai/thefirm/crew/{planners,builders,reviewers,checkers}/` - do the counts match what the README claims?
   - If anything's wrong, fix before pushing
9. **Push** to `origin main` - this must be a fast-forward. If it bounces non-fast-forward, you skipped Step 0 or step 8's re-fetch; go back, do not force-push
10. **Confirm** what was pushed

## Worker Generalisation (Auto-Reverse Onboarding)

When pushing worker files upstream, project-specific content must be reversed to generic tokens. This is the inverse of `/sync` Step 4b. Full spec: `.ai/thefirm/ONBOARDING.md`.

### project.json as Reverse Source

If `project.json` exists at the project root, use it as the **primary source** for reverse-replacement. This is more reliable than reading individual manifests because:
- project.json has the complete token-to-value mapping in one place
- It includes alias tokens (HOSTING and HOSTING-PROVIDER both map to the same value)
- It distinguishes N/A tokens from unfilled tokens

**N/A tokens during push:** Tokens marked `"N/A"` in project.json were never replaced in the worker body, so there's nothing to reverse. Skip them. The manifest Value column should be cleared to **empty** (not "N/A") for the upstream version -- upstream manifests are always empty.

**project.json is NEVER pushed upstream.** It is project-specific.

### Mechanism 1: Manifest Token Reversal

For each worker with an `<!-- ONBOARD:START -->` manifest:

1. **Read project.json** (preferred) or the manifest for Token to Value pairs
2. **Sort by value length descending** - replace longer values first to avoid partial matches (e.g. `wildtrax-red (#c41e3a)` before `wildtrax`)
3. **Reverse-replace in body** - for each row, replace all instances of the Value with the Token throughout the file (OUTSIDE the `ONBOARD:START/END` markers)
4. **Clear manifest values** - reset the Value column to empty (token-only state, not "N/A")
5. **Verify** - grep the file for known project-specific values (project name, brand colours, product names). If any remain, they weren't in the manifest - add them and re-run

### Mechanism 2: Context Section Generalisation

For each worker with a project-specific Context section (e.g. `## WildTrax Context`):

1. **Replace the entire section** (from heading to next `---` or `##`) with the generic template:
   ```markdown
   ## [PROJECT] Context

   **WorkerName for [PROJECT]** understands:
   - [PROJECT-DOMAIN] specifics relevant to this worker's role
   - See onboarding manifest for token definitions
   ```
2. **Update heading** - `## ProjectName Context` → `## [PROJECT] Context`

### Generalisation Gate (HARD - blocks the push, not advisory)

> **This gate exists because it was skipped.** The thefirm master carried `DOMA Edition` titles, a `## DOMA Design Tokens Reference` section, and DOMA's locale set in SOFAX, SEOX, and STRATX - because three fast v4-authoring pushes (May 2026) ran `/firm` without reverse-generalising. The old version of this section was an advisory checklist; advice that can be skipped, gets skipped. It is now a hard gate.

**The gate runs on the DIFF - the lines you are adding or changing - not the whole file.** Contamination in *your diff* BLOCKS the push. Pre-existing contamination already in the file (not introduced by you) is logged as a debt and warned, but does NOT block your unrelated surgical push - you cannot be made to clean an entire file to land a small change. Dogfooding caught this: a whole-file version of this gate blocked a clean `GAFFER.md` addition because the master `GAFFER.md` had pre-existing contamination from an earlier un-generalised push.

```bash
# Capture the lines you are adding/changing (surgical edits to the clone):
git -C ~/Projects/thefirm diff -- <file> | grep '^+' > /tmp/firm-gate-diff.txt

# Build the value list to scan for - EXCLUDING worker-name collisions. Worker
# identities (codenames + names like "Nigel Mullins") are universal Firm IP: present
# in every project, NEVER contamination. A project's testPersona is often a worker's
# first name - a persona named "Nigel" collides with NIGELX's "Nigel Mullins", and
# grepping it is pure false positives. The exclusion set is the crew filenames split
# on "-" (codenames + identity name-parts):
WORKER_TERMS=$(find ~/Projects/thefirm/.ai/thefirm/crew -name '*.md' \
  | sed -E 's@.*/@@; s@\.md$@@' | tr '-' '\n' | sort -u)
# VALUES = every non-empty, non-"N/A" project.json value NOT in WORKER_TERMS
# (case-insensitive). Both GATE 1 and GATE 3 scan for this filtered list.

# --- BLOCK checks: contamination in YOUR diff ---

# GATE 1 - project.json value leak in your added lines. Matches literal values, so it
# catches contamination at any depth - titles, headings, body, brand tokens, paths.
for v in $VALUES; do grep -Fn "$v" /tmp/firm-gate-diff.txt; done   # any hit = BLOCK

# GATE 2 - "X Edition" H1 in your diff. Master worker H1s are generic
# ("# WORKER Framework"), never "- X Edition". Single-hash (^\+# ): an added H1 only,
# so it never trips on an H2 like "## AI Slop Detection (WORDX Edition)".
grep -nE '^\+# .*\bEdition\b' /tmp/firm-gate-diff.txt                                 # any hit = BLOCK

# --- WARN check: pre-existing contamination in the rest of the file ---

# GATE 3 - the same $VALUES list against the WHOLE file. Hits that are NOT in your
# diff are pre-existing. Do NOT block on them - log each as a debt (file + foreign
# value), warn the user, let the push proceed.
for v in $VALUES; do grep -Fn "$v" <file>; done   # hits outside your diff = WARN + debt-log
```

**Why this shape:** GATE 1 is exhaustive - if a project value is anywhere in your diff, it catches it (a project-named heading like `## DOMA Context` is caught because "DOMA" is a project.json value; a stray body word like "their portfolio is on DOMA" too). GATE 2 catches the one thing GATE 1 can miss: an onboarding-stamped title whose literal value happens not to be in project.json. A separate "project-named heading" regex was tried and dropped - it false-positived on generic headings ("Project Context", "Audit Context") and added nothing GATE 1 doesn't cover.

**On a BLOCK (contamination in your diff):**
- Your added content still carries project specifics - reverse-generalisation was incomplete.
- If a leaked value is NOT in the manifest, that is why auto-reversal missed it: **add the token to the manifest**, re-run reversal, re-grep (Self-Learning loop below).
- If your added title says "X Edition", retitle it generic (`# WORKER Framework`, no edition).
- Re-run the BLOCK checks. The push proceeds only when your diff is clean.

**On a WARN (pre-existing contamination):**
- The file you are pushing to was contaminated before you touched it - a real defect, but not yours and not this push's job to fully fix.
- **Log it as a debt** naming the file and the foreign values; recommend a thefirm-repo genericisation session for that file.
- The push proceeds - your diff is clean.

**Manifest hygiene (required, not blocking on their own):**
- [ ] Context section heading is the generic `## [PROJECT] Context`
- [ ] Manifest Value column is empty (token-only state)

**Why hard on the diff:** new contamination propagates to every project on the next `/sync` - blast radius is N projects, not 1. Blocking your diff costs one grep pass; letting new contamination through costs every downstream project.

### Self-Learning

If generalisation misses project-specific content:
1. **Add the missing token** to the worker's manifest
2. **Add to the Token Catalogue** in `ONBOARDING.md` if it's a new standard token
3. **Log to evolution.md** - "Generalisation missed [value], added [TOKEN] to manifest"
4. Same miss won't happen next push

---

## Key rules

- **NEVER OVERWRITE - ONLY ADD/UPDATE.** Read existing files first, then merge improvements in. Append to changelogs. Add new entries to evolution logs. Never replace file contents wholesale unless James explicitly says to overwrite
- **Generalise everything.** The Firm repo is project-agnostic. No project-specific references
- **Never touch state files.** Session logs, debts, calibration are per-project
- **Always update the changelog.** Every push gets a changelog entry appended under the current version
- **Worker names and identities never change.** Only methodology and context get updated
- **If unsure whether something is project-specific or framework-level, ask James**
