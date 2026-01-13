# Project Spin-Up Agent - Dependency Manager

> **Purpose**: Intelligent dependency resolution, version management, and package.json generation with compatibility checking and security scanning.

---

## 📦 DEPENDENCY CATEGORIES

### 1. Core Framework (Always Required)
```json
{
  "next": "14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### 2. Language & Types (TypeScript)
```json
{
  "typescript": "^5.3.0",
  "@types/node": "^20.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

### 3. Styling
```json
{
  // Tailwind
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "tailwindcss-animate": "^1.0.7",
  
  // Or CSS Modules (no extra deps)
  // Or Styled Components
  "styled-components": "^6.1.0",
  "@types/styled-components": "^5.1.26"
}
```

### 4. Database & ORM
```json
{
  // Drizzle
  "drizzle-orm": "^0.29.0",
  "drizzle-kit": "^0.20.0", // devDependency
  
  // Prisma
  "@prisma/client": "^5.8.0",
  "prisma": "^5.8.0", // devDependency
  
  // Database drivers
  "postgres": "^3.4.0", // for Postgres
  "@libsql/client": "^0.4.0", // for Turso
  "pg": "^8.11.0" // alternative Postgres driver
}
```

### 5. Authentication
```json
{
  // Clerk
  "@clerk/nextjs": "^4.29.0",
  
  // Supabase
  "@supabase/ssr": "^0.0.10",
  "@supabase/supabase-js": "^2.39.0",
  
  // NextAuth
  "next-auth": "^4.24.0"
}
```

### 6. Payments
```json
{
  "stripe": "^14.14.0",
  "@stripe/stripe-js": "^2.4.0" // client-side
}
```

### 7. Email
```json
{
  "resend": "^3.0.0",
  "@react-email/components": "^0.0.14",
  "react-email": "^2.0.0"
}
```

### 8. Validation
```json
{
  "zod": "^3.22.0"
}
```

### 9. UI Components
```json
{
  // Shadcn dependencies
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-select": "^2.0.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "lucide-react": "^0.309.0",
  
  // Or MUI
  "@mui/material": "^5.15.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0"
}
```

### 10. State Management
```json
{
  "zustand": "^4.5.0",
  "@tanstack/react-query": "^5.17.0"
}
```

### 11. Dev Tools
```json
{
  "eslint": "^8.56.0",
  "eslint-config-next": "14.1.0",
  "prettier": "^3.2.0",
  "husky": "^8.0.3",
  "lint-staged": "^15.2.0",
  "@types/node": "^20.0.0"
}
```

### 12. Testing
```json
{
  "vitest": "^1.2.0",
  "@testing-library/react": "^14.1.0",
  "@testing-library/jest-dom": "^6.2.0",
  "@playwright/test": "^1.41.0"
}
```

### 13. Monitoring & Analytics
```json
{
  "@sentry/nextjs": "^7.99.0",
  "posthog-js": "^1.99.0",
  "posthog-node": "^3.5.0"
}
```

---

## 🔧 DEPENDENCY RESOLUTION

```typescript
interface DependencySpec {
  name: string;
  version: string;
  required: boolean;
  category: string;
  peerDependencies?: string[];
  conflicts?: string[]; // Packages that conflict
  alternatives?: string[]; // Alternative packages
}

class DependencyManager {
  private dependencies: Map<string, DependencySpec> = new Map();
  private devDependencies: Map<string, DependencySpec> = new Map();
  
  resolve(context: ProjectContext): ResolvedDependencies {
    // Start with core deps
    this.addCoreDependencies(context);
    
    // Add based on choices
    if (context.language === 'typescript') {
      this.addTypeScriptDependencies();
    }
    
    if (context.styling === 'tailwind') {
      this.addTailwindDependencies();
    }
    
    if (context.database) {
      this.addDatabaseDependencies(context);
    }
    
    if (context.hasAuth) {
      this.addAuthDependencies(context);
    }
    
    if (context.hasPayments) {
      this.addPaymentDependencies();
    }
    
    // Resolve peer dependencies
    this.resolvePeerDependencies();
    
    // Check for conflicts
    const conflicts = this.checkConflicts();
    if (conflicts.length > 0) {
      throw new Error(`Dependency conflicts: ${conflicts.join(', ')}`);
    }
    
    // Check compatibility
    const incompatible = this.checkCompatibility();
    if (incompatible.length > 0) {
      console.warn(`Compatibility issues: ${incompatible.join(', ')}`);
    }
    
    return {
      dependencies: Object.fromEntries(this.dependencies),
      devDependencies: Object.fromEntries(this.devDependencies)
    };
  }
  
  private addCoreDependencies(context: ProjectContext): void {
    this.add('next', '14.1.0', 'framework');
    this.add('react', '^18.2.0', 'framework');
    this.add('react-dom', '^18.2.0', 'framework');
  }
  
  private addTypeScriptDependencies(): void {
    this.add('typescript', '^5.3.0', 'language', { dev: true });
    this.add('@types/node', '^20.0.0', 'types', { dev: true });
    this.add('@types/react', '^18.2.0', 'types', { dev: true });
    this.add('@types/react-dom', '^18.2.0', 'types', { dev: true });
  }
  
  private addDatabaseDependencies(context: ProjectContext): void {
    if (context.orm === 'drizzle') {
      this.add('drizzle-orm', '^0.29.0', 'database');
      this.add('drizzle-kit', '^0.20.0', 'database', { dev: true });
      
      // Add database driver
      if (context.database === 'postgres') {
        this.add('postgres', '^3.4.0', 'database');
      }
    } else if (context.orm === 'prisma') {
      this.add('@prisma/client', '^5.8.0', 'database');
      this.add('prisma', '^5.8.0', 'database', { dev: true });
    }
  }
  
  private resolvePeerDependencies(): void {
    // Check each dependency for peer deps
    for (const [name, spec] of this.dependencies) {
      if (spec.peerDependencies) {
        spec.peerDependencies.forEach(peer => {
          if (!this.dependencies.has(peer) && !this.devDependencies.has(peer)) {
            console.warn(`Missing peer dependency: ${peer} (required by ${name})`);
          }
        });
      }
    }
  }
  
  private checkConflicts(): string[] {
    const conflicts: string[] = [];
    
    for (const [name, spec] of this.dependencies) {
      if (spec.conflicts) {
        spec.conflicts.forEach(conflictName => {
          if (this.dependencies.has(conflictName)) {
            conflicts.push(`${name} conflicts with ${conflictName}`);
          }
        });
      }
    }
    
    return conflicts;
  }
}
```

---

## 📊 VERSION COMPATIBILITY MATRIX

```typescript
const COMPATIBILITY_MATRIX = {
  'next': {
    '14.x': {
      'react': ['^18.2.0'],
      'react-dom': ['^18.2.0'],
      'typescript': ['^5.0.0', '^5.1.0', '^5.2.0', '^5.3.0']
    }
  },
  '@clerk/nextjs': {
    '^4.29.0': {
      'next': ['^13.5.0', '^14.0.0'],
      'react': ['^18.0.0']
    }
  },
  'drizzle-orm': {
    '^0.29.0': {
      'drizzle-kit': ['^0.20.0']
    }
  }
};

function checkVersionCompatibility(
  dep1: string,
  version1: string,
  dep2: string,
  version2: string
): boolean {
  const compat = COMPATIBILITY_MATRIX[dep1]?.[version1]?.[dep2];
  if (!compat) return true; // No known issues
  
  return compat.some(range => semver.satisfies(version2, range));
}
```

---

## 🔐 SECURITY SCANNING

```typescript
async function scanSecurityVulnerabilities(
  dependencies: Record<string, string>
): Promise<SecurityReport> {
  const vulnerabilities: Vulnerability[] = [];
  
  for (const [name, version] of Object.entries(dependencies)) {
    // Check against npm audit database
    const vulns = await checkNpmAudit(name, version);
    vulnerabilities.push(...vulns);
  }
  
  // Categorize by severity
  const critical = vulnerabilities.filter(v => v.severity === 'critical');
  const high = vulnerabilities.filter(v => v.severity === 'high');
  const moderate = vulnerabilities.filter(v => v.severity === 'moderate');
  const low = vulnerabilities.filter(v => v.severity === 'low');
  
  return {
    total: vulnerabilities.length,
    critical: critical.length,
    high: high.length,
    moderate: moderate.length,
    low: low.length,
    vulnerabilities,
    recommendations: generateRecommendations(vulnerabilities)
  };
}

function generateRecommendations(vulns: Vulnerability[]): string[] {
  return vulns
    .filter(v => v.severity === 'critical' || v.severity === 'high')
    .map(v => `Update ${v.package} to ${v.fixed_version || 'latest'}`);
}
```

---

## 📝 PACKAGE.JSON GENERATION

```typescript
function generatePackageJson(context: ProjectContext): PackageJson {
  const deps = dependencyManager.resolve(context);
  
  return {
    name: context.projectSlug,
    version: '0.1.0',
    private: true,
    description: context.projectDescription,
    author: `${context.authorName} <${context.authorEmail}>`,
    license: 'UNLICENSED',
    scripts: generateScripts(context),
    dependencies: deps.dependencies,
    devDependencies: deps.devDependencies,
    engines: {
      node: '>=18.0.0',
      npm: '>=9.0.0'
    },
    ...(context.repository && {
      repository: {
        type: 'git',
        url: context.repositoryUrl
      }
    })
  };
}

function generateScripts(context: ProjectContext): Record<string, string> {
  const scripts: Record<string, string> = {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint',
    'type-check': 'tsc --noEmit',
    format: 'prettier --write .'
  };
  
  // Database scripts
  if (context.orm === 'drizzle') {
    scripts['db:push'] = 'drizzle-kit push:pg';
    scripts['db:studio'] = 'drizzle-kit studio';
    scripts['db:generate'] = 'drizzle-kit generate:pg';
    scripts['db:migrate'] = 'tsx lib/db/migrate.ts';
  } else if (context.orm === 'prisma') {
    scripts['db:push'] = 'prisma db push';
    scripts['db:studio'] = 'prisma studio';
    scripts['db:generate'] = 'prisma generate';
    scripts['db:migrate'] = 'prisma migrate dev';
    scripts['db:seed'] = 'prisma db seed';
  }
  
  // Testing scripts
  if (context.hasTesting) {
    scripts.test = 'vitest run';
    scripts['test:watch'] = 'vitest watch';
    scripts['test:ui'] = 'vitest --ui';
    scripts['test:e2e'] = 'playwright test';
    scripts['test:e2e:ui'] = 'playwright test --ui';
  }
  
  // Deployment
  scripts.deploy = context.hosting === 'vercel' ? 'vercel --prod' : 'npm run build';
  
  return scripts;
}
```

---

## 📈 DEPENDENCY OPTIMIZATION

### Bundle Size Optimization

```typescript
function optimizeBundleSize(deps: Dependencies): Recommendations {
  const recommendations: string[] = [];
  
  // Check for heavy packages
  const heavyPackages = {
    'moment': 'Use date-fns or dayjs instead (much smaller)',
    'lodash': 'Use lodash-es or individual functions',
    'axios': 'Use native fetch API'
  };
  
  Object.keys(deps).forEach(dep => {
    if (heavyPackages[dep]) {
      recommendations.push(heavyPackages[dep]);
    }
  });
  
  return { recommendations };
}
```

### Tree-Shaking

```typescript
// Ensure imports support tree-shaking
const TREE_SHAKEABLE_IMPORTS = {
  'lodash': 'lodash-es', // ES modules version
  'date-fns': true, // Already tree-shakeable
  'lucide-react': true // Individual icon imports
};
```

---

## 🎯 INSTALLATION GUIDE GENERATION

```markdown
# Installation

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 (or yarn/pnpm)

## Steps

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

This will install:
- {{DEPENDENCY_COUNT}} production dependencies
- {{DEV_DEPENDENCY_COUNT}} development dependencies

**Estimated time**: 2-3 minutes

**Estimated download**: ~{{SIZE_MB}}MB

2. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your API keys (see ENVIRONMENT.md)

3. Set up database:

```bash
{{DATABASE_SETUP_COMMAND}}
```

4. Start development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Peer dependency warnings"
These are usually safe to ignore, but verify compatibility.

### Build failures
```bash
npm run type-check
npm run lint
```
```

---

## ✅ DEPENDENCY CHECKLIST

Before finalizing:

- [ ] All required dependencies included
- [ ] Peer dependencies resolved
- [ ] No conflicts between packages
- [ ] Versions compatible with each other
- [ ] No critical security vulnerabilities
- [ ] Bundle size reasonable (<1MB for initial load)
- [ ] Scripts correctly defined
- [ ] Engines specified (Node version)
- [ ] DevDependencies properly categorized
- [ ] License specified

---

**This dependency manager ensures compatible, secure, and optimized package configurations for every generated project.**






