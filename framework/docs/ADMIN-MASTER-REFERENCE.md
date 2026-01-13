# Universal Admin Dashboard - Master Reference

> **Portable reference for rebuilding admin dashboards in new projects**
> Copy this file to your master folder for reuse

---

## 🎨 Color System Overview

This template uses a **semantic color system** with ONE project-specific accent color.

### What to Customize

| Type | Variables | Action |
|------|-----------|--------|
| **Semantic** | background, foreground, card, muted, meta, border, input-bg, hover | **DO NOT CHANGE** - auto-adapt to light/dark |
| **Accent** | `--color-accent` | **CUSTOMIZE THIS** - your brand color |

```css
/* Change this ONE value per project */
:root {
  --color-accent: #YOUR_BRAND_COLOR;  /* e.g., #3B82F6 for blue */
}
```

---

## 1. COLOR SYSTEM

### CSS Variables (Theme-Aware)

```css
/* Light Mode */
html.light {
  --color-background: #f8f9fa;
  --color-foreground: rgba(0, 0, 0, 0.9);
  --color-card: #ffffff;
  --color-muted: rgba(0, 0, 0, 0.6);
  --color-meta: rgba(0, 0, 0, 0.4);
  --color-border: rgba(0, 0, 0, 0.1);
  --color-input-bg: rgba(0, 0, 0, 0.03);
  --color-hover-bg: rgba(0, 0, 0, 0.05);
  --color-accent: #20ED8A;  /* ← CUSTOMIZE THIS */
}

/* Dark Mode */
html.dark {
  --color-background: #000000;
  --color-foreground: rgba(255, 255, 255, 0.9);
  --color-card: #0a0f1a;
  --color-muted: rgba(255, 255, 255, 0.6);
  --color-meta: rgba(255, 255, 255, 0.4);
  --color-border: rgba(255, 255, 255, 0.05);
  --color-input-bg: rgba(255, 255, 255, 0.03);
  --color-hover-bg: rgba(255, 255, 255, 0.05);
  --color-accent: #20ED8A;  /* ← CUSTOMIZE THIS */
}
```

### Semantic Tailwind Utilities

```css
/* Add to globals.css */

/* Semantic (universal - don't change) */
.bg-theme { background-color: var(--color-background); }
.bg-theme-card { background-color: var(--color-card); }
.bg-theme-input { background-color: var(--color-input-bg); }
.bg-theme-hover { background-color: var(--color-hover-bg); }

.text-theme { color: var(--color-foreground); }
.text-theme-muted { color: var(--color-muted); }
.text-theme-meta { color: var(--color-meta); }

.border-theme { border-color: var(--color-border); }
.placeholder-theme-meta::placeholder { color: var(--color-meta); }

/* Accent (project-specific - customize) */
.text-accent { color: var(--color-accent); }
.bg-accent { background-color: var(--color-accent); }
.border-accent { border-color: var(--color-accent); }
```

### Semantic Badge Classes

```css
/* Badges - auto-adapt to light/dark */
.badge-accent { @apply bg-[#20ED8A]/20 text-[#20ED8A] border-[#20ED8A]/30; }
.badge-success { @apply bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30; }
.badge-warning { @apply bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30; }
.badge-danger { @apply bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30; }
.badge-blue { @apply bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30; }
.badge-purple { @apply bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30; }
.badge-slate { @apply bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30; }

/* Action buttons */
.btn-action-success { @apply bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30; }
.btn-action-danger { @apply bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30; }
.btn-action-neutral { @apply bg-white/5 text-theme-muted hover:bg-white/10; }
```

---

## 2. TYPOGRAPHY

### Font Setup (Poppins Only)

```typescript
// lib/fonts.ts
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});
```

### Weight Usage

| Weight | Class | Usage |
|--------|-------|-------|
| 400 | `font-normal` | Body text |
| 500 | `font-medium` | Labels, nav |
| 600 | `font-semibold` | Buttons, headings |
| 700 | `font-bold` | Page titles |

### Size Scale

| Size | Class | Usage |
|------|-------|-------|
| 3xl | `text-3xl` | Page titles |
| lg | `text-lg` | Section headings |
| base | `text-base` | Body |
| sm | `text-sm` | Buttons, labels |
| xs | `text-xs` | Meta, badges |

---

## 3. COMPONENT PATTERNS

### Cards

```tsx
<div className="bg-theme-card border border-theme rounded-2xl p-6"
  style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}>
  {children}
</div>
```

### Buttons

```tsx
// Primary
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-[#20ED8A] px-4 py-2.5 text-sm font-semibold text-black rounded-lg"
>

// Secondary
<button className="px-4 py-2.5 text-sm font-medium text-theme-muted hover:text-theme hover:bg-theme-hover rounded-lg transition-colors">
```

### Inputs

```tsx
<input className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-[#20ED8A]/50 focus:outline-none transition-colors" />

<label className="block text-sm font-medium text-theme-muted mb-1">Label</label>
```

### Glass Effect

```css
.glass {
  background: var(--color-input-bg);
  backdrop-filter: blur(24px);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}
```

---

## 4. DELETE WITH UNDO PATTERN

### CountdownRing Component

```tsx
// components/CountdownRing.tsx
interface CountdownRingProps {
  seconds: number;
  duration?: number;
}

export function CountdownRing({ seconds, duration = 3 }: CountdownRingProps) {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / duration) * circumference;

  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r={radius} fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="2" />
        <circle
          cx="12" cy="12" r={radius} fill="none" stroke="#ef4444" strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-red-500">{seconds}</span>
    </div>
  );
}
```

### deleteWithCountdown Function

```tsx
// lib/delete-with-undo.ts
import { toast } from 'sonner';
import { CountdownRing } from '@/components/CountdownRing';

interface DeleteOptions {
  onDelete: () => Promise<void>;
  onUndo: () => void;
  message: string;
  duration?: number;
  toastId?: string;
}

export function deleteWithCountdown({
  onDelete, onUndo, message, duration = 3000, toastId
}: DeleteOptions) {
  let cancelled = false;
  let seconds = Math.ceil(duration / 1000);

  const id = toast(message, {
    id: toastId,
    duration: duration + 500,
    action: {
      label: 'Undo',
      onClick: () => {
        cancelled = true;
        onUndo();
        toast.dismiss(id);
      },
    },
    icon: <CountdownRing seconds={seconds} duration={Math.ceil(duration / 1000)} />,
  });

  // Countdown interval
  const interval = setInterval(() => {
    seconds--;
    if (seconds > 0 && !cancelled) {
      toast(message, {
        id,
        icon: <CountdownRing seconds={seconds} duration={Math.ceil(duration / 1000)} />,
        action: { label: 'Undo', onClick: () => { cancelled = true; onUndo(); toast.dismiss(id); } },
      });
    }
  }, 1000);

  // Execute delete after countdown
  setTimeout(async () => {
    clearInterval(interval);
    if (!cancelled) {
      try {
        await onDelete();
      } catch {
        onUndo();
        toast.error('Failed to delete. Item restored.');
      }
    }
  }, duration);

  return { toastId: id, cancel: () => { cancelled = true; onUndo(); } };
}
```

### Usage

```tsx
const handleDelete = (item: Item) => {
  setItems(prev => prev.filter(i => i.id !== item.id)); // optimistic

  deleteWithCountdown({
    message: `${item.name} deleted`,
    toastId: `delete-${item.id}`,
    onDelete: async () => {
      await fetch(`/api/items/${item.id}`, { method: 'DELETE' });
    },
    onUndo: () => {
      setItems(prev => [...prev, item]);
    },
  });
};
```

---

## 5. MODAL PATTERN

```tsx
// components/Modal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-lg bg-theme-card border border-theme rounded-2xl p-6"
            style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: [0.33, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-theme">{title}</h2>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-theme-hover">
                <X className="w-5 h-5 text-theme-muted" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 6. CONFIRM DIALOG PATTERN

```tsx
// components/ConfirmDialog.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'default';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen, onClose, onConfirm, title, message,
  confirmText = 'Confirm', cancelText = 'Cancel',
  variant = 'default', isLoading = false
}: ConfirmDialogProps) {
  const icons = {
    danger: <Trash2 className="w-6 h-6 text-red-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    default: <AlertTriangle className="w-6 h-6 text-[#20ED8A]" />,
  };

  const buttonStyles = {
    danger: 'bg-red-600/80 hover:bg-red-600 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-black',
    default: 'bg-[#20ED8A] hover:bg-[#20ED8A]/90 text-black',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md bg-theme-card border border-theme rounded-2xl p-6"
            style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-theme-hover">
              <X className="w-5 h-5 text-theme-muted" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-theme-input flex items-center justify-center mb-4">
                {icons[variant]}
              </div>
              <h3 className="text-lg font-bold text-theme mb-2">{title}</h3>
              <p className="text-sm text-theme-muted mb-6">{message}</p>

              <div className="flex gap-3 w-full">
                <button onClick={onClose} disabled={isLoading}
                  className="flex-1 px-4 py-2.5 text-sm font-medium border border-theme bg-theme-input rounded-lg hover:bg-theme-hover">
                  {cancelText}
                </button>
                <button onClick={onConfirm} disabled={isLoading}
                  className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg ${buttonStyles[variant]}`}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 7. THEME CONTEXT

```tsx
// lib/theme-context.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContext {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) setThemeState(stored);
  }, []);

  useEffect(() => {
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;

    setResolvedTheme(resolved);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
```

---

## 8. ANIMATION PATTERNS

### Easing & Timing

```typescript
// Cinema easing (for fades/slides)
const cinemaEase = [0.33, 0, 0.2, 1];

// Spring physics (for interactions)
const springConfig = { type: "spring", stiffness: 400, damping: 17 };
```

### Common Animations

```tsx
// Page enter
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.33, 0, 0.2, 1] }}

// Button hover/tap
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Staggered list
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  />
))}

// Modal enter/exit
initial={{ opacity: 0, scale: 0.95, y: 10 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95 }}
transition={{ duration: 0.15, ease: [0.33, 0, 0.2, 1] }}
```

---

## 9. API ROUTE PATTERNS

### List + Create Route

```typescript
// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await sql`SELECT * FROM items ORDER BY created_at DESC`;
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  if (!data.name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const [item] = await sql`
    INSERT INTO items (name, created_by)
    VALUES (${data.name.trim()}, ${session.user?.email})
    RETURNING *
  `;

  return NextResponse.json(item, { status: 201 });
}
```

### Dynamic Route (Get/Update/Delete)

```typescript
// app/api/items/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [item] = await sql`SELECT * FROM items WHERE id = ${id}`;

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  const [item] = await sql`
    UPDATE items
    SET name = COALESCE(${data.name}, name), updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await sql`DELETE FROM items WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
```

---

## 10. AUTH HELPERS

```typescript
// lib/auth-helpers.ts
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { authOptions } from './auth';

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');
  return session.user;
}

export async function requireApiAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { authorized: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { authorized: true, session };
}
```

---

## 11. TAILWIND CONFIG

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

---

## 12. DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "framer-motion": "^11.x",
    "sonner": "^1.x",
    "lucide-react": "^0.x",
    "next-auth": "^4.x",
    "@neondatabase/serverless": "^0.x"
  }
}
```

---

## 13. FILE STRUCTURE

```
src/
├── app/
│   ├── api/
│   │   ├── items/
│   │   │   ├── route.ts          # GET list, POST create
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE
│   │   └── auth/[...nextauth]/
│   ├── (dashboard)/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Modal.tsx
│   ├── ConfirmDialog.tsx
│   ├── CountdownRing.tsx
│   └── Sidebar.tsx
└── lib/
    ├── auth.ts
    ├── auth-helpers.ts
    ├── db.ts
    ├── delete-with-undo.ts
    ├── fonts.ts
    └── theme-context.tsx
```

---

## Quick Start Checklist

1. [ ] Copy color variables to `globals.css`
2. [ ] Set up Poppins font in `lib/fonts.ts`
3. [ ] Create `ThemeProvider` wrapper
4. [ ] Add semantic Tailwind utilities
5. [ ] Set up Neon database connection
6. [ ] Configure NextAuth
7. [ ] Create API route templates
8. [ ] Add `CountdownRing` + `deleteWithCountdown`
9. [ ] Add `Modal` and `ConfirmDialog`
10. [ ] Install: `framer-motion`, `sonner`, `lucide-react`

---

*Copy this file to your master reference folder for reuse across projects.*
