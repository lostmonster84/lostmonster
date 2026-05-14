# Evolution Log

> Self-learning log. Each invocation teaches the next one.

---

### Learned Rules

(none yet - first run will populate)

### Run History

(none yet - first run will populate)

---

## How to log

After each invocation, append a dated entry under **Run History**:

```
**YYYY-MM-DD** - /healthcheck [args]
- **Caught:** [what the probe surfaced that mattered]
- **Missed:** [what the user expected to see but didn't]
- **Friction:** [slow probe, unhelpful error, confusing output]
- **Cost surprise:** [unexpected deep runs - none if cheap mode]
```

If a pattern emerges across 2+ runs, lift it into **Learned Rules** as a one-liner that overrides defaults.

Examples of rules worth lifting:
- "Worker `/health` returns 404 in dev - the worker only exposes root - probe should accept 404 as healthy if root responds"
- "Email provider `/domains` rate-limits - back off if cheap mode is called more than once per minute"
- "AI ping latency over 1500ms in EU usually means we're routing US-east - flag as degraded over 2000ms"
