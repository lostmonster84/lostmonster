# PLANX: Universal Admin Dashboard Build

> **Build a production-grade admin dashboard from scratch**
> Reference: [UNIVERSAL-ADMIN-TEMPLATE.md](UNIVERSAL-ADMIN-TEMPLATE.md)
>
> **Estimated Effort**: 3-5 days for MVP
> **Complexity**: Medium-High

---

## Pre-Build Checklist

Before starting, confirm:

- [ ] Project name and branding colors defined
- [ ] Authentication method chosen (NextAuth, Clerk, Supabase)
- [ ] Database provider selected (Neon, Supabase, PlanetScale)
- [ ] Hosting platform confirmed (Vercel, Railway)
- [ ] Required features list prioritized

---

## Milestone 1: Foundation (Day 1)

### Setup

| Todo | Status | Notes |
|------|--------|-------|
| Initialize Next.js 15+ with TypeScript | ⬜ | `npx create-next-app@latest --typescript` |
| Install core dependencies | ⬜ | See package list below |
| Configure Tailwind CSS 4.x | ⬜ | Sharp corners theme |
| Setup CSS variables for theming | ⬜ | Copy from template |
| Configure ESLint + Prettier | ⬜ | Strict TypeScript |
| Create folder structure | ⬜ | Follow template |

### Core Dependencies

```bash
pnpm add next-auth @hello-pangea/dnd framer-motion lucide-react
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-placeholder
pnpm add date-fns
pnpm add -D @types/node @types/react @types/react-dom
```

### Files to Create

- [ ] `src/app/globals.css` - Theme variables + base styles
- [ ] `src/lib/utils.ts` - cn() helper
- [ ] `src/lib/theme-context.tsx` - Light/dark mode
- [ ] `tailwind.config.ts` - Custom theme config

---

## Milestone 2: Authentication (Day 1-2)

### Setup NextAuth

| Todo | Status | Notes |
|------|--------|-------|
| Create `lib/auth.ts` | ⬜ | JWT strategy |
| Create `api/auth/[...nextauth]/route.ts` | ⬜ | NextAuth handler |
| Create `middleware.ts` | ⬜ | Route protection |
| Build sign-in page | ⬜ | Animated glass card |
| Build sign-up page | ⬜ | Optional |
| Add SessionProvider wrapper | ⬜ | Root layout |

### Files to Create

- [ ] `src/lib/auth.ts`
- [ ] `src/app/api/auth/[...nextauth]/route.ts`
- [ ] `src/middleware.ts`
- [ ] `src/app/(auth)/sign-in/page.tsx`
- [ ] `src/components/providers/SessionProvider.tsx`

---

## Milestone 3: Dashboard Shell (Day 2)

### Layout Components

| Todo | Status | Notes |
|------|--------|-------|
| Build Sidebar component | ⬜ | Flat nav with sections |
| Build Header component | ⬜ | Dynamic titles |
| Create DashboardLayout | ⬜ | Fixed sidebar + flex content |
| Add theme toggle | ⬜ | Sun/Moon button |
| Setup dashboard route group | ⬜ | `(dashboard)/layout.tsx` |

### Files to Create

- [ ] `src/components/Sidebar.tsx`
- [ ] `src/components/Header.tsx`
- [ ] `src/app/(dashboard)/layout.tsx`

### Navigation Items (Customize)

```typescript
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  // Add your sections...
];
```

---

## Milestone 4: Dashboard Home (Day 2-3)

### Home Page Components

| Todo | Status | Notes |
|------|--------|-------|
| Create StatCard component | ⬜ | Icon + value + trend |
| Create StatsGrid component | ⬜ | 4-column responsive |
| Create ActivityFeed component | ⬜ | Recent actions |
| Create QuickActions component | ⬜ | Common shortcuts |
| Build dashboard page | ⬜ | Compose all components |

### Files to Create

- [ ] `src/components/dashboard/StatCard.tsx`
- [ ] `src/components/dashboard/StatsGrid.tsx`
- [ ] `src/components/dashboard/ActivityFeed.tsx`
- [ ] `src/components/dashboard/QuickActions.tsx`
- [ ] `src/app/(dashboard)/page.tsx`

---

## Milestone 5: Kanban Board (Day 3)

### Task Board Components

| Todo | Status | Notes |
|------|--------|-------|
| Install @hello-pangea/dnd | ⬜ | Drag-drop library |
| Create Board component | ⬜ | DragDropContext |
| Create TaskColumn component | ⬜ | Droppable + colored |
| Create TaskCard component | ⬜ | Draggable card |
| Create NewTaskModal | ⬜ | Form modal |
| Build tasks page | ⬜ | Full kanban |

### Files to Create

- [ ] `src/components/TaskBoard/Board.tsx`
- [ ] `src/components/TaskBoard/TaskColumn.tsx`
- [ ] `src/components/TaskBoard/TaskCard.tsx`
- [ ] `src/components/TaskBoard/NewTaskModal.tsx`
- [ ] `src/app/(dashboard)/tasks/page.tsx`

### Column Configuration

```typescript
const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-white/[0.02]' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500/[0.04]' },
  { id: 'review', title: 'Review', color: 'bg-amber-500/[0.04]' },
  { id: 'done', title: 'Done', color: 'bg-[#20ED8A]/[0.04]' },
];
```

---

## Milestone 6: Data Tables (Day 3-4)

### Table Components

| Todo | Status | Notes |
|------|--------|-------|
| Create DataTable component | ⬜ | Generic table |
| Add search functionality | ⬜ | Filter by columns |
| Add sort functionality | ⬜ | Click headers |
| Add filter dropdowns | ⬜ | Status, type, etc |
| Create empty state | ⬜ | No results UI |
| Build first list page | ⬜ | Your main entity |

### Files to Create

- [ ] `src/components/DataTable.tsx`
- [ ] `src/components/EmptyState.tsx`
- [ ] `src/app/(dashboard)/[entity]/page.tsx`

---

## Milestone 7: Forms & Modals (Day 4)

### Form Components

| Todo | Status | Notes |
|------|--------|-------|
| Create Modal component | ⬜ | Animated + accessible |
| Create ConfirmDialog | ⬜ | Delete confirmation |
| Define input styles | ⬜ | Consistent form inputs |
| Create form validation pattern | ⬜ | Error handling |
| Build create/edit forms | ⬜ | Your entities |

### Files to Create

- [ ] `src/components/Modal.tsx`
- [ ] `src/components/ConfirmDialog.tsx`
- [ ] `src/app/(dashboard)/[entity]/new/page.tsx`
- [ ] `src/app/(dashboard)/[entity]/[id]/page.tsx`

---

## Milestone 8: API Routes (Day 4)

### CRUD Endpoints

| Todo | Status | Notes |
|------|--------|-------|
| Setup database connection | ⬜ | Neon/Supabase |
| Create db helper functions | ⬜ | CRUD operations |
| Build list endpoint (GET) | ⬜ | `/api/[entity]` |
| Build create endpoint (POST) | ⬜ | `/api/[entity]` |
| Build single item (GET) | ⬜ | `/api/[entity]/[id]` |
| Build update (PUT) | ⬜ | `/api/[entity]/[id]` |
| Build delete (DELETE) | ⬜ | `/api/[entity]/[id]` |

### Files to Create

- [ ] `src/lib/db.ts`
- [ ] `src/app/api/[entity]/route.ts`
- [ ] `src/app/api/[entity]/[id]/route.ts`

---

## Milestone 9: Settings (Day 5)

### Settings Pages

| Todo | Status | Notes |
|------|--------|-------|
| Create tabbed settings layout | ⬜ | Sidebar tabs |
| Build profile settings | ⬜ | Name, email |
| Build security settings | ⬜ | Password, 2FA |
| Build notification preferences | ⬜ | Email toggles |
| Build team management | ⬜ | Invite users |

### Files to Create

- [ ] `src/app/(dashboard)/settings/page.tsx`
- [ ] `src/components/settings/ProfileSettings.tsx`
- [ ] `src/components/settings/SecuritySettings.tsx`

---

## Milestone 10: Polish (Day 5)

### Final Touches

| Todo | Status | Notes |
|------|--------|-------|
| Add loading states | ⬜ | Skeletons + spinners |
| Add error boundaries | ⬜ | Graceful failures |
| Test responsive design | ⬜ | Mobile, tablet |
| Test light/dark mode | ⬜ | All pages |
| Add page transitions | ⬜ | Route animations |
| Performance audit | ⬜ | Lighthouse check |

### Files to Create

- [ ] `src/components/Skeleton.tsx`
- [ ] `src/components/Spinner.tsx`
- [ ] `src/app/error.tsx`
- [ ] `src/app/loading.tsx`

---

## Optional Features

Add these based on project requirements:

### CMS/Blog Management
- [ ] Blog list page
- [ ] Rich text editor (TipTap)
- [ ] Media library
- [ ] Post preview

### Real-time Updates
- [ ] Supabase realtime subscriptions
- [ ] Live progress indicators
- [ ] Activity notifications

### AI Integration
- [ ] AI context provider
- [ ] Chat widget
- [ ] AI analysis features

### Feature Gating
- [ ] Plan-based access control
- [ ] Upgrade modals
- [ ] Blurred previews

---

## Quick Start Commands

```bash
# Create new project
npx create-next-app@latest my-admin --typescript --tailwind --app --src-dir

# Install dependencies
cd my-admin
pnpm add next-auth @hello-pangea/dnd framer-motion lucide-react date-fns

# Start development
pnpm dev
```

---

## Copy-Paste Checklist

When building, copy these from [UNIVERSAL-ADMIN-TEMPLATE.md](UNIVERSAL-ADMIN-TEMPLATE.md):

1. ⬜ `globals.css` theme variables
2. ⬜ `theme-context.tsx` provider
3. ⬜ `Sidebar.tsx` navigation
4. ⬜ `Header.tsx` with dynamic titles
5. ⬜ `Modal.tsx` animated modal
6. ⬜ `StatCard.tsx` metrics card
7. ⬜ `DataTable.tsx` searchable table
8. ⬜ `TaskBoard/` kanban components
9. ⬜ API route patterns
10. ⬜ Form input styles

---

## Brand Customization

Before starting, define:

```typescript
// Brand colors
const colors = {
  accent: '#20ED8A',      // Primary action color
  background: '#000000',   // Page background
  card: '#0a0f1a',        // Card background
};

// Font
const font = 'Poppins';    // Or your brand font

// Corners
const corners = 'sharp';   // 'sharp' or 'rounded'
```

---

**Reference**: [UNIVERSAL-ADMIN-TEMPLATE.md](UNIVERSAL-ADMIN-TEMPLATE.md) for full code snippets

*Use this PLANX to track progress on any new admin dashboard build*
