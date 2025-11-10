# Lost Monster Repository Structure

Complete overview of the Lost Monster repository organization and architecture.

## Repository Overview

Lost Monster is organized into distinct sections, each serving a specific purpose in our development workflow.

## Complete Directory Structure

```
lostmonster/
│
├── README.md                    # Repository overview and introduction
├── CONTRIBUTING.md              # Contribution guidelines
├── STRUCTURE.md                 # This file - complete structure guide
├── .gitignore                   # Git ignore rules
│
├── .ai-framework/               # 🤖 AI Development Framework
│   ├── README.md                # Framework overview
│   ├── INDEX.md                 # Complete navigation
│   ├── core/                    # Universal principles (never change)
│   │   ├── DEVELOPMENT-PRINCIPLES.md
│   │   ├── WORKFLOW.md
│   │   └── COMMUNICATION.md
│   ├── frameworks/              # Planning methodologies
│   │   ├── coda.md              # CODA planning (VITAL)
│   │   └── design-variations.md # 5 variations (CRITICAL)
│   ├── project-template/        # Customizable templates
│   │   ├── PROJECT-TEMPLATE.md
│   │   ├── PRE-DESIGN-CHECKLIST.md
│   │   └── DESIGN-SCORES.md
│   ├── templates/               # Reusable boilerplates
│   │   ├── CLAUDE.md.template
│   │   ├── component-planning.md
│   │   └── ...
│   └── workflows/               # Process automation
│
├── components/                  # 🧩 Component Library
│   ├── README.md
│   ├── react/                   # React components
│   │   ├── README.md
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   └── ...
│   ├── vue/                     # Vue 3 components
│   │   ├── README.md
│   │   ├── Button/
│   │   └── ...
│   ├── nextjs/                  # Next.js specific components
│   │   ├── README.md
│   │   ├── ServerCard/
│   │   └── ...
│   └── shared/                  # Framework-agnostic code
│       ├── README.md
│       ├── types/
│       ├── utils/
│       └── ...
│
├── design-systems/              # 🎨 Design Systems & UI Kits
│   ├── README.md
│   ├── admin/                   # Admin panel designs
│   │   ├── README.md
│   │   ├── dashboard/
│   │   ├── data-tables/
│   │   └── ...
│   ├── public/                  # Public-facing designs
│   │   ├── README.md
│   │   ├── landing/
│   │   ├── marketing/
│   │   └── ...
│   └── style-guides/            # Brand & style guides
│       ├── README.md
│       ├── colors/
│       ├── typography/
│       └── ...
│
├── integrations/                # 🔌 Third-Party Integrations
│   ├── README.md
│   ├── payment/                 # Payment processors
│   │   ├── README.md
│   │   ├── stripe/
│   │   ├── paypal/
│   │   └── ...
│   ├── auth/                    # Authentication providers
│   │   ├── README.md
│   │   ├── auth0/
│   │   ├── clerk/
│   │   └── ...
│   ├── cms/                     # Content management
│   │   ├── README.md
│   │   ├── contentful/
│   │   ├── sanity/
│   │   └── ...
│   ├── analytics/               # Analytics platforms
│   │   ├── README.md
│   │   ├── google-analytics/
│   │   ├── mixpanel/
│   │   └── ...
│   └── communication/           # Email, SMS, notifications
│       ├── README.md
│       ├── sendgrid/
│       ├── twilio/
│       └── ...
│
├── templates/                   # 📋 Project Templates
│   ├── README.md
│   ├── frontend/                # Frontend templates
│   │   ├── README.md
│   │   ├── nextjs-app/
│   │   ├── react-vite/
│   │   ├── vue-vite/
│   │   └── ...
│   ├── backend/                 # Backend templates
│   │   ├── README.md
│   │   ├── express-api/
│   │   ├── nestjs-api/
│   │   └── ...
│   └── fullstack/               # Full-stack templates
│       ├── README.md
│       ├── t3-stack/
│       ├── mern-stack/
│       └── ...
│
├── standards/                   # 📏 Development Standards
│   ├── README.md
│   ├── coding/                  # Code style & conventions
│   │   ├── README.md
│   │   ├── typescript.md
│   │   ├── react.md
│   │   └── ...
│   ├── git/                     # Git workflow
│   │   ├── README.md
│   │   ├── branching.md
│   │   ├── commits.md
│   │   └── ...
│   ├── documentation/           # Documentation guidelines
│   │   ├── README.md
│   │   ├── readme-template.md
│   │   └── ...
│   └── security/                # Security practices
│       ├── README.md
│       ├── authentication.md
│       └── ...
│
├── utilities/                   # 🛠️ Utilities & Tools
│   ├── README.md
│   ├── scripts/                 # Build & automation scripts
│   │   ├── README.md
│   │   ├── build.ts
│   │   ├── seed.ts
│   │   └── ...
│   ├── helpers/                 # Utility functions
│   │   ├── README.md
│   │   ├── string.ts
│   │   ├── array.ts
│   │   └── ...
│   ├── hooks/                   # Custom hooks
│   │   ├── README.md
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── ...
│   └── validators/              # Validation utilities
│       ├── README.md
│       ├── form.ts
│       └── ...
│
├── docs/                        # 📚 Documentation
│   ├── README.md
│   ├── getting-started/         # Getting started guides
│   │   ├── README.md
│   │   └── quick-start.md
│   ├── api-reference/           # API documentation
│   │   └── README.md
│   ├── guides/                  # How-to guides
│   │   └── README.md
│   └── architecture/            # Architecture docs
│       └── README.md
│
├── examples/                    # 💡 Real-World Examples
│   ├── README.md
│   ├── case-studies/            # Project case studies
│   │   └── README.md
│   └── implementations/         # Implementation examples
│       └── README.md
│
└── website/                     # 🌐 Lost Monster Website (Production)
    ├── README.md                # Website documentation
    ├── app/                     # Next.js App Router
    ├── components/              # Website components
    ├── .ai/                     # Project-specific AI docs
    │   ├── CODA-WEBSITE.md
    │   ├── DESIGN-DECISIONS.md
    │   ├── QUALITY-SCORES.md
    │   └── ...
    └── ...                      # Standard Next.js structure
```

## Section Purposes

### AI Framework (`/.ai-framework`)
**Purpose:** Battle-tested AI development methodology and templates

**What goes here:**
- Universal development principles (5 pillars)
- Standard workflows (Think → Research → Plan → Verify → Implement → Review)
- Communication guidelines
- CODA planning framework (Context → Objective → Details → Acceptance)
- Design variations methodology (always create 5 options)
- Project templates (customizable per project)
- Reusable boilerplates and templates

**When to use:**
- Starting any new project
- Planning complex features
- Making design decisions
- Setting quality standards
- Configuring AI assistants
- Establishing consistent workflows

**Key Features:**
- **Universal Core**: Never-changing principles that apply to all projects
- **Proven Methodologies**: CODA planning, 5 design variations
- **Quality Standards**: 100-point scoring system, 80+ threshold
- **Reusable Templates**: Copy and customize for new projects
- **Time Savings**: 3-5 day project setup vs industry 2-3 weeks

### Components (`/components`)
**Purpose:** Reusable UI components and business logic

**What goes here:**
- React components
- Vue components
- Next.js components
- Shared utilities and types
- Framework-agnostic code

**When to use:**
- Building new UI components
- Creating reusable logic
- Sharing code across projects

### Design Systems (`/design-systems`)
**Purpose:** Visual design resources and guidelines

**What goes here:**
- UI component designs
- Design tokens (colors, spacing, typography)
- Style guides and brand guidelines
- Admin panel patterns
- Public website patterns

**When to use:**
- Starting new designs
- Ensuring visual consistency
- Creating new UI components
- Branding decisions

### Integrations (`/integrations`)
**Purpose:** Third-party service integrations

**What goes here:**
- API clients for external services
- Authentication providers
- Payment processors
- CMS integrations
- Analytics implementations
- Communication services

**When to use:**
- Adding payment processing
- Setting up authentication
- Integrating analytics
- Connecting to external APIs

### Templates (`/templates`)
**Purpose:** Project starter templates

**What goes here:**
- Frontend project templates
- Backend API templates
- Full-stack application templates
- Configuration files
- Boilerplate code

**When to use:**
- Starting new projects
- Creating consistent structure
- Rapid prototyping
- Onboarding new projects

### Standards (`/standards`)
**Purpose:** Development guidelines and best practices

**What goes here:**
- Coding standards
- Git workflow documentation
- Documentation guidelines
- Security best practices
- Code review checklists

**When to use:**
- Setting up new projects
- Reviewing code
- Onboarding developers
- Maintaining consistency

### Utilities (`/utilities`)
**Purpose:** Helper functions and development tools

**What goes here:**
- Utility functions (string, array, date, etc.)
- Custom hooks
- Build scripts
- Validation functions
- Development tools

**When to use:**
- Common operations
- Data transformations
- Form validation
- Build automation

### Documentation (`/docs`)
**Purpose:** Comprehensive documentation

**What goes here:**
- Getting started guides
- API reference
- How-to guides
- Architecture documentation
- Best practices

**When to use:**
- Learning the system
- Understanding patterns
- Finding implementation details
- Architecture decisions

### Examples (`/examples`)
**Purpose:** Real-world implementation examples

**What goes here:**
- Case studies of real projects
- Complete implementation examples
- Best practice demonstrations
- Common use cases

**When to use:**
- Learning by example
- Understanding patterns in context
- Starting similar implementations
- Reference implementations

## Navigation Guide

### I want to...

**Plan a new project**
→ Start with `/.ai-framework/README.md` and CODA planning

**Understand development methodology**
→ Read `/.ai-framework/core/DEVELOPMENT-PRINCIPLES.md`

**Make design decisions**
→ Use `/.ai-framework/frameworks/design-variations.md`

**Build a user interface**
→ Start with `/components` and `/design-systems`

**Add payment processing**
→ Check `/integrations/payment`

**Set up authentication**
→ Check `/integrations/auth`

**Start a new project**
→ Use `/templates`

**Find a utility function**
→ Look in `/utilities/helpers`

**Create a custom React hook**
→ Check `/utilities/hooks` for examples

**Learn coding standards**
→ Read `/standards/coding`

**Understand Git workflow**
→ Read `/standards/git`

**See real examples**
→ Browse `/examples`

**Read documentation**
→ Start at `/docs`

## File Naming Conventions

### Components
```
ComponentName.tsx          # React component
ComponentName.vue          # Vue component
ComponentName.module.css   # CSS module
ComponentName.test.tsx     # Tests
types.ts                   # TypeScript types
index.ts                   # Exports
```

### Scripts
```
build.ts                   # TypeScript scripts
seed.ts
deploy.sh                  # Shell scripts
```

### Documentation
```
README.md                  # Main documentation
CONTRIBUTING.md            # Contribution guide
CHANGELOG.md               # Version history
```

## Contribution Flow

1. **Find the right location** using this guide
2. **Follow the structure** of similar items
3. **Read the README** in that directory
4. **Follow coding standards** in `/standards`
5. **Add documentation** for your addition
6. **Update the parent README** if needed
7. **Submit a pull request** following guidelines

## Maintenance

This structure is designed to be:
- **Scalable** - Easy to add new items
- **Organized** - Clear hierarchy
- **Documented** - Self-explanatory
- **Flexible** - Adaptable to needs
- **Consistent** - Predictable patterns

## Quick Reference

| Need | Location |
|------|----------|
| **AI Framework** | |
| Framework Overview | `/.ai-framework/README.md` |
| Development Principles | `/.ai-framework/core/DEVELOPMENT-PRINCIPLES.md` |
| CODA Planning | `/.ai-framework/frameworks/coda.md` |
| Design Variations | `/.ai-framework/frameworks/design-variations.md` |
| Project Template | `/.ai-framework/project-template/PROJECT-TEMPLATE.md` |
| **Components & Design** | |
| React Button | `/components/react/Button` |
| Design Tokens | `/design-systems/style-guides` |
| **Integrations** | |
| Stripe Integration | `/integrations/payment/stripe` |
| Auth Example | `/examples/implementations/auth` |
| **Templates & Standards** | |
| Next.js Template | `/templates/frontend/nextjs-app` |
| Coding Standards | `/standards/coding` |
| **Utilities** | |
| String Utilities | `/utilities/helpers/string.ts` |
| useDebounce Hook | `/utilities/hooks/useDebounce.ts` |
| Form Validation | `/utilities/validators/form.ts` |
| **Documentation** | |
| Getting Started | `/docs/getting-started` |
| Production Example | `/website` |

## Updates

This structure will evolve as we:
- Add new technologies
- Discover better patterns
- Receive community feedback
- Expand our capabilities

When making structural changes:
1. Discuss with the team
2. Update this document
3. Update affected READMEs
4. Communicate changes
5. Help migrate existing content

---

**Last Updated:** November 2025

For questions about where something belongs, check the relevant directory README or refer to this guide.
