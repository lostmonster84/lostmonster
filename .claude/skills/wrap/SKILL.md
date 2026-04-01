---
name: wrap
description: Wrap a conversation — commit, push, update logs, keep dev server running. Use /dayclose to fully shut down.
---

You are the **Chat Closer**. Lightweight conversation wrap that keeps the dev server running.

Use `/wrap` to close a conversation but keep working (dev server stays up, caches stay warm, volume stays mounted). Use `/dayclose` when you're done for the day and want to eject.

When the user says `/wrap`, execute this sequence **fast**. Under 30 seconds.

## Step 0: Safety Checks

Run these before anything else:

1. **Confirm CWD** — run `git rev-parse --show-toplevel` and verify it matches the project root. If not, `cd` to the correct root before proceeding
2. **Check git state** — run `git status`. If any of these are true, **abort wrap and tell the user**:
   - Merge in progress (`UU` files, `.git/MERGE_HEAD` exists)
   - Rebase in progress (`.git/rebase-merge/` or `.git/rebase-apply/` exists)
   - Cherry-pick in progress (`.git/CHERRY_PICK_HEAD` exists)
3. **Check HEAD** — run `git symbolic-ref --short HEAD 2>/dev/null`. If it fails, you're in detached HEAD — warn the user: "Detached HEAD — commit to a branch before wrapping"
4. **Check for empty session** — if no new commits since session start AND `git status` is clean (ignoring `.env*`, `screenshots/`, `next-env.d.ts`), output "Nothing to wrap — no work this session" and stop

## Step 1: Read Evolution Log

1. Read `.claude/skills/wrap/evolution.md` — if the file doesn't exist, create it with:
   ```
   # Wrap Evolution Log\n\n> Self-learning log. Each wrap teaches the next one.\n\n---\n\n### Learned Rules\n- (None yet)\n
   ```
2. Apply any learned rules

## Step 2: Auto-Detect What Shipped

1. The git status snapshot at conversation start shows the HEAD commit when the session began
2. **Verify the starting commit exists:** run `git cat-file -t <starting-commit>` first. If it fails (rebased/squashed away), fall back to `git --no-pager log --oneline -20` and infer which commits are from this session
3. Run `git --no-pager diff --stat <starting-commit>..HEAD` for scope (skip if no valid starting commit)
4. Run `git status` for uncommitted work

**Important:** Always use `git --no-pager` for all git log/diff commands to prevent hanging.

## Step 3: Handle Uncommitted Work

1. **Safety unstage** — before any commit, always run:
   ```
   git reset HEAD -- .env* .env.local screenshots/ node_modules/ 2>/dev/null
   ```
   This ensures secrets and junk are never committed, even if accidentally staged.

2. **Only commit THIS session's work.** Multiple Claude instances may be running in parallel, each modifying different files. Before staging:
   - Review every dirty file in `git status`
   - Only stage files that **this conversation** actually created or edited
   - If a file is dirty but you didn't touch it in this conversation, **leave it** — another instance will handle it
   - When in doubt, check the file's diff — if the changes don't match your work, skip it
3. If there are uncommitted changes from this session's work:
   - Review the diff — flag any file >5MB as suspicious
   - Stage and commit them with a clear message using HEREDOC format
   - Push to remote
4. If the only remaining dirty files are `.env.local`, `screenshots/`, `next-env.d.ts`, or files from other instances — leave them

## Step 4: Update CHANGELOG.md

1. **Check existence** — if `CHANGELOG.md` doesn't exist, create it with `# Changelog\n` header
2. **Check for today's date** — search for existing `## YYYY-MM-DD` heading matching this session's date. Use the date from `git --no-pager log -1 --format=%ad --date=short` of the first session commit
   - If today's heading exists: **append** new bullet points under the existing heading
   - If not: add a new dated heading at the top (after `# Changelog`)
3. Add concise entries for what shipped. Don't duplicate existing bullets
4. If nothing shipped, don't add an empty entry

## Step 5: Update Session Log

1. Check if `.ai/thefirm/` exists — if not, skip Steps 5 and 6 entirely
2. Read `.ai/thefirm/gaffer/session-log.md` — if file doesn't exist, create it with standard header:
   ```
   # Session Log\n\n> Maintained by The Gaffer. One entry per session where work was shipped.\n\n---\n
   ```
3. Check if an entry for this session's work already exists (same date + same topic) — if so, append to it rather than creating a duplicate
4. Add entry following the existing format

## Step 6: Check Debts

1. Read `.ai/thefirm/gaffer/debts.md` — if file doesn't exist, create it with standard header:
   ```
   # Quality Debts\n\n> Maintained by The Gaffer. Open items that need attention.\n\n---\n\n## Open Debts\n\n## Resolved\n
   ```
2. Log anything deferred. Resolve anything completed

## Step 6B: TRAINX Feedback Scan

1. Check if `.ai/thefirm/` exists — if not, skip this step
2. Scan memory files in the project memory directory for any with `needs-trainx: true` in their frontmatter
3. If none found, skip silently
4. For each unpatched feedback:
   a. Read the feedback content
   b. Run TRAINX root cause analysis (5 steps from TRAINX playbook)
   c. Identify which worker playbook(s) need patching
   d. Write the surgical patch to each playbook
   e. Log to `.ai/thefirm/gaffer/evolution.md` with a patch version bump
   f. Update the feedback memory file: change `needs-trainx: true` to `needs-trainx: false`
5. After all patches are applied:
   a. Copy changed playbooks + evolution.md to `~/Projects/thefirm/`
   b. Commit in thefirm repo with message describing the patches
   c. Push thefirm to origin/main
6. Report in wrap summary: "TRAINX: X feedback items patched → thefirm synced"

## Step 7: Commit & Push Wrap Files

1. Stage only wrap files that **this session** updated (CHANGELOG.md, session-log.md, debts.md, evolution.md if updated). Do not stage wrap files modified by other instances
2. **Safety unstage again** — `git reset HEAD -- .env* .env.local screenshots/ node_modules/ 2>/dev/null`
3. Commit using HEREDOC format for the message
4. **Check commit exit code** — if the commit failed (pre-commit hook rejection, empty commit), surface the error and do NOT proceed to push
5. **Push** — run `git push 2>&1`. Check exit code:
   - If push fails with "no upstream branch": retry with `git push -u origin $(git branch --show-current)`
   - If push fails with auth error: warn "Push failed — auth issue. Commits are local only. Push manually"
   - If push fails with rejection: warn "Push rejected — remote has diverged. Pull and resolve before pushing"
   - If push succeeds: continue

## Step 8: Framework Drift Check

Quick check if local improvements need pushing upstream. Run in parallel:

1. **Stack drift** — for each skill in `.claude/skills/*/SKILL.md`, diff against `~/Projects/thestack/skills/*/SKILL.md`. If any local file is newer (by mtime) AND content differs, it's locally ahead
2. **Firm drift** — diff `.ai/thefirm/crew/GAFFER.md` mtime against `~/Projects/thefirm/.ai/thefirm/crew/GAFFER.md`. Also check `.ai/thefirm/PROTOCOL.md` and any worker files modified this session

If either repo is missing, skip silently. If drift detected, include in the wrap summary:
```
**Framework drift:**
- Skills ahead of Stack: /gaffer, /go → `/stack` to push
- Workers ahead of Firm: GAFFER.md → `/firm` to push
```
If no drift, say nothing.

## Step 8b: Write Session Context (CRITICAL — the bridge to next session)

Write `.ai/thefirm/gaffer/session-context.md` — this is what `/go` reads tomorrow. It captures everything that session-log and debts DON'T: the thinking, the decisions, the in-progress work.

**Overwrite the file each wrap** (it's always "current session context", not a log).

```markdown
# Session Context — YYYY-MM-DD

## What Shipped
- [1-3 bullets of what was built and committed]

## Design Decisions Made
- [Element]: Chose [approach] because [rationale]
- [Element]: Chose [approach] because [rationale]
(If no design decisions this session, write "None — backend/infrastructure session")

## Rejected Alternatives
- [What was considered but not chosen, and why]
(Helps next session avoid re-exploring dead ends)

## In-Progress Work
- [What was started but not finished]
- [DEMX variations explored — which won, which lost, why]
- [Unfinished explorations or experiments]

## Deferred to Next Session
- [Specific tasks or discussions that need to continue]
- [Blocked work and what's blocking it]
- [Worker audits that were skipped and should run next time]

## Pick Up From Here
1. [First priority for next session]
2. [Second priority]
3. [Third priority]
```

**Rules:**
- This file is **mandatory on every wrap**. No exceptions
- Keep it concise — this is a briefing, not a novel
- "Design Decisions" and "Rejected Alternatives" are the most valuable sections — they prevent re-exploring dead ends
- "Pick Up From Here" is what `/go` surfaces as "On the plate" priorities
- If the session was purely infrastructure (no design), say so — don't invent design decisions

## Step 9: Self-Learn

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.
Log to `.claude/skills/wrap/evolution.md`. Determine the run number from the last `## Wrap #N` entry.

## Step 10: Summary

Present a tight summary:

```
**Chat wrapped. Dev server still running.**
- [What shipped — 2-3 bullets]
- [Branch + push status]
- [Open debts or flags, if any]
```

## What This Skill Does NOT Do

These are `/dayclose` only — intentionally skipped here:

- **NO cache cleanup** — `.next`, `.turbo`, `node_modules/.cache` stay warm
- **NO process killing** — dev server, node, watchers all keep running
- **NO volume release** — no `lsof`, no `kill`, drive stays mounted
- **NO stash/branch warnings** — you're still working, not ejecting
- **NO disk space reporting**
- **NO deploy check**

## Rules

- **Fast.** 30 seconds. Commit, push, summarise, done
- **Don't kill anything.** The whole point is the dev server stays up
- **One commit for wrap files.** Don't create separate docs commits
- **Always push.** Don't leave unpushed commits — but surface failures clearly
- **Always learn.** Step 9 is not optional
- **Never commit secrets.** The double safety-unstage in Steps 3 and 7 is not optional
- **Always use `--no-pager`** for git log/diff commands
- **Always use HEREDOC** for commit messages
- **Abort on git conflicts.** Never try to wrap during a merge/rebase/cherry-pick
