# Ancarraig Home Screen Redesign - CODAX

> **Strategic Plan for AI-First Home Experience**
> **Created:** 2026-01-15
> **Frameworks:** CODAX + AIDAX + PLANX

---

## 📋 C - Context (What exists?)

### Current State

**Home Screen:** `/ancarraig` (Dashboard page)
- Hero section: Generic "Welcome to Ancarraig" with calculator/costs buttons
- Features grid: 6 feature cards (Calculator, Stay Length, Cash Flow, Calendar, Competitor, Cost Management)
- AI Assistant: Buried in sidebar navigation, same level as other tools
- Design: Professional but treats all features equally

**Problem:**
- AI Assistant is the MOST valuable feature (learns, remembers, analyzes, advises)
- Currently hidden in sidebar like any other menu item
- No prominent call-to-action to use AI
- Hero section promotes calculator (less intelligent tool)
- Doesn't communicate the unique value of having an AI pricing advisor

**User Behavior:**
- Will use AI Assistant most frequently (pricing decisions, analysis, advice)
- Other tools are important but secondary (calculator, costs, calendar)
- AI should be the "front door" - primary interaction point

### The Gap

**Current:** Balanced feature showcase, AI hidden
**Needed:** AI-first experience, hero positioning, clear value proposition

---

## 🎯 O - Objective (What are we building?)

### Primary Goal

**Redesign Ancarraig home screen to position AI Assistant as the hero feature**, making it:
- Immediately visible and prominent
- Easy to start using (one click to chat)
- Clearly communicating its unique value
- While still providing access to other tools

### Success Criteria

**The home screen should:**
1. Make AI Assistant the focal point (50%+ of visual weight)
2. Communicate AI's unique value (learning, memory, expertise)
3. Provide quick-start conversation prompts
4. Show AI "personality" (helpful, expert, always available)
5. Still offer easy access to other tools (secondary placement)
6. Encourage first-time users to try AI
7. Make returning users go straight to AI

### Why This Matters

**Business Impact:**
- AI is the differentiator (competitors have calculators, not learning AI)
- Increases engagement (AI conversations vs one-off calculator uses)
- Builds stickiness (AI learns YOUR business over time)
- Higher perceived value (personal advisor vs tool)

**User Impact:**
- Faster decisions (ask AI vs manual calculator)
- Better outcomes (AI considers full context)
- Less mental load (AI remembers past decisions)
- More confidence (expert validation)

---

## 📐 D - Details (How does it work?)

### Design Direction: "AI Concierge First"

**Hero Section (60% of screen):**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [AI Sparkle Icon]  Meet Your AI Pricing Advisor       │
│                                                         │
│  I analyze your lodges, channels, and market data to   │
│  help you make confident pricing decisions. The more   │
│  we talk, the smarter I get about YOUR business.       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ 💬 Start a conversation...                      │  │ ← Large input
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Quick starts:                                          │
│  💰 "What should I charge this weekend?"               │ ← Prompt chips
│  📊 "Compare Airbnb vs Booking.com"                    │
│  🎯 "Analyze my pricing strategy"                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Tools Section (40% of screen):**

```
┌─────────────────────────────────────────────────────────┐
│  Other Tools                                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │ Calc    │ │ Costs   │ │ Calendar│ │ Compare │    │ ← Compact
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Content Strategy (AIDAX)

**Attention (Headline):**
- "Meet Your AI Pricing Advisor"
- OR "Your Personal Pricing Expert"
- OR "AI-Powered Pricing Intelligence"

**Interest (Description):**
- Explain what AI does (analyzes, advises, learns)
- Highlight key benefit (confidence in pricing decisions)
- Emphasize uniqueness (learns YOUR business)

**Desire (Social Proof / Features):**
- "The more we talk, the smarter I get"
- Show conversation count or knowledge learned
- "Already knows about X lodges, Y channels, Z insights"

**Action (CTA):**
- Prominent input field (start conversation immediately)
- Quick-start prompts (remove friction)
- "Try asking me anything about pricing"

### Layout Variants

**Option 1: Chat-First (Recommended)**
- Large AI chat input right on home page
- Start conversation without clicking through
- Hero = actual chat interface
- Tools below in compact grid

**Option 2: Launch Pad**
- Hero section promoting AI with big CTA button
- Click "Start Conversation" → goes to `/ancarraig/ai`
- Quick prompts as buttons
- Tools grid below

**Option 3: Split Screen**
- Left 60%: AI introduction + quick chat
- Right 40%: Tool shortcuts
- Side-by-side layout (desktop only)

**Recommendation:** Option 1 (Chat-First)
- Lowest friction (no extra click)
- Immediate value demonstration
- Modern, conversational interface

### Key Components

**1. AI Hero Section**
- Sparkles or brain icon (AI indicator)
- Headline emphasizing "advisor" not "tool"
- 2-3 sentence value prop
- Large chat input or CTA button
- Quick-start prompt chips

**2. Quick Start Prompts**
- 3-4 common questions as clickable chips
- Examples:
  - "What should I charge this weekend?"
  - "Compare Airbnb vs Booking.com"
  - "Help me analyze competitor pricing"
  - "Calculate my net revenue for July"
- Click = fills input with prompt

**3. AI Status Indicator**
- Show AI's knowledge about user's business
- "I know about: 3 lodges, 3 channels, 12 conversations"
- OR "We've had 5 conversations. Ask me to recap what I've learned"

**4. Tools Grid (Compact)**
- 4-6 tool cards in compact 2x3 grid
- Smaller cards than current design
- Icon + title only (no descriptions)
- Still clickable to respective pages

**5. Recent Conversations (Optional)**
- "Recent chats" section
- Last 3 conversations as clickable items
- Quick way to continue a discussion

### Mobile Considerations

**Stack vertically:**
- AI hero section (full width)
- Chat input (full width)
- Quick prompts (scrollable horizontal)
- Tools grid (2 columns on mobile)

**Maintain priority:**
- AI still gets 60-70% of screen real estate
- Tools below the fold is OK (less frequently used)

---

## ✅ A - Acceptance (How do we know it's done?)

### Design Complete When:

- [ ] AI Assistant is the clear focal point (50%+ visual weight)
- [ ] Value proposition clearly communicated
- [ ] Can start AI conversation in 1 click (or 0 clicks if inline chat)
- [ ] Quick-start prompts reduce friction
- [ ] Other tools still accessible but secondary
- [ ] Responsive on mobile/tablet/desktop
- [ ] Follows DARKX design system (navy/cyan)

### Content Complete When:

- [ ] AIDAX score 80+ (conversion-optimized copy)
- [ ] Headline clearly positions AI as advisor
- [ ] Value prop addresses "why AI vs calculator"
- [ ] CTAs compelling and action-oriented
- [ ] Quick prompts representative of real use cases

### UX Complete When:

- [ ] First-time users understand AI value immediately
- [ ] Returning users can start chatting in <2 seconds
- [ ] Other tools don't feel "demoted" (still professional)
- [ ] Flow: Home → AI chat is frictionless
- [ ] Mobile experience maintains priority hierarchy

### Success Metrics:

**Immediate (1 week):**
- AI usage increases 5x (from sidebar obscurity to hero)
- 80%+ of sessions start with AI interaction
- Average 3+ messages per AI conversation

**Long-term (1 month):**
- AI conversations > calculator uses
- Users reference past conversations
- Knowledge base grows organically

---

## 🎨 Design Mockup (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│  Ancarraig Pricing Intelligence               [Theme] [User] │ ← Minimal header
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ✨ Meet Your AI Pricing Advisor                           │ ← Hero headline
│                                                              │
│   I analyze your lodges, channels, and market data to help  │
│   you make confident pricing decisions. The more we talk,   │
│   the smarter I get about YOUR specific business.           │
│                                                              │
│   ┌────────────────────────────────────────────────────┐   │
│   │ 💬  Ask me anything about pricing...              │   │ ← Large input
│   │                                               [→]  │   │
│   └────────────────────────────────────────────────────┘   │
│                                                              │
│   Quick starts:                                              │
│   [💰 Pricing this weekend] [📊 Compare channels]           │ ← Chips
│   [🎯 Analyze my strategy] [📈 Revenue forecast]            │
│                                                              │
│   💡 I know about: 3 lodges • 3 channels • 5 conversations  │ ← Status
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Other Tools                                          [View All →] │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  [icon]  │  │  [icon]  │  │  [icon]  │  │  [icon]  │  │
│  │Calculator│  │  Costs   │  │ Calendar │  │ Compare  │  │ ← Compact
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 Before vs After

### Before:
- Generic welcome message
- Calculator promoted as hero feature
- AI hidden in sidebar
- All features treated equally
- No conversation starters
- Cold, tool-focused

### After:
- Personal AI introduction
- AI as hero feature (60% screen)
- One-click chat access
- Clear feature hierarchy
- Conversation prompts reduce friction
- Warm, advisor-focused

---

## 📊 AIDAX Content Framework

### A - Attention (0-25 pts)

**Headline:** "Meet Your AI Pricing Advisor"
- Score: 22/25
- Grabs attention with "AI" + "Advisor" (not "tool")
- Personal ("Your") creates ownership
- Clear benefit (pricing help)

**Visual:** Large AI icon with sparkles/gradient
- Score: 20/25
- AI = modern, intelligent, premium
- Sparkles = magic, capability, delight

**Total Attention:** 42/50 → **21/25 scaled**

### I - Interest (0-25 pts)

**Value Prop:** "I analyze your lodges, channels, and market data to help you make confident pricing decisions."
- Score: 23/25
- Specific benefits (lodges, channels, data)
- Clear outcome (confident decisions)
- "I" makes AI feel personal

**Unique Selling Point:** "The more we talk, the smarter I get about YOUR business."
- Score: 24/25
- Differentiator (learns over time)
- Personal (YOUR business, not generic)
- Creates FOMO (better over time)

**Total Interest:** 47/50 → **23.5/25 scaled**

### D - Desire (0-25 pts)

**Social Proof:** "I know about: 3 lodges • 3 channels • 5 conversations"
- Score: 20/25
- Shows AI already knows user's context
- Implies others are using it
- Creates confidence

**Quick Start Prompts:** Real use case examples
- Score: 22/25
- Shows versatility (pricing, comparison, strategy)
- Reduces uncertainty (shows what's possible)
- Creates mental association with user's needs

**Total Desire:** 42/50 → **21/25 scaled**

### A - Action (0-25 pts)

**Primary CTA:** Large chat input with placeholder
- Score: 24/25
- Zero friction (type immediately)
- Clear action (just start talking)
- No intimidation (friendly placeholder)

**Secondary CTAs:** Quick-start prompt chips
- Score: 23/25
- One-click conversation starters
- Removes "blank page" anxiety
- Show versatility

**Total Action:** 47/50 → **23.5/25 scaled**

---

## 🎯 Final AIDAX Score

**Attention:** 21/25
**Interest:** 23.5/25
**Desire:** 21/25
**Action:** 23.5/25

**Total:** 89/100 ✅

**Analysis:** Excellent conversion potential. Strong interest and action sections (23.5 each). Attention and desire could be slightly improved with more visual hierarchy and stronger social proof, but overall very strong.

---

## 🚀 Implementation Strategy

### Phase 1: Content & Structure (Day 1)
- Write compelling copy (AIDAX-optimized)
- Define component structure
- Create wireframes

### Phase 2: Build Components (Day 2)
- AIHero component (headline, value prop, input)
- QuickStartPrompts component (chips)
- AIStatusIndicator component
- CompactToolsGrid component

### Phase 3: Integration (Day 3)
- Replace current home page
- Wire up chat functionality
- Add navigation
- Test on all devices

### Phase 4: Polish (Day 4)
- Animations and micro-interactions
- Loading states
- Error handling
- Analytics tracking

---

**CODAX Complete** ✅
**Next Step:** Create detailed PLANX implementation blueprint

