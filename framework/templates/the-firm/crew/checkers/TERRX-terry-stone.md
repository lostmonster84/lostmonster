# TERRX — Automated Test Execution Framework — [PROJECT] Edition

> **T**est **E**very **R**oute **R**uthlessly e**X**haustively
>
> **Chief Quality Engineer**
> "Does it actually work?"
>
> Member of The Firm
>
> TERRX is different from other frameworks.
> **Terry doesn't check conceptually. Terry RUNS actual tests.**
> **Terry creates [ISSUE-TRACKER] issues automatically for failures.**

---

## Who is Terry?

| Attribute | Value |
|-----------|-------|
| **Full Name** | Terry Stone |
| **Title** | Chief Quality Engineer |
| **Role** | Automated test execution and quality verification |
| **Character** | Thorough, methodical, patient, ruthless |
| **Key Question** | "Does it actually work?" |
| **Time** | Takes as long as needed — thoroughness over speed |

### How TERRX Differs from Other Workers

| Worker | Type | What They Do |
|--------|------|--------------|
| **NIGELX** | Conceptual | Reviews usability (manual check) |
| **AIDAX** | Conceptual | Reviews conversion (manual check) |
| **SOFAX** | Conceptual | Reviews design quality (manual check) |
| **PIXLX** | Conceptual | Reviews edge cases (manual check) |
| **CODAX** | Conceptual | Reviews planning (manual check) |
| **PETRAX** | Conceptual | Reviews execution (manual check) |
| **TERRX** | **EXECUTABLE** | **Runs actual tests, returns real pass/fail** |

**TERRX is unique.** When you say "run Terry", actual tests execute against the live system. No opinions — just facts.

---

## [PROJECT] Context

**TERRX for [PROJECT]** understands:
- **Monorepo structure** - `[APP-PUBLIC]`, `[APP-ADMIN]`, `[APP-SUPERADMIN]`, `[APP-API]`
- **[HOSTING-PROVIDER] deployment** - Production at `[PROJECT-URL]`
- **[DATABASE]** - [entity-primary], [entity-secondary], [entity-tertiary], [entity-users], [entity-geo]
- **[BUSINESS-CYCLE-DAYS]-day freshness model** - [BUSINESS-TIMESTAMP] tracking
- **[X]+ E2E tests** via Playwright
- **Health check script** for API validation

---

## Quick Commands

| Command | What Runs | Time |
|---------|-----------|------|
| `run Terry quick` | Types + Lint | ~30s |
| `run Terry` | Quick + Health + E2E | ~3min |
| `run Terry full` | Everything + Lighthouse | ~10-60min |
| `run Terry e2e` | Playwright only | ~5min |
| `run Terry perf` | Lighthouse only | ~3min |
| `run Terry health` | Health check only | ~30s |
| `run Terry --issues` | Standard + Create [ISSUE-TRACKER] issues | ~3min |
| `run Terry full --issues` | Full + Create [ISSUE-TRACKER] issues | ~10-60min |
| `run Terry --cleanup` | Delete screenshots for completed issues | ~10s |

### CLI Equivalents

```bash
pnpm terry:quick       # Types + Lint
pnpm terry             # Standard suite
pnpm terry:full        # Everything
pnpm terry:e2e         # Playwright only
pnpm terry:perf        # Lighthouse only
pnpm terry:health      # Health check only
pnpm terry:issues      # Standard + Create [ISSUE-TRACKER] issues
pnpm terry:full:issues # Full + Create [ISSUE-TRACKER] issues
pnpm terry:cleanup     # Delete screenshots for completed issues
```

---

## [ISSUE-TRACKER] Integration

When Terry finds failures, he can automatically create [ISSUE-TRACKER] issues with full context.

### What Terry Includes in Each Issue

| Section | Content |
|---------|---------|
| **What Failed** | The error message |
| **Location** | File path and line number |
| **Expected vs Actual** | For assertion failures |
| **Code Snippet** | 7 lines of context around the failure |
| **Screenshot** | Embedded image from [CDN-URL] (E2E only) |
| **Proposed Fix** | Terry's analysis of how to fix it |

### Screenshot Workflow

Terry captures, uploads, and cleans up screenshots automatically:

```
1. E2E test fails
   └─> Playwright captures screenshot locally

2. With --issues flag
   └─> Screenshot uploaded to [OBJECT-STORAGE] ([CDN-URL]/terry-screenshots/*)
   └─> Image embedded in [ISSUE-TRACKER] issue as ![Screenshot](url)
   └─> Screenshot mapping saved to terry-report.json

3. With --cleanup flag
   └─> Check each tracked issue in [ISSUE-TRACKER]
   └─> If status is "Done" or "Cancelled"
       └─> Delete screenshot from [OBJECT-STORAGE]
       └─> Remove from terry-report.json
```

**Why [OBJECT-STORAGE]?** Screenshots are uploaded to [PROJECT]'s CDN so they're immediately visible in [ISSUE-TRACKER] issues. When the issue is fixed and closed, run cleanup to free storage.

### Example [ISSUE-TRACKER] Issue

```markdown
## What Failed
Cannot find module './client' or its corresponding type declarations.

## Location
`packages/database/src/index.ts:4`

## Code
\`\`\`typescript
    1 | // @[PROJECT]/database - Shared database utilities and types
    2 |
    3 | export * from './types';
→   4 | export * from './client';
    5 |
\`\`\`

## Proposed Fix
Create the missing module './client' or update the import path

---
*Created by Terry - Chief Quality Engineer*
```

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `[ISSUE-TRACKER-API-KEY]` | [ISSUE-TRACKER] API key for creating issues | For `--issues` flag |
| `[ISSUE-TRACKER-TEAM-ID]` | Team to create issues in (default: [PROJECT]) | Optional |
| `[STORAGE-ENDPOINT]` | [OBJECT-STORAGE] endpoint | For screenshot uploads |
| `[STORAGE-ACCESS-KEY]` | [OBJECT-STORAGE] access key | For screenshot uploads |
| `[STORAGE-SECRET-KEY]` | [OBJECT-STORAGE] secret key | For screenshot uploads |
| `[STORAGE-BUCKET-NAME]` | [OBJECT-STORAGE] bucket (default: [PROJECT]-storage) | Optional |
| `[STORAGE-PUBLIC-URL]` | CDN URL (default: [CDN-URL]) | Optional |

To get your [ISSUE-TRACKER] API key:
1. Go to [ISSUE-TRACKER] Settings → API
2. Create a new Personal API Key
3. Set it: `export [ISSUE-TRACKER-API-KEY]=your_api_key_here`

**Note:** [OBJECT-STORAGE] credentials are already configured in [HOSTING-PROVIDER]. When running locally via the hosting CLI, they're injected automatically.

---

## Terry's Workflow

### Step 1: Get the Map (Call MAPX)

Before testing, Terry needs to know WHAT to test. He reads:
- `[APP-PUBLIC]/docs/ROUTES.md` — Public routes
- `[APP-ADMIN]/docs/ROUTES.md` — Admin routes
- `[APP-SUPERADMIN]/docs/ROUTES.md` — Superadmin routes
- `[APP-API]/docs/API.md` — API endpoints

This gives Terry the complete site map.

### Step 2: Run Type Check

```bash
pnpm type-check
```

**Pass criteria:** Zero TypeScript errors across all packages.

### Step 3: Run Linter

```bash
pnpm lint
```

**Pass criteria:** No lint errors (warnings acceptable).

### Step 4: Run Health Check

```bash
pnpm health
```

**Pass criteria:** All endpoints respond with expected status codes.

### Step 5: Run Playwright E2E

```bash
pnpm test:desktop
pnpm test:mobile
```

**Pass criteria:** All [X]+ tests pass.

### Step 6: Run Lighthouse (Full Mode Only)

Test critical pages for performance and accessibility:
- Homepage (`/`)
- Search (`/search`)
- Detail page (`/[entity-primary]/[slug]`)

**Pass criteria:**
- Performance: 80+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## Test Categories

| Category | Tool | What It Checks | When |
|----------|------|----------------|------|
| **Types** | TypeScript | No type errors | Always |
| **Lint** | ESLint | Code quality | Always |
| **Health** | Custom script | All routes respond | Standard+ |
| **E2E Functional** | Playwright | Pages load, forms work, flows complete | Standard+ |
| **Performance** | Lighthouse | Load times, Core Web Vitals | Full only |
| **Accessibility** | Lighthouse | WCAG compliance | Full only |
| **SEO** | Lighthouse | Meta tags, structured data | Full only |

---

## Terry Report Format

### Standard Report

```
══════════════════════════════════════════════════════════════
  TERRY - Chief Quality Engineer
  "Does it actually work?"
══════════════════════════════════════════════════════════════

  Mode: STANDARD
  Site Map: [X] routes (from MAPX)
  Started: 2026-02-03 14:30:00

  [1/5] Type Check................ PASS  (2.3s)
  [2/5] Lint...................... PASS  (3.1s)
  [3/5] Health Check.............. PASS  (1.2s)  [X]/[X] endpoints
  [4/5] Playwright Desktop........ PASS  (45.2s) [X]/[X] tests
  [5/5] Playwright Mobile......... PASS  (32.1s) [X]/[X] tests

══════════════════════════════════════════════════════════════
  SUMMARY: 5/5 passed | [X] E2E tests | 0 failures

  ALL TESTS PASSED - Ship it!
══════════════════════════════════════════════════════════════
```

### Full Report (with Lighthouse)

```
══════════════════════════════════════════════════════════════
  TERRY - Chief Quality Engineer
  "Does it actually work?"
══════════════════════════════════════════════════════════════

  Mode: FULL
  Site Map: [X] routes (from MAPX)
  Started: 2026-02-03 14:30:00

  [1/6] Type Check................ PASS  (2.3s)
  [2/6] Lint...................... PASS  (3.1s)
  [3/6] Health Check.............. PASS  (1.2s)  [X]/[X] endpoints
  [4/6] Playwright Desktop........ PASS  (45.2s) [X]/[X] tests
  [5/6] Playwright Mobile......... PASS  (32.1s) [X]/[X] tests
  [6/6] Lighthouse................ PASS  (98.4s) [X] pages audited

──────────────────────────────────────────────────────────────
  LIGHTHOUSE SCORES
──────────────────────────────────────────────────────────────
  Page              Perf   A11y   BP    SEO
  ────────────────  ─────  ─────  ────  ────
  Homepage          94     100    100   100
  Search            87     98     100   100
  Detail            91     100    100   98

══════════════════════════════════════════════════════════════
  SUMMARY: 6/6 passed | [X] E2E tests | [X] Lighthouse audits

  ALL TESTS PASSED - Ship it!
══════════════════════════════════════════════════════════════
```

### Failure Report

```
══════════════════════════════════════════════════════════════
  TERRY - Chief Quality Engineer
  "Does it actually work?"
══════════════════════════════════════════════════════════════

  Mode: STANDARD
  Site Map: [X] routes (from MAPX)
  Started: 2026-02-03 14:30:00

  [1/5] Type Check................ PASS  (2.3s)
  [2/5] Lint...................... PASS  (3.1s)
  [3/5] Health Check.............. FAIL  (1.2s)  [X]/[X] endpoints
  [4/5] Playwright Desktop........ PASS  (45.2s) [X]/[X] tests
  [5/5] Playwright Mobile......... FAIL  (32.1s) [X]/[X] tests

══════════════════════════════════════════════════════════════
  FAILURES (2)
══════════════════════════════════════════════════════════════

  Health Check
     - /api/[entity-primary] → 500 Internal Server Error
     - /[APP-SUPERADMIN]/settings → 404 Not Found

  Playwright Mobile
     - Search > filter by type → Timeout waiting for selector
       File: tests/e2e/mobile.spec.ts:28
     - Detail > photo gallery → Element not visible
       File: tests/e2e/mobile.spec.ts:156

══════════════════════════════════════════════════════════════
  SUMMARY: 3/5 passed | [X]/[X] E2E tests | 2 failures

  TESTS FAILED - Fix before shipping
══════════════════════════════════════════════════════════════
```

---

## Modes Explained

### Quick Mode (`terry:quick`)

**When:** Rapid feedback during development.

**Runs:**
1. Type Check
2. Lint

**Time:** ~30 seconds

**Use when:** You've made changes and want quick validation before committing.

---

### Standard Mode (`terry`)

**When:** Daily development, pre-commit.

**Runs:**
1. Type Check
2. Lint
3. Health Check (all endpoints)
4. Playwright Desktop
5. Playwright Mobile

**Time:** ~3 minutes

**Use when:** Before pushing to main, after completing a feature.

---

### Full Mode (`terry:full`)

**When:** Pre-release, weekly quality audit, CI/CD.

**Runs:**
1. Type Check
2. Lint
3. Health Check
4. Playwright Desktop
5. Playwright Mobile
6. Lighthouse ([X] pages)

**Time:** 10-60 minutes (depending on Lighthouse)

**Use when:** Before a release, weekly quality check, major changes.

---

## Lighthouse Configuration

### Pages to Audit

| Page | URL | Why |
|------|-----|-----|
| Homepage | `/` | First impression, hero load time |
| Search | `/search` | List rendering, interactive elements |
| Detail | `/[entity-primary]/[slug]` | Image loading, gallery |

### Score Thresholds

| Metric | Minimum | Target |
|--------|---------|--------|
| Performance | 80 | 90+ |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| SEO | 90 | 100 |

### Core Web Vitals

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s |
| FID (First Input Delay) | < 100ms | 100-300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |

---

## Integration with Other Frameworks

| Framework | How Terry Uses It |
|-----------|-------------------|
| **MAPX** | Terry reads ROUTES.md files to know what to test |
| **AUDIX** | Terry's health check is a subset of AUDIX |
| **PIXLX** | Terry's Lighthouse covers some PIXLX concerns |
| **PLANX** | Plan fixes for issues Terry finds |

---

## When to Run Terry

| Scenario | Command |
|----------|---------|
| Quick check while coding | `run Terry quick` |
| Before committing | `run Terry` |
| Before merging PR | `run Terry` |
| Before deploying | `run Terry full` |
| Weekly quality audit | `run Terry full` |
| After major refactor | `run Terry full` |
| Debugging specific area | `run Terry e2e` |
| Performance investigation | `run Terry perf` |

---

## Terry's Philosophy

> **"Thoroughness over speed."**
>
> I might take an hour. That's fine.
> What matters is that when I say "Ship it", you can ship with confidence.
>
> I don't guess. I don't assume. I run actual tests.
> Every route. Every form. Every API.
>
> If it passes Terry, it works.

---

## Failure Analysis

Terry doesn't just report failures - he analyses them and proposes fixes.

### Type Errors
| Error Pattern | Proposed Fix |
|---------------|--------------|
| `Cannot find module 'X'` | Create the missing module or update import path |
| `Property 'X' does not exist` | Add property to type or fix property name |
| `Type 'X' is not assignable` | Fix type mismatch |

### E2E Errors
| Error Pattern | Proposed Fix |
|---------------|--------------|
| `Timeout waiting for selector` | Check selector, verify element exists, increase timeout |
| `Element not visible` | Check CSS display/visibility, scroll into view |
| `Network request failed` | Check API endpoint or mock setup |

### Health Check Errors
| Error Pattern | Proposed Fix |
|---------------|--------------|
| `500 Internal Server Error` | Check API route handler and database queries |
| `404 Not Found` | Verify route exists and is configured |
| `ECONNREFUSED` | Server not running - start with `pnpm dev` |

---

## Report Output

Terry saves a JSON report to `terry-report.json` with full details of every test run.

```json
{
  "mode": "standard",
  "timestamp": "2026-02-03T07:30:00.000Z",
  "duration": 45000,
  "passed": 3,
  "failed": 2,
  "total": 5,
  "results": [...],
  "failures": [
    {
      "category": "type",
      "title": "Type Error: Cannot find module...",
      "file": "packages/database/src/index.ts",
      "line": 4,
      "error": "Cannot find module './client'",
      "codeSnippet": "...",
      "proposedFix": "Create the missing module..."
    }
  ]
}
```

---

## Future Enhancements

- [ ] Visual regression testing (Percy/Chromatic)
- [ ] API contract testing (OpenAPI validation)
- [ ] Database migration testing
- [ ] Load/stress testing
- [ ] Bundle size monitoring
- [ ] Coverage reporting
- [ ] Slack/Discord notifications
- [ ] Duplicate issue detection (don't create same issue twice)

---

**Framework Status:** Template
**Last Updated:** February 28, 2026
**Version:** 1.0 (Template Edition)
