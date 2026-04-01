# PIXLX Framework

> **Pixel-Perfect Experience Audit**
> Systematic UI/UX bug hunting for Lost Monster.
>
> Find the broken images. Catch the filters that don't filter.

<!-- ONBOARD:START -->
| Token | Value | Source |
|-------|-------|--------|
| `[PROJECT]` | Lost Monster | CLAUDE.md |
| `[PROJECT-DOMAIN]` | lostmonster.io | CLAUDE.md |
| `[BRAND-PRIMARY]` | #06B6D4 (teal) | CLAUDE.md |
| `[BRAND-BG]` | Dark/black backgrounds | CLAUDE.md |
| `[BRAND-DARK]` | Dark theme with glassmorphism | CLAUDE.md |
| `[BRAND-MUTED]` | Muted grays/slate | CLAUDE.md |
| `[STORAGE]` | | |
| `[ENTITY-PRIMARY]` | Projects | CLAUDE.md |
| `[ENTITY-SECONDARY]` | Case Studies | CLAUDE.md |
| `[ENTITY-USERS]` | Clients | CLAUDE.md |
| `[APP-PUBLIC]` | website/ (port 3000) | CLAUDE.md |
| `[APP-ADMIN]` | dashboard/apps/web/ (port 3001) | CLAUDE.md |
| `[DESIGN-GUIDE-PATH]` | website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md | CLAUDE.md |
<!-- ONBOARD:END -->

---

## Lost Monster Context

**PIXLX for Lost Monster** hunts UI/UX bugs, edge cases, and brand compliance issues across the website (port 3000) and dashboard (port 3001). The website uses 5 dynamic colour themes — every component must work correctly across all themes (teal, blue, orange, purple, green).

Edge case targets: responsive breakpoints, empty states, loading states, error boundaries, form validation messages, cross-origin auth flow between website and dashboard, and Framer Motion animation edge cases.
---

## Scoring System

### Start at 100, Deduct Per Issue

| Severity | Deduction | Icon | Example |
|----------|-----------|------|---------|
| **Critical** | -10 | 🔴 | Form won't submit |
| **Major** | -5 | 🟠 | Images not loading |
| **Minor** | -2 | 🟡 | Formatting inconsistent |
| **Nitpick** | -1 | ⚪ | Shadow slightly different |

### Grade Thresholds

| Score | Grade | Ship Decision |
|-------|-------|---------------|
| 95-100 | A+ | ✅ Ship it |
| 85-94 | A | ✅ Ship, polish later |
| 70-84 | B | ⚠️ Fix majors first |
| 50-69 | C | ❌ Needs work |
| <50 | F | ❌ Blocked |

---

## Audit Context: Public vs Admin

| Context | Rigor | Focus | Ignore |
|---------|-------|-------|--------|
| **Public** | Full | Every pixel, animations, polish | Nothing |
| **Admin** | Functional | Usability, data accuracy, actions | Minor styling |

**Admin Tool Rules:**
Only flag issues that:
1. Break functionality (buttons don't work)
2. Make data unreadable
3. Block user tasks
4. Cause errors

---

## Audit Categories

### 1. Content Display (CD)
*Are items showing correctly?*

| Check | Severity |
|-------|----------|
| CD-01 | Images load correctly | Critical |
| CD-02 | Data displays in correct format | Major |
| CD-03 | Icons render | Minor |
| CD-04 | Location/metadata shows | Major |
| CD-05 | Status badges display correctly | Major |
| CD-06 | Related info visible | Minor |
| CD-07 | Cards consistent across site | Minor |
| CD-08 | No placeholder content in production | Major |
| CD-09 | Gallery/carousel navigates correctly | Major |
| CD-10 | Empty states handled | Major |

### 2. Search & Filters (SF)
*Does search actually work?*

| Check | Severity |
|-------|----------|
| SF-01 | Filter changes update results | Critical |
| SF-02 | Range inputs work | Critical |
| SF-03 | Dropdown filters work | Critical |
| SF-04 | Category filters work | Critical |
| SF-05 | Secondary filters work | Critical |
| SF-06 | Clear filters button works | Major |
| SF-07 | Results count updates | Minor |
| SF-08 | URL params sync with filters | Major |
| SF-09 | No results state helpful | Major |
| SF-10 | Loading state during filter | Major |

### 3. Map Functionality (MF)
*Does the map actually work?*

| Check | Severity |
|-------|----------|
| MF-01 | Map loads and renders | Critical |
| MF-02 | Markers appear | Critical |
| MF-03 | Markers show correct location | Critical |
| MF-04 | Marker tap shows preview | Major |
| MF-05 | Marker clusters work | Minor |
| MF-06 | Map pan/zoom smooth | Minor |
| MF-07 | Bounding box filters sync | Major |
| MF-08 | List/map toggle works | Critical |
| MF-09 | Mobile gestures work | Major |
| MF-10 | Map fallback if error | Major |

### 4. Form System (FS)
*Can users submit forms?*

| Check | Severity |
|-------|----------|
| FS-01 | Form renders | Critical |
| FS-02 | Form validation works | Major |
| FS-03 | Submit button works | Critical |
| FS-04 | Success message shows | Major |
| FS-05 | Error handling works | Major |
| FS-06 | Email/phone inputs validate | Major |
| FS-07 | Text fields work | Major |
| FS-08 | Loading state during submit | Major |
| FS-09 | Form accessible on mobile | Major |
| FS-10 | Submission reaches backend | Critical |

### 5. Admin Dashboard (AD)
*Can admins manage content?*

| Check | Severity |
|-------|----------|
| AD-01 | Table loads | Critical |
| AD-02 | Edit button opens form | Critical |
| AD-03 | Delete confirms before action | Major |
| AD-04 | Status badges show correctly | Major |
| AD-05 | Counts accurate | Minor |
| AD-06 | Key actions work | Critical |
| AD-07 | Bulk actions work | Major |
| AD-08 | Pagination works | Major |
| AD-09 | Sorting works | Minor |
| AD-10 | Search/filter works | Major |

### 6. Brand Compliance (BC)
*Does it look like Lost Monster?*

| Check | Severity |
|-------|----------|
| BC-01 | Public pages use approved background colours (not unapproved alternatives) | Major |
| BC-02 | Cards use exact Lost Monster treatment (approved shadow, radius) | Major |
| BC-03 | CTAs and accent colours use #06B6D4 (teal) | Major |
| BC-04 | Dark backgrounds are footer/cinematic CTA only — never mid-page content | Major |
| BC-05 | No accent bars, thick coloured borders, or decorative gradients on cards (AI slop) | Minor |
| BC-06 | Background colours match approved design system (website/.ai/LOST-MONSTER-DESIGN-SYSTEM.md) | Major |
| BC-07 | Adjacent sections have different backgrounds — page rhythm maintained | Major |
| BC-08 | All public content wrapped in elevated cards — no bare content without card wrapper | Major |
| BC-09 | Cards have visible breathing room between them — no touching cards | Major |

### 7. Responsive & Mobile (RM)
*Does it work on mobile?*

| Check | Severity |
|-------|----------|
| RM-01 | No horizontal scroll | Critical |
| RM-02 | Touch targets 44px+ | Major |
| RM-03 | Cards readable | Major |
| RM-04 | Gallery swipeable | Major |
| RM-05 | Filters accessible | Major |
| RM-06 | Map usable on mobile | Major |
| RM-07 | Forms fillable | Critical |
| RM-08 | Navigation works | Critical |
| RM-09 | Search bar usable | Major |
| RM-10 | Text readable without zoom | Major |

---

## Audit Template

```markdown
# PIXLX Audit: [Page Name]

**Date:** [Date]
**Page:** [file path]

---

## Summary

| Category | Issues | Points Lost |
|----------|--------|-------------|
| Content Display | X | -XX |
| Search & Filters | X | -XX |
| Map Functionality | X | -XX |
| Form System | X | -XX |
| Admin Dashboard | X | -XX |
| Brand Compliance | X | -XX |
| Responsive/Mobile | X | -XX |
| **TOTAL** | **X** | **-XX** |

**Final Score:** XX/100
**Grade:** [A+/A/B/C/F]
**Ship Decision:** [GO/FIX FIRST/BLOCKED]
```

---

## Quick Audit Checklist

### Content Display
- [ ] All images loading
- [ ] Data in correct format
- [ ] Icons showing
- [ ] Metadata displaying
- [ ] Status visible

### Search
- [ ] All filters working
- [ ] Results update on filter change
- [ ] No results state helpful
- [ ] Loading state shows

### Map
- [ ] Map renders
- [ ] Markers show correctly
- [ ] Tap marker shows preview
- [ ] Pan/zoom works on mobile

### Forms
- [ ] Form renders
- [ ] Validation works
- [ ] Submit works
- [ ] Success message shows

### Mobile
- [ ] No horizontal scroll
- [ ] Cards readable
- [ ] Filters accessible
- [ ] Forms fillable

---

## Integration with Lost Monster Frameworks

### PIXLX + SOFAX
```
SOFAX: Is this well-designed? (quality scoring)
PIXLX: Is anything broken? (bug hunting)
Together: Design quality + bug-free = shippable
```

### PIXLX in APEX Pipeline
```
1. CODAX → PLANX → Build
2. SOFAX audit (93+/110 target)
3. PIXLX audit (90+ target)
4. Ship
```

---

## PIXLX Triggers

```
run PIXLX on [page]
run PIXLX on [app]
run PIXLX quick check
```

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
  SCORE: XX/100
  CRITICAL: [none | list of critical issues]
```

**CRITICAL flag rules:**
- Any Critical-severity deduction (-10) → CRITICAL
- Score drops below 70/100 → CRITICAL (Needs Work)
- Form broken (FS-01/FS-03) → always CRITICAL
- Horizontal scroll on mobile (RM-01) → CRITICAL

**Non-CRITICAL issues** logged with check ID, severity, and fix recommendation.

---

**Framework Status:** Generic
**Last Updated:** March 2026
**Version:** 3.0 (INSPX Checkpoint Mode)
