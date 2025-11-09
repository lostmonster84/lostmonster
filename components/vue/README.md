# Vue Components

Modern Vue 3 components using the Composition API and TypeScript.

## Tech Stack

- **Vue 3** - Latest Vue with Composition API
- **TypeScript** - Full type safety
- **Scoped Styles** - Component-scoped CSS
- **Script Setup** - Streamlined syntax
- **Accessibility** - WCAG 2.1 AA compliant

## Available Components

### UI Basics
- `Button/` - Buttons with variants
- `Input/` - Form inputs
- `Card/` - Content cards
- `Modal/` - Dialogs and overlays
- `Tooltip/` - Contextual tooltips

### Forms
- `Form/` - Form wrapper with validation
- `Select/` - Dropdown selects
- `Checkbox/` - Checkboxes
- `Radio/` - Radio buttons
- `DatePicker/` - Date selection

### Layout
- `Container/` - Page containers
- `Grid/` - Grid system
- `Sidebar/` - Sidebar navigation

### Data Display
- `Table/` - Data tables
- `List/` - Lists
- `Badge/` - Badges
- `Avatar/` - Avatars

### Feedback
- `Alert/` - Alerts
- `Toast/` - Toast notifications
- `Spinner/` - Loading states
- `Progress/` - Progress bars

## Usage Example

```vue
<script setup lang="ts">
import Button from '@/components/vue/Button/Button.vue'
import Card from '@/components/vue/Card/Card.vue'
import Input from '@/components/vue/Input/Input.vue'

const handleSubmit = () => {
  console.log('Submitted')
}
</script>

<template>
  <Card>
    <h2>Sign Up</h2>
    <Input
      label="Email"
      type="email"
      required
    />
    <Button
      variant="primary"
      @click="handleSubmit"
    >
      Submit
    </Button>
  </Card>
</template>
```

## Component Structure

```
ComponentName/
├── README.md
├── ComponentName.vue
├── ComponentName.test.ts
├── types.ts
├── index.ts
└── examples/
    ├── basic.vue
    └── advanced.vue
```

## Component Template

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => ({
  [`variant-${props.variant}`]: true,
  [`size-${props.size}`]: true,
  disabled: props.disabled
}))
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
/* Component styles */
</style>
```

## Composition API Patterns

### Reactive State
```vue
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// Primitive values
const count = ref(0)

// Objects
const state = reactive({
  name: '',
  email: ''
})

// Computed values
const doubled = computed(() => count.value * 2)
</script>
```

### Lifecycle Hooks
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
</script>
```

### Watchers
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})
</script>
```

### Composables
```typescript
// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--

  return {
    count,
    doubled,
    increment,
    decrement
  }
}
```

```vue
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const { count, increment } = useCounter()
</script>
```

## Props and Emits

### Props
```vue
<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false
})
</script>
```

### Emits
```vue
<script setup lang="ts">
const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [data: FormData]
  close: []
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
```

### v-model
```vue
<script setup lang="ts">
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
```

## Slots

```vue
<script setup lang="ts">
// No special setup needed for slots
</script>

<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>

    <main>
      <slot />
    </main>

    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

Usage:
```vue
<Card>
  <template #header>
    <h2>Title</h2>
  </template>

  <p>Content here</p>

  <template #footer>
    <button>Action</button>
  </template>
</Card>
```

## Testing

Components use Vitest and Vue Test Utils:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('applies variant class', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('variant-primary')
  })
})
```

## Styling

### Scoped Styles
```vue
<style scoped>
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

/* Deep selector for child components */
:deep(.child) {
  color: blue;
}

/* Slot content selector */
:slotted(span) {
  font-weight: bold;
}
</style>
```

### CSS Modules
```vue
<script setup lang="ts">
import styles from './Button.module.css'
</script>

<template>
  <button :class="styles.button">
    <slot />
  </button>
</template>
```

## Accessibility

All components must:
- Support keyboard navigation
- Include ARIA attributes
- Work with screen readers
- Have focus management

```vue
<template>
  <button
    role="button"
    :aria-label="label"
    :aria-pressed="isPressed"
    @keydown="handleKeyDown"
  >
    <slot />
  </button>
</template>
```

## TypeScript Support

### Component Types
```typescript
// types.ts
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}
```

### Instance Types
```vue
<script setup lang="ts">
import { ref } from 'vue'
import type Button from './Button.vue'

const buttonRef = ref<InstanceType<typeof Button>>()
</script>
```

## Best Practices

1. **Use script setup** - Cleaner, more concise
2. **Type everything** - Props, emits, refs
3. **Scoped styles** - Avoid style conflicts
4. **Composables for logic** - Reusable functionality
5. **Proper emit typing** - Type-safe events
6. **Accessibility** - ARIA and keyboard support
7. **Test components** - Unit and integration tests

## Contributing

When adding Vue components:
1. Use Composition API with script setup
2. TypeScript for all props and emits
3. Write tests with Vitest
4. Document props and events
5. Include usage examples
6. Ensure accessibility
7. Add to this README

---

For examples, check the [`examples/`](../../examples/) directory.
