# Inspection Spec: Lost Monster Homepage

## Target
- **What:** Lost Monster homepage — hero, metrics, services, testimonials, CTA
- **Base URL:** http://localhost:3000

## Viewports
- Desktop: 1280x800
- Mobile: 390x844

## Checkpoints

### CP-01: Above the fold (desktop)
- **URL:** /
- **Setup:** Wait for hero animation to complete, verify colour switcher renders
- **Viewport:** desktop
- **Workers:** SOFAX, AIDAX, NIGELX
- **Focus:** Hero impact (128px typography), accent colour prominence, grid pattern visible, "Start Your Project" CTA visible, AIDA Attention score

### CP-02: Above the fold (mobile)
- **URL:** /
- **Setup:** Wait for hero to load
- **Viewport:** mobile
- **Workers:** SOFAX, PIXLX, NIGELX
- **Focus:** Mobile hero layout (text-6xl scaling), touch targets, no horizontal scroll, colour switcher accessible

### CP-03: Metrics section
- **URL:** /
- **Setup:** Scroll to metric cards (50+, 70%, 4.9/5, 2-4 wks)
- **Viewport:** both
- **Workers:** SOFAX, AIDAX, NIGELX
- **Focus:** Glassmorphism card treatment (bg-white/5 backdrop-blur-md), metric prominence, accent colour on icons, trust signal impact

### CP-04: Full page scroll (desktop)
- **URL:** /
- **Setup:** Scroll to bottom of page
- **Viewport:** desktop
- **Workers:** SOFAX, CONSX, AIDAX
- **Focus:** Dark gradient consistency throughout, section transitions, grid pattern continuity, personal voice consistency, footer

### CP-05: Colour switching
- **URL:** /
- **Setup:** Click through all 5 colour options (blue, teal, orange, purple, green)
- **Viewport:** desktop
- **Workers:** PIXLX, CONSX
- **Focus:** Smooth 700ms transition, all accent elements update, no hardcoded colours visible, contrast maintained across all options
