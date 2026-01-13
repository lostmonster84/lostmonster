# Project Spin-Up Agent - Quick Implementation Guides

> **Purpose**: Consolidated implementation guides for Milestones 2-5 components (Environment Config, Database, Auth, Deployment, Integrations)

---

## 🔐 ENVIRONMENT & SECRETS CONFIGURATION

### .env.example Template

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME={{PROJECT_NAME}}

# Database
{{#if DATABASE === 'postgres'}}
DATABASE_URL=postgresql://user:password@localhost:5432/{{PROJECT_SLUG}}
{{#if DATABASE_HOST === 'supabase'}}
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
{{/if}}
{{/if}}

# Authentication
{{#if AUTH_PROVIDER === 'clerk'}}
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx
{{else if AUTH_PROVIDER === 'supabase'}}
# Auth handled by Supabase (see DATABASE section)
{{/if}}

# Payments
{{#if HAS_PAYMENTS}}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
{{/if}}

# Email
{{#if HAS_EMAIL}}
RESEND_API_KEY=re_xxx
{{/if}}

# Analytics
{{#if HAS_ANALYTICS}}
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
{{/if}}

# Error Tracking
{{#if ERROR_TRACKING}}
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
{{/if}}
```

### Environment Validator

```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  {{#if AUTH_PROVIDER === 'clerk'}}
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  {{/if}}
  {{#if HAS_PAYMENTS}}
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  {{/if}}
});

export const env = envSchema.parse(process.env);
```

---

## 🗄️ DATABASE PROVISIONING & SCHEMA SETUP

### Supabase Setup Script

```typescript
// scripts/setup-supabase.ts
import { createClient } from '@supabase/supabase-js';

async function setupSupabase() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  // Create tables
  const { error } = await supabase.rpc('create_initial_schema');
  
  if (error) throw error;
  
  console.log('✅ Supabase schema created');
}
```

### Drizzle Migration Runner

```typescript
// lib/db/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function runMigrations() {
  const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(connection);
  
  await migrate(db, { migrationsFolder: './drizzle' });
  
  await connection.end();
  
  console.log('✅ Migrations complete');
}
```

---

## 🔑 AUTHENTICATION SETUP

### Clerk Setup

```typescript
// middleware.ts
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up'],
  ignoredRoutes: ['/api/webhooks/(.*)']
});

// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const payload = await req.json();
  const headersList = headers();
  
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(JSON.stringify(payload), {
    'svix-id': headersList.get('svix-id')!,
    'svix-timestamp': headersList.get('svix-timestamp')!,
    'svix-signature': headersList.get('svix-signature')!,
  });
  
  if (evt.type === 'user.created') {
    await db.users.create({ data: { clerkId: evt.data.id } });
  }
  
  return Response.json({ success: true });
}
```

---

## 🚀 HOSTING & DEPLOYMENT

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "CLERK_SECRET_KEY": "@clerk-secret"
  }
}
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI

on: [pull_request]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🔌 EXTERNAL SERVICE INTEGRATION

### Stripe Integration

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  switch (event.type) {
    case 'customer.subscription.created':
      await db.subscriptions.create({
        data: {
          stripeSubscriptionId: event.data.object.id,
          status: event.data.object.status,
        }
      });
      break;
  }
  
  return Response.json({ received: true });
}
```

### Resend Email Integration

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'onboarding@{{DOMAIN}}',
    to,
    subject: 'Welcome to {{PROJECT_NAME}}',
    html: `<h1>Welcome ${name}!</h1>`
  });
}
```

### PostHog Analytics

```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export { posthog };
```

---

## 📚 PROJECT DOCUMENTATION GENERATION

### README Template

```markdown
# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: {{STYLING}}
- **Database**: {{DATABASE}} ({{DATABASE_HOST}})
- **Auth**: {{AUTH_PROVIDER}}
{{#if HAS_PAYMENTS}}- **Payments**: Stripe{{/if}}
- **Hosting**: {{HOSTING}}

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment:
```bash
cp .env.example .env.local
```

3. Set up database:
```bash
npm run db:push
npm run db:seed
```

4. Start dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app          - Next.js app router
/components   - React components
/lib          - Utilities and configs
/types        - TypeScript types
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript check
- `npm run test` - Run tests

## Documentation

- [Architecture](./ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## License

{{LICENSE}}
```

---

## 🎯 AI CONTEXT FILES

### CLAUDE.md Template

```markdown
# AI Development Context for {{PROJECT_NAME}}

## Project Overview

**Type**: {{PROJECT_TYPE}}
**Stack**: {{TECH_STACK_SUMMARY}}
**Status**: {{DEVELOPMENT_STAGE}}

## Working With This Codebase

### Key Patterns

1. **Data Flow**:
{{#if HAS_MULTI_TENANCY}}
   - All queries filter by organizationId
   - Use `withOrg()` helper in database queries
{{else}}
   - User-specific data filtered by userId
{{/if}}

2. **Error Handling**:
   - API routes return standardized errors
   - Use `ApiError` class for errors
   - Sentry captures all errors

3. **Type Safety**:
   - Zod schemas for validation
   - Drizzle/Prisma for database types
   - API routes fully typed

### Common Commands

```bash
# Development
npm run dev

# Database
npm run db:studio  # Visual database editor
npm run db:push    # Push schema changes

# Testing
npm run test
npm run test:e2e
```

### Architecture Decisions

{{ARCHITECTURE_DECISIONS}}

## Don't Do This

- ❌ Don't query database without org/user filter
- ❌ Don't skip input validation
- ❌ Don't commit .env.local
- ❌ Don't use `any` type

## Current Priorities

{{CURRENT_PRIORITIES}}
```

---

## ✅ COMPLETE SETUP CHECKLIST

### Initial Setup (Developer)
- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Copy `.env.example` to `.env.local`
- [ ] Create Supabase/database account
- [ ] Add database credentials to `.env.local`
- [ ] Run migrations (`npm run db:push`)
- [ ] Seed database (`npm run db:seed`)
- [ ] Start dev server (`npm run dev`)
- [ ] Verify http://localhost:3000 works

### Authentication Setup
- [ ] Create Clerk/auth provider account
- [ ] Add API keys to `.env.local`
- [ ] Configure webhook endpoints
- [ ] Test signup/login flow
- [ ] Verify user sync to database

### Payment Setup (if applicable)
- [ ] Create Stripe account
- [ ] Add API keys to `.env.local`
- [ ] Configure webhook endpoint
- [ ] Create test products/prices
- [ ] Test checkout flow
- [ ] Verify webhooks working

### Deployment Setup
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Add environment variables
- [ ] Configure custom domain
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Set up monitoring (Sentry, PostHog)

---

**All implementation guides follow best practices and security standards for production deployment.**






