# CONSTX — Consistency Scanner

> **Purpose:** Scan for UI inconsistencies and flag conflicts for resolution.
> **Usage:** Say "run CONSTX on [page/component]" to scan for inconsistencies.
> **Last Updated:** January 8, 2026

---

## What CONSTX Does

CONSTX is a **consistency scanner**. It doesn't enforce rules — it finds conflicts.

**Process:**
1. **Scan** the target file/component
2. **Compare** against existing patterns in the codebase
3. **Flag inconsistencies** — "This doesn't match that"
4. **Ask** — "Which one is correct?"
5. **Reference** the design guide to resolve

---

## Source of Truth

When inconsistencies are found, resolve by checking:

| App | Design Guide |
|-----|--------------|
| **Marketing** | [apps/marketing/DESIGN-GUIDE.md](../apps/marketing/DESIGN-GUIDE.md) |
| **Admin** | [apps/admin/DESIGN-GUIDE.md](../apps/admin/DESIGN-GUIDE.md) |

The design guides define what's correct. CONSTX finds what doesn't match.

---

## Scan Process

### Step 1: Identify Patterns
Scan the target file for:
- Border radius usage (`rounded-*` classes)
- Color values (hex, rgba, Tailwind colors)
- Font usage (`font-*`, `fontFamily`)
- Animation patterns (easing, duration)
- Spacing (padding, margin, gaps)

### Step 2: Compare Against Codebase
Find similar components and check:
- Do badges use the same shape?
- Do buttons use the same corners?
- Do cards use the same glass effect?
- Do animations use the same easing?

### Step 3: Report Conflicts

```
⚠️ INCONSISTENCY FOUND

File A: apps/admin/src/components/UpcomingTasks.tsx:104
  → Priority badge: `rounded-full`

File B: apps/admin/src/components/SomeOther.tsx:87
  → Priority badge: NO rounded class (sharp corners)

CONFLICT: Priority badges have inconsistent shapes.
QUESTION: Which is correct?
REFERENCE: Check apps/admin/DESIGN-GUIDE.md → Shape Rules
```

### Step 4: Resolution
- Check the design guide
- Pick the correct pattern
- Update the inconsistent files

---

## What CONSTX Scans For

### Shape Consistency
- Are all avatars the same shape?
- Are all status badges the same shape?
- Are all buttons the same shape?
- Are all cards the same shape?

### Color Consistency
- Are accent colors consistent (`#20ED8A`)?
- Are text opacities consistent (`text-white/90`)?
- Are background colors consistent?

### Typography Consistency
- Is Poppins used everywhere?
- Are font weights consistent for similar elements?
- Are text sizes consistent for similar elements?

### Animation Consistency
- Do similar elements animate the same way?
- Are easing functions consistent?
- Are durations consistent?

---

## Output Format

When running CONSTX, output:

```
## CONSTX Scan: [filename]

### ✅ Consistent
- [List of patterns that match the codebase]

### ⚠️ Inconsistencies Found
| Element | This File | Other Files | Question |
|---------|-----------|-------------|----------|
| Badge shape | `rounded-full` | sharp corners in X.tsx | Which is correct? |

### 📚 Resolution
Reference: [Link to relevant design guide section]
Recommendation: [What the design guide says]
```

---

## Example Scan

```
## CONSTX Scan: UpcomingTasks.tsx

### ✅ Consistent
- Poppins font used throughout
- Accent color #20ED8A
- Card has sharp corners

### ⚠️ Inconsistencies Found
| Element | This File | Other Files | Question |
|---------|-----------|-------------|----------|
| Priority badge | `rounded-full` (line 104) | Sharp in OldComponent.tsx:45 | Which is correct? |

### 📚 Resolution
Reference: apps/admin/DESIGN-GUIDE.md → Shape Rules → Round Elements
Answer: Status badges should use `rounded-full` per design guide.
Action: Update OldComponent.tsx to use `rounded-full`.
```

---

## Quick Commands

| Command | Action |
|---------|--------|
| `run CONSTX on [file]` | Scan single file for inconsistencies |
| `run CONSTX on admin` | Scan entire admin app |
| `run CONSTX on marketing` | Scan entire marketing app |
| `CONSTX shapes` | Scan for border-radius inconsistencies only |
| `CONSTX colors` | Scan for color inconsistencies only |
| `CONSTX fonts` | Scan for typography inconsistencies only |

---

## Version History

- **v2.1** (Jan 8, 2026): Rewritten as consistency scanner (diff-based)
- **v2.0** (Jan 8, 2026): Universal framework referencing design guides
- **v1.0** (Jan 6, 2026): Initial framework (rule-based)
