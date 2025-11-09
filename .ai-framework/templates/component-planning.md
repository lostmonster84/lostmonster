# Component Planning Template

> **Use this template when planning new UI components**
>
> For complex components, also apply CODA framework ([`../frameworks/coda.md`](../frameworks/coda.md))

---

## Component Overview

**Name**: [Component Name]
**Purpose**: [What does this component do? Why is it needed?]
**Location**: [Where will it be used? Which pages/sections?]
**Type**: [Presentation? Container? Layout? Form? Interactive?]

---

## Requirements

### Functional Requirements

**What the component must do**:

1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

### Non-Functional Requirements

**Performance**: [Load time, bundle size, render performance]
**Accessibility**: [WCAG requirements, keyboard nav, screen reader support]
**Responsiveness**: [Mobile, tablet, desktop behavior]
**Browser Support**: [Target browsers/versions]

---

## Props/API Design

### Props Interface

```typescript
interface [Component]Props {
  // Required props
  [propName]: [type];  // [description]

  // Optional props
  [propName]?: [type]; // [description]

  // Callbacks
  on[Event]?: ([params]) => void; // [when this fires]

  // Styling
  className?: string;
  variant?: [variant options]; // [description of variants]
}
```

### Variants

**If component has visual variants**, define them:

- **Variant A** (`[name]`): [Description, when to use]
- **Variant B** (`[name]`): [Description, when to use]

---

## Design Specifications

### Visual Design

**Reference**: [Link to design file, Figma, or demo page if using Design Variations workflow]

**Colors**:
- [Element]: [Color token] ([hex value])
- [Element]: [Color token] ([hex value])

**Typography**:
- [Text element]: [Font], [size], [weight], [color]
- [Text element]: [Font], [size], [weight], [color]

**Spacing**:
- Internal padding: [values]
- Margins: [values]
- Gap between elements: [values]

**Borders & Shadows**:
- Border: [width], [color], [radius]
- Shadow: [Design system shadow token or custom values]

### States

**Component states to design for**:

- **Default**: [Description]
- **Hover**: [What changes on hover]
- **Active/Focus**: [What changes when active/focused]
- **Disabled**: [How disabled state looks]
- **Loading**: [Loading state appearance]
- **Error**: [Error state appearance]

### Animations

**If component includes animations**:

- **Animation type**: [Fade in, slide, scale, etc.]
- **Trigger**: [On mount, on hover, on scroll, etc.]
- **Duration**: [milliseconds]
- **Easing**: [Use your design system's standard easing or specify custom]
- **Delay**: [If staggered]

---

## Component Structure

### File Organization

```
components/
  [ComponentName]/
    [ComponentName].tsx        # Main component
    [ComponentName].types.ts   # Type definitions (if complex)
    [ComponentName].test.tsx   # Tests
    index.ts                   # Export
```

### Dependencies

**External libraries needed**:
- [Library name]: [Why it's needed]

**Internal dependencies**:
- [Component/utility]: [What it provides]

---

## Implementation Approach

### Step-by-Step Plan

1. **Setup**
   - Create component file structure
   - Define TypeScript types/interfaces

2. **Base Component**
   - Implement basic structure
   - Add prop handling
   - Set up default styling

3. **Variants** (if applicable)
   - Implement each variant
   - Add variant switching logic

4. **States**
   - Implement hover/focus/active states
   - Add disabled state
   - Add loading state (if needed)
   - Add error state (if needed)

5. **Animations** (if applicable)
   - Add animations using your animation library (Framer Motion, React Spring, GSAP, CSS transitions, etc.)
   - Use consistent timing from your design system
   - Test animation performance (60fps target)

6. **Accessibility**
   - Add ARIA labels
   - Ensure keyboard navigation
   - Test with screen reader
   - Verify focus management

7. **Responsive**
   - Test mobile breakpoint
   - Test tablet breakpoint
   - Test desktop breakpoint

8. **Testing**
   - Write unit tests
   - Test all props combinations
   - Test all states
   - Test accessibility

---

## Usage Examples

### Basic Usage

```tsx
<[ComponentName]
  [requiredProp]={value}
/>
```

### With All Options

```tsx
<[ComponentName]
  [requiredProp]={value}
  [optionalProp]={value}
  on[Event]={(data) => handleEvent(data)}
  variant="[variant]"
  className="custom-class"
/>
```

### Real-World Example

```tsx
// Example in context of an actual page
<section className="py-20">
  <[ComponentName]
    [props]
  />
</section>
```

---

## Integration Points

### Where Used

**Pages**:
- [Page 1]: [How it's used]
- [Page 2]: [How it's used]

**Other Components**:
- [Parent component]: [Relationship]
- [Sibling component]: [How they interact]

---

## Testing Strategy

### Unit Tests

**Test cases**:

1. Renders with required props
2. Applies className correctly
3. Handles each variant
4. Fires callbacks when expected
5. Shows correct state for each state
6. Accessible (ARIA, keyboard nav)

### Visual Regression

**If applicable**:
- Capture screenshots of each variant
- Capture each state (hover, focus, disabled, etc.)

### Accessibility Tests

- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus management

---

## Edge Cases & Error Handling

### Edge Cases to Handle

1. **[Edge case 1]**: [How to handle]
2. **[Edge case 2]**: [How to handle]
3. **[Edge case 3]**: [How to handle]

### Error Scenarios

1. **[Error scenario 1]**: [How component behaves, user feedback]
2. **[Error scenario 2]**: [How component behaves, user feedback]

---

## Performance Considerations

### Bundle Size

**Expected impact**: [+X kb to bundle]
**Optimization strategies**: [Code splitting, lazy loading, tree shaking, etc.]

### Render Performance

**Optimization strategies**:
- Memoization (`React.memo`, `useMemo`, `useCallback`)
- Virtualization (if list component)
- Debouncing/throttling (if interactive)

---

## Accessibility Checklist

- [ ] Semantic HTML (use correct elements)
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Visible focus indicators
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Screen reader tested
- [ ] Respects `prefers-reduced-motion` (if animated)
- [ ] All interactive elements have accessible names
- [ ] Form inputs have associated labels (if form component)

---

## Design System Compliance

### Component Follows

- [ ] Color tokens from design system
- [ ] Typography scale
- [ ] Spacing scale
- [ ] Border radius values
- [ ] Shadow hierarchy
- [ ] Animation timing (consistent with design system)
- [ ] Visual depth patterns (if applicable to your design system)
- [ ] Hover effects (if interactive component)

---

## Documentation

### Component Documentation

**What to document**:
- Purpose and use cases
- Props API with descriptions
- Variants with examples
- Accessibility features
- Integration examples

**Format**: JSDoc comments + Storybook story (if using Storybook)

---

## Definition of Done

Component is complete when:

- [ ] All functional requirements met
- [ ] All states implemented and tested
- [ ] Responsive across breakpoints
- [ ] Accessibility requirements met
- [ ] Tests written and passing
- [ ] Design system compliance verified
- [ ] Documentation complete
- [ ] Code reviewed (if applicable)
- [ ] Integrated and tested in actual usage context

---

## Example: Filled Template

<details>
<summary>See example: Button component planning</summary>

## Component Overview

**Name**: Button
**Purpose**: Reusable button component with multiple variants for CTAs, links, and actions
**Location**: Site-wide (forms, hero sections, cards, navigation)
**Type**: Interactive presentation component

---

## Requirements

### Functional Requirements

1. Support multiple visual variants (primary, secondary, ghost, link)
2. Handle onClick events
3. Support disabled state
4. Support loading state
5. Allow custom className for one-off styling
6. Work as button or link (`<button>` vs `<a>` tag)

### Non-Functional Requirements

**Performance**: Lightweight (<2kb), no external dependencies
**Accessibility**: WCAG AA, keyboard accessible, screen reader friendly
**Responsiveness**: Text size adjusts on mobile
**Browser Support**: All modern browsers (last 2 versions)

---

## Props/API Design

```typescript
interface ButtonProps {
  // Content
  children: React.ReactNode;  // Button text/content

  // Behavior
  onClick?: () => void;         // Click handler
  href?: string;                // If provided, renders as link
  type?: 'button' | 'submit';   // Form button type
  disabled?: boolean;           // Disabled state
  loading?: boolean;            // Loading state

  // Styling
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'; // Visual style
  size?: 'sm' | 'md' | 'lg';   // Size variant
  className?: string;           // Additional classes

  // Animation
  animated?: boolean;           // Enable hover animation
}
```

---

## Design Specifications

**Colors**:
- Primary: `primary-color`, hover `primary-color-dark` (from design tokens)
- Secondary: `secondary-color`, hover `secondary-color-dark`
- Ghost: `transparent` with `border-primary`, hover `primary-light-bg`
- Link: `primary-text`, hover `primary-text-dark`

**Typography**:
- Font: [Your brand font]
- Small: 14px, font-weight: 600
- Medium: 16px, font-weight: 600
- Large: 18px, font-weight: 600

**Spacing**:
- Small: padding: 8px 16px
- Medium: padding: 12px 24px
- Large: padding: 16px 32px

---

[Rest of template filled out...]

</details>

---

## Tips for Using This Template

### When to Use

- Planning any new component
- Before starting implementation
- When component requirements aren't crystal clear

### When to Skip

- Modifying existing component (minor change)
- Creating trivial wrapper component
- Obvious, simple component with 1-2 props

### Integration with CODA

**For complex components**:
1. Use this template for **Details** section of CODA
2. CODA provides broader context
3. This template provides component-specific details

**Workflow**:
1. CODA Context: Why we need this component
2. CODA Objective: What it should achieve
3. CODA Details: Use this template
4. CODA Acceptance: How we verify it works

---

**Related resources**:

- **CODA Framework**: [`../frameworks/coda.md`](../frameworks/coda.md)
- **Design Variations**: [`../frameworks/design-variations.md`](../frameworks/design-variations.md)
- **Design System**: [`../project/DESIGN-SYSTEM.md`](../project/DESIGN-SYSTEM.md)
