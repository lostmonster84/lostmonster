# Lost Monster - Monorepo

> **Personal Brand Website + Universal Development Framework**

---

## Repository Structure

```
lostmonster/
├── website/              # Lost Monster marketing website
│   ├── CLAUDE.md         # Website-specific AI instructions
│   ├── .ai/              # Design system & project docs
│   ├── app/              # Next.js 15 App Router
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── public/           # Static assets
│
├── framework/            # Universal development framework
│   ├── CLAUDE.md         # Framework AI instructions
│   ├── START-HERE.md     # Quick orientation
│   ├── .ai/frameworks/   # 20 planning frameworks
│   ├── agents/           # AI agents
│   ├── templates/        # Project templates
│   ├── docs/             # Reference docs
│   └── utilities/        # Scripts & helpers
│
└── CLAUDE.md             # This file (repo overview)
```

---

## Quick Start

### Website Development

```bash
cd website
npm install
npm run dev
# Open http://localhost:3000
```

**Read:** [website/CLAUDE.md](./website/CLAUDE.md) for design system.

### Using Frameworks

**Read:** [framework/START-HERE.md](./framework/START-HERE.md) for quick orientation.

**Full Guide:** [framework/HOW-TO-USE.md](./framework/HOW-TO-USE.md)

---

## Framework Quick Reference

| Framework | Purpose | Trigger |
|-----------|---------|---------|
| **APEX** | Meta-framework for complete systems | `APEX: [feature]` |
| **CODA** | Strategic planning | `plan with CODA` |
| **PLANX** | Execution blueprint | `PLANX: [feature]` |
| **AIDA** | Content conversion | `run AIDA` |
| **SOPHIA** | Design quality audit | `run SOPHIA` |
| **TOUCH** | Mobile-native transform | `TOUCH` |
| **CRUDX** | Full-stack content management | `CRUDX` |
| **DEMX** | Rapid design variations | `DEMX: [element]` |
| **AUDITX** | System health audit | `run AUDITX` |
| **PIXELX** | Pixel-perfect bug hunting | `run PIXELX` |
| **MAPX** | Application mapping | `run MAPX` |
| **CONSTX** | UI consistency scanner | `run CONSTX` |
| **DESKX** | Desktop optimization | `run DESKX` |

**Full list:** [framework/.ai/frameworks/FRAMEWORK-MAP.md](./framework/.ai/frameworks/FRAMEWORK-MAP.md)

---

## Copy to New Project

```bash
# Copy entire framework
cp -R ~/Projects/lostmonster/framework ~/Projects/new-project/

# Or just the AI frameworks
cp -R ~/Projects/lostmonster/framework/.ai ~/Projects/new-project/
```

---

## What's What

| Folder | Purpose | Start Here |
|--------|---------|------------|
| `website/` | Lost Monster marketing site | [website/CLAUDE.md](./website/CLAUDE.md) |
| `framework/` | 20 reusable frameworks + templates | [framework/START-HERE.md](./framework/START-HERE.md) |

---

**License:** Proprietary - Lost Monster
