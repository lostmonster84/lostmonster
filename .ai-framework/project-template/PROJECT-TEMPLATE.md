# Project Template - Customize for Each Project

> **Copy this to your project's `.ai/project/PROJECT.md` file**
>
> This template helps you create project-specific configuration while using the universal frameworks.

---

## Project Overview

**Project Name:** [Your Project Name]

**Description:** [Brief description of what this project is]

**Tech Stack:**
- **Frontend:** [Framework] (e.g., Next.js 15, Vue 3, React)
- **Styling:** [Approach] (e.g., Tailwind CSS, CSS Modules)
- **Backend/API:** [Stack] (e.g., Next.js API routes, Node.js, serverless)
- **Database:** [Database] (e.g., PostgreSQL, MongoDB, Sanity)
- **Hosting:** [Platform] (e.g., Vercel, AWS, Netlify)
- **Other:** [Key dependencies]

**Repository:** [GitHub/GitLab URL]

**Live Site:** [Production URL]

---

## Design System

### Brand Colors

```css
/* Primary Colors */
--primary-50: #[hex];
--primary-600: #[hex]; /* DEFAULT */
--primary-900: #[hex];

/* Secondary Colors */
--secondary-50: #[hex];
--secondary-600: #[hex]; /* DEFAULT */
--secondary-900: #[hex];

/* Accent Colors */
--accent-50: #[hex];
--accent-600: #[hex]; /* DEFAULT */
--accent-900: #[hex];

/* Neutral Colors */
--neutral-50: #[hex];
--neutral-600: #[hex];
--neutral-900: #[hex];
```

### Typography

```css
/* Font Families */
--font-heading: [Font], [fallback], sans-serif;
--font-body: [Font], [fallback], sans-serif;
--font-mono: [Font], monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Spacing Scale

**Base unit:** [8px / 4px / other]

```
4px  - spacing-1
8px  - spacing-2
12px - spacing-3
16px - spacing-4
24px - spacing-6
32px - spacing-8
48px - spacing-12
64px - spacing-16
```

### Animations

```css
/* Timing Functions */
--ease-[name]: cubic-bezier([values]);

/* Durations */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

---

## Design Principles

### [Principle 1 Name]

**Description:** [What this principle means]

**In Practice:**
- [How to apply this]
- [Example implementation]
- [What to avoid]

---

### [Principle 2 Name]

**Description:** [What this principle means]

**In Practice:**
- [How to apply this]
- [Example implementation]
- [What to avoid]

---

### [Principle 3 Name]

**Description:** [What this principle means]

**In Practice:**
- [How to apply this]
- [Example implementation]
- [What to avoid]

---

## Brand Voice & Tone

**Core Voice:**
- [Voice characteristic 1]
- [Voice characteristic 2]
- [Voice characteristic 3]

**Writing Style:**
- ✅ DO: [What to do]
- ❌ DON'T: [What to avoid]

**Example Copy:**

Good:
> "[Example of on-brand copy]"

Not good:
> "[Example of off-brand copy]"

---

## Component Patterns

### Button Variants

```tsx
// Example component usage
<Button variant="primary" size="lg">
  Click me
</Button>
```

**Variants:**
- `primary` - [Description and when to use]
- `secondary` - [Description and when to use]
- `ghost` - [Description and when to use]
- `outline` - [Description and when to use]

---

### Card Variants

```tsx
// Example component usage
<Card variant="elevated" padding="lg">
  Content here
</Card>
```

**Variants:**
- `default` - [Description and when to use]
- `elevated` - [Description and when to use]
- `glass` - [Description and when to use]

---

## File Structure

```
/project-root
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── sections/    # Page sections
│   │   └── layout/      # Layout components
│   ├── lib/
│   │   ├── utils.ts     # Utility functions
│   │   └── constants.ts # Constants
│   ├── styles/
│   │   └── globals.css  # Global styles
│   └── types/
│       └── index.ts     # TypeScript types
├── public/
└── [framework-specific files]
```

---

## Code Conventions

### TypeScript

```typescript
// Component props pattern
export interface ComponentProps {
  variant?: "default" | "elevated";
  children: React.ReactNode;
  className?: string;
}

// Export pattern
export const Component = ({ variant = "default", children }: ComponentProps) => {
  // Implementation
};
```

### Styling Approach

**Method:** [Tailwind / CSS Modules / Styled Components]

**Pattern:**
```tsx
// Example styling pattern for this project
<div className="flex items-center gap-4 p-4">
  {children}
</div>
```

---

## Performance Standards

### Lighthouse Scores (Minimum)

- **Performance:** [XX]+ (e.g., 95+)
- **Accessibility:** [XX]+ (e.g., 100)
- **Best Practices:** [XX]+ (e.g., 100)
- **SEO:** [XX]+ (e.g., 100)

### Core Web Vitals

- **LCP:** <[X]s (e.g., <1s)
- **FID:** <[X]ms (e.g., <100ms)
- **CLS:** <[X] (e.g., <0.1)

### Bundle Size

- **Initial JS:** <[X]kb (e.g., <100kb)
- **Initial CSS:** <[X]kb (e.g., <20kb)
- **Total Page:** <[X]kb (e.g., <300kb)

---

## Integrations

### [Integration 1 Name] (e.g., Stripe)

**Purpose:** [What this integration does]

**Key Files:**
- `[file path]` - [Description]
- `[file path]` - [Description]

**Environment Variables:**
```
[VAR_NAME]=value
[VAR_NAME]=value
```

**Usage Example:**
```typescript
// Code example
```

---

### [Integration 2 Name] (e.g., Sanity CMS)

**Purpose:** [What this integration does]

**Key Files:**
- `[file path]` - [Description]
- `[file path]` - [Description]

**Environment Variables:**
```
[VAR_NAME]=value
[VAR_NAME]=value
```

**Usage Example:**
```typescript
// Code example
```

---

## Quality Checklist Reference

**Before presenting any design/UI work, verify:**

- [ ] Follows design system (colors, typography, spacing)
- [ ] Matches brand voice and tone
- [ ] Meets performance standards
- [ ] Accessible (WCAG AA minimum)
- [ ] Mobile-responsive
- [ ] Follows component patterns
- [ ] **Scored using Pre-Design Checklist** (≥80/100)

**See:** [PRE-DESIGN-CHECKLIST.md](./PRE-DESIGN-CHECKLIST.md) for full checklist and scoring.

---

## Development Workflow

### Planning Complex Features

1. Use CODA framework (see [../frameworks/coda.md](../frameworks/coda.md))
2. Document Context-Objective-Details-Acceptance
3. Get user approval before implementing

### Design Work

1. Create 5 variations on demo page (see [../frameworks/design-variations.md](../frameworks/design-variations.md))
2. Present variations to user
3. Implement chosen variation
4. Score using Pre-Design Checklist

### Standard Tasks

1. Follow 6-step workflow (see [../core/WORKFLOW.md](../core/WORKFLOW.md))
2. Think → Research → Plan → Verify → Implement → Review

---

## Common Utilities

### Class Name Utility

```typescript
// Location: src/lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Animation Constants

```typescript
// Location: src/lib/constants.ts
export const naturalEase = [0.25, 0.46, 0.45, 0.94] as const;
```

---

## Resources

**Design System:**
- Design Brief: `DESIGN-BRIEF.md`
- Figma: [Figma URL]
- Brand Guidelines: [URL]

**Documentation:**
- Framework Docs: [Framework URL]
- Component Library: [Storybook URL]
- API Docs: [API docs URL]

**Project Management:**
- Tasks: [Trello/Linear/Jira URL]
- Designs: [Figma URL]
- Analytics: [Google Analytics/Plausible URL]

---

## Deployment

### Production

**Platform:** [Vercel / Netlify / AWS]

**URL:** [Production URL]

**Deploy Command:**
```bash
[deploy command]
```

### Staging

**URL:** [Staging URL]

**Deploy Command:**
```bash
[deploy command]
```

---

## Environment Variables

```bash
# Required for all environments
[VAR_NAME]=
[VAR_NAME]=

# Production only
[VAR_NAME]=

# Development only
[VAR_NAME]=
```

---

## Team

**Project Owner:** [Name]

**Developers:** [Names]

**Designers:** [Names]

**Stakeholders:** [Names]

---

## Version History

**v1.0** - [Date]
- Initial project setup
- [Key features/changes]

---

## Notes

[Project-specific notes, gotchas, or important context]
