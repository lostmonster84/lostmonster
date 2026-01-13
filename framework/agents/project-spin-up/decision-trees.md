# Project Spin-Up Agent - Decision Trees

> **Purpose**: Visual and logical decision trees showing question flow and branching logic for different project types.

---

## 🚨 CRITICAL: STACK RULES (APPLY TO ALL TREES)

**Before following ANY tree, remember:**

### Authentication
- ✅ **Custom Auth (bcrypt + cookies)** - For admin dashboards, internal tools, password-based
- ✅ **Supabase Auth** - For consumer apps, magic links, social login (Google, GitHub)
- ❌ **NEVER Clerk, NextAuth, Lucia, Auth0** - We build our own

### Database
- ✅ **PostgreSQL** - via Supabase, Neon, or Vercel Postgres
- ✅ **Raw SQL or Supabase Client** - Direct queries
- ⚪ **ORM optional** - Drizzle/Prisma OK for types, NOT required
- ❌ **NEVER require an ORM** - Raw SQL is fine

### Stack
- ✅ **Next.js (Latest)** - Currently 15.x
- ✅ **TypeScript (Latest)** - Currently 5.x
- ✅ **Tailwind CSS (Latest)** - Currently 4.x
- ✅ **Vercel** - For deployment

---

## 🌳 MASTER DECISION TREE

```
START
  │
  ├─→ Q1.1: Project Type?
  │     │
  │     ├─→ [SaaS] ──→ SAAS_TREE
  │     ├─→ [E-commerce] ──→ ECOMMERCE_TREE
  │     ├─→ [Content] ──→ CONTENT_TREE
  │     ├─→ [Marketplace] ──→ MARKETPLACE_TREE
  │     ├─→ [Internal Tool] ──→ INTERNAL_TREE
  │     ├─→ [API Platform] ──→ API_TREE
  │     └─→ [Portfolio] ──→ STATIC_TREE
  │
  └─→ [All paths converge] ──→ TECH_STACK_TREE ──→ END
```

---

## 🔷 SAAS_TREE (Most Common Path)

```
Q1.1: Project Type = SaaS
  │
  ├─→ Q1.2: User Model?
  │     │
  │     ├─→ [B2C] 
  │     │     │
  │     │     ├─→ Q1.4: MVP Timeline
  │     │     ├─→ Q1.5: Team Size
  │     │     ├─→ Q2.1: Auth Requirements
  │     │     ├─→ Q2.3: User Roles (Simple)
  │     │     ├─→ Q2.4: Real-time?
  │     │     ├─→ Q2.5: File Uploads?
  │     │     │     └─→ [Yes] → Q2.5b: Storage Volume
  │     │     ├─→ Q2.6: Payments?
  │     │     │     └─→ [Yes] → Q2.6b: Payment Details
  │     │     ├─→ Q2.7: Email Notifications
  │     │     ├─→ Q2.9: Analytics
  │     │     └─→ Q2.11: Data Model Complexity
  │     │
  │     └─→ [B2B] 
  │           │
  │           ├─→ Q1.3: Team/Org Structure?
  │           │     │
  │           │     └─→ [Yes - Multi-tenant]
  │           │           │
  │           │           ├─→ Q1.3b: Org Billing
  │           │           ├─→ Q2.2: Enterprise Auth (SSO)?
  │           │           ├─→ Q2.3: User Roles (More complex)
  │           │           │     └─→ [Multiple roles] → Q2.3b: Custom Permissions
  │           │           ├─→ Q2.4: Real-time?
  │           │           ├─→ Q2.5: File Uploads?
  │           │           ├─→ Q2.6: Payments (Usually subscriptions)
  │           │           ├─→ Q2.7: Email Notifications
  │           │           ├─→ Q2.9: Analytics
  │           │           ├─→ Q2.10: Admin Dashboard (Essential)
  │           │           └─→ Q2.11: Data Model (Usually Moderate/Complex)
  │           │
  │           └─→ [Both B2B + B2C]
  │                 └─→ (Combination of both paths above)
  │
  └─→ TECH_STACK_TREE
```

**Estimated Questions for SaaS:**
- B2C Simple: 18-22 questions
- B2B Simple: 22-28 questions
- B2B Complex (Multi-tenant, payments, etc.): 28-35 questions

---

## 🛍️ ECOMMERCE_TREE

```
Q1.1: Project Type = E-commerce
  │
  ├─→ Q2.20: Store Type?
  │     │
  │     ├─→ [Simple Store]
  │     │     │
  │     │     ├─→ Q2.21: Inventory Management?
  │     │     │     ├─→ [Full] → Complex inventory setup
  │     │     │     ├─→ [Simple] → Basic in/out stock
  │     │     │     └─→ [None] → Digital products path
  │     │     │
  │     │     ├─→ Q2.22: Shipping?
  │     │     │     └─→ [Yes] → Q2.22b: Carriers + International?
  │     │     │
  │     │     ├─→ Q2.6: Payment Processing (Stripe + potentially others)
  │     │     ├─→ Q2.7: Email (Transactional + order confirmations)
  │     │     ├─→ Q2.5: File Uploads (Product images)
  │     │     │     └─→ Always need image optimization (CDN)
  │     │     │
  │     │     ├─→ Q2.9: Analytics (Important for conversion tracking)
  │     │     ├─→ Q2.10: Admin Dashboard (Essential - manage products/orders)
  │     │     └─→ Q4.9: SEO (Critical for e-commerce)
  │     │
  │     ├─→ [Marketplace]
  │     │     └─→ (Combines E-commerce + Marketplace Trees)
  │     │
  │     ├─→ [Digital Products]
  │     │     │
  │     │     ├─→ Skip: Inventory, Shipping
  │     │     ├─→ Q2.6: Payments (One-time or subscriptions)
  │     │     ├─→ Q2.5: File storage (for downloadable products)
  │     │     └─→ DRM/License key management?
  │     │
  │     └─→ [Booking/Services]
  │           │
  │           ├─→ Calendar integration
  │           ├─→ Availability management
  │           ├─→ Q2.6: Payments (deposits, full payment)
  │           └─→ Notifications (booking confirmations)
  │
  └─→ TECH_STACK_TREE (E-commerce specific recommendations)
```

**Estimated Questions for E-commerce:**
- Simple store: 20-25 questions
- Marketplace: 30-38 questions
- Digital products: 16-20 questions

---

## 📝 CONTENT_TREE

```
Q1.1: Project Type = Content Platform
  │
  ├─→ Q2.30: Content Type?
  │     │
  │     ├─→ [Blog/Articles]
  │     │     │
  │     │     ├─→ Q2.31: Who creates content?
  │     │     │     ├─→ [Team only] → Simple auth
  │     │     │     ├─→ [User-generated] → Public auth, moderation
  │     │     │     └─→ [Approved contributors] → Application workflow
  │     │     │
  │     │     ├─→ Q2.32: CMS Need?
  │     │     │     ├─→ [Headless CMS] → Sanity/Contentful setup
  │     │     │     ├─→ [Markdown] → MDX setup
  │     │     │     └─→ [Database] → Custom admin
  │     │     │
  │     │     ├─→ Q2.8: Search (Often needed for large content libraries)
  │     │     ├─→ Q4.9: SEO (Critical)
  │     │     ├─→ Q2.9: Analytics (Page views, reading time)
  │     │     └─→ Q2.6: Payments (If subscription content)
  │     │
  │     ├─→ [Media - Video/Podcast]
  │     │     │
  │     │     ├─→ Q2.5: File Uploads (Large files - video)
  │     │     │     └─→ Video hosting (Mux, Cloudflare Stream)
  │     │     ├─→ Q4.1: Image/Video CDN (Essential)
  │     │     ├─→ Q2.6: Payments (Subscriptions for premium content)
  │     │     └─→ Transcoding/streaming setup
  │     │
  │     ├─→ [Community/Forum]
  │     │     │
  │     │     ├─→ Q2.1: Auth (Usually social login)
  │     │     ├─→ Q2.3: User Roles (Moderators, admins, users)
  │     │     ├─→ Q2.4: Real-time (Often nice for live discussions)
  │     │     ├─→ Q2.7: Email (Notifications, digests)
  │     │     ├─→ Q2.8: Search (Essential for forums)
  │     │     └─→ Moderation tools
  │     │
  │     └─→ [Course/Educational]
  │           │
  │           ├─→ Course structure (curriculum, lessons, quizzes)
  │           ├─→ Progress tracking
  │           ├─→ Q2.6: Payments (Course purchases)
  │           ├─→ Q2.5: File Uploads (Course materials)
  │           └─→ Certificate generation
  │
  └─→ TECH_STACK_TREE
```

**Estimated Questions for Content:**
- Blog: 15-20 questions
- Community: 22-28 questions
- Educational: 25-30 questions

---

## 🤝 MARKETPLACE_TREE

```
Q1.1: Project Type = Marketplace
  │
  ├─→ Q2.40: Marketplace Model?
  │     │
  │     ├─→ [Product Marketplace]
  │     │     │
  │     │     ├─→ Combines E-commerce + Multi-tenant
  │     │     ├─→ Q2.41: Payment Splits (Stripe Connect required)
  │     │     ├─→ Q2.21: Inventory (per vendor)
  │     │     ├─→ Q2.22: Shipping (complex - multi-vendor)
  │     │     ├─→ Vendor onboarding/approval
  │     │     ├─→ Q2.10: Admin Dashboard (Essential - manage vendors)
  │     │     ├─→ Q2.8: Search (Critical for discovery)
  │     │     ├─→ Review/rating system
  │     │     └─→ Dispute resolution
  │     │
  │     ├─→ [Service Marketplace]
  │     │     │
  │     │     ├─→ Q2.41: Payment Splits
  │     │     ├─→ Profile/portfolio for service providers
  │     │     ├─→ Booking/scheduling system
  │     │     ├─→ Q2.8: Search with filters (location, skills, price)
  │     │     ├─→ Review/rating system
  │     │     ├─→ Messaging between buyers/sellers
  │     │     │     └─→ Q2.4: Real-time (for messaging)
  │     │     └─→ Escrow/milestone payments
  │     │
  │     ├─→ [Booking Marketplace]
  │     │     │
  │     │     ├─→ Calendar/availability management
  │     │     ├─→ Q2.41: Payment Splits
  │     │     ├─→ Q2.8: Search (location, dates, filters)
  │     │     ├─→ Instant booking vs approval required
  │     │     ├─→ Cancellation policies
  │     │     └─→ Review system
  │     │
  │     └─→ [Digital Goods Marketplace]
  │           │
  │           ├─→ Q2.41: Payment Splits
  │           ├─→ Q2.5: File Uploads (user products)
  │           ├─→ License management
  │           ├─→ Q2.8: Search and filtering
  │           └─→ Preview/demo functionality
  │
  └─→ TECH_STACK_TREE (Complex stack required)
```

**Estimated Questions for Marketplace:**
- Simple: 30-35 questions
- Complex (multi-vendor, escrow, etc.): 38-45 questions

---

## 🔧 INTERNAL_TREE

```
Q1.1: Project Type = Internal Tool
  │
  ├─→ Simplified SaaS path:
  │     │
  │     ├─→ Q1.2: User Model (Usually just "Internal")
  │     │
  │     ├─→ Q2.1: Auth Requirements
  │     │     │
  │     │     └─→ 🚨 ALWAYS USE CUSTOM AUTH (bcrypt + cookies)
  │     │         Internal tools = password-based login
  │     │         Simple session management
  │     │         NO Clerk, NO Supabase Auth needed
  │     │
  │     ├─→ Q2.3: User Roles (Department-based usually)
  │     ├─→ Q2.11: Data Model (Custom to business)
  │     ├─→ Q2.10: Admin Dashboard (Essential)
  │     │
  │     ├─→ Skip: Payments, Marketing emails, SEO
  │     ├─→ Focus: Data management, reporting, integrations
  │     │
  │     └─→ Q2.12: Integrations (Often many internal systems)
  │
  └─→ TECH_STACK_TREE (Can be simpler stack)
```

**Auth for Internal Tools:**
- ✅ Custom auth with bcrypt + session cookies
- ✅ Simple role-based permissions (admin, editor, viewer)
- ❌ No need for social login or magic links
- ❌ Never use Clerk or third-party auth services

**Estimated Questions for Internal Tool:**
- Simple: 12-16 questions
- Complex: 20-25 questions

---

## 🔌 API_TREE

```
Q1.1: Project Type = API Platform
  │
  ├─→ API-specific questions:
  │     │
  │     ├─→ Q2.60: API Type?
  │     │     ├─→ [REST]
  │     │     ├─→ [GraphQL]
  │     │     └─→ [Both]
  │     │
  │     ├─→ Q2.61: Authentication Method?
  │     │     ├─→ [API Keys]
  │     │     ├─→ [OAuth 2.0]
  │     │     ├─→ [JWT]
  │     │     └─→ [Multiple]
  │     │
  │     ├─→ Q2.62: Rate Limiting?
  │     │     └─→ [Yes] → Tier-based (free, pro, enterprise)
  │     │
  │     ├─→ Q2.63: API Documentation?
  │     │     ├─→ [OpenAPI/Swagger]
  │     │     ├─→ [GraphQL Schema]
  │     │     └─→ [Custom docs]
  │     │
  │     ├─→ Q2.64: Webhooks?
  │     ├─→ Q2.11: Data Model
  │     ├─→ Q3.1: Database
  │     ├─→ Q2.6: Payments (API usage-based billing)
  │     ├─→ Q3.10: Monitoring (Essential for API platforms)
  │     │
  │     └─→ Skip: Frontend questions (no UI needed)
  │
  └─→ TECH_STACK_TREE (Backend-focused)
```

**Estimated Questions for API:**
- Simple REST API: 15-18 questions
- Complex GraphQL with auth: 22-28 questions

---

## 📄 STATIC_TREE

```
Q1.1: Project Type = Portfolio/Landing Page
  │
  ├─→ Simplified path:
  │     │
  │     ├─→ Q3.3: Frontend Framework
  │     │     └─→ Recommend Next.js (SSG) or Astro
  │     │
  │     ├─→ Q2.32: CMS? (For case studies, blog)
  │     ├─→ Q4.9: SEO (Critical for landing pages)
  │     ├─→ Q4.1: Image Optimization
  │     ├─→ Q2.7: Email (Contact form)
  │     ├─→ Q2.9: Analytics (Plausible, PostHog)
  │     │
  │     └─→ Skip: Auth, Database, Payments, Complex backend
  │
  └─→ TECH_STACK_TREE (Static-first)
```

**Estimated Questions for Static:**
- Simple portfolio: 8-12 questions
- Marketing site with CMS: 14-18 questions

---

## 🛠️ TECH_STACK_TREE (Final Phase - Universal)

```
[All project types converge here]
  │
  ├─→ Q3.1: Database Preference
  ├─→ Q3.2: Database Hosting
  ├─→ Q3.3: Frontend Framework
  ├─→ Q3.4: TypeScript?
  ├─→ Q3.5: Styling Approach
  ├─→ Q3.6: Component Library
  ├─→ Q3.7: Deployment Platform
  ├─→ Q3.8: Environment Strategy
  ├─→ Q3.9: CI/CD
  ├─→ Q3.10: Monitoring
  │
  └─→ TIER 4 (Optional optimizations)
        │
        ├─→ Q4.1: Image Optimization
        ├─→ Q4.2: Email Templates
        ├─→ Q4.5: Accessibility
        ├─→ Q4.7: Dark Mode
        ├─→ Q4.9: SEO Priority
        │
        └─→ END → Architecture Recommendation
```

**Estimated Questions for Tech Stack:**
- Standard: 10-12 questions
- With optimizations: 15-18 questions

---

## 📊 QUESTION COUNT BY PATH

| Project Type | Min Questions | Avg Questions | Max Questions |
|--------------|---------------|---------------|---------------|
| SaaS (B2C Simple) | 18 | 22 | 28 |
| SaaS (B2B Complex) | 24 | 30 | 38 |
| E-commerce (Simple) | 20 | 25 | 32 |
| E-commerce (Marketplace) | 30 | 36 | 45 |
| Content (Blog) | 15 | 20 | 26 |
| Content (Community) | 22 | 28 | 35 |
| Marketplace | 30 | 36 | 45 |
| Internal Tool | 12 | 18 | 25 |
| API Platform | 15 | 22 | 30 |
| Portfolio/Static | 8 | 12 | 18 |

**Average across all types**: 25-30 questions

---

## 🔀 SKIP LOGIC PATTERNS

### Pattern 1: Implied Answers

```
If Project Type = "Portfolio/Landing Page"
  → Skip ALL auth questions (no login needed)
  → Skip database questions (static site)
  → Skip payment questions (no transactions)
  → Focus only on: Framework, CMS, SEO, Deployment
```

### Pattern 2: Cascading Dependencies

```
If Payments = "No"
  → Skip payment provider details
  → Skip subscription tier setup
  → Skip invoice/receipt emails
  → Skip payment webhooks
```

### Pattern 3: Feature Bundling

```
If Database Hosting = "Supabase"
  → Auto-include: Postgres, Auth, Storage, Realtime
  → Adjust auth questions (Supabase has built-in auth)
  → Offer Supabase Realtime for real-time features
```

### Pattern 4: Complexity Reduction

```
If Timeline = "Fast (2-4 weeks)"
  AND Team Size = "Solo"
  → Recommend simpler stack options
  → Skip "nice to have" features
  → Focus on MVP essentials
  → Suggest adding features post-launch
```

### Pattern 5: Budget Awareness

```
If User signals budget concern (free tier mentions, etc.)
  → Recommend Supabase free tier
  → Suggest Vercel free tier
  → Skip premium services (Algolia → built-in search)
  → Highlight open-source alternatives
```

---

## 🎯 OPTIMIZATION RULES

### Rule 1: Never ask if answer is obvious
```
❌ BAD:
Q: "Do you need user authentication?"
Context: User said "SaaS with paid subscriptions"

✅ GOOD:
Skip the question. Auth is required. Ask specifics instead.
```

### Rule 2: Batch related questions
```
✅ GOOD:
"A few questions about payments:"
1. Subscription or one-time?
2. Pricing tiers?
3. Free trial?

❌ BAD:
Spread these across the conversation
```

### Rule 3: Smart defaults reduce questions
```
✅ GOOD:
"I recommend Postgres via Supabase for your use case. Sound good?"
→ If yes, skip database questions

❌ BAD:
"Which database? Which host? Which version?"
```

### Rule 4: Progressive disclosure
```
✅ GOOD:
Start with: "Simple or custom permissions?"
Only if "Custom" → Ask detailed permissions questions

❌ BAD:
Ask all permission questions upfront
```

---

## 🧪 DECISION TREE TESTING

### Test Scenarios

**Scenario 1: Simple SaaS MVP**
- Solo founder, technical
- SaaS, B2C, no teams
- Auth + basic CRUD
- Fast timeline
- **Expected**: 18-20 questions

**Scenario 2: Complex B2B SaaS**
- Small team, mixed technical
- SaaS, B2B, multi-tenant
- Auth + roles + payments + real-time
- Moderate timeline
- **Expected**: 30-34 questions

**Scenario 3: E-commerce Store**
- Solo, non-technical
- E-commerce, physical products
- Inventory + shipping + payments
- Fast timeline
- **Expected**: 22-26 questions

**Scenario 4: Content Platform**
- Small team, technical
- Blog + community
- User-generated content
- Moderate timeline
- **Expected**: 24-28 questions

**Scenario 5: API Platform**
- Experienced dev
- REST API with auth
- No frontend
- Fast timeline
- **Expected**: 16-18 questions

---

## 📈 DECISION TREE METRICS

**Target Metrics:**
- ✓ Average questions: 25-30
- ✓ Time to complete: 10-15 minutes
- ✓ User satisfaction: >90%
- ✓ Zero critical info missed: 100%
- ✓ Recommendation accuracy: >95%

**Red Flags:**
- ⚠️ >40 questions → Too many, losing user
- ⚠️ <15 questions → Not enough info for good recommendation
- ⚠️ >20 minutes → Pacing too slow
- ⚠️ Dropout rate >10% → Questions confusing or overwhelming

---

**Next**: See `conditional-logic.md` for implementation pseudocode and edge case handling.






