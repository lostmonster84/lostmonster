# AUDIX — System Health Audit Framework — Lost Monster Edition

> **Version**: 2.0 (Lost Monster Edition)
> **Created**: February 28, 2026
> **Trigger**: `run AUDIX` or `run AUDIX --quick`

---

## Lost Monster Context

**AUDIX for Lost Monster** understands:
- **Single Next.js app** — `app/` directory, no monorepo
- **Neon PostgreSQL** backend with Prisma ORM
- **No auth** — marketing site only (no admin dashboard yet)
- **Tables:** projects, services, testimonials, contacts
- **Health endpoint** at `/api/health`
- **Vercel** hosting, dev on `localhost:3000`
- **No object storage, email, or payment services configured yet** (TBD)

---

## Quick Start

| Command | Action |
|---------|--------|
| `run AUDIX` | Full system audit |
| `run AUDIX --quick` | Health endpoint only (fast) |
| `run AUDIX --docs` | Regenerate documentation |

**Note:** Lost Monster is a single app — no per-app targeting needed.

---

## Audit Phases

### Phase 1: Health Endpoint Check

**Endpoint:** `GET /api/health`

**Checks:**
- [ ] Neon PostgreSQL connectivity
- [ ] Table count verification
- [ ] Response time under threshold

**Lost Monster Health Endpoint:**

```typescript
// app/api/health/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const start = Date.now()
  const health: Record<string, any> = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    app: 'Lost Monster',
  }

  try {
    // Database check (Neon PostgreSQL via Prisma)
    const dbStart = Date.now()
    const projectCount = await prisma.project.count()
    health.database = {
      status: 'healthy',
      latency: Date.now() - dbStart,
      projectCount,
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
  "timestamp": "2026-02-28T14:30:00.000Z",
  "app": "Lost Monster",
  "database": {
    "status": "healthy",
    "latency": 45,
    "projectCount": 12
  },
  "totalLatency": 52
}
```

---

### Phase 2: Database Table Verification

**Lost Monster Expected Tables:**

| Table | Purpose | Critical |
|-------|---------|----------|
| `projects` | Portfolio projects | Yes |
| `services` | Service offerings | Yes |
| `testimonials` | Client reviews | Yes |
| `contacts` | Contact form submissions | Yes |

**Verification (Prisma):**

```typescript
// Check all models are accessible
const counts = await Promise.all([
  prisma.project.count(),
  prisma.service.count(),
  prisma.testimonial.count(),
  prisma.contact.count(),
])
```

**Pass Criteria:** All tables exist and are queryable via Prisma.

---

### Phase 3: API Endpoint Verification

**Lost Monster Endpoints:**

| Route | Method | Auth | Expected |
|-------|--------|------|----------|
| `/api/health` | GET | Public | 200 |
| `/api/contact` | POST | Public | 200/201 |

**Future endpoints (as site grows):**

| Route | Method | Auth | Expected |
|-------|--------|------|----------|
| `/api/projects` | GET | Public | 200 |
| `/api/services` | GET | Public | 200 |

**Pass Criteria:**
- All endpoints return expected status codes
- POST endpoints validate input correctly (reject bad data with 400)

---

### Phase 4: External Service Verification

**Lost Monster Services (Current):**

| Service | Env Var | Validation |
|---------|---------|------------|
| Neon PostgreSQL | `DATABASE_URL` | Valid connection string, Prisma connects |

**Future Services (TBD):**

| Service | Env Var | Validation |
|---------|---------|------------|
| Object Storage | TBD | TBD |
| Email Service | TBD | TBD |
| Payment Service | TBD | TBD |

**Note:** Lost Monster is a marketing site. External services are minimal right now. AUDIX will expand as services are added.

---

### Phase 5: Documentation Verification

**Lost Monster Required Docs:**

| File | Purpose |
|------|---------|
| `.ai/LOST-MONSTER-DESIGN-SYSTEM.md` | Design system documentation |
| `.ai/DOMAIN-KNOWLEDGE.md` | Business context |
| `README.md` | Project setup |

---

## Lost Monster Audit Report Format

```
+==================================================================+
|                    AUDIX SYSTEM HEALTH REPORT                     |
|                     LOST MONSTER WEBSITE                          |
+==================================================================+
|  Generated: 2026-02-28 14:30:00                                   |
|  Environment: development (localhost:3000)                         |
+==================================================================+

+------------------------------------------------------------------+
| PHASE 1: HEALTH ENDPOINT                                         |
+------------------------------------------------------------------+
| Lost Monster (Vercel / localhost:3000)                            |
| Database      | healthy |  45ms | 12 projects                    |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 2: DATABASE TABLES                                         |
+------------------------------------------------------------------+
| Expected: 4 | Found: 4 | Status: PASS                            |
|                                                                   |
| projects       | 12 rows                                         |
| services       | 6 rows                                          |
| testimonials   | 8 rows                                          |
| contacts       | 23 rows                                         |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 3: API ENDPOINTS                                           |
+------------------------------------------------------------------+
| Public: 2/2 passed | Status: PASS                                |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 4: EXTERNAL SERVICES                                       |
+------------------------------------------------------------------+
| Neon PostgreSQL   | DATABASE_URL configured, connected            |
| Object Storage    | TBD — not configured yet                      |
| Email Service     | TBD — not configured yet                      |
| Payment Service   | TBD — not configured yet                      |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| PHASE 5: DOCUMENTATION                                           |
+------------------------------------------------------------------+
| LOST-MONSTER-DESIGN-SYSTEM.md | exists | updated 2025-11-10      |
| DOMAIN-KNOWLEDGE.md           | exists | updated 2025-11-10      |
| README.md                     | exists | updated 2026-02-28      |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| LOST MONSTER-SPECIFIC CHECKS                                     |
+------------------------------------------------------------------+
| Color themes    | 5 themes configured in page.tsx                 |
| Lighthouse      | Target 90+ all categories                      |
| Contact form    | POST /api/contact responds 200/201              |
| Dynamic theming | localStorage persistence working                |
+------------------------------------------------------------------+

+==================================================================+
|  OVERALL STATUS: OPERATIONAL (0 warnings)                         |
+==================================================================+
```

---

## Lost Monster-Specific Health Checks

### Contact Form Check

```typescript
// Verify contact form API accepts valid submissions
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Dave Test',
    email: 'dave@example.com',
    message: 'AUDIX health check - please ignore',
  }),
})
// Expected: 200 or 201
```

### Color Theme Verification

```typescript
// Verify all 5 color themes are defined
// Check app/page.tsx for colors object
const expectedColors = ['blue', 'teal', 'orange', 'purple', 'green']
// Verify each has: accent, bg properties
```

### Design System Compliance

```
// Check that key design system files exist
.ai/LOST-MONSTER-DESIGN-SYSTEM.md   → must exist
app/page.tsx                         → must contain color system
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
| After deployment to Vercel | `run AUDIX --quick` |
| Weekly health check | `run AUDIX` |
| After database migration | `run AUDIX` |
| After adding new API routes | `run AUDIX` |
| Documentation update | `run AUDIX --docs` |

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| CONEX | AUDIX extends CONEX for deeper checks |
| HARDX | Run after AUDIX to identify hardcoded issues |
| TERRX | Terry's health check is a subset of AUDIX |
| PLANX | Use PLANX for planning fixes identified by AUDIX |

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 2.0 (Lost Monster Edition)
