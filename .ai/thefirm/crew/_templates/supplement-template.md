# {WORKER} Supplement: {Job Type}

> Researched by SCOUTX · Created {DATE}
> Last updated: {DATE}

---

## What This Covers

{One-line description of the job type this supplement covers.}

**This supplement is universal.** It must NEVER reference a specific project, brand, colour, or client. It teaches the craft — the patterns that make this job type work regardless of who it's for. The project's design guide handles brand identity. This handles quality.

---

## Related Supplements

These supplements were created from the same research. They MUST stay in sync — when one is updated, all must be updated in the same session.

| Worker | File | Department |
|--------|------|------------|
| | | |

{SCOUTX fills this when creating supplements. Every supplement in a research set lists all its siblings.}

---

## Studied Examples

| # | Name / URL | Why It's Here | Key Takeaway | Date Accessed |
|---|-----------|---------------|--------------|---------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

{Minimum 8 real-world examples. Actual pages studied via web research, not recalled from training data.}

---

## Patterns (What the Best All Do)

### Pattern 1: {Name}
**What:** {Description}
**Applicability:** {Universal | B2B | B2C | Regulated industries}
**Evidence:** {Which studied examples demonstrate this — cite by number}
**How to apply:** {Specific, actionable instruction for this worker}

### Pattern 2: {Name}
**What:** {Description}
**Applicability:** {Universal | B2B | B2C | Regulated industries}
**Evidence:** {Which studied examples demonstrate this — cite by number}
**How to apply:** {Specific, actionable instruction for this worker}

{Continue for all patterns found. Typically 5-10 patterns per supplement.}

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | | | |
| 2 | | | |

{Common mistakes seen in weaker examples. 3-5 minimum.}

---

## Benchmarks

{Quantitative benchmarks relevant to this worker's role.}

{For builders: layout dimensions, scroll depth targets, element counts, spacing patterns.}
{For reviewers: score thresholds, conversion rates, industry averages.}
{For planners: standard section count, expected scope, common dependencies.}

---

## Mobile Patterns

{How this job type adapts on mobile (390px viewport). Not "make it responsive" — specific structural changes.}
{e.g. "Pricing comparison table → stacked cards with swipe. Hero image → cropped to 60vh. Form fields → full width, larger touch targets."}

---

## Accessibility Patterns

{Job-type-specific accessibility requirements beyond generic WCAG.}
{e.g. for forms: "Inline validation announced to screen readers. Error summary at form top with anchor links. Required fields marked with both asterisk AND aria-required."}

---

## Performance Patterns

{Job-type-specific performance considerations.}
{e.g. for landing pages: "Hero image lazy-loaded below fold, above-fold content SSR'd. Animations deferred until after LCP. Total page weight under 500KB."}

---

## Planning Implications

{What planners (CODAX/PLANX) need to know about this job type before planning the build.}
{e.g. for landing pages: "Standard structure is 5-7 sections: hero, social proof, features, testimonials, CTA, optional FAQ. Missing sections should be explicitly scoped out, not accidentally omitted. Copy should be written BEFORE design — the story drives the layout."}

---

## Checklist

Before shipping, verify. Every item must be binary-testable (yes/no answer from reading code or measuring a value). If you can't answer yes/no, rewrite the item until you can.

- [ ] {Pattern 1 applied} — **Verify:** {how to check — CSS class, component presence, measurement}
- [ ] {Pattern 2 applied} — **Verify:** {how to check}
- [ ] {No anti-patterns present} — **Verify:** {what to grep/scan for}
- [ ] {Benchmarks met} — **Verify:** {measurement method}
- [ ] {MANUAL CHECK REQUIRED} — {items that can't be verified from code, flagged for human review}

---

## Evolution

| Date | What Changed | Why | Scope | Project | Occurrences |
|------|-------------|-----|-------|---------|-------------|
| {DATE} | Created | SCOUTX research mission: {topic} | universal | — | 1 |

**Scope values:**
- `universal` — applies to all projects. Can trigger pattern changes on refresh.
- `project:{name}` — logged for context only. MUST NOT change universal patterns.

**Occurrences:** Incremented when the same issue recurs. TRAINX increments instead of adding duplicate rows.

---

**Source research:** SCOUTX Mode 5 (Supplement Research)
**Status:** {provisional | validated | stale | retired}
**Confidence:** {High / Medium / Low}
**Review by:** {DATE — 6 months for fast-moving areas, 12 months for stable areas}
**Consuming worker:** {WORKER}
**Worker type:** {builder / reviewer / planner / checker}
