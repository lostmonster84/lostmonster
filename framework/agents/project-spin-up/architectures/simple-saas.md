# Architecture: Simple SaaS

> **When to Use**: B2C SaaS with individual user accounts, basic CRUD operations, subscription billing.

---

## 🎯 IDEAL FOR

- Individual productivity tools (like Notion for personal use)
- Content creation platforms
- Analytics dashboards
- Project management for individuals
- Note-taking apps
- Habit trackers
- Guest handbooks (like Stayflo)

**User Model**: B2C, individual accounts
**Complexity**: Low to Medium
**Team Size**: 1-3 developers
**Time to MVP**: 2-4 weeks

---

## 🏗️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
│                       (React/Next.js)                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      VERCEL EDGE NETWORK                         │
│                  (Hosting + CDN + Edge Functions)                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
┌──────────▼──────┐ ┌─────▼──────┐ ┌──────▼────────┐
│   SUPABASE      │ │   STRIPE   │ │   RESEND      │
│                 │ │            │ │               │
│ • Postgres DB   │ │ • Billing  │ │ • Emails      │
│ • Auth (Magic)  │ │ • Payments │ │               │
│ • Storage       │ │ • Invoices │ │               │
│ • Realtime      │ │            │ │               │
└─────────────────┘ └────────────┘ └───────────────┘
```

---

## 🛠️ COMPLETE TECH STACK

### **Frontend**
- **Framework**: Next.js (Latest - currently 15.x)
  - **Why**: Best-in-class React framework, excellent DX, SEO-ready
  - **Server Components**: Reduce client bundle size
  - **Client Components**: Interactive UI elements

- **Language**: TypeScript (Latest - currently 5.x, Strict mode)
  - **Why**: Catch bugs at compile time, better IDE support

- **Styling**: Tailwind CSS (Latest - currently 4.x)
  - **Why**: Fast development, consistent design system, small bundle

- **UI Components**: Shadcn/ui OR custom components
  - **Why**: Beautiful, accessible, you own the code, fully customizable
  - **Note**: Often we build custom - depends on project needs

- **State Management**: React Context (simple) or Zustand (complex)
  - **Why**: Simple for most use cases, Zustand for advanced needs

- **Forms**: React Hook Form + Zod
  - **Why**: Performant, type-safe validation

- **Animations**: Framer Motion (subtle only)
  - **Why**: Smooth, performant, great DX

---

### **Backend**

- **API**: Next.js API Routes (App Router)
  - **Why**: Same codebase as frontend, type-safe, easy deployment
  - **Location**: `/app/api/`

- **Validation**: Zod schemas
  - **Why**: Runtime validation + TypeScript types from same schema

---

### **Database**

- **Database**: PostgreSQL (via Supabase)
  - **Why**: Rock-solid relational DB, industry standard
  - **Hosting**: Supabase (managed) or Neon or Vercel Postgres

- **Query Method**: Supabase Client OR Raw SQL
  - **Why**: Simple, direct, no ORM overhead
  - **NO Drizzle/Prisma required** - use when needed, not by default
  - **Pattern**: Use Supabase client for simple queries, raw SQL for complex

- **Schema Definition** (Optional): Drizzle for types only
  - If you want TypeScript types from schema, use Drizzle schema files
  - But queries can still be raw SQL or Supabase client

- **Schema Design** (Example for simple SaaS):
  ```sql
  -- Users (handled by Supabase Auth OR custom)
  users (
    id uuid PK,
    email text UNIQUE NOT NULL,
    created_at timestamp DEFAULT now()
  )

  -- User profiles
  profiles (
    id uuid PK FK users(id),
    full_name text,
    avatar_url text,
    updated_at timestamp DEFAULT now()
  )

  -- Core business entities (example: tasks)
  tasks (
    id uuid PK DEFAULT gen_random_uuid(),
    user_id uuid FK users(id),
    title text NOT NULL,
    description text,
    status text CHECK(status IN ('todo', 'inprogress', 'done')),
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
  )

  -- Subscriptions
  subscriptions (
    id uuid PK DEFAULT gen_random_uuid(),
    user_id uuid FK users(id),
    stripe_subscription_id text UNIQUE,
    status text,
    plan_id text,
    current_period_end timestamp,
    cancel_at_period_end boolean DEFAULT false
  )
  ```

---

### **Authentication**

**TWO OPTIONS - Choose based on needs:**

#### Option A: Supabase Auth (Magic Links / OAuth)
- **When**: Consumer apps, magic link login, social auth
- **How**: Built-in Supabase Auth
- **Methods**:
  - Magic Links (passwordless) - recommended for consumer
  - Social Login: Google, GitHub, etc.
  - Email + Password (if needed)

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Usage
const supabase = createClient()
await supabase.auth.signInWithOtp({ email })
```

#### Option B: Custom Auth (bcrypt + cookies)
- **When**: Admin dashboards, internal tools, full control needed
- **How**: Build it yourself with bcrypt + session cookies
- **This is our preferred pattern for admin areas**

```typescript
// lib/admin/auth.ts
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function login(email: string, password: string) {
  // 1. Find user in database
  const user = await db.query(`SELECT * FROM admin_users WHERE email = $1`, [email]);
  if (!user) return null;

  // 2. Verify password
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  // 3. Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return user;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;

  return await db.query(`SELECT * FROM admin_users WHERE id = $1`, [session.value]);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
```

**NEVER use Clerk** - we build our own auth. It's simpler, cheaper, and we own the code.

---

### **Protected Routes**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

---

### **File Storage**

- **Provider**: Supabase Storage OR AWS S3
  - **Why**: Integrated, simple, works well for small-medium files

- **Use Cases**:
  - User avatars
  - User-uploaded documents
  - Attachments

- **CDN**: Built-in (Supabase) or CloudFront (S3)

---

### **Payments**

- **Provider**: Stripe
  - **Why**: Industry standard, handles complexity well

- **Integration**:
  - Stripe Checkout (hosted)
  - Customer Portal (for subscription management)
  - Webhooks (for subscription lifecycle)

- **Webhook Handler**: `/app/api/webhooks/stripe/route.ts`
  - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

---

### **Email**

- **Provider**: Resend
  - **Why**: Developer-friendly, great deliverability, generous free tier

- **Templates**: React Email
  - **Why**: Build emails in React, responsive out of the box

---

### **Monitoring & Analytics**

- **Error Tracking**: Sentry (optional)
- **Analytics**: PostHog or Vercel Analytics
- **Performance**: Vercel Analytics (built-in)

---

### **Hosting & Deployment**

- **Platform**: Vercel
  - **Why**: Zero-config for Next.js, best performance, great DX

- **Environments**:
  - **Production**: `main` branch
  - **Preview**: Automatic for every PR

---

### **Developer Tools**

- **Linting**: ESLint 9.x (flat config)
- **Formatting**: Prettier
- **Package Manager**: pnpm
- **Monorepo**: Turborepo (if multiple apps)

---

## 💰 COST BREAKDOWN

### **Free Tier (Good for 0-100 users)**

- Vercel: Free (Hobby plan)
- Supabase: Free (500MB DB, 1GB storage, 2GB bandwidth)
- Stripe: Free (2.9% + 30¢ per transaction)
- Resend: Free (100 emails/day)

**Total**: $0/month (+ transaction fees)

---

### **Growth Tier (1k-10k users)**

- Vercel: $20/month (Pro plan)
- Supabase: $25/month (Pro plan - 8GB DB, 100GB storage)
- Stripe: Transaction fees only
- Resend: $20/month (50k emails/month)

**Total**: ~$65/month (+ transaction fees)

---

## 📈 SCALING CHARACTERISTICS

### **What Scales Easily**

✅ **Users**: Vercel + Supabase handle 100k+ concurrent users
✅ **Database reads**: Supabase has connection pooling
✅ **Static content**: CDN handles this effortlessly
✅ **API requests**: Serverless functions scale automatically

### **What Needs Attention**

⚠️ **Database writes**: Postgres write performance ~10k writes/sec
⚠️ **Database size**: Free tier limit 500MB, growth costs increase
⚠️ **Long-running jobs**: Serverless functions have 10-60s timeout

---

## 🎯 KEY BENEFITS

✅ **Fast Development**: Working app in 2-4 weeks
✅ **Low Initial Cost**: $0 to start, ~$65/month at 5k users
✅ **Type Safety**: TypeScript + Zod = bulletproof types
✅ **No ORM Bloat**: Direct SQL or Supabase client
✅ **Own Your Auth**: Custom auth, no vendor lock-in
✅ **Modern Stack**: All tools are current best practices
✅ **Great DX**: Hot reload, great debugging, helpful errors

---

## ⚠️ TRADEOFFS & LIMITATIONS

### **Limitations**

❌ **Supabase free tier**: Database pauses after inactivity
❌ **Serverless constraints**: No WebSocket persistence, function timeouts
❌ **Single region**: Supabase free tier is single-region

### **When to Reconsider This Stack**

- **Complex background jobs**: Need long-running processes (>60s)
- **High write volume**: Need >10k database writes/second
- **Multi-region requirements**: Users globally need <100ms latency

---

## 📚 FILE STRUCTURE

```
my-saas/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Protected layout
│   │   ├── page.tsx            # Dashboard home
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/route.ts
│   │   └── webhooks/
│   │       └── stripe/route.ts
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Shared components
│   ├── auth/                   # Auth components
│   ├── dashboard/              # Dashboard components
│   └── Header.tsx              # Navigation
│   └── Footer.tsx              # Footer
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   ├── auth.ts                 # Auth utilities
│   ├── stripe.ts               # Stripe utilities
│   └── utils.ts                # Shared utilities
├── middleware.ts               # Auth middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚨 CRITICAL REMINDERS

1. **NO CLERK** - Build custom auth or use Supabase Auth
2. **NO ORM REQUIRED** - Use Supabase client or raw SQL
3. **LATEST VERSIONS ALWAYS** - Next.js 15+, React 19+, TypeScript 5.9+
4. **HEADER & FOOTER FIRST** - Before any pages
5. **MOBILE-FIRST** - Responsive from the start

---

**This architecture is battle-tested, cost-effective, and will get you to market fast.** Perfect for indie hackers, small teams, and anyone building a B2C SaaS MVP.




