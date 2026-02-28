# BulletProof — Gaffer Concept Review

> Gaffer evaluation of the BulletProof product concept.

---

## Classification

- **Task:** New product concept evaluation
- **Type:** `new-product` / `concept-validation`
- **Routing:** Idea stage — planning + review crew only

---

## RAPIX — Requirements Interpretation

**Raw input:** Voice-dictated concept

| Requirement | Detail |
|---|---|
| **User** | Experienced professional (55-70), non-technical, writes reports manually |
| **Problem** | Reviewers run reports through AI, raise issues they don't understand themselves |
| **Asymmetry** | AI criticism takes 30 seconds to generate, days to manually defend |
| **Core job** | Simulate reviewers BEFORE submission, harden the report |
| **Secondary job** | Triage incoming AI-generated feedback, draft responses |
| **Onboarding** | User profile (CV upload, LinkedIn scrape, role, expertise) |
| **Reviewer profiles** | Name, role, LinkedIn, characteristics, historical nitpicks |
| **Output** | Per-reviewer persona simulation with specific flags by paragraph |
| **Post-send** | Paste feedback → match predictions → triage → draft rebuttals |

**RAPIX verdict:** Requirements are clear, user pain is real and specific. One gap — no mention of pricing model or monetisation. Flag for later.

---

## CODAX — Context, Objective, Details, Acceptance

**C — Context:**
A generation of senior professionals are being undermined by junior colleagues using AI to generate criticism they couldn't produce themselves. No tool exists that serves the report SENDER. Every tool on the market helps reviewers. This is the opposite.

**O — Objective:**
Build a lightweight web tool that lets experienced professionals pre-test their reports against AI-simulated reviewer personas, and defend their work when AI-generated critiques come back.

**D — Details:**
- Profile system (user + reviewers) with LinkedIn/CV enrichment
- Per-reviewer persona simulation on report upload
- Prediction tracking (what we flagged vs what they raised)
- Response drafting backed by user's authority profile
- Must be usable by someone who's never touched AI

**A — Acceptance Criteria:**
1. A 65-year-old engineer can go from signup to first report review in under 5 minutes
2. Reviewer personas produce specific, paragraph-level flags (not generic AI waffle)
3. Post-submission triage correctly separates substantive points from AI noise
4. User never needs to write a prompt or understand how AI works

**CODAX verdict:** PASS — objective is tight, acceptance criteria are measurable.

---

## NIGELX — "Can I Find It?" / Simplicity Test

**Target user:** 65-year-old structural engineer. Not stupid — very smart. Just not digital.

| Test | Result |
|---|---|
| Can they understand what this does in 10 seconds? | YES — "it checks your report before they do" |
| Can they complete the core action without help? | RISK — onboarding is heavy for first use |
| Is the language jargon-free? | Needs work — "persona simulation" means nothing to this user |
| Does it feel like a tool, not an AI product? | CRITICAL — if it smells like AI, he won't trust it |

**NIGELX flags:**
1. **Onboarding friction is the killer.** CV upload + LinkedIn + reviewer profiles before you see ANY value = death. He'll close the tab.
2. **Must deliver value before asking for investment.** Let him paste a report and get results FIRST. Build profile later.
3. **Language must be trade, not tech.** "Check your report" not "AI persona simulation." "What they'll flag" not "reviewer critique analysis."
4. **The trust problem.** If the tool tells him something wrong about his domain, he'll never come back. Confidence calibration is essential — better to flag less and be right than flag everything.

**NIGELX verdict:** CONDITIONAL PASS — flip the onboarding. Value first, profile second.

---

## AIDAX — "Will They Buy?"

| Stage | Score | Notes |
|---|---|---|
| **Attention** | 9/10 | "Stop defending your reports against AI-generated nitpicking" — visceral headline |
| **Interest** | 8/10 | Reviewer-persona simulation is genuinely novel. Nothing does this. |
| **Desire** | 7/10 | Strong emotional hook but depends on speed to first value. Fixable. |
| **Action** | 6/10 | Pricing model undefined. Who pays — individual or company? Free tier essential. |
| **Total** | **30/40** | Strong concept, weak on conversion path |

**AIDAX verdict:** Needs instant value demo, clear pricing, and a viral loop (engineer tells 5 engineer mates).

---

## PRDX — Product Viability

### Strengths
- Real, validated pain point (real user with real problem)
- No direct competitor
- Reusable tech stack from Evidis (Claude API, Next.js, document processing)
- Market is massive and growing — every industry, not just engineering
- Network effects possible (reviewer personas improve with usage data)

### Risks
- LinkedIn scraping is legally grey (may need manual input or public API)
- Persona accuracy — if simulated reviewer flags wrong things, trust is destroyed instantly
- Scope creep — could easily become "AI report writer" (crowded market). Must stay as "report DEFENDER"
- Single-user tool vs team tool — if reviewers also start using it, arms race

### Missing from Spec
1. Pricing model
2. Data retention / privacy (professional reports are sensitive)
3. Industry scoping — all industries or start with one?
4. Offline/export — can user get a PDF of the review?

**PRDX verdict:** VIABLE — needs tighter MVP scope.

---

## Gaffer Verdict

```
+- GAFFER CONCEPT REVIEW -------------------------+
| RAPIX:   PASS — requirements clear              |
| CODAX:   PASS — objective tight                  |
| NIGELX:  CONDITIONAL — flip the onboarding       |
| AIDAX:   30/40 — strong concept, weak on action  |
| PRDX:    VIABLE — needs tighter MVP scope        |
|-------------------------------------------------|
| GAFFER:  GREEN LIGHT WITH CONDITIONS             |
+------------------------------------------------+
```

### Three Conditions Before Build

1. **Flip the funnel.** Paste report → instant value → THEN build profile. Not the other way around.
2. **Define MVP scope.** V1 is two boxes: pre-review and post-triage. Reviewer personas come in V2.
3. **Pick a launch user.** One friend, one industry, one workflow. Expand after.
