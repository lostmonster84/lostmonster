# Mobile TikTok Experience (`/m/`)

Simple TikTok-style vertical scroll demo with 8 color sections.

## Quick Test

**Option 1: Direct URL (Fastest)**
```
http://localhost:3000/m/
```

**Option 2: Mobile Device Emulator**
1. Open DevTools (F12)
2. Toggle device mode (Cmd+Shift+M / Ctrl+Shift+M)
3. Select "iPhone 14 Pro"
4. Visit `http://localhost:3000/`
5. Middleware auto-redirects to `/m/`

## What You'll See

8 full-screen color sections:
1. **Blue** - Welcome
2. **Purple** - Modern
3. **Indigo** - Fast
4. **Violet** - Beautiful
5. **Fuchsia** - Scalable
6. **Pink** - Reliable
7. **Rose** - Proven
8. **Red** - Ready?

## Features

- ✅ Vertical snap scroll
- ✅ Haptic feedback (vibration on section change)
- ✅ Section indicator (bottom dots)
- ✅ Swipe hint (first section only)
- ✅ Smooth 60fps scrolling
- ✅ Mobile-only routes (50% smaller bundle)

## Next Steps

Fill in real content:
- Replace colors with images/videos
- Add real copy (headlines, descriptions)
- Build service sections
- Add CTAs and contact forms

## File Structure

```
app/m/
├── layout.tsx          # Mobile viewport config
├── page.tsx            # Color demo (8 sections)
└── README.md           # This file

components/tiktok/
├── TikTokScroll.tsx    # Scroll container
├── TikTokSection.tsx   # Section template
└── HorizontalCarousel.tsx  # For future use

middleware.ts           # Auto mobile detection
```

## Documentation

Full framework docs: `/docs/TIKTOK-MOBILE-FRAMEWORK.md`

