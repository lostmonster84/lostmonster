# Lost Monster Website - AI Configuration

> **Project-specific AI configuration for the Lost Monster website**
>
> This folder contains customized documentation for the Lost Monster website project.

**Design System:** Bold Personal Brand
**Last Updated:** November 10, 2025

---

## What's in This Folder

This `.ai/` folder contains **project-specific** configuration and documentation:

### Design System (ACTIVE ⭐)
- **[LOST-MONSTER-DESIGN-SYSTEM.md](./LOST-MONSTER-DESIGN-SYSTEM.md)** - **MAIN** - Complete Bold Personal Brand design system
- **[DESIGN-SYSTEM-SUMMARY.md](./DESIGN-SYSTEM-SUMMARY.md)** - Quick reference guide
- **[PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](./PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md)** - Quality checklist for Bold Personal Brand
- **[PRE-DESIGN-CHECKLIST.md](./PRE-DESIGN-CHECKLIST.md)** - Generic quality checklist (still valid)

### Business Context
- **[DOMAIN-KNOWLEDGE.md](./DOMAIN-KNOWLEDGE.md)** - Business context, target audience, value proposition
- **[CODA-WEBSITE.md](./CODA-WEBSITE.md)** - Complete CODA planning for website

### Design Process
- **[DESIGN-DECISIONS.md](./DESIGN-DECISIONS.md)** - Documented design rationale
- **[QUALITY-SCORES.md](./QUALITY-SCORES.md)** - Tracked design scores
- **[DESIGN-AUDIT.md](./DESIGN-AUDIT.md)** - Design audit results
- **[COLOR-PALETTES.md](./COLOR-PALETTES.md)** - Color palette explorations
- **[PREMIUM-DESIGN-IMPLEMENTATION.md](./PREMIUM-DESIGN-IMPLEMENTATION.md)** - Premium design approach
- **[TRANSFORMATION-COMPLETE.md](./TRANSFORMATION-COMPLETE.md)** - Transformation summary

### Brand Assets
- **[brand/](./brand/)** - Brand assets and visual identity

### Archived (OLD - Not Currently Used)
- **[archived/](./archived/)** - Previous design explorations
  - SCANDI-SCOT-ALIGNED.md - Different aesthetic (not chosen)
  - TECH-DESIGN-PRINCIPLES.md - Too technical (not chosen)
  - BALANCED-DESIGN-PRINCIPLES.md - Exploration (not implemented)

---

## Design System: Bold Personal Brand

**What Lost Monster actually built:**

### Core Aesthetic
- **Dark backgrounds** with gradients (drama and focus)
- **Massive typography** (60-128px) - bold and unforgettable
- **Dynamic color theming** - 5 user-selectable options
- **Personal voice** - "I" not "we", direct and human
- **Metrics-driven** - Real proof (50+ projects, 70% savings)
- **Technical subtlety** - Grid patterns, glassmorphism

### Color System (Dynamic)
```typescript
Blue:   #60A5FA on dark blue gradient
Teal:   #06B6D4 on slate gradient
Orange: #F59E0B on neutral gradient  (default)
Purple: #A855F7 on black gradient
Green:  #10B981 on emerald gradient
```

### Voice Examples
```
✅ "Built by Someone Who Runs Businesses"
✅ "Not just codes them"
✅ "I understand your problems because I've lived them"
❌ "We leverage systematic methodologies..." (too corporate)
```

---

## Universal Framework

For **universal development principles** that apply to ALL Lost Monster projects:

→ See [../.ai-framework/README.md](../.ai-framework/README.md)

**Universal frameworks include:**
- [CODA Planning Framework](../.ai-framework/frameworks/coda.md) - Planning methodology (template)
- [Design Variations Workflow](../.ai-framework/frameworks/design-variations.md) - 5 variations approach (template)
- [Development Principles](../.ai-framework/core/DEVELOPMENT-PRINCIPLES.md) - Core principles (universal)
- [Standard Workflow](../.ai-framework/core/WORKFLOW.md) - Development workflow (universal)
- [Communication Guidelines](../.ai-framework/core/COMMUNICATION.md) - How to communicate (universal)

---

## How This Works

```
Lost Monster Website Project
├── CLAUDE.md                                    # Main AI instructions (START HERE)
├── .ai/                                         # Project-specific docs
│   ├── README.md                                # This file
│   ├── LOST-MONSTER-DESIGN-SYSTEM.md            # ⭐ Main design system
│   ├── DESIGN-SYSTEM-SUMMARY.md                 # Quick reference
│   ├── DOMAIN-KNOWLEDGE.md                      # Business context
│   ├── PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md # Quality checklist
│   └── ...                                      # Other docs
│
└── ../.ai-framework/                            # Universal templates
    ├── README.md                                # Framework overview
    ├── core/                                    # Universal principles
    ├── frameworks/                              # CODA, Design Variations (templates)
    ├── project-template/                        # Templates for new projects
    └── templates/                               # Reusable templates
```

**Key Distinction:**
- **`.ai-framework/`** = Universal templates (adapt per project)
- **`website/.ai/`** = Lost Monster website's specific implementation

---

## For AI Assistants

**When working on the Lost Monster website:**

1. **Read first**: [../CLAUDE.md](../CLAUDE.md) - Main instructions
2. **Understand design**: [LOST-MONSTER-DESIGN-SYSTEM.md](./LOST-MONSTER-DESIGN-SYSTEM.md) - Bold Personal Brand system
3. **Understand business**: [DOMAIN-KNOWLEDGE.md](./DOMAIN-KNOWLEDGE.md) - Business goals
4. **Score work**: [PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](./PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md) - Quality standards

**For complex features:**
- Use [CODA planning](../.ai-framework/frameworks/coda.md) template
- Create [5 design variations](../.ai-framework/frameworks/design-variations.md)
- Score ≥80/100 before presenting

---

## For Human Developers

**New to this project?** Read in this order:

1. [../CLAUDE.md](../CLAUDE.md) - Main AI instructions
2. [LOST-MONSTER-DESIGN-SYSTEM.md](./LOST-MONSTER-DESIGN-SYSTEM.md) - Design system
3. [DOMAIN-KNOWLEDGE.md](./DOMAIN-KNOWLEDGE.md) - Business context
4. [PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](./PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md) - Quality standards
5. [CODA-WEBSITE.md](./CODA-WEBSITE.md) - Planning example

**Time investment:** 30-40 minutes to read, lifetime of benefit.

---

## Framework Adherence

**This website demonstrates Lost Monster's methodology:**

✅ **CODA Planning** - Complete plan in [CODA-WEBSITE.md](./CODA-WEBSITE.md)
✅ **Design Variations** - 5 variations documented in [QUALITY-SCORES.md](./QUALITY-SCORES.md)
✅ **Quality Checklist** - Bold Personal Brand checklist in [PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](./PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md)
✅ **Domain Knowledge** - Business context in [DOMAIN-KNOWLEDGE.md](./DOMAIN-KNOWLEDGE.md)
✅ **Quality Tracking** - Scores tracked in [QUALITY-SCORES.md](./QUALITY-SCORES.md)
✅ **Design System Documented** - Full system in [LOST-MONSTER-DESIGN-SYSTEM.md](./LOST-MONSTER-DESIGN-SYSTEM.md)

**We practice what we preach.**

---

**Quick Start**: [../CLAUDE.md](../CLAUDE.md)
**Framework Docs**: [../.ai-framework/README.md](../.ai-framework/README.md)
**Design System**: [LOST-MONSTER-DESIGN-SYSTEM.md](./LOST-MONSTER-DESIGN-SYSTEM.md)
