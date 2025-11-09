# Templates Directory

**Production-ready templates for starting new projects**

This directory contains battle-tested templates extracted from real production projects. Each template is designed to be copied and customized for your specific project needs.

---

## Available Templates

### 1. **CLAUDE.md.template**
**Root AI instructions for your project**

**Purpose**: Central configuration file that AI assistants read to understand your project.

**What it includes**:
- Pre-Design Checklist (quick reference)
- Mandatory scoring system (80/100 minimum)
- Tech stack overview
- Quick links to frameworks and principles

**How to use**:
1. Copy to your project root as `CLAUDE.md`
2. Replace `[PROJECT_NAME]` with your project name
3. Customize tech stack section
4. Update links to point to your project's `.ai/` directory

**When to use**: Every project should have this file in the root directory.

---

### 2. **env.local.example.template**
**Comprehensive environment variables template**

**Purpose**: Save hours configuring integrations for each new project.

**What it includes** (14 sections, 290 lines):
- Site configuration
- Content Management (Sanity, Contentful, Strapi, WordPress)
- Affiliate programs (Viator, Booking.com, Amazon)
- Project management (Trello, Linear)
- Analytics (GA4, GTM, Plausible, Mixpanel, PostHog)
- Payment processing (Stripe, PayPal)
- Authentication (NextAuth, Auth0, Clerk, custom)
- Email service (Resend, SendGrid, AWS SES, Mailgun)
- Storage & assets (Cloudinary, AWS S3, Uploadthing)
- Database (PostgreSQL, MySQL, MongoDB, PlanetScale, Supabase)
- Search (Algolia)
- Maps & location (Google Maps, Mapbox)
- Communication (Twilio, Slack, Discord)
- Security (reCAPTCHA, Turnstile)
- Development & debugging (Sentry, LogRocket)
- Feature flags (Vercel Edge Config, LaunchDarkly)

**How to use**:
1. Copy to your project root as `.env.local.example`
2. Uncomment the sections you need
3. Add to `.gitignore`: `.env.local` (NEVER commit secrets!)
4. Copy to `.env.local` and fill in actual values

**When to use**: Start of every project. Saves 1-2 hours of documentation searching.

---

### 3. **feature-planning.md**
**Comprehensive feature planning template**

**Purpose**: Plan complex features before implementation using CODA framework.

**What it includes** (622 lines):
- Feature overview & user stories
- Functional & non-functional requirements
- User flows (happy path + edge cases)
- UI/UX design considerations
- Technical architecture (components, data model, API, state)
- Implementation plan (3 phases)
- Edge cases & error handling
- Testing strategy (unit, integration, e2e, accessibility, performance)
- Analytics & metrics
- Security considerations (auth, authorization, OWASP)
- Performance considerations
- Accessibility requirements (WCAG 2.1 AA)
- SEO considerations
- Migration strategy (if replacing existing)
- Documentation requirements
- Rollout strategy & rollback plan
- Definition of done checklist
- Dependencies & blockers
- Risks & mitigation
- Timeline estimates

**How to use**:
1. Copy to your project as `feature-planning.md` or create in `.ai/planning/`
2. Fill out each section relevant to your feature
3. Use as **CODA Details** section for complex features
4. Review with team before implementation

**When to use**:
- Planning any new feature (not just component)
- Feature involves multiple components/pages/systems
- Feature impacts multiple user flows
- Before starting implementation (saves rework)

**When to skip**:
- Simple bug fixes
- Minor content updates
- Obvious, trivial changes
- Single-component additions (use component-planning.md instead)

**Example included**: Customer onboarding flow

---

### 4. **component-planning.md**
**UI component planning template**

**Purpose**: Structure component design before coding.

**What it includes** (472 lines):
- Component overview & requirements
- Props/API design (TypeScript interfaces)
- Design specifications (colors, typography, spacing, shadows)
- States (default, hover, active, disabled, loading, error)
- Animations (type, trigger, duration, easing)
- Component structure & file organization
- Dependencies (external libraries + internal)
- Implementation approach (8-step plan)
- Usage examples (basic, with all options, real-world)
- Integration points (where used)
- Testing strategy (unit, visual regression, accessibility)
- Edge cases & error handling
- Performance considerations (bundle size, render performance)
- Accessibility checklist (WCAG 2.1 AA)
- Design system compliance checklist
- Documentation requirements
- Definition of done

**How to use**:
1. Copy to your project's `.ai/planning/` directory
2. Fill out before building any new component
3. Use as **CODA Details** for complex components
4. Keep alongside component code for reference

**When to use**:
- Planning any new component
- Component requirements aren't crystal clear
- Before starting implementation

**When to skip**:
- Minor changes to existing component
- Trivial wrapper component
- Obvious, simple component with 1-2 props

**Example included**: Button component planning

---

## Templates Organization

```
templates/
├── README.md                      # This file
├── CLAUDE.md.template             # Root AI instructions
├── env.local.example.template     # Environment variables
├── feature-planning.md            # Feature planning (CODA Details)
└── component-planning.md          # Component planning (CODA Details)
```

---

## How Templates Work with the Framework

### Integration with CODA

All planning templates are designed to work with the **CODA framework** ([`../frameworks/coda.md`](../frameworks/coda.md)):

**For Features** (using feature-planning.md):
1. **CODA Context**: Why this feature is needed, current state
2. **CODA Objective**: What success looks like
3. **CODA Details**: Use **feature-planning.md** template
4. **CODA Acceptance**: Pull from "Definition of Done" section

**For Components** (using component-planning.md):
1. **CODA Context**: Why this component is needed
2. **CODA Objective**: What it should achieve
3. **CODA Details**: Use **component-planning.md** template
4. **CODA Acceptance**: Pull from "Definition of Done" section

### Integration with Design Variations

Planning templates reference the **Design Variations workflow** ([`../frameworks/design-variations.md`](../frameworks/design-variations.md)):

- In **Design Specifications** section, note: "Link to demo page if using Design Variations workflow"
- Always create 5 variations on demo page before final implementation
- Use variations to inform component/feature design decisions

### Integration with Development Principles

Templates enforce the **5 Development Principles** ([`../core/DEVELOPMENT-PRINCIPLES.md`](../core/DEVELOPMENT-PRINCIPLES.md)):

1. **Simplicity First**: Start with MVP, add complexity incrementally
2. **Incremental Progress**: Break into phases (Foundation → Core → Polish)
3. **Verification Before Implementation**: Plan using templates BEFORE coding
4. **Continuous Communication**: Share plans with team/client
5. **Quality Scoring**: Use Definition of Done checklists (80/100 minimum)

---

## Customization Guide

### Step 1: Copy Template to Your Project

```bash
# Example: Starting a new Next.js project
cp .ai-framework/templates/CLAUDE.md.template ./CLAUDE.md
cp .ai-framework/templates/env.local.example.template ./.env.local.example
```

### Step 2: Replace Placeholders

All templates use `[PLACEHOLDER]` format. Find and replace:

- `[PROJECT_NAME]` → Your project name
- `[Your heading font]` → Your chosen font
- `[Feature Name]` → Actual feature name
- `[Component Name]` → Actual component name
- etc.

### Step 3: Customize for Your Stack

**CLAUDE.md.template**:
- Update tech stack section
- Add/remove sections based on your needs

**env.local.example.template**:
- Uncomment sections you need
- Remove sections you don't use
- Add project-specific variables

**Planning templates**:
- Keep all sections initially
- Remove sections not applicable after first use
- Add project-specific sections if needed

---

## Template Maintenance

### Updating Templates

As you work on projects, you'll discover improvements:

1. **Good pattern discovered?** → Update template
2. **Missing section?** → Add to template
3. **Unused section?** → Consider removing

Keep templates in sync with real-world usage.

### Contributing Back to Lost Monster

If you improve a template significantly:

1. Update the template in Lost Monster repository
2. Document the change in template's "Version History" (if applicable)
3. Update this README if new template added

---

## Quick Start Checklist

**Starting a new project?** Use this checklist:

- [ ] Copy `CLAUDE.md.template` → `CLAUDE.md` in project root
- [ ] Customize `CLAUDE.md` with project name and tech stack
- [ ] Copy `env.local.example.template` → `.env.local.example`
- [ ] Uncomment needed integrations in `.env.local.example`
- [ ] Copy `.env.local.example` → `.env.local` and fill in actual values
- [ ] Add `.env.local` to `.gitignore`
- [ ] Copy planning templates to `.ai/planning/` directory
- [ ] Copy `.ai-framework/` directory structure to your project
- [ ] Customize `PROJECT-TEMPLATE.md` with your project specifics

**Time saved**: ~2-3 hours per new project

---

## Template Value Proposition

### Time Saved Per Project

**Without templates**:
- Setting up environment variables: 1-2 hours (documentation searching)
- Planning feature structure: 30-60 min (starting from scratch)
- Planning component structure: 20-40 min (starting from scratch)
- Configuring AI instructions: 20-30 min (explaining project context)

**Total**: ~3-4 hours per project

**With templates**:
- Copy and customize: 15-30 minutes
- Planning is structured and comprehensive
- AI immediately understands project context

**Total**: ~30 minutes per project

**Time saved**: ~3 hours per project

### Quality Improvements

1. **Consistency**: Same structure across all projects
2. **Completeness**: Nothing forgotten (checklists ensure coverage)
3. **Best practices**: Battle-tested patterns from production
4. **Documentation**: Self-documenting planning process

---

## Related Resources

- **CODA Framework**: [`../frameworks/coda.md`](../frameworks/coda.md)
- **Design Variations**: [`../frameworks/design-variations.md`](../frameworks/design-variations.md)
- **Development Principles**: [`../core/DEVELOPMENT-PRINCIPLES.md`](../core/DEVELOPMENT-PRINCIPLES.md)
- **Workflow**: [`../core/WORKFLOW.md`](../core/WORKFLOW.md)
- **Project Template**: [`../project-template/PROJECT-TEMPLATE.md`](../project-template/PROJECT-TEMPLATE.md)

---

## Version History

**v2.1.0** (2025-01-09)
- Initial extraction from Ancarraig production project
- Added CLAUDE.md.template
- Added env.local.example.template (14 sections, 290 lines)
- Added feature-planning.md (622 lines)
- Added component-planning.md (472 lines)
- Created templates README with usage guide

---

**Questions?** Refer to the main framework docs in [`../.ai-framework/README.md`](../README.md)
