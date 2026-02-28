# AUDIX — System Health Audit Framework — [PROJECT] Edition

> **Version**: 2.0 ([PROJECT] Edition)
> **Created**: January 13, 2026
> **Trigger**: `run AUDIX` or `run AUDIX on [app]`

---

## [PROJECT] Context

**AUDIX for [PROJECT]** understands:
- **Monorepo structure** - `[APP-PUBLIC]`, `[APP-ADMIN]`
- **[DATABASE]** backend with `[DB-DRIVER]` driver, [AUTH-METHOD], [OBJECT-STORAGE] storage
- **Tables:** [entity-primary], [entity-secondary], [entity-tertiary], [entity-users]
- **Health endpoints** at `/api/health`
- **Required documentation** in `docs/` folder

---

## Quick Start

| Command | Action |
|---------|--------|
| `run AUDIX` | Full system audit (both apps) |
| `run AUDIX on admin` | Admin app audit only |
| `run AUDIX on public` | Public app audit only |
| `run AUDIX --quick` | Health endpoint only (fast) |
| `run AUDIX --docs` | Regenerate documentation |

---

## Audit Phases

### Phase 1: Health Endpoint Check

**Endpoint:** `GET /api/health`

**Checks:**
- [ ] [DATABASE] connectivity
- [ ] [AUTH-METHOD] status
- [ ] [OBJECT-STORAGE] availability
- [ ] Table count verification

**[PROJECT] Health Endpoint:**

```typescript
// [APP-API]/src/app/api/health/route.ts
import { db } from '@[PROJECT]/shared/lib/db/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const start = Date.now()
  const health: Record<string, any> = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    app: '[PROJECT]',
  }

  try {
    // Database check ([DATABASE])
    const dbStart = Date.now()
    const result = await db.query(
      'SELECT COUNT(*) as count FROM [entity-primary] WHERE status = $1',
      ['active']
    )
    health.database = {
      status: 'healthy',
      latency: Date.now() - dbStart,
      recordCount: parseInt(result.rows[0].count),
    }

    // Auth check ([AUTH-METHOD])
    health.auth = {
      status: 'healthy',
      type: '[AUTH-METHOD]',
      configured: true,
    }

    // Storage check ([OBJECT-STORAGE])
    const storageCheck = await fetch('https://[CDN-URL]', {
      method: 'HEAD',
    })
    health.storage = {
      status: storageCheck.ok ? 'healthy' : 'error',
      provider: '[OBJECT-STORAGE]',
      cdn: '[CDN-URL]',
    }

    // Email check ([EMAIL-SERVICE])
    health.email = {
      status: 'healthy',
      provider: '[EMAIL-SERVICE]',
      configured: !!process.env.EMAIL_API_KEY,
    }

    // Payments check ([PAYMENT-SERVICE])
    health.payments = {
      status: 'healthy',
      provider: '[PAYMENT-SERVICE]',
      configured: !!process.env.PAYMENT_SECRET_KEY,
    }

  } catch (error: any) {
    health.status = 'error'
    health.error = error.message
  }

  health.totalLatency = Date.now() - start

  return NextResponse.json(health, {
    status: health.status === 'healthy' ? 200 : 503,
  })
}
```

**Expected Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-01-13T14:30:00.000Z",
  "app": "[PROJECT]",
  "database": {
    "status": "healthy",
    "latency": 45,
    "recordCount": 127
  },
  "auth": {
    "status": "healthy",
    "type": "[AUTH-METHOD]",
    "configured": true
  },
  "storage": {
    "status": "healthy",
    "provider": "[OBJECT-STORAGE]",
    "cdn": "[CDN-URL]"
  },
  "email": {
    "status": "healthy",
    "provider": "[EMAIL-SERVICE]",
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

**[PROJECT] Expected Tables:**

| Table | Purpose | Critical |
|-------|---------|----------|
| `[entity-primary]` | Primary entities | Yes |
| `[entity-primary]_photos` | Entity images | Yes |
| `[entity-secondary]` | Secondary entities | Yes |
| `[entity-tertiary]` | Organizations | Yes |
| `[entity-users]` | User profiles | Yes |
| `[entity-geo]` | Geographic data | No |

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

**[PROJECT] Public App Endpoints:**

| Route | Method | Auth | Expected |
|-------|--------|------|----------|
| `/api/health` | GET | Public | 200 |
| `/api/search` | GET | Public | 200 |
| `/api/[entity-primary]/[id]` | GET | Public | 200 |
| `/api/inquiries` | POST | Public | 200/201 |

**[PROJECT] Admin App Endpoints:**

| Route | Method | Auth | Expected |
|-------|--------|------|----------|
| `/api/health` | GET | Public | 200 |
| `/api/user/[entity-primary]` | GET | Auth | 200/401 |
| `/api/user/[entity-primary]` | POST | Auth | 201/401 |
| `/api/user/[entity-secondary]` | GET | Auth | 200/401 |
| `/api/user/[entity-primary]/[id]/confirm` | POST | Auth | 200/401 |

**Pass Criteria:**
- Public endpoints return 200
- Auth-protected endpoints return 200 (with session) or 401 (without)

---

### Phase 4: External Service Verification

**[PROJECT] Services:**

| Service | Env Var | Validation |
|---------|---------|------------|
| [DATABASE] | `DATABASE_URL` | Valid connection string |
| [OBJECT-STORAGE] | `[STORAGE-ACCESS-KEY]`, `[STORAGE-SECRET-KEY]`, `[STORAGE-BUCKET-NAME]` | Keys exist, CDN reachable |
| [EMAIL-SERVICE] | `EMAIL_API_KEY` | Key exists |
| [PAYMENT-SERVICE] | `PAYMENT_SECRET_KEY`, `PAYMENT_WEBHOOK_SECRET` | Keys exist |

**[OBJECT-STORAGE] Paths:**

| Path | Purpose |
|------|---------|
| `[entity-primary]/` | Entity images |
| `[entity-tertiary]/` | Organization logos and branding |
| `canary/screenshots/` | Canary bug report screenshots |

---

### Phase 5: Documentation Verification

**[PROJECT] Required Docs:**

| File | Purpose |
|------|---------|
| `docs/API-REFERENCE.md` | API endpoint documentation |
| `docs/DATABASE-ERD.md` | Database schema documentation |
| `docs/mapx/README.md` | System map overview |

---

## [PROJECT] Audit Report Format

```
+==================================================================+
|                    AUDIX SYSTEM HEALTH REPORT                     |
|                       [PROJECT] PLATFORM                          |
+==================================================================+
|  Generated: 2026-01-13 14:30:00                                   |
|  Environment: production                                          |
+==================================================================+

+------------------------------------------------------------------+
| PHASE 1: HEALTH ENDPOINTS                                        |
+------------------------------------------------------------------+
| [PROJECT] ([HOSTING-PROVIDER])                                    |
| Database      | healthy |  45ms | [X] [entity-primary]            |
| Auth          | healthy |       | [AUTH-METHOD]                    |
| Storage       | healthy |       | [CDN-URL]                        |
| [EMAIL-SERVICE]  | healthy |    | configured                       |
| [PAYMENT-SERVICE] | healthy |   | configured                       |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 2: DATABASE TABLES                                         |
+------------------------------------------------------------------+
| Expected: [X] | Found: [X] | Status: PASS                        |
|                                                                   |
| [entity-primary]        | [X] rows                               |
| [entity-primary]_photos | [X] rows                               |
| [entity-secondary]      | [X] rows                               |
| [entity-tertiary]       | [X] rows                               |
| [entity-users]          | [X] rows                               |
| [entity-geo]            | [X] rows                               |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 3: API ENDPOINTS                                           |
+------------------------------------------------------------------+
| Public: [X]/[X] passed | Admin: [X]/[X] passed | Status: PASS    |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 4: EXTERNAL SERVICES                                       |
+------------------------------------------------------------------+
| [DATABASE]          | [HOSTING-PROVIDER] connected                |
| [OBJECT-STORAGE]    | [CDN-URL] reachable                        |
| [EMAIL-SERVICE]     | API key configured                         |
| [PAYMENT-SERVICE]   | API key configured                         |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 5: DOCUMENTATION                                           |
+------------------------------------------------------------------+
| API-REFERENCE.md       | exists | updated 2026-01-12              |
| DATABASE-ERD.md        | exists | updated 2026-01-10              |
| mapx/README.md         | outdated | last update 2025-12-01        |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| [PROJECT]-SPECIFIC CHECKS                                        |
+------------------------------------------------------------------+
| Freshness check     | [X] [entity-primary] expiring in 7 days    |
| Response time       | [X] [entity-secondary] > 24h without contact|
| Photo coverage      | All [entity-primary] have 5+ photos        |
| Verified orgs       | [X] [entity-tertiary] pending verification |
+------------------------------------------------------------------+

+==================================================================+
|  OVERALL STATUS: OPERATIONAL (1 warning)                          |
+==================================================================+
```

---

## [PROJECT]-Specific Health Checks

### Freshness Check

```sql
-- [entity-primary] expiring in next 7 days
SELECT COUNT(*) as expiring_soon
FROM [entity-primary]
WHERE status = 'active'
  AND [BUSINESS-TIMESTAMP] < NOW() - INTERVAL '[BUSINESS-CYCLE-DAYS] days' + INTERVAL '7 days';
```

### Response Time

```sql
-- [entity-secondary] without contact > 24h
SELECT COUNT(*) as stale_records
FROM [entity-secondary]
WHERE status = 'new'
  AND created_at < NOW() - INTERVAL '24 hours';
```

### Photo Coverage

```sql
-- [entity-primary] with < 5 photos
SELECT e.id, e.title, COUNT(p.id) as photo_count
FROM [entity-primary] e
LEFT JOIN [entity-primary]_photos p ON p.[entity-primary]_id = e.id
WHERE e.status = 'active'
GROUP BY e.id, e.title
HAVING COUNT(p.id) < 5;
```

---

## Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| PASS | System healthy | None needed |
| WARNING | Degraded but functional | Review soon |
| CRITICAL | System failure | Immediate action |

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

**Framework Status:** Template
**Last Updated:** February 28, 2026
**Version:** 2.0 (Template Edition)
