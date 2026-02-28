# PIXLX Framework — [PROJECT] Edition

> **Pixel-Perfect Experience Audit**
> Systematic UI/UX bug hunting for [PROJECT-DOMAIN].
>
> Find the missing visuals. Catch the filters that don't filter.

---

## [PROJECT] Context

**PIXLX for [PROJECT]** hunts bugs in:
- [entity-primary] search (filters, map, results grid)
- [Page Type A] detail pages (visuals, info, conversion form)
- [entity-tertiary] dashboard ([entity-primary] table, [entity-secondary] inbox)
- Homepage and marketing pages
- [Page Type C] landing pages

**[PROJECT]-Specific Audit Focus:**
- Visuals loading correctly
- Primary metric display consistent
- Map markers clickable and accurate (if applicable)
- Conversion forms submitting properly
- Freshness badges displaying correctly
- Mobile browsing experience

---

## Scoring System

### Start at 100, Deduct Per Issue

| Severity | Deduction | Icon | [PROJECT] Example |
|----------|-----------|------|-------------------|
| **Critical** | -10 | RED | Conversion form won't submit |
| **Major** | -5 | ORANGE | [entity-primary] visuals not loading |
| **Minor** | -2 | YELLOW | Data formatting inconsistent |
| **Nitpick** | -1 | WHITE | Shadow slightly different |

### Grade Thresholds

| Score | Grade | Ship Decision |
|-------|-------|---------------|
| 95-100 | A+ | Ship it |
| 85-94 | A | Ship, polish later |
| 70-84 | B | Fix majors first |
| 50-69 | C | Needs work |
| <50 | F | Blocked |

**[PROJECT] Targets:**
| Page | Target |
|------|--------|
| [Page Type B] (Search/Results) | 90+ |
| [Page Type A] (Detail) | 90+ |
| Homepage | 90+ |
| [entity-tertiary] Dashboard | 85+ |

---

## Audit Context: Marketing vs Admin

| Context | Rigor | Focus | Ignore |
|---------|-------|-------|--------|
| **Marketing (public)** | Full | Every pixel, animations, polish | Nothing |
| **Admin ([entity-tertiary])** | Functional | Usability, data accuracy, actions | Minor styling |

**Admin Tool Rules:**
Only flag issues that:
1. Break functionality (buttons don't work)
2. Make data unreadable
3. Block [entity-tertiary] tasks
4. Cause errors

---

## [PROJECT] Audit Categories

### [Category 1: Primary Content Display] (PC)
*Are [entity-primary] showing correctly?*

| Check | Severity |
|-------|----------|
| PC-01 | [entity-primary] visuals load correctly | Critical |
| PC-02 | Primary metric displays in correct format | Major |
| PC-03 | Attribute icons render | Minor |
| PC-04 | Category/location shows correctly | Major |
| PC-05 | Freshness badge displays status | Major |
| PC-06 | [entity-tertiary] info visible (if applicable) | Minor |
| PC-07 | Content card consistent across site | Minor |
| PC-08 | No placeholder images in production | Major |
| PC-09 | Visual gallery navigates correctly | Major |
| PC-10 | "No visuals" state handled | Major |

**PC-01: Visuals Not Loading**
```
Issue: Visual shows broken image icon
Severity: Critical (-10)
Location: [APP-PUBLIC]/components/[ContentCard].tsx

Diagnosis:
- Check CDN/storage connection ([PROJECT-URL])
- Verify image URL format
- Check for CORS issues

Fix:
// Before
<img src={visual.url} />

// After - with error handling
<img
  src={visual.url}
  onError={(e) => e.currentTarget.src = '/images/no-photo.jpg'}
  alt={`${item.type} in ${item.category}`}
/>
```

**PC-02: Primary Metric Format Inconsistent**
```
Issue: Shows different formats in different places
Severity: Major (-5)
Location: Multiple files

Fix:
// Create shared utility
export function formatMetric(value: number, type: string) {
  const formatted = new Intl.NumberFormat('en').format(value)
  return `${formatted}` // Adapt format per project
}

// Use everywhere
<span>{formatMetric(item.value, item.type)}</span>
```

### [Category 2: Discovery/Search] (DS)
*Does search actually work?*

| Check | Severity |
|-------|----------|
| DS-01 | Filter changes update results | Critical |
| DS-02 | Range slider/input works | Critical |
| DS-03 | Category dropdown filters correctly | Critical |
| DS-04 | Type filter works | Critical |
| DS-05 | Attribute filter works | Critical |
| DS-06 | Clear filters button works | Major |
| DS-07 | Results count updates | Minor |
| DS-08 | URL params sync with filters | Major |
| DS-09 | No results state helpful | Major |
| DS-10 | Loading state during filter | Major |

**DS-01: Filters Not Updating Results**
```
Issue: Selecting a filter shows no change
Severity: Critical (-10)
Location: [APP-PUBLIC]/[search-page]/page.tsx

Diagnosis:
- Check if filter state updates
- Check if API called with new params
- Check if results re-rendered

Fix:
// Ensure filter changes trigger refetch
const [filterValue, setFilterValue] = useState<string | null>(null)

useEffect(() => {
  fetchResults({ filterValue, category, rangeMin, rangeMax })
}, [filterValue, category, rangeMin, rangeMax])
```

**DS-09: Bad No Results State**
```
Issue: Empty results shows blank page
Severity: Major (-5)

Fix:
{results.length === 0 && (
  <div className="text-center py-12">
    <Search className="w-12 h-12 mx-auto text-[BRAND-PRIMARY]/40 mb-4" />
    <h3 className="text-lg font-semibold text-theme">
      No [entity-primary] found
    </h3>
    <p className="text-theme-muted mt-2">
      Try adjusting your filters or search in a different category.
    </p>
    <Button
      variant="outline"
      onClick={clearFilters}
      className="mt-4"
    >
      Clear All Filters
    </Button>
  </div>
)}
```

### [Category 3: Map/Location] (ML)
*Does the map/location system work? (if applicable)*

| Check | Severity |
|-------|----------|
| ML-01 | Map loads and renders | Critical |
| ML-02 | Markers appear | Critical |
| ML-03 | Markers show correct location | Critical |
| ML-04 | Marker tap shows preview | Major |
| ML-05 | Marker clusters work | Minor |
| ML-06 | Map pan/zoom smooth | Minor |
| ML-07 | Bounding box filters sync | Major |
| ML-08 | List/map toggle works | Critical |
| ML-09 | Mobile gestures work | Major |
| ML-10 | Map fallback if error | Major |

**ML-03: Markers Wrong Location**
```
Issue: Markers appear in wrong position
Severity: Critical (-10)

Diagnosis:
- Check lat/lng values in database
- Verify coordinate format (lat, lng vs lng, lat)
- Check for null coordinates

Fix:
// Validate coordinates before placing marker
{items
  .filter(p => p.lat && p.lng && isValidCoordinate(p.lat, p.lng))
  .map(item => (
    <Marker
      latitude={item.lat}
      longitude={item.lng}
      // ...
    />
  ))
}
```

### [Category 4: Conversion System] (CS)
*Can users actually convert/contact?*

| Check | Severity |
|-------|----------|
| CS-01 | Conversion form renders | Critical |
| CS-02 | Form validation works | Major |
| CS-03 | Submit button works | Critical |
| CS-04 | Success message shows | Major |
| CS-05 | Error handling works | Major |
| CS-06 | Email/phone inputs validate | Major |
| CS-07 | Message field works | Major |
| CS-08 | Loading state during submit | Major |
| CS-09 | Form accessible on mobile | Major |
| CS-10 | [entity-tertiary] receives [entity-secondary] | Critical |

**CS-03: Submit Button Does Nothing**
```
Issue: Clicking submit has no effect
Severity: Critical (-10)

Diagnosis:
- Check if onClick/onSubmit attached
- Check for JavaScript errors
- Check network tab for API call

Fix:
// Before - missing form submission
<form>
  <button type="submit">Submit</button>
</form>

// After - proper form handling
<form onSubmit={handleSubmit}>
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
  </button>
</form>
```

### [Category 5: Admin/Dashboard] (AD)
*Can [entity-tertiary] manage [entity-primary]?*

| Check | Severity |
|-------|----------|
| AD-01 | [entity-primary] table loads | Critical |
| AD-02 | Edit button opens form | Critical |
| AD-03 | Delete confirms before action | Major |
| AD-04 | Status badges show correctly | Major |
| AD-05 | [entity-secondary] count accurate | Minor |
| AD-06 | Confirm/verify action works | Critical |
| AD-07 | Bulk actions work | Major |
| AD-08 | Pagination works | Major |
| AD-09 | Sorting works | Minor |
| AD-10 | Search/filter works | Major |

**AD-06: Confirm/Verify Action Broken**
```
Issue: Confirm button doesn't update status
Severity: Critical (-10)
Location: [APP-ADMIN]/[entity-primary]/page.tsx

Diagnosis:
- Check API endpoint
- Verify status field updates
- Check for optimistic UI update

Fix:
async function handleConfirm(itemId: string) {
  setConfirming(itemId)
  try {
    const res = await fetch(`/api/admin/[entity-primary]/${itemId}/confirm`, {
      method: 'POST',
    })
    if (!res.ok) throw new Error('Failed to confirm')

    // Refresh list
    await refetchItems()
    toast.success('[entity-primary] confirmed')
  } catch (error) {
    toast.error('Failed to confirm')
  } finally {
    setConfirming(null)
  }
}
```

### [Category 6: Brand Compliance] (BC)
*Does it look like [PROJECT]?*

| Check | Severity |
|-------|----------|
| BC-01 | Marketing pages use [BRAND-BG] backgrounds (not `bg-slate-*`, `bg-gray-*`) | Major |
| BC-02 | Cards use exact [PROJECT] treatment: `bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]` — no generic shadow-sm/md/lg, no rounded-lg/xl | Major |
| BC-03 | CTAs and accent colours use [BRAND-PRIMARY] (not `blue-500`, `teal-600`) | Major |
| BC-04 | `bg-[BRAND-DARK]` is footer/cinematic CTA only — never mid-page content | Major |
| BC-05 | No accent bars, thick coloured borders, or decorative gradients on cards (AI slop) | Minor |
| BC-06 | Background colours match approved design system ([DESIGN-GUIDE-PATH]) | Major |
| BC-07 | Adjacent sections have different backgrounds — page rhythm maintained ([BRAND-BG] <-> white alternation) | Major |
| BC-08 | All marketing content wrapped in elevated cards — no bare content on [BRAND-BG] without a card wrapper | Major |
| BC-09 | Cards have visible [BRAND-BG] breathing room between them (`gap-4`+ in grids) — no touching cards | Major |

**BC-01: Cold Backgrounds on Marketing Pages**
```
Issue: Marketing section uses bg-slate-50 or bg-gray-100 instead of bg-[BRAND-BG]
Severity: Major (-5)

Diagnosis:
- Brand violation — [PROJECT] marketing uses project colours, not cold grey
- Often introduced by AI-generated code defaulting to generic Tailwind

Fix:
// Before
<section className="bg-slate-50">

// After
<section className="bg-[BRAND-BG]">
```

**BC-05: AI Slop — Decorative Card Borders**
```
Issue: Cards have coloured left borders, gradient accents, or thick top stripes
Severity: Minor (-2)

Diagnosis:
- These patterns don't exist anywhere in the [PROJECT] design system
- Classic AI slop — generated code adding "flair" that breaks brand consistency

Fix:
// Remove decorative borders — [PROJECT] cards are clean white with shadow
// No border-l-4, border-t-2 with accent colours, or gradient overlays
```

---

### [Category 7: Responsive & Mobile] (RM)
*Does it work on mobile?*

| Check | Severity |
|-------|----------|
| RM-01 | No horizontal scroll | Critical |
| RM-02 | Touch targets 44px+ | Major |
| RM-03 | Content cards readable | Major |
| RM-04 | Visual gallery swipeable | Major |
| RM-05 | Filters accessible | Major |
| RM-06 | Map usable on mobile (if applicable) | Major |
| RM-07 | Conversion form fillable | Critical |
| RM-08 | Navigation works | Critical |
| RM-09 | Search bar usable | Major |
| RM-10 | Text readable without zoom | Major |

---

## [PROJECT] PIXLX Audit Template

```markdown
# PIXLX Audit: [Page Name]

**Date:** [Date]
**Auditor:** [Name]
**Page:** [file path]

---

## Summary

| Category | Issues | Points Lost |
|----------|--------|-------------|
| [Category 1: Primary Content] | X | -XX |
| [Category 2: Discovery/Search] | X | -XX |
| [Category 3: Map/Location] | X | -XX |
| [Category 4: Conversion System] | X | -XX |
| [Category 5: Admin/Dashboard] | X | -XX |
| [Category 6: Brand Compliance] | X | -XX |
| [Category 7: Responsive/Mobile] | X | -XX |
| **TOTAL** | **X** | **-XX** |

**Final Score:** XX/100
**Grade:** [A+/A/B/C/F]
**Ship Decision:** [GO/FIX FIRST/BLOCKED]

---

## Critical Issues (Block Ship)

### [Check ID] - [Description]
- **Severity:** Critical (-10)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

---

## Major Issues (Fix Before Launch)

### [Check ID] - [Description]
- **Severity:** Major (-5)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

---

## Recommendations

1. [Priority fix 1]
2. [Priority fix 2]
3. [Priority fix 3]
```

---

## [PROJECT] Quick Audit Checklist

### Primary Content Display
- [ ] All visuals loading
- [ ] Primary metric in correct format
- [ ] Key attributes showing
- [ ] Category/location displaying
- [ ] Freshness status visible

### Search
- [ ] All filters working
- [ ] Results update on filter change
- [ ] No results state helpful
- [ ] Loading state shows

### Map (if applicable)
- [ ] Map renders
- [ ] Markers show [entity-primary]
- [ ] Tap marker shows preview
- [ ] Pan/zoom works on mobile

### Conversion
- [ ] Form renders
- [ ] Validation works
- [ ] Submit sends [entity-secondary]
- [ ] Success message shows

### Mobile
- [ ] No horizontal scroll
- [ ] Cards readable
- [ ] Filters accessible
- [ ] Forms fillable

---

## Integration with [PROJECT] Frameworks

### PIXLX + SOFAX
```
SOFAX: Is this well-designed? (quality scoring)
PIXLX: Is anything broken? (bug hunting)
Together: Design quality + bug-free = shippable
```

### PIXLX in Pipeline
```
1. CODAX -> PLANX -> Build
2. SOFAX audit (93+/110 target)
3. PIXLX audit (90+ target)
4. Ship
```

---

## PIXLX Triggers

```
run PIXLX on [Page Type B]
run PIXLX on [Page Type A]
run PIXLX on homepage
run PIXLX on [entity-tertiary] dashboard
run PIXLX on [APP-PUBLIC]
run PIXLX quick check
```

---

---

## Checkpoint Mode (INSPX Integration)

When invoked by INSPX during the automated inspection pipeline, PIXLX operates in **Checkpoint Mode** — same deduction-based scoring, same audit categories, structured output format.

**What PIXLX receives:**
- Screenshot from Playwright (specific viewport)
- Checkpoint metadata (page name, URL, viewport, focus area)
- Feature context (what was built/changed)

**What PIXLX returns:**

```
PIXLX CHECKPOINT: [Checkpoint Name] ([viewport])
  Starting score: 100
  Deductions:
    - [Check ID] [description]: -X ([severity])
    - [Check ID] [description]: -X ([severity])
  SCORE: XX/100
  CRITICAL: [none | list of critical issues]
```

**CRITICAL flag rules:**
- Any Critical-severity deduction (-10) -> CRITICAL
- Score drops below 70/100 -> CRITICAL (Needs Work)
- Conversion form broken (CS-01/CS-03) -> always CRITICAL
- Horizontal scroll on mobile (RM-01) -> CRITICAL

**Non-CRITICAL issues** logged with check ID, severity, and fix recommendation.

---

**Framework Status:** [PROJECT]-Customized
**Last Updated:** February 2026
**Version:** 2.1 ([PROJECT] Edition — INSPX Checkpoint Mode)
