# PLANX Framework — [PROJECT] Edition

> **Archie Scaffold: Chief Blueprint Officer**
> "What's the blueprint?"
> Member of The Firm
>
> Milestone-based planning for [PROJECT-DOMAIN] features with exhaustive todo breakdowns.
---

## [PROJECT] Context

**PLANX for [PROJECT]** understands:
- Monorepo structure (`[APP-PUBLIC]`, `[APP-ADMIN]`, `packages/*`)
- [DATABASE] tables via `[DB-DRIVER]` ([entity-primary], [entity-secondary], [entity-tertiary], [entity-geo])
- [PROJECT-DOMAIN] features (search, [entity-primary], [entity-secondary], [TARGET-USER-B])
- [BUSINESS-LOGIC-KEY] model
- Phase 1 [entity-geo] ([entity-geo-1], [entity-geo-2], [entity-geo-3])

---

## The CODAX → PLANX Pipeline

```
CODAX                             PLANX
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

---

## When to Use PLANX

### Use PLANX For

- **[PROJECT-DOMAIN] features** requiring 10+ discrete steps
- **Multi-session work** spanning multiple conversations
- **Critical implementations** ([Feature A], [Feature B], [TARGET-USER-B] dashboard)
- **Uncertain scope** needing full discovery upfront

### Skip PLANX For

- Simple bug fixes
- Single-file changes
- Quick UI tweaks
- Already-planned work (CODAX produced detailed steps)

---

## [PROJECT] Milestone Templates

### [Feature A] — Search/Discovery Feature

```markdown
## Milestone 1: Search API Enhancement
- [ ] 1.1 Add bbox parameter to search API
- [ ] 1.2 Add area filter to search API
- [ ] 1.3 Optimize [entity-primary] query with indexes
- [ ] 1.4 Add pagination metadata to response

## Milestone 2: Search UI Components
- [ ] 2.1 Build SearchFilters component
- [ ] 2.2 Build [entity-primary] Card component
- [ ] 2.3 Build SearchSkeleton loading state
- [ ] 2.4 Build Pagination component

## Milestone 3: [Feature B] Integration
- [ ] 3.1 Set up [MAP-SERVICE] with [entity-primary] markers
- [ ] 3.2 Implement marker clustering
- [ ] 3.3 Build marker preview cards
- [ ] 3.4 Add bounding box sync with API

## Milestone 4: Mobile Experience
- [ ] 4.1 Build bottom sheet filters
- [ ] 4.2 Add pull-to-refresh
- [ ] 4.3 Implement infinite scroll
- [ ] 4.4 Optimize map gestures

## Milestone 5: Quality Audit
- [ ] 5.1 Brand compliance check (approved backgrounds, page rhythm, AI Slop provenance)
- [ ] 5.2 Run SOFAX audit (target 93+/110, including Dimension 11)
- [ ] 5.3 Fix identified issues
- [ ] 5.4 Verify 60fps performance
- [ ] 5.5 Test across devices
```

### [TARGET-USER-B] [entity-primary] Management

```markdown
## Milestone 1: Database & Types
- [ ] 1.1 Add confirmed_at column for [BUSINESS-LOGIC-KEY]
- [ ] 1.2 Generate TypeScript types
- [ ] 1.3 Create status calculation helper
- [ ] 1.4 Add [entity-tertiary]-scoped query helpers for data isolation

## Milestone 2: [TARGET-USER-B] API Routes
- [ ] 2.1 GET /api/[TARGET-USER-B]/[entity-primary] (with [entity-secondary] count)
- [ ] 2.2 POST /api/[TARGET-USER-B]/[entity-primary] (create)
- [ ] 2.3 PUT /api/[TARGET-USER-B]/[entity-primary]/[id] (update)
- [ ] 2.4 POST /api/[TARGET-USER-B]/[entity-primary]/[id]/confirm (refresh [BUSINESS-LOGIC-KEY])
- [ ] 2.5 DELETE /api/[TARGET-USER-B]/[entity-primary]/[id]

## Milestone 3: [entity-primary] Form
- [ ] 3.1 Build multi-step form wrapper
- [ ] 3.2 Step 1: Type selection
- [ ] 3.3 Step 2: Location with map pin
- [ ] 3.4 Step 3: Details
- [ ] 3.5 Step 4: Photo uploader
- [ ] 3.6 Step 5: Price (exact, no ambiguity)
- [ ] 3.7 Step 6: Review & publish

## Milestone 4: [entity-primary] Dashboard
- [ ] 4.1 Build [entity-primary] table with sorting
- [ ] 4.2 Add status badges (active/expiring/expired)
- [ ] 4.3 Add quick actions (edit, confirm, view)
- [ ] 4.4 Build bulk confirm action
- [ ] 4.5 Add [entity-secondary] count column

## Milestone 5: Integration
- [ ] 5.1 Add to sidebar navigation
- [ ] 5.2 Add dashboard widget for expiring [entity-primary]
- [ ] 5.3 Link to [entity-primary] detail on [APP-PUBLIC] site
```

### [entity-secondary] Management System

```markdown
## Milestone 1: [entity-secondary] Infrastructure
- [ ] 1.1 Create [entity-secondary] table schema
- [ ] 1.2 Link [entity-secondary] to [entity-primary] via [entity-primary]_id
- [ ] 1.3 Generate TypeScript types
- [ ] 1.4 Add [entity-tertiary]-scoped query filtering ([TARGET-USER-B] see their [entity-tertiary]'s [entity-secondary])

## Milestone 2: Enquiry Form
- [ ] 2.1 Build EnquiryForm component
- [ ] 2.2 POST /api/inquiries route
- [ ] 2.3 Email notification to [TARGET-USER-B]
- [ ] 2.4 Success confirmation UI

## Milestone 3: [TARGET-USER-B] [entity-secondary] Inbox
- [ ] 3.1 Build [entity-secondary] table component
- [ ] 3.2 GET /api/[TARGET-USER-B]/[entity-secondary] route
- [ ] 3.3 Add [entity-secondary] status (new, contacted, closed)
- [ ] 3.4 Add [entity-primary] context to each [entity-secondary]
- [ ] 3.5 Add quick response actions
```

---

## [PROJECT] Todo Detailed Summary Template

```markdown
#### - [ ] 2.3 Build [entity-primary] Card component
**Status:** Pending
**Summary:** Card displaying [entity-primary] preview in search results
**Detailed Summary:**
- What: Create [entity-primary] Card with image, price, key attributes, location
- Why: Core search result display, must match benchmark quality
- How: React component using existing design tokens ([BRAND-PRIMARY], [BRAND-BG])
- Acceptance:
  - Shows price formatted per [PROJECT-DOMAIN] conventions
  - Displays category + area location
  - Image loads with placeholder
  - Responsive across breakpoints
  - Click navigates to /[entity-primary]/[slug]
- Dependencies: SearchFilters complete, design tokens exist
- Files: [APP-PUBLIC]/components/[entity-primary]/[entity-primary]Card.tsx
```

---

## [PROJECT]-Specific Example

**Input:**
```
PLANX: implement [Feature A] with [Feature B]
```

**Output:**

```markdown
# PLANX: [Feature A] with [Feature B]

> **Status:** In Progress
> **Created:** [DATE]
> **Overall Progress:** 0/5 Milestones Complete

---

## Overview

Build the [entity-primary] search page with filters, list/map toggle, and bounding box filtering. Core feature for [entity-primary] discovery in [PROJECT-DOMAIN].

---

## Milestone 1: Search API Enhancement

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
The API must support map-based filtering before we can build the UI. Bounding box queries enable the map to control which [entity-primary] appear.

### Todos

#### - [ ] 1.1 Add bbox parameter to search API
**Status:** Pending
**Summary:** Support bounding box filtering for map view
**Detailed Summary:**
- What: Accept ?bbox=minLng,minLat,maxLng,maxLat query param
- Why: Map panning should filter [entity-primary] to visible area
- How: Parse bbox, add lat/lng range conditions to `db.query()` WHERE clause
- Acceptance: GET /api/search?bbox=18.5,42.3,19.0,42.5 returns only [entity-primary] in that box
- Dependencies: [entity-primary] table has lat/lng columns
- Files: [APP-API]/src/app/api/search/route.ts

#### - [ ] 1.2 Ensure lat/lng returned in response
**Status:** Pending
**Summary:** Include coordinates for map marker placement
**Detailed Summary:**
- What: Add lat, lng to [entity-primary] response object
- Why: Map needs coordinates to position markers
- How: Include lat, lng in SQL SELECT, transform for response
- Acceptance: Each [entity-primary] in response has lat and lng fields
- Dependencies: 1.1 complete
- Files: [APP-API]/src/app/api/search/route.ts

#### - [ ] 1.3 Add clustering hint to response
**Status:** Pending
**Summary:** Include count for marker clustering
**Detailed Summary:**
- What: Return total count even when paginated
- Why: UI can show "X [entity-primary] in this area" and cluster appropriately
- How: Use `SELECT COUNT(*) OVER()` window function in `db.query()`
- Acceptance: Response includes total count alongside paginated results
- Dependencies: None
- Files: [APP-API]/src/app/api/search/route.ts

#### - [ ] 1.4 Performance test with 1000+ [entity-primary]
**Status:** Pending
**Summary:** Verify query performance at scale
**Detailed Summary:**
- What: Load test bbox query with [PROJECT-DOMAIN]-sized dataset
- Why: Map filtering must be fast for good UX
- How: Seed database with test data, measure query time
- Acceptance: bbox query returns in <200ms with 1000 [entity-primary]
- Dependencies: Seed script exists
- Files: scripts/seed-test-[entity-primary].ts

---

## Milestone 2: Map Component

> **Status:** Not Started
> **Progress:** 0/5 Todos Complete

### Why This Milestone
Map is the visual core of [entity-primary] discovery for [TARGET-USER-A] unfamiliar with [PROJECT-DOMAIN] geography.

### Todos

#### - [ ] 2.1 Set up [MAP-SERVICE]
**Status:** Pending
**Summary:** Initialize map with [PROJECT-DOMAIN] default view
**Detailed Summary:**
- What: Create MapView component using [MAP-SERVICE]
- Why: [MAP-SERVICE] is [PROJECT]'s map provider with excellent performance
- How: Configure with API key, use map provider components
- Acceptance: Map renders centered on [PROJECT-DOMAIN] default coordinates
- Dependencies: Map API key in env
- Files: [APP-PUBLIC]/components/search/MapView.tsx

#### - [ ] 2.2 Add [entity-primary] markers with prices
**Status:** Pending
**Summary:** Display [entity-primary] as price markers on map
**Detailed Summary:**
- What: Render marker for each [entity-primary] showing formatted price
- Why: Price is primary info at glance, matches benchmark UX
- How: Custom marker component with price badge styling
- Acceptance: Each [entity-primary] appears as price marker at correct lat/lng
- Dependencies: 2.1 complete, API returns lat/lng
- Files: [APP-PUBLIC]/components/search/[entity-primary]Marker.tsx

#### - [ ] 2.3 Implement marker clustering
**Status:** Pending
**Summary:** Cluster markers at low zoom levels
**Detailed Summary:**
- What: Use map provider's marker clustering capability
- Why: Prevents marker overlap, improves performance
- How: Integrate clustering library, show cluster count badges
- Acceptance: Zoom out shows clusters with count, zoom in shows individual markers
- Dependencies: 2.2 complete
- Files: [APP-PUBLIC]/components/search/MapView.tsx

#### - [ ] 2.4 Add marker tap preview
**Status:** Pending
**Summary:** Show [entity-primary] preview card on marker tap
**Detailed Summary:**
- What: Popup/tooltip showing photo, price, key attributes on marker tap
- Why: Users need context before clicking through to full detail
- How: Map info window component with [entity-primary] Card mini version
- Acceptance: Tap marker → preview appears, tap preview → navigates to [entity-primary]
- Dependencies: 2.2 complete, [entity-primary] Card exists
- Files: [APP-PUBLIC]/components/search/MarkerPreview.tsx

#### - [ ] 2.5 Sync map bounds to search API
**Status:** Pending
**Summary:** Pan/zoom triggers API refetch with new bounds
**Detailed Summary:**
- What: On map moveend, update search params with current bbox
- Why: Map becomes primary filter mechanism for discovery
- How: onMoveEnd callback → update URL params → trigger search
- Acceptance: Panning map updates [entity-primary] to match visible area
- Dependencies: 1.1, 2.1 complete
- Files: [APP-API]/src/app/search/page.tsx

---

## Milestone 3: List/Map Toggle

> **Status:** Not Started
> **Progress:** 0/3 Todos Complete

### Why This Milestone
Users need flexibility between list browsing and map exploration.

### Todos

#### - [ ] 3.1 Build view toggle control
**Status:** Pending
**Summary:** Toggle button between List and Map views
**Detailed Summary:**
- What: Segmented control with List/Map options
- Why: Users have different discovery preferences
- How: Button group updating URL param ?view=list|map
- Acceptance: Toggle switches view, state persists in URL
- Dependencies: MapView and list grid both exist
- Files: [APP-PUBLIC]/components/search/ViewToggle.tsx

#### - [ ] 3.2 Implement conditional rendering
**Status:** Pending
**Summary:** Show list OR map based on toggle
**Detailed Summary:**
- What: Conditionally render [entity-primary] Card grid or MapView
- Why: Only one view visible at a time (mobile constraint)
- How: Check searchParams.view, render appropriate component
- Acceptance: view=list shows grid, view=map shows map
- Dependencies: 3.1 complete
- Files: [APP-API]/src/app/search/page.tsx

#### - [ ] 3.3 Mobile-optimize toggle placement
**Status:** Pending
**Summary:** Position toggle for thumb reach on mobile
**Detailed Summary:**
- What: Sticky toggle in bottom zone on mobile
- Why: Must be accessible without stretching thumb
- How: Fixed positioning with safe area insets
- Acceptance: Toggle reachable with one hand on mobile
- Dependencies: 3.1 complete
- Files: [APP-API]/src/app/search/page.tsx

---

## Milestone 4: Mobile Experience

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
Mobile-first per PRD. Map gestures must feel native.

### Todos

#### - [ ] 4.1 Implement map gestures
**Status:** Pending
**Summary:** Pinch-zoom and pan on map
**Detailed Summary:**
- What: Enable touch gestures for map navigation
- Why: Mobile map UX must match native apps
- How: Map provider default touch handlers + gesture configuration
- Acceptance: Pinch-zoom smooth at 60fps, pan has momentum
- Dependencies: MapView exists
- Files: [APP-PUBLIC]/components/search/MapView.tsx

#### - [ ] 4.2 Build bottom sheet marker preview
**Status:** Pending
**Summary:** Preview card slides up from bottom on marker tap
**Detailed Summary:**
- What: Bottom sheet component showing selected [entity-primary]
- Why: Mobile UX pattern, doesn't obscure map
- How: Framer Motion sheet with drag-to-dismiss
- Acceptance: Tap marker → sheet slides up, swipe down → dismisses
- Dependencies: 2.4 complete
- Files: [APP-PUBLIC]/components/search/Mobile[entity-primary]Sheet.tsx

#### - [ ] 4.3 Add pull-to-refresh on list view
**Status:** Pending
**Summary:** Pull gesture refreshes search results
**Detailed Summary:**
- What: Pull-to-refresh pattern on list view
- Why: Native mobile pattern for refreshing content
- How: Gesture handler triggering search refetch
- Acceptance: Pull down → loading indicator → fresh results
- Dependencies: List view exists
- Files: [APP-API]/src/app/search/page.tsx

#### - [ ] 4.4 Verify 60fps across devices
**Status:** Pending
**Summary:** Performance test on real devices
**Detailed Summary:**
- What: Test map and list scroll performance
- Why: 60fps is acceptance criteria per TUCHX
- How: Chrome DevTools + real device testing
- Acceptance: No jank during pan, zoom, or scroll
- Dependencies: All components complete
- Files: N/A (testing)

---

## Milestone 5: Quality Audit

> **Status:** Not Started
> **Progress:** 0/4 Todos Complete

### Why This Milestone
Launch gate - must pass brand compliance, quality frameworks, and AI Slop Test before shipping.

### Todos

#### - [ ] 5.1 Brand compliance check
**Status:** Pending
**Summary:** Verify all UI against [PROJECT] brand rules and AI Slop Test
**Detailed Summary:**
- What: Brand compliance audit — backgrounds, page rhythm, visual provenance
- Why: Every shipped page must follow the Design Guide and pass the AI Slop Test
- How: Check all backgrounds from approved list ([BRAND-BG] pages, bg-white cards, [BRAND-DARK] footer), page rhythm follows [BRAND-BG]↔white alternation, no AI slop red flags, every visual element has provenance on an existing [PROJECT] page
- Acceptance: All sections use approved backgrounds, page rhythm is correct, no novel visual patterns without explicit approval
- References: `[DESIGN-GUIDE-PATH]`, AI Slop Test (Provenance Rule), SOFAX Dimension 11
- Dependencies: All UI complete
- Files: N/A (audit)

#### - [ ] 5.2 Run SOFAX audit
**Status:** Pending
**Summary:** Design quality assessment (target 85+)
**Detailed Summary:**
- What: Full SOFAX audit on search page
- Why: Quality gate per APEX workflow
- How: Score all 11 dimensions (including Dimension 11: Brand Compliance & AI Slop), identify issues
- Acceptance: Score 85+ or issues documented for fixing
- Dependencies: 5.1 complete, all UI complete
- Files: N/A (audit)

#### - [ ] 5.3 Fix audit issues
**Status:** Pending
**Summary:** Address any issues from brand compliance and SOFAX audits
**Detailed Summary:**
- What: Fix typography, spacing, accessibility, brand compliance issues found
- Why: Must meet quality bar before launch
- How: Targeted fixes based on audit findings
- Acceptance: All issues resolved
- Dependencies: 5.1 and 5.2 complete
- Files: Various based on findings

#### - [ ] 5.4 Final verification
**Status:** Pending
**Summary:** Re-run audits and confirm passing
**Detailed Summary:**
- What: Second brand compliance check and SOFAX audit after fixes
- Why: Ensure fixes actually resolved issues
- How: Full re-audit
- Acceptance: Brand compliance confirmed, SOFAX score 93+/110
- Dependencies: 5.3 complete
- Files: N/A (audit)

---

## Completion Criteria

- [ ] All milestones marked complete
- [ ] All todos checked off
- [ ] Map shows [entity-primary] markers with prices
- [ ] Bounding box filtering works
- [ ] List/Map toggle functions correctly
- [ ] Mobile gestures smooth at 60fps
- [ ] SOFAX score 93+/110

---

## Notes & Decisions

[To be filled during execution]

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| [DATE] | Created plan | Initial PLANX planning |
```

---

## Quick Reference

### PLANX Triggers
```
PLANX: [Feature A] with [Feature B]
PLANX: [TARGET-USER-B] [entity-primary] management dashboard
PLANX: [entity-secondary] inbox system
PLANX: [entity-geo] landing pages
PLANX: saved [entity-primary] feature
```

### Depth Guidelines

**Too shallow:** "Build search"
**Too deep:** "Add import on line 3"
**Just right:** "Build [entity-primary] Card component with image, price, location"

### Milestone Sizing

- **Target:** 3-8 todos per milestone
- **Total:** 3-7 milestones per feature
- **UI milestones must include:** A "Brand constraints" field specifying approved backgrounds, page rhythm expectations, and any novel visual patterns requiring approval. Reference: `[DESIGN-GUIDE-PATH]`, AI Slop Test (Provenance Rule)

---

**Framework Status:** Generic Template
**Last Updated:** February 2026
**Version:** 2.0 (Template Edition)
