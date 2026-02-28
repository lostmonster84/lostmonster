# BulletProof — Email Integration & Reviewer Intelligence

> Auto-discover reviewers, build personas from real communication, detect AI-assisted feedback.

---

## Overview

Instead of manually building reviewer profiles, BulletProof connects to the user's email and does it automatically. This transforms onboarding from a 10-minute form-filling exercise into a 30-second email connect.

More importantly, it unlocks a feature nobody else has: **detecting when your reviewers started using AI to critique your work.**

---

## Email Connect — Auto-Discovery

### How It Works

1. User connects company email (Google Workspace / Microsoft 365 OAuth, read-only scope)
2. BulletProof scans for all `@company.com` addresses in sent/received mail
3. Groups contacts: "We found 12 people at your organisation"
4. User confirms: "Which of these do you send reports to?" — tick the relevant ones
5. BulletProof builds reviewer personas automatically from email history

### What Gets Extracted Per Reviewer

| Signal | Source | Example |
|---|---|---|
| **Name & role** | Email signatures, sign-offs | "David Morris, Commercial Director" |
| **Communication style** | Email body patterns | Formal, brief, bullet-point style |
| **What they care about** | Topics raised across all emails | Cost, timeline, procurement |
| **Feedback style** | How they give critique | Direct questions vs passive observations |
| **Nitpick patterns** | Recurring themes in their feedback | Always flags missing cost estimates |
| **Response time** | How quickly they typically reply | Usually 2-3 days |
| **Relationship dynamic** | Tone and formality level | Casual peer vs formal superior |

### Onboarding Flow

```
1. Sign up
2. Connect email
3. "We found these people. Who do you report to?"
4. Tick 4 names
5. "Got it. Paste your report."
```

Zero manual profile building. The email IS the profile source.

---

## AI Detection — The Killer Feature

### The Insight

BulletProof has a historical baseline for every reviewer. It knows how David wrote feedback in 2023, 2024, and now. When his style shifts overnight, that's detectable.

### How It Works

1. Analyse reviewer's email history to establish communication baseline
2. Monitor for style deviation in recent feedback
3. Score AI probability per reviewer and per piece of feedback
4. Present to user: "David's feedback is likely AI-assisted (87% confidence)"

### AI Detection Signals

#### Linguistic Tells

| Signal | Human Pattern | AI Pattern |
|---|---|---|
| **Em dashes (—)** | Rarely used or used incorrectly | Perfectly placed, every time |
| **Semicolons** | Almost nobody uses them in work emails | AI uses them constantly |
| **"It is worth noting"** | Nobody talks like this naturally | Classic ChatGPT/Claude opener |
| **"Furthermore" / "Moreover"** | Academic usage, rare in practice | AI's favourite transition words |
| **"Comprehensive" / "Robust"** | Occasional | Every other sentence |
| **"It may be beneficial to consider"** | Nobody says this | AI hedging language |
| **"It is recommended that"** | Formal policy documents only | AI default phrasing |
| **Consistent paragraph length** | Humans ramble then go short | Uniform 3-4 sentence paragraphs |
| **Perfect numbered structure** | Sometimes, usually messy | Perfect numbering with consistent formatting |
| **Sign-off shift** | "Cheers, Dave" | "Best regards, David" |
| **Hedging vs directness** | "I reckon" / "not sure but" | "It may be prudent to" / "one might consider" |

#### Behavioural Tells

| Signal | What It Means |
|---|---|
| **Sudden style shift** | Used to write 3 lines, now writes 15 structured points |
| **Vocabulary expansion** | New words they've never used in years of emails |
| **Scope creep** | Used to only flag commercial issues, now flags H&S, compliance, methodology — outside their expertise |
| **Response time drop** | Used to take 3 days, now responds same-day (not reading the full report) |
| **Volume increase** | Used to raise 2-3 points, now raises 10-12 |
| **Generic phrasing** | Feedback applies to any report, not specifically to this one |
| **Copy-paste artefacts** | Formatting inconsistencies, markdown-style bullets in a plain email |

#### Pattern Deviation Score

For each reviewer, BulletProof calculates:

```
Baseline (last 12 months of emails)
├── Average feedback length: 45 words
├── Typical points raised: 2-3
├── Vocabulary complexity: Low (trade language)
├── Em dash usage: 0%
├── Semicolon usage: 2%
├── Structure: Unstructured paragraphs
├── Response time: 2.4 days average
└── Sign-off: "Cheers, Dave"

Latest feedback
├── Feedback length: 320 words (+611%)
├── Points raised: 12 (+400%)
├── Vocabulary complexity: High (formal/academic)
├── Em dash usage: 8 instances
├── Semicolon usage: 5 instances
├── Structure: Perfectly numbered list
├── Response time: 4 hours (-93%)
└── Sign-off: "Best regards, David"

AI CONFIDENCE: 91%
VERDICT: This feedback is almost certainly AI-assisted.
```

---

## Feature Set

### Per-Reviewer Dashboard

Each reviewer profile shows:

- **AI Score** — Current AI usage confidence (0-100%)
- **Historical Timeline** — When their style changed, with before/after comparison
- **Their Real Voice** — Examples of what they ACTUALLY sound like vs their AI-assisted feedback
- **Topics They Genuinely Care About** — Derived from pre-AI feedback patterns
- **Topics AI Added** — New areas they started flagging after the style shift

### Credibility Weighting

When processing feedback:

- Points from **low-AI reviewers** (< 30%) get flagged as higher priority — these are genuine expert concerns
- Points from **high-AI reviewers** (> 70%) get triaged more aggressively — most are likely AI noise
- **Mixed reviewers** (30-70%) get individual point analysis — some real, some generated

### "Their Real Voice" Comparison

```
DAVID MORRIS — Before AI (pre-March 2025):
"Couple of things mate - where's the cost breakdown for
the remediation? Client will ask. Also timeline looks
tight for procurement. Cheers, Dave"

DAVID MORRIS — After AI (post-March 2025):
"Thank you for the comprehensive report. I have identified
several areas that may benefit from further consideration:

1. Cost Estimation — It is recommended that a detailed
   cost breakdown be provided for the remediation works,
   including contingency provisions...

2. Timeline Assessment — Furthermore, the proposed timeline
   does not appear to account for standard procurement
   lead times, which could impact..."

AI CONFIDENCE: 91%
```

This visual comparison is devastating. The user sees it instantly.

---

## Privacy & Legal Considerations

### What We Access
- User's own mailbox only (read-only OAuth scope)
- Only emails where the user is sender or recipient
- We never access anyone else's inbox

### What We Store
- Extracted signals and patterns only
- Never raw email content
- Reviewer personas are derived data, not copies
- Source emails are processed and discarded

### GDPR Position
- **Legitimate interest**: User has legitimate interest in understanding how their colleagues communicate with them
- **No third-party access**: We only read the user's own mail
- **Derived insights**: We store patterns, not personal data
- **Right to delete**: User can remove any reviewer profile at any time
- **Worth legal review**: Before launch, get formal GDPR opinion on processing communication patterns about non-consenting individuals

### Framing
- DO say: "BulletProof learns your reviewers' communication style from your conversations with them"
- DON'T say: "We scan your inbox and profile your colleagues"
- The distinction matters for trust and legal positioning

---

## Technical Implementation

### OAuth Integration
- Google Workspace: Gmail API (read-only scope: `gmail.readonly`)
- Microsoft 365: Microsoft Graph API (`Mail.Read` scope)
- Both support OAuth 2.0 consent flow

### Processing Pipeline
1. **Connect** → OAuth consent, read-only access
2. **Scan** → Pull emails from last 6-12 months (paginated, background job)
3. **Extract** → Claude API to analyse communication patterns per contact
4. **Build** → Reviewer persona constructed from aggregated signals
5. **Store** → Persona data only, raw emails discarded
6. **Refresh** → Periodic re-scan (weekly/monthly) to keep personas current

### Evidis Precedent
Evidis already has email processing infrastructure:
- Cloudflare email workers for inbound processing
- Document parsing pipeline
- Claude API integration for content analysis

BulletProof can reuse this architecture with modifications for OAuth-based reading instead of inbound forwarding.

---

## Phasing

| Phase | Feature |
|---|---|
| **V1** | Two boxes (paste report, paste feedback). No email. |
| **V2** | Email connect. Auto-discover reviewers. Build personas from email history. |
| **V3** | AI detection. Linguistic analysis. Credibility weighting. "Their real voice" comparison. |
| **V4** | Learning loop. Prediction accuracy tracking. Persona refinement over time. |
