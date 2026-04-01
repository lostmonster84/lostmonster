# Design Guide — [PROJECT]

> The single source of truth for visual identity. Every UI worker checks against this document.
> Without this, brand compliance doesn't work — SOFAX, PIXLX, CONSX, DEMX all need it.
>
> **Living page:** See `/design` for the interactive version with live examples and downloadable assets.

---

## Brand Identity

| Attribute | Value |
|-----------|-------|
| **Name** | [PROJECT] |
| **Tagline** | _one line that captures the brand_ |
| **Voice** | _e.g. "Bold but professional", "Warm and direct", "Clinical and trustworthy"_ |
| **Personality** | _3-5 traits: e.g. confident, precise, friendly, premium, accessible_ |

---

## Logos & Assets

| Variant | File | Usage | Min Size |
|---------|------|-------|----------|
| Primary | `/public/logo.svg` | Navigation, headers | 32px |
| Wordmark | `/public/logo-wordmark.svg` | Footer, about page | 120px |
| Icon | `/public/logo-icon.svg` | Favicon, social, compact spaces | 16px |
| On dark | `/public/logo-dark.svg` | Dark backgrounds | 32px |
| On light | `/public/logo-light.svg` | Light backgrounds | 32px |

**Clear space:** 1x logo height on all sides minimum.

**Don'ts:**
- Don't rotate or skew the logo
- Don't change the logo colours
- Don't add drop shadows or effects
- Don't place on busy backgrounds without contrast overlay

---

## Colours

### Brand Colours

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Primary | `#______` | `--color-primary` | CTAs, links, key accents. Max 1-2 elements per viewport |
| Background | `#______` | `--color-bg` | Page canvas, section backgrounds |
| Dark | `#______` | `--color-dark` | Headers, hero overlays, dark sections |
| Secondary | `#______` | `--color-secondary` | Supporting accents, badges, borders |
| Muted | `#______` | `--color-muted` | Secondary text, placeholders, disabled states |
| Accent | `#______` | `--color-accent` | Highlights, notifications, special elements |

### Semantic Colours

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#______` | Confirmations, positive states |
| Warning | `#______` | Cautions, pending states |
| Error | `#______` | Errors, destructive actions |
| Info/Link | `#______` | Links, informational elements |

### Colour Rules

**Do:**
- _e.g. Use Primary sparingly — max 1-2 elements per viewport_
- _e.g. Dark backgrounds only in hero sections and footer_
- _e.g. Adjacent sections must alternate background colours_

**Don't:**
- _e.g. Never use Primary + Accent adjacent — contrast fails_
- _e.g. No pure black (#000000) — use Dark instead_
- _e.g. No gradients on light backgrounds_

---

## Typography

### Fonts

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings | _e.g. Outfit_ | 700-800 | Page titles, section headers, hero text |
| Body | _e.g. Inter_ | 400-500 | Paragraphs, descriptions, UI labels |
| Mono | _e.g. JetBrains Mono_ | 400 | Code blocks, data tables, technical content |

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| Hero | _e.g. clamp(48px, 8vw, 128px)_ | 1.0 | Homepage hero, major page titles |
| H1 | _e.g. 36-48px_ | 1.1 | Page titles |
| H2 | _e.g. 24-32px_ | 1.2 | Section headings |
| H3 | _e.g. 20-24px_ | 1.3 | Subsection headings |
| Body | _e.g. 16-18px_ | 1.6 | Standard text |
| Small | _e.g. 14px_ | 1.5 | Captions, metadata, labels |
| Tiny | _e.g. 12px_ | 1.4 | Badges, timestamps |

### Typography Rules

- Maximum **3 text sizes** per card/section
- Headings always `font-bold tracking-tight`
- _Add project-specific rules_

---

## Layout & Spacing

### Background Strategy

| Background | Where | When |
|------------|-------|------|
| _e.g. Sand/Canvas_ | Page canvas between sections | Default |
| _e.g. White_ | Content cards, data tables | Content containers |
| _e.g. Dark_ | Hero sections, footer | Immersive moments |
| _e.g. Mist_ | Loading states, skeletons | Temporary states |

**Adjacent section rule:** Consecutive sections MUST have different backgrounds.

### Spacing

| Element | Value | Notes |
|---------|-------|-------|
| Section padding | _e.g. py-20_ | Vertical breathing room between sections |
| Card gap | _e.g. gap-4 or gap-6_ | Space between cards in a grid |
| Internal padding | _e.g. p-6_ | Inside cards and containers |
| Hero height | _e.g. min-h-screen_ | Full viewport hero |

---

## Components

### Cards

| Property | Value |
|----------|-------|
| Background | _e.g. bg-white_ |
| Border radius | _e.g. rounded-2xl_ |
| Shadow (rest) | _e.g. shadow-[0_4px_20px_rgba(0,0,0,0.08)]_ |
| Shadow (hover) | _e.g. shadow-[0_16px_48px_rgba(0,0,0,0.16)]_ |
| Hover transform | _e.g. hover:-translate-y-2_ |
| Transition | _e.g. transition-all duration-300_ |

### Buttons / CTAs

| Variant | Classes | Usage |
|---------|---------|-------|
| Primary | _e.g. bg-primary text-white px-6 py-3 rounded-lg_ | Main actions |
| Secondary | _e.g. bg-secondary text-dark px-6 py-3 rounded-lg_ | Supporting actions |
| Ghost | _e.g. text-primary border border-primary px-6 py-3_ | Tertiary actions |

### Badges

| Variant | Usage | Style |
|---------|-------|-------|
| Solid | Overlays, dark backgrounds | _bg-primary text-white_ |
| Soft | Tables, light backgrounds | _bg-primary/10 text-primary_ |
| Status | State indicators | _Use semantic colours_ |

---

## Photography & Imagery

**Do:**
- _e.g. Use real project photography, not stock_
- _e.g. Images must show the actual product/service in context_
- _e.g. Dark overlay on hero images for text readability_

**Don't:**
- _e.g. No generic stock photography_
- _e.g. No AI-generated images_
- _e.g. No images without alt text_

---

## Icons

| Library | Usage |
|---------|-------|
| _e.g. Lucide React_ | All UI icons |

| Context | Size |
|---------|------|
| Inline with text | _e.g. w-4 h-4_ |
| Button icons | _e.g. w-5 h-5_ |
| Feature icons | _e.g. w-8 h-8_ |
| Hero/decorative | _e.g. w-12 h-12_ |

---

## Social & OG

| Asset | Dimensions | Background | Elements |
|-------|-----------|------------|----------|
| OG Image | 1200x630 | _Dark gradient_ | Logo + tagline + texture |
| Twitter Card | 1200x600 | _Same as OG_ | Same as OG |
| Favicon | 16/32/180px | _Transparent_ | Logo icon |

**Share card rules:**
- Always use real logo, never text placeholder
- Dark background with depth (texture, glow, not flat)
- Brand fonts loaded, not system defaults

---

## Anti-Patterns (What NOT To Do)

| Anti-Pattern | Why It's Wrong |
|---|---|
| _e.g. Rounded corners on everything_ | _Doesn't match brand identity_ |
| _e.g. Gray backgrounds on marketing pages_ | _Feels generic, not premium_ |
| _e.g. More than 3 text sizes in one card_ | _Visual noise, breaks hierarchy_ |
| _e.g. Accent bars or coloured borders_ | _Not part of the design system_ |
| _e.g. Stock photography_ | _Breaks authenticity_ |

---

## Quality Thresholds

| Worker | Target | What It Checks |
|--------|--------|---------------|
| SOFAX | 93+/110 | Design quality across 11 dimensions |
| AIDAX | 80+/100 | Conversion structure (Attention, Interest, Desire, Action) |
| NIGELX | 80+/100 | Usability and label comprehension |

---

*This guide evolves. Update it when design decisions change. Run `/design` to regenerate the living page.*
