# Ancarraig Project Analysis - Best-in-Class Patterns

> **Comprehensive extraction of production-ready patterns, components, and standards from the Ancarraig Lodges project**
>
> This document captures all the battle-tested code, design patterns, and organizational structures that should become part of Lost Monster's master repository.

**Analysis Date:** November 9, 2025
**Source Project:** Ancarraig Lodges (Next.js 15 + TypeScript + Tailwind + Sanity)
**Purpose:** Extract reusable patterns for Lost Monster agency standard

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Design System & Theming](#design-system--theming)
3. [Component Library](#component-library)
4. [Utilities & Helpers](#utilities--helpers)
5. [Integration Patterns](#integration-patterns)
6. [Documentation Framework (.ai)](#documentation-framework-ai)
7. [Project Structure](#project-structure)
8. [Performance & Optimization](#performance--optimization)
9. [Recommendations for Lost Monster](#recommendations-for-lost-monster)

---

## Project Overview

### Tech Stack

```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript 5.9.3",
  "styling": "Tailwind CSS 3.4",
  "animations": "Framer Motion 12.x",
  "cms": "Sanity.io 4.13",
  "forms": "React Hook Form 7.66 + Zod 4.1",
  "payments": "Stripe 19.3",
  "icons": "Lucide React 0.548",
  "email": "Resend 6.4",
  "hosting": "Vercel",
  "fonts": "Outfit/Sora (headings) + Inter (body)"
}
```

### Key Features

- **High-converting accommodation booking site**
- **Sanity CMS integration** for content management
- **Custom admin panel** with role-based permissions
- **Stripe payment integration**
- **Avantio booking system integration**
- **Viator tours API integration**
- **Email deliverability** with Resend
- **Google Analytics 4** integration
- **Playwright e2e testing**
- **Automated release workflow**

---

## Design System & Theming

### Color Palette (tailwind.config.ts)

**This is EXCELLENT - semantic color system with full shade scales:**

```typescript
colors: {
  // Primary: Ancarraig Maroon (Brand Color)
  primary: {
    50: "#fdf4f5",
    100: "#fbe8eb",
    200: "#f7d1d7",
    300: "#f0a9b4",
    400: "#e67a8c",
    500: "#d54d67",
    600: "#8B3A52", // DEFAULT - Main brand color
    700: "#6d2e40",
    800: "#5a2635",
    900: "#4d222f",
  },
  // Secondary: Warm Wood Brown
  secondary: {
    50: "#f9f7f5",
    100: "#f1ebe3",
    200: "#e3d7c7",
    300: "#d0bda3",
    400: "#b69d7a",
    500: "#a38559",
    600: "#8B6F47", // DEFAULT
    700: "#6f5737",
    800: "#5c4730",
    900: "#4d3d29",
  },
  // Accent: Highland Heather Purple
  accent: {
    purple: "#7D5BA6",
    blue: "#4A7C8C",
    gold: "#D4A574",
  },
  // Neutrals (Slate)
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
}
```

**Why this is excellent:**
- ✅ Full shade scales (50-900) for maximum flexibility
- ✅ Semantic naming (primary/secondary/accent/neutral)
- ✅ Brand-specific colors with contextual names
- ✅ Neutral grays for professional UI
- ✅ Easy to maintain and extend

### Typography System

```typescript
fontFamily: {
  heading: ["var(--font-heading)", "system-ui", "sans-serif"],
  body: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
},
fontSize: {
  xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
  base: ["1rem", { lineHeight: "1.5rem" }], // 16px
  lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
  "5xl": ["3rem", { lineHeight: "1.2" }], // 48px - MAX SIZE (restrained premium)
}
```

**CSS Variables in globals.css:**

```css
:root {
  /* Ancarraig Design Tokens */
  --font-heading: "Outfit", "Sora", system-ui, sans-serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;

  /* Animation durations */
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --duration-slower: 1000ms;

  /* Natural ease timing */
  --ease-natural: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-mechanical: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-entrance: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

### Spacing System (8px base unit)

```typescript
spacing: {
  0.5: "0.125rem", // 2px
  1: "0.25rem",    // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem",     // 8px (BASE)
  3: "0.75rem",    // 12px
  4: "1rem",       // 16px
  5: "1.25rem",    // 20px
  6: "1.5rem",     // 24px
  8: "2rem",       // 32px
  10: "2.5rem",    // 40px
  12: "3rem",      // 48px
  16: "4rem",      // 64px
  20: "5rem",      // 80px
  24: "6rem",      // 96px
}
```

### Animation System

```typescript
animation: {
  "fade-in": "fadeIn 0.6s ease-out forwards",
  "slide-up": "slideUp 0.6s ease-out forwards",
  "scale-in": "scaleIn 0.6s ease-out forwards",
  "ken-burns": "kenBurns 20s ease-out infinite alternate",
},
keyframes: {
  fadeIn: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  slideUp: {
    "0%": { opacity: "0", transform: "translateY(40px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  scaleIn: {
    "0%": { opacity: "0", transform: "scale(0.95)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  kenBurns: {
    "0%": { transform: "scale(1)" },
    "100%": { transform: "scale(1.1)" },
  },
}
```

### Utility Classes (globals.css)

```css
@layer components {
  /* Glass morphism utilities */
  .glass-light {
    @apply bg-white/80 backdrop-blur-xl border border-white/60;
  }

  .glass-dark {
    @apply bg-neutral-900/95 backdrop-blur-xl border border-white/10;
  }

  .glass-premium {
    @apply bg-neutral-950/90 backdrop-blur-2xl border border-white/5;
  }

  /* Hover effects */
  .hover-lift {
    @apply transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg;
  }

  .hover-scale {
    @apply transition-transform duration-200 hover:scale-105;
  }

  /* Image overlay gradients */
  .overlay-gradient-dark {
    @apply bg-gradient-to-b from-black/60 via-black/50 to-black/30;
  }

  /* Section padding */
  .section-padding {
    @apply py-12 md:py-20 lg:py-24;
  }
}
```

---

## Component Library

### Core UI Components

#### Card Component (`src/components/ui/Card.tsx`)

**Features:**
- Multiple variants (default, bordered, elevated, glass)
- Padding options (none, sm, md, lg, xl)
- Optional hover lift effect
- Dark mode support (admin context only)

```typescript
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "glass" | "glass-dark";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  children: React.ReactNode;
}
```

**Key Pattern:**
- Uses `useDarkMode()` context for admin-only dark mode
- Separates admin dark mode from public site
- Clean variant system with semantic names

#### Container Component (`src/components/ui/Container.tsx`)

**Features:**
- Responsive container with size options
- Consistent horizontal padding
- Semantic max-width sizes

```typescript
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};
```

### Component Directory Structure

```
src/components/
├── ui/                    # Base UI components (39 components)
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Label.tsx
│   ├── Accordion.tsx
│   ├── Breadcrumbs.tsx
│   ├── PortableText.tsx
│   ├── DifficultyBadge.tsx
│   ├── InsiderTip.tsx
│   ├── TourCard.tsx
│   ├── WalkFilters.tsx
│   ├── WalkQuickFacts.tsx
│   ├── ExperienceGallery.tsx
│   ├── ConfirmDialog.tsx
│   ├── ErrorDialog.tsx
│   └── DropboxLinkModal.tsx
│
├── sections/              # Page sections (33 sections)
│   ├── Hero/
│   ├── Features/
│   ├── Testimonials/
│   ├── Gallery/
│   ├── CTA/
│   └── ...
│
├── admin/                 # Admin panel components (27 components)
│   ├── Dashboard/
│   ├── ContentEditor/
│   ├── MediaManager/
│   └── ...
│
├── booking/               # Booking flow components
│   ├── DatePicker/
│   ├── GuestSelector/
│   ├── PaymentForm/
│   └── ...
│
├── forms/                 # Form components
│   ├── FormField/
│   ├── Validation/
│   └── ...
│
├── providers/             # Context providers
│   ├── DarkModeProvider/
│   └── ...
│
└── analytics/             # Analytics components
    └── GoogleAnalytics/
```

---

## Utilities & Helpers

### Core Utility Functions (`src/lib/utils.ts`)

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Natural ease timing function for Framer Motion animations
 * Matches Ancarraig design language
 */
export const naturalEase = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Format price in GBP
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
```

### Library Organization

```
src/lib/
├── utils.ts                    # Core utilities (cn, formatters, naturalEase)
├── stripe.ts                   # Stripe payment integration
├── email.ts                    # Email sending (Resend)
├── viatorApi.ts                # Viator tours API client
├── seasonalTours.ts            # Seasonal tour management
├── location.ts                 # Location/mapping utilities
├── trello-automation.ts        # Trello API integration
├── booking/
│   ├── avantioLink.ts          # Avantio booking deep links
│   └── types.ts                # Booking type definitions
└── admin/
    ├── auth.ts                 # Admin authentication
    ├── permissions.ts          # Role-based permissions
    ├── permissionDefinitions.ts
    ├── sanity-client.ts        # Sanity CMS client
    ├── portableTextUtils.ts    # Portable text helpers
    └── version.ts              # Version management
```

---

## Integration Patterns

### 1. Sanity CMS Integration

**Features:**
- Headless CMS for content management
- Custom admin studio
- Portable text rendering
- Image optimization with Sanity CDN
- Real-time content updates
- Webhook integration for revalidation

**File:** `sanity.config.ts`

### 2. Stripe Payment Integration

**Features:**
- Secure payment processing
- Subscription management
- Webhook handling
- Customer portal

**File:** `src/lib/stripe.ts`

### 3. Resend Email Integration

**Features:**
- Transactional emails
- Template system
- Deliverability optimization
- Email verification

**File:** `src/lib/email.ts`

### 4. Avantio Booking System Integration

**Features:**
- Deep linking to booking engine
- Pre-filled guest information
- Date and lodge selection
- Cross-domain tracking

**File:** `src/lib/booking/avantioLink.ts`

### 5. Viator Tours API Integration

**Features:**
- Tour availability checking
- Dynamic pricing
- Booking links
- Product catalog

**File:** `src/lib/viatorApi.ts`

### 6. Google Analytics 4 Integration

**Features:**
- Event tracking
- Conversion measurement
- E-commerce tracking
- Custom dimensions

**Directory:** `src/components/analytics/`

---

## Documentation Framework (.ai)

### Overview

**This is THE KILLER FEATURE - a complete AI assistant framework**

The `.ai/` directory contains a battle-tested, production-ready AI instruction framework that is **universally reusable** across ANY project.

### Structure

```
.ai/
├── README.md                       # Framework overview
├── CLAUDE.md                       # AI instructions (root)
├── COMPOSER.md                     # Composer-specific config
├── FRAMEWORK-SETUP.md              # Migration guide
├── CHANGELOG.md                    # Framework version history
│
├── core/                           # Universal principles (never change)
│   ├── DEVELOPMENT-PRINCIPLES.md   # Core workflow
│   ├── WORKFLOW.md                 # Standard dev steps
│   └── COMMUNICATION.md            # AI communication style
│
├── frameworks/                     # Planning methodologies (universal)
│   ├── coda.md                     # Structured planning
│   ├── design-variations.md        # 5 variations workflow
│   └── story-driven-content.md     # Content formula
│
├── project/                        # Project-specific (update per project)
│   ├── PROJECT.md                  # Tech stack, design system
│   ├── DESIGN-LANGUAGE.md          # Visual identity
│   ├── DESIGN-SYSTEM.md            # Technical design specs
│   ├── DOMAIN-KNOWLEDGE.md         # Business context
│   └── PRE-DESIGN-CHECKLIST.md     # Design verification
│
├── templates/                      # Reusable templates
│   ├── component-planning.md
│   ├── feature-planning.md
│   ├── case-study-formula.md
│   └── case-study-checklist.md
│
└── workflows/                      # Process workflows
    └── trello-workflow.md          # Trello automation
```

### Key Concepts

#### 1. CODA Planning Framework

**Context → Objective → Details → Acceptance**

A structured planning methodology for complex features:
- Catches issues in planning phase (not after coding)
- "Measure twice, cut once" for software
- Creates permanent documentation of decisions

#### 2. Design Variations Workflow

**ALWAYS create 5 variations on a demo page**

Why this works:
- Eliminates guesswork
- Prevents rework
- Explores creative space
- User selects preferred version BEFORE implementation

#### 3. Pre-Design Checklist

**Mandatory verification BEFORE presenting any design**

Checks for:
- Image-to-text ratio (60-70% imagery for sales pages)
- Design language violations (NO gradients, NO emojis)
- Scandi-Scot aesthetic compliance
- Voice & content principles
- Conversion psychology elements
- Mobile-first design

### Why This Framework is Brilliant

**Problem without framework:**
- ❌ AI guesses design approaches
- ❌ Inconsistent quality
- ❌ No shared vocabulary
- ❌ Rework after implementation
- ❌ Every project starts from zero

**Solution with framework:**
- ✅ AI follows proven workflows
- ✅ Consistent quality
- ✅ Shared vocabulary
- ✅ Iteration in planning phase
- ✅ Copy `.ai/` to new projects instantly

---

## Project Structure

### Directory Organization

```
ancarraig/
├── .ai/                          # AI framework (universal + project-specific)
├── .claude/                      # Claude Code settings
├── .github/                      # GitHub Actions workflows
├── analytics/                    # Analytics tracking specs
├── docs/                         # Project documentation
├── public/                       # Static assets
├── scripts/                      # Build/automation scripts
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── (routes)/             # Public pages
│   │   ├── admin/                # Admin panel routes
│   │   ├── api/                  # API routes
│   │   └── demo/                 # Design variation demos
│   ├── components/               # React components (organized by type)
│   ├── contexts/                 # React contexts
│   ├── data/                     # Static data
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utilities & integrations
│   ├── sanity/                   # Sanity CMS schemas
│   ├── styles/                   # Global CSS
│   └── types/                    # TypeScript types
├── tests/                        # Playwright e2e tests
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── playwright.config.ts
└── sanity.config.ts
```

### Key Organizational Patterns

#### 1. Component Organization by Type

```
components/
├── ui/           # Base UI (Button, Card, Input)
├── sections/     # Page sections (Hero, Features)
├── admin/        # Admin-specific
├── booking/      # Booking flow
├── forms/        # Form components
├── providers/    # Context providers
└── analytics/    # Analytics tracking
```

**Why this works:**
- Clear separation of concerns
- Easy to find components
- Prevents monolithic `/components` folder

#### 2. Lib Organization by Feature

```
lib/
├── utils.ts                # Core utilities
├── stripe.ts               # Payment integration
├── email.ts                # Email sending
├── viatorApi.ts            # Tours API
├── booking/                # Booking subdomain
│   ├── avantioLink.ts
│   └── types.ts
└── admin/                  # Admin subdomain
    ├── auth.ts
    ├── permissions.ts
    └── sanity-client.ts
```

**Why this works:**
- Feature-based grouping
- Subdirectories for complex features
- Single-file for simple utilities

---

## Performance & Optimization

### Lighthouse Targets

```
Performance:    95+
Accessibility:  100 (WCAG 2.1 AA)
Best Practices: 95+
SEO:           100
```

### Core Web Vitals

```
LCP (Largest Contentful Paint): <1s   (target sub-1s)
FID (First Input Delay):        <100ms
CLS (Cumulative Layout Shift):  <0.1
INP (Interaction to Next Paint): <200ms
```

### Image Optimization Strategy

- ✅ Next.js Image component for ALL images
- ✅ Cloudinary integration for automatic optimization
- ✅ WebP/AVIF format with progressive loading
- ✅ Blur-up placeholders
- ✅ Lazy load below fold
- ✅ `priority` prop for hero images only
- ✅ Compress before upload

### Animation Performance

```typescript
// Natural ease timing (from utils.ts)
export const naturalEase = [0.25, 0.46, 0.45, 0.94] as const;

// Framer Motion pattern
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1, ease: naturalEase }}
>
```

### Accessibility

- ✅ Color contrast 4.5:1 minimum
- ✅ Keyboard navigation throughout
- ✅ Screen reader support (ARIA, semantic HTML)
- ✅ Alt text for all images
- ✅ Focus indicators visible
- ✅ Reduced motion support

---

## Recommendations for Lost Monster

### 1. Adopt the `.ai/` Framework Immediately

**This is the #1 priority**

- Copy entire `.ai/` directory to Lost Monster
- Make it the agency standard
- Customize `project/` folder for each new client
- Keep `core/`, `frameworks/`, and `templates/` universal

**Benefits:**
- Instant AI assistant configuration for any project
- Consistent quality across all projects
- Proven workflows and methodologies
- Permanent documentation of decisions

### 2. Adopt the Tailwind Config Pattern

**Use Ancarraig's approach:**

```typescript
// Full shade scales for primary/secondary/accent
primary: {
  50-900 with semantic brand names
}

// Typography with line heights
fontSize: {
  xs-5xl with explicit line-height tuples
}

// 8px spacing system
spacing: {
  Consistent base unit
}

// Custom animations
animation: {
  Named, reusable keyframes
}
```

### 3. Adopt Component Organization Pattern

```
components/
├── ui/           # Atomic design system
├── sections/     # Composite sections
├── [feature]/    # Feature-specific (booking, admin)
└── providers/    # Context providers
```

### 4. Adopt Utility Organization Pattern

```
lib/
├── utils.ts              # Core (cn, formatters)
├── [integration].ts      # Single-file integrations
└── [complex-feature]/    # Multi-file features
    ├── client.ts
    ├── types.ts
    └── utils.ts
```

### 5. Create Design System Templates

**Extract from Ancarraig:**

1. **Color system template** - Full shade scales pattern
2. **Typography template** - Font families + size scale
3. **Animation template** - Keyframes + easing functions
4. **Utility classes template** - Glass, hover effects, gradients

### 6. Create Integration Templates

**Based on Ancarraig implementations:**

1. **Stripe integration template**
2. **Sanity CMS template**
3. **Email (Resend) template**
4. **Google Analytics template**
5. **Booking system integration pattern**

### 7. Document Standard Patterns

**Create guides for:**

1. Component structure (props, variants, forwardRef)
2. Animation patterns (Framer Motion + naturalEase)
3. Form handling (React Hook Form + Zod)
4. API routes (Next.js patterns)
5. Type definitions (TypeScript best practices)

### 8. Establish Quality Standards

**From Ancarraig:**

```
Performance:    95+ Lighthouse
Accessibility:  100 (WCAG AA)
Best Practices: 95+
SEO:           100
```

Make these **mandatory** for all Lost Monster projects.

### 9. Create Project Templates

**Based on Ancarraig structure:**

1. **Next.js 15 + Tailwind + Sanity** template
2. **Component library starter** template
3. **Admin panel** template
4. **E-commerce/Booking** template

### 10. Adopt Documentation Standards

**From CLAUDE.md approach:**

- Pre-design checklists
- Design language documentation
- Domain knowledge capture
- Technical standards
- API documentation

---

## Summary

### What Makes Ancarraig Excellent

1. **Comprehensive design system** with full color scales and semantic naming
2. **Battle-tested component library** with consistent patterns
3. **Universal .ai framework** that's reusable across projects
4. **Clean utility organization** with feature-based grouping
5. **Production integrations** (Stripe, Sanity, Resend, Analytics)
6. **Performance-first** approach with measurable targets
7. **Accessibility built-in** from the start
8. **Documentation-driven** development with clear standards

### Immediate Actions for Lost Monster

1. ✅ **Copy `.ai/` directory** to Lost Monster repository
2. ✅ **Extract Tailwind config pattern** to design systems
3. ✅ **Document component patterns** in templates
4. ✅ **Create integration templates** for common services
5. ✅ **Establish quality standards** (Lighthouse, accessibility)
6. ✅ **Set up project templates** based on Ancarraig structure

### Long-term Vision

**Lost Monster becomes:**

- The agency with **instant project setup** (copy `.ai/` folder)
- The source of **proven design system patterns**
- The library of **production-ready integrations**
- The standard for **documentation-driven development**
- The benchmark for **quality and performance**

---

**Next Steps:** Extract specific components, integrations, and patterns into Lost Monster's respective directories.
