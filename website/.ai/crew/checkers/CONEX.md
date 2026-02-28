# CONEX — Database Connection Framework — Lost Monster Edition

> **Purpose:** Connect Lost Monster features to Neon PostgreSQL with type-safe, production-ready patterns.
> **Usage:** Say "CONEX: [feature]" to generate database connection layer.
> **Database:** Neon PostgreSQL with Prisma ORM

---

## Lost Monster Context

**CONEX for Lost Monster** understands:
- **Neon PostgreSQL** with **Prisma** ORM as the database layer
- **No auth** — marketing site, no user sessions or login (yet)
- **Single Next.js app** — `app/` directory, `app/api/` for API routes, `lib/` for shared code
- **Tables:** projects, services, testimonials, contacts
- **snake_case** in database, **camelCase** in TypeScript (Prisma handles mapping)
- **No monorepo** — everything lives in the website root

---

## When to Use CONEX

### Use CONEX When

- Adding a new feature that needs database storage
- Connecting frontend to database via API routes
- Adding new tables to Lost Monster schema
- Need type-safe database queries

### CONEX vs CRUDX

| Framework | Purpose | When to Use |
|-----------|---------|-------------|
| **CONEX** | Database connection layer | Connecting features to database |
| **CRUDX** | Full admin UI + API | Building complete management systems |

**CONEX** = Database layer only
**CRUDX** = Database + API + Admin UI (uses CONEX patterns internally)

---

## The Lost Monster CONEX Stack

### 5 Layers (Bottom to Top)

```
+---------------------------------------------+
|  5. QUERIES      Prisma client queries       |
+---------------------------------------------+
|  4. TYPES        Prisma generated types      |
+---------------------------------------------+
|  3. MIGRATIONS   Prisma migrations           |
+---------------------------------------------+
|  2. SCHEMA       Prisma schema models        |
+---------------------------------------------+
|  1. CONNECTION   Prisma client setup         |
+---------------------------------------------+
```

---

## Layer 1: Connection (Prisma Client)

### Database Client

**Location:** `lib/prisma.ts`

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Usage in API routes:**

```typescript
import { prisma } from '@/lib/prisma'

// Fetch all published projects
const projects = await prisma.project.findMany({
  where: { status: 'published' },
  orderBy: { displayOrder: 'asc' },
})
```

**Note:** Lost Monster has no auth layer yet. All API routes are public. When auth is added, middleware and session checks will go here.

---

## Layer 2: Schema (Prisma Models)

### Lost Monster Schema

**Location:** `prisma/schema.prisma`

#### projects Model

```prisma
model Project {
  id           String   @id @default(uuid())
  slug         String   @unique
  title        String
  description  String
  projectType  String   @map("project_type")
  category     String
  imageUrl     String?  @map("image_url")
  liveUrl      String?  @map("live_url")
  techStack    String[] @map("tech_stack")
  featured     Boolean  @default(false)
  status       String   @default("published")
  displayOrder Int      @default(0) @map("display_order")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("projects")
}
```

#### services Model

```prisma
model Service {
  id           String   @id @default(uuid())
  slug         String   @unique
  title        String
  description  String
  icon         String?
  features     String[]
  price        String?
  featured     Boolean  @default(false)
  status       String   @default("active")
  displayOrder Int      @default(0) @map("display_order")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("services")
}
```

#### testimonials Model

```prisma
model Testimonial {
  id           String   @id @default(uuid())
  name         String
  company      String?
  role         String?
  quote        String
  rating       Int      @default(5)
  featured     Boolean  @default(false)
  status       String   @default("published")
  displayOrder Int      @default(0) @map("display_order")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("testimonials")
}
```

#### contacts Model

```prisma
model Contact {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String?
  message   String
  status    String   @default("new")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("contacts")
}
```

---

## Layer 3: Migrations

### Lost Monster Migration Structure

```
prisma/
  migrations/
    20260101000000_initial_schema/
      migration.sql
    20260115000000_add_testimonials/
      migration.sql
    20260201000000_add_contacts/
      migration.sql
```

### Running Migrations

```bash
# Generate migration from schema changes
npx prisma migrate dev --name descriptive_name

# Apply migrations to production (Neon)
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# Generate Prisma client after schema changes
npx prisma generate
```

---

## Layer 4: Types

### Lost Monster Type Definitions

Prisma generates types automatically from the schema. Import them directly:

```typescript
import type { Project, Service, Testimonial, Contact } from '@prisma/client'

// Use generated types
function renderProject(project: Project) {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  )
}
```

### Custom Types (for API responses, filters, etc.)

**Location:** `lib/types/`

```typescript
// lib/types/project.ts

import type { Project } from '@prisma/client'

export type ProjectCategory = 'website' | 'webapp' | 'saas' | 'ecommerce' | 'mobile'
export type ProjectStatus = 'draft' | 'published' | 'archived'

export interface ProjectFilters {
  category?: ProjectCategory
  projectType?: string
  featured?: boolean
  status?: ProjectStatus
}

export interface ProjectWithMeta extends Project {
  // Computed fields, relations, etc.
}
```

---

## Layer 5: Queries

### Lost Monster Query Patterns

**Location:** API routes at `app/api/` and server components in `app/`

```typescript
// Example: Fetching projects with filters using Prisma

import { prisma } from '@/lib/prisma'
import type { ProjectFilters } from '@/lib/types/project'

export async function getProjects(filters: ProjectFilters = {}) {
  return prisma.project.findMany({
    where: {
      status: 'published',
      ...(filters.category && { category: filters.category }),
      ...(filters.projectType && { projectType: filters.projectType }),
      ...(filters.featured !== undefined && { featured: filters.featured }),
    },
    orderBy: { displayOrder: 'asc' },
  })
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  })
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: {
      status: 'published',
      featured: true,
    },
    orderBy: { displayOrder: 'asc' },
    take: 6,
  })
}
```

### Contact Form Submission

```typescript
// app/api/contact/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const contact = await prisma.contact.create({
    data: parsed.data,
  })

  return NextResponse.json({ contact }, { status: 201 })
}
```

### Server Component Data Fetching

```typescript
// app/page.tsx (or any server component)

import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    prisma.project.findMany({
      where: { status: 'published', featured: true },
      orderBy: { displayOrder: 'asc' },
      take: 4,
    }),
    prisma.testimonial.findMany({
      where: { status: 'published', featured: true },
      orderBy: { displayOrder: 'asc' },
      take: 3,
    }),
  ])

  return (
    // Render with data
  )
}
```

---

## Lost Monster Access Control Patterns

Lost Monster is currently a **public marketing site** with no authentication. All data access is read-only for public visitors, with one exception: contact form submissions.

### Public Read Access

All published content is publicly readable:

```typescript
// Pattern: Public read — no auth check needed
export async function GET() {
  const projects = await prisma.project.findMany({
    where: { status: 'published' },
    orderBy: { displayOrder: 'asc' },
  })
  return NextResponse.json({ projects })
}
```

### Public Create (Contact Form)

The contact form creates entries without authentication:

```typescript
// Pattern: Public create — validated with Zod, no auth check
export async function POST(request: Request) {
  const body = await request.json()
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

  const contact = await prisma.contact.create({ data: parsed.data })
  return NextResponse.json({ contact }, { status: 201 })
}
```

### Future: Admin Access

When an admin dashboard is added, protected routes will use middleware:

```typescript
// Future pattern — not implemented yet
import { requireAuth } from '@/lib/auth'

export async function PUT(request: Request) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Admin-only operations
}
```

---

## Lost Monster CONEX Checklist

When adding a new Lost Monster feature:

- [ ] **Schema:** Prisma model added to `prisma/schema.prisma`
- [ ] **Migration:** `npx prisma migrate dev --name descriptive_name`
- [ ] **Types:** Prisma generates types automatically (run `npx prisma generate`)
- [ ] **Custom types:** Add to `lib/types/` if needed (filters, API response shapes)
- [ ] **Queries:** Prisma queries in API routes (`app/api/`) or server components
- [ ] **Validation:** Zod schema for any POST/PUT endpoints
- [ ] **Indexes:** Add `@@index` in Prisma schema for frequently queried fields

### Lost Monster Index Guidelines

```prisma
// In schema.prisma — add to models as needed

model Project {
  // ... fields ...

  @@index([status])
  @@index([category])
  @@index([featured])
  @@map("projects")
}

model Contact {
  // ... fields ...

  @@index([status])
  @@index([createdAt])
  @@map("contacts")
}
```

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CRUDX** | Uses CONEX patterns for database layer |
| **PLANX** | Plan database schema before implementing CONEX |
| **MAPX** | CONEX documents table relationships |
| **AUDIX** | Verifies database connectivity and table existence |

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 2.0 (Lost Monster Edition)
