# BulletProof — Product Requirements Document

> **Version**: 1.0 (PRDX Validated)
> **Date**: February 2026
> **Status**: Concept → MVP Planning
> **Gaffer Verdict**: GREEN LIGHT WITH CONDITIONS

---

## PRDX Validation Summary

| Round | Key Decision |
|-------|--------------|
| 1. Target Market | Senior engineers/professionals (55-70), UK construction first |
| 2. Problem/Solution | AI-amplified criticism asymmetry — 30 sec to critique, hours to defend |
| 3. Value Prop | "Check your report before they do" |
| 4. Features | Two boxes (pre-review + post-triage) = MVP. Personas = V2. |
| 5. Pricing | Free first report, then £15/month individual or £3/report |
| 6. Competitive | No direct competitor. Only tool built for the sender, not the reviewer. |
| 7. Technical | Next.js + Claude API + simple auth. No heavy infra needed. |
| 8. GTM | One engineer → his mates → LinkedIn → industry expansion |
| 9. Success | 10 active users @ 3 months, 50 @ 6 months, positive retention |

---

## Round 1: Target Market

### Day-One Customer
A senior engineer (55-70 years old) working in UK construction or infrastructure. Writes technical reports — site assessments, structural reports, compliance documents — based on 30-40 years of hands-on experience. Submits to 3-4 reviewers (project managers, H&S leads, commercial directors, clients) who increasingly use AI to critique his work.

### Geographic Focus
UK first. The language, regulatory references, and professional culture are specific enough to warrant focus. Expand to English-speaking markets (Australia, Canada) after validation.

### Niche or Horizontal?
**Deep niche first.** Construction/engineering reports. The language, standards, and reviewer dynamics are specific. Once the core loop is validated, expand to adjacent industries (legal, medical, surveying).

### Channels
- Word of mouth (engineer to engineer)
- LinkedIn (where frustrated professionals vent)
- Professional bodies (ICE, IStructE, RICS)
- Trade publications

### One Customer Type
**A 65-year-old structural engineer in the UK who submits reports to 3-4 people and is fed up with AI-generated nitpicking.**

---

## Round 2: Problem/Solution Fit

### Core Problem (One Sentence)
Experienced professionals are drowning in AI-generated criticism from reviewers who don't understand the issues they're raising.

### Pain Severity: #1
This isn't a secondary annoyance. For the target user, this is a daily frustration that's affecting job satisfaction, confidence, and in some cases driving early retirement.

### Why Now?
- AI adoption among office workers hit mainstream in 2024-2025
- ChatGPT/Claude are now default tools for anyone reviewing documents
- The asymmetry between generating criticism and defending against it has become unbearable
- No tool has addressed the defender's side yet — the market has only served the attacker

### Hair-on-Fire Moment
Friday afternoon. You've submitted a 30-page structural assessment. Monday morning, you get an email with 14 "concerns" — clearly AI-generated, half of them irrelevant. You now have to respond to each one individually, on the record, by Wednesday. This happens every week.

### Status Quo
- Manually re-reading the report looking for what they might flag
- Asking a colleague to proof-read (if available)
- Spending hours writing responses to each point
- Increasingly: giving up and just accepting the criticism
- Some: running their own reports through ChatGPT (but they don't know how to prompt effectively)

---

## Round 3: Value Proposition

### 60-Second Pitch
"Your reviewers paste your report into AI and send you back a list of problems in 30 seconds. You spend hours defending every point. BulletProof does the same thing — but for you, before you send. It tells you what they'll flag so you can fix it first. When their feedback comes back anyway, paste it in and BulletProof tells you which points are real and which ones are AI noise, with draft responses ready to go."

### Hero Feature
**Pre-review simulation.** Paste your report, see what reviewers will flag, fix it before they see it. That's the sell.

### Wow Moment
First time the user pastes a report and sees: "Paragraph 7: A reviewer focused on H&S will likely flag that no risk assessment is referenced for the electrical work." And they think: "That's exactly what Sarah always picks up on." Trust established.

### Grandmother Test
"It checks your report before your boss does, and tells you what they'll complain about."

### Emotional Benefit
**Confidence.** Send reports knowing they've been stress-tested. Stop dreading Monday morning feedback emails. Feel like you're on equal footing again.

---

## Round 4: Feature Prioritisation

### MVP (V1) — Ship in 2-4 Weeks

| Feature | Description |
|---------|-------------|
| **Report paste/upload** | Text box for pasting, PDF/Word upload |
| **Pre-review analysis** | AI analyses report, flags likely critique points with paragraph references |
| **Severity triage** | Each flag rated: critical (fix before sending) / minor (prepare a response) / noise (ignore) |
| **Suggested fixes** | For each flag, suggested language to add or change |
| **Post-review triage** | Paste feedback received → system separates real concerns from AI noise |
| **Response drafting** | Draft professional responses to each valid point |

### Phase 2

| Feature | Description |
|---------|-------------|
| User profile | CV upload, expertise extraction, authority profile |
| Reviewer personas | Named reviewers with role, background, tendencies |
| Per-reviewer simulation | "Sarah will flag X, David will flag Y" |
| LinkedIn enrichment | Scrape public profiles to build reviewer personas |
| Prediction tracking | Did we correctly predict what they flagged? |

### Phase 3

| Feature | Description |
|---------|-------------|
| Learning loop | Persona accuracy improves with each review cycle |
| Report templates | Industry-specific report structures with pre-flagged weak spots |
| Team accounts | Multiple professionals in one organisation |
| API | Integration with document management systems |
| Export | PDF reports of the review and responses |

### Can Cut Entirely
- Mobile app (responsive web is fine)
- Real-time collaboration
- Document editing within the tool
- AI report writing (this is report DEFENCE, not report GENERATION)

---

## Round 5: Pricing

### Model
**Freemium + per-report or subscription.**

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | £0 | 1 report review (no signup required) |
| **Individual** | £15/month | Unlimited pre-reviews, unlimited post-triage, response drafting |
| **Pay-as-you-go** | £3/report | For occasional users |
| **Team** (Phase 2) | £50/month | Up to 5 users, shared reviewer personas |

### Why This Works
- Free first report = zero-friction trial (NIGELX condition: value before investment)
- £15/month is a personal expense a professional will pay without procurement approval
- £3/report is low enough for someone submitting 2-3 reports/month to try before committing
- Team tier unlocks company billing later

### Competitor Pricing Context
No direct competitor to benchmark against. Adjacent tools (Grammarly Business, writing assistants) charge £12-25/month. £15 is competitive.

### Edge Cases
- Heavy user submitting 20 reports/month: subscription is clearly better value
- Occasional user (1 report/month): pay-as-you-go makes sense
- Retired consultant doing occasional work: free tier may be sufficient

---

## Round 6: Competitive Positioning

### The Gorilla
There is no gorilla. The closest is ChatGPT itself — the reviewer's weapon is also theoretically available to the professional. But that requires prompt engineering skills the target user doesn't have.

### One-Liner Against ChatGPT
"ChatGPT is a blank page. BulletProof knows what your reviewers care about."

### What's Defensible
1. **Reviewer personas** — proprietary to each user, get smarter over time
2. **Authority profiles** — user's expertise compounds, making responses stronger
3. **Industry knowledge** — learns what certain job roles flag across organisations
4. **Trust** — first tool to earn trust from non-technical professionals wins. This audience doesn't switch.

### Who We Don't Want
- People looking for an AI report writer (we defend, we don't write)
- Students trying to pass assignments (wrong use case)
- Anyone wanting to hide genuine quality issues in their work

### Battle Cry
**"Fight AI with AI. But on your side."**

---

## Round 7: Technical Validation

### Core Stack

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| **Frontend** | Next.js (App Router) | Proven stack, SSR for landing pages, James knows it cold |
| **AI** | Claude API (Anthropic) | Best at nuanced document analysis, already used in Evidis |
| **Database** | PostgreSQL (Neon or Railway) | User profiles, reviewer personas, report history |
| **Auth** | Simple email magic link | Lowest friction for non-technical users |
| **Storage** | Cloudflare R2 | Uploaded reports (PDF, Word) |
| **Hosting** | Railway or Vercel | Fast deployment, proven infra |

### Hardest Technical Challenge
**Persona accuracy.** The AI needs to produce specific, paragraph-level flags that match what a real reviewer with a specific job role would actually raise. Generic AI critique is worthless — it needs to be role-contextualised and technically credible.

### MVP-Critical Technical Decisions
- Document parsing (PDF → text extraction)
- Prompt engineering for role-based critique simulation
- Triage logic (real concern vs AI noise classification)
- Response generation that sounds authoritative, not robotic

### Technical Risks

| Risk | Mitigation |
|------|------------|
| AI flags wrong things → trust destroyed | Conservative flagging. Better to flag less and be right. Confidence scores on every flag. |
| PDF parsing quality varies | Use proven extraction (pdf-parse, or Cloudflare Worker like Evidis) |
| Slow response times | Stream responses. Show flags as they're found, not all at once. |
| Data privacy (sensitive reports) | Clear data retention policy. Option to auto-delete after 30 days. No training on user data. |

### Dependencies
- Anthropic API access (already have)
- Document parsing library
- No external integrations needed for MVP

---

## Round 8: Go-to-Market

### Phase 1: One User (Weeks 1-4)
- Build MVP for James's friend
- One industry (structural engineering), one workflow
- Iterate based on real usage and feedback
- Goal: Does the core loop work? Does he trust the output?

### Phase 2: His Network (Months 2-3)
- Friend introduces 5-10 engineering colleagues
- Word of mouth within one professional circle
- Refine based on different report types and reviewer dynamics
- Goal: 10 active users, positive feedback

### Phase 3: LinkedIn + Professional Bodies (Months 3-6)
- Target LinkedIn posts from frustrated professionals
- Content: "How AI is changing peer review — and what to do about it"
- Approach professional bodies (ICE, IStructE, RICS, CIOB)
- Goal: 50 active users across engineering and construction

### Phase 4: Industry Expansion (Months 6-12)
- Legal (solicitors, barristers submitting to courts/partners)
- Medical (clinicians submitting reports to boards)
- Surveying (RICS members submitting valuations)
- Each industry gets tailored reviewer persona templates

### Content/SEO Play
- "AI-generated feedback in construction" — own this keyword space
- "How to respond to AI peer review" — practical guides
- Case studies: "How [engineer] saved 10 hours/week on report defence"

### Viral Loop
Engineer uses BulletProof → sends hardened report → reviewer finds nothing to flag → engineer tells 5 mates.

---

## Round 9: Success Metrics

### North Star Metric
**Reports defended per month.** This captures both user adoption and the core value delivery. A user who defends reports regularly is getting real value.

### Targets

| Metric | 3 Months | 6 Months | 12 Months |
|--------|----------|----------|-----------|
| Active users | 10 | 50 | 200 |
| Reports reviewed/month | 30 | 200 | 1,000 |
| Post-triage responses drafted | 15 | 100 | 500 |
| Prediction accuracy (V2) | — | 60% | 75% |
| MRR | £0 (beta) | £500 | £2,500 |

### Weekly Tracking
- Reports submitted
- Pre-review vs post-triage ratio (are people using both modes?)
- Average flags per report
- User retention (weekly active)
- Time from signup to first report

### Kill Criteria
- Zero organic signups after 3 months of availability
- Users try once and never return (< 10% retention)
- Prediction accuracy consistently below 40% (tool isn't useful)
- No word-of-mouth growth (nobody tells their mates)

---

## Product Principles

1. **Value before investment.** First report review requires zero signup. Profile comes later.
2. **Trade language, not tech language.** "What they'll flag" not "AI persona simulation."
3. **Conservative over comprehensive.** Flag less and be right, rather than flag everything. Trust is everything.
4. **Defence, not generation.** We help you defend your report. We never write it for you.
5. **Invisible AI.** The user should never feel like they're "using AI." They're checking their report.

---

## Open Questions

1. **LinkedIn scraping** — Legal grey area. May need to rely on manual reviewer profile input or public API. Research needed.
2. **Industry-specific knowledge** — How much domain knowledge does the AI need to flag credibly? Can general-purpose LLMs handle construction-specific technical review?
3. **Data retention** — How long do we store reports? User choice? Auto-delete? Legal requirements?
4. **Branding** — Does BulletProof live under Lost Monster Labs, or does it become its own brand?
5. **IP** — Is there a patent opportunity for "reviewer persona simulation for document defence"?

---

**PRDX Session Time**: ~60 minutes (derived from conversation)
**Facilitator**: Claude (Gaffer crew)
**Next Step**: MVP scaffold and first build sprint
