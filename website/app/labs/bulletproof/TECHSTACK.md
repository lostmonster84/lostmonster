# BulletProof — Tech Stack

> What we're building with and why.

---

## Stack Overview

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15+ (App Router) | SSR for marketing, streaming for AI responses, proven stack |
| **Language** | TypeScript (strict) | Type safety, better DX, catches bugs early |
| **Styling** | Tailwind CSS 4 | Rapid UI development, consistent design |
| **AI** | Claude API (Anthropic) | Best at nuanced document analysis, already used in Evidis |
| **Database** | PostgreSQL (Neon) | Relational data, serverless scaling, JSON support for flexible schemas |
| **ORM** | Drizzle | Type-safe, lightweight, good with Neon |
| **Auth** | Custom magic link (session-based) | Lowest friction for non-technical users. No passwords. |
| **Email** | Resend | Magic links, notifications. Simple API. |
| **Storage** | Cloudflare R2 | Uploaded reports and CVs. Cheap, S3-compatible. |
| **Payments** | Stripe | Subscriptions + one-off charges (pay-as-you-go) |
| **Hosting** | Railway | Simple deploy, background workers, proven with Evidis |
| **Email OAuth** | Google Gmail API / Microsoft Graph | Read-only access for reviewer auto-discovery |
| **Package Manager** | pnpm | Fast, strict, consistent with other projects |

---

## Why These Choices

### Next.js 15+ (App Router)
- Marketing pages need SSR for SEO
- Dashboard pages use streaming for AI responses (flags appear as they're found)
- API routes built-in (no separate backend)
- James knows this stack cold from Evidis, Lost Monster, and other projects

### Claude API (Anthropic)
- Already integrated in Evidis — patterns are established
- Superior at document analysis and nuanced reasoning
- Can handle persona simulation (role-based critique)
- Streaming support for real-time flag display
- Long context window for full report analysis

### PostgreSQL (Neon)
- Reviewer personas need relational data (user → reviewers → reviews)
- JSONB columns for flexible flag storage and communication patterns
- Neon gives serverless scaling without managing infra
- Proven in Evidis stack

### Custom Auth (Magic Links)
- **Critical for target user.** A 65-year-old engineer will NOT remember a password. Will NOT use OAuth with Google/GitHub.
- Magic link flow: enter email → click link in inbox → logged in
- Session-based (httpOnly cookies), not JWT
- Zero friction, zero password resets, zero forgotten credentials

### Drizzle ORM
- Type-safe queries — catches schema mismatches at build time
- Lightweight compared to Prisma
- Good migration tooling
- Works well with Neon's serverless driver

### Cloudflare R2
- S3-compatible object storage
- Cheap for file storage (uploaded PDFs, CVs)
- Already used in Evidis (evidis-emails, evidis-evidence buckets)
- No egress fees

### Railway
- Single platform for web app + background workers
- Easy environment variables
- Auto-deploy from git
- Proven with Evidis (4 services running)
- PostgreSQL available if needed as fallback to Neon

### Resend
- Simple email API for magic links and notifications
- Good deliverability
- React email templates
- Already used in Evidis

### Stripe
- Subscriptions for monthly plan
- One-off charges for pay-as-you-go
- Customer portal for self-service billing
- Webhooks for plan changes

---

## AI Architecture

### Prompt Strategy

BulletProof's AI quality lives and dies on prompt engineering. Three core prompt types:

#### 1. Pre-Review Analysis
```
System: You are a panel of experienced professional reviewers.
Analyse this report and identify what a reviewer would flag.

For each flag:
- Cite the specific paragraph or section
- Explain what the concern is
- Rate severity: critical / moderate / minor
- Suggest specific language to fix it
- Rate confidence: how likely a real reviewer raises this

Be conservative. Only flag genuine issues. Generic AI noise
(e.g. "consider adding more context") is worthless.
Do NOT flag things just to have a long list.
```

#### 2. Persona-Specific Review (V2)
```
System: You are {reviewer_name}, a {reviewer_role} at {org}.

Based on their communication patterns:
- They care most about: {genuine_topics}
- Their feedback style is: {communication_style}
- They typically raise {avg_points} points per review
- Their AI usage score is: {ai_score}%

Review this report from THEIR perspective only.
Only flag what THIS person would realistically flag
based on their role and history.
```

#### 3. Post-Triage
```
System: Analyse this feedback against the original report.

For each point raised:
- Categorise: PREDICTED (we flagged this) / NEW (valid, we missed it) / NOISE (AI-generated, not substantive)
- For NOISE: explain WHY it's noise (generic phrasing, outside reviewer's expertise, etc.)
- For PREDICTED and NEW: draft a professional response

The user is a {role} with {years} years experience in {specialism}.
Their responses should reflect this authority.
```

#### 4. AI Detection (V3)
```
System: Compare this reviewer's recent feedback against their
historical baseline.

Baseline patterns: {baseline_snapshot}
Recent feedback: {latest_feedback}

Analyse for:
- Vocabulary shift (em dashes, semicolons, formal phrasing)
- Structure change (numbered lists, consistent paragraph length)
- Scope creep (topics outside their expertise)
- Volume change (average points raised)
- Response time change
- Sign-off change

Output an AI confidence score (0-100) with evidence for each signal.
```

### Streaming
All AI responses stream to the frontend. Flags appear one at a time as they're generated. This is critical for UX — a 30-second blank page feels broken; progressive results feel fast.

### Rate Limiting
- `/api/try` (free, no auth): 1 per IP per day
- Authenticated endpoints: 20 reviews per day (free tier), unlimited (paid)
- Claude API costs: ~$0.05-0.15 per report review (depends on length)

---

## Email Integration Architecture (V2/V3)

### OAuth Flow
```
User clicks "Connect Email"
→ Redirect to Google/Microsoft consent screen
→ Request read-only scope (gmail.readonly / Mail.Read)
→ Callback with auth code
→ Exchange for access + refresh tokens
→ Store encrypted tokens in email_connections table
→ Trigger background scan job
```

### Email Scanning Pipeline
```
1. FETCH — Pull emails from last 12 months (paginated, background job)
2. GROUP — Group by sender domain → identify colleagues
3. EXTRACT — Per contact: name, role (from signature), communication patterns
4. ANALYSE — Claude API: build persona from email corpus
5. DETECT — Compare recent vs historical patterns for AI usage
6. STORE — Save reviewer persona, discard raw email content
7. PRESENT — Show discovered contacts for user confirmation
```

### Background Processing
Email scanning runs as a background job (Railway worker or async task):
- Initial scan: 5-10 minutes depending on inbox size
- Periodic refresh: weekly, checking for new patterns
- User notified when scan complete

---

## Infrastructure Diagram

```
                    ┌─────────────┐
                    │   Browser   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Cloudflare │ CDN + DNS
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Railway   │
                    │  ┌────────┐ │
                    │  │ Web App│ │ Next.js
                    │  └───┬────┘ │
                    │      │      │
                    │  ┌───▼────┐ │
                    │  │ Worker │ │ Email scanning (V2)
                    │  └────────┘ │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌──▼───┐ ┌──────▼──────┐
       │  Neon (PG)  │ │  R2  │ │ Claude API  │
       │  Database   │ │ Files│ │  Anthropic   │
       └─────────────┘ └──────┘ └─────────────┘
              │
       ┌──────┴──────────────┐
       │                     │
┌──────▼──────┐  ┌───────────▼──┐
│   Stripe    │  │    Resend    │
│  Payments   │  │    Email     │
└─────────────┘  └──────────────┘
```

---

## Development Setup

```bash
# Clone and install
git clone <repo>
cd bulletproof
pnpm install

# Environment
cp .env.example .env.local
# Fill in: DATABASE_URL, ANTHROPIC_API_KEY, RESEND_API_KEY, STRIPE_SECRET_KEY

# Database
pnpm db:push        # Push schema to Neon
pnpm db:migrate     # Run migrations

# Development
pnpm dev            # Starts on port 3000

# Production
pnpm build
pnpm start
```

---

## Cost Estimates (Monthly)

| Service | Free Tier | At Scale (500 users) |
|---------|-----------|---------------------|
| Railway (Web) | $5/month | $20/month |
| Railway (Worker) | — | $10/month |
| Neon (PostgreSQL) | Free tier | $19/month |
| Cloudflare R2 | Free (10GB) | $5/month |
| Claude API | ~$50 (1000 reviews) | ~$250 (5000 reviews) |
| Resend | Free (100/day) | $20/month |
| Stripe | 2.9% + 30p per txn | 2.9% + 30p per txn |
| **Total** | **~$55/month** | **~$325/month** |

At 500 users × £15/month = £7,500 MRR. Costs are ~£270. Healthy margins.

---

## Reusable from Evidis

| Component | Evidis Location | BulletProof Use |
|-----------|-----------------|-----------------|
| Auth (magic link + sessions) | `packages/shared/auth` | Same pattern, new implementation |
| Email processing | `apps/workers/email-worker` | Adapt for OAuth reading vs inbound |
| PDF extraction | `apps/workers/pdf-worker` | Report upload parsing |
| Claude API integration | `packages/shared/ai` | Same SDK, new prompts |
| R2 storage | `packages/shared/storage` | Same pattern |
| Resend email | `packages/shared/email` | Same pattern |
| UI components | `packages/ui` | Adapt design system |
