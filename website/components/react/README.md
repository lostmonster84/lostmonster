# React Components

Production-ready React components built with modern best practices.

## Tech Stack

- **React 18+** - Latest React features
- **TypeScript** - Full type safety
- **CSS Modules / Tailwind** - Styling options
- **React Hooks** - Modern functional components
- **Accessibility** - WCAG 2.1 AA compliant

## Available Components

### UI Basics
- `Button/` - Buttons with variants and states
- `Input/` - Form inputs with validation
- `Card/` - Content cards and containers
- `Modal/` - Dialogs and overlays
- `Tooltip/` - Contextual help tooltips

### Forms
- `Form/` - Form wrapper with validation
- `Select/` - Dropdown selects
- `Checkbox/` - Checkboxes and switches
- `Radio/` - Radio button groups
- `DatePicker/` - Date selection
- `FileUpload/` - File upload component

### Layout
- `Container/` - Page containers
- `Grid/` - Responsive grid system
- `Flex/` - Flexbox utilities
- `Stack/` - Vertical/horizontal stacking
- `Sidebar/` - Sidebar navigation

### Data Display
- `Table/` - Data tables with sorting/filtering
- `List/` - Lists and list items
- `Badge/` - Status badges
- `Avatar/` - User avatars
- `Tag/` - Tags and labels

### Feedback
- `Alert/` - Alert messages
- `Toast/` - Toast notifications
- `Spinner/` - Loading spinners
- `Progress/` - Progress bars
- `Skeleton/` - Loading skeletons

## Usage Example

```tsx
import { Button } from '@/components/react/Button'
import { Card } from '@/components/react/Card'
import { Input } from '@/components/react/Input'

function MyComponent() {
  return (
    <Card>
      <h2>Sign Up</h2>
      <Input
        label="Email"
        type="email"
        required
      />
      <Button variant="primary">
        Submit
      </Button>
    </Card>
  )
}
```

## Component Structure

Each component follows this structure:

```
ComponentName/
├── README.md
├── ComponentName.tsx
├── ComponentName.module.css
├── ComponentName.test.tsx
├── types.ts
├── index.ts
└── examples/
    ├── basic.tsx
    └── advanced.tsx
```

## Standards

All React components follow:

1. **TypeScript** - Fully typed props and return values
2. **Accessibility** - Keyboard navigation and ARIA labels
3. **Responsive** - Mobile-first design
4. **Tested** - Unit tests with React Testing Library
5. **Documented** - Props documentation and examples

## Installation

Copy the component directory into your project:

```bash
cp -r components/react/Button src/components/
```

Or install dependencies if the component requires them:

```bash
npm install [component-dependencies]
```

## Best Practices

### Props Pattern
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  // Implementation
}
```

### State Management
```tsx
// Simple state
const [count, setCount] = useState(0)

// Complex state
const [state, setState] = useReducer(reducer, initialState)

// Context for shared state
const theme = useContext(ThemeContext)
```

### Effects
```tsx
useEffect(() => {
  // Side effect here

  return () => {
    // Cleanup
  }
}, [dependencies])
```

### Performance
```tsx
// Memoize expensive calculations
const expensive = useMemo(() => compute(data), [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething()
}, [])

// Memo components
export const ExpensiveComponent = memo(Component)
```

## Testing

Components use React Testing Library:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalled()
  })
})
```

## Styling Options

### CSS Modules
```tsx
import styles from './Button.module.css'

export const Button = () => (
  <button className={styles.button}>Click</button>
)
```

### Tailwind CSS
```tsx
export const Button = () => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Click
  </button>
)
```

### Styled Components
```tsx
const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background: blue;
  color: white;
`
```

## Accessibility

All components must:
- Support keyboard navigation (Tab, Enter, Space, Arrows)
- Include proper ARIA attributes
- Have sufficient color contrast
- Work with screen readers
- Focus management for modals/dialogs

Example:
```tsx
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onKeyDown={handleKeyDown}
>
  Close
</button>
```

## Contributing

When adding new React components:
1. Use TypeScript
2. Write comprehensive tests
3. Document all props
4. Include usage examples
5. Ensure accessibility
6. Follow the component structure
7. Add to this README

---

For more examples, see the [`examples/`](../../examples/) directory.
