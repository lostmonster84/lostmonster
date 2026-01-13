# Framework Setup Guide

> **How to copy this AI framework to new projects**

This guide shows you how to take the battle-tested AI instruction framework from Native Automotive and adapt it to any new project in ~15 minutes.

---

## Overview

**What you're copying**: A complete AI development framework including:
- Universal development principles & workflows
- Planning methodologies (CODA, Design Variations, Content Formulas)
- Templates for components, features, and content
- Project-specific configuration (design system, domain knowledge)

**What changes**: Only the `project/` folder - everything else stays the same

**Time required**: 15 minutes of configuration

---

## Step-by-Step Setup

### Step 1: Copy the Framework

```bash
# From your source project directory (e.g., native-automotive)
SOURCE_PROJECT="/path/to/native-automotive"

# Navigate to your new project
cd /path/to/new-project

# Copy the entire .ai folder
cp -r $SOURCE_PROJECT/.ai ./

# Copy the CLAUDE.md template to project root
cp .ai/CLAUDE-TEMPLATE.md ./CLAUDE.md

# Verify structure
ls -la .ai/
ls CLAUDE.md
```

You should see:
```
.ai/
├── README.md
├── FRAMEWORK-SETUP.md (this file)
├── CLAUDE-TEMPLATE.md (template for root CLAUDE.md)
├── CHANGELOG.md
├── core/
├── frameworks/
├── project/
├── templates/
└── workflows/

CLAUDE.md (in project root - customize this)
```

---

### Step 2: Update Project Configuration

**Edit only these files in `.ai/project/`:**

#### 2A. Update `PROJECT.md`

**What to change:**

```markdown
## Project Overview
**Name**: [Your Project Name]
**Domain**: [Your business/product description]
**Location**: [Geographic context if relevant]
**Focus**: [Primary value proposition]

## Tech Stack
**Framework**: [Next.js? React? Vue? Svelte?]
**Language**: [TypeScript? JavaScript?]
**Styling**: [Tailwind? CSS Modules? Styled Components?]
**Animations**: [Framer Motion? GSAP? CSS?]
**Deployment**: [Vercel? Netlify? AWS?]
```

**What to keep:**
- The structure of sections (Overview, Tech Stack, Design System, etc.)
- The checklist format for verification
- The component patterns section (just update the code examples)

---

#### 2B. Update `DESIGN-LANGUAGE.md`

**What to change:**

1. **Brand Identity Section**
   - Primary colors
   - Typography choices (replace Oswald/Montserrat with your fonts)
   - Voice/tone guidelines

2. **Typography Scale**
   - Update max heading sizes to match your brand
   - Update font classes to match your system

3. **Design Philosophy**
   - Keep the "Restraint" and "Depth" pillars if they fit
   - Replace "Highland Roots" with your unique positioning

4. **Real-World Examples**
   - Replace Native Automotive examples with your project examples
   - Update component screenshots/descriptions

**What to keep:**
- The structure (Pillars → Typography → Colors → Components → Patterns)
- The decision framework sections ("Should I use icons?" etc.)
- The quick reference format

---

#### 2C. Update `DESIGN-SYSTEM.md`

**What to change:**

1. **Design Tokens**
   - Color palette (primary, secondary, neutrals)
   - Typography scale (font families, sizes, weights)
   - Spacing scale
   - Shadow definitions
   - Border radius values

2. **Components**
   - List your actual components
   - Update code examples to match your component library

3. **Animation System**
   - Update easing functions if different
   - Update duration standards

**What to keep:**
- The structure of sections (Philosophy, Tokens, Components, etc.)
- The documentation format (code examples, usage notes)
- Accessibility and performance sections

---

#### 2D. Update `DOMAIN-KNOWLEDGE.md`

**What to change:**

1. **Target Audience**
   - Who are your users?
   - What are their needs?
   - What problems do you solve?

2. **Industry Context**
   - What industry/domain are you in?
   - What are the key concepts?
   - What terminology is important?

3. **Business Rules**
   - Any domain-specific logic
   - Compliance requirements
   - Industry standards to follow

4. **Geographic Context** (if applicable)
   - Remove if not relevant
   - Update with your geographic specifics if relevant

**What to keep:**
- The structure (Audience → Context → Rules → Guidelines)

---

### Step 3: Customize Root `CLAUDE.md`

The template was copied in Step 1. Now customize it:

**Edit `CLAUDE.md` in your project root:**

1. **Replace `[Project Name]`** with your actual project name (appears 4 times)
2. **Update "Quick Reference" section**:
   - Tech Stack (framework, language, styling, etc.)
   - Design Principles (your 3-5 key principles)
   - Brand (primary color, fonts, voice)
3. **Update final "Philosophy" line** with your project's unique philosophy

**Example customizations:**

```markdown
# Mountain Gear Co. - AI Instructions
# (instead of [Project Name])

## 🔧 Mountain Gear Co. Quick Reference
# (instead of [Project Name] Quick Reference)

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS/Backend**: Shopify Storefront API

### Design Principles
- **Adventure-Ready**: Bold imagery, confident typography
- **Technical Precision**: Detailed specs for every product
- **Trust Through Proof**: Customer photos, verified reviews

### Brand
- **Primary color**: Summit Blue `#1E3A8A`
- **Fonts**: Archivo (headings), Inter (body)
- **Voice**: Adventurous yet practical, expert but approachable

**Philosophy**: Gear up, get out, come back with stories.
```

**That's it!** The rest of the file is universal and works as-is.

---

### Step 4: Verify Universal Files (No Changes Needed)

These files should work as-is:

**In `core/`:**
- ✅ `DEVELOPMENT-PRINCIPLES.md` - Universal workflow principles
- ✅ `WORKFLOW.md` - Standard development steps
- ✅ `COMMUNICATION.md` - How AI should communicate

**In `frameworks/`:**
- ✅ `coda.md` - CODA planning framework
- ✅ `design-variations.md` - 5-variations workflow
- ✅ `content-formula.md` - Content creation patterns

**In `templates/`:**
- ✅ `component-planning.md` - Component planning template
- ✅ `feature-planning.md` - Feature planning template
- ✅ Case study templates (if applicable to your project)

**Don't change these** - they're universal and proven across projects.

---

### Step 5: Test the Framework

**Test 1: Ask AI to describe the project**

```
Prompt: "What project are we working on? What are the key design principles?"
```

Expected: AI should accurately describe your new project using info from `project/PROJECT.md`

**Test 2: Ask AI to plan a component**

```
Prompt: "I want to build a new button component. Use CODA planning."
```

Expected: AI should create a Context-Objective-Details-Acceptance plan referencing your design system

**Test 3: Ask AI to create variations**

```
Prompt: "Create a hero section for the homepage"
```

Expected: AI should automatically use Design Variations workflow (create 5 options on demo page)

---

## Cross-Framework Migration

**This framework works with ANY tech stack**. Here's how to adapt when migrating to different frameworks:

### Next.js/React → Vue 3

**What changes**:
- File structure: `app/` → `src/views/`, `.tsx` → `.vue`
- State management: Context API → Pinia/Vuex
- Routing: Next.js App Router → Vue Router
- Styling: Tailwind classes stay the same (or adapt to your CSS approach)

**What stays the same**:
- ✅ CODA planning process
- ✅ Design Variations workflow (create 5 versions)
- ✅ Component planning template (just update code syntax)
- ✅ All core principles

**Demo page location**: `src/views/demos/[feature-name].vue` instead of `app/demo/[feature-name]/page.tsx`

---

### Next.js/React → Svelte/SvelteKit

**What changes**:
- File structure: `.tsx` → `.svelte`
- State management: Context/Redux → Svelte stores
- Routing: Next.js → SvelteKit routes
- Reactivity: useState/useEffect → Svelte reactivity

**What stays the same**:
- ✅ All planning frameworks
- ✅ Workflow principles
- ✅ Design system token approach (adapt to CSS variables)

---

### Frontend → Backend (Node.js/Python)

**What changes**:
- Focus: UI components → API endpoints, data models, business logic
- Planning: Use feature-planning.md for API design
- Design Variations: Create 5 API architectures instead of UI variations
- Testing: Unit tests for business logic instead of component tests

**What stays the same**:
- ✅ CODA planning (perfect for API design!)
- ✅ Workflow (think → plan → verify → implement)
- ✅ Communication principles
- ✅ Simplicity-first approach

**Example CODA for API**:
- **Context**: Current API structure, performance bottlenecks
- **Objective**: RESTful user management endpoint
- **Details**: Routes, schemas, validation, auth
- **Acceptance**: Response time <100ms, test coverage >80%

---

### Web → CLI Tools

**What changes**:
- UI → Command-line interface
- Components → Commands and subcommands
- Design Variations → 5 different UX approaches for CLI interaction
- Visual design → Terminal output formatting

**What stays the same**:
- ✅ Feature planning template (perfect for CLI tool features)
- ✅ CODA planning
- ✅ User story approach
- ✅ Testing strategy

---

### Multi-Platform (React Native, Electron, etc.)

**What changes**:
- Platform-specific UI patterns
- Navigation paradigms
- Performance considerations (mobile vs desktop)

**What stays the same**:
- ✅ All frameworks and templates
- ✅ Planning approaches
- ✅ Just adapt examples to platform conventions

---

## What's Universal vs. What's Project-Specific

### Universal (Never Change)

**`core/` - Development Principles**
- How to think through problems
- Standard workflow (think → plan → verify → implement → document)
- Communication style (concise, high-level, clear)
- Simplicity-first philosophy

**`frameworks/` - Planning Methodologies**
- CODA planning (Context-Objective-Details-Acceptance)
- Design Variations (always create 5 options)
- Content Formula (if you create written content)

**`templates/` - Planning Templates**
- Component planning structure
- Feature planning structure
- Content templates (adapt if needed)

### Project-Specific (Always Update)

**`project/PROJECT.md`**
- Project name, domain, purpose
- Tech stack (Next.js vs React vs Vue, etc.)
- Dependencies and build commands
- Business rules specific to this project

**`project/DESIGN-LANGUAGE.md`**
- Brand identity (colors, fonts, voice)
- Design philosophy unique to this brand
- Visual patterns and component examples
- Real-world examples from this project

**`project/DESIGN-SYSTEM.md`**
- Technical design tokens
- Component specifications
- Animation system details
- Accessibility standards for this project

**`project/DOMAIN-KNOWLEDGE.md`**
- Industry/domain context
- Target audience specifics
- Geographic context (if relevant)
- Business rules and compliance

---

## Common Customizations

### If You Don't Use Glassmorphism

**In `project/DESIGN-LANGUAGE.md`:**

Replace glassmorphism references with your preferred depth treatment:
- Shadows only
- Gradients
- Borders
- Flat design with color contrast

**Example replacement:**

```markdown
### 2. **Every Surface Has Depth**

**Philosophy**: Create visual hierarchy through [YOUR APPROACH]

**In Practice**:
- Cards use elevated shadows
- Backgrounds use subtle gradients
- Borders provide clear separation
```

---

### If You Don't Need Design Variations

If your project is purely backend or CLI-focused:

**In `core/DEVELOPMENT-PRINCIPLES.md`:**

Add a note that Design Variations workflow is optional:

```markdown
## Design Variations Workflow

**Note**: This project is backend-focused. Design Variations workflow is
not applicable. Focus on CODA planning for architecture decisions instead.
```

---

### If You Have Different Typography Philosophy

**In `project/DESIGN-LANGUAGE.md`:**

Replace the typography scale entirely with your standards:

```markdown
## Typography Scale

### Our Approach
[Describe your typography philosophy - large/bold? Minimal? Editorial?]

### Sizes
- Hero: `text-[size]` ([Xpx])
- H2: `text-[size]` ([Xpx])
- H3: `text-[size]` ([Xpx])
- Body: `text-[size]` ([Xpx])

[Include your actual scale]
```

---

## Advanced Configuration

### Adding Custom Frameworks

If you develop a new planning methodology:

1. Create `.ai/frameworks/[your-framework].md`
2. Document the methodology thoroughly
3. Include real-world examples
4. Reference it in `.ai/README.md`

Example: If you develop a "Data Schema Planning Framework":

```markdown
# Data Schema Planning Framework

## When to Use
[Description]

## Structure
[Your framework steps]

## Examples
[Real examples]
```

---

### Adding Custom Templates

For project-specific templates:

1. Create `.ai/templates/[your-template].md`
2. Make it fill-in-the-blank style
3. Include examples
4. Reference it in relevant framework files

Example: "API Endpoint Planning Template":

```markdown
# API Endpoint Planning Template

## Endpoint: [METHOD] /api/[route]

### Purpose
[What does this endpoint do?]

### Request
[Body, params, headers]

### Response
[Success/error responses]

### Security
[Auth, validation, rate limiting]
```

---

## Troubleshooting

### Problem: AI isn't using the framework

**Solution**: Explicitly reference the files

```
Prompt: "Use the CODA framework from .ai/frameworks/coda.md to plan this feature"
```

---

### Problem: AI is using old Native Automotive specifics

**Solution**: You didn't fully update `project/` files

1. Check `project/DESIGN-LANGUAGE.md` - remove Native-specific examples
2. Check `project/PROJECT.md` - update project name/domain
3. Check `project/DOMAIN-KNOWLEDGE.md` - replace Highland context

---

### Problem: Frameworks feel too rigid

**Solution**: Frameworks are guidelines, not laws

Update `core/DEVELOPMENT-PRINCIPLES.md` to clarify:

```markdown
## Using Frameworks

Frameworks (CODA, Design Variations) are **guides, not rules**.

Use them when they add value. Skip them when they don't.

**Use CODA for**: Complex features, design work, architecture decisions
**Skip CODA for**: Obvious bug fixes, trivial updates
```

---

## Migration Checklist

Use this checklist when setting up a new project:

- [ ] **Step 1: Copy folder**
  - [ ] Run `cp -r .ai /new-project/`
  - [ ] Verify all folders present

- [ ] **Step 2: Update `project/PROJECT.md`**
  - [ ] Project name and description
  - [ ] Tech stack
  - [ ] Design system overview
  - [ ] Business rules

- [ ] **Step 3: Update `project/DESIGN-LANGUAGE.md`**
  - [ ] Brand identity (colors, fonts)
  - [ ] Typography scale
  - [ ] Design philosophy
  - [ ] Remove Native-specific examples
  - [ ] Add new project examples

- [ ] **Step 4: Update `project/DESIGN-SYSTEM.md`**
  - [ ] Color tokens
  - [ ] Typography specs
  - [ ] Component specifications
  - [ ] Animation system

- [ ] **Step 5: Update `project/DOMAIN-KNOWLEDGE.md`**
  - [ ] Target audience
  - [ ] Industry context
  - [ ] Business rules
  - [ ] Geographic context (if relevant)

- [ ] **Step 6: Update root `CLAUDE.md`**
  - [ ] Project name
  - [ ] Links to .ai/ files

- [ ] **Step 7: Test the framework**
  - [ ] Test 1: AI describes project correctly
  - [ ] Test 2: AI uses CODA planning
  - [ ] Test 3: AI uses Design Variations workflow

- [ ] **Step 8: Clean up**
  - [ ] Remove any Native Automotive references
  - [ ] Update README.md in root (if needed)
  - [ ] Commit framework to version control

---

## Real-World Example: E-commerce Project

Let's say you're setting up this framework for a new e-commerce project called "Mountain Gear Co."

### Changes to `project/PROJECT.md`:

```markdown
## Project Overview
**Name**: Mountain Gear Co.
**Domain**: Outdoor gear e-commerce platform
**Focus**: Premium outdoor equipment for serious adventurers

## Tech Stack
**Framework**: Next.js 14 (App Router)
**Language**: TypeScript
**Styling**: Tailwind CSS
**State Management**: Zustand
**Payments**: Stripe
**Deployment**: Vercel
```

### Changes to `project/DESIGN-LANGUAGE.md`:

```markdown
## Brand Identity
**Primary Color**: Summit Blue `#1E3A8A`
**Secondary Color**: Trail Green `#166534`
**Typography**:
- Headings: `font-archivo` (bold, technical)
- Body: `font-inter` (clean, readable)

**Voice**: Adventurous yet practical, expert but approachable
```

### Changes to `project/DOMAIN-KNOWLEDGE.md`:

```markdown
## Target Audience
**Primary**: Serious outdoor enthusiasts (hikers, climbers, backpackers)
**Secondary**: Weekend adventurers looking to upgrade gear

## Industry Context
- Technical gear specifications are critical
- Product reviews and ratings heavily influence decisions
- Seasonal inventory patterns (spring/fall peaks)
- International shipping complexities

## Business Rules
- Free shipping over $100
- 30-day return policy
- Price match guarantee
- Warranty tracking system
```

**Result**: All universal workflows stay the same (CODA, Design Variations), but AI now knows this is an e-commerce project with outdoor gear specifics.

---

## Maintenance

### When to Update Universal Files

**Only update `core/` and `frameworks/` when:**
- You discover a genuinely better workflow
- You identify a gap in the methodology
- You develop a new reusable pattern

**Test thoroughly** - changes affect all future projects.

### When to Update Project Files

**Update `project/` files when:**
- Design system evolves
- Brand guidelines change
- Tech stack is upgraded
- Business rules change

**Keep in sync** with actual codebase.

---

## Summary

**The copy-paste workflow:**

1. `cp -r .ai /new-project/` - Copy entire framework
2. Edit `project/*.md` files - Update project specifics (15 minutes)
3. Update root `CLAUDE.md` - Point to new config
4. Test with AI - Verify it works
5. Start building - With proven patterns from day one

**Philosophy:**

> "Don't reinvent workflows for each project.
> Reuse proven patterns. Adapt project specifics.
> Ship faster with consistent quality."

---

## Next Steps

- **First time?** Follow the Step-by-Step Setup above
- **Need help?** See [.ai/README.md](./.ai/README.md) for support resources
- **Want to understand the principles?** Read [.ai/core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md)

---

**Questions or issues?** Open a discussion in your project repository or update this guide with solutions you discover.
