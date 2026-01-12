# AUDITX — System Health Audit Framework

> **Version**: 1.0
> **Created**: January 12, 2026
> **Trigger**: `run AUDITX` or `run AUDITX on [app]`

---

## Overview

**AUDITX** is a comprehensive system health audit framework for the TWIN platform. It verifies all services are connected, all APIs are operational, all database tables are healthy, and generates documentation.

---

## Quick Start

| Command | Action |
|---------|--------|
| `run AUDITX` | Full system audit (admin + marketing) |
| `run AUDITX on admin` | Admin app audit only |
| `run AUDITX on marketing` | Marketing app audit only |
| `run AUDITX --quick` | Health endpoint only (fast) |
| `run AUDITX --docs` | Regenerate documentation |

---

## Audit Phases

### Phase 1: Health Endpoint Check (Quick)

**Command:** `curl https://[app].thetwingroup.com/api/health`

**Checks:**
- [ ] Database connectivity
- [ ] Auth system status
- [ ] Storage availability
- [ ] AI service status
- [ ] Email service status

**Pass Criteria:** All services return `healthy` status

**Output:**
```
✅ Database: healthy (Xms latency, Y tables)
✅ Auth: healthy
✅ Storage: healthy
✅ AI: healthy
✅ Email: healthy
```

---

### Phase 2: Database Table Verification

**Method:** Query `information_schema.tables`

**Admin Tables (24):**

| Category | Tables |
|----------|--------|
| Core | users, applications, job_specs, tasks, posts |
| Staff | staff_profiles, staff_payment_details, onboarding_tokens |
| Auth | team_invitation_tokens |
| Config | departments, employment_types, news_categories, system_settings |
| Content | page_content, media |
| Notifications | notifications, notification_preferences |
| AI | ai_analysis_log, ai_credits, ai_credit_transactions |
| Other | activity_log, enquiries, feature_suggestions |

**Marketing Tables:**
| Category | Tables |
|----------|--------|
| Content | enquiries (contact form submissions) |

**Pass Criteria:** All expected tables exist and are queryable

---

### Phase 3: API Endpoint Verification

**Method:** Test each endpoint category with GET request

**Admin Endpoints (52 total):**

| Category | Count | Test Endpoint |
|----------|-------|---------------|
| Applications | 9 | `GET /api/applications` |
| Job Specs | 5 | `GET /api/job-specs` |
| Tasks | 5 | `GET /api/tasks` |
| Posts | 5 | `GET /api/posts` |
| Team | 7 | `GET /api/team` |
| Departments | 4 | `GET /api/departments` |
| Employment Types | 4 | `GET /api/employment-types` |
| Media | 4 | `GET /api/media` |
| Pages | 3 | `GET /api/pages` |
| News Categories | 4 | `GET /api/news-categories` |
| Notifications | 5 | `GET /api/notifications` |
| Enquiries | 4 | `GET /api/enquiries` |
| Utility | 8 | `GET /api/health` |

**Pass Criteria:**
- Public endpoints return 200
- Auth-protected endpoints return 200 (with session) or 401 (without)

---

### Phase 4: External Service Verification

**Services:**

| Service | Env Var | Validation |
|---------|---------|------------|
| Neon (PostgreSQL) | `DATABASE_URL` | Query succeeds |
| NextAuth | `NEXTAUTH_SECRET` | 32+ chars, not default |
| Resend | `RESEND_API_KEY` | Starts with `re_` |
| Anthropic | `ANTHROPIC_API_KEY` | Starts with `sk-ant-` |
| Vercel Blob | `BLOB_READ_WRITE_TOKEN` | Token exists |

**Pass Criteria:** All env vars configured and valid format

---

### Phase 5: Documentation Verification

**Required Docs:**

| File | Purpose |
|------|---------|
| `docs/ADMIN-API-REFERENCE.md` | API endpoint documentation |
| `docs/ADMIN-DATABASE-ERD.md` | Database schema documentation |
| `docs/ADMIN-SERVICE-MAP.md` | External service documentation |

**Pass Criteria:** All docs exist and are up-to-date

---

## Audit Report Format

```
╔══════════════════════════════════════════════════════════════════╗
║                    AUDITX SYSTEM HEALTH REPORT                    ║
╠══════════════════════════════════════════════════════════════════╣
║  Generated: [timestamp]                                           ║
║  App: [admin/marketing/both]                                      ║
║  Environment: [production/development]                            ║
╠══════════════════════════════════════════════════════════════════╣

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: HEALTH ENDPOINT                                         │
├─────────────────────────────────────────────────────────────────┤
│ ✅ Database    │ healthy │ 300ms │ 24 tables                    │
│ ✅ Auth        │ healthy │       │ configured                   │
│ ✅ Storage     │ healthy │       │ configured                   │
│ ✅ AI          │ healthy │       │ configured                   │
│ ✅ Email       │ healthy │       │ configured                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: DATABASE TABLES                                         │
├─────────────────────────────────────────────────────────────────┤
│ Expected: 24 │ Found: 24 │ Status: ✅ PASS                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: API ENDPOINTS                                           │
├─────────────────────────────────────────────────────────────────┤
│ Total: 52 │ Tested: 52 │ Passed: 52 │ Status: ✅ PASS           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: EXTERNAL SERVICES                                       │
├─────────────────────────────────────────────────────────────────┤
│ ✅ Neon        │ connected                                       │
│ ✅ NextAuth    │ configured                                      │
│ ✅ Resend      │ configured                                      │
│ ✅ Anthropic   │ configured                                      │
│ ✅ Vercel Blob │ configured                                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: DOCUMENTATION                                           │
├─────────────────────────────────────────────────────────────────┤
│ ✅ ADMIN-API-REFERENCE.md    │ exists                           │
│ ✅ ADMIN-DATABASE-ERD.md     │ exists                           │
│ ✅ ADMIN-SERVICE-MAP.md      │ exists                           │
└─────────────────────────────────────────────────────────────────┘

╠══════════════════════════════════════════════════════════════════╣
║  OVERALL STATUS: ✅ ALL SYSTEMS OPERATIONAL                       ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Severity Levels

| Level | Icon | Meaning | Action |
|-------|------|---------|--------|
| PASS | ✅ | System healthy | None needed |
| WARNING | ⚠️ | Degraded but functional | Review soon |
| CRITICAL | 🔴 | System failure | Immediate action |

---

## Automated Checks

### Quick Health (CLI)
```bash
curl -s https://admin.thetwingroup.com/api/health | jq '.status'
```

### Full Health (CLI)
```bash
curl -s https://admin.thetwingroup.com/api/health | jq .
```

### Local Development
```bash
pnpm --filter admin dev
curl -s http://localhost:3001/api/health | jq .
```

---

## When to Run AUDITX

| Scenario | Command |
|----------|---------|
| After deployment | `run AUDITX --quick` |
| Weekly health check | `run AUDITX` |
| After major changes | `run AUDITX` |
| Debugging issues | `run AUDITX on [app]` |
| Documentation update | `run AUDITX --docs` |

---

## Troubleshooting Guide

### Database Unhealthy
1. Check `DATABASE_URL` in Vercel env vars
2. Verify Neon project is active
3. Check connection pooling limits

### Auth Unhealthy
1. Verify `NEXTAUTH_SECRET` is 32+ chars
2. Check `NEXTAUTH_URL` matches domain
3. Clear browser cookies

### Storage Unhealthy
1. Check `BLOB_READ_WRITE_TOKEN` in Vercel
2. Verify Vercel Blob storage quota

### AI Unhealthy
1. Verify `ANTHROPIC_API_KEY` format
2. Check API credits balance
3. Review rate limits

### Email Unhealthy
1. Check `RESEND_API_KEY` format
2. Verify domain is verified in Resend
3. Check sender address configuration

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| CONNECTX | AUDITX extends CONNECTX for deeper checks |
| CONSTX | Run after AUDITX to verify UI consistency |
| HARDCODEX | Run after AUDITX to identify tech debt |
| PLANX | Use for planning fixes identified by AUDITX |

---

## Output Files

When `run AUDITX --docs` is invoked:

| File | Generated |
|------|-----------|
| `docs/ADMIN-API-REFERENCE.md` | All API endpoints |
| `docs/ADMIN-DATABASE-ERD.md` | Database schema |
| `docs/ADMIN-SERVICE-MAP.md` | Service dependencies |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 12, 2026 | Initial framework |
