# Examples

Real-world implementation examples and use cases for Lost Monster components, integrations, and patterns.

## Overview

This directory contains practical examples showing how to use various parts of the Lost Monster repository in real projects.

## Directory Structure

```
examples/
├── case-studies/          # Real project case studies
└── implementations/       # Implementation examples
```

## Case Studies

**Location:** [`case-studies/`](./case-studies/)

Real-world projects built using Lost Monster resources:

- **E-commerce Platform** - Complete e-commerce implementation
- **SaaS Application** - Multi-tenant SaaS with subscriptions
- **Admin Dashboard** - Data-heavy admin interface
- **Marketing Website** - High-performance marketing site
- **Mobile App** - React Native mobile application

## Implementation Examples

**Location:** [`implementations/`](./implementations/)

Specific implementation examples:

### Authentication
- JWT authentication setup
- OAuth integration
- Multi-factor authentication
- Session management

### Payments
- Stripe checkout flow
- Subscription handling
- Webhook processing
- Payment method management

### Forms
- Complex multi-step forms
- File upload handling
- Form validation patterns
- Dynamic form fields

### Data Tables
- Sortable tables
- Filterable data
- Pagination
- Export functionality

### Real-time Features
- WebSocket integration
- Live notifications
- Real-time chat
- Collaborative editing

## Example Template

Each example includes:

```
ExampleName/
├── README.md              # Implementation guide
├── src/                   # Source code
├── screenshots/           # Visual examples
├── .env.example           # Required environment variables
└── package.json           # Dependencies
```

## Usage

### Running Examples

1. **Navigate to example**
   ```bash
   cd examples/implementations/stripe-checkout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run the example**
   ```bash
   npm run dev
   ```

## Authentication Example

### JWT Authentication with Next.js

**Location:** `implementations/jwt-auth/`

Demonstrates:
- User registration
- Login/logout
- Protected routes
- Token refresh
- Role-based access

**Key Files:**
- `lib/auth.ts` - Authentication logic
- `middleware.ts` - Route protection
- `app/api/auth/` - Auth endpoints
- `components/AuthProvider.tsx` - Auth context

## Stripe Integration Example

### Complete Checkout Flow

**Location:** `implementations/stripe-checkout/`

Demonstrates:
- Create checkout session
- Process payments
- Handle webhooks
- Manage subscriptions
- Customer portal

**Key Files:**
- `lib/stripe.ts` - Stripe client
- `app/api/checkout/` - Checkout endpoint
- `app/api/webhooks/stripe/` - Webhook handler
- `components/PricingTable.tsx` - Pricing UI

## Form Validation Example

### Multi-step Form with Zod

**Location:** `implementations/multi-step-form/`

Demonstrates:
- Step-by-step wizard
- Form state management
- Zod validation
- Progress indicator
- Data persistence

**Key Files:**
- `components/FormWizard.tsx` - Wizard component
- `lib/validation.ts` - Validation schemas
- `hooks/useFormWizard.ts` - Form state hook

## Data Table Example

### Advanced Data Grid

**Location:** `implementations/data-table/`

Demonstrates:
- Server-side pagination
- Column sorting
- Filtering
- Search
- CSV export
- Row selection

**Key Files:**
- `components/DataTable.tsx` - Table component
- `hooks/useTableData.ts` - Data fetching hook
- `lib/table-utils.ts` - Table utilities

## Best Practices

### Code Organization
- Keep examples focused and minimal
- Include only necessary dependencies
- Comment complex logic
- Use TypeScript
- Follow coding standards

### Documentation
- Clear README with setup steps
- Document environment variables
- Include screenshots/GIFs
- List key features
- Explain design decisions

### Testing
- Include basic tests
- Show testing patterns
- Test edge cases

## Contributing Examples

When adding examples:

1. **Choose a topic** - Something useful and reusable
2. **Create minimal example** - Focus on one concept
3. **Document thoroughly** - Clear README and comments
4. **Test it works** - Verify setup instructions
5. **Add screenshots** - Visual documentation
6. **Include .env.example** - Document required variables
7. **Update this README** - Add to the list

## Example Checklist

- [ ] Clear, descriptive name
- [ ] README with setup instructions
- [ ] Working code that runs
- [ ] .env.example file
- [ ] TypeScript with proper types
- [ ] Comments explaining key concepts
- [ ] Screenshots or GIFs (if UI)
- [ ] Minimal dependencies
- [ ] Follows coding standards
- [ ] Added to this README

## Using Examples in Your Projects

Examples are meant to be:
1. **Learning resources** - Understand patterns
2. **Starting points** - Copy and customize
3. **Reference implementations** - See best practices
4. **Testing grounds** - Experiment with ideas

Feel free to copy any example into your project and modify it to fit your needs.

---

Need help with an example? Check the implementation README or review the source code.
