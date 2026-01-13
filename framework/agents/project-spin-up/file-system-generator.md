# Project Spin-Up Agent - File System Generator

> **Purpose**: Smart file system generation that creates proper directory structures, places files correctly, maintains organization patterns, and handles conflicts gracefully.

---

## 🗂️ DIRECTORY STRUCTURES

### Next.js App Router (Standard)

```
project-root/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # Shadcn components
│   ├── auth/
│   ├── dashboard/
│   └── marketing/
├── lib/
│   ├── db/
│   │   ├── schema.ts
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── auth/
│   │   └── config.ts
│   ├── stripe.ts
│   ├── email.ts
│   └── utils.ts
├── types/
│   ├── database.ts
│   └── api.ts
├── drizzle/
│   └── migrations/
├── public/
│   ├── images/
│   └── favicon.ico
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .env.local
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── ARCHITECTURE.md
```

---

## 📝 GENERATION ALGORITHM

```typescript
interface FileManifest {
  path: string;
  content: string;
  type: 'config' | 'code' | 'documentation' | 'test';
  dependencies: string[]; // Files that must exist first
  priority: number; // 1-10, higher = generate first
}

class FileSystemGenerator {
  private manifest: FileManifest[] = [];
  private generatedFiles: Set<string> = new Set();
  
  async generate(context: ProjectContext): Promise<GenerationResult> {
    // 1. Build manifest
    this.buildManifest(context);
    
    // 2. Sort by dependencies and priority
    const sortedFiles = this.topologicalSort(this.manifest);
    
    // 3. Generate files in order
    for (const fileSpec of sortedFiles) {
      await this.generateFile(fileSpec, context);
    }
    
    // 4. Validate generated project
    const validation = await this.validate();
    
    return {
      filesGenerated: Array.from(this.generatedFiles),
      errors: validation.errors,
      warnings: validation.warnings
    };
  }
  
  private buildManifest(context: ProjectContext): void {
    // Add base configuration files (highest priority)
    this.addFile({
      path: 'package.json',
      template: 'base/package.json.hbs',
      type: 'config',
      priority: 10
    });
    
    this.addFile({
      path: 'tsconfig.json',
      template: 'base/tsconfig.json.hbs',
      type: 'config',
      priority: 10
    });
    
    // Add framework files
    if (context.frontend === 'nextjs') {
      this.addNextJsFiles(context);
    }
    
    // Add database files
    if (context.database) {
      this.addDatabaseFiles(context);
    }
    
    // Add auth files
    if (context.hasAuth) {
      this.addAuthFiles(context);
    }
    
    // Add payment files
    if (context.hasPayments) {
      this.addPaymentFiles(context);
    }
    
    // Add documentation
    this.addDocumentationFiles(context);
  }
  
  private addNextJsFiles(context: ProjectContext): void {
    // App router structure
    this.addFile({
      path: 'app/layout.tsx',
      template: 'nextjs/app-layout.tsx.hbs',
      type: 'code',
      priority: 9,
      dependencies: ['package.json']
    });
    
    this.addFile({
      path: 'app/page.tsx',
      template: 'nextjs/landing-page.tsx.hbs',
      type: 'code',
      priority: 8
    });
    
    // Auth routes (if needed)
    if (context.hasAuth) {
      this.addFile({
        path: 'app/(auth)/login/page.tsx',
        template: `auth/${context.authProvider}/login-page.tsx.hbs`,
        type: 'code',
        priority: 7
      });
      
      this.addFile({
        path: 'app/(auth)/signup/page.tsx',
        template: `auth/${context.authProvider}/signup-page.tsx.hbs`,
        type: 'code',
        priority: 7
      });
    }
    
    // Dashboard (if needed)
    if (context.hasAuth) {
      this.addFile({
        path: 'app/(dashboard)/layout.tsx',
        template: 'nextjs/dashboard-layout.tsx.hbs',
        type: 'code',
        priority: 7,
        dependencies: ['lib/auth/config.ts']
      });
      
      this.addFile({
        path: 'app/(dashboard)/page.tsx',
        template: 'nextjs/dashboard-page.tsx.hbs',
        type: 'code',
        priority: 6
      });
    }
    
    // Middleware (for protected routes)
    if (context.hasAuth) {
      this.addFile({
        path: 'middleware.ts',
        template: `auth/${context.authProvider}/middleware.ts.hbs`,
        type: 'code',
        priority: 8
      });
    }
    
    // Next.js config
    this.addFile({
      path: 'next.config.js',
      template: 'base/next.config.js.hbs',
      type: 'config',
      priority: 10
    });
  }
  
  private topologicalSort(files: FileManifest[]): FileManifest[] {
    // Sort by priority first, then handle dependencies
    const sorted: FileManifest[] = [];
    const visited = new Set<string>();
    
    function visit(file: FileManifest) {
      if (visited.has(file.path)) return;
      
      // Visit dependencies first
      file.dependencies?.forEach(depPath => {
        const dep = files.find(f => f.path === depPath);
        if (dep) visit(dep);
      });
      
      visited.add(file.path);
      sorted.push(file);
    }
    
    // Sort by priority (descending)
    const prioritySorted = [...files].sort((a, b) => b.priority - a.priority);
    
    prioritySorted.forEach(file => visit(file));
    
    return sorted;
  }
  
  private async generateFile(
    spec: FileManifest,
    context: ProjectContext
  ): Promise<void> {
    // Render template
    const content = await this.renderTemplate(spec.template, context);
    
    // Ensure directory exists
    const dir = path.dirname(spec.path);
    await fs.mkdir(dir, { recursive: true });
    
    // Check for conflicts
    if (await this.fileExists(spec.path)) {
      await this.handleConflict(spec.path, content);
    } else {
      // Write file
      await fs.writeFile(spec.path, content, 'utf-8');
      this.generatedFiles.add(spec.path);
    }
  }
}
```

---

## 🔀 CONFLICT RESOLUTION

```typescript
enum ConflictStrategy {
  SKIP = 'skip',           // Don't overwrite, keep existing
  OVERWRITE = 'overwrite', // Replace with new
  MERGE = 'merge',         // Intelligent merge
  BACKUP = 'backup',       // Backup existing, write new
  PROMPT = 'prompt'        // Ask user
}

async function handleConflict(
  filePath: string,
  newContent: string,
  strategy: ConflictStrategy = ConflictStrategy.SKIP
): Promise<void> {
  const existingContent = await fs.readFile(filePath, 'utf-8');
  
  switch (strategy) {
    case ConflictStrategy.SKIP:
      console.log(`⏭️  Skipping ${filePath} (already exists)`);
      break;
      
    case ConflictStrategy.OVERWRITE:
      await fs.writeFile(filePath, newContent);
      console.log(`✏️  Overwrote ${filePath}`);
      break;
      
    case ConflictStrategy.MERGE:
      const merged = await intelligentMerge(existingContent, newContent, filePath);
      await fs.writeFile(filePath, merged);
      console.log(`🔀 Merged ${filePath}`);
      break;
      
    case ConflictStrategy.BACKUP:
      const backupPath = `${filePath}.backup-${Date.now()}`;
      await fs.writeFile(backupPath, existingContent);
      await fs.writeFile(filePath, newContent);
      console.log(`💾 Backed up ${filePath} → ${backupPath}`);
      break;
      
    case ConflictStrategy.PROMPT:
      const choice = await promptUser(`File ${filePath} exists. Action?`, [
        'Skip', 'Overwrite', 'Merge', 'Backup'
      ]);
      await handleConflict(filePath, newContent, choice.toLowerCase() as ConflictStrategy);
      break;
  }
}
```

---

## 📊 GENERATION PROGRESS

```typescript
interface GenerationProgress {
  phase: string;
  currentFile: string;
  filesCompleted: number;
  filesTotal: number;
  percentageComplete: number;
  estimatedTimeRemaining: number; // seconds
  errors: GenerationError[];
}

async function generateWithProgress(
  context: ProjectContext,
  onProgress: (progress: GenerationProgress) => void
): Promise<void> {
  const generator = new FileSystemGenerator();
  const manifest = generator.buildManifest(context);
  const totalFiles = manifest.length;
  let completed = 0;
  const startTime = Date.now();
  
  for (const fileSpec of manifest) {
    // Update progress
    onProgress({
      phase: getPhase(fileSpec.type),
      currentFile: fileSpec.path,
      filesCompleted: completed,
      filesTotal: totalFiles,
      percentageComplete: Math.round((completed / totalFiles) * 100),
      estimatedTimeRemaining: estimateTimeRemaining(completed, totalFiles, startTime),
      errors: []
    });
    
    try {
      await generator.generateFile(fileSpec, context);
      completed++;
    } catch (error) {
      // Log error but continue
      console.error(`Failed to generate ${fileSpec.path}:`, error);
    }
  }
}

function getPhase(fileType: string): string {
  const phases = {
    config: 'Configuration',
    code: 'Application Code',
    documentation: 'Documentation',
    test: 'Tests'
  };
  return phases[fileType] || 'Generation';
}
```

---

## ✅ POST-GENERATION VALIDATION

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

async function validateGeneratedProject(
  projectPath: string
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // 1. Check required files exist
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'README.md',
    'app/layout.tsx',
    'app/page.tsx'
  ];
  
  for (const file of requiredFiles) {
    if (!await fileExists(path.join(projectPath, file))) {
      errors.push({
        type: 'missing_file',
        file,
        message: `Required file ${file} not found`
      });
    }
  }
  
  // 2. Validate package.json
  try {
    const pkgJson = JSON.parse(
      await fs.readFile(path.join(projectPath, 'package.json'), 'utf-8')
    );
    
    if (!pkgJson.dependencies || Object.keys(pkgJson.dependencies).length === 0) {
      warnings.push({
        file: 'package.json',
        message: 'No dependencies defined'
      });
    }
    
    if (!pkgJson.scripts || !pkgJson.scripts.dev) {
      errors.push({
        type: 'invalid_config',
        file: 'package.json',
        message: 'Missing "dev" script'
      });
    }
  } catch (error) {
    errors.push({
      type: 'invalid_json',
      file: 'package.json',
      message: 'Invalid JSON'
    });
  }
  
  // 3. Check for TypeScript errors
  try {
    const result = await exec('npx tsc --noEmit', { cwd: projectPath });
    if (result.stderr) {
      warnings.push({
        file: 'TypeScript',
        message: 'Type checking found issues (check logs)'
      });
    }
  } catch (error) {
    // Type errors exist but don't fail generation
    warnings.push({
      file: 'TypeScript',
      message: 'Type checking failed'
    });
  }
  
  // 4. Check for ESLint errors
  try {
    await exec('npx eslint . --max-warnings 0', { cwd: projectPath });
  } catch (error) {
    warnings.push({
      file: 'ESLint',
      message: 'Linting issues found'
    });
  }
  
  // 5. Validate imports (no broken imports)
  const codeFiles = await glob('**/*.{ts,tsx}', { cwd: projectPath });
  for (const file of codeFiles) {
    const content = await fs.readFile(path.join(projectPath, file), 'utf-8');
    const imports = extractImports(content);
    
    for (const imp of imports) {
      if (imp.startsWith('@/') || imp.startsWith('./') || imp.startsWith('../')) {
        // Check if imported file exists
        const resolvedPath = resolveImport(imp, file, projectPath);
        if (!await fileExists(resolvedPath)) {
          errors.push({
            type: 'broken_import',
            file,
            message: `Import not found: ${imp}`
          });
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
```

---

## 🎯 BEST PRACTICES

### 1. Generation Order
```
1. Package.json (dependencies)
2. TypeScript config
3. Linting/formatting config
4. Database schema
5. Auth config
6. API routes
7. UI components
8. Documentation
```

### 2. Directory Organization
- Group by feature, not type (when possible)
- Keep related files together
- Consistent naming conventions
- Shallow directory trees (< 5 levels)

### 3. File Naming
- Components: PascalCase (`UserProfile.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- API routes: kebab-case (`user-profile/route.ts`)
- Constants: UPPER_SNAKE_CASE (`API_URL.ts`)

### 4. Import Aliases
```typescript
// Always use path aliases
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';

// Not relative imports
import { db } from '../../../lib/db';
```

---

## 📦 FILE MANIFEST EXAMPLE

```json
{
  "generated_at": "2026-01-06T12:00:00Z",
  "project_name": "my-saas",
  "files": [
    {
      "path": "package.json",
      "type": "config",
      "size_bytes": 1024,
      "template": "base/package.json.hbs",
      "checksum": "abc123..."
    },
    {
      "path": "app/layout.tsx",
      "type": "code",
      "size_bytes": 2048,
      "template": "nextjs/app-layout.tsx.hbs",
      "checksum": "def456..."
    }
  ],
  "statistics": {
    "total_files": 52,
    "total_size_bytes": 245760,
    "by_type": {
      "config": 8,
      "code": 35,
      "documentation": 6,
      "test": 3
    }
  }
}
```

---

**This file system generator ensures correct structure, dependency order, and conflict handling for production-ready projects.**






