# Project Spin-Up Agent - Template Library

> **Purpose**: Comprehensive template system with variable substitution, conditional blocks, and production-ready code generation.

---

## 📚 TEMPLATE CATEGORIES

### 1. Infrastructure Configuration (10 templates)
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind setup
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variables
- `.gitignore` - Git ignore rules
- `vercel.json` - Vercel deployment config
- `netlify.toml` - Netlify deployment config

### 2. Database Schema (15 templates)
- Drizzle schema files
- Prisma schema files
- Supabase migrations
- Seed data scripts
- Database utilities
- Type generation configs

### 3. Authentication (12 templates)
- Clerk setup and components
- Supabase auth configuration
- NextAuth configuration
- Auth middleware
- Protected route patterns
- Login/signup pages
- User profile components

### 4. API Routes (20 templates)
- CRUD operation patterns
- Webhook handlers (Stripe, Clerk, etc.)
- Error handling middleware
- Validation schemas (Zod)
- Rate limiting
- API documentation generators

### 5. Frontend Components (25 templates)
- Layout components
- Dashboard shell
- Forms with validation
- Data tables
- Modal dialogs
- Navigation components
- Auth UI components

### 6. Infrastructure as Code (8 templates)
- GitHub Actions workflows
- Docker files
- Terraform/Pulumi configs
- Database migration scripts
- Deployment scripts

### 7. Documentation (10 templates)
- README.md
- ARCHITECTURE.md
- API.md
- CONTRIBUTING.md
- CHANGELOG.md
- HANDOFF-SUMMARY.md
- AI context files (CLAUDE.md, PROJECT.md, etc.)

### 8. Testing (10 templates)
- Unit test examples
- Integration test setups
- E2E test scenarios
- Test utilities
- Mock data generators

**Total Templates**: 100+ files

---

## 🔧 VARIABLE SYSTEM

### Variable Types

```typescript
enum VariableType {
  STRING = "string",           // Simple text replacement
  BOOLEAN = "boolean",         // Conditional rendering
  ARRAY = "array",            // Loop rendering
  OBJECT = "object",          // Nested data
  COMPUTED = "computed"       // Derived from other variables
}

interface Variable {
  key: string;
  type: VariableType;
  required: boolean;
  default?: any;
  validator?: (value: any) => boolean;
  transformer?: (value: any) => any;
}
```

### Standard Variables

#### Project-Level
```typescript
{
  PROJECT_NAME: "my-saas",
  PROJECT_DESCRIPTION: "A tool for X",
  PROJECT_SLUG: "my-saas",
  AUTHOR_NAME: "John Doe",
  AUTHOR_EMAIL: "john@example.com",
  GITHUB_USERNAME: "johndoe",
  REPOSITORY_URL: "https://github.com/johndoe/my-saas"
}
```

#### Tech Stack
```typescript
{
  FRONTEND_FRAMEWORK: "nextjs",
  LANGUAGE: "typescript",
  STYLING: "tailwind",
  COMPONENT_LIBRARY: "shadcn",
  DATABASE: "postgres",
  DATABASE_HOST: "supabase",
  ORM: "drizzle",
  AUTH_PROVIDER: "clerk",
  STORAGE_PROVIDER: "supabase",
  PAYMENT_PROVIDER: "stripe",
  EMAIL_PROVIDER: "resend",
  HOSTING: "vercel",
  ANALYTICS: "posthog",
  ERROR_TRACKING: "sentry"
}
```

#### Feature Flags
```typescript
{
  HAS_AUTH: true,
  HAS_MULTI_TENANCY: false,
  HAS_PAYMENTS: true,
  HAS_FILE_UPLOAD: false,
  HAS_REALTIME: false,
  HAS_SEARCH: false,
  HAS_EMAIL: true,
  HAS_ANALYTICS: true,
  HAS_ADMIN: true,
  HAS_API_DOCS: true
}
```

#### Database Schema
```typescript
{
  TABLES: [
    {
      name: "users",
      columns: [...],
      relationships: [...]
    },
    {
      name: "projects",
      columns: [...],
      relationships: [...]
    }
  ]
}
```

#### URLs and Domains
```typescript
{
  DOMAIN: "myapp.com",
  API_URL: "https://api.myapp.com",
  CDN_URL: "https://cdn.myapp.com",
  APP_URL: "https://app.myapp.com"
}
```

---

## 🎨 TEMPLATE SYNTAX

### Basic Variable Substitution

```typescript
// Template
const greeting = "Hello, {{USER_NAME}}!";

// Context
{ USER_NAME: "Alice" }

// Output
"Hello, Alice!"
```

### Conditional Blocks

```handlebars
{{#if HAS_PAYMENTS}}
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
{{/if}}

{{#unless HAS_AUTH}}
// No authentication required for this project
export const publicRoutes = ['/'];
{{/unless}}
```

### Loops

```handlebars
// Generate imports for each table
{{#each TABLES}}
import { {{name}}Table } from './schema/{{name}}';
{{/each}}

// Generate API routes
{{#each ENDPOINTS}}
export async function {{method}}(req: Request) {
  // {{description}}
  {{implementation}}
}
{{/each}}
```

### Nested Conditionals

```handlebars
{{#if HAS_AUTH}}
  {{#if AUTH_PROVIDER === 'clerk'}}
    import { auth } from '@clerk/nextjs';
  {{else if AUTH_PROVIDER === 'supabase'}}
    import { createServerClient } from '@supabase/ssr';
  {{else}}
    import { getServerSession } from 'next-auth';
  {{/if}}
{{/if}}
```

### Computed Variables

```handlebars
// AUTO_COMPUTED based on other vars
{{#if HAS_MULTI_TENANCY}}
const ORG_REQUIRED = true;
{{else}}
const ORG_REQUIRED = false;
{{/if}}
```

---

## 📄 TEMPLATE EXAMPLES

### Example 1: package.json Template

```json
{
  "name": "{{PROJECT_SLUG}}",
  "version": "0.1.0",
  "private": true,
  "description": "{{PROJECT_DESCRIPTION}}",
  "author": "{{AUTHOR_NAME}} <{{AUTHOR_EMAIL}}>",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    {{#if ORM === 'drizzle'}}
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "db:generate": "drizzle-kit generate:pg",
    {{else if ORM === 'prisma'}}
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    {{/if}}
    {{#if HAS_TESTS}}
    "test": "vitest run",
    "test:watch": "vitest watch",
    "test:ui": "vitest --ui",
    {{/if}}
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    {{#if LANGUAGE === 'typescript'}}
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    {{/if}}
    {{#if STYLING === 'tailwind'}}
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    {{/if}}
    {{#if AUTH_PROVIDER === 'clerk'}}
    "@clerk/nextjs": "^4.29.0",
    {{else if AUTH_PROVIDER === 'supabase'}}
    "@supabase/ssr": "^0.0.10",
    "@supabase/supabase-js": "^2.39.0",
    {{/if}}
    {{#if HAS_PAYMENTS}}
    "stripe": "^14.14.0",
    {{/if}}
    {{#if ORM === 'drizzle'}}
    "drizzle-orm": "^0.29.0",
    {{else if ORM === 'prisma'}}
    "@prisma/client": "^5.8.0",
    {{/if}}
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0",
    "prettier": "^3.2.0",
    {{#if ORM === 'drizzle'}}
    "drizzle-kit": "^0.20.0",
    {{else if ORM === 'prisma'}}
    "prisma": "^5.8.0",
    {{/if}}
    {{#if HAS_TESTS}}
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.0",
    {{/if}}
    "@types/node": "^20.0.0"
  }
}
```

---

### Example 2: Drizzle Schema Template

```typescript
// {{FILE: lib/db/schema.ts}}

import { pgTable, uuid, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  {{#if AUTH_PROVIDER === 'clerk'}}
  clerkId: text('clerk_id').unique().notNull(),
  {{else if AUTH_PROVIDER === 'supabase'}}
  // Supabase handles users in auth.users
  {{/if}}
  email: text('email').unique().notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

{{#if HAS_MULTI_TENANCY}}
// Organizations table
export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  {{#if HAS_PAYMENTS}}
  stripeCustomerId: text('stripe_customer_id').unique(),
  {{/if}}
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Organization members
export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').notNull(), // 'owner', 'admin', 'member', 'viewer'
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});
{{/if}}

{{#each CUSTOM_TABLES}}
// {{name}} table
export const {{name}} = pgTable('{{snake_case name}}', {
  id: uuid('id').defaultRandom().primaryKey(),
  {{#if ../HAS_MULTI_TENANCY}}
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  {{else}}
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  {{/if}}
  {{#each columns}}
  {{column_name}}: {{column_type}}('{{column_name}}'){{#if not_null}}.notNull(){{/if}},
  {{/each}}
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
{{/each}}

{{#if HAS_PAYMENTS}}
// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  {{#if HAS_MULTI_TENANCY}}
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  {{else}}
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  {{/if}}
  stripeSubscriptionId: text('stripe_subscription_id').unique().notNull(),
  stripePriceId: text('stripe_price_id').notNull(),
  status: text('status').notNull(), // 'active', 'canceled', 'past_due', etc.
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
{{/if}}
```

---

### Example 3: API Route Template

```typescript
// {{FILE: app/api/{{RESOURCE}}/route.ts}}

import { NextRequest, NextResponse } from 'next/server';
{{#if HAS_AUTH}}
{{#if AUTH_PROVIDER === 'clerk'}}
import { auth } from '@clerk/nextjs';
{{else if AUTH_PROVIDER === 'supabase'}}
import { createServerClient } from '@/lib/supabase/server';
{{/if}}
{{/if}}
import { db } from '@/lib/db';
import { {{RESOURCE}}Table } from '@/lib/db/schema';
import { {{RESOURCE}}Schema } from '@/lib/validations/{{RESOURCE}}';
import { eq } from 'drizzle-orm';

{{#if HAS_AUTH}}
async function getUser(req: NextRequest) {
  {{#if AUTH_PROVIDER === 'clerk'}}
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  return userId;
  {{else if AUTH_PROVIDER === 'supabase'}}
  const supabase = createServerClient(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user.id;
  {{/if}}
}
{{/if}}

// GET /api/{{RESOURCE}}
export async function GET(req: NextRequest) {
  try {
    {{#if HAS_AUTH}}
    const userId = await getUser(req);
    {{/if}}
    
    {{#if HAS_MULTI_TENANCY}}
    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get('organizationId');
    
    if (!organizationId) {
      return NextResponse.json(
        { error: 'organizationId required' },
        { status: 400 }
      );
    }
    
    const items = await db
      .select()
      .from({{RESOURCE}}Table)
      .where(eq({{RESOURCE}}Table.organizationId, organizationId));
    {{else}}
    const items = await db
      .select()
      .from({{RESOURCE}}Table)
      {{#if HAS_AUTH}}
      .where(eq({{RESOURCE}}Table.userId, userId));
      {{else}}
      ;
      {{/if}}
    {{/if}}
    
    return NextResponse.json({ data: items });
  } catch (error) {
    console.error('[{{RESOURCE}}_GET]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/{{RESOURCE}}
export async function POST(req: NextRequest) {
  try {
    {{#if HAS_AUTH}}
    const userId = await getUser(req);
    {{/if}}
    
    const body = await req.json();
    const validated = {{RESOURCE}}Schema.parse(body);
    
    const [newItem] = await db
      .insert({{RESOURCE}}Table)
      .values({
        ...validated,
        {{#if HAS_AUTH}}
        userId,
        {{/if}}
        {{#if HAS_MULTI_TENANCY}}
        organizationId: validated.organizationId,
        {{/if}}
      })
      .returning();
    
    return NextResponse.json({ data: newItem }, { status: 201 });
  } catch (error) {
    console.error('[{{RESOURCE}}_POST]', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

---

## 🎯 TEMPLATE RENDERING ENGINE

```typescript
interface TemplateContext {
  variables: Record<string, any>;
  partials: Record<string, string>;
  helpers: Record<string, Function>;
}

class TemplateRenderer {
  private handlebars: typeof Handlebars;
  
  constructor() {
    this.handlebars = Handlebars.create();
    this.registerHelpers();
  }
  
  registerHelpers() {
    // String transformations
    this.handlebars.registerHelper('snake_case', (str: string) => {
      return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    });
    
    this.handlebars.registerHelper('kebab_case', (str: string) => {
      return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    });
    
    this.handlebars.registerHelper('pascal_case', (str: string) => {
      return str.replace(/(^\w|-\w)/g, letter => letter.replace(/-/, '').toUpperCase());
    });
    
    this.handlebars.registerHelper('camel_case', (str: string) => {
      const pascal = str.replace(/(^\w|-\w)/g, letter => letter.replace(/-/, '').toUpperCase());
      return pascal.charAt(0).toLowerCase() + pascal.slice(1);
    });
    
    // Comparisons
    this.handlebars.registerHelper('eq', (a, b) => a === b);
    this.handlebars.registerHelper('ne', (a, b) => a !== b);
    this.handlebars.registerHelper('includes', (arr, item) => arr.includes(item));
    
    // Array operations
    this.handlebars.registerHelper('length', (arr) => arr.length);
    this.handlebars.registerHelper('first', (arr) => arr[0]);
    this.handlebars.registerHelper('last', (arr) => arr[arr.length - 1]);
  }
  
  render(template: string, context: TemplateContext): string {
    const compiled = this.handlebars.compile(template);
    return compiled(context.variables);
  }
  
  renderFile(templatePath: string, context: TemplateContext): string {
    const template = fs.readFileSync(templatePath, 'utf-8');
    return this.render(template, context);
  }
}
```

---

## 📦 TEMPLATE ORGANIZATION

```
templates/
├── base/                           # Base configs
│   ├── next.config.js.hbs
│   ├── tsconfig.json.hbs
│   ├── tailwind.config.ts.hbs
│   ├── package.json.hbs
│   └── .env.example.hbs
│
├── database/                       # Database templates
│   ├── drizzle/
│   │   ├── schema.ts.hbs
│   │   ├── client.ts.hbs
│   │   └── migrate.ts.hbs
│   ├── prisma/
│   │   ├── schema.prisma.hbs
│   │   └── client.ts.hbs
│   └── supabase/
│       └── migrations/
│
├── auth/                           # Auth templates
│   ├── clerk/
│   ├── supabase/
│   └── nextauth/
│
├── api/                            # API route templates
│   ├── crud-route.ts.hbs
│   ├── webhook-handler.ts.hbs
│   └── middleware.ts.hbs
│
├── components/                     # Component templates
│   ├── layouts/
│   ├── forms/
│   ├── tables/
│   └── auth/
│
├── iac/                           # Infrastructure
│   ├── github-actions/
│   ├── vercel/
│   └── docker/
│
└── docs/                          # Documentation
    ├── README.md.hbs
    ├── ARCHITECTURE.md.hbs
    └── API.md.hbs
```

---

## ✅ TEMPLATE QUALITY CHECKLIST

Every template must:

- [ ] Be production-ready code
- [ ] Follow best practices for the technology
- [ ] Be fully type-safe (if TypeScript)
- [ ] Pass linting with no warnings
- [ ] Include proper error handling
- [ ] Have clear comments
- [ ] Be tested with multiple variable combinations
- [ ] Handle edge cases
- [ ] Be maintainable and readable
- [ ] Include proper imports

---

**This template system enables generating 50-150 production-ready files in minutes.**






