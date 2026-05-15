# AUDIX - System Health Audit Framework

> **Version**: 3.0
> **Created**: January 13, 2026
> **Trigger**: `run AUDIX` or `run AUDIX on [app]`

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | |
| `[PROJECT-URL]` | https://lostmonster.io | |
| `[DATABASE]` | Neon PostgreSQL | |
| `[DB-DRIVER]` | @neondatabase/serverless | |
| `[HOSTING]` | Vercel | |
| `[STORAGE]` | N/A | |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | |
| `[EMAIL-SERVICE]` | Resend | |
| `[PAYMENT-SERVICE]` | N/A | |
| `[APP-PUBLIC]` | website/app/ | |
| `[APP-ADMIN]` | dashboard/apps/web/src/app/ | |
| `[APP-API]` | website/app/api/ + dashboard/apps/web/src/app/api/ | |
| `[ENTITY-PRIMARY]` | Projects | |
| `[ENTITY-SECONDARY]` | Case Studies | |
| `[ENTITY-USERS]` | Clients | |
| `[PROJECT-DOMAIN]` | Framework-driven development that actually works | What the project does (one line) |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**AUDIX for Lost Monster** understands:
- Framework-driven development that actually works specifics relevant to this worker's role
- See onboarding manifest for token definitions

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
2. **For cron jobs:** Wait for or trigger the first execution. Use manual triggers, CLI tools, or trigger endpoints - don't just check the config file
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
| Brand-pivot rewrite | `run AUDIX --content` (see below) |

---

## Brand-Pivot / Content Audits (added 2026-04-30 after a content-audit miss)

> **AUDIX's default mode is OPERATIONAL** - health endpoints, DB tables, API verification, build status. When the task is a **brand-pivot rewrite** (rebranding, repositioning, product retirement, voice update), the audit mode shifts to **CONTENT**. Different scope, different method, different failure modes.

### Why this matters

A keyword-grep audit catches structural references (retired product names, deprecated component names) but misses the broader vocabulary that signals the OLD identity:

- Fleet-operator language ("our fleet", "premier X company", "we maintain")
- Sister-business / partner names typed casually as "real-feeling" examples
- Old-positioning body copy (sample text in design guides, mock listings, voice examples)
- Stale CTAs surviving in component demos (e.g. "Book Your Adventure" → should match the new brand's primary action language)
- Date captions ("Last updated [old date]") that imply currency

Keyword greps catch known-stale terms. Content audits catch the **brand frame** the terms live inside.

### The Content Audit Method

When the task is brand-pivot scope, AUDIX runs a **string-level content review** alongside the keyword grep:

1. **Keyword grep first** (fast, broad) - find known-stale terms across MD/JSON/code
2. **Live-render walkthrough** (slow, deep) - load every page that consumes the rewritten content, scroll every section, read every visible string, ask **"would this string survive the brand pivot?"**
3. **Self-introduced check** - explicitly grep for: real partner/business names, old-positioning vocabulary, sister-business refs that may have been typed during the rewrite as "real-feeling examples"
4. **Demo / placeholder / sample copy check** - typography examples, button demos, card placeholders, texture demonstrations all contain body copy that often survives multiple rewrites untouched. These are the easiest places to miss legacy frame
5. **Comparison test** - for the design guide specifically: does every example string read consistently with the brand pivot when read aloud? If a sentence sounds like the OLD positioning, flag it even if no keyword matched

### Brand-pivot vocabulary expansion

When auditing for a brand pivot, expand the grep beyond known-stale terms to include the broader vocabulary:

| Pivot type | Old-frame vocabulary to grep |
|---|---|
| Fleet-operator → marketplace | `our fleet`, `we maintain`, `premier X company`, partner names, sister-business refs, "Book Your X" CTAs that imply we sell |
| Product retirement | Retired-product names, product-specific accents, world-accent buttons, product-specific photography |
| Repositioning | Old taglines, old credo phrases, old CTAs, old hierarchy language |
| Audience pivot | Old audience persona refs, old use-case copy, old metaphors |

The grep expansion is **task-specific**. Get the new-brand definition from the user (or from CLAUDE.md / project memories) and grep for the OLD-brand inverse.

### Self-Audit Independence (Rule 10 alignment)

**When AUDIX is auditing CRUDX/APEX/etc. work performed earlier in the same session by the same agent, audit verdict defaults to PROVISIONAL.**

This is per `PROTOCOL.md` Execution Contract Rule 10. AUDIX's verdict on its own session's rework cannot self-CLEAR. Promotion to CLEARED requires:
- (a) User review with explicit live-render walkthrough, OR
- (b) Distinct fresh-eyes worker (NIGELX / SOFAX / different runner) walking the live page

**Why:** the auditor primed by writing the rewrite reads the rendered output for what was intended, not what was actually written. Self-introduced legacy refs (e.g. a real partner brand name typed as a "real-feeling" example during a partner-name purge) are invisible to the auditor that wrote them. External eyes catch what primed eyes miss.

### Content Audit Report Format

Add to the standard AUDIX report when running in content mode:

```
🔍 Content Audit (brand-pivot scope)
- Keyword grep: [N hits across M files]
- Live-render walkthrough: [pages walked, strings reviewed]
- Self-introduced check: [any new partner names / old-frame copy in fresh edits?]
- Brand-pivot vocabulary expansion: [task-specific terms checked]
- Verdict: PROVISIONAL (auditor == builder, awaiting external review per Rule 10)
- OR Verdict: CLEARED (audit was performed by distinct worker / fresh-eyes pass complete)
```

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| CONEX | AUDIX extends CONEX for deeper checks |
| CONSX | Run after AUDIX to verify UI consistency |
| HARDX | Run after AUDIX to identify hardcoded issues |
| PLANX | Use PLANX for planning fixes identified by AUDIX |

---

**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
