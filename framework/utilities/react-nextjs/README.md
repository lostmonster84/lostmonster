# React/Next.js Utilities

**Production-ready utility functions for React and Next.js projects**

This directory contains battle-tested utility functions extracted from real production projects. These utilities solve common problems and follow best practices.

---

## Available Utilities

### `utils.ts`

Core utility functions for React/Next.js projects.

#### Installation

**Required dependencies**:
```bash
npm install clsx tailwind-merge
```

Or:
```bash
pnpm add clsx tailwind-merge
```

#### Functions

##### `cn(...inputs: ClassValue[])`
**Merge Tailwind CSS classes intelligently**

Combines `clsx` for conditional classes and `tailwind-merge` to handle Tailwind class conflicts.

```tsx
import { cn } from '@/lib/utils'

// Basic usage
<div className={cn('px-2 py-1', 'bg-blue-500')} />

// Conditional classes
<div className={cn(
  'px-4 py-2',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
)} />

// Override defaults
<div className={cn('px-2', className)} />
```

**Why use this?**
- Handles Tailwind class conflicts correctly (e.g., `px-2` vs `px-4` - last one wins)
- Supports conditional classes cleanly
- Essential for component libraries with customizable styling

---

##### `naturalEase`
**Natural ease timing for Framer Motion**

Timing function that matches your design system's natural ease curve.

```tsx
import { naturalEase } from '@/lib/utils'
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: naturalEase }}
>
  Content
</motion.div>
```

**Value**: `[0.25, 0.46, 0.45, 0.94]` (cubic-bezier)

**When to use**:
- All Framer Motion animations
- Consistent with your design system's timing

---

##### `formatPrice(amount, currency?, locale?)`
**Format currency values**

```tsx
import { formatPrice } from '@/lib/utils'

formatPrice(1250)              // "£1,250" (GBP, no decimals)
formatPrice(1250.50)           // "£1,250.50" (GBP, auto decimals)
formatPrice(1250, 'USD')       // "$1,250" (USD)
formatPrice(1250, 'EUR', 'fr-FR') // "1 250 €" (EUR, French locale)
```

**Parameters**:
- `amount: number` - Price to format
- `currency: string = "GBP"` - Currency code (ISO 4217)
- `locale: string = "en-GB"` - Locale for formatting

**Features**:
- Auto-detects if decimals needed (1250 → no decimals, 1250.50 → decimals)
- Supports all currencies (USD, EUR, GBP, JPY, etc.)
- Locale-aware formatting

---

##### `formatDate(date, locale?)`
**Format dates for display**

```tsx
import { formatDate } from '@/lib/utils'

formatDate(new Date())         // "9 January 2025"
formatDate("2025-01-09")       // "9 January 2025"
formatDate(new Date(), 'en-US') // "January 9, 2025" (US locale)
```

**Parameters**:
- `date: Date | string` - Date to format
- `locale: string = "en-GB"` - Locale for formatting

---

##### `formatDateTime(date, locale?)`
**Format dates with time**

```tsx
import { formatDateTime } from '@/lib/utils'

formatDateTime(new Date())     // "9 January 2025 at 14:30"
```

---

##### `truncate(text, length)`
**Truncate text with ellipsis**

```tsx
import { truncate } from '@/lib/utils'

truncate("This is a very long text", 10) // "This is a..."
truncate("Short", 10)                     // "Short"
```

**Use cases**:
- Preview text in cards
- Limit description length
- Meta descriptions

---

##### `capitalize(text)`
**Capitalize first letter**

```tsx
import { capitalize } from '@/lib/utils'

capitalize("hello world") // "Hello world"
capitalize("hello")       // "Hello"
```

---

##### `sleep(ms)`
**Async delay utility**

```tsx
import { sleep } from '@/lib/utils'

async function example() {
  console.log('Start')
  await sleep(1000) // Wait 1 second
  console.log('End')
}
```

**Use cases**:
- Demo/development delays
- Rate limiting
- Animation timing

---

##### `debounce(func, wait)`
**Debounce function calls**

```tsx
import { debounce } from '@/lib/utils'

const debouncedSearch = debounce((query: string) => {
  fetchSearchResults(query)
}, 300)

// In component
<input
  onChange={(e) => debouncedSearch(e.target.value)}
  placeholder="Search..."
/>
```

**Use cases**:
- Search inputs (wait for user to stop typing)
- Resize handlers
- Scroll handlers
- API calls that shouldn't fire on every keystroke

**Wait time recommendations**:
- Search: 300ms
- Resize: 150ms
- Scroll: 100ms

---

##### `generateId(length?)`
**Generate random IDs**

```tsx
import { generateId } from '@/lib/utils'

generateId()      // "k3j5h2g9" (8 chars)
generateId(12)    // "k3j5h2g9x7m4" (12 chars)
```

**Use cases**:
- Temporary IDs for optimistic UI
- Key props for dynamically generated lists
- Unique identifiers for forms

**Note**: Not cryptographically secure - don't use for tokens/secrets

---

##### `isEmpty(value)`
**Check if value is empty**

```tsx
import { isEmpty } from '@/lib/utils'

isEmpty(null)           // true
isEmpty(undefined)      // true
isEmpty("")             // true
isEmpty("   ")          // true (trimmed)
isEmpty([])             // true
isEmpty({})             // true
isEmpty("hello")        // false
isEmpty([1, 2, 3])      // false
isEmpty({ key: 'val' }) // false
```

**Use cases**:
- Form validation
- Conditional rendering
- Data validation before API calls

---

## Usage in Your Project

### Step 1: Copy utilities to your project

```bash
# Copy the entire file
cp utilities/react-nextjs/utils.ts your-project/src/lib/utils.ts
```

Or copy individual functions as needed.

### Step 2: Install dependencies

```bash
npm install clsx tailwind-merge
```

### Step 3: Import and use

```tsx
import { cn, formatPrice, formatDate } from '@/lib/utils'
```

---

## TypeScript Support

All functions are fully typed with TypeScript. Your IDE will provide:
- Autocomplete for function parameters
- Type checking
- IntelliSense documentation

---

## Testing

All utilities are tested in production. Recommended test coverage:

```tsx
// Example tests (using Jest/Vitest)
import { cn, formatPrice, isEmpty } from '@/lib/utils'

describe('cn', () => {
  it('merges classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('px-2', false && 'py-2', true && 'py-4'))
      .toBe('px-2 py-4')
  })
})

describe('formatPrice', () => {
  it('formats GBP correctly', () => {
    expect(formatPrice(1250)).toBe('£1,250')
  })

  it('includes decimals when needed', () => {
    expect(formatPrice(1250.50)).toBe('£1,250.50')
  })
})

describe('isEmpty', () => {
  it('detects empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty("")).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })

  it('detects non-empty values', () => {
    expect(isEmpty("hello")).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
  })
})
```

---

## Performance Considerations

### `cn` function
- Very lightweight (~1kb with dependencies)
- No runtime overhead
- Essential for Tailwind projects

### `debounce` function
- Saves unnecessary function calls
- Reduces API requests
- Improves performance significantly for rapid events

### `formatPrice` / `formatDate`
- Uses native `Intl` API (built into browsers)
- No external dependencies
- Fast and reliable

---

## Customization

### Changing default currency
Edit `formatPrice` default:

```tsx
export function formatPrice(
  amount: number,
  currency: string = "USD", // Changed from GBP
  locale: string = "en-US"   // Changed from en-GB
): string {
  // ...
}
```

### Adding your own utilities

Follow the same pattern:

```tsx
/**
 * Description of your utility
 *
 * @example
 * myUtil("input") // "output"
 */
export function myUtil(input: string): string {
  return input.toUpperCase()
}
```

**Guidelines**:
- Add JSDoc comments
- Include `@example` for clarity
- Export with `export function` (not `export const`)
- Add TypeScript types

---

## Related Resources

- **Tailwind Config**: [`../../design-systems/templates/tailwind.config.template.ts`](../../design-systems/templates/tailwind.config.template.ts)
- **globals.css**: [`../../design-systems/templates/globals.css.template`](../../design-systems/templates/globals.css.template)
- **Development Principles**: [`../../.ai-framework/core/DEVELOPMENT-PRINCIPLES.md`](../../.ai-framework/core/DEVELOPMENT-PRINCIPLES.md)

---

## Version History

**v1.0.0** (2025-01-09)
- Initial extraction from production project
- Core utilities: cn, naturalEase, formatPrice, formatDate
- Added: formatDateTime, truncate, capitalize, sleep, debounce, generateId, isEmpty
- Full TypeScript support
- Production-tested

---

**Questions?** Refer to function JSDoc comments or create an issue in Lost Monster repo.
