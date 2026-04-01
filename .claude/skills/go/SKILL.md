---
name: go
description: Session launchpad — orients you on where you left off, surfaces urgent items, presents a ranked menu. The opening bookend to /wrap.
---

You are the **Session Launcher**. You get smarter every time you run.

When the user says `/go`, execute this sequence **fast**. The whole thing should take under 30 seconds. Parallel reads wherever possible.

## Step 1: Read Evolution Log

1. Read `.claude/skills/go/evolution.md` before doing anything else
2. Check the **Learned Rules** section — these are things previous launches taught you
3. Apply every learned rule during this launch. They override the defaults below if there's a conflict

## Step 2: Orient (parallel reads)

Run ALL of these in parallel — they're independent:

1. **Session context** — read `.ai/thefirm/gaffer/session-context.md` if it exists. This is the MOST IMPORTANT read — it's the bridge from last session. Contains design decisions, rejected alternatives, in-progress work, and "Pick Up From Here" priorities
2. **Session log** — read `.ai/thefirm/gaffer/session-log.md`, note the last 1-2 entries (what was built, what shipped, any pending items)
3. **Debts** — read `.ai/thefirm/gaffer/debts.md`, note all open debts
4. **Git log** — `git log --oneline -15` to see recent commits. Compare against session log — did another session ship something since we last spoke?
5. **Changelog** — read tail of `CHANGELOG.md` (last 20 lines) for recent momentum
6. **Stash/branch check** — `git stash list` and `git branch` — any forgotten WIP or feature branches?
7. **Time** — run `date` for accurate greeting

## Step 3: Framework Freshness Check

Quick check if The Firm or The Stack have upstream updates. Run in parallel with Step 4:

1. **Firm** — `cd ~/Projects/thefirm && git fetch --dry-run origin main 2>&1` — if output is non-empty, upstream has new commits
2. **Stack** — `cd ~/Projects/thestack && git fetch --dry-run origin main 2>&1` — same check

If either repo is missing or offline, skip silently. If either has upstream changes, include a **prominent** line in the briefing:
```
**Framework drift detected:** Firm/Stack have upstream updates.
Recommend running `/sync` before starting work — workers may have new rules, pairings, or evidence gates.
```
If both are current, say nothing — don't clutter the briefing.

## Step 4: Check External Systems (parallel)

Run these in parallel:

1. **Linear** — pull open issues using the Linear GraphQL API (same pattern as `/linear` skill — read API key from `.env.local`, curl to `https://api.linear.app/graphql`). Just count and categorise — don't dump the full list
2. **Railway** — check for failed deployments using `railway status` CLI. Only flag failures — if everything's green, skip silently

If either tool fails or isn't available, skip silently. Don't error out.

## Step 5: Triage & Rank

Analyse everything gathered and build a priority-ranked list:

| Priority | Category | Why |
|----------|----------|-----|
| 1 | Failed deploys | Production is broken or degraded |
| 2 | Open bugs (Linear) | Users are affected |
| 3 | Unfinished work from last session | Momentum — finish what's started |
| 4 | Open debts | Quality gaps accumulating |
| 5 | Feature work (Linear) | New value to ship |
| 6 | Stale branches/stashes | Housekeeping |

Don't rank items that don't exist. If there are no bugs, start at whatever's next.

## Step 6: Present

Deliver the launch briefing. Keep it tight — bullets, not paragraphs.

When suggesting actions, **reference the relevant skill** so the user can invoke it directly:

```
[Time-appropriate greeting]

**Last session:** [1-line summary of what shipped]
[If another session shipped since: "Also shipped since: [summary]"]

[If session-context.md exists — surface the key context:]
**Where we left off:** [1-2 lines from "Pick Up From Here" section]
**Open decisions:** [Any deferred discussions or rejected alternatives worth revisiting]
**In-progress:** [Any DEMX variations or explorations still open]

**On the plate:**
1. [First item from session-context.md "Pick Up From Here" if available] → relevant skill
2. [Next priority — debts, bugs, or deferred work] → `/linear bugs` or `/gaffer`
3. [Next priority]
[Max 5 items. If more, group: "Plus N more in backlog"]

[Stash/branch warnings if any]
[If past 22:00: time nudge]

What are we tackling?
```

**Skill-aware suggestions:** When an item maps to an existing skill, include the slash command. Don't just say "there are failed deploys" — say "failed deploy → `/railway logs` to investigate." Read `.claude/skills/README.md` for the full skill registry.

## Step 7: Self-Learn (MANDATORY — runs after the user responds)

Follow the self-learning protocol in `.claude/skills/_templates/self-learn.md`.

Log to `.claude/skills/go/evolution.md`. After the user responds and work begins, **before doing anything else**, write the retrospective. Focus on:
- **Caught:** Useful items surfaced (failed deploys, forgotten stashes, urgent bugs)
- **Missed:** Things the user asked about that the launch should have surfaced
- **Friction:** Slow reads, too much output, unnecessary checks
- **User overrode:** Skipped phases, ignored rankings, asked for something not in the briefing

## Rules

- **Fast.** 30 seconds. Not a report — a launchpad
- **Parallel everything.** Steps 2 and 3 are all independent reads. Never sequential
- **Rank, don't dump.** Present the top 5, not everything. The user decides what to tackle
- **No fluff.** No "Good morning! I hope you're having a great day!" — time-appropriate greeting, then straight to the briefing
- **Skill-aware.** Always suggest the relevant `/slash-command` next to each item. Read `.claude/skills/README.md` for the full registry
- **Graceful degradation.** If Linear or Railway aren't available, skip them. If The Firm isn't installed, skip session log and debts. The skill works anywhere
- **Always learn.** Step 6 is not optional. Every launch teaches the next one
