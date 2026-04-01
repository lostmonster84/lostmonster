# UXPATX - Standard UX Patterns for Admin/Dashboard Interfaces

> **Purpose:** Define mandatory UX patterns for any admin or dashboard interface. These are non-negotiable standards.
> **Usage:** Reference when building ANY list, table, form, or CRUD interface. Copy patterns directly.
> **Last Updated:** January 25, 2026

---

## Philosophy

**Never half-arse UX.** Every admin interface should feel modern, intuitive, and consistent. These patterns aren't optional - they're the minimum standard.

---

## 1. Reorderable Lists

**ALWAYS use drag & drop** - never up/down arrow buttons.

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
        hover:bg-gray-50 dark:hover:bg-white/5 transition-colors
        ${isDragging ? 'opacity-50 shadow-lg z-50' : ''}
      `}
    >
      {/* DRAG HANDLE - Required */}
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="flex-1">{/* row content */}</div>

      {/* Delete - with stopPropagation */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(item); }}
        className="p-2 text-gray-400 hover:text-red-500"
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

    // Persist to DB
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

### ❌ Never Do This

```tsx
// BAD - Arrow buttons are outdated
<button onClick={() => moveUp(item)}><ArrowUp /></button>
<button onClick={() => moveDown(item)}><ArrowDown /></button>
```

---

## 2. Clickable Rows

**The whole row is the click target** - not a tiny edit icon.

### Required Implementation

```tsx
// Row click opens detail/edit
<div
  onClick={() => openEditModal(item)}
  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
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
- **Hover state**: Subtle background change
- **Affordance**: Users should intuitively know rows are clickable

### ❌ Never Do This

```tsx
// BAD - Tiny edit icon that's hard to click
<div className="flex items-center">
  <span>{item.name}</span>
  <button onClick={() => edit(item)}><Edit className="w-3 h-3" /></button>
</div>
```

---

## 3. Delete Confirmations

**Use modal confirmations** - never browser `confirm()`.

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

// Dialog component
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

### ❌ Never Do This

```tsx
// BAD - Browser confirm is ugly and blocks the main thread
if (confirm('Delete this item?')) {
  await deleteItem(id)
}
```

---

## 4. Image/File Uploaders

**Support BOTH drag/drop AND URL import** - this is standard.

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
          {/* Drag/drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed cursor-pointer ..."
          >
            <Upload />
            <p>Drop image or click to upload</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* URL input toggle */}
          {showUrlInput ? (
            <div className="flex gap-2">
              <input type="url" value={urlInput} onChange={...} />
              <button onClick={handleUrlSubmit}>Import</button>
            </div>
          ) : (
            <button onClick={() => setShowUrlInput(true)}>
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
// /api/[entity]/upload-from-url/route.ts
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

  // Upload to your storage (R2, S3, etc.)
  const file = new File([buffer], 'imported.jpg', { type: contentType })
  const { url: storageUrl } = await uploadToStorage(file, path)

  return NextResponse.json({ url: storageUrl })
}
```

---

## 5. Loading States

**Always show loading feedback** - never leave users wondering.

### Button Loading

```tsx
<button disabled={loading}>
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
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  )
}
```

### Skeleton Loading (for better UX)

```tsx
// Show skeleton that matches the shape of real content
{loading ? (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
) : (
  <RealContent />
)}
```

---

## 6. Empty States

**Guide users when there's no data** - never show a blank page.

```tsx
{items.length === 0 && (
  <div className="text-center py-12">
    <Icon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500 mb-4">No items yet</p>
    <button onClick={() => openAddModal()} className="text-primary font-medium">
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
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
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

---

## 8. Auto-Save (Optimistic UI)

**No save buttons** - changes apply immediately. This is the gold standard.

### The Pattern

```
❌ BAD:  Edit → Make changes → Click "Save" → Wait → "Saved!"
✅ GOOD: Edit → Make changes → ✓ (instant feedback, already saved)
```

**Inspiration:** Railway, Notion, Linear, Figma - all use auto-save.

### Required Implementation

```tsx
function SettingToggle({ setting, currentValue }) {
  const [value, setValue] = useState(currentValue)
  const [saving, setSaving] = useState(false)

  const handleChange = async (newValue: boolean) => {
    const previousValue = value

    // 1. Update UI immediately (optimistic)
    setValue(newValue)
    setSaving(true)

    try {
      // 2. Sync to server in background
      await updateSetting(setting, newValue)

      // 3. Show subtle confirmation (optional)
      // Could be a checkmark, green flash, or nothing at all
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
      <label>{setting.label}</label>
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
| Toggle switches | ✅ Yes | Always instant |
| Dropdown selections | ✅ Yes | Change = save |
| Single input fields | ✅ Yes | Save on blur |
| Multi-field forms | ⚠️ Depends | Consider draft state |
| Destructive actions | ❌ No | Always confirm first |

### Visual Feedback Options

1. **Subtle checkmark** - appears briefly next to the field
2. **Green flash** - field background flashes green
3. **Toast notification** - "Settings saved" (can be annoying if overused)
4. **Nothing** - changes just work (Railway does this)

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
      await deleteFromServer(item.id)
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

### ❌ Never Do This

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

Before shipping any admin page, verify:

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
| **UXAIDA** | Auditing existing pages for UX quality |
| **CONSX** | Checking visual consistency |
| **PIXELX** | Implementing pixel-perfect fixes |
| **CRUDX** | Scaffolding new CRUD pages |

---

**Framework Status:** Active
**Author:** Claude Code
**Last Updated:** January 25, 2026
