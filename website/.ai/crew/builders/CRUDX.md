# CRUDX Framework -- Lost Monster Edition

> **CRUD eXtended - Full-Stack Content Management System**
>
> Automatic trigger for complete backend + frontend CRUD systems.
> Optimized for personal brand development agency: projects, services, testimonials, contacts.

---

## Lost Monster Context

**CRUDX for Lost Monster** understands:
- **projects** - Core content items (portfolio work)
- **services** - Service offerings
- **testimonials** - Client reviews and feedback
- **contacts** - Enquiry contacts
- **Single Next.js app** - `app/` for pages, `app/api/` for API routes
- **Neon PostgreSQL** via **Prisma** ORM
- **Vercel** hosting

---

## When to Use CRUDX

### Automatic Triggers for Lost Monster

**Use CRUDX when:**
- Adding new projects management features
- Building contacts inbox functionality
- Managing services content
- Managing testimonials
- Any content that needs to be dynamic

**Don't use CRUDX when:**
- Hardcoded static content (about page text)
- One-time style changes
- Bug fixes
- Design token updates

### Explicit Trigger

User says: **"CRUDX: projects"** -> Build complete system for projects

---

## The CRUDX Stack (Lost Monster)

### Layer 1: Database Schema (Neon PostgreSQL via Prisma)

**Location:** `prisma/schema.prisma`

#### projects Table

```prisma
// prisma/schema.prisma

model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String

  // Type
  category    String   // e.g. 'web-app', 'saas', 'automation'
  serviceType String   @map("service_type") // e.g. 'build', 'consult', 'maintain'

  // Details
  client      String?
  url         String?
  featured    Boolean  @default(false)
  displayOrder Int     @default(0) @map("display_order")

  // Status
  status      String   @default("active") // draft, active, archived

  // Timestamps
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  testimonials Testimonial[]
  contacts     Contact[]

  @@index([slug])
  @@index([status])
  @@index([category])
  @@map("projects")
}
```

#### contacts Table

```prisma
model Contact {
  id        String   @id @default(cuid())

  // Contact info
  name      String
  email     String
  phone     String?
  message   String?

  // Relationship
  projectId String?  @map("project_id")
  project   Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)

  // Status
  status    String   @default("new") // new, contacted, qualified, closed, spam

  // Timestamps
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([projectId])
  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@map("contacts")
}
```

#### testimonials Table

```prisma
model Testimonial {
  id        String   @id @default(cuid())

  // Content
  name      String
  role      String?
  company   String?
  quote     String
  rating    Int?     @default(5)
  avatarUrl String?  @map("avatar_url")

  // Relationship
  projectId String?  @map("project_id")
  project   Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)

  // Status
  featured  Boolean  @default(false)
  status    String   @default("active") // active, hidden

  // Timestamps
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([status])
  @@index([featured])
  @@map("testimonials")
}
```

---

### Layer 2: Type Definitions

**Location:** `lib/types/`

#### Project Types

```typescript
// lib/types/project.ts

export type ProjectCategory = 'web-app' | 'saas' | 'automation' | 'ecommerce' | 'dashboard'
export type ProjectServiceType = 'build' | 'consult' | 'maintain'
export type ProjectStatus = 'draft' | 'active' | 'archived'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: ProjectCategory
  serviceType: ProjectServiceType
  client?: string
  url?: string
  featured: boolean
  displayOrder: number
  status: ProjectStatus
  contactsCount?: number
  createdAt: string
  updatedAt: string
}

export interface CreateProjectInput {
  slug: string
  title: string
  description: string
  category: ProjectCategory
  serviceType: ProjectServiceType
  client?: string
  url?: string
  status?: ProjectStatus
  featured?: boolean
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {}

export interface ProjectFilters {
  category?: ProjectCategory
  serviceType?: ProjectServiceType
  status?: ProjectStatus
  featured?: boolean
}
```

#### Contact Types

```typescript
// lib/types/contact.ts

export type ContactStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'spam'

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message?: string
  projectId?: string
  status: ContactStatus
  createdAt: string
  updatedAt: string

  // Joined
  project?: {
    id: string
    slug: string
    title: string
  }
}

export interface CreateContactInput {
  name: string
  email: string
  phone?: string
  message?: string
  projectId?: string
}

export interface UpdateContactInput {
  status?: ContactStatus
}

export interface ContactFilters {
  status?: ContactStatus
  projectId?: string
}
```

---

### Layer 3: API Routes

**Location:** `app/api/`

#### Projects API

```typescript
// app/api/projects/route.ts

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import type { CreateProjectInput, ProjectFilters } from '@/lib/types/project'

/**
 * GET /api/projects
 * List projects (public: active only)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: any = { status: 'active' }
    if (category) where.category = category
    if (featured === 'true') where.featured = true

    const projects = await prisma.project.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: { select: { contacts: true } },
      },
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error loading projects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/projects
 * Create new project
 */
export async function POST(request: Request) {
  try {
    const body: CreateProjectInput = await request.json()

    const requiredFields = ['slug', 'title', 'description', 'category', 'serviceType']
    for (const field of requiredFields) {
      if (!body[field as keyof CreateProjectInput]) {
        return NextResponse.json({ error: `Missing: ${field}` }, { status: 400 })
      }
    }

    const project = await prisma.project.create({
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        category: body.category,
        serviceType: body.serviceType,
        client: body.client || null,
        url: body.url || null,
        status: body.status || 'active',
        featured: body.featured || false,
      },
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

#### Contacts API (Public Enquiry)

```typescript
// app/api/contacts/route.ts

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import type { CreateContactInput } from '@/lib/types/contact'

/**
 * POST /api/contacts
 * Submit enquiry (public, no auth required)
 */
export async function POST(request: Request) {
  try {
    const body: CreateContactInput = await request.json()

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message || null,
        projectId: body.projectId || null,
      },
    })

    return NextResponse.json({ contact }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

### Layer 4: Page UI

**Location:** `app/` pages

```tsx
'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/types/project'
import Link from 'next/link'

// NOTE: Admin pages follow existing admin patterns.
// Public pages MUST use Lost Monster brand:
// - Dark gradient backgrounds
// - Glassmorphism cards (bg-white/5 backdrop-blur-md)
// - Dynamic accent colour via style={{ color: color.accent }}
// - Personal "I" voice
// - Key metrics visible (50+, 70%, 4.9/5, 2-4 wks)
```

---

### Layer 5: Components

**Location:** `components/`

#### Project Card (Public -- Brand Compliant)

```tsx
// components/projects/ProjectCard.tsx
// Public-facing card MUST use Lost Monster brand:

// Card container:
// className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
// style={{ borderColor: `${color.accent}20` }}

// Title:
// className="text-xl font-bold text-white"

// Category badge:
// style={{ color: color.accent }}

// Description:
// className="text-neutral-300 text-sm"

// CTA:
// style={{ backgroundColor: color.accent }}
// className="px-6 py-3 rounded-lg text-black font-bold"
```

#### Brand Compliance (Layers 4 & 5)

> **Every UI component CRUDX builds must be brand-compliant.**
> Consult `.ai/LOST-MONSTER-DESIGN-SYSTEM.md` for the full approved palette, backgrounds, and card treatment.

| Context | Rule |
|---------|------|
| **Public pages** | Dark gradient (`bg-gradient-to-br from-neutral-900` etc.) canvas, glassmorphism cards (`bg-white/5 backdrop-blur-md border`). **Never** use `bg-white`, `bg-gray-*`, or `bg-slate-*` as page backgrounds. |
| **Cards** | `bg-white/5 backdrop-blur-md border rounded-xl` with accent border at 20% opacity. |
| **Interactive elements** | Accent colour background for CTAs via `style={{ backgroundColor: color.accent }}`, white text for primary content, `neutral-300/400` for secondary text. |
| **Typography** | `text-6xl md:text-8xl lg:text-9xl` for heroes, bold and tracked tight. |

**AI Slop Provenance Rule:** Every visual element (colour, border, shadow, gradient) must already exist on another live Lost Monster page. If it doesn't, it's orphan styling and must be rejected. No thick coloured borders, no gratuitous gradients, no decorative elements that don't appear elsewhere in the product.

All CRUDX UI output must pass **SOFAX Dimension 11 (Brand Compliance & AI Slop)** -- see `.ai/LOST-MONSTER-DESIGN-SYSTEM.md` and the AI Slop Test (10 Red Flags) at `.ai/slop-test.md`.

---

### Layer 6: Integration Points

#### Navigation

```typescript
// components/layout/SiteHeader.tsx
// Public navigation links
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
]
```

#### Public API

```typescript
// app/api/projects/route.ts
// Public endpoint for projects listing
// Uses Prisma with status='active' filter

// app/api/contacts/route.ts
// Public endpoint for enquiry submission (no auth required)
```

---

## Lost Monster CRUDX Checklist

### Projects CRUDX

- [ ] **Database:** `projects` table in Prisma schema
- [ ] **Types:** `Project`, `CreateProjectInput`, `ProjectFilters`
- [ ] **API:** `/api/projects` with CRUD
- [ ] **UI:** Projects grid with glassmorphism cards on dark background
- [ ] **Components:** ProjectCard (brand-compliant), ProjectForm
- [ ] **Integration:** Navigation link, homepage featured section

### Contacts CRUDX

- [ ] **Database:** `contacts` table linked to projects
- [ ] **Types:** `Contact`, `CreateContactInput`
- [ ] **API:** `/api/contacts` with status updates
- [ ] **UI:** Contact form (public), contacts list (admin)
- [ ] **Components:** ContactForm, StatusBadge
- [ ] **Integration:** Contact count on projects, enquiry form on detail pages

### Testimonials CRUDX

- [ ] **Database:** `testimonials` table with rating
- [ ] **Types:** `Testimonial`, featured status
- [ ] **API:** `/api/testimonials` with CRUD
- [ ] **UI:** Testimonials display (public, brand-compliant)
- [ ] **Components:** TestimonialCard (glassmorphism), rating display
- [ ] **Integration:** Featured testimonials on homepage

---

## Lost Monster Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Database columns | `snake_case` (via Prisma @map) | `service_type`, `display_order` |
| TypeScript | `camelCase` | `serviceType`, `displayOrder` |
| API routes | `kebab-case` | `/api/projects` |
| Component files | `PascalCase` | `ProjectCard.tsx` |

---

## Integration with Other Frameworks

### CRUDX + CODAX

1. **CODAX** plans the feature (what, why, how)
2. **CRUDX** builds the complete system

### CRUDX + TUCHX

1. **CRUDX** builds the interface
2. **TUCHX** optimizes for mobile touch

### CRUDX + SOFAX

1. **CRUDX** builds the UI
2. **SOFAX** audits the UX quality + brand compliance

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 2.0 (Lost Monster Adapted)
