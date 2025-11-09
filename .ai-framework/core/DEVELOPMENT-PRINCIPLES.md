# Development Principles

> **Universal principles - reusable across all projects**
>
> These principles apply to any codebase, any tech stack, any domain.

---

## Core Philosophy

> **"Think deeply, plan thoroughly, implement simply, document clearly."**

This philosophy guides every decision, every line of code, every interaction.

---

## The Four Pillars

### 1. Simplicity First

**Principle**: Every change should impact as little code as possible.

**In Practice**:
- Remove before you add
- Question if complexity is necessary
- Prefer obvious solutions over clever ones
- One small change is better than one large refactor

**Why**: Simple code is:
- Easier to understand
- Easier to test
- Easier to maintain
- Less likely to break

**Example**:
- ❌ Refactor entire component architecture to add one feature
- ✅ Add new prop to existing component, minimal changes

---

### 2. Incremental Progress

**Principle**: Break down complex features into simple, manageable tasks.

**In Practice**:
- No task should take more than 1-2 hours
- Complete and verify each task before starting the next
- Mark tasks as complete immediately (don't batch)
- Adjust plan if a task is too large

**Why**: Small steps:
- Reduce risk
- Allow course correction
- Provide clear progress
- Prevent scope creep

**Example**:
- ❌ "Build entire dashboard" (massive, unclear)
- ✅ "Create dashboard layout" → "Add first widget" → "Add data fetching" (clear steps)

---

### 3. Verification Before Implementation

**Principle**: Always get plan approval before starting work.

**In Practice**:
- Write complete plan before coding
- Present plan to user
- Get explicit approval
- Only then begin implementation

**Why**: Planning is cheaper than refactoring.
- Catch issues early
- Align expectations
- Reduce wasted work
- Build shared understanding

**Example**:
- ❌ Immediately start coding when user asks for feature
- ✅ Write plan, present to user, get feedback, THEN code

---

### 4. Continuous Communication

**Principle**: Provide high-level explanations of changes throughout.

**In Practice**:
- Before: Explain what you're about to do
- During: High-level summary after each step
- After: Review section with complete summary

**Why**: Transparency:
- Builds trust
- Catches misunderstandings early
- Creates permanent record
- Helps user learn

**Example**:
```
"I'm updating the Button component to support the new 'ghost' variant.
This involves adding a new variant to the component props and updating
the styling logic. The changes are isolated to Button.tsx and button.css."
```

Not:
```
"Done."
```

---

### 5. Quality Scoring

**Principle**: Quantify quality objectively before presenting work.

**In Practice**:
- Use defined scoring rubrics for design/UI work
- Calculate numerical score (0-100) based on objective criteria
- Report score with every presentation
- Track scores over time to measure improvement
- Do not present work below quality thresholds

**Why**: Scoring:
- Forces honest self-assessment
- Creates accountability for quality
- Enables objective comparison
- Catches quality issues before user sees them
- Builds trust through transparency
- Prevents recurring mistakes

**Example**:
```
"Design Quality Score: 87/100 (Grade: B)

Category Breakdown:
- Image-to-Text Ratio: 20/25 (80%)
- Design Language: 18/20 (90%)
- Voice & Content: 15/15 (100%)
- Overall: Above 80 threshold, ready to present"
```

Not:
```
"Looks good to me."
```

**Application**:
- **Design/UI work**: Use project-specific scoring rubric
- **Code quality**: Use linting, type checking, test coverage
- **Performance**: Use benchmarks (load time, bundle size)
- **Accessibility**: Use WCAG compliance scores

**Thresholds**:
- Design work: ≥80/100 required for presentation
- Critical categories may have higher thresholds
- Auto-fail on zero-tolerance violations

---

## Standard Workflow

**Step-by-step process for all non-trivial work:**

### Step 1: Think

**Action**: Read the problem. Understand the context.

**Questions to ask**:
- What exactly is being requested?
- Why is this needed?
- What already exists?
- What files/components are involved?
- What are the constraints?

**Output**: Mental model of the problem

---

### Step 2: Research

**Action**: Read the codebase for relevant files, patterns, conventions.

**Use**:
- `Glob` tool to find files
- `Grep` tool to search content
- `Read` tool to examine existing code
- Review design system, style guides, related components

**Output**: Understanding of existing patterns and how this work fits

---

### Step 3: Plan

**Action**: Write a complete plan.

**For simple tasks**: Brief outline in response to user
**For complex tasks**: Use CODA framework (see [`frameworks/coda.md`](../frameworks/coda.md))

**Plan should include**:
- What will be changed
- What files will be modified
- What new files will be created
- What the approach is
- What the expected outcome is

**Output**: Complete, reviewable plan

---

### Step 4: Verify

**Action**: Present plan to user and get approval.

**User responses**:
- "Looks good" → Proceed to Step 5
- "Change X" → Update plan, present again
- "Different approach" → Revise plan, present again

**Output**: Approved plan

---

### Step 5: Implement

**Action**: Execute the plan, one step at a time.

**During implementation**:
- Mark current task as in_progress
- Make the change
- Provide high-level summary: "Updated Button component to support ghost variant"
- Mark task as completed
- Move to next task

**Principles during implementation**:
- Simplicity first (minimal changes)
- Test as you go
- Commit logical chunks (if doing version control)

**Output**: Completed implementation

---

### Step 6: Review

**Action**: Summarize what was done.

**Include**:
- What was changed (high level)
- Why changes were made
- Any decisions made during implementation
- Any issues encountered
- What to test/verify

**Output**: Review section in project plan or summary message

---

## When to Use Advanced Frameworks

### CODA Planning

**Use when**: (see [`frameworks/coda.md`](../frameworks/coda.md))
- New features or major UI sections
- Complex layouts or animations
- Design system changes
- Anything requiring 3+ coordinated changes

**Skip when**:
- Simple bug fixes or typos
- Single-file text updates
- Obvious, trivial tasks

**Why**: CODA catches issues in planning phase, not after coding. The 10 minutes spent planning saves hours of refactoring.

---

### Design Variations

**Use when**: (see [`frameworks/design-variations.md`](../frameworks/design-variations.md))
- ANY design or implementation work
- New UI components
- Layout changes
- Visual redesigns

**Skip when**:
- No visual/design element involved
- User has already fully specified exact design

**Why**: Eliminates guesswork. 5 real implementations beat abstract discussions.

---

## Key Principles Summary

### Simplicity

- ✅ Minimal code changes
- ✅ Obvious solutions
- ✅ Remove before adding
- ❌ Clever abstractions
- ❌ Premature optimization

### Incremental

- ✅ Small, focused tasks
- ✅ Complete each before moving on
- ✅ Immediate completion marking
- ❌ Large, vague tasks
- ❌ Batching completions

### Verification

- ✅ Plan before coding
- ✅ Present for approval
- ✅ Iterate on plan
- ❌ Code first, ask later
- ❌ Assume requirements

### Communication

- ✅ High-level summaries
- ✅ Clear explanations
- ✅ Document decisions
- ❌ Silent implementation
- ❌ Vague updates

---

## Decision Framework

### "Should I use CODA?"

**Ask**: Is this complex? Does it require 3+ coordinated changes?

- **Yes** → Use CODA (Context-Objective-Details-Acceptance)
- **No** → Brief outline is fine

---

### "Should I create design variations?"

**Ask**: Is there a visual/design component?

- **Yes** → Create 5 variations on demo page
- **No** → Standard implementation

---

### "Should I refactor or extend?"

**Ask**: Can I achieve the goal with minimal changes?

- **Yes** → Extend existing code
- **No, but close** → Still extend (prefer simplicity)
- **No, fundamentally broken** → Refactor (but justify in plan)

---

### "Should I ask for clarification?"

**Ask**: Am I unsure of requirements or constraints?

- **Yes** → Ask immediately
- **Maybe** → Ask (don't guess)
- **No** → Proceed with plan

---

## Anti-Patterns to Avoid

### ❌ Implement First, Plan Later

**Wrong**: Immediately start coding when user requests something

**Right**: Think → Research → Plan → Verify → Implement

---

### ❌ Massive Changes

**Wrong**: Refactor entire architecture to add one feature

**Right**: Minimal changes to achieve goal

---

### ❌ Vague Communication

**Wrong**: "Done" or "Fixed it"

**Right**: "Updated Button component to support ghost variant by adding new styling prop and updating CSS classes"

---

### ❌ Skipping Frameworks When Needed

**Wrong**: Dive into complex UI work without design variations

**Right**: Create 5 variations, let user choose, then implement

---

### ❌ Batching Completions

**Wrong**: Complete 5 tasks, mark all done at end

**Right**: Complete task → Mark done → High-level summary → Next task

---

## Integration with Project Specifics

These principles are **universal**. Apply them to any codebase.

**Project-specific rules** (tech stack, design system, domain knowledge) are in [`project/PROJECT.md`](../project/PROJECT.md).

**Workflow**:

1. Follow these principles (how to work)
2. Apply project rules (what to build)
3. Use frameworks as needed (how to plan)

**Example**:

```
User request: "Build a new user profile card component"

Step 1 (Principles): Think through problem
Step 2 (Principles): Research existing card components
Step 3 (Framework): Create 5 design variations
Step 4 (Project): Follow design system (colors, typography, spacing, etc.)
Step 5 (Principles): Present variations for approval
Step 6 (Principles): Implement chosen variation simply
Step 7 (Principles): Communicate changes clearly
```

---

## Success Metrics

These principles are working when:

- ✅ Less back-and-forth iteration needed
- ✅ Fewer bugs introduced
- ✅ Clear understanding of changes
- ✅ Easy to maintain code
- ✅ Fast onboarding for new developers

---

## For New Developers

**Read this file first** before making any changes.

**Then read**:
1. [`frameworks/coda.md`](../frameworks/coda.md) - How to plan complex work
2. [`frameworks/design-variations.md`](../frameworks/design-variations.md) - How to handle design work
3. [`project/PROJECT.md`](../project/PROJECT.md) - This project's specifics

**Philosophy**:

> "Anyone can write complex code. It takes skill to write simple code. It takes discipline to write simple code that solves complex problems."

---

## Summary

**The Universal Principles**:

1. **Simplicity First** - Minimal code changes, obvious solutions
2. **Incremental Progress** - Small tasks, immediate completion
3. **Verification Before Implementation** - Plan → Approve → Code
4. **Continuous Communication** - High-level summaries throughout

**The Universal Workflow**:

Think → Research → Plan → Verify → Implement → Review

**The Universal Philosophy**:

> "Think deeply, plan thoroughly, implement simply, document clearly."

---

**Next steps**:

- **For complex planning**: See [`frameworks/coda.md`](../frameworks/coda.md)
- **For design work**: See [`frameworks/design-variations.md`](../frameworks/design-variations.md)
- **For project specifics**: See [`project/PROJECT.md`](../project/PROJECT.md)
