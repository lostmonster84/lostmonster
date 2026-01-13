# Component Library

Welcome to the Lost Monster component library - a collection of production-ready, reusable components across multiple frameworks.

## Directory Structure

```
components/
├── react/              # React components
├── vue/                # Vue components
├── nextjs/             # Next.js specific components
└── shared/             # Framework-agnostic code
```

## Component Organization

### React Components
Modern React components using:
- Hooks and functional components
- TypeScript for type safety
- CSS Modules / Styled Components / Tailwind
- Comprehensive prop documentation
- Accessibility (a11y) built-in

**Location:** [`react/`](./react/)

### Vue Components
Vue 3 components featuring:
- Composition API
- TypeScript support
- Scoped styles
- Props and emits documentation
- Reactive and performant

**Location:** [`vue/`](./vue/)

### Next.js Components
Next.js optimized components:
- Server Components
- Client Components
- Route handlers
- Middleware
- Image optimization
- Font optimization

**Location:** [`nextjs/`](./nextjs/)

### Shared Components
Framework-agnostic code:
- Business logic
- Data transformations
- Utilities
- Types and interfaces
- Constants
- Validation logic

**Location:** [`shared/`](./shared/)

## Component Categories

### UI Components
Basic building blocks:
- Buttons
- Inputs
- Forms
- Cards
- Modals
- Tooltips
- Dropdowns
- Tabs
- Accordions

### Layout Components
Page structure:
- Grid systems
- Containers
- Sidebars
- Headers
- Footers
- Navigation

### Data Display
Showing information:
- Tables
- Lists
- Cards
- Badges
- Tags
- Avatars
- Stats

### Forms & Inputs
User input:
- Text inputs
- Selects
- Checkboxes
- Radio buttons
- Date pickers
- File uploads
- Rich text editors

### Feedback
User feedback:
- Alerts
- Toasts
- Loading states
- Progress bars
- Skeletons
- Error states

### Advanced
Complex components:
- Data tables with sorting/filtering
- Charts and graphs
- Calendars
- Rich text editors
- Image galleries
- Video players

## Component Standards

Every component should include:

### 1. README.md
- Component description
- Props/API documentation
- Usage examples
- Accessibility notes
- Browser compatibility
- Known issues

### 2. Implementation Files
- Component source code
- Type definitions
- Styles (if applicable)

### 3. Examples
- Basic usage
- Advanced usage
- Edge cases
- Different variants

### 4. Tests
- Unit tests
- Integration tests
- Accessibility tests

### 5. Documentation
- Inline code comments
- JSDoc/TSDoc
- Storybook stories (when applicable)

## Using Components

### Installation Pattern

Most components can be copied directly into your project:

```bash
# Copy a specific component
cp -r components/react/Button src/components/

# Or copy entire category
cp -r components/react/forms src/components/
```

### Import Pattern

```javascript
// React
import { Button } from '@/components/Button'

// Vue
import Button from '@/components/Button.vue'

// Next.js Server Component
import { ServerButton } from '@/components/ServerButton'
```

## Creating New Components

### Component Template Structure

```
ComponentName/
├── README.md                 # Documentation
├── ComponentName.tsx         # Implementation
├── ComponentName.module.css  # Styles (if needed)
├── ComponentName.test.tsx    # Tests
├── index.ts                  # Exports
└── examples/                 # Usage examples
    ├── basic.tsx
    └── advanced.tsx
```

### Checklist for New Components

- [ ] Clear, descriptive name
- [ ] TypeScript with proper types
- [ ] Accessible (ARIA, keyboard navigation)
- [ ] Responsive design
- [ ] Documented props/API
- [ ] Usage examples
- [ ] Unit tests
- [ ] README.md
- [ ] Follows coding standards

## Component Principles

### 1. Reusability
Components should be:
- Generic enough to use across projects
- Configurable through props
- Not tied to specific business logic

### 2. Accessibility
All components must:
- Support keyboard navigation
- Include proper ARIA labels
- Work with screen readers
- Follow WCAG 2.1 AA standards

### 3. Performance
Components should:
- Render efficiently
- Avoid unnecessary re-renders
- Lazy load when appropriate
- Optimize bundle size

### 4. Type Safety
Use TypeScript for:
- Props validation
- Event handlers
- Return types
- Generic types where needed

### 5. Documentation
Every component needs:
- Clear purpose description
- API documentation
- Usage examples
- Accessibility notes

## Framework-Specific Guidelines

### React
- Use functional components
- Prefer hooks over HOCs
- Memoize expensive operations
- Use proper key props
- Handle cleanup in useEffect

### Vue
- Use Composition API
- Define props with types
- Emit events properly
- Use slots for flexibility
- Script setup syntax

### Next.js
- Mark 'use client' when needed
- Optimize images with next/image
- Use next/font for fonts
- Leverage Server Components
- Stream when appropriate

## Best Practices

1. **Keep it simple** - Components should do one thing well
2. **Make it flexible** - Use props and slots for customization
3. **Think responsive** - Mobile-first approach
4. **Test thoroughly** - Unit and integration tests
5. **Document well** - Future you will thank you
6. **Consider accessibility** - Everyone should be able to use it
7. **Optimize performance** - Fast components, happy users
8. **Version carefully** - Breaking changes need major version bumps

## Examples

Browse the [`examples/`](../examples/) directory for real-world implementations and use cases.

## Contributing

When adding components:
1. Follow the component template structure
2. Use TypeScript
3. Write tests
4. Document thoroughly
5. Add usage examples
6. Update this README if adding new categories

---

Need help? Check the [documentation](../docs/) or review existing components for patterns and examples.
