# Design Systems

Comprehensive design systems, UI kits, and style guides for Lost Monster projects.

## Overview

Our design systems ensure consistency, accessibility, and quality across all projects. This directory contains everything needed to create beautiful, functional interfaces.

## Directory Structure

```
design-systems/
├── admin/              # Admin panel designs
├── public/             # Public-facing website designs
└── style-guides/       # Brand and style guidelines
```

## Admin Design System

**Location:** [`admin/`](./admin/)

Complete admin panel design system including:
- **Dashboards** - Analytics, metrics, KPIs
- **Data Tables** - Sortable, filterable tables
- **Forms** - Input components, validation
- **Navigation** - Sidebars, breadcrumbs, tabs
- **Charts** - Data visualization
- **Settings** - Configuration panels
- **User Management** - Users, roles, permissions

### Admin Features
- Dark/light mode support
- Responsive layouts
- Accessibility built-in
- Consistent spacing and typography
- Icon system
- Color palette
- Component library

## Public Design System

**Location:** [`public/`](./public/)

Public-facing website design system:
- **Landing Pages** - Hero sections, CTAs
- **Marketing** - Features, pricing, testimonials
- **Blog** - Article layouts, cards
- **E-commerce** - Product cards, checkout
- **Authentication** - Login, signup, reset
- **Navigation** - Headers, footers, menus

### Public Features
- Mobile-first design
- Performance optimized
- SEO-friendly markup
- Animation library
- Responsive images
- Typography system

## Style Guides

**Location:** [`style-guides/`](./style-guides/)

Brand guidelines and design principles:
- **Brand Identity** - Logo usage, brand voice
- **Color System** - Primary, secondary, semantic colors
- **Typography** - Font families, scales, usage
- **Spacing** - Spacing scale and grid
- **Icons** - Icon library and usage
- **Imagery** - Photo style, illustrations
- **Motion** - Animation principles

## Design Tokens

Design tokens are the foundation of our design system:

### Colors
```css
/* Primary */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-500: #0ea5e9;
--color-primary-900: #0c4a6e;

/* Semantic */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Typography
```css
/* Font Families */
--font-sans: 'Inter', system-ui, sans-serif;
--font-serif: 'Merriweather', Georgia, serif;
--font-mono: 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Borders
```css
/* Border Radius */
--radius-sm: 0.125rem;  /* 2px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;

/* Border Widths */
--border-1: 1px;
--border-2: 2px;
--border-4: 4px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Component Patterns

### Button Variants
```tsx
// Primary action
<Button variant="primary">Save</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Destructive action
<Button variant="danger">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Form Patterns
```tsx
<Form>
  <FormField
    label="Email"
    type="email"
    required
    error="Invalid email"
  />

  <FormField
    label="Password"
    type="password"
    required
    helper="At least 8 characters"
  />

  <Button type="submit">Submit</Button>
</Form>
```

### Card Patterns
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>

  <CardContent>
    Content goes here
  </CardContent>

  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Layout Patterns

### Dashboard Layout
```tsx
<DashboardLayout>
  <Sidebar>
    <Navigation items={menuItems} />
  </Sidebar>

  <Main>
    <Header>
      <Breadcrumbs />
      <UserMenu />
    </Header>

    <Content>
      {children}
    </Content>
  </Main>
</DashboardLayout>
```

### Landing Page Layout
```tsx
<LandingLayout>
  <Header>
    <Logo />
    <Navigation />
    <CTAButton />
  </Header>

  <Hero>
    <Headline />
    <Subheadline />
    <CTAButtons />
  </Hero>

  <Features />
  <Testimonials />
  <Pricing />

  <Footer>
    <FooterLinks />
    <SocialLinks />
  </Footer>
</LandingLayout>
```

## Accessibility Guidelines

All components must meet:
- **WCAG 2.1 AA** - Minimum accessibility standard
- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Proper ARIA labels
- **Color Contrast** - Minimum 4.5:1 for text
- **Focus Indicators** - Visible focus states
- **Semantic HTML** - Proper HTML elements

## Responsive Design

### Breakpoints
```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large */
--breakpoint-2xl: 1536px; /* 2X large */
```

### Media Queries
```css
/* Mobile (default) */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container { padding: 3rem; }
}
```

## Dark Mode

All components support dark mode:

```css
/* Light mode (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #000000;
    --text-primary: #ffffff;
  }
}

/* Manual toggle */
[data-theme="dark"] {
  --bg-primary: #000000;
  --text-primary: #ffffff;
}
```

## Animation Principles

### Timing
```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Usage
- **Micro-interactions** - Fast (150ms)
- **Component transitions** - Base (250ms)
- **Page transitions** - Slow (350ms)
- **Prefer ease-out** - Feels more responsive
- **Reduce motion** - Respect user preferences

## Icon System

### Icon Guidelines
- **Consistent stroke width** - 2px standard
- **Grid-based** - 24x24px base size
- **Simple and clear** - Easy to recognize
- **Scalable** - Vector format (SVG)

### Icon Usage
```tsx
import { IconName } from '@/design-systems/icons'

<Icon name="user" size={24} />
<Icon name="settings" size={16} color="primary" />
```

## Implementation

### Using the Design System

1. **Import tokens**
   ```css
   @import '@/design-systems/tokens.css';
   ```

2. **Use components**
   ```tsx
   import { Button, Card } from '@/design-systems/admin'
   ```

3. **Follow patterns**
   - Check existing patterns first
   - Use design tokens for values
   - Maintain consistency

### Creating New Components

1. Use design tokens (colors, spacing, etc.)
2. Follow established patterns
3. Ensure accessibility
4. Support dark mode
5. Make it responsive
6. Document usage
7. Add to component library

## Best Practices

1. **Consistency** - Use existing patterns
2. **Tokens** - Use design tokens, not hard-coded values
3. **Accessibility** - Always consider a11y
4. **Responsive** - Mobile-first approach
5. **Performance** - Optimize assets and code
6. **Documentation** - Document new patterns
7. **Testing** - Test across browsers and devices

## Tools & Resources

- **Figma** - Design files and prototypes
- **Storybook** - Component documentation
- **Design tokens** - tokens.json
- **Icon library** - SVG icon set
- **Style guide** - Comprehensive guide

## Contributing

When adding to the design system:
1. Follow existing patterns
2. Use design tokens
3. Ensure accessibility
4. Create documentation
5. Add examples
6. Update style guide
7. Get design review

---

For implementation examples, see the [`examples/`](../examples/) directory.
