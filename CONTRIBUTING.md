# Contributing to Lost Monster

Thank you for your interest in contributing to Lost Monster! This document provides guidelines for contributing to our development agency's master repository.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring environment for all contributors.

### Our Standards

- **Be respectful** - Treat everyone with respect
- **Be collaborative** - Work together towards shared goals
- **Be constructive** - Provide helpful feedback
- **Be professional** - Maintain professional conduct

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)
- Basic knowledge of TypeScript, React, or Vue

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lostmonster
   ```

2. **Explore the structure**
   ```bash
   # Read the main README
   cat README.md

   # Browse directories
   ls -la
   ```

3. **Find what to work on**
   - Browse existing issues
   - Check documentation gaps
   - Review component library
   - Look for missing integrations

## How to Contribute

### Types of Contributions

#### 1. Components
Add reusable components to the component library:
- React components
- Vue components
- Next.js components
- Shared utilities

#### 2. Integrations
Add integrations for third-party services:
- Payment providers
- Authentication services
- CMS platforms
- Analytics tools
- Communication services

#### 3. Templates
Create project templates:
- Frontend templates
- Backend templates
- Full-stack templates

#### 4. Documentation
Improve documentation:
- Fix typos
- Add examples
- Clarify instructions
- Write guides

#### 5. Utilities
Add helper functions and tools:
- String utilities
- Array helpers
- Custom hooks
- Validation functions

#### 6. Design Systems
Contribute to design systems:
- UI components
- Style guides
- Design tokens
- Patterns

## Development Workflow

### 1. Create a Branch

```bash
# Feature branch
git checkout -b feature/component-name

# Fix branch
git checkout -b fix/issue-description

# Documentation branch
git checkout -b docs/topic-name
```

### 2. Make Changes

Follow these guidelines:
- Write clean, readable code
- Follow existing patterns
- Use TypeScript
- Add comments where needed
- Write tests

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Run tests
npm test

# Type check
npm run type-check
```

### 4. Commit Your Changes

Follow [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat(component): add Button component"
```

### 5. Push to Remote

```bash
git push origin feature/component-name
```

### 6. Create Pull Request

- Clear title and description
- Link related issues
- Add screenshots for UI changes
- Request review

## Coding Standards

### TypeScript

```typescript
// ✅ Good - explicit types
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant, children }: ButtonProps) {
  return <button className={variant}>{children}</button>
}

// ❌ Bad - no types
export function Button({ variant, children }) {
  return <button className={variant}>{children}</button>
}
```

### File Naming

```
# ✅ Good
Button.tsx
use-auth.ts
api-client.ts

# ❌ Bad
button.tsx
UseAuth.ts
APIClient.ts
```

### Component Structure

```
ComponentName/
├── README.md
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.module.css
├── types.ts
└── index.ts
```

### Code Style

- Use 2 spaces for indentation
- Single quotes for strings
- Semicolons optional (be consistent)
- Trailing commas in multi-line structures
- Max line length: 80-100 characters

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature
feat(component): add Button component with variants

# Fix
fix(auth): resolve token refresh issue

# Documentation
docs(readme): update installation instructions

# Style
style(button): format code according to prettier

# Refactor
refactor(api): simplify error handling logic

# Test
test(button): add unit tests for variants

# Chore
chore(deps): update dependencies
```

### Scope

The scope indicates what part of the codebase is affected:
- `component` - Component library
- `integration` - Third-party integration
- `template` - Project template
- `docs` - Documentation
- `design` - Design system
- `utility` - Utility functions

## Pull Request Process

### Before Submitting

- [ ] Code follows our standards
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Types are correct
- [ ] Examples added (if applicable)

### PR Title

Use the same format as commit messages:

```
feat(component): add Button component
fix(auth): resolve login redirect issue
docs(integration): update Stripe guide
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
```

### Review Process

1. **Submit PR** - Create pull request
2. **Automated checks** - CI runs tests
3. **Code review** - Maintainers review
4. **Address feedback** - Make requested changes
5. **Approval** - PR approved
6. **Merge** - PR merged to main

### After Merge

- Delete your branch
- Close related issues
- Update documentation if needed

## Documentation

### Component Documentation

Every component needs a README.md:

```markdown
# Component Name

Brief description

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Button variant |

## Usage

\`\`\`tsx
<Button variant="primary">Click me</Button>
\`\`\`

## Examples

### Basic
...

### Advanced
...
```

### Code Comments

Use JSDoc for functions:

```typescript
/**
 * Formats a date string
 *
 * @param date - The date to format
 * @param format - The format string
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date(), 'YYYY-MM-DD')
 * // => "2024-01-15"
 * ```
 */
export function formatDate(date: Date, format: string): string {
  // Implementation
}
```

## Component Contribution Checklist

When adding a component:

- [ ] Created component directory
- [ ] Implemented component
- [ ] Added TypeScript types
- [ ] Wrote README with examples
- [ ] Added unit tests
- [ ] Tested accessibility
- [ ] Checked responsive design
- [ ] Added to component index
- [ ] Updated parent README

## Integration Contribution Checklist

When adding an integration:

- [ ] Created integration directory
- [ ] Implemented API client
- [ ] Added TypeScript types
- [ ] Wrote setup guide
- [ ] Created .env.example
- [ ] Added usage examples
- [ ] Implemented error handling
- [ ] Added webhook handler (if needed)
- [ ] Wrote integration tests
- [ ] Updated integrations README

## Template Contribution Checklist

When adding a template:

- [ ] Created template directory
- [ ] Set up project structure
- [ ] Added package.json
- [ ] Configured TypeScript
- [ ] Set up linting/formatting
- [ ] Created .env.example
- [ ] Wrote comprehensive README
- [ ] Added example code
- [ ] Tested setup process
- [ ] Updated templates README

## Questions?

If you have questions:
- Check existing documentation
- Review similar contributions
- Ask in pull request comments
- Reach out to maintainers

## Recognition

Contributors are recognized in:
- Git history
- Release notes
- Project documentation

Thank you for contributing to Lost Monster!
