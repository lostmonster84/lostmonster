# Next.js Components

Next.js 13+ components optimized for the App Router, Server Components, and Client Components.

## Tech Stack

- **Next.js 13+** - App Router
- **React Server Components** - Server-side rendering
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Server Actions** - Form handling

## Component Types

### Server Components (Default)
Components that render on the server:
- No client-side JavaScript
- Direct database access
- Async components
- Automatic code splitting

### Client Components
Interactive components with `'use client'`:
- Event handlers
- Browser APIs
- React hooks (useState, useEffect)
- Interactive features

## Available Components

### Server Components
- `ServerCard/` - Card component (server-rendered)
- `ServerTable/` - Data table with async data
- `ServerNavigation/` - Navigation menu
- `ServerBreadcrumbs/` - Breadcrumb navigation

### Client Components
- `ClientButton/` - Interactive button
- `ClientModal/` - Modal dialog
- `ClientTabs/` - Tab navigation
- `ClientToast/` - Toast notifications
- `ClientForm/` - Form with validation

### Hybrid Components
- `ProductCard/` - Server shell, client interactions
- `DataGrid/` - Server data, client filtering
- `SearchBar/` - Client input, server search

### Layout Components
- `RootLayout/` - Root layout wrapper
- `PageLayout/` - Page layout template
- `DashboardLayout/` - Dashboard layout

### Special Components
- `ErrorBoundary/` - Error handling
- `Loading/` - Loading states
- `NotFound/` - 404 pages

## Server Component Example

```tsx
// app/components/ServerCard.tsx
import { Suspense } from 'react'

interface ServerCardProps {
  userId: string
}

// Async Server Component
export async function ServerCard({ userId }: ServerCardProps) {
  // Direct database/API calls
  const user = await fetchUser(userId)

  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

// Usage with Suspense
export default function Page() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <ServerCard userId="123" />
    </Suspense>
  )
}
```

## Client Component Example

```tsx
// app/components/ClientButton.tsx
'use client'

import { useState } from 'react'

interface ClientButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function ClientButton({
  children,
  variant = 'primary'
}: ClientButtonProps) {
  const [count, setCount] = useState(0)

  return (
    <button
      className={`btn btn-${variant}`}
      onClick={() => setCount(count + 1)}
    >
      {children} ({count})
    </button>
  )
}
```

## Hybrid Pattern

```tsx
// ServerWrapper.tsx (Server Component)
import { ClientInteractive } from './ClientInteractive'

export async function ProductCard({ productId }: Props) {
  // Fetch on server
  const product = await fetchProduct(productId)

  // Pass data to client component
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <ClientInteractive productId={productId} />
    </div>
  )
}
```

```tsx
// ClientInteractive.tsx (Client Component)
'use client'

export function ClientInteractive({ productId }: Props) {
  const [liked, setLiked] = useState(false)

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  )
}
```

## Server Actions

```tsx
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // Server-side validation
  if (!name || !email) {
    return { error: 'Missing fields' }
  }

  // Database operation
  const user = await db.user.create({
    data: { name, email }
  })

  return { success: true, user }
}
```

```tsx
// Form.tsx
'use client'

import { createUser } from '@/app/actions'

export function UserForm() {
  async function handleSubmit(formData: FormData) {
    const result = await createUser(formData)

    if (result.error) {
      console.error(result.error)
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Create User</button>
    </form>
  )
}
```

## Data Fetching

### Server Component Fetch
```tsx
export async function UserList() {
  // Cached by default
  const users = await fetch('https://api.example.com/users')
    .then(res => res.json())

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Revalidation
```tsx
// Revalidate every hour
export async function revalidate() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  })
}

// No cache
export async function dynamic() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  })
}
```

## Streaming and Suspense

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  )
}
```

## Layouts

### Root Layout
```tsx
// app/layout.tsx
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Nested Layout
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

## Error Handling

```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Loading States

```tsx
// app/loading.tsx
export default function Loading() {
  return <LoadingSpinner />
}
```

## Metadata

```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description'
}

export default function Page() {
  return <div>Content</div>
}
```

## Image Optimization

```tsx
import Image from 'next/image'

export function ProductImage() {
  return (
    <Image
      src="/product.jpg"
      alt="Product"
      width={500}
      height={300}
      priority
    />
  )
}
```

## Font Optimization

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## Route Handlers

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await fetchUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return NextResponse.json(user, { status: 201 })
}
```

## Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}
```

## Best Practices

1. **Default to Server Components** - Use client components only when needed
2. **Fetch on the server** - Closer to data source, more secure
3. **Use Suspense** - Better loading states and streaming
4. **Optimize images** - Use next/image
5. **Optimize fonts** - Use next/font
6. **Cache appropriately** - Understand revalidation strategies
7. **Minimize client JS** - Better performance
8. **Use Server Actions** - Simplified form handling

## When to Use Client Components

Use `'use client'` when you need:
- Event listeners (onClick, onChange, etc.)
- State and lifecycle (useState, useEffect, etc.)
- Browser APIs (localStorage, window, etc.)
- Custom hooks
- React class components

## Component Structure

```
ComponentName/
├── README.md
├── ComponentName.tsx        # Server Component
├── ComponentName.client.tsx # Client Component
├── ComponentName.test.tsx
├── types.ts
└── index.ts
```

## Testing

```tsx
import { render, screen } from '@testing-library/react'
import { ClientButton } from './ClientButton'

describe('ClientButton', () => {
  it('renders children', () => {
    render(<ClientButton>Click me</ClientButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Contributing

When adding Next.js components:
1. Use Server Components by default
2. Add `'use client'` only when necessary
3. Leverage Next.js optimizations (Image, Font)
4. Use TypeScript
5. Document server vs client usage
6. Include examples for both

---

For more patterns, see the [`examples/`](../../examples/) directory.
