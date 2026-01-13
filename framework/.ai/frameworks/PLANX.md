# PLANX Framework

> **Execution Blueprint - The Deep Planning System**
>
> Contextually-aware planning that creates exhaustive, milestone-based execution documents. Every task broken down until nothing is left to interpretation.

---

## What is PLANX?

**PLANX** transforms any task into a comprehensive execution document with:
- **Milestones** - Major phases of work
- **Todos** - Granular tasks within each milestone
- **Summaries** - Quick description of each todo
- **Detailed Summaries** - Full context, reasoning, and acceptance criteria

**The Rule:** You cannot complete a milestone until every todo is checked off. The document *is* the execution.

---

## Why PLANX Exists

### The CODA → PLANX Pipeline

**CODA and PLANX are designed to work together:**

```
CODA                              PLANX
┌─────────────────────┐           ┌─────────────────────┐
│ WHAT are we         │           │ HOW do we execute   │
│ building?           │    →      │ it step-by-step?    │
│                     │           │                     │
│ • Context           │           │ • Milestones        │
│ • Objective         │           │ • Todos             │
│ • Details           │           │ • Detailed Summaries│
│ • Acceptance        │           │ • Dependencies      │
└─────────────────────┘           └─────────────────────┘
     STRATEGY                         EXECUTION
```

**Typical workflow:**
1. `CODA` - Establish what we're building, why, and acceptance criteria
2. `PLANX` - Break that into exhaustive milestones and todos
3. Execute - Work through the PLANX document, checking off todos

### The Gap It Fills

| Framework | Purpose | Limitation |
|-----------|---------|------------|
| CODA | Strategic planning (Context/Objective) | Doesn't break into executable steps |
| TodoWrite | Tracks tasks during execution | Doesn't capture reasoning or create shareable artifact |
| APEX | Orchestrates frameworks | Assumes we know the steps |

**PLANX sits between "we know what to build" and "we're building it"**

It's the **execution blueprint** - the bridge from strategy to action.

### What Makes PLANX Different

1. **Exhaustive by design** - We don't stop at 5 todos. We break down until atomic.
2. **Context-preserved** - Each todo carries its "why" so nothing is misinterpreted later.
3. **Artifact-first** - The plan becomes a living document we execute against.
4. **Milestone-gated** - Work progresses in logical phases, not random order.
5. **CODA-compatible** - Acceptance criteria from CODA become completion criteria in PLANX.

---

## When to Use PLANX

### Use PLANX For

- **Complex features** - Anything requiring 10+ discrete steps
- **Multi-session work** - Tasks that span multiple conversations
- **Team handoffs** - When someone else might execute part of the plan
- **Critical implementations** - Where missing a step has real consequences
- **Uncertain scope** - When you need to discover all the work upfront
- **Documentation-worthy** - Major features that need a record of decisions

### Skip PLANX For

- **Simple fixes** - Bug fixes, typos, single-file changes
- **Exploratory work** - Research, investigation, learning
- **Quick iterations** - Rapid prototyping where the plan will change
- **Already-planned work** - If CODA already produced detailed steps

---

## The PLANX Document Structure

```markdown
# PLANX: [Feature Name]

> **Status:** In Progress | Complete
> **Created:** [Date]
> **Last Updated:** [Date]
> **Overall Progress:** [X/Y Milestones Complete]

---

## Overview

[2-3 sentence summary of what we're building and why]

---

## Milestone 1: [Name]

> **Status:** Not Started | In Progress | Complete
> **Progress:** [X/Y Todos Complete]

### Why This Milestone
[1-2 sentences on what this milestone achieves and why it comes first/here]

### Todos

#### - [ ] 1.1 [Todo Title]
**Status:** Pending | Complete
**Summary:** [One-line description]
**Detailed Summary:**
- What: [Specific action to take]
- Why: [Reasoning behind this step]
- How: [Technical approach or method]
- Acceptance: [How we know it's done correctly]
- Dependencies: [What must exist before this]
- Files: [Likely files touched, if known]

#### - [ ] 1.2 [Todo Title]
**Status:** Pending | Complete
**Summary:** [One-line description]
**Detailed Summary:**
- What: [...]
- Why: [...]
- How: [...]
- Acceptance: [...]
- Dependencies: [...]
- Files: [...]

[...more todos...]

> **Completion:** When done, change `- [ ]` to `- [x]` AND update Status to "Complete"

---

## Milestone 2: [Name]

[Same structure as Milestone 1]

---

## Milestone N: [Name]

[Same structure]

---

## Completion Criteria

- [ ] All milestones marked complete
- [ ] All todos checked off
- [ ] [Feature-specific acceptance criteria]
- [ ] [Quality requirements]

---

## Notes & Decisions

[Running log of decisions made, questions answered, and context gained during execution]

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| [Date] | Created plan | Initial planning |
| [Date] | [Change] | [Why] |
```

---

## How to Invoke PLANX

### Command

```
PLANX: [feature or task description]
```

### Examples

```
PLANX: implement user authentication with email/password and OAuth
```

```
PLANX: build the RFI inbox system from email receipt to opportunity creation
```

```
PLANX: refactor the evidence matching pipeline for better accuracy
```

### What Happens Next

1. **Context Gathering** - I explore the codebase to understand what exists
2. **Scope Discovery** - I identify all the work required
3. **Milestone Definition** - I group work into logical phases
4. **Todo Breakdown** - I decompose each milestone into atomic tasks
5. **Summary Writing** - I document the what/why/how for each todo
6. **Document Creation** - I produce the PLANX document for your review
7. **Approval** - You review and we iterate until the plan is solid
8. **Execution** - We work through the plan, checking off todos

---

## PLANX Depth Guidelines

### How Deep to Go

**Rule of thumb:** A todo should be completable in a single focused session (15-60 minutes of work).

**Too shallow:**
```
- [ ] Build the authentication system
```

**Too deep:**
```
- [ ] Add import statement for bcrypt on line 3
```

**Just right:**
```
- [ ] Create password hashing utility with bcrypt
  - Summary: Utility function that hashes passwords for storage
  - Detailed Summary:
    - What: Create hashPassword() and verifyPassword() functions
    - Why: Passwords must never be stored in plain text
    - How: Use bcrypt with cost factor 12
    - Acceptance: Can hash a password and verify it matches
    - Dependencies: None (new utility)
    - Files: src/lib/auth/password.ts
```

### Milestone Sizing

**Target:** 3-8 todos per milestone

- **Fewer than 3:** Milestone might be too granular - consider merging with another
- **More than 8:** Milestone might be too broad - consider splitting

### Number of Milestones

**Typical range:** 3-7 milestones for a major feature

- **Fewer than 3:** Might not be complex enough for PLANX (use CODA instead)
- **More than 7:** Might need to break into multiple PLANX documents

---

## The Detailed Summary Fields

Each todo includes a detailed summary with these fields:

### What
The specific action to take. Concrete and unambiguous.

**Bad:** "Set up the database"
**Good:** "Create Supabase migration for opportunities table with columns: id, title, deadline, status, source_email_id"

### Why
The reasoning behind this step. Preserves context for future reference.

**Bad:** "Because we need it"
**Good:** "Opportunities are the core entity that RFIs convert into. This table stores the parsed RFI data for the inbox workflow."

### How
Technical approach or method. Prevents wrong turns.

**Bad:** "Figure it out"
**Good:** "Use Supabase CLI to generate migration, add RLS policies for org-level access, create corresponding TypeScript types"

### Acceptance
How we verify correctness. Makes "done" objective.

**Bad:** "It works"
**Good:** "Migration runs without errors, TypeScript types match schema, can insert/query opportunities via Supabase client"

### Dependencies
What must exist before starting. Prevents blocked work.

**Bad:** [empty]
**Good:** "Requires: Supabase project configured, database connection working, existing organisations table"

### Files
Likely files touched. Helps with code review and navigation.

**Bad:** [empty]
**Good:** "supabase/migrations/YYYYMMDD_create_opportunities.sql, src/types/opportunity.ts, src/lib/supabase/types.ts"

---

## Execution Protocol

### Starting a Milestone

1. Mark milestone as "In Progress"
2. Review all todos in the milestone
3. Identify any blocked todos (missing dependencies)
4. Start with unblocked todos

### Completing a Todo

1. Do the work described in the detailed summary
2. Verify against acceptance criteria
3. **Check the checkbox** `- [x]` on the todo line
4. **Update the Status field** to "Complete"
5. Add any notes or decisions to the Notes section

**IMPORTANT:** Both the checkbox AND the status must be updated. This provides:
- Visual scanning (checkboxes)
- Explicit state tracking (status field)

### Completing a Milestone

1. **Verify all todos are individually checked** - every `- [ ]` must become `- [x]`
2. **Verify all todo statuses say "Complete"**
3. Do a quick review that the milestone's goal is achieved
4. Mark milestone status as "Complete"
5. Update document progress counters (e.g., "Progress: 5/5 Todos Complete")
6. Move to next milestone

**The Rule:** A milestone cannot be marked complete until EVERY todo within it has:
- ✅ Checkbox checked (`- [x]`)
- ✅ Status field updated to "Complete"

### Handling Changes

If the plan needs to change mid-execution:

1. Document the change in the Change Log
2. Add/remove/modify todos as needed
3. Update milestone progress counters
4. Add reasoning to Notes section

---

## PLANX + Other Frameworks

### CODA → PLANX (Recommended Combo)

**This is the primary use case.** Use CODA first for strategic clarity, then PLANX for execution breakdown:

```
Step 1: CODA
┌────────────────────────────────────────┐
│ Context: What exists in the codebase?  │
│ Objective: What are we building? Why?  │
│ Details: Key technical decisions       │
│ Acceptance: How we know it's done      │
└────────────────────────────────────────┘
                    ↓
Step 2: PLANX
┌────────────────────────────────────────┐
│ Take CODA's Details & Acceptance...    │
│ Break into Milestones (phases)         │
│ Break into Todos (atomic tasks)        │
│ Add What/Why/How/Acceptance per todo   │
└────────────────────────────────────────┘
                    ↓
Step 3: Execute
┌────────────────────────────────────────┐
│ Work through PLANX document            │
│ Check off todos as complete            │
│ Complete milestones in order           │
│ Feature done when all checked          │
└────────────────────────────────────────┘
```

**Example:**
```
1. CODA: RFI Inbox System
   → Establishes: email routing, parsing, opportunity creation, inbox UI
   → Acceptance: emails appear in inbox within 5 minutes

2. PLANX: RFI Inbox System
   → Milestone 1: Email Infrastructure (5 todos)
   → Milestone 2: Ingest API (4 todos)
   → Milestone 3: RFI Parsing (5 todos)
   → Milestone 4: Inbox UI (6 todos)
   → Each todo has What/Why/How/Acceptance/Dependencies/Files

3. Execute: Check off todos, complete milestones, ship feature
```

### APEX + PLANX

PLANX can replace or augment Stage 2 (CODA) in APEX with deeper execution planning:

```
APEX with PLANX:
1. RAPID (interpret)
2. CODA (strategic plan)
   └─ PLANX (execution breakdown) ← added depth
3. CRUDX (build backend)
4. AIDA (content)
5. TOUCH (mobile)
6. SOPHIA (quality)
```

### PLANX + AIDA

For content-heavy features, combine PLANX execution with AIDA conversion scoring:

```
PLANX milestones for a landing page:

Milestone 1: Content Strategy
├─ Todo 1.1: Define AIDA structure (Attention/Interest/Desire/Action)
├─ Todo 1.2: Write headline copy (target: Attention 22+/25)
├─ Todo 1.3: Write benefit sections (target: Interest 20+/25)
└─ Todo 1.4: Write social proof (target: Desire 20+/25)

Milestone 2: Implementation
├─ Todo 2.1: Build hero section with headline
├─ Todo 2.2: Build benefits grid
├─ Todo 2.3: Build testimonials section
└─ Todo 2.4: Build CTA section (target: Action 20+/25)

Milestone 3: Quality Gate
├─ Todo 3.1: Run full AIDA score (target: 80+/100)
├─ Todo 3.2: Fix any sections below target
└─ Todo 3.3: Re-score and verify
```

Each todo's acceptance criteria can reference AIDA scores.

### PLANX + SOPHIA

Same pattern for design-heavy work:

```
Milestone 3: Quality Audit
├─ Todo 3.1: Run SOPHIA audit (target: 85+/100)
├─ Todo 3.2: Fix typography issues (if score <13/15)
├─ Todo 3.3: Fix spacing issues (if score <13/15)
├─ Todo 3.4: Fix accessibility issues (if score <8/10)
└─ Todo 3.5: Re-score and verify 85+
```

### PLANX Standalone

For complex work that doesn't need full CODA strategy (when you already know what to build):

```
PLANX: refactor the API layer to use tRPC
```

Use standalone when:
- The "what" is already crystal clear
- You just need to break down the "how"
- It's a technical refactor, not a new feature

---

## Example: PLANX in Action

**Input:**
```
PLANX: implement email-to-opportunity pipeline for RFI inbox
```

**Output:**

```markdown
# PLANX: Email-to-Opportunity Pipeline

> **Status:** In Progress
> **Created:** 2025-01-04
> **Last Updated:** 2025-01-04
> **Overall Progress:** 0/4 Milestones Complete

---

## Overview

Build the pipeline that receives inbound emails at *@askevidis.com, parses RFI content, extracts key fields (deadline, buyer, questions), and creates opportunity records for review in the inbox UI.

---

## Milestone 1: Email Infrastructure

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone
Before we can process emails, we need to receive them. This milestone establishes the Cloudflare Email Worker that catches inbound mail and forwards to our API.

### Todos

#### - [ ] 1.1 Configure Cloudflare Email Routing
**Status:** Pending
**Summary:** Set up catch-all email routing for askevidis.com domain
**Detailed Summary:**
- What: Configure Cloudflare Email Routing to send all *@askevidis.com emails to our worker
- Why: We need a single endpoint to receive all RFI submissions regardless of which email they're sent to
- How: Use Cloudflare dashboard → Email → Email Routing → Catch-all → Worker
- Acceptance: Test email to test@askevidis.com triggers the worker
- Dependencies: Domain DNS on Cloudflare, Email Workers enabled
- Files: None (Cloudflare config)

#### - [ ] 1.2 Create Email Worker Skeleton
**Status:** Pending
**Summary:** Scaffold the Cloudflare Worker that receives emails
**Detailed Summary:**
- What: Create new worker in email-worker/ directory with email handler
- Why: This worker is the entry point for all inbound emails
- How: Use wrangler init, configure wrangler.toml with email binding
- Acceptance: Worker deploys successfully, logs received emails
- Dependencies: 1.1 complete
- Files: email-worker/src/index.ts, email-worker/wrangler.toml

#### - [ ] 1.3 Parse Email Headers and Body
**Status:** Pending
**Summary:** Extract sender, subject, date, and body from raw email
**Detailed Summary:**
- What: Parse the EmailMessage object to extract usable fields
- Why: Raw email format needs processing before we can work with content
- How: Use postal-mime or similar library to parse MIME content
- Acceptance: Can extract from, to, subject, date, plain text body, HTML body
- Dependencies: 1.2 complete
- Files: email-worker/src/parser.ts

#### - [ ] 1.4 Extract and Store Attachments
**Status:** Pending
**Summary:** Save email attachments to R2 storage
**Detailed Summary:**
- What: Parse MIME attachments and upload to Cloudflare R2 bucket
- Why: RFI documents (PDFs, Word docs) contain the actual tender questions
- How: Iterate MIME parts, filter by content-disposition: attachment, upload to R2
- Acceptance: Attachments accessible via R2 URL, metadata stored with email
- Dependencies: 1.3 complete, R2 bucket created
- Files: email-worker/src/attachments.ts

#### - [ ] 1.5 Forward to Ingest API
**Status:** Pending
**Summary:** POST parsed email data to app API endpoint
**Detailed Summary:**
- What: Send structured email data (sender, subject, body, attachment URLs) to /api/inbox/ingest
- Why: Processing happens in the main app, worker just receives and forwards
- How: fetch() to API endpoint with API key auth
- Acceptance: API receives payload, returns 200, worker logs success
- Dependencies: 1.4 complete, API endpoint exists (Milestone 2)
- Files: email-worker/src/forward.ts

---

## Milestone 2: Ingest API

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
The API endpoint receives parsed email data from the worker and stores it for processing. This is the handoff point between infrastructure and application logic.

### Todos

#### - [ ] 2.1 Create Inbound Emails Table
**Status:** Pending
**Summary:** Database table to store raw email records
**Detailed Summary:**
- What: Supabase migration creating inbound_emails table
- Why: We need to persist emails before processing, enables retry and audit trail
- How: Migration with columns: id, received_at, from_email, from_name, to_email, subject, body_text, body_html, raw_headers, status, processed_at
- Acceptance: Migration runs, can insert test record
- Dependencies: Supabase configured
- Files: supabase/migrations/XXXXXX_create_inbound_emails.sql, src/types/inbox.ts

#### - [ ] 2.2 Create Attachments Table
**Status:** Pending
**Summary:** Database table linking attachments to emails
**Detailed Summary:**
- What: Supabase migration creating email_attachments table
- Why: Attachments are separate records linked to emails, enables individual processing
- How: Migration with columns: id, email_id, filename, content_type, size_bytes, r2_key, r2_url
- Acceptance: Migration runs, foreign key to inbound_emails works
- Dependencies: 2.1 complete
- Files: supabase/migrations/XXXXXX_create_email_attachments.sql

#### - [ ] 2.3 Build Ingest Endpoint
**Status:** Pending
**Summary:** POST /api/inbox/ingest endpoint
**Detailed Summary:**
- What: API route that receives email payload and stores in database
- Why: Single entry point for all inbound email data
- How: Next.js API route, validate API key, insert email record, insert attachment records
- Acceptance: POST with valid payload creates email + attachment records
- Dependencies: 2.1, 2.2 complete
- Files: app/src/app/api/inbox/ingest/route.ts

#### - [ ] 2.4 Add API Key Authentication
**Status:** Pending
**Summary:** Secure ingest endpoint with API key
**Detailed Summary:**
- What: Middleware that validates X-API-Key header
- Why: Endpoint is public, must prevent unauthorized submissions
- How: Check header against INGEST_API_KEY env var, return 401 if invalid
- Acceptance: Requests without valid key get 401, valid key proceeds
- Dependencies: 2.3 complete
- Files: app/src/app/api/inbox/ingest/route.ts

---

## Milestone 3: RFI Parsing

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone
Raw emails need AI processing to extract structured RFI data. This milestone builds the parsing pipeline that identifies deadlines, buyers, and questions.

### Todos

#### - [ ] 3.1 Create Opportunities Table
**Status:** Pending
**Summary:** Database table for parsed RFI opportunities
**Detailed Summary:**
- What: Supabase migration creating opportunities table
- Why: Opportunities are the structured output of email parsing, the core inbox entity
- How: Migration with columns: id, org_id, inbound_email_id, title, buyer_name, buyer_org, deadline, status, confidence_score, created_at
- Acceptance: Migration runs, links to inbound_emails
- Dependencies: 2.1 complete
- Files: supabase/migrations/XXXXXX_create_opportunities.sql, src/types/opportunity.ts

#### - [ ] 3.2 Build Email Parser Prompt
**Status:** Pending
**Summary:** Claude prompt that extracts RFI fields from email content
**Detailed Summary:**
- What: Prompt template that takes email subject + body and returns structured JSON
- Why: AI extraction is more robust than regex for varied email formats
- How: Few-shot prompt with examples of RFI emails → JSON output
- Acceptance: Prompt returns valid JSON with title, buyer, deadline, is_rfi boolean
- Dependencies: Claude API configured
- Files: app/src/lib/ai/prompts/parse-rfi-email.ts

#### - [ ] 3.3 Build Attachment Parser Prompt
**Status:** Pending
**Summary:** Claude prompt that extracts questions from RFI documents
**Detailed Summary:**
- What: Prompt that takes document text and returns array of questions with sections
- Why: The actual tender questions are in attachments, not email body
- How: Prompt with examples of tender document → questions JSON
- Acceptance: Prompt returns array of {section, question, page_ref} objects
- Dependencies: Document text extraction working
- Files: app/src/lib/ai/prompts/parse-rfi-document.ts

#### - [ ] 3.4 Create Processing Queue
**Status:** Pending
**Summary:** Background job system for email processing
**Detailed Summary:**
- What: Queue system that processes inbound_emails with status='pending'
- Why: AI parsing is slow, shouldn't block the ingest API
- How: Use Supabase Edge Function with pg_cron, or Vercel cron
- Acceptance: New emails get processed within 5 minutes, status updated
- Dependencies: 3.2, 3.3 complete
- Files: app/src/lib/jobs/process-inbound-email.ts

#### - [ ] 3.5 Store Parsed Opportunity
**Status:** Pending
**Summary:** Save AI-parsed data as opportunity record
**Detailed Summary:**
- What: Create opportunity record with parsed fields, link to source email
- Why: Parsed data needs to be queryable and editable in the inbox UI
- How: Insert to opportunities table, update email status to 'processed'
- Acceptance: Processing creates opportunity, email marked processed
- Dependencies: 3.1, 3.4 complete
- Files: app/src/lib/jobs/process-inbound-email.ts

---

## Milestone 4: Inbox UI

> **Status:** Not Started
> **Progress:** 0/6 Todos Complete

### Why This Milestone
Users need to see, triage, and act on incoming opportunities. This milestone builds the inbox interface for the dashboard.

### Todos

#### - [ ] 4.1 Create Inbox Page Route
**Status:** Pending
**Summary:** Dashboard page at /dashboard/inbox
**Detailed Summary:**
- What: New page component with layout matching dashboard structure
- Why: Inbox is a primary navigation destination in the app
- How: Create page.tsx, add to sidebar navigation
- Acceptance: /dashboard/inbox renders, appears in sidebar
- Dependencies: Dashboard layout exists
- Files: app/src/app/(dashboard)/dashboard/inbox/page.tsx

#### - [ ] 4.2 Build Opportunity List Component
**Status:** Pending
**Summary:** List view showing pending opportunities
**Detailed Summary:**
- What: Component that fetches and displays opportunities with key info
- Why: Users need to scan and select opportunities for action
- How: Server component fetching from Supabase, display as cards/rows
- Acceptance: Shows title, buyer, deadline, status for each opportunity
- Dependencies: 4.1 complete, opportunities table has data
- Files: app/src/components/inbox/OpportunityList.tsx

#### - [ ] 4.3 Build Opportunity Detail Panel
**Status:** Pending
**Summary:** Side panel showing full opportunity details
**Detailed Summary:**
- What: Panel that shows when opportunity is selected, displays all fields
- Why: Users need to see full context before deciding to act
- How: Sheet/drawer component with opportunity data, source email, attachments
- Acceptance: Clicking opportunity opens panel with all details
- Dependencies: 4.2 complete
- Files: app/src/components/inbox/OpportunityDetail.tsx

#### - [ ] 4.4 Add Quick Actions
**Status:** Pending
**Summary:** Action buttons for common inbox operations
**Detailed Summary:**
- What: Buttons for: Convert to Project, Dismiss, Snooze, View Source
- Why: Inbox workflow requires quick triage without navigation
- How: Button group in detail panel, API routes for each action
- Acceptance: Each action updates opportunity status appropriately
- Dependencies: 4.3 complete
- Files: app/src/components/inbox/OpportunityActions.tsx, app/src/app/api/opportunities/[id]/route.ts

#### - [ ] 4.5 Add Deadline Highlighting
**Status:** Pending
**Summary:** Visual urgency indicators based on deadline
**Detailed Summary:**
- What: Color-coded badges showing time until deadline
- Why: Users need to prioritize urgent RFIs at a glance
- How: Calculate days remaining, show red (<3d), amber (<7d), green (>7d)
- Acceptance: Deadlines show appropriate urgency colors
- Dependencies: 4.2 complete
- Files: app/src/components/inbox/DeadlineBadge.tsx

#### - [ ] 4.6 Add Empty State
**Status:** Pending
**Summary:** Helpful UI when inbox is empty
**Detailed Summary:**
- What: Empty state component with instructions for getting started
- Why: New users need guidance, empty list shouldn't be confusing
- How: Conditional render when opportunities.length === 0
- Acceptance: Shows helpful message with forward email instructions
- Dependencies: 4.2 complete
- Files: app/src/components/inbox/InboxEmptyState.tsx

---

## Completion Criteria

- [ ] All milestones marked complete
- [ ] All todos checked off
- [ ] Emails sent to *@askevidis.com appear in inbox within 5 minutes
- [ ] Attachments are accessible and parseable
- [ ] AI correctly extracts deadline, buyer, and title from 80%+ of test emails
- [ ] Inbox UI shows opportunities with working actions
- [ ] Deadline urgency indicators display correctly

---

## Notes & Decisions

[To be filled during execution]

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-01-04 | Created plan | Initial PLANX planning |
```

---

## Anti-Patterns (Avoid These)

### Planning Anti-Patterns

- **Too shallow:** Milestones with 1-2 vague todos
- **Too deep:** Todos that describe individual lines of code
- **Missing why:** Todos without reasoning (will be misinterpreted)
- **Missing acceptance:** Todos with no way to verify completion
- **Scope creep:** Adding "nice to have" todos during planning
- **Dependency blindness:** Not identifying what blocks what

### Execution Anti-Patterns

- **Skipping todos:** Marking done without doing the work
- **Milestone jumping:** Starting Milestone 3 before Milestone 1 is done
- **Silent changes:** Modifying the plan without documenting why
- **Perfectionism:** Not checking off because "it could be better"
- **Ignoring blocks:** Proceeding when dependencies aren't met

---

## Summary

**PLANX = Execution Blueprint**

### Trigger
```
PLANX: [feature or task]
```

### Output
Comprehensive markdown document with:
- Milestones (3-7 logical phases)
- Todos (3-8 per milestone)
- Summaries (one-line descriptions)
- Detailed Summaries (what/why/how/acceptance/dependencies/files)

### Execution Rule
A milestone is complete when all its todos are checked. The feature is complete when all milestones are complete.

### Key Differentiator
Every todo carries its context. Nothing is left to interpretation. The document *is* the execution.

---

**Framework Status:** Production-ready
**Last Updated:** 2025-01-04
**Version:** 1.0
