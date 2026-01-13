# Universal Admin Template

> **The Ultimate Admin Dashboard Blueprint**
> Combining the best patterns from: TWIN, Evidis, Slydes, Stayflo
>
> **Created**: January 8, 2026
> **Version**: 1.0

---

## Overview

This document is a comprehensive reference for building production-grade admin dashboards. It compiles proven patterns, code snippets, and architectural decisions from 4 real-world SaaS projects.

### Projects Analyzed

| Project | Focus | Key Strength |
|---------|-------|--------------|
| **TWIN** | Creative agency | Theme system, Kanban, CMS |
| **Evidis** | Document processing | AI integration, Real-time, Inbox |
| **Slydes** | Content creation | Plan-based gating, Analytics |
| **Stayflo** | Hospitality SaaS | Card-based UI, Guest-facing |

---

## Table of Contents

0. [Color System (Read First!)](#-color-system-important---read-first)
1. [Dashboard Shell Architecture](#1-dashboard-shell-architecture)
2. [Authentication Patterns](#2-authentication-patterns)
3. [Sidebar Navigation](#3-sidebar-navigation)
4. [Header Component](#4-header-component)
5. [Theme System (Light/Dark)](#5-theme-system-lightdark)
6. [Stats & Metrics Cards](#6-stats--metrics-cards)
7. [Kanban Task Board](#7-kanban-task-board)
8. [Data Tables](#8-data-tables)
9. [Forms & Validation](#9-forms--validation)
10. [Modals & Dialogs](#10-modals--dialogs)
11. [CRUD API Patterns](#11-crud-api-patterns)
12. [Real-time Updates](#12-real-time-updates)
13. [AI Integration](#13-ai-integration)
14. [Feature Gating](#14-feature-gating)
15. [Inbox & Messaging](#15-inbox--messaging)
16. [CMS & Blog Management](#16-cms--blog-management)
17. [Media Library](#17-media-library)
18. [Settings Pages](#18-settings-pages)
19. [Empty States](#19-empty-states)
20. [Loading States](#20-loading-states)

---

## 🎨 Color System (IMPORTANT - Read First!)

This template uses a **semantic color system** that adapts to light/dark mode automatically.

### Universal Colors (DO NOT CHANGE)

These semantic colors work across all projects - they auto-adapt to light/dark mode:

| Variable | Purpose | Light Mode | Dark Mode |
|----------|---------|------------|-----------|
| `--color-background` | Page background | `#f8f9fa` | `#000000` |
| `--color-foreground` | Primary text | `rgba(0,0,0,0.9)` | `rgba(255,255,255,0.9)` |
| `--color-card` | Card backgrounds | `#ffffff` | `#0a0f1a` |
| `--color-muted` | Secondary text | `rgba(0,0,0,0.6)` | `rgba(255,255,255,0.6)` |
| `--color-meta` | Tertiary/labels | `rgba(0,0,0,0.4)` | `rgba(255,255,255,0.4)` |
| `--color-border` | Borders | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.05)` |
| `--color-input-bg` | Input backgrounds | `rgba(0,0,0,0.03)` | `rgba(255,255,255,0.03)` |
| `--color-hover` | Hover states | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.05)` |

**Usage:** `.text-theme`, `.bg-theme-card`, `.border-theme`, etc.

### Project-Specific Color (CUSTOMIZE THIS)

| Variable | Purpose | Default | Your Project |
|----------|---------|---------|--------------|
| `--color-accent` | Buttons, links, highlights | `#20ED8A` (green) | **← CHANGE THIS** |

**To customize for your project:**

```css
/* In globals.css - change this ONE value */
:root {
  --color-accent: #YOUR_BRAND_COLOR;  /* e.g., #3B82F6 for blue */
}
```

**Usage options:**
```css
/* Utility classes (add to globals.css) */
.text-accent { color: var(--color-accent); }
.bg-accent { background-color: var(--color-accent); }
.border-accent { border-color: var(--color-accent); }

/* Or use Tailwind arbitrary values */
className="bg-[var(--color-accent)]"
className="text-[var(--color-accent)]"
```

**Note:** Code examples below use `#20ED8A` as a placeholder. Replace with `var(--color-accent)` or your brand color.

---

## 1. Dashboard Shell Architecture

The foundation of every admin dashboard is the shell - the layout wrapper containing sidebar, header, and main content.

### Best Pattern: Fixed Sidebar + Flexible Content (TWIN/Evidis)

```tsx
// DashboardLayout.tsx
'use client';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Optional: Film grain overlay for texture */}
      <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.02]" />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-theme">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Layout Dimensions

| Element | Width/Height | Notes |
|---------|-------------|-------|
| Sidebar | 264px | Fixed, always visible |
| Sidebar (collapsed) | 72px | Icons only (Slydes) |
| Header | 64px height | Contains title + actions |
| Main Content | Flex-1 | Scrollable, responsive padding |

### Mobile Responsive (Slydes pattern)

```tsx
// Collapsible sidebar with hamburger menu
const [collapsed, setCollapsed] = useState(false);

// Store preference in localStorage
useEffect(() => {
  const saved = localStorage.getItem('sidebar_collapsed');
  if (saved) setCollapsed(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem('sidebar_collapsed', JSON.stringify(collapsed));
}, [collapsed]);
```

---

## 2. Authentication Patterns

### Best Pattern: NextAuth.js with JWT Sessions (TWIN)

```tsx
// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate credentials against database
        const user = await validateUser(credentials);

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
```

### Middleware Protection

```tsx
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/sign-in',
  },
});

export const config = {
  matcher: [
    // Protect all routes except public ones
    '/((?!sign-in|sign-up|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Sign-In Page with Animation

```tsx
// app/sign-in/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials');
      setLoading(false);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.33, 0, 0.2, 1] }}
        className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] p-8"
      >
        <h1 className="text-2xl font-bold text-white/90 mb-6">Sign In</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-white placeholder-white/40 focus:border-[#20ED8A]/50 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-white placeholder-white/40 focus:border-[#20ED8A]/50 focus:outline-none"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#20ED8A] py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
```

---

## 3. Sidebar Navigation

### Best Pattern: Flat Navigation with Section Labels (TWIN)

```tsx
// components/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Newspaper,
  Image,
  Briefcase,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

// Navigation structure
const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
];

const contentNavigation = [
  { name: 'Pages', href: '/pages', icon: FileText },
  { name: 'Blog', href: '/blog', icon: Newspaper },
  { name: 'Media', href: '/media', icon: Image },
];

const recruitmentNavigation = [
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/recruitment', icon: Users },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const NavItem = ({ item }: { item: typeof mainNavigation[0] }) => {
    const active = isActive(item.href);
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={`
          flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors
          ${active
            ? 'bg-white/[0.05] text-white/90 border-l-2 border-[#20ED8A]'
            : 'text-white/50 hover:bg-white/[0.03] hover:text-white/70 border-l-2 border-transparent'
          }
        `}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span>{item.name}</span>
      </Link>
    );
  };

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/30">
      {label}
    </div>
  );

  // Get user initials
  const initials = session?.user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <aside className="flex h-screen w-[264px] flex-col bg-black border-r border-white/[0.05]">
      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-white/[0.05]">
        <span className="text-xl font-bold text-white/90">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {/* Main Section */}
        {mainNavigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}

        {/* Content Section */}
        <SectionLabel label="Content" />
        {contentNavigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}

        {/* Recruitment Section */}
        <SectionLabel label="Recruitment" />
        {recruitmentNavigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-white/[0.05] py-2">
        {bottomNavigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </div>

      {/* User Profile */}
      <div className="border-t border-white/[0.05] p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center bg-[#20ED8A]/10 text-sm font-bold text-[#20ED8A]">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/90 truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-white/40 truncate">
              {session?.user?.role || 'Member'}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/sign-in' })}
            className="p-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
```

### Active State Detection Pattern

```tsx
// Smart route matching
const isActive = (href: string) => {
  // Exact match for root
  if (href === '/') return pathname === '/';
  // Prefix match for nested routes
  return pathname.startsWith(href);
};

// With special handling for dynamic routes
const isActive = (href: string) => {
  if (href === '/dashboard') return pathname === '/dashboard';
  if (href.includes('[')) {
    // Dynamic route - check base path
    const basePath = href.split('/[')[0];
    return pathname.startsWith(basePath);
  }
  return pathname.startsWith(href);
};
```

### Collapsible Sidebar (Slydes pattern)

```tsx
// CollapsibleSidebar.tsx
const [collapsed, setCollapsed] = useState(false);

// Icon-only mode when collapsed
<aside className={`transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[264px]'}`}>
  {/* Toggle button */}
  <button onClick={() => setCollapsed(!collapsed)}>
    {collapsed ? <ChevronRight /> : <ChevronLeft />}
  </button>

  {/* Nav item adapts */}
  <Link className="flex items-center gap-3">
    <Icon className="h-5 w-5 shrink-0" />
    {!collapsed && <span>{item.name}</span>}
  </Link>
</aside>
```

---

## 4. Header Component

### Best Pattern: Dynamic Title with Actions (TWIN)

```tsx
// components/Header.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme-context';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

// Page metadata
const pageTitles: Record<string, { title: string; description: string }> = {
  '/': { title: 'Dashboard', description: 'Overview of your workspace' },
  '/tasks': { title: 'Tasks', description: 'Manage your team tasks' },
  '/blog': { title: 'Blog', description: 'Manage blog posts and content' },
  '/recruitment': { title: 'Recruitment', description: 'Review applications' },
  '/settings': { title: 'Settings', description: 'Configure your preferences' },
};

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Find matching page (handles dynamic routes)
  const getPageInfo = () => {
    if (pageTitles[pathname]) return pageTitles[pathname];

    // Check for base path match
    const basePath = '/' + pathname.split('/')[1];
    return pageTitles[basePath] || { title: 'Page', description: '' };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="flex h-16 items-center justify-between border-b border-theme px-6 lg:px-8 bg-theme">
      {/* Page Title */}
      <div>
        <h1 className="text-lg font-semibold text-theme">
          {pageInfo.title}
        </h1>
        {pageInfo.description && (
          <p className="text-sm text-theme-muted">
            {pageInfo.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-theme-muted hover:text-theme hover:bg-theme-hover transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </motion.div>
        </motion.button>
      </div>
    </header>
  );
}
```

### Header with Search (Stayflo pattern)

```tsx
// Header with search and notifications
<header className="flex h-16 items-center justify-between px-6">
  {/* Search */}
  <div className="relative flex-1 max-w-md">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary"
    />
  </div>

  {/* Right side */}
  <div className="flex items-center gap-4">
    {/* Notifications */}
    <button className="relative p-2">
      <Bell className="h-5 w-5" />
      {hasNotifications && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
      )}
    </button>

    {/* User Menu Dropdown */}
    <UserMenu />
  </div>
</header>
```

---

## 5. Theme System (Light/Dark)

### Best Pattern: CSS Variables with Context (TWIN)

```tsx
// lib/theme-context.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.className = theme;
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### CSS Variables

```css
/* globals.css */
:root {
  /* Dark theme (default) */
  --color-background: #000000;
  --color-foreground: rgba(255, 255, 255, 0.9);
  --color-card: #0a0f1a;
  --color-muted: rgba(255, 255, 255, 0.6);
  --color-meta: rgba(255, 255, 255, 0.4);
  --color-border: rgba(255, 255, 255, 0.05);
  --color-input-bg: rgba(255, 255, 255, 0.03);
  --color-hover: rgba(255, 255, 255, 0.05);
  --color-accent: #20ED8A;  /* ← CUSTOMIZE THIS for your project */
}

.light {
  --color-background: #f8f9fa;
  --color-foreground: rgba(0, 0, 0, 0.9);
  --color-card: #ffffff;
  --color-muted: rgba(0, 0, 0, 0.6);
  --color-meta: rgba(0, 0, 0, 0.4);
  --color-border: rgba(0, 0, 0, 0.1);
  --color-input-bg: rgba(0, 0, 0, 0.03);
  --color-hover: rgba(0, 0, 0, 0.05);
}

/* Utility classes - Semantic (universal) */
.bg-theme { background-color: var(--color-background); }
.text-theme { color: var(--color-foreground); }
.text-theme-muted { color: var(--color-muted); }
.text-theme-meta { color: var(--color-meta); }
.border-theme { border-color: var(--color-border); }
.bg-theme-card { background-color: var(--color-card); }
.bg-theme-input { background-color: var(--color-input-bg); }
.bg-theme-hover { background-color: var(--color-hover); }

/* Utility classes - Accent (project-specific) */
.text-accent { color: var(--color-accent); }
.bg-accent { background-color: var(--color-accent); }
.border-accent { border-color: var(--color-accent); }
.ring-accent { --tw-ring-color: var(--color-accent); }
```

> **Note:** Code examples below use `#20ED8A` as a placeholder. In your project, replace with `var(--color-accent)` or the utility classes above.

---

## 6. Stats & Metrics Cards

### Best Pattern: Icon + Value + Trend (TWIN/Stayflo)

```tsx
// components/StatCard.tsx
'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    period: string;
  };
  iconColor?: 'primary' | 'blue' | 'green' | 'amber';
}

const colorStyles = {
  primary: { bg: 'bg-[#20ED8A]/10', text: 'text-[#20ED8A]' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  iconColor = 'primary',
}: StatCardProps) {
  const colors = colorStyles[iconColor];
  const isPositive = change && change.value >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-theme-card border border-theme p-6"
      style={{ boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 ${colors.bg}`}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>

        {change && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{isPositive ? '+' : ''}{change.value}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-theme-muted">{title}</p>
        <p className="mt-1 text-3xl font-bold text-theme">{value}</p>
        {change && (
          <p className="mt-1 text-xs text-theme-meta">{change.period}</p>
        )}
      </div>
    </motion.div>
  );
}
```

### Stats Grid Layout

```tsx
// Dashboard stats grid
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <StatCard
    title="New Applications"
    value={12}
    icon={Briefcase}
    change={{ value: 15, period: 'vs last week' }}
    iconColor="primary"
  />
  <StatCard
    title="Active Tasks"
    value={8}
    icon={CheckSquare}
    change={{ value: -5, period: 'vs last week' }}
    iconColor="blue"
  />
  <StatCard
    title="Team Members"
    value={4}
    icon={Users}
    iconColor="green"
  />
  <StatCard
    title="Blog Posts"
    value={24}
    icon={FileText}
    change={{ value: 8, period: 'vs last month' }}
    iconColor="amber"
  />
</div>
```

---

## 7. Kanban Task Board

### Best Pattern: @hello-pangea/dnd with Colored Columns (TWIN/Evidis)

```tsx
// components/TaskBoard/Board.tsx
'use client';

import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from './TaskColumn';
import { Task } from '@/lib/types';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'review', title: 'Review', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export function Board() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceCol = columns.find((c) => c.id === source.droppableId);
    const destCol = columns.find((c) => c.id === destination.droppableId);
    if (!sourceCol || !destCol) return;

    // Find the task
    const task = sourceCol.tasks.find((t) => t.id === draggableId);
    if (!task) return;

    // Clone columns for immutable update
    const newColumns = columns.map((col) => {
      if (col.id === source.droppableId) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== draggableId),
        };
      }
      if (col.id === destination.droppableId) {
        const newTasks = [...col.tasks];
        newTasks.splice(destination.index, 0, task);
        return { ...col, tasks: newTasks };
      }
      return col;
    });

    setColumns(newColumns);

    // Persist to database
    updateTaskStatus(task.id, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <TaskColumn key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}
```

### Task Column with Status Colors

```tsx
// components/TaskBoard/TaskColumn.tsx
'use client';

import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

// Trello-style column colors
const columnStyles: Record<string, { bg: string; badge: string }> = {
  todo: {
    bg: 'bg-white/[0.02]',
    badge: 'bg-white/10 text-white/70',
  },
  'in-progress': {
    bg: 'bg-blue-500/[0.04]',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  review: {
    bg: 'bg-amber-500/[0.04]',
    badge: 'bg-amber-500/20 text-amber-400',
  },
  done: {
    bg: 'bg-[#20ED8A]/[0.04]',
    badge: 'bg-[#20ED8A]/20 text-[#20ED8A]',
  },
};

interface TaskColumnProps {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  onAddTask?: (columnId: string) => void;
}

export function TaskColumn({ column, onAddTask }: TaskColumnProps) {
  const styles = columnStyles[column.id] || columnStyles.todo;

  return (
    <div className={`flex min-w-[300px] w-[300px] flex-col p-4 ${styles.bg}`}>
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-white/90">{column.title}</h2>
          <span className={`px-2 py-0.5 text-xs font-semibold ${styles.badge}`}>
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask?.(column.id)}
          className="p-1.5 text-white/40 hover:text-white/70"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 space-y-3 min-h-[200px] transition-colors
              ${snapshot.isDraggingOver && 'bg-[#20ED8A]/[0.08]'}
            `}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {/* Empty State */}
            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex h-24 items-center justify-center border border-dashed border-white/10 text-sm text-white/30">
                No tasks
              </div>
            )}
          </div>
        )}
      </Droppable>

      {/* Add Task Button */}
      <button
        onClick={() => onAddTask?.(column.id)}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white/40 hover:text-white/70 border border-dashed border-white/10 hover:border-white/20"
      >
        <Plus className="h-4 w-4" />
        Add task
      </button>
    </div>
  );
}
```

### Task Card

```tsx
// components/TaskBoard/TaskCard.tsx
'use client';

import { Draggable } from '@hello-pangea/dnd';
import { User, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

const priorityStyles = {
  low: 'bg-gray-400',
  medium: 'bg-amber-400',
  high: 'bg-red-400',
};

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-theme-card border border-theme p-4 cursor-grab transition-all
            ${snapshot.isDragging && 'rotate-3 scale-105 border-[#20ED8A]/30 shadow-xl'}
          `}
        >
          {/* Priority + Title */}
          <div className="flex items-start gap-2">
            <div className={`mt-1.5 h-2 w-2 rounded-full ${priorityStyles[task.priority]}`} />
            <h4 className="flex-1 font-medium text-theme text-sm leading-tight">
              {task.title}
            </h4>
          </div>

          {/* Description */}
          {task.description && (
            <p className="mt-2 text-xs text-theme-muted line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between text-xs text-theme-meta">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
```

---

## 8. Data Tables

### Best Pattern: Search + Filters + Sortable (Evidis/Slydes)

```tsx
// components/DataTable.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  filterOptions?: {
    key: keyof T;
    label: string;
    options: { value: string; label: string }[];
  }[];
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKeys = [],
  filterOptions = [],
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery && searchKeys.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((item) => String(item[key as keyof T]) === value);
      }
    });

    // Apply sort
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const comparison = String(aVal).localeCompare(String(bVal));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchQuery, searchKeys, filters, sortKey, sortDirection]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-meta" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-theme-input border border-theme text-sm text-theme placeholder-theme-meta focus:border-[#20ED8A]/50 focus:outline-none"
          />
        </div>

        {/* Filters */}
        {filterOptions.map((filter) => (
          <select
            key={String(filter.key)}
            value={filters[String(filter.key)] || 'all'}
            onChange={(e) =>
              setFilters((f) => ({ ...f, [String(filter.key)]: e.target.value }))
            }
            className="px-3 py-2 bg-theme-input border border-theme text-sm text-theme focus:border-[#20ED8A]/50 focus:outline-none"
          >
            <option value="all">{filter.label}: All</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-theme">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`
                    px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-theme-meta
                    ${column.sortable && 'cursor-pointer hover:text-theme-muted'}
                  `}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && sortKey === column.key && (
                      sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-theme">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-theme-hover transition-colors">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 text-sm text-theme">
                    {column.render ? column.render(item) : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-12 text-center text-theme-muted">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
```

### Usage Example

```tsx
// Recruitment table
<DataTable
  data={applications}
  searchKeys={['name', 'email', 'jobTitle']}
  filterOptions={[
    {
      key: 'stage',
      label: 'Stage',
      options: [
        { value: 'new', label: 'New' },
        { value: 'screening', label: 'Screening' },
        { value: 'interview', label: 'Interview' },
      ],
    },
  ]}
  columns={[
    { key: 'name', header: 'Applicant', sortable: true },
    { key: 'jobTitle', header: 'Role', sortable: true },
    {
      key: 'stage',
      header: 'Stage',
      render: (item) => <StageBadge stage={item.stage} />,
    },
    {
      key: 'appliedAt',
      header: 'Applied',
      sortable: true,
      render: (item) => formatDistanceToNow(new Date(item.appliedAt)),
    },
    {
      key: 'id',
      header: 'Actions',
      render: (item) => <ActionButtons application={item} />,
    },
  ]}
/>
```

---

## 9. Forms & Validation

### Best Pattern: Controlled Inputs with State (TWIN)

```tsx
// Form input styling
const inputStyles = `
  w-full bg-theme-input border border-theme px-4 py-3
  text-sm text-theme placeholder-theme-meta
  focus:border-[#20ED8A]/50 focus:outline-none transition-colors
`;

const labelStyles = `
  mb-1 block text-sm font-medium text-theme-muted
`;

// Example form
function CreatePostForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (title.length > 100) newErrors.title = 'Title must be under 100 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({ title, content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelStyles}>
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${inputStyles} ${errors.title ? 'border-red-400' : ''}`}
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title}</p>
        )}
      </div>

      <div>
        <label className={labelStyles}>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className={inputStyles}
          placeholder="Write your content..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#20ED8A] py-3 font-semibold text-black disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

### Rich Text Editor (TipTap)

```tsx
// components/Editor/RichTextEditor.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder || 'Start writing...' }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 transition-colors ${active ? 'text-[#20ED8A]' : 'text-theme-muted hover:text-theme'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-theme">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-theme p-2 bg-theme-input">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <div className="w-px h-4 bg-theme-border mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <div className="w-px h-4 bg-theme-border mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none text-theme"
      />
    </div>
  );
}
```

---

## 10. Modals & Dialogs

### Best Pattern: Animated Modal with Backdrop (TWIN)

```tsx
// components/Modal.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.33, 0, 0.2, 1] }}
              className={`
                w-full ${sizeStyles[size]} bg-theme-card border border-theme
                shadow-2xl max-h-[90vh] overflow-hidden flex flex-col
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-theme">
                <h2 className="text-lg font-semibold text-theme">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 text-theme-muted hover:text-theme transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Confirmation Dialog

```tsx
// components/ConfirmDialog.tsx
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'danger' | 'primary';
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  confirmVariant = 'primary',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-theme-muted text-sm">{message}</p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-theme-muted hover:text-theme border border-theme hover:bg-theme-hover"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`
            px-4 py-2 text-sm font-semibold disabled:opacity-50
            ${confirmVariant === 'danger'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
              : 'bg-[#20ED8A] text-black hover:bg-[#20ED8A]/90'
            }
          `}
        >
          {loading ? 'Loading...' : confirmText}
        </button>
      </div>
    </Modal>
  );
}
```

---

## 11. CRUD API Patterns

### Best Pattern: Next.js App Router with Auth Check (TWIN)

```tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPosts, createPost } from '@/lib/db';

// GET - List all posts
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - Create new post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, status } = body;

    // Validation
    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const post = await createPost({
      title,
      content,
      status: status || 'draft',
      author_id: session.user.id,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
```

```tsx
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPostById, updatePost, deletePost } from '@/lib/db';

// GET - Single post
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const post = await getPostById(params.id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT - Update post
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const post = await updatePost(params.id, body);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE - Delete post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deletePost(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
```

### Client-Side Hook Pattern

```tsx
// hooks/usePosts.ts
import { useState, useEffect, useCallback } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (data: Partial<Post>) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create');
    const post = await res.json();
    setPosts((prev) => [post, ...prev]);
    return post;
  };

  const updatePost = async (id: string, data: Partial<Post>) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update');
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const deletePost = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return { posts, loading, error, refetch: fetchPosts, createPost, updatePost, deletePost };
}
```

---

## 12. Real-time Updates

### Best Pattern: Supabase Realtime (Evidis)

```tsx
// Realtime subscription for tasks
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchTasks = async () => {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('position', { ascending: true });

      if (data) setTasks(data);
    };

    fetchTasks();

    // Subscribe to changes
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [...prev, payload.new as Task]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((t) => (t.id === payload.new.id ? payload.new as Task : t))
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((t) => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return tasks;
}
```

### Progress Indicator (Evidis Sidebar)

```tsx
// Real-time progress bar in sidebar
const [progress, setProgress] = useState({ done: 0, total: 0 });

useEffect(() => {
  const fetchProgress = async () => {
    const { count: total } = await supabase
      .from('hq_tasks')
      .select('*', { count: 'exact', head: true });

    const { count: done } = await supabase
      .from('hq_tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'done');

    setProgress({ done: done || 0, total: total || 0 });
  };

  fetchProgress();

  // Subscribe to task changes
  const channel = supabase
    .channel('progress')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'hq_tasks' }, fetchProgress)
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);

// Display
const percentage = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

<div className="px-4 py-3">
  <div className="flex items-center justify-between text-xs mb-1">
    <span>Progress</span>
    <span>{progress.done}/{progress.total}</span>
  </div>
  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
    <div
      className="h-full bg-[#20ED8A] transition-all"
      style={{ width: `${percentage}%` }}
    />
  </div>
</div>
```

---

## 13. AI Integration

### Best Pattern: Context-Aware AI Chat (Evidis)

```tsx
// contexts/AIContext.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface AIContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pageContext: string;
  setPageContext: (context: string) => void;
  questionId?: string;
  setQuestionId: (id: string | undefined) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageContext, setPageContext] = useState('dashboard');
  const [questionId, setQuestionId] = useState<string>();

  return (
    <AIContext.Provider value={{
      isOpen,
      setIsOpen,
      pageContext,
      setPageContext,
      questionId,
      setQuestionId,
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within AIProvider');
  return context;
}
```

### AI Chat Component

```tsx
// components/AIChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAI } from '@/contexts/AIContext';
import { Send, X, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat() {
  const { isOpen, setIsOpen, pageContext, questionId } = useAI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage,
          pageContext,
          questionId,
          history: messages.slice(-10), // Last 10 messages for context
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-4 bottom-4 w-96 h-[500px] bg-theme-card border border-theme shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <h3 className="font-semibold text-theme">AI Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="text-theme-muted hover:text-theme">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] px-3 py-2 text-sm
                ${msg.role === 'user'
                  ? 'bg-[#20ED8A] text-black'
                  : 'bg-theme-input text-theme border border-theme'
                }
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-theme-input px-3 py-2 border border-theme">
              <Loader2 className="h-4 w-4 animate-spin text-theme-muted" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-theme">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-theme-input border border-theme px-3 py-2 text-sm text-theme placeholder-theme-meta focus:border-[#20ED8A]/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 bg-[#20ED8A] text-black disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
```

### AI Score Display (TWIN Recruitment)

```tsx
// AI score with tooltip
interface AIScoreProps {
  score: number;
  summary: string;
}

function AIScore({ score, summary }: AIScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#20ED8A]';
    if (score >= 80) return 'text-emerald-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="group relative">
      <span className={`font-semibold ${getScoreColor(score)}`}>
        {score}%
      </span>

      {/* Tooltip on hover */}
      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-theme-card border border-theme shadow-xl text-sm z-10">
        <p className="text-theme-muted">{summary}</p>
      </div>
    </div>
  );
}
```

---

## 14. Feature Gating

### Best Pattern: Plan-Based Access Control (Slydes)

```tsx
// hooks/usePlan.ts
import { useSession } from 'next-auth/react';

type Plan = 'free' | 'pro' | 'enterprise';

interface PlanFeatures {
  canAccessAnalytics: boolean;
  canAccessAI: boolean;
  maxProjects: number;
  maxTeamMembers: number;
}

const planFeatures: Record<Plan, PlanFeatures> = {
  free: {
    canAccessAnalytics: false,
    canAccessAI: false,
    maxProjects: 3,
    maxTeamMembers: 1,
  },
  pro: {
    canAccessAnalytics: true,
    canAccessAI: true,
    maxProjects: 20,
    maxTeamMembers: 5,
  },
  enterprise: {
    canAccessAnalytics: true,
    canAccessAI: true,
    maxProjects: Infinity,
    maxTeamMembers: Infinity,
  },
};

export function usePlan() {
  const { data: session } = useSession();
  const plan = (session?.user?.plan as Plan) || 'free';

  return {
    plan,
    features: planFeatures[plan],
    isPro: plan === 'pro' || plan === 'enterprise',
    isEnterprise: plan === 'enterprise',
  };
}
```

### Feature Gate Component

```tsx
// components/FeatureGate.tsx
interface FeatureGateProps {
  feature: keyof PlanFeatures;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function FeatureGate({ feature, fallback, children }: FeatureGateProps) {
  const { features } = usePlan();

  if (!features[feature]) {
    return fallback || (
      <div className="relative">
        {/* Blurred preview */}
        <div className="blur-sm pointer-events-none opacity-50">
          {children}
        </div>

        {/* Upgrade overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center p-4">
            <p className="text-white font-medium mb-2">Upgrade to unlock</p>
            <button className="bg-[#20ED8A] px-4 py-2 text-black font-semibold">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Usage
<FeatureGate feature="canAccessAnalytics">
  <AnalyticsDashboard />
</FeatureGate>
```

---

## 15. Inbox & Messaging

### Best Pattern: Status-Based Inbox (Evidis)

```tsx
// app/(dashboard)/inbox/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'new' | 'analyzing' | 'ready' | 'in_progress' | 'done';

interface InboxItem {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  status: Status;
  priority: 'normal' | 'urgent';
  deadline?: string;
  createdAt: string;
}

const statusConfig: Record<Status, { label: string; icon: any; color: string }> = {
  new: { label: 'New', icon: Mail, color: 'text-blue-400' },
  analyzing: { label: 'Analyzing', icon: Loader2, color: 'text-amber-400' },
  ready: { label: 'Ready', icon: CheckCircle, color: 'text-[#20ED8A]' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-purple-400' },
  done: { label: 'Done', icon: CheckCircle, color: 'text-gray-400' },
};

export default function InboxPage() {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [filter, setFilter] = useState<Status | 'all'>('all');

  useEffect(() => {
    fetch('/api/inbox')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const filteredItems = filter === 'all'
    ? items
    : items.filter((i) => i.status === filter);

  const counts = {
    new: items.filter((i) => i.status === 'new').length,
    ready: items.filter((i) => i.status === 'ready').length,
    urgent: items.filter((i) => i.priority === 'urgent').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-theme">Inbox</h1>
        <div className="flex gap-2">
          {counts.new > 0 && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium">
              {counts.new} new
            </span>
          )}
          {counts.urgent > 0 && (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium">
              {counts.urgent} urgent
            </span>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'new', 'ready', 'in_progress'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`
              px-3 py-1.5 text-sm font-medium transition-colors
              ${filter === status
                ? 'bg-[#20ED8A]/20 text-[#20ED8A] border border-[#20ED8A]/30'
                : 'text-theme-muted hover:text-theme border border-theme hover:bg-theme-hover'
              }
            `}
          >
            {status === 'all' ? 'All' : statusConfig[status].label}
          </button>
        ))}
      </div>

      {/* Inbox list */}
      <div className="divide-y divide-theme">
        {filteredItems.map((item) => {
          const config = statusConfig[item.status];
          const Icon = config.icon;
          const isAnalyzing = item.status === 'analyzing';

          return (
            <div
              key={item.id}
              className="p-4 hover:bg-theme-hover transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Status icon */}
                <div className={config.color}>
                  <Icon className={`h-5 w-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-theme truncate">{item.subject}</span>
                    {item.priority === 'urgent' && (
                      <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-theme-muted truncate">{item.preview}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-theme-meta">
                    <span>{item.sender}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(item.createdAt))}</span>
                    {item.deadline && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400">Due {format(new Date(item.deadline), 'MMM d')}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status badge */}
                <span className={`px-2 py-1 text-xs font-medium ${config.color} bg-current/10`}>
                  {config.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 16. CMS & Blog Management

### Best Pattern: List + Editor with Preview (TWIN)

```tsx
// Blog post editor structure
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  featured_image?: string;
  category?: string;
  is_featured: boolean;
  author_id: string;
  author_name: string;
  views: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

// Editor layout (2/3 + 1/3)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Main content - 2/3 */}
  <div className="lg:col-span-2 space-y-6">
    {/* Title */}
    <input
      type="text"
      value={post.title}
      onChange={(e) => setPost({ ...post, title: e.target.value })}
      placeholder="Post title"
      className="w-full text-2xl font-bold bg-transparent border-0 text-theme placeholder-theme-meta focus:outline-none"
    />

    {/* Slug */}
    <div>
      <label className="text-sm text-theme-muted">Slug</label>
      <input
        type="text"
        value={post.slug}
        onChange={(e) => setPost({ ...post, slug: e.target.value })}
        className="w-full bg-theme-input border border-theme px-3 py-2 text-sm text-theme"
      />
    </div>

    {/* Excerpt */}
    <div>
      <label className="text-sm text-theme-muted">Excerpt</label>
      <textarea
        value={post.excerpt}
        onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
        rows={3}
        className="w-full bg-theme-input border border-theme px-3 py-2 text-sm text-theme"
      />
    </div>

    {/* Rich Text Editor */}
    <div>
      <label className="text-sm text-theme-muted">Content</label>
      <RichTextEditor
        content={post.content}
        onChange={(html) => setPost({ ...post, content: html })}
      />
    </div>
  </div>

  {/* Sidebar - 1/3 */}
  <div className="space-y-6">
    {/* Status */}
    <div className="bg-theme-card border border-theme p-4">
      <label className="text-sm font-medium text-theme-muted">Status</label>
      <select
        value={post.status}
        onChange={(e) => setPost({ ...post, status: e.target.value })}
        className="mt-2 w-full bg-theme-input border border-theme px-3 py-2 text-sm text-theme"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>

    {/* Featured Image */}
    <div className="bg-theme-card border border-theme p-4">
      <label className="text-sm font-medium text-theme-muted">Featured Image</label>
      <input
        type="url"
        value={post.featured_image || ''}
        onChange={(e) => setPost({ ...post, featured_image: e.target.value })}
        placeholder="Image URL"
        className="mt-2 w-full bg-theme-input border border-theme px-3 py-2 text-sm text-theme"
      />
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt="Preview"
          className="mt-2 w-full aspect-video object-cover"
        />
      )}
    </div>

    {/* Meta info */}
    <div className="bg-theme-card border border-theme p-4 space-y-2 text-sm text-theme-meta">
      <p>Author: {post.author_name}</p>
      <p>Views: {post.views}</p>
      <p>Created: {format(new Date(post.created_at), 'MMM d, yyyy')}</p>
      {post.published_at && (
        <p>Published: {format(new Date(post.published_at), 'MMM d, yyyy')}</p>
      )}
    </div>
  </div>
</div>
```

---

## 17. Media Library

### Best Pattern: Grid with Upload Modal (TWIN)

```tsx
// components/MediaGrid.tsx
interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video';
  file_size: number;
  alt_text?: string;
  created_at: string;
}

interface MediaGridProps {
  media: MediaItem[];
  onDelete?: (id: string) => void;
  selectionMode?: boolean;
  selectedMedia?: MediaItem[];
  onToggleSelection?: (item: MediaItem) => void;
}

export function MediaGrid({
  media,
  onDelete,
  selectionMode,
  selectedMedia = [],
  onToggleSelection,
}: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {media.map((item) => {
        const isSelected = selectedMedia.some((m) => m.id === item.id);

        return (
          <div
            key={item.id}
            onClick={() => selectionMode && onToggleSelection?.(item)}
            className={`
              group relative aspect-square bg-theme-input border overflow-hidden cursor-pointer
              ${isSelected ? 'border-[#20ED8A] ring-2 ring-[#20ED8A]/30' : 'border-theme'}
            `}
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.alt_text || item.filename}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
              />
            )}

            {/* Selection checkbox */}
            {selectionMode && (
              <div className="absolute top-2 left-2">
                <div className={`
                  w-5 h-5 border-2 flex items-center justify-center
                  ${isSelected ? 'bg-[#20ED8A] border-[#20ED8A]' : 'border-white/50 bg-black/30'}
                `}>
                  {isSelected && <Check className="h-3 w-3 text-black" />}
                </div>
              </div>
            )}

            {/* Hover overlay */}
            {!selectionMode && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Open preview
                  }}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white"
                >
                  <Eye className="h-4 w-4" />
                </button>
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {/* Filename */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-xs text-white truncate">{item.filename}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### Upload Modal

```tsx
// components/MediaUploadModal.tsx
interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function MediaUploadModal({ isOpen, onClose, onUploadComplete }: MediaUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleUpload = async () => {
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      setProgress(((i + 1) / files.length) * 100);
    }

    setUploading(false);
    setFiles([]);
    setProgress(0);
    onUploadComplete();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Media" size="lg">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-theme p-8 text-center"
      >
        <Upload className="h-8 w-8 mx-auto text-theme-meta mb-2" />
        <p className="text-theme-muted">
          Drag and drop files here, or{' '}
          <label className="text-[#20ED8A] cursor-pointer">
            browse
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </label>
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-theme-input">
              <span className="text-sm text-theme truncate">{file.name}</span>
              <button
                onClick={() => setFiles((f) => f.filter((_, j) => j !== i))}
                className="text-theme-meta hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      {uploading && (
        <div className="mt-4">
          <div className="h-2 bg-theme-input overflow-hidden">
            <div
              className="h-full bg-[#20ED8A] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-theme-meta text-center">{Math.round(progress)}%</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={uploading}
          className="px-4 py-2 text-sm text-theme-muted hover:text-theme border border-theme"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className="px-4 py-2 text-sm font-semibold bg-[#20ED8A] text-black disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </Modal>
  );
}
```

---

## 18. Settings Pages

### Best Pattern: Tabbed Settings (Slydes)

```tsx
// app/(dashboard)/settings/page.tsx
'use client';

import { useState } from 'react';
import { User, Users, Bell, Shield, CreditCard } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-theme">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab navigation */}
        <div className="lg:w-48 flex lg:flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-[#20ED8A]/10 text-[#20ED8A] border-l-2 border-[#20ED8A]'
                    : 'text-theme-muted hover:text-theme hover:bg-theme-hover border-l-2 border-transparent'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 bg-theme-card border border-theme p-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'team' && <TeamSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'billing' && <BillingSettings />}
        </div>
      </div>
    </div>
  );
}

// Example tab content
function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-theme">Profile Information</h2>
        <p className="text-sm text-theme-muted">Update your account details</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Display Name
          </label>
          <input
            type="text"
            className="w-full bg-theme-input border border-theme px-3 py-2 text-sm text-theme"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-theme-muted mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-theme-input border border-theme px-3 py-2 text-sm text-theme"
          />
        </div>
      </div>

      <button className="px-4 py-2 bg-[#20ED8A] text-black font-semibold text-sm">
        Save Changes
      </button>
    </div>
  );
}
```

---

## 19. Empty States

### Best Pattern: Illustrated Empty States (Stayflo)

```tsx
// components/EmptyState.tsx
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-4 bg-theme-input border border-theme mb-4">
        <Icon className="h-8 w-8 text-theme-meta" />
      </div>

      <h3 className="text-lg font-semibold text-theme mb-1">{title}</h3>
      <p className="text-sm text-theme-muted max-w-sm">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-[#20ED8A] text-black font-semibold text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Usage
<EmptyState
  icon={FileText}
  title="No posts yet"
  description="Create your first blog post to get started"
  action={{
    label: 'Create Post',
    onClick: () => router.push('/blog/new'),
  }}
/>
```

---

## 20. Loading States

### Best Pattern: Skeleton + Spinner (Universal)

```tsx
// components/Skeleton.tsx
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-theme-input ${className}`} />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-theme-card border border-theme p-6">
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-theme">
          <Skeleton className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );
}
```

### Spinner Component

```tsx
// components/Spinner.tsx
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <Loader2 className={`animate-spin text-[#20ED8A] ${sizes[size]} ${className}`} />
  );
}

// Full page loading
export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <Spinner size="lg" />
    </div>
  );
}
```

---

## Quick Reference: Tech Stack

| Layer | Recommended | Alternatives |
|-------|-------------|--------------|
| **Framework** | Next.js 15+ (App Router) | - |
| **Language** | TypeScript 5.x (strict) | - |
| **Styling** | Tailwind CSS 4.x | CSS Modules |
| **Animations** | Framer Motion | React Spring |
| **Icons** | Lucide React | Heroicons |
| **Drag & Drop** | @hello-pangea/dnd | @dnd-kit |
| **Rich Text** | TipTap | Slate, Quill |
| **Auth** | NextAuth.js | Clerk, Supabase Auth |
| **Database** | PostgreSQL (Neon/Supabase) | PlanetScale |
| **ORM** | Drizzle | Prisma |
| **Real-time** | Supabase Realtime | Pusher, Socket.io |
| **File Upload** | Uploadthing | AWS S3 |
| **Hosting** | Vercel | Railway, Render |

---

## Animation Cheatsheet

```typescript
// Cinematic fade-in
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.33, 0, 0.2, 1] }}

// Spring interaction
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ type: 'spring', stiffness: 400, damping: 17 }}

// Staggered children
variants={{
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
}}

// Card hover lift
whileHover={{ y: -4, boxShadow: '0 0 40px rgba(32,237,138,0.1)' }}

// Drag feedback
className={snapshot.isDragging && 'rotate-3 scale-105 shadow-xl'}
```

---

## Color Palette Reference

```css
/* Dark Theme */
--background: #000000
--card: #0a0f1a
--text: rgba(255, 255, 255, 0.9)
--muted: rgba(255, 255, 255, 0.6)
--meta: rgba(255, 255, 255, 0.4)
--border: rgba(255, 255, 255, 0.05)
--accent: #20ED8A

/* Status Colors */
--success: #20ED8A (emerald-400)
--warning: #fbbf24 (amber-400)
--error: #f87171 (red-400)
--info: #60a5fa (blue-400)

/* Column Colors (Kanban) */
--todo: rgba(255, 255, 255, 0.02)
--in-progress: rgba(59, 130, 246, 0.04)
--review: rgba(245, 158, 11, 0.04)
--done: rgba(32, 237, 138, 0.04)
```

---

## File Structure Template

```
apps/admin/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── tasks/page.tsx     # Kanban board
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx       # List
│   │   │   │   ├── new/page.tsx   # Create
│   │   │   │   └── [id]/page.tsx  # Edit
│   │   │   ├── settings/page.tsx
│   │   │   └── [...slug]/page.tsx # Catch-all
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── posts/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── media/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Modal.tsx
│   │   ├── StatCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── EmptyState.tsx
│   │   ├── TaskBoard/
│   │   │   ├── Board.tsx
│   │   │   ├── TaskColumn.tsx
│   │   │   └── TaskCard.tsx
│   │   ├── Editor/
│   │   │   └── RichTextEditor.tsx
│   │   └── ui/
│   │       └── ... (shadcn components)
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── theme-context.tsx
│   │   └── utils.ts
│   └── hooks/
│       ├── usePosts.ts
│       └── usePlan.ts
├── middleware.ts
├── tailwind.config.ts
└── package.json
```

---

*This document is a living resource. Update it as you discover new patterns and best practices.*

**Created from analysis of: TWIN, Evidis, Slydes, Stayflo**
