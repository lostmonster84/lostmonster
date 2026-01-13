# Critical Project Spin-Up Checklist

## ⚠️ DO NOT SKIP THESE

This checklist contains critical items that must NEVER be forgotten when spinning up a new project.

---

## 🔍 **PHASE 0: PRE-BUILD ANALYSIS (MANDATORY)**

**NEVER BUILD ANYTHING WITHOUT THIS**

### ✅ Required BEFORE Any Code

- [ ] **Pre-Build Analysis completed** ([PRE-BUILD-ANALYSIS.md](./PRE-BUILD-ANALYSIS.md))
- [ ] **Score calculated**: Must be ≥ 100/130
- [ ] **All gaps documented** and addressed
- [ ] **User flows validated** end-to-end
- [ ] **Architecture stress-tested**
- [ ] **PRD approved** by stakeholder

**If score < 100**: Do NOT proceed to building. Fix gaps first.

**Why**: The TWIN platform was built without proper analysis. Result: Forgot navigation (header/footer), wasted time retrofitting. This NEVER happens again.

---

## 🔥 **LATEST TECHNOLOGY ALWAYS (NON-NEGOTIABLE)**

### ✅ Version Requirements

**EVERY PROJECT MUST START WITH LATEST STABLE VERSIONS**

#### Before Generating ANY Code:

- [ ] **Check latest versions** of all packages
- [ ] **Next.js**: Use latest stable (currently 15.x)
- [ ] **React**: Use latest stable (currently 19.x)
- [ ] **TypeScript**: Use latest stable (currently 5.x)
- [ ] **Tailwind CSS**: Use latest (currently 4.x)
- [ ] **All UI libraries**: Latest versions
- [ ] **All database libraries**: Latest versions
- [ ] **All dev dependencies**: Latest versions

#### Version Check Commands:

```bash
# Before generating project:
npm view next version          # Get latest Next.js
npm view react version         # Get latest React
npm view typescript version    # Get latest TypeScript
npm view tailwindcss version   # Get latest Tailwind

# Use these exact versions in package.json
```

#### NO Outdated Packages:

- ❌ **NEVER** use Next.js 13.x or 14.x (use 15.x+)
- ❌ **NEVER** use React 18.x (use 19.x)
- ❌ **NEVER** use TypeScript 5.3 or older (use latest 5.x)
- ❌ **NEVER** use Tailwind 3.x (use 4.x)
- ❌ **NEVER** use ESLint 8.x (use 9.x with flat config)

#### Why This Matters:

**Starting with outdated tech is malpractice:**
- Projects are dead on arrival
- Missing performance improvements
- Security vulnerabilities
- No access to latest features
- Technical debt from day one
- Harder to hire developers (nobody wants to work on old tech)

#### The TWIN Lesson:

Initially built on Next.js 14.1.0 (January 2024 release).  
By January 2026, this was **2 major versions behind**.  

**Result**: Had to upgrade 50+ packages, test everything, fix breaking changes.

**Solution**: Start with latest. Always. No exceptions.

#### Breaking Changes Are Worth It:

- ✅ **Latest = Best Performance**
- ✅ **Latest = Most Secure**
- ✅ **Latest = Best DX**
- ✅ **Latest = Future-Proof**
- ✅ **Latest = Easier Hiring**

**If a library doesn't support latest React/Next.js, don't use it. Find an alternative.**

#### Technology Selection Priority:

1. **Must support latest React & Next.js**
2. **Must be actively maintained** (updated in last 3 months)
3. **Must have TypeScript support**
4. **Must be production-proven**

#### Package.json Template:

```json
{
  "dependencies": {
    "next": "^16.1.1",          // ✅ Latest
    "react": "^19.2.3",         // ✅ Latest
    "react-dom": "^19.2.3"      // ✅ Latest
  },
  "devDependencies": {
    "typescript": "^5.9.3",     // ✅ Latest
    "tailwindcss": "^4.1.18",   // ✅ Latest
    "eslint": "^9.24.1"         // ✅ Latest (flat config)
  }
}
```

#### Update Check (Monthly):

Projects should check for updates monthly:

```bash
pnpm outdated
pnpm update --latest
```

**Rule**: If a package is >3 months behind latest, upgrade immediately.

---

## 🔐 **AUTHENTICATION (NON-NEGOTIABLE)**

### ✅ Our Auth Stack

**ALWAYS USE ONE OF THESE:**

- [ ] **Custom Auth (bcrypt + cookies)** - For admin dashboards, internal tools
- [ ] **Supabase Auth** - For consumer apps, magic links, social login

**NEVER USE THESE:**

- ❌ **Clerk** - We build our own auth. No exceptions.
- ❌ **NextAuth/Auth.js** - Adds complexity we don't need
- ❌ **Lucia** - Same as above
- ❌ **Auth0** - Too expensive, vendor lock-in
- ❌ **Firebase Auth** - Vendor lock-in

**Why Custom Auth:**
1. Full control - no vendor lock-in
2. Cheaper - no per-MAU costs (Clerk charges per user!)
3. Simpler - just bcrypt + cookies, ~50 lines of code
4. Flexible - customize anything
5. Reliable - no third-party outages

**Custom Auth Pattern (What We Use):**
```typescript
// Simple, effective, ours
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function login(email: string, password: string) {
  const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const cookieStore = await cookies();
  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return user;
}
```

---

## 🗃️ **DATABASE & QUERIES (NON-NEGOTIABLE)**

### ✅ Our Database Stack

**ALWAYS USE:**

- [ ] **PostgreSQL** - via Supabase, Neon, or Vercel Postgres
- [ ] **Raw SQL or Supabase Client** - for queries

**ORM IS OPTIONAL, NOT REQUIRED:**

- ⚪ **Drizzle** - OK for schema definition + types, but NOT required
- ⚪ **Prisma** - OK if you prefer it, but NOT required
- ✅ **Raw SQL** - Perfectly fine, often simpler

**NEVER REQUIRE an ORM** - Direct SQL queries work great:
```typescript
// This is fine. No ORM needed.
const result = await sql`
  SELECT * FROM users
  WHERE organization_id = ${orgId}
  ORDER BY created_at DESC
`;
```

**Why Raw SQL:**
1. No ORM bloat or learning curve
2. Full SQL power (complex queries, CTEs, window functions)
3. Better performance (no ORM overhead)
4. Easier debugging (just SQL)
5. Type your own interfaces - simple and explicit

---

## 🎨 Frontend/Website Projects

### ✅ Navigation & Layout (CRITICAL)

**Always include BEFORE individual pages:**

- [ ] **Header/Navigation component**
  - Logo
  - Navigation links
  - Mobile menu
  - Sticky/fixed positioning

- [ ] **Footer component**
  - Site links
  - Legal links (Privacy, Terms)
  - Copyright
  - Contact/social

- [ ] **Root Layout**
  - Include Header
  - Include Footer
  - Global styles
  - Font loading

**Why**: Pages without navigation are useless. Users can't move between pages. This is a fundamental requirement, not an enhancement.

---

### ✅ Core Page Structure

**Standard website pages (in order of importance):**

1. **Homepage** - First impression
2. **Navigation** - Header & Footer (DO THIS FIRST)
3. **About/What We Do** - Explain the business
4. **Contact/Apply** - Lead generation
5. **Legal** - Privacy, Terms (required)

---

### ✅ Component Hierarchy

**Build in this order:**

```
1. Layout Components (Header, Footer)
   ↓
2. Shared Components (Button, Card, etc.)
   ↓
3. Page-Specific Components
   ↓
4. Individual Pages
```

**Never** build pages without layout components first.

---

## 🔐 Authentication Projects

### ✅ Protected Routes

- [ ] Middleware configured
- [ ] Public routes defined
- [ ] Protected routes enforced
- [ ] Redirect logic (sign-in → dashboard)
- [ ] Role-based access

---

## 🗄️ Database Projects

### ✅ Schema Completeness

- [ ] All entities defined
- [ ] Relationships mapped
- [ ] Indexes on foreign keys
- [ ] Created/updated timestamps
- [ ] Soft delete fields (if applicable)
- [ ] Audit logging (if needed)

---

## 📱 Multi-App Projects (Monorepo)

### ✅ Each App Needs

- [ ] **Own layout/navigation**
- [ ] Own package.json
- [ ] Own tsconfig.json
- [ ] Own .env.example
- [ ] Own README

**Don't assume**: Apps share layouts. They don't.

---

## 🚀 Pre-Launch Checklist

### ✅ Before Saying "It's Done"

- [ ] **Can users navigate between all pages?**
- [ ] Is there a header on every page?
- [ ] Is there a footer on every page?
- [ ] Do all links work?
- [ ] Does the mobile menu work?
- [ ] Are legal pages created (Privacy, Terms)?
- [ ] Is there a 404 page?
- [ ] Are error states handled?
- [ ] Does the homepage load without errors?
- [ ] Can you complete the primary user flow?

---

## 🎯 Quality Gates

### ✅ Level 1: Functional

- [ ] App runs without errors
- [ ] All routes load
- [ ] Navigation works
- [ ] Forms submit
- [ ] Data persists

### ✅ Level 2: Usable

- [ ] Header & footer present
- [ ] Mobile responsive
- [ ] Links work
- [ ] Clear call-to-actions
- [ ] Loading states

### ✅ Level 3: Professional

- [ ] Polished design
- [ ] Animations smooth
- [ ] Error handling
- [ ] Legal pages
- [ ] SEO basics

**Never deliver Level 1 and call it done.**

---

## 💀 Common Failures

### ❌ What Gets Forgotten

1. **Navigation** (Header/Footer) - MOST COMMON
2. Legal pages (Privacy, Terms)
3. 404 page
4. Mobile menu
5. Loading states
6. Error boundaries
7. SEO meta tags
8. Favicon
9. Social preview images
10. README instructions

---

## 📋 Post-Generation Checklist

After generating a project, verify:

```bash
# Can you navigate?
✓ Header exists
✓ Footer exists
✓ All nav links work
✓ Mobile menu opens/closes

# Does it work?
✓ Dev server starts
✓ No console errors
✓ Pages load
✓ Forms submit
✓ Data persists

# Is it professional?
✓ Design looks finished
✓ Responsive on mobile
✓ Legal pages exist
✓ Error handling works
```

---

## 🔧 Quick Fixes Template

If you forgot navigation:

```tsx
// components/Header.tsx
export function Header() {
  return (
    <header>
      <nav>
        <Logo />
        <NavLinks />
        <MobileMenu />
      </nav>
    </header>
  );
}

// components/Footer.tsx
export function Footer() {
  return (
    <footer>
      <Logo />
      <Links />
      <Legal />
      <Copyright />
    </footer>
  );
}

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

---

## 🎓 Learning

**Why does this happen?**

- Focus on "features" over "structure"
- Build pages in isolation
- Skip layout components
- Don't test user flows
- Assume "navigation is obvious"

**How to prevent:**

1. **Always build layout first**
2. Test navigation immediately
3. Think like a user, not a developer
4. Build the shell before the content
5. Use this checklist

---

## ✅ The Golden Rule

**"If a user can't get from Page A to Page B without typing a URL, you're not done."**

---

**Use this checklist on every project spin-up. No exceptions.**

