# Standard Workflow

> **The step-by-step process for all development work**
>
> Follow these steps for consistent, high-quality results.

---

## Overview

**Purpose**: Provide a repeatable process that reduces errors, wasted work, and miscommunication.

**When to use**: Any non-trivial task (not typo fixes or obvious one-line changes)

**Time investment**: 5-15 minutes planning → hours saved in iteration

---

## The 6-Step Process

```
┌─────────────────────────────────────────────────────────┐
│ 1. THINK    → Understand the problem                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 2. RESEARCH → Explore the codebase                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 3. PLAN     → Write complete approach                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 4. VERIFY   → Get user approval                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 5. IMPLEMENT → Execute plan step-by-step               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 6. REVIEW   → Summarize changes                         │
└─────────────────────────────────────────────────────────┘
```

---

## Step 1: THINK

### Purpose
Understand what's being requested and why.

### Actions
- Read the user request carefully
- Identify the core problem
- Understand the desired outcome
- Note any constraints or requirements

### Questions to Ask
- What exactly is being requested?
- Why is this needed? (user value, business goal)
- What are the success criteria?
- Are there any constraints? (performance, compatibility, design)
- What's the scope? (one component? entire page? system-wide?)

### Output
Mental model of the problem and desired outcome.

### Example

**User request**: "The pricing cards need to show discounts"

**Think step**:
- Core problem: Display discount information on pricing cards
- Why: Help users see savings potential
- Success: Discount clearly visible, doesn't clutter design
- Constraints: Must follow design system, work on mobile
- Scope: Update PricingCard component only

---

## Step 2: RESEARCH

### Purpose
Understand existing patterns and how this work fits into the codebase.

### Actions
- Find relevant files (use `Glob` tool for file search)
- Search for similar patterns (use `Grep` tool for content search)
- Read existing implementations (use `Read` tool)
- Review related components, utilities, or systems
- Check design system, style guides, conventions

### Tools to Use
- **Glob**: Find files by pattern (`**/*.tsx`, `components/*/Card.tsx`)
- **Grep**: Search file contents (`discount`, `pricing`, `PricingCard`)
- **Read**: Examine specific files

### What to Look For
- Existing similar components (can we extend instead of creating new?)
- Established patterns (how is similar data displayed elsewhere?)
- Shared utilities (helpers, hooks, constants we should use)
- Design tokens (colors, spacing, typography to use)
- Related features (what might this impact?)

### Output
Understanding of:
- Where code changes will happen
- What patterns to follow
- What to reuse vs. create new

### Example

**Continuing pricing cards example:**

**Research findings**:
- Found `components/PricingCard.tsx` (existing component)
- Found similar discount display in `ProductCard.tsx`
- Design system has `badge` component for labels
- Color token `accent-green-600` used for positive values
- No existing discount utility (need to create or inline logic)

---

## Step 3: PLAN

### Purpose
Create a complete, reviewable plan before writing code.

### Actions
- Write out what will be changed
- List files to modify
- List files to create (if any)
- Describe the approach
- Note any decisions or tradeoffs

### Complexity-Based Planning

**For simple tasks** (one file, obvious approach):
- Brief outline in response to user
- List of steps (3-5 items)

**For complex tasks** (multiple files, design decisions, 3+ coordinated changes):
- Use CODA framework (see [`frameworks/coda.md`](../frameworks/coda.md))
- Full Context-Objective-Details-Acceptance structure

**For design/UI work**:
- Use Design Variations workflow (see [`frameworks/design-variations.md`](../frameworks/design-variations.md))
- Create 5 variations on demo page

### What a Good Plan Includes
- [ ] Clear description of what will change
- [ ] List of files to modify
- [ ] List of files to create (if any)
- [ ] Approach explanation (why this way?)
- [ ] Expected outcome (what does success look like?)
- [ ] Any assumptions or open questions

### Output
Written plan that user can review and approve.

### Example

**Continuing pricing cards example:**

**Simple plan**:

```markdown
## Plan: Add Discount Display to Pricing Cards

### Changes:
1. Update `PricingCard.tsx` to accept optional `discount` prop
2. Add discount badge UI using existing Badge component
3. Calculate and display savings amount

### Files to modify:
- `components/PricingCard.tsx` - Add discount display
- `types/pricing.ts` - Add discount field to PricingCardProps

### Approach:
- Use existing Badge component with accent-green-600 color
- Position discount badge in top-right corner (like ProductCard)
- Show both percentage and dollar savings: "20% off - Save $50"
- Only display if discount > 0

### Expected outcome:
- Discount visible on cards when data includes discount value
- Consistent with existing discount pattern in ProductCard
- Responsive across all breakpoints
```

---

## Step 4: VERIFY

### Purpose
Get user approval before implementing.

### Actions
- Present the plan
- Wait for user response
- Answer questions or clarify
- Iterate on plan if needed

### Possible User Responses

**"Looks good"** or **"Approved"**:
- ✅ Proceed to Step 5 (Implement)

**"Change X"**:
- Update plan based on feedback
- Present updated plan
- Get approval again

**"Different approach"**:
- Revise plan with new approach
- Present alternative
- Get approval

**"Question about Y"**:
- Answer question
- Clarify plan
- Confirm understanding

### Why This Matters
- Catches misunderstandings early (before code is written)
- Aligns expectations
- Reduces wasted work
- Gives user agency over approach

### Output
Approved plan, ready for implementation.

### Example

**Continuing pricing cards example:**

**User response**: "Looks good, but can the discount be more prominent? Maybe a larger badge?"

**Updated plan**:
```markdown
Updated approach:
- Use larger badge size (lg instead of md)
- Increase font weight to bold
- Position at top-right with slight overlap on image
```

**User**: "Perfect, proceed"

---

## Step 5: IMPLEMENT

### Purpose
Execute the approved plan, step by step.

### Actions

**Before starting**:
- Create todo list (if using TodoWrite tool)
- Mark first task as in_progress

**For each task**:
1. Mark task as in_progress
2. Make the change (use Read/Edit/Write tools)
3. Provide high-level summary of what was done
4. Mark task as completed
5. Move to next task

**During implementation**:
- Follow the plan (don't improvise major changes)
- Make minimal changes (simplicity first)
- Test as you go (if applicable)
- Note any issues or deviations

### Communication During Implementation

**After each task**, provide brief summary:

```
"Updated PricingCard component to accept discount prop and display
discount badge using existing Badge component. Badge styled with
accent-green color and positioned in top-right corner."
```

Not just:
```
"Done"
```

### Handling Issues

If you encounter a blocker:
- **Don't guess or work around silently**
- Note the issue
- Ask user for guidance
- Update plan if needed

### Output
Completed implementation matching the approved plan.

### Example

**Continuing pricing cards example:**

**Implementation steps**:

1. ✅ "Added `discount` field to `PricingCardProps` type"
2. ✅ "Updated `PricingCard` component to render Badge when discount is present"
3. ✅ "Styled discount badge with large size, bold font, accent-green color"
4. ✅ "Tested with sample discount data - displaying correctly on mobile and desktop"

---

## Step 6: REVIEW

### Purpose
Summarize what was done and create permanent record.

### Actions
- Write summary of changes
- Note any decisions made during implementation
- Document any deviations from original plan
- List what to test/verify
- Add to projectplan.md or include in response

### What to Include
- **What changed**: High-level summary
- **Why**: Reasoning for approach
- **Decisions made**: Any choices during implementation
- **Issues encountered**: Problems and solutions
- **Testing notes**: What to verify
- **Next steps**: Follow-up work needed (if any)

### Output
Review section documenting the work.

### Example

**Continuing pricing cards example:**

```markdown
## Review: Discount Display on Pricing Cards

### Changes Made:
- Added optional `discount` prop to PricingCard component
- Implemented discount badge display using existing Badge component
- Badge shows percentage and dollar savings when discount is present
- Positioned in top-right corner with slight image overlap

### Technical Details:
- Updated `types/pricing.ts` with discount field
- Modified `components/PricingCard.tsx` to render badge conditionally
- Used design system tokens: accent-green-600, text-white, font-bold
- Badge size: lg (per user feedback)

### Decisions:
- Chose to show both % and $ savings for clarity
- Only display when discount > 0 (hide if no discount)
- Used top-right position to match ProductCard pattern

### Testing:
- Verified mobile responsiveness (iPhone SE, iPad, desktop)
- Tested with various discount values (10%, 25%, 50%)
- Confirmed badge doesn't break layout when long text

### Files Modified:
- `components/PricingCard.tsx`
- `types/pricing.ts`

### Next Steps:
- Update CMS to include discount field in pricing data
- Add discount data to existing pricing cards
```

---

## Workflow Variations

### For Trivial Tasks

**Examples**: Fix typo, update copy, adjust spacing

**Shortened workflow**:
1. Understand change
2. Make change
3. Brief summary ("Fixed typo in hero heading")

**Skip**: Formal plan, verification steps

---

### For Complex Features

**Examples**: New page, complex component, system refactor

**Enhanced workflow**:
1. Think
2. Research
3. **Plan with CODA** (see [`frameworks/coda.md`](../frameworks/coda.md))
4. Verify (iterate on plan)
5. Implement (may take multiple sessions)
6. Review (comprehensive summary)

---

### For Design Work

**Examples**: New component, layout redesign, visual changes

**Enhanced workflow**:
1. Think
2. Research
3. **Create 5 design variations** (see [`frameworks/design-variations.md`](../frameworks/design-variations.md))
4. User selects preferred variation
5. **Plan implementation with CODA**
6. Verify plan
7. Implement chosen variation
8. Review

---

## Integration with Tools

### Todo List Management

**Use TodoWrite tool** for non-trivial tasks:

```
1. ☐ Add discount prop to types
2. ☐ Update PricingCard component
3. ☐ Add discount badge UI
4. ☐ Test responsiveness
```

**Update status as you go**:
- Mark in_progress when starting
- Mark completed immediately when done
- Don't batch completions

---

### Version Control

**If creating commits**:
- Commit logical chunks (one task = one commit)
- Write clear commit messages
- Reference plan or issue numbers

**Follow git protocol** (see [workflows/git-workflow.md](../workflows/git-workflow.md) when available)

---

## Common Pitfalls

### ❌ Skipping Verification

**Wrong**: Write plan, immediately start coding

**Right**: Write plan, present to user, wait for approval, then code

**Why**: User might have different approach or requirements

---

### ❌ Silent Implementation

**Wrong**: Make all changes, then say "Done"

**Right**: After each task, provide high-level summary

**Why**: User sees progress, can catch issues early

---

### ❌ Deviating from Plan

**Wrong**: Encounter issue, implement workaround without mentioning

**Right**: Note issue, ask user for guidance, update plan if needed

**Why**: Transparency prevents surprises, user might have better solution

---

### ❌ Vague Review

**Wrong**: "Updated the component"

**Right**: "Updated PricingCard component to accept discount prop and render discount badge using existing Badge component. Badge styled with accent-green color and positioned in top-right corner per design system."

**Why**: Complete record of what changed and why

---

## Checklist: Good Workflow

Use this to verify you're following the workflow:

- [ ] **Think**: I understand what's being requested and why
- [ ] **Research**: I've explored the codebase and found relevant patterns
- [ ] **Plan**: I've written a complete, reviewable plan
- [ ] **Verify**: I've presented the plan and gotten user approval
- [ ] **Implement**: I'm executing step-by-step with clear communication
- [ ] **Review**: I've summarized changes and documented decisions

---

## Summary

**The workflow**:

Think → Research → Plan → Verify → Implement → Review

**Key principles**:
- Plan before coding
- Get approval before implementing
- Communicate throughout
- Document clearly

**Variations**:
- Simple tasks: Shortened workflow
- Complex features: Add CODA planning
- Design work: Add Design Variations

**Philosophy**:

> "Measure twice, cut once. Planning is cheaper than refactoring."

---

**Related resources**:

- **Core principles**: [DEVELOPMENT-PRINCIPLES.md](./DEVELOPMENT-PRINCIPLES.md)
- **Complex planning**: [frameworks/coda.md](../frameworks/coda.md)
- **Design work**: [frameworks/design-variations.md](../frameworks/design-variations.md)
