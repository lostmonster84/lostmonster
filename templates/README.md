# Project Templates

Production-ready project templates and boilerplates to kickstart development.

## Overview

This directory contains starter templates for various project types. Each template is configured with best practices, common dependencies, and a solid foundation to build upon.

## Directory Structure

```
templates/
├── frontend/           # Frontend application templates
├── backend/            # Backend API templates
└── fullstack/          # Full-stack application templates
```

## Frontend Templates

**Location:** [`frontend/`](./frontend/)

### Next.js Templates

**Next.js App Router** - Modern Next.js with App Router
- Next.js 14+
- TypeScript
- Tailwind CSS
- ESLint & Prettier
- App Router structure
- Server Components
- API routes

**Next.js SaaS** - SaaS application template
- Authentication (Auth0/Clerk)
- Database (Prisma + PostgreSQL)
- Payments (Stripe)
- Dashboard layout
- User management
- Subscription handling

**Next.js E-commerce** - E-commerce template
- Product catalog
- Shopping cart
- Checkout flow
- Payment integration
- Order management
- Admin panel

### React Templates

**React + Vite** - Modern React setup
- Vite bundler
- TypeScript
- React Router
- Tailwind CSS
- ESLint & Prettier
- Vitest for testing

**React Admin Dashboard** - Admin panel template
- Dashboard layout
- Data tables
- Charts & graphs
- Form handling
- Authentication
- Role-based access

### Vue Templates

**Vue 3 + Vite** - Modern Vue setup
- Vue 3 Composition API
- TypeScript
- Vue Router
- Pinia state management
- Tailwind CSS
- Vitest for testing

## Backend Templates

**Location:** [`backend/`](./backend/)

### Node.js Templates

**Express API** - REST API template
- Express.js
- TypeScript
- Prisma ORM
- Authentication (JWT)
- Validation (Zod)
- Error handling
- Logging

**NestJS API** - Enterprise API template
- NestJS framework
- TypeScript
- Prisma/TypeORM
- GraphQL (optional)
- Swagger docs
- Testing setup
- Microservices ready

**tRPC API** - Type-safe API template
- tRPC
- Next.js integration
- TypeScript end-to-end
- Prisma
- React Query
- Zod validation

### Serverless Templates

**AWS Lambda** - Serverless functions
- AWS Lambda
- API Gateway
- DynamoDB
- CloudFormation
- TypeScript

**Vercel Functions** - Edge functions
- Vercel Edge Runtime
- TypeScript
- API routes
- Middleware

## Full-Stack Templates

**Location:** [`fullstack/`](./fullstack/)

### T3 Stack
- Next.js
- tRPC
- Prisma
- Tailwind CSS
- NextAuth.js
- TypeScript

### MERN Stack
- MongoDB
- Express
- React
- Node.js
- TypeScript
- REST API

### Serverless Stack
- Next.js
- Supabase
- Edge functions
- Realtime subscriptions
- Storage
- Authentication

## Template Structure

Each template follows this structure:

```
template-name/
├── README.md              # Setup instructions
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── .env.example           # Environment variables
├── .gitignore             # Git ignore rules
├── .eslintrc.json         # ESLint config
├── .prettierrc            # Prettier config
├── src/                   # Source code
│   ├── app/               # Application code
│   ├── components/        # Reusable components
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
└── public/                # Static assets
```

## Quick Start

### Using a Template

1. **Copy the template**
   ```bash
   cp -r templates/frontend/nextjs-app my-project
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## Next.js App Router Template

### Features
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint & Prettier for code quality
- Automatic code splitting
- Image optimization
- Font optimization
- SEO optimized

### Directory Structure
```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── api/               # API routes
│   └── (auth)/            # Auth routes group
│       ├── login/
│       └── signup/
├── components/
│   ├── ui/                # UI components
│   └── layout/            # Layout components
├── lib/
│   ├── utils.ts           # Utilities
│   └── constants.ts       # Constants
└── types/
    └── index.ts           # Type definitions
```

### Usage
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint

# Format
npm run format
```

## Express API Template

### Features
- Express.js server
- TypeScript
- Prisma ORM
- JWT authentication
- Zod validation
- Error handling middleware
- Request logging
- CORS configured
- Rate limiting
- Helmet security

### Directory Structure
```
src/
├── server.ts              # Server entry
├── app.ts                 # Express app
├── routes/                # API routes
│   ├── auth.ts
│   └── users.ts
├── controllers/           # Route controllers
├── middleware/            # Custom middleware
├── services/              # Business logic
├── models/                # Data models
├── utils/                 # Utilities
└── types/                 # TypeScript types
```

### Usage
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Database migrations
npm run migrate

# Generate Prisma client
npm run generate
```

## React + Vite Template

### Features
- Vite for fast builds
- React 18
- TypeScript
- React Router
- Tailwind CSS
- Vitest + Testing Library
- ESLint & Prettier
- Hot module replacement

### Directory Structure
```
src/
├── main.tsx              # App entry
├── App.tsx               # Root component
├── routes/               # Route components
├── components/           # Reusable components
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── types/                # TypeScript types
└── styles/               # Global styles
```

## Environment Variables

Each template includes `.env.example`:

```bash
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Integrations
STRIPE_SECRET_KEY=...
SENDGRID_API_KEY=...
```

## Configuration Files

### TypeScript Config
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ESLint Config
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Prettier Config
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

## Scripts

Common package.json scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

## Database Setup

### Prisma Schema Example
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Migrations
```bash
# Create migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy

# Generate client
npx prisma generate
```

## Testing Setup

### Vitest Config
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts'
  }
})
```

### Test Example
```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders hello world', () => {
    render(<App />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

## Deployment

### Vercel (Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## Best Practices

1. **Follow the structure** - Don't fight the template
2. **Update dependencies** - Keep packages up to date
3. **Environment variables** - Never commit secrets
4. **Type safety** - Use TypeScript everywhere
5. **Code quality** - Run linters and formatters
6. **Testing** - Write tests as you build
7. **Documentation** - Update README for your project

## Customization

### Adding Features
1. Install dependencies
2. Add configuration
3. Create necessary files
4. Update documentation
5. Test thoroughly

### Removing Features
1. Uninstall dependencies
2. Remove configuration
3. Delete related files
4. Update imports
5. Test that nothing breaks

## Template Maintenance

Templates are regularly updated with:
- Latest framework versions
- Security patches
- New best practices
- Community feedback
- Bug fixes

## Contributing

When adding templates:
1. Follow existing patterns
2. Include comprehensive README
3. Add .env.example
4. Configure linting/formatting
5. Include basic tests
6. Document all scripts
7. Keep it minimal (add what's needed)

## Template Checklist

- [ ] README with setup instructions
- [ ] package.json with all scripts
- [ ] TypeScript configured
- [ ] ESLint & Prettier configured
- [ ] .env.example with all variables
- [ ] .gitignore configured
- [ ] Basic folder structure
- [ ] Example components/routes
- [ ] Testing setup
- [ ] Build script working
- [ ] Development script working

---

For more examples and patterns, see the [`examples/`](../examples/) directory.
