# HARDX — Hardcoded Value Detection Framework

> **Version**: 1.0
> **Created**: January 13, 2026
> **Trigger**: `HARDX` or `HARDX: [category]`

---

## Overview

**HARDX** scans codebases to find hardcoded values that should be configurable. This includes magic numbers, inline colors, hardcoded URLs, embedded credentials, and content that should be CMS-managed.

---

## Quick Start

| Command | Action |
|---------|--------|
| `HARDX` | Full hardcode scan |
| `HARDX: colors` | Scan for hardcoded colors |
| `HARDX: strings` | Scan for hardcoded text/content |
| `HARDX: urls` | Scan for hardcoded URLs |
| `HARDX: numbers` | Scan for magic numbers |
| `HARDX --fix` | Auto-generate config structure |

---

## Detection Categories

### 1. Colors (Priority: High)

**Pattern:** Inline hex/rgb values instead of CSS variables

```tsx
// ❌ HARDCODED
<div className="bg-[#20ED8A]">
<div style={{ color: 'rgb(32, 237, 138)' }}>

// ✅ CONFIGURABLE
<div className="bg-accent">
<div style={{ color: 'var(--color-accent)' }}>
```

**Scan command:**
```bash
grep -rn "#[0-9A-Fa-f]\{6\}\|rgb\(" src/ --include="*.tsx" --include="*.ts"
```

**Exceptions:**
- CSS variable declarations (`:root { --color: #fff }`)
- Design system source files
- Test fixtures

---

### 2. Text Content (Priority: Medium)

**Pattern:** Inline strings that should be CMS-managed

```tsx
// ❌ HARDCODED
<h1>Welcome to Our Platform</h1>
<p>Contact us at support@example.com</p>
<footer>© 2024 Company Name</footer>

// ✅ CONFIGURABLE
<h1>{content.hero.title}</h1>
<p>{siteConfig.contact.email}</p>
<footer>© {year} {siteConfig.company}</footer>
```

**Scan for:**
- Page headings/titles
- Marketing copy
- Contact information
- Company names
- Copyright notices

---

### 3. URLs & Endpoints (Priority: High)

**Pattern:** Inline URLs instead of environment variables

```tsx
// ❌ HARDCODED
fetch('https://api.example.com/v1/users')
const stripeKey = 'pk_live_xxxxx'

// ✅ CONFIGURABLE
fetch(`${process.env.API_URL}/users`)
const stripeKey = process.env.STRIPE_PUBLIC_KEY
```

**Scan command:**
```bash
grep -rn "https\?://\|api\.\|\.com/" src/ --include="*.ts" --include="*.tsx"
```

**Critical patterns:**
- API endpoints
- Webhook URLs
- OAuth callback URLs
- CDN paths
- Database connection strings

---

### 4. Magic Numbers (Priority: Medium)

**Pattern:** Unexplained numeric values

```tsx
// ❌ HARDCODED
setTimeout(fn, 3000)
if (items.length > 50)
const padding = 16

// ✅ CONFIGURABLE
setTimeout(fn, TOAST_DURATION_MS)
if (items.length > MAX_ITEMS_PER_PAGE)
const padding = spacing.md
```

**Common magic numbers:**
- Timeouts/delays
- Pagination limits
- Animation durations
- Breakpoints
- Max lengths

---

### 5. Feature Flags (Priority: Low)

**Pattern:** Inline booleans for features

```tsx
// ❌ HARDCODED
if (true) { showBetaFeature() }
const enableAnalytics = false

// ✅ CONFIGURABLE
if (featureFlags.showBetaFeature)
const enableAnalytics = config.analytics.enabled
```

---

## Scan Output

Generate `/docs/HARDCODE-REPORT.md`:

```markdown
# Hardcode Detection Report

**Scanned:** src/, components/, lib/
**Date:** [timestamp]
**Total Issues:** 47

## By Category

| Category | Count | Severity |
|----------|-------|----------|
| Colors | 12 | 🟡 Medium |
| URLs | 8 | 🔴 High |
| Text | 23 | 🟢 Low |
| Numbers | 4 | 🟡 Medium |

## Critical Issues (Fix Now)

1. `src/api/stripe.ts:15` - Hardcoded API endpoint
2. `src/auth/config.ts:8` - Inline OAuth URL
3. `components/Header.tsx:42` - Hardcoded logo URL

## Medium Priority

4. `components/Button.tsx:12` - Inline color #20ED8A
5. `lib/utils.ts:28` - Magic number 3000ms
...

## Low Priority (Content)

12. `components/Footer.tsx:5` - Hardcoded copyright
...
```

---

## Auto-Fix Output

When run with `--fix`, generates config structure:

```typescript
// generated/config-suggestions.ts

export const suggestedConfig = {
  colors: {
    accent: '#20ED8A',  // Found in 12 files
    background: '#0a0f1a',  // Found in 8 files
  },

  api: {
    baseUrl: 'https://api.example.com',  // Found in 5 files
    version: 'v1',
  },

  timing: {
    toastDuration: 3000,  // Found in 3 files
    animationDuration: 300,  // Found in 7 files
  },

  content: {
    companyName: 'Company Name',  // Found in 4 files
    supportEmail: 'support@example.com',  // Found in 2 files
  },
};
```

---

## Checklist

### Colors
- [ ] All hex values in CSS variables
- [ ] All theme colors use `var(--color-*)`
- [ ] Accent color documented as project-specific

### URLs
- [ ] All API URLs from environment
- [ ] No production URLs in code
- [ ] OAuth URLs in config

### Content
- [ ] Marketing copy in CMS/content files
- [ ] Contact info in config
- [ ] Footer content configurable

### Numbers
- [ ] Timeouts named as constants
- [ ] Limits in config
- [ ] Breakpoints in theme

---

## Integration

Run HARDX after:
- Initial project setup
- Before production deploy
- After major refactoring

Run HARDX before:
- CRUDX (to identify what needs CMS)
- AUDIX (to clean up before audit)

---

**Related:** [CRUDX](./CRUDX.md) for CMS conversion, [CONSX](./CONSX.md) for UI consistency
