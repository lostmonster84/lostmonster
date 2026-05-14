---
name: healthcheck
description: Full-system health probe. Default mode is cheap (env presence + DB tables, safe for /go). `deep` mode actually round-trips every integration the product depends on (DB, AI, storage, email, workers, error monitoring) and costs a few cents per run. Use `/healthcheck` for a quick pulse, `/healthcheck deep` before shipping or when something feels off.
argument-hint: "[deep] [json] [prod] - blank = cheap pass, deep = real round-trips, json = raw output, prod = hit production URL"
---

# Health Check

You are the **Health Check operator** - the one-command pre-flight that proves the product is actually working, not just configured to look like it is.

**Your job:** Probe every integration the product depends on, report a traffic-light dashboard, surface anything that's degraded or broken before users do. You are the answer to "is everything fine right now?" with evidence behind it, not vibes.

## Setup

**Evolution log**: Read `.claude/skills/healthcheck/evolution.md` on every invocation. Check **Learned Rules** - they override the defaults below.

**Project pre-requisites:**

This skill assumes the project exposes two API routes:

1. **`/api/health` (cheap)** - public, env-presence + DB connectivity, zero cost. Used by uptime monitors and this skill's cheap mode.
2. **`/api/health/deep` (paid)** - HQ-gated OR Bearer-token-gated, real round-trips, costs a few cents per call. This skill's deep mode hits this.

If either route doesn't exist, ship them first. The deep route should:

- Authorise via project HQ session OR `Authorization: Bearer ${HEALTH_CHECK_SECRET}` (timing-safe compare). Return **404** on auth fail (not 403/401 - don't confirm endpoint existence to scanners).
- Rate limit per IP (default 30/min). Deep route spends real money each call - drains credit if the secret leaks.
- Run all probes in parallel (`Promise.all`), each with its own timeout (5s default).
- Mirror `/api/health` response shape: `status` / `timestamp` / `environment` / `duration_ms` / `checks{}`. 200 healthy/degraded, 503 unhealthy.

**Required env var:** `HEALTH_CHECK_SECRET` (generate with `openssl rand -hex 32`). Set in `.env.local` for local probing, set on the production hosting for prod probing.

## Modes

| Invocation | What it hits | Cost | When to use |
|------------|-------------|------|-------------|
| `/healthcheck` | `/api/health` only - env presence, DB tables | Free | Every session start, fast pulse, called by `/go` |
| `/healthcheck deep` | `/api/health/deep` - real round-trips to every integration | ~1 cent (AI call + storage ops) | Pre-ship verification, "something feels off" diagnosis, after env changes |
| `/healthcheck json` | Cheap mode, raw JSON output | Free | Piping into other tools |
| `/healthcheck deep json` | Deep mode, raw JSON | ~1 cent | CI integration, scripting |
| `/healthcheck prod` / `/healthcheck deep prod` | Hit production URL instead of local | Same as above | Verify production health from CLI |

## Pre-flight checks (run before any probe)

1. **Dev server check (local mode only)** - hit `[DEV_URL]/api/health` with a 2s timeout. If it fails: report "Dev server not running - run `/devstart`" and STOP. Don't try `deep` without a server up.
2. **Auth check (deep mode only)** - read `HEALTH_CHECK_SECRET` from `.env.local`. If missing: report "HEALTH_CHECK_SECRET not set in .env.local - the deep route is HQ-gated and needs the bearer token. Generate with `openssl rand -hex 32`, add to `.env.local` and production env, retry." and STOP.
3. **Environment** - default to local. If user passes `prod`, use the production URL. **Never** hit a staging URL that shares its database with production - a probe writes to the shared DB without eyes-open consent. Refuse staging with a clear message unless the project has confirmed staging is genuinely isolated.

## How you operate

### `/healthcheck` - Cheap pulse

1. Run pre-flights (above)
2. `curl -s [DEV_URL]/api/health` (2s timeout)
3. Parse JSON, render the dashboard:

```
Health - cheap pass (12ms)

  Database     [OK]    21/21 tables, 8ms
  Storage      [OK]    Configured
  AI           [OK]    Key format ok
  Email        [OK]    Key format ok

  Overall: HEALTHY
```

4. If any check is `unhealthy` or `not_configured`, render in red/yellow with a specific next-move suggestion:
```
Health - cheap pass (12ms)

  Database     [FAIL]  Connection refused
  Storage      [OK]    Configured
  ...

  Overall: UNHEALTHY - DB unreachable. Run `/railway logs <db-service>` to investigate.
```

### `/healthcheck deep` - Real round-trips

1. Run pre-flights including auth check
2. `curl -s -H "Authorization: Bearer $HEALTH_CHECK_SECRET" [DEV_URL]/api/health/deep` (15s timeout - probes can take a few seconds each)
3. Parse JSON, render the deep dashboard. Example shape (probes vary by project):

```
Health - deep probe (3.2s)

  Database     [OK]    pgvector ok                   28ms
  AI           [OK]    <model-id>                    890ms
  Storage      [OK]    put+head+delete ok            340ms
  Email out    [OK]    N domains                     120ms
  Worker A     [OK]    <hostname>                    180ms
  Worker B     [-]     URL not configured
  Errors 24h   [OK]    N unresolved                  15ms

  Overall: HEALTHY (3.2s total)
```

4. **Interpret results** - if anything's degraded/unhealthy, suggest the next move based on what failed:
   - `database unhealthy` -> check DB hosting logs / status page
   - `ai unhealthy` -> check AI provider status, key rotation
   - `storage unhealthy` -> check storage provider dashboard
   - `email unhealthy` -> check email provider dashboard, key rotation
   - `worker unhealthy` -> check worker logs (e.g. `wrangler tail`)
   - `errors 24h` spike (project threshold) -> `/canary status` for the spike

### `json` modes

Skip the dashboard rendering. Output the raw JSON exactly as the API returned it. For piping into `jq`, CI assertions, or other tooling.

## Status legend

| Symbol | Meaning |
|--------|---------|
| `[OK]` | Probe succeeded |
| `[WARN]` | Degraded - works but slow or partially configured (e.g. extension missing, error count rising) |
| `[FAIL]` | Probe failed - integration is broken |
| `[-]` | Not configured (e.g. optional integration not provisioned yet) - not a failure, just informational |

## Cost discipline

- `/healthcheck` is free, run it as often as you want - `/go` calls it every session start
- `/healthcheck deep` costs roughly 1 cent per run (AI ping + storage round-trip + a few HTTP calls). Run it when something feels off, before shipping, or after touching env vars. Don't put it in a loop
- Never auto-invoke `deep` from another skill without an explicit user ask

## Probe semantics

- **Probe the actual model the product uses.** The AI probe should import the project's `MODEL` constant rather than hardcoding. If the product migrates models, the probe follows automatically. Hardcoding a stronger model than the product runs creates false confidence.
- **Worker `/health` semantics: HTTP <500 = alive.** Many serverless workers don't expose a real `/health` endpoint and return 405 for stray GETs. Treating 405 as failure is too strict - a worker returning 405 received the request and rejected it = alive. Only 5xx or network failure counts as unhealthy.
- **Storage probe is self-cleaning.** PUT a probe object with a unique prefix (e.g. `_health-probe/<uuid>`), HEAD it to verify, DELETE it in the same call (and in a finally block as fallback). Never leave probe objects lingering.
- **Don't trackUsage on probe AI calls.** Probes are system overhead, not product cost - probe calls polluting the billing dashboard hides real signal.

## Self-Learn

Follow the protocol in `.claude/skills/_templates/self-learn.md`. Log to `.claude/skills/healthcheck/evolution.md` after the user responds.

Focus the retro on:
- **Caught:** Real failures the cheap or deep pass surfaced (was it actionable?)
- **Missed:** Did something break that this skill should have caught but didn't?
- **Friction:** Probe taking too long, unhelpful error messages, suggested next-move was wrong
- **Cost surprise:** If `deep` ended up running more than expected (loops, retries), flag it

## Rules

- **Cheap-by-default.** `deep` only runs on explicit `deep` arg
- **Never probe shared-DB staging.** If staging shares its database with production, a probe mutates production. Refuse staging by default, allow only with explicit eyes-open consent
- **Graceful degrade.** If dev server isn't running, say so cleanly. Don't error out
- **One source of truth.** AI probe imports `MODEL` from the project's AI client module - if the product migrates models, the probe follows automatically
- **Never claim healthy without evidence.** A probe that times out is not a probe that passed
