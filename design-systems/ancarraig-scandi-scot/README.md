# Scandi-Scot Design System (from Ancarraig)

> **Production-tested design system combining Nordic minimalism with Highland warmth**
>
> Extracted from the Ancarraig Lodges project - a high-converting accommodation booking site

**Status:** ✅ Production Ready
**Source:** Ancarraig Lodges (November 2025)
**Use Case:** Premium, nature-focused brands with conversion goals

---

## Overview

This design system embodies **"Scandi-Scot Fusion"** - clean Nordic minimalism meets warm Scottish hospitality.

### Design Principles

1. **Nature-First Imagery** - Let landscapes breathe, minimal text overlays
2. **Generous White Space** - Not cramped or cluttered
3. **Clean Flat Design** - No heavy shadows or depth effects
4. **Premium Restraint** - Quiet confidence, not shouting
5. **Mobile-Obsessed** - Design for phone first, enhance for desktop

### Philosophy

- **NO GRADIENTS** - Only ultra-subtle textures (opacity ≤ 0.02)
- **NO EMOJIS** - Use Lucide icons only
- **NO STOCK PHOTOS** - Prefer authentic brand imagery
- **NO ROUNDED FLOATING CARDS** - Avoid AI-template patterns
- **NO GLASS MORPHISM ABUSE** - Use sparingly for premium surfaces only

---

## Color System

### Primary: Brand Maroon

```css
--primary-50: #fdf4f5;
--primary-100: #fbe8eb;
--primary-200: #f7d1d7;
--primary-300: #f0a9b4;
--primary-400: #e67a8c;
--primary-500: #d54d67;
--primary-600: #8B3A52;  /* DEFAULT - Main brand color */
--primary-700: #6d2e40;
--primary-800: #5a2635;
--primary-900: #4d222f;
```

**Usage:**
- Primary CTAs (buttons, links)
- Brand highlights
- Interactive elements
- Focus states

### Secondary: Warm Wood Brown

```css
--secondary-50: #f9f7f5;
--secondary-100: #f1ebe3;
--secondary-200: #e3d7c7;
--secondary-300: #d0bda3;
--secondary-400: #b69d7a;
--secondary-500: #a38559;
--secondary-600: #8B6F47;  /* DEFAULT */
--secondary-700: #6f5737;
--secondary-800: #5c4730;
--secondary-900: #4d3d29;
```

**Usage:**
- Secondary CTAs
- Decorative elements
- Complementary to primary
- Natural/earthy sections

### Accent Colors

```css
--accent-purple: #7D5BA6;  /* Highland Heather */
--accent-blue: #4A7C8C;    /* Loch Blue */
--accent-gold: #D4A574;    /* Highland Gold */
```

**Usage:**
- Use sparingly for highlights
- Badges and tags
- Icons and decorations
- Never as primary color

### Neutrals (Slate)

```css
--neutral-50: #f8fafc;
--neutral-100: #f1f5f9;
--neutral-200: #e2e8f0;
--neutral-300: #cbd5e1;
--neutral-400: #94a3b8;
--neutral-500: #64748b;
--neutral-600: #475569;
--neutral-700: #334155;
--neutral-800: #1e293b;
--neutral-900: #0f172a;
--neutral-950: #020617;
```

**Usage:**
- Text colors
- Borders and dividers
- Backgrounds
- UI chrome

---

## Typography

### Font Families

```css
--font-heading: "Outfit", "Sora", system-ui, sans-serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;
```

**Heading Font (Outfit/Sora):**
- Modern, clean sans-serif
- Geometric but warm
- Good for premium branding
- Legible at all sizes

**Body Font (Inter):**
- Highly readable
- Excellent for long-form content
- Professional and modern
- Optimized for screens

### Type Scale

```css
--text-xs: 0.75rem;    /* 12px */  line-height: 1rem
--text-sm: 0.875rem;   /* 14px */  line-height: 1.25rem
--text-base: 1rem;     /* 16px */  line-height: 1.5rem
--text-lg: 1.125rem;   /* 18px */  line-height: 1.75rem
--text-xl: 1.25rem;    /* 20px */  line-height: 1.75rem
--text-2xl: 1.5rem;    /* 24px */  line-height: 2rem
--text-3xl: 1.875rem;  /* 30px */  line-height: 2.25rem
--text-4xl: 2.25rem;   /* 36px */  line-height: 2.5rem
--text-5xl: 3rem;      /* 48px */  line-height: 1.2  MAX SIZE
```

**Note:** `text-5xl` (48px) is the MAXIMUM size - premium restraint, not shouting.

### Heading Styles

```css
h1 {
  @apply text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight;
}

h2 {
  @apply text-2xl md:text-3xl font-heading font-bold tracking-tight;
}

h3 {
  @apply text-xl md:text-2xl font-heading font-bold tracking-tight;
}

h4 {
  @apply text-lg md:text-xl font-heading font-semibold tracking-tight;
}
```

---

## Spacing System (8px Base Unit)

```css
--space-0.5: 0.125rem;  /* 2px */
--space-1: 0.25rem;     /* 4px */
--space-1.5: 0.375rem;  /* 6px */
--space-2: 0.5rem;      /* 8px */  BASE UNIT
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

**Usage Patterns:**

- **Components:** 4, 6, 8 (16px, 24px, 32px)
- **Sections:** 12, 16, 20, 24 (48px, 64px, 80px, 96px)
- **Micro-spacing:** 1, 2, 3 (4px, 8px, 12px)

---

## Border Radius

```css
--radius-sm: 0.125rem;   /* 2px */
--radius-default: 0.25rem; /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-4xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Pill shape */
```

**Usage:**
- **Buttons:** `lg` or `xl` (8px or 12px)
- **Cards:** `xl` or `2xl` (12px or 16px)
- **Inputs:** `md` or `lg` (6px or 8px)
- **Avatars:** `full` (circle)

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-default: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

**Usage:**
- **Subtle elevation:** `sm` or `default`
- **Cards:** `md`
- **Modals/Popovers:** `lg` or `xl`
- **Hero images:** `2xl`

---

## Animation System

### Timing Functions

```css
--ease-natural: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-mechanical: cubic-bezier(0.4, 0, 0.2, 1);
--ease-entrance: cubic-bezier(0, 0, 0.2, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
```

**Natural Ease (Primary):**
- Organic, lifelike motion
- Use for most animations
- Feels smooth and premium

### Durations

```css
--duration-fast: 200ms;
--duration-base: 300ms;
--duration-slow: 600ms;
--duration-slower: 1000ms;
```

**Usage:**
- **Micro-interactions:** `fast` (200ms)
- **UI transitions:** `base` (300ms)
- **Page sections:** `slow` (600ms)
- **Hero animations:** `slower` (1000ms)

### Keyframes

```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes kenBurns {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
```

### Framer Motion Pattern

```tsx
import { naturalEase } from '@/lib/utils'

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1, ease: naturalEase }}
>
  Content
</motion.div>
```

---

## Component Patterns

### Glass Morphism (Use Sparingly)

```css
.glass-light {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.glass-dark {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-premium {
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Hover Effects

```css
.hover-lift {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.hover-scale {
  transition: transform 200ms ease-out;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

### Image Overlays

```css
.overlay-gradient-dark {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.3)
  );
}

.overlay-gradient-light {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.4)
  );
}
```

---

## Layout Patterns

### Section Padding

```css
.section-padding {
  padding-top: 3rem;    /* 48px mobile */
  padding-bottom: 3rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: 5rem;    /* 80px tablet */
    padding-bottom: 5rem;
  }
}

@media (min-width: 1024px) {
  .section-padding {
    padding-top: 6rem;    /* 96px desktop */
    padding-bottom: 6rem;
  }
}
```

### Container Widths

```css
.container-sm { max-width: 48rem; }   /* 768px */
.container-md { max-width: 64rem; }   /* 1024px */
.container-lg { max-width: 80rem; }   /* 1280px */
.container-xl { max-width: 90rem; }   /* 1440px */
.container-full { max-width: 100%; }
```

---

## Accessibility

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--primary-600);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Color Contrast

All text must meet WCAG AA standards:
- Normal text: **4.5:1** minimum
- Large text: **3:1** minimum

---

## Usage Guidelines

### Do's ✅

- Use full shade scales (50-900) for flexibility
- Apply natural ease timing for animations
- Design mobile-first, enhance for desktop
- Let imagery breathe with generous white space
- Use semantic color names (primary, secondary)
- Maintain 8px spacing rhythm
- Optimize images before upload
- Test accessibility (keyboard nav, screen readers)

### Don'ts ❌

- Don't use gradients (except for image overlays)
- Don't use emojis (use Lucide icons)
- Don't abuse glass morphism (sparingly only)
- Don't exceed `text-5xl` (48px) font size
- Don't hardcode colors (use design tokens)
- Don't skip mobile-first approach
- Don't use stock photos if avoidable
- Don't create AI-template patterns

---

## Implementation

### Tailwind Config

See [`tailwind.config.ts`](./tailwind.config.ts) for complete Tailwind CSS configuration.

### CSS Variables

See [`globals.css`](./globals.css) for CSS custom properties.

### Components

See [`components/`](./components/) for implementation examples.

---

## Credits

**Designed for:** Ancarraig Lodges (Scottish Highlands accommodation)
**Extracted by:** Lost Monster Development Agency
**Design Philosophy:** Nordic minimalism + Highland warmth
**Status:** Production-tested since 2025

---

**For implementation details, see the complete Ancarraig analysis:**
[`/docs/guides/ANCARRAIG-ANALYSIS.md`](../../docs/guides/ANCARRAIG-ANALYSIS.md)
