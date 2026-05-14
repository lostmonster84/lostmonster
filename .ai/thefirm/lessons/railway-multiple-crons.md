---
title: Railway ignores multiple [[cron]] entries in railway.toml
platform: railway
verified: 2026-03-18
severity: critical
---

Railway's `[[cron]]` array syntax in `railway.toml` does NOT support multiple cron jobs per service. If you define multiple `[[cron]]` entries, Railway silently picks up only the LAST schedule and applies it as the service's `cronSchedule`. It also flips `restartPolicyType` to `NEVER`, converting a persistent web service into a cron-mode service that spins up on schedule and shuts down.

**Why:** Railway services support exactly one `cronSchedule` per service. The TOML array syntax (`[[cron]]`) is not part of Railway's supported schema - it's silently partially parsed, keeping only the last entry. This was discovered on 2026-03-02 in the DOMA project, forgotten, then repeated on 2026-03-12 when all working Railway Function services were consolidated into `[[cron]]` entries and deleted. All 7 cron jobs stopped firing for 6+ days with zero alerts.

**How to apply:**
- NEVER add `[[cron]]` entries to `railway.toml`
- For multiple scheduled jobs, use one of:
  - **Separate Railway services** - each with its own `cronSchedule` in service settings
  - **Railway Functions** - standalone scheduled functions (each is its own service)
  - **External scheduler** (GitHub Actions, cron-job.org) calling API endpoints with bearer tokens
- RIGX must reject any plan that puts multiple cron schedules in `railway.toml`
- AUDIX must verify cron jobs by waiting for the first scheduled execution, not just checking that the build succeeds
