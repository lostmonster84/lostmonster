# CLAUDE-SUPPLEMENT.md

> **Deep Reference Document**
> This file contains detailed context, frameworks, and infrastructure docs.
> For core principles and quick reference, see [CLAUDE.md](../../CLAUDE.md)
>
> **Updated**: 2026-03-24

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
| "Working on Lost Monster" | Scan all sections, check git status across website + dashboard |
| "Working on website" | `website/CLAUDE.md`, `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, `website/.ai/DOMAIN-KNOWLEDGE.md` |
| "Working on dashboard" | `dashboard/apps/web/`, `dashboard/.ai/DARKX-IMPLEMENTATION-CHECKLIST.md`, `dashboard/apps/web/.env.local` |
| "Working on ancarraig" | `dashboard/apps/web/src/app/ancarraig/`, Ancarraig API routes, calculator logic |
| "Working on framework" | `framework/CLAUDE.md`, `framework/START-HERE.md` |
| "Working on API" | `dashboard/apps/web/src/app/api/`, database package |

**What to do:**
1. Run `date` for accurate greeting
2. Read relevant docs/status files
3. Give energised greeting with context summary
4. Ask "What are we tackling?"

---

## MODERN UX PATTERNS (MANDATORY)

> **Quick reference in [CLAUDE.md](../../CLAUDE.md)** - This section has full implementation details.

These patterns are **required** for all admin/dashboard interfaces. No exceptions.

### Reorderable Lists

**Always use drag & drop** - never up/down arrow buttons.

```
BAD:  [Item] [up] [down] [Edit] [Delete]
GOOD: [drag handle] [Item] -----------------> [Delete]
      (click row to edit)
```

- Use `@hello-pangea/dnd` for React drag-drop (already in dashboard deps)
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
- Show subtle confirmation (checkmark, toast via Sonner, or green flash)
- Use optimistic updates - update UI immediately, sync to server in background
- Handle errors gracefully with undo option

---

## AUTH & SIGNUP PATTERNS

### NextAuth v5 (Beta) — Credentials + JWT + Cross-Origin

**Website** (NextAuth 5.0.0-beta.30):
- Credentials provider with bcryptjs password hashing
- JWT session strategy
- Cross-origin token generation (HMAC-SHA256) for dashboard handoff

**Dashboard** (NextAuth 5.0.0-beta.25):
- Credentials provider + cross-origin token exchange
- Login page: `/login`
- Token exchange: `/api/auth/token-login`
- Auto-login: `/auto-login` (from website → dashboard flow)
- Middleware-based route protection with redirect logic

**Cross-Origin Auth Flow:**
1. User logs in on website (`lostmonster.com`)
2. Website generates HMAC-SHA256 token with user ID + timestamp
3. User clicks dashboard link → redirected with token
4. Dashboard `/api/auth/token-login` validates token, creates session
5. User is seamlessly logged into dashboard

**Frictionless Signup:**
- Signup → immediate access → soft verification at action points
- Don't block on: browsing, profile setup, onboarding, dashboard access

---

## INFRASTRUCTURE

### Services

| Service | What |
|---------|------|
| **Website** | Next.js 15 (`website/`) — port 3000 |
| **Dashboard** | Next.js 15.1 Turborepo (`dashboard/apps/web/`) — port 3001 |
| **Database** | Neon PostgreSQL (serverless) |
| **Email** | Resend (`contact@lostmonster.io`) |
| **CAPTCHA** | Cloudflare Turnstile |
| **AI** | Anthropic SDK |

### Domain

| URL | Routes |
|-----|--------|
| `lostmonster.com` | Website — `/`, `/about`, `/services`, `/case-studies`, `/contact`, `/demo`, `/process`, `/faq`, `/apps` |
| `lostmonster.com/m/*` | Mobile TikTok-style experience (auto-redirected) |
| Dashboard URL | `/`, `/login`, `/ancarraig/*`, `/tasks`, `/settings` |

### Deployment

- **Hosting**: Vercel (both website and dashboard)
- **Database**: Neon PostgreSQL (connection string in `dashboard/apps/web/.env.local`)
- **Push to main** triggers deployment

### Local Development

```bash
# Website
cd website
npm install
npm run dev                    # http://localhost:3000

# Dashboard
cd dashboard
pnpm install
pnpm dev                       # http://localhost:3001 (Turbopack)

# Database migrations
cd dashboard
DATABASE_URL="<from .env.local>" node scripts/run-migration.js
DATABASE_URL="<from .env.local>" node scripts/run-seed.js
```

### Environment Variables

**Website** (`.env`):
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Site URL (`https://lostmonster.com`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret |
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_EMAIL_FROM` | Sender (`contact@lostmonster.io`) |
| `CONTACT_EMAIL_TO` | Recipient (`hello@lostmonster.io`) |

**Dashboard** (`.env.local`):
| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret |
| `NEXTAUTH_URL` | Dashboard URL |
| `ANTHROPIC_API_KEY` | Claude API key |

---

## CLI TOOLS

### Vercel CLI

```bash
vercel                         # Deploy preview
vercel --prod                  # Deploy production
vercel env pull                # Pull env vars
vercel logs                    # View logs
```

### pnpm (Dashboard)

```bash
pnpm dev                       # Dev server with Turbopack
pnpm build                     # Production build
pnpm lint                      # ESLint
pnpm type-check                # TypeScript check (tsc --noEmit)
```

### Claude Code Permissions

Auto-allow common tools without prompting. Edit `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(pnpm:*)",
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

---

## CODE PATTERNS (CRITICAL)

> These patterns are learned from real bugs. Follow them exactly.

### Auth & Session

```typescript
// Dashboard auth (NextAuth v5)
import { auth } from "@/lib/auth/config"

// In server components / API routes
const session = await auth()
const userId = session?.user?.id

// Middleware protection (dashboard/apps/web/src/middleware.ts)
// Redirects unauthenticated users to /login
```

### Database

```typescript
// Neon serverless client
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)
const result = await sql`SELECT * FROM table WHERE id = ${id}`

// Raw SQL — no ORM. Parameterised queries always.
```

### UI Patterns

```typescript
// Dashboard uses semantic DARKX tokens
// bg-background, text-foreground, bg-primary, text-primary-foreground, etc.
// Dark mode: class strategy via ThemeProvider

// Website uses dynamic colour theming
// Colours set via JavaScript state, applied as Tailwind classes
// Font: Outfit (headings) + Inter (body)

// Toast notifications via Sonner
import { toast } from "sonner"
toast.success("Done!")

// Drag and drop via @hello-pangea/dnd
```

---

## DETAILED PROJECT STRUCTURE

```
lostmonster/
├── website/                          # Marketing site
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/
│   │   ├── case-studies/
│   │   ├── contact/
│   │   ├── services/
│   │   ├── demo/
│   │   ├── process/
│   │   ├── faq/
│   │   ├── apps/                     # Cross-origin login to dashboard
│   │   └── m/                        # Mobile TikTok experience
│   ├── components/
│   ├── .ai/                          # 15 design system docs
│   │   ├── LOST-MONSTER-DESIGN-SYSTEM.md
│   │   ├── DOMAIN-KNOWLEDGE.md
│   │   ├── DESIGN-DECISIONS.md
│   │   ├── QUALITY-SCORES.md
│   │   └── brand/
│   ├── CLAUDE.md
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── package.json
├── dashboard/                        # Admin dashboard (Turborepo)
│   ├── apps/web/                     # Main dashboard app
│   │   ├── src/app/
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   ├── login/
│   │   │   ├── auto-login/
│   │   │   ├── ancarraig/            # Lodges management
│   │   │   ├── tasks/                # Kanban task board
│   │   │   ├── settings/
│   │   │   └── api/                  # API routes
│   │   │       ├── auth/
│   │   │       ├── ancarraig/
│   │   │       ├── tasks/
│   │   │       └── audit-logs/
│   │   ├── src/lib/auth/
│   │   ├── src/components/
│   │   └── tailwind.config.ts
│   ├── packages/
│   │   ├── ui/                       # @lostmonster/ui
│   │   ├── database/                 # @lostmonster/database (Neon)
│   │   └── config/                   # Shared ESLint + TS config
│   ├── turbo.json
│   ├── pnpm-workspace.yaml
│   └── package.json
├── framework/                        # Universal dev framework
│   ├── agents/
│   ├── templates/
│   ├── docs/
│   └── CLAUDE.md
├── .ai/thefirm/                      # The Firm quality orchestration
│   ├── PROTOCOL.md
│   ├── FIRM-CONTEXT.md
│   ├── CLAUDE-SUPPLEMENT.md          # This file
│   ├── crew/
│   │   ├── GAFFER.md
│   │   ├── FOREMAN.md
│   │   ├── TRAINX-travis-forge.md
│   │   ├── researchers/
│   │   ├── planners/
│   │   ├── builders/
│   │   ├── reviewers/
│   │   └── checkers/
│   ├── gaffer/
│   │   ├── session-log.md
│   │   ├── debts.md
│   │   ├── calibration.md
│   │   ├── evolution.md
│   │   └── inspections/
│   └── lessons/
└── CLAUDE.md                         # Core project instructions
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
| **ALLYX** | Accessibility audit | `run ALLYX on [page/component]` |
| **STANX** | Security audit | `run STANX` |
| **BLAZX** | Performance audit | `run BLAZX on [page]` |
| **RIGX** | Infrastructure setup | `RIGX: [service]` or `RIGX: setup` |
| **BULLETPROOF** | QA verification loop | `run BULLETPROOF` |

> Workers, hierarchy, scoring, BULLETPROOF: see [FIRM-CONTEXT.md](FIRM-CONTEXT.md)

**Brand Compliance Chain:** [website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md](../../website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md) is enforced at every phase. See [PROTOCOL.md](PROTOCOL.md#brand-compliance-chain).

---

## TODO SYSTEM

**Per-domain TODO files for focused work sessions.**

**Structure:**
```
docs/TODO.md                         <- Master (dashboard view)
website/docs/TODO.md                 <- Website work
dashboard/docs/TODO.md               <- Dashboard work
framework/docs/TODO.md               <- Framework work
```

**Rules:**
1. **Domain TODOs are source of truth** - each app maintains its own TODO.md
2. **Master is a dashboard** - links to domains, shows counts, highlights priorities
3. **Categorise by user journey, not code location**

---

## DOCUMENTATION INDEX

### Design & Brand
| Purpose | Location |
|---------|----------|
| **Design System** | [website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md](../../website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md) |
| **Design Decisions** | [website/.ai/DESIGN-DECISIONS.md](../../website/.ai/DESIGN-DECISIONS.md) |
| **Domain Knowledge** | [website/.ai/DOMAIN-KNOWLEDGE.md](../../website/.ai/DOMAIN-KNOWLEDGE.md) |
| **Quality Scores** | [website/.ai/QUALITY-SCORES.md](../../website/.ai/QUALITY-SCORES.md) |
| **DARKX Checklist** | [dashboard/.ai/DARKX-IMPLEMENTATION-CHECKLIST.md](../../dashboard/.ai/DARKX-IMPLEMENTATION-CHECKLIST.md) |

### The Firm
| Purpose | Location |
|---------|----------|
| **Protocol** | [.ai/thefirm/PROTOCOL.md](PROTOCOL.md) |
| **Firm Context** | [.ai/thefirm/FIRM-CONTEXT.md](FIRM-CONTEXT.md) |
| **Evolution Log** | [.ai/thefirm/gaffer/evolution.md](gaffer/evolution.md) |
| **Session Log** | [.ai/thefirm/gaffer/session-log.md](gaffer/session-log.md) |
| **Debts** | [.ai/thefirm/gaffer/debts.md](gaffer/debts.md) |

### Per-Section Instructions
| Section | Instructions |
|---------|-------------|
| **Website** | [website/CLAUDE.md](../../website/CLAUDE.md) |
| **Framework** | [framework/CLAUDE.md](../../framework/CLAUDE.md) |

---

*This supplement file contains detailed reference material.*
*For core principles, see [CLAUDE.md](../../CLAUDE.md)*
*Last updated: 2026-03-24*
