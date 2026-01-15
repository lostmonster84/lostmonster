# DARKX Implementation Checklist

> **Complete System Audit Required**
> DARKX is NOT just adding infrastructure - it requires **systematic replacement** of ALL hardcoded colors.

---

## ⚠️ Critical Learning

**DON'T:**
- ❌ Add ThemeProvider and CSS variables, then stop
- ❌ Update one component and assume you're done
- ❌ Skip the audit phase

**DO:**
- ✅ Audit EVERY file for hardcoded colors FIRST
- ✅ Replace ALL instances systematically
- ✅ Test both light AND dark modes for every page
- ✅ Use this checklist to track progress

---

## Phase 1: Infrastructure Setup

### 1.1 CSS Variables

- [ ] Add light mode variables to `:root` in `globals.css`
  ```css
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    --primary: 189 94% 43%;
    --border: 0 0% 90%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    ... (all semantic tokens)
  }
  ```

- [ ] Add dark mode overrides in `.dark` class
  ```css
  .dark {
    --background: 0 0% 7%;
    --foreground: 0 0% 95%;
    --primary: 189 94% 50%;
    --border: 0 0% 20%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 65%;
    ... (all overrides)
  }
  ```

- [ ] Update `body` to use semantic colors
  ```css
  body {
    @apply bg-background text-foreground;
  }
  ```

### 1.2 Tailwind Config

- [ ] Set `darkMode: 'class'` in `tailwind.config.ts`
- [ ] Add ALL semantic color tokens to `theme.extend.colors`
  ```typescript
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    // ... ALL tokens
  }
  ```

### 1.3 Theme Provider

- [ ] Create `ThemeProvider.tsx` with:
  - SSR-safe default context
  - System preference detection
  - User choice persistence (localStorage + cookie)
  - `mounted` state to prevent hydration mismatch

- [ ] Create `useTheme()` hook that returns context (no throwing error!)

### 1.4 No-Flash Script

- [ ] Add inline script to `layout.tsx` `<head>` BEFORE any CSS
  ```typescript
  const themeScript = `
  (function() {
    try {
      const stored = localStorage.getItem('theme');
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const theme = stored === 'system' || !stored ? system : stored;
      document.documentElement.classList.add(theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  })();
  `;
  ```

- [ ] Add `suppressHydrationWarning` to `<html>` tag

### 1.5 Theme Toggle Component

- [ ] Create `ThemeToggle.tsx` with:
  - Light / Dark / System options
  - Check `mounted` before rendering (prevent hydration mismatch)
  - Visual indication of current theme

- [ ] Add toggle to sidebar/header

---

## Phase 2: **CRITICAL** - Complete Color Audit

### 2.1 Find ALL Hardcoded Colors

Run this command to find ALL files with hardcoded colors:
```bash
grep -r "bg-neutral\|bg-black\|bg-white\|text-white\|text-black\|text-gray\|border-white\|border-black\|border-gray" src/
```

- [ ] Create list of ALL files with hardcoded colors
- [ ] Do NOT proceed until you have the complete list

### 2.2 Color Replacement Map

Use this mapping for replacements:

| Hardcoded Color | DARKX Semantic Token |
|----------------|----------------------|
| `bg-white` | `bg-background` or `bg-card` |
| `bg-black` | `bg-background` (in dark mode) |
| `bg-neutral-950` | `bg-background` |
| `bg-neutral-900` | `bg-card` or `bg-muted` |
| `bg-neutral-50` | `bg-muted` |
| `text-white` | `text-foreground` |
| `text-black` | `text-foreground` |
| `text-white/60` | `text-muted-foreground` |
| `text-white/40` | `text-muted-foreground` |
| `text-gray-900` | `text-foreground` |
| `text-gray-700` | `text-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `border-white/5` | `border-border` |
| `border-white/10` | `border-border-hover` |
| `border-gray-200` | `border-border` |
| `border-gray-100` | `border-border` |

### 2.3 Special Cases Requiring Explicit Dark Variants

Some colors need **explicit dark mode classes** (not semantic tokens):

#### Status/Alert Colors
```tsx
// ❌ BAD - invisible in dark mode
<div className="bg-red-100 text-red-700">Error</div>

// ✅ GOOD - explicit dark variants
<div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
  Error
</div>
```

Apply to:
- [ ] Red (error/destructive)
- [ ] Green (success)
- [ ] Yellow/Amber (warning)
- [ ] Blue (info)
- [ ] Purple (custom accent)

#### Icon Backgrounds
```tsx
// ❌ BAD
<div className="bg-blue-100">
  <Icon className="text-blue-600" />
</div>

// ✅ GOOD
<div className="bg-blue-500/10 dark:bg-blue-500/20">
  <Icon className="text-blue-600 dark:text-blue-400" />
</div>
```

---

## Phase 3: Systematic Component Updates

### 3.1 Layout Components

- [ ] `DashboardLayout.tsx` - Replace `bg-neutral-950` → `bg-background`
- [ ] `Header.tsx` - All colors to semantic tokens
- [ ] `Sidebar.tsx` - All colors to semantic tokens
- [ ] `Footer.tsx` (if exists) - All colors to semantic tokens

### 3.2 Page Components

For EACH page, check and replace:

- [ ] `/page.tsx` (Home/Dashboard)
- [ ] `/login/page.tsx`
- [ ] `/pricing/page.tsx`
- [ ] `/investments/page.tsx`
- [ ] `/tasks/page.tsx`
- [ ] `/settings/page.tsx`
- [ ] `/[any-other-page]/page.tsx`

**For each page:**
- [ ] Background colors
- [ ] Text colors
- [ ] Border colors
- [ ] Hover states
- [ ] Status badges/alerts
- [ ] Icon colors
- [ ] Card/container colors

### 3.3 Shared UI Components

- [ ] `Button` - Semantic colors for all variants
- [ ] `Card` - `bg-card`, `text-card-foreground`, `border-border`
- [ ] `Input` - `bg-input`, `border-border`, `text-foreground`
- [ ] `Badge` - Explicit dark variants for colored badges
- [ ] `Alert` - Explicit dark variants for status alerts
- [ ] `Dropdown/Select` - `bg-card`, `border-border`
- [ ] `Modal/Dialog` - `bg-card`, overlay backdrop
- [ ] `Table` - Headers, rows, borders all semantic
- [ ] `Tabs` - Active/inactive states

### 3.4 Global Styles

- [ ] **Scrollbars** - Use `bg-border` and `bg-border-hover`
  ```css
  ::-webkit-scrollbar-thumb {
    @apply bg-border;
  }
  ```

- [ ] **Focus rings** - Use `ring-ring` and `ring-offset-background`
  ```css
  *:focus-visible {
    @apply ring-2 ring-ring ring-offset-2 ring-offset-background;
  }
  ```

- [ ] **Text selection** - Use `bg-primary/20` and `text-foreground`
  ```css
  ::selection {
    @apply bg-primary/20 text-foreground;
  }
  ```

---

## Phase 4: Testing & Validation

### 4.1 Visual Testing

Test EVERY page in BOTH modes:

**Light Mode:**
- [ ] Home/Dashboard page
- [ ] Login page
- [ ] Pricing page
- [ ] Investments page
- [ ] Tasks page
- [ ] Settings page

**Dark Mode:**
- [ ] Home/Dashboard page
- [ ] Login page
- [ ] Pricing page
- [ ] Investments page
- [ ] Tasks page
- [ ] Settings page

### 4.2 Interaction Testing

- [ ] Theme toggle switches correctly (Light → Dark → System)
- [ ] Theme persists across page refreshes
- [ ] No flash of wrong theme on page load
- [ ] System preference detection works (change OS theme)
- [ ] All hover states work in both modes
- [ ] Focus rings visible in both modes

### 4.3 Contrast Checking

- [ ] Run contrast checker on text/background combinations
- [ ] Ensure WCAG AA minimum (4.5:1 for normal text)
- [ ] Check muted text is still readable (3:1 minimum for large text)

### 4.4 Edge Cases

- [ ] Images/logos have dark variants (if needed)
- [ ] Charts/graphs adapt colors for dark mode
- [ ] Shadows are visible in dark mode (or use rings)
- [ ] Transparent backgrounds work correctly

---

## Phase 5: Documentation & Prevention

### 5.1 Code Comments

- [ ] Add comment to `globals.css`: `/* DARKX Color System */`
- [ ] Add comment to `tailwind.config.ts`: `// DARKX semantic colors`
- [ ] Document custom color decisions (e.g., why certain colors need explicit dark variants)

### 5.2 Developer Guidelines

Create/update project docs:
- [ ] Document the semantic color token system
- [ ] Add "DO NOT use hardcoded colors" rule
- [ ] Reference this checklist for future DARKX work

### 5.3 Linting (Optional but Recommended)

- [ ] Add ESLint rule to warn on hardcoded Tailwind colors
- [ ] Add pre-commit hook to check for `text-white`, `bg-black`, etc.

---

## Common Pitfalls & Fixes

### Pitfall 1: Partial Implementation
**Problem:** Added infrastructure but didn't update all components
**Solution:** Use Phase 2 audit to find ALL hardcoded colors

### Pitfall 2: Forgetting Hover States
**Problem:** Base colors updated but hover states still hardcoded
**Fix:** Search for `hover:bg-`, `hover:text-`, `hover:border-`

### Pitfall 3: Status Colors in Dark Mode
**Problem:** Green/red/yellow alerts invisible or washed out in dark mode
**Fix:** Use explicit dark variants:
```tsx
className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
```

### Pitfall 4: Hydration Mismatch
**Problem:** Server renders light mode, client shows dark (flash)
**Fix:**
- Add no-flash script to `<head>`
- Add `suppressHydrationWarning` to `<html>`
- Check `mounted` in ThemeToggle before rendering

### Pitfall 5: Focus Rings on Wrong Background
**Problem:** Focus ring invisible because offset color is wrong
**Fix:** Use `ring-offset-background` (adapts to theme)

---

## Success Criteria

DARKX is fully implemented when:

- [ ] **All pages render correctly in both light and dark modes**
- [ ] **No hardcoded colors remain** (run grep audit)
- [ ] **Theme toggle works** and persists across refreshes
- [ ] **No flash** of wrong theme on page load
- [ ] **System preference** is detected and respected
- [ ] **All hover/focus states work** in both modes
- [ ] **Text is readable** in both modes (contrast checked)
- [ ] **This checklist is 100% complete**

---

## Maintenance

After initial implementation:

- [ ] Add this checklist to onboarding docs
- [ ] Review new PRs for hardcoded colors
- [ ] Test dark mode when adding new components
- [ ] Update this checklist with new learnings

---

**Last Updated:** 2026-01-15 (Dashboard Implementation)
**Status:** Production-ready checklist based on real implementation learnings
