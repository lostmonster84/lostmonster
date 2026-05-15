---
worker: SEOX
identity: Saoirse Sage - SEO & Discovery Auditor
class: reviewer
slice_axis: OUTPUT
child_count: 10  # one sub-agent per dimension
child_envelope:
  receives:
    - whole artefact (rendered HTML + source files + metadata exports)
    - ONE dimension rubric (only that dimension's checkpoints + scoring + red flags)
    - target search intent + locale context
    - INSPX checkpoint screenshots if available (optional, for visible-content checks)
    - locale set (per project i18n config — the number of locales drives the Dim 6 hreflang scoring cap; emission must follow BCP 47 / ISO 639-1 conventions, with regional variants where the internal locale ID is not a valid hreflang value). Source: `[I18N-ROUTING-PATH]` for the internal locale set; mapping rules and `generateAlternates()` (or equivalent) live in `[LOCALE-ALTERNATES-PATH]`
  emits:
    - per-dimension fragment with score, top issues (file:line), gate verdict
synthesis_pattern_ref: A (Compositional rot - SEO defects compound across dimensions)
synthesis_owner: SEOX worker (not Gaffer, not Frank)
synthesis_quality_field: required
dependencies:
  hard:
    - worker: <any builder>
      reason: needs built artefact (rendered page or generateMetadata output) to audit
    - artefact: rendered HTML OR source page.tsx OR metadata export
      reason: cannot score SEO of something that does not exist
  soft:
    - worker: INSPX
      reason: provides rendered HTML at correct viewport - reveals JS-only content (invisible to crawlers)
      degraded_mode: SEOX can read source/Metadata exports directly if INSPX missing, but JS-only content gaps undetected
provides:
  - outputs.seox_score (composite, severity-weighted, NOT arithmetic mean, normalised to /100)
  - outputs.seox_cross_cutting_patterns (named patterns + cited slice_fragments)
  - outputs.seox_synthesis_quality (HIGH | MEDIUM | LOW)
  - outputs.seox_top_issues (max 3, severity-ordered, with file:line citations)
  - outputs.seox_auto_fail (boolean - true if any auto-fail condition fires regardless of score)
allowed_tools_for_subagents: [Read, Grep, Glob, Bash(read-only), WebFetch(rich-results-test only)]
forbidden_actions_for_subagents: [Edit, Write, NotebookEdit, Task, arbitrary network calls]
recursion_cap: 1 (sub-agents are leaves; cannot fan out further)
timeout_per_subagent: 60s
timeout_synthesis: 90s
total_budget: 10 minutes wall-clock worst-case (parallel) | 3 minutes target
fallback: slice_axis_override: NONE (single-threaded mode for short artefacts, isolated metadata fixes)
---

# SEOX Framework v4 (OUTPUT-sliced)

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | Project name |
| `[PROJECT-URL]` | https://lostmonster.io | Canonical production URL (e.g. `https://example.com`) |
| `[PROJECT-DOMAIN]` | Framework-driven development that actually works | One-line description of what the project does |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | Path to the project's design guide (e.g. `docs/DESIGN-GUIDE.md`) |
| `[I18N-ROUTING-PATH]` | N/A | Path to the i18n routing / locale config (e.g. `packages/shared/i18n/routing.ts:5`) |
| `[LOCALE-ALTERNATES-PATH]` | N/A | Path + line range for `generateAlternates()` (or equivalent hreflang emitter) |
| `[LOCALE-SET]` | N/A | Internal locale IDs as a list (e.g. `[en, me, ru, uk, de, tr, it]`) |
| `[HREFLANG-EMISSION-MAP]` | N/A | Map of internal IDs to emitted BCP 47 codes (e.g. `{en: en, me: sr-Latn-ME, ...}`) |
| `[CDN-HOST]` | N/A | Image/asset CDN hostname (e.g. `cdn.example.com`) |
| `[ADDRESS-COUNTRY]` | GB | ISO 3166-1 alpha-2 country code if project is geo-targeted |
| `[PRICE-CURRENCY]` | GBP | ISO 4217 currency code if project handles pricing |
| `[CALLING-CODE]` | +44 | E.164 country code if project surfaces phone numbers |
| `[PRIMARY-INTENT]` | N/A | One-line description of dominant search intent for the project (e.g. "find property to buy/rent in Montenegro") |
| `[PAGE-TYPES]` | N/A | List of indexable page types with route patterns (e.g. `homepage / search /search / detail /l/[slug] / category /[type]-in-[city]`) |
| `[NAMED-LANDMARKS]` | N/A | List of pre-trained named entities the project should anchor to (locales, brands, proper nouns) |
<!-- ONBOARD:END -->

> **Saoirse Sage: SEO & Discovery Auditor**
> On-demand SEO audit with measurable pass/fail criteria.
> v4 fan-out: 10 dimension sub-agents in parallel against the whole artefact. SEOX synthesises with compositional pattern detection.
> Run contextually on marketing pages, primary entity-detail pages, profile pages, category landings, and search.

Lost Monster's free-acquisition channel is organic search. Every marketing page that ships without proper title/meta/schema/hreflang is leaving inbound traffic on the table. Worse: a single canonical-cross-locale error voids hreflang silently for every non-default locale. SEOX exists to catch those before they ship.

---

## How to Invoke

Say any of:
- `SEOX` (with a page reference)
- `run SEOX on [page]`
- `audit SEO on [page]`

Auto-fires during BULLETPROOF Wave 2 (REVIEWERS) when the `marketing-page` signal is present. Required pairing: SOFAX (design), AIDAX (conversion), CONSX (consistency), PIXLX (edge cases), SEOX (discovery).

SEOX reads the actual code (page.tsx, generateMetadata, JSON-LD blocks), the rendered HTML (via INSPX or direct fetch), scores against the 10-dimension rubric below, and returns a structured report with line-level issues and concrete fixes.

In v4 mode (default), SEOX fans out into 10 dimension sub-agents (one per dimension), each scoring its dimension in isolation against the whole artefact, then synthesises the 10 sub-fragments into a worker-level fragment with cross-dimension pattern detection.

---

## Scoring: 10 Dimensions, 110 Points

Each dimension has binary checkpoints - they pass or fail. Points are awarded based on checkpoint pass rate within each dimension.

### Target Scores

Targets vary by page type. Fill in this table per project; the examples below are illustrative defaults — substitute the actual `[PAGE-TYPES]` for the project.

| Page Type | Target | Rationale |
|-----------|--------|-----------|
| Marketing homepage | 95+ / 110 | Highest-value page, highest scrutiny |
| Primary entity-detail page (e.g. product / listing / profile) | 90+ / 110 | Schema-heavy, conversion-critical |
| Search results page | 80+ / 110 | Dynamic content, lower schema demand |
| Category landing | 90+ / 110 | High intent, must rank |
| Profile / agent / org page | 90+ / 110 | LocalBusiness or Organization schema mandatory |
| Blog post / article | 85+ / 110 | Article schema, E-E-A-T weight |
| Account / auth pages | 60+ / 110 | Indexability concerns only |

### Rating Levels

| Score | Rating | Meaning |
|-------|--------|---------|
| 100-110 | Exceptional | Ship with pride. Best-in-market SEO posture. |
| 90-99 | Sophisticated | Launch-ready. Minor polish opportunities. |
| 80-89 | Good | Needs targeted fixes. Ship after P1 sweep. |
| 65-79 | Acceptable | MVP only. Will rank poorly. Plan a polish session. |
| Below 65 | Needs Work | Do NOT ship. Auto-fail likely. |

### Composite Score Computation

Severity weighting is baked into the dimension MAX scores, not applied as a multiplier on top. Critical dims have max 15 (Schema, Hreflang); standard dims have max 10; supporting dims (URL & Image) have max 7.5 effective via half-weighted checkpoint counting.

```
composite = sum(dim_scores)
max = 110 (sum of dim maxes: 10+10+10+15+10+15+10+10+10+10)

Per-dim maxes:
  Dim 1 Intent:       10 (standard)
  Dim 2 Title/Meta:   10 (standard)
  Dim 3 H1 hierarchy: 10 (standard)
  Dim 4 Schema:       15 (CRITICAL - max +5 above standard)
  Dim 5 Canonical:    10 (CRITICAL, full-weight max)
  Dim 6 Hreflang:     variable — base 10, +1 per additional locale beyond 1 (cap +5). E.g. a 7-locale project caps at 15; a single-locale project stays at 10.
  Dim 7 E-E-A-T:      10 (standard)
  Dim 8 Internal:     10 (standard)
  Dim 9 GEO:          10 (CRITICAL, full-weight max)
  Dim 10 URL/Image:   10 (SUPPORTING - lighter checkpoint scoring per failed check)
```

Frank #19 will BLOCK any SEOX fragment that emits a composite that doesn't equal `sum(dim_scores)` clamped by auto_fail rules. **Calibration note (2026-05-13):** prior version of this formula double-weighted by applying severity multipliers on top of already-elevated dim maxes. Found during the framework's first live smoke test on a deep entity-detail page. Simplified to direct sum.

### Auto-Fail Conditions (composite capped at 50 regardless of dim scores)

If ANY of these fire, `seox_auto_fail: true` and composite is capped at 50:
- No `<h1>` in rendered HTML on a page that needs one (multiple `<h1>` is NOT auto-fail per v4.1 - HTML5 sectioning content allows it, Mueller 2019/2022 confirmed; warning only)
- Canonical points cross-locale (e.g. `/me/...` canonicals to `/en/...`)
- Canonical points to non-200 OR non-indexable OR redirect URL (v4.1 from V1)
- Hreflang is non-reciprocal (one or more sibling missing OR sibling URL returns non-200 OR sibling is noindex - v4.1 depth from V1+V2)
- JSON-LD has parse errors (Rich Results Test or Schema Validator rejects)
- Primary entity-detail page missing its required JSON-LD `@type` entirely (e.g. a product detail without `Product`, a property detail without `RealEstateListing`, an article without `Article` / `BlogPosting`)
- Page is JS-only rendered: defined precisely (v4.1 from V6) as "critical content (`<h1>`, body intro, primary JSON-LD block) absent from the response body returned at the first HTTP request, BEFORE any JS execution"
- Stale availability/status: entity is sold/let/discontinued in the database but JSON-LD still reports it as `availability: InStock` (or equivalent active state)
- robots.txt blocks Googlebot/GPTBot/ClaudeBot/PerplexityBot on indexable routes
- Page returns 5xx (v4.1 from V6)
- Page in sitemap returns 4xx (v4.1 from V6)
- Soft 404 detected: 200 response with empty/error/"no results" body on a sitemap'd URL (v4.1 from V6)
- Conflicting robots directives across `<meta>` and `X-Robots-Tag` HTTP header on same URL (v4.1 from V1)

---

## Calibration Anchors (v4.0+ required field)

These anchors are loaded by the agent-identity-loader into every SEOX sub-agent dispatch. Without them, parallel fan-out produces severity drift. Do not edit without TRAINX review.

### Severity Definitions for SEOX

> Examples below are calibrated patterns from a multi-locale real-estate site (a 7-locale property marketplace). Substitute project-specific examples during onboarding — keep the severity shape, replace the concrete artefacts.

- **CRITICAL** - de-indexing OR ranking collapse OR Google penalty risk.
  Examples:
  - Non-default-locale page canonicals to the default-locale page (kills international rankings, hreflang voided)
  - Primary entity-detail page missing JSON-LD entirely
  - `<meta name="robots" content="noindex">` accidentally left on a marketing page
  - JSON-LD has hidden data (a marked-up fact not visible on page - Google spam policy violation)
  - JS-only SPA rendering with no SSR (AI crawlers see empty `<div id="root">`)

- **HIGH** - significant ranking loss / crawl efficiency / lost rich result eligibility.
  Examples:
  - Title tag = brand only ("Lost Monster | Home") with no intent keyword
  - Meta description missing or duplicated across all entity-detail pages
  - Schema validation errors on a detail page (e.g. a unit-bearing property without its `unitCode`)
  - Hreflang only references a subset of declared locales (entry dropped for omitted siblings)
  - Detail-page title only in metadata, not in DOM `<h1>`
  - Article-style page missing `Article` / `BlogPosting` schema

- **MEDIUM** - polish-tier / missed optimisation opportunity.
  Examples:
  - Search page title is static (should reflect filters / current query)
  - OG image is generic logo on a page that has page-specific imagery available
  - Internal linking from a detail page back to its parent category is missing
  - Alt text is the page title verbatim (descriptive but not differentiated)
  - FAQ block missing on guides that would benefit

- **LOW** - minor / aspirational.
  Examples:
  - URL slug uses ID rather than descriptive segment ("/item/4827" instead of "/item/sea-view-budva")
  - OG image not optimised dimensions (not 1200x630)
  - Cosmetic display drift between OG / schema / page body where both forms are valid (e.g. currency symbol vs ISO code)
  - Sitemap `lastmod` could be more granular

### Composite-Score Anchors

| Score band | Rating | Default gate verdict |
|------------|--------|----------------------|
| 100-110 | Exceptional | PASS |
| 90-99 | Sophisticated | PASS |
| 80-89 | Good | FIX (gate PASS only if no CRITICAL/HIGH severity in top issues) |
| 65-79 | Acceptable | FIX |
| Below 65 | Needs Work | FAIL |
| `auto_fail: true` | Capped at 50 | FAIL regardless of dim scores |

### Recurring Patterns (SEOX is calibrated to catch these)

These are scar-tissue patterns observed in live audits. Loaded into sub-agent prompts as "known failure modes":

- **Pattern: Cookie-based locale switching emits hreflang but URLs don't carry locale path** - some projects use `localePrefix: 'as-needed'` so URLs are `/search` not `/en/search`. Hreflang must reference distinct URLs per locale; verify reciprocally.
- **Pattern: Shared-package barrel imports pull server-only code into client bundles** - not strictly SEO but breaks SSR for affected pages, making them JS-only (CRITICAL for SEO).
- **Pattern: Schema markup of invisible data on entity-detail pages** - if a numeric fact (e.g. `numberOfBedrooms`, `numberOfRooms`, ratings count) is in JSON-LD but not visible in the rendered UI, that's a Google spam policy hit.
- **Pattern: Stale or drifted pricing in legacy locale files** - if monetary values in schema/copy drift from source of truth, schema becomes false advertising.
- **Pattern: `availability: InStock` (or equivalent) left on sold/let/discontinued entities** - data freshness bug. Entities flipped to sold/inactive in DB but JSON-LD not regenerated until next deploy. Flag as auto-fail.
- **Pattern: Em-dashes in marketing copy** - SOFAX/CONSX already flag these as brand violations; SEOX additionally notes some AI engines down-weight em-dash patterns as "AI-written slop".
- **Pattern: Hreflang ZERO on multi-locale page** - root layout emits hreflang in metadata via `generateAlternates()` (or equivalent), but deep dynamic-route pages don't inherit it correctly. Rendered HTML returns zero `hreflang=` entries despite the project declaring multiple locales. Lighthouse SEO grades this PASS (because hreflang VALUES weren't invalid - they were absent, and Lighthouse's hreflang audit only validates present values). This is a CRITICAL miss that Lighthouse cannot catch by design. SEOX Dim 6 catches at audit time.
- **Pattern: Generic templated title across thousands of entities** - scraper or template emits the same "{Entity-type} in {City}, {Area}" string as both `<title>` and `<h1>` for every record. No differentiating value/feature/price. Title cannibalisation risk: thousands of pages compete for the same query intent. Distinct from "title too short" - this is title generic-ness.
- **Pattern: Meta description truncated mid-word with `...`** - source descriptions truncate to a hard character limit ending mid-word ("With a total l..."). Looks broken in SERP snippets. Truncation should end at word boundary + meaningful unit, ideally summarising the entity rather than chopping the body verbatim.

---

## The 10 Dimensions

### Dim 1: Search Intent & Content Match (0-10, CRITICAL weight per v4.1 - V3 evidence)

**What:** Does the page answer the dominant query intent for its target audience? Is it the destination of the search, or a stepping stone?

**Confidence:** validated. The March 2026 Google core update was THE biggest content-quality lever; thin/templated/aggregator-style content lost 30-50% organic visibility. Search intent match correlates directly with post-HCU survival.

**v4.1 additions:**
- Explicit intent classification per Kevin Indig (V2): label this page's primary intent as one of `informational | commercial | transactional | navigational`. Audit asks: does the page format match the intent label?
- Cannibalisation flag (V2 from Indig): note if another page on the project targets the same intent. (Single-page audit can't verify across pages - SEOX flags suspected cannibalisation for CONSX to cross-check site-wide.)
- Intent-shift detection (V2 from Glenn Gabe): if SERP for the target query has changed character (was informational, now transactional), the page may be off-intent through no fault of its content.

**Checkpoints:**
- [ ] Page intent is clear from H1 + first 100 words
- [ ] Above-the-fold content answers the implied query (no marketing preamble)
- [ ] Content type matches intent (transactional intent = listings visible; informational = explainer text first)
- [ ] No "Welcome to..." or generic landing-page filler before the substance
- [ ] No forced sign-up wall before content (Google Helpful Content penalty)
- [ ] Page is not a duplicate of another with different keywords (cannibalisation)
- [ ] For listing/search/index pages: primary filters visible, result count visible, sort control visible without scroll
- [ ] For entity-detail pages: hero imagery + price (where applicable) + key specs in first viewport
- [ ] For profile / agent / org pages: holdings count + trust badge + contact visible
- [ ] For category landings: real local/topical content, not boilerplate marketing prose

**Scoring:** -1 per failed checkpoint. 10 = page is the obvious best result for its intent.

**Red flags:** Hero copy before content, AI-generic filler ("Mediterranean lifestyle..."), boilerplate identical across listings, infinite-scroll-only pagination.

### Dim 2: Title Tag & Meta Description (0-10, STANDARD weight)

**What:** Title and meta description quality. The two SERP signals a user reads before clicking.

**Checkpoints:**
- [ ] Title present and unique across the site
- [ ] Title within pixel-width SERP truncation (v4.1 from V1) - target ≤561 pixels rendered (Google's truncation point, more accurate than the 60-char heuristic); soft warning under 200 pixels (too short)
- [ ] Title has primary intent keyword at front (not buried after brand)
- [ ] Title for location-specific pages includes city/region
- [ ] Title is NOT identical to H1 (complementary, not duplicate)
- [ ] Meta description present and within pixel-width target (v4.1 from V1) - target ≤985 pixels rendered (≈140-160 chars rule of thumb but pixel-width is canonical); soft warning under 400 pixels
- [ ] Meta description contains a CTA verb and the unique selling point
- [ ] Meta description for local pages mentions city/region
- [ ] OG title + OG description present and distinct from page title where appropriate
- [ ] OG image is page-specific (not generic logo) for content pages

**Scoring:** -1 per failed checkpoint.

**Red flags:** "Lost Monster | Home" (brand-only title), title = H1 verbatim, auto-generated meta from first paragraph, identical metas across entity-detail pages, generic OG image on a page that has page-specific imagery available.

### Dim 3: Heading Hierarchy (0-10, SUPPORTING weight per v4.1 - V3 evidence-base)

**What:** H1 present, headings answer questions users would ask, hierarchy is semantically useful (not enforced rigidly).

**Confidence:** vibes (V3 finding: no major correlation study lists heading hierarchy in top 10 ranking factors; Mueller deprioritises). Kept because it aids LLM passage retrievability (Mike King, V2) and accessibility, NOT because it directly ranks.

**Checkpoints:**
- [ ] At least one `<h1>` in the rendered DOM (missing entirely triggers auto-fail)
- [ ] H1 is descriptive and contains the primary entity (city, property type, agency name)
- [ ] H1 is visible to the user (not hidden via CSS, not metadata-only)
- [ ] Heading structure is skim-readable (logical outline, even if multiple H1s exist within HTML5 sectioning content - that's allowed)
- [ ] No heading-styled-as-decoration (h2 used for typography weight, not structure)
- [ ] For entity-detail pages: H1 = entity name/title (visible on page, not just in `<title>`)
- [ ] For category landings: H1 includes the category + location/qualifier (e.g. "{Type} for {action} in {place}")
- [ ] For profile / agent / org pages: H1 = the entity's display name + trust/status signal
- [ ] **Passage retrievability** (v4.1 from V2 / Mike King) - H2-led self-contained sections of ~150-300 words each (helps LLM citation; this is GEO-adjacent)

**Scoring:** -1 per failed checkpoint. Missing H1 entirely triggers auto-fail. Multiple H1s within sectioning content = no penalty (v4.1 correction).

**Red flags:** H1 = brand name only ("Lost Monster"), H1 buried in metadata not DOM, h2 elements with `font-weight: bold` styled as h3 visually but semantically wrong.

### Dim 4: Structured Data / Schema.org (0-15, CRITICAL weight)

**What:** JSON-LD presence, validity, type-correctness, completeness, and visibility match.

**Checkpoints (general):**
- [ ] JSON-LD is valid JSON (parses without error)
- [ ] `@context: "https://schema.org"` set exactly
- [ ] `@type` matches page intent (RealEstateListing for property, RealEstateAgent for agency, etc.)
- [ ] All marked-up facts are visible to the user on the page (Google's #1 spam policy)
- [ ] No deprecated `SearchAction` sitelinks searchbox (deprecated Nov 2024)
- [ ] `BreadcrumbList` present on pages deeper than home, matches visible breadcrumb UI exactly
- [ ] No duplicate `@id` across pages
- [ ] **No duplicate JSON-LD blocks emitting the same `@type`+`@id` with different content** - a common Next.js bug pattern: root layout + page-level metadata both emit Organization+WebSite with conflicting `description` and `logo` fields
- [ ] **Entity-graph `@id` linkage** (v4.1 from V4) - property `RealEstateListing.provider` or `broker` references the agency `@id`; agency `RealEstateAgent.makesOffer` references the property `@id`. Closed graph = AI engines traverse confidently.
- [ ] **Listing status taxonomy correct** (v4.1 from V4 - sold/let handling). `availability` field uses one of: `InStock` (active), `LimitedAvailability` (under offer / let agreed), `SoldOut` (completed), `Discontinued` (withdrawn). Source: https://schema.org/ItemAvailability (canonical enum). NOT 410 immediately, NOT noindex on sale-completion - keep page indexed 6-12 months for residual traffic + link equity, then 301 to category landing.
- [ ] **CollectionPage + ItemList schema** on category/landing pages (v4.1 from V4) - `/for-sale-in-budva` should emit `CollectionPage` with `mainEntity: ItemList` of property URLs (URLs only, NOT inlined full RealEstateListings per item - link to detail page).
- [ ] **EPC / Energy rating fields** where applicable (v4.1 from V4) - `energyEfficiencyScaleMax` / `energyEfficiencyScaleMin` for EU markets. Mandatory in many countries; useful signal for Montenegro expat audience.
- [ ] **`tourBookingPage` field on rentals / bookable inventory** (v4.1 from V4) - if the project supports viewing/booking, link it from the schema.
- [ ] **NAP consistency cross-check** (v4.1 from V4) - the `telephone` and `address` in JSON-LD must match the visible DOM text. Mismatch is a Google spam policy hit AND breaks local-pack rankings.
- [ ] **JSON-LD passes Google's Rich Results Test** (v4.1 from V1) - not just schema.org valid. Google's validator runs additional rich-result-specific requirements.

**Checkpoints (vertical-specific — example: real-estate property detail):**

> Replace this entire block with the vertical-appropriate checkpoint set for `Lost Monster`. The example below is for a multi-locale real-estate marketplace. Other verticals: products use `Product` + `Offer`, articles use `Article`, profiles use `Person` / `Organization`, courses use `Course` + `CourseInstance`, etc. Keep the shape (mandatory fields, ISO codes, unit codes) — substitute the vertical-specific values.

- [ ] Entity subtype is present in ONE of these valid patterns (v4.1 correction from V4 red-team - the `@type` array form is non-standard; production sites use nested or sibling). The example below is for real estate; substitute the appropriate Schema.org parent + subtype for `Lost Monster`'s vertical:
  - **Pattern A (preferred)**: nest the specific subtype inside the parent's `about`, e.g. `"about": { "@type": "Apartment", ... }` inside a `RealEstateListing`
  - **Pattern B**: emit two separate JSON-LD blocks - one parent (`RealEstateListing`) + one specific (`Apartment`) - linked by `@id` cross-reference
  - **Pattern C (uncommon but valid)**: `@type` array (e.g. `["RealEstateListing", "Apartment"]`) - technically valid Schema.org, accept but don't require
  - Valid Accommodation subtypes (Schema.org official, real-estate example): `Apartment`, `House`, `SingleFamilyResidence`, `Room`, `Suite`, `Accommodation` (parent class for fallback). Source: https://schema.org/Accommodation (subtype tree). **NOT valid**: `Villa`, `Penthouse`, `Studio`, `Loft`, `Bungalow` - these are marketing categories not in the schema.org type tree. A "villa" listing should use `House` with descriptive name/description. Other verticals will have analogous valid-vs-marketing subtype distinctions.
- [ ] `address.addressCountry: "GB"` (ISO 3166-1 alpha-2, NOT the country's full name)
- [ ] `geo.latitude` and `geo.longitude` are NUMBERS, not strings, 4+ decimal places, within the project's geo-bounds
- [ ] `offers.price` is numeric or numeric-string
- [ ] `offers.priceCurrency: "GBP"` (ISO 4217, never the symbol)
- [ ] `image` array has 3+ URLs on `[CDN-HOST]`, all return 200
- [ ] `floorSize.unitCode: "MTK"` (UN/CEFACT square metres) — substitute the vertical-appropriate unit code if not real estate
- [ ] `datePosted` ISO-8601, within 6 months OR `dateModified` recent
- [ ] Rent/recurring listings: `leaseLength` + `UnitPriceSpecification` with appropriate `unitCode` (e.g. `"MON"` for monthly) and `businessFunction: "LeaseOut"`
- [ ] `availability` matches DB state (auto-fail if `InStock` on sold/let/discontinued entity)

**Checkpoints (vertical-specific — example: agent / org profile):**
- [ ] `@type` matches the entity (e.g. `RealEstateAgent`, `LocalBusiness` subtype) per Schema.org
- [ ] `aggregateRating` only present IF real reviews are visibly rendered (fake = manual action risk)
- [ ] `telephone` in E.164 format with the correct `+44` country code
- [ ] `priceRange` populated where the entity is a LocalBusiness (recommended)
- [ ] `areaServed` lists the geographic regions the entity operates in

**Checkpoints (homepage):**
- [ ] `Organization` + `WebSite` graph (no deprecated SearchAction)
- [ ] `Organization.sameAs` includes social profiles

**Scoring:** -1.5 per failed checkpoint. Primary entity-detail page missing schema entirely triggers auto-fail. Validation error on Rich Results Test triggers auto-fail.

**Red flags:** country names instead of ISO 3166-1 codes in `addressCountry`, currency symbols instead of ISO 4217 codes in `priceCurrency`, `latitude` as a string, `Product` schema on a vertical that has a more specific Schema.org type (type-specificity violation per Google policy), fake `aggregateRating`.

### Dim 5: Canonical & Indexability (0-10, CRITICAL weight)

**What:** Canonical URLs correct, robots directives intentional, indexability matches commercial intent, signals consistent across surfaces.

**Confidence:** validated. Canonicalisation directly governs whether a page ranks at all (V3 - strongest case of all four CRITICALs).

**Checkpoints:**
- [ ] `alternates.canonical` set on every indexable page
- [ ] Canonical URL is absolute (`https://lostmonster.io/...`), not relative
- [ ] Canonical points to self (not to English master across locales - common error)
- [ ] **Canonical target validity** (v4.1 from V1) - canonical URL returns 200, is indexable, is NOT a redirect, is NOT noindex
- [ ] **Self-referencing canonical present on indexable Next.js dynamic routes** (v4.1 from V1 - silent killer)
- [ ] No `<meta name="robots" content="noindex">` on indexable pages (auto-fail if found)
- [ ] `robots.txt` allows Googlebot on indexable routes
- [ ] `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended on indexable routes (for AI citation eligibility)
- [ ] **No conflicting robots directives** (v4.1 from V1) - `<meta name="robots">`, `X-Robots-Tag` HTTP header, and robots.txt must agree on this URL
- [ ] Thin filter combinations (`/search?` with no results) emit `noindex`
- [ ] Sort variants emit `noindex` or canonicalise to base
- [ ] Sitemap includes this page (or this page is intentionally excluded)
- [ ] **Sitemap consistency** (v4.1 from V1) - if URL is indexable, it MUST be in sitemap; if in sitemap, it MUST be 200 + canonical-self + indexable
- [ ] **Cross-signal consistency** (v4.1 from V2 - Mueller's biggest single technical drum) - canonical, hreflang self-ref, OG `url`, HTML `lang`, sitemap loc all agree on this URL's identity. Conflicts confuse Google's signal aggregation.
- [ ] **Mixed content + HSTS + critical security headers** (v4.1 from V1) - HTTPS, HSTS present, no http:// resources in HTTPS page, X-Content-Type-Options, basic security headers. HTTPS is a confirmed ranking signal since 2014.
- [ ] **No redirect chains** (v4.1 from V1) - this URL doesn't participate in a chain >1 hop
- [ ] Redirect pages (`/rent` → `/search?type=rent`) don't carry metadata that conflicts with target

**Scoring:** -1 per failed checkpoint (16 checks, capped at -10).

**Red flags:** Canonical pointing to non-existent page (404 canonical), all locales canonicalised to `/en/` master (kills international rankings - #1 international SEO error), noindex left on after dev, redirect chain loops, mixed http+https resources.

### Dim 6: International & Hreflang (0-15, CRITICAL weight — scales with locale count)

**What:** Hreflang implementation correctness across all locales in `[LOCALE-SET]`. This dimension's max scales with locale count: base 10 + 1 per additional locale beyond 1 (cap +5). A multi-locale project (e.g. 7 locales) caps at 15; a single-locale project stays at 10 and many of these checkpoints become non-applicable.

**Checkpoints:**
- [ ] Exactly one hreflang method used (head `<link>` OR HTTP header OR sitemap - never mixed)
- [ ] Every locale variant lists all siblings + self-reference (`N+1` entries minimum if `x-default` used, where N = `[LOCALE-SET]` size)
- [ ] Self-reference is present (each locale variant declares `hreflang` to itself with its own emitted code)
- [ ] `x-default` present and points to the project's safe fallback (typically the default locale)
- [ ] Language codes valid: ISO 639-1 lowercase for the language portion; BCP 47 regional variant (`language-Script-REGION`) where the internal locale ID is not a valid hreflang value (e.g. an internal `me` for Montenegrin emits as `sr-Latn-ME` because `cnr` is ISO 639-3 only and Google honours it inconsistently). Source: ISO 639-1 standard (canonical list at https://www.loc.gov/standards/iso639-2/php/code_list.php) + BCP 47 for regional variants. Per-project locale set + mapping: see `[HREFLANG-EMISSION-MAP]` and the source in `[I18N-ROUTING-PATH]`.
- [ ] If region codes used, uppercase ISO 3166-1 alpha-2 (`GB`, never `gb`; format `language-REGION` with hyphen)
- [ ] Each locale's canonical points to SELF (not to English master - voids hreflang entirely)
- [ ] All `href` URLs are absolute (`https://...`), not relative
- [ ] No IP/Accept-Language auto-redirect on indexable URLs (Googlebot crawls from US IPs)
- [ ] Locale switching uses banner/option, not forced redirect on homepage
- [ ] **Reciprocal linking verified** (every locale lists every other locale + self - Aleyda Solis per V2: the #1 silent killer)
- [ ] **Hreflang target validity** (v4.1 from V1) - every sibling URL declared in hreflang returns 200 AND is indexable AND is not a redirect AND is not canonicalised away
- [ ] **Hreflang/canonical agreement** (v4.1 from V2 - Aleyda) - if any sibling listed in hreflang canonicals back to the default-locale master, hreflang is voided. Each locale's canonical must be self-referencing
- [ ] **HTML lang and OG locale agreement** (v4.1 from V2 / V4) - `<html lang="...">`, OG `locale`, and the page's hreflang self-ref must all agree. If `<html lang="sr">` but the rendered body content is the default-locale fallback, that's "locale drift" - flag for content team
- [ ] **Locale-localised JSON-LD content** (v4.1 from V4) - schema `name` and `description` should match the page's locale, not be hardcoded default-locale across all locale variants
- [ ] Watch for ambiguous language codes that conflict with region codes (classic example: `uk` is Ukrainian per ISO 639-1, NOT United Kingdom - `en-GB` would be for UK English). Flag any project whose locale list mixes these levels of code

**Scoring:** failed checkpoints penalised to add up to the per-project dim max (e.g. -1.25 per failed checkpoint on a 7-locale project where dim max is 15).

**Red flags (the 6 silent killers - any one voids hreflang with no GSC error):**
1. Non-reciprocal links (A→B without B→A) - whole annotation ignored
2. Cross-locale canonical - hreflang overridden by Google
3. Wrong region code (`en-UK` instead of `en-GB`) - entry dropped
4. Capitalisation wrong (`EN-us`, `en_US`) - entry dropped
5. Relative URLs - entry dropped
6. IP redirect on canonical URL - Googlebot can't reach foreign locales

### Dim 7: E-E-A-T Signals (0-10, CRITICAL weight per v4.1 - V3 evidence, March 2026 update)

**What:** Experience, Expertise, Authority, Trust signals on the page. E-E-A-T behaves as a binary gate in AI Overviews (96% of AI Overview citations come from sources with strong E-E-A-T) AND was empirically rewarded by the March 2026 Google core update - which contradicts Mueller's public "not a ranking factor" stance. Trust the update behaviour over the statements.

**Confidence:** directional (high). March 2026 update is fresh evidence; calibration anchors based on observed behaviour, not on Google's documented spec.

**v4.1 additions:**
- Author entity Knowledge Graph linkage per Lily Ray (V2): does the author's `Person` schema have `sameAs` to Wikipedia / LinkedIn / Crunchbase / Wikidata / ORCID? Mere bio markup without entity linkage is weak.
- YMYL classifier gate per Marie Haynes (V2): for property purchase (financial decision) and rental (consumer protection), this is YMYL-adjacent. Author credentials, sources, transparency block become MANDATORY, not optional.
- First-hand experience markers per Lily Ray (V2): original photos with EXIF, dated visits, specific personal observations (not generic AI-vocab descriptions).
- Page transparency block per Marie Haynes (V2): author + publication date + last-reviewed date + sources cited, all visible (not just in schema).

**Checkpoints:**
- [ ] Named author/agency byline visible (not "Admin" or anonymous)
- [ ] Link from byline to author/agency profile bio
- [ ] Credentials visible (license number for agencies, years active, verified badge)
- [ ] `datePosted` and `dateModified` visible on page (not just in schema)
- [ ] Photos look first-hand (not generic stock imagery for the project's vertical)
- [ ] Contact path to a real human (email/phone/form visible)
- [ ] For profile / agent / org pages: verified status surfaced visually + in schema
- [ ] For article / blog content: "Reviewed by" or author bio block with credentials
- [ ] Author `Person` schema linked with `sameAs` (LinkedIn, Wikidata) where applicable
- [ ] No "AI-generated" tells (em-dash patterns, "delve/leverage" vocabulary, generic intros)

**Scoring:** -1 per failed checkpoint.

**Red flags:** "Admin" byline, no updated date, mismatched stock photography (generic destination/category image used on a different location's page), anonymous content, AI-vocabulary patterns.

### Dim 8: Internal Linking & Crawl Path (0-10, STANDARD weight)

**What:** Internal link structure, breadcrumb completeness, crawl depth, related-content modules, inbound link equity to this page.

**Confidence:** validated for outbound structure (Mueller confirms internal linking signals page-level importance, V2). Directional for inbound-equity scoring (Cyrus Shepard's 23M-link study is the strongest evidence base).

**Checkpoints (outbound from this page):**
- [ ] Breadcrumbs present and visible (not just in schema)
- [ ] `BreadcrumbList` schema matches visible breadcrumb UI exactly
- [ ] Final breadcrumb item has NO `item` URL (it's the current page)
- [ ] Click depth to any primary entity-detail page ≤3 from homepage
- [ ] Entity-detail page links to its parent/owner profile (e.g. listing → agency, product → brand, article → author)
- [ ] Entity-detail page has a "More from this {owner}" or "Similar {entities}" module
- [ ] Search results paginated with crawlable `<a>` links (not JS-only "load more")
- [ ] **Pagination uses self-canonical per page** (v4.1 from V4) - NOT canonical-to-page-1 (Google deprecated rel=prev/next in 2019; self-canonical is current best practice)
- [ ] **All outbound internal links resolve** (v4.1 from V1) - every `<a href>` returns 200, not redirect chain, not noindex target
- [ ] Footer surfaces the project's main category + location/qualifier hubs
- [ ] Category pages link laterally (sibling categories in the same parent context)
- [ ] No orphan pages (every indexable page reachable from at least one other indexable page - cross-page check, SEOX flags suspicion for CONSX)
- [ ] **Descriptive anchor text** (v4.1 from V2 / Cyrus Shepard) - no "click here", "read more", "view"; anchor describes destination

**Checkpoints (inbound link equity TO this page - v4.1 from V2 / Cyrus Shepard's 23M study):**
- [ ] Inbound internal link count: aim for the 40-50 ceiling (sitewide nav dilutes beyond this)
- [ ] Inbound anchor text variety (multiple distinct anchor strings linking here = traffic signal)
- [ ] First-Link-Priority awareness: if nav and body both link to this page, the nav anchor wins per Google. Body anchor variety only counts if different from nav anchor.

**Scoring:** -1 per failed checkpoint (capped at -10).

**Red flags:** Entities only reachable via JS-driven search, infinite-scroll-only pagination, breadcrumbs decorative without schema, missing related-entity module, broken internal links.

### Dim 9: GEO / LLM Discoverability (0-10, CRITICAL weight - per v4.1 with reshaped checkpoints)

**What:** Optimisation for citation by AI engines (ChatGPT, Perplexity, Claude, Google AI Overviews, Bing Copilot). For local-intent verticals, AI Overviews trigger on a large share of long-tail queries (e.g. real-estate-AIO triggers on ~50% of local-intent queries per the FlyDragon benchmark / V5). The actual battlefield for `Lost Monster` if it serves local-intent queries.

**Confidence:** directional. The 2024 Princeton paper SEOX was originally built on is **only "one-third right" by 2026 replication** (V5): statistics density replicates with the correct sign; citation density and quotation density (the famous "+40% lift") do NOT replicate in production AI engines. Calibration is based on what survived independent replication, not on the original paper's full tactic list.

**v4.1 reshaped checkpoints** (V5 evidence, May 2026):

**Heavy weighted (replicated, validated 2026):**
- [ ] Critical content present in `view-source:` HTML before any JS execution (auto-fail if not - AI bots don't execute JS; 73% of sites fail this per V5)
- [ ] Answer-first lede: page intent answered in first 100-200 words (44.2% of LLM citations come from first 30% of body per ConvertMate 2026)
- [ ] Original / first-party data on page (the surviving Princeton tactic - statistics with sources)
- [ ] Freshness signal visible: `dateModified` + "Listed/updated X days ago" string. 30-day window correlates with 3.2x citation multiplier per V5; pages >14 days old see -23%
- [ ] `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended

**Medium weighted (correlation, not causation - still useful):**
- [ ] H1 phrased as searchable question or clear definition (helps passage retrievability)
- [ ] Schema.org structured data present (Bing Copilot honours; others use for entity disambiguation - present/absent matters, elaborate nesting is NOT a separate bonus per V5)
- [ ] Distance markers as structured prose where geo-relevant ("350m from {named landmark}")
- [ ] Named landmarks / pre-trained entities mentioned where relevant (see `[NAMED-LANDMARKS]` for the project's anchor entity list) - anchors to pre-trained AI entities

**Dropped from v4.0 (didn't replicate per V5)**:
- ~~Quotation density bonus~~ (Princeton tactic, didn't replicate)
- ~~Inline citation density bonus~~ (Princeton tactic, didn't replicate)
- ~~`llms.txt` presence bonus~~ (10% adoption, zero measurable citation lift per V5 - keep if it exists, don't reward as a checkpoint)
- ~~FAQ schema as "magic bullet"~~ (Google deprecated FAQ rich results May 2026 per V4; modest correlation only)

**Scoring:** -1 per failed checkpoint.

**Red flags:** JS-only rendering (auto-fail), content behind tabs/accordions requiring click, gated content, AI bots blocked in robots.txt, em-dash + "delve/leverage" patterns.

**Vertical-specific GEO insight (V5):** transient entity-detail pages (anything with rapid lifecycle — sold/let cycles, sold-out products, expired offers) are the WRONG GEO target. They're too volatile to be cited reliably. **Stable evergreen pages** (topic guides, location guides, methodology pages, comparison pages) are the citation surface. SEOX flags this distinction: high-GEO-weighting on stable evergreen pages, lower expected GEO score on individual transient entity pages.

### Dim 10: URL Structure & Image SEO (0-10, SUPPORTING weight)

**What:** URL slug quality and image optimisation.

**Checkpoints (URL):**
- [ ] URLs are short, readable, lowercase, hyphenated
- [ ] URLs include descriptive slug where relevant (`/item/sea-view-budva-12345` not `/item/12345`)
- [ ] URLs are stable (don't break when title edits)
- [ ] No session params indexed
- [ ] No trailing-slash inconsistency
- [ ] Locale routing matches the project's design (e.g. cookie-based with `localePrefix: 'as-needed'` means URLs don't carry locale prefix; prefix-based routing means they do — verify whichever pattern the project uses)
- [ ] **No slug-pattern duplication within a single URL** — common scraper / template bug pattern: an entity slug ends up duplicated within its own path (e.g. `/item/foo-bar-foo-bar-3`). Origin is usually scraper config or a template that concatenates path segments twice; SEOX catches it at audit time regardless of root cause.

**Checkpoints (Image):**
- [ ] Descriptive `alt` text (not "image1.jpg", not empty)
- [ ] `loading="lazy"` on below-fold images
- [ ] `fetchpriority="high"` on LCP image
- [ ] Modern format (WebP/AVIF via next/image)
- [ ] Responsive `srcset` via next/image `sizes` prop
- [ ] Dimensions set to prevent CLS
- [ ] Original imagery where possible (first-hand / contributor-supplied, not generic stock)

**Scoring:** -0.625 per failed checkpoint (10 total across 16 checks).

**Red flags:** `/item?id=4827` style URLs, generic `alt="image"`, 4MB hero JPGs, the same stock image reused across multiple entity-detail pages.

---

## Output Format

Every SEOX audit produces this exact structure:

### SEOX Audit: [Page Name]

**Page:** [file path]
**URL:** [canonical URL]
**Locale(s) audited:** [en | en+me+... | all 7]
**Viewport:** [Desktop / Mobile / Both]
**Source:** [INSPX checkpoints | direct fetch | source-only]

### Scorecard

Direct sum of per-dim scores. Severity is encoded by per-dim max (15 vs 10), not by multipliers.

| # | Dimension | Score | Pass/Fail Details |
|---|-----------|-------|-------------------|
| 1 | Intent & Content Match | 8/10 | (1 checkpoint failed: marketing preamble before listings) |
| 2 | Title & Meta | 9/10 | (OG image generic) |
| 3 | Heading Hierarchy | 9/10 | (H1 visible OK; H2 nesting minor skip) |
| 4 | Schema.org | 12/15 | (BreadcrumbList missing final item URL handling) |
| 5 | Canonical & Indexability | 10/10 | All checks pass |
| 6 | Hreflang | 11/15 | (`uk` locale missing from sitemap variant) |
| 7 | E-E-A-T | 8/10 | (no author bio link, dateModified hidden) |
| 8 | Internal Linking | 9/10 | (no "similar listings" module) |
| 9 | GEO / LLM Discoverability | 7/10 | (no FAQ block, no comparison table) |
| 10 | URL & Image | 8/10 | (alt text not differentiated) |

### TOTAL: 91 / 110 (Sophisticated)

```
composite = 8+9+9+12+10+11+8+9+7+8 = 91
max = 10+10+10+15+10+15+10+10+10+10 = 110
```

**Auto-fail:** false

### Top 3 Issues (severity-ordered)

1. **HIGH - Hreflang missing a locale variant in sitemap** - `<sitemap-file>:<line>` - the locale isn't being emitted, voiding hreflang for that locale's variants → add it to the alternates loop.
2. **HIGH - Entity-detail H1 not in DOM** - `<entity-detail page>:<line>` - entity title only in `<title>` and metadata, not visible as `<h1>` → wrap entity title in `<h1 className="...">`.
3. **MEDIUM - GEO citation patterns missing** - same file - no FAQ block, no comparison table for differentiators → add FAQ section with FAQPage schema after the entity description.

### Quick Wins (< 5 min each)

- [ ] Add the missing locale to sitemap alternates loop - `<sitemap-file>:<line>`
- [ ] Wrap entity title in `<h1>` - `<entity-detail page>:<line>`
- [ ] Differentiate entity-card alt text with location + key spec - `<card-component>:<line>`

### Cross-Dimension Patterns Detected

- **Pattern: Hreflang + Schema both missing the same locale** - whatever omits a locale from sitemap likely omits it from `generateAlternates()` too. Verify both, fix together. Composite impact: -3 dim points across Dim 5 + Dim 6.
- **Pattern: H1 missing in DOM AND first 100 words don't contain primary keyword** - the entity title is the page's primary keyword, and it's neither in DOM h1 nor in the first paragraph. Single fix (DOM h1) closes both Dim 3 and Dim 1.

### Gate Verdict

**PASS** (composite ≥90, no CRITICAL severity, no auto-fail)

---

## Lost Monster Context

**SEOX for Lost Monster** understands (fill in at /sync time from the onboarding manifest):
- Whether organic search is the project's primary free-acquisition channel (drives Dim 1/2/4/5 weight).
- The locale set (`[LOCALE-SET]`) and its hreflang emission map (`[HREFLANG-EMISSION-MAP]`). Multi-locale projects: hreflang correctness is non-negotiable. Single-locale projects: Dim 6 contracts to base 10 and most reciprocity checks are non-applicable.
- The locale-routing pattern (cookie-based vs prefix-based) and the path that emits hreflang (`[LOCALE-ALTERNATES-PATH]`).
- The Schema.org `@type` mandatory on the project's primary entity-detail page (e.g. `RealEstateListing` + `Accommodation` for real estate; `Product` + `Offer` for commerce; `Article` for editorial; etc.).
- Project-specific schema constants: `GB`, `GBP`, and any vertical-specific unit codes (e.g. `floorSize.unitCode: "MTK"`).
- That the entity-detail page title must be in DOM `<h1>`, not just `<title>`.
- Which evergreen pages are the project's high-value GEO surfaces (comparison pages, methodology pages, guides) — these get the highest GEO scrutiny.
- The project's `[NAMED-LANDMARKS]` (locales, brands, proper nouns) that anchor pages to pre-trained AI entities.

**SEOX hunts bugs across the project's `[PAGE-TYPES]`. Typical patterns:**
- Primary entity-detail pages: schema completeness, h1 in DOM, hreflang reciprocity
- Search results: static title (should be dynamic), facet UX, crawlable pagination
- Category landings: real local/topical content, schema, breadcrumbs
- Profile / agent / org pages: LocalBusiness schema, E-E-A-T, verified badge surfacing
- Homepage: Organization + WebSite graph, no deprecated SearchAction
- Article / blog posts: missing Article/BlogPosting schema
- Secondary marketing pages frequently missing metadata — flag for sweep

**SEOX defers to:**
- **BLAZX** for Core Web Vitals (LCP, INP, CLS) - SEOX checks the structural prerequisites (preload, fetchpriority, sizes) but performance numbers belong to BLAZX
- **WORDX** for actual copy writing - SEOX flags missing/weak title+meta+h1 but doesn't write replacements
- **PLANX-SEO-GEO** for planning new SEO features (a new landing page targeting a keyword) - SEOX audits EXISTING pages

---

## Checkpoint Mode (INSPX Integration)

When INSPX has run before SEOX, SEOX consumes checkpoint screenshots + rendered HTML + viewport metadata directly. This is the preferred path because it reveals JS-only content (content present in source.tsx but absent from rendered HTML - invisible to crawlers).

Checkpoint format SEOX expects:
```json
{
  "page": "<source page path>",
  "url": "https://lostmonster.io/<canonical-path>",
  "viewport": "desktop_1280x800",
  "rendered_html_path": ".inspx-runs/<session>/desktop/<id>.html",
  "screenshot_path": ".inspx-runs/<session>/desktop/<id>.png",
  "metadata_export": {"title": "...", "description": "...", "alternates": {...}},
  "jsonld_blocks": [{"@type": "<vertical-appropriate @type>", ...}]
}
```

Degraded mode: if INSPX hasn't run, SEOX reads source files + `generateMetadata` exports directly. Coverage drops on:
- JS-only content detection (can't tell what renders without execution)
- Visible-but-styled-hidden checks (e.g. headings styled as decorative)
- Actual rendered title (could differ from source if template chains apply)

---

## v4 Restructuring Summary

This is the v4 OUTPUT-sliced restructure of SEOX. The v3 plan would have been a single agent: one context, full artefact, all 10 dimensions audited sequentially in the same head. v4 splits along OUTPUT (dimensions): 10 sub-agents each take the whole artefact + ONE dimension's rubric, score in isolation, return a fragment. SEOX worker (synthesis pass) composes the 10 fragments with cross-dimension pattern detection.

**Why OUTPUT-sliced (not INPUT-sliced):** dimensions are independent (Title vs Schema don't share decisions), so parallel-fan-out scales linearly. The synthesis pass earns its keep by detecting compositional patterns - e.g. "H1 missing AND first-paragraph-keyword missing AND content match weak" all share a root cause that no single sub-agent can see.

**Synthesis pattern: A (Compositional rot).** SEO defects compound. Missing H1 + thin meta + weak intent + canonical-wrong = page essentially invisible. Single fix to canonical wouldn't recover. SEOX flags the compound at synthesis time.

---

## Sub-agent Envelope Spec (v4 OUTPUT-sliced)

### Template

```yaml
envelope_id: <session>-seox-dim-<N>
parent_worker: SEOX
worker_role: SEO & Discovery sub-auditor (dimension N)
slice_axis: OUTPUT
sub_fragment_id: dim-<N>-<dimension-slug>

context:
  artefact_paths:
    - <entity-detail page path>
    - <root layout / metadata path>
  inspx_checkpoints:
    - .inspx-runs/<session>/desktop/<id>.html
    - .inspx-runs/<session>/desktop/<id>.png
  metadata_export: <inline JSON of generateMetadata output>
  jsonld_blocks: <inline array of parsed JSON-LD>
  locale_set: <[LOCALE-SET] — internal IDs>
  hreflang_emission_map: <[HREFLANG-EMISSION-MAP]>
  target_intent: <e.g. "transactional - entity-detail page for {action} in {location}">

dimension_rubric:
  dimension_id: <N>
  dimension_name: <e.g. "Schema.org">
  max_score: <10 | 15>
  weight: <CRITICAL 1.5 | STANDARD 1.0 | SUPPORTING 0.75>
  checkpoints: [<verbatim from playbook>]
  red_flags: [<verbatim from playbook>]
  calibration_anchors:
    severity_examples: <project-specific from playbook (filled at /sync time)>
    recurring_patterns: <project-specific from playbook (filled at /sync time)>

allowed_tools: [Read, Grep, Glob, Bash(read-only), WebFetch(rich-results-test only)]
forbidden_actions: [Edit, Write, NotebookEdit, Task, arbitrary network calls]
recursion_cap: 1
timeout: 60s

emit:
  sub_fragment_id: dim-<N>-<dimension-slug>
  dim_score: <0-10 | 0-15>
  checkpoints_passed: <count>
  checkpoints_failed: <count>
  failed_checkpoints: [<list with file:line citations>]
  red_flags_hit: [<list>]
  gate: PASS | FIX | FAIL
  auto_fail_triggered: <boolean - per Dim's auto-fail conditions>
  top_issues: [<max 2 per sub-fragment, severity-ordered>]
  evidence:
    files_read: [<paths>]
    grep_matches: [<key matches>]
    rich_results_test_url: <if applicable>
```

---

## Per-Dimension Sub-Agent Rubrics (compact)

Each sub-agent receives the dimension block above verbatim. Compact references below:

| # | Dimension | Max | Weight | Auto-fail trigger |
|---|-----------|-----|--------|-------------------|
| 1 | Intent & Content Match | 10 | 1.0 | None at dim level |
| 2 | Title & Meta | 10 | 1.0 | None at dim level |
| 3 | Heading Hierarchy | 10 | 1.0 | No H1 or multiple H1 in DOM |
| 4 | Schema.org | 15 | 1.5 | Listing page missing schema entirely, OR Rich Results Test parse error |
| 5 | Canonical & Indexability | 10 | 1.5 | `noindex` on indexable page, OR canonical 404, OR cross-locale canonical |
| 6 | Hreflang | 15 | 1.5 | Non-reciprocal, OR cross-locale canonical, OR ≥2 silent killers |
| 7 | E-E-A-T | 10 | 1.0 | None at dim level (cumulative effect) |
| 8 | Internal Linking | 10 | 1.0 | None at dim level |
| 9 | GEO / LLM Discoverability | 10 | 1.5 | JS-only rendering (content not in source HTML) |
| 10 | URL & Image | 10 | 0.75 | None at dim level |

---

## Synthesis Discipline

### What SEOX synthesises that no sub-agent can see

Sub-agents see one dimension. SEOX synthesis sees all 10 fragments + the artefact + recurring-pattern history. The cross-cuts SEOX is calibrated to detect (v4.1 - patterns 1+5 from v4.0 collapsed into one; 4 new patterns added from V2/V6):

1. **Hreflang × Sitemap × Canonical × locale-set compound** - if locale X is missing from sitemap AND hreflang AND canonical-alternates, it's one bug (missing from the locale array), not three. This includes the classic ambiguous-code confusion (e.g. `uk` Ukrainian vs `uk` United Kingdom) - same root cause class. Synthesis collapses to one issue.
2. **H1 missing × Intent miss × Title duplicate** - the page's primary keyword is the H1, and it's nowhere in DOM, nowhere in first paragraph, and the title is generic. Single root cause: the page template forgot to render the entity name. One fix closes 3 dim regressions.
3. **Schema marked-up data invisible × E-E-A-T missing dates** - `dateModified` in JSON-LD but not visible, `author` in JSON-LD but no byline. Same root cause: SEO scaffolding done in schema but not surfaced visually. Triggers Google spam policy.
4. **GEO fail × JS-only render × Schema empty in initial HTML** - SPA pages with no SSR. Schema present in source but never injected in initial HTML response body. AI bots and SEOX sub-agents (if no INSPX) both blind.
5. **Schema-vs-DOM drift** (v4.1 from V6) - JSON-LD declares 4 bedrooms, DOM displays 3. JSON-LD `availability: InStock`, page shows "Sold". Google spam policy hit. Root cause: schema generated from one data source, page rendered from another, sources drift.
6. **Sitemap orphans** (v4.1 from V6) - page is indexable, has canonical, but not in sitemap. Or in sitemap but returns 404. Discoverability bug pattern - same root cause class as canonical/hreflang inconsistency but specific to sitemap drift.
7. **Mixed canonical signals** (v4.1 from V6) - `<link rel=canonical>` says X, response header `Link: <Y>; rel=canonical` says Y, OG `url` says Z. Common Next.js misconfiguration; Google picks one signal but you can't predict which.
8. **Locale drift** (v4.1 from V6) - `<html lang="<non-default>">` but the rendered body content is the default-locale fallback (translation missing in next-intl / i18n layer). The page is structurally a non-default-locale page but contains none of that locale's content. Most common silent i18n bug, kills the locale variant in foreign SERPs.

### Cross-dimension patterns SEOX MUST detect

When the synthesis pass runs, it MUST inspect for these 5 patterns and populate `cross_cutting_patterns: []` with any hits. Empty `cross_cutting_patterns` when 3+ dims FAIL is a Frank #19 BLOCK.

### Pattern detection rules (pseudocode)

```python
patterns = []

# Pattern 1: Hreflang × Sitemap compound
if dim6.fails_mention("locale uk") and dim8.fails_mention("sitemap uk"):
    patterns.append({
        "name": "locale-uk-missing-everywhere",
        "slice_fragments": ["dim-6-hreflang", "dim-8-internal-linking"],
        "root_cause": "locale array in generateAlternates() or sitemap loop omits 'uk'",
        "single_fix_closes": ["dim-6", "dim-8"]
    })

# Pattern 2: H1 × Intent × Title compound
if dim3.h1_missing_in_dom and dim1.first_paragraph_lacks_keyword and dim2.title_generic:
    patterns.append({
        "name": "entity-name-not-surfaced",
        "slice_fragments": ["dim-1", "dim-2", "dim-3"],
        "root_cause": "page template renders entity in metadata only, not in body",
        "single_fix_closes": ["dim-1", "dim-2", "dim-3"]
    })

# Pattern 3: Schema invisible × E-E-A-T missing dates
if dim4.invisible_data_violations and dim7.dates_not_visible:
    patterns.append({
        "name": "metadata-without-surfacing",
        "slice_fragments": ["dim-4", "dim-7"],
        "root_cause": "SEO data exists in schema/metadata but not rendered visually",
        "single_fix_closes": ["dim-4", "dim-7"]
    })

# Pattern 4: GEO × JS-only × Schema missing in rendered HTML
if dim9.js_only_render and dim4.schema_missing_in_rendered_html:
    patterns.append({
        "name": "spa-no-ssr",
        "slice_fragments": ["dim-4", "dim-9"],
        "root_cause": "page is client-rendered, SEO scaffolding never reaches initial HTML",
        "single_fix_closes": ["dim-4", "dim-9", "potentially-dim-1-3"]
    })

# Pattern 5: ambiguous-locale-code confusion (example: uk Ukrainian vs UK region)
if dim6.fails_mention("en-UK") and dim6.fails_mention("uk"):
    patterns.append({
        "name": "ambiguous-locale-code-conflation",
        "slice_fragments": ["dim-6"],
        "root_cause": "developer conflated a language code with a region code (classic: Ukrainian 'uk' vs United Kingdom region)",
        "single_fix_closes": ["dim-6"]
    })

return patterns
```

### Composite severity rules

```python
# Direct sum. Severity is baked into dim max scores (15 for CRITICAL Schema+Hreflang;
# 10 for everything else). No multipliers - applying both elevated maxes AND multipliers
# was the v4.0 bug caught in V6 red-team review.
composite = sum(dim_scores)
max_score = 110  # 10+10+10+15+10+15+10+10+10+10

# Auto-fail cap
if any_auto_fail_triggered:
    composite = min(composite, 50)
    auto_fail = True

# Gate
if auto_fail:
    gate = "FAIL"
elif composite >= 90:
    gate = "PASS"
elif composite >= 65:
    gate = "FIX"
else:
    gate = "FAIL"
```

### Synthesis prompt template

```
You are SEOX synthesis. You have 10 sub-fragments below, one per dimension.

Your job:
1. Compute the severity-weighted composite (NOT arithmetic mean - Frank #19 blocks that)
2. Inspect for the 5 cross-dimension patterns documented in the playbook
3. Populate cross_cutting_patterns[] - if 3+ dims FAIL and you return [], Frank blocks
4. Pick top 3 issues across all fragments, severity-ordered, max one per dim unless severity ties
5. Write synthesis_rationale (minimum 100 words) explaining the composite and patterns
6. Set synthesis_quality:
   - HIGH if all 10 fragments composed and patterns detected/refuted with evidence
   - MEDIUM if 8-9 fragments OR patterns inspected but not fully cited
   - LOW if <8 fragments OR no pattern inspection
7. Emit auto_fail = true if ANY dim triggered its dim-level auto-fail

Return the fragment in the format documented in PROTOCOL.md fragment-schema.

DO NOT fabricate file:line citations. DO NOT promote synthesis_quality to HIGH if pattern inspection wasn't done with evidence.
```

---

## Anti-pattern Flags (Frank #19 Grounds, SEOX-Specific)

These 6 patterns are explicit BLOCK conditions for SEOX worker-level fragments. Frank's check #19 hunts for them in every SEOX fragment.

**Flag 1: Arithmetic mean as composite score.**
If `composite == sum(dim_scores) / 10` (no severity weighting), BLOCK. Severity weighting is mandatory. The formula in the playbook is the only valid one.

**Flag 2: synthesis_rationale shorter than 100 words.**
If `len(synthesis_rationale.split()) < 100`, BLOCK. A short rationale means no synthesis happened - just a roll-up of sub-fragments. The synthesis pass earns its keep by pattern detection.

**Flag 3: cross_cutting_patterns[] empty when 3+ dimensions FAIL.**
If 3+ sub-fragments return gate=FAIL AND `cross_cutting_patterns == []` AND `cross_cutting_patterns_inspected != true`, BLOCK. Multiple FAILing dims always cluster into at least one root cause. If synthesis genuinely inspected and found none, it must say so with `cross_cutting_patterns_inspected: true, none_found_rationale: <...>`.

**Flag 4: auto_fail true but composite > 50.**
The composite must be capped at 50 when `auto_fail == true`. If the fragment emits both, BLOCK - the synthesis pass is lying about severity.

**Flag 5: synthesis_quality = HIGH with sub_fragment_count < 10.**
If `synthesis_quality == "HIGH"` AND fewer than 10 slice_fragments composed, BLOCK. Quality inflation - synthesis can't be HIGH if it didn't compose all dimensions. Should be MEDIUM (8-9) or LOW (<8).

**Flag 6: Primary entity-detail page missing its mandatory schema flagged in dim-4 but composite > 80.**
Vertical-specific. If the artefact is a primary entity-detail page for the project's vertical (route pattern matches `[PAGE-TYPES]` entry for entity-detail) AND dim-4 reports the mandatory `@type` (e.g. `RealEstateListing`, `Product`, `Article`) missing AND composite > 80, BLOCK. This is typically the highest-leverage SEO failure for the project — missing it can't be hidden by other dims passing.

**Detection mechanism:** Frank loads the SEOX fragment, runs each flag as a pure-function assertion. Any flag firing = SEOX fragment rejected, Gaffer re-dispatches synthesis pass (not full fan-out), TRAINX logs the anti-pattern for calibration.

---

## Integration with Other Frameworks

| Framework | Integration |
|-----------|-------------|
| **SOFAX** | SOFAX scores VISUAL design (110 pts); SEOX scores DISCOVERY (110 pts). Run both in BULLETPROOF Wave 2 on every marketing page. No overlap - SOFAX's Dim 11 (Brand Compliance) is separate from SEOX's E-E-A-T dimension. |
| **AIDAX** | AIDAX scores CONVERSION (AIDA framework, 0-100); SEOX scores DISCOVERABILITY. A page can convert well but rank poorly, or vice versa. Composite quality = both must pass. |
| **PIXLX** | PIXLX audits edge cases (mobile, empty, error, loading, role-mix). SEOX's GEO dim cares about JS-only rendering which PIXLX may already flag. Cross-reference if both fire. |
| **CONSX** | CONSX detects cross-page inconsistencies (duplicate titles across pages, inconsistent breadcrumbs). SEOX detects on-page structure issues. CONSX is necessary for site-wide hreflang reciprocity audits beyond SEOX's single-page scope. |
| **NIGELX** | NIGELX checks copy/usability. SEOX flags MISSING title/meta; NIGELX rewrites them to pass The Nigel Test. Handoff at top-issues stage. |
| **BLAZX** | SEOX defers Core Web Vitals scoring to BLAZX entirely. SEOX checks structural prerequisites (preload, fetchpriority, sizes attr) but performance numbers are BLAZX's domain. |
| **WORDX** | SEOX flags missing/weak copy; WORDX writes replacements. Handoff at fix stage. WORDX uses SEOX's identified target keyword as input. |
| **ALLYX** | ALLYX audits accessibility. Overlap with SEOX on h1 hierarchy (a11y also requires single h1) - both should agree; if not, file as cross-cutting pattern. |
| **STANX** | If SEOX detects a URL-based security issue (e.g. session token in canonical URL), escalate to STANX. |
| **INSPX** | SEOX Checkpoint Mode receives rendered HTML + viewport screenshots from INSPX. Strongly preferred over source-only mode. |
| **PLANX-SEO-GEO** | PLANX-SEO-GEO plans NEW SEO features (a landing page targeting a keyword). SEOX audits EXISTING pages. Orthogonal. If PLANX-SEO-GEO outputs a plan, SEOX audits the built result. |

---

## Migration Path from v3.x

SEOX has no v3.x version - this is the v4.0 first release. Future minor versions should refine calibration anchors (severity examples) and recurring patterns based on what SEOX catches across `Lost Monster` shipping sessions. Major version bumps reserved for structural changes (new dimensions, scoring weight changes).

---

## Empirical Promotion Criteria

For SEOX v4.0 to promote from PROVISIONAL to STABLE:

1. **3 live audits** on real `Lost Monster` marketing pages (covering the project's major page types — e.g. entity-detail, category landing, profile) - sub-agent fan-out completes within 3-minute target, synthesis quality HIGH on at least 2.
2. **1 caught regression** - SEOX detects a real SEO defect that would have shipped (e.g. canonical-cross-locale during a locale refactor, or missing schema after a template refactor).
3. **0 false positives** at HIGH severity across the 3 audits (LOW false positives acceptable, HIGH false positives indicate calibration drift).
4. **Calibration anchors expanded** from initial 5 recurring patterns to 8+ as scar tissue accumulates.
5. **Cross-dimension pattern catalogue exercised** - at least 2 of the 5 documented patterns triggered and synthesis correctly composed.

---

## Framework Status

- **Version:** v4.1 (validation-patched - 2026-05-13 same-day, fresh-eyes audited later same day)
- **Status:** CLEARED on authoring (fresh-eyes audit independence met 2026-05-13). PROVISIONAL on Empirical Promotion Criteria (1 of 3 live audits run, 0 caught regressions yet). Promotion to STABLE remains gated by: 3 live audits + 1 caught regression + 0 HIGH false positives.
- **Last updated:** 2026-05-13 (fresh-eyes audit promotion + FA-1 fact-list citations backfilled)
- **Authored by:** v4.0 - 7 parallel research agents + Gaffer synthesis (HospoJobs pattern). v4.1 - 6 parallel validation agents (tool gap, expert checklists, severity calibration, RE vertical depth, GEO 2026 update, red-team) + Gaffer patch composition. Fresh-eyes audit by distinct Explore agent 2026-05-13 (separate from author) confirmed FA-1/FA-2/Frank #19 compliance and promoted authoring status from PROVISIONAL to CLEARED per Execution Contract Rule 10.
- **Brand Compliance Chain role:** REVIEW phase (Wave 2 of BULLETPROOF), parallel to SOFAX/AIDAX/PIXLX/CONSX
- **Per-project criticality:** scales with the project's reliance on organic search and its locale count. Multi-locale projects with organic search as a primary acquisition channel: HIGH. Single-locale, paid-acquisition-only projects: MEDIUM (Dim 6 contracts; other dims still ship-blocking).

### v4.1 Changelog (validation pass)

**Critical bugs fixed:**
- Composite formula contradicted itself in 3 places (spec + worked example + synthesis pseudocode). Now: direct `sum(dim_scores)`, severity encoded by per-dim max (15 vs 10), no multipliers.
- Locale set was placeholder fiction. Corrected to be filled per project from `[I18N-ROUTING-PATH]`. Documented the `internal-locale-id → BCP-47-code` mapping pattern (e.g. a project's `me → sr-Latn-ME` emission) as a required ONBOARD token.
- Accommodation subtype list included invalid schema.org types (Villa/Penthouse/Studio/Loft/Bungalow are marketing categories, not schema types). Restricted to: Apartment, House, SingleFamilyResidence, Room, Suite, Accommodation.
- `@type` array form (`["RealEstateListing", "Apartment"]`) was documented as required - it's non-standard. Production sites use nested `about: {@type: "Apartment"}` or sibling blocks linked by `@id`. v4.1 accepts all 3 patterns.
- Multiple-H1 auto-fail was outdated (HTML5 sectioning content allows it, Mueller 2019/2022 confirmed). Now: only missing-H1 entirely is auto-fail.

**Severity recalibrations** (V3 evidence):
- Search Intent & Content Match: STANDARD → CRITICAL (March 2026 core update was the biggest content-quality lever)
- E-E-A-T Signals: STANDARD → CRITICAL (March 2026 update behaviour contradicted Mueller's public stance)
- Heading Hierarchy: STANDARD → SUPPORTING (no major correlation study lists it; Mueller deprioritises)

**GEO dim reshaped** (V5 evidence - May 2026 update):
- Princeton paper found only "one-third right" by 2026 replication: stats density replicates, citation/quotation density does NOT.
- Dropped: quotation density bonus, citation density bonus, `llms.txt` presence bonus, FAQ-schema-as-magic-bullet.
- Added/elevated: first-30%-content quality (44.2% of LLM citations), freshness signal (30-day window = 3.2x multiplier), original first-party data, AI crawler accessibility (heavy weighting).
- Severity stays CRITICAL but content of dim shifted from speculative tactics to replicated ones.

**New checkpoints added** (V1 must-add + V2 expert convergence + V4 RE vertical):
- Dim 2: Pixel-width title (561px) and meta description (985px) targets
- Dim 4: Entity-graph `@id` linkage; listing status taxonomy; CollectionPage+ItemList for category pages; EPC/Energy fields; tourBookingPage for rentals; NAP consistency cross-check (DOM vs JSON-LD); Google Rich Results Test validation (not just schema.org)
- Dim 5: Canonical target validity (200 + indexable); self-referencing canonical on dynamic routes; cross-signal consistency (canonical ↔ hreflang ↔ OG ↔ sitemap ↔ HTML lang); mixed content + HSTS; redirect chain detection; conflicting robots directives
- Dim 6: Hreflang target validity (200 + indexable + not redirected); hreflang/canonical agreement; HTML lang vs OG locale vs hreflang agreement; locale-localised JSON-LD content
- Dim 7: Author entity Knowledge Graph linkage (Lily Ray); YMYL classifier gate (Marie Haynes); first-hand experience markers; page transparency block
- Dim 8: Inbound link equity audit (count, anchor diversity, First-Link-Priority awareness per Cyrus Shepard); descriptive anchor text; pagination self-canonical (not rel=prev/next)

**Auto-fails added:** page returns 5xx; page in sitemap returns 4xx; soft 404 (200 with empty/no-results body); conflicting robots directives.

**Auto-fail loosened:** multiple `<h1>` no longer auto-fails (HTML5 sectioning content allows it).

**Patterns:** v4.0 patterns 1+5 collapsed (same uk-confusion root cause). Added: Schema-vs-DOM drift, Sitemap orphans, Mixed canonical signals, Locale drift (`<html lang="me">` with English fallback body).

**Confidence tagging:** each dimension now declares its evidence basis as `validated | directional | vibes`. Honest about epistemic state - Schema/Canonical/Intent are validated; E-E-A-T/Hreflang/GEO are directional; Heading hierarchy is vibes.

**Honest unresolved gaps** (V6 - acknowledged, not fixed):
- 10-parallel-sub-agent fan-out plus Frank #19 anti-pattern flags may over-engineer for single-market-scale projects. 80% of value likely comes from 3 dims (Schema, Hreflang, Canonical). Operational decision pending - run all 10 in CI or only the CRITICAL 4?
- Several checkpoints in Dim 1 + Dim 7 are aspirational, not testable from rendered HTML alone ("first-hand photos", "answers implied query"). Calibration drift expected; TRAINX will patch as drift accumulates.
- The dimension list still doesn't cover: log-file SEO analysis, GBP integration, sitewide cannibalisation detection, backlink-quality signals. These belong to full-site audits or other workers, not per-page SEOX.
