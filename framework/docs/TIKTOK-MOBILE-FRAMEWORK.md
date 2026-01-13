# TikTok Mobile Framework for Lost Monster

> **Mobile-first immersive scroll experiences inspired by WildTrax's proven framework**
>
> **Created**: 2025-12-04
>
> **Purpose**: Transform Lost Monster into a TikTok-style vertical scroll experience for mobile users

---

## 🎯 Core Insight

**Users spend hours on TikTok/Instagram Reels because vertical video is immersive and matches mobile-native behavior.**

Lost Monster mobile experiences should meet users where their attention already lives: full-screen, swipeable, visual-first content that hooks attention in 3 seconds.

**Proven Results from WildTrax:**
- **100% AIDA score** (from 23%)
- **+200-300% conversion increase**
- **95% section completion rate** (from 60%)
- **2m 40s average session** (from 45s)
- **+£2.7M annual revenue** from mobile optimization alone

---

## 📱 Framework Principles

### 0. Desktop and Mobile Are Different

**Core Principle**: Never compromise mobile experience to maintain desktop consistency. Each viewport should use its native strengths.

**Desktop Strengths:**
- Large viewport supports complex multi-column layouts
- Mouse precision enables hover states, tooltips
- Side-by-side content comparison
- Persistent navigation useful

**Mobile Strengths:**
- Full-screen immersion (no UI chrome competing for attention)
- Touch gestures (swipe, long-press) feel natural
- Vertical scroll matches TikTok/Reels mental model (1B+ trained users)
- Single-task focus (users commit full attention)
- Portrait orientation (9:16 ratio) maximizes emotional impact

**Implementation Strategy:**
- **Route separation**: `/m/` prefix for mobile-only experiences
- **Independent components**: `page.tsx` (desktop) vs `/m/page.tsx` (mobile)
- **50% smaller bundles**: Mobile devices only load mobile code
- **A/B testing isolation**: Change mobile UX without touching desktop

---

### 1. One Idea Per Swipe

Each section communicates a **single concept** in 15-30 seconds of attention.

**Anti-Pattern**: Long paragraphs, multiple CTAs, complex layouts
**Pattern**: One headline, one visual, one emotion, one action (optional)

### 2. Visual First, Text Second

**60% visual, 40% text maximum** (ideally 70/30 or 80/20)

**Text Limits**:
- Headlines: 3-8 words
- Body copy: 20-50 words max
- CTAs: 2-4 words

### 3. Emotion Before Logic

Hook attention with **desire, wonder, or aspiration** first. Build trust second. Convert third.

**Order**:
1. **Hook** (Section 1) - Show the dream outcome
2. **Proof** (Section 2) - Social validation
3. **How** (Section 3) - Remove objections
4. **Who** (Section 4) - Help user self-identify
5. **What** (Section 5) - Practical details
6. **Choose** (Section 6) - Product selection
7. **Trust** (Section 7) - FAQ/reassurance
8. **Convert** (Section 8) - Final CTA

### 4. Scroll Must Feel Native

**Mandatory scroll-snap** for firm section boundaries, haptic feedback on section change, smooth 60fps scrolling.

---

## 🧬 The 8-Section AIDA Framework

### Section Mapping for Lost Monster Services

#### Web Development Service Example

| Section | AIDA Stage | Purpose | Content |
|---------|-----------|---------|---------|
| 1. HOOK | Attention | Dream outcome | "Your website. Extraordinary." + hero visual |
| 2. PROOF | Interest | Social validation | Client logos + 5-star reviews |
| 3. HOW | Interest | Remove complexity | "Discover → Design → Deploy" (3-step process) |
| 4. WHO | Desire | Emotional connection | 4 client types carousel (startup, established, enterprise, agency) |
| 5. WHAT | Desire | Feature clarity | Services carousel (design systems, web apps, e-commerce) |
| 6. CHOOSE | Action | Selection moment | Service packages with pricing |
| 7. TRUST | Action | Objection handling | Top 3 FAQs |
| 8. ACTION | Action | Final conversion | "Start Your Project" CTA |

---

## 🛠️ Technical Implementation

### Route Structure

```
app/
├── page.tsx                 # Desktop home
├── services/                # Desktop services
│   └── [slug]/page.tsx
└── m/                       # Mobile-only routes
    ├── layout.tsx           # Mobile-specific layout
    ├── page.tsx             # Mobile home (TikTok scroll)
    └── services/
        └── [slug]/page.tsx  # Mobile service pages
```

### Core Components

#### 1. TikTok Scroll Container

```tsx
'use client'

import { useState, useRef, useEffect } from 'react'

export function TikTokScroll({ sections }: { sections: React.ReactNode[] }) {
  const [activeSection, setActiveSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollY = container.scrollTop
      const sectionHeight = window.innerHeight
      const section = Math.round(scrollY / sectionHeight)

      if (section !== activeSection) {
        setActiveSection(section)
        // Haptic feedback (mobile only)
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll overflow-x-hidden"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none',
      }}
    >
      {sections.map((section, index) => (
        <section
          key={index}
          className="h-screen w-full snap-start snap-always"
        >
          {section}
        </section>
      ))}
    </div>
  )
}
```

#### 2. TikTok Section Template

```tsx
interface TikTokSectionProps {
  backgroundImage: string
  accentColor?: string
  children: React.ReactNode
}

export function TikTokSection({
  backgroundImage,
  accentColor = '#3b82f6',
  children,
}: TikTokSectionProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {/* Content - Bottom aligned (thumb zone) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6">
        {children}
      </div>
    </div>
  )
}
```

#### 3. Middleware for Mobile Detection

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
  const pathname = request.nextUrl.pathname

  // Mobile users → redirect to /m/ routes
  if (isMobile && !pathname.startsWith('/m/') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL(`/m${pathname}`, request.url))
  }

  // Desktop users accidentally on /m/ → redirect back
  if (!isMobile && pathname.startsWith('/m/')) {
    const desktopPath = pathname.replace(/^\/m/, '') || '/'
    return NextResponse.redirect(new URL(desktopPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 🎨 Design System Integration

### Typography Scale (Mobile-First)

```css
/* Lost Monster TikTok Typography */

.text-display-1 {
  font-size: 3.5rem; /* 56px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.text-h1 {
  font-size: 2.5rem; /* 40px */
  line-height: 1.2;
  font-weight: 700;
}

.text-h2 {
  font-size: 1.875rem; /* 30px */
  line-height: 1.3;
  font-weight: 600;
}

.text-body {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
}

.text-body-sm {
  font-size: 0.875rem; /* 14px */
  line-height: 1.5;
}
```

### Color Usage

- **Background**: Full-screen image or dark gradient (`from-gray-900 to-black`)
- **Text**: White primary, `white/60` supporting, `white/40` hints
- **Accent**: Brand blue (`#3b82f6`) for CTAs and emphasis
- **CTAs**: Accent color on dark, or white on accent

### Spacing

- **Section padding**: `px-6` (24px horizontal)
- **Bottom spacing**: `pb-32` (128px to keep content in thumb zone)
- **Between elements**: `mb-6` (24px) for hierarchy

---

## 📦 Lost Monster Section Components

### 1. Hook Section - "Your website. Extraordinary."

**Purpose**: Show dream outcome immediately
**Pattern**: Full-screen image + headline + value prop + swipe hint

### 2. Social Proof Section - Client Success Stories

**Purpose**: Build trust through results
**Pattern**: 5-star reviews + client logos + testimonial

### 3. How It Works Section - 3-Step Process

**Purpose**: Remove objections with simplicity
**Pattern**: Numbered steps + icons + punchy copy

### 4. Who Section - 4 Client Types (Carousel)

**Purpose**: Help user self-identify
**Pattern**: Horizontal carousel with personas

**Personas:**
1. **The Startup** - "Launch fast. Look professional."
2. **The Established** - "Modernize. Convert more."
3. **The Enterprise** - "Scale. Integrate. Secure."
4. **The Agency** - "Partner. White-label. Deliver."

### 5. What Section - Services (Carousel)

**Purpose**: Show practical value
**Pattern**: 3 service categories in carousel

**Services:**
1. **Design Systems** - "Beautiful. Consistent. Yours."
2. **Web Applications** - "Fast. Modern. Reliable."
3. **E-Commerce** - "Sell more. Stress less."

### 6. Choose Section - Service Packages

**Purpose**: Selection moment with clear pricing
**Pattern**: Package cards with CTA

### 7. Trust Section - Top 3 FAQs

**Purpose**: Address concerns
**Pattern**: Minimal FAQ list

**FAQs:**
1. "How long does a project take?"
2. "What's included in each package?"
3. "Do you offer support after launch?"

### 8. Action Section - Final CTA

**Purpose**: Convert
**Pattern**: Strong imagery + emotional copy + prominent button

---

## 🚀 Implementation Checklist

### Phase 1: Foundation (Day 1)
- [ ] Create `/app/m/` directory structure
- [ ] Build `TikTokScroll` component
- [ ] Build `TikTokSection` component
- [ ] Create mobile layout (`/app/m/layout.tsx`)
- [ ] Implement middleware for mobile detection

### Phase 2: Content (Day 2)
- [ ] Design 8 section components for Lost Monster
- [ ] Source/create hero images for each section
- [ ] Write punchy copy (20-50 words per section)
- [ ] Gather client testimonials and logos

### Phase 3: Build (Day 3-4)
- [ ] Implement Section 1-3 (Hook, Proof, How)
- [ ] Build horizontal carousel component
- [ ] Implement Section 4-5 (Who, What) with carousels
- [ ] Implement Section 6-8 (Choose, Trust, Action)
- [ ] Add haptic feedback
- [ ] Test scroll feel

### Phase 4: Polish (Day 5)
- [ ] Add auto-hide header functionality
- [ ] Optimize images (WebP, lazy loading)
- [ ] Add Framer Motion entrance animations
- [ ] Test on iOS Safari + Android Chrome
- [ ] Verify 60fps scrolling
- [ ] Add analytics tracking per section

### Phase 5: Launch
- [ ] Deploy to staging
- [ ] Test with real mobile devices
- [ ] A/B test with 10% mobile traffic
- [ ] Monitor section completion rates
- [ ] Iterate based on data
- [ ] Scale to 100% mobile traffic

---

## 📊 Success Metrics to Track

### Engagement Metrics
- **Section Reach Rate**: % of users reaching each section
- **Average Sections Viewed**: Mean number of sections per session
- **Time Per Section**: How long users spend on each
- **Swipe Direction**: Up (continue) vs Down (back) ratios

### Conversion Metrics
- **Overall Conversion Rate**: % mobile visitors who contact/book
- **Section Drop-off Rate**: Where users abandon journey
- **CTA Click Rate**: % who tap Section 6 or 8 buttons
- **Form Completion**: % who complete contact form

### Quality Metrics
- **Bounce Rate**: % leaving after Section 1
- **Return Visitor Rate**: % who come back later
- **Page Load Speed**: <2s to interactive (target)
- **Session Duration**: >90s = completed journey

**Success Threshold**:
- Section 8 reach rate >80%
- Conversion rate 2-3× desktop baseline
- Bounce rate <25%

---

## 💡 Content Writing Formula

### Headlines
- **3-8 words maximum**
- **Emotion first** (desire, wonder, freedom)
- **Active voice** ("Transform your business" not "Your business could be transformed")
- **Line breaks** for rhythm ("Your website.<br />Extraordinary.")

### Body Copy
- **20-50 words per section**
- **Remove filler words** ("very", "really", "just")
- **Show, don't tell** ("Launch in 2 weeks" not "We work fast")
- **One idea only** (resist urge to add more)

### CTAs
- **2-4 words** ("Start Project", "View Packages", "Let's Talk")
- **Action verbs** (Start, Explore, Discover, Build)
- **No weak language** ("Learn more" → "Explore now")

---

## 🔧 Development Workflow

### Local Development

**Option 1: Direct URL (Fastest)**
```
http://localhost:3000/m/
```

**Option 2: DevTools Emulator**
1. Open DevTools (F12)
2. Toggle device mode (Cmd+Shift+M)
3. Select "iPhone 14 Pro"
4. Visit `/` (will redirect to `/m/`)

### Testing Checklist

- [ ] Device: iPhone 14 Pro (393×852)
- [ ] Visit `/` → verify redirect to `/m/`
- [ ] Scroll snap working (sections lock in place)
- [ ] Header auto-hides on scroll down, shows on scroll up
- [ ] Swipe hint shows on Section 1
- [ ] Haptic feedback works (vibration on section change)
- [ ] Scroll FPS >50fps (check Performance tab)
- [ ] Test on actual iPhone (Safari browser)
- [ ] Test on actual Android (Chrome browser)

---

## 🎯 Key Takeaways

### For Lost Monster

1. **Meet users where they are** - Mobile users expect TikTok-style experiences
2. **8 sections = sweet spot** - Enough depth, not overwhelming
3. **Progressive disclosure** - Carousels maintain content depth without length
4. **Emotion first** - Hook → Proof → Convert (not features → pricing → contact)
5. **Proven framework** - WildTrax achieved 200-300% conversion increase

### Technical Highlights

1. **Route separation** - `/m/` routes for 50% smaller mobile bundles
2. **CSS Snap Scroll** - Native browser feature for smooth performance
3. **Middleware auto-detection** - Seamless mobile/desktop routing
4. **Haptic feedback** - 10ms vibration = massive quality boost
5. **Custom events** - Coordinate header visibility with scroll

---

## 📚 References

**Source Framework:**
- WildTrax TikTok Mobile Framework (proven in production)
- AIDA methodology applied to vertical scroll
- 8-section psychological pattern

**Key Documentation:**
- [WildTrax Framework](/Users/james/Projects/wildtrax/docs/frameworks/TIKTOK-MOBILE-FRAMEWORK.md)
- [WildTrax Case Study](/Users/james/Projects/wildtrax/docs/frameworks/TIKTOK-CASE-STUDY-SUMMARY.md)
- [Mobile Routes README](/Users/james/Projects/wildtrax/src/app/m/README.md)

---

**Next Steps**: Implement Phase 1 - Foundation components and mobile route structure.

---

_Last updated: 2025-12-04_
_Framework Version: 1.0_
_Adapted from: WildTrax TikTok Framework_

