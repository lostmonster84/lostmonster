# Project Spin-Up Agent - Question Bank

> **Purpose**: Comprehensive question library organized by domain with conditional logic, examples, and recommended defaults.

---

## 📊 QUESTION FLOW OVERVIEW

**Total Questions**: 50-80 in bank  
**Asked Per Session**: 25-35 (conditional)  
**Organization**: 4 tiers of priority  
**Branching**: Dynamic based on previous answers

```
Tier 1 (Critical Path) → Determines project category
   ↓
Tier 2 (Category Refinement) → Narrows within category
   ↓
Tier 3 (Technical Specifics) → Infrastructure decisions
   ↓
Tier 4 (Optimizations) → Nice-to-haves
```

---

## 🎯 TIER 1: PROJECT CLASSIFICATION (5-7 questions)

### Q1.1: Project Type

**Question:**
```markdown
What type of project are you building?

1. **SaaS Application** - Users sign up, pay subscription, access features (like Slack, Notion, Linear)
2. **E-commerce Store** - Sell products, handle payments, manage inventory (like Shopify store)
3. **Content Platform** - Blog, media site, community (like Medium, Substack, Dev.to)
4. **Marketplace** - Connect buyers and sellers (like Airbnb, Upwork, Etsy)
5. **Internal Tool** - Admin dashboard, data management, business operations (like custom CRM)
6. **API Platform** - Backend service for mobile apps or third-party integrations
7. **Portfolio/Landing Page** - Marketing site, personal portfolio, product landing
8. **Something else** - Tell me more

This helps me recommend the right architecture and features.
```

**Conditional Logic:**
- If 1 (SaaS) → Q1.2 (User Model)
- If 2 (E-commerce) → Jump to E-commerce Questions (Q2.20+)
- If 3 (Content) → Jump to Content Platform Questions (Q2.30+)
- If 4 (Marketplace) → Jump to Marketplace Questions (Q2.40+)
- If 5 (Internal) → Jump to Internal Tool Questions (Q2.50+)
- If 6 (API) → Jump to API Platform Questions (Q2.60+)
- If 7 (Portfolio) → Jump to Static Site Questions (Q2.70+)

**Default**: SaaS (most common)

---

### Q1.2: User Model

**Question:**
```markdown
Who are your primary users?

1. **Consumers (B2C)** - Regular people, individuals (like Netflix, Spotify)
2. **Businesses (B2B)** - Companies and organizations (like Salesforce, Slack)
3. **Both (B2B2C)** - Businesses who serve consumers (like Shopify, Stripe)
4. **Internal only** - Just your team/company

This affects authentication, pricing models, and feature complexity.
```

**Conditional Logic:**
- If 2 or 3 (B2B) → Q1.3 (Team/Org Structure)
- If 1 (B2C) → Skip to Q1.4 (Auth Requirements)

**Default**: B2C for simple projects, B2B if "SaaS" selected

---

### Q1.3: Team/Organization Structure

**Question:**
```markdown
Do users work in teams or organizations?

**Examples:**
- **Yes**: Slack (workspaces), Notion (team spaces), Figma (organizations)
- **No**: Netflix (individual accounts), Spotify (personal accounts)
- **Both**: GitHub (personal + org accounts)

This determines whether I set up multi-tenancy and organization hierarchy.

1. Yes - Multiple people per organization/workspace
2. No - Individual accounts only
3. Both - Support personal and team accounts
```

**Conditional Logic:**
- If 1 or 3 → Q1.3b (Org Billing)

**Default**: Yes for B2B, No for B2C

---

### Q1.3b: Organization Billing

**Question (only if Q1.3 = Yes):**
```markdown
Who pays for the service?

1. **Organization pays** - Company subscribes for whole team (like Slack)
2. **Individual pays** - Each user pays separately (like Spotify, even if shared)
3. **Mix** - Free individuals, paid organizations (like GitHub)

This affects payment setup and permissions.
```

**Default**: Organization pays (for B2B)

---

### Q1.4: MVP Timeline

**Question:**
```markdown
What's your timeline to launch an MVP?

1. **Fast** - 2-4 weeks (minimal features, iterate quickly)
2. **Moderate** - 1-3 months (solid feature set)
3. **Comprehensive** - 3-6 months (polished, feature-complete)
4. **Flexible** - Building to learn, no hard deadline

This helps me recommend complexity level and feature scope.
```

**Conditional Logic:**
- If 1 (Fast) → Recommend simpler stack, fewer features
- If 3 (Comprehensive) → Allow more complex architecture

**Default**: Moderate (most realistic)

---

### Q1.5: Team Size

**Question:**
```markdown
Who's building this?

1. **Solo founder** - Just you
2. **2-3 people** - Small team
3. **4-10 people** - Small to medium team
4. **10+ people** - Larger team

This affects tooling, infrastructure complexity, and collaboration features I'll set up.
```

**Default**: Solo or 2-3 people

---

### Q1.6: Technical Background

**Question:**
```markdown
What's your technical experience level?

1. **Experienced developer** - Built production apps before
2. **Some coding experience** - Built projects, but not professionally
3. **Learning to code** - Relatively new to development
4. **Non-technical** - Need simple, well-documented setup

No wrong answer! This helps me calibrate documentation and complexity.
```

**Conditional Logic:**
- If 3 or 4 → Recommend simpler stack, more documentation
- If 1 → Can suggest advanced patterns

**Default**: Experienced developer

---

### Q1.7: Expected Scale (Initial)

**Question:**
```markdown
What's your expected scale in the first 6-12 months?

1. **Small** - <100 users (testing, small community)
2. **Medium** - 100-10k users (growing startup)
3. **Large** - 10k-100k users (aggressive growth expected)
4. **Massive** - 100k+ users (viral potential, large existing audience)

This isn't set in stone - just helps me plan for scalability.
```

**Conditional Logic:**
- If 3 or 4 → Ensure scalable infrastructure from start
- If 1 → Can start with simpler, cheaper options

**Default**: Medium

---

## 🔧 TIER 2A: SAAS FEATURES (10-15 questions)

### Q2.1: Authentication Requirements

**Question:**
```markdown
What authentication methods do you need?

1. **Email + Password** - Simple, traditional
2. **Email + Social (Google, GitHub, etc.)** - More convenient
3. **Social only** - Fastest signup
4. **Email Magic Links** - Passwordless
5. **All of the above** - Maximum flexibility

Most modern apps use #2.
```

**Default**: Email + Social

**🚨 IMPLEMENTATION NOTE:**

We NEVER use Clerk, NextAuth, Lucia, or Auth0. We build auth ourselves:

| Auth Method | Implementation |
|-------------|---------------|
| Email + Password | Custom auth (bcrypt + session cookies) |
| Social Login | Supabase Auth |
| Magic Links | Supabase Auth |
| SSO/SAML | Supabase Auth (enterprise) or custom |

**Why custom auth:**
- Full control, no vendor lock-in
- No per-user costs (Clerk charges per MAU!)
- Simple: ~50 lines of code
- Reliable: no third-party outages

---

### Q2.2: Enterprise Auth (B2B only)

**Question (only if B2B):**
```markdown
Will you need enterprise authentication (SSO/SAML)?

**Examples:**
- Large companies require "Sign in with Company IdP"
- Okta, Azure AD, Google Workspace SSO

1. **Yes, from the start** - Targeting enterprise customers now
2. **Eventually, not yet** - Add when enterprise customers ask
3. **No** - Not planning enterprise sales

Most startups choose #2 (add later when needed).
```

**Default**: Eventually, not yet

**🚨 IMPLEMENTATION NOTE:**

For SSO/SAML, use **Supabase Auth Enterprise** or build custom SAML integration.

**NEVER use Clerk for SSO** - we can build this ourselves or use Supabase Enterprise features.

If "Eventually, not yet" selected → Structure code to add SSO later, don't implement now.

---

### Q2.3: User Roles & Permissions

**Question:**
```markdown
Do you need different user roles with different permissions?

**Examples:**
- Admin, Member, Viewer (like Notion)
- Owner, Editor, Commenter (like Google Docs)
- Super Admin, Org Admin, User (like Slack)

1. **Yes, multiple roles** - Different permissions per role
2. **Just admins and regular users** - Simple two-tier
3. **No roles** - Everyone has same permissions
```

**Conditional Logic:**
- If 1 → Q2.3b (Custom Permissions)

**Default**: Just admins and regular users

---

### Q2.3b: Custom Permissions

**Question (only if Q2.3 = Yes):**
```markdown
How complex are your permissions?

1. **Simple** - 2-3 predefined roles (Admin, Member, Viewer)
2. **Moderate** - 5-6 roles with different capabilities
3. **Advanced** - Custom permissions per resource (like Notion database permissions)

Start simple. You can always add complexity later.
```

**Default**: Simple

---

### Q2.4: Real-time Features

**Question:**
```markdown
Will users need to see updates instantly without refreshing?

**Examples that need real-time:**
- Live chat or notifications
- Collaborative editing (like Google Docs)
- Live dashboards or activity feeds
- Real-time inventory/availability updates

**Examples that DON'T need real-time:**
- Traditional CRUD apps (create, view, edit, delete)
- Form submissions
- Profile updates

1. **Yes, essential** - Core feature requires real-time
2. **Nice to have** - Would be cool but not critical
3. **No** - Traditional request/response is fine
```

**Conditional Logic:**
- If 1 → Include WebSocket/Realtime setup
- If 2 or 3 → Skip realtime infrastructure

**Default**: No (most apps don't need it)

---

### Q2.5: File Uploads

**Question:**
```markdown
Will users upload files?

**Examples:**
- Profile pictures
- Documents (PDFs, etc.)
- Images/photos
- Videos
- Datasets/CSVs

1. **No file uploads**
2. **Yes - Small files** (<10MB, like profile pics)
3. **Yes - Medium files** (10-50MB, like documents)
4. **Yes - Large files** (50MB+, like videos)
```

**Conditional Logic:**
- If 2, 3, 4 → Q2.5b (Storage Volume)

**Default**: No file uploads (or small files if uncertain)

---

### Q2.5b: Storage Volume

**Question (only if Q2.5 = Yes):**
```markdown
How many files per user, roughly?

1. **Few** - 1-5 files per user (like 1 profile pic)
2. **Moderate** - 10-100 files per user
3. **Many** - 100+ files per user (file storage is core feature)

This affects storage costs and CDN needs.
```

**Default**: Few

---

### Q2.6: Payment Processing

**Question:**
```markdown
Will you charge users money?

1. **Yes - Subscriptions** - Recurring monthly/annual plans
2. **Yes - One-time payments** - Buy once, use forever
3. **Yes - Usage-based** - Charge per API call, storage, etc.
4. **Yes - Mix** - Combination of the above
5. **No** - Free product (for now)
6. **Maybe later** - Not sure yet

This determines if I set up Stripe and billing logic.
```

**Conditional Logic:**
- If 1-4 (Yes) → Q2.6b (Payment Details)

**Default**: Maybe later

---

### Q2.6b: Payment Details

**Question (only if Q2.6 = Yes):**
```markdown
Tell me about your pricing:

1. **Simple** - 1-3 pricing tiers (Starter, Pro, Enterprise)
2. **Complex** - Many tiers, add-ons, per-seat pricing
3. **Custom** - Contact sales, manual quotes

Also, will you offer:
- Free trial? (yes/no)
- Free tier? (yes/no)
```

**Default**: Simple with free trial

---

### Q2.7: Email Notifications

**Question:**
```markdown
What emails do you need to send?

1. **Just auth** - Password reset, email verification (I'll set this up automatically)
2. **Auth + Transactional** - Plus receipts, confirmations, notifications
3. **Auth + Transactional + Marketing** - Plus newsletters, announcements, campaigns

This determines email service setup (Resend, SendGrid, etc.)
```

**Default**: Auth + Transactional

---

### Q2.8: Search Functionality

**Question:**
```markdown
Will users need to search through data?

1. **No search needed**
2. **Simple search** - Basic filtering and text search (built-in database)
3. **Advanced search** - Full-text search, filters, faceting (needs Algolia/Elasticsearch)

Most apps start with #1 or #2.
```

**Default**: No search (add later if needed)

---

### Q2.9: Analytics & Tracking

**Question:**
```markdown
What analytics do you want?

1. **Basic** - Page views, user signups (simple)
2. **Product analytics** - User behavior, feature usage, funnels (PostHog, Mixpanel)
3. **Both** - Marketing analytics + product analytics
4. **None for now** - Add later

This helps me set up tracking from day one.
```

**Default**: Product analytics

---

### Q2.10: Admin Dashboard

**Question:**
```markdown
Do you need an admin panel to manage users/data?

**Examples:**
- View all users
- Edit user accounts
- Manage content
- View analytics
- Handle support requests

1. **Yes, essential** - Need to manage users and content
2. **Simple CRUD** - Just basic data management
3. **Not yet** - Can use database directly for now
```

**Default**: Simple CRUD

---

### Q2.11: Data Model Complexity

**Question:**
```markdown
How complex is your data model?

**Examples:**

**Simple**: Users, Posts, Comments (like Twitter)

**Moderate**: Users, Organizations, Projects, Tasks, Comments (like Linear)

**Complex**: Multi-level hierarchies, many relationships, complex permissions (like Notion)

1. Simple (3-5 core entities)
2. Moderate (6-10 core entities)
3. Complex (10+ entities with many relationships)

Don't overthink - I'll help you refine this.
```

**Default**: Moderate

---

### Q2.12: Third-Party Integrations

**Question:**
```markdown
Do you need to integrate with other services?

**Examples:**
- Slack notifications
- Calendar sync (Google Calendar)
- CRM (Salesforce)
- Payment providers (beyond Stripe)
- Zapier/Make
- Custom APIs

1. **No integrations needed**
2. **1-2 specific integrations** (tell me which)
3. **Many integrations** - Integration platform needed
```

**Default**: No integrations initially

---

## 🛍️ TIER 2B: E-COMMERCE QUESTIONS (Q2.20-Q2.29)

### Q2.20: Store Type

**Question (if E-commerce):**
```markdown
What type of e-commerce are you building?

1. **Simple store** - Sell your own products
2. **Marketplace** - Multiple vendors selling
3. **Digital products** - Downloads, courses, subscriptions
4. **Booking/Services** - Appointments, bookings
```

### Q2.21: Inventory Management

**Question:**
```markdown
Do you need inventory tracking?

1. **Yes - Full inventory** - Stock levels, low stock alerts, reorder points
2. **Simple** - Just track in/out of stock
3. **No** - Digital products or unlimited stock
```

### Q2.22: Shipping

**Question:**
```markdown
Do you ship physical products?

1. **Yes** - Need shipping calculations, carrier integrations
2. **No** - Digital products or local pickup only
```

**If Yes → Ask about carriers (USPS, UPS, FedEx), international shipping**

---

## 📝 TIER 2C: CONTENT PLATFORM QUESTIONS (Q2.30-Q2.39)

### Q2.30: Content Type

**Question (if Content Platform):**
```markdown
What type of content?

1. **Blog/Articles** - Written content
2. **Media** - Videos, podcasts
3. **Community** - Forums, discussions
4. **Course/Educational** - Lessons, curriculum
```

### Q2.31: Content Management

**Question:**
```markdown
How will content be created?

1. **Your team only** - You create all content
2. **User-generated** - Anyone can post (like Reddit, Medium)
3. **Approved contributors** - Application/approval process
```

### Q2.32: CMS Need

**Question:**
```markdown
Do you want a dedicated CMS (Content Management System)?

1. **Yes - Headless CMS** - Sanity, Contentful (non-technical editors)
2. **No - Markdown files** - Content in code (git-based)
3. **No - Database only** - Custom admin interface
```

---

## 🤝 TIER 2D: MARKETPLACE QUESTIONS (Q2.40-Q2.49)

### Q2.40: Marketplace Model

**Question (if Marketplace):**
```markdown
What's your marketplace model?

1. **Product marketplace** - Buy/sell physical goods (like Etsy)
2. **Service marketplace** - Hire professionals (like Upwork)
3. **Booking marketplace** - Reserve spaces/time (like Airbnb)
4. **Digital goods** - Downloads, templates, etc.
```

### Q2.41: Payment Splits

**Question:**
```markdown
How do payments work?

1. **You take commission** - Platform fee per transaction (need Stripe Connect)
2. **Direct to seller** - Sellers paid directly, you charge subscription
3. **Hybrid** - Commission + subscription
```

---

## 🔧 TIER 3: TECHNICAL SPECIFICATIONS (8-12 questions)

### Q3.1: Database Preference

**Question:**
```markdown
Any database preference?

1. **Postgres** - Most flexible, handles everything (recommended for most)
2. **MySQL** - Similar to Postgres
3. **MongoDB** - NoSQL, document-based (good for flexible schemas)
4. **No preference** - You recommend

Most projects should use Postgres. It's industry standard and handles relational data beautifully.
```

**Default**: Postgres

---

### Q3.2: Database Hosting

**Question:**
```markdown
Where should I host your database?

1. **Supabase** - Postgres + Auth + Storage + Realtime in one
2. **Neon** - Serverless Postgres, great developer experience
3. **Vercel Postgres** - Integrated with Vercel deployment
4. **Railway** - Simple, all-in-one platform
5. **No preference** - You recommend

I usually recommend Supabase for most projects (batteries included).
```

**Default**: Supabase (all-in-one solution)

---

### Q3.2b: Query Method (ALWAYS ASK)

**Question:**
```markdown
How do you want to query the database?

1. **Raw SQL** - Direct queries, full control (recommended)
2. **Supabase Client** - Easy API for simple queries
3. **Mix** - Supabase client for simple, raw SQL for complex

No ORM is required. Raw SQL is perfectly fine and often simpler.
```

**Default**: Mix (Supabase client + raw SQL when needed)

**🚨 IMPLEMENTATION NOTE:**

- ✅ Raw SQL or Supabase client - always works
- ⚪ Drizzle/Prisma - optional for TypeScript types only, NOT required
- ❌ NEVER say "you need an ORM" - you don't

---

### Q3.3: Frontend Framework

**Question:**
```markdown
Frontend preference?

1. **Next.js** - React framework, full-stack (most popular)
2. **React (Vite)** - Client-side only, simple
3. **Vue/Nuxt** - Alternative to React
4. **Svelte/SvelteKit** - Lightweight, fast
5. **No preference** - You recommend

Next.js is the industry standard for modern web apps. Strongly recommended.
```

**Default**: Next.js

---

### Q3.4: TypeScript

**Question:**
```markdown
TypeScript or JavaScript?

1. **TypeScript** - Type safety, better DX (strongly recommended)
2. **JavaScript** - Simpler, faster to write

TypeScript catches bugs early and makes refactoring safe. Worth the small learning curve.
```

**Default**: TypeScript

---

### Q3.5: Styling Approach

**Question:**
```markdown
How should I set up styling?

1. **Tailwind CSS** - Utility-first, modern (most popular)
2. **CSS Modules** - Scoped CSS
3. **Styled Components** - CSS-in-JS
4. **Plain CSS/SCSS** - Traditional
5. **No preference** - You recommend

Tailwind is the industry standard now. Fast, consistent, great DX.
```

**Default**: Tailwind CSS

---

### Q3.6: Component Library

**Question:**
```markdown
Want a component library for UI?

1. **Shadcn/ui** - Beautiful, customizable Tailwind components (recommended)
2. **MUI (Material UI)** - Google Material Design
3. **Chakra UI** - Simple, accessible components
4. **Headless UI** - Unstyled, full control
5. **None** - Build everything from scratch

Shadcn is the best choice right now - beautiful, you own the code, highly customizable.
```

**Default**: Shadcn/ui

---

### Q3.7: Deployment Platform

**Question:**
```markdown
Where do you want to deploy?

1. **Vercel** - Easiest, zero-config for Next.js (recommended)
2. **Netlify** - Alternative to Vercel
3. **Railway** - Full-stack platform
4. **AWS** - Maximum control, more complex
5. **DigitalOcean** - VPS, manual setup

Vercel is the gold standard for Next.js. Deploy in seconds.
```

**Default**: Vercel

---

### Q3.8: Environment Strategy

**Question:**
```markdown
How many environments do you need?

1. **Development + Production** - Simple (local dev + prod)
2. **Dev + Staging + Production** - Test before prod (recommended)
3. **Dev + Multiple Preview + Staging + Prod** - Full workflow

#2 is the sweet spot for most teams.
```

**Default**: Dev + Staging + Production

---

### Q3.9: CI/CD

**Question:**
```markdown
Want automated CI/CD?

**What this means:**
- Automatic linting and tests on every commit
- Preview deployments for pull requests
- Automatic production deploys from main branch

1. **Yes, full automation** - Best practice (recommended)
2. **Just automated tests** - Manual deploys
3. **No** - Keep it simple for now
```

**Default**: Yes, full automation

---

### Q3.10: Monitoring & Error Tracking

**Question:**
```markdown
Error tracking and monitoring?

1. **Sentry** - Error tracking (industry standard)
2. **LogRocket** - Session replay + errors
3. **Both** - Comprehensive monitoring
4. **None for now** - Add when needed
```

**Default**: Sentry

---

### Q3.11: Testing Strategy

**Question:**
```markdown
What testing do you want set up?

1. **Unit + Integration** - Test business logic
2. **E2E (Playwright)** - Test user flows
3. **All of the above** - Comprehensive testing
4. **None initially** - Add later

For MVPs, unit tests are usually enough to start.
```

**Default**: Unit + Integration

---

## 🎨 TIER 4: OPTIMIZATIONS & NICE-TO-HAVES (5-10 questions)

### Q4.1: Image Optimization

**Question:**
```markdown
Do you have lots of images to optimize?

1. **Yes** - Set up image CDN (Cloudinary, Imgix)
2. **Built-in Next.js** - Use Next.js Image optimization
3. **No special needs** - Standard images
```

**Default**: Built-in Next.js

---

### Q4.2: Email Templates

**Question:**
```markdown
Email template approach?

1. **React Email** - Build emails in React (modern, recommended)
2. **MJML** - Responsive email framework
3. **HTML templates** - Traditional
```

**Default**: React Email

---

### Q4.3: Documentation

**Question:**
```markdown
Generate documentation?

1. **Full docs** - Setup guide, architecture, API docs
2. **Basic README** - Just essentials
3. **Minimal** - Comments in code only
```

**Default**: Full docs

---

### Q4.4: Code Quality Tools

**Question:**
```markdown
Code quality tools?

1. **Full suite** - ESLint, Prettier, Husky (git hooks), lint-staged
2. **Basic** - Just ESLint and Prettier
3. **Minimal** - None
```

**Default**: Full suite

---

### Q4.5: Accessibility

**Question:**
```markdown
Accessibility priority?

1. **High** - WCAG 2.1 AA compliance, tested with screen readers
2. **Moderate** - Semantic HTML, keyboard nav, basic aria
3. **Basic** - Whatever comes with component library
```

**Default**: Moderate

---

### Q4.6: Internationalization (i18n)

**Question:**
```markdown
Multiple languages?

1. **Yes, from start** - Set up i18n framework
2. **Eventually** - Structure code for i18n, don't implement yet
3. **No** - English only
```

**Default**: No (add later if needed)

---

### Q4.7: Dark Mode

**Question:**
```markdown
Support dark mode?

1. **Yes** - Implement dark mode theme
2. **No** - Light mode only
3. **System preference** - Auto-detect user's OS setting
```

**Default**: System preference

---

### Q4.8: PWA Features

**Question:**
```markdown
Progressive Web App features?

1. **Yes** - Installable, offline support, push notifications
2. **Just installable** - Add to home screen
3. **No** - Standard web app
```

**Default**: No

---

### Q4.9: SEO Priority

**Question:**
```markdown
SEO importance?

1. **Critical** - Public content, needs to rank (set up sitemap, metadata, etc.)
2. **Moderate** - Basic SEO best practices
3. **Not important** - Behind login, internal tool
```

**Default**: Moderate

---

### Q4.10: Rate Limiting

**Question:**
```markdown
API rate limiting?

1. **Yes** - Prevent abuse (recommended for public APIs)
2. **No** - Trusted users only
```

**Default**: Yes

---

## 🔄 CONDITIONAL LOGIC SUMMARY

### Major Branches

```
Project Type → Determines Tier 2 Questions
   ├─ SaaS → Q2.1-Q2.19
   ├─ E-commerce → Q2.20-Q2.29
   ├─ Content → Q2.30-Q2.39
   ├─ Marketplace → Q2.40-Q2.49
   ├─ Internal Tool → Q2.50-Q2.59 (simplified SaaS)
   └─ API Platform → Q2.60-Q2.69 (backend-focused)

User Model → Affects Auth & Billing
   ├─ B2B → Multi-tenancy, org billing, SSO
   └─ B2C → Individual accounts, simpler auth

Payments → Triggers payment provider setup
   └─ If Yes → Stripe integration, subscription management

File Uploads → Storage provider
   └─ If Yes → S3/R2/Cloudinary, CDN

Real-time → WebSocket infrastructure
   └─ If Yes → Supabase Realtime or Socket.io
```

---

## 📊 QUESTION OPTIMIZATION

### Skip Logic

**Skip questions if:**
- Answer is implied by previous answer
  - Example: If "Portfolio site" → Skip auth questions
  - Example: If "Solo founder" → Skip team collaboration questions

**Batch related questions:**
- Group payment questions together
- Group infrastructure questions together
- Minimize context switching

### Smart Defaults

**Offer defaults based on:**
- Project type (SaaS → Postgres, auth, etc.)
- User experience level (Beginner → simpler stack)
- Timeline (Fast → fewer features)
- Budget signals (Free tier options vs enterprise)

---

## ✅ QUESTION QUALITY CHECKLIST

Every question should:

- [ ] Have clear, unambiguous options
- [ ] Include examples for context
- [ ] Explain why the answer matters
- [ ] Offer a smart default when possible
- [ ] Be skippable if not critical
- [ ] Lead to actionable technical decisions

---

**Total Bank**: 80 questions  
**Average Session**: 28 questions  
**Session Time**: 10-12 minutes  

**Next**: See `decision-trees.md` for branching logic diagrams and `conditional-logic.md` for implementation details.






