# CONEX — Database Connection Framework

> **Purpose:** Connect Lost Monster features to Neon PostgreSQL with type-safe, production-ready patterns.
> **Usage:** Say "CONEX: [feature]" to generate database connection layer.
> **Database:** Neon PostgreSQL with @neondatabase/serverless

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[DATABASE]` | Neon PostgreSQL | CLAUDE.md |
| `[DB-DRIVER]` | @neondatabase/serverless | CLAUDE.md |
| `[AUTH-METHOD]` | NextAuth v5 (Credentials + JWT) | CLAUDE.md |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[APP-API]` | Next.js API routes (website/app/api/ + dashboard/apps/web/src/app/api/) | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**CONEX for Lost Monster** generates type-safe database connection patterns for Neon PostgreSQL using the `@neondatabase/serverless` driver. All database access follows Next.js 15 App Router conventions with server components and API route handlers.

The dashboard uses pnpm workspaces with a shared `@lostmonster/database` package. Connection strings are managed via environment variables in `.env.local` files.
---

## When to Use CONEX

### Use CONEX When

- Adding a new feature that needs database storage
- Connecting frontend to database via API routes
- Adding new tables to the schema
- Need type-safe database queries

### CONEX vs CRUDX

| Framework | Purpose | When to Use |
|-----------|---------|-------------|
| **CONEX** | Database connection layer | Connecting features to database |
| **CRUDX** | Full admin UI + API | Building complete management systems |

**CONEX** = Database layer only
**CRUDX** = Database + API + Admin UI (uses CONEX patterns internally)

---

## The CONEX Stack

### 5 Layers (Bottom to Top)

```
┌─────────────────────────────────────────────┐
│  5. QUERIES      Type-safe database access  │
├─────────────────────────────────────────────┤
│  4. TYPES        TypeScript interfaces      │
├─────────────────────────────────────────────┤
│  3. MIGRATIONS   SQL migrations             │
├─────────────────────────────────────────────┤
│  2. SCHEMA       Table definitions          │
├─────────────────────────────────────────────┤
│  1. CONNECTION   Database client setup      │
└─────────────────────────────────────────────┘
```

---

## Layer 1: Connection (Database Client)

### Database Client

Set up the database client using @neondatabase/serverless connecting to Neon PostgreSQL.

### Auth

Set up authentication using NextAuth v5 (Credentials + JWT) for protecting routes and isolating data.

### Middleware (Route Protection)

Use middleware for route protection based on NextAuth v5 (Credentials + JWT).

---

## Layer 2: Schema (Tables)

Define tables with appropriate columns, constraints, indexes, and timestamps. Use `snake_case` in database, `camelCase` in TypeScript.

Access control should be enforced at the appropriate level for your auth method.

---

## Layer 3: Migrations

### Migration Structure

```
migrations/
└── migrations/
    ├── 00001_create_table_a.sql
    ├── 00002_create_table_b.sql
    └── ...
```

Migrations run against Neon PostgreSQL with sequential numbering.

---

## Layer 4: Types

### Type Definitions

TypeScript interfaces in shared types package. Include transform functions for snake_case → camelCase conversion.

---

## Layer 5: Queries

### Query Patterns

Type-safe query functions using @neondatabase/serverless with parameterised SQL.

---

## Access Control Patterns

Define access control appropriate for your NextAuth v5 (Credentials + JWT):

### Authenticated Access
Protected routes verify auth before querying.

### Public Read Access
Public endpoints read only active/published content.

### Public Create
Forms create records via unauthenticated API endpoints with validation.

---

## CONEX Checklist

When adding a new feature:

- [ ] **Schema:** Table created with project conventions
- [ ] **Auth:** Access control in API routes
- [ ] **Migration:** SQL file with sequential numbering
- [ ] **Types:** TypeScript interface in shared types
- [ ] **Transform:** snake_case → camelCase function
- [ ] **Queries:** Parameterised query functions
- [ ] **Indexes:** Added for frequently queried columns

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **CRUDX** | Uses CONEX patterns for database layer |
| **PLANX** | Plan database schema before implementing CONEX |
| **MAPX** | CONEX documents table relationships |

---


---

## Supplements

Before starting work, check for a relevant supplement in `checkers/supplements/`:

| Job Type | Supplement | Created |
|----------|-----------|---------|

If a supplement exists for this job type, **read it before starting work**.
It contains researched patterns from real-world examples.

If no supplement exists and the job type is unfamiliar, flag it — SCOUTX may need to research first.


**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0
