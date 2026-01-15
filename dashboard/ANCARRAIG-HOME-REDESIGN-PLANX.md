# Ancarraig Home Screen Redesign - PLANX

> **Execution Blueprint for AI-First Homepage**
> **Created:** 2026-01-15
> **Estimated Timeline:** 3-4 days
> **AIDAX Score Target:** 89/100

---

## Overview

**Goal:** Redesign Ancarraig home screen (`/ancarraig`) to position AI Assistant as the hero feature, making it the primary interaction point while keeping other tools accessible.

**Framework Used:** CODAX → AIDAX → PLANX
**Design Direction:** Chat-first experience with inline AI input

---

## Milestones

### ✅ Milestone 1: Content & Component Design
### ✅ Milestone 2: AI Hero Section
### ✅ Milestone 3: Quick Start System
### ✅ Milestone 4: Compact Tools Grid
### ✅ Milestone 5: Integration & Polish

---

## Milestone 1: Content & Component Design

**Goal:** Define all copy, structure components, create design specs

**Todos:**

- [ ] **1.1** Write AIDAX-optimized copy
  - **Summary:** Craft all homepage copy following AIDAX framework
  - **What:** Headline, value prop, quick prompts, CTA text, status messages
  - **Why:** Content drives conversion, must score 89/100 on AIDAX
  - **How:**
    - Headline: "Meet Your AI Pricing Advisor" (attention)
    - Value prop: 2-3 sentences explaining AI benefits (interest)
    - Quick prompts: 4 real use-case examples (desire)
    - CTA: Friendly placeholder text (action)
  - **Acceptance:**
    - All copy written and approved
    - AIDAX score 89+
    - Tone: Conversational, helpful, confident
  - **Dependencies:** None
  - **Files:**
    - Document in CODAX file (already done)

- [ ] **1.2** Define component structure
  - **Summary:** Break down page into reusable components
  - **What:** List all components needed with props and responsibilities
  - **Why:** Clear structure before building prevents refactoring
  - **How:**
    - AIHeroSection (headline, value prop, chat input)
    - QuickStartPrompts (4 prompt chips)
    - AIStatusBadge (knowledge indicator)
    - CompactToolsGrid (4-6 tool cards)
    - Optional: RecentConversations
  - **Acceptance:**
    - Component tree documented
    - Props defined for each
    - Responsibilities clear
  - **Dependencies:** 1.1
  - **Files:**
    - This PLANX file (documentation)

- [ ] **1.3** Create design specs
  - **Summary:** Define spacing, colors, typography, responsive behavior
  - **What:** Specific design values following DARKX system
  - **Why:** Consistent implementation, matches existing design
  - **How:**
    - Hero section: 60% screen height minimum
    - AI input: Large (h-14), prominent focus ring
    - Colors: Navy background, cyan accents
    - Fonts: Outfit (headings), Inter (body)
    - Responsive: Stack vertically on mobile
  - **Acceptance:**
    - Design specs documented
    - Follows DARKX color system
    - Responsive breakpoints defined
  - **Dependencies:** 1.2
  - **Files:**
    - Design specs in this file

**Milestone 1 Complete When:** All content written, components planned, design specified

---

## Milestone 2: AI Hero Section

**Goal:** Build the hero section that promotes AI as primary feature

**Todos:**

- [ ] **2.1** Create AIHeroSection component
  - **Summary:** Main hero component with headline, value prop, and visual
  - **What:** React client component with AI branding
  - **Why:** Sets the tone, communicates AI value immediately
  - **How:**
    - Headline: "Meet Your AI Pricing Advisor" (h1, text-4xl)
    - Icon: Sparkles from lucide-react with gradient
    - Value prop: 2-3 sentences explaining benefits
    - Background: Subtle gradient (navy to darker navy)
  - **Acceptance:**
    - Headline renders properly
    - Icon animated (subtle pulse or shimmer)
    - Value prop clearly communicates benefits
    - Responsive typography
  - **Dependencies:** 1.1, 1.3
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/home/AIHeroSection.tsx`

- [ ] **2.2** Create inline chat input
  - **Summary:** Large, prominent chat input directly on homepage
  - **What:** Text input that sends message to AI without page navigation
  - **Why:** Zero friction - start conversation immediately
  - **How:**
    - Large input field (h-14, rounded-xl)
    - Placeholder: "Ask me anything about pricing..."
    - Send button or Enter to send
    - Focus state with cyan ring
    - On submit: Navigate to `/ancarraig/ai` with message as query param
  - **Acceptance:**
    - Input prominent and inviting
    - Placeholder text helpful
    - Enter key works
    - Navigates to AI page with message
  - **Dependencies:** 2.1
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/home/InlineChatInput.tsx`

- [ ] **2.3** Add AI status indicator
  - **Summary:** Show what AI knows about user's business
  - **What:** Badge showing lodges, channels, conversation count
  - **Why:** Social proof, shows AI is personalized, creates confidence
  - **How:**
    - Query database for user's lodge count, conversation count
    - Display as: "I know about: 3 lodges • 3 channels • 5 conversations"
    - If no conversations: "Ready to learn about your business"
    - Subtle icon (brain or database)
  - **Acceptance:**
    - Displays real data from database
    - Updates dynamically
    - Friendly, confidence-building tone
  - **Dependencies:** 2.1
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/home/AIStatusBadge.tsx`

**Milestone 2 Complete When:** Hero section built with chat input and status badge

---

## Milestone 3: Quick Start System

**Goal:** Provide one-click conversation starters to reduce friction

**Todos:**

- [ ] **3.1** Create QuickStartPrompts component
  - **Summary:** 4 chips with common pricing questions
  - **What:** Clickable prompt chips that fill chat input
  - **Why:** Removes "blank page" anxiety, shows AI versatility
  - **How:**
    - 4 pre-written prompts as data
    - Render as chips (rounded-full, border, hover effect)
    - Click fills InlineChatInput and focuses it
    - OR click navigates directly to AI with prompt
  - **Acceptance:**
    - 4 prompts display as chips
    - Click interaction works smoothly
    - Hover states polished
    - Mobile: Horizontal scroll
  - **Dependencies:** 2.2
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/home/QuickStartPrompts.tsx`

- [ ] **3.2** Define prompt content
  - **Summary:** Write 4 compelling quick-start prompts
  - **What:** Real use cases that demonstrate AI value
  - **Why:** Users see themselves in prompts, reduces uncertainty
  - **How:**
    - Prompt 1: "What should I charge this weekend?"
    - Prompt 2: "Compare Airbnb vs Booking.com commissions"
    - Prompt 3: "Help me analyze my pricing strategy"
    - Prompt 4: "Calculate net revenue for peak season"
  - **Acceptance:**
    - Prompts cover different use cases
    - Clear, actionable questions
    - Realistic scenarios
  - **Dependencies:** 3.1
  - **Files:**
    - Hardcoded in QuickStartPrompts component

- [ ] **3.3** Add icons to prompts
  - **Summary:** Visual icons for each prompt chip
  - **What:** Small icons that reinforce prompt intent
  - **Why:** Visual interest, faster comprehension
  - **How:**
    - Prompt 1: CalendarDays icon (weekend)
    - Prompt 2: ArrowLeftRight icon (comparison)
    - Prompt 3: Target icon (strategy)
    - Prompt 4: TrendingUp icon (revenue)
  - **Acceptance:**
    - Icons render inline with text
    - Visually balanced
    - Colors match design system
  - **Dependencies:** 3.1
  - **Files:**
    - QuickStartPrompts.tsx (updated)

**Milestone 3 Complete When:** Quick-start prompts functional and polished

---

## Milestone 4: Compact Tools Grid

**Goal:** Provide secondary access to other tools without competing with AI

**Todos:**

- [ ] **4.1** Create CompactToolCard component
  - **Summary:** Smaller tool card with icon and title only
  - **What:** Minimal card design for secondary tools
  - **Why:** Keep tools accessible without stealing focus from AI
  - **How:**
    - Card: Icon (large, centered) + Title (below)
    - No description (unlike current cards)
    - Hover: Subtle lift and shadow
    - Size: ~120px x 120px
    - Link to respective tool page
  - **Acceptance:**
    - Card renders with icon and title
    - Hover effect polished
    - Links work correctly
    - Smaller than current design
  - **Dependencies:** None
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/home/CompactToolCard.tsx`

- [ ] **4.2** Create CompactToolsGrid component
  - **Summary:** Grid container for tool cards
  - **What:** Responsive grid showing 4-6 main tools
  - **Why:** Organize secondary tools cleanly
  - **How:**
    - Section heading: "Other Tools" (text-lg, muted)
    - Grid: 2 columns mobile, 3-4 columns desktop
    - Tools: Calculator, Costs, Calendar, Comparison
    - Optional: Cash Flow, Live Rates
  - **Acceptance:**
    - Grid responsive across breakpoints
    - Visual hierarchy clear (secondary to AI)
    - All tools accessible
  - **Dependencies:** 4.1
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/home/CompactToolsGrid.tsx`

- [ ] **4.3** Add "View All" link
  - **Summary:** Link to full tools page if more tools exist
  - **What:** Text link in tools section header
  - **Why:** Scalability if more tools added, discovery
  - **How:**
    - Link next to "Other Tools" heading
    - Text: "View All →"
    - Links to comprehensive tools page (create if needed)
    - OR links to navigation/settings
  - **Acceptance:**
    - Link visible and clickable
    - Navigates appropriately
    - Optional if all tools already shown
  - **Dependencies:** 4.2
  - **Files:**
    - CompactToolsGrid.tsx (updated)

**Milestone 4 Complete When:** Tools grid built and secondary to AI hero

---

## Milestone 5: Integration & Polish

**Goal:** Replace current homepage, ensure quality, launch

**Todos:**

- [ ] **5.1** Update main Ancarraig page
  - **Summary:** Replace current dashboard page with new design
  - **What:** Swap out old homepage for new AI-first layout
  - **Why:** Deploy the redesign
  - **How:**
    - Open `/dashboard/apps/web/src/app/ancarraig/page.tsx`
    - Replace entire content with new layout:
      - AIHeroSection at top
      - InlineChatInput
      - QuickStartPrompts
      - AIStatusBadge
      - CompactToolsGrid below
    - Remove old hero and feature grid
  - **Acceptance:**
    - New layout renders correctly
    - All components integrated
    - No TypeScript errors
    - Responsive behavior works
  - **Dependencies:** 2.1-2.3, 3.1, 4.2
  - **Files:**
    - `/dashboard/apps/web/src/app/ancarraig/page.tsx`

- [ ] **5.2** Add animations and micro-interactions
  - **Summary:** Polish with subtle animations
  - **What:** Entrance animations, hover states, transitions
  - **Why:** Professional feel, guides attention
  - **How:**
    - Hero section: Fade in on load
    - AI icon: Subtle pulse animation
    - Prompt chips: Hover lift + shadow
    - Tool cards: Hover lift
    - Input focus: Smooth ring transition
  - **Acceptance:**
    - Animations subtle and professional
    - No janky transitions
    - 60fps performance
  - **Dependencies:** 5.1
  - **Files:**
    - Component files (add Framer Motion or CSS transitions)

- [ ] **5.3** Add loading states
  - **Summary:** Handle data loading gracefully
  - **What:** Skeleton screens while loading conversation count, lodge data
  - **Why:** Professional UX, no content shifts
  - **How:**
    - AIStatusBadge: Skeleton while loading
    - Hero section: Render immediately (static content)
    - Tools grid: Render immediately (static)
  - **Acceptance:**
    - No layout shifts
    - Loading states subtle
    - Fast initial render
  - **Dependencies:** 5.1
  - **Files:**
    - AIStatusBadge.tsx (updated)

- [ ] **5.4** Test responsive behavior
  - **Summary:** Verify design works on all screen sizes
  - **What:** Test mobile (375px), tablet (768px), desktop (1920px)
  - **Why:** Must work beautifully everywhere
  - **How:**
    - Mobile: Stack vertically, hero 70% screen
    - Tablet: Similar to mobile, slightly larger
    - Desktop: Hero prominent, tools grid wider
    - Test on actual devices if possible
  - **Acceptance:**
    - Layout works on all breakpoints
    - Text readable on small screens
    - Touch targets 44px+ on mobile
    - No horizontal scroll
  - **Dependencies:** 5.1
  - **Files:** None (testing)

- [ ] **5.5** Update navigation if needed
  - **Summary:** Ensure nav links work with new layout
  - **What:** Verify AncarraigLayout sidebar still functional
  - **Why:** Users need to navigate between pages
  - **How:**
    - "Dashboard" link should go to new homepage
    - "AI Assistant" link goes to full chat page
    - All other links work as before
  - **Acceptance:**
    - Navigation functional
    - Active states correct
    - No broken links
  - **Dependencies:** 5.1
  - **Files:**
    - `/dashboard/apps/web/src/components/ancarraig/AncarraigLayout.tsx` (verify)

- [ ] **5.6** Performance audit
  - **Summary:** Ensure fast page load and interaction
  - **What:** Check bundle size, render time, interaction latency
  - **Why:** Speed is critical for user experience
  - **How:**
    - Use Lighthouse or Chrome DevTools
    - Target: LCP < 2.5s, FID < 100ms
    - Optimize images if any
    - Code split if needed
  - **Acceptance:**
    - Page loads fast (<2s)
    - Interactions instant
    - No console errors
  - **Dependencies:** 5.1
  - **Files:** None (testing)

- [ ] **5.7** Accessibility check
  - **Summary:** Ensure accessible for all users
  - **What:** Keyboard navigation, screen readers, color contrast
  - **Why:** Inclusive design, professional quality
  - **How:**
    - Tab navigation works (input, prompts, tools)
    - Labels for screen readers
    - Color contrast WCAG AA (navy/cyan)
    - Focus indicators visible
  - **Acceptance:**
    - Keyboard navigation complete
    - Screen reader friendly
    - Color contrast passes
    - Focus states visible
  - **Dependencies:** 5.1
  - **Files:** All components (review)

**Milestone 5 Complete When:** New homepage live, polished, performant, accessible

---

## Success Metrics

**Immediate (Day 1):**
- [ ] New homepage deployed
- [ ] AI hero takes 60%+ visual weight
- [ ] Can start chat in 1 click (or 0 with inline input)
- [ ] AIDAX score 89+

**Short-term (Week 1):**
- [ ] AI usage increases 5x
- [ ] 80%+ sessions start with AI
- [ ] Quick prompts get 50%+ click-through
- [ ] Average 3+ messages per AI conversation

**Long-term (Month 1):**
- [ ] AI conversations exceed calculator uses
- [ ] Users reference past conversations
- [ ] Knowledge base grows organically
- [ ] User feedback positive on AI prominence

---

## Files Created/Modified

### New Files (5 components)
- `/dashboard/apps/web/src/components/ancarraig/home/AIHeroSection.tsx`
- `/dashboard/apps/web/src/components/ancarraig/home/InlineChatInput.tsx`
- `/dashboard/apps/web/src/components/ancarraig/home/AIStatusBadge.tsx`
- `/dashboard/apps/web/src/components/ancarraig/home/QuickStartPrompts.tsx`
- `/dashboard/apps/web/src/components/ancarraig/home/CompactToolCard.tsx`
- `/dashboard/apps/web/src/components/ancarraig/home/CompactToolsGrid.tsx`

### Modified Files
- `/dashboard/apps/web/src/app/ancarraig/page.tsx` (complete redesign)
- `/dashboard/apps/web/src/components/ancarraig/AncarraigLayout.tsx` (verify navigation)

---

## Design Specifications

### Layout
- **Hero Section:** 60-70% of viewport height
- **AI Input:** h-14 (56px), rounded-xl, full width (max-w-3xl)
- **Quick Prompts:** rounded-full chips, px-4 py-2, gap-2
- **Tools Grid:** 2 cols mobile, 3-4 cols desktop, gap-4

### Typography
- **Headline:** text-4xl md:text-5xl, font-bold, Outfit font
- **Value Prop:** text-lg md:text-xl, leading-relaxed
- **Input Placeholder:** text-base, text-muted-foreground
- **Tool Titles:** text-sm, font-medium

### Colors (DARKX System)
- **Background:** bg-background (navy)
- **Hero BG:** Subtle gradient (navy to darker)
- **Accents:** text-primary (cyan), border-primary
- **Muted Text:** text-muted-foreground
- **Tool Cards:** bg-card, border-border

### Spacing
- **Hero Padding:** px-6 py-12 md:py-16
- **Section Gap:** space-y-8 md:space-y-12
- **Prompt Chips:** gap-2 (8px)
- **Tools Grid:** gap-4 (16px)

### Responsive Breakpoints
- **Mobile:** < 768px (stack, full width, 70% hero)
- **Tablet:** 768px - 1024px (similar to mobile)
- **Desktop:** > 1024px (side margins, max-w containers)

---

## Timeline Estimate

**Day 1: Foundation**
- Milestone 1 (Content & Design) - 2 hours
- Milestone 2 (AI Hero) - 4 hours

**Day 2: Features**
- Milestone 3 (Quick Starts) - 3 hours
- Milestone 4 (Tools Grid) - 3 hours

**Day 3: Integration**
- Milestone 5 (Integration & Polish) - 6 hours

**Total:** 18-20 hours (2.5-3 days focused work)

---

## Risk Mitigation

**Risk:** AI prominence feels too aggressive
- **Mitigation:** A/B test, gather user feedback, iterate

**Risk:** Other tools feel "demoted"
- **Mitigation:** Professional compact design, "Other Tools" framing

**Risk:** Inline chat confusing (vs dedicated page)
- **Mitigation:** Clear UX, navigate to full chat on enter

**Risk:** Performance impact from hero animations
- **Mitigation:** Subtle animations only, GPU acceleration, test on low-end devices

---

## Implementation Notes

### Quick Win Optimizations
- Server-render hero content (fast initial paint)
- Load AI status badge async (progressive enhancement)
- Pre-load AI page on hover (instant navigation)
- Cache quick-start prompts (static data)

### Future Enhancements
- Voice input for AI queries
- Recent conversations on homepage
- AI suggestions based on time/day
- Personalized quick prompts
- "Ask AI" button on all tool pages

---

**PLANX Complete** ✅
**Ready for Implementation** 🚀
**Estimated Time:** 2.5-3 days
**Expected Impact:** 5x increase in AI usage
