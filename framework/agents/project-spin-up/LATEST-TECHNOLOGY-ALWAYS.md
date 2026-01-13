# Latest Technology Always

## 🔥 Core Principle

**EVERY new project MUST start with the latest stable versions of ALL packages.**

This is **NON-NEGOTIABLE** and built into the Project Spin-Up Agent.

---

## Why This Matters

### Starting with outdated tech is malpractice:

- ❌ Projects are dead on arrival
- ❌ Missing critical performance improvements
- ❌ Security vulnerabilities
- ❌ No access to latest features
- ❌ Technical debt from day one
- ❌ Harder to hire developers (nobody wants old tech)
- ❌ Higher maintenance costs
- ❌ Poor developer experience

### Starting with latest tech wins:

- ✅ Best performance out of the box
- ✅ Most secure
- ✅ Best developer experience
- ✅ Future-proof
- ✅ Easier to hire for
- ✅ Lower maintenance costs
- ✅ Access to latest features
- ✅ Community support is current

---

## The TWIN Lesson

**Before upgrade (January 2026):**
- Next.js 14.1.0 (released January 2024)
- React 18.3.1
- Tailwind 3.x
- TypeScript 5.3.0

**2 years behind** on Next.js, **1 major version behind** on React, Tailwind, and TypeScript.

**Cost**: 
- 50+ packages to upgrade
- Testing all breaking changes
- Fixing compatibility issues
- ~4 hours of work

**Solution**: 
Start with latest. Always.

---

## Technology Selection Rules

### Rule 1: Check Latest Versions FIRST

Before generating ANY project, check:

```bash
npm view next version          # Latest Next.js
npm view react version         # Latest React
npm view typescript version    # Latest TypeScript
npm view tailwindcss version   # Latest Tailwind
```

Use these EXACT versions in `package.json`.

---

### Rule 2: Core Stack Requirements

#### Next.js Projects

**Minimum requirements:**
- Next.js: **Latest stable** (currently 16.x)
- React: **Latest stable** (currently 19.x)
- TypeScript: **Latest stable** (currently 5.9.x)
- Tailwind CSS: **Latest** (currently 4.x)

**NO EXCEPTIONS.**

---

### Rule 3: Library Selection Priority

When choosing a library, evaluate in this order:

1. **Does it support latest React & Next.js?**
   - If NO → Don't use it, find alternative
   - If YES → Continue

2. **Is it actively maintained?**
   - Last update < 3 months → ✅ Good
   - Last update 3-6 months → ⚠️ Caution
   - Last update > 6 months → ❌ Don't use

3. **Does it have TypeScript support?**
   - If NO → Don't use it
   - If YES → Continue

4. **Is it production-proven?**
   - 10k+ weekly downloads → ✅ Good
   - 1k-10k downloads → ⚠️ Evaluate carefully
   - < 1k downloads → ❌ Too risky

---

### Rule 4: Breaking Changes Are Worth It

**Don't avoid upgrades because of breaking changes.**

Why:
- You're starting fresh (no legacy code)
- Latest = best performance
- Latest = most secure
- Latest = best DX
- Community support is for latest versions

**Embrace breaking changes. They come with improvements.**

---

## Package.json Templates

### Next.js 16 + React 19 (Current)

```json
{
  "name": "your-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^16.1.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "tailwindcss": "^4.1.18",
    "framer-motion": "^12.24.7",
    "lucide-react": "^0.562.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/node": "^25.0.3",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.24.1",
    "eslint-config-next": "^16.1.1",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.23"
  }
}
```

---

### Database (Drizzle ORM)

```json
{
  "dependencies": {
    "drizzle-orm": "^0.36.6",
    "postgres": "^3.5.3"
  },
  "devDependencies": {
    "drizzle-kit": "^0.29.1",
    "tsx": "^4.19.2"
  }
}
```

---

### Authentication (NextAuth)

```json
{
  "dependencies": {
    "next-auth": "^4.24.13",
    "bcryptjs": "^3.0.3"
  },
  "devDependencies": {
    "@types/bcryptjs": "^3.0.0"
  }
}
```

---

### UI Libraries

```json
{
  "dependencies": {
    "@tiptap/react": "^3.15.1",
    "@tiptap/starter-kit": "^3.15.1",
    "@hello-pangea/dnd": "^18.0.1",
    "@tanstack/react-table": "^8.21.3",
    "date-fns": "^4.1.0"
  }
}
```

---

## Version Check Script

Add this to your spin-up workflow:

```bash
#!/bin/bash
# check-latest-versions.sh

echo "🔍 Checking latest versions..."
echo ""
echo "Next.js:     $(npm view next version)"
echo "React:       $(npm view react version)"
echo "TypeScript:  $(npm view typescript version)"
echo "Tailwind:    $(npm view tailwindcss version)"
echo "Drizzle ORM: $(npm view drizzle-orm version)"
echo ""
echo "Use these versions in your package.json ☝️"
```

Run BEFORE generating any project.

---

## Outdated Package Detection

### Before Project Generation

```bash
# Check if a package is outdated
npm view [package]@latest version
npm view [package] time.modified
```

If `time.modified` is > 3 months ago, be cautious.

---

### After Project Generation

```bash
# Check for outdated packages
pnpm outdated

# Update to latest
pnpm update --latest
```

Run monthly.

---

## Common Pitfalls

### ❌ Don't Do This:

```json
{
  "dependencies": {
    "next": "14.1.0",        // ❌ Outdated
    "react": "^18.0.0",      // ❌ Old major version
    "typescript": "~5.3.0"   // ❌ Pinned old version
  }
}
```

### ✅ Do This:

```json
{
  "dependencies": {
    "next": "^16.1.1",       // ✅ Latest stable
    "react": "^19.2.3",      // ✅ Latest stable
    "typescript": "^5.9.3"   // ✅ Latest stable
  }
}
```

---

## Exceptions (Rare)

### When you CAN use older versions:

1. **Legacy integration requirements**
   - "Must integrate with system running Next.js 14"
   - Document WHY in README
   - Plan upgrade path

2. **Critical library incompatibility**
   - "Library X only supports React 18"
   - Find alternative library first
   - Only use if NO alternative exists

3. **Enterprise constraints**
   - "Organization policy requires LTS only"
   - Push back on this policy
   - Document technical debt

**These should be EXTREMELY RARE (<1% of projects).**

---

## Enforcement

### In Project Spin-Up Agent

The agent MUST:

1. Check latest versions before generating
2. Use latest stable in all templates
3. Warn if user requests older version
4. Refuse to generate with versions >6 months old

### In Code Reviews

Reject PRs that:
- Add outdated dependencies
- Pin to old versions without justification
- Ignore available security updates

---

## Update Cadence

### For New Projects
- ✅ **Always latest** at project start

### For Existing Projects
- ✅ **Monthly**: Check for updates
- ✅ **Quarterly**: Major version upgrades
- ✅ **Immediately**: Security patches

---

## Tech Radar

### As of January 2026

**Current Latest Versions:**
- Next.js: **16.1.1** (Turbopack stable)
- React: **19.2.3** (Latest stable)
- TypeScript: **5.9.3**
- Tailwind CSS: **4.1.18** (Oxide engine)
- ESLint: **9.24.1** (Flat config)
- Drizzle ORM: **0.36.6**
- Tiptap: **3.15.1**

**Update this section when versions change!**

---

## The Golden Rule

**"If you wouldn't want to work on it yourself because the tech is old, don't build it that way."**

Treat every project like it's going to be maintained for 5 years. Because it might be.

---

## Summary

1. ✅ **Check latest versions** before every project
2. ✅ **Use latest stable** in all new projects
3. ✅ **No exceptions** unless documented
4. ✅ **Update monthly** for existing projects
5. ✅ **Breaking changes are worth it**

**Starting with latest tech is not optional. It's professional.**

---

**This is now a core principle of the Project Spin-Up Agent and all new TWIN projects.** 🔥






