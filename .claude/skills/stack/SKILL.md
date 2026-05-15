---
name: stack
description: Sync improvements to The Stack framework repo (lostmonster84/thestack). Use when skills, scaffold templates, setup scripts, or infrastructure patterns have been improved within the current project and need pushing upstream.
argument-hint: "[summary of what changed] or leave blank for auto-detect"
---

# Push to The Stack

You are syncing improvements made to The Stack framework (skills, scaffold patterns, scripts) upstream to the standalone Stack repo. You get smarter every time you run.

## Repo details

- **Local clone:** `~/Projects/thestack/`
- **Remote:** `https://github.com/lostmonster84/thestack.git`
- **Branch:** `main`

## Step 0: Read Evolution Log

1. Read `.claude/skills/stack/evolution.md` before doing anything else
2. Check the **Learned Rules** section - these are things previous syncs taught you
3. Apply every learned rule during this sync. They override the defaults below if there's a conflict

## Step 0.5: Sync the clone FIRST (MANDATORY - before any edits)

**Do this before touching a single file in the clone.** The most common `/stack` (and `/firm`) failure is building the push against a stale local clone, then having `git push` bounce non-fast-forward - or rebasing edits built against an old base file onto a structurally-changed master and clobbering upstream work. The "Clone first" learned rule covers a *missing* clone; this covers a *stale* one.

```bash
cd ~/Projects/thestack
git fetch origin main
git status --short                                     # must be clean - if not, STOP and surface
git rev-list --left-right --count HEAD...origin/main    # behind/ahead count
```

- **Clone missing:** clone it (the original "Clone first" rule).
- **Clone is dirty** (uncommitted changes): STOP. Surface to the user - do not build a push on top of someone else's uncommitted work.
- **Clone is behind origin** (right-side count > 0): `git reset --hard origin/main` to bring it current BEFORE making any edits. Then re-read the target files - they may have changed structurally since you last saw them.
- **Clone has local commits not on origin** (left-side count > 0): a previous `/stack` left a commit unpushed. Inspect it (`git log origin/main..HEAD`). If good, keep it; if built on a stale base, `git reset --hard origin/main` and redo.
- **Clone is current** (0 behind, 0 ahead): proceed.

**Why:** skills and templates get restructured upstream. An improvement ported against an old copy will not apply cleanly to today's master. Always port against the *current* master. Two separate sessions have burned time on exactly this stale-clone failure - it is the single highest-frequency `/stack` and `/firm` failure mode. Step 9's pre-push verification re-checks this; do not skip either.

## What gets synced

The Stack provides the scaffold and reusable skills for every project. When we create or improve a skill, fix a scaffold pattern, or improve setup/update scripts inside a project, those improvements need to go upstream.

**Syncable content:**

| What | Project path | Repo path |
|------|-------------|-----------|
| Skills (generalised) | `.claude/skills/*/SKILL.md` | `skills/*/SKILL.md` |
| Skill evolution logs | `.claude/skills/*/evolution.md` | `skills/*/evolution.md` |
| Scaffold patterns | Various | `template/` |
| Setup improvements | Learned from project setup | `setup.sh` |
| Update improvements | Learned from project updates | `update.sh` |
| Sync script | N/A | `sync-skills.sh` |
| Product evolution logs | `packages/*/EVOLUTION.md` | `docs/evolution-log.md` (template only) |

**Package evolution log upstream rule:**
When a package's `EVOLUTION.md` is updated (e.g. `packages/canary/EVOLUTION.md`), check if that package has its own upstream repo. If so, copy the evolution log there too. Known package upstreams:

| Package | Upstream repo | Local clone |
|---------|--------------|-------------|
| `packages/canary` | `lostmonster84/canary` | `~/Projects/canary/` |

If the upstream repo doesn't exist yet or the clone is missing, log it as a debt and move on. The Stack's `docs/evolution-log.md` always gets the latest **template** (not project-specific content).

**NEVER sync (project-specific):**
- Skills with `# PROJECT-SPECIFIC OVERRIDE` comment (only sync methodology changes)
- Project-specific plans (`.claude/plans/`)
- Project config or env files
- Evolution log entries that reference project-specific details (generalise them)

## Generalising skills

When syncing a skill from a project to The Stack:

1. **Remove project-specific paths** - hardcoded project directories -> generic
2. **Remove project-specific references** - project names, domains, specific entity names
3. **Remove project-specific MCP tools** - only include tools that any project would have
4. **Keep the methodology** - the core logic of the skill stays intact
5. **Add `# PROJECT-SPECIFIC OVERRIDE` guidance** - note in the skill that projects can customise

If the project skill already has `# PROJECT-SPECIFIC OVERRIDE` as its first line after frontmatter, it means the project version has diverged intentionally. In that case, only sync methodology improvements, not the full file.

### Generalising evolution logs

When syncing a skill's `evolution.md`:
- Keep the **Learned Rules** section - these are universal
- Keep pattern entries but strip project-specific details (file paths, feature names)
- The wrap count and dates are fine to keep

## Procedure

1. **Identify what changed** - what skill or scaffold improvement was made in this project?
2. **Generalise** - strip project-specific references (see above)
3. **Copy files** to `~/Projects/thestack/` at matching paths
4. **Update `~/Projects/thestack/CHANGELOG.md`** - add entry under current version
5. **Update `~/Projects/thestack/SKILLS-CHANGELOG.md`** if a skill was added or updated
6. **Update `~/Projects/thestack/README.md`** if the change affects the skills table, installation, or structure
7. **Bump version** in README if significant (new skill, scaffold overhaul)
8. **Commit** with a clear message
9. **Pre-push verification (MANDATORY):**
   - `git fetch origin main` again - confirm the clone is STILL current (no one pushed while you worked). If origin moved, STOP, `git reset --hard origin/main`, and re-apply your changes against the new base
   - Run `git diff --stat HEAD~1` - review the diff one last time. Does it look right? Any accidental overwrites, project-specific references left in, or evolution.md content (should be blank seeds only)?
   - Run `ls skills/` in the repo - does every skill dir have a `SKILL.md`? Does every evolving skill have an `evolution.md`?
   - Check the README skills table - does it list all skills in `skills/`? Any missing?
   - If anything's wrong, fix before pushing. If the push later bounces non-fast-forward, you skipped Step 0.5 or this re-fetch - go back, never force-push
10. **Push** to `origin main`
11. **Confirm** what was pushed

## Self-Learn (MANDATORY - runs every sync)

After completing the sync, write a retrospective entry to `.claude/skills/stack/evolution.md`:

### What to log
```markdown
## Sync #N - YYYY-MM-DD

- **Synced:** [What skills/files were pushed upstream]
- **Generalisation issues:** [Anything that was hard to generalise, or mistakes made]
- **Missed:** [Files that should have been synced but weren't, things the user flagged]
- **Friction:** [Anything slow or awkward in the process]
```

### Pattern detection
After writing the entry, scan the full evolution log:

- Same **Missed** item 2× → add it to the syncable content table or procedure
- Same **Generalisation issue** 2× → add a specific rule for that case
- Same **Friction** 2× → simplify that step
- Every 5 syncs → full review of the skill, rewrite if needed

### Self-rewrite
When patterns are detected:
1. Read the current `SKILL.md`
2. Apply the changes
3. Write the updated `SKILL.md`
4. Note the change in the evolution log: `**Self-update:** [what changed and why]`

## Key rules

- **NEVER OVERWRITE - ONLY ADD/UPDATE.** Read existing files first, then merge improvements in. Append to changelogs. Never replace file contents wholesale unless explicitly told to overwrite
- **Generalise everything.** The Stack repo is project-agnostic
- **Always update both changelogs** - `CHANGELOG.md` for framework changes, `SKILLS-CHANGELOG.md` for skill changes
- **Skills with `# PROJECT-SPECIFIC OVERRIDE` are not fully synced** - only methodology changes
- **If a new skill is created, add it to the README skills table**
- **If unsure whether something is project-specific or framework-level, ask first**
- **Always learn.** Self-learn step is not optional. Every sync teaches the next one
