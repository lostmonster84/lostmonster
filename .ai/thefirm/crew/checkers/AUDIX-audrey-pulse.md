# AUDIX — System Health Audit Framework

> **Version**: 3.0
> **Created**: January 13, 2026
> **Trigger**: `run AUDIX` or `run AUDIX on [app]`

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-URL]` | https://lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[HOSTING-PROVIDER]` | Vercel | CLAUDE.md |
| `[STORAGE]` | | |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | CLAUDE.md |
| `[EMAIL-SERVICE]` | Resend | CLAUDE.md |
| `[PAYMENT-SERVICE]` | | |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**AUDIX for Lost Monster** audits system health across the monorepo — website (port 3000), dashboard (port 3001), Neon PostgreSQL connectivity, NextAuth v5 session integrity, Resend email delivery, and Vercel deployment status.

Primary entities to audit: Projects, Case Studies, and Clients. API routes span both `website/app/api/` and `dashboard/apps/web/src/app/api/`. Production URL: `https://lostmonster.io`.
---

## Quick Start

| Command | Action |
|---------|--------|
| `run AUDIX` | Full system audit |
| `run AUDIX on [app]` | Single app audit only |
| `run AUDIX --quick` | Health endpoint only (fast) |
| `run AUDIX --docs` | Regenerate documentation |

---

## Audit Phases

### Phase 1: Health Endpoint Check

**Endpoint:** `GET /api/health`

**Checks:**
- [ ] Neon PostgreSQL connectivity
- [ ] NextAuth v5 (Credentials + JWT) status
- [ ] [STORAGE] availability
- [ ] Table count verification

The health endpoint should return a JSON response with status for each subsystem (database, auth, storage, email, payments) including latency and configuration status.

**Expected Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-01-13T14:30:00.000Z",
  "app": "Lost Monster",
  "database": {
    "status": "healthy",
    "latency": 45
  },
  "auth": {
    "status": "healthy",
    "type": "NextAuth v5 (Credentials + JWT)",
    "configured": true
  },
  "storage": {
    "status": "healthy",
    "provider": "[STORAGE]"
  },
  "email": {
    "status": "healthy",
    "provider": "Resend",
    "configured": true
  },
  "payments": {
    "status": "healthy",
    "provider": "[PAYMENT-SERVICE]",
    "configured": true
  },
  "totalLatency": 120
}
```

---

### Phase 2: Database Table Verification

Verify all expected tables exist and are queryable.

**Verification Query:**

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Pass Criteria:** All critical tables exist and are queryable

---

### Phase 3: API Endpoint Verification

Verify all public and protected API endpoints respond correctly.

**Pass Criteria:**
- Public endpoints return 200
- Auth-protected endpoints return 200 (with session) or 401 (without)

---

### Phase 4: External Service Verification

Verify all external service integrations are configured and reachable.

---

### Phase 5: Documentation Verification

Verify required documentation files exist and are up to date.

---

## Audit Report Format

```
╔══════════════════════════════════════════════════════════════════╗
║                    AUDIX SYSTEM HEALTH REPORT                     ║
║                       Lost Monster PLATFORM                          ║
╠══════════════════════════════════════════════════════════════════╣
║  Generated: [timestamp]                                           ║
║  Environment: [env]                                               ║
╠══════════════════════════════════════════════════════════════════╣

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: HEALTH ENDPOINTS                                        │
├─────────────────────────────────────────────────────────────────┤
│ ✅/❌ Database    │ status │ latency                             │
│ ✅/❌ Auth        │ status │ type                                │
│ ✅/❌ Storage     │ status │ provider                            │
│ ✅/❌ Email       │ status │ provider                            │
│ ✅/❌ Payments    │ status │ provider                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: DATABASE TABLES                                         │
├─────────────────────────────────────────────────────────────────┤
│ Expected: X │ Found: X │ Status: ✅/❌                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: API ENDPOINTS                                           │
├─────────────────────────────────────────────────────────────────┤
│ Public: X/X passed │ Protected: X/X passed │ Status: ✅/❌       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: EXTERNAL SERVICES                                       │
├─────────────────────────────────────────────────────────────────┤
│ ✅/❌ Neon PostgreSQL   │ connected                                   │
│ ✅/❌ [STORAGE]    │ reachable                                   │
│ ✅/❌ Resend │ configured                               │
│ ✅/❌ [PAYMENT-SERVICE] │ configured                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: DOCUMENTATION                                           │
├─────────────────────────────────────────────────────────────────┤
│ ✅/❌/⚠️ [doc files and status]                                  │
└─────────────────────────────────────────────────────────────────┘

╠══════════════════════════════════════════════════════════════════╣
║  OVERALL STATUS: ✅/❌ [summary]                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Phase 6: Infrastructure Proof of Life (MANDATORY for infra work)

> Added after a 6-day silent cron outage. A successful build is NEVER proof that infrastructure works.
> See: `.ai/thefirm/lessons/verify-not-just-build.md`

**When to run:** ANY time the work involves cron jobs, background workers, webhooks, scheduled tasks, deployment config, new services, or environment variables.

**The rule:** AUDIX must not score infrastructure work above **5/10** until proof of life is confirmed. "It builds" and "it deploys" are necessary but not sufficient.

### Proof of Life Checklist

| Infrastructure Type | What Counts as Proof | What Does NOT Count |
|--------------------|-----------------------|---------------------|
| **Cron job** | The job fired on schedule AND completed (check logs, DB records, or output) | Build passed, deploy succeeded, healthcheck green |
| **Webhook** | A test event was sent AND processed end-to-end | Endpoint exists, returns 200 on GET |
| **Background worker** | A test job was queued AND completed | Worker process started |
| **Scheduled email** | At least one email sent and received (check provider dashboard) | Email template renders, API key configured |
| **New service** | Service is running, responding, and performing its function | Container started, healthcheck passed |
| **Environment variable** | The consuming code reads and uses the value correctly | Variable is set in the dashboard |

### Scoring Impact

| Proof of Life Status | Maximum AUDIX Score |
|---------------------|---------------------|
| Confirmed (observed execution) | 10/10 |
| Triggered but not yet confirmed (waiting for schedule) | 7/10 + debt logged |
| Not attempted | 5/10 maximum |
| Cannot be verified this session | 5/10 + mandatory debt with verification plan |

### What AUDIX Must Do

1. **Before scoring:** Check `.ai/thefirm/lessons/` for any lessons matching the platform
2. **For cron jobs:** Wait for or trigger the first execution. Use manual triggers, CLI tools, or trigger endpoints — don't just check the config file
3. **For new API routes:** Actually call them with test data, don't just verify they compile
4. **Log the proof:** Include what was tested and the result in the AUDIX report
5. **If proof is impossible this session:** Log a debt with a specific verification plan and timeline

---

## Severity Levels

| Level | Icon | Meaning | Action |
|-------|------|---------|--------|
| PASS | ✅ | System healthy | None needed |
| WARNING | ⚠️ | Degraded but functional | Review soon |
| CRITICAL | 🔴 | System failure | Immediate action |

---

## When to Run AUDIX

| Scenario | Command |
|----------|---------|
| After deployment | `run AUDIX --quick` |
| Weekly health check | `run AUDIX` |
| After database migration | `run AUDIX` |
| Debugging issues | `run AUDIX on [app]` |
| Documentation update | `run AUDIX --docs` |

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| CONEX | AUDIX extends CONEX for deeper checks |
| CONSX | Run after AUDIX to verify UI consistency |
| HARDX | Run after AUDIX to identify hardcoded issues |
| PLANX | Use PLANX for planning fixes identified by AUDIX |

---


---

## Supplements

Before starting work, check for a relevant supplement in `checkers/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
