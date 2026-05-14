# Self-Learning Protocol

> Bolt this onto any skill that runs repeatedly. It makes the skill evolve with use.

## Requirements

Each skill that uses this protocol needs:
1. An `evolution.md` file in its skill directory (`.claude/skills/<name>/evolution.md`)
2. A `## Self-Learn` section in its SKILL.md that references this template

## The Loop (runs after every invocation)

### Step 1: Write Retrospective

After the skill completes its work, write an entry to `evolution.md`:

```markdown
## Run #N - YYYY-MM-DD

- **Caught:** [Things the skill correctly identified/handled that were useful]
- **Missed:** [Things the user had to flag manually, or that fell through the cracks]
- **Friction:** [Anything that felt slow, awkward, or unnecessary]
- **User overrode:** [Any step where the user said "skip that" or "don't bother"]
```

### Step 2: Pattern Detection

After writing the entry, scan the full evolution log for recurring patterns:

| Pattern | Threshold | Action |
|---------|-----------|--------|
| Same **Missed** item | 2+ times | Add it as a new step/check in SKILL.md |
| Same **User overrode** item | 2+ times | Remove or make that step optional in SKILL.md |
| Same **Friction** pattern | 2+ times | Simplify that step in SKILL.md |
| New **Caught** pattern not in skill | 1+ times | Add it as a Learned Rule in evolution.md |

### Step 3: Self-Rewrite (when patterns detected)

1. Read the current `SKILL.md`
2. Apply the changes (add steps, remove steps, simplify steps)
3. Write the updated `SKILL.md`
4. Note the change in evolution.md: `**Self-update:** [what changed and why]`

### Step 4: Periodic Full Review

Every 5 runs, do a full review of the skill even if no single pattern has hit the 2x threshold. Look for overall improvements, stale steps, or opportunities to streamline.

## Evolution Log Format

The `evolution.md` file has two sections:

```markdown
# [Skill Name] Evolution Log

> How this skill learns and improves over time.

---

### Learned Rules
- [Rules extracted from patterns - these override defaults in SKILL.md]

---

## Run #N - YYYY-MM-DD
[Retrospective entries, newest first]
```

## Rules

- **Always run.** The self-learn step is not optional. Every invocation teaches the next one
- **Be honest.** If nothing was caught or missed, say so. Don't fabricate entries
- **Lightweight.** The retrospective should take seconds, not minutes. One line per bullet
- **Cumulative.** Learned Rules persist across all future runs. They're the skill's institutional memory
