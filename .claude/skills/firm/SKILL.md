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

**Syncable files (project -> thefirm repo):**

| Project path | Repo path |
|-------------|-----------|
| `.ai/thefirm/PROTOCOL.md` | `PROTOCOL.md` (inside crew/ or root, match repo structure) |
| `.ai/thefirm/crew/GAFFER.md` | `crew/GAFFER.md` |
| `.ai/thefirm/crew/planners/*.md` | `crew/planners/*.md` |
| `.ai/thefirm/crew/builders/*.md` | `crew/builders/*.md` |
| `.ai/thefirm/crew/reviewers/*.md` | `crew/reviewers/*.md` |
| `.ai/thefirm/crew/checkers/*.md` | `crew/checkers/*.md` |
| `.claude/skills/gaffer/SKILL.md` | Via thestack (not thefirm) |

**NEVER sync (project-specific state):**
- `gaffer/session-log.md`
- `gaffer/debts.md`
- `gaffer/calibration.md`
- `gaffer/evolution.md`
- `gaffer/inspections/`
- `CLAUDE-SUPPLEMENT.md` (project-specific)

## Procedure

1. **Identify what changed** - diff the project's `.ai/thefirm/` against the repo clone to find improvements
2. **Auto-generalise workers** — for each changed worker file, use the onboarding manifest to reverse project-specific content back to generic tokens. See "Worker Generalisation" below
3. **Copy files** to `~/Projects/thefirm/` at matching paths
4. **Update `~/Projects/thefirm/CHANGELOG.md`** - add entry under current version with what changed and why
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
   - Run `git diff --stat HEAD~1` — review the diff one last time. Does it look right? Any accidental overwrites, state files slipping in, or project-specific references left in?
   - Count files in `crew/planners/`, `crew/builders/`, `crew/reviewers/`, `crew/checkers/` — do the counts match what the README claims?
   - If anything's wrong, fix before pushing
9. **Push** to `origin main`
10. **Confirm** what was pushed

## Worker Generalisation (Auto-Reverse Onboarding)

When pushing worker files upstream, project-specific content must be reversed to generic tokens. This is the inverse of `/sync` Step 4b. Full spec: `.ai/thefirm/ONBOARDING.md`.

### project.json as Reverse Source

If `project.json` exists at the project root, use it as the **primary source** for reverse-replacement. This is more reliable than reading individual manifests because:
- project.json has the complete token→value mapping in one place
- It includes alias tokens (HOSTING and HOSTING-PROVIDER both map to the same value)
- It distinguishes N/A tokens from unfilled tokens

**N/A tokens during push:** Tokens marked `"N/A"` in project.json were never replaced in the worker body, so there's nothing to reverse. Skip them. The manifest Value column should be cleared to **empty** (not "N/A") for the upstream version — upstream manifests are always empty.

**project.json is NEVER pushed upstream.** It is project-specific.

### Mechanism 1: Manifest Token Reversal

For each worker with an `<!-- ONBOARD:START -->` manifest:

1. **Read project.json** (preferred) or the manifest for Token → Value pairs
2. **Sort by value length descending** — replace longer values first to avoid partial matches (e.g. `wildtrax-red (#c41e3a)` before `wildtrax`)
3. **Reverse-replace in body** — for each row, replace all instances of the Value with the Token throughout the file (OUTSIDE the `ONBOARD:START/END` markers)
4. **Clear manifest values** — reset the Value column to empty (token-only state, not "N/A")
5. **Verify** — grep the file for known project-specific values (project name, brand colours, product names). If any remain, they weren't in the manifest — add them and re-run

### Mechanism 2: Context Section Generalisation

For each worker with a project-specific Context section (e.g. `## WildTrax Context`):

1. **Replace the entire section** (from heading to next `---` or `##`) with the generic template:
   ```markdown
   ## [PROJECT] Context

   **WorkerName for [PROJECT]** understands:
   - [PROJECT-DOMAIN] specifics relevant to this worker's role
   - See onboarding manifest for token definitions
   ```
2. **Update heading** — `## ProjectName Context` → `## [PROJECT] Context`

### Verification Checklist

Before copying to the Firm repo, verify each worker file:

- [ ] No instances of the project name (e.g. "WildTrax") outside the manifest
- [ ] No brand colour names (e.g. "wildtrax-red") outside the manifest
- [ ] No product-specific terms (e.g. "Camping", "Lodge & Landy") outside the manifest
- [ ] Context section is generic `## [PROJECT] Context`
- [ ] Manifest Value column is empty
- [ ] Worker title doesn't say "ProjectName Edition" — use generic title or no edition

If verification fails, check if the manifest is missing tokens. Add them, re-run reversal.

### Self-Learning

If generalisation misses project-specific content:
1. **Add the missing token** to the worker's manifest
2. **Add to the Token Catalogue** in `ONBOARDING.md` if it's a new standard token
3. **Log to evolution.md** — "Generalisation missed [value], added [TOKEN] to manifest"
4. Same miss won't happen next push

---

## Key rules

- **NEVER OVERWRITE — ONLY ADD/UPDATE.** Read existing files first, then merge improvements in. Append to changelogs. Add new entries to evolution logs. Never replace file contents wholesale unless James explicitly says to overwrite
- **Generalise everything.** The Firm repo is project-agnostic. No project-specific references
- **Never touch state files.** Session logs, debts, calibration are per-project
- **Always update the changelog.** Every push gets a changelog entry appended under the current version
- **Worker names and identities never change.** Only methodology and context get updated
- **If unsure whether something is project-specific or framework-level, ask James**
