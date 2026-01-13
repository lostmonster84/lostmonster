# AI Development Framework

> **A battle-tested, production-ready AI instruction framework**
>
> Copy this `.ai/` folder to any project for instant AI assistant configuration

**Version**: 2.1
**Status**: ✅ Production Ready
**Reusability**: 🚀 Universal (all frameworks)

---

## ⚠️ Framework Origin & Universality

**Originally developed for**: Next.js 15 + TypeScript + Tailwind CSS + Framer Motion stack (Native Automotive project)

**Now supports**: **ANY** framework, stack, or language (React, Vue, Svelte, Angular, backend, CLI tools, etc.)

**What's universal**:
- ✅ Core development principles (simplicity, verification, communication)
- ✅ Planning methodologies (CODA, Design Variations, Story-Driven Content)
- ✅ Workflow processes (Think → Plan → Verify → Implement → Review)
- ✅ Templates (component planning, feature planning)

**What you'll adapt**:
- 🔧 Code examples (shown in React/Next.js, adapt to your stack)
- 🔧 File paths (adapt to your project structure)
- 🔧 Tech stack specifics (in `project/` folder only)

**Multi-framework examples**: See [MULTI-FRAMEWORK-EXAMPLES.md](./MULTI-FRAMEWORK-EXAMPLES.md) for React, Vue, Svelte, backend, and more.

---

## What Is This?

This is a **complete AI development framework** that codifies:

1. **Universal development principles** - How to work effectively (any project)
2. **Planning methodologies** - CODA, Design Variations, Content Formulas
3. **Project-specific rules** - Design system, domain knowledge (update per project)
4. **Workflow templates** - Component planning, feature planning, testing

Think of it as **design patterns for working with AI assistants** - proven strategies that eliminate wasted iteration and produce consistent quality.

---

## Quick Start

### For Current Project

1. **Read this file** (you're doing it!)
2. **Start with**: [`core/DEVELOPMENT-PRINCIPLES.md`](./core/DEVELOPMENT-PRINCIPLES.md)
3. **Learn CODA**: [`frameworks/coda.md`](./frameworks/coda.md)
4. **Review project rules**: [`project/PROJECT.md`](./project/PROJECT.md)
5. **Begin working** - The AI knows these patterns

### For New Projects

1. **Copy this entire `.ai/` folder**: `cp -r /path/to/.ai /new-project/`
2. **Update ONLY the `project/` folder** with your project specifics
3. **Done!** All frameworks, workflows, and principles carry over

See [`FRAMEWORK-SETUP.md`](./FRAMEWORK-SETUP.md) for detailed migration guide.

---

## Folder Structure

```
.ai/
├── README.md                          # ← You are here
├── FRAMEWORK-SETUP.md                 # How to copy to new projects
│
├── core/                              # Universal (never changes)
│   ├── DEVELOPMENT-PRINCIPLES.md      # Core workflow & philosophy
│   ├── WORKFLOW.md                    # Standard development steps
│   └── COMMUNICATION.md               # How AI should communicate
│
├── frameworks/                        # Planning methodologies (universal)
│   ├── coda.md                        # Structured planning (Context-Objective-Details-Acceptance)
│   ├── design-variations.md           # Always create 5 variations for design work
│   └── story-driven-content.md        # Story-driven content formula (case studies, narratives)
│
├── project/                           # Project-specific (update per project)
│   ├── PROJECT.md                     # Tech stack, design system, business rules
│   ├── DESIGN-LANGUAGE.md             # Visual identity & design principles
│   ├── DESIGN-SYSTEM.md               # Technical design specs
│   └── DOMAIN-KNOWLEDGE.md            # Business domain, target audience, voice
│
├── templates/                         # Reusable templates (universal)
│   ├── component-planning.md          # How to plan UI components
│   ├── feature-planning.md            # How to plan features
│   ├── case-study-formula.md          # Story-driven case study structure
│   └── case-study-checklist.md        # Quality checklist for case studies
│
└── workflows/                         # Process workflows (coming soon)
    ├── pr-workflow.md                 # Pull request creation process
    ├── testing-workflow.md            # Testing strategy
    └── deployment-workflow.md         # Deployment checklist
```

---

## The Three Layers

### Layer 1: Core Principles (Universal)

**Location**: [`core/`](./core/)

These **never change** across projects:

- How to approach problems (think → plan → verify → implement → document)
- How to communicate (concise, high-level summaries at each step)
- How to make changes (simplicity first, minimal impact)
- How to verify work (review sections, testing, documentation)

**When to read**: Before starting any work in a new project

---

### Layer 2: Frameworks (Universal)

**Location**: [`frameworks/`](./frameworks/)

**Reusable methodologies** for common tasks:

#### CODA Planning Framework
**When**: Complex features, design work, anything requiring 3+ coordinated changes

**What**: Context → Objective → Details → Acceptance (structured planning)

**Why**: Catches issues in planning phase, not after coding. "Measure twice, cut once" for software.

#### Design Variations Workflow
**When**: ANY design or UI implementation work

**What**: Create exactly 5 different variations on a demo page, user selects preferred version

**Why**: Eliminates guesswork, prevents rework, explores creative space

#### Content Formula
**When**: Writing case studies, blog posts, storytelling content

**What**: Four-act structure with specific block types, pacing, and word counts

**Why**: Proven to achieve 92+ quality ratings and 6-7 minute engagement

**When to read**: When planning complex work or design implementations

---

### Layer 3: Project Configuration (Update Per Project)

**Location**: [`project/`](./project/)

**Project-specific** rules that change for each codebase:

- **PROJECT.md**: Tech stack (Next.js? React? Vue?), design requirements, business rules
- **DESIGN-LANGUAGE.md**: Visual identity, brand voice, design philosophy
- **DESIGN-SYSTEM.md**: Technical specs (colors, typography, components, tokens)
- **DOMAIN-KNOWLEDGE.md**: Business context, target audience, industry specifics

**When to read**: When starting work on this specific project

---

## How the Layers Work Together

```
┌─────────────────────────────────────────────────────────┐
│ CORE: How to work (think → plan → verify → implement)  │ ← Universal
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ FRAMEWORKS: How to plan (CODA, Variations, Formulas)   │ ← Universal
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ PROJECT: What to build (design system, domain rules)    │ ← Project-specific
└─────────────────────────────────────────────────────────┘
```

**Example workflow:**

1. User asks: "Build a new team member card component"
2. **CORE**: Think through problem, read codebase, plan approach
3. **FRAMEWORKS**: Use Design Variations (create 5 versions on demo page)
4. **PROJECT**: Follow Native Automotive design language (glassmorphism, typography scale, restraint)
5. User selects preferred variation
6. **FRAMEWORKS**: Use CODA to plan implementation (Context-Objective-Details-Acceptance)
7. **CORE**: Implement simply, communicate clearly, document thoroughly

---

## Why This Structure?

### Problem: AI Assistants Forget Context

Without this framework:
- ❌ AI guesses design approaches (wastes iteration)
- ❌ Inconsistent quality across tasks
- ❌ No shared vocabulary (what's "modern" or "clean"?)
- ❌ Rework after implementation (expensive)
- ❌ New projects start from zero

### Solution: Codified Patterns

With this framework:
- ✅ AI knows proven workflows (CODA, Design Variations)
- ✅ Consistent quality (follows defined principles)
- ✅ Shared vocabulary (specific design language)
- ✅ Iteration in planning phase (cheap to change plans)
- ✅ Copy `.ai/` to new projects (instant configuration)

---

## Key Philosophies

### 1. Measure Twice, Cut Once

**Planning is cheaper than refactoring.**

Use CODA for complex work. Spend 10 minutes planning to save hours of rework.

### 2. Show, Don't Tell

**Live demos beat descriptions.**

Use Design Variations workflow - 5 real implementations for user to choose from, not abstract explanations.

### 3. Simplicity Through Restraint

**Every change should impact as little code as possible.**

Remove before you add. Question if complexity is necessary.

### 4. Document As You Go

**Future you (and future developers) will thank you.**

Update project plans, write review sections, explain decisions.

---

## Real-World Examples

### Example 1: New Component (Without Framework)

```
User: "Add a pricing card component"
AI: [Immediately codes a solution]
User: "That doesn't match our design system"
AI: [Refactors]
User: "The animation is too aggressive"
AI: [Adjusts]
User: "This breaks on mobile"
AI: [Fixes]
Result: 4+ iterations, inconsistent with existing patterns
```

### Example 2: New Component (With Framework)

```
User: "Add a pricing card component"
AI: [Reads core/DEVELOPMENT-PRINCIPLES.md]
AI: [Checks project/DESIGN-LANGUAGE.md for requirements]
AI: [Uses frameworks/design-variations.md workflow]
AI: [Creates app/demo/pricing-card-variations/page.tsx with 5 options]
User: "I prefer Variation D - the glassmorphic one"
AI: [Uses frameworks/coda.md to plan implementation]
AI: [Implements once, correctly, matching design system]
Result: All iteration in planning phase, clean implementation
```

---

## How to Use This Framework

### For AI Assistants

The AI assistant automatically reads these files as context and follows the patterns defined here.

**Prompt examples:**

- "Follow the standard workflow" → Uses core/WORKFLOW.md
- "Use CODA planning" → Applies frameworks/coda.md
- "Create design variations" → Applies frameworks/design-variations.md
- "Follow Native design language" → Uses project/DESIGN-LANGUAGE.md

### For Human Developers

Read the framework to understand:

1. **How the AI thinks** (core principles, workflow)
2. **What quality looks like** (project design standards)
3. **Why decisions were made** (CODA plans document reasoning)

**New to this project?** Read in this order:

1. This file (README.md)
2. [`core/DEVELOPMENT-PRINCIPLES.md`](./core/DEVELOPMENT-PRINCIPLES.md)
3. [`frameworks/coda.md`](./frameworks/coda.md)
4. [`project/PROJECT.md`](./project/PROJECT.md)

---

## Adapting for New Projects

This framework is **designed to be copied** to new codebases.

**Step 1: Copy the folder**

```bash
cp -r /path/to/this/project/.ai /path/to/new-project/.ai
```

**Step 2: Update project-specific files**

Only edit files in `.ai/project/`:

- `PROJECT.md` - Tech stack, dependencies, build commands
- `DESIGN-LANGUAGE.md` - Brand identity, visual principles
- `DESIGN-SYSTEM.md` - Colors, typography, component specs
- `DOMAIN-KNOWLEDGE.md` - Business context, industry rules

**Step 3: Done!**

All workflows, frameworks, and core principles carry over automatically.

See [`FRAMEWORK-SETUP.md`](./FRAMEWORK-SETUP.md) for detailed instructions.

---

## What Makes This Different?

### Compared to AI Prompts

**Normal prompts**: One-shot instructions, no memory

**This framework**: Persistent context, proven patterns, shared vocabulary

### Compared to Documentation

**Normal docs**: Describe what exists

**This framework**: Prescribes how to work, plan, and decide

### Compared to Style Guides

**Style guides**: Visual/code consistency

**This framework**: Workflow consistency + planning methodologies + visual standards

---

## Framework Maintenance

### When to Update

**Universal files** (`core/`, `frameworks/`, `templates/`):
- Update when you discover a better workflow
- Improvements benefit all future projects

**Project files** (`project/`):
- Update when design system evolves
- Update when business rules change
- Keep in sync with actual codebase

### Versioning

Track framework version in this README:

- **Major version** (2.0): Structural changes to folder organization
- **Minor version** (2.1): New frameworks or templates added
- **Patch version** (2.0.1): Documentation improvements, typo fixes

---

## Success Metrics

This framework is working when:

- ✅ AI produces consistent quality across tasks
- ✅ Less back-and-forth iteration needed
- ✅ New projects start with proven patterns
- ✅ Design decisions are documented and traceable
- ✅ Onboarding new developers is faster

---

## Contributing

Improvements to **universal** parts of this framework (core, frameworks, templates) can benefit future projects.

**When you discover a better pattern:**

1. Document it in the appropriate file
2. Update cross-references
3. Add real-world examples
4. Test in multiple contexts

---

## Support & Resources

### Getting Help

**For Native Automotive specifics:**
- See [`project/PROJECT.md`](./project/PROJECT.md)
- See [`project/DESIGN-LANGUAGE.md`](./project/DESIGN-LANGUAGE.md)

**For framework usage:**
- See [`FRAMEWORK-SETUP.md`](./FRAMEWORK-SETUP.md)
- See [`core/DEVELOPMENT-PRINCIPLES.md`](./core/DEVELOPMENT-PRINCIPLES.md)

**For planning complex work:**
- See [`frameworks/coda.md`](./frameworks/coda.md)
- See [`frameworks/design-variations.md`](./frameworks/design-variations.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Summary

**This framework gives you:**

1. **Proven workflows** that reduce iteration waste
2. **Planning methodologies** that catch issues early
3. **Shared vocabulary** for design and technical decisions
4. **Reusable patterns** that work across projects
5. **Documentation built-in** - plans become permanent records

**Philosophy:**

> "Think deeply, plan thoroughly, implement simply, document clearly."

---

**Ready to start?** → [`core/DEVELOPMENT-PRINCIPLES.md`](./core/DEVELOPMENT-PRINCIPLES.md)

**Copying to new project?** → [`FRAMEWORK-SETUP.md`](./FRAMEWORK-SETUP.md)

**Planning complex work?** → [`frameworks/coda.md`](./frameworks/coda.md)
