# Lost Monster Website - AI Instructions

> **Bold Personal Brand Design System**
>
> "Built by Someone Who Runs Businesses"

**Project:** Lost Monster Development Agency Website
**Design System:** Bold Personal Brand
**Last Updated:** November 10, 2025

---

## 🚨 BEFORE YOU START - READ THIS

**This is NOT a generic template.** This is Lost Monster's specific Bold Personal Brand website.

**You MUST understand:**
1. We use **dark backgrounds with gradients** (not light)
2. We use **massive typography up to 128px** (not limited to 48px)
3. We use **personal "I" voice** (not corporate "we")
4. We use **dynamic 5-color theming** (user-selectable)
5. We use **glassmorphism and grid patterns** (intentional aesthetic)

**If you think "shouldn't this be light/minimal/corporate?" - NO. Read the design system.**

---

## 📚 Essential Reading (In Order)

**Start here:**
1. **[.ai/LOST-MONSTER-DESIGN-SYSTEM.md](./.ai/LOST-MONSTER-DESIGN-SYSTEM.md)** ⭐ - Complete design system (READ FIRST)
2. **[.ai/DOMAIN-KNOWLEDGE.md](./.ai/DOMAIN-KNOWLEDGE.md)** - Business context and goals
3. **[.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](./.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md)** - Quality standards

**Time investment:** 20-30 minutes. Non-negotiable.

---

## 🎯 What Is This Website?

### The Brand

**Lost Monster** = Personal brand of a developer who runs businesses

**Not:**
- ❌ Corporate agency
- ❌ Freelancer portfolio
- ❌ Generic dev shop

**Is:**
- ✅ Personal expertise brand
- ✅ Business owner who codes
- ✅ Direct, honest, proven

### The Aesthetic: Bold Personal Brand

**Dark, dramatic, personal:**
- Dark gradient backgrounds (depth and drama)
- Massive typography (128px heroes - be bold!)
- Dynamic 5-color theming (user choice)
- Personal first-person voice ("I" not "we")
- Metrics-driven credibility (50+ projects, 70% savings)

**Think:** Apple keynote + personal blog + developer portfolio
**Not:** Corporate website + stock photos + marketing speak

---

## 🎨 Design System Quick Reference

### Colors (Dynamic - User Selects)

```typescript
// In app/page.tsx - lines 6-36
const colors = {
  blue:   { accent: '#60A5FA', bg: 'from-[#1E3A8A] via-[#1E40AF]...' },
  teal:   { accent: '#06B6D4', bg: 'from-slate-900 via-slate-800...' },
  orange: { accent: '#F59E0B', bg: 'from-neutral-900 via-stone-900...' }, // default
  purple: { accent: '#A855F7', bg: 'from-black via-purple-950...' },
  green:  { accent: '#10B981', bg: 'from-neutral-950 via-emerald-950...' },
};
```

**How to use:**
- Backgrounds: `bg-gradient-to-br ${color.bg}`
- Accents: `style={{ color: color.accent }}`
- Buttons: `style={{ backgroundColor: color.accent }}`
- Borders: `style={{ borderColor: color.accent + '20' }}`

**Example from app/page.tsx:**
```tsx
<div className={`bg-gradient-to-br ${color.bg} transition-colors duration-700`}>
  <h1 style={{ color: color.accent }}>Headline</h1>
  <button style={{ backgroundColor: color.accent }}>CTA</button>
</div>
```

### Typography (Bold Scale)

```tsx
// Hero headlines
text-6xl md:text-8xl lg:text-9xl  // 60px → 96px → 128px

// Section headlines
text-4xl md:text-6xl              // 36px → 60px

// Body text
text-xl md:text-2xl               // 20px → 24px

// Labels/small text
text-sm                           // 14px
```

**Example from app/page.tsx line 74:**
```tsx
<h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter">
  <span className="text-white">Built by</span><br/>
  <span style={{ color: color.accent }}>Runs Businesses</span>
</h1>
```

### Voice (Personal & Direct)

```
✅ DO:
"I build systems for my own businesses"
"Not just codes them"
"I understand your problems because I've lived them"
"See My Work"
"2-4 wks"

❌ DON'T:
"We leverage systematic methodologies"
"Our team provides solutions"
"View our portfolio"
"2-4 weeks typical timeline"
```

### Glassmorphism (Cards & Overlays)

```tsx
// Metric cards - app/page.tsx line 132
className="bg-white/5 backdrop-blur-md border rounded-xl p-6"

// Color switcher - app/page.tsx line 150
className="bg-black/80 backdrop-blur-md border border-neutral-700"
```

### Grid Pattern (Background Texture)

```tsx
// app/page.tsx line 67
<div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,...')]
     opacity-30 pointer-events-none -z-10"></div>
// SVG: 60x60 grid, stroke rgba(255,255,255,0.02)
```

---

## ✅ Pre-Work Checklist

**Before presenting ANY design/feature:**

### 1. Bold Personal Brand Compliance
- [ ] Dark background with gradient?
- [ ] Bold typography (not timid)?
- [ ] Uses dynamic color system?
- [ ] Personal "I" voice (not corporate "we")?
- [ ] Metrics visible (50+, 70%, 4.9/5, 2-4 wks)?

### 2. Technical Quality
- [ ] Glassmorphism on cards? (`bg-white/5 backdrop-blur-md`)
- [ ] Grid pattern visible?
- [ ] Smooth color transitions? (`duration-700`)
- [ ] Lighthouse 90+?
- [ ] WCAG AA compliant?

### 3. Responsive
- [ ] Mobile-first design?
- [ ] Typography scales? (`text-6xl md:text-8xl lg:text-9xl`)
- [ ] Touch-friendly? (buttons 44px+ height)
- [ ] Tested on mobile?

**If ANY checkbox is empty → STOP. Read design system. Fix. Then present.**

---

## 📊 Quality Scoring

**Every design change MUST score ≥80/100**

### Scoring Categories (100 points total)

1. **Bold Personal Brand Adherence** (25 points)
   - Dark backgrounds with gradients (5)
   - Bold typography (60-128px) (5)
   - Dynamic color system (5)
   - Personal "I" voice (5)
   - Metrics prominent (5)

2. **Technical Quality** (20 points)
   - Glassmorphism (4)
   - Grid patterns (4)
   - Smooth transitions (4)
   - Performance (4)
   - Accessibility (4)

3. **Voice & Messaging** (20 points)
   - First-person voice (4)
   - Direct language (4)
   - Specific metrics (4)
   - Casual confidence (4)
   - No jargon (4)

4. **Business Goals** (20 points)
   - Value prop clear (4)
   - CTAs prominent (4)
   - Metrics displayed (4)
   - Trust signals (4)
   - Differentiation (4)

5. **Responsive & UX** (15 points)
   - Mobile-first (3)
   - Responsive typography (3)
   - Touch-friendly (3)
   - Clear hierarchy (3)
   - Fast interaction (3)

**Grading:**
- 90-100: A (Excellent) ✅
- 80-89: B (Good) ✅
- 70-79: C (Marginal) ⚠️
- < 70: Fail ❌

**See:** [.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](./.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md)

---

## 🛠️ Tech Stack

```
Framework:  Next.js 15 (App Router)
Language:   TypeScript
Styling:    Tailwind CSS (configured for Bold Personal Brand)
Animations: Framer Motion
Forms:      React Hook Form + Zod
Content:    Markdown (remark + gray-matter)
Icons:      Lucide React only
Fonts:      Outfit (headings), Inter (body)
Hosting:    Vercel
```

**Key Files:**
- `app/page.tsx` - Homepage (see lines 6-175 for full implementation)
- `tailwind.config.ts` - Color system, typography scale
- `styles/globals.css` - Base styles, utility classes

---

## 🚫 Common Mistakes (DON'T DO THESE)

### ❌ Wrong Color Approach
```tsx
// WRONG - Ignores dynamic system
<div className="bg-blue-600"> // Hardcoded color
<h1 className="text-purple-500"> // Not from user's choice
```

```tsx
// RIGHT - Uses dynamic system
<div className={`bg-gradient-to-br ${color.bg}`}>
<h1 style={{ color: color.accent }}>
```

### ❌ Wrong Voice
```tsx
// WRONG - Corporate "we"
"We build amazing solutions for businesses"
"Our team leverages systematic methodologies"
```

```tsx
// RIGHT - Personal "I"
"I build systems for my own businesses to cut costs"
"Not just codes them. I've lived these problems"
```

### ❌ Wrong Typography
```tsx
// WRONG - Timid, small
<h1 className="text-4xl">Main Headline</h1>
```

```tsx
// RIGHT - Bold, massive
<h1 className="text-6xl md:text-8xl lg:text-9xl">Main Headline</h1>
```

### ❌ Wrong Background
```tsx
// WRONG - Light backgrounds
<div className="bg-white">
<div className="bg-gray-50">
```

```tsx
// RIGHT - Dark gradients
<div className={`bg-gradient-to-br ${color.bg}`}>
```

---

## ✅ Correct Patterns (DO THIS)

### Hero Section Pattern

```tsx
// See app/page.tsx lines 70-116
<section className="h-screen flex items-center justify-center">
  <div className="container mx-auto px-6">
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter">
      <span className="text-white">Setup Line</span><br/>
      <span className="text-white">Setup Line 2</span><br/>
      <span style={{ color: color.accent }}>Punchline</span>
    </h1>

    <p className="text-xl md:text-2xl text-neutral-300">
      Direct, personal subheadline
    </p>

    <button style={{ backgroundColor: color.accent }}>
      Start Your Project
    </button>
  </div>
</section>
```

### Metric Cards Pattern

```tsx
// See app/page.tsx lines 122-144
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
  {metrics.map(metric => (
    <div
      className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
      style={{ borderColor: `${color.accent}20` }}
    >
      <Icon style={{ color: color.accent }} />
      <div className="text-4xl font-bold text-white">{metric.value}</div>
      <div className="text-sm font-semibold text-white">{metric.label}</div>
      <div className="text-xs text-neutral-400">{metric.subtext}</div>
    </div>
  ))}
</div>
```

### Color Switcher Pattern

```tsx
// See app/page.tsx lines 149-172
<div className="fixed bottom-8 right-8 z-50">
  <div className="bg-black/80 backdrop-blur-md border border-neutral-700">
    {Object.keys(colors).map(colorKey => (
      <button
        onClick={() => setSelectedColor(colorKey)}
        className={selectedColor === colorKey
          ? 'ring-2 ring-white scale-110'
          : 'opacity-50'}
        style={{ backgroundColor: colors[colorKey].accent }}
      />
    ))}
  </div>
</div>
```

---

## 📋 Standard Workflow

### When Adding New Pages

1. **Read design system** ([.ai/LOST-MONSTER-DESIGN-SYSTEM.md](./.ai/LOST-MONSTER-DESIGN-SYSTEM.md))
2. **Copy pattern from app/page.tsx** (don't start from scratch)
3. **Use dynamic color system** (import colors object)
4. **Personal voice** (first-person, direct)
5. **Score before presenting** (≥80/100)

### When Making Design Changes

1. **Check current implementation** (app/page.tsx is reference)
2. **Maintain Bold Personal Brand** (dark, bold, personal)
3. **Test all 5 color options** (switch colors, verify it works)
4. **Test mobile** (60% of traffic)
5. **Score the change** (≥80/100)

### When Adding Features

1. **Plan with CODA** (for complex features - see [../.ai-framework/frameworks/coda.md](../.ai-framework/frameworks/coda.md))
2. **Create 5 variations** (if design decision - see [../.ai-framework/frameworks/design-variations.md](../.ai-framework/frameworks/design-variations.md))
3. **Implement best** (score them, choose highest)
4. **Test thoroughly** (all colors, mobile, accessibility)
5. **Document decision** (update [.ai/DESIGN-DECISIONS.md](./.ai/DESIGN-DECISIONS.md))

---

## 📖 Key Metrics to Display

**Always include these (from business goals):**

```tsx
const metrics = [
  { value: '50+', label: 'Projects Built', subtext: 'Delivered on time' },
  { value: '70%', label: 'Cost Savings', subtext: 'vs agencies' },
  { value: '4.9/5', label: 'Client Rating', subtext: 'Real reviews' },
  { value: '2-4 wks', label: 'Typical Build', subtext: 'Not months' },
];
```

**Why these specific numbers:**
- 50+ projects = Proven experience (not new)
- 70% savings = Concrete value proposition
- 4.9/5 rating = Real reviews (not perfect 5.0 = suspicious)
- 2-4 weeks = Realistic (not "fast" = vague)

---

## 🔗 Important Documentation Links

**This Project:**
- [Design System](./.ai/LOST-MONSTER-DESIGN-SYSTEM.md) ⭐ **MAIN**
- [Design Summary](./.ai/DESIGN-SYSTEM-SUMMARY.md) - Quick reference
- [Quality Checklist](./.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md) - Scoring
- [Business Context](./.ai/DOMAIN-KNOWLEDGE.md) - Goals and audience
- [Design Decisions](./.ai/DESIGN-DECISIONS.md) - Why we chose this

**Universal Framework (Templates):**
- [CODA Planning](../.ai-framework/frameworks/coda.md) - Planning methodology
- [Design Variations](../.ai-framework/frameworks/design-variations.md) - 5 variations approach
- [Development Principles](../.ai-framework/core/DEVELOPMENT-PRINCIPLES.md) - Core principles

**Reference Implementation:**
- [app/page.tsx](./app/page.tsx) - Perfect example of Bold Personal Brand
- [tailwind.config.ts](./tailwind.config.ts) - Color system configuration
- [styles/globals.css](./styles/globals.css) - Base styles

---

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run lint         # Check for issues

# Testing
# View site: http://localhost:3000
# Test color switcher: Bottom-right corner
# Test mobile: Chrome DevTools → Responsive mode
```

---

## 🎯 Success Checklist

**Before marking ANY task complete:**

- [ ] Uses dynamic color system (not hardcoded colors)
- [ ] Personal "I" voice (not corporate "we")
- [ ] Bold typography (not timid)
- [ ] Dark gradient background (not light)
- [ ] Glassmorphism where appropriate
- [ ] Grid pattern background visible
- [ ] Metrics displayed (50+, 70%, 4.9/5, 2-4 wks)
- [ ] Mobile responsive
- [ ] Lighthouse 90+ all categories
- [ ] Quality score ≥80/100
- [ ] Tested all 5 color options

**If you can't check ALL boxes → It's not done.**

---

## 💡 Remember

**This is Bold Personal Brand, not:**
- ❌ Scandi-Scot (different project - Ancarraig Lodges)
- ❌ Tech-Oriented minimalism (too corporate)
- ❌ Balanced approach (too safe)

**This IS:**
- ✅ Dark, dramatic, personal
- ✅ Massive, bold typography
- ✅ Dynamic user-controlled colors
- ✅ First-person honest voice
- ✅ Metrics-driven credibility

**When in doubt:**
1. Look at [app/page.tsx](./app/page.tsx) - that's the reference
2. Read [.ai/LOST-MONSTER-DESIGN-SYSTEM.md](./.ai/LOST-MONSTER-DESIGN-SYSTEM.md)
3. Ask: "Is this bold, personal, and direct?"

---

**Start here:** [.ai/LOST-MONSTER-DESIGN-SYSTEM.md](./.ai/LOST-MONSTER-DESIGN-SYSTEM.md)

**Current implementation:** [app/page.tsx](./app/page.tsx) (lines 1-175)

**Quality standard:** ≥80/100 ([check here](./.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md))
