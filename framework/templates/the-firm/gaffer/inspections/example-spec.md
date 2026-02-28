# Inspection Spec: [Page Name]

## Target
- **What:** [Description of the page and its key sections]
- **Base URL:** http://localhost:[PORT]

## Viewports
- Desktop: 1280x800
- Mobile: 390x844

## Checkpoints

### CP-01: Above the fold (desktop)
- **URL:** /[page-path]
- **Setup:** Wait for [key element] to load
- **Viewport:** desktop
- **Workers:** SOFAX, AIDAX, NIGELX
- **Focus:** Hero impact, primary CTA prominence, trust signals, AIDA Attention score

### CP-02: Above the fold (mobile)
- **URL:** /[page-path]
- **Setup:** Wait for [key element] to load
- **Viewport:** mobile
- **Workers:** SOFAX, PIXLX, NIGELX
- **Focus:** Mobile layout, touch targets, no horizontal scroll, primary action reachable

### CP-03: Full page scroll (desktop)
- **URL:** /[page-path]
- **Setup:** Scroll to bottom of page
- **Viewport:** desktop
- **Workers:** SOFAX, CONSX, AIDAX
- **Focus:** Page rhythm, card treatment compliance, section spacing, footer

### CP-04: [Key content section]
- **URL:** /[page-path]
- **Setup:** Scroll to [section name]
- **Viewport:** both
- **Workers:** SOFAX, PIXLX, NIGELX
- **Focus:** [Section-specific concerns — card treatment, data display, interaction patterns]

### CP-05: Empty/error state
- **URL:** /[page-path]
- **Setup:** Trigger empty or error state
- **Viewport:** desktop
- **Workers:** PIXLX, NIGELX
- **Focus:** Empty state handling — guidance message, not blank space
