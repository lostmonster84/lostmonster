# DARKX Framework

> **Universal Dark Mode System**
>
> A complete framework for implementing dark mode that works across any web application. System preference detection, user persistence, smooth transitions, and comprehensive theming.

---

## What is DARKX?

**DARKX** is a universal framework for implementing dark mode with:
- **System Detection** - Respects OS preference automatically
- **User Override** - Persists user choice across sessions
- **Smooth Transitions** - No flash of wrong theme on load
- **Comprehensive Theming** - CSS variables, component tokens, semantic colors
- **Accessibility** - Proper contrast ratios in both modes

**The Goal:** Dark mode that "just works" - users get what they expect without thinking about it.

---

## Why DARKX Exists

### The Dark Mode Problems It Solves

| Problem | Traditional Approach | DARKX Solution |
|---------|---------------------|----------------|
| Flash of wrong theme | Theme loads after JS | CSS variable preload script |
| No system preference | Hardcoded light mode | `prefers-color-scheme` media query |
| User choice not saved | Resets on refresh | localStorage + cookie persistence |
| Inconsistent colors | Random dark values | Semantic color system |
| Accessibility issues | Low contrast in dark | WCAG AA minimum enforced |
| Component mismatch | Some components light | Theme token system |

### The 5 Pillars of DARKX

```
┌─────────────────────────────────────────────────────────────────┐
│                         DARKX                                    │
├─────────────┬─────────────┬─────────────┬──────────┬────────────┤
│   DETECT    │   PERSIST   │  TRANSITION │  THEME   │  VALIDATE  │
│             │             │             │          │            │
│ System pref │ localStorage│ No flash    │ Semantic │ Contrast   │
│ OS-aware    │ Cookie sync │ CSS vars    │ tokens   │ WCAG AA    │
│ Real-time   │ SSR-safe    │ Smooth      │ Complete │ Both modes │
└─────────────┴─────────────┴─────────────┴──────────┴────────────┘
```

---

## When to Use DARKX

### Use DARKX For

- **New applications** - Set up dark mode correctly from the start
- **Adding dark mode** - Retrofit existing apps with proper theming
- **Design systems** - Create theme-aware component libraries
- **Marketing sites** - Professional dark mode for any site
- **SaaS dashboards** - Users expect dark mode for long sessions

### Prerequisites

- CSS custom properties (CSS variables) support
- Modern browser baseline (no IE11)
- React/Next.js (examples use React, but concepts are universal)
- Tailwind CSS (recommended, but adaptable to any CSS approach)

---

## The DARKX Architecture

### Layer 1: Detection (System Preference)

```typescript
// DETECT: Check system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// DETECT: Listen for system changes
const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return systemTheme;
};
```

### Layer 2: Persistence (User Choice)

```typescript
// PERSIST: Storage keys
const THEME_KEY = 'theme';
const THEME_COOKIE = 'theme';

// PERSIST: Read from storage
const getStoredTheme = (): 'light' | 'dark' | 'system' | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(THEME_KEY) as 'light' | 'dark' | 'system' | null;
};

// PERSIST: Write to storage (localStorage + cookie for SSR)
const setStoredTheme = (theme: 'light' | 'dark' | 'system') => {
  localStorage.setItem(THEME_KEY, theme);
  document.cookie = `${THEME_COOKIE}=${theme};path=/;max-age=31536000`;
};
```

### Layer 3: Transition (No Flash)

```html
<!-- TRANSITION: Inline script in <head> BEFORE any CSS -->
<script>
  (function() {
    const stored = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored === 'system' || !stored ? system : stored;
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  })();
</script>
```

### Layer 4: Theme (CSS Variables)

```css
/* THEME: Root light mode variables */
:root {
  /* Backgrounds */
  --background: 0 0% 100%;
  --background-secondary: 0 0% 98%;
  --background-tertiary: 0 0% 96%;

  /* Foregrounds */
  --foreground: 0 0% 9%;
  --foreground-muted: 0 0% 45%;

  /* Borders */
  --border: 0 0% 90%;
  --border-hover: 0 0% 80%;

  /* Primary */
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;

  /* Accents */
  --accent: 0 0% 96%;
  --accent-foreground: 0 0% 9%;

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Cards */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 9%;

  /* Inputs */
  --input: 0 0% 90%;
  --ring: 221 83% 53%;
}

/* THEME: Dark mode overrides */
.dark {
  --background: 0 0% 7%;
  --background-secondary: 0 0% 10%;
  --background-tertiary: 0 0% 13%;

  --foreground: 0 0% 95%;
  --foreground-muted: 0 0% 65%;

  --border: 0 0% 20%;
  --border-hover: 0 0% 30%;

  --primary: 221 83% 60%;
  --primary-foreground: 0 0% 100%;

  --accent: 0 0% 15%;
  --accent-foreground: 0 0% 95%;

  --destructive: 0 70% 50%;
  --destructive-foreground: 0 0% 100%;

  --card: 0 0% 10%;
  --card-foreground: 0 0% 95%;

  --input: 0 0% 20%;
  --ring: 221 83% 60%;
}
```

### Layer 5: Validation (Accessibility)

```typescript
// VALIDATE: Contrast checker
const checkContrast = (foreground: string, background: string): number => {
  // Calculate relative luminance and contrast ratio
  // Returns ratio like 4.5 (AA minimum) or 7 (AAA)
};

// VALIDATE: Required contrasts
const CONTRAST_REQUIREMENTS = {
  'foreground/background': 4.5,      // WCAG AA normal text
  'foreground-muted/background': 3,   // WCAG AA large text
  'primary/primary-foreground': 4.5,
  'destructive/destructive-foreground': 4.5,
};
```

---

## The DARKX Theme Provider

### Complete Provider Implementation

```typescript
// src/components/providers/ThemeProvider.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(THEME_KEY) as Theme) || "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize from storage
  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setThemeState(stored);
    updateResolvedTheme(stored);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        updateResolvedTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  const updateResolvedTheme = (newTheme: Theme) => {
    const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);

    // Update DOM
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.cookie = `${THEME_KEY}=${newTheme};path=/;max-age=31536000`;
    updateResolvedTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

---

## The DARKX Toggle Component

### Three-State Toggle (Light/Dark/System)

```typescript
// src/components/ui/ThemeToggle.tsx

"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
          {theme === "light" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
          {theme === "dark" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
          {theme === "system" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Simple Toggle (Light/Dark Only)

```typescript
// src/components/ui/ThemeSwitch.tsx

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
```

---

## The DARKX Color System

### Semantic Color Tokens

```css
/* Semantic color system - what colors MEAN, not what they ARE */

:root {
  /* ===== SURFACES ===== */
  /* Use for layering - each level slightly different */
  --surface-0: var(--background);           /* Page background */
  --surface-1: var(--background-secondary); /* Card, modal background */
  --surface-2: var(--background-tertiary);  /* Nested elements */
  --surface-raised: var(--card);            /* Elevated components */
  --surface-overlay: var(--background);     /* Modals, popovers */

  /* ===== TEXT ===== */
  --text-primary: var(--foreground);        /* Main text */
  --text-secondary: var(--foreground-muted);/* Supporting text */
  --text-disabled: hsl(0 0% 60%);           /* Disabled state */
  --text-inverse: var(--background);        /* Text on primary bg */

  /* ===== INTERACTIVE ===== */
  --interactive-default: var(--primary);
  --interactive-hover: hsl(from var(--primary) h s calc(l + 5));
  --interactive-active: hsl(from var(--primary) h s calc(l - 5));
  --interactive-focus: var(--ring);

  /* ===== STATUS ===== */
  --status-success: hsl(142 76% 36%);
  --status-success-bg: hsl(142 76% 96%);
  --status-warning: hsl(38 92% 50%);
  --status-warning-bg: hsl(38 92% 96%);
  --status-error: hsl(0 84% 60%);
  --status-error-bg: hsl(0 84% 96%);
  --status-info: hsl(221 83% 53%);
  --status-info-bg: hsl(221 83% 96%);
}

.dark {
  /* Dark mode status backgrounds need adjustment */
  --status-success-bg: hsl(142 50% 15%);
  --status-warning-bg: hsl(38 50% 15%);
  --status-error-bg: hsl(0 50% 15%);
  --status-info-bg: hsl(221 50% 15%);
}
```

### Tailwind Config Integration

```typescript
// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Surfaces
        surface: {
          0: "hsl(var(--surface-0))",
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          raised: "hsl(var(--surface-raised))",
          overlay: "hsl(var(--surface-overlay))",
        },

        // Primary
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Muted
        muted: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--foreground-muted))",
        },

        // Accent
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Destructive
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Status
        success: {
          DEFAULT: "hsl(var(--status-success))",
          bg: "hsl(var(--status-success-bg))",
        },
        warning: {
          DEFAULT: "hsl(var(--status-warning))",
          bg: "hsl(var(--status-warning-bg))",
        },
        error: {
          DEFAULT: "hsl(var(--status-error))",
          bg: "hsl(var(--status-error-bg))",
        },
        info: {
          DEFAULT: "hsl(var(--status-info))",
          bg: "hsl(var(--status-info-bg))",
        },

        // Border
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Card
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## The DARKX No-Flash Script

### Next.js Implementation

```typescript
// src/app/layout.tsx

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

// The critical script that prevents flash
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

export const metadata: Metadata = {
  title: "Your App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL: This must be first, before any CSS */}
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## DARKX Implementation Checklist

### Phase 1: Foundation
- [ ] Add CSS variables for light mode (`:root`)
- [ ] Add CSS variables for dark mode (`.dark`)
- [ ] Update `tailwind.config.ts` with color tokens
- [ ] Set `darkMode: "class"` in Tailwind config

### Phase 2: Provider
- [ ] Create `ThemeProvider` component
- [ ] Create `useTheme` hook
- [ ] Wrap app in `ThemeProvider`
- [ ] Add no-flash script to layout `<head>`

### Phase 3: Toggle
- [ ] Create `ThemeToggle` component (dropdown)
- [ ] Add toggle to header/navbar
- [ ] Test three states: light, dark, system

### Phase 4: Components
- [ ] Update all hardcoded colors to CSS variables
- [ ] Ensure images have dark variants if needed
- [ ] Check shadows (lighter in dark mode)
- [ ] Check borders (more visible in dark mode)

### Phase 5: Validation
- [ ] Check contrast ratios in both modes
- [ ] Test with system preference changes
- [ ] Test persistence across page refreshes
- [ ] Test SSR (no hydration mismatch)

---

## Common DARKX Patterns

### Pattern 1: Conditional Dark Images

```tsx
// Different image for dark mode
<img
  src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
  alt="Logo"
/>

// Or with CSS
<img
  className="dark:hidden"
  src="/logo-light.svg"
  alt="Logo"
/>
<img
  className="hidden dark:block"
  src="/logo-dark.svg"
  alt="Logo"
/>
```

### Pattern 2: Shadows in Dark Mode

```css
/* Shadows should be more subtle in dark mode */
.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Or use ring instead of shadow */
.dark .card {
  box-shadow: none;
  ring: 1px solid hsl(var(--border));
}
```

### Pattern 3: Status Colors

```tsx
// Status badges that work in both modes
<span className="bg-success-bg text-success px-2 py-1 rounded">
  Active
</span>

<span className="bg-error-bg text-error px-2 py-1 rounded">
  Failed
</span>
```

### Pattern 4: Charts and Graphs

```tsx
// Chart colors that adapt
const chartColors = {
  primary: resolvedTheme === 'dark'
    ? 'hsl(221, 83%, 60%)'
    : 'hsl(221, 83%, 53%)',
  grid: resolvedTheme === 'dark'
    ? 'hsl(0, 0%, 20%)'
    : 'hsl(0, 0%, 90%)',
  text: resolvedTheme === 'dark'
    ? 'hsl(0, 0%, 65%)'
    : 'hsl(0, 0%, 45%)',
};
```

---

## DARKX Production Learnings

> **Real-world fixes from Stayflo implementation (Jan 2026)**

### Learning 1: SSR-Safe Context (CRITICAL)

The basic ThemeProvider throws an error when `useTheme` is called outside the provider. This causes SSR hydration issues. **Use a default context value instead:**

```typescript
// BAD - throws error, breaks SSR
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// GOOD - SSR-safe with default
const defaultContext: ThemeContextValue = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  mounted: false,  // Add mounted flag
};

const ThemeContext = createContext<ThemeContextValue>(defaultContext);

export function useTheme() {
  return useContext(ThemeContext);  // Always returns valid context
}
```

### Learning 2: Mounted State in Toggle

The toggle component MUST check `mounted` before rendering to prevent hydration mismatch:

```typescript
export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  // Prevent hydration mismatch - render nothing until mounted
  if (!mounted) {
    return <div className="w-9 h-9" />;  // Placeholder
  }

  return (
    // ... toggle UI
  );
}
```

### Learning 3: Tailwind Config CSS Variables (CRITICAL)

**THE #1 MISTAKE:** Having both CSS variable colors AND hardcoded hex colors, then using the hardcoded ones.

```typescript
// BAD - defeats the entire dark mode system!
colors: {
  primary: "#0D9488",  // Hardcoded, ignores .dark class
}

// GOOD - responds to theme automatically
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",  // Uses CSS variable
    foreground: "hsl(var(--primary-foreground))",
    // Keep hex scale for utilities that need opacity
    50: "#F0FDFA",
    500: "#14B8A6",
    // ...
  }
}
```

### Learning 4: Semantic Classes for Everything

Replace ALL hardcoded grays with semantic classes:

```typescript
// BAD - invisible in dark mode
<h1 className="text-gray-900">Title</h1>
<div className="bg-white border-gray-200">

// GOOD - adapts to theme
<h1 className="text-foreground">Title</h1>
<div className="bg-card border-border">
```

**Complete mapping:**
| Hardcoded | Semantic |
|-----------|----------|
| `text-gray-900` | `text-foreground` |
| `text-gray-700` | `text-foreground` or `text-card-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `bg-white` | `bg-background` or `bg-card` |
| `bg-gray-50` | `bg-muted` or `bg-muted/50` |
| `border-gray-200` | `border-border` |
| `border-gray-100` | `border-border` |

### Learning 5: Dropdown/Popover Colors

Dropdowns need `popover` semantic colors (which often differ from `card`):

```typescript
// Menu dropdown
<div className="bg-popover border-border rounded-lg shadow-lg">
  <button className="text-popover-foreground hover:bg-muted">
    Edit
  </button>
</div>
```

### Learning 6: Status Badges Need Explicit Dark Variants

Status badges often use specific light background colors that don't work in dark mode:

```typescript
// BAD - green-100 is too light for dark backgrounds
const statusStyles = {
  active: "bg-green-100 text-green-700",
};

// GOOD - explicit dark variants
const statusStyles = {
  active: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  draft: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  error: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};
```

### Learning 7: Icon Backgrounds

Colored icon backgrounds need explicit dark variants:

```typescript
// BAD - bg-blue-100 washes out in dark mode
<div className="w-10 h-10 bg-blue-100 rounded-lg">
  <Icon className="text-blue-600" />
</div>

// GOOD - explicit dark variant with higher opacity
<div className="w-10 h-10 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
  <Icon className="text-blue-600 dark:text-blue-400" />
</div>
```

### Learning 8: Tables Need Full Treatment

Tables have multiple elements that need semantic colors:

```typescript
// BAD - table invisible in dark mode
<table>
  <thead>
    <tr className="border-b border-gray-100">
      <th className="text-gray-500">Header</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-50">
    <tr className="hover:bg-gray-50">
      <td className="text-gray-900">{value}</td>
    </tr>
  </tbody>
</table>

// GOOD - fully themed table
<table>
  <thead>
    <tr className="border-b border-border">
      <th className="text-muted-foreground">Header</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-border">
    <tr className="hover:bg-muted/50">
      <td className="text-foreground">{value}</td>
    </tr>
  </tbody>
</table>
```

### Learning 9: Select/Dropdown Form Elements

Native `<select>` elements need explicit background AND text colors:

```typescript
// BAD - white background in dark mode
<select className="bg-white border border-gray-200">

// GOOD - themed select
<select className="bg-card text-foreground border border-border">
```

### Learning 10: Info/Help Boxes with Colored Backgrounds

Colored informational boxes need complete dark treatment:

```typescript
// BAD - light blue box unreadable in dark mode
<div className="bg-blue-50 border border-blue-100">
  <h3 className="text-blue-900">Tips</h3>
  <p className="text-blue-800">Content here</p>
</div>

// GOOD - explicit dark variants
<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
  <h3 className="text-blue-900 dark:text-blue-100">Tips</h3>
  <p className="text-blue-800 dark:text-blue-200">Content here</p>
</div>
```

### Learning 11: Tab Navigation

Tab components with "active" states need careful border handling:

```typescript
// Active tab with border trick (border-b matches background to "hide" container border)
<div className="border-b border-border">
  <button className={`
    ${isActive
      ? "bg-card border border-b-card border-border -mb-px text-foreground"
      : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }
  `}>
    Tab Name
  </button>
</div>
```

### Learning 12: Alert States (Success/Error/Warning)

Alert boxes need the full color spectrum for dark mode:

```typescript
// Success alert
<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
  <Icon className="text-green-600 dark:text-green-400" />
  <p className="text-green-900 dark:text-green-100">Title</p>
  <p className="text-green-700 dark:text-green-300">Description</p>
</div>

// Error alert
<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
  <Icon className="text-red-600 dark:text-red-400" />
  <p className="text-red-700 dark:text-red-300">Error message</p>
</div>

// Warning/Amber alert
<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
  <Icon className="text-amber-600 dark:text-amber-400" />
  <p className="text-amber-900 dark:text-amber-100">Title</p>
  <p className="text-amber-700 dark:text-amber-300">Description</p>
</div>
```

---

## DARKX Anti-Patterns

### DON'T: Hardcode Colors

```tsx
// BAD
<div className="bg-white text-black">

// GOOD
<div className="bg-background text-foreground">
```

### DON'T: Forget Borders

```tsx
// BAD - invisible border in dark mode
<div className="border border-gray-200">

// GOOD - uses theme variable
<div className="border border-border">
```

### DON'T: Use Opacity for Muted Text

```tsx
// BAD - opacity looks washed out
<p className="text-black opacity-50">

// GOOD - proper muted color
<p className="text-muted-foreground">
```

### DON'T: Invert Everything

```css
/* BAD - lazy invert breaks images, charts, etc */
.dark {
  filter: invert(1);
}

/* GOOD - intentional color choices */
.dark {
  --background: 0 0% 7%;
  --foreground: 0 0% 95%;
}
```

---

## DARKX Trigger

### Command

```
DARKX: implement dark mode
```

or

```
run DARKX
```

### What Happens

1. **Audit** - Check existing color usage
2. **Variables** - Add CSS custom properties
3. **Provider** - Create theme provider
4. **Script** - Add no-flash script
5. **Toggle** - Create theme toggle
6. **Migrate** - Update hardcoded colors
7. **Validate** - Check contrast and functionality

---

## Summary

**DARKX = Universal Dark Mode System**

### The 5 Pillars
1. **DETECT** - System preference awareness
2. **PERSIST** - User choice storage
3. **TRANSITION** - No flash on load
4. **THEME** - Semantic color tokens
5. **VALIDATE** - Accessibility compliance

### Key Files
- `src/components/providers/ThemeProvider.tsx`
- `src/components/ui/ThemeToggle.tsx`
- `src/app/globals.css` (CSS variables)
- `tailwind.config.ts` (color tokens)
- `src/app/layout.tsx` (no-flash script)

### Success Criteria
- [ ] System preference detected on first load
- [ ] User choice persists across sessions
- [ ] No flash of wrong theme
- [ ] All colors use CSS variables
- [ ] Contrast ratios meet WCAG AA

---

## DARKX Production Critical: Complete Implementation Required

> **From Lost Monster Dashboard Implementation (Jan 2026)**

### Learning 13: Infrastructure ≠ Implementation

**THE BIGGEST MISTAKE:** Adding ThemeProvider, CSS variables, and Tailwind config, then assuming DARKX is "done."

**THE REALITY:** DARKX is only complete when EVERY hardcoded color is replaced with semantic tokens.

#### What Went Wrong

1. **Added infrastructure:**
   - ✅ Created ThemeProvider
   - ✅ Added CSS variables
   - ✅ Configured Tailwind
   - ✅ Added ThemeToggle

2. **Updated ONE component** (Sidebar)

3. **Thought we were done** ❌

4. **Reality:** Main content area still had `bg-neutral-950`, `text-white/60`, `border-white/5` everywhere
   - Home page: 12+ hardcoded colors
   - Header: 5+ hardcoded colors
   - All other pages: Still dark-only

#### The Correct Approach

1. **Add infrastructure** (ThemeProvider, CSS vars, Tailwind config)

2. **AUDIT FIRST** - Find ALL hardcoded colors:
   ```bash
   grep -r "bg-neutral\|bg-black\|bg-white\|text-white\|text-black\|text-gray\|border-white\|border-black\|border-gray" src/
   ```

3. **Create replacement checklist** for every file found

4. **Replace systematically** - Don't skip ANY file

5. **Test BOTH modes** for EVERY page

#### The Checklist

A comprehensive implementation checklist is now required for all DARKX implementations. See:
- `dashboard/.ai/DARKX-IMPLEMENTATION-CHECKLIST.md` for complete step-by-step guide

**Key requirements:**
- [ ] Audit phase BEFORE claiming completion
- [ ] Update ALL components (layout, pages, shared UI)
- [ ] Test every page in both light and dark modes
- [ ] Replace ALL hardcoded colors (no exceptions)
- [ ] Document special cases (status colors, icon backgrounds)

#### Quick Audit Command

```bash
# Find all hardcoded colors
grep -r "bg-neutral\|bg-black\|bg-white\|text-white\|text-black\|text-gray\|border-white" src/ | wc -l

# If count > 0, DARKX is NOT complete
```

#### Prevention

- Use the implementation checklist (don't skip phases)
- Audit BEFORE marking as done
- Test both themes for EVERY page
- Add linting rules to catch new hardcoded colors

---

**Framework Status:** Production-ready
**Last Updated:** 2026-01-15
**Version:** 1.3 (Added Learning 13: Complete Implementation Required + Implementation Checklist)
