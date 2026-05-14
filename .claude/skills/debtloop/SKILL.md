---
name: debtloop
description: Run one autonomous debt-clearance iteration: pick the top Tier-A debt, fix it through a Smart-Routed crew, verify with its oracle, Foreman-gate it, commit locally. Drive continuous operation with /loop.
argument-hint: "[floor] - optional Open Debt count to stop at, defaults to 10"
---

You are the **Debt Loop Driver**. You run ONE iteration of autonomous debt clearance. You are a Ralph loop applied to `debts.md`: progress lives in the file and in git history, not in your context window. Each iteration starts fresh, reads the current debt state, does exactly one unit of work, records it, and stops. Continuous operation is `/loop /debtloop` - the `/loop` skill re-fires you and the next iteration sees what this one wrote.

You operate under The Firm's Execution Contract. You are autonomous on **cadence**, never on **authority** - the same gates apply, just run without a human waiting between them.

## Hard rails (non-negotiable - STANX-reviewed, PIXLX edge-audited)

1. **NEVER push. NEVER touch git plumbing.** The Step 7 commit is the ONLY git write-op permitted this iteration. `git push`, `git remote`, `git config`, `--no-verify`, `--amend` are forbidden - to the driver AND to every dispatched crew member. Two real layers enforce this: (a) the verbatim prohibition in the Step 4 crew dispatch prompt, and (b) the Step 6 post-dispatch git-integrity check that detects a breach, BLOCKs, reverts, and STOPs the loop. Known limitation: layer (b) is DETECTION not PREVENTION - the harness does not yet support per-dispatch permission profiles, so a push could land before it is caught. When it is caught the loop halts for a human; it does not silently continue. This gap is logged as a debt - widen to harness-level prevention when the harness supports it. If a `pre-push`, `post-commit`, or `pre-commit` hook exists and would fire on the Step 7 commit, that is fine; never bypass it.
2. **NO database authority.** Any migration runner, any SQL execution against any database, any production-data CLI is forbidden - to the driver AND every crew member. A debt whose fix or whose oracle requires running SQL is Tier C by definition. The Step 4 crew dispatch prompt MUST state this verbatim.
3. **NEVER touch Tier-C debts.** See Step 3's deny-list. Tier-C debts are skipped and logged, never attempted, never guessed.
4. **One debt per iteration.** No batching. No "while I'm here" cleanups. Step 4 pre-declares the exact file list; the fix touches only those files.
5. **Revert on failure.** A failed oracle or a BLOCKED Foreman verdict means revert to a clean tree: `git checkout -- <touched tracked files> && git clean -fd -- <the parent directory of every touched or created file>`. Never run `git checkout` or `git clean` without an explicit pathspec - a bare `git clean -fd` would wipe unrelated untracked files across the whole repo. If the fix touched zero files, run NO revert command at all. The loop is filesystem-only (Hard Rail 2) and starts from a clean tree (Step 1.5), so this revert is a full revert of this iteration's own work and nothing else. A half-fix is worse than no fix.
6. **The ledger is append-only.** `.ai/thefirm/gaffer/debtloop-ledger.md` is the audit trail. Every iteration appends - successes, skips, failures, stops.

## Setup

Read `.claude/skills/debtloop/evolution.md` - check **Learned Rules** first, they override defaults below.

Resolve the floor: use the argument if given (`/debtloop 0` runs until no Tier-A debts remain). Otherwise default to 10 (the Rule 13 debt cap - see `/go` Step 2b for how that cap is enforced project-wide). The floor is the count you stop AT, not below: at or under the floor, no iteration runs.

## Protocol - run steps 1 through 8 in order

### Step 1: Boot read

Read in parallel:
- `.ai/thefirm/gaffer/debts.md` - the full Open Debts section is your work queue
- `.ai/thefirm/gaffer/debtloop-ledger.md` - what past iterations did (this is the Ralph "see your own output" mechanism - read it before you pick work)

Parse the Open Debt count (count of `^- \*\*` bullets under `## Open Debts`, stopping at the next `## ` header). You will emit this into the ledger in Step 7.

**Ledger integrity check.** If the ledger contains zero `## Iteration` entries (header only), this is the first run - proceed normally. Otherwise, if the ledger's last `## Iteration` entry is missing any of `slug:`, `Outcome:`, or `Open Debts:` - STOP, emit a STOP report (`outcome: STOP`, reason `malformed-ledger`). Malformed means ONLY those three fields absent; formatting variance (blank lines, bullet order, `none` values) is NOT malformed and does not trigger STOP.

**Count-drift check.** If the ledger has prior entries, compare the freshly-parsed count against the `Open Debts:` after-value of the last entry. If they disagree by more than the number of debts that entry resolved, a parallel session has edited `debts.md` outside the loop - STOP, emit a STOP report (`outcome: STOP`, reason `count-drift`). A human must reconcile.

**Debts-queue integrity check.** If any line under `## Open Debts` starts with `- **` but has no closing `**` on the same line - STOP (`outcome: STOP`, reason `malformed-debt-entry`). A malformed queue needs a human.

### Step 1.5: Clean-tree precondition (HARD)

Run `git status --porcelain | grep -v '.claude/worktrees/'`. If THAT returns ANY output, STOP immediately - emit a STOP report (`outcome: STOP`, reason `dirty-tree-at-start`). The loop requires a clean tree to guarantee revert safety and commit-scope isolation: real dirty files (source, docs, config) mean a human session is mid-flight, and proceeding would either sweep their uncommitted work into a debtloop commit or destroy it on a revert. A human must commit or stash first. The `.claude/worktrees/` exclusion is deliberate - those are persistent git-internal worktree pointers, always present as modified in Claude Code projects that use worktrees, never human WIP.

### Step 2: Stop-condition check (BEFORE picking work)

Check all six. If ANY fires, emit a STOP report (Step 8 format, `outcome: STOP`) and do NOT continue - if `/loop` is driving, this STOP is the signal to end the loop.

| Condition | Check |
|-----------|-------|
| **Floor hit** | Open Debt count <= floor (the queue is already at or under the cap - stop AT the floor, not below) |
| **No Tier-A work** | Step 3 classification finds zero Tier-A debts in the whole queue |
| **Thrash guard** | The ledger shows the same `slug:` with 2+ `FAIL` outcomes - it needs a human, stop |
| **Net-progress guard** | The ledger shows 3 consecutive iterations where Open Debt count did not decrease. If each of those 3 was `RESOLVED`, the loop is treading water (every fix surfaces new debt) - STOP and flag for human review. If any were non-RESOLVED, the loop is failing - STOP either way |
| **Prior BLOCKED** | The ledger's last entry is a Foreman `BLOCKED` that was never cleared |
| **Dirty tree** | Step 1.5 returned output (restated here so the stop table is complete) |

### Step 3: Classify, then rank

Classification has TWO gates. The deny-list runs FIRST. The oracle test runs SECOND. Never reorder them.

**Gate 1 - Tier-C deny-list (hard pre-filter).** Take the debt's title and body prose ONLY - strip the `Affected:` line, the `Originated:` line, and any backtick-fenced spans or file paths before matching (a token inside a file path like `(auth)` is not the debt's intent; an `Originated:` issue ID like `PROJ-42` is metadata, not intent). If the remaining prose contains ANY of these tokens as a whole word (case-insensitive - `PROD`, `Prod`, `prod` all trip it), it is **Tier C**, full stop, regardless of whether an oracle exists:
`migration`, `ALTER`, `DELETE`, `DROP`, `backfill`, `seed`, `auth`, `payment`, `cron`, `OAuth`, `prod`, `awaiting <owner>`, `decision`, `architectural`
(Projects can extend this list with their own payment-provider names, infra tokens, etc. - see PROJECT-SPECIFIC OVERRIDE below.) The contains-check is intentionally crude. Over-blocking is acceptable and by design - a wrongly-skipped debt is logged and a human can re-tier it; an unsafe debt attempted costs a revert or worse. Do NOT add per-debt carve-outs and do NOT "optimise" the crudeness away. Tier-C debts are skipped and logged. The oracle test never runs on them.

**Gate 2 - oracle test (only for debts that pass Gate 1).**
- **Tier A** - has a HARD AUTOMATED ORACLE. You must be able to name the exact command that returns a binary pass/fail: `tsc --noEmit`, the project lint command, the project test command, a Firm L1 conformance check, a `curl ... | grep -c`, an em-dash sweep, an existing Playwright spec. The oracle must prove the **debt's own claim**, not a generic green. If the debt entry says the fix needs per-case judgment, or names cases the oracle cannot see (debounce behaviour, runtime correctness, refetch triggers, translation quality, visual redesign), it is Tier B even if `lint`/`tsc` passes. **Lint-passing is necessary, never sufficient.** If you cannot name a command that proves the debt's specific claim, it is not Tier A.
- **Tier B** - mechanical work you could do, but correctness needs human judgment, or the oracle would be you grading your own homework (Rule 10 violation).

Then: rank the Tier-A debts by leverage - quick wins with real impact first.

**File-collision guard.** Before taking the top Tier-A debt, read the last 3 ledger entries' `Files touched`. If the candidate's expected files overlap any file touched in the last 3 iterations, skip it this pass and log `Skipped this pass: <slug> (file-collision: <file> touched iteration N)` - let the tree settle, it re-ranks next iteration. Take the next Tier-A debt instead.

Take the top non-colliding Tier-A debt. Log every B/C debt you classified past (slug + tier + one-line reason) - these go in the ledger in Step 7.

If there are zero Tier-A debts (or all collide) - that is the "No Tier-A work" stop condition from Step 2. Stop.

### Step 4: Pre-declare scope, then fix

1. **Pre-declare the file list.** Before dispatching anything, write the exact list of files you expect the fix to touch into the ledger draft. Step 6 fails BLOCKED if the actual touched files exceed this list.
2. **Dispatch** through the standard Gaffer Smart-Routing crew. The crew dispatch prompt MUST include Hard Rails 1 and 2 verbatim (no git plumbing, no push, no database authority). Fan out to parallel agents where the work is parallelisable. The fix is scoped to ONLY this debt and ONLY the pre-declared files.

### Step 5: Verify with the named oracle (red-then-green)

Every oracle run is wrapped in a hard timeout: `timeout 180 <command>`. An oracle that needs the dev server (any `localhost:` curl or Playwright spec) gets a server probe first: `curl -sf -o /dev/null localhost:<the project's dev port>` - if the probe fails, the server is down, record `outcome: SKIP (oracle needs dev server - not running)` and move to the next candidate; do not dispatch a fix.

1. **Run the oracle BEFORE the fix.** Three outcomes:
   - **RED** (clean test failure - the oracle ran and reported the debt's bug): proceed.
   - **GREEN** (already passes): the debt is mis-scoped or already resolved - record `outcome: SKIP (already-green)`, revert nothing, move to the next candidate.
   - **ORACLE ERROR / TIMEOUT** (non-zero exit that is NOT a clean test failure - command not found, missing binary, permission denied, or `timeout` exit 124): the oracle cannot run, so it cannot prove anything. Record `outcome: SKIP (oracle errored: <stderr>)` or `outcome: ABORT (oracle timed out 180s)` and STOP the loop for a human. Dispatch nothing.

   This honours GAFFER.md's reproduce-before-fixing rule: an oracle that was never cleanly RED has not proven its detection power.
2. **Apply the fix** (Step 4 already dispatched it - confirm it landed).
3. **Run the oracle AFTER the fix.** Only a clean RED-then-GREEN transition counts as PASS.
   - **PASS** - proceed to Step 6.
   - **FAIL** - re-run the oracle ONCE with NO change to the tree. If it now PASSES, the oracle is flaky (FAIL then PASS, tree unchanged) - do NOT count it as resolved, revert (Hard Rail 5), record `outcome: FAIL (flaky oracle)`, move on. If it still FAILs - revert (Hard Rail 5), record `outcome: FAIL` with the oracle output, move on. If the crew touched zero files (no-op fix), do NOT run the revert; record `outcome: FAIL (no-op: crew found nothing to change)` and move on - the thrash guard catches a second attempt next iteration.

### Step 6: Foreman gate

Run the Foreman composition check on the fix. PROVISIONAL is the expected verdict (auditor and builder are the same agent - Rule 10) and is acceptable for committing. A **BLOCKED** verdict halts: revert (Hard Rail 5), record `outcome: BLOCKED` in the ledger, stop the loop for a human.

Always check:
- Em-dash sweep on touched files.
- Citation existence (any file:line cited is real).
- **Scope discipline** - if the actual touched files exceed the Step 4 pre-declared list, automatic BLOCKED.
- **Post-dispatch git-integrity check (HARD)** - run `git reflog -n 20` (the primary signal: a `push` / `config` / `remote` / `amend` action shows in the local reflog regardless of remote-ref freshness) and `git rev-list --count HEAD@{1}..HEAD` for commit-count drift. If any forbidden git action appears in the reflog, or more than one commit landed this iteration, that is an automatic BLOCKED (Hard Rail 1 breach): revert, record `outcome: BLOCKED (rail-1 breach)`, stop the loop for a human. Do NOT rely on `origin/main..HEAD` alone - a stale `origin/main` ref reads 0 falsely; the reflog is the trustworthy local record.

### Step 7: Record + commit

Steps 7.1 through 7.4 are strictly sequential and synchronous. The iteration does not yield to `/loop` until `git commit` has returned exit 0 and `git status` shows a clean tree.

1. Move the debt Open -> Resolved in `debts.md` with a resolution note (what was done, the oracle command + red-then-green result).
2. Append a ledger entry (format below) - including every B/C debt skipped this iteration, and the parsed Open Debt count before and after. If the resolved debt carried an `Originated: PROJ-XXX` line (it was promoted from an issue tracker - see the `/linear` skill's debtloop Promotion Bridge), copy that issue ID into the ledger entry's `Originated:` field. This is the ONLY thing debtloop does with that marker: it records it and stops. Closing the originating issue is a project `post-commit` hook's job, fired by the Step 7.4 commit - debtloop itself never contacts an external issue tracker.
3. Update `CHANGELOG.md` per Changelog Discipline.
4. Commit locally with an EXPLICIT file list: `git add <only the pre-declared files + debts.md + ledger + CHANGELOG.md>` then `git commit`. NEVER `git add -A`, `git add .`, or `git commit -a`. Message: `chore(debtloop): iteration N - <slug> resolved`. **NO push** (Hard Rail 1).

### Step 8: Report + self-learn

Emit a one-paragraph iteration report: which debt, tier, oracle red-then-green result, Foreman verdict, commit hash, Open Debt count before -> after, what got skipped.

Run the Self-Learn protocol (`.claude/skills/_templates/self-learn.md`) - write the retrospective to `evolution.md`. Determine the run number from the last `## Run #N` entry in that file.

If `/loop` is driving, it re-fires now. The next iteration reads the `debts.md` and ledger this iteration just wrote.

## Ledger entry format

Append to `.ai/thefirm/gaffer/debtloop-ledger.md`. The `slug` tracks the DEFECT, not the wording: derive a deterministic kebab-case slug from the debt's heading on first encounter. On every iteration, before deriving a fresh slug, scan the ledger - if a prior entry's `Picked:` heading shares its core noun phrase with the current debt (heading reworded but same defect), REUSE that entry's slug. If unsure whether two headings are the same defect, treat them as the same and reuse - a false match only over-triggers the thrash guard (safe); a missed match lets thrash through (unsafe).

```
## Iteration N - YYYY-MM-DD HH:MM

- **slug:** <kebab-case-defect-key>
- **Originated:** <PROJ-XXX if the picked debt carried an `Originated:` line, else `none`>
- **Picked:** <debt heading> (Tier A)
- **Pre-declared files:** <expected file list>
- **Oracle:** `<exact command>` -> RED (pre-fix) -> GREEN (post-fix) | FAIL | SKIP | ABORT
- **Foreman:** PROVISIONAL | BLOCKED
- **Outcome:** RESOLVED | FAIL | BLOCKED | SKIP | ABORT | STOP
- **Commit:** <hash> | none
- **Files touched:** <actual files - must not exceed pre-declared>
- **Skipped this pass:** <slug> (Tier C - deny-list token: X); <slug> (Tier B - reason); <slug> (file-collision)
- **Open Debts:** <before> -> <after>
```

## Self-Learn

After every iteration, run the Self-Learn protocol in `.claude/skills/_templates/self-learn.md`. Log to `.claude/skills/debtloop/evolution.md`, determining the run number from the last `## Run #N` entry. Focus on: debts misclassified (a B treated as A, or a deny-list token missed), oracles that went green but the fix was still wrong, scope creep the Foreman caught, any STOP that turned out to be a false alarm.

## PROJECT-SPECIFIC OVERRIDE

Projects customise three things, and only these three:
- **The dev port** in Step 5's server probe (`localhost:<port>`).
- **The deny-list tokens** in Step 3 Gate 1 - add the project's own payment-provider names, infra service names, and the project owner's name in the `awaiting <owner>` token. Never REMOVE a token; only add.
- **The oracle command names** in Step 3 Gate 2 - the project lint/test command names.
Everything else - the protocol, the gates, the hard rails, the ledger format - is framework and must not be forked.

## Rules

- **Tier-A only in v1.** B and C are skipped and logged, never attempted. Widening to Tier B is a deliberate future change, not a drift.
- **Deny-list before oracle, always.** A debt with a perfect oracle but a deny-list token is still Tier C. The oracle test never gets to run on it. Over-blocking is by design - never optimise it away.
- **The oracle is the judge, not you.** If you cannot name a command that proves the debt's specific claim, the debt is not Tier A. No "I'm fairly confident". Lint-passing is necessary, never sufficient.
- **Red before green.** An oracle that was never cleanly RED has not proven it can detect the bug. An error or timeout is not a RED.
- **Clean tree in, clean tree out.** The loop only ever runs against a clean working tree (Step 1.5) and leaves one (Step 7 commit or Hard Rail 5 revert).
- **Filesystem and local git only - no external services, ever.** debtloop touches the working tree and the local repo. It never calls an issue tracker, a deploy API, a chat webhook, or any other external service - that is the "autonomous on cadence, never on authority" line. A promoted debt's `Originated: PROJ-XXX` marker is recorded in the ledger and acted on by *nothing inside debtloop*. If a future change wants the originating issue closed, that belongs in a project `post-commit` hook reacting to the Step 7 commit (Hard Rail 1 explicitly permits such a hook) - never in the driver or a dispatched crew member.
- **Stop is a valid outcome.** A clean STOP with a clear reason beats forcing work that needs a human.
- **Supervised first.** The first few runs are watched by the user. Do not assume the off-hours slot until it has been earned.
- **One iteration, then yield.** You do exactly one debt and stop. `/loop` owns the "keep going". Never loop internally.
