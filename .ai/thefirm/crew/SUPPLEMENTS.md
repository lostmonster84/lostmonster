# Supplements — Domain Knowledge for Workers

> Workers have playbooks (methodology), context (project knowledge), and **supplements** (domain knowledge for specific job types).

## What's a Supplement?

A supplement is **the craft** — researched domain knowledge for a specific type of job. It contains patterns, benchmarks, and anti-patterns extracted from studying the best real-world examples. Not opinions. Not best practices lists. Studied evidence of what works.

**Supplements give work its life.** Without a supplement, DEMX builds a landing page from methodology alone — technically correct but lifeless. With a supplement, DEMX builds a landing page that feels like it was designed by someone who's studied every great landing page on the internet. The difference is the difference between "functional" and "this actually works."

**Supplements are universal.** They never reference a specific project, brand, or client. A great landing page is a great landing page whether it's for a hospitality startup or a dev studio. The supplement teaches the structure, the rhythm, the conversion patterns. The project's design guide handles the brand — colours, typography, voice. These are two different layers:

| Layer | What it provides | Scope | Example |
|-------|-----------------|-------|---------|
| **Supplement** | The craft — structure, patterns, rhythm | Universal (all projects) | "Hero 80-100vh, CTA above fold, form within 2 scrolls" |
| **Design guide** | The suit — brand, colours, typography | Per-project | "Navy #1B2A4A, Inter Bold, teal CTAs" |

The supplement gives it life. The design guide gives it identity. Both apply. Neither replaces the other.

## Structure

```
crew/
├── builders/
│   ├── DEMX-dex-carousel.md              ← playbook (methodology)
│   └── supplements/
│       ├── DEMX-landing-pages.md          ← domain knowledge
│       ├── DEMX-pricing-pages.md
│       └── DEMX-email-templates.md
├── reviewers/
│   ├── AIDAX-aida-sterling.md
│   └── supplements/
│       ├── AIDAX-landing-page-conversion.md
│       └── AIDAX-onboarding-funnels.md
└── researchers/
    └── supplements/
        └── (SCOUTX doesn't consume supplements — it creates them)
```

## Naming Convention

`{WORKER}-{job-type}.md`

- Worker code comes first — always clear who owns it
- Job type is kebab-case, descriptive
- One supplement per job type per worker

## Canonical Job Type Taxonomy

The Gaffer classifies tasks against this taxonomy at Step 2 (IDENTIFY Job Types). SCOUTX names supplements from this list. Don't invent new names — use these or propose additions.

### Pages
| Job Type | Slug | Description |
|----------|------|-------------|
| Landing pages | `landing-pages` | Conversion-focused single-purpose pages (waitlist, signup, launch) |
| Homepage / product page | `homepage` | The front door — hero, social proof, features, testimonials, CTAs. Sells the whole company or product |
| Service/offering pages | `service-pages` | Individual service or feature detail pages |
| Pricing pages | `pricing-pages` | Plans, tiers, comparison grids |
| About/team pages | `about-pages` | Company story, team, mission |
| Case study/portfolio pages | `case-study-pages` | Showcasing past work with results |
| Blog/article pages | `blog-pages` | Long-form content, guides, tutorials |
| FAQ pages | `faq-pages` | Structured question/answer pages |
| Contact pages | `contact-pages` | Contact forms with context |
| Legal pages | `legal-pages` | Privacy, terms, cookie policies |
| Dashboard overview pages | `dashboard-overview` | Admin home/summary screens with KPIs |
| Detail/entity pages | `entity-detail-pages` | Individual record views (profile, property, order) |
| Settings pages | `settings-pages` | User/admin configuration screens |
| Error pages | `error-pages` | 404, 500, maintenance, empty states |

### Components
| Job Type | Slug | Description |
|----------|------|-------------|
| Hero sections | `hero-sections` | Above-the-fold entry points |
| Navigation | `navigation` | Header, sidebar, breadcrumbs, mobile menu |
| Footer | `footer` | Site-wide footer patterns |
| Forms | `forms` | Contact, signup, multi-step, search filters |
| Data tables | `data-tables` | Sortable, filterable, paginated tables |
| Card grids | `card-grids` | Product/entity listing layouts |
| Modals/dialogs | `modals` | Overlays, confirmations, detail panels |
| Search & filter | `search-filter` | Search bars, faceted filters, results |
| Empty states | `empty-states` | Zero-data, first-use, error states |
| Notifications | `notifications` | Toasts, banners, alerts, badges |
| Social proof | `social-proof` | Testimonials, reviews, trust signals, logos |
| CTA sections | `cta-sections` | Call-to-action blocks and banners |

### Flows
| Job Type | Slug | Description |
|----------|------|-------------|
| Onboarding flows | `onboarding-flows` | First-run experience, setup wizards |
| Auth flows | `auth-flows` | Login, signup, forgot password, MFA |
| Checkout/payment flows | `checkout-flows` | Cart, payment, confirmation |
| Multi-step wizards | `wizard-flows` | Any guided multi-step process |
| Booking/scheduling flows | `booking-flows` | Date selection, availability, confirmation |
| Search-to-action flows | `search-flows` | Search → filter → select → act |

### Content Types
| Job Type | Slug | Description |
|----------|------|-------------|
| Transactional emails | `transactional-emails` | Confirmations, receipts, notifications |
| Marketing emails | `marketing-emails` | Campaigns, newsletters, announcements |
| Microcopy | `microcopy` | Button labels, tooltips, error messages, placeholders |
| SEO content | `seo-content` | Meta descriptions, structured data, OG tags |

**Granularity rule:** Supplement scope should match task scope. Start with page-level and flow-level supplements. Only create component-level supplements when workers regularly get standalone component tasks. A landing page supplement covers its hero, social proof, and CTA sections within it — don't create separate hero and CTA supplements unless those are frequent standalone tasks.

**Adding new types:** If a task doesn't fit the taxonomy, add the new type here before creating a supplement. Keep the taxonomy as the single source of truth.

## How Supplements Get Created

1. **SCOUTX researches** — real web research, studying specific pages/products, extracting patterns
2. **SCOUTX outputs** — one supplement file per consuming worker, filed to their `supplements/` folder
3. **Worker reads** — before starting work, checks their supplement lookup table in their playbook

## How Supplements Get Used

Each worker's playbook has a `## Supplements` section with a lookup table:

```markdown
## Supplements

Before starting work, check for a relevant supplement:

| Job Type | Supplement | Created |
|----------|-----------|---------|
| Landing page | `supplements/DEMX-landing-pages.md` | 2026-04-03 |
| Pricing page | `supplements/DEMX-pricing-pages.md` | — |

If a supplement exists, read it BEFORE building. If no supplement exists
and the job type is unfamiliar, flag it — SCOUTX may need to research first.
```

## Supplement Lifecycle

Every supplement has a `status` field that tracks its reliability:

```
provisional → validated → stale → retired
     ↑                      ↓
     └──── refreshed ←──────┘
```

| Status | Meaning | How it gets here |
|--------|---------|-----------------|
| `provisional` | Newly created, untested | SCOUTX creates it |
| `validated` | Used in a build that passed Build Gate + Review Gate | Gaffer promotes after successful use |
| `stale` | Past its review-by date OR failed in 2+ builds | Auto-flagged by Gaffer, or TRAINX flags after failures |
| `retired` | Replaced by newer research or no longer relevant | Manual — James or Gaffer retires it |

**Rules:**
- `provisional` supplements are usable but the Gaffer notes it in the crew sheet: `"(provisional — first use)"`
- `stale` supplements trigger a warning: `"Supplement [name] is stale — recommend SCOUTX refresh before relying on it"`
- `retired` supplements are never loaded. Keep the file for reference but remove from lookup tables
- `review_by` date: 6 months for fast-moving areas (landing pages, UI patterns), 12 months for stable areas (legal pages, auth flows)
- After every build that uses a supplement, TRAINX logs to the supplement's Evolution table: what patterns were applied, what gaps were found, what the supplement missed

**Auto-refresh trigger:**
- 1st use after `stale` flag → Gaffer warns James, recommends SCOUTX refresh
- 2nd use after `stale` flag → Gaffer **blocks** the supplement from loading. James must choose: (A) run SCOUTX Mode 5 now, (B) override and use stale, (C) proceed without supplement
- Counter resets after a SCOUTX refresh

**Cross-project staleness:**
- When syncing supplement Evolution entries upstream via `/firm`, if the same pattern appears with negative feedback from 2+ different projects → flag as `stale` immediately (don't wait for 2 failures in a single project)
- SCOUTX Mode 5 refresh MUST include all cross-project Evolution entries, not just the current project's

**Feedback loop:** TRAINX owns supplement evolution. After a build, TRAINX checks:
1. Were all checklist items applicable? (Remove irrelevant ones)
2. Were any patterns missing that the build needed? (Add them)
3. Did any anti-patterns occur despite the supplement? (Strengthen the warning)
4. Did the supplement conflict with the project's design guide? (Note the conflict pattern)

This is part of TRAINX's existing Improvement Loop — not a new process.

## Conflict Hierarchy

When a supplement conflicts with other sources, this hierarchy resolves it:

1. **Project design guide** (highest) — project-specific visual/brand rules always win
2. **Project context** (playbook `## Context` section) — project-specific constraints
3. **Supplement** — universal domain knowledge
4. **Worker methodology** (lowest) — generic approach

A supplement that says "use full-bleed hero images" loses to a design guide that mandates constrained-width layouts. Supplements inform — they don't override project decisions.

## Rules

- **Research-backed, not opinion-based.** Every pattern in a supplement traces to a real-world example
- **Worker-specific.** DEMX's landing page supplement focuses on layout patterns. AIDAX's focuses on conversion benchmarks. Same research, different lens
- **Reusable across projects.** Supplements live with the worker, not the project. A good landing page is a good landing page regardless of brand
- **Evolvable.** Supplements get better every time they're used. After a build, note what worked and what the supplement missed
- **Optional, not blocking.** Workers without supplements still work — they just work from methodology alone. Supplements add domain knowledge on top
- **SCOUTX is the only writer.** Workers don't write their own supplements. SCOUTX researches, SCOUTX writes. This keeps supplements evidence-based
- **Craft, not compliance.** Supplements cover design patterns and quality standards — NOT regulatory compliance (HIPAA, GDPR, PCI-DSS). Compliance requirements belong in project context (CLAUDE.md), STANX checklists, or ALLYX rules. If a supplement mentions a compliance requirement, it references the authoritative source — it doesn't define the requirement

## Sync Rules

Supplements are **universal domain knowledge** — they sync across projects via `/firm` and `/sync`:

- **SUPPLEMENTS.md** and **_templates/supplement-template.md** — always overwritten by update.sh (pure framework)
- **Supplement files** (e.g. `DEMX-landing-pages.md`) — synced like worker files: new ones added, existing ones preserved
- **Supplement directories** (`supplements/`) — created by update.sh if missing, never deleted
- **Lookup tables** in worker playbooks — preserved during update (they're inside worker files which are never overwritten unless `--force`)
- **On `--force` update** — worker playbooks are overwritten, which resets lookup tables. Re-run SCOUTX supplement registration after a force update

**Push upstream:** When a supplement is created or improved in a project, push it upstream via `/firm` so all projects benefit.

## The Filing Cabinet Metaphor

Think of each worker as a tradesperson:
- **Playbook** = their qualifications (how they approach any job)
- **Context** = they know this house, this client (project-specific)
- **Supplement** = they open the manual for "tiling a wet room" vs "tiling a kitchen" (job-type-specific domain knowledge)

Without supplements, every job is approached from first principles. With supplements, workers bring studied knowledge of what works for this specific type of work.
