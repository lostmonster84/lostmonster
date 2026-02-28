# CLAUDE-SUPPLEMENT.md

> **Deep Reference Document**
> This file contains detailed context, frameworks, and infrastructure docs.
> For core principles and quick reference, see [CLAUDE.md](../CLAUDE.md)
>
> **Updated**: YYYY-MM-DD

---

## TABLE OF CONTENTS

1. [Auto-Context Loading](#auto-context-loading) - Domain triggers
2. [Modern UX Patterns](#modern-ux-patterns-mandatory) - Detailed implementation patterns
3. [Auth & Signup Patterns](#auth--signup-patterns) - Authentication implementation
4. [Infrastructure](#infrastructure) - Deployment details, CLI, env vars
5. [CLI Tools](#cli-tools) - Platform CLI, issue tracker, permissions
6. [Testing](#testing) - E2E testing setup and commands
7. [Code Patterns](#code-patterns-critical) - Auth, DB, UI, email patterns
8. [Detailed Project Structure](#detailed-project-structure) - Full directory tree
9. [Framework Suite](#framework-suite) - All framework documentation
10. [The Workers](#the-workers) - Quality gate workers (see also [PROTOCOL.md](PROTOCOL.md))
11. [TODO System](#todo-system) - Task management
12. [Documentation Index](#documentation-index) - All project docs

---

## AUTO-CONTEXT LOADING

> **When James says "Working on [SECTION]", automatically load relevant context.**

| Trigger | Auto-Scan |
|---------|-----------|
| "Working on [PROJECT]" | `docs/MASTER-REFERENCE.md`, scan all domain STATUS.md files |
| "Working on [Public App]" | `[APP-PUBLIC]/docs/STATUS.md`, `[APP-PUBLIC]/docs/ROUTES.md`, `[APP-PUBLIC]/docs/PAGES.md` |
| "Working on [Admin App]" | `[APP-ADMIN]/docs/STATUS.md`, `[APP-ADMIN]/docs/ROUTES.md`, `[APP-ADMIN]/docs/PAGES.md` |
| "Working on API" | `[APP-API]/docs/API.md` |

**What to do:**
1. Run `date` for accurate greeting
2. Read relevant docs/status files
3. Give energised greeting with context summary
4. Ask "What are we tackling?"

---

## MODERN UX PATTERNS (MANDATORY)

> **Quick reference in [CLAUDE.md](../CLAUDE.md)** - This section has full implementation details.

These patterns are **required** for all admin/dashboard interfaces. No exceptions.

### Reorderable Lists

**Always use drag & drop** - never up/down arrow buttons.

```
BAD:  [Item] [up] [down] [Edit] [Delete]
GOOD: [drag handle] [Item] -----------------> [Delete]
      (click row to edit)
```

- Use `@dnd-kit/core` + `@dnd-kit/sortable` for React drag-drop
- Include a drag handle (grip icon) on the left
- Visual feedback: lift effect, shadow, drop zone highlight
- Persist order to database on drop

### Clickable Rows

**The whole row is the click target** - not a tiny edit icon.

- Row click opens detail/edit modal or navigates to detail page
- Add hover state: `cursor-pointer`, subtle background change
- **Exception**: Delete button must NOT trigger row click (use `stopPropagation`)

### Action Buttons

- Keep destructive actions (delete) as separate buttons
- Never trigger delete from row click
- **Use confirmation modals** for destructive actions, not `window.confirm()`
- Hover states on all interactive elements

### Data Tables

- Click row to view/edit details
- Checkbox column on left for bulk actions (if needed)
- Actions column on right (delete only - edit is row click)
- Sortable columns where it makes sense
- Loading skeletons, not spinners

### Auto-Save (Optimistic UI)

**No save buttons** - changes apply immediately.

```
BAD:  Edit -> Make changes -> Click "Save" -> Wait -> "Saved!"
GOOD: Edit -> Make changes -> checkmark (instant feedback, already saved)
```

- Changes persist on blur or selection (no explicit save action)
- Show subtle confirmation (checkmark, toast, or green flash)
- Use optimistic updates - update UI immediately, sync to server in background
- Handle errors gracefully with undo option

**Implementation:**
```typescript
const handleChange = async (value: string) => {
  setLocalValue(value)  // Update UI immediately
  try {
    await saveToServer(value)  // Sync in background
  } catch {
    setLocalValue(previousValue)  // Rollback on error
    toast.error('Failed to save')
  }
}
```

---

## AUTH & SIGNUP PATTERNS

### Frictionless Signup

**Never block user momentum during signup.** Email verification happens at action points, not account creation.

```
BAD:  Signup -> "Check email to continue" -> WAIT -> Click link -> Continue
GOOD: Signup -> Immediate access -> Soft verification at action point
```

**Implementation:**
1. **Signup**: User signs up -> immediately logged in -> proceeds to onboarding/app
2. **Email sent**: Verification email sent in background (user doesn't wait)
3. **Soft gate**: Check `user.emailVerified` before sensitive actions
4. **When unverified**: Show friendly "Please verify your email" message with action blocked

**Where to add soft gates:**
- Before creating content/[entity-primary]
- Before making purchases
- Before accessing premium features
- NOT on: browsing, profile setup, onboarding, dashboard access

---

## INFRASTRUCTURE

### Services

| Service | What |
|---------|------|
| **App** | [Framework] ([APP-API]/) |
| **Database** | [DATABASE] |
| **Storage** | [OBJECT-STORAGE] |

### Domain

| URL | Routes |
|-----|--------|
| `[PROJECT-URL]` | All routes |
| `/` | Public (marketing) |
| `/admin/*` | Admin dashboard |

### Deployment

[Describe your deployment process — push to main, CI/CD, etc.]

### Local Development

```bash
# Dev server
[dev-command]                    # Runs on http://localhost:[PORT]

# With env vars (if needed)
[env-run-command] [dev-command]  # Injects environment variables
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Database connection string |
| `[STORAGE-PUBLIC-URL]` | Storage CDN URL |
| `[PAYMENT-SERVICE]_SECRET_KEY` | Payment API key |
| `[EMAIL-SERVICE]_API_KEY` | Email service key |

---

## CLI TOOLS

### [HOSTING-PROVIDER] CLI

```bash
# Common commands for your hosting platform
[list common CLI commands here]
```

### [ISSUE-TRACKER] Integration

[Describe how your issue tracker integrates — CLI, MCP, API, etc.]

### Claude Code Permissions

Auto-allow common tools without prompting. Edit `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(git:*)",
      "Bash(node:*)",
      "WebFetch"
    ]
  }
}
```

---

## TESTING

### Key Rules

1. **Use bundled browser** — Playwright downloads and manages its own Chromium binary
2. **Headless by default** — `headless: true` in config. Use `--headed` flag for visual debugging
3. **Install browsers** — after fresh clone, run `npx playwright install chromium`

### Commands

```bash
npx playwright test                          # Run all tests (headless)
npx playwright test --headed                 # Run with visible browser
npx playwright test --ui                     # Interactive UI mode
npx playwright test --project=mobile         # Mobile tests only
npx playwright test --project=desktop        # Desktop tests only
npx playwright install chromium              # Install/update bundled browser
```

### On New Machines

```bash
[package-manager] install              # Install deps
npx playwright install chromium        # Download bundled Chromium
[dev-command]                          # Start dev server
npx playwright test                    # Run tests
```

---

## CODE PATTERNS (CRITICAL)

> These patterns are learned from real bugs. Follow them exactly.

### Auth & Session

```typescript
// [Describe your auth patterns here]
// e.g. session retrieval, user ID access, role checks
```

### Database

```typescript
// [Describe your database query patterns here]
// e.g. ORM usage, raw queries, transaction patterns
```

### UI Patterns

```typescript
// [Describe your UI patterns here]
// e.g. card classes, delete patterns, Next.js param handling
```

---

## DETAILED PROJECT STRUCTURE

```
[project-root]/
├── [APP-PUBLIC]/             # Public-facing components & lib
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── docs/                 # STATUS.md, ROUTES.md, PAGES.md
├── [APP-ADMIN]/              # Admin components & lib
│   ├── components/
│   ├── hooks/
│   └── docs/
├── [APP-API]/                # Routes / API
│   ├── src/app/
│   └── docs/
├── packages/
│   ├── shared/               # Auth, DB, Email, Storage
│   └── ui/                   # Shared UI primitives
├── scripts/                  # Utility scripts
├── docs/                     # Documentation
├── .ai/PROTOCOL.md           # Full execution protocol
├── .ai/crew/                 # The Gaffer + all worker playbooks
├── .ai/gaffer/               # Runtime state
└── CLAUDE.md                 # Core principles
```

---

## FRAMEWORK SUITE

**CRITICAL: BUILD first, explain second.**
Frameworks that create artifacts must CREATE them - not describe them in chat.

| Framework | Deliverable | NOT Acceptable |
|-----------|-------------|----------------|
| **DEMX** | Live demo page at `/demo/[feature]-variations/` | ASCII mockups in chat |
| **PLANX** | Written plan file in `.claude/plans/` | Plan described in chat |
| **CRUDX** | Actual database + API + UI code | Description of what to build |
| **MAPX** | Documentation files in `docs/mapx/` | Route list in chat |

**The artifact IS the deliverable.**

### Available Frameworks

| Framework | Purpose | Command |
|-----------|---------|---------|
| **MAPX** | Application mapping + living audit | `MAPX` or `MAPX: [page]` |
| **CONSTX** | UI consistency scanning | `run CONSTX on [page/component]` |
| **CONNECTX** | System connectivity verification | `run CONNECTX` |
| **HARDCODEX** | Hardcoded value detection & CRUD conversion | `run HARDCODEX` |
| **PLANX** | Execution blueprints | `PLANX: [feature]` |
| **PIXELX** | Pixel-perfect implementation | `run PIXELX` |
| **CRUDX** | CRUD scaffolding | `CRUDX: [entity]` |
| **APEX** | All-Protocol EXecution | `APEX: [feature]` |
| **BULLETPROOF** | QA verification loop | `run BULLETPROOF` |

### BULLETPROOF — QA Verification Framework

**BULLETPROOF is the mandatory QA gate before any feature reaches James.** It runs automatically after every feature or fix.

| Step | Name | What |
|------|------|------|
| 1 | **Build** | Write the code, get it compiling |
| 2 | **Playwright Pass 1** | Run Playwright tests. Screenshots saved for review |
| 3 | **Edge Cases** | Missing data, empty states, loading, errors, roles |
| 4 | **Consistency Check** | Match existing patterns (CONSTX-style) |
| 5 | **AIDA Check** | Attention/Interest/Desire/Action — does the UX flow? |
| 6 | **AI Slop Test** | Every element must pass Provenance Rule + red flags |
| 7 | **Fix Issues** | Address anything found in steps 3-6 |
| 8 | **Playwright Pass 2** | Re-run tests after fixes |
| 9 | **PRE-PRESENT GATE** | Review Card with scores, Gaffer verdict |
| 10 | **Present to James** | Screenshots + summary + decisions/trade-offs |
| 11 | **Wait for approval** | NO git, NO issues until James says ship it |
| 12 | **Commit + Close** | Only after the green light |

---

## THE WORKERS

> **Workers are quality checkers, builders, and planners. One vocabulary, one concept.**
> **Full protocol:** [PROTOCOL.md](PROTOCOL.md) | **Gaffer deep ref:** [GAFFER.md](crew/GAFFER.md)

| Worker | Identity | Title | Key Question |
|--------|----------|-------|--------------|
| **The Gaffer** | — | Chief Performance Director | "Is this machine running properly?" |
| **NIGELX** | [TEST-PERSONA] | Chief Simplicity Officer | "Can I find it?" |
| **AIDAX** | Aida Sterling | Chief Conversion Officer | "Will they convert?" |
| **SOFAX** | Sophia Kerr | Chief Design Officer | "Is this beautiful?" |
| **PIXLX** | Pixie Edge | Chief Quality Officer | "What if it breaks?" |
| **CODAX** | Cody Cross | Chief Planning Officer | "What's the plan?" |
| **PETRAX** | Petra Stone | Chief Operations Officer | "Is every step clear?" |
| **TERRX** | Terry Stone | Chief Quality Engineer | "Does it actually work?" |

**The Hierarchy:**
```
                    THE GAFFER (manages all)
                         |
CODAX -> PETRAX -> SOFAX -> NIGELX -> AIDAX -> PIXLX -> TERRX -> Gaffer sign-off -> Present to James.
```

**Scoring Targets:**
- NIGELX: 85+ / 100 (usability)
- AIDAX: 80+ / 100 (conversion)
- SOFAX: 93+ / 110 (design)
- PIXLX: 85+ / 100 (quality)

**Brand Compliance Chain:** [[DESIGN-GUIDE-PATH]]([DESIGN-GUIDE-PATH]) + [[SLOP-TEST-PATH]]([SLOP-TEST-PATH]) are enforced at every phase. See [PROTOCOL.md](PROTOCOL.md#brand-compliance-chain).

---

## TODO SYSTEM

**Per-domain TODO files for focused work sessions.**

**Structure:**
```
docs/TODO.md                         <- Master (dashboard view)
[APP-ADMIN]/docs/TODO.md             <- Admin work
[APP-PUBLIC]/docs/TODO.md            <- Public site
[APP-API]/docs/TODO.md               <- API/infra level
```

**Rules:**
1. **Domain TODOs are source of truth** - each app maintains its own TODO.md
2. **Master is a dashboard** - links to domains, shows counts, highlights priorities
3. **Categorise by user journey, not code location**

**TODO Format:**
```markdown
## Critical
- [ ] **Task title**
  - Context/why it matters
  - File: `path/to/file.ts` line X
  - Impact: What breaks if not fixed

## High Priority
- [ ] **Task title**
  - Details...

## Completed
*Move items here when done.*
```

---

## DOCUMENTATION INDEX

### Shared (Root /docs/)
| Purpose | Location |
|---------|----------|
| **Master TODO** | [docs/TODO.md](../docs/TODO.md) |
| **Master Reference** | [docs/MASTER-REFERENCE.md](../docs/MASTER-REFERENCE.md) |
| **Database Schema** | [docs/DATABASE.md](../docs/DATABASE.md) |
| **Design Guide** | [[DESIGN-GUIDE-PATH]](../[DESIGN-GUIDE-PATH]) |
| **Protocol** | [.ai/PROTOCOL.md](PROTOCOL.md) |

### Per-Domain Documentation

| Domain | TODO | Status | Routes | Pages |
|--------|------|--------|--------|-------|
| **Public** | [TODO.md](../[APP-PUBLIC]/docs/TODO.md) | [STATUS.md](../[APP-PUBLIC]/docs/STATUS.md) | [ROUTES.md](../[APP-PUBLIC]/docs/ROUTES.md) | [PAGES.md](../[APP-PUBLIC]/docs/PAGES.md) |
| **Admin** | [TODO.md](../[APP-ADMIN]/docs/TODO.md) | [STATUS.md](../[APP-ADMIN]/docs/STATUS.md) | [ROUTES.md](../[APP-ADMIN]/docs/ROUTES.md) | [PAGES.md](../[APP-ADMIN]/docs/PAGES.md) |
| **API** | [TODO.md](../[APP-API]/docs/TODO.md) | [API.md](../[APP-API]/docs/API.md) | - | - |

---

*This supplement file contains detailed reference material.*
*For core principles, see [CLAUDE.md](../CLAUDE.md)*
*Last updated: YYYY-MM-DD*
