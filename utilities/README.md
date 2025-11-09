# Utilities & Tools

Helper functions, scripts, hooks, and development tools to accelerate development.

## Overview

This directory contains reusable utilities and tools that don't fit into the component or integration categories but are essential for development.

## Directory Structure

```
utilities/
├── scripts/            # Build scripts, automation
├── helpers/            # Utility functions
├── hooks/              # Custom React/Vue hooks
└── validators/         # Validation utilities
```

## Scripts

**Location:** [`scripts/`](./scripts/)

Development and automation scripts:

### Build Scripts
- `build.ts` - Custom build processes
- `prebuild.ts` - Pre-build tasks
- `postbuild.ts` - Post-build tasks

### Database Scripts
- `seed.ts` - Database seeding
- `migrate.ts` - Migration runner
- `reset.ts` - Database reset

### Deployment Scripts
- `deploy.ts` - Deployment automation
- `backup.ts` - Backup creation
- `rollback.ts` - Rollback deployment

### Development Scripts
- `generate-types.ts` - Generate TypeScript types
- `generate-icons.ts` - Process icon files
- `check-deps.ts` - Check for outdated dependencies

## Helpers

**Location:** [`helpers/`](./helpers/)

Common utility functions organized by category:

### String Helpers
```typescript
// helpers/string.ts
export function capitalize(str: string): string
export function slugify(str: string): string
export function truncate(str: string, length: number): string
export function stripHtml(html: string): string
export function camelCase(str: string): string
export function kebabCase(str: string): string
export function snakeCase(str: string): string
```

### Array Helpers
```typescript
// helpers/array.ts
export function unique<T>(arr: T[]): T[]
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>
export function chunk<T>(arr: T[], size: number): T[][]
export function shuffle<T>(arr: T[]): T[]
export function sortBy<T>(arr: T[], key: keyof T): T[]
```

### Object Helpers
```typescript
// helpers/object.ts
export function pick<T>(obj: T, keys: (keyof T)[]): Partial<T>
export function omit<T>(obj: T, keys: (keyof T)[]): Partial<T>
export function deepClone<T>(obj: T): T
export function deepMerge<T>(...objects: Partial<T>[]): T
export function isEmpty(obj: unknown): boolean
```

### Date Helpers
```typescript
// helpers/date.ts
export function formatDate(date: Date, format: string): string
export function addDays(date: Date, days: number): Date
export function diffDays(start: Date, end: Date): number
export function isToday(date: Date): boolean
export function isBefore(date1: Date, date2: Date): boolean
export function isAfter(date1: Date, date2: Date): boolean
```

### Number Helpers
```typescript
// helpers/number.ts
export function formatCurrency(amount: number, currency?: string): string
export function formatPercentage(value: number, decimals?: number): string
export function clamp(value: number, min: number, max: number): number
export function random(min: number, max: number): number
export function round(value: number, decimals: number): number
```

### URL Helpers
```typescript
// helpers/url.ts
export function buildUrl(base: string, params: Record<string, any>): string
export function parseQuery(query: string): Record<string, string>
export function addQueryParam(url: string, key: string, value: string): string
export function removeQueryParam(url: string, key: string): string
```

### Local Storage Helpers
```typescript
// helpers/storage.ts
export function getItem<T>(key: string): T | null
export function setItem<T>(key: string, value: T): void
export function removeItem(key: string): void
export function clear(): void
export function hasItem(key: string): boolean
```

### Cookie Helpers
```typescript
// helpers/cookie.ts
export function getCookie(name: string): string | null
export function setCookie(name: string, value: string, days?: number): void
export function deleteCookie(name: string): void
export function hasCookie(name: string): boolean
```

### Async Helpers
```typescript
// helpers/async.ts
export function sleep(ms: number): Promise<void>
export function retry<T>(fn: () => Promise<T>, retries: number): Promise<T>
export function timeout<T>(promise: Promise<T>, ms: number): Promise<T>
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): T
```

## Hooks

**Location:** [`hooks/`](./hooks/)

Custom React hooks for common functionality:

### useLocalStorage
```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
```

### useDebounce
```typescript
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

### useMediaQuery
```typescript
// hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
```

### useToggle
```typescript
// hooks/useToggle.ts
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((v) => !v)
  }, [])

  return [value, toggle, setValue]
}
```

### useCopyToClipboard
```typescript
// hooks/useCopyToClipboard.ts
export function useCopyToClipboard(): [
  boolean,
  (text: string) => Promise<void>
] {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return [copied, copy]
}
```

### useOnClickOutside
```typescript
// hooks/useOnClickOutside.ts
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
): void {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
```

### useFetch
```typescript
// hooks/useFetch.ts
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
```

### useIntersectionObserver
```typescript
// hooks/useIntersectionObserver.ts
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options])

  return isIntersecting
}
```

## Validators

**Location:** [`validators/`](./validators/)

Validation utilities using Zod:

### Form Validators
```typescript
// validators/form.ts
import { z } from 'zod'

export const emailSchema = z.string().email()

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')

export const userSchema = z.object({
  name: z.string().min(2),
  email: emailSchema,
  password: passwordSchema,
  age: z.number().min(18).optional()
})

export type UserFormData = z.infer<typeof userSchema>
```

### API Validators
```typescript
// validators/api.ts
import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10)
})

export const idSchema = z.string().uuid()

export const searchSchema = z.object({
  query: z.string().min(1),
  filters: z.record(z.string()).optional()
})
```

### Custom Validators
```typescript
// validators/custom.ts
import { z } from 'zod'

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')

export const urlSchema = z.string().url()

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')

export const creditCardSchema = z
  .string()
  .regex(/^\d{13,19}$/, 'Invalid credit card number')
```

## CLI Tools

**Location:** [`scripts/cli/`](./scripts/cli/)

Command-line tools for development:

### Component Generator
```typescript
// scripts/cli/generate-component.ts
import fs from 'fs'
import path from 'path'

export async function generateComponent(name: string) {
  const componentDir = path.join('src/components', name)

  fs.mkdirSync(componentDir, { recursive: true })

  // Generate component file
  fs.writeFileSync(
    path.join(componentDir, `${name}.tsx`),
    componentTemplate(name)
  )

  // Generate types file
  fs.writeFileSync(
    path.join(componentDir, 'types.ts'),
    typesTemplate(name)
  )

  // Generate test file
  fs.writeFileSync(
    path.join(componentDir, `${name}.test.tsx`),
    testTemplate(name)
  )

  console.log(`✓ Generated component: ${name}`)
}
```

### Database Seeder
```typescript
// scripts/cli/seed-database.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedDatabase() {
  console.log('Seeding database...')

  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', name: 'Admin' },
      { email: 'user@example.com', name: 'User' }
    ]
  })

  console.log('✓ Database seeded')
}
```

## Usage Examples

### String Helpers
```typescript
import { capitalize, slugify } from '@/utilities/helpers/string'

const title = capitalize('hello world') // "Hello world"
const slug = slugify('Hello World!') // "hello-world"
```

### Array Helpers
```typescript
import { groupBy, chunk } from '@/utilities/helpers/array'

const users = [
  { id: 1, role: 'admin' },
  { id: 2, role: 'user' },
  { id: 3, role: 'admin' }
]

const grouped = groupBy(users, 'role')
// { admin: [...], user: [...] }

const chunks = chunk([1, 2, 3, 4, 5], 2)
// [[1, 2], [3, 4], [5]]
```

### Custom Hooks
```typescript
import { useLocalStorage, useDebounce } from '@/utilities/hooks'

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', 'default')
  const debouncedValue = useDebounce(value, 500)

  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

### Validators
```typescript
import { userSchema } from '@/utilities/validators/form'

function validateUser(data: unknown) {
  try {
    const validated = userSchema.parse(data)
    // Use validated data
  } catch (error) {
    // Handle validation errors
  }
}
```

## Testing Utilities

```typescript
// helpers/test.ts
export function mockFetch(data: any) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data)
    })
  ) as jest.Mock
}

export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

## Best Practices

1. **Keep utilities pure** - No side effects
2. **Make them reusable** - Generic and flexible
3. **Type everything** - Full TypeScript support
4. **Test thoroughly** - High test coverage
5. **Document well** - Clear JSDoc comments
6. **Single responsibility** - One function, one job

## Contributing

When adding utilities:
1. Choose the correct category
2. Use TypeScript
3. Write tests
4. Add JSDoc comments
5. Include usage examples
6. Update this README

---

For more examples, see the [`examples/`](../examples/) directory.
