# Framework Map & Integration Guide

> **Quick reference for all available frameworks**
> Last updated: 2026-01-13

---

## Naming Convention

**All frameworks end with X.** This identifies them as executable, trigger-based frameworks.

### Rules

| Rule | Example | Why |
|------|---------|-----|
| **Always ends with X** | PLANX, CODAX, DEMX | X = eXecutable framework |
| **4-5 letters max** | APEX (4), PLANX (5) | Short = fast to type |
| **UPPERCASE** | CODAX not codax | Stands out as a command |
| **Abbreviated base word** | SOFAX (sophia), TUCHX (touch) | Keep it punchy |

### Naming Formula

```
[BASE WORD abbreviated to 3-4 letters] + X = Framework Name

Examples:
- CODA → CODAX (Context Objective Details Acceptance + X)
- PLAN → PLANX (Plan + X)
- SOPHIA → SOFAX (Sophia abbreviated + X)
- TOUCH → TUCHX (Touch abbreviated + X)
- RAPID → RAPIX (Rapid abbreviated + X)
```

### When Creating New Frameworks

1. Choose a memorable base word (what the framework does)
2. Abbreviate to 3-4 letters if needed
3. Add X suffix
4. Total should be 4-5 letters
5. Add to this map with trigger and target

---

## Quick Summary

| Framework | One-Line Description | Trigger | Target |
|-----------|---------------------|---------|--------|
| **APEX** | Meta-framework that orchestrates all others for complete systems | `APEX: [feature]` | All gates pass |
| **CODAX** | Strategic planning: Context → Objective → Details → Acceptance | `CODAX` | Clear plan |
| **PLANX** | Execution blueprint with milestones and granular todos | `PLANX: [feature]` | All todos checked |
| **AIDAX** | Content structure for conversion: Attention → Interest → Desire → Action | `AIDAX` | 80+ / 100 |
| **SOFAX** | Design & UX quality audit across 8 dimensions | `SOFAX` | 85+ / 100 |
| **TUCHX** | Mobile-native web transformation (iOS/Android patterns, gestures) | `TUCHX` | 60fps, 44px+ |
| **CRUDX** | Full-stack content management (6 layers: DB → Types → API → Admin → Components → Integration) | `CRUDX` | All 6 layers |
| **RAPIX** | Prompt engineering from vague input ("broken" → comprehensive fix) | `RAPIX` | Bulletproof prompt |
| **DEMX** | Rapid design variations (5 options with AIDA scoring) | `DEMX: [element]` | 36+ / 40 |
| **ZPATX** | Layout framework for landing pages (visual scanning path) | `ZPATX` | Clear hierarchy |
| **AUDIX** | System health audit (DB, API, Auth, services verification) | `AUDIX` | All services healthy |
| **CONEX** | Universal database connection (type-safe patterns) | `CONEX: [feature]` | All layers connected |
| **CONSX** | UI consistency scanner (find conflicts, pattern mismatches) | `CONSX: [page]` | Zero conflicts |
| **HARDX** | Hardcoded value detection (colors, URLs, magic numbers) | `HARDX` | Zero hardcoded values |
| **MAPX** | Complete application mapping (routes, flows, connections) | `MAPX` | Full system map |
| **PIXLX** | Pixel-perfect bug hunting (UI/UX issues, QA audit) | `PIXLX` | 90+ / 100 |
| **DESKX** | Desktop experience optimization (large screen, 1024px+) | `DESKX` | 85+ / 100 |
| **ADMINX** | Super-admin system with user management, RBAC, and audit logging | `ADMINX` | Complete system |
| **PRDX** | PRD validation through 9-round Q&A (validates assumptions, defines success) | `PRDX: [feature]` | Validated PRD |

---

## 🗺️ Framework Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE META-FRAMEWORK                            │
└─────────────────────────────────────────────────────────────────┘
                          ┌──────┐
                          │ APEX │  ← ONE COMMAND, FULL SYSTEM
                          └───┬──┘
                              │ (Orchestrates all frameworks below)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    UNIVERSAL FRAMEWORKS                          │
│                   (Use across all projects)                      │
└─────────────────────────────────────────────────────────────────┘

    STRATEGY       EXECUTION    CONTENT      DESIGN       MOBILE
    ┌──────┐      ┌──────┐     ┌──────┐     ┌──────┐    ┌──────┐
    │ CODA │      │PLANX │     │ AIDA │     │SOPHIA│    │TOUCH │
    └──────┘      └──────┘     └──────┘     └──────┘    └──────┘
       │             │             │             │           │
       │             │             │             │           │
       └─────────────┴─────────────┴─────────────┴───────────┘
                                    │
    PROMPTS       FULL-STACK    VARIATIONS    LAYOUT
    ┌──────┐      ┌──────┐     ┌──────┐     ┌─────────┐
    │RAPID │      │CRUDX │     │ DEMX │     │Z-PATTERN│
    └──────┘      └──────┘     └──────┘     └─────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  PROJECT-SPECIFIC FRAMEWORKS                     │
│                   (Project-specific implementations)             │
└─────────────────────────────────────────────────────────────────┘

    DESIGN UI                  CONTENT
    ┌──────────────┐          ┌────────────────┐
    │   DESIGN     │          │    CONTENT     │
    │  VARIATIONS  │          │    FORMULA     │
    └──────────────┘          └────────────────┘
```

---

## 📊 When to Use Each Framework

### APEX - The Meta-Framework (Ultimate Orchestrator)
**When:** Major features requiring full stack, complete systems, high-visibility pages
**Not for:** Simple tasks, bug fixes, single-framework needs

```
Use APEX when:
✅ Building complete systems (blog, testimonials, products, team members)
✅ Features requiring full stack (backend + frontend + admin + mobile)
✅ High-visibility pages (homepage sections, landing pages)
✅ Want zero missed steps and production-ready output
✅ Need all aspects: management + display + mobile + quality

Skip APEX when:
❌ Simple bug fixes or style changes
❌ Single-aspect work (just backend or just frontend)
❌ Quick prototypes
❌ Tasks benefiting from only 1-2 frameworks
```

**One Command:**
```
APEX: [feature description]
```

**The 6-Stage Workflow:**
1. **RAPID** (Stage 1) - Interpret rough input → comprehensive requirements
2. **CODA** (Stage 2) - Plan comprehensively → user approval required
3. **CRUDX** (Stage 3) - Build complete backend (DB + API + Admin + Integration)
4. **AIDA** (Stage 4) - Structure content for conversion (score 80+ required)
5. **TOUCH** (Stage 5) - Transform for mobile-native (60fps + gestures)
6. **SOPHIA** (Stage 6) - Audit quality (score 85+ required, iterate until passing)

**Result:** Production-ready system with complete backend, custom admin, conversion-optimized content, mobile-native experience, quality-audited design.

**Partial Modes:**
- `APEX-STATIC` - Skip backend (CRUDX)
- `APEX-DESKTOP` - Skip mobile (TOUCH)
- `APEX-BACKEND` - Backend only
- `APEX-FRONTEND` - Frontend only

---

### CODA - Strategic Planning Framework
**When:** Complex features, design system changes, architectural decisions
**Not for:** Simple bug fixes, single-file updates

```
Use CODA when:
✅ Planning new features (3+ coordinated changes)
✅ Complex UI sections requiring multiple components
✅ Design system changes affecting multiple files
✅ Major architectural decisions
✅ Work requiring stakeholder alignment

Skip CODA when:
❌ Simple bug fixes
❌ Single-file updates
❌ Typo corrections
❌ Obvious changes
```

**Framework Structure:**
- **C**ontext: What exists? What's the situation?
- **O**bjective: What are we building? Why?
- **D**etails: How exactly should it work?
- **A**cceptance: How do we know it's done?

**Modes:**
- **Light CODA:** Think in CODA, communicate conversationally (default)
- **Heavy CODA:** Write formal document when explicitly needed

---

### PLANX - Execution Blueprint Framework
**When:** Complex multi-step tasks, multi-session work, critical implementations
**Not for:** Simple fixes, exploratory work, already-planned work

```
Use PLANX when:
✅ Complex features requiring 10+ discrete steps
✅ Multi-session work spanning multiple conversations
✅ Team handoffs where someone else might execute
✅ Critical implementations where missing a step has consequences
✅ Uncertain scope needing full discovery upfront
✅ Documentation-worthy major features

Skip PLANX when:
❌ Simple fixes (bug fixes, typos, single-file changes)
❌ Exploratory work (research, investigation)
❌ Quick iterations (rapid prototyping)
❌ Already-planned work (CODA already produced detailed steps)
```

**Document Structure:**
- **Milestones** - Major phases of work (3-7 per feature)
- **Todos** - Granular tasks (3-8 per milestone)
- **Summary** - One-line description of each todo
- **Detailed Summary** - What/Why/How/Acceptance/Dependencies/Files

**The Rule:** A milestone is complete when all its todos are checked. The feature is complete when all milestones are complete.

**Relationship to Other Frameworks:**
- CODA = "What are we building?" (Strategy)
- PLANX = "How do we execute it step-by-step?" (Execution blueprint)

**Trigger:**
```
PLANX: [feature or task description]
```

---

### AIDA - Content & Conversion Framework
**When:** Structuring page content, user journeys, conversion optimization
**Not for:** Technical documentation, code comments

```
Use AIDA when:
✅ Structuring marketing pages
✅ Email templates
✅ User journey mapping
✅ Conversion optimization
✅ Content strategy
✅ Landing pages

Skip AIDA when:
❌ Technical documentation
❌ Code comments
❌ API documentation
❌ Internal wikis
```

**Framework Structure:**
- **A**ttention (0-25 pts): Grab attention immediately
- **I**nterest (0-25 pts): Build interest with valuable info
- **D**esire (0-25 pts): Create desire through emotion
- **A**ction (0-25 pts): Drive action with clear CTAs

**Scoring:**
- **80-100:** Excellent conversion potential
- **60-79:** Good, minor improvements needed
- **Below 60:** Major revision required

---

### SOPHIA - Design & UX Assessment Framework
**When:** Design audits, component evaluation, UX assessment
**Not for:** Content quality (use AIDA), planning (use CODA)

```
Use SOPHIA when:
✅ Design quality audits
✅ Component evaluation
✅ UX assessment
✅ Design system compliance checks
✅ Before/after comparisons
✅ Quality gate verification

Skip SOPHIA when:
❌ Evaluating content quality (use AIDA)
❌ Planning new features (use CODA)
❌ Code quality reviews
❌ Performance audits
```

**8 Dimensions (0-100 total):**
1. **Typography** (0-15): Font sizing, hierarchy, consistency
2. **Spacing** (0-15): Padding, margins, scroll economy
3. **Touch Targets** (0-10): Button sizes, mobile usability
4. **Information Density** (0-15): Content organisation
5. **Visual Hierarchy** (0-15): Emphasis, color usage
6. **Sophistication** (0-10): Design polish
7. **Consistency** (0-10): Pattern reuse
8. **Accessibility** (0-10): WCAG compliance

**Scoring:**
- **90-100:** Exceptional
- **85-89:** Sophisticated (target)
- **75-84:** Good
- **65-74:** Acceptable
- **Below 65:** Needs work

---

### TOUCH - Mobile-Native Web Framework
**When:** Mobile-first transformation, gesture implementation
**Not for:** Desktop-only apps, native app development

```
Use TOUCH when:
✅ Building mobile-first web applications
✅ Transforming responsive sites to mobile-native
✅ Implementing touch-optimized interactions
✅ Creating PWA experiences
✅ Adding gesture navigation
✅ Platform-specific adaptations (iOS vs Android)

Skip TOUCH when:
❌ Desktop-only applications
❌ Native app development (React Native, Swift, Kotlin)
❌ Simple responsive layouts
❌ Backend/API work
```

**Key Areas:**
- **Platform Detection:** iOS/Android/Tablet/PWA detection
- **iOS Patterns:** Bottom tabs, edge swipe, pull-to-refresh, haptics
- **Android Patterns:** Material Design 3, ripple effects, FAB
- **Gestures:** Tap, swipe, long press, pinch, pan
- **Performance:** 60fps touch response, safe areas

**6 Implementation Parts:**
1. Mobile Experience Audit
2. iOS-Native Implementation
3. Android Material Design
4. Technical Implementation
5. Component Transformation
6. Implementation Roadmap (12-week phased)

---

### RAPID - Prompt Engineering Framework
**Acronym:** **R**ough input → **A**mplify → **P**arse → **I**nfer → **D**eliver perfectly
**When:** Bug fixes from rough descriptions, generating Cursor prompts
**Not for:** Simple questions, research tasks

```
Use RAPID when:
✅ Bug fixes from rough descriptions ("broken", "not working")
✅ UI/UX issues ("looks shit", "feels wrong")
✅ Performance investigations ("slow", "laggy")
✅ Large-scale builds
✅ Generating comprehensive Cursor IDE prompts

Skip RAPID when:
❌ Simple questions (just answer directly)
❌ Research tasks (just do the research)
❌ Clear, detailed requests
❌ When full context already provided
```

**Input Patterns:**
- **"broken"** → Bug Fix template
- **"looks shit"** → UI/UX Fix template
- **"slow"** → Performance template
- **"build X"** → Large Build template

**Operating Principles:**
1. **Assume Competence** - Don't explain basics
2. **Extract, Don't Interrogate** - Max 3 questions, often zero
3. **Interpret Generously** - Expand lazy input
4. **Overkill By Default** - Include validation, edge cases, quality gates
5. **Speak His Language** - Direct, technical, actionable

---

### Z-Pattern - Layout Framework
**When:** Homepage layouts, landing pages, hero sections
**Not for:** Complex multi-column layouts

```
Use Z-Pattern when:
✅ Homepage layouts
✅ Landing pages
✅ Hero sections
✅ Visual hierarchy planning
✅ Single-page designs

Skip Z-Pattern when:
❌ Complex dashboards
❌ Multi-column layouts
❌ Data tables
❌ Form-heavy pages
```

**Pattern:**
```
Logo/Nav ────────────────> Primary CTA
  │                             │
  │                             │
  ▼                             ▼
Primary Content         Secondary Content
  │                             │
  │                             │
  └─────────────────────────────> Final CTA
```

---

### CRUDX - Full-Stack Content Management
**When:** Any content that needs management, building complete backend + frontend systems
**Not for:** Hardcoded content, one-time changes

```
Use CRUDX when:
✅ Adding content that will change (testimonials, routes, offers, team members)
✅ Building features where content is dynamic
✅ Creating collections of items (blog posts, products)
✅ Any time content needs Create, Read, Update, Delete operations
✅ User says "we need to manage [X]"
✅ User says "let's add [content] to this page"

Skip CRUDX when:
❌ Hardcoded content (footer text, static pages)
❌ One-time style changes (button colors, spacing)
❌ Bug fixes
❌ Simple text updates that won't change again
```

**The 6-Layer CRUDX Stack:**
1. **Database** - Supabase PostgreSQL schema (snake_case)
2. **Types** - TypeScript interfaces (camelCase)
3. **API** - REST endpoints with transform layer
4. **Admin UI** - Custom admin page (never Sanity Studio)
5. **Components** - Reusable admin components
6. **Integration** - Nav, preview links, status badges

**Architecture Rules:**
- ❌ Never use Sanity Studio
- ✅ Always build custom admin UI
- ✅ Supabase for storage
- ✅ Transform layer required (snake_case ↔ camelCase)
- ✅ Complete CRUD operations (Create, Read, Update, Delete)

**Trigger Words:**
- "CRUDX"
- "Add [content] to page"
- "Manage [resource]"
- "We need to change [X]"

---

### ADMINX - Super-Admin System Framework
**When:** Building super-admin systems with user management, RBAC, and audit logging
**Not for:** Simple authentication, hardcoded admin emails, single-user systems

```
Use ADMINX when:
✅ Building super-admin dashboards (user management)
✅ Need role-based access control (RBAC)
✅ Multi-user SaaS applications
✅ Compliance requirements (audit trails)
✅ Need 3-tier role hierarchy (Super Admin → Admin → User)
✅ Managing WHO can access the system
✅ User says "we need to manage users"
✅ User says "add admin dashboard for users"

Skip ADMINX when:
❌ Simple login/logout only (just use NextAuth)
❌ Hardcoded admin emails
❌ Single-user applications
❌ No user management needed
❌ Static role assignments
❌ Managing WHAT exists (use CRUDX instead)
```

**The ADMINX Stack:**
1. **Database Schema** - users table with role enum + audit_logs table
2. **Authentication** - NextAuth.js with JWT + role in token
3. **Permission Middleware** - hasRole, requireRole, canManageUser helpers
4. **User CRUD** - API routes with RBAC checks
5. **Audit Logging** - Comprehensive trail with IP/user agent
6. **Admin UI** - Users list, create/edit/delete modals, role assignment
7. **Security Patterns** - Last admin protection, soft deletes, server-side validation

**Role Hierarchy:**
```typescript
const roleHierarchy = {
  super_admin: 3,  // Can manage ALL users
  admin: 2,        // Can manage regular users only
  user: 1          // Can only manage own profile
};

// Permission rule: Can only manage users with LOWER hierarchy
function canManageUser(actorRole: Role, targetRole: Role): boolean {
  return roleHierarchy[actorRole] > roleHierarchy[targetRole];
}
```

**Security Patterns:**
- Server-side permission validation (never trust client)
- Last Super Admin Protection (prevents system lockout)
- Soft deletes (status='inactive')
- Comprehensive audit logging
- Bcrypt password hashing (cost factor 12)

**MVP Features (All 9 Required):**
1. Dashboard home (user stats)
2. Users list page (search, filter)
3. Create user form
4. Edit user form
5. Delete user (with confirmation + last admin check)
6. Assign/change roles (with RBAC)
7. Audit logs page
8. User profile page
9. Settings page

**Trigger:**
```
ADMINX
```

**Framework Files:**
- Definition: `/framework/.ai/frameworks/builders/ADMINX.md`
- Template: `/framework/templates/builders/ADMINX-TEMPLATE.md` (2,500+ lines)
- PLANX: `/framework/templates/builders/ADMINX-PLANX.md` (10 milestones, 5-7 days)

**Extends:** ADMIN-MASTER-REFERENCE.md (universal admin patterns)

---

### PRDX - PRD Validation Framework
**When:** Validating product requirements, planning new features, stress-testing assumptions
**Not for:** Simple bug fixes, already-validated features

```
Use PRDX when:
✅ Planning new product features (need clarity on target market, value prop)
✅ Stress-testing assumptions before building
✅ Defining success metrics and North Star
✅ Validating pricing model and competitive positioning
✅ Want to avoid building the wrong thing
✅ Need stakeholder alignment on product direction
✅ Creating product documentation (PRD, North Star, GTM)
✅ Annual product health checks

Skip PRDX when:
❌ Simple bug fixes or UI updates
❌ Feature requirements already validated
❌ Quick prototypes or experiments
❌ Internal tools with no market validation needed
```

**The 9 Validation Rounds:**
1. **Target Market** - Who are you building for? (Be specific)
2. **Problem/Solution Fit** - Is the problem real and urgent?
3. **Value Proposition** - What's the hero feature?
4. **Feature Prioritization** - MVP vs Phase 2 vs Can Cut
5. **Pricing** - How do you make money?
6. **Competitive Positioning** - What's your wedge?
7. **Technical Validation** - Tech stack and risks
8. **Go-to-Market** - How do you get first 100 customers?
9. **Success Metrics** - What's the North Star?

**Output Documents:**
- Validated PRD
- North Star (one-page manifesto)
- Competitive analysis
- Pricing rationale
- GTM playbook

**Time:** 60-90 minutes of focused Q&A

**Trigger:**
```
PRDX: [feature or product description]
```

---

### DEMX - Rapid Design Variation System
**Trigger:** `DEMX: [target element]`
**When:** Exploring visual approaches, redesigning components, design decisions
**Not for:** Bug fixes, exact specifications already provided

```
Use DEMX when:
✅ Exploring visual approaches for UI elements
✅ Redesigning existing components
✅ Deciding between layout options
✅ Any design decision where multiple approaches are valid
✅ Want to see options before committing

Skip DEMX when:
❌ Bug fixes (just fix it)
❌ Exact specifications provided (just implement)
❌ Backend/API work (no visual component)
❌ Simple color/spacing tweaks (just adjust)
```

**The 5-Step Process:**
1. **Micro-Context Check** - Confirm target in 1-2 sentences
2. **Generate 5 Variations** - Dramatically different approaches
3. **Score with AIDA** - 0-10 per dimension, 40 total
4. **Build Demo Page** - Live, interactive at `/demo/[feature]-variations/`
5. **Recommend Winner** - Highest score + reasoning

**Score Interpretation:**
- 36-40: Excellent - Ship it
- 30-35: Good - Minor refinements
- 24-29: Acceptable - Needs iteration
- <24: Weak - Reconsider approach

**Example:**
```
DEMX: vehicle card
```
→ Creates 5 variations, builds demo page, scores with AIDA, recommends winner

---

### Design Variations - UI Design Framework
**Note:** DEMX replaces this framework with a single-word trigger. Use `DEMX: [target]` instead.
**When:** Redesigning existing approved designs
**Not for:** Bug fixes, new features with no existing design

```
Use Design Variations when:
✅ Redesigning existing pages/components
✅ Updating approved layouts
✅ Iterating on visual design
✅ Changing user flows

Skip Design Variations when:
❌ Bug fixes
❌ New features with no existing design
❌ User explicitly says "overwrite" or "just update it"
❌ Simple content updates
```

**Process:**
1. Create exactly 5 different variations on demo page
2. Score each using AIDA (Attention, Interest, Desire, Action)
3. Recommend best option with clear reasoning
4. Wait for user selection
5. Implement chosen variation only after approval

**Demo Page Structure:**
```tsx
<DemoVariation
  number={1}
  scores={{ attention: 8, interest: 7, desire: 9, action: 8 }}
  total={32}
  recommendation="Best for conversion - strong desire trigger"
/>
```

---

### Content Formula - Story-Driven Content
**When:** Highland adventure narratives, case studies, blog posts
**Not for:** Technical documentation, API docs

```
Use Content Formula when:
✅ Case studies
✅ Blog posts
✅ Highland adventure narratives
✅ Customer testimonials
✅ Brand storytelling

Skip Content Formula when:
❌ Technical documentation
❌ API documentation
❌ Help articles
❌ Product specifications
```

**Four-Act Structure:**
1. **Arrival:** Set the scene
2. **Discovery:** Introduce the challenge
3. **Transformation:** Show the solution
4. **Resolution:** Deliver the outcome

**Specs:**
- Length: 1,400-1,600 words
- Character-driven
- Highland-specific
- Technical accuracy

---

## 🔗 Framework Integration Map

### Two-Framework Combinations

```
┌─────────────────────────────────────────────────────────────────┐
│ CODA + AIDA                                                      │
├─────────────────────────────────────────────────────────────────┤
│ CODA: Plan the feature (how to build it)                        │
│ AIDA: Structure the content (what content to include)           │
│ Result: Complete feature planning with conversion focus         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CODA + SOPHIA                                                    │
├─────────────────────────────────────────────────────────────────┤
│ CODA: Plan the feature                                          │
│ SOPHIA: Evaluate design quality objectively                     │
│ Result: Plan and verify design quality                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ AIDA + SOPHIA                                                    │
├─────────────────────────────────────────────────────────────────┤
│ AIDA: Structure content for conversion                          │
│ SOPHIA: Ensure design quality                                   │
│ Result: Conversion-focused, high-quality pages                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ TOUCH + CODA                                                     │
├─────────────────────────────────────────────────────────────────┤
│ CODA: Plan the mobile transformation                            │
│ TOUCH: Implement mobile-native patterns                         │
│ Result: Planned mobile-native implementation                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ TOUCH + SOPHIA                                                   │
├─────────────────────────────────────────────────────────────────┤
│ TOUCH: Implement mobile-native patterns                         │
│ SOPHIA: Audit mobile UX quality                                 │
│ Result: Mobile-native experience with verified quality          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ TOUCH + AIDA                                                     │
├─────────────────────────────────────────────────────────────────┤
│ TOUCH: Mobile-native implementation                             │
│ AIDA: Structure mobile content for conversion                   │
│ Result: Mobile-native, conversion-optimized experience          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CRUDX + CODA                                                     │
├─────────────────────────────────────────────────────────────────┤
│ CODA: Plan the feature (Context → Objective → Details)          │
│ CRUDX: Build the complete management system (DB → API → UI)     │
│ Result: Planned full-stack implementation                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CODA + PLANX                                                     │
├─────────────────────────────────────────────────────────────────┤
│ CODA: Strategic planning (WHAT are we building?)                │
│ PLANX: Execution breakdown (HOW do we build it step-by-step?)   │
│ Result: Strategy + exhaustive execution blueprint               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PLANX + CRUDX                                                    │
├─────────────────────────────────────────────────────────────────┤
│ PLANX: Break down into milestones/todos with context            │
│ CRUDX: Execute each backend layer systematically                │
│ Result: Nothing missed, full audit trail of decisions           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PLANX + AIDA                                                     │
├─────────────────────────────────────────────────────────────────┤
│ PLANX: Milestones for content strategy + implementation         │
│ AIDA: Score targets embedded in todo acceptance criteria        │
│ Result: Conversion-optimized content with execution tracking    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PLANX + SOPHIA                                                   │
├─────────────────────────────────────────────────────────────────┤
│ PLANX: Quality audit as final milestone with fix todos          │
│ SOPHIA: Score targets in acceptance criteria (85+ required)     │
│ Result: Design quality guaranteed through systematic execution  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CRUDX + AIDA                                                     │
├─────────────────────────────────────────────────────────────────┤
│ AIDA: Structure the public-facing content for conversion        │
│ CRUDX: Provide the admin interface to manage that content       │
│ Result: Conversion-optimized content with management system     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CRUDX + SOPHIA                                                   │
├─────────────────────────────────────────────────────────────────┤
│ CRUDX: Build the admin UI                                       │
│ SOPHIA: Audit the admin UX quality                              │
│ Result: High-quality admin interface                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ RAPID + Any Framework                                            │
├─────────────────────────────────────────────────────────────────┤
│ RAPID: Generate comprehensive prompts from rough descriptions   │
│ Any Framework: Execute the generated prompt                     │
│ Result: Low-effort input → high-quality output                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ DEMX + CODA                                                      │
├─────────────────────────────────────────────────────────────────┤
│ CODA: Plan WHAT to build                                        │
│ DEMX: Explore HOW it should look (5 variations)                 │
│ Result: Planned feature with visual exploration                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ DEMX + SOPHIA                                                    │
├─────────────────────────────────────────────────────────────────┤
│ DEMX: Generate 5 variations with AIDA scores                    │
│ SOPHIA: Deep audit of chosen variation (85+ target)             │
│ Result: Rapid exploration + quality verification                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ADMINX + CRUDX (Most Common)                                     │
├─────────────────────────────────────────────────────────────────┤
│ ADMINX: Manages WHO can access (users, roles, permissions)      │
│ CRUDX: Manages WHAT exists (content, data)                      │
│ Result: Complete SaaS with user AND content management          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ADMINX + PLANX                                                   │
├─────────────────────────────────────────────────────────────────┤
│ ADMINX: Defines WHAT to build (super-admin system)              │
│ PLANX: Defines HOW to build it (10 milestones, 5-7 days)        │
│ Result: Systematic implementation with no missed steps           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ADMINX + DARKX                                                   │
├─────────────────────────────────────────────────────────────────┤
│ ADMINX: User management system                                  │
│ DARKX: Dark mode theming                                        │
│ Result: Admin system with dark mode support                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ADMINX + SOPHIA                                                  │
├─────────────────────────────────────────────────────────────────┤
│ ADMINX: Build admin dashboard                                   │
│ SOPHIA: Audit admin UX quality (85+ target)                     │
│ Result: High-quality admin interface                            │
└─────────────────────────────────────────────────────────────────┘
```

---

### The Complete Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE COMPLETE FRAMEWORK STACK                  │
└─────────────────────────────────────────────────────────────────┘

    1. RAPID ──────────────> Generate comprehensive prompt
                             │
    2. CODA ──────────────> Plan the feature
                             │
    3. CRUDX ─────────────> Build management system (if content needs CRUD)
                             │
    4. AIDA ──────────────> Structure content for conversion
                             │
    5. TOUCH ─────────────> Transform for mobile-native
                             │
    6. SOPHIA ────────────> Audit quality & iterate
                             │
                        ┌────┴────┐
                        │ LAUNCH  │
                        └─────────┘

Result: Complete, high-quality, conversion-focused, mobile-native
        features with full content management and minimal cognitive load
```

---

## 🎯 Common Workflows

### Workflow 1: New Marketing Page

```
Step 1: CODA (Light)
├─ Think through Context → Objective → Details → Acceptance
└─ Present understanding conversationally

Step 2: AIDA
├─ Plan content flow: Attention → Interest → Desire → Action
├─ Score each section (target 80+)
└─ Optimise weak sections

Step 3: SOPHIA
├─ Audit design across 8 dimensions
├─ Score components (target 85+)
└─ Fix violations, re-score

Step 4: TOUCH (if mobile-focused)
├─ Audit current mobile experience
├─ Implement iOS/Android patterns
├─ Add gestures and haptic feedback
└─ Optimise for touch interactions

Result: High-converting, high-quality, mobile-native page
```

---

### Workflow 2: Redesigning Existing Component

```
Step 1: Design Variations
├─ Create 5 distinct variations on /demo page
├─ Score each with AIDA framework
├─ Recommend best option
└─ Wait for user selection

Step 2: SOPHIA (on chosen variation)
├─ Audit design quality (target 85+)
└─ Refine if needed

Step 3: Implement
├─ Apply chosen design to production
└─ Verify in all breakpoints

Result: User-approved, high-quality design implementation
```

---

### Workflow 3: Bug Fix from Vague Description

```
Step 1: RAPID
├─ User: "The checkout is broken"
├─ RAPID interprets and generates comprehensive prompt
├─ Includes: reproduction steps, validation, edge cases
└─ Outputs bulletproof prompt

Step 2: Execute
├─ Follow RAPID-generated prompt
├─ Fix bug with full test coverage
└─ Verify edge cases

Result: Thorough bug fix from minimal input
```

---

### Workflow 4: Mobile-Native Transformation

```
Step 1: CODA
├─ Plan mobile transformation strategy
└─ Define scope and acceptance criteria

Step 2: TOUCH
├─ Audit current mobile experience
├─ Implement iOS patterns (haptics, gestures, bottom tabs)
├─ Implement Android patterns (Material 3, ripple, FAB)
└─ 60fps performance optimization

Step 3: SOPHIA
├─ Audit mobile UX quality
├─ Focus on: Touch Targets, Spacing, Accessibility
└─ Iterate until 85+ score

Step 4: AIDA (for mobile content)
├─ Optimise content for mobile context
└─ Ensure clear mobile CTAs

Result: Native-quality mobile web experience
```

---

## 📈 Scoring Reference

### AIDA Scoring (0-100 total)
- **Attention:** 0-25 points
- **Interest:** 0-25 points
- **Desire:** 0-25 points
- **Action:** 0-25 points

**Targets:**
- 80-100: Excellent
- 60-79: Good
- Below 60: Needs work

---

### SOPHIA Scoring (0-100 total)
- **Typography:** 0-15 points
- **Spacing:** 0-15 points
- **Touch Targets:** 0-10 points
- **Information Density:** 0-15 points
- **Visual Hierarchy:** 0-15 points
- **Sophistication:** 0-10 points
- **Consistency:** 0-10 points
- **Accessibility:** 0-10 points

**Targets:**
- 90-100: Exceptional
- 85-89: Sophisticated (target)
- 75-84: Good
- 65-74: Acceptable
- Below 65: Needs work

---

## 🚀 Quick Decision Tree

```
Need to...

Build complete system?
├─ Major feature (full stack needed) ───────> Use APEX
├─ Want zero missed steps ──────────────────> Use APEX
├─ High-visibility page ────────────────────> Use APEX
└─ Single-framework task ───────────────────> Use individual framework

Plan a feature?
├─ Simple (1-2 files) ──────────────────────> Just do it
├─ Complex (3+ files) ──────────────────────> Use CODA
├─ Need exhaustive execution breakdown? ────> Use PLANX (after CODA)
└─ Need to validate product requirements? ──> Use PRDX (before CODA)

Create content?
├─ Marketing/conversion ────────────────────> Use AIDA
├─ Highland adventure story ────────────────> Use Content Formula
└─ Technical docs ──────────────────────────> Just write it

Evaluate design?
├─ Need objective quality score ───────────> Use SOPHIA
├─ Need conversion score ───────────────────> Use AIDA
└─ Just checking consistency ───────────────> Manual review

Build for mobile?
├─ Just responsive layout ──────────────────> Use standard Tailwind
└─ Native-quality mobile experience ────────> Use TOUCH

Build content management?
├─ Content will need to change ─────────────> Use CRUDX
├─ Dynamic collections (routes, offers) ────> Use CRUDX
├─ User says "add [content] to page" ───────> Use CRUDX
└─ Hardcoded/one-time content ──────────────> Just code it

Build user management?
├─ Need super-admin dashboard ─────────────> Use ADMINX
├─ Multi-user SaaS application ────────────> Use ADMINX
├─ Need role-based access control ─────────> Use ADMINX
├─ Compliance/audit requirements ──────────> Use ADMINX
├─ User says "manage users" ───────────────> Use ADMINX
└─ Simple login/logout only ───────────────> Just use NextAuth

Redesign existing?
├─ Bug fix or small update ─────────────────> Just do it
├─ User says "overwrite" ───────────────────> Update directly
└─ Redesigning approved design ─────────────> Use DEMX

Explore design options?
├─ Want to see variations before committing ─> Use DEMX
├─ Deciding between layouts ──────────────────> Use DEMX
├─ Already have exact spec ───────────────────> Just implement
└─ Backend/API work ──────────────────────────> N/A (no visual)

Generate prompt from lazy input?
├─ Input is vague ("broken", "slow") ───────> Use RAPID
└─ Input is clear and detailed ─────────────> Just execute

Plan layout?
├─ Simple landing page ─────────────────────> Use Z-Pattern
└─ Complex dashboard ───────────────────────> Custom planning
```

---

## 📋 Framework Checklist

### Before Starting Any Task

- [ ] Is this a complex feature? → Consider CODA
- [ ] Does this content need management? → Consider CRUDX
- [ ] Does this need user management? → Consider ADMINX
- [ ] Does this need conversion optimization? → Consider AIDA
- [ ] Am I redesigning something approved? → Use Design Variations
- [ ] Is this mobile-focused? → Consider TOUCH
- [ ] Do I need objective quality scoring? → Consider SOPHIA
- [ ] Is the input vague? → Consider RAPID

### After Completing Any Task

- [ ] If content-heavy: Run AIDA score (target 80+)
- [ ] If UI-heavy: Run SOPHIA score (target 85+)
- [ ] If mobile-native: Verify TOUCH patterns implemented
- [ ] If content system: Verify all 6 CRUDX layers complete
- [ ] If user management: Verify RBAC + audit logs + last admin protection
- [ ] If redesign: Created 5 variations and got user approval?

---

## 🔗 Links to Full Framework Docs

### Meta-Framework
- **APEX:** [docs/frameworks/APEX.md](./APEX.md) ⭐ **START HERE FOR MAJOR FEATURES**

### Builder Frameworks (System Generators)
- **ADMINX:** [builders/ADMINX.md](./builders/ADMINX.md) - Super-admin system with user management, RBAC, audit logging
- **CRUDX:** [builders/CRUDX.md](./builders/CRUDX.md) - Full-stack content management (6 layers: DB → API → UI)
- **[Builder Frameworks Overview](./builders/README.md)** - What builders are and when to use them

### Universal Frameworks
- **CODA:** [docs/frameworks/coda.md](./coda.md) - Strategic planning (What are we building?)
- **PLANX:** [docs/frameworks/PLANX.md](./PLANX.md) - Execution blueprint (How do we build it step-by-step?)
- **PRDX:** [PRDX.md](./PRDX.md) - PRD validation through 9-round Q&A
- **AIDA:** [docs/frameworks/aida.md](./aida.md) - Content & conversion structure
- **SOPHIA:** [docs/frameworks/sophia.md](./sophia.md) - Design & UX assessment
- **TOUCH:** [docs/frameworks/touch.md](./touch.md) - Mobile-native transformation
- **RAPID:** [docs/frameworks/rapid.md](./rapid.md) - Prompt engineering from vague input
- **Z-Pattern:** [docs/frameworks/z-pattern.md](./z-pattern.md) - Layout framework
- **DEMX:** [docs/frameworks/DEMX.md](./DEMX.md) - Rapid design variation system

### Project-Specific Frameworks
- **Design Variations:** [.ai/frameworks/design-variations.md](../../.ai/frameworks/design-variations.md)
- **Content Formula:** [.ai/frameworks/content-formula-NATIVE-SPECIFIC.md](../../.ai/frameworks/content-formula-NATIVE-SPECIFIC.md)

---

## 💡 Best Practices

1. **Use APEX for major features** - One command → complete production-ready system
2. **Use frameworks together** - They're designed to complement each other
3. **Score objectively** - Use AIDA and SOPHIA scoring systems consistently
4. **Iterate based on scores** - Track improvements over time
5. **Don't overthink** - Light CODA (conversational) is the default
6. **Document decisions** - Heavy CODA when needed for future reference
7. **Mobile-first when applicable** - Use TOUCH for mobile-native experiences
8. **Be rapid with RAPID** - Low-effort input → high-quality output
9. **Protect approved designs** - Use `DEMX: [target]` for redesigns
10. **CRUDX for content** - If content needs management, build the full 6-layer system
11. **ADMINX for users** - If user management needed, build complete RBAC + audit system
12. **Explore with DEMX** - One word → 5 variations → AIDA scores → pick winner

---

**Last Updated:** 2026-01-15
**Framework Count:** 18 universal (including APEX, PLANX, ADMINX, PRDX) + project-specific
**Status:** Production-tested and proven across multiple projects

**Pro Tip:** For any major feature, start with `APEX: [feature description]` and let the meta-framework orchestrate everything.

---

## Related Documentation

- **[DOCS-MAP.md](../DOCS-MAP.md)** - Strategic documentation types (PRD, Design System, etc.)
- **[frameworks/README.md](./README.md)** - Framework quick reference
