# PRD — [PROJECT]

> Product Requirements Document. Validated by PRDX (9-round process).
> This is the foundation that worker onboarding reads from.
> Without this, workers ship with generic placeholders.

---

## 1. The Pitch (30 seconds)

_What are you building, in one paragraph? If you can't explain it in 30 seconds, you don't understand it well enough._

---

## 2. Target Users

### Primary User
| Attribute | Value |
|-----------|-------|
| **Who** | _e.g. Adventure-seeking couples, 30-45_ |
| **Pain** | _What problem do they have right now?_ |
| **Goal** | _What do they want to achieve?_ |
| **Context** | _When/where do they use this?_ |

### Secondary User
| Attribute | Value |
|-----------|-------|
| **Who** | _e.g. Business owners managing bookings_ |
| **Pain** | _Their current frustration_ |
| **Goal** | _What they need_ |

### Test Persona
| Attribute | Value |
|-----------|-------|
| **Name** | _e.g. Graduate Grace_ |
| **Age** | _e.g. 21_ |
| **Background** | _e.g. Hospitality management grad, first job, not technical_ |
| **Key trait** | _e.g. If it's not obvious, she closes the tab_ |

---

## 3. Core Features (3-5 max)

| # | Feature | User | Priority | Description |
|---|---------|------|----------|-------------|
| 1 | _e.g. Vehicle search + filter_ | Primary | Must-have | _What it does, why it matters_ |
| 2 | _e.g. Booking enquiry form_ | Primary | Must-have | |
| 3 | _e.g. Admin dashboard_ | Secondary | Must-have | |
| 4 | _e.g. Email notifications_ | Both | Should-have | |
| 5 | | | | |

---

## 4. User Flows

### Flow 1: [Primary User Journey]
```
[Step 1] → [Step 2] → [Step 3] → [Step 4] → [Outcome]
```
_Describe each step. What does the user see? What do they click? What happens?_

### Flow 2: [Secondary User Journey]
```
[Step 1] → [Step 2] → [Step 3] → [Outcome]
```

### Flow 3: [Admin/Management Journey]
```
[Step 1] → [Step 2] → [Step 3] → [Outcome]
```

---

## 5. Entities & Data Model

| Entity | Description | Key Fields | Relationships |
|--------|-------------|-----------|---------------|
| _e.g. Vehicle_ | _Primary content entity_ | _name, type, price, status, images_ | _Has many Bookings_ |
| _e.g. Booking_ | _Transaction entity_ | _dates, status, customer, vehicle_ | _Belongs to Vehicle + Customer_ |
| _e.g. Customer_ | _User entity_ | _name, email, phone_ | _Has many Bookings_ |

---

## 6. Pages & Routes

### Public (Marketing)

| Route | Purpose | Key Components |
|-------|---------|---------------|
| `/` | Homepage | _Hero, featured content, CTAs_ |
| `/about` | About page | |
| `/contact` | Contact form | |
| _add more_ | | |

### App (Authenticated)

| Route | Purpose | Key Components |
|-------|---------|---------------|
| `/dashboard` | Main app view | |
| `/[entity]` | List view | _Table/grid, filters, search_ |
| `/[entity]/[id]` | Detail view | |
| _add more_ | | |

### Admin

| Route | Purpose | Key Components |
|-------|---------|---------------|
| `/admin` | Admin dashboard | |
| _add more_ | | |

---

## 7. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | _e.g. Next.js 15 (App Router)_ | |
| Language | _e.g. TypeScript (strict)_ | |
| Styling | _e.g. Tailwind CSS_ | |
| Database | _e.g. Neon PostgreSQL_ | |
| Auth | _e.g. NextAuth v5_ | |
| Hosting | _e.g. Vercel_ | |
| Email | _e.g. Resend_ | |
| Payments | _e.g. Stripe (or N/A)_ | |

---

## 8. Success Metrics

| Metric | Target | How Measured |
|--------|--------|-------------|
| _e.g. Enquiry form submissions_ | _e.g. 10/week_ | _Form completion tracking_ |
| _e.g. Page load time_ | _e.g. <2s_ | _Lighthouse_ |
| _e.g. Booking conversion rate_ | _e.g. 5%_ | _Analytics_ |

---

## 9. Constraints & Non-Negotiables

- _e.g. Must work on mobile (60%+ of traffic)_
- _e.g. GDPR compliant (EU users)_
- _e.g. No external dependencies for core features_
- _e.g. Must deploy to [hosting provider]_

---

## 10. What This Is NOT

- _e.g. Not a marketplace (single vendor, not multi-vendor)_
- _e.g. Not a booking engine (enquiry form, not live availability)_
- _e.g. Not an app (web only, responsive)_

---

*Validated by PRDX on [DATE]. Run `PRDX: validate` to re-check after changes.*
