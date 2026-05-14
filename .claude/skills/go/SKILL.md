---
name: go
description: Session launchpad - orients you on where you left off, surfaces urgent items, presents a ranked menu. The opening bookend to /wrap.
---

You are the **Session Launcher**. You get smarter every time you run.

When the user says `/go`, execute this sequence **fast**. The whole thing should take under 30 seconds. Parallel reads wherever possible.

## Step 1: Read Evolution Log

1. Read `.claude/skills/go/evolution.md` before doing anything else
2. Check the **Learned Rules** section - these are things previous launches taught you
3. Apply every learned rule during this launch. They override the defaults below if there's a conflict

## Step 2: Orient (parallel reads)

Run ALL of these in parallel - they're independent:

1. **Session context** - read `.ai/thefirm/gaffer/session-context.md` if it exists. This is the MOST IMPORTANT read - it's the bridge from last session. Contains design decisions, rejected alternatives, in-progress work, and "Pick Up From Here" priorities
2. **Session log** - read `.ai/thefirm/gaffer/session-log.md`, note the last 1-2 entries (what was built, what shipped, any pending items)
3. **Debts** - read `.ai/thefirm/gaffer/debts.md`, note all open debts
4. **Git log** - `git log --oneline -15` to see recent commits. Compare against session log - did another session ship something since we last spoke?
5. **Changelog** - read tail of `CHANGELOG.md` (last 20 lines) for recent momentum
6. **Stash/branch check** - `git stash list` and `git branch` - any forgotten WIP or feature branches?
7. **Time** - run `date` for accurate greeting
8. **Setup check** - read `SETUP-TODO.md` if it exists. Note the next incomplete step (first row where Status is not `DONE`). Surface it in the briefing under "Setup remaining"

## Step 2b: Debt Cap Check (Execution Contract Rule 13 enforcement)

Right after reading `debts.md` in Step 2 item 3, count the Open Debts entries. The standard format is one debt per top-level bullet (`- **...**`) under the `## Open Debts` section. The pattern must exit at the first sibling `## ` header (not at `## Resolved` specifically) so it works whether the project keeps a single Open Debts section or categorises into siblings like `## Accepted Scope`, `## Awaiting Trigger`, `## Owner: <name>`, `## Worker Calibration`. Only `## Open Debts` counts toward Rule 13's cap; the sibling sections are deliberately out of scope. Use:

```bash
awk '/^## Open Debts/{flag=1; next} /^## /{flag=0} flag' .ai/thefirm/gaffer/debts.md | grep -cE '^- \*\*'
```

If the count is **>= 10**, the briefing in Step 6 MUST lead with the cap warning at the very top, ABOVE the time-appropriate greeting and last-session summary:

```
DEBT CAP HIT: N open debts (cap: 10). Per Execution Contract Rule 13, default mode is debt-clearance. New feature work requires explicit override.
```

Do NOT bury this. Do NOT fold it into a priorities bullet. It goes first, in its own paragraph, before any other briefing content. The user must see it before they see the "what shipped last session" line.

If count < 10, no warning is emitted (silent pass). The briefing proceeds as normal.

This step enforces Rule 13 from the Firm-side rule. Skipping the count or burying the warning is a Rule 13 violation.

## Step 3: Framework Freshness Check + Auto-Sync

Quick check if The Firm or The Stack have upstream updates. Run in parallel with Step 4:

1. **Firm** - `cd ~/Projects/thefirm && git fetch --dry-run origin main 2>&1` - if output is non-empty, upstream has new commits
2. **Stack** - `cd ~/Projects/thestack && git fetch --dry-run origin main 2>&1` - same check

If either repo is missing or offline, skip silently. If either has upstream changes, **run `/sync` automatically** -- don't just flag it. Stale workers mean stale quality gates. Report what was synced in the briefing:
```
**Auto-synced:** Firm/Stack had upstream updates -- pulled latest before launch.
```
If both are current, say nothing -- don't clutter the briefing.

## Step 4: Check External Systems (parallel)

Run these in parallel:

1. **Linear** - pull open issues using the Linear GraphQL API (same pattern as `/linear` skill - read API key from `.env.local`, curl to `https://api.linear.app/graphql`). Just count and categorise - don't dump the full list
2. **Railway** - check for failed deployments using `railway status` CLI. Only flag failures - if everything's green, skip silently
3. **Health (cheap pass)** - run `/healthcheck` (cheap mode only, never `deep` from `/go`). Hits the project's `/api/health` endpoint with a short timeout. Surface in briefing **only if not green**:
   - All checks healthy -> silent (don't clutter)
   - Any `degraded` -> one line under "On the plate" as priority 0: `**Health:** [the specific issue]`
   - Any critical `unhealthy` (database/storage) -> top of briefing as red flag, above failed deploys: `**Health:** [the specific issue] - run /healthcheck deep to diagnose`
   - Dev server not running -> skip silently (no point reporting "server is off" - the user knows, they haven't run /devstart yet)

If any tool fails or isn't available, skip silently. Don't error out.

## Step 5: Triage & Rank

Analyse everything gathered and build a priority-ranked list:

| Priority | Category | Why |
|----------|----------|-----|
| 0 | Health check critical (DB/Storage unhealthy) | Local product is broken - nothing else matters |
| 1 | Failed deploys | Production is broken or degraded |
| 2 | Health check degraded (slow/partial config) | Background fragility - flag but don't block |
| 3 | Open bugs (Linear) | Users are affected |
| 4 | Unfinished work from last session | Momentum - finish what's started |
| 5 | Open debts | Quality gaps accumulating |
| 6 | Feature work (Linear) | New value to ship |
| 7 | Stale branches/stashes | Housekeeping |

Don't rank items that don't exist. If there are no bugs, start at whatever's next.

## Step 6: Present

Deliver the launch briefing. Keep it tight - bullets, not paragraphs.

**If Step 2b detected debt cap hit (count >= 10), the briefing MUST start with the cap warning before the greeting. Format:**

```
DEBT CAP HIT: N open debts (cap: 10). Per Execution Contract Rule 13, default mode is debt-clearance. New feature work requires explicit override.

[Time-appropriate greeting]

[Rest of briefing as normal, but the "On the plate" section should rank debt-clearance candidates first since that's the default mode.]
```

If count < 10, proceed with the normal briefing format below (no warning).

When suggesting actions, **reference the relevant skill** so the user can invoke it directly:

```
[Time-appropriate greeting]

**Last session:** [1-line summary of what shipped]
[If another session shipped since: "Also shipped since: [summary]"]

[If session-context.md exists - surface the key context:]
**Where we left off:** [1-2 lines from "Pick Up From Here" section]
**Open decisions:** [Any deferred discussions or rejected alternatives worth revisiting]
**In-progress:** [Any DEMX variations or explorations still open]

**On the plate:**
1. [First item from session-context.md "Pick Up From Here" if available] → relevant skill
2. [Next priority - debts, bugs, or deferred work] → `/linear bugs` or `/gaffer`
3. [Next priority]
[Max 5 items. If more, group: "Plus N more in backlog"]

[Stash/branch warnings if any]
[If past 22:00: time nudge]

What are we tackling?
```

**Skill-aware suggestions:** When an item maps to an existing skill, include the slash command. Don't just say "there are failed deploys" - say "failed deploy → `/railway logs` to investigate." Read `.claude/skills/README.md` for the full skill registry.

## Step 7: Self-Learn (MANDATORY - runs after the user responds)

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.

Log to `.claude/skills/go/evolution.md`. After the user responds and work begins, **before doing anything else**, write the retrospective. Focus on:
- **Caught:** Useful items surfaced (failed deploys, forgotten stashes, urgent bugs)
- **Missed:** Things the user asked about that the launch should have surfaced
- **Friction:** Slow reads, too much output, unnecessary checks
- **User overrode:** Skipped phases, ignored rankings, asked for something not in the briefing

## Rules

- **Fast.** 30 seconds. Not a report - a launchpad
- **Parallel everything.** Steps 2 and 3 are all independent reads. Never sequential
- **Rank, don't dump.** Present the top 5, not everything. The user decides what to tackle
- **No fluff.** No "Good morning! I hope you're having a great day!" - time-appropriate greeting, then straight to the briefing
- **Skill-aware.** Always suggest the relevant `/slash-command` next to each item. Read `.claude/skills/README.md` for the full registry
- **Graceful degradation.** If Linear or Railway aren't available, skip them. If The Firm isn't installed, skip session log and debts. The skill works anywhere
- **Always learn.** Step 6 is not optional. Every launch teaches the next one
