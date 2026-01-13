# Development Standards

Coding standards, best practices, and development guidelines for all Lost Monster projects.

## Overview

This directory contains the standards and conventions we follow across all projects to ensure consistency, quality, and maintainability.

## Directory Structure

```
standards/
├── coding/              # Code style and conventions
├── git/                 # Git workflow and practices
├── documentation/       # Documentation guidelines
└── security/            # Security best practices
```

## Standards Categories

### [Coding Standards](./coding/)
- Code style and formatting
- Naming conventions
- File organization
- Best practices per language/framework
- Code review guidelines

### [Git Standards](./git/)
- Branch naming conventions
- Commit message format
- Pull request process
- Code review workflow
- Release process

### [Documentation Standards](./documentation/)
- README requirements
- Code comments
- API documentation
- Architecture docs
- Changelog format

### [Security Standards](./security/)
- Authentication best practices
- Data protection
- API security
- Environment variables
- Dependency management

## Quick Reference

### Code Style

```typescript
// ✅ Good - descriptive names, typed
interface UserProfile {
  id: string
  name: string
  email: string
}

function getUserProfile(userId: string): Promise<UserProfile> {
  // Implementation
}

// ❌ Bad - unclear names, no types
function get(id) {
  // Implementation
}
```

### Git Commits

```bash
# ✅ Good
feat: add user authentication with JWT
fix: resolve memory leak in data fetching
docs: update API documentation

# ❌ Bad
update
fix stuff
WIP
```

### File Naming

```
# ✅ Good
UserProfile.tsx
use-auth.ts
api-client.ts

# ❌ Bad
userprofile.tsx
UseAuth.ts
APIClient.ts
```

## Core Principles

### 1. Consistency
- Follow established patterns
- Use the same style across projects
- Don't mix conventions

### 2. Readability
- Write code for humans first
- Use clear, descriptive names
- Add comments for complex logic
- Keep functions small and focused

### 3. Maintainability
- Write testable code
- Avoid tight coupling
- Use proper abstractions
- Document decisions

### 4. Quality
- Write tests
- Review code thoroughly
- Fix warnings and errors
- Refactor regularly

### 5. Security
- Never commit secrets
- Validate all inputs
- Use HTTPS everywhere
- Keep dependencies updated

## Coding Standards Summary

### TypeScript
```typescript
// Use explicit types
const user: User = { id: '1', name: 'John' }

// Avoid 'any'
function process(data: unknown): void {
  // Implementation
}

// Use interfaces for objects
interface Config {
  apiUrl: string
  timeout: number
}

// Use type for unions/primitives
type Status = 'pending' | 'active' | 'inactive'
```

### React
```tsx
// Functional components with TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
}

export function Button({ variant, onClick, children }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

// Use hooks properly
function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUser(id).then(setUser)
  }, [id])

  return user
}
```

### File Organization
```
src/
├── app/               # Application code
├── components/        # Reusable components
│   ├── ui/            # Basic UI components
│   └── features/      # Feature components
├── lib/               # Utilities and helpers
├── hooks/             # Custom hooks
├── types/             # TypeScript types
├── styles/            # Global styles
└── config/            # Configuration
```

## Git Standards Summary

### Branch Naming
```bash
# Feature branches
feature/user-authentication
feature/payment-integration

# Bug fixes
fix/memory-leak
fix/login-redirect

# Hotfixes
hotfix/security-patch

# Releases
release/v1.2.0
```

### Commit Messages
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
feat(auth): add JWT authentication

- Implement login endpoint
- Add token validation
- Create auth middleware

Closes #123
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to Remote**
   ```bash
   git push origin feature/new-feature
   ```

4. **Create Pull Request**
   - Clear title and description
   - Link related issues
   - Add screenshots if UI changes
   - Request reviewers

5. **Code Review**
   - Address feedback
   - Make requested changes
   - Re-request review

6. **Merge**
   - Squash commits (if needed)
   - Delete branch after merge

## Documentation Standards

### README Template

```markdown
# Project Name

Brief description of the project.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm run dev
\`\`\`

## Configuration

Environment variables needed...

## Testing

\`\`\`bash
npm test
\`\`\`

## Deployment

Deployment instructions...

## Contributing

Contribution guidelines...

## License

License information...
```

### Code Comments

```typescript
/**
 * Fetches user profile from the API
 *
 * @param userId - The unique identifier for the user
 * @returns Promise resolving to the user profile
 * @throws {NotFoundError} When user doesn't exist
 *
 * @example
 * ```ts
 * const profile = await getUserProfile('user-123')
 * console.log(profile.name)
 * ```
 */
async function getUserProfile(userId: string): Promise<UserProfile> {
  // Implementation
}
```

### API Documentation

```typescript
/**
 * @api {get} /api/users/:id Get User
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {String} id User's unique ID
 *
 * @apiSuccess {String} id User ID
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email User email
 *
 * @apiError UserNotFound The user was not found
 *
 * @apiExample {curl} Example:
 *   curl -i http://localhost:3000/api/users/123
 */
```

## Security Standards

### Environment Variables

```bash
# ✅ Good - in .env file (gitignored)
DATABASE_URL=postgresql://...
API_KEY=secret_key

# ❌ Bad - committed to repo
const API_KEY = 'secret_key'
```

### Input Validation

```typescript
import { z } from 'zod'

// Define schema
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18)
})

// Validate input
function createUser(data: unknown) {
  const validated = userSchema.parse(data)
  // Use validated data
}
```

### Authentication

```typescript
// Use established libraries
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

// Hash passwords
const hashedPassword = await hash(password, 10)

// Verify passwords
const isValid = await compare(password, hashedPassword)

// Use JWT for sessions
const token = jwt.sign({ userId }, process.env.JWT_SECRET!)
```

### HTTPS Only

```typescript
// Redirect HTTP to HTTPS
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.redirect(`https://${req.headers.host}${req.url}`)
}
```

## Code Review Guidelines

### What to Look For

1. **Correctness**
   - Does it work as intended?
   - Are there edge cases?
   - Is error handling proper?

2. **Code Quality**
   - Is it readable?
   - Is it maintainable?
   - Does it follow standards?

3. **Performance**
   - Are there bottlenecks?
   - Is it efficient?
   - Can it be optimized?

4. **Security**
   - Are inputs validated?
   - Are secrets protected?
   - Are there vulnerabilities?

5. **Tests**
   - Are there tests?
   - Do tests cover edge cases?
   - Do all tests pass?

### Review Etiquette

- Be constructive and kind
- Explain the "why" behind suggestions
- Praise good code
- Ask questions when unclear
- Suggest alternatives
- Approve when satisfied

## Testing Standards

### Test Structure

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('creates a user with valid data', async () => {
      const user = await userService.createUser({
        email: 'test@example.com',
        password: 'password123'
      })

      expect(user).toBeDefined()
      expect(user.email).toBe('test@example.com')
    })

    it('throws error with invalid email', async () => {
      await expect(
        userService.createUser({
          email: 'invalid',
          password: 'password123'
        })
      ).rejects.toThrow('Invalid email')
    })
  })
})
```

### Coverage Requirements

- **Minimum coverage**: 80%
- **Critical paths**: 100%
- **Edge cases**: Covered
- **Error paths**: Tested

## Performance Standards

### Bundle Size
- Monitor bundle size
- Code split appropriately
- Lazy load when possible
- Tree shake unused code

### Images
- Use next/image or similar
- Provide width/height
- Use appropriate formats (WebP)
- Lazy load off-screen images

### Fonts
- Use next/font or similar
- Subset fonts
- Preload critical fonts
- Use font-display: swap

## Accessibility Standards

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Proper ARIA labels
- Color contrast ratios

### Example
```tsx
<button
  aria-label="Close dialog"
  onClick={handleClose}
  onKeyDown={(e) => e.key === 'Escape' && handleClose()}
>
  <CloseIcon aria-hidden="true" />
</button>
```

## Enforcement

### Automated
- ESLint for code style
- Prettier for formatting
- TypeScript for types
- Tests in CI/CD
- Pre-commit hooks

### Manual
- Code reviews
- Architecture reviews
- Security audits
- Performance audits

## Updating Standards

Standards evolve. When updating:
1. Discuss with team
2. Document changes
3. Update examples
4. Communicate widely
5. Update tooling

---

For specific examples and detailed guidelines, explore the subdirectories above.
