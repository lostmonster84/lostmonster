# Stayflo - Design Language

> **Visual identity and design principles for Stayflo**
>
> This file is part of the AI Framework v2.1

---

## Brand Essence

**Stayflo is hospitality technology that feels like hospitality.**

We're building software for people who care deeply about guest experience. Our product should reflect that same care - warm, helpful, and beautifully crafted.

### Brand Personality

| Trait | Description | Not This |
|-------|-------------|----------|
| **Warm** | Friendly, approachable, human | Cold, corporate, robotic |
| **Calm** | Confident, unhurried, reassuring | Anxious, aggressive, salesy |
| **Capable** | Professional, reliable, smart | Amateurish, buggy, confusing |
| **Modern** | Current, fresh, forward-thinking | Dated, trendy-for-trends-sake |

### Voice

**For hosts (dashboard):**
- Professional but friendly
- Clear and concise
- Helpful without being patronizing
- "Here's what you need" energy

**For guests (handbook):**
- Warm and welcoming
- Informative but scannable
- Reflects the property's character
- "You're in good hands" energy

---

## Visual Identity

### Color Palette

#### Primary
```css
--stayflo-primary: #0D9488;      /* Teal - trust, calm, hospitality */
--stayflo-primary-light: #14B8A6;
--stayflo-primary-dark: #0F766E;
```

#### Neutrals
```css
--stayflo-white: #FFFFFF;
--stayflo-off-white: #FAFAFA;
--stayflo-gray-50: #F9FAFB;
--stayflo-gray-100: #F3F4F6;
--stayflo-gray-200: #E5E7EB;
--stayflo-gray-300: #D1D5DB;
--stayflo-gray-400: #9CA3AF;
--stayflo-gray-500: #6B7280;
--stayflo-gray-600: #4B5563;
--stayflo-gray-700: #374151;
--stayflo-gray-800: #1F2937;
--stayflo-gray-900: #111827;
```

#### Semantic
```css
--stayflo-success: #10B981;      /* Green */
--stayflo-warning: #F59E0B;      /* Amber */
--stayflo-error: #EF4444;        /* Red */
--stayflo-info: #3B82F6;         /* Blue */
```

### Typography

#### Font Stack
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-display: 'Plus Jakarta Sans', var(--font-sans);
```

#### Scale
| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Display | 48px/3rem | 700 | Hero headlines |
| H1 | 36px/2.25rem | 700 | Page titles |
| H2 | 30px/1.875rem | 600 | Section headers |
| H3 | 24px/1.5rem | 600 | Card titles |
| H4 | 20px/1.25rem | 600 | Subsections |
| Body | 16px/1rem | 400 | Default text |
| Body Small | 14px/0.875rem | 400 | Secondary text |
| Caption | 12px/0.75rem | 500 | Labels, metadata |

### Spacing

Use Tailwind's default scale (4px base):
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px

**Generous whitespace is essential.** When in doubt, add more space.

### Border Radius

```css
--radius-sm: 4px;     /* Inputs, small elements */
--radius-md: 8px;     /* Cards, buttons */
--radius-lg: 12px;    /* Modals, large cards */
--radius-xl: 16px;    /* Feature sections */
--radius-full: 9999px; /* Pills, avatars */
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
```

**Restraint with shadows.** Use sparingly to create hierarchy, not decoration.

---

## Component Patterns

### Buttons

```
Primary:   Teal background, white text, medium shadow on hover
Secondary: White background, gray border, subtle hover
Ghost:     Transparent, text color only, subtle hover
Danger:    Red background for destructive actions
```

**Size variants**: sm (32px height), md (40px), lg (48px)

### Cards

```
Default:   White background, subtle border, sm shadow
Elevated:  White background, md shadow
Interactive: Hover state with border color change
```

### Forms

```
Inputs:    White background, gray-300 border, focus ring in primary
Labels:    Gray-700, font-medium, positioned above input
Errors:    Red border, red text below input
Help text: Gray-500, small text below input
```

### Navigation

```
Dashboard: Left sidebar (collapsible), top header with user menu
Handbook:  Minimal top bar, sticky section navigation
Marketing: Centered nav, CTA button prominent
```

---

## Dashboard Design

**Purpose**: Where hosts build and manage handbooks

### Principles
1. **Functional over decorative** - They're working, not browsing
2. **Clear hierarchy** - What should I do next?
3. **Fast and responsive** - No unnecessary animations
4. **Information dense but not cluttered** - Show what matters

### Layout
- Left sidebar navigation (collapsible on mobile)
- Main content area with breadcrumbs
- Contextual actions in header or floating

### Key Screens
- **Dashboard home**: Property cards, quick stats, recent activity
- **Handbook editor**: Section list, rich text editor, preview
- **Settings**: Organization, billing, team members
- **Analytics**: Charts, tables, insights

---

## Handbook Design (Guest-Facing)

**Purpose**: What guests see and use

### Principles
1. **Beautiful by default** - Should look custom, not generic
2. **Scannable** - Guests want quick answers
3. **Mobile-first** - 70%+ will view on phone
4. **Brandable** - Adapts to property's character

### Layout
- Full-width hero with property image
- Section-based navigation (sticky on scroll)
- Large, readable text
- Generous image usage

### Key Components
- **Hero**: Property name, key info, main image
- **Section cards**: Title, icon, expandable content
- **AI Concierge**: Chat bubble, slide-up panel
- **Quick info bar**: WiFi, check-out, address

### Customization Points
- Primary color (from host)
- Logo (optional)
- Property images
- Section ordering

---

## Animation Guidelines

### Dashboard
- **Minimal**: Focus on function, not flair
- **Fast transitions**: 150-200ms
- **No bounces or springs**: Professional feel
- **Loading states**: Skeleton screens, not spinners

### Handbook
- **Slightly more expressive**: Creates warmth
- **Smooth scrolling**: Section navigation
- **Subtle reveals**: Content fade-in on scroll
- **AI typing indicator**: For concierge responses

### Timing
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Iconography

**Library**: Lucide React (consistent with shadcn/ui)

### Usage
- 24px default size
- Stroke width 1.5-2
- Gray-500 for secondary, primary color for emphasis
- Always pair with text labels in navigation

### Common Icons
```
Home, Building, FileText, Settings, Users
MessageCircle, Search, Plus, Edit, Trash
ChevronRight, ChevronDown, X, Check
Wifi, Clock, MapPin, Phone, Mail
```

---

## Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Wide screens */
```

### Mobile-First Patterns
- Stack vertically below `md`
- Sidebar → bottom sheet on mobile
- Tables → cards on mobile
- Multi-column → single column

---

## Accessibility

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast ratios (4.5:1 minimum)
- Focus indicators

### Patterns
- Skip links
- Landmark regions
- Alt text on images
- Form labels
- Error announcements

---

## Anti-Patterns (Do NOT)

### Visual
- Heavy gradients
- Drop shadows everywhere
- Glassmorphism / blur effects
- Animated backgrounds
- Stock photo overlays

### Layout
- Too many columns
- Cramped spacing
- Hidden navigation
- Infinite scroll (use pagination)
- Auto-playing media

### Interaction
- Hover-only information
- Tiny click targets (< 44px)
- Unexpected animations
- Required scrolling to see CTAs
- Disabled buttons without explanation

---

## Design Checklist

Before shipping any UI:

- [ ] Looks good on mobile (375px width)
- [ ] Text is readable (contrast, size)
- [ ] Interactive elements have clear states
- [ ] Loading states exist
- [ ] Error states exist
- [ ] Empty states exist
- [ ] Keyboard navigable
- [ ] No layout shift on load

---

**Last Updated**: January 2025
