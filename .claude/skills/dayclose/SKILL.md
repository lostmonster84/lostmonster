---
name: dayclose
description: End of day — full cleanup, cache purge, process kill, volume release. Use /wrap for lightweight conversation close.
---

You are the **Day Closer**. Full shutdown. You get smarter every time you run.

When the user says `/dayclose`, execute this sequence. This is the nuclear option — kills processes, clears caches, releases the volume.

## Step 1: Auto-Detect What Shipped

1. The git status snapshot at conversation start shows the HEAD commit when the session began. Run `git log --oneline` and identify all commits made **this session** (everything after that starting commit)
2. **Verify the starting commit exists:** run `git cat-file -t <starting-commit>` first. If it fails (commit was rebased/squashed/amended away), fall back to `git log --oneline -20` and ask James to confirm which commits are from this session
3. Run `git diff --stat <starting-commit>..HEAD` to see the full scope of changes
4. This is the source of truth — don't rely on conversation memory alone

## Step 2: Read Evolution Log

1. Read `.claude/skills/dayclose/evolution.md` before doing anything else
2. Check the **Learned Rules** section — these are things previous wraps taught you
3. Apply every learned rule during this wrap. They override the defaults below if there's a conflict

## Step 3: Update CHANGELOG.md

1. Read `CHANGELOG.md` — if the file doesn't exist, create it with a `# Changelog` header
2. Check if today's date heading (`## YYYY-MM-DD`) already exists. **Use the date of this session's first commit** (not `date` at wrap time) to avoid midnight-crossing mismatches
   - If yes: **append** new entries under the existing heading, don't duplicate what's already there
   - If no: add a new dated heading
3. Add concise entries for everything shipped this session
4. Keep entries human-readable — what changed, not how
5. Group by theme (features, fixes, improvements)
6. If nothing shipped, don't add an empty entry

## Step 4: Update Session Log

1. Read `.ai/thefirm/gaffer/session-log.md` (if The Firm is installed)
2. If there isn't already an entry for this session's work, add one following the existing format
3. Include: what was built, workers used, scores, issues found, ship status

## Step 5: Check for Debts

1. If The Firm is installed, read `.ai/thefirm/gaffer/debts.md`. If the file doesn't exist but `.ai/thefirm/gaffer/` does, create it with the standard header: `# Quality Debts\n\n> Maintained by The Gaffer. Open items that need attention.\n\n---\n\n## Open Debts\n\n## Resolved\n`
2. If anything was deferred or skipped this session, log it
3. If any debts were resolved this session, move them to Resolved

## Step 6: Update TODO.md

1. Read `TODO.md` at project root (if it exists)
2. **Clear completed items** — if any TODO items were completed this session, remove them from TODO.md and note them as done in the changelog entry where the work shipped
3. **Add new items** — if work was started but not finished, or if the user flagged follow-up tasks, add them as `- [ ]` items grouped under a `## From YYYY-MM-DD` heading
4. **Add Pick Up reference** — if new TODOs were added, add a `### Pick Up` line under today's changelog entry: `> See [TODO.md](TODO.md) for active items from this session`
5. If TODO.md is empty (all items cleared, no new ones), delete the file — don't leave an empty TODO
6. If TODO.md doesn't exist and there are no pending items, skip this step

**The flow:** TODOs are born in TODO.md during wrap → picked up in a future session → cleared from TODO.md during that session's wrap → noted as completed in that session's changelog entry.

## Step 7: Check for Framework Improvements

Detect if any Firm workers or Stack skills were modified this session and prompt to push upstream.

### 7a: Check The Firm

1. If `.ai/thefirm/` exists and `~/Projects/thefirm/` exists:
2. Diff the project's Firm files against the upstream repo — focus on files that are syncable (see `/firm` skill for the list): `PROTOCOL.md`, `crew/GAFFER.md`, `crew/planners/*.md`, `crew/builders/*.md`, `crew/reviewers/*.md`, `crew/checkers/*.md`
3. **Exclude state files** from the diff: `gaffer/session-log.md`, `gaffer/debts.md`, `gaffer/calibration.md`, `gaffer/evolution.md`, `gaffer/inspections/`, `CLAUDE-SUPPLEMENT.md`
4. **Determine direction:** for each differing file, check if the upstream repo's version is newer (use `git log -1 --format=%ct -- <file>` in the upstream repo). If upstream is newer, it's a pull situation — skip it, that's `/sync`'s job. Only flag files where **local is newer** (modified more recently than upstream's last commit)
5. If any syncable files have local improvements:
   - List the changed files
   - Ask: "Firm improvements detected — push upstream with `/firm`? (y/n)"
   - If yes: invoke `/firm` with a summary of changes. If `/firm` fails, log to debts.md: "Failed to push Firm improvements: [files]. Retry with `/firm` next session"
   - If no: log to debts.md: "Firm improvements not pushed: [files]. Push with `/firm` next session"

### 7b: Check The Stack

1. If `.claude/skills/` exists and `~/Projects/thestack/skills/` exists:
2. For each skill directory, diff the local SKILL.md against Stack's version
3. **Exclude evolution.md** from the diff (per-project state)
4. **Determine direction:** same as 7a — use git timestamps in the Stack repo to distinguish "local ahead" from "upstream ahead". Only flag local improvements
5. If any skills have local improvements:
   - List the changed skills
   - Ask: "Stack skill improvements detected — push upstream with `/stack`? (y/n)"
   - If yes: invoke `/stack` with a summary of changes. If `/stack` fails, log to debts.md: "Failed to push Stack improvements: [skills]. Retry with `/stack` next session"
   - If no: log to debts.md: "Stack improvements not pushed: [skills]. Push with `/stack` next session"

### 7c: If repos don't exist

If `~/Projects/thefirm/` or `~/Projects/thestack/` doesn't exist, skip that check silently. Don't error, don't clone — that's `/sync`'s job.

## Step 8: Cleanup Sweep

### Demo/temp pages
- Check for any DEMX variation pages or temp files created this session
- Delete them — they're exploration artifacts, not production files

### Sensitive file check
- Before committing anything, scan staged/unstaged files for sensitive patterns: `.env*`, `credentials*`, `*.pem`, `*.key`, `*secret*`, `*.p12`, `*.pfx`
- If found: **do NOT commit them.** Add to `.gitignore` if not already there. Warn James: "Sensitive file detected: [filename] — not committed. Added to .gitignore"

### Unstaged changes
- Run `git status` and check for any uncommitted changes
- If there are uncommitted changes: review the diffs, commit them (housekeeping commit if pre-existing, bundled with wrap if from this session), and push
- The goal is a **clean working tree** — don't leave dirty files behind, don't ask what to do with them, just sort it

### Project-specific checks
- Projects can add custom checks here via `# PROJECT-SPECIFIC OVERRIDE`
- Example: PDF staleness for decks, build verification, migration checks

## Step 9: Commit & Push

- Stage the wrap-up files (CHANGELOG.md, session-log.md, debts.md, TODO.md) alongside any remaining unstaged work the user approved
- **One commit** — don't create a separate "docs: session close-out" commit. Amend the last commit if it was from this session and hasn't been pushed, or create a single wrap-up commit if the last commit was already pushed
- **Push to remote immediately** — pushing is part of the wrap, not a separate ask. Don't prompt "want me to push?" — just push
- **If push fails** (network, auth, rejected): warn James with the error. Retry once. If still failing: "Push failed — commits are local only. Push manually when network is available". Do NOT leave this unmentioned — always flag unpushed commits in the summary
- If there are Linear issues related to this session's work, update/close them

## Step 10: Deploy & Verify (MANDATORY)

Railway auto-deploys on push to main. This step confirms it's live. **Do NOT present the final summary until production is verified.**

1. **Check deployment status** — use Railway MCP or `railway status` to check the latest deployment
2. **If deployment is in progress** — wait for it to complete. Poll every 30 seconds
3. **If deployment failed** — check logs, surface the error. Do NOT proceed to summary until it's fixed or James acknowledges
4. **If deployment succeeded** — verify the site is live. Get the production URL from `project.json` (`project.url`) or CLAUDE.md and run: `curl -s -o /dev/null -w "%{http_code}" [PRODUCTION_URL]`
5. **Do NOT tell James to close until the deploy is live and verified.** This is non-negotiable. The session isn't done until production is running the latest code

## Step 10b: Write Session Context (CRITICAL — bridge to next session)

Write `.ai/thefirm/gaffer/session-context.md` — same format as /wrap Step 8b. This is what `/go` reads tomorrow. Captures design decisions, rejected alternatives, in-progress work, deferred discussions, and "Pick Up From Here" priorities.

**This is mandatory.** See /wrap Step 8b for the full format. If the session was a full day close, the "Pick Up From Here" section should reflect the next day's priorities, not the next hour's.

## Step 11: Self-Learn (MANDATORY — runs every wrap)

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.

Log to `.claude/skills/dayclose/evolution.md`. Focus retrospectives on:
- **Caught:** Dirty files cleaned, caches purged, processes killed, stashes flagged, framework improvements detected, sensitive files blocked
- **Missed:** Files left uncommitted, caches not cleared, processes still holding volume, framework changes not flagged
- **Friction:** Steps that took too long, unnecessary confirmations
- **User overrode:** Skipped steps, changed commit approach, skipped deploy check, declined framework push

## Step 12: Clean Tree Confirmation

1. Run `git status -s` — output must be empty
2. If not empty, something was missed — commit and push until clean

## Step 13: Cache Cleanup & Disk Space

Purge build caches before ejecting — they're regenerated on next `pnpm dev` and waste disk space.

1. Record disk usage before: `du -sh .next .turbo node_modules/.cache apps/web/.next 2>/dev/null`
2. If `scripts/cleanup-cache.sh` exists, run it and **check the exit code** — if non-zero, warn: "Cleanup script failed — running manual cleanup". Then run manual cleanup regardless:
   - `.turbo/` (Turborepo cache)
   - `.next/` and `apps/web/.next/` (Next.js build cache)
   - `node_modules/.cache/` (Babel/ESLint/Turbopack caches)
   - Any `*.tsbuildinfo` files
   - Playwright test artifacts (`test-results/`, `playwright-report/`)
3. Record disk usage after and report space freed

## Step 14: Stash & Branch Check

Don't let work-in-progress get forgotten.

1. Run `git stash list` — if stashes exist, list them with a warning: "You have N stash(es) on this machine"
2. Run `git branch` — if not on `main`, flag it: "You're on branch `X` — is that intentional?"
3. These are flags, not blockers — just make sure the user knows

## Step 15: Time Check & Summary

1. Run `date` to get current time
2. If past 22:00 local time, mention it — suggest calling it a night

Present the wrap-up:
```
**Session wrapped. Clean tree. Ready to eject.**
- [What we shipped — 2-3 bullet points]
- [Open debts or flags, if any]
- [Framework sync status — pushed / flagged / skipped]
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
- **Always clean up.** Demo pages, temp files — don't leave mess behind
- **Always flag.** Uncommitted changes, stale artifacts, open Linear issues, push failures — surface them, let the user decide
- **Always check framework.** Step 7 is not optional. Never let Firm/Stack improvements go unpushed without at least flagging them
- **Always learn.** Step 11 is not optional. Every wrap teaches the next one
