# Integrations

Pre-built integrations and implementation guides for popular third-party services.

## Overview

This directory contains ready-to-use integrations, API wrappers, SDKs, and documentation for connecting with external services commonly used in web development.

## Available Integrations

### Workflow & Project Management
- **[Trello Workflow](./workflow/trello-workflow-guide.md)** - Complete Trello integration with MCP, API scripts, and Fix → Commit → Trello workflow (Production-tested)

## Directory Structure

```
integrations/
├── workflow/          # Workflow and project management
├── payment/           # Payment processors
├── auth/              # Authentication providers
├── cms/               # Content management systems
├── analytics/         # Analytics and tracking
└── communication/     # Email, SMS, notifications
```

## Payment Integrations

**Location:** [`payment/`](./payment/)

### Stripe
- Payment processing
- Subscriptions
- Webhooks
- Customer portal
- Checkout sessions

### PayPal
- PayPal checkout
- Subscriptions
- Invoicing

### Square
- Point of sale
- Payment processing
- Inventory

## Authentication Integrations

**Location:** [`auth/`](./auth/)

### Auth0
- Social login
- Multi-factor authentication
- User management
- Role-based access

### Firebase Auth
- Email/password
- Social providers
- Phone authentication
- Custom tokens

### Clerk
- User management
- Social authentication
- Organizations
- Session management

### NextAuth.js
- Multiple providers
- JWT sessions
- Database sessions
- OAuth

## CMS Integrations

**Location:** [`cms/`](./cms/)

### Contentful
- Content modeling
- GraphQL API
- Content delivery
- Asset management

### Sanity
- Structured content
- Real-time collaboration
- GROQ queries
- Studio customization

### Strapi
- Headless CMS
- REST & GraphQL
- Admin panel
- Content types

### WordPress (Headless)
- REST API
- WPGraphQL
- Custom post types
- ACF fields

## Analytics Integrations

**Location:** [`analytics/`](./analytics/)

### Google Analytics 4
- Event tracking
- Custom dimensions
- E-commerce tracking
- User properties

### Mixpanel
- Event analytics
- User tracking
- Funnels
- Retention

### PostHog
- Product analytics
- Feature flags
- Session replay
- A/B testing

### Segment
- Customer data platform
- Multiple destinations
- Event tracking
- User profiles

## Communication Integrations

**Location:** [`communication/`](./communication/)

### Email Services
- **SendGrid** - Transactional email
- **Resend** - Developer email
- **Mailgun** - Email automation
- **Postmark** - Transactional email

### SMS Services
- **Twilio** - SMS, voice, video
- **Vonage (Nexmo)** - SMS API
- **AWS SNS** - Notifications

### Push Notifications
- **Firebase Cloud Messaging** - Mobile push
- **OneSignal** - Multi-platform notifications
- **Pusher** - Real-time messaging

## Integration Template

Each integration includes:

```
ServiceName/
├── README.md              # Setup guide
├── client.ts              # API client
├── types.ts               # TypeScript types
├── examples/              # Usage examples
│   ├── basic.ts
│   └── advanced.ts
├── webhooks/              # Webhook handlers
│   └── handler.ts
├── .env.example           # Environment variables
└── tests/                 # Integration tests
    └── client.test.ts
```

## Common Patterns

### Environment Variables

```bash
# .env.example
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Client Setup

```typescript
// client.ts
import Stripe from 'stripe'

export function createStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
  })
}
```

### Type Definitions

```typescript
// types.ts
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'succeeded' | 'processing' | 'failed'
}

export interface CreatePaymentParams {
  amount: number
  currency: string
  customerId?: string
}
```

### Usage Examples

```typescript
// examples/basic.ts
import { createStripeClient } from '../client'

async function createPayment() {
  const stripe = createStripeClient()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd'
  })

  return paymentIntent
}
```

### Webhook Handlers

```typescript
// webhooks/handler.ts
import { NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function handleStripeWebhook(req: NextRequest) {
  const stripe = createStripeClient()
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment
      break
    case 'payment_intent.payment_failed':
      // Handle failed payment
      break
  }

  return { received: true }
}
```

## Stripe Integration Example

### Setup

```bash
npm install stripe
```

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})
```

### Create Checkout Session

```typescript
// lib/stripe/checkout.ts
export async function createCheckoutSession(
  priceId: string,
  customerId?: string
) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    customer: customerId,
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`
  })
}
```

### Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe/client'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    // Fulfill the purchase
    await fulfillOrder(session)
  }

  return Response.json({ received: true })
}
```

## Auth0 Integration Example

### Setup

```bash
npm install @auth0/nextjs-auth0
```

### Configuration

```typescript
// lib/auth0.ts
import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  scope: 'openid profile email',
  redirectUri: process.env.AUTH0_REDIRECT_URI!,
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI!
})
```

### Protected Routes

```typescript
// app/dashboard/page.tsx
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(async function Dashboard() {
  return <div>Protected Dashboard</div>
})
```

## SendGrid Email Example

### Setup

```bash
npm install @sendgrid/mail
```

### Send Email

```typescript
// lib/sendgrid/email.ts
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string
  subject: string
  html: string
}) {
  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject,
    html
  })
}
```

### Email Templates

```typescript
export const templates = {
  welcome: (name: string) => ({
    subject: `Welcome ${name}!`,
    html: `
      <h1>Welcome to Lost Monster!</h1>
      <p>Hi ${name}, thanks for joining us.</p>
    `
  }),

  resetPassword: (resetLink: string) => ({
    subject: 'Reset Your Password',
    html: `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `
  })
}
```

## Google Analytics 4 Example

### Setup

```bash
npm install react-ga4
```

### Initialize

```typescript
// lib/analytics/ga4.ts
import ReactGA from 'react-ga4'

export function initGA() {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!)
}

export function trackPageView(path: string) {
  ReactGA.send({ hitType: 'pageview', page: path })
}

export function trackEvent(
  category: string,
  action: string,
  label?: string
) {
  ReactGA.event({
    category,
    action,
    label
  })
}
```

### Usage

```typescript
// app/layout.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGA, trackPageView } from '@/lib/analytics/ga4'

export default function Layout({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  return <>{children}</>
}
```

## Best Practices

### Security
- Never commit API keys
- Use environment variables
- Validate webhook signatures
- Use HTTPS for webhooks
- Rotate keys regularly

### Error Handling
```typescript
try {
  const result = await apiCall()
  return result
} catch (error) {
  if (error instanceof StripeError) {
    // Handle Stripe-specific errors
    console.error('Stripe error:', error.message)
  }
  throw error
}
```

### Rate Limiting
```typescript
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '10 s')
})

const { success } = await ratelimit.limit(userId)
if (!success) {
  throw new Error('Rate limit exceeded')
}
```

### Logging
```typescript
import { logger } from '@/lib/logger'

logger.info('Payment processed', {
  amount: 1000,
  currency: 'usd',
  customerId: 'cus_123'
})
```

## Testing

### Mock API Calls
```typescript
import { jest } from '@jest/globals'

jest.mock('stripe', () => ({
  paymentIntents: {
    create: jest.fn().mockResolvedValue({
      id: 'pi_test',
      status: 'succeeded'
    })
  }
}))
```

### Test Webhooks
```typescript
import { testWebhook } from '@/lib/testing/webhooks'

describe('Stripe webhook', () => {
  it('handles successful payment', async () => {
    const event = {
      type: 'payment_intent.succeeded',
      data: { object: { id: 'pi_test' } }
    }

    const response = await testWebhook(event)
    expect(response.received).toBe(true)
  })
})
```

## Documentation Standards

Each integration must include:

1. **README.md** - Setup instructions
2. **Environment variables** - .env.example
3. **TypeScript types** - Full type coverage
4. **Examples** - Basic and advanced usage
5. **Webhook handlers** - If applicable
6. **Error handling** - Proper error handling
7. **Tests** - Integration tests

## Contributing

When adding integrations:
1. Follow the template structure
2. Document all environment variables
3. Include usage examples
4. Add error handling
5. Write tests
6. Update this README
7. Consider security implications

---

For implementation examples, see the [`examples/`](../examples/) directory.
