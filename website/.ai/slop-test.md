# Lost Monster AI Slop Test

> **The Provenance Rule + 10 Red Flags**
> Every visual element must have provenance on the existing Lost Monster site.
> If you can't point to where it already exists, it doesn't belong.

---

## The Provenance Rule

**Before adding ANY visual element, ask:**

> "Can I point to the EXACT same pattern on an existing Lost Monster page?"

If **yes** → proceed.
If **no** → flag it for James's approval before implementing.

**Reference pages:**
- `app/page.tsx` — homepage (hero, metrics, services, testimonials, colour switcher)

**What counts as "same pattern":**
- Same shadow treatment
- Same border treatment
- Same background approach
- Same card style
- Same icon usage
- Same typography scale

---

## The 10 Red Flags (Kill on Sight)

These patterns are **never acceptable** on Lost Monster. If you see them, remove immediately.

### 1. Light/white page backgrounds
Lost Monster uses dark gradient backgrounds exclusively. `bg-white`, `bg-gray-50`, `bg-slate-100` as page backgrounds = instant fail.

**Exception:** `bg-white/5` for glassmorphism cards is correct — that's 5% white opacity, not white.

### 2. Small/timid typography
Section headlines below `text-4xl` are too small. Hero headlines must be `text-6xl md:text-8xl lg:text-9xl`. Lost Monster is BOLD.

### 3. Corporate "we" voice
This is a personal brand. "We offer solutions" → wrong. "I build systems" → correct.

### 4. Hardcoded accent colours
Every accent colour must come from the dynamic colour system (`color.accent`). Hardcoded `text-blue-500`, `bg-purple-600`, etc. = broken when user switches colours.

### 5. Missing glassmorphism on cards
Cards MUST use `bg-white/5 backdrop-blur-md border` with dynamic border colour (`borderColor: color.accent + '20'`). Solid `bg-white`, `bg-gray-800`, or opaque cards = wrong.

### 6. Missing grid pattern background
The subtle grid pattern (`opacity-30`) should be visible across the site. Pages without it feel flat.

### 7. Generic stock-photo aesthetic
Lost Monster doesn't use stock photos. Visual interest comes from typography, gradients, glassmorphism, and the grid pattern. Adding decorative images = AI slop.

### 8. Thin/light font weights for headlines
Headlines are `font-bold` (700). `font-normal`, `font-light`, `font-medium` on headlines = too timid for Lost Monster.

### 9. Missing colour switcher
The colour switcher (fixed bottom-right) is core to the brand. Any page without access to the colour switcher is incomplete.

### 10. Missing key metrics
The four proof points (50+ projects, 70% cost savings, 4.9/5 rating, 2-4 wks build) should be visible on key pages. They're the trust signals.

---

## How to Use This Document

**During building:**
- Check every new element against the Provenance Rule
- Scan for Red Flags before presenting

**During review (SOFAX Dimension 11):**
- Each Red Flag found = automatic -4 from SOFAX total
- Provenance failures = flagged as orphan patterns

**During DEMX variations:**
- Brand Compliance Gate checks all 10 Red Flags before AIDA scoring
- Non-compliant variations are disqualified and replaced

---

## Lost Monster Approved Patterns

| Element | Approved Treatment |
|---------|-------------------|
| Page background | Dark gradient (`bg-gradient-to-br ${color.bg}`) |
| Cards | Glassmorphism (`bg-white/5 backdrop-blur-md border`) |
| Card borders | Dynamic (`borderColor: color.accent + '20'`) |
| Headlines | Bold, massive (`text-6xl md:text-8xl lg:text-9xl font-bold`) |
| Section titles | Large (`text-4xl md:text-6xl font-bold`) |
| Body text | `text-xl md:text-2xl text-neutral-300` |
| Muted text | `text-neutral-400` or `text-sm` |
| Accent colour | Dynamic (`style={{ color: color.accent }}`) |
| Buttons | Dynamic bg (`style={{ backgroundColor: color.accent }}`) |
| Background texture | Grid pattern SVG at `opacity-30` |
| Voice | First person "I", direct, personal |

---

**Last Updated:** February 2026
