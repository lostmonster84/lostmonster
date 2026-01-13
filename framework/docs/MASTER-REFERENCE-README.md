# 🏠 LOSTMONSTER - MASTER REFERENCE FOLDER

> **This is your master folder. Copy from here to bootstrap new projects.**

---

## What This Folder Contains

| Resource | Path | Purpose |
|----------|------|---------|
| **CLAUDE Template** | [MASTER-CLAUDE-TEMPLATE.md](MASTER-CLAUDE-TEMPLATE.md) | Copy to new projects as `CLAUDE.md` |
| **Admin Backend Reference** | [docs/ADMIN-MASTER-REFERENCE.md](docs/ADMIN-MASTER-REFERENCE.md) | Colors, components, API patterns, delete-undo |
| **Universal Framework** | [universal-framework/](universal-framework/) | 18 reusable frameworks |
| **Framework Map** | [universal-framework/.ai/frameworks/FRAMEWORK-MAP.md](universal-framework/.ai/frameworks/FRAMEWORK-MAP.md) | Which framework to use when |

---

## Quick Start for New Projects

### 1. Copy CLAUDE.md Template
```bash
cp /Users/james/Projects/lostmonster/MASTER-CLAUDE-TEMPLATE.md /path/to/new-project/CLAUDE.md
```
Then customize the `[PROJECT NAME]` and project-specific sections.

### 2. Copy Universal Framework
```bash
cp -R /Users/james/Projects/lostmonster/universal-framework /path/to/new-project/
```

### 3. Reference Admin Patterns
When building admin dashboards, reference:
- [docs/ADMIN-MASTER-REFERENCE.md](docs/ADMIN-MASTER-REFERENCE.md) - Full code patterns
- Copy components directly from the reference

---

## Framework Suite

| Framework | Command | Use For |
|-----------|---------|---------|
| **CONSTX** | `run CONSTX on [file]` | UI consistency audits |
| **CONNECTX** | `run CONNECTX` | System connectivity checks |
| **HARDCODEX** | `run HARDCODEX` | Find hardcoded values |
| **PLANX** | `PLANX: [feature]` | Implementation planning |
| **PIXELX** | `run PIXELX` | Pixel-perfect implementation |
| **CRUDX** | `CRUDX: [entity]` | CRUD scaffolding |
| **APEX** | `APEX: [endpoint]` | API design |
| **RAPID** | `RAPID: [prototype]` | Quick prototypes |

---

## Admin Dashboard Essentials

The [ADMIN-MASTER-REFERENCE.md](docs/ADMIN-MASTER-REFERENCE.md) contains:

- **Colors** - CSS variables, semantic utilities, badge classes
- **Typography** - Poppins setup, weights, sizes
- **Components** - Cards, buttons, inputs, glass effect
- **Delete + Undo** - `CountdownRing` + `deleteWithCountdown` full code
- **Modal** - Accessible modal with Framer Motion
- **ConfirmDialog** - Danger/warning/default variants
- **Theme Context** - Light/dark/system toggle
- **Animations** - Cinema easing, spring physics
- **API Patterns** - CRUD routes with Next.js 15
- **Auth Helpers** - `requireAuth`, `requireApiAuth`

---

## Keep This Updated

When you build something new and reusable:

1. **Add it to this folder**
2. **Update the reference docs**
3. **Future projects benefit**

---

**This is your single source of truth for starting new projects.**

*Last synced: January 12, 2026*
