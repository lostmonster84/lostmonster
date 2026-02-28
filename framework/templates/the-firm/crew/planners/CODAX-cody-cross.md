# CODAX Planning Framework — [PROJECT] Edition

> **Cody Cross: Chief Planning Officer**
> "What's the plan?"
> Member of The Firm
>
> A thinking methodology for planning [PROJECT-DOMAIN] features.
---

## [PROJECT] Context

**CODAX for [PROJECT]** understands:
- Monorepo structure (`[APP-PUBLIC]`, `[APP-ADMIN]`, `packages/*`)
- [DATABASE] with [DB-DRIVER] ([entity-primary], [entity-secondary], [entity-tertiary], [entity-geo])
- [PROJECT-DOMAIN] terminology ([BUSINESS-LOGIC-KEY], trust signals)
- Phase 1 [entity-geo] ([entity-geo-1], [entity-geo-2], [entity-geo-3])
- PRD principles (core UX rules specific to [PROJECT])

### Brand Compliance Gate

When planning any UI work, CODAX must include brand constraints in the plan output:

- **Reference:** `[DESIGN-GUIDE-PATH]` (approved backgrounds, page rhythm, card treatment)
- **Reference:** AI Slop Test (Provenance Rule — every visual element must exist on another [PROJECT] page)
- The plan's **Details** section must specify which approved backgrounds each section uses (e.g. `[BRAND-BG]` page background, `bg-white` elevated cards, `[BRAND-DARK]` footer)
- The plan's **Acceptance Criteria** must include: "Passes SOFAX Dimension 11 (Brand Compliance & AI Slop)"
- If the plan introduces a visual pattern that doesn't exist elsewhere on the site, **flag it explicitly for approval** before proceeding
- When planning multiple sections for the same page, verify backgrounds alternate (`[BRAND-BG]` ↔ `white`). Never specify two adjacent sections with the same background

---

## When to Use CODAX

✅ **Use CODAX for:**
- New [PROJECT-DOMAIN] features ([Feature A], [Feature B], [Feature C])
- [TARGET-USER-B] dashboard sections
- [entity-primary] flows (create, edit, confirm)
- [entity-secondary] management features
- [entity-geo] landing pages
- Anything touching multiple files

❌ **Skip CODAX for:**
- Simple bug fixes
- Single-file style changes
- Obvious, trivial tasks
- Emergency hotfixes

---

## CODAX for [PROJECT] Features

### Light CODAX (Default)

**Think in CODAX dimensions, communicate conversationally:**

> "I see we need to add [Feature B] to [Feature A] results (context). The goal is to help users discover [entity-primary] geographically - key for [TARGET-USER-A] unfamiliar with [PROJECT-DOMAIN] areas (objective). I'm thinking a toggle between list/[Feature B], [MAP-SERVICE] markers with [entity-primary] prices, tap-to-preview cards, and bounding box filtering (details). We'll verify it works across mobile/desktop, markers cluster properly, and matches benchmark quality (acceptance). Sound good?"

### Heavy CODAX (When Needed)

Write formal document when:
- User requests detailed plan
- Multiple stakeholders involved
- Major architectural decision
- Future reference needed

---

## [PROJECT] CODAX Templates

### Template 1: [Feature A] — Search/Discovery Feature

```markdown
# CODAX Plan: [Feature A] Enhancement

## C - CONTEXT
**Current State:**
- Search page: `[APP-PUBLIC]/src/app/search/page.tsx`
- API: `[APP-PUBLIC]/src/app/api/search/route.ts`
- Filters: type, category, attributes, price (already working)
- Missing: [Feature B], area filter, saved searches

**[PROJECT] Context:**
- Phase 1 [entity-geo]: [entity-geo-1], [entity-geo-2], [entity-geo-3]
- PRD: Map pin is authoritative for location
- Design: [BRAND-PRIMARY] accent, [BRAND-BG] backgrounds
- Mobile-first, [TARGET-USER-A]-friendly

## O - OBJECTIVE
**Primary Goal:**
Add [Feature B] toggle with [entity-primary] markers and bounding box filtering

**Secondary Goals:**
- Cluster markers at zoom levels
- Show [entity-primary] preview on marker tap
- Sync map bounds with search results

**Why This Matters:**
- [TARGET-USER-A] don't know [PROJECT-DOMAIN] areas
- [Feature B] is primary discovery tool (PRD principle)
- Benchmark competitors: [Feature B] is essential

## D - DETAILS
**Layout:**
```
+-----------------------------------------+
| [Filters]        [List] [Map] toggle    |
+-----------------------------------------+
|                                         |
|   Results                               |
|   - List view: Card grid                |
|   - Map view: [MAP-SERVICE] + markers   |
|                                         |
+-----------------------------------------+
```

**Map Implementation:**
- [MAP-SERVICE]
- Price markers (formatted per [PROJECT-DOMAIN] conventions)
- Cluster at zoom < 12
- Tap marker → preview card (photo, price, key attributes)
- Pan/zoom → filter by bounding box

**API Changes:**
- Add bbox param: `?bbox=minLng,minLat,maxLng,maxLat`
- Return lat/lng in [entity-primary] response
- Performance: limit to 100 markers visible

**Responsive:**
- Desktop: Side-by-side list + map (future)
- Mobile: Toggle between list/map views
- Bottom sheet preview on marker tap

## A - ACCEPTANCE
**Success Metrics:**
- ✅ Map shows [entity-primary] markers with prices
- ✅ Clusters work at low zoom levels
- ✅ Tap marker → preview card appears
- ✅ Bounding box filter syncs with API
- ✅ 60fps pan/zoom performance
- ✅ Works on mobile (iOS Safari, Chrome Android)
- ✅ Matches benchmark quality
```

---

### Template 2: [Feature B] — Admin Management Dashboard

```markdown
# CODAX Plan: [TARGET-USER-B] [entity-primary] Dashboard

## C - CONTEXT
**Current State:**
- Admin app: `[APP-ADMIN]/`
- Sidebar with: Dashboard, [entity-primary], [entity-secondary], Settings
- Database: [entity-primary] table with [entity-tertiary]_id FK ([DATABASE], [DB-DRIVER])
- Auth: Custom session-based (bcrypt + cookies) with [entity-tertiary] role

**[PROJECT] Context:**
- [BUSINESS-LOGIC-KEY] model (confirmed_at timestamp)
- [TARGET-USER-B] auto-publish, owners need approval
- [entity-secondary] count per [entity-primary] important metric

## O - OBJECTIVE
**Primary Goal:**
Complete [entity-primary] management for [TARGET-USER-B] (view, create, edit, confirm availability)

**Secondary Goals:**
- Show [entity-primary] [BUSINESS-LOGIC-KEY] status
- One-click confirm availability
- [entity-secondary] count per [entity-primary]

**Why This Matters:**
- [TARGET-USER-B] are primary content providers
- [BUSINESS-LOGIC-KEY] is [PROJECT]'s core differentiator
- Easy management = more [entity-primary] = more value

## D - DETAILS
**Pages:**
- `/[entity-primary]` - Table of [TARGET-USER-B]'s [entity-primary]
- `/[entity-primary]/new` - Multi-step create form
- `/[entity-primary]/[id]/edit` - Edit existing [entity-primary]
- Dashboard widget: [entity-primary] requiring attention

**[entity-primary] Table Columns:**
| Photo | Title | Category | Price | Status | [entity-secondary] | Actions |
- Status badge: Active (green), Expiring (yellow), Expired (red)
- Actions: Edit, Confirm, View on site

**[BUSINESS-LOGIC-KEY] Logic:**
```typescript
const status = item.confirmed_at
  ? daysSince(item.confirmed_at) > 30 ? 'expired'
    : daysSince(item.confirmed_at) > 23 ? 'expiring'
    : 'active'
  : 'draft'
```

**Create [entity-primary] Form (Steps):**
1. Type selection
2. Location (category, area, address, map pin)
3. Details (key attributes, features)
4. Photos (min 5, drag to reorder)
5. Price (exact, no ambiguity)
6. Review & Publish

## A - ACCEPTANCE
**Success Metrics:**
- ✅ [TARGET-USER-B] sees only their [entity-tertiary]'s [entity-primary]
- ✅ Status badges reflect [BUSINESS-LOGIC-KEY] correctly
- ✅ One-click confirm refreshes confirmed_at
- ✅ [entity-secondary] count shows correctly
- ✅ Create flow completes without errors
- ✅ API auth enforces [entity-tertiary] isolation
```

---

### Template 3: [Feature C] — [entity-geo] Landing Page

```markdown
# CODAX Plan: [entity-geo] Landing Page ([entity-geo-1])

## C - CONTEXT
**Current State:**
- No [entity-geo] pages yet
- Homepage has [entity-geo] cards linking to search
- Data: [entity-primary].category field

**[PROJECT] Context:**
- Phase 1 [entity-geo]: [entity-geo-1] (sub-areas), [entity-geo-2], [entity-geo-3]
- [TARGET-USER-A]-friendly: Need location context, not just search
- SEO: [entity-geo] pages important for organic traffic

## O - OBJECTIVE
**Primary Goal:**
Create compelling [entity-geo] landing page that educates [TARGET-USER-A] about the area and drives [entity-primary] search

**Secondary Goals:**
- SEO optimization for "[entity-primary] in [entity-geo-1]"
- Showcase available [entity-primary]
- Link to filtered search

## D - DETAILS
**Page Structure:**
```
+-----------------------------------------+
| Hero: [entity-geo] photo + search box   |
+-----------------------------------------+
| Stats: X [entity-primary], avg price    |
+-----------------------------------------+
| About [entity-geo-1] (2-3 paragraphs)  |
| - Location, lifestyle, amenities        |
+-----------------------------------------+
| Featured [entity-primary] (3-6 cards)   |
+-----------------------------------------+
| Sub-areas: [sub-area-1], [sub-area-2]   |
+-----------------------------------------+
| CTA: View all [entity-geo-1] results   |
+-----------------------------------------+
```

**Route:** `/[entity-geo-1]` (also `/[entity-geo-2]`, `/[entity-geo-3]`)

**Content:**
- Hero image: Stock or commissioned
- About text: [TARGET-USER-A]-focused (lifestyle, amenities, transport)
- Stats: Dynamic from database (count, avg price)
- Featured: Latest or featured [entity-primary] in [entity-geo]

**SEO:**
- Title: "[entity-primary] in [entity-geo-1], [PROJECT-DOMAIN] | [PROJECT]"
- Meta: "Find [entity-primary] in [entity-geo-1]..."
- Structured data: LocalBusiness + [entity-primary] schema

## A - ACCEPTANCE
**Success Metrics:**
- ✅ Page loads with [entity-geo]-specific content
- ✅ Stats pull from live database
- ✅ Featured [entity-primary] display correctly
- ✅ Links to filtered search work
- ✅ SEO meta tags present
- ✅ Mobile responsive
- ✅ AIDAX score 80+
```

---

## [PROJECT] CODAX Checklist

### Context Checklist
- [ ] Which app? ([APP-PUBLIC] / [APP-ADMIN])
- [ ] Which database tables involved?
- [ ] Current file paths
- [ ] Design system tokens ([BRAND-PRIMARY], [BRAND-BG], etc.)
- [ ] PRD alignment (core UX rules, [BUSINESS-LOGIC-KEY])

### Objective Checklist
- [ ] Primary goal (one sentence)
- [ ] Why it matters for [PROJECT] users ([TARGET-USER-A], [TARGET-USER-B])
- [ ] How it supports PRD principles
- [ ] Success looks like what?

### Details Checklist
- [ ] Layout diagram (ASCII)
- [ ] API changes needed
- [ ] Components to build/modify
- [ ] Mobile behavior
- [ ] API auth / access control implications
- [ ] Type generation updates

### Acceptance Checklist
- [ ] Functional requirements met
- [ ] API auth / access control working
- [ ] Mobile tested
- [ ] Accessibility basics
- [ ] PRD principles upheld
- [ ] Framework scores (AIDAX 80+, SOFAX 93+/110)
- [ ] Brand compliance (SOFAX Dimension 11 — approved backgrounds, page rhythm, AI Slop provenance)

---

## CODAX Communication Style

**Good CODAX summary:**
> "The search page needs [Feature B] (context). Goal: help [TARGET-USER-A] discover areas visually since they don't know [PROJECT-DOMAIN] (objective). Implementation: [MAP-SERVICE], price markers, cluster at zoom, tap-to-preview, bbox filtering (details). Done when: markers show correctly, 60fps performance, matches benchmark quality (acceptance)."

**Bad CODAX summary:**
> "We should add a map to search." ❌ (too vague)

---

## Quick Reference

| [PROJECT] Entity | Typical CODAX Focus |
|------------------|---------------------|
| **[entity-primary]** | CRUD, [BUSINESS-LOGIC-KEY] status, photos, location |
| **[entity-secondary]** | Enquiry form, [TARGET-USER-B] inbox, response tracking |
| **[entity-tertiary]** | Verification, branding, [entity-primary] ownership |
| **[entity-geo]** | Landing pages, SEO, hierarchy |
| **users** | Auth, favourites, saved searches |

---

**Framework Status:** Generic Template
**Last Updated:** February 2026
**Version:** 2.0 (Template Edition)
