# Lost Monster - Monorepo

> **Personal Brand + Universal Framework**

This repository contains two main sections:

---

## Repository Structure

```
lostmonster/
├── website/          # Lost Monster marketing website (Next.js)
│   ├── CLAUDE.md     # ← Website-specific AI instructions
│   ├── .ai/          # Website design system & docs
│   ├── app/          # Next.js app router
│   ├── components/   # React components
│   └── ...
│
├── framework/        # Universal development framework
│   ├── CLAUDE.md     # ← Framework AI instructions
│   ├── .ai/          # AI development standards
│   ├── agents/       # AI agents (project-spin-up, etc.)
│   ├── templates/    # Project templates
│   ├── docs/         # Admin reference, guides
│   └── ...
│
└── CLAUDE.md         # This file (repo overview)
```

---

## Quick Start

### Working on the Website
```bash
cd website
npm install
npm run dev
```
**Read:** [website/CLAUDE.md](./website/CLAUDE.md) for design system and guidelines.

### Using the Framework
**Read:** [framework/README.md](./framework/README.md) for available templates and tools.

---

## What's What

| Folder | Purpose | Start Here |
|--------|---------|------------|
| `website/` | Lost Monster marketing site | [website/CLAUDE.md](./website/CLAUDE.md) |
| `framework/` | Universal templates & tools | [framework/START-HERE.md](./framework/START-HERE.md) |

---

## For AI Assistants

**If working on the website:** Read [website/CLAUDE.md](./website/CLAUDE.md) first.

**If using framework templates:** Read [framework/CLAUDE.md](./framework/CLAUDE.md) first.

**Key principle:** Website-specific vs. universal content are now clearly separated.
