# Lost Monster: Design System

> Visual identity, layout principles, and design guidelines
> Last Updated: 2025-11-10

---

## Design Philosophy

**"Bold, confident, no BS. Clean, modern, memorable."**

### Core Principles

1. **Cinematic over cute** - Full-screen, impactful, not decorative
2. **Data over decoration** - Metrics visible, proof prominent
3. **Confident over corporate** - Bold but not arrogant
4. **Simple over complex** - Clean layouts, generous whitespace
5. **Honest over trendy** - Timeless choices, not chasing fads

---

## Color System

### The Innovation: Interactive Color Selector

**Unique Feature:** Visitors can choose their preferred color palette

**Why:**
- Shows confidence ("pick what you like")
- Interactive/engaging
- Memorable (nobody else does this)
- Practical (different clients prefer different colors)
- Subtle technical flex

### Color Palettes

Each palette uses the same structure:
- **Background:** Dark gradient (navy/black/charcoal)
- **Text:** White primary, neutral-300 secondary
- **Accent:** ONE bold color used strategically
- **Borders:** Accent color at 20-30% opacity

#### Palette 1: Sky Blue (DEFAULT)
```css
/* Background */
bg-gradient: from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]

/* Accent */
primary: #60A5FA (sky blue)
primary-hover: #7CB6FB
primary-glow: #60A5FA40 (with transparency)

/* Use for */
- Primary CTAs
- Headline accents
- Icons and indicators
- Metric highlights
```

**Personality:** Trustworthy, professional, classic tech

#### Palette 2: Vibrant Teal
```css
/* Background */
bg-gradient: from-slate-900 via-slate-800 to-slate-900

/* Accent */
primary: #06B6D4 (cyan/teal)
primary-hover: #08D4F0
primary-glow: #06B6D440

/* Use for */
- Same as blue
```

**Personality:** Modern, fresh, tech-forward

#### Palette 3: Bold Orange (RECOMMENDED)
```css
/* Background */
bg-gradient: from-neutral-900 via-stone-900 to-neutral-900

/* Accent */
primary: #F59E0B (amber/orange)
primary-hover: #FBBF24
primary-glow: #F59E0B40

/* Use for */
- Same as blue
```

**Personality:** Bold, confident, stands out, warm

#### Palette 4: Rich Purple
```css
/* Background */
bg-gradient: from-black via-purple-950 to-black

/* Accent */
primary: #A855F7 (purple)
primary-hover: #C084FC
primary-glow: #A855F740

/* Use for */
- Same as blue
```

**Personality:** Premium, creative, distinctive

#### Palette 5: Fresh Green
```css
/* Background */
bg-gradient: from-neutral-950 via-emerald-950 to-neutral-950

/* Accent */
primary: #10B981 (emerald green)
primary-hover: #34D399
primary-glow: #10B98140

/* Use for */
- Same as blue
```

**Personality:** Growth-focused, positive, results-oriented

### Neutral Scale (Constant Across Palettes)

```css
neutral-50: #fafafa
neutral-100: #f5f5f5
neutral-200: #e5e5e5
neutral-300: #d4d4d4    /* Secondary text */
neutral-400: #a3a3a3    /* Disabled text */
neutral-500: #737373
neutral-600: #525252
neutral-700: #404040    /* Borders */
neutral-800: #262626    /* Card backgrounds */
neutral-900: #171717    /* Section backgrounds */
neutral-950: #0a0a0a    /* Darkest backgrounds */
black: #000000
white: #ffffff
```

### Semantic Colors (Constant)

```css
success: #22c55e (green)
error: #ef4444 (red)
warning: #f59e0b (amber)
info: #3b82f6 (blue)
```

### Usage Rules

✅ **DO:**
- Use accent color for CTAs, headlines, icons
- Use at 20-30% opacity for borders, glows
- Use white/neutral-300 for text
- Use neutral-800/900 for cards/sections

❌ **DON'T:**
- Mix multiple accent colors
- Use pastels or gradients everywhere
- Use the accent color as a background (too intense)
- Create rainbow effects (single accent only)

---

## Typography

### Font Stack

```css
/* Headings */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 700-900 (bold to black)

/* Body */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 400-600 (normal to semibold)

/* Mono (for data/code) */
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
font-weight: 400-700
```

**Note:** Inter is the primary font. It's clean, modern, readable, and works for both headings and body.

### Type Scale

```css
/* Headings */
h1: 3rem-6rem (48px-96px)    /* Hero headlines ONLY */
h2: 1.5rem-2rem (24px-32px)  /* Section headers */
h3: 1.25rem-1.5rem (20px-24px) /* Subsections */

/* Body */
body-lg: 1.25rem (20px)      /* Subheadlines */
body: 1rem (16px)            /* Default text */
body-sm: 0.875rem (14px)     /* Small text */
body-xs: 0.75rem (12px)      /* Footnotes */

/* Minimum readable size: 14px (0.875rem) */
```

### Type Styles

**Hero Headline (H1):**
```css
font-size: 3xl-9xl (depending on viewport)
font-weight: 800-900 (extrabold-black)
line-height: 1-1.1 (tight)
letter-spacing: -0.02em (tighter)
color: white with accent color for emphasis
```

**Section Headline (H2):**
```css
font-size: 2xl-4xl
font-weight: 700-800 (bold-extrabold)
line-height: 1.2
color: white
```

**Body Text:**
```css
font-size: base-lg (16px-20px)
font-weight: 400 (normal)
line-height: 1.6-1.75 (relaxed)
color: neutral-300
max-width: 65ch (readable line length)
```

**Button Text:**
```css
font-size: base-lg (16px-20px)
font-weight: 600-700 (semibold-bold)
letter-spacing: normal
```

### Typography Rules

✅ **DO:**
- Use massive headlines (7xl-9xl) for hero sections
- Keep line length to 60-70 characters
- Use generous line height for body (1.6-1.75)
- Use font-weight for hierarchy, not just size
- Use tight tracking for large headings

❌ **DON'T:**
- Go below 14px for any text
- Use more than 3 font sizes on one section
- Use decorative or script fonts
- Mix too many font weights
- Use all caps for long text (short labels only)

---

## Layout System

### The Winner: Centered Cinematic

**Structure:**
```
[Full-screen dark background with gradient]
  [Centered content container]
    [Badge/overline]
    [Massive headline (7xl-9xl)]
    [Subheadline (xl-2xl)]
    [CTAs (prominent buttons)]
    [Metrics grid (clean 2x2 or 4x1)]
```

**Characteristics:**
- Centered, not split
- Generous whitespace
- Massive typography
- Clean metrics below
- Single column focus

### Grid System

```css
/* Container */
max-width: 1280px (80rem)
padding-x: 1.5rem (mobile), 3rem (desktop)

/* Columns */
12-column grid
gap: 1.5rem-2rem

/* Common layouts */
- Hero: Full width, centered
- Metrics: 2 cols mobile, 4 cols desktop
- Content: 8 cols max (for readability)
- Sidebar: 4 cols
```

### Spacing System

```css
/* Section padding */
py-24 (6rem / 96px) desktop
py-16 (4rem / 64px) mobile

/* Element spacing */
mb-2: 0.5rem (8px)   - Tight spacing
mb-4: 1rem (16px)    - Default spacing
mb-6: 1.5rem (24px)  - Comfortable spacing
mb-8: 2rem (32px)    - Section breaks
mb-12: 3rem (48px)   - Major breaks
mb-16: 4rem (64px)   - Between sections
mb-20: 5rem (80px)   - Large gaps
```

### Whitespace Philosophy

**"Breathing room = premium"**

- Don't cram elements
- Let sections breathe
- Use generous margins
- Empty space is not wasted space

---

## Components

### Buttons

**Primary CTA:**
```css
/* Style */
background: [accent-color]
color: black (high contrast)
padding: 1.5rem 3rem (py-6 px-12)
font-size: xl (20px)
font-weight: 700 (bold)
border-radius: 0.5rem (8px)
box-shadow: 0 20px 60px [accent-color]40

/* Hover */
background: [accent-color-lighter]
transform: translateY(-2px) [subtle]
```

**Secondary CTA:**
```css
background: transparent
color: white
border: 2px solid neutral-700
padding: 1.5rem 3rem
hover: border-color neutral-500, bg neutral-900
```

**Button Rules:**
- Minimum 44px height (touch-friendly)
- Clear action words ("Start Your Project", not "Click Here")
- Icon optional (arrow right for forward action)
- Max 2 CTAs side-by-side

### Cards

**Metric Card:**
```css
background: white/5 with backdrop-blur
border: 1px solid [accent]/20
border-radius: 0.75rem (12px)
padding: 1.5rem (24px)

/* Content */
icon: [accent-color], 24px
value: text-4xl, font-bold, white
label: text-sm, font-semibold, white
subtext: text-xs, neutral-400
```

**Content Card:**
```css
background: neutral-900/50 or neutral-950
border: 1px solid neutral-800
border-radius: 1rem (16px)
padding: 2rem (32px)
hover: border-color [accent]/30
```

### Badges

**Overline Badge:**
```css
background: white/5 with backdrop-blur
border: 1px solid [accent]/30
border-radius: 9999px (full)
padding: 0.5rem 1rem (py-2 px-4)
font-size: sm (14px)
font-weight: 500
color: white
icon: [accent-color], 16px
```

### Icons

**Library:** Lucide Icons (consistent, customizable, not emojis)

**Usage:**
```css
/* Sizes */
- sm: 16px (w-4 h-4)
- base: 20px (w-5 h-5)
- lg: 24px (w-6 h-6)

/* Colors */
- Accent color for primary icons
- White for secondary
- Neutral-400 for disabled

/* Stroke */
- strokeWidth: 1.5-2 (not too thin)
```

---

## Sections

### Hero Section

**Layout:**
```
min-height: 100vh
background: dark gradient
padding: 96px 24px

Content (centered):
  - Badge (optional)
  - Headline (7xl-9xl)
  - Subheadline (xl-2xl, max-w-3xl)
  - CTAs (flex gap-4)
  - Metrics grid (4 cols)
```

**Visual Elements:**
- Subtle grid pattern overlay (opacity 20-30%)
- Optional gradient glow effects
- Color switcher (top-right corner)

### Content Section

**Layout:**
```
padding: 96px 24px
background: neutral-900 or neutral-950

Content (max-w-6xl):
  - Section headline
  - Description
  - Content blocks
```

### Metrics/Stats Section

**Layout:**
```
Grid: 2 cols mobile, 4 cols desktop
Cards with:
  - Icon
  - Large number
  - Label
  - Subtext
```

---

## Effects & Transitions

### Allowed Effects

**Backdrop Blur:**
```css
backdrop-blur-md
/* Use for: badges, cards with transparency */
```

**Glow Effects:**
```css
box-shadow: 0 20px 60px [accent-color]40
/* Use for: CTAs, emphasis elements */
```

**Subtle Gradients:**
```css
bg-gradient-to-br from-[dark] via-[darker] to-[dark]
/* Use for: backgrounds only, no UI elements */
```

**Grid Patterns:**
```css
opacity: 20-30%
/* Use for: background texture only */
```

### Transitions

```css
/* Default */
transition: all 200ms ease

/* Hover states */
- Buttons: transform translateY(-2px)
- Cards: border-color change
- Links: color change

/* NO */
- No slow animations (>300ms)
- No spinners (use skeleton screens)
- No page transitions
- No parallax (too much)
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Avoid These Visual Styles

**AI Stock Aesthetics:**
- Pastel purple/pink/teal gradients everywhere
- Glassmorphism on every element
- Floating orbs/blobs
- Soft rounded corners on everything
- Generic SaaS template look

**Trendy Effects:**
- Neumorphism
- Heavy drop shadows
- Bento box layouts (overdone)
- Gradient text on everything
- Too much animation

**Corporate Boring:**
- All gray/blue, no personality
- Stock photos of people in suits
- Generic icons
- Template layouts
- No visual hierarchy

### ✅ Lost Monster Visual Identity

**Instead, Do This:**
- Dark backgrounds with ONE bold accent
- Flat/minimal with subtle depth
- Strategic use of effects (not everywhere)
- Custom, purposeful layouts
- Clear visual hierarchy

---

## Responsive Design

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First Approach

**Headlines:**
- Mobile: text-5xl (48px)
- Desktop: text-9xl (96px)

**Layout:**
- Mobile: Stack everything, single column
- Desktop: Grid layouts, multi-column

**Spacing:**
- Mobile: Tighter spacing (py-16)
- Desktop: Generous spacing (py-24)

**Touch Targets:**
- Minimum 44x44px for buttons
- Comfortable spacing between links
- Easy-to-tap CTAs

---

## Accessibility

### Color Contrast

- White text on dark backgrounds: WCAG AAA
- Accent color on dark backgrounds: Test with tool
- Never use color alone to convey meaning

### Typography

- Minimum 16px body text
- 14px acceptable for small text only
- Clear hierarchy (don't rely on color)
- Readable line length (60-70 characters)

### Interactive Elements

- Focus states visible (outline or border)
- Keyboard navigation supported
- Clear button labels (not just icons)
- Alt text for all images

---

## Implementation Notes

### CSS Framework

**Tailwind CSS** (with custom config)

**Why:**
- Fast development
- Consistent spacing/colors
- Easy to customize
- Works with color switcher

### Custom Config Additions

```js
// tailwind.config.js additions
{
  colors: {
    // Add all 5 accent colors
    'accent-blue': '#60A5FA',
    'accent-teal': '#06B6D4',
    'accent-orange': '#F59E0B',
    'accent-purple': '#A855F7',
    'accent-green': '#10B981',
  },
  fontSize: {
    // Ensure 9xl exists
    '9xl': '8rem', // 128px
  }
}
```

### Color Switcher Implementation

```tsx
// Store selected color in localStorage
// Apply dynamically via CSS variables or classes
// Persist across pages
// Default to orange (or blue)
```

---

## Brand Assets

### Logo

**Current:** Text-based "Lost Monster"
- Font: Inter Bold or similar
- Color: White (or accent color)
- No complex graphic needed

**Future considerations:**
- Simple icon/mark
- Loch Ness Monster silhouette (subtle)
- Keep it simple, recognizable

### Favicon

- Simple "LM" monogram
- Or stylized monster silhouette
- Works at 16x16px
- Accent color on dark background

---

## Design Checklist

Before shipping any design, verify:

### Visual
- [ ] Uses ONE accent color consistently
- [ ] Dark backgrounds (no white pages)
- [ ] Typography hierarchy clear
- [ ] Generous whitespace
- [ ] No "AI stock" aesthetics
- [ ] Cinematic, bold, confident

### Functional
- [ ] Mobile-responsive
- [ ] Accessible (WCAG AA minimum)
- [ ] Fast loading (<3s)
- [ ] Clear CTAs
- [ ] Touch-friendly buttons

### Brand
- [ ] Feels like Lost Monster (not generic)
- [ ] Matches messaging (honest, direct)
- [ ] Shows confidence (not arrogance)
- [ ] Professional (not corporate)

---

## Quick Reference

### Color Palette Template
```
Background: Dark gradient (navy/black/charcoal)
Accent: ONE bold color (#60A5FA, #F59E0B, etc.)
Text: White primary, neutral-300 secondary
Borders: Accent at 20-30% opacity
```

### Typography Template
```
Hero: 7xl-9xl, extrabold, tight leading
Section: 2xl-4xl, bold
Body: base-lg, normal weight, relaxed leading
Min size: 14px
```

### Layout Template
```
Full-screen background
Centered content (max-w-6xl)
Massive headline
Subheadline (max-w-3xl)
CTAs (2 max)
Metrics grid (4 cols)
Generous spacing (py-24)
```

---

**This is the Lost Monster visual identity. Bold, confident, clean, memorable. Not generic, not trendy, not corporate. Just right.**
