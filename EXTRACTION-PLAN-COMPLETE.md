# Complete Ancarraig → Lost Monster Extraction Plan

> **CODA Analysis Results: 12 Additional Vital Pieces Discovered**
>
> Date: 2025-01-09
> Status: Ready for Extraction

---

## Executive Summary

Through systematic CODA analysis of Ancarraig, we've identified **12 additional vital pieces** beyond the initial 8 items. These pieces represent production-tested patterns, templates, and guides that will save 6-24 hours per future project.

**Total Items to Extract**: 20 pieces (8 initial + 12 discovered)

---

## Already Extracted ✅

From initial extraction session:

1. ✅ CLAUDE.md template
2. ✅ Core AI framework (CODA, Design Variations, Principles, Workflow, Communication)
3. ✅ Project templates (PRE-DESIGN-CHECKLIST, DESIGN-SCORES, PROJECT)
4. ✅ Framework README and INDEX

---

## 12 New Discoveries from CODA Analysis

### 📦 PRIORITY 1: Templates & Config (Must Have - 30 min)

#### 1. globals.css Template ⭐ CRITICAL
- **Source**: `src/styles/globals.css` (186 lines)
- **Destination**: `/design-systems/templates/globals.css.template`
- **Value**: Production CSS with design tokens, utilities, accessibility
- **Contains**:
  - CSS custom properties (fonts, animation durations, easing)
  - Typography base styles (h1-h6, responsive)
  - Focus styles for accessibility
  - Reduced motion support
  - Glass morphism utilities
  - Hover effects (lift, scale)
  - Image overlay gradients
  - Aspect ratios
  - Scrollbar styling
  - Animation delays

---

#### 2. .env.local.example Template ⭐ CRITICAL
- **Source**: `.env.local.example` (93 lines)
- **Destination**: `/.ai-framework/templates/env.local.example.template`
- **Value**: Complete environment variables for all integrations
- **Sections**:
  - Site configuration
  - Sanity CMS (project ID, dataset, token)
  - Affiliate programs (Viator, Booking.com, TripAdvisor)
  - Trello integration (API, board IDs)
  - Google Analytics
  - Stripe (test/prod keys, webhooks)
  - Admin auth (credentials, sessions)
  - Email (Resend)

---

#### 3. Feature Planning Template ⭐ CRITICAL
- **Source**: `.ai/templates/feature-planning.md` (622 lines)
- **Destination**: `/.ai-framework/templates/feature-planning.md`
- **Value**: Comprehensive structure for planning features
- **Contains**:
  - Feature overview
  - User stories framework
  - Requirements (functional + non-functional)
  - User flows
  - UI/UX design
  - Technical architecture
  - Implementation phases
  - Edge cases & error handling
  - Testing strategy
  - Analytics & metrics
  - Security considerations
  - Performance requirements
  - Accessibility checklist
  - SEO considerations
  - Definition of done

---

#### 4. Component Planning Template ⭐ CRITICAL
- **Source**: `.ai/templates/component-planning.md` (472 lines)
- **Destination**: `/.ai-framework/templates/component-planning.md`
- **Value**: Structure for planning UI components
- **Contains**:
  - Component overview
  - Props/API design
  - Design specifications
  - States (default, hover, active, disabled, loading, error)
  - Animations
  - Implementation approach
  - Usage examples
  - Testing strategy
  - Performance considerations
  - Accessibility checklist
  - Design system compliance

---

### 🔌 PRIORITY 2: Integration Guides (High Value - 45 min)

#### 5. Sanity CMS Setup Guide ⭐ IMPORTANT
- **Source**: `docs/setup/SANITY_SETUP.md`
- **Destination**: `/integrations/sanity-cms/SETUP-GUIDE.md`
- **Value**: Complete Sanity integration walkthrough
- **Contains**:
  - Project creation steps
  - Environment variables
  - Studio access
  - CORS configuration
  - Initial content population
  - Schema design patterns

---

#### 6. Stripe Integration Guide ⭐ IMPORTANT
- **Source**: Extract from `src/lib/stripe.ts` and docs
- **Destination**: `/integrations/stripe/SETUP-GUIDE.md`
- **Value**: Payment processing setup
- **Contains**:
  - API keys setup (test/production)
  - Webhook configuration
  - Environment variables
  - Common patterns
  - Error handling

---

#### 7. Google Analytics Setup ⭐ IMPORTANT
- **Source**: `docs/setup/GOOGLE-ANALYTICS-SETUP.md`
- **Destination**: `/integrations/google-analytics/SETUP-GUIDE.md`
- **Value**: Analytics integration pattern
- **Contains**:
  - GA4 setup
  - Measurement ID configuration
  - Event tracking patterns
  - Common metrics

---

#### 8. Trello MCP Setup Guide ⭐ IMPORTANT
- **Source**: `.ai/frameworks/trello-mcp-setup.md`, `.ai/workflows/trello-workflow.md`
- **Destination**: `/.ai-framework/workflows/trello-mcp-setup.md`
- **Value**: Complete Trello workflow automation
- **Contains**:
  - MCP server setup
  - API credentials
  - Board/list structure
  - Automation patterns
  - Fix → Commit → Trello workflow

---

### 🛠️ PRIORITY 3: Utilities & Scripts (Useful - 30 min)

#### 9. Core Utils Library ⭐ IMPORTANT
- **Source**: `src/lib/utils.ts` (40 lines)
- **Destination**: `/utilities/react-nextjs/utils.ts`
- **Value**: Production-tested utility functions
- **Contains**:
```typescript
// cn() - Tailwind class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// naturalEase - Animation timing
export const naturalEase = [0.25, 0.46, 0.45, 0.94] as const;

// formatPrice() - GBP currency
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(amount);
}

// formatDate() - Date formatter
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
```

---

#### 10. Scripts Directory 🔧 USEFUL
- **Source**: `scripts/` directory
- **Destination**: `/utilities/scripts/`
- **Value**: Automation for common tasks
- **Contains**:
  - Release automation
  - Git hooks installation
  - Testing helpers
  - Deployment scripts

---

### 📝 PRIORITY 4: Config Examples (Reference - 20 min)

#### 11. Tailwind Config Template ⭐ IMPORTANT
- **Source**: `tailwind.config.ts` (154 lines)
- **Destination**: `/design-systems/tailwind-config-template.ts`
- **Value**: Complete design system implementation
- **Contains**:
  - Full color scales (50-900) for primary/secondary/accent/neutral
  - Responsive typography with line-heights
  - 8px spacing system
  - Natural ease timing functions
  - Custom animations (fade-in, slide-up, ken-burns)
  - Shadow system
  - Border radius system

---

#### 12. Playwright Config 🔧 USEFUL
- **Source**: `playwright.config.ts`
- **Destination**: `/.ai-framework/templates/playwright.config.ts.template`
- **Value**: E2E testing setup pattern

---

## From Initial Plan (Still Pending)

#### 13. DESIGN-BRIEF.md Template
- **Source**: `DESIGN-BRIEF.md` (505 lines)
- **Destination**: `/.ai-framework/templates/DESIGN-BRIEF.md.template`

#### 14. Package.json Template
- **Source**: `package.json` with all scripts
- **Destination**: `/.ai-framework/templates/package.json.template`

---

## Complete File Structure After Extraction

```
lostmonster/
├── .ai-framework/
│   ├── README.md                            ✅ Done
│   ├── INDEX.md                             ✅ Done
│   ├── EXTRACTION-COMPLETE.md               ✅ Done
│   │
│   ├── core/                                ✅ Done (all 3 files)
│   │   ├── DEVELOPMENT-PRINCIPLES.md
│   │   ├── WORKFLOW.md
│   │   └── COMMUNICATION.md
│   │
│   ├── frameworks/                          ✅ Done (2 files)
│   │   ├── coda.md
│   │   └── design-variations.md
│   │
│   ├── project-template/                    ✅ Done (3 files)
│   │   ├── PROJECT-TEMPLATE.md
│   │   ├── PRE-DESIGN-CHECKLIST.md
│   │   └── DESIGN-SCORES.md
│   │
│   ├── templates/                           ⏳ In Progress
│   │   ├── CLAUDE.md.template               ✅ Done
│   │   ├── DESIGN-BRIEF.md.template         ❌ TODO
│   │   ├── package.json.template            ❌ TODO
│   │   ├── env.local.example.template       ❌ TODO
│   │   ├── globals.css.template             ❌ TODO
│   │   ├── playwright.config.ts.template    ❌ TODO
│   │   ├── feature-planning.md              ❌ TODO
│   │   ├── component-planning.md            ❌ TODO
│   │   └── README.md                        ❌ TODO
│   │
│   └── workflows/                           ❌ TODO
│       ├── trello-workflow.md
│       └── trello-mcp-setup.md
│
├── design-systems/
│   ├── ancarraig-scandi-scot/              ✅ Done
│   │   └── README.md
│   ├── tailwind-config-template.ts          ❌ TODO
│   └── templates/                           ❌ TODO
│       ├── globals.css.template
│       └── README.md
│
├── utilities/                               ❌ TODO (NEW)
│   ├── react-nextjs/
│   │   ├── utils.ts
│   │   └── README.md
│   └── scripts/
│       ├── release-automation/
│       ├── git-hooks/
│       └── README.md
│
├── integrations/                            ❌ TODO (NEW)
│   ├── sanity-cms/
│   │   └── SETUP-GUIDE.md
│   ├── stripe/
│   │   └── SETUP-GUIDE.md
│   ├── google-analytics/
│   │   └── SETUP-GUIDE.md
│   └── README.md
│
└── docs/
    └── guides/
        └── ANCARRAIG-ANALYSIS.md           ✅ Done
```

---

## Extraction Progress

### Completed (11 files) ✅
1. Core framework files (5)
2. Project templates (3)
3. Main README & INDEX (2)
4. CLAUDE.md template (1)

### Remaining (20 files) ❌
**Phase 1 - Critical Templates**: 5 files
**Phase 2 - Integration Guides**: 4 files + README
**Phase 3 - Utilities**: 2 files + README
**Phase 4 - Config Templates**: 3 files
**Phase 5 - Documentation**: 3 updates
**From initial plan**: 2 files

---

## Time Estimates

**Already Spent**: ~2 hours (initial extraction)

**Remaining Work**:
- Phase 1 (Templates): 30 min
- Phase 2 (Integrations): 45 min
- Phase 3 (Utilities): 30 min
- Phase 4 (Configs): 20 min
- Phase 5 (Documentation): 15 min

**Total Remaining**: ~2 hours 20 minutes

**Total Project Time**: ~4 hours 20 minutes

---

## Value Proposition

### Time Saved Per Future Project

**Without Lost Monster**:
- Sanity setup: 2 hours
- Stripe setup: 1.5 hours
- Trello setup: 1 hour
- Design system setup: 2 hours
- Utils setup: 1 hour
- Planning templates: 30 min
- Total: **8 hours per project**

**With Lost Monster**:
- Copy templates: 15 min
- Customize: 30 min
- Total: **45 minutes per project**

**Savings: 7+ hours per project** (10x faster)

---

## Priority Order for Completion

### Do Immediately (Highest ROI):
1. globals.css template
2. .env.local.example template
3. Tailwind config template
4. Core utils library
5. Feature/component planning templates

### Do Next (High Value):
6. Sanity setup guide
7. Trello workflow
8. Stripe setup guide
9. Integrations README

### Do Last (Nice to Have):
10. Scripts directory
11. Playwright config
12. Package.json template
13. Documentation updates

---

## Success Criteria

Lost Monster extraction is COMPLETE when:

✅ **Quick Start Test**: Can spin up new project in <30 minutes
✅ **No Ancarraig Lookups**: All questions answered in Lost Monster
✅ **Integration Coverage**: Guides exist for all common services
✅ **Template Coverage**: Planning templates for features & components
✅ **Quality Standard**: All files documented with examples
✅ **Maintenance Plan**: Version numbers and last-updated dates

---

## Next Steps

1. **Execute Phase 1**: Extract critical templates (30 min)
2. **Execute Phase 2**: Extract integration guides (45 min)
3. **Execute Phase 3**: Extract utilities (30 min)
4. **Execute Phase 4**: Extract config templates (20 min)
5. **Execute Phase 5**: Update documentation (15 min)

**Total: 2 hours 20 minutes to completion**

---

**Status**: Ready to execute
**Approved**: Yes
**Estimated Completion**: +2.5 hours from start
