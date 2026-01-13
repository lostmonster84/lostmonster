# CONEX — Universal Database Connection Framework

> **Purpose:** Connect any feature to any database with type-safe, production-ready patterns.
> **Usage:** Say "CONEX: [feature]" to generate database connection layer.
> **Universal:** Works with PostgreSQL, MySQL, SQLite, Neon, PlanetScale, Turso, etc.

---

## What is CONEX?

**CONEX** provides universal patterns for connecting features to databases:

- **Schema Design** — Table structure, relationships, indexes
- **Type Safety** — TypeScript types that match your schema
- **Query Patterns** — CRUD operations, filters, pagination
- **Migrations** — Version-controlled schema changes
- **Connection Layer** — Database client setup and pooling

**The Philosophy:** Every feature needs data. CONEX ensures that connection is type-safe, performant, and maintainable.

---

## When to Use CONEX

### Use CONEX When

- Adding a new feature that needs database storage
- Connecting frontend to backend data
- Setting up database for a new project
- Adding new tables to existing schema
- Need type-safe database queries

### CONEX vs Other Frameworks

| Framework | Purpose | When to Use |
|-----------|---------|-------------|
| **CONEX** | Database connection layer | Connecting features to database |
| **CRUDX** | Full admin UI + API | Building complete management systems |
| **PLANX** | Execution planning | Breaking down complex tasks |

**CONEX** = Database layer only
**CRUDX** = Database + API + Admin UI (uses CONEX patterns internally)

---

## Trigger Syntax

```
CONEX: [feature or table name]
```

**Examples:**
```
CONEX: user profiles
CONEX: blog posts
CONEX: order items
CONEX: notifications
```

---

## The CONEX Stack

### 5 Layers (Bottom to Top)

```
┌─────────────────────────────────────────────┐
│  5. QUERIES      Type-safe data access      │
├─────────────────────────────────────────────┤
│  4. TYPES        TypeScript interfaces      │
├─────────────────────────────────────────────┤
│  3. MIGRATIONS   Version-controlled changes │
├─────────────────────────────────────────────┤
│  2. SCHEMA       Table definitions          │
├─────────────────────────────────────────────┤
│  1. CONNECTION   Database client setup      │
└─────────────────────────────────────────────┘
```

---

## Layer 1: Connection

### Database Client Setup

**PostgreSQL (Neon Serverless):**
```typescript
// lib/db.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };
```

**PostgreSQL (node-postgres):**
```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
```

**MySQL (PlanetScale):**
```typescript
// lib/db.ts
import { connect } from '@planetscale/database';

const conn = connect({
  url: process.env.DATABASE_URL,
});

export { conn };
```

**SQLite (Turso):**
```typescript
// lib/db.ts
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export { db };
```

**SQLite (Better-SQLite3):**
```typescript
// lib/db.ts
import Database from 'better-sqlite3';

const db = new Database('app.db');
db.pragma('journal_mode = WAL');

export { db };
```

### Connection Pooling (Production)

```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                    // Maximum connections
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout after 2s
});

// Graceful shutdown
process.on('SIGTERM', () => pool.end());

export { pool };
```

---

## Layer 2: Schema

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case, plural | `blog_posts`, `user_profiles` |
| Columns | snake_case | `created_at`, `is_published` |
| Primary Key | `id` | `id SERIAL PRIMARY KEY` |
| Foreign Key | `[table]_id` | `user_id`, `post_id` |
| Timestamps | `created_at`, `updated_at` | Always include both |

### Standard Table Template

```sql
CREATE TABLE [table_name] (
  -- Identity
  id SERIAL PRIMARY KEY,

  -- Data columns
  [columns...],

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_[table]_[column] ON [table_name]([column]);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER [table]_updated_at
  BEFORE UPDATE ON [table_name]
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Common Column Patterns

**Status/State:**
```sql
status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'))
```

**Soft Delete:**
```sql
deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
```

**Ordering:**
```sql
sort_order INTEGER DEFAULT 0
```

**Slug (URL-friendly):**
```sql
slug VARCHAR(255) UNIQUE NOT NULL
```

**JSON Data:**
```sql
metadata JSONB DEFAULT '{}'::jsonb
```

### Relationships

**One-to-Many:**
```sql
-- posts belong to users
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
```

**Many-to-Many:**
```sql
-- posts have many tags, tags have many posts
CREATE TABLE post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

---

## Layer 3: Migrations

### File Structure

```
database/
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_add_posts.sql
│   ├── 003_add_tags.sql
│   └── 004_add_post_tags.sql
└── run-migrations.ts
```

### Migration File Template

```sql
-- Migration: 002_add_posts.sql
-- Description: Add posts table
-- Created: 2026-01-10

-- UP
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_slug ON posts(slug);

-- DOWN (optional, for rollbacks)
-- DROP TABLE posts;
```

### Migration Runner

```typescript
// database/run-migrations.ts
import { sql } from '../lib/db';
import fs from 'fs';
import path from 'path';

async function runMigrations() {
  // Create migrations tracking table
  await sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Get executed migrations
  const executed = await sql`SELECT name FROM migrations`;
  const executedNames = new Set(executed.map(r => r.name));

  // Get migration files
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  // Run pending migrations
  for (const file of files) {
    if (executedNames.has(file)) continue;

    console.log(`Running migration: ${file}`);
    const content = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');

    await sql.begin(async (tx) => {
      await tx.unsafe(content);
      await tx`INSERT INTO migrations (name) VALUES (${file})`;
    });

    console.log(`Completed: ${file}`);
  }

  console.log('All migrations complete');
}

runMigrations().catch(console.error);
```

---

## Layer 4: Types

### Naming Conventions

| Database | TypeScript | Example |
|----------|------------|---------|
| snake_case | camelCase | `created_at` → `createdAt` |
| Table name | Interface name | `blog_posts` → `BlogPost` |

### Type Definition Pattern

```typescript
// types/post.ts

// Database row (matches schema exactly)
export interface PostRow {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  content: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// Application type (camelCase)
export interface Post {
  id: number;
  userId: number;
  title: string;
  slug: string;
  content: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Create input (omit generated fields)
export interface CreatePostInput {
  userId: number;
  title: string;
  slug: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
}

// Update input (all fields optional)
export interface UpdatePostInput {
  title?: string;
  slug?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
  publishedAt?: Date | null;
}

// List filters
export interface PostFilters {
  userId?: number;
  status?: 'draft' | 'published' | 'archived';
  search?: string;
}
```

### Transform Functions

```typescript
// lib/transforms.ts

import { PostRow, Post } from '@/types/post';

// Database → Application
export function transformPost(row: PostRow): Post {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Application → Database (for inserts/updates)
export function toPostRow(post: Partial<Post>): Partial<PostRow> {
  const row: Partial<PostRow> = {};

  if (post.userId !== undefined) row.user_id = post.userId;
  if (post.title !== undefined) row.title = post.title;
  if (post.slug !== undefined) row.slug = post.slug;
  if (post.content !== undefined) row.content = post.content;
  if (post.status !== undefined) row.status = post.status;
  if (post.publishedAt !== undefined) row.published_at = post.publishedAt;

  return row;
}
```

---

## Layer 5: Queries

### Query Module Pattern

```typescript
// lib/queries/posts.ts

import { sql } from '@/lib/db';
import { PostRow, Post, CreatePostInput, UpdatePostInput, PostFilters } from '@/types/post';
import { transformPost } from '@/lib/transforms';

export const posts = {
  // Get all (with optional filters)
  async list(filters: PostFilters = {}): Promise<Post[]> {
    let query = sql`SELECT * FROM posts WHERE 1=1`;

    if (filters.userId) {
      query = sql`${query} AND user_id = ${filters.userId}`;
    }
    if (filters.status) {
      query = sql`${query} AND status = ${filters.status}`;
    }
    if (filters.search) {
      query = sql`${query} AND title ILIKE ${'%' + filters.search + '%'}`;
    }

    query = sql`${query} ORDER BY created_at DESC`;

    const rows = await query as PostRow[];
    return rows.map(transformPost);
  },

  // Get by ID
  async getById(id: number): Promise<Post | null> {
    const rows = await sql<PostRow[]>`
      SELECT * FROM posts WHERE id = ${id}
    `;
    return rows[0] ? transformPost(rows[0]) : null;
  },

  // Get by slug
  async getBySlug(slug: string): Promise<Post | null> {
    const rows = await sql<PostRow[]>`
      SELECT * FROM posts WHERE slug = ${slug}
    `;
    return rows[0] ? transformPost(rows[0]) : null;
  },

  // Create
  async create(input: CreatePostInput): Promise<Post> {
    const rows = await sql<PostRow[]>`
      INSERT INTO posts (user_id, title, slug, content, status)
      VALUES (${input.userId}, ${input.title}, ${input.slug}, ${input.content || null}, ${input.status || 'draft'})
      RETURNING *
    `;
    return transformPost(rows[0]);
  },

  // Update
  async update(id: number, input: UpdatePostInput): Promise<Post | null> {
    const sets: string[] = [];
    const values: any[] = [];

    if (input.title !== undefined) {
      sets.push('title = $' + (values.length + 1));
      values.push(input.title);
    }
    if (input.slug !== undefined) {
      sets.push('slug = $' + (values.length + 1));
      values.push(input.slug);
    }
    if (input.content !== undefined) {
      sets.push('content = $' + (values.length + 1));
      values.push(input.content);
    }
    if (input.status !== undefined) {
      sets.push('status = $' + (values.length + 1));
      values.push(input.status);
    }
    if (input.publishedAt !== undefined) {
      sets.push('published_at = $' + (values.length + 1));
      values.push(input.publishedAt);
    }

    if (sets.length === 0) return this.getById(id);

    values.push(id);
    const rows = await sql<PostRow[]>`
      UPDATE posts
      SET ${sql.unsafe(sets.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] ? transformPost(rows[0]) : null;
  },

  // Delete
  async delete(id: number): Promise<boolean> {
    const result = await sql`
      DELETE FROM posts WHERE id = ${id}
    `;
    return result.count > 0;
  },

  // Publish
  async publish(id: number): Promise<Post | null> {
    const rows = await sql<PostRow[]>`
      UPDATE posts
      SET status = 'published', published_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] ? transformPost(rows[0]) : null;
  },
};
```

### Pagination Pattern

```typescript
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

async function listPaginated(
  filters: PostFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedResult<Post>> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 20;
  const offset = (page - 1) * limit;

  // Get total count
  const countResult = await sql`
    SELECT COUNT(*) as total FROM posts WHERE 1=1
    ${filters.status ? sql`AND status = ${filters.status}` : sql``}
  `;
  const total = parseInt(countResult[0].total);

  // Get paginated data
  const rows = await sql<PostRow[]>`
    SELECT * FROM posts WHERE 1=1
    ${filters.status ? sql`AND status = ${filters.status}` : sql``}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return {
    data: rows.map(transformPost),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
```

---

## Quick Reference

### CONEX Checklist

When connecting a feature to database:

- [ ] **Connection** — Database client configured
- [ ] **Schema** — Table created with proper naming
- [ ] **Migration** — Schema versioned in migrations folder
- [ ] **Types** — TypeScript interfaces defined
- [ ] **Transforms** — snake_case ↔ camelCase functions
- [ ] **Queries** — CRUD operations implemented
- [ ] **Indexes** — Added for frequently queried columns

### Common Patterns

| Pattern | When to Use |
|---------|-------------|
| Soft delete | User-facing content that might need recovery |
| Hard delete | Internal data, logs, temporary records |
| Status enum | Content with workflow (draft → published) |
| Slug | URL-friendly identifiers |
| JSONB metadata | Flexible extra fields |
| Timestamps | Always include created_at and updated_at |

---

## Database-Specific Notes

### PostgreSQL
- Use `SERIAL` or `BIGSERIAL` for auto-increment
- Use `JSONB` for JSON data (indexed)
- Use `TEXT` for unlimited strings
- Use `TIMESTAMP WITH TIME ZONE` for dates

### MySQL
- Use `AUTO_INCREMENT` for auto-increment
- Use `JSON` for JSON data
- Use `LONGTEXT` for unlimited strings
- Use `DATETIME` for dates

### SQLite
- Use `INTEGER PRIMARY KEY` for auto-increment
- Use `TEXT` for JSON (parse in application)
- Use `TEXT` for dates (ISO format)

---

## Related Frameworks

| Framework | Purpose | Relationship |
|-----------|---------|--------------|
| **CRUDX** | Full-stack management | Uses CONEX for database layer |
| **PLANX** | Execution planning | Plan before implementing CONEX |
| **HARDX** | Hardcoded value detection | Run after CONEX to verify endpoints |

---

**Version:** 2.0 (Universal)
**Last Updated:** January 13, 2026
