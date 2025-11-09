# Lost Monster AI Framework

> **Universal AI assistant configuration framework for ANY project**
>
> Extracted from Ancarraig Lodges - battle-tested in production since 2025

**Version**: 2.1 (Lost Monster Edition)
**Status**: ✅ Production Ready
**Reusability**: 🚀 Universal (React, Vue, Svelte, Angular, backend, CLI tools, etc.)

---

## What Is This?

This is Lost Monster's **secret weapon** - a complete AI development framework that gives you:

1. **Instant AI configuration** - Copy `.ai-framework/` folder, customize `project-template/`, done
2. **Proven planning methodologies** - CODA, Design Variations, Pre-Design Checklist
3. **Quality standards** - 100-point design scoring system, 80+ threshold
4. **Documented decisions** - CODA plans become permanent records
5. **Consistent workflows** - Git, testing, releases, code review

**The result:** 3-5 day project setup (vs industry 2-3 weeks), 80+ design quality scores, zero guesswork.

---

## Quick Start

### For New Projects

**Step 1: Copy the framework**
```bash
cp -r /lostmonster/.ai-framework /new-project/.ai
```

**Step 2: Update project-specific files** (only these)
```bash
cd /new-project/.ai/project

# Edit these 5 files with your project details:
- PROJECT.md                 # Tech stack, dependencies
- DESIGN-SYSTEM.md           # Colors, typography, design tokens
- DESIGN-LANGUAGE.md         # Visual identity, brand voice
- DOMAIN-KNOWLEDGE.md        # Business context, target audience
- PRE-DESIGN-CHECKLIST.md    # Customize scoring weights if needed
```

**Step 3: Done!**

AI assistant now knows your standards, workflows, and quality requirements.

---

## Directory Structure

```
.ai-framework/
├── README.md                          # ← You are here
├── CLAUDE-TEMPLATE.md                 # Copy to project root as CLAUDE.md
│
├── core/                              # Universal (never changes)
│   ├── DEVELOPMENT-PRINCIPLES.md      # Core workflow & philosophy
│   ├── WORKFLOW.md                    # Standard development steps
│   └── COMMUNICATION.md               # How AI should communicate
│
├── frameworks/                        # Planning methodologies (universal)
│   ├── coda.md                        # ⭐ CRITICAL: Structured planning
│   ├── design-variations.md           # ⭐ CRITICAL: Always create 5 versions
│   ├── story-driven-content.md        # Content formula (4-act structure)
│   └── trello-automation.md           # Trello workflow automation
│
├── project-template/                  # Customize per project
│   ├── PROJECT.md                     # Tech stack, design system
│   ├── PRE-DESIGN-CHECKLIST.md        # ⭐ CRITICAL: Mandatory verification
│   ├── DESIGN-SCORES.md               # ⭐ CRITICAL: Quality tracking
│   ├── DESIGN-SYSTEM.md               # Technical design specs
│   ├── DESIGN-LANGUAGE.md             # Visual identity
│   └── DOMAIN-KNOWLEDGE.md            # Business context
│
├── templates/                         # Reusable templates
│   ├── component-planning.md
│   ├── feature-planning.md
│   ├── case-study-formula.md
│   └── case-study-checklist.md
│
└── workflows/                         # Process workflows
    ├── git-workflow.md
    ├── testing-workflow.md
    └── release-workflow.md
```

---

## The Three Critical Methodologies

### 1. CODA Planning Framework ⭐

**Context → Objective → Details → Acceptance**

A structured thinking methodology for complex features:
- Catches issues in planning phase (not after coding)
- "Measure twice, cut once" for software
- Creates permanent documentation of decisions

**When to use:** Any feature requiring 3+ coordinated changes, complex layouts, design work

**File:** [`frameworks/coda.md`](./frameworks/coda.md)

### 2. Design Variations Workflow ⭐

**ALWAYS create 5 variations on a demo page**

For ANY design or UI implementation work:
- Eliminates guesswork
- Prevents rework
- User selects preferred version BEFORE implementation
- All iteration happens in planning phase (cheap)

**When to use:** Every design decision, every UI component, every layout

**File:** [`frameworks/design-variations.md`](./frameworks/design-variations.md)

### 3. Pre-Design Checklist + Scoring ⭐

**100-point scoring system - must score 80+ to present**

Mandatory verification before presenting any design:
- Image-to-Text Ratio (25 points)
- Design Language Violations (20 points)
- Aesthetic Compliance (15 points)
- Voice & Content (15 points)
- Conversion Psychology (15 points)
- Mobile-First (10 points)

**When to use:** Before presenting ANY design, layout, or UI solution

**File:** [`project-template/PRE-DESIGN-CHECKLIST.md`](./project-template/PRE-DESIGN-CHECKLIST.md)

---

## How It Works Together

```
┌──────────────────────────────────────────────────┐
│ 1. CODA: Think through feature structure        │
│    (Context → Objective → Details → Acceptance) │
└──────────────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────┐
│ 2. Design Variations: Create 5 versions         │
│    (Show user 5 real implementations)            │
└──────────────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────┐
│ 3. User Selects: "I prefer Variation C"         │
└──────────────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────┐
│ 4. Pre-Design Checklist: Score chosen design    │
│    (Must score 80+ to present)                   │
└──────────────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────┐
│ 5. Implement: Build once, correctly              │
└──────────────────────────────────────────────────┘
```

**Result:** All iteration in planning phase, clean implementation, documented decisions.

---

## The Lost Monster Advantage

### Without This Framework:
- ❌ AI guesses design approaches (wastes iteration)
- ❌ Inconsistent quality across projects
- ❌ No shared vocabulary ("modern" means different things)
- ❌ Rework after implementation (expensive)
- ❌ Every project starts from zero
- ❌ No quality tracking or accountability

### With This Framework:
- ✅ AI follows proven workflows (CODA, Design Variations)
- ✅ Consistent 80+ quality scores
- ✅ Shared vocabulary (specific design language)
- ✅ Iteration in planning phase (cheap to change plans)
- ✅ Copy `.ai/` to new projects instantly
- ✅ Quality tracked over time (Design Scores)

---

## Real-World Example

### ❌ Without Framework:
```
User: "Add a pricing card component"
AI: [Immediately codes a solution]
User: "That doesn't match our design system"
AI: [Refactors]
User: "The animation is too aggressive"
AI: [Adjusts]
User: "This breaks on mobile"
AI: [Fixes]
Result: 4+ iterations, inconsistent patterns
```

### ✅ With Framework (CODA + Design Variations):
```
User: "Add a pricing card component"

AI: [Reads core/DEVELOPMENT-PRINCIPLES.md]
AI: [Checks project/DESIGN-LANGUAGE.md for requirements]
AI: "Let me create 5 variations for you to choose from"

AI: [Uses frameworks/design-variations.md workflow]
AI: [Creates app/demo/pricing-card-variations/page.tsx with 5 options:
     A. Photo-first minimal
     B. Equal weight photo + text
     C. Text-first with small photo
     D. Glassmorphic overlay
     E. Card-less minimalist]

User: "I prefer Variation D - the glassmorphic one"

AI: [Uses frameworks/coda.md to plan implementation]
AI: [Scores design with PRE-DESIGN-CHECKLIST: 87/100 ✅]
AI: [Implements once, correctly, matching design system]

Result: All iteration in planning phase, clean implementation, 87/100 quality
```

---

## What Makes This Framework Brilliant

### 1. It's a Mental Framework, Not Documentation Bureaucracy

**CODA** = Think in these dimensions, communicate conversationally
- Don't write formal documents unless explicitly needed
- Use it as critical thinking checklist
- Present understanding conversationally

**Design Variations** = Always explore creative space
- Forces you beyond first instinct
- User sees real implementations, not descriptions
- Prevents "I thought you meant..." situations

**Pre-Design Checklist** = Quality forcing function
- Score before presenting (not after user feedback)
- Creates accountability
- Tracks improvement over time

### 2. It's Universal Across Frameworks

**The principles work for:**
- React, Vue, Svelte, Angular (frontend)
- Node, Python, Ruby, Go (backend)
- Mobile apps (React Native, Flutter)
- CLI tools, desktop apps, anything

**Only the syntax changes**, not the methodology.

### 3. It Creates Permanent Documentation

**CODA plans** become architectural decision records
**Design Variations** show design exploration process
**Design Scores** track quality over time

Future developers (or future you) can see:
- WHY decisions were made
- WHAT alternatives were considered
- HOW quality was verified

---

## Success Metrics

This framework is working when:

- ✅ AI produces consistent quality across all tasks
- ✅ Less back-and-forth iteration needed
- ✅ New projects start with proven patterns (copy `.ai/`)
- ✅ Design decisions are documented and traceable
- ✅ **Average design scores ≥ 85** (B+ grade baseline)
- ✅ **Zero scores below 80** (quality threshold enforced)
- ✅ Onboarding new developers is faster (read `.ai/` folder)

---

## How to Use This Framework

### For AI Assistants

The AI automatically reads these files as context and follows the patterns defined here.

**Prompt examples:**
- "Follow the standard workflow" → Uses core/WORKFLOW.md
- "Use CODA planning" → Applies frameworks/coda.md
- "Create design variations" → Applies frameworks/design-variations.md
- "Score this design" → Uses PRE-DESIGN-CHECKLIST.md

### For Human Developers

**New to Lost Monster projects?** Read in this order:

1. This file (README.md)
2. [`core/DEVELOPMENT-PRINCIPLES.md`](./core/DEVELOPMENT-PRINCIPLES.md)
3. [`frameworks/coda.md`](./frameworks/coda.md)
4. [`frameworks/design-variations.md`](./frameworks/design-variations.md)
5. [`project-template/PRE-DESIGN-CHECKLIST.md`](./project-template/PRE-DESIGN-CHECKLIST.md)
6. Your project's `PROJECT.md` (customized version)

**Time investment:** 30 minutes to read, lifetime of benefit.

---

## Customization Guide

### What NEVER Changes (Keep As-Is)

**Universal files** - Same across all projects:
- `core/` - Development principles, workflow
- `frameworks/` - CODA, Design Variations, Content Formula
- `templates/` - Planning templates
- `workflows/` - Git, testing, releases

**Don't customize these** - they work universally.

### What ALWAYS Changes (Customize Per Project)

**Project-specific files** - Update for each client:
- `project/PROJECT.md` - Tech stack (Next.js vs React vs Vue)
- `project/DESIGN-SYSTEM.md` - Colors, fonts, spacing for THIS client
- `project/DESIGN-LANGUAGE.md` - Brand voice, visual identity
- `project/DOMAIN-KNOWLEDGE.md` - Industry, target audience, business rules
- `project/PRE-DESIGN-CHECKLIST.md` - Scoring weights (usually keep default)

**10-15 minute task** per new project.

---

## Integration with Lost Monster Stack

**This framework pairs perfectly with:**

1. **Design Systems** (`/lostmonster/design-systems/`)
   - Framework defines quality standards
   - Design systems provide implementation patterns

2. **Component Library** (`/lostmonster/components/`)
   - Framework ensures consistent quality
   - Components provide reusable building blocks

3. **Integration Guides** (`/lostmonster/integrations/`)
   - Framework provides workflows
   - Guides provide technical setup

4. **Templates** (`/lostmonster/templates/`)
   - Framework copied to every template
   - Templates provide project structure

**They work together as one cohesive system.**

---

## FAQ

### Q: Do I need to write CODA documents for everything?

**A:** No! CODA is a **thinking framework**. For most tasks, think in CODA dimensions (Context, Objective, Details, Acceptance) and communicate conversationally. Only write formal CODA documents when explicitly needed for stakeholder alignment or regulatory documentation.

### Q: Do I really need 5 design variations every time?

**A:** **Yes**, for ANY design work. It's the fastest way to explore creative space and ensure you're not missing better options. The first idea is rarely the best idea. 5 variations force creative thinking.

### Q: What if my design scores below 80?

**A:** **Don't present it.** Redesign based on the scorecard feedback, re-score, and only present when it hits 80+. This threshold prevents wasted iteration and maintains quality standards.

### Q: Can I customize the scoring weights?

**A:** Yes, but the default weights (Image 25%, Design 20%, Aesthetic 15%, Voice 15%, Conversion 15%, Mobile 10%) are battle-tested. Only change if your project has significantly different priorities.

### Q: Does this work for backend/API projects?

**A:** Absolutely! CODA planning works for ANY complex feature. You'll skip the "Design Variations" and "Pre-Design Checklist" (those are frontend-specific), but CODA, development principles, and workflows are universal.

---

## Philosophy

**"Think deeply, plan thoroughly, implement simply, document clearly."**

This framework embodies:

- **Measure twice, cut once** - Planning is cheaper than refactoring
- **Show, don't tell** - Live demos beat descriptions
- **Quality through accountability** - Score designs, track improvement
- **Document as you go** - CODA plans = permanent records

---

## Version History

**v2.1** (Lost Monster Edition - 2025)
- Extracted from Ancarraig Lodges production codebase
- Added comprehensive README
- Created project-template/ structure for easy customization
- Enhanced with Lost Monster integration notes

**v2.0** (Ancarraig - 2025)
- Added Pre-Design Checklist with 100-point scoring system
- Added Design Scores tracking
- Universalized framework for any tech stack
- Added Design Variations workflow as mandatory

**v1.0** (Native Automotive - 2024)
- Initial framework created
- CODA planning methodology established
- Core principles documented

---

## Support & Resources

**For framework usage:**
- See [`core/DEVELOPMENT-PRINCIPLES.md`](./core/DEVELOPMENT-PRINCIPLES.md)
- See [`frameworks/coda.md`](./frameworks/coda.md)

**For design quality:**
- See [`project-template/PRE-DESIGN-CHECKLIST.md`](./project-template/PRE-DESIGN-CHECKLIST.md)
- See [`project-template/DESIGN-SCORES.md`](./project-template/DESIGN-SCORES.md)

**For planning complex work:**
- See [`frameworks/coda.md`](./frameworks/coda.md)
- See [`frameworks/design-variations.md`](./frameworks/design-variations.md)

**For Lost Monster team:**
- Main repository: `/lostmonster/lostmonster/`
- Design systems: `/lostmonster/design-systems/`
- Components: `/lostmonster/components/`
- Integrations: `/lostmonster/integrations/`

---

## Summary

**This framework gives you:**

1. **Proven workflows** that reduce iteration waste
2. **Planning methodologies** that catch issues early (CODA, Design Variations)
3. **Quality standards** that prevent subpar work (80+ score threshold)
4. **Shared vocabulary** for design and technical decisions
5. **Reusable patterns** that work across ANY project
6. **Permanent documentation** - plans become records

**Copy this folder to any new project and get:**
- Instant AI assistant configuration
- Battle-tested planning methodologies
- Quality enforcement system
- Documented decision-making process

**This is Lost Monster's competitive advantage.**

---

**Ready to start?** → [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md)

**Copying to new project?** → Follow Quick Start above

**Planning complex work?** → [frameworks/coda.md](./frameworks/coda.md)

**Need design work?** → [frameworks/design-variations.md](./frameworks/design-variations.md)
