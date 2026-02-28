# UXPATX - Standard UX Patterns for Lost Monster

> **Purpose:** Define mandatory UX patterns for any interface built on the Lost Monster website. These are non-negotiable standards.
> **Usage:** Reference when building ANY list, form, or interactive element. Copy patterns directly.
> **Last Updated:** February 28, 2026

---

## Philosophy

**Never half-arse UX.** Every interface should feel modern, intuitive, and consistent. These patterns aren't optional -- they're the minimum standard.

**Lost Monster brand rules apply throughout:**
- Dark backgrounds with gradients ONLY (no light page backgrounds)
- Cards use glassmorphism: `bg-white/5 backdrop-blur-md border`
- Dynamic colour via `style={{ color: color.accent }}`
- Typography: `text-6xl md:text-8xl lg:text-9xl` for heroes
- Personal "I" voice not corporate "we"
- Grid pattern background texture
- Key metrics always visible: 50+, 70%, 4.9/5, 2-4 wks

---

## 1. Reorderable Lists

**ALWAYS use drag & drop** -- never up/down arrow buttons.

### Required Implementation

```tsx
// Dependencies: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

// Sortable Row Component
function SortableRow({ item, onRowClick, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onRowClick(item)}
      className={`
        flex items-center gap-4 p-4 cursor-pointer
        hover:bg-white/10 transition-colors
        ${isDragging ? 'opacity-50 shadow-lg z-50' : ''}
      `}
    >
      {/* DRAG HANDLE - Required */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-neutral-400 hover:text-neutral-200 cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="flex-1">{/* row content */}</div>

      {/* Delete - with stopPropagation */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(item); }}
        className="p-2 text-neutral-400 hover:text-red-400"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

// Parent List Component
function SortableList({ items, setItems, onSave }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)

    // Optimistic update
    const newItems = arrayMove(items, oldIndex, newIndex)
    setItems(newItems)

    // Persist to DB via Prisma
    await onSave(newItems)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableRow key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
```

### Visual Requirements

- **Drag handle**: 6-dot grip icon (`GripVertical` from lucide-react)
- **Cursor**: `cursor-grab` on hover, `cursor-grabbing` when dragging
- **Drag state**: Reduce opacity, add shadow, increase z-index
- **Drop zone**: Subtle highlight where item will land
- **Dark theme**: Use `hover:bg-white/10` not `hover:bg-gray-50`

### Never Do This

```tsx
// BAD - Arrow buttons are outdated
<button onClick={() => moveUp(item)}><ArrowUp /></button>
<button onClick={() => moveDown(item)}><ArrowDown /></button>
```

---

## 2. Clickable Rows

**The whole row is the click target** -- not a tiny edit icon.

### Required Implementation

```tsx
// Row click opens detail/edit
<div
  onClick={() => openEditModal(item)}
  className="cursor-pointer hover:bg-white/10 transition-colors"
>
  {/* Row content */}

  {/* Delete button - MUST stopPropagation */}
  <button
    onClick={(e) => {
      e.stopPropagation() // Critical!
      confirmDelete(item)
    }}
  >
    <Trash2 />
  </button>
</div>
```

### Visual Requirements

- **Cursor**: `cursor-pointer` on the entire row
- **Hover state**: `hover:bg-white/10` (dark theme compatible)
- **Affordance**: Users should intuitively know rows are clickable

### Never Do This

```tsx
// BAD - Tiny edit icon that's hard to click
<div className="flex items-center">
  <span>{item.name}</span>
  <button onClick={() => edit(item)}><Edit className="w-3 h-3" /></button>
</div>
```

---

## 3. Delete Confirmations

**Use modal confirmations** -- never browser `confirm()`.

### Required Implementation

```tsx
// State
const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

// Trigger
const handleDeleteClick = (item: Item) => {
  setItemToDelete(item)
  setDeleteConfirmOpen(true)
}

// Confirm action
const handleDeleteConfirm = async () => {
  if (!itemToDelete) return
  await deleteItem(itemToDelete.id)
  setDeleteConfirmOpen(false)
  setItemToDelete(null)
}

// Dialog component -- use glassmorphism for Lost Monster brand
<ConfirmDialog
  isOpen={deleteConfirmOpen}
  onClose={() => { setDeleteConfirmOpen(false); setItemToDelete(null) }}
  onConfirm={handleDeleteConfirm}
  title="Delete Item"
  message={`Are you sure you want to delete "${itemToDelete?.name}"? This cannot be undone.`}
  confirmText="Delete"
  variant="danger"
/>
```

### Never Do This

```tsx
// BAD - Browser confirm is ugly and blocks the main thread
if (confirm('Delete this item?')) {
  await deleteItem(id)
}
```

---

## 4. Image/File Uploaders

**Support BOTH drag/drop AND URL import** -- this is standard.

### Required Features

1. **Drag & drop files** from computer
2. **Click to browse** files
3. **Paste URL** to import from web
4. **Preview** before upload completes
5. **Progress indicator** during upload
6. **Remove button** on uploaded images

### Implementation Pattern

```tsx
function ImageUploader({ currentImage, onImageUploaded, entityId }) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || null)
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // File upload handler
  const handleFile = async (file: File) => {
    // Validate type & size
    // Show preview immediately
    // Upload to storage
    // Call onImageUploaded with URL
  }

  // URL import handler
  const handleUrlSubmit = async () => {
    // Validate URL
    // Show preview
    // Fetch & re-upload to your storage (don't hotlink!)
    // Call onImageUploaded with new URL
  }

  return (
    <div className="space-y-3">
      {preview ? (
        // Show preview with remove button
      ) : (
        <>
          {/* Drag/drop zone -- dark theme */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-neutral-700 hover:border-neutral-500 cursor-pointer bg-white/5 rounded-xl p-8"
          >
            <Upload className="text-neutral-400" />
            <p className="text-neutral-300">Drop image or click to upload</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-700" />
            <span className="text-xs text-neutral-500">or</span>
            <div className="flex-1 h-px bg-neutral-700" />
          </div>

          {/* URL input toggle */}
          {showUrlInput ? (
            <div className="flex gap-2">
              <input type="url" value={urlInput} onChange={...}
                className="bg-white/5 border border-neutral-700 rounded-lg px-3 py-2 text-white" />
              <button onClick={handleUrlSubmit}
                style={{ backgroundColor: color.accent }}
                className="px-4 py-2 rounded-lg text-black font-bold">
                Import
              </button>
            </div>
          ) : (
            <button onClick={() => setShowUrlInput(true)}
              className="text-neutral-400 hover:text-white text-sm">
              Import from URL
            </button>
          )}
        </>
      )}
      <input ref={fileInputRef} type="file" className="hidden" />
    </div>
  )
}
```

### API Endpoint for URL Import

```tsx
// app/api/upload-from-url/route.ts
export async function POST(request: Request) {
  const { url, entityId } = await request.json()

  // Fetch image from URL
  const response = await fetch(url)
  const contentType = response.headers.get('content-type')

  // Validate it's an image
  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Invalid image type' }, { status: 400 })
  }

  // Check size
  const buffer = await response.arrayBuffer()
  if (buffer.byteLength > MAX_SIZE) {
    return NextResponse.json({ error: 'Image too large' }, { status: 400 })
  }

  // Upload to your storage
  const file = new File([buffer], 'imported.jpg', { type: contentType })
  const { url: storageUrl } = await uploadToStorage(file, path)

  return NextResponse.json({ url: storageUrl })
}
```

---

## 5. Loading States

**Always show loading feedback** -- never leave users wondering.

### Button Loading

```tsx
<button disabled={loading}
  style={{ backgroundColor: loading ? undefined : color.accent }}
  className={`px-6 py-3 rounded-lg font-bold ${loading ? 'bg-neutral-700 text-neutral-400' : 'text-black'}`}>
  {loading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Saving...
    </>
  ) : (
    'Save Changes'
  )}
</button>
```

### List Loading

```tsx
if (loading && items.length === 0) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full"
        style={{ borderColor: color.accent, borderTopColor: 'transparent' }} />
    </div>
  )
}
```

### Skeleton Loading (for better UX)

```tsx
// Show skeleton that matches the shape of real content
// Use glassmorphism style for Lost Monster brand
{loading ? (
  <div className="animate-pulse">
    <div className="h-6 bg-white/10 rounded w-1/3 mb-2" />
    <div className="h-4 bg-white/10 rounded w-1/2" />
  </div>
) : (
  <RealContent />
)}
```

---

## 6. Empty States

**Guide users when there's no data** -- never show a blank page.

```tsx
{items.length === 0 && (
  <div className="text-center py-12">
    <Icon className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
    <p className="text-neutral-400 mb-4">No items yet</p>
    <button onClick={() => openAddModal()}
      style={{ color: color.accent }}
      className="font-medium hover:underline">
      Add your first item
    </button>
  </div>
)}
```

---

## 7. Form Patterns

### Auto-generate slugs from titles

```tsx
const handleNameChange = (value: string) => {
  setName(value)
  if (mode === 'add') {
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  }
}
```

### Disabled states during submission

```tsx
<button
  type="submit"
  disabled={saving || !isValid}
  style={{ backgroundColor: saving || !isValid ? undefined : color.accent }}
  className={`rounded-lg font-bold ${saving || !isValid ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed' : 'text-black'}`}
>
```

### Success/error feedback

```tsx
try {
  await saveItem(data)
  toast.success('Item saved')
  onClose()
} catch (error) {
  toast.error(error.message || 'Failed to save')
}
```

### Form inputs (Lost Monster dark theme)

```tsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="w-full bg-white/5 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-current focus:outline-none"
  style={{ focusBorderColor: color.accent }}
  placeholder="Enter value..."
/>
```

---

## 8. Auto-Save (Optimistic UI)

**No save buttons** -- changes apply immediately. This is the gold standard.

### The Pattern

```
BAD:  Edit -> Make changes -> Click "Save" -> Wait -> "Saved!"
GOOD: Edit -> Make changes -> (instant feedback, already saved)
```

**Inspiration:** Railway, Notion, Linear, Figma -- all use auto-save.

### Required Implementation

```tsx
function SettingToggle({ setting, currentValue, accentColor }) {
  const [value, setValue] = useState(currentValue)
  const [saving, setSaving] = useState(false)

  const handleChange = async (newValue: boolean) => {
    const previousValue = value

    // 1. Update UI immediately (optimistic)
    setValue(newValue)
    setSaving(true)

    try {
      // 2. Sync to server in background (Prisma via API route)
      await updateSetting(setting, newValue)

      // 3. Show subtle confirmation (optional)
    } catch (error) {
      // 4. Rollback on error
      setValue(previousValue)
      toast.error('Failed to save setting')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <label className="text-neutral-300">{setting.label}</label>
      <Switch
        checked={value}
        onCheckedChange={handleChange}
        disabled={saving}
      />
    </div>
  )
}
```

### When to Auto-Save

| Scenario | Auto-Save? | Notes |
|----------|------------|-------|
| Toggle switches | Yes | Always instant |
| Dropdown selections | Yes | Change = save |
| Single input fields | Yes | Save on blur |
| Multi-field forms | Depends | Consider draft state |
| Destructive actions | No | Always confirm first |

### Visual Feedback Options

1. **Subtle checkmark** -- appears briefly next to the field
2. **Accent flash** -- field border briefly shows accent colour
3. **Toast notification** -- "Settings saved" (can be annoying if overused)
4. **Nothing** -- changes just work (Railway does this)

### Delete with Undo (Optimistic Delete)

```tsx
const handleDelete = (item: Item) => {
  // 1. Remove from UI immediately
  setItems(prev => prev.filter(i => i.id !== item.id))

  // 2. Show undo toast with countdown
  const toastId = toast.loading(
    <div className="flex items-center gap-3">
      <span>Deleted "{item.name}"</span>
      <button onClick={() => undoDelete(item, toastId)}>Undo</button>
    </div>,
    { duration: 5000 }
  )

  // 3. Actually delete after countdown (if not undone)
  setTimeout(async () => {
    try {
      await deleteFromServer(item.id) // Prisma via API route
    } catch {
      // Restore on error
      setItems(prev => [...prev, item])
      toast.error('Failed to delete')
    }
  }, 5000)
}

const undoDelete = (item: Item, toastId: string) => {
  toast.dismiss(toastId)
  setItems(prev => [...prev, item])
  toast.success('Restored')
}
```

### Never Do This

```tsx
// BAD - Save button for simple toggles
<Switch checked={value} onCheckedChange={setValue} />
<button onClick={handleSave}>Save Changes</button>

// BAD - Modal confirmation for non-destructive changes
const handleChange = (value) => {
  if (confirm('Save this change?')) {  // NO!
    setValue(value)
  }
}
```

---

## Quick Reference Checklist

Before shipping any Lost Monster page, verify:

- [ ] Lists use drag & drop for reordering (not arrows)
- [ ] Rows are fully clickable (not just edit icons)
- [ ] Delete actions use modal confirmation (not `confirm()`)
- [ ] Image uploaders support both file upload AND URL import
- [ ] Loading states shown during all async operations
- [ ] Empty states guide users to add first item
- [ ] Forms auto-generate slugs where applicable
- [ ] Toast notifications for success/error feedback
- [ ] Keyboard support (Enter to submit, Escape to cancel)
- [ ] **Settings use auto-save** (no save button for toggles/dropdowns)
- [ ] **Dark theme throughout** (no light backgrounds on pages)
- [ ] **Glassmorphism cards** (bg-white/5 backdrop-blur-md)
- [ ] **Dynamic accent colour** (style={{ color: color.accent }})
- [ ] **Personal "I" voice** in any copy/labels

---

## Dependencies

```json
{
  "@dnd-kit/core": "^6.x",
  "@dnd-kit/sortable": "^8.x",
  "@dnd-kit/utilities": "^3.x",
  "lucide-react": "latest",
  "sonner": "latest"
}
```

---

## Related Frameworks

| Framework | Use When |
|-----------|----------|
| **SOFAX** | Auditing existing pages for UX quality |
| **DEMX** | Exploring design variations |
| **CRUDX** | Scaffolding new CRUD pages |
| **APEX** | Full feature orchestration |

---

**Framework Status:** Lost Monster Edition
**Last Updated:** February 28, 2026
**Version:** 2.0 (Lost Monster Adapted)
