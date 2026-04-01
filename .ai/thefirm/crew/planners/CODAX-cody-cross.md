# CODAX Planning Framework

> **C**ontext - **O**bjective - **D**etails - **A**cceptance
>
> A thinking methodology for planning Lost Monster features.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[HOSTING-PROVIDER]` | Vercel | CLAUDE.md |
| `[BRAND-PRIMARY]` | #06B6D4 (teal) | CLAUDE.md |
| `[BRAND-BG]` | Dark/black backgrounds | CLAUDE.md |
| `[BRAND-DARK]` | Dark theme with glassmorphism | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
| `[MAP-SERVICE]` | | |
| `[TARGET-USER-A]` | Graduate Grace (21, hospitality grad, non-technical) | CLAUDE.md |
| `[TARGET-USER-B]` | SMB owners and startup founders seeking web development | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**CODAX for Lost Monster** structures feature planning using Context-Objective-Details-Acceptance methodology. The monorepo spans three products: the marketing website (Next.js 15, port 3000), the admin dashboard (Turborepo, port 3001), and the universal dev framework (templates + docs).

All features must account for the Graduate Grace test persona, the 5-colour dynamic theme system, and the dark-first design philosophy documented in `website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md`.
---

## When to Use CODAX

✅ **Use CODAX for:**
- New features
- Dashboard sections
- Content flows (create, edit, manage)
- Management features
- Landing pages
- Anything touching multiple files

❌ **Skip CODAX for:**
- Simple bug fixes
- Single-file style changes
- Obvious, trivial tasks
- Emergency hotfixes

---

## CODAX for Lost Monster Features

### Light CODAX (Default)

**Think in CODAX dimensions, communicate conversationally:**

> "I see we need to add [feature] (context). The goal is [objective]. I'm thinking [implementation details]. We'll verify [acceptance criteria]. Sound good?"

### Heavy CODAX (When Needed)

Write formal document when:
- User requests detailed plan
- Multiple stakeholders involved
- Major architectural decision
- Future reference needed

---

## CODAX Templates

### Template: Feature Planning

```markdown
# CODAX Plan: [Feature Name]

## C - CONTEXT
**Current State:**
- Current file paths and structure
- Existing database tables involved
- What exists vs what's missing

**Lost Monster Context:**
- Design system tokens (#06B6D4 (teal), Dark/black backgrounds, etc.)
- PRD alignment
- Target users (Graduate Grace (21, hospitality grad, non-technical), SMB owners and startup founders seeking web development)

## O - OBJECTIVE
**Primary Goal:** [one sentence]
**Secondary Goals:** [list]
**Why This Matters:** [user impact]

## D - DETAILS
**Layout:** [ASCII diagram]
**Implementation:** [technical details]
**API Changes:** [endpoints]
**Responsive:** [mobile behavior]

## A - ACCEPTANCE
**Success Metrics:**
- ✅ Functional requirements met
- ✅ Auth/access control working
- ✅ Mobile tested
- ✅ AIDAX score 80+
- ✅ SOFAX score 93+/110
- ✅ Brand compliance (SOFAX Dimension 11)
```

---

## CODAX Checklist

### Context Checklist
- [ ] Which app? (website/ (port 3000) / dashboard/apps/web/ (port 3001))
- [ ] Which database tables involved?
- [ ] Current file paths
- [ ] Design system tokens
- [ ] PRD alignment

### Objective Checklist
- [ ] Primary goal (one sentence)
- [ ] Why it matters for users
- [ ] How it supports PRD principles
- [ ] Success looks like what?

### Details Checklist
- [ ] Layout diagram (ASCII)
- [ ] API changes needed
- [ ] Components to build/modify
- [ ] Mobile behavior
- [ ] Auth / access control implications
- [ ] Type generation updates

### Acceptance Checklist
- [ ] Functional requirements met
- [ ] Auth / access control working
- [ ] Mobile tested
- [ ] Accessibility basics
- [ ] PRD principles upheld
- [ ] Framework scores (AIDAX 80+, SOFAX 93+/110)
- [ ] Brand compliance (SOFAX Dimension 11 — approved backgrounds, page rhythm, AI Slop provenance)

---

## CODAX Communication Style

**Good CODAX summary:**
> "The page needs [feature] (context). Goal: help users [objective] (objective). Implementation: [technical approach] (details). Done when: [criteria] (acceptance)."

**Bad CODAX summary:**
> "We should add a feature." (too vague)

---

## Quick Reference

| Entity | Typical CODAX Focus |
|--------|---------------------|
| **Projects** | CRUD, status, media, location |
| **Case Studies** | Forms, inbox, response tracking |
| **Clients** | Auth, preferences, saved items |

---

**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
