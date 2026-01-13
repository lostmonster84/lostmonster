# Stayflo - Project Configuration

> **Project-specific technical rules and context**
>
> This file is part of the AI Framework v2.1

---

## Project Overview

**Name**: Stayflo
**Type**: B2B SaaS
**Domain**: Hospitality / Guest Experience
**Stage**: Pre-MVP

**One-liner**: The easiest way to create beautiful, AI-powered guest handbooks.

**Target Users**:
1. Short-term rental hosts (Airbnb, VRBO)
2. Boutique hotels & B&Bs
3. Property management companies

---

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 15 | App Router, Server Components |
| Language | TypeScript | Strict mode enabled |
| Styling | Tailwind CSS | + shadcn/ui components |
| Animation | Framer Motion | Subtle, purposeful only |
| Database | PostgreSQL | Via Supabase |
| Auth | Clerk | Organizations for multi-tenant |
| AI | OpenAI/Anthropic | Content generation + concierge |
| Payments | Stripe | Subscriptions, metered billing |
| Hosting | Vercel | Preview deploys, edge functions |
| Analytics | PostHog | Product analytics, feature flags |
| Email | Resend | Transactional emails |

---

## Project Structure

```
stayflo/
├── CLAUDE.md                   # AI instructions entry point
├── PRD.md                      # Product Requirements Document
├── PRO.md                      # Product Roadmap & Objectives
├── .ai/                        # AI framework
│   ├── README.md
│   ├── core/                   # Universal principles
│   ├── frameworks/             # Planning methodologies
│   ├── project/                # This folder - project specifics
│   └── templates/              # Reusable templates
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Public marketing pages
│   │   ├── (dashboard)/        # Authenticated host area
│   │   ├── (handbook)/         # Public guest handbooks
│   │   └── api/                # API routes
│   ├── components/             # React components
│   ├── lib/                    # Utilities, configs
│   ├── hooks/                  # Custom hooks
│   └── types/                  # TypeScript types
├── prisma/                     # Database schema (if using Prisma)
└── public/                     # Static assets
```

---

## Data Model (Core Entities)

### User
- id, email, name
- clerkId (external auth)
- createdAt, updatedAt

### Organization (Workspace)
- id, name, slug
- plan (free, host, pro, portfolio)
- stripeCustomerId

### Property
- id, organizationId
- name, slug, address
- timezone, locale
- settings (JSON)

### Handbook
- id, propertyId
- status (draft, published)
- templateId (optional)
- settings (branding, etc.)

### Section
- id, handbookId
- type (welcome, wifi, property, local, rules, emergency, custom)
- title, content (rich text)
- order, isVisible
- images[]

### AIQuery (for analytics)
- id, handbookId
- question, answer
- wasHelpful (boolean, optional)
- createdAt

---

## API Design

### Public (Guest-Facing)
```
GET /h/[slug]              → Handbook data
POST /h/[slug]/ai          → AI Concierge query
```

### Dashboard (Host-Facing)
```
GET /api/properties
POST /api/properties
GET /api/properties/[id]
PUT /api/properties/[id]
DELETE /api/properties/[id]

GET /api/properties/[id]/handbook
PUT /api/properties/[id]/handbook
POST /api/properties/[id]/handbook/publish

GET /api/properties/[id]/handbook/sections
POST /api/properties/[id]/handbook/sections
PUT /api/properties/[id]/handbook/sections/[sectionId]
DELETE /api/properties/[id]/handbook/sections/[sectionId]
POST /api/properties/[id]/handbook/sections/reorder

POST /api/ai/generate-section
POST /api/ai/generate-handbook
```

---

## Environment Variables

```bash
# Database
DATABASE_URL=

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# AI
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Payments (Stripe)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
POSTHOG_HOST=

# Email
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed development data

# Testing
npm run test             # Run tests
npm run test:e2e         # Run E2E tests

# Linting
npm run lint             # ESLint
npm run format           # Prettier
npm run typecheck        # TypeScript check
```

---

## Code Conventions

### TypeScript
- Strict mode enabled
- Prefer interfaces over types for objects
- Export types from `src/types/`
- Use Zod for runtime validation

### React
- Prefer Server Components (default in App Router)
- Use 'use client' only when necessary
- Colocate components with their routes when specific
- Shared components in `src/components/`

### Styling
- Tailwind utility classes
- shadcn/ui as component base
- CSS variables for theming
- Mobile-first responsive design

### Naming
- Components: PascalCase
- Files: kebab-case (except components)
- Variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Handbook LCP | < 2.0s |
| Dashboard LCP | < 2.5s |
| AI response time | < 3.0s |
| Lighthouse score | > 90 |
| Bundle size (initial) | < 100KB |

---

## Security Checklist

- [ ] All user input sanitized
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (React default + CSP)
- [ ] CSRF protection enabled
- [ ] Rate limiting on AI endpoints
- [ ] Tenant isolation enforced
- [ ] Secrets not in client bundle
- [ ] HTTPS enforced

---

## Third-Party Integrations (Planned)

### Year 1
- Stripe (payments)
- OpenAI/Anthropic (AI)
- Resend (email)
- PostHog (analytics)

### Year 2+
- Hostaway (PMS)
- Guesty (PMS)
- Lodgify (PMS)
- Google Places (local recommendations)

---

## Feature Flags

Using PostHog for feature flags:

```typescript
// Usage
import { useFeatureFlag } from '@/hooks/useFeatureFlag'

const showAIConcierge = useFeatureFlag('ai-concierge')
```

Flags planned:
- `ai-concierge` - Guest AI chat
- `advanced-analytics` - Detailed usage stats
- `custom-domain` - Custom handbook domains
- `api-access` - Public API access

---

## Monitoring & Observability

- **Errors**: Vercel built-in + Sentry (later)
- **Analytics**: PostHog
- **Uptime**: Vercel checks + BetterUptime (later)
- **AI Costs**: Custom logging to database

---

## Deployment

### Environments
- **Production**: stayflo.io (main branch)
- **Staging**: staging.stayflo.io (staging branch)
- **Preview**: Auto-deploy on PR

### CI/CD
- Vercel automatic deploys
- TypeScript check on PR
- Lint check on PR
- Tests on PR (when written)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI instructions entry point |
| `PRD.md` | Product requirements |
| `PRO.md` | Roadmap and objectives |
| `.ai/project/PROJECT.md` | This file |
| `.ai/project/DESIGN-LANGUAGE.md` | Visual identity |
| `src/lib/ai/prompts.ts` | AI prompt templates |
| `src/lib/stripe/` | Billing logic |
| `prisma/schema.prisma` | Database schema |

---

**Last Updated**: January 2025
