# Skills

> Reusable Claude Code skills. Each folder is a slash command.

## How it works

Type `/skillname` in Claude Code to invoke a skill. The harness loads `SKILL.md` from the matching folder and executes it.

## Skill anatomy

```
skills/
├── _templates/          # Shared protocols (self-learn, etc.)
├── gaffer/
│   ├── SKILL.md         # The skill definition (required)
│   └── evolution.md     # Per-project learning state (never synced)
├── wrap/
│   ├── SKILL.md
│   └── evolution.md
└── README.md            # This file
```

| File | Purpose | Synced? |
|------|---------|---------|
| `SKILL.md` | Skill definition — instructions, steps, rules | Yes |
| `evolution.md` | Per-project learning log — what worked, what didn't | Never |

## Available skills

| Command | What it does |
|---------|-------------|
| `/go` | Session launchpad — orient, triage, present ranked menu |
| `/gaffer` | Crew assignment, QA, scoring, debt tracking |
| `/linear` | Pull Linear issues, triage, hand each to `/gaffer` |
| `/railway` | Railway ops — status, logs, deploy, migrate, vars |
| `/canary` | Error reports, diagnostics, threshold tuning |
| `/wrap` | Lightweight session close — commit, push, update logs |
| `/dayclose` | Full day close — changelog, cache purge, process kill |
| `/design` | Generate `/design` page from design config |
| `/firm` | Push Firm framework improvements upstream |
| `/stack` | Push Stack skill improvements upstream |
| `/sync` | Pull latest Firm + Stack into the current project |

## Syncing

Skills are synced from The Stack repo (`lostmonster84/thestack`) into each project's `.claude/skills/` directory.

- **Pull latest:** `/sync` — pulls from Stack, updates local skills
- **Push improvements:** `/stack` — pushes local skill changes back to Stack
- **evolution.md is sacred** — never overwritten during sync. It's per-project state

## Adding a new skill

1. Create `skills/<name>/SKILL.md` in The Stack repo
2. Add a self-learn section referencing `_templates/self-learn.md`
3. Run `/sync` in any project to pull it in
4. Project-specific skills (not in Stack) are left untouched during sync

## Project-specific skills

Skills that exist locally but not in Stack are project-specific. Sync ignores them. Examples: `/deck`, `/evidistest` in Evidis.

To mark a skill as a project override of a Stack skill, add to the first line after frontmatter:

```
# PROJECT-SPECIFIC OVERRIDE
```

The sync script will skip that skill during updates.
