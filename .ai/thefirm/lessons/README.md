# Lessons - Hard-Won Cross-Project Knowledge

> The Firm's institutional memory. Every lesson here was learned the hard way.
> These travel with every project via `setup.sh` / `update.sh`.

---

## What Goes Here

Platform gotchas, infrastructure traps, process failures, and verified truths that apply to **any project** using The Firm. Not project-specific quirks - universal knowledge.

## Rules

1. **Hard cap: 20 lessons.** If you add one past 20, retire the least relevant. Quality over volume
2. **Every lesson must have:** title, platform tag, verified date, Why, How to apply
3. **Verified date is mandatory.** If a lesson hasn't been re-verified in 6 months, the Gaffer fitness audit flags it for review
4. **Universal only.** If it only applies to one project, it goes in project memory, not here
5. **Concrete, not vague.** "Verify cron jobs actually fire" is bad. "Railway ignores multiple [[cron]] entries - only the last schedule takes effect" is good
6. **Tag by platform** so workers can filter. Tags: `railway`, `vercel`, `cloudflare`, `stripe`, `resend`, `postgresql`, `process`, `general`

## Format

```markdown
---
title: Short descriptive title
platform: railway|vercel|cloudflare|stripe|process|general
verified: YYYY-MM-DD
severity: critical|high|medium
supersedes: (optional) filename of lesson this replaces
---

One-paragraph summary of what went wrong or what was discovered.

**Why:** The root cause or platform behaviour that makes this true.

**How to apply:** Specific, actionable instruction for workers.
```

## When to Write a Lesson

A session finding becomes a lesson when ALL of these are true:
1. It's about a **platform behaviour or process failure**, not a code bug
2. It would affect **any project** on that platform, not just the current one
3. Forgetting it could cause **real damage** (broken features, data loss, silent failures)
4. It **contradicts a reasonable assumption** (i.e. someone smart would get this wrong)

## Who Reads Them

| Worker | When |
|--------|------|
| **RIGX** | Before ANY infrastructure change - mandatory pre-flight |
| **AUDIX** | Before scoring health - check if any lesson defines "healthy" differently than assumed |
| **The Gaffer** | Before approving infra work - cross-reference lessons against the proposed approach |
| **TRAINX** | During improvement loop - check if a failure matches a known lesson (if so, the worker should have known) |

## Promotion Flow

```
Session discovers something
    ↓
Save to project memory (immediate)
    ↓
Gaffer flags: "This looks like a Firm lesson"
    ↓
User confirms → generalise → add to lessons/
    ↓
Push via /firm → all projects get it on next update.sh
```
