# PIXELX Framework

> **Pixel-Perfect Experience Audit**
> Systematic UI/UX bug hunting with severity scoring and fix recommendations.
> Find the white text on white backgrounds. Catch the toggles that don't toggle.

---

## What is PIXELX?

**PIXELX** is an exhaustive UI/UX audit framework that catches the issues that slip through the cracks:

- **Visual bugs** - White text on white background, invisible elements, broken layouts
- **Interactive failures** - Buttons that don't click, toggles that don't toggle
- **State gaps** - Missing loading states, broken error states, forgotten empty states
- **Responsive breaks** - Mobile layouts that overflow, touch targets too small
- **Accessibility holes** - Missing focus states, poor contrast, no keyboard nav
- **Polish gaps** - Inconsistent spacing, misaligned elements, orphaned pixels

**The Philosophy:** Every pixel matters. Every interaction counts. Ship clean.

---

## PIXELX vs SOPHIA

| Framework | Focus | Approach | When to Use |
|-----------|-------|----------|-------------|
| **SOPHIA** | Design quality | Score 8 dimensions (typography, spacing, etc.) | Evaluating overall design quality |
| **PIXELX** | Bug hunting | Find and fix specific issues | Pre-launch QA, catching edge cases |

**SOPHIA asks:** "Is this well-designed?"
**PIXELX asks:** "Is anything broken?"

**Use together:** SOPHIA for design quality, PIXELX for bug hunting.

---

## Scoring System

### Start at 100, Deduct Per Issue

Every page starts with a **perfect 100 score**. Each issue found deducts points based on severity.

### Severity Levels

| Severity | Points Deducted | Icon | Description | Fix Priority |
|----------|-----------------|------|-------------|--------------|
| **Critical** | -10 | :red_circle: | Blocks functionality or makes content unreadable | **Block ship** |
| **Major** | -5 | :orange_circle: | Significantly impacts UX but workarounds exist | **Fix before launch** |
| **Minor** | -2 | :yellow_circle: | Noticeable but doesn't block usage | **Fix soon** |
| **Nitpick** | -1 | :white_circle: | Polish issue, perfectionist territory | **Nice to have** |

### Grade Thresholds

| Score | Grade | Action | Ship Decision |
|-------|-------|--------|---------------|
| 95-100 | **A+** | Ship it | :white_check_mark: GO |
| 85-94 | **A** | Ship, minor polish later | :white_check_mark: GO |
| 70-84 | **B** | Fix majors first | :warning: FIX FIRST |
| 50-69 | **C** | Needs significant work | :x: NO SHIP |
| <50 | **F** | Major issues, don't ship | :x: BLOCKED |

**Target:** 85+ (A grade) for production release.

---

## Audit Context: Public vs Internal

**CRITICAL: Adjust rigor based on what you're auditing.**

| Context | Rigor Level | Focus On | Ignore |
|---------|-------------|----------|--------|
| **Marketing/Public** | Full | Brand consistency, polish, animations, every pixel | Nothing |
| **Admin/Internal** | Functional | Usability, readability, broken interactions | Minor styling, animation timing, brand nitpicks |
| **Prototype/MVP** | Minimal | Blocking bugs only | Everything else |

### Admin/Internal Tool Rules

For backend dashboards and internal tools, **only flag issues that**:
1. **Break functionality** — buttons don't work, forms don't submit
2. **Make text actually unreadable** — not "slightly dim", but genuinely hard to read
3. **Block user tasks** — missing states that confuse users
4. **Cause errors** — console errors, failed API calls

**DO NOT flag for internal tools:**
- Rounded corners vs sharp corners
- Animation timing/easing variations
- Minor contrast differences (if readable, it's fine)
- Inconsistent hover states
- Shadow variations
- Theme utility adoption

**The bar:** Would a developer using this tool daily be annoyed? If no, don't flag it.

---

## Audit Categories

PIXELX audits across **6 categories**, each with specific checks:

### 1. Visual Integrity (VI)
*Can users see everything they need to see?*

### 2. Interactive Elements (IE)
*Do clickable things actually click?*

### 3. State Coverage (SC)
*Are all states handled (loading, empty, error, success)?*

### 4. Responsive Behavior (RB)
*Does it work across all screen sizes?*

### 5. Accessibility (AX)
*Can everyone use this?*

### 6. Polish (PO)
*Does it feel finished?*

---

## Category 1: Visual Integrity (VI)

### What to Check

| Check ID | Check | Severity if Broken |
|----------|-------|-------------------|
| VI-01 | Text readable on background (contrast) | Critical |
| VI-02 | No text cut off or truncated unexpectedly | Major |
| VI-03 | Images load correctly (no broken images) | Critical |
| VI-04 | Icons render correctly (no missing icons) | Major |
| VI-05 | No elements hidden behind others (z-index) | Critical |
| VI-06 | Colors correct in light mode | Major |
| VI-07 | Colors correct in dark mode | Major |
| VI-08 | Borders/shadows render correctly | Minor |
| VI-09 | Gradients display smoothly | Minor |
| VI-10 | No visual artifacts or glitches | Minor |

### Common Issues & Fixes

**VI-01: Text Unreadable (Contrast)**
```
Issue: White text on light gray background
Severity: Critical (-10)

Diagnosis:
- Check text color vs background color
- Use contrast checker (target: 4.5:1 for body, 3:1 for large text)
- SEE: Contrast Detection Guide below

Fix:
// Before
<p className="text-gray-300 bg-gray-100">Can't read this</p>

// After
<p className="text-gray-700 bg-gray-100">Now readable</p>
```

### Contrast Detection Guide

**WCAG Contrast Requirements:**
| Text Type | Minimum Ratio | Enhanced (AAA) |
|-----------|---------------|----------------|
| Body text (<18px) | 4.5:1 | 7:1 |
| Large text (≥18px bold, ≥24px) | 3:1 | 4.5:1 |
| UI components & graphics | 3:1 | N/A |

**Contrast Ratio Formula:**
```
L1 = lighter color luminance
L2 = darker color luminance
Ratio = (L1 + 0.05) / (L2 + 0.05)

Luminance = 0.2126 × R + 0.7152 × G + 0.0722 × B
(where R, G, B are linearized: value <= 0.03928 ? value/12.92 : ((value+0.055)/1.055)^2.4)
```

**Quick Contrast Check (No Tools):**
If you squint and the text disappears → FAIL

**Problematic Combinations to Watch:**

| FAIL Pattern | Why It Fails | Common In |
|--------------|--------------|-----------|
| `text-white` on `bg-gray-200/300/400` | White needs dark bg | Light mode tables |
| `text-white/90` on `bg-white/[0.1-0.3]` | Glass effect too light | Dark mode cards |
| `text-gray-400` on `bg-gray-700` | Mid-grays blend | Dark mode secondary text |
| `text-white/50` on `bg-black` | 50% opacity too dim | Muted text |
| Accent color on similar bg | Hue match, no contrast | Buttons, badges |

**Common Background Reference Tables:**

Dark theme (black `#000` background):
| Text Opacity | Approx Ratio | Status |
|--------------|--------------|--------|
| 100% white | 21:1 | ✅ Pass |
| 90% white | 19:1 | ✅ Pass |
| 60% white | 12:1 | ✅ Pass |
| 40% white | 8:1 | ⚠️ Large text only |
| 20% white | 4:1 | ❌ Fail |

Light theme (white `#fff` background):
| Text Color | Approx Ratio | Status |
|------------|--------------|--------|
| Black | 21:1 | ✅ Pass |
| Gray 900 | 15:1 | ✅ Pass |
| Gray 600 | 5:1 | ✅ Pass |
| Gray 400 | 3:1 | ⚠️ Large text only |
| Gray 300 | 2:1 | ❌ Fail |

Gray background (`#e5e7eb` / gray-200):
| Text Color | Approx Ratio | Status |
|------------|--------------|--------|
| White | 1.3:1 | ❌ Fail |
| Gray 900 | 15:1 | ✅ Pass |
| Gray 700 | 8:1 | ✅ Pass |
| Black | 16:1 | ✅ Pass |

**Native `<select>` Dropdown Warning:**
Browser `<option>` elements often render with OS-default styling (light bg).
Always explicitly style options: `<option className="bg-dark text-light">`

**Detection Script (Browser Console):**
```javascript
// Paste in browser console to check all text contrast
document.querySelectorAll('*').forEach(el => {
  const style = getComputedStyle(el);
  const color = style.color;
  const bg = style.backgroundColor;

  // Skip if transparent bg (inherits from parent)
  if (bg === 'rgba(0, 0, 0, 0)') return;

  // Parse RGB values
  const parseRGB = (str) => {
    const match = str.match(/\d+/g);
    return match ? match.slice(0, 3).map(Number) : null;
  };

  const textRGB = parseRGB(color);
  const bgRGB = parseRGB(bg);
  if (!textRGB || !bgRGB) return;

  // Calculate luminance
  const luminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = luminance(...textRGB);
  const l2 = luminance(...bgRGB);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  // Flag low contrast
  if (ratio < 4.5 && el.textContent.trim()) {
    console.warn(`Low contrast (${ratio.toFixed(2)}:1):`, el, {
      text: color,
      bg: bg,
      content: el.textContent.slice(0, 50)
    });
    el.style.outline = '2px solid red';
  }
});
```

**VS Code Extension:** Install "Color Highlight" or "Color Contrast Checker" for inline warnings.

**VI-05: Element Hidden (Z-Index)**
```
Issue: Modal content behind overlay
Severity: Critical (-10)

Diagnosis:
- Inspect z-index values
- Check stacking context (parent transforms can reset)

Fix:
// Before
<div className="z-10">Modal</div>
<div className="z-50">Overlay</div>

// After
<div className="z-50">Overlay</div>
<div className="z-[60]">Modal</div>
```

**VI-02: Text Truncation**
```
Issue: Long text cuts off without ellipsis or indication
Severity: Major (-5)

Diagnosis:
- Test with long content strings
- Check overflow handling

Fix:
// Before
<h3 className="overflow-hidden">Very long title that gets cut</h3>

// After
<h3 className="truncate" title="Very long title that gets cut">
  Very long title that gets cut
</h3>
```

---

## Category 2: Interactive Elements (IE)

### What to Check

| Check ID | Check | Severity if Broken |
|----------|-------|-------------------|
| IE-01 | Buttons trigger their intended action | Critical |
| IE-02 | Links navigate to correct destination | Critical |
| IE-03 | Toggles/switches change state | Critical |
| IE-04 | Checkboxes/radios toggle correctly | Critical |
| IE-05 | Form inputs accept input | Critical |
| IE-06 | Dropdowns open and select | Critical |
| IE-07 | Modals open and close | Major |
| IE-08 | Hover states exist and work | Minor |
| IE-09 | Click feedback present (visual response) | Minor |
| IE-10 | Double-click handled (no duplicate actions) | Major |

### Common Issues & Fixes

**IE-01: Button Doesn't Work**
```
Issue: Button appears but onClick never fires
Severity: Critical (-10)

Diagnosis:
- Check if element covers button (z-index issue)
- Check if onClick is attached
- Check if pointer-events: none is set
- Check if button is disabled

Fix:
// Before - element covering button
<div className="absolute inset-0" /> // Covers everything!
<button onClick={handleClick}>Click me</button>

// After - add pointer-events-none to overlay
<div className="absolute inset-0 pointer-events-none" />
<button onClick={handleClick}>Click me</button>
```

**IE-03: Toggle Doesn't Toggle**
```
Issue: Switch UI doesn't reflect state change
Severity: Critical (-10)

Diagnosis:
- Check state binding
- Check if setState is called
- Check if controlled vs uncontrolled

Fix:
// Before - not controlled properly
<Switch checked={true} onChange={handleChange} />

// After - properly controlled
const [enabled, setEnabled] = useState(false)
<Switch
  checked={enabled}
  onChange={() => setEnabled(!enabled)}
/>
```

**IE-07: Modal Won't Close**
```
Issue: Modal opens but X button or backdrop click doesn't close
Severity: Major (-5)

Diagnosis:
- Check onClose handler attached
- Check if backdrop has onClick
- Check event propagation

Fix:
// Before - missing onClose
<Dialog open={open}>
  <DialogContent>...</DialogContent>
</Dialog>

// After - with proper close handling
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>...</DialogContent>
</Dialog>
```

---

## Category 3: State Coverage (SC)

### What to Check

| Check ID | Check | Severity if Broken |
|----------|-------|-------------------|
| SC-01 | Loading state shows feedback | Major |
| SC-02 | Empty state provides guidance | Major |
| SC-03 | Error state is helpful (not just "Error") | Major |
| SC-04 | Success state confirms action | Minor |
| SC-05 | Disabled state is visually clear | Minor |
| SC-06 | Selected state is obvious | Major |
| SC-07 | Hover state provides feedback | Minor |
| SC-08 | Active/pressed state exists | Nitpick |
| SC-09 | Skeleton loaders match content shape | Nitpick |
| SC-10 | Transitions between states are smooth | Nitpick |

### Common Issues & Fixes

**SC-01: Missing Loading State**
```
Issue: Button clicked, nothing happens for 3 seconds
Severity: Major (-5)

Diagnosis:
- Check if loading state exists
- Check if it's being set during async operations

Fix:
// Before - no loading feedback
<button onClick={handleSubmit}>Submit</button>

// After - with loading state
<button
  onClick={handleSubmit}
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="animate-spin mr-2" />
      Submitting...
    </>
  ) : (
    'Submit'
  )}
</button>
```

**SC-02: Bad Empty State**
```
Issue: Empty list shows nothing or just whitespace
Severity: Major (-5)

Diagnosis:
- Check for data.length === 0 handling
- Look for empty state component

Fix:
// Before - just nothing
{items.map(item => <Item key={item.id} {...item} />)}

// After - with empty state
{items.length === 0 ? (
  <EmptyState
    icon={<InboxIcon />}
    title="No items yet"
    description="Create your first item to get started."
    action={<Button onClick={onCreate}>Create Item</Button>}
  />
) : (
  items.map(item => <Item key={item.id} {...item} />)
)}
```

**SC-03: Unhelpful Error State**
```
Issue: Shows "Error" or "Something went wrong" with no guidance
Severity: Major (-5)

Diagnosis:
- Check error handling
- Look for error message content

Fix:
// Before - useless error
{error && <p>Error</p>}

// After - helpful error
{error && (
  <Alert variant="destructive">
    <AlertTitle>Failed to save changes</AlertTitle>
    <AlertDescription>
      {error.message || 'Please try again or contact support if the problem persists.'}
    </AlertDescription>
    <Button variant="outline" onClick={retry}>Try Again</Button>
  </Alert>
)}
```

---

## Category 4: Responsive Behavior (RB)

### What to Check

| Check ID | Check | Severity if Broken |
|----------|-------|-------------------|
| RB-01 | No horizontal scroll on mobile | Critical |
| RB-02 | Touch targets are 44px+ | Major |
| RB-03 | Text is readable without zooming | Major |
| RB-04 | Navigation is accessible on mobile | Critical |
| RB-05 | Images scale appropriately | Minor |
| RB-06 | Tables scroll or stack on mobile | Major |
| RB-07 | Modals are usable on mobile | Major |
| RB-08 | Forms are usable on mobile | Major |
| RB-09 | Breakpoints transition smoothly | Minor |
| RB-10 | Portrait and landscape both work | Minor |

### Common Issues & Fixes

**RB-01: Horizontal Overflow**
```
Issue: Page scrolls horizontally on mobile
Severity: Critical (-10)

Diagnosis:
- Look for fixed-width elements
- Check for elements extending beyond viewport
- Use dev tools to find overflowing element

Fix:
// Before - fixed width causes overflow
<div className="w-[800px]">Content</div>

// After - responsive width
<div className="w-full max-w-[800px]">Content</div>
```

**RB-02: Touch Targets Too Small**
```
Issue: Buttons or links smaller than 44px, hard to tap
Severity: Major (-5)

Diagnosis:
- Measure touch target size
- Check padding on interactive elements

Fix:
// Before - too small
<button className="p-1 text-xs">X</button>

// After - proper touch target
<button className="p-3 min-h-[44px] min-w-[44px]">X</button>
```

**RB-06: Table Overflow**
```
Issue: Table extends beyond mobile viewport
Severity: Major (-5)

Diagnosis:
- Check table width on mobile
- Look for scroll container

Fix:
// Before - table overflows
<table className="w-full">...</table>

// After - scrollable container
<div className="overflow-x-auto">
  <table className="min-w-[600px]">...</table>
</div>
```

---

## Category 5: Accessibility (AX)

### What to Check

| Check ID | Check | Severity if Broken |
|----------|-------|-------------------|
| AX-01 | Focus indicators visible | Critical |
| AX-02 | Keyboard navigation works | Critical |
| AX-03 | ARIA labels on interactive elements | Major |
| AX-04 | Alt text on images | Major |
| AX-05 | Color contrast meets WCAG AA (4.5:1) | Major |
| AX-06 | Form labels associated with inputs | Major |
| AX-07 | Error messages announced to screen readers | Major |
| AX-08 | Skip links present | Minor |
| AX-09 | Heading hierarchy correct (H1 → H2 → H3) | Minor |
| AX-10 | Motion respects prefers-reduced-motion | Minor |

### Common Issues & Fixes

**AX-01: No Focus Indicator**
```
Issue: Can't see which element is focused when tabbing
Severity: Critical (-10)

Diagnosis:
- Tab through page
- Check if outline or ring is visible
- Look for outline-none without replacement

Fix:
// Before - focus removed with no replacement
<button className="outline-none">Click me</button>

// After - custom focus ring
<button className="outline-none focus-visible:ring-2 focus-visible:ring-primary">
  Click me
</button>
```

**AX-02: Keyboard Nav Broken**
```
Issue: Can't reach element with keyboard
Severity: Critical (-10)

Diagnosis:
- Tab through entire page
- Check if all interactive elements reachable
- Look for tabindex="-1" on focusable elements

Fix:
// Before - custom button without keyboard support
<div onClick={handleClick}>Click me</div>

// After - proper button
<button onClick={handleClick}>Click me</button>

// OR if div needed
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

**AX-04: Missing Alt Text**
```
Issue: Image has no alt text
Severity: Major (-5)

Diagnosis:
- Check all <img> elements
- Look for empty alt="" on meaningful images
- Check if decorative images have alt=""

Fix:
// Before - no alt
<img src="/hero.jpg" />

// After - descriptive alt
<img src="/hero.jpg" alt="Sunset view from the property balcony" />

// Decorative image (intentionally empty)
<img src="/divider.svg" alt="" role="presentation" />
```

---

## Category 6: Polish (PO)

### What to Check

| Check ID | Check | Severity if Broken |
|----------|-------|-------------------|
| PO-01 | Consistent spacing throughout | Minor |
| PO-02 | Elements properly aligned | Minor |
| PO-03 | Typography consistent | Minor |
| PO-04 | Icons consistent style/size | Nitpick |
| PO-05 | Animation timing consistent | Nitpick |
| PO-06 | Border radius consistent | Nitpick |
| PO-07 | Shadow styles consistent | Nitpick |
| PO-08 | Color usage consistent | Minor |
| PO-09 | No orphaned elements (single word on line) | Nitpick |
| PO-10 | Favicon and meta images present | Minor |

### Common Issues & Fixes

**PO-01: Inconsistent Spacing**
```
Issue: Similar sections have different padding
Severity: Minor (-2)

Diagnosis:
- Compare padding on similar elements
- Check if design system spacing used

Fix:
// Before - inconsistent
<section className="py-8">Section 1</section>
<section className="py-12">Section 2</section>
<section className="py-6">Section 3</section>

// After - consistent
<section className="py-8">Section 1</section>
<section className="py-8">Section 2</section>
<section className="py-8">Section 3</section>
```

**PO-02: Misaligned Elements**
```
Issue: Elements not aligned to grid
Severity: Minor (-2)

Diagnosis:
- Use dev tools to compare positions
- Check for off-by-one-pixel issues

Fix:
// Before - not aligned
<div className="flex">
  <div className="pt-3">Label</div>
  <div className="pt-4">Value</div>
</div>

// After - aligned
<div className="flex items-center">
  <div>Label</div>
  <div>Value</div>
</div>
```

---

## The PIXELX Audit Process

### Step 1: Prepare

1. **Define scope** - Which page/component are you auditing?
2. **Set up testing environment** - Multiple browsers, screen sizes
3. **Create fresh audit document** - Use template below

### Step 2: Systematic Review

Go through each category in order:

```
1. Visual Integrity → 10 checks
2. Interactive Elements → 10 checks
3. State Coverage → 10 checks
4. Responsive Behavior → 10 checks
5. Accessibility → 10 checks
6. Polish → 10 checks
```

**Total: 60 checks**

### Step 3: Document Issues

For each issue found:

```markdown
### [Check ID] - [Short Description]

**Severity:** [Critical/Major/Minor/Nitpick] (-X points)
**Location:** [File:line or Component name]
**Description:** [What's wrong]
**Fix:** [How to fix it]
**Screenshot:** [If applicable]
```

### Step 4: Calculate Score

```
Starting Score: 100
- Critical issues: X × -10 = -XX
- Major issues: X × -5 = -XX
- Minor issues: X × -2 = -XX
- Nitpicks: X × -1 = -XX
─────────────────────────────
Final Score: XX
Grade: [A+/A/B/C/F]
Ship Decision: [GO/FIX FIRST/BLOCKED]
```

### Step 5: Fix & Re-audit

1. Fix issues in priority order (Critical → Major → Minor)
2. Re-run audit on fixed areas
3. Update score
4. Repeat until target grade reached

---

## PIXELX Audit Template

```markdown
# PIXELX Audit: [Page/Component Name]

**Date:** [Date]
**Auditor:** [Name]
**URL/Path:** [URL or file path]

---

## Summary

| Category | Issues Found | Points Lost |
|----------|--------------|-------------|
| Visual Integrity | X | -XX |
| Interactive Elements | X | -XX |
| State Coverage | X | -XX |
| Responsive Behavior | X | -XX |
| Accessibility | X | -XX |
| Polish | X | -XX |
| **TOTAL** | **X** | **-XX** |

**Final Score:** XX/100
**Grade:** [A+/A/B/C/F]
**Ship Decision:** [GO/FIX FIRST/BLOCKED]

---

## Issues Found

### Critical Issues (Block Ship)

#### [Check ID] - [Description]
- **Severity:** Critical (-10)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

[...more critical issues...]

### Major Issues (Fix Before Launch)

#### [Check ID] - [Description]
- **Severity:** Major (-5)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

[...more major issues...]

### Minor Issues (Fix Soon)

#### [Check ID] - [Description]
- **Severity:** Minor (-2)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

[...more minor issues...]

### Nitpicks (Nice to Have)

#### [Check ID] - [Description]
- **Severity:** Nitpick (-1)
- **Location:** [File:line]
- **Problem:** [What's wrong]
- **Fix:** [How to fix]

[...more nitpicks...]

---

## Recommendations

### Priority 1: Critical Fixes
1. [Fix 1]
2. [Fix 2]

### Priority 2: Major Fixes
1. [Fix 1]
2. [Fix 2]

### Priority 3: Polish
1. [Fix 1]
2. [Fix 2]

---

## Re-audit Log

| Date | Changes Made | New Score | Grade |
|------|--------------|-----------|-------|
| [Date] | Initial audit | XX | [Grade] |
| [Date] | Fixed [X] critical issues | XX | [Grade] |
| [Date] | Fixed [X] major issues | XX | [Grade] |
```

---

## Quick Audit Checklist

Use this for rapid audits when full PIXELX is overkill:

### Visual (Quick Check)
- [ ] All text readable (no white-on-white)
- [ ] All images loading
- [ ] Nothing hidden behind other elements
- [ ] Dark mode working (if applicable)

### Interactive (Quick Check)
- [ ] All buttons clickable
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Modals open/close

### States (Quick Check)
- [ ] Loading states exist
- [ ] Empty states exist
- [ ] Error states helpful
- [ ] Success feedback present

### Responsive (Quick Check)
- [ ] No horizontal scroll on mobile
- [ ] Touch targets large enough
- [ ] Navigation works on mobile

### Accessibility (Quick Check)
- [ ] Can tab through page
- [ ] Focus indicators visible
- [ ] Images have alt text

### Polish (Quick Check)
- [ ] Spacing consistent
- [ ] Elements aligned
- [ ] No orphaned pixels

---

## Integration with Other Frameworks

### PIXELX + SOPHIA
```
1. SOPHIA: Evaluate overall design quality (score 8 dimensions)
2. PIXELX: Hunt for specific bugs and issues (deduction scoring)
3. Together: Design quality + bug-free = shippable
```

### PIXELX + PLANX
```
For major feature launches:
1. PLANX: Plan the implementation milestones
2. Build the feature
3. PIXELX: Audit before marking feature complete
4. Fix issues, re-audit
5. Ship when 85+
```

### PIXELX in APEX Pipeline
```
APEX stages:
1. RAPID → CODA → PLANX → Build
2. SOPHIA (design quality check)
3. PIXELX (bug hunting) ← Add before launch
4. Ship
```

---

## When to Use PIXELX

### Always Use For:
- Pre-launch QA
- Post-major-refactor verification
- New feature completion
- After UI library updates
- Production bug reports

### Optional For:
- Internal tools
- Rapid prototypes
- Experimental features

### Skip For:
- Backend-only changes
- Copy updates only
- Behind feature flags (audit when flag removed)

---

## Summary

**PIXELX = Pixel-Perfect Experience Audit**

### Core Concept
Start at 100, deduct for every issue found. Ship at 85+.

### Severity Deductions
- Critical: -10 (block ship)
- Major: -5 (fix before launch)
- Minor: -2 (fix soon)
- Nitpick: -1 (nice to have)

### 6 Categories (60 Checks)
1. Visual Integrity
2. Interactive Elements
3. State Coverage
4. Responsive Behavior
5. Accessibility
6. Polish

### Key Philosophy
*"Every pixel matters. Every interaction counts. Ship clean."*

---

**Framework Status:** Production-ready
**Last Updated:** 2026-01-05
**Version:** 1.0
