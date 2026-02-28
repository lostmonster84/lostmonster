# BulletProof — Protocol

> The full user flow from signup to defended report.

---

## Phase 1: Onboarding (One-time setup)

### Your Profile
- Name, role, industry, specialism
- CV upload — AI extracts expertise, qualifications, years of experience
- LinkedIn URL — scrape public career history, endorsements, specialisms
- Builds an **authority profile**: what you're qualified to speak on

### Your Reviewers
For each person you send reports to:
- Name, job title, organisation
- Relationship to you (line manager, client, regulator, peer)
- LinkedIn URL — scrape their background, focus areas, responsibilities
- Optional: "What do they typically pick you up on?" (free text)
- AI builds a **reviewer persona** — their professional lens, likely biases, what they care about

**NIGELX condition:** Onboarding must NOT block first use. User should be able to paste a report and get value BEFORE completing their profile. Profile enriches results but isn't a gate.

---

## Phase 2: Report Submission

1. Upload report (PDF, Word, or paste text)
2. Select recipients: "Who's this going to?" — tick Person 1, 2, 3, 4
3. Hit go

---

## Phase 3: Persona Simulation

Each reviewer persona runs independently against the report. Output per reviewer:

```
Sarah Chen — Head of Health & Safety
├── WILL LIKELY FLAG
│   ├── Para 4: 3 people entering warehouse without PPE mentioned
│   ├── Para 7: No risk assessment referenced for electrical work
│   └── Para 12: Fire escape route not confirmed for temporary works
├── PROBABLY FINE WITH
│   ├── Methodology section — thorough and well-structured
│   └── Timeline — realistic and accounts for safety briefings
└── CONFIDENCE: 82%

David Morris — Commercial Director
├── WILL LIKELY FLAG
│   ├── Para 9: No cost estimate for remediation works
│   ├── Para 11: Timeline doesn't account for procurement lead times
│   └── Para 15: No mention of budget approval process
├── PROBABLY FINE WITH
│   ├── Scope definition — clear and bounded
│   └── Resource allocation — sensible
└── CONFIDENCE: 76%
```

---

## Phase 4: Harden & Send

For each flag, three options:

### Fix It
AI suggests specific language to add or change in the report. User accepts, modifies, or writes their own fix.

### Dismiss It
Mark as not relevant with reasoning. Stored for reference if the reviewer raises it anyway.

### Note It
Acknowledge but send anyway. Pre-drafted response is ready in the bank if they raise it.

---

## Phase 5: Post-Submission (Mode 2)

When feedback arrives:

1. Paste their comments/email
2. System matches against predictions from Phase 3
3. Triage output:

```
PREDICTED (we flagged this)     → 4 points — responses already drafted
NEW (we didn't catch this)      → 2 points — AI drafts response using authority profile
AI NOISE (generic, not real)    → 6 points — suggested dismissal with reasoning
```

4. For each point, draft a response that:
   - References specific expertise from the authority profile
   - Cites relevant standards, regulations, or precedent where applicable
   - Is professionally worded but firm
   - Distinguishes between "valid point, here's the fix" and "this isn't a real issue, here's why"

---

## Phase 6: Learning Loop

Over time, the system improves:

- **Reviewer accuracy** — tracks what each reviewer actually flagged vs what was predicted. Persona improves.
- **Pattern recognition** — learns which types of flags are noise vs substantive for each reviewer
- **Authority building** — as the user dismisses AI noise with good reasoning, that reasoning is stored and reused
- **Report templates** — identifies common structures in the user's reports and pre-flags known weak spots

---

## MVP Scope (V1)

Based on Gaffer review conditions:

### V1: Two Boxes
- **Box 1:** Paste report → get AI review (generic, no personas yet)
- **Box 2:** Paste feedback → get triage + draft responses
- No auth, no profiles, no LinkedIn scraping
- Value first, profile later

### V2: Personas
- User profile with CV upload
- Reviewer profiles with LinkedIn enrichment
- Per-reviewer persona simulation
- Prediction tracking

### V3: Learning
- Prediction accuracy tracking
- Reviewer persona refinement
- Authority profile strengthening
- Report pattern recognition
