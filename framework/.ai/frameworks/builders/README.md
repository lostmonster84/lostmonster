# Builder Frameworks

> **Complete System Generators - Production-Ready Code**

Builder frameworks generate production-ready, multi-layer systems with copy-paste code templates. Unlike planning frameworks (PLANX, CODAX) or quality frameworks (SOPHIA, AIDAX), builders output 2,000+ lines of working code that you implement directly.

**Design Foundation:** All builder frameworks follow **ADMIN-MASTER-REFERENCE.md** - the 770-line universal admin pattern guide that ensures consistency across all dashboards (TWIN, PIXEL, ADMINX, etc.). This means professional design quality, proven interaction patterns, and consistent look-and-feel out of the box.

---

## What Are Builder Frameworks?

**Builder frameworks:**
- Generate complete systems (not just plans or audits)
- Include database schema, API routes, admin UI, and integration layers
- Come with 2,000+ line code templates
- Have PLANX breakdowns (10+ milestones, 5-7 day implementations)
- Output production-ready code you can copy-paste

**Builder frameworks are NOT:**
- Planning tools (use PLANX or CODAX for planning)
- Quality auditors (use SOPHIA or AIDAX for auditing)
- Design explorers (use DEMX for variations)

---

## Available Builder Frameworks

### ADMINX - Super-Admin System Builder
**File:** [ADMINX.md](./ADMINX.md)
**Builds:** Complete user management system with RBAC and audit logging

**🎯 Key Features:**
- **3-tier role hierarchy:** Super Admin → Admin → User (numeric hierarchy: 3 → 2 → 1)
- **Server-side RBAC:** Permission checks in API routes (never trust client)
- **Audit logging:** Comprehensive trail with IP address and user agent
- **Last admin protection:** Prevents system lockout (cannot delete last super_admin)
- **Soft deletes:** Preserves audit trail (status='inactive' instead of DELETE)
- **Delete with Undo:** 3-second countdown pattern with undo button
- **All 9 MVP features:** Dashboard, users CRUD, roles, audit logs, profile, settings

**What it generates:**
- **Database schema:** users table (with role enum) + audit_logs table
- **NextAuth configuration:** JWT with role in token and session
- **Permission middleware:** hasRole, requireRole, canManageUser helpers
- **User CRUD API routes:** GET, POST, PUT, DELETE with RBAC checks
- **Admin UI:** Users list, create/edit/delete modals, role assignment
- **Audit logging system:** createAuditLog utility + API endpoints
- **Profile and settings pages:** Self-service editing + system configuration
- **Security patterns:** Bcrypt hashing, server-side validation, last admin checks

**When to use:**
- Building super-admin dashboards
- Multi-user SaaS applications
- Need role-based access control (RBAC)
- Compliance requirements (audit trails)
- Managing **WHO** can access the system

**Trigger:** `ADMINX`

**Output:**
- 800+ line framework definition
- 2,500+ line code template (production-ready)
- 10-milestone PLANX breakdown (5-7 days)

---

### CRUDX - Content Management System Builder
**File:** [CRUDX.md](./CRUDX.md)
**Builds:** Complete content management system with 6 layers

**🎯 Key Features:**
- **6-layer architecture:** Database → Types → API → Admin UI → Components → Integration
- **Transform layer:** Automatic snake_case (DB) ↔ camelCase (frontend) conversion
- **Custom admin UI:** Purpose-built admin pages (never Sanity Studio)
- **Full CRUD operations:** Create, Read, Update, Delete with validation
- **Type-safe:** End-to-end TypeScript types from DB to frontend
- **Reusable components:** DataTable, forms, modals, status badges
- **Complete integration:** Navigation links, preview modes, filtering, sorting

**What it generates:**
- **Database layer:** PostgreSQL schema with Drizzle ORM (snake_case)
- **Types layer:** TypeScript interfaces for all entities (camelCase)
- **API layer:** REST endpoints with transform middleware
- **Admin UI layer:** Custom admin pages for content management
- **Components layer:** Reusable DataTable, forms, modals
- **Integration layer:** Nav links, status badges, filtering UI

**When to use:**
- Content that will change frequently
- Dynamic collections (blog posts, products, testimonials)
- User says "add [content] to page"
- User says "we need to manage [resource]"
- Managing **WHAT** exists in the system

**Trigger:** `CRUDX` or "Add [content] to page"

**Output:**
- Complete 6-layer implementation (DB → UI)
- Custom admin UI with full CRUD
- Transform layer for case conversion

---

## Builder vs Other Framework Types

### Comparison Table

| Type | Purpose | Examples | Output |
|------|---------|----------|--------|
| **Meta** | Orchestrates all frameworks | APEX | Complete system |
| **Builder** | Generates complete systems | ADMINX, CRUDX | 2,500+ lines code |
| **Planning** | Creates execution blueprints | PLANX, CODAX | Milestones + todos |
| **Quality** | Audits and scores | SOPHIA, AIDAX, PIXLX | Score + fixes |
| **Design** | Visual exploration | DEMX, TUCHX, DESKX | Variations + patterns |
| **Dev Tools** | Development utilities | RAPIX, CONEX, MAPX | Helpers + analysis |

### When to Use Builders

```
Use ADMINX when:
✅ Building super-admin dashboards
✅ Need user management with RBAC
✅ Multi-user SaaS applications
✅ Compliance/audit requirements

Use CRUDX when:
✅ Content needs management (CRUD operations)
✅ Dynamic collections
✅ Content will change frequently
✅ User says "add [content] to page"

Skip builders when:
❌ Just planning (use PLANX)
❌ Just auditing quality (use SOPHIA)
❌ Hardcoded/static content
❌ Simple one-time changes
```

---

## Common Builder Combinations

### 🔥 ADMINX + CRUDX (Most Common - Complete SaaS)
**Use case:** Complete SaaS application with user AND content management
**Why combine:** Most SaaS apps need to manage both WHO can access AND WHAT exists

```
ADMINX: Manages WHO can access
├─ Users with email, password, roles
├─ RBAC: Super Admin → Admin → User
├─ Audit logs (who did what, when)
└─ Profile and settings

CRUDX: Manages WHAT exists
├─ Content (blog posts, products, etc.)
├─ Full CRUD operations
├─ Custom admin UI for content
└─ Type-safe API layer

Result: Complete SaaS Platform
├─ User management with roles
├─ Content management
├─ Full audit trail
└─ Production-ready code
```

**Real-world examples:**

**Blog Platform:**
- ADMINX: User accounts (super_admin can manage editors, editors can manage viewers)
- CRUDX: Blog posts, comments, categories, tags
- Result: Multi-author blog with role-based publishing

**SaaS Dashboard:**
- ADMINX: Organization users (super_admin, admin, member roles)
- CRUDX: Projects, tasks, documents, files
- Result: Complete project management platform

**E-commerce Admin:**
- ADMINX: Store staff (super_admin, manager, staff roles)
- CRUDX: Products, orders, customers, inventory
- Result: Complete store management system

**Implementation order:**
1. **ADMINX first** - Set up user management and auth
2. **Then CRUDX** - Add content management
3. **Combine** - Users create/manage content based on their roles

---

### 🎯 ADMINX + PLANX (Systematic Implementation)
**Use case:** Building super-admin system with zero missed steps
**Why combine:** ADMINX defines WHAT to build, PLANX defines HOW to build it systematically

```
ADMINX: Defines the system
├─ 3-tier role hierarchy
├─ 9 MVP features
├─ Database schema
├─ API patterns
└─ Security requirements

PLANX: Defines the execution
├─ 10 milestones (Day 1-7)
├─ Granular todos per milestone
├─ What/Why/How/Acceptance
├─ Dependencies and files
└─ Tracking and checkoffs

Result: Nothing Missed
├─ Complete audit trail
├─ Step-by-step execution
├─ Clear acceptance criteria
└─ Systematic progress
```

**When to use:**
- Complex super-admin implementation
- Team handoffs
- Multi-session work
- Critical where missing a step has consequences

---

### 🎨 ADMINX + DARKX (Dark Mode Admin)
**Use case:** Admin dashboard with dark mode support
**Why combine:** Modern admin dashboards need dark mode

```
ADMINX: User management system
├─ Users list, CRUD, roles
├─ Audit logs page
├─ Profile and settings
└─ Dashboard home

DARKX: Dark mode theming
├─ Theme toggle (light/dark)
├─ Theme context provider
├─ Dark mode color palette
└─ Persistent theme preference

Result: Modern Admin Dashboard
├─ Full user management
├─ Smooth dark mode toggle
├─ Consistent theming
└─ Professional appearance
```

---

### 🔍 ADMINX + SOPHIA (Quality-Audited Admin)
**Use case:** High-quality admin interface with verified UX
**Why combine:** Ensure admin dashboard meets quality standards

```
ADMINX: Build admin dashboard
├─ Users list with DataTable
├─ Create/edit/delete modals
├─ Role assignment UI
└─ Audit logs page

SOPHIA: Audit admin UX quality
├─ Typography (0-15): Font sizing, hierarchy
├─ Spacing (0-15): Padding, margins
├─ Touch Targets (0-10): Button sizes
├─ Information Density (0-15): Content organization
├─ Visual Hierarchy (0-15): Emphasis, color
├─ Sophistication (0-10): Design polish
├─ Consistency (0-10): Pattern reuse
└─ Accessibility (0-10): WCAG compliance

Result: High-Quality Admin Interface (85+ score)
├─ User management that works
├─ Professional design quality
├─ Consistent patterns
└─ Accessible to all users
```

**Process:**
1. Build with ADMINX
2. Audit with SOPHIA (target 85+)
3. Fix violations
4. Re-audit until passing

---

### 📊 CRUDX + PLANX (Systematic Content System)
**Use case:** Building content management with tracking
**Why combine:** CRUDX defines the 6-layer stack, PLANX breaks it into milestones

```
CRUDX: Defines the stack
├─ Layer 1: Database schema
├─ Layer 2: Type definitions
├─ Layer 3: API routes
├─ Layer 4: Admin UI
├─ Layer 5: Components
└─ Layer 6: Integration

PLANX: Breaks down execution
├─ Milestone 1: Database + Types
├─ Milestone 2: API Layer
├─ Milestone 3: Admin UI
├─ Milestone 4: Components
├─ Milestone 5: Integration
└─ Milestone 6: Testing + Polish

Result: Complete Content Management
├─ All 6 layers built
├─ Nothing missed
├─ Clear progress tracking
└─ Documented decisions
```

---

## Design System & Architecture

### ADMINX Follows Proven Patterns
**ADMINX extends ADMIN-MASTER-REFERENCE.md** - the 770-line universal admin pattern guide used across all dashboards (TWIN, PIXEL, and others).

**Design Foundation (from ADMIN-MASTER-REFERENCE.md):**

```
Universal Base Patterns:
├─ Color System
│  ├─ Semantic variables (--color-bg, --color-text, etc.)
│  ├─ Accent colors (primary, success, danger, warning)
│  └─ Light/dark mode support
│
├─ Typography
│  ├─ Poppins font family
│  ├─ Font scales (text-xs to text-4xl)
│  └─ Consistent hierarchy
│
├─ Component Patterns
│  ├─ Modal component (with overlay, close button)
│  ├─ ConfirmDialog component (with actions)
│  ├─ DataTable component (sortable, filterable)
│  ├─ Form inputs (text, select, textarea)
│  └─ Button variants (primary, secondary, danger)
│
├─ Interactions
│  ├─ Delete with Undo (3-second countdown + CountdownRing)
│  ├─ Loading states (skeletons, spinners)
│  ├─ Toast notifications (success, error, info)
│  └─ Hover states (smooth transitions)
│
├─ Layout
│  ├─ Sidebar navigation (collapsible)
│  ├─ Header with user menu
│  ├─ Glass morphism effects (backdrop blur)
│  └─ Card-based content layout
│
└─ Theme Context
   ├─ ThemeProvider for light/dark toggle
   ├─ Persistent theme preference
   └─ System preference detection
```

**ADMINX Extends With:**
- **User management UI** using base Modal and DataTable
- **Role badges** with color coding (super_admin: purple, admin: blue, user: gray)
- **Audit logs page** using base DataTable with timestamps
- **Permission checks UI** with clear visual feedback
- **Delete with Undo** for user deletion (uses CountdownRing from base)

**Animation Patterns (from ADMIN-MASTER-REFERENCE.md):**
```typescript
// Framer Motion easing (used throughout)
const easing = [0.6, -0.05, 0.01, 0.99];

// Modal animations
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0, y: 20 }
transition: { ease: easing }

// Delete countdown ring
const radius = 18;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = circumference * (1 - timeLeft / duration);
```

**API Route Patterns (from ADMIN-MASTER-REFERENCE.md):**
```typescript
// Standard auth check
const session = await getServerSession(authOptions);
if (!session?.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Permission check (ADMINX extends this)
const permissionError = requireRole(session, 'admin');
if (permissionError) return permissionError;

// Error handling
try {
  // Operation
} catch (error) {
  console.error('[API Route Error]', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

### Consistency Across Dashboards

**TWIN Dashboard (Tailwind Components):**
- Uses ADMIN-MASTER-REFERENCE.md color system
- Modal pattern for component editing
- DataTable for component listing
- Delete with Undo for component deletion

**ADMINX Dashboard (User Management):**
- Uses ADMIN-MASTER-REFERENCE.md color system
- Modal pattern for user editing
- DataTable for user listing
- Delete with Undo for user deletion
- **PLUS:** RBAC checks, audit logging, role hierarchy

**Result:** Same look and feel, different purpose
- TWIN manages components
- ADMINX manages users
- Both use proven patterns
- Both professional quality

---

## Directory Structure

```
framework/
├── .ai/frameworks/
│   ├── builders/              # Builder frameworks
│   │   ├── ADMINX.md          # User management system
│   │   ├── CRUDX.md           # Content management system
│   │   └── README.md          # This file
│   ├── APEX.md                # Meta-framework
│   ├── PLANX.md               # Planning frameworks
│   ├── SOPHIA.md              # Quality frameworks
│   └── ...
└── templates/
    ├── builders/              # Builder templates
    │   ├── ADMINX-TEMPLATE.md # 2,500+ lines
    │   ├── ADMINX-PLANX.md    # 10 milestones
    │   └── ...
    └── ...
```

---

## How Builders Work

### 1. Trigger the Framework
```
ADMINX
```
or
```
CRUDX
```

### 2. Framework Generates
- Database schema (SQL)
- Type definitions (TypeScript)
- API routes (Next.js)
- Admin UI (React components)
- Integration patterns

### 3. You Implement
- Copy-paste from template
- Customize to your project
- Follow PLANX breakdown for systematic implementation

### 4. Result
- Production-ready system
- 5-7 days from start to finish
- All layers complete (DB → API → UI)

---

## Builder Framework Anatomy

Every builder framework includes:

### 1. Framework Definition (.ai/frameworks/builders/[NAME].md)
- What the framework builds
- When to use it vs alternatives
- The architecture and patterns
- Security considerations
- Integration with other frameworks
- Anti-patterns to avoid

**Size:** ~800 lines

### 2. Code Template (templates/builders/[NAME]-TEMPLATE.md)
- Production-ready, copy-paste code
- Database schemas
- API routes with validation
- UI components
- Integration patterns
- Security patterns

**Size:** ~2,500 lines

### 3. PLANX Breakdown (templates/builders/[NAME]-PLANX.md)
- 10 milestones
- Granular todos per milestone
- What/Why/How/Acceptance criteria
- Dependencies
- Files to create

**Size:** ~400 lines

---

## Best Practices

1. **Use builders for systems, not features**
   - ✅ "Build user management system" → ADMINX
   - ✅ "Build content management for blog" → CRUDX
   - ❌ "Add a login button" → Just code it

2. **Combine builders for complete apps**
   - Most SaaS needs ADMINX + CRUDX
   - ADMINX = WHO can access
   - CRUDX = WHAT exists

3. **Follow the PLANX breakdown**
   - Builders include systematic implementation guides
   - Don't skip milestones
   - Check off todos as you go

4. **Customize, don't copy blindly**
   - Templates are starting points
   - Adapt to your project structure
   - Keep security patterns intact

5. **Use with PLANX for complex projects**
   - Builder defines WHAT to build
   - PLANX defines HOW to build it systematically
   - Combine for exhaustive tracking

---

## Adding New Builder Frameworks

To add a new builder framework:

1. **Identify the system type**
   - Must generate complete multi-layer systems
   - Must include 2,000+ lines of code
   - Must have clear use cases

2. **Create 3 files:**
   ```
   .ai/frameworks/builders/[NAME].md      # Definition (~800 lines)
   templates/builders/[NAME]-TEMPLATE.md  # Code (~2,500 lines)
   templates/builders/[NAME]-PLANX.md     # Breakdown (~400 lines)
   ```

3. **Follow the pattern:**
   - Study ADMINX.md and CRUDX.md structure
   - Include security patterns
   - Provide complete, working code
   - Create systematic PLANX breakdown

4. **Update FRAMEWORK-MAP.md:**
   - Add to Quick Summary table
   - Add "When to Use [NAME]" section
   - Add integration patterns
   - Update framework count

---

## Related Documentation

### Framework Documentation
- **[FRAMEWORK-MAP.md](../FRAMEWORK-MAP.md)** - Complete framework reference
- **[PLANX.md](../PLANX.md)** - Execution blueprint framework
- **[APEX.md](../APEX.md)** - Meta-framework orchestrator

### Design System & Setup Guides
- **[ADMIN-MASTER-REFERENCE.md](../../docs/ADMIN-MASTER-REFERENCE.md)** ⭐ **PRIMARY REFERENCE** - Universal admin patterns (770 lines)
  - Color system, typography, component patterns
  - Delete with Undo pattern
  - Modal/ConfirmDialog components
  - Theme context (light/dark mode)
  - API route patterns
  - Auth helpers
- **[COMPLETE-SETUP-GUIDE.md](../../docs/COMPLETE-SETUP-GUIDE.md)** - Framework ecosystem documentation (78 files)

### Example Dashboards Built With These Patterns
- **TWIN Dashboard** - Tailwind component management (uses ADMIN-MASTER-REFERENCE.md)
- **PIXEL Dashboard** - Design system tokens (uses ADMIN-MASTER-REFERENCE.md)
- **ADMINX Dashboard** - User management (extends ADMIN-MASTER-REFERENCE.md)

**Consistency Guarantee:** All dashboards share the same design DNA - professional quality, proven patterns, consistent UX.

---

**Last Updated:** 2026-01-15
**Builder Count:** 2 (ADMINX, CRUDX)
**Status:** Production-ready
**Design System:** ADMIN-MASTER-REFERENCE.md (770 lines, battle-tested)
