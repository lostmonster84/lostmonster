# HARDX Framework — Lost Monster Edition

> **Hardcoded Value Detection & CRUD Conversion System**
>
> Identify hardcoded values and convert them to database-backed CRUD systems.
> Optimized for personal brand development agency patterns.

---

## Lost Monster Context

**HARDX for Lost Monster** understands:
- **Project categories** — website, webapp, saas, ecommerce, mobile
- **Project types** — client-work, personal, open-source
- **Service categories** — development, design, consulting, maintenance
- **Status enums** — draft, published, archived, active, new
- **Metric values** — 50+ projects, 70% cost savings, 4.9/5 rating, 2-4 wks
- **Color themes** — blue, teal, orange, purple, green
- **Tech stack items** — Next.js, React, TypeScript, Tailwind, etc.
- **Single app structure** — `app/` directory, no monorepo

---

## Quick Start

```
run HARDX                      # Full scan of Lost Monster codebase
run HARDX report               # Show current hardcoded inventory
run HARDX implement [item]     # Convert specific item to CRUD
```

---

## Lost Monster Detection Patterns

### Pattern 1: Project Categories (HIGH Priority)

```typescript
// DETECTED - Hardcoded project categories
const CATEGORIES = [
  'website',
  'webapp',
  'saas',
  'ecommerce',
  'mobile',
]

// Also detected inline
<select>
  <option value="website">Website</option>
  <option value="webapp">Web App</option>
  ...
</select>
```

**Lost Monster Consideration:** Project categories are core to the portfolio. As the business grows, new categories (e.g. "AI tools", "automation") will be needed. Candidate for CRUD.

### Pattern 2: Tech Stack Items (HIGH Priority)

```typescript
// DETECTED - Hardcoded tech stack
const TECH_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Prisma',
  'Vercel',
]
```

**Lost Monster Consideration:** Tech stack evolves constantly. New tools get added, old ones deprecated. Should be CRUD-managed so the portfolio stays current.

### Pattern 3: Service Offerings (MEDIUM Priority)

```typescript
// DETECTED - Hardcoded services
const SERVICES = [
  { title: 'Full-Stack Development', price: 'From L2,500' },
  { title: 'Landing Pages', price: 'From L500' },
  { title: 'SaaS MVP', price: 'From L5,000' },
  { title: 'Maintenance', price: 'From L250/mo' },
]
```

**Lost Monster Consideration:** Services are already modelled in the database (`services` table). If hardcoded elsewhere, should reference the database.

### Pattern 4: Metric Values (MEDIUM Priority)

```typescript
// DETECTED - Hardcoded metrics
const metrics = [
  { value: '50+', label: 'Projects Built', subtext: 'Delivered on time' },
  { value: '70%', label: 'Cost Savings', subtext: 'vs agencies' },
  { value: '4.9/5', label: 'Client Rating', subtext: 'Real reviews' },
  { value: '2-4 wks', label: 'Typical Build', subtext: 'Not months' },
]
```

**Lost Monster Consideration:** These are key trust signals. The values change slowly but DO change (50+ becomes 75+, etc.). Consider a settings/config table for dynamic updates.

### Pattern 5: Color Themes (LOW Priority)

```typescript
// DETECTED - Hardcoded color themes
const colors = {
  blue:   { accent: '#60A5FA', bg: 'from-[#1E3A8A]...' },
  teal:   { accent: '#06B6D4', bg: 'from-slate-900...' },
  orange: { accent: '#F59E0B', bg: 'from-neutral-900...' },
  purple: { accent: '#A855F7', bg: 'from-black...' },
  green:  { accent: '#10B981', bg: 'from-neutral-950...' },
}
```

**Lost Monster Consideration:** Color themes are core to the design system identity. They're intentionally curated, not user-generated. Keep as code.

### Pattern 6: Status Enums (LOW Priority)

```typescript
// DETECTED - Status enums
const PROJECT_STATUSES = ['draft', 'published', 'archived']
const CONTACT_STATUSES = ['new', 'read', 'replied', 'archived']
```

**Lost Monster Consideration:** Core system states. Keep as code + database constraints.

---

## Lost Monster Classification

### HIGH Priority (Convert to CRUD)

| Item | Reason | Action |
|------|--------|--------|
| Tech stack items | New tools added regularly | Create `tech_stack` table or JSON config |
| Project categories | Will expand with business growth | Add to settings config |

### MEDIUM Priority (Database Reference)

| Item | Reason | Action |
|------|--------|--------|
| Services | Already in database | Reference `services` table everywhere |
| Metrics | Values change over time | Create `site_config` table for dynamic values |

### LOW Priority (Keep as Code)

| Item | Reason | Action |
|------|--------|--------|
| Color themes | Curated design decision | Keep in `app/page.tsx` |
| Status enums | System states | Keep as code + Prisma enum |
| Font choices | Design system decision | Keep in config |

---

## Lost Monster CRUD Implementation

### Example: Site Config Table (for Metrics)

**Step 1: Prisma Schema**

```prisma
// prisma/schema.prisma

model SiteConfig {
  id        String   @id @default(uuid())
  key       String   @unique
  value     String
  label     String?
  category  String   @default("general")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("site_config")
}
```

**Step 2: Migration**

```bash
npx prisma migrate dev --name add_site_config
```

**Step 3: Seed Default Values**

```typescript
// prisma/seed.ts

await prisma.siteConfig.createMany({
  data: [
    { key: 'metric_projects', value: '50+', label: 'Projects Built', category: 'metrics' },
    { key: 'metric_savings', value: '70%', label: 'Cost Savings', category: 'metrics' },
    { key: 'metric_rating', value: '4.9/5', label: 'Client Rating', category: 'metrics' },
    { key: 'metric_timeline', value: '2-4 wks', label: 'Typical Build', category: 'metrics' },
  ],
})
```

**Step 4: API Route**

```typescript
// app/api/config/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const config = await prisma.siteConfig.findMany({
    where: category ? { category } : undefined,
    orderBy: { key: 'asc' },
  })

  return NextResponse.json({ config })
}
```

**Step 5: Update Consumers**

```typescript
// BEFORE (hardcoded)
const metrics = [
  { value: '50+', label: 'Projects Built', subtext: 'Delivered on time' },
  // ...
]

// AFTER (database-backed, fetched in server component)
const metricsConfig = await prisma.siteConfig.findMany({
  where: { category: 'metrics' },
})

const metrics = metricsConfig.map(config => ({
  value: config.value,
  label: config.label,
  subtext: '', // or add subtext to SiteConfig model
}))
```

---

## Lost Monster Report Format

```
# HARDX SCAN REPORT - Lost Monster
Generated: 2026-02-28
Scanned: app/, components/, lib/

## HIGH PRIORITY (Action Required)

### 1. TECH STACK ITEMS
- **Files**: app/page.tsx:45, components/ProjectCard.tsx:12
- **Values**: Next.js, React, TypeScript, Tailwind, etc. (8 total)
- **Duplicates**: 2 files
- **Status**: NOT CRUD
- **Action**: Create `tech_stack` config or tags system

### 2. PROJECT CATEGORIES
- **Files**: app/portfolio/page.tsx:23
- **Values**: website, webapp, saas, ecommerce, mobile (5 total)
- **Duplicates**: 1 file
- **Status**: NOT CRUD
- **Action**: Add to site_config or project metadata

## MEDIUM PRIORITY (Reference Database)

### 3. SERVICES
- **Files**: components/ServicesSection.tsx:8
- **Values**: 4 service objects hardcoded
- **Status**: EXISTS IN DB (services table)
- **Action**: Replace hardcoded with Prisma query

### 4. METRICS
- **Files**: app/page.tsx:122
- **Values**: 50+, 70%, 4.9/5, 2-4 wks
- **Status**: HARDCODED
- **Action**: Create site_config table for dynamic values

## LOW PRIORITY (Keep as Code)

### 5. COLOR THEMES
- **Files**: app/page.tsx:6
- **Values**: blue, teal, orange, purple, green
- **Reason**: Curated design system
- **Action**: Document, keep as is

### 6. STATUS ENUMS
- **Files**: lib/types/project.ts:3
- **Values**: draft, published, archived
- **Reason**: System state enum
- **Action**: Keep as code + Prisma constraint

## SUMMARY

| Priority | Count | Status |
|----------|-------|--------|
| HIGH | 2 | Action Required |
| MEDIUM | 2 | Reference DB |
| LOW | 3 | Documented |
| IGNORE | 1 | Skipped |
```

---

## Lost Monster Scanning Commands

```bash
# Find hardcoded arrays in Lost Monster
grep -rn "const\s\+[A-Z_]\+\s*=\s*\[" app/ components/ lib/ --include="*.tsx" --include="*.ts"

# Find metric-like patterns
grep -rn "METRICS\|FEATURES\|CATEGORIES\|TECH_STACK" app/ components/ --include="*.tsx"

# Find service/project patterns
grep -rn "SERVICES\|PROJECTS\|TESTIMONIALS" app/ components/ --include="*.tsx"

# Find inline select options
grep -rn "<option value=" app/ components/ --include="*.tsx"

# Find duplicated constants across files
grep -rln "const TECH_STACK\|const CATEGORIES" app/ components/ --include="*.tsx" | wc -l
```

---

## Lost Monster Implementation Checklist

When converting a Lost Monster hardcoded item to CRUD:

- [ ] Add Prisma model to `prisma/schema.prisma`
- [ ] Run migration: `npx prisma migrate dev --name descriptive_name`
- [ ] Generate client: `npx prisma generate`
- [ ] Seed default values in `prisma/seed.ts`
- [ ] Create API route (GET) in `app/api/`
- [ ] Create API route (POST) if needed
- [ ] Update consuming components to use Prisma queries or API fetch
- [ ] Remove hardcoded constants
- [ ] Test the full flow
- [ ] Run AUDIX to verify new endpoints

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CRUDX** | Use CRUDX patterns for CRUD implementation |
| **CONEX** | HARDX findings become CONEX schema |
| **AUDIX** | Verify new endpoints with AUDIX |
| **TERRX** | Terry tests the new dynamic data rendering |

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 2.0 (Lost Monster Edition)
