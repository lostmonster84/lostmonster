---
name: sync
description: Pull latest Firm framework and Stack skills into the current project. Run when switching machines, starting fresh, or after upstream updates.
---

# Sync — Pull Latest Framework & Skills

You are the **Infrastructure Syncer**. You pull the latest Firm and Stack into the current project so everything's up to date. Fast and non-destructive.

## Step 1: Read Evolution Log

1. Read `.claude/skills/sync/evolution.md` before doing anything else
2. Check the **Learned Rules** section — apply every learned rule during this sync

## Step 2: Pre-flight Checks

Before pulling anything, verify the environment:

1. **Parent directory exists** — run `mkdir -p ~/Projects` (idempotent, safe to always run)
2. **Repos exist** — check that `~/Projects/thefirm/` and `~/Projects/thestack/` exist. If either is missing:
   - Firm missing: `git clone https://github.com/lostmonster84/thefirm.git ~/Projects/thefirm`
   - Stack missing: `git clone https://github.com/lostmonster84/thestack.git ~/Projects/thestack`
3. **Remote URLs valid** — for each repo, run `git remote get-url origin` and verify it matches the expected GitHub URL. If wrong, warn James: "Remote origin for ~/Projects/thefirm points to [url] — expected [expected]. Fix before sync?"
4. **No in-progress operations** — check for `.git/rebase-merge`, `.git/rebase-apply`, `.git/MERGE_HEAD` in both repos. If found, warn James: "~/Projects/[repo] has a rebase/merge in progress — resolve before sync". Skip that repo
5. **Correct branch** — run `git branch --show-current` in both repos. If not on `main`:
   - If detached HEAD: warn James: "~/Projects/[repo] is in detached HEAD state — checkout main before sync?". Skip that repo
   - If on another branch: warn James: "~/Projects/[repo] is on branch [name], not main — switch to main?". Skip that repo unless James confirms
6. **Clean working trees** — run `git status --porcelain` in both repos. If either has uncommitted changes:
   - Warn James: "~/Projects/[repo] has uncommitted changes — stash or commit before sync?"
   - **Do not pull on a dirty tree.** Wait for James to decide, or skip that repo and continue with the other

## Step 3: Pull Latest Repos (parallel)

Run these in parallel (with a 30-second timeout per command):

1. **The Firm** — `cd ~/Projects/thefirm && git pull origin main`
2. **The Stack** — `cd ~/Projects/thestack && git pull origin main`

**Error handling:**
- **Offline / auth failure** — warn but continue with the other repo
- **Timeout** — warn: "git pull timed out for [repo] — likely network issue". Skip that repo, continue
- **Merge conflict** — do NOT attempt to resolve. Warn James: "Merge conflict in ~/Projects/[repo] — resolve manually, then re-run /sync". Skip that repo, continue with the other

## Step 4: Sync The Firm

First, determine if this is a **first-time setup** or an **update**:

1. Check if `.ai/thefirm/` exists in the project
2. If it **does NOT exist** — run `setup.sh`:
   ```bash
   cd [PROJECT_ROOT] && bash ~/Projects/thefirm/setup.sh --yes
   ```
3. If it **exists** — run `update.sh`:
   ```bash
   cd [PROJECT_ROOT] && bash ~/Projects/thefirm/update.sh --yes
   ```

**Before running either script**, verify the script file exists (`test -f ~/Projects/thefirm/[script].sh`). If missing, warn James: "[script].sh not found in ~/Projects/thefirm/ — repo may be corrupt". Skip Firm sync.

**`--yes` flag handling:** If the script fails and the error suggests `--yes` is not recognised, retry without the flag. If it then prompts for input, it will timeout — report the issue and skip.

**Check the exit code.** If the script fails (non-zero exit), warn James with the error output. Don't silently continue.

Note what changed in the output (new workers, protocol updates, version bumps).

## Step 4a: Generate or Validate project.json

`project.json` is the machine-readable manifest that drives token replacement. It lives at the project root and is never pushed to thefirm.

1. Check if `project.json` exists in the project root
2. **If it does NOT exist:**
   a. Read CLAUDE.md to extract all token values (project name, brand colours, products, tech stack, entities, paths, etc.)
   b. Generate a `project.json` following the schema at `~/Projects/thefirm/schemas/project.schema.json`
   c. Map CLAUDE.md values to the JSON structure (see `.ai/thefirm/ONBOARDING.md` Token Catalogue for the mapping)
   d. For fields not found in CLAUDE.md, set to `"N/A"`
   e. Present the generated project.json to James for review before saving
   f. After approval, save to project root
3. **If it exists:**
   a. Validate that required fields are present (`project.name`, `project.domain`, `entities.primary`)
   b. Check for new tokens added to the catalogue that aren't in project.json yet
   c. If new tokens found, ask James to fill them or mark as N/A
   d. Update the `firmVersion` field to match the current Firm version

## Step 4b: Auto-Onboard Workers

After `update.sh` runs, onboard any workers that have unfilled manifests or generic `[PROJECT]` placeholders. This uses the three-mechanism system defined in `.ai/thefirm/ONBOARDING.md`.

### Detection

1. Grep all worker files in `.ai/thefirm/crew/` for `ONBOARD:START` — these have manifests
2. For each manifest, check if the Value column is empty or contains `[` tokens — needs onboarding
3. Also grep for `[PROJECT]` in the body text — catches workers without manifests that still have generic content

### Mechanism 1: Token Replacement (Manifest)

For each worker with an `<!-- ONBOARD:START -->` manifest:

1. **Read project.json** as the primary token source. Fall back to CLAUDE.md for any values not in project.json
   - The token-to-JSON-path mapping is defined in `.ai/thefirm/ONBOARDING.md` Token Catalogue
2. **N/A handling**: If a token's value in project.json is `"N/A"`:
   - Leave the token as `[TOKEN]` in the file body (unchanged)
   - Fill the manifest Value column with `N/A`
   - Do NOT report it as a gap
3. **Fill the manifest table** — write the project value into the Value column for each token
4. **Replace tokens in body** — for each manifest row, find-replace the Token with the Value throughout the file (OUTSIDE the `ONBOARD:START/END` markers)
5. **Replacement order:** Sort by value length descending — replace longer tokens first to avoid partial matches
6. **Verify** — grep for any remaining `[BRACKET]` tokens that are in the manifest but weren't replaced (excluding N/A tokens)

### Mechanism 2: Context Section (AI-Written Prose)

For each worker with a `## [PROJECT] Context` section (or empty/generic context):

1. **Read project context** from:
   - `CLAUDE.md` — project name, tech stack, terminology, products, structure
   - `.ai/thefirm/CLAUDE-SUPPLEMENT.md` — deeper project context (if exists)
   - An already-onboarded worker in the same department (as a style reference)
2. **Rewrite the Context section** with project-specific details:
   - Replace section heading: `## [PROJECT] Context` → `## ProjectName Context`
   - Write prose description of what this worker needs to know about the project
   - Include specific routes, tables, APIs, entities relevant to this worker's role
   - Match depth and style of peer workers
3. **Only touch the Context section.** Everything else stays as-is

### Gap Detection

Distinguish between **intentionally N/A** and **genuinely missing**:

1. **N/A tokens**: Tokens whose project.json value is `"N/A"` are NOT gaps. Report them separately as "Intentionally skipped" (informational only, no action needed)
2. **Missing tokens**: Tokens not in project.json AND not findable in CLAUDE.md are genuine gaps. Log them and present grouped by category
3. **Leave unfilled tokens** as `[TOKEN]` in the file body — the worker still works, just with a gap
4. **Present only genuine gaps to the user:**
   ```
   **Project gaps found (workers partially onboarded):**
   UX: [TARGET-USER-B] — add to project.json or CLAUDE.md
   ```
5. **Offer to help:** "Want me to add these to project.json?"
6. Each subsequent `/sync` run fills more gaps as project.json/CLAUDE.md grows

### Report

Include in the sync report:
```
**Workers onboarded:** 28/31 (3 framework-pure, no manifest)
**Tokens filled:** 29/40
**Intentionally N/A:** [APP-SUPERADMIN], [CDN-URL], [MAP-SERVICE] (8 tokens)
**Gaps (need filling):** [TARGET-USER-B] — add to project.json
```

### Rules

- **Manifest handles tokens.** Mechanical find-replace for colours, names, products, paths
- **Context section handles prose.** AI-written narrative for what can't be tokenised
- **Never touch methodology.** Identity, scoring, anti-patterns, philosophy — all untouched
- **Idempotent.** If manifest is filled and no `[PROJECT]` in body, skip the worker
- **Gaps are flags, not failures.** Partially onboarded workers still function — gaps get filled over time
- **Log everything.** Onboarded workers, gaps found, tokens filled — all in the sync report and evolution log
- **Self-learning.** If a token source path was wrong, fix the manifest and log to evolution.md

---

## Step 5: Sync Skills from The Stack

### 5a: Sync `_templates/`

1. Check if `~/Projects/thestack/skills/_templates/` exists — if not, skip this step
2. If it exists, sync files **additively**: copy all files from Stack's `_templates/` into `.claude/skills/_templates/`, replacing files that exist in both. **Do NOT delete local files that don't exist in Stack** — they may be project-specific templates

### 5b: Sync `README.md`

If `~/Projects/thestack/skills/README.md` exists, copy it to `.claude/skills/README.md`.

### 5c: Sync skill directories

For each skill directory in `~/Projects/thestack/skills/` (excluding `_templates/`):

1. **Validate** — check that the Stack skill has a `SKILL.md` file. If not, skip it (malformed skill directory)
2. **Compare** against `.claude/skills/[skill]/` in the current project
3. **If skill doesn't exist locally** — copy the entire directory in
4. **If skill exists locally**:
   a. Check that the local skill has a `SKILL.md` file. If not, copy Stack's SKILL.md in (malformed local dir)
   b. Diff the SKILL.md files using `diff`:
      - If **identical** — skip, already in sync
      - If **different** — use `git log -1 --format=%ct -- [file]` on the Stack's SKILL.md to get its last commit timestamp, and `stat -f %m` (macOS) or `stat -c %Y` (Linux) on the local SKILL.md for its modification time. If Stack's commit timestamp is more recent, Stack wins — replace local. Otherwise keep local and flag for `/stack` push
      - If **unable to determine** which is newer — warn James, don't overwrite. Present the diff and ask
   c. **Sync extra files** — for any files in the Stack skill directory beyond SKILL.md and evolution.md (e.g. config files, templates, helpers), copy them to the local skill directory. Overwrite if Stack is newer, skip if local is newer
5. **If local skill doesn't exist in Stack** — it's project-specific, leave it alone
6. **Handle removals** — if a local skill existed in a previous Stack sync but has been removed from Stack (renamed or deleted), flag it for James to decide

**NEVER touch evolution.md files** — those are per-project learning state. When copying a new skill in, copy its evolution.md only if no local one exists.

**NEVER touch project-specific skills** — if it's not in the Stack repo, it stays as-is.

**Symlinks** — if a skill directory is a symlink, resolve it (`readlink -f`) before operating. Warn James: "[skill] is a symlink — syncing to resolved path"

## Step 6: Check for Stale Renames

Detect renames by comparing local skill names against Stack skill names:

1. For each local skill that does NOT exist in Stack, diff its SKILL.md content against every Stack skill's SKILL.md
2. Measure similarity using `diff --stat`: calculate the percentage of unchanged lines. If >80% unchanged — it's a likely rename
3. If **multiple Stack skills** match >80% to the same local skill, pick the highest similarity. If tied, warn James and list both candidates
4. If a rename + significant content change occurred (<80% similar), it won't be detected — that's OK. The old skill stays as a project-specific skill; the new one gets copied in as a new skill. James can clean up manually
5. **Ask James before renaming:** "Looks like `/pushfirm` was renamed to `/firm` in the Stack. Rename locally? (y/n)"
6. If confirmed: rename the directory, preserve the local evolution.md

Known rename history (for reference, but always verify dynamically):
- `pushfirm` → `firm`
- `pushstack` → `stack`

## Step 7: Report

Present a tight summary:

```
**Sync complete**

**Firm:** [version] — [what changed, or "already up to date"]
**Stack:** [pulled N commits, or "already up to date"]
**Skills synced:** [list of skills updated, added, or flagged]
**Templates:** [updated / already current]
[If any local skills are ahead of Stack: "Local ahead (push with /stack): /gaffer, /wrap"]
[If any conflicts: "Conflicts (review manually): /skillname"]
[If any renames detected: "Renames: /old → /new (applied / awaiting confirmation)"]
[If any warnings: list them]

All good — ready to go.
```

## Step 8: Self-Learn (MANDATORY)

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md` if it exists.

Log to `.claude/skills/sync/evolution.md`. Focus on:
- **Caught:** Stale skills, version mismatches, renames detected, dirty trees caught
- **Missed:** Things that were out of sync that the skill didn't catch
- **Friction:** Slow steps, unnecessary diffs, false positives

## Rules

- **Non-destructive.** Never overwrite local changes without confirmation. When in doubt, keep local and flag
- **Never pull on dirty trees.** Check `git status` before pulling. Uncommitted work in the repos is James's — don't clobber it
- **Always check branch.** Never pull into the wrong branch or a detached HEAD
- **Fast.** Parallel pulls, minimal diffs. Under 30 seconds for a clean sync
- **Timeout.** All git network operations get a 30-second timeout. Never hang
- **Idempotent.** Running twice in a row should produce no changes the second time
- **Evolution files are sacred.** Never sync, overwrite, or merge evolution.md files — they're per-project state
- **Additive templates.** Sync Stack templates in, but never delete local-only templates
- **Sync all skill files.** Not just SKILL.md — sync every file in a skill directory except evolution.md
- **Always report.** Even if nothing changed, confirm "already up to date"
- **Always learn.** Step 8 is not optional
- **Ask, don't assume.** Renames, conflicts, dirty trees, branch switches — always ask James before taking action
