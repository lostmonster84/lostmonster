---
name: wrap
description: Wrap a conversation - commit locally, update logs, keep dev server running. NO push (deferred to /dayclose). Use /dayclose to fully shut down + push everything.
---

You are the **Chat Closer**. Lightweight conversation wrap that keeps the dev server running.

Use `/wrap` to close a conversation but keep working (dev server stays up, caches stay warm, volume stays mounted). Use `/dayclose` when you're done for the day and want to eject.

When the user says `/wrap`, execute this sequence **fast**. Under 30 seconds.

## Step 0: Safety Checks

Run these before anything else:

1. **Confirm CWD** - run `git rev-parse --show-toplevel` and verify it matches the project root. If not, `cd` to the correct root before proceeding
2. **Check git state** - run `git status`. If any of these are true, **abort wrap and tell the user**:
   - Merge in progress (`UU` files, `.git/MERGE_HEAD` exists)
   - Rebase in progress (`.git/rebase-merge/` or `.git/rebase-apply/` exists)
   - Cherry-pick in progress (`.git/CHERRY_PICK_HEAD` exists)
3. **Check HEAD** - run `git symbolic-ref --short HEAD 2>/dev/null`. If it fails, you're in detached HEAD - warn the user: "Detached HEAD - commit to a branch before wrapping"
4. **Check for empty session** - if no new commits since session start AND `git status` is clean (ignoring `.env*`, `screenshots/`, `next-env.d.ts`), output "Nothing to wrap - no work this session" and stop

## Step 1: Read Evolution Log

1. Read `.claude/skills/wrap/evolution.md` - if the file doesn't exist, create it with:
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

## Step 2b: Generate Forensic Block (MANDATORY)

The forensic block is the bridge between commits and bug archaeology. Every commit and every session-log entry carries one. When something breaks N days later, `git log --grep "Subsystems: <area>"` returns every commit that touched that area with the risk surface attached. Skipping this block means the next archaeology session is blind.

1. **Self-heal scaffold (idempotent, runs every wrap)** - copy missing infrastructure from Stack template before running the generator. This makes /wrap robust to projects that pulled the new wrap skill but haven't re-run /sync since:
   ```bash
   [ ! -f scripts/forensic-log.ts ] && [ -f ~/Projects/thestack/template/scripts/forensic-log.ts ] && mkdir -p scripts && cp ~/Projects/thestack/template/scripts/forensic-log.ts scripts/forensic-log.ts && echo "  self-healed: scripts/forensic-log.ts"
   [ ! -f subsystems.json ] && [ -f ~/Projects/thestack/template/subsystems.json ] && cp ~/Projects/thestack/template/subsystems.json subsystems.json && echo "  self-healed: subsystems.json"
   ```
   If files exist, both checks short-circuit silently. If the Stack template ALSO lacks them (older Stack on this machine), skip Step 2b with: "Forensic infra missing AND Stack template lacks it - run `/sync` to bump Stack, then `/wrap` again."

2. **Run the generator** (auto-fills 3 of 5 fields from `subsystems.json` + `git diff`):
   ```bash
   pnpm exec tsx scripts/forensic-log.ts <session-start-sha>
   ```
   `<session-start-sha>` is the HEAD commit from the conversation-start git snapshot. If the script outputs "No changed files", skip Step 2b entirely (nothing to commit).

3. **Capture the 5 fields:**
   - `Subsystems:` (auto-filled - logical areas touched, e.g. `auth, billing, dashboard`)
   - `Files:` (auto-filled - changed files, truncated if >12)
   - `Risk surface:` (auto-filled from manifest - supplement if the change introduces a new risk not yet in `subsystems.json`)
   - `Verified:` (PLACEHOLDER - YOU fill this with what was tested LIVE on real input)
   - `Deferred:` (PLACEHOLDER - YOU fill this with what was NOT verified end-to-end)

4. **Verified + Deferred are not optional.** Empty placeholders are a protocol violation. Be honest:
   - If everything was verified end-to-end: `Verified: full happy-path flow live on staging`
   - If nothing was tested live: `Verified: NONE - all changes are theory-only patches` (then this is a high-risk wrap; flag it)
   - If only synthetic tests passed: `Verified: repro script only - production path NOT exercised`
   - Mirror everything skipped into `Deferred:` so it shows up in archaeology

5. **Hold the completed block** - it goes into Step 3's commit body AND Step 5's session-log entry verbatim. Same text, both places.

6. **Update the manifest if needed** - if the change introduces a new subsystem boundary or a risk surface not yet captured in `subsystems.json`, update the manifest in the same commit. Stale manifest = stale forensics.

## Step 3: Handle Uncommitted Work

1. **Safety unstage** - before any commit, always run:
   ```
   git reset HEAD -- .env* .env.local screenshots/ node_modules/ 2>/dev/null
   ```
   This ensures secrets and junk are never committed, even if accidentally staged.

2. **Only commit THIS session's work.** Multiple Claude instances may be running in parallel, each modifying different files. Before staging:
   - Review every dirty file in `git status`
   - Only stage files that **this conversation** actually created or edited
   - If a file is dirty but you didn't touch it in this conversation, **leave it** - another instance will handle it
   - When in doubt, check the file's diff - if the changes don't match your work, skip it
3. If there are uncommitted changes from this session's work:
   - Review the diff - flag any file >5MB as suspicious
   - **Stage** the files you touched: prefer `git add <specific files>` over `git add -A` / `git add .` which can sweep in another instance's WIP
   - **Verify staged content matches your intent BEFORE committing** - run `git diff --cached --stat` (or `--shortstat` if the list is long). Confirm every file you edited this session appears, line counts roughly match your edits, and no file you did NOT touch appears unexpectedly. If the staged diff doesn't match what you did: STOP. Parallel Claude instances may have reverted your Edit/Write between your edit and `git add` (silent no-op on already-clean files), leaving you about to commit someone else's work under your commit message. Re-stage from your known-touched list before committing.
   - **Commit** with a clear message using HEREDOC format
   - **Embed the Step 2b forensic block in the commit body** (between the summary and the `Co-Authored-By:` trailer). Format:
     ```
     git commit -m "$(cat <<'EOF'
     <type>(<scope>): <summary>

     <optional body explaining what and why>

     --- Forensic Block ---
     Subsystems:   <list>
     Files:        <list>
     Risk surface: <items>
     Verified:     <what was tested LIVE on real input>
     Deferred:     <what was NOT verified end-to-end>
     --- /Forensic Block ---

     Co-Authored-By: ...
     EOF
     )"
     ```
   - **DO NOT push.** Commit stays local until `/dayclose` (or explicit `git push`). See Step 7 + "What This Skill Does NOT Do" for rationale.
4. If the only remaining dirty files are `.env.local`, `screenshots/`, `next-env.d.ts`, or files from other instances - leave them

## Step 4: Update CHANGELOG.md

1. **Check existence** - if `CHANGELOG.md` doesn't exist, create it with `# Changelog\n` header
2. **Check for today's date** - search for existing `## YYYY-MM-DD` heading matching this session's date. Use the date from `git --no-pager log -1 --format=%ad --date=short` of the first session commit
   - If today's heading exists: **append** new bullet points under the existing heading
   - If not: add a new dated heading at the top (after `# Changelog`)
3. Add concise entries for what shipped. Don't duplicate existing bullets
4. If nothing shipped, don't add an empty entry

## Step 4b: Customer-Facing Changelog Auto-Append (conditional)

If the project ships an in-app "What's new" modal sourced from a TypeScript changelog file with the shape `export const CHANGELOG: ChangelogEntry[] = [...]`, auto-append today's user-facing entries directly. This step is a no-op for projects without that convention.

The whole point is "can't be forgotten" - drafting to a temp file just shifts the manual step from "remember to draft" to "remember to paste". Append directly. The wrap commit captures the diff for review before the next push out to prod.

1. **Detect the in-app changelog file** - look for one of these paths in priority order:
   - `apps/*/src/lib/changelog.ts`
   - `src/lib/changelog.ts`
   - `packages/*/src/lib/changelog.ts`

   If none exist, skip Step 4b entirely.

2. **Filter today's commits to user-facing only** - read the session-start SHA from Step 2 and run `git --no-pager log <start>..HEAD --pretty=format:"%h %s"`. Keep commits whose subject:
   - Starts with `feat(` or `fix(`
   - AND scope is NOT one of `framework`, `firm`, `stack`, `debts`, `chore`, `test`, `tests`, `docs`, `subsystems`, `skills`, `infra`
   - AND does NOT touch `.ai/thefirm/`, `.claude/skills/`, framework-only globs

   Drop everything else. Internal refactors, framework patches, and chores don't belong in a customer changelog.

3. **Draft NIGELX-toned bullets** - for each kept commit, write ONE bullet in the voice of "what the user feels":
   - Plain English, action-first
   - No file paths, no commit SHAs, no jargon
   - Past tense or present continuous (matches existing entries' tone)
   - One sentence per bullet
   - If the commit closes a Linear ticket, reference what the customer asked for, not the ticket ID

4. **Auto-append to the changelog file** - read the file, find or insert today's date entry in the `CHANGELOG` array:
   - **If today's entry exists**: append the new bullets to that entry's `items` array (de-dup against existing strings - skip any new bullet whose text already appears)
   - **If today's entry doesn't exist**: prepend a new entry to the top of the array, immediately after the opening `[`. Format:
     ```ts
       {
         date: "YYYY-MM-DD",
         items: [
           "<bullet 1>",
           "<bullet 2>",
         ],
       },
     ```
   - Preserve indentation and quote style from the existing entries
   - Strings with embedded `"` must be escaped (`\"`) consistently with the existing entries

5. **No-op cleanly if no user-facing commits** - if the filter returns zero commits, do not modify the file at all. Don't write empty entries. Skip silently.

6. **Surface in Step 10 summary** - one line: `**Customer changelog:** appended N entries to <path> (review before next push)`. If zero, skip the line. The wrap commit captures the changelog.ts diff for human review - this is the review gate, not a separate manual paste step.

7. **Hands off if today's entry has been hand-edited beyond auto-append shape** - if today's entry exists but contains items that don't look auto-generated (e.g., they reference specific feature names not in any of today's commits, or use prose noticeably more polished than NIGELX-default), still append - the human edits stay intact, just the new bullets land alongside. Avoid clever heuristics here; an extra bullet is recoverable, a lost human edit is not.

## Step 5: Update Session Log

1. Check if `.ai/thefirm/` exists - if not, skip Steps 5 and 6 entirely
2. Read `.ai/thefirm/gaffer/session-log.md` - if file doesn't exist, create it with standard header:
   ```
   # Session Log\n\n> Maintained by The Gaffer. One entry per session where work was shipped.\n\n---\n
   ```
3. Check if an entry for this session's work already exists (same date + same topic) - if so, append to it rather than creating a duplicate
4. Add entry following the existing format, **with the Step 2b forensic block appended at the end of the entry** under a `**Forensic block:**` field. Same text as the commit body, no edits. The duplication is intentional - logs and commits drift independently and one will outlive the other.

   Standard entry shape (with forensic block):
   ```markdown
   ## YYYY-MM-DD - <Session topic>

   - **Built:** <what was built>
   - **Workers:** <crew + scores>
   - **Skipped:** <which workers were skipped + why>
   - **Issues found:** <issues caught during BULLETPROOF>
   - **Foreman:** CLEARED / FLAGGED / BLOCKED
   - **Protocol:** FULL / VIOLATED
   - **Shipped:** Yes (commit <sha>) / Pending

   **Forensic block:**
   ```
   Subsystems:   <list>
   Files:        <list>
   Risk surface: <items>
   Verified:     <what was tested LIVE>
   Deferred:     <what was NOT verified>
   ```
   ```

## Step 6: Check Debts

1. Read `.ai/thefirm/gaffer/debts.md` - if file doesn't exist, create it with standard header:
   ```
   # Quality Debts\n\n> Maintained by The Gaffer. Open items that need attention.\n\n---\n\n## Open Debts\n\n## Resolved\n
   ```
2. Log anything deferred. Resolve anything completed

## Step 6B: TRAINX Feedback Scan

1. Check if `.ai/thefirm/` exists - if not, skip this step
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
   c. **DO NOT push thefirm.** `/dayclose` will detect the thefirm drift and push it as part of end-of-day framework enforcement. Per the same rationale as project-side push deferral (see Step 7), pushing the framework on every wrap = noise.
6. Report in wrap summary: "TRAINX: X feedback items patched → thefirm staged locally (pushes at /dayclose)"

## Step 6C: Update Project Blueprint (MANDATORY)

The blueprint (`docs/BLUEPRINT.md`) is the master architecture document. It must reflect reality at all times.

1. **If `docs/BLUEPRINT.md` exists:**
   - Compare what shipped this session (from Step 2) against the blueprint sections
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

## Step 7: Commit Wrap Files (NO PUSH)

`/wrap` commits locally only - it does NOT push. Pushing is reserved for `/dayclose` (once-a-day eject) or explicit `git push` / `/firm` / `/stack` invocations. This keeps `/wrap` non-interruptive: multiple wraps per day don't fire CI builds, don't trigger Railway redeploys, don't broadcast every chat-close to other instances. See "What This Skill Does NOT Do" below for the full list of side-effects /wrap intentionally avoids.

1. Stage only wrap files that **this session** updated (CHANGELOG.md, session-log.md, debts.md, evolution.md if updated). Do not stage wrap files modified by other instances
2. **Safety unstage again** - `git reset HEAD -- .env* .env.local screenshots/ node_modules/ 2>/dev/null`
3. Commit using HEREDOC format for the message
4. **Check commit exit code** - if the commit failed (pre-commit hook rejection, empty commit), surface the error
5. **DO NOT push.** The commit stays local. `/dayclose` handles project + framework pushes when you're done for the day. If you need to push mid-day for some specific reason (multi-machine sync, deploy now), invoke `git push origin main` explicitly or run `/dayclose`.

**Why not push:** `/wrap` fires multiple times per day (every chat close). Each push triggers CI builds + Railway redeploys + multi-instance race exposure. Pushing 5-10 times per day = noise. Pushing once at `/dayclose` = signal. Framework drift detection + auto-push to `~/Projects/thefirm` and `~/Projects/thestack` also moved to `/dayclose` for the same reason - see Execution Contract Rule 7 enforcement there.

## Step 8: Write Session Context (CRITICAL - the bridge to next session)

Write `.ai/thefirm/gaffer/session-context.md` - this is what `/go` reads tomorrow. It captures everything that session-log and debts DON'T: the thinking, the decisions, the in-progress work.

**Overwrite the file each wrap** (it's always "current session context", not a log).

```markdown
# Session Context - YYYY-MM-DD

## What Shipped
- [1-3 bullets of what was built and committed]

## Design Decisions Made
- [Element]: Chose [approach] because [rationale]
- [Element]: Chose [approach] because [rationale]
(If no design decisions this session, write "None - backend/infrastructure session")

## Rejected Alternatives
- [What was considered but not chosen, and why]
(Helps next session avoid re-exploring dead ends)

## In-Progress Work
- [What was started but not finished]
- [DEMX variations explored - which won, which lost, why]
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
- Keep it concise - this is a briefing, not a novel
- "Design Decisions" and "Rejected Alternatives" are the most valuable sections - they prevent re-exploring dead ends
- "Pick Up From Here" is what `/go` surfaces as "On the plate" priorities
- If the session was purely infrastructure (no design), say so - don't invent design decisions

## Step 9: Self-Learn

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.
Log to `.claude/skills/wrap/evolution.md`. Determine the run number from the last `## Wrap #N` entry.

## Step 10: Summary

Present a tight summary:

```
**Chat wrapped. Dev server still running. Commits LOCAL only - push via /dayclose.**
- [What shipped - 2-3 bullets]
- [Branch + N commits ahead of origin]
- [Open debts or flags, if any]
```

Always state the unpushed commit count so the user knows what's waiting for `/dayclose`.

## What This Skill Does NOT Do

These are `/dayclose` only - intentionally skipped here:

- **NO push** - commits stay LOCAL. `/dayclose` handles project push + framework push (Rule 7 enforcement). `/wrap` fires multiple times per day; pushing every wrap = noisy CI + Railway redeploys + multi-instance race exposure. Once a day via `/dayclose` = signal.
- **NO framework drift detection or push** - `/dayclose` detects `~/Projects/thefirm` + `~/Projects/thestack` drift and auto-invokes `/firm` + `/stack`. `/wrap` does not.
- **NO cache cleanup** - `.next`, `.turbo`, `node_modules/.cache` stay warm
- **NO process killing** - dev server, node, watchers all keep running
- **NO volume release** - no `lsof`, no `kill`, drive stays mounted
- **NO stash/branch warnings** - you're still working, not ejecting
- **NO disk space reporting**
- **NO deploy check**

## Rules

- **Fast.** 30 seconds. Commit locally, summarise, done. No push.
- **Don't kill anything.** The whole point is the dev server stays up
- **One commit for wrap files.** Don't create separate docs commits
- **DO NOT push.** Pushing is `/dayclose` only - see Step 7. If the user explicitly asks `/wrap` to push, they should run `/dayclose` instead, OR invoke `git push origin main` themselves
- **Always learn.** Step 9 is not optional
- **Never commit secrets.** The double safety-unstage in Steps 3 and 7 is not optional
- **Forensic block on every commit + log entry.** Step 2b is mandatory. Verified + Deferred fields cannot be empty - honesty over cleanliness
- **Always use `--no-pager`** for git log/diff commands
- **Always use HEREDOC** for commit messages
- **Abort on git conflicts.** Never try to wrap during a merge/rebase/cherry-pick
