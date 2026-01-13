# Shared Components & Utilities

Framework-agnostic code that can be used across React, Vue, Next.js, and other frameworks.

## What Goes Here

This directory contains:
- **Business logic** - Framework-independent logic
- **Data utilities** - Transformations, formatting, parsing
- **Type definitions** - Shared TypeScript types
- **Constants** - Configuration, enums, static data
- **Validators** - Form validation, data validation
- **Helpers** - Pure utility functions
- **API clients** - HTTP clients, API wrappers
- **State machines** - XState or similar

## Directory Structure

```
shared/
├── types/              # TypeScript types and interfaces
├── utils/              # Utility functions
├── validators/         # Validation logic
├── constants/          # Constants and enums
├── api/                # API clients
├── models/             # Data models
├── services/           # Business logic services
└── hooks/              # Framework-agnostic hooks logic
```

## Types

### Type Definitions
```typescript
// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: Date
}

export type UserRole = User['role']

export interface UserFormData {
  name: string
  email: string
  password: string
}
```

### Utility Types
```typescript
// types/utils.ts
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys]

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
```

## Utilities

### String Utilities
```typescript
// utils/string.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

### Array Utilities
```typescript
// utils/array.ts
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

export function groupBy<T>(
  arr: T[],
  key: keyof T
): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key])
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  )
}
```

### Date Utilities
```typescript
// utils/date.ts
export function formatDate(
  date: Date,
  format: 'short' | 'long' | 'iso' = 'short'
): string {
  switch (format) {
    case 'short':
      return date.toLocaleDateString()
    case 'long':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'iso':
      return date.toISOString()
  }
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
```

### Number Utilities
```typescript
// utils/number.ts
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
```

## Validators

### Form Validators
```typescript
// validators/form.ts
export const validators = {
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  password: (value: string): boolean => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(value)
  },

  url: (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  required: (value: any): boolean => {
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return value !== null && value !== undefined
  },

  minLength: (min: number) => (value: string): boolean => {
    return value.length >= min
  },

  maxLength: (max: number) => (value: string): boolean => {
    return value.length <= max
  }
}
```

### Data Validators
```typescript
// validators/data.ts
export function validateUser(data: unknown): data is User {
  if (typeof data !== 'object' || data === null) return false

  const user = data as any
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    (user.role === 'admin' || user.role === 'user')
  )
}
```

## Constants

```typescript
// constants/app.ts
export const APP_NAME = 'Lost Monster'
export const APP_VERSION = '1.0.0'

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings'
} as const

export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  AUTH: '/api/auth'
} as const

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
} as const
```

## API Clients

### HTTP Client
```typescript
// api/client.ts
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}
```

### Service Example
```typescript
// api/users.ts
import { ApiClient } from './client'
import type { User, UserFormData } from '../types/user'

export class UserService {
  constructor(private client: ApiClient) {}

  async getUsers(): Promise<User[]> {
    return this.client.get<User[]>('/users')
  }

  async getUser(id: string): Promise<User> {
    return this.client.get<User>(`/users/${id}`)
  }

  async createUser(data: UserFormData): Promise<User> {
    return this.client.post<User>('/users', data)
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.client.put<User>(`/users/${id}`, data)
  }

  async deleteUser(id: string): Promise<void> {
    return this.client.delete<void>(`/users/${id}`)
  }
}
```

## Models

```typescript
// models/User.ts
export class UserModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: 'admin' | 'user'
  ) {}

  get isAdmin(): boolean {
    return this.role === 'admin'
  }

  get displayName(): string {
    return this.name || this.email.split('@')[0]
  }

  static fromJSON(json: any): UserModel {
    return new UserModel(
      json.id,
      json.name,
      json.email,
      json.role
    )
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role
    }
  }
}
```

## Services

```typescript
// services/auth.ts
export class AuthService {
  private token: string | null = null

  async login(email: string, password: string): Promise<string> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    this.token = data.token
    return this.token
  }

  logout(): void {
    this.token = null
  }

  isAuthenticated(): boolean {
    return this.token !== null
  }

  getToken(): string | null {
    return this.token
  }
}
```

## Testing

All shared code should be thoroughly tested:

```typescript
// utils/string.test.ts
import { describe, it, expect } from 'vitest'
import { capitalize, slugify } from './string'

describe('string utils', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })
  })

  describe('slugify', () => {
    it('converts to slug format', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
    })
  })
})
```

## Best Practices

1. **Pure Functions** - No side effects
2. **Type Everything** - Full TypeScript coverage
3. **Test Thoroughly** - High test coverage
4. **Document Well** - JSDoc comments
5. **No Framework Code** - Keep it framework-agnostic
6. **Single Responsibility** - One function, one purpose
7. **Reusable** - Generic and flexible

## Usage in Frameworks

### React
```typescript
import { formatDate } from '@/shared/utils/date'
import { validators } from '@/shared/validators/form'

function MyComponent() {
  const formattedDate = formatDate(new Date())
  const isValid = validators.email('test@example.com')
}
```

### Vue
```typescript
import { formatCurrency } from '@/shared/utils/number'
import type { User } from '@/shared/types/user'

const price = formatCurrency(99.99)
```

### Next.js
```typescript
import { ApiClient } from '@/shared/api/client'
import { UserService } from '@/shared/api/users'

const client = new ApiClient(process.env.API_URL)
const userService = new UserService(client)
```

## Contributing

When adding shared code:
1. Keep it framework-agnostic
2. Use TypeScript
3. Write comprehensive tests
4. Add JSDoc comments
5. Update this README
6. Consider reusability

---

For usage examples, see the [`examples/`](../../examples/) directory.
