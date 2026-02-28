# TERRX — Automated Test Execution Framework — Lost Monster Edition

> **T**est **E**very **R**oute **R**uthlessly e**X**haustively
>
> **Chief Quality Engineer**
> "Does it actually work?"
>
> TERRX is different from other frameworks.
> **Terry doesn't check conceptually. Terry RUNS actual tests.**
> **Terry creates GitHub Issues automatically for failures.**

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

## Lost Monster Context

**TERRX for Lost Monster** understands:
- **Single Next.js app** — `app/` directory (App Router, no monorepo)
- **Vercel deployment** — Production at `lostmonster.dev`
- **Neon PostgreSQL** — projects, services, testimonials, contacts
- **Marketing site** — No auth, no admin dashboard (yet)
- **Dev server** on `localhost:3000`
- **npm** as package manager (not pnpm)
- **Dynamic 5-color theming** — tests must work across all color variants

---

## Quick Commands

| Command | What Runs | Time |
|---------|-----------|------|
| `run Terry quick` | Types + Lint | ~20s |
| `run Terry` | Quick + Health + E2E | ~2min |
| `run Terry full` | Everything + Lighthouse | ~5-30min |
| `run Terry e2e` | Playwright only | ~3min |
| `run Terry perf` | Lighthouse only | ~3min |
| `run Terry health` | Health check only | ~15s |
| `run Terry --issues` | Standard + Create GitHub Issues | ~2min |
| `run Terry full --issues` | Full + Create GitHub Issues | ~5-30min |
| `run Terry --cleanup` | Delete screenshots for completed issues | ~10s |

### CLI Equivalents

```bash
npm run terry:quick       # Types + Lint
npm run terry             # Standard suite
npm run terry:full        # Everything
npm run terry:e2e         # Playwright only
npm run terry:perf        # Lighthouse only
npm run terry:health      # Health check only
npm run terry:issues      # Standard + Create GitHub Issues
npm run terry:full:issues # Full + Create GitHub Issues
npm run terry:cleanup     # Delete screenshots for completed issues
```

---

## GitHub Issues Integration

When Terry finds failures, he can automatically create GitHub Issues with full context.

### What Terry Includes in Each Issue

| Section | Content |
|---------|---------|
| **What Failed** | The error message |
| **Location** | File path and line number |
| **Expected vs Actual** | For assertion failures |
| **Code Snippet** | 7 lines of context around the failure |
| **Screenshot** | Embedded image (E2E only) |
| **Proposed Fix** | Terry's analysis of how to fix it |

### Screenshot Workflow

Terry captures and tracks screenshots automatically:

```
1. E2E test fails
   --> Playwright captures screenshot locally

2. With --issues flag
   --> Screenshot saved to test-results/
   --> Image linked in GitHub Issue
   --> Screenshot mapping saved to terry-report.json

3. With --cleanup flag
   --> Check each tracked issue on GitHub
   --> If status is "Closed"
       --> Remove screenshot from local storage
       --> Remove from terry-report.json
```

### Example GitHub Issue

```markdown
## What Failed
Homepage hero section not rendering accent color correctly.

## Location
`app/page.tsx:74`

## Code
\`\`\`typescript
    72 | <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter">
    73 |   <span className="text-white">Built by</span><br/>
--> 74 |   <span style={{ color: color.accent }}>Runs Businesses</span>
    75 | </h1>
\`\`\`

## Proposed Fix
Check that `color` state is initialised before first render. Add fallback accent color.

---
*Created by Terry - Chief Quality Engineer*
```

---

## Terry's Workflow

### Step 1: Get the Map (Call MAPX)

Before testing, Terry needs to know WHAT to test. He reads:
- `app/` directory structure — All pages and routes
- `app/api/` — API endpoints
- Site map / route list

This gives Terry the complete site map.

### Step 2: Run Type Check

```bash
npx tsc --noEmit
```

**Pass criteria:** Zero TypeScript errors.

### Step 3: Run Linter

```bash
npm run lint
```

**Pass criteria:** No lint errors (warnings acceptable).

### Step 4: Run Health Check

```bash
npm run health
```

Hits `localhost:3000` and any `/api/*` routes. Verifies they respond correctly.

**Pass criteria:** All endpoints respond with expected status codes.

### Step 5: Run Playwright E2E

```bash
npx playwright test --project=desktop
npx playwright test --project=mobile
```

**Pass criteria:** All tests pass.

### Step 6: Run Lighthouse (Full Mode Only)

Test critical pages for performance and accessibility:
- Homepage (`/`)
- Services page (`/services`)
- Portfolio page (`/portfolio`)

**Pass criteria:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

(Lost Monster targets higher than generic — see `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`)

---

## Test Categories

| Category | Tool | What It Checks | When |
|----------|------|----------------|------|
| **Types** | TypeScript | No type errors | Always |
| **Lint** | ESLint | Code quality | Always |
| **Health** | Custom script | All routes respond | Standard+ |
| **E2E Functional** | Playwright | Pages load, color switcher works, forms work | Standard+ |
| **Performance** | Lighthouse | Load times, Core Web Vitals | Full only |
| **Accessibility** | Lighthouse | WCAG compliance | Full only |
| **SEO** | Lighthouse | Meta tags, structured data | Full only |

---

## Terry Report Format

### Standard Report

```
======================================================================
  TERRY - Chief Quality Engineer
  "Does it actually work?"
======================================================================

  Mode: STANDARD
  Site Map: 8 routes
  Started: 2026-02-28 14:30:00

  [1/5] Type Check................ PASS  (1.8s)
  [2/5] Lint...................... PASS  (2.4s)
  [3/5] Health Check.............. PASS  (0.8s)  4/4 endpoints
  [4/5] Playwright Desktop........ PASS  (28.3s) 12/12 tests
  [5/5] Playwright Mobile......... PASS  (22.1s) 12/12 tests

======================================================================
  SUMMARY: 5/5 passed | 24 E2E tests | 0 failures

  ALL TESTS PASSED - Ship it!
======================================================================
```

### Full Report (with Lighthouse)

```
======================================================================
  TERRY - Chief Quality Engineer
  "Does it actually work?"
======================================================================

  Mode: FULL
  Site Map: 8 routes
  Started: 2026-02-28 14:30:00

  [1/6] Type Check................ PASS  (1.8s)
  [2/6] Lint...................... PASS  (2.4s)
  [3/6] Health Check.............. PASS  (0.8s)  4/4 endpoints
  [4/6] Playwright Desktop........ PASS  (28.3s) 12/12 tests
  [5/6] Playwright Mobile......... PASS  (22.1s) 12/12 tests
  [6/6] Lighthouse................ PASS  (65.2s) 3 pages audited

----------------------------------------------------------------------
  LIGHTHOUSE SCORES
----------------------------------------------------------------------
  Page              Perf   A11y   BP    SEO
  ----------------  -----  -----  ----  ----
  Homepage          96     100    100   100
  Services          93     100    100   100
  Portfolio         94     100    100   100

======================================================================
  SUMMARY: 6/6 passed | 24 E2E tests | 3 Lighthouse audits

  ALL TESTS PASSED - Ship it!
======================================================================
```

### Failure Report

```
======================================================================
  TERRY - Chief Quality Engineer
  "Does it actually work?"
======================================================================

  Mode: STANDARD
  Site Map: 8 routes
  Started: 2026-02-28 14:30:00

  [1/5] Type Check................ PASS  (1.8s)
  [2/5] Lint...................... PASS  (2.4s)
  [3/5] Health Check.............. FAIL  (0.8s)  3/4 endpoints
  [4/5] Playwright Desktop........ PASS  (28.3s) 12/12 tests
  [5/5] Playwright Mobile......... FAIL  (22.1s) 10/12 tests

======================================================================
  FAILURES (2)
======================================================================

  Health Check
     - /api/contact → 500 Internal Server Error

  Playwright Mobile
     - Color Switcher > select purple → Timeout waiting for selector
       File: tests/e2e/mobile.spec.ts:28
     - Hero > metric cards responsive → Element not visible
       File: tests/e2e/mobile.spec.ts:56

======================================================================
  SUMMARY: 3/5 passed | 22/24 E2E tests | 2 failures

  TESTS FAILED - Fix before shipping
======================================================================
```

---

## Modes Explained

### Quick Mode (`terry:quick`)

**When:** Rapid feedback during development.

**Runs:**
1. Type Check
2. Lint

**Time:** ~20 seconds

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

**Time:** ~2 minutes

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
6. Lighthouse (3 pages)

**Time:** 5-30 minutes (depending on Lighthouse)

**Use when:** Before a Vercel deployment, weekly quality check, major changes.

---

## Lighthouse Configuration

### Pages to Audit

| Page | URL | Why |
|------|-----|-----|
| Homepage | `/` | First impression, hero load time, color switcher |
| Services | `/services` | Service cards, CTA performance |
| Portfolio | `/portfolio` | Project gallery, image loading |

### Score Thresholds (Lost Monster Targets)

| Metric | Minimum | Target |
|--------|---------|--------|
| Performance | 90 | 95+ |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

**Note:** Lost Monster targets are higher than generic because it's a marketing site showcasing developer capability. Lighthouse scores ARE the product demo.

### Core Web Vitals

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4s | > 4s |
| FID (First Input Delay) | < 100ms | 100-300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |

---

## Lost Monster-Specific E2E Tests

Terry should cover these Lost Monster-specific scenarios:

| Test | What It Verifies |
|------|------------------|
| Color switcher works | All 5 colors selectable, persists in localStorage |
| Hero renders at all viewports | text-9xl on desktop, text-6xl on mobile |
| Metric cards display | 50+, 70%, 4.9/5, 2-4 wks all visible |
| Dynamic accent colors | Buttons, borders, icons update with theme |
| Grid pattern background | SVG pattern renders, doesn't block interaction |
| Glassmorphism cards | backdrop-blur visible on metric cards |
| Contact form submission | Form validates, submits to API |
| Color transition timing | 700ms transition on theme change |

---

## Integration with Other Frameworks

| Framework | How Terry Uses It |
|-----------|-------------------|
| **MAPX** | Terry reads route structure to know what to test |
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
| Before deploying to Vercel | `run Terry full` |
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
> Every route. Every color. Every viewport.
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
| `Network request failed` | Check API endpoint or dev server is running |

### Health Check Errors
| Error Pattern | Proposed Fix |
|---------------|--------------|
| `500 Internal Server Error` | Check API route handler and database queries |
| `404 Not Found` | Verify route exists in `app/` directory |
| `ECONNREFUSED` | Server not running - start with `npm run dev` |

---

## Report Output

Terry saves a JSON report to `terry-report.json` with full details of every test run.

```json
{
  "mode": "standard",
  "timestamp": "2026-02-28T07:30:00.000Z",
  "duration": 25000,
  "passed": 3,
  "failed": 2,
  "total": 5,
  "results": [...],
  "failures": [
    {
      "category": "e2e",
      "title": "Color Switcher > select purple",
      "file": "tests/e2e/mobile.spec.ts",
      "line": 28,
      "error": "Timeout waiting for selector",
      "codeSnippet": "...",
      "proposedFix": "Check that color switcher button is visible on mobile viewport..."
    }
  ]
}
```

---

## Future Enhancements

- [ ] Visual regression testing (Percy/Chromatic)
- [ ] Color theme regression (screenshot each of 5 themes)
- [ ] Bundle size monitoring
- [ ] Coverage reporting
- [ ] Lighthouse CI in GitHub Actions
- [ ] Slack/Discord notifications
- [ ] Duplicate issue detection (don't create same issue twice)
- [ ] Contact form submission E2E with test email

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 1.0 (Lost Monster Edition)
