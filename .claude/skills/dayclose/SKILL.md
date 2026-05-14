---
name: dayclose
description: End of day - full cleanup, cache purge, process kill, volume release. Use /wrap for lightweight conversation close.
---

You are the **Day Closer**. Full shutdown. You get smarter every time you run.

When the user says `/dayclose`, execute this sequence. This is the nuclear option - kills processes, clears caches, releases the volume.

## Step 1: Auto-Detect What Shipped

1. The git status snapshot at conversation start shows the HEAD commit when the session began. Run `git log --oneline` and identify all commits made **this session** (everything after that starting commit)
2. **Verify the starting commit exists:** run `git cat-file -t <starting-commit>` first. If it fails (commit was rebased/squashed/amended away), fall back to `git log --oneline -20` and ask James to confirm which commits are from this session
3. Run `git diff --stat <starting-commit>..HEAD` to see the full scope of changes
4. This is the source of truth - don't rely on conversation memory alone

## Step 1b: Generate Forensic Block (MANDATORY)

The forensic block is the bridge between commits and bug archaeology. Every commit and every session-log entry carries one. When something breaks N days later, `git log --grep "Subsystems: <area>"` returns every commit that touched that area with the risk surface attached. Skipping the block means the next archaeology session is blind.

1. **Self-heal scaffold (idempotent, runs every dayclose)** - copy missing infrastructure from Stack template before running the generator. Makes /dayclose robust to projects that pulled the new skill but haven't re-run /sync since:
   ```bash
   [ ! -f scripts/forensic-log.ts ] && [ -f ~/Projects/thestack/template/scripts/forensic-log.ts ] && mkdir -p scripts && cp ~/Projects/thestack/template/scripts/forensic-log.ts scripts/forensic-log.ts && echo "  self-healed: scripts/forensic-log.ts"
   [ ! -f subsystems.json ] && [ -f ~/Projects/thestack/template/subsystems.json ] && cp ~/Projects/thestack/template/subsystems.json subsystems.json && echo "  self-healed: subsystems.json"
   ```
   If files exist, both checks short-circuit silently. If the Stack template lacks them too, skip Step 1b with: "Forensic infra missing AND Stack template lacks it - run `/sync` to bump Stack, then `/dayclose` again."

2. **Run the generator** (auto-fills 3 of 5 fields from `subsystems.json` + `git diff`):
   ```bash
   pnpm exec tsx scripts/forensic-log.ts <session-start-sha>
   ```
   `<session-start-sha>` is the HEAD commit from the conversation-start git snapshot. If the script outputs "No changed files", skip Step 1b entirely (nothing to commit).

3. **Capture the 5 fields:**
   - `Subsystems:` (auto)
   - `Files:` (auto)
   - `Risk surface:` (auto, supplement if a new risk was introduced)
   - `Verified:` (PLACEHOLDER - YOU fill this with what was tested LIVE on real input)
   - `Deferred:` (PLACEHOLDER - YOU fill this with what was NOT verified end-to-end)

4. **Verified + Deferred are not optional.** Empty placeholders are a protocol violation. Be honest:
   - End-to-end live test: `Verified: full happy-path flow live on staging`
   - Theory-only: `Verified: NONE - all changes are theory-only patches` (high-risk dayclose; flag it)
   - Synthetic only: `Verified: repro script only - production path NOT exercised`
   - Mirror skipped items into `Deferred:` for archaeology

5. **EOD aggregation roll-up** - if multiple commits this session each carry their own forensic block, also produce a *day-level* aggregated block for the dayclose commit:
   - `Subsystems:` = union of all per-commit subsystems
   - `Files:` = union of all per-commit files (truncate to top 12 + count)
   - `Risk surface:` = union of all per-commit risk surfaces
   - `Verified:` = highest-confidence statement across the day
   - `Deferred:` = union of all deferred items - this is the day's debt list

6. **Hold the completed block** - it goes into Step 9's commit body AND Step 4's session-log entry verbatim. Same text, both places.

7. **Update the manifest if needed** - if any new subsystem boundary or risk surface emerged today, update `subsystems.json` in the dayclose commit. Stale manifest = stale forensics.

8. **Lint the manifest** - run `pnpm exec tsx scripts/lint-subsystems.ts --depth=30` if the script exists. Exit 1 means manifest is invalid (duplicate globs or missing required fields) - HALT dayclose with the lint output, fix the manifest, re-run. Exit 2 is informational (uncategorised drift detected over the last 30 commits) - surface it to the user but do not block. Exit 0 is clean.

   Skip silently if `scripts/lint-subsystems.ts` does not exist (project hasn't adopted the lint yet - self-heal handles it on the next /sync if Stack ships it).

## Step 2: Read Evolution Log

1. Read `.claude/skills/dayclose/evolution.md` before doing anything else
2. Check the **Learned Rules** section - these are things previous wraps taught you
3. Apply every learned rule during this wrap. They override the defaults below if there's a conflict

## Step 3: Update CHANGELOG.md

1. Read `CHANGELOG.md` - if the file doesn't exist, create it with a `# Changelog` header
2. Check if today's date heading (`## YYYY-MM-DD`) already exists. **Use the date of this session's first commit** (not `date` at wrap time) to avoid midnight-crossing mismatches
   - If yes: **append** new entries under the existing heading, don't duplicate what's already there
   - If no: add a new dated heading
3. Add concise entries for everything shipped this session
4. Keep entries human-readable - what changed, not how
5. Group by theme (features, fixes, improvements)
6. If nothing shipped, don't add an empty entry

## Step 4: Update Session Log

1. Read `.ai/thefirm/gaffer/session-log.md` (if The Firm is installed)
2. If there isn't already an entry for this session's work, add one following the existing format
3. Include: what was built, workers used, scores, issues found, ship status, **and the Step 1b forensic block (aggregated if multi-commit) verbatim under a `**Forensic block:**` field at the end of the entry.** Same text as the dayclose commit body. Duplication is intentional - logs and commits drift independently and one will outlive the other.

## Step 5: Check for Debts

1. If The Firm is installed, read `.ai/thefirm/gaffer/debts.md`. If the file doesn't exist but `.ai/thefirm/gaffer/` does, create it with the standard header: `# Quality Debts\n\n> Maintained by The Gaffer. Open items that need attention.\n\n---\n\n## Open Debts\n\n## Resolved\n`
2. If anything was deferred or skipped this session, log it
3. If any debts were resolved this session, move them to Resolved

## Step 5B: Update Project Blueprint (MANDATORY)

The blueprint (`docs/BLUEPRINT.md`) is the master architecture document. It must reflect reality at all times.

1. **If `docs/BLUEPRINT.md` exists:**
   - Compare what shipped this session (from Step 1) against the blueprint sections
   - **Add** new systems, components, or flows that were built but aren't documented
   - **Update** existing sections where behaviour changed (new endpoints, changed flows, updated config)
   - **Fix** outdated details (wrong ports, renamed files, removed features)

2. **If `docs/BLUEPRINT.md` does NOT exist - create it:**
   - Read the project's CLAUDE.md, CLAUDE-SUPPLEMENT.md (if exists), and codebase structure
   - Scaffold a blueprint covering: what the project is, core principles, terminology, architecture (monorepo structure, tech stack), data model, infrastructure, all major systems (one section per domain), security/auth, and a file index
   - Use real file paths, real config, real flows - not placeholders
   - This is a living document, not a template. It should be accurate from day one

3. **Every project gets a blueprint. No exceptions.**

**The standard:** If someone with zero context got hold of the blueprint, they could rebuild the system by following it. Every flow, every integration point, every config detail. Not "we use Redis" - but "Redis on Railway, BullMQ queues, these job types, this retry config." The blueprint is the complete reconstruction manual.

## Step 6: Update TODO.md

1. Read `TODO.md` at project root (if it exists)
2. **Clear completed items** - if any TODO items were completed this session, remove them from TODO.md and note them as done in the changelog entry where the work shipped
3. **Add new items** - if work was started but not finished, or if the user flagged follow-up tasks, add them as `- [ ]` items grouped under a `## From YYYY-MM-DD` heading
4. **Add Pick Up reference** - if new TODOs were added, add a `### Pick Up` line under today's changelog entry: `> See [TODO.md](TODO.md) for active items from this session`
5. If TODO.md is empty (all items cleared, no new ones), delete the file - don't leave an empty TODO
6. If TODO.md doesn't exist and there are no pending items, skip this step

**The flow:** TODOs are born in TODO.md during wrap → picked up in a future session → cleared from TODO.md during that session's wrap → noted as completed in that session's changelog entry.

## Step 7: Check for Framework Improvements

Detect if any Firm workers or Stack skills were modified this session and prompt to push upstream.

### Onboarding-vs-improvement filter (CRITICAL)

`/sync` writes project-specific context into Firm workers and skills (token replacement, `## ProjectName Context` sections, manifest tables). That is the EXPECTED local-newer state for those files - it must NEVER be pushed upstream, or the upstream template gets corrupted with one project's leakage. Step 7 filters this out before prompting the user.

For each candidate file (where local is newer than upstream), classify the diff:

- **Onboarded** (skip silently - do NOT include in push list):
  - The file contains `<!-- ONBOARD:START -->`, OR
  - Every changed hunk is confined to one of these regions:
    - Inside `<!-- ONBOARD:START --> ... <!-- ONBOARD:END -->` blocks (manifest tables)
    - Inside a `## [ProjectName] Context` section
    - Pure value substitutions where the substituted string equals or derives from a value in `project.json` (project name, brand colours, paths, products, entities, terminology, target user names). Derivations include exact match, uppercased, lowercased, or used as a path prefix (e.g. `[PROJECT]-CONFIG.md` from a project name like `Acme`)
- **Genuine improvement** (include in push list): any change that touches methodology, scoring rubrics, checkpoint definitions, identity prose unrelated to project context, or new sections/headings

If a file fails the filter and you can't decide cleanly, default to including it - false positives are recoverable (the user says no), false negatives silently lose work.

Read `project.json` once at the start of Step 7 to have project values available for the filter.

### 7a: Check The Firm

1. If `.ai/thefirm/` exists and `~/Projects/thefirm/` exists:
2. Diff the project's Firm files against the upstream repo - focus on files that are syncable (see `/firm` skill for the list): `PROTOCOL.md`, `crew/GAFFER.md`, `crew/FOREMAN.md`, `crew/planners/*.md`, `crew/builders/*.md`, `crew/reviewers/*.md`, `crew/checkers/*.md`
3. **Exclude state files** from the diff: `gaffer/session-log.md`, `gaffer/debts.md`, `gaffer/calibration.md`, `gaffer/evolution.md`, `gaffer/inspections/`, `CLAUDE-SUPPLEMENT.md`
4. **Determine direction:** for each differing file, check if the upstream repo's version is newer (use `git log -1 --format=%ct -- <file>` in the upstream repo). If upstream is newer, it's a pull situation - skip it, that's `/sync`'s job. Only flag files where **local is newer** (modified more recently than upstream's last commit)
5. **Apply the onboarding-vs-improvement filter** (see above) to each candidate. Drop onboarded files silently.
6. If any genuine improvements remain after filtering: **AUTO-INVOKE `/firm`** via the Skill tool with a summary of changes. No "y/n?" prompt. This is Execution Contract Rule 7 enforcement. If `/firm` fails (auth, conflict, network) → HALT dayclose with: `"Firm push failed: <error>. Dayclose cannot complete with un-pushed framework drift. Resolve and re-run /dayclose."` Log to debts.md but do NOT proceed to subsequent steps.
7. **Verify** after `/firm` returns: `git -C ~/Projects/thefirm ls-remote origin main` matches local HEAD. If not, the push didn't land - halt + investigate.
8. If every candidate was filtered as onboarding state, say nothing - there's nothing to push.

### 7b: Check The Stack

1. If `.claude/skills/` exists and `~/Projects/thestack/skills/` exists:
2. For each skill directory, diff the local SKILL.md against Stack's version
3. **Exclude evolution.md** from the diff (per-project state)
4. **Determine direction:** same as 7a - use git timestamps in the Stack repo to distinguish "local ahead" from "upstream ahead". Only flag local improvements
5. **Apply the onboarding-vs-improvement filter** (see above) to each candidate. Skill files rarely have `<!-- ONBOARD:START -->` manifests, so the value-substitution check is the main mechanism - if the only diff is a hardcoded path or value derived from `project.json`, it's project leakage, not improvement.
6. If any genuine improvements remain after filtering: **AUTO-INVOKE `/stack`** via the Skill tool with a summary of changes. No "y/n?" prompt. Execution Contract Rule 7 enforcement. Same halt-on-failure logic as 7a.
7. **Verify** after `/stack` returns: `git -C ~/Projects/thestack ls-remote origin main` matches local HEAD. If not, halt + investigate.
8. If every candidate was filtered as onboarding state, say nothing.

### Why this is non-overridable

Stranded framework improvements (changes shipped to one project but never pushed upstream) break universal protocol consistency. Today's project gains the improvement; tomorrow's project hits the same bug because it didn't get the fix. `/dayclose` is the mechanical safety net for Rule 7 - `/wrap` stages improvements locally (commits but does NOT push) and `/dayclose` enforces the end-of-day push to upstream. This removes the human "I'll push later" failure mode by making "later" = `/dayclose`. See Execution Contract Rule 7.

### 7c: If repos don't exist

If `~/Projects/thefirm/` or `~/Projects/thestack/` doesn't exist, skip that check silently. Don't error, don't clone - that's `/sync`'s job.

## Step 8: Cleanup Sweep

### Demo/temp pages
- Check for any DEMX variation pages or temp files created this session
- Delete them - they're exploration artifacts, not production files

### Sensitive file check
- Before committing anything, scan staged/unstaged files for sensitive patterns: `.env*`, `credentials*`, `*.pem`, `*.key`, `*secret*`, `*.p12`, `*.pfx`
- If found: **do NOT commit them.** Add to `.gitignore` if not already there. Warn James: "Sensitive file detected: [filename] - not committed. Added to .gitignore"

### Unstaged changes
- Run `git status` and check for any uncommitted changes
- If there are uncommitted changes: review the diffs, commit them (housekeeping commit if pre-existing, bundled with wrap if from this session), and push
- The goal is a **clean working tree** - don't leave dirty files behind, don't ask what to do with them, just sort it

### Project-specific checks
- Projects can add custom checks here via `# PROJECT-SPECIFIC OVERRIDE`
- Example: PDF staleness for decks, build verification, migration checks

## Step 9: Commit & Push

- Stage the wrap-up files (CHANGELOG.md, session-log.md, debts.md, TODO.md) alongside any remaining unstaged work the user approved
- **Verify staged content matches the day's actual work BEFORE committing** - run `git diff --cached --stat` (or `--shortstat` if the list is long). Confirm every file you touched today appears, line counts roughly match the day's edits, and no file you did NOT touch appears unexpectedly. If the staged diff doesn't match: STOP. Parallel instances may have reverted edits silently. Re-stage from the day's known-touched list before committing - the commit message will lie about what shipped otherwise.
- **One commit** - don't create a separate "docs: session close-out" commit. Amend the last commit if it was from this session and hasn't been pushed, or create a single wrap-up commit if the last commit was already pushed
- **Embed the Step 1b forensic block (aggregated for the day) in the commit body**, between the summary and the `Co-Authored-By:` trailer. Format:
  ```
  --- Forensic Block (day) ---
  Subsystems:   <union>
  Files:        <union, top 12 + count>
  Risk surface: <union>
  Verified:     <highest-confidence statement across the day>
  Deferred:     <union of deferred items - the day's debt list>
  --- /Forensic Block ---
  ```
- **Push to remote immediately** - pushing is part of the wrap, not a separate ask. Don't prompt "want me to push?" - just push
- **If push fails** (network, auth, rejected): warn James with the error. Retry once. If still failing: "Push failed - commits are local only. Push manually when network is available". Do NOT leave this unmentioned - always flag unpushed commits in the summary
- If there are Linear issues related to this session's work, update/close them

## Step 10: Deploy & Verify (MANDATORY)

Railway auto-deploys on push to main. This step confirms it's live. **Do NOT present the final summary until production is verified.**

1. **Check deployment status** - use Railway MCP or `railway status` to check the latest deployment
2. **If deployment is in progress** - wait for it to complete. Poll every 30 seconds
3. **If deployment failed** - check logs, surface the error. Do NOT proceed to summary until it's fixed or James acknowledges
4. **If deployment succeeded** - verify the site is live. Get the production URL from `project.json` (`project.url`) or CLAUDE.md and run: `curl -s -o /dev/null -w "%{http_code}" [PRODUCTION_URL]`
5. **Do NOT tell James to close until the deploy is live and verified.** This is non-negotiable. The session isn't done until production is running the latest code

## Step 10b: Write Session Context (CRITICAL - bridge to next session)

Write `.ai/thefirm/gaffer/session-context.md` - same format as /wrap Step 8b. This is what `/go` reads tomorrow. Captures design decisions, rejected alternatives, in-progress work, deferred discussions, and "Pick Up From Here" priorities.

**This is mandatory.** See /wrap Step 8b for the full format. If the session was a full day close, the "Pick Up From Here" section should reflect the next day's priorities, not the next hour's.

## Step 11: Self-Learn (MANDATORY - runs every wrap)

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.

Log to `.claude/skills/dayclose/evolution.md`. Focus retrospectives on:
- **Caught:** Dirty files cleaned, caches purged, processes killed, stashes flagged, framework improvements detected, sensitive files blocked
- **Missed:** Files left uncommitted, caches not cleared, processes still holding volume, framework changes not flagged
- **Friction:** Steps that took too long, unnecessary confirmations
- **User overrode:** Skipped steps, changed commit approach, skipped deploy check, declined framework push

## Step 12: Clean Tree Confirmation

1. Run `git status -s` - output must be empty
2. If not empty, something was missed - commit and push until clean

## Step 13: Cache Cleanup & Disk Space

Purge build caches before ejecting - they're regenerated on next `pnpm dev` and waste disk space.

1. Record disk usage before: `du -sh .next .turbo node_modules/.cache apps/web/.next 2>/dev/null`
2. If `scripts/cleanup-cache.sh` exists, run it and **check the exit code** - if non-zero, warn: "Cleanup script failed - running manual cleanup". Then run manual cleanup regardless:
   - `.turbo/` (Turborepo cache)
   - `.next/` and `apps/web/.next/` (Next.js build cache)
   - `node_modules/.cache/` (Babel/ESLint/Turbopack caches)
   - Any `*.tsbuildinfo` files
   - Playwright test artifacts (`test-results/`, `playwright-report/`)
3. Record disk usage after and report space freed

## Step 14: Stash & Branch Check

Don't let work-in-progress get forgotten.

1. Run `git stash list` - if stashes exist, list them with a warning: "You have N stash(es) on this machine"
2. Run `git branch` - if not on `main`, flag it: "You're on branch `X` - is that intentional?"
3. These are flags, not blockers - just make sure the user knows

## Step 15: Time Check & Summary

1. Run `date` to get current time
2. If past 22:00 local time, mention it - suggest calling it a night

Present the wrap-up:
```
**Session wrapped. Clean tree. Ready to eject.**
- [What we shipped - 2-3 bullet points]
- [Open debts or flags, if any]
- [Framework sync status - pushed / flagged / skipped]
- [Deploy status]
- [Disk space freed]
- [Stash/branch warnings, if any]
- [TODOs for next session, if any]
```

## Step 16: Release the Project Volume (LAST STEP)

**WARNING: This step kills node processes, which may kill this conversation. Present the summary BEFORE running this step. Tell the user: "Killing processes now - session may disconnect. Everything is committed and pushed."**

If the project lives on an external/removable drive, dev servers and other processes may hold file handles that block ejection.

1. Detect if the project path is on a removable volume (e.g. `/Volumes/` on macOS)
2. If yes, use the **exact project path with trailing slash**: `lsof +D /Volumes/Projects/hospojobs/ 2>/dev/null | awk 'NR>1 {print $1, $2}' | sort -u`
3. If PIDs are found:
   - Show the user what's running (process name + PID)
   - **Check for other Claude Code instances** - warn instead of killing: "Another session is running - close it manually or confirm kill"
   - Kill the rest: `lsof +D <exact-path>/ 2>/dev/null | awk 'NR>1 {print $2}' | sort -u | xargs kill`
   - Wait 2 seconds, re-check. Stragglers get `kill -9`
4. If no PIDs found or not on a removable volume, skip silently
5. Confirm: **"Volume released."**

## Rules

- **Fast.** This is a 60-second process, not a 5-minute ceremony
- **Don't duplicate.** Check existing changelog/session-log entries before adding
- **One commit.** Wrap-up files go with the work, not in a separate commit
- **Never commit secrets.** Always scan for sensitive files before staging. Block, warn, .gitignore
- **Always clean up.** Demo pages, temp files - don't leave mess behind
- **Always flag.** Uncommitted changes, stale artifacts, open Linear issues, push failures - surface them, let the user decide
- **Always check framework.** Step 7 is not optional. Never let Firm/Stack improvements go unpushed without at least flagging them
- **Always learn.** Step 11 is not optional. Every wrap teaches the next one
- **Forensic block on every commit + log entry.** Step 1b is mandatory. Verified + Deferred fields cannot be empty - honesty over cleanliness
