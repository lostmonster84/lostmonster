# BulletProof — MAPX Application Map

> Every route, every click, every database touch, every action.

---

## Project Structure

```
bulletproof/
├── apps/
│   └── web/                        # Single Next.js app
│       ├── src/
│       │   ├── app/
│       │   │   ├── (marketing)/    # Public pages (landing, pricing)
│       │   │   ├── (auth)/         # Login, signup, magic link
│       │   │   ├── (dashboard)/    # Protected app (reports, reviewers, settings)
│       │   │   └── api/            # API routes
│       │   ├── components/
│       │   │   ├── ui/             # Base components (buttons, inputs, cards)
│       │   │   ├── report/         # Report upload, review display
│       │   │   ├── reviewer/       # Reviewer cards, persona display
│       │   │   ├── triage/         # Feedback triage, response drafting
│       │   │   └── layout/         # Header, sidebar, navigation
│       │   ├── lib/
│       │   │   ├── db/             # Database client, queries
│       │   │   ├── ai/             # Claude API integration, prompts
│       │   │   ├── email/          # Email OAuth, scanning, parsing
│       │   │   ├── auth/           # Session management, magic links
│       │   │   └── utils/          # Helpers
│       │   └── types/              # TypeScript interfaces
│       └── public/
├── packages/
│   └── shared/                     # If needed later (shared with other labs)
├── docs/
│   ├── CONCEPT.md
│   ├── PROTOCOL.md
│   ├── PRD.md
│   ├── GAFFER-REVIEW.md
│   ├── MARKET.md
│   ├── EMAIL-INTEGRATION.md
│   ├── MAPX.md                     # This file
│   └── TECHSTACK.md
└── scripts/
    └── migrations/                 # Database migrations
```

---

## Routes Map

### Marketing (Public)

| Route | File | Purpose |
|-------|------|---------|
| `/` | (marketing)/page.tsx | Landing page — hero, problem statement, how it works, CTA |
| `/pricing` | (marketing)/pricing/page.tsx | Pricing tiers (free, individual, pay-as-you-go) |
| `/how-it-works` | (marketing)/how-it-works/page.tsx | Detailed walkthrough with examples |
| `/about` | (marketing)/about/page.tsx | Who built this and why |

### Auth (Public)

| Route | File | Purpose |
|-------|------|---------|
| `/login` | (auth)/login/page.tsx | Email input → magic link sent |
| `/auth/verify` | (auth)/verify/page.tsx | Magic link callback, session creation |
| `/try` | (auth)/try/page.tsx | **No-signup first review** — paste and go (NIGELX condition) |

### Dashboard (Protected)

| Route | File | Purpose | Auth |
|-------|------|---------|------|
| `/dashboard` | (dashboard)/page.tsx | Overview — recent reports, reviewer summary, quick actions | Required |
| `/dashboard/review` | (dashboard)/review/page.tsx | **Mode 1: Pre-Review** — paste/upload report, select reviewers, run analysis | Required |
| `/dashboard/review/[id]` | (dashboard)/review/[id]/page.tsx | Review results — per-reviewer flags, suggested fixes, harden actions | Required |
| `/dashboard/triage` | (dashboard)/triage/page.tsx | **Mode 2: Post-Triage** — paste feedback, get triage + draft responses | Required |
| `/dashboard/triage/[id]` | (dashboard)/triage/[id]/page.tsx | Triage results — predicted vs new vs noise, responses | Required |
| `/dashboard/reviewers` | (dashboard)/reviewers/page.tsx | All reviewer personas — list, AI scores, last active | Required |
| `/dashboard/reviewers/[id]` | (dashboard)/reviewers/[id]/page.tsx | Reviewer detail — persona, AI detection, "real voice", history | Required |
| `/dashboard/reviewers/new` | (dashboard)/reviewers/new/page.tsx | Add reviewer manually (name, role, notes) | Required |
| `/dashboard/history` | (dashboard)/history/page.tsx | All past reports and triages | Required |
| `/dashboard/profile` | (dashboard)/profile/page.tsx | User profile — name, role, industry, CV, expertise | Required |
| `/dashboard/settings` | (dashboard)/settings/page.tsx | Account, email connect, notifications, data retention | Required |
| `/dashboard/connect-email` | (dashboard)/connect-email/page.tsx | Email OAuth flow — Google/Microsoft, reviewer auto-discovery | Required |

### API Routes

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `/api/health` | GET | Health check | Public |
| `/api/auth/magic-link` | POST | Send magic link email | Public |
| `/api/auth/verify` | GET | Verify magic link token | Public |
| `/api/auth/session` | GET | Get current session | Public |
| `/api/auth/logout` | POST | Destroy session | Required |
| `/api/try` | POST | Free no-signup review (rate limited) | Public |
| `/api/reports` | GET, POST | List/create reports | Required |
| `/api/reports/[id]` | GET, DELETE | Get/delete report | Required |
| `/api/reports/[id]/review` | POST | Run pre-review analysis | Required |
| `/api/reports/[id]/review` | GET | Get review results | Required |
| `/api/triage` | POST | Submit feedback for triage | Required |
| `/api/triage/[id]` | GET | Get triage results | Required |
| `/api/triage/[id]/respond` | POST | Generate response drafts | Required |
| `/api/reviewers` | GET, POST | List/create reviewers | Required |
| `/api/reviewers/[id]` | GET, PUT, DELETE | Reviewer CRUD | Required |
| `/api/reviewers/[id]/ai-score` | GET | Get AI detection analysis | Required |
| `/api/profile` | GET, PUT | User profile | Required |
| `/api/email/connect` | POST | Initiate email OAuth | Required |
| `/api/email/callback` | GET | OAuth callback | Required |
| `/api/email/scan` | POST | Trigger email scan for reviewers | Required |
| `/api/email/contacts` | GET | Get discovered contacts | Required |
| `/api/webhooks/stripe` | POST | Stripe payment webhooks | Webhook |

---

## Page Maps

### `/try` — No-Signup First Review (Critical Path)

> The most important page. First impression. Value before investment.

**Navigation IN:**
| Source | Element | Route |
|--------|---------|-------|
| `/` (landing) | "Try it free" CTA | `/try` |
| `/pricing` | "Try free first" | `/try` |
| Direct link | Shared by another user | `/try` |

**Page Sections:**
```
┌─────────────────────────────────────────┐
│  BulletProof                            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Paste your report here            │  │
│  │                                   │  │
│  │ [Large text area]                 │  │
│  │                                   │  │
│  │                    or Upload PDF ▲ │  │
│  └───────────────────────────────────┘  │
│                                         │
│  [ Check My Report ]                    │
│                                         │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                         │
│  RESULTS (streams in)                   │
│                                         │
│  ⚠ LIKELY FLAGS                         │
│  ├── Para 4: No risk assessment...      │
│  ├── Para 7: Cost estimate missing...   │
│  └── Para 12: Timeline doesn't...       │
│                                         │
│  ✓ PROBABLY FINE                        │
│  ├── Methodology section                │
│  └── Scope definition                   │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Want per-reviewer analysis?       │  │
│  │ [ Sign up free ]                  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**API Calls:**
| Endpoint | Method | Trigger | Request | Response |
|----------|--------|---------|---------|----------|
| `/api/try` | POST | "Check My Report" click | `{ content: string }` | Streamed review results |

**State:**
| State | Type | Purpose |
|-------|------|---------|
| reportContent | Local | Text area input |
| isAnalysing | Local | Loading state |
| results | Local | Streamed review flags |

---

### `/dashboard/review` — Pre-Review (Mode 1)

**Navigation IN:**
| Source | Element |
|--------|---------|
| `/dashboard` | "New Review" button |
| Sidebar | "Review" nav item |

**Page Sections:**
```
┌─────────────────────────────────────────┐
│  Sidebar │  New Review                  │
│          │                              │
│  Dashboard│  ┌────────────────────────┐  │
│  Review ●│  │ Paste or upload report │  │
│  Triage  │  │                        │  │
│  Reviewers│ │ [Large text area]      │  │
│  History │  │                        │  │
│  Profile │  │             Upload PDF ▲│  │
│  Settings│  └────────────────────────┘  │
│          │                              │
│          │  Who's this going to?        │
│          │  ☑ Sarah Chen (H&S)          │
│          │  ☑ David Morris (Commercial) │
│          │  ☐ Jane Park (Compliance)    │
│          │  ☐ Tom Reid (Client)         │
│          │  + Add reviewer              │
│          │                              │
│          │  [ Run Review ]              │
└─────────────────────────────────────────┘
```

**API Calls:**
| Endpoint | Method | Trigger | Request |
|----------|--------|---------|---------|
| `/api/reviewers` | GET | Page load | — |
| `/api/reports` | POST | "Run Review" | `{ content, file?, reviewerIds[] }` |
| `/api/reports/[id]/review` | POST | After report created | `{ reportId }` |

**Navigation OUT:**
| Element | Destination |
|---------|-------------|
| "Run Review" (success) | `/dashboard/review/[id]` |

---

### `/dashboard/review/[id]` — Review Results

**Page Sections:**
```
┌──────────────────────────────────────────────┐
│  Sidebar │  Review Results                   │
│          │                                    │
│          │  ┌──────────────┐ ┌─────────────┐ │
│          │  │ Sarah Chen   │ │ David Morris│ │
│          │  │ H&S Lead     │ │ Commercial  │ │
│          │  │ AI: 12%      │ │ AI: 87% ⚠  │ │
│          │  └──────────────┘ └─────────────┘ │
│          │                                    │
│          │  ── Sarah Chen ──────────────────  │
│          │                                    │
│          │  ⚠ WILL LIKELY FLAG (3)            │
│          │                                    │
│          │  Para 4: No PPE mentioned          │
│          │  Severity: High                    │
│          │  Suggested fix: "Add reference to  │
│          │  PPE requirements per CDM 2015..." │
│          │  [ Fix It ] [ Dismiss ] [ Note It ]│
│          │                                    │
│          │  Para 7: No risk assessment...     │
│          │  ...                               │
│          │                                    │
│          │  ✓ PROBABLY FINE (4)               │
│          │  ├── Methodology section            │
│          │  ├── Timeline                       │
│          │  └── Resource allocation             │
│          │                                    │
│          │  [ Download Hardened Report ]       │
│          │  [ Send Original + Keep Notes ]     │
└──────────────────────────────────────────────┘
```

---

### `/dashboard/reviewers/[id]` — Reviewer Intelligence

**Page Sections:**
```
┌──────────────────────────────────────────────┐
│  Sidebar │  David Morris                     │
│          │  Commercial Director               │
│          │                                    │
│          │  AI Usage: 87% ████████░░ HIGH     │
│          │  Style changed: ~March 2025        │
│          │                                    │
│          │  ── Their Real Voice ────────────  │
│          │                                    │
│          │  BEFORE (pre-March 2025):          │
│          │  "Couple of things mate - where's  │
│          │  the cost breakdown? Client will   │
│          │  ask. Cheers, Dave"                │
│          │                                    │
│          │  AFTER (post-March 2025):          │
│          │  "Thank you for the comprehensive  │
│          │  report. I have identified several │
│          │  areas that may benefit from       │
│          │  further consideration..."         │
│          │                                    │
│          │  ── AI Detection Signals ────────  │
│          │  • Em dash usage: 0% → 12 per email│
│          │  • Avg length: 45 words → 320 words│
│          │  • Points raised: 2-3 → 10-12     │
│          │  • Response time: 2.4 days → 4 hrs │
│          │  • Vocabulary: Trade → Academic     │
│          │  • Sign-off: "Cheers Dave" → "Best │
│          │    regards, David"                 │
│          │                                    │
│          │  ── What They Genuinely Care About │
│          │  • Cost estimates (always)          │
│          │  • Procurement timelines (always)   │
│          │  • Budget approval (frequent)       │
│          │                                    │
│          │  ── AI-Added Topics ──────────────  │
│          │  • H&S (never flagged before)       │
│          │  • Methodology (never flagged)      │
│          │  • Compliance (never flagged)        │
└──────────────────────────────────────────────┘
```

---

## Database Schema

### Tables

#### users
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| email | text | Login email (unique) |
| name | text | Full name |
| role | text | Job title |
| industry | text | Engineering, legal, medical, etc. |
| specialism | text | Structural, electrical, mechanical, etc. |
| experience_years | integer | Years in field |
| cv_url | text | Uploaded CV path (nullable) |
| expertise_summary | text | AI-extracted expertise from CV |
| plan | text | free / individual / payg |
| stripe_customer_id | text | Stripe reference (nullable) |
| created_at | timestamptz | Account creation |

#### reviewers
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| name | text | Reviewer's full name |
| email | text | Their email (for matching) |
| role | text | Job title |
| organisation | text | Company name |
| relationship | text | line-manager / client / regulator / peer |
| linkedin_url | text | Public profile (nullable) |
| manual_notes | text | "What do they typically pick you up on?" |
| persona_summary | text | AI-built persona description |
| communication_style | jsonb | Extracted patterns (formality, length, vocabulary) |
| ai_score | integer | 0-100 AI usage confidence |
| ai_style_changed_at | date | Estimated date AI usage began (nullable) |
| baseline_snapshot | jsonb | Pre-AI communication patterns |
| topics_genuine | text[] | What they flagged before AI |
| topics_ai_added | text[] | New topics appearing after style shift |
| email_source | boolean | Built from email scan or manual |
| created_at | timestamptz | |
| updated_at | timestamptz | |

#### reports
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| title | text | Auto-generated or user-set |
| content | text | Report text content |
| file_url | text | Uploaded file path (nullable) |
| status | text | draft / reviewing / reviewed |
| created_at | timestamptz | |

#### reviews
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| report_id | uuid | FK → reports |
| reviewer_id | uuid | FK → reviewers (nullable for generic review) |
| flags | jsonb | Array of flagged items (paragraph, issue, severity, suggestion) |
| fine_items | jsonb | Array of items deemed acceptable |
| confidence | integer | Overall confidence score 0-100 |
| status | text | pending / complete |
| created_at | timestamptz | |

#### review_actions
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| review_id | uuid | FK → reviews |
| flag_index | integer | Which flag this action relates to |
| action | text | fix / dismiss / note |
| user_response | text | Custom text if user modified the suggestion |
| created_at | timestamptz | |

#### triages
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| report_id | uuid | FK → reports (nullable, can link to original review) |
| feedback_content | text | Pasted feedback from reviewer |
| reviewer_id | uuid | FK → reviewers (nullable) |
| results | jsonb | Triage output: predicted / new / noise arrays |
| created_at | timestamptz | |

#### triage_responses
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| triage_id | uuid | FK → triages |
| point_index | integer | Which triage point |
| category | text | predicted / new / noise |
| draft_response | text | AI-generated response |
| user_edited | text | User's final version (nullable) |
| sent | boolean | Did user use this response? |
| created_at | timestamptz | |

#### email_connections
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| provider | text | google / microsoft |
| access_token | text | Encrypted OAuth token |
| refresh_token | text | Encrypted refresh token |
| email_address | text | Connected email |
| last_scan_at | timestamptz | Last email scan timestamp |
| status | text | active / expired / revoked |
| created_at | timestamptz | |

#### free_tries
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| ip_hash | text | Hashed IP for rate limiting |
| fingerprint | text | Browser fingerprint (nullable) |
| used_at | timestamptz | When the free try was used |

### Table Relationships

```
users
├── reviewers (1:many)
├── reports (1:many)
│   ├── reviews (1:many)
│   │   └── review_actions (1:many)
│   └── triages (1:many)
│       └── triage_responses (1:many)
└── email_connections (1:many)
```

### Page → Table Access

| Table | Read By | Write By |
|-------|---------|----------|
| users | /dashboard/*, /api/profile | /api/auth/*, /api/profile |
| reviewers | /dashboard/review, /dashboard/reviewers | /api/reviewers, /api/email/scan |
| reports | /dashboard/review, /dashboard/history | /api/reports, /api/try |
| reviews | /dashboard/review/[id] | /api/reports/[id]/review |
| review_actions | /dashboard/review/[id] | /api/reports/[id]/review (user actions) |
| triages | /dashboard/triage/[id], /dashboard/history | /api/triage |
| triage_responses | /dashboard/triage/[id] | /api/triage/[id]/respond |
| email_connections | /dashboard/settings | /api/email/connect |
| free_tries | — | /api/try |

---

## Navigation Map

### Marketing (Public)

```
Header: Logo | How It Works | Pricing | [Try Free] | [Login]
Footer: About | Privacy | Terms
```

### Dashboard (Protected)

```
Sidebar:
├── Dashboard (home icon)
├── Review (shield icon) ← Mode 1
├── Triage (inbox icon) ← Mode 2
├── Reviewers (users icon)
├── History (clock icon)
├── ──────────
├── Profile (user icon)
└── Settings (gear icon)
```

---

## Component Graph

### Shared UI
| Component | Purpose |
|-----------|---------|
| Button | Primary, secondary, ghost variants |
| Input | Text, email, with labels |
| TextArea | Large input for report pasting |
| Card | Container with border, glassmorphism optional |
| Badge | Status badges (severity, AI score, category) |
| FileUpload | Drag-and-drop PDF/Word upload |
| StreamingText | Displays AI response as it streams |
| Skeleton | Loading placeholders |

### Report Components
| Component | Purpose |
|-----------|---------|
| ReportInput | Text area + file upload combo |
| ReviewerSelector | Checkbox list of reviewers with AI scores |
| FlagCard | Single flag display with severity, suggestion, actions |
| FlagList | Grouped list of flags (likely / fine) |
| ActionButtons | Fix It / Dismiss / Note It |
| ConfidenceMeter | Visual confidence score bar |

### Reviewer Components
| Component | Purpose |
|-----------|---------|
| ReviewerCard | Summary card (name, role, AI score) |
| AIScoreBadge | Colour-coded AI usage indicator |
| RealVoiceComparison | Before/after email style display |
| AISignalList | List of detection signals with values |
| TopicList | Genuine vs AI-added topics |
| ReviewerTimeline | When style changed, visual history |

### Triage Components
| Component | Purpose |
|-----------|---------|
| FeedbackInput | Paste feedback text area |
| TriageResult | Categorised output (predicted / new / noise) |
| ResponseDraft | Editable draft response per point |
| CategoryBadge | Predicted / New / AI Noise labels |
| CredibilityIndicator | Based on reviewer's AI score |

### Layout Components
| Component | Purpose |
|-----------|---------|
| MarketingHeader | Public site header with CTA |
| DashboardSidebar | Protected app navigation |
| PageHeader | Title + breadcrumbs + actions |

---

## External Integrations

| Service | Purpose | Routes |
|---------|---------|--------|
| **Claude API** (Anthropic) | Report analysis, persona simulation, triage, response drafting, AI detection | /api/reports/[id]/review, /api/triage, /api/try |
| **Google Gmail API** | Email OAuth + scanning | /api/email/connect, /api/email/scan |
| **Microsoft Graph API** | Email OAuth + scanning | /api/email/connect, /api/email/scan |
| **Stripe** | Subscription billing | /api/webhooks/stripe, /dashboard/settings |
| **Resend** | Magic link emails, notifications | /api/auth/magic-link |
| **Cloudflare R2** | File storage (uploaded reports, CVs) | /api/reports, /api/profile |

---

## MVP Checklist (V1 Scope)

- [ ] Landing page with clear value prop
- [ ] `/try` — no-signup first review (paste → results)
- [ ] Magic link auth (email, no password)
- [ ] `/dashboard/review` — paste report, run generic analysis
- [ ] `/dashboard/review/[id]` — display flags with severity + suggestions
- [ ] `/dashboard/triage` — paste feedback, get categorised triage
- [ ] `/dashboard/triage/[id]` — display triage with draft responses
- [ ] Basic user profile (name, role, industry)
- [ ] Report history
- [ ] Stripe integration for paid tier
- [ ] Rate limiting on `/api/try`

### NOT in V1
- [ ] Email connect / auto-discovery
- [ ] Reviewer personas
- [ ] Per-reviewer simulation
- [ ] AI detection
- [ ] LinkedIn scraping
- [ ] CV upload + expertise extraction
- [ ] Prediction tracking
