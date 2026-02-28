# CLAUDE-SUPPLEMENT.md

> **Deep Reference Document -- Lost Monster Website**
> This file contains detailed context, frameworks, and infrastructure docs.
> For core principles and quick reference, see [CLAUDE.md](../CLAUDE.md)
>
> **Updated**: 2026-02-28

---

## TABLE OF CONTENTS

1. [Auto-Context Loading](#auto-context-loading) - Page/section triggers
2. [Modern UX Patterns](#modern-ux-patterns-mandatory) - Detailed implementation patterns
3. [Infrastructure](#infrastructure) - Deployment, services, env vars
4. [Testing](#testing) - Playwright E2E setup and commands
5. [Code Patterns](#code-patterns-critical) - Dynamic colours, glassmorphism, typography, components
6. [Detailed Project Structure](#detailed-project-structure) - Full directory tree
7. [Framework Suite](#framework-suite) - All frameworks with commands + BULLETPROOF steps
8. [The Workers](#the-workers) - Quality gate workers, identities, scoring
9. [Documentation Index](#documentation-index) - All .ai/ files

---

## AUTO-CONTEXT LOADING

> **When James says "Working on [SECTION]", automatically load relevant context.**

| Trigger | Auto-Scan |
|---------|-----------|
| "Working on homepage" | `app/page.tsx`, `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, `components/sections/Hero*.tsx` |
| "Working on services" | `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `services/*.md`, `components/sections/Services*.tsx` |
| "Working on portfolio" / "case studies" | `app/case-studies/page.tsx`, `case-studies/*.md`, `components/sections/CaseStudy*.tsx` |
| "Working on contact" | `app/contact/page.tsx`, `components/forms/ContactForm.tsx`, `components/ContactModal.tsx`, `app/api/contact/` |
| "Working on about" | `app/about/page.tsx`, `pages/about.md` |
| "Working on process" | `app/process/page.tsx`, `pages/process.md`, `components/sections/Process*.tsx` |
| "Working on FAQ" | `app/faq/page.tsx`, `pages/faq.md`, `components/ui/Accordion.tsx` |
| "Working on labs" | `app/labs/page.tsx`, `app/labs/layout.tsx`, `app/labs/color-mixer/`, `lib/labs.ts` |
| "Working on layout" | `app/layout.tsx`, `components/layout/ClientLayout.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/Navigation.tsx` |
| "Working on colours" / "color system" | `contexts/ColorContext.tsx`, `.ai/COLOR-PALETTES.md`, `.ai/LOST-MONSTER-DESIGN-SYSTEM.md` |
| "Working on mobile" / "TikTok" | `app/m/page.tsx`, `app/m/layout.tsx`, `components/tiktok/*.tsx` |
| "Working on transitions" | `components/MorphingTransition.tsx`, `components/PageTransition.tsx`, `components/ScrollMorphButton.tsx`, `.ai/SWANKY-TRANSITIONS.md` |
| "Working on API" | `app/api/contact/`, `app/api/auth/`, `lib/db.ts`, `lib/rate-limit.ts`, `middleware.ts` |
| "Working on design system" | `.ai/LOST-MONSTER-DESIGN-SYSTEM.md`, `.ai/DESIGN-SYSTEM-SUMMARY.md`, `.ai/DESIGN-DECISIONS.md`, `tailwind.config.ts`, `styles/globals.css` |
| "Working on brand" | `.ai/brand/BRAND-IDENTITY.md`, `.ai/brand/MESSAGING-GUIDE.md`, `.ai/brand/POSITIONING-FRAMEWORK.md`, `.ai/brand/ORIGIN-STORY.md` |
| "Working on CTA" | `components/sections/CTA.tsx`, `components/sections/CTAPremium.tsx`, `components/ui/Button.tsx`, `components/ui/ButtonPremium.tsx` |

**What to do:**
1. Run `date` for accurate greeting
2. Read the relevant files listed above
3. Give an energised greeting with context summary
4. Ask "What are we tackling?"

---

## MODERN UX PATTERNS (MANDATORY)

> **Quick reference in [CLAUDE.md](../CLAUDE.md)** -- This section has full implementation details.
> All examples use Lost Monster's dark theme patterns.

These patterns are **required** for any admin/dashboard interfaces that get added in future. Apply sensible patterns to the marketing site where relevant.

### Reorderable Lists

**Always use drag & drop** -- never up/down arrow buttons.

```
BAD:  [Item] [up] [down] [Edit] [Delete]
GOOD: [drag handle] [Item] -----------------> [Delete]
      (click row to edit)
```

- Use `@dnd-kit/core` + `@dnd-kit/sortable` for React drag-drop
- Include a drag handle (grip icon) on the left
- Visual feedback: lift effect, shadow, drop zone highlight
- Persist order to database on drop

```tsx
// Lost Monster dark-theme drag item
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { useColor } from '@/contexts/ColorContext';

function SortableItem({ id, children, onDelete }: Props) {
  const { color } = useColor();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderColor: isDragging ? color.accent : 'rgba(255,255,255,0.1)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white/5 backdrop-blur-md border rounded-xl p-4
        flex items-center gap-4 cursor-pointer
        hover:bg-white/10 transition-all
        ${isDragging ? 'shadow-2xl z-50 opacity-90' : ''}
      `}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-neutral-400 hover:text-white">
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="flex-1">{children}</div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="text-neutral-500 hover:text-red-400 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
```

### Clickable Rows

**The whole row is the click target** -- not a tiny edit icon.

```tsx
// Lost Monster clickable row
import { useColor } from '@/contexts/ColorContext';

function ClickableRow({ item, onClick }: Props) {
  const { color } = useColor();

  return (
    <div
      onClick={() => onClick(item.id)}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6
                 cursor-pointer hover:bg-white/10 transition-all group"
      style={{ borderColor: `${color.accent}15` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">{item.title}</h3>
          <p className="text-neutral-400 text-sm">{item.subtitle}</p>
        </div>
        <ChevronRight
          className="w-5 h-5 text-neutral-500 group-hover:translate-x-1 transition-transform"
          style={{ color: color.accent }}
        />
      </div>
    </div>
  );
}
```

- Row click opens detail/edit modal or navigates to detail page
- Add hover state: `cursor-pointer`, `hover:bg-white/10`
- **Exception**: Delete button must NOT trigger row click (use `stopPropagation`)

### Action Buttons with Confirmation Modals

- Keep destructive actions (delete) as separate buttons
- Never trigger delete from row click
- **Use confirmation modals** for destructive actions, not `window.confirm()`
- Hover states on all interactive elements

```tsx
// Lost Monster confirmation modal
import { useColor } from '@/contexts/ColorContext';

function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }: Props) {
  const { color } = useColor();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      {/* Modal */}
      <div className="relative bg-neutral-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4
                      shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 mb-8">{message}</p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-neutral-700 text-white rounded-lg
                       hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-red-600 text-white rounded-lg
                       hover:bg-red-500 transition-colors font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Data Tables

```tsx
// Lost Monster data table
import { useColor } from '@/contexts/ColorContext';

function DataTable({ columns, data, onRowClick }: Props) {
  const { color } = useColor();

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid border-b border-white/10 px-6 py-3"
           style={{ gridTemplateColumns: columns.map(c => c.width || '1fr').join(' ') }}>
        {columns.map(col => (
          <div key={col.key} className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
            {col.label}
          </div>
        ))}
      </div>
      {/* Rows */}
      {data.map(row => (
        <div
          key={row.id}
          onClick={() => onRowClick(row.id)}
          className="grid px-6 py-4 border-b border-white/5 cursor-pointer
                     hover:bg-white/5 transition-colors"
          style={{ gridTemplateColumns: columns.map(c => c.width || '1fr').join(' ') }}
        >
          {columns.map(col => (
            <div key={col.key} className="text-neutral-300 text-sm">
              {col.render ? col.render(row) : row[col.key]}
            </div>
          ))}
        </div>
      ))}
      {/* Empty state */}
      {data.length === 0 && (
        <div className="px-6 py-12 text-center text-neutral-500">
          No items yet
        </div>
      )}
    </div>
  );
}
```

- Click row to view/edit details
- Checkbox column on left for bulk actions (if needed)
- Actions column on right (delete only -- edit is row click)
- Sortable columns where it makes sense
- Loading skeletons, not spinners

### Auto-Save (Optimistic UI)

**No save buttons** -- changes apply immediately.

```
BAD:  Edit -> Make changes -> Click "Save" -> Wait -> "Saved!"
GOOD: Edit -> Make changes -> checkmark (instant feedback, already saved)
```

- Changes persist on blur or selection (no explicit save action)
- Show subtle confirmation (checkmark, toast, or green flash)
- Use optimistic updates -- update UI immediately, sync to server in background
- Handle errors gracefully with undo option

```tsx
import { useColor } from '@/contexts/ColorContext';
import { Check } from 'lucide-react';

function AutoSaveField({ value, onSave }: Props) {
  const { color } = useColor();
  const [localValue, setLocalValue] = useState(value);
  const [saved, setSaved] = useState(false);
  const previousValue = useRef(value);

  const handleBlur = async () => {
    if (localValue === previousValue.current) return;
    try {
      await onSave(localValue);
      previousValue.current = localValue;
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setLocalValue(previousValue.current); // Rollback
      // Show error toast
    }
  };

  return (
    <div className="relative">
      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                   text-white focus:outline-none transition-colors"
        style={{ borderColor: saved ? color.accent : undefined }}
      />
      {saved && (
        <Check
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: color.accent }}
        />
      )}
    </div>
  );
}
```

---

## INFRASTRUCTURE

### Services

| Service | What | Status |
|---------|------|--------|
| **Framework** | Next.js 15 (App Router) | Active |
| **Hosting** | Vercel | Active |
| **Database** | Neon PostgreSQL | TBD -- not yet connected |
| **ORM** | Prisma | TBD -- not yet configured |
| **Object Storage** | TBD | Not set up |
| **Email** | TBD | Not set up |
| **Auth** | N/A | Marketing site only, no auth yet |
| **Payments** | TBD | Not set up |

### Domain & URLs

| URL | Routes |
|-----|--------|
| `lostmonster.dev` (production) | All routes via Vercel |
| `localhost:3000` (dev) | Local development |
| `/` | Homepage |
| `/about` | About page |
| `/services` | Services listing |
| `/services/[slug]` | Individual service pages |
| `/case-studies` | Portfolio / case studies |
| `/contact` | Contact page |
| `/process` | How I work |
| `/faq` | FAQ |
| `/labs` | Experimental features |
| `/m` | Mobile TikTok-scroll experience |
| `/apps` | Apps login page |
| `/demo/*` | Design demo/variation pages |
| `/api/contact` | Contact form API |
| `/api/auth` | Auth API routes |

### Deployment

**Push to `main`** -- Vercel auto-deploys.

No manual deployment steps. No CI/CD pipeline config needed beyond Vercel's defaults.

Preview deployments on pull request branches are automatic.

### Local Development

```bash
# Install dependencies
npm install

# Dev server
npm run dev                    # Runs on http://localhost:3000

# Production build
npm run build                  # Build for production

# Lint
npm run lint                   # Check for issues
```

### Environment Variables

| Variable | Purpose | File |
|----------|---------|------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `.env.local` |
| Other env vars | TBD as services are added | `.env.local` |

See `.env.example` and `.env.local.example` for templates.

### Claude Code Permissions

Auto-allow common tools without prompting. Edit `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(npx:*)",
      "Bash(git:*)",
      "Bash(node:*)",
      "WebFetch"
    ]
  }
}
```

---

## TESTING

### Key Rules

1. **Use bundled Chromium only** -- Playwright downloads and manages its own Chromium binary
2. **Headless by default** -- `headless: true` in config. Use `--headed` flag for visual debugging
3. **Install browsers** -- after fresh clone, run `npx playwright install chromium`

### Commands

```bash
npx playwright test                          # Run all tests (headless)
npx playwright test --headed                 # Run with visible browser
npx playwright test --ui                     # Interactive UI mode
npx playwright test --project=desktop        # Desktop tests only
npx playwright test --project=mobile         # Mobile tests only
npx playwright install chromium              # Install/update bundled browser
```

### On New Machines

```bash
npm install                   # Install deps
npx playwright install chromium  # Download bundled Chromium
npm run dev                   # Start dev server
npx playwright test           # Run tests
```

### Screenshot Testing (INSPX)

When running the INSPX pipeline, screenshots are taken at defined viewports:
- **Desktop**: 1280x800
- **Mobile**: 390x844

Screenshots are saved for worker review during the BULLETPROOF process. See the [PROTOCOL.md](PROTOCOL.md#bulletproof--the-qa-process) for the full pipeline.

---

## CODE PATTERNS (CRITICAL)

> These patterns are specific to Lost Monster. Follow them exactly.

### Dynamic Colour System

The heart of Lost Monster. Five user-selectable themes. All accent colours must come from the dynamic system -- never hardcoded.

**Source of truth:** `contexts/ColorContext.tsx`

```typescript
// The 5 colour themes
const colors = {
  blue:   { name: 'Sky Blue',     accent: '#3B82F6', hoverAccent: '#60A5FA',  bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]', bgDark: '#1E3A8A' },
  teal:   { name: 'Vibrant Teal', accent: '#06B6D4', hoverAccent: '#08D4F0',  bg: 'from-slate-900 via-slate-800 to-slate-900', bgDark: '#0f172a' },
  orange: { name: 'Bold Yellow',  accent: '#F59E0B', hoverAccent: '#FBBF24',  bg: 'from-neutral-900 via-stone-900 to-neutral-900', bgDark: '#171717' },
  purple: { name: 'Rich Purple',  accent: '#A855F7', hoverAccent: '#C084FC',  bg: 'from-black via-purple-950 to-black', bgDark: '#1a0a2e' },
  green:  { name: 'Fresh Green',  accent: '#10B981', hoverAccent: '#34D399',  bg: 'from-neutral-950 via-emerald-950 to-neutral-950', bgDark: '#0a0a0a' },
};
```

**Consuming the colour context:**

```tsx
import { useColor } from '@/contexts/ColorContext';

function MyComponent() {
  const { color, selectedColor, setSelectedColor, colors } = useColor();

  return (
    // Background gradient
    <div className={`bg-gradient-to-br ${color.bg} transition-colors duration-700`}>

      {/* Accent-coloured heading */}
      <h2 style={{ color: color.accent }}>My Heading</h2>

      {/* Accent-coloured button */}
      <button
        style={{
          backgroundColor: color.accent,
          boxShadow: `0 20px 60px -15px ${color.accent}40`
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = color.hoverAccent; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = color.accent; }}
        className="px-12 py-6 text-xl font-bold rounded-lg text-black transition-colors"
      >
        Start Your Project
      </button>

      {/* Accent border at 20% opacity */}
      <div
        className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
        style={{ borderColor: `${color.accent}20` }}
      >
        Card content
      </div>
    </div>
  );
}
```

**Rules:**
- NEVER use raw hex colours like `text-blue-500` or `bg-purple-600` for accents
- ALWAYS use `color.accent`, `color.hoverAccent`, `color.bg` from the context
- Use `style={{ }}` for dynamic colours (Tailwind classes are static)
- `transition-colors duration-700` on elements that change with theme
- Default theme is `teal` (during SSR and before localStorage loads)

### Glassmorphism Card Pattern

The signature Lost Monster card treatment. Used for metric cards, feature cards, content cards, modals.

```tsx
// Standard glassmorphism card
<div
  className="bg-white/5 backdrop-blur-md border rounded-xl p-6
             hover:bg-white/10 transition-all"
  style={{ borderColor: `${color.accent}20` }}
>
  {/* Card content */}
</div>

// Glassmorphism card with hover glow
<div
  className="bg-white/5 backdrop-blur-md border rounded-xl p-6
             hover:bg-white/10 transition-all group"
  style={{ borderColor: `${color.accent}20` }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = `${color.accent}40`;
    e.currentTarget.style.boxShadow = `0 0 30px ${color.accent}10`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = `${color.accent}20`;
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  {/* Card content */}
</div>
```

**Key classes:**
- `bg-white/5` -- semi-transparent white background
- `backdrop-blur-md` -- frosted glass blur effect
- `border rounded-xl` -- visible border with rounded corners
- `hover:bg-white/10` -- slightly brighter on hover
- `transition-all` -- smooth hover transitions

### Grid Pattern Background

Subtle SVG grid texture applied to all pages. Creates technical depth.

```tsx
// Grid pattern overlay (60x60 grid, white at 0.02 opacity)
<div
  className="fixed inset-0 pointer-events-none -z-10 opacity-30"
  style={{
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+")`
  }}
/>
```

Must be present on every page. Typically placed in the layout or as a fixed overlay.

### Typography Scale

```tsx
// Hero headlines -- MASSIVE (only for main hero)
<h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter">
  <span className="text-white">Built by</span><br/>
  <span className="text-white">Someone Who</span><br/>
  <span style={{ color: color.accent }}>Runs Businesses</span>
</h1>
// Mobile: 60px -> Tablet: 96px -> Desktop: 128px

// Section headlines
<h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
  Section Title
</h2>
// Mobile: 36px -> Desktop: 60px

// Subsection headlines
<h3 className="text-2xl md:text-4xl font-bold text-white">
  Subsection
</h3>

// Body / subheadline
<p className="text-xl md:text-2xl text-neutral-300">
  Body text with soft white colour
</p>

// Small text / labels
<span className="text-sm text-neutral-400">
  Metadata or label
</span>

// Tiny text / footnotes
<span className="text-xs text-neutral-400">
  Footnote
</span>
```

**Fonts:**
- **Outfit** (`--font-heading`): Geometric, modern, bold -- used for all headings
- **Inter** (`--font-body`): Highly readable, professional -- used for body text

Both loaded via `next/font` for optimised delivery.

### Colour Switcher Implementation

Fixed bottom-right widget. 5 circular buttons for colour selection. Persists to localStorage.

```tsx
// Colour switcher (fixed position)
import { useColor } from '@/contexts/ColorContext';

function ColorSwitcher() {
  const { selectedColor, setSelectedColor, colors } = useColor();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-full px-4 py-3 flex gap-3 items-center">
        <span className="text-xs text-neutral-400 font-medium">Theme</span>
        {(Object.keys(colors) as Array<keyof typeof colors>).map((colorKey) => (
          <button
            key={colorKey}
            onClick={() => setSelectedColor(colorKey)}
            className={`w-6 h-6 rounded-full transition-all ${
              selectedColor === colorKey
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                : 'opacity-50 hover:opacity-80'
            }`}
            style={{ backgroundColor: colors[colorKey].accent }}
            aria-label={`Switch to ${colors[colorKey].name} theme`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Metric Cards Pattern

The 4 key proof metrics. Always displayed where relevant.

```tsx
import { Code, TrendingDown, Star, Clock } from 'lucide-react';
import { useColor } from '@/contexts/ColorContext';

const metrics = [
  { icon: Code,         value: '50+',     label: 'Projects Built', subtext: 'Delivered on time' },
  { icon: TrendingDown, value: '70%',     label: 'Cost Savings',   subtext: 'vs agencies' },
  { icon: Star,         value: '4.9/5',   label: 'Client Rating',  subtext: 'Real reviews' },
  { icon: Clock,        value: '2-4 wks', label: 'Typical Build',  subtext: 'Not months' },
];

function MetricCards() {
  const { color } = useColor();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white/5 backdrop-blur-md border rounded-xl p-6"
          style={{ borderColor: `${color.accent}20` }}
        >
          <metric.icon className="w-8 h-8 mb-4" style={{ color: color.accent }} />
          <div className="text-4xl font-bold text-white">{metric.value}</div>
          <div className="text-sm font-semibold text-white">{metric.label}</div>
          <div className="text-xs text-neutral-400">{metric.subtext}</div>
        </div>
      ))}
    </div>
  );
}
```

### Button Patterns

```tsx
// Primary CTA -- accent background
<button
  style={{
    backgroundColor: color.accent,
    boxShadow: `0 20px 60px -15px ${color.accent}40`
  }}
  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = color.hoverAccent; }}
  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = color.accent; }}
  className="px-12 py-6 text-xl font-bold rounded-lg text-black transition-colors"
>
  Start Your Project
</button>

// Secondary CTA -- bordered
<button className="px-12 py-6 border-2 border-neutral-700 text-white text-xl rounded-lg
                   hover:bg-white/5 transition-colors">
  See My Work
</button>
```

### Section Spacing

```tsx
// Standard section wrapper
<section className="py-20 md:py-32">
  <div className="container mx-auto px-6">
    {/* Section content */}
  </div>
</section>

// Responsive spacing:
// Mobile: py-20 (80px vertical padding)
// Desktop: py-32 (128px vertical padding)
// Container: mx-auto with px-6 (24px horizontal padding)
```

### Animation Timing

```css
--duration-fast:  200ms   /* Micro-interactions (hover states) */
--duration-base:  300ms   /* Standard transitions */
--duration-slow:  600ms   /* Large changes (layout shifts) */
--duration-theme: 700ms   /* Colour theme transitions */
```

Key pattern: `transition-colors duration-700` on all colour-affected elements.

---

## DETAILED PROJECT STRUCTURE

```
website/
├── app/                           # Next.js App Router (all pages)
│   ├── page.tsx                   # Homepage (REFERENCE IMPLEMENTATION)
│   ├── layout.tsx                 # Root layout (fonts, providers, metadata)
│   ├── loading.tsx                # Global loading state
│   ├── error.tsx                  # Global error boundary
│   ├── not-found.tsx              # 404 page
│   ├── robots.ts                  # Robots.txt generation
│   ├── sitemap.ts                 # Sitemap generation
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── services/
│   │   ├── page.tsx               # Services listing
│   │   └── [slug]/
│   │       └── page.tsx           # Individual service page
│   ├── case-studies/
│   │   ├── page.tsx               # Case studies listing
│   │   └── ancarraig/             # Ancarraig case study
│   ├── contact/
│   │   ├── page.tsx               # Contact page
│   │   └── loading.tsx            # Contact loading state
│   ├── process/
│   │   └── page.tsx               # Process / how I work
│   ├── faq/
│   │   └── page.tsx               # FAQ page
│   ├── labs/
│   │   ├── page.tsx               # Labs landing
│   │   ├── layout.tsx             # Labs layout
│   │   └── color-mixer/           # Colour mixer experiment
│   ├── m/
│   │   ├── page.tsx               # Mobile TikTok-scroll experience
│   │   ├── layout.tsx             # Mobile layout
│   │   └── README.md              # Mobile experience docs
│   ├── apps/
│   │   └── page.tsx               # Apps login page
│   ├── demo/
│   │   ├── page.tsx               # Demo index
│   │   ├── comparison/            # Design comparison demos
│   │   ├── hero/                  # Hero variation demos
│   │   └── layout/                # Layout demos
│   └── api/
│       ├── contact/               # Contact form endpoint
│       └── auth/                  # Auth API routes
│
├── components/
│   ├── layout/
│   │   ├── ClientLayout.tsx       # Client-side layout wrapper
│   │   ├── Header.tsx             # Site header / navigation
│   │   ├── Footer.tsx             # Site footer
│   │   └── Navigation.tsx         # Nav component
│   ├── sections/
│   │   ├── Hero.tsx               # Hero section
│   │   ├── HeroPremium.tsx        # Premium hero variant
│   │   ├── HeroScandi.tsx         # Scandi-style hero variant
│   │   ├── Services.tsx           # Services section
│   │   ├── ServicesPremium.tsx    # Premium services variant
│   │   ├── Process.tsx            # Process section
│   │   ├── ProcessPremium.tsx     # Premium process variant
│   │   ├── CaseStudy.tsx          # Case study section
│   │   ├── CaseStudyPremium.tsx   # Premium case study variant
│   │   ├── CTA.tsx                # Call-to-action section
│   │   ├── CTAPremium.tsx         # Premium CTA variant
│   │   └── TrustSignals.tsx       # Trust signals section
│   ├── forms/
│   │   └── ContactForm.tsx        # Contact form component
│   ├── tiktok/
│   │   ├── index.ts               # TikTok scroll barrel export
│   │   ├── TikTokScroll.tsx       # TikTok-style scroll container
│   │   ├── TikTokSection.tsx      # Individual TikTok section
│   │   └── HorizontalCarousel.tsx # Horizontal carousel within TikTok
│   ├── ui/
│   │   ├── Accordion.tsx          # Accordion / FAQ component
│   │   ├── Button.tsx             # Standard button
│   │   ├── ButtonPremium.tsx      # Premium button variant
│   │   ├── Card.tsx               # Card component
│   │   └── MarkdownContent.tsx    # Markdown renderer
│   ├── ContactModal.tsx           # Contact modal overlay
│   ├── MorphingTransition.tsx     # Morphing page transition
│   ├── PageTransition.tsx         # Standard page transition
│   └── ScrollMorphButton.tsx      # Scroll-triggered morph button
│
├── contexts/
│   └── ColorContext.tsx            # Dynamic 5-colour theme system
│
├── lib/
│   ├── auth/
│   │   ├── config.ts              # Auth configuration
│   │   └── index.ts               # Auth exports
│   ├── content.ts                 # Content loading utilities
│   ├── db.ts                      # Database connection
│   ├── labs.ts                    # Labs experiment utilities
│   ├── markdown.ts                # Markdown processing
│   ├── rate-limit.ts              # API rate limiting
│   └── utils.ts                   # General utilities
│
├── pages/                         # Markdown content pages
│   ├── about.md
│   ├── faq.md
│   ├── home.md
│   └── process.md
│
├── services/                      # Service page markdown content
│   ├── booking-systems.md
│   ├── custom-applications.md
│   ├── design-systems.md
│   └── ecommerce-systems.md
│
├── case-studies/                   # Case study markdown content
│   └── ancarraig.md
│
├── public/                        # Static assets
│   ├── favicon.svg
│   ├── manifest.json
│   └── email-signature.html
│
├── styles/
│   └── globals.css                # Global styles, Tailwind imports
│
├── .ai/                           # AI instructions, design system, protocol
│   ├── PROTOCOL.md                # THE protocol -- single source of truth
│   ├── CLAUDE-SUPPLEMENT.md       # THIS FILE -- deep reference
│   ├── LOST-MONSTER-DESIGN-SYSTEM.md  # Complete design system
│   ├── DESIGN-SYSTEM-SUMMARY.md   # Quick design reference
│   ├── DOMAIN-KNOWLEDGE.md        # Business context and goals
│   ├── DESIGN-DECISIONS.md        # Design decision log
│   ├── DESIGN-AUDIT.md            # Design audit results
│   ├── CODA-WEBSITE.md            # CODA planning for the website
│   ├── COLOR-PALETTES.md          # Colour palette exploration
│   ├── PRE-DESIGN-CHECKLIST.md    # General checklist
│   ├── PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md  # Bold brand checklist
│   ├── PREMIUM-DESIGN-IMPLEMENTATION.md  # Premium design notes
│   ├── QUALITY-SCORES.md          # Quality score history
│   ├── SWANKY-TRANSITIONS.md      # Page transition documentation
│   ├── TRANSFORMATION-COMPLETE.md # Design transformation log
│   ├── slop-test.md               # AI slop test rules
│   ├── README.md                  # .ai directory index
│   ├── brand/                     # Brand identity documentation
│   │   ├── BRAND-IDENTITY.md
│   │   ├── DESIGN-SYSTEM.md
│   │   ├── MESSAGING-GUIDE.md
│   │   ├── ORIGIN-STORY.md
│   │   └── POSITIONING-FRAMEWORK.md
│   ├── crew/                      # Worker playbooks
│   │   ├── GAFFER.md              # Gaffer deep reference
│   │   ├── planners/
│   │   │   ├── CODAX.md
│   │   │   ├── PLANX.md
│   │   │   ├── PLANX-SEO-GEO.md
│   │   │   └── PRDX.md
│   │   ├── builders/
│   │   │   ├── APEX.md
│   │   │   ├── CRUDX.md
│   │   │   ├── DEMX.md
│   │   │   ├── MAPX.md
│   │   │   └── UXPATX.md
│   │   ├── reviewers/
│   │   │   ├── SOFAX.md
│   │   │   ├── AIDAX.md
│   │   │   ├── CONSX.md
│   │   │   └── PIXLX.md
│   │   └── checkers/
│   │       ├── TERRX.md
│   │       ├── AUDIX.md
│   │       ├── CONEX.md
│   │       ├── INSPX.md
│   │       └── HARDX.md (light -- defined in PROTOCOL.md)
│   └── gaffer/                    # Gaffer runtime state
│       ├── session-log.md
│       ├── debts.md
│       ├── calibration.md
│       ├── evolution.md
│       └── inspections/
│           └── homepage.md
│
├── middleware.ts                   # Next.js middleware
├── tailwind.config.ts             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.js                 # Next.js configuration
├── next-env.d.ts                  # Next.js type declarations
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Dependency lock file
├── CLAUDE.md                      # Core project AI instructions
├── SETUP.md                       # Setup documentation
├── CONTACT-FORM-SETUP.md          # Contact form setup guide
├── TESTING-MOBILE-TIKTOK.md       # Mobile testing documentation
├── .env.example                   # Example environment variables
└── .env.local.example             # Example local environment
```

---

## FRAMEWORK SUITE

**CRITICAL: BUILD first, explain second.**
Frameworks that create artifacts must CREATE them -- not describe them in chat.

| Framework | Deliverable | NOT Acceptable |
|-----------|-------------|----------------|
| **DEMX** | Live demo page at `/demo/[feature]-variations/` | ASCII mockups in chat |
| **PLANX** | Written plan file in `.claude/plans/` | Plan described in chat |
| **CRUDX** | Actual database + API + UI code | Description of what to build |
| **MAPX** | Documentation files in `docs/mapx/` | Route list in chat |

**The artifact IS the deliverable.**

### Available Frameworks

| Framework | Purpose | Command | Type |
|-----------|---------|---------|------|
| **CODAX** | CODA planning (Context, Objective, Details, Acceptance) | `CODAX` | Planner |
| **PLANX** | Execution blueprints with milestones and todos | `PLANX: [feature]` | Planner |
| **PRDX** | Product requirements document | `PRDX: [feature]` | Planner |
| **PETRAX** | Validates plans are atomic and clear | Runs after PLANX | Planner |
| **RAPIX** | Interprets vague input into structured requirements | Stage 1 of APEX | Planner |
| **CRUDX** | Full-stack CRUD scaffolding (DB -> Types -> API -> UI) | `CRUDX: [entity]` | Builder |
| **DEMX** | Design variations (5 approaches to every design problem) | `DEMX: [element]` | Builder |
| **MAPX** | Application mapping + living audit | `MAPX` or `MAPX: [page]` | Builder |
| **APEX** | All-Protocol EXecution (full-stack orchestrator) | `APEX: [feature]` | Builder |
| **UXPATX** | UX pattern reference (consulted during builds) | Referenced, not invoked | Reference |
| **SOFAX** | Design quality audit (11 dimensions, 110-point scale) | `run SOPHIA on [page]` | Reviewer |
| **AIDAX** | Conversion scoring (AIDA framework, 100-point scale) | `AIDAX` | Reviewer |
| **PIXLX** | Quality / edge case bug hunting (100-point scale) | `run PIXELX` | Reviewer |
| **CONSX** | UI consistency scanning | `run CONSTX on [page/component]` | Reviewer |
| **NIGELX** | Usability from Dave's perspective (100-point scale) | During BULLETPROOF | Reviewer |
| **TERRX** | Tests -- does it actually work? | `run Terry` | Checker |
| **AUDIX** | Service health verification | `run AUDIX` | Checker |
| **CONEX** | System connectivity verification | `run CONNECTX` | Checker |
| **HARDX** | Hardcoded value detection | `run HARDCODEX` | Checker |
| **INSPX** | Inspection pipeline orchestrator | `run INSPX on [page]` | Orchestrator |

### BULLETPROOF -- QA Verification Framework

**BULLETPROOF is the mandatory QA gate before any feature reaches James.** It runs automatically after every feature or fix.

| Step | Name | What |
|------|------|------|
| 1 | **Build** | Write the code, get it compiling |
| 2 | **INSPX Pipeline** | Automated pipeline replaces manual steps 2-8 of old process |
|   | 2a. Screenshots | Playwright captures at desktop (1280x800) and mobile (390x844) |
|   | 2b. Edge Cases | PIXLX checks missing data, empty states, loading, errors |
|   | 2c. Consistency | CONSX checks existing patterns, colours, spacing |
|   | 2d. AIDA Check | AIDAX checks conversion flow and UX journey |
|   | 2e. Brand Compliance | SOFAX Dim 11 checks Lost Monster Red Flags |
|   | 2f. Usability | NIGELX checks copy, labels, navigation clarity |
|   | 2g. Fix Issues | CRITICAL failure at any checkpoint -> HALT, fix, re-run |
|   | 2h. Pipeline Report | All scores, screenshots, and issues collated |
| 3 | **Pre-Present Gate** | Review Card populated from Pipeline Report |
| 4 | **Present to James** | Screenshots + Review Card + summary + trade-offs |
| 5 | **Wait for Approval** | NO git, NO issues until James says ship |
| 6 | **Commit + Close** | Only after the green light |

**Review Card format (mandatory before presenting visual work):**
```
+- REVIEW CARD -----------------------------------------+
| SOFAX:  95/110 (incl. Dim 11 Brand: 8/10)             |
| CONSX:  PASS -- no adjacent section conflicts          |
| NIGELX: PASS -- "Would Dave find this obvious?"        |
| PIXLX:  PASS -- Mobile 390x844 verified               |
| AIDAX:  82/100 (A:8 I:8 D:7 A:8)                      |
| TERRX:  PASS -- builds clean                           |
|--------------------------------------------------------|
| GAFFER: APPROVED -- ready for James                    |
+--------------------------------------------------------+
```

Full BULLETPROOF details: [PROTOCOL.md](PROTOCOL.md#bulletproof--the-qa-process)

---

## THE WORKERS

> **Workers are quality checkers, builders, and planners. One vocabulary, one concept.**
> **Full protocol:** [PROTOCOL.md](PROTOCOL.md) | **Gaffer deep ref:** [crew/GAFFER.md](crew/GAFFER.md)

### Identity Register

| Worker | Persona Name | Title | Key Question |
|--------|-------------|-------|--------------|
| **The Gaffer** | -- | Chief Performance Director | "Is this machine running properly?" |
| **CODAX** | Cody Cross | Chief Planning Officer | "What's the plan?" |
| **PETRAX** | Petra Stone | Chief Operations Officer | "Is every step clear?" |
| **SOFAX** | Sophia Kerr | Chief Design Officer | "Is this beautiful?" |
| **NIGELX** | Nigel Mullins | Chief Simplicity Officer | "Can I find it?" |
| **AIDAX** | Aida Sterling | Chief Conversion Officer | "Will they enquire?" |
| **PIXLX** | Pixie Edge | Chief Quality Officer | "What if it breaks?" |
| **TERRX** | Terry Stone | Chief Quality Engineer | "Does it actually work?" |

Workers without personas (PLANX, PRDX, CRUDX, DEMX, MAPX, APEX, RAPIX, UXPATX, CONSX, AUDIX, CONEX, HARDX, INSPX) are pure process -- no character, just methodology.

### The Hierarchy

```
                    +-----------+
                    |    THE    |
                    |  GAFFER   |  <-- Chief Performance Director
                    +-----+-----+
                          |
          +---------------+---------------+
          |               |               |
     PLANNING        BUILDING         QUALITY
          |               |               |
   CODAX (Cody)    APEX (meta)    SOFAX (Sophia)
   PETRAX (Petra)  CRUDX          NIGELX (Nigel)
   PLANX           DEMX           AIDAX (Aida)
   PRDX            MAPX           PIXLX (Pixie)
   RAPIX           UXPATX         TERRX (Terry)
                                  CONSX, AUDIX
                                  CONEX, HARDX
                                  INSPX (pipeline)
```

**Execution order:**
```
CODAX -> PETRAX -> Build (CRUDX/DEMX/APEX) -> INSPX Pipeline (SOFAX + NIGELX + AIDAX + PIXLX parallel) -> TERRX -> Gaffer sign-off -> Present to James
```

### Test Persona: Dave

**NIGELX uses Dave as the usability test persona.** Not "Nigel" -- Nigel is the worker. Dave is the user.

| Attribute | Value |
|-----------|-------|
| **Name** | Dave |
| **Age** | 42 |
| **Role** | Small business owner looking for a developer |
| **Technical level** | Not technical |
| **What he wants** | Proof you can deliver, not jargon |
| **The single check** | Would Dave know what this does without thinking? |

**Dave-proofing examples:**

| Fails Dave | Passes Dave |
|------------|-------------|
| "Submit" | "Start your project" |
| "Portfolio" | "See my work" |
| "Services" | "What I build" |
| "Consultation" | "Let's talk" |
| "Tech stack" | "How I build" |
| "Submit enquiry" | "Send message" |
| "Resources" | "Free guides" |

### Scoring Targets

| Worker | Target | Scale | What It Measures |
|--------|--------|-------|------------------|
| **SOFAX** | 93+ / 110 | 11 dimensions x 10 points | Design quality and brand compliance |
| **AIDAX** | 80+ / 100 | AIDA framework (4 dims x 25) | Conversion potential |
| **PIXLX** | 85+ / 100 | Edge cases, mobile, empty states | Quality and resilience |
| **NIGELX** | 85+ / 100 | Usability from Dave's perspective | Simplicity and clarity |

**Below threshold?**
- Fix issues FIRST, re-run the failing worker, THEN present
- OR explicitly flag: "SOFAX at 78 -- below 93/110. Presenting anyway because [reason]. James decides."
- Never silently present sub-threshold work

### Brand Compliance Chain Summary

Every worker that touches UI is connected to the Design Guide and the Lost Monster Red Flags.

```
.ai/LOST-MONSTER-DESIGN-SYSTEM.md  <-- Source of truth
.ai/slop-test.md                   <-- AI Slop Test

         PLANNING              BUILDING              REVIEW               SIGN-OFF
         --------              --------              ------               --------
         CODAX                 DEMX                  SOFAX                GAFFER
         Brand Gate            Brand Gate             Dim 11 (9 checks)   Score check
         |                     (5 checks before AIDA) |                   |
         PLANX                 |                     AIDAX                Feedback loops
         Milestone 5.1         CRUDX                 Brand Alignment      -> calibration.md
                               Layers 4-5            |
                               |                     PIXLX
                               APEX                  BC-01 -> BC-09
                               Stage 6               |
                                                     CONSX
                                                     Dims 8-9
```

**Lost Monster Red Flags (instant fail):**
1. Light page backgrounds (`bg-white`, `bg-gray-50`)
2. Small/timid typography (hero below `text-6xl`)
3. Corporate "we" voice
4. Hardcoded accent colours (raw hex outside colour config)
5. Missing glassmorphism on cards
6. Missing grid pattern
7. Generic stock imagery
8. Corporate jargon ("solutions", "leverage", "synergy")
9. Missing colour transitions (`duration-700`)
10. Flat/boring cards (no hover states, no depth)

### Worker Commands Quick Reference

| Command | Worker | What Happens |
|---------|--------|--------------|
| `CODAX` | CODAX | CODA plan (Context, Objective, Details, Acceptance) |
| `PLANX: [feature]` | PLANX | Execution blueprint with milestones |
| `PRDX: [feature]` | PRDX | Product requirements document |
| `CRUDX: [entity]` | CRUDX | Full 6-layer CRUD stack |
| `DEMX: [element]` | DEMX | 5 design variations |
| `MAPX` / `MAPX: [page]` | MAPX | Application mapping + audit |
| `APEX: [feature]` | APEX | Full-stack orchestrated build |
| `run SOPHIA on [page]` | SOFAX | 11-dimension design audit (93+/110 target) |
| `AIDAX` | AIDAX | AIDA conversion scoring (80+/100 target) |
| `run PIXELX` | PIXLX | Quality + edge case audit (85+/100 target) |
| `run CONSTX on [page]` | CONSX | UI consistency scan |
| `run Terry` | TERRX | Run tests -- does it actually work? |
| `run AUDIX` | AUDIX | Service health check |
| `run CONNECTX` | CONEX | System connectivity check |
| `run HARDCODEX` | HARDX | Scan for hardcoded values |
| `run INSPX on [page]` | INSPX | Automated inspection pipeline |
| `INSPX: re-run failures` | INSPX | Re-run only failed checkpoints |
| `run Gaffer` / `GAFFER` | Gaffer | Full debrief -- scores, gaps, debts |
| `full Gaffer build` | Gaffer | Autonomous end-to-end build |
| `Gaffer: build [desc]` | Gaffer | Autonomous build with description |
| `Gaffer: onboard` | Gaffer | Full rewrite of all project context |
| `Gaffer: scores` | Gaffer | Score trending across recent sessions |
| `Gaffer: who's slipping?` | Gaffer | Worker performance review |
| `Gaffer: fitness` | Gaffer | Worker fitness check (stale workers) |
| `Gaffer: what did we miss?` | Gaffer | Gap analysis on recent work |
| `Gaffer: calibrate` | Gaffer | Review scores against real outcomes |
| `Gaffer: uptrain` | Gaffer | Full review and improvement of all workers |
| `Gaffer: uptrain [worker]` | Gaffer | Focused improvement of one worker |
| `Gaffer: clear debts` | Gaffer | Mark all debts as resolved |

---

## DOCUMENTATION INDEX

### Core Project Files

| Purpose | Location |
|---------|----------|
| **Core AI Instructions** | [CLAUDE.md](../CLAUDE.md) |
| **Deep Reference (this file)** | [.ai/CLAUDE-SUPPLEMENT.md](CLAUDE-SUPPLEMENT.md) |
| **Protocol (single source of truth)** | [.ai/PROTOCOL.md](PROTOCOL.md) |
| **Design System (complete)** | [.ai/LOST-MONSTER-DESIGN-SYSTEM.md](LOST-MONSTER-DESIGN-SYSTEM.md) |
| **Design System Summary** | [.ai/DESIGN-SYSTEM-SUMMARY.md](DESIGN-SYSTEM-SUMMARY.md) |
| **Domain Knowledge** | [.ai/DOMAIN-KNOWLEDGE.md](DOMAIN-KNOWLEDGE.md) |
| **Design Decisions** | [.ai/DESIGN-DECISIONS.md](DESIGN-DECISIONS.md) |
| **Design Audit** | [.ai/DESIGN-AUDIT.md](DESIGN-AUDIT.md) |
| **CODA Website Plan** | [.ai/CODA-WEBSITE.md](CODA-WEBSITE.md) |
| **Colour Palettes** | [.ai/COLOR-PALETTES.md](COLOR-PALETTES.md) |
| **Pre-Design Checklist** | [.ai/PRE-DESIGN-CHECKLIST.md](PRE-DESIGN-CHECKLIST.md) |
| **Bold Brand Checklist** | [.ai/PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md](PRE-DESIGN-CHECKLIST-BOLD-PERSONAL-BRAND.md) |
| **Premium Design Notes** | [.ai/PREMIUM-DESIGN-IMPLEMENTATION.md](PREMIUM-DESIGN-IMPLEMENTATION.md) |
| **Quality Scores History** | [.ai/QUALITY-SCORES.md](QUALITY-SCORES.md) |
| **Swanky Transitions** | [.ai/SWANKY-TRANSITIONS.md](SWANKY-TRANSITIONS.md) |
| **Transformation Log** | [.ai/TRANSFORMATION-COMPLETE.md](TRANSFORMATION-COMPLETE.md) |
| **AI Slop Test** | [.ai/slop-test.md](slop-test.md) |

### Brand Documentation

| Purpose | Location |
|---------|----------|
| **Brand Identity** | [.ai/brand/BRAND-IDENTITY.md](brand/BRAND-IDENTITY.md) |
| **Design System (Brand)** | [.ai/brand/DESIGN-SYSTEM.md](brand/DESIGN-SYSTEM.md) |
| **Messaging Guide** | [.ai/brand/MESSAGING-GUIDE.md](brand/MESSAGING-GUIDE.md) |
| **Origin Story** | [.ai/brand/ORIGIN-STORY.md](brand/ORIGIN-STORY.md) |
| **Positioning Framework** | [.ai/brand/POSITIONING-FRAMEWORK.md](brand/POSITIONING-FRAMEWORK.md) |

### Worker Playbooks

| Worker | Location |
|--------|----------|
| **Gaffer** | [.ai/crew/GAFFER.md](crew/GAFFER.md) |
| **CODAX** | [.ai/crew/planners/CODAX.md](crew/planners/CODAX.md) |
| **PLANX** | [.ai/crew/planners/PLANX.md](crew/planners/PLANX.md) |
| **PLANX-SEO-GEO** | [.ai/crew/planners/PLANX-SEO-GEO.md](crew/planners/PLANX-SEO-GEO.md) |
| **PRDX** | [.ai/crew/planners/PRDX.md](crew/planners/PRDX.md) |
| **APEX** | [.ai/crew/builders/APEX.md](crew/builders/APEX.md) |
| **CRUDX** | [.ai/crew/builders/CRUDX.md](crew/builders/CRUDX.md) |
| **DEMX** | [.ai/crew/builders/DEMX.md](crew/builders/DEMX.md) |
| **MAPX** | [.ai/crew/builders/MAPX.md](crew/builders/MAPX.md) |
| **UXPATX** | [.ai/crew/builders/UXPATX.md](crew/builders/UXPATX.md) |
| **SOFAX** | [.ai/crew/reviewers/SOFAX.md](crew/reviewers/SOFAX.md) |
| **AIDAX** | [.ai/crew/reviewers/AIDAX.md](crew/reviewers/AIDAX.md) |
| **CONSX** | [.ai/crew/reviewers/CONSX.md](crew/reviewers/CONSX.md) |
| **PIXLX** | [.ai/crew/reviewers/PIXLX.md](crew/reviewers/PIXLX.md) |
| **TERRX** | [.ai/crew/checkers/TERRX.md](crew/checkers/TERRX.md) |
| **AUDIX** | [.ai/crew/checkers/AUDIX.md](crew/checkers/AUDIX.md) |
| **CONEX** | [.ai/crew/checkers/CONEX.md](crew/checkers/CONEX.md) |
| **INSPX** | [.ai/crew/checkers/INSPX.md](crew/checkers/INSPX.md) |
| **HARDX** | Light worker -- defined in [.ai/PROTOCOL.md](PROTOCOL.md#hardx--hardcoded-value-scanner) |
| **NIGELX** | Light worker -- defined in [.ai/PROTOCOL.md](PROTOCOL.md#nigelx--chief-simplicity-officer) |
| **PETRAX** | Light worker -- defined in [.ai/PROTOCOL.md](PROTOCOL.md#petrax--chief-operations-officer) |
| **RAPIX** | Light worker -- defined in [.ai/PROTOCOL.md](PROTOCOL.md#rapix--requirements-interpreter) |

### Gaffer Runtime State

| Purpose | Location |
|---------|----------|
| **Session Log** | [.ai/gaffer/session-log.md](gaffer/session-log.md) |
| **Quality Debts** | [.ai/gaffer/debts.md](gaffer/debts.md) |
| **Calibration Log** | [.ai/gaffer/calibration.md](gaffer/calibration.md) |
| **Evolution Log** | [.ai/gaffer/evolution.md](gaffer/evolution.md) |
| **Inspection Specs** | [.ai/gaffer/inspections/](gaffer/inspections/) |

### Other Project Files

| Purpose | Location |
|---------|----------|
| **Setup Guide** | [SETUP.md](../SETUP.md) |
| **Contact Form Setup** | [CONTACT-FORM-SETUP.md](../CONTACT-FORM-SETUP.md) |
| **Mobile Testing** | [TESTING-MOBILE-TIKTOK.md](../TESTING-MOBILE-TIKTOK.md) |
| **Env Example** | [.env.example](../.env.example) |
| **Env Local Example** | [.env.local.example](../.env.local.example) |

### Key Implementation Files

| Purpose | Location |
|---------|----------|
| **Homepage (reference implementation)** | [app/page.tsx](../app/page.tsx) |
| **Root Layout** | [app/layout.tsx](../app/layout.tsx) |
| **Colour Context** | [contexts/ColorContext.tsx](../contexts/ColorContext.tsx) |
| **Tailwind Config** | [tailwind.config.ts](../tailwind.config.ts) |
| **Global Styles** | [styles/globals.css](../styles/globals.css) |

---

*This supplement file contains detailed reference material for the Lost Monster website.*
*For core principles, see [CLAUDE.md](../CLAUDE.md)*
*For the execution protocol, see [PROTOCOL.md](PROTOCOL.md)*
*Last updated: 2026-02-28*
