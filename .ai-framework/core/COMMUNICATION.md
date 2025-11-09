# Communication Guidelines

> **How to communicate effectively with users during development**
>
> Clear, concise, informative communication throughout the process.

---

## Core Principle

> **"High-level explanations at every step, not silence or verbosity."**

Users need to know:
1. What you're doing
2. Why you're doing it
3. What the outcome is

They don't need:
- Line-by-line code explanations
- Tool invocation details
- Internal reasoning process (unless asked)

---

## Communication Framework

### Before Starting Work

**Acknowledge and confirm understanding**:

```
"I'll add discount display to the pricing cards. This will involve:
1. Updating the PricingCard component to accept a discount prop
2. Adding a discount badge using the existing Badge component
3. Styling it to match the ProductCard discount pattern

Let me create a detailed plan."
```

**Not**:
```
"OK"
```

**Why**: Shows you understood the request and sets expectations.

---

### During Planning

**Present complete plan with structure**:

```markdown
## Plan: Add Discount Display

### Changes:
- Update PricingCard component
- Add discount badge UI

### Files to modify:
- components/PricingCard.tsx
- types/pricing.ts

### Approach:
[Explanation of approach]

### Expected outcome:
[What success looks like]
```

**Not**:
```
"I'll add a discount thing to the cards"
```

**Why**: Clear plan can be reviewed and approved.

---

### After Each Implementation Step

**Provide high-level summary**:

```
"Added discount field to PricingCardProps type definition. The component
now accepts an optional discount value (percentage as number)."
```

**Not**:
```
"Done"
```

**And not**:
```
"I opened PricingCard.tsx, navigated to line 47, added a new interface
property called discount of type number with a question mark to make it
optional, saved the file, and closed the editor."
```

**Why**: High-level summary gives context without overwhelming detail.

---

### When Completing Work

**Summarize comprehensively**:

```markdown
## Review: Discount Display Complete

### Changes Made:
- Added optional discount prop to PricingCard component
- Implemented discount badge display using existing Badge component
- Badge shows percentage and dollar savings
- Positioned in top-right corner per design system

### Files Modified:
- components/PricingCard.tsx
- types/pricing.ts

### Testing:
- Verified mobile responsiveness
- Tested with various discount values
- Confirmed design system compliance

### Next Steps:
- Update CMS with discount field
- Add discount data to pricing cards
```

**Not**:
```
"All done"
```

**Why**: Complete record of what changed and what to do next.

---

## Communication by Phase

### Phase 1: Understanding (THINK)

**When**: User makes a request

**Goal**: Confirm understanding

**Template**:
```
"I understand you want to [REQUEST]. This will [PURPOSE/VALUE].
Let me [NEXT STEP]."
```

**Example**:
```
"I understand you want to add team member photos to the about page.
This will help visitors connect with the people behind the business.
Let me research the existing team section and create a plan."
```

---

### Phase 2: Research (RESEARCH)

**When**: Exploring the codebase

**Goal**: Transparent about what you're finding

**Template**:
```
"I've found [RELEVANT PATTERNS/FILES]. This suggests [APPROACH]."
```

**Example**:
```
"I've found the existing about page structure and team data model.
There's already a TeamMember type defined. This suggests we can extend
the existing component rather than create a new one."
```

---

### Phase 3: Planning (PLAN)

**When**: Creating the plan

**Goal**: Clear, structured, reviewable plan

**Template**:
```markdown
## Plan: [Task Name]

### Overview:
[Brief description]

### Changes:
[What will change]

### Files to modify:
[List of files]

### Approach:
[How and why]

### Expected outcome:
[Success criteria]
```

---

### Phase 4: Verification (VERIFY)

**When**: Presenting plan for approval

**Goal**: Clear invitation for feedback

**Template**:
```
"I've created a plan for [TASK]. Please review and let me know if you'd
like any changes before I begin implementation."
```

**Or** (after user feedback):
```
"I've updated the plan based on your feedback [SPECIFIC CHANGES].
Does this approach look good?"
```

---

### Phase 5: Implementation (IMPLEMENT)

**When**: After each task completion

**Goal**: Progress updates with context

**Template**:
```
"[ACTION COMPLETED]. [BRIEF EXPLANATION OF WHAT IT DOES]."
```

**Examples**:
```
"Added team member photo support to the About page. The TeamMember
component now renders profile images with the existing glass morphism
card style."

"Updated team data model to include profileImage field. This allows
the CMS to manage team member photos."

"Implemented responsive image layout. Photos display in 2-column grid
on mobile, 3-column on tablet, 4-column on desktop."
```

---

### Phase 6: Review (REVIEW)

**When**: Work is complete

**Goal**: Comprehensive summary with next steps

**Template**:
```markdown
## Review: [Task Name] Complete

### Summary:
[High-level overview of what was accomplished]

### Changes Made:
[Bullet list of specific changes]

### Technical Details:
[Any important implementation notes]

### Files Modified:
[List of files changed]

### Testing/Verification:
[What was tested, what to verify]

### Next Steps:
[Follow-up work, if any]
```

---

## Tone and Style

### Be Concise

**Good**:
```
"Updated Button component to support ghost variant"
```

**Too verbose**:
```
"I have successfully completed the modifications to the Button component
which now includes support for a new ghost variant that was previously
not available in the component API"
```

**Too terse**:
```
"Done"
```

---

### Be Specific

**Good**:
```
"Added glassmorphism effect to pricing cards using backdrop-blur-lg
and bg-white/10 classes per design system"
```

**Too vague**:
```
"Made the cards look better"
```

---

### Be Action-Oriented

**Good**:
```
"Refactored animation timing to use naturalEase constant instead of
hardcoded values for consistent motion design"
```

**Too passive**:
```
"Some changes were made to the animations"
```

---

### Use Plain Language

**Good**:
```
"Split large component into smaller, focused components for easier maintenance"
```

**Too technical** (unless user is technical):
```
"Decomposed monolithic component into discrete, single-responsibility
functional units adhering to SOLID principles"
```

---

## Handling Different Situations

### When You Encounter a Blocker

**Template**:
```
"I've encountered [ISSUE]. This prevents [IMPACT]. I can either:
1. [OPTION A]
2. [OPTION B]
3. [OPTION C]

Which approach would you prefer?"
```

**Example**:
```
"I've encountered a TypeScript error with the discount calculation. The
existing pricing structure doesn't include a base price field needed for
the calculation. I can either:
1. Add basePrice field to the pricing type
2. Calculate discount from the current price (assumes no discount by default)
3. Pass discount amount directly instead of calculating

Which approach would you prefer?"
```

---

### When You Need Clarification

**Template**:
```
"Before proceeding, I need clarification on [QUESTION]. This will affect
[IMPACT].

[OPTION A] or [OPTION B]?"
```

**Example**:
```
"Before proceeding, I need clarification on the discount display format.
Should it show:

A. Percentage only: "20% off"
B. Dollar savings only: "Save $50"
C. Both: "20% off - Save $50"

This will affect the badge width and responsive behavior."
```

---

### When User Provides Feedback on Plan

**Template**:
```
"I've updated the plan based on your feedback:
- [CHANGE 1]
- [CHANGE 2]

[UPDATED APPROACH SUMMARY]

Does this approach work for you?"
```

**Example**:
```
"I've updated the plan based on your feedback:
- Changed badge size from md to lg
- Made discount text bold instead of regular weight
- Positioned badge with slight overlap on image edge

The discount badge will now be more prominent and match the style you
described. Does this approach work for you?"
```

---

### When Deviating from Plan

**Template**:
```
"While implementing [TASK], I discovered [ISSUE/OPPORTUNITY]. I've
adjusted the approach to [NEW APPROACH] because [REASON]. This is a
minor deviation from the original plan but achieves the same outcome."
```

**Example**:
```
"While implementing the discount badge, I discovered the existing Badge
component doesn't support the lg size variant. I've adjusted the approach
to use a custom styled div with the same visual appearance. This is a
minor deviation from the original plan but achieves the same outcome
without modifying the core Badge component."
```

---

## Anti-Patterns to Avoid

### ❌ Silent Implementation

**Wrong**:
```
[Makes 5 changes without any communication]
"All done! Let me know if you need changes."
```

**Right**:
```
[After each change]
"Added discount field to types"
"Updated PricingCard component"
"Styled discount badge"
"Tested responsiveness"
"All changes complete - see review summary below"
```

---

### ❌ Tool Spam

**Wrong**:
```
"Using Read tool to read PricingCard.tsx"
"Using Edit tool to modify line 47"
"Using Glob tool to find types"
```

**Right**:
```
"Updated PricingCard component to accept discount prop"
[Tool usage happens silently]
```

---

### ❌ Over-Explaining

**Wrong**:
```
"I opened the PricingCard.tsx file and navigated to the props interface
definition which is located at line 47 of the file and then I added a
new property to the interface called discount which has the type of
number and I made it optional by adding a question mark after the property
name because not all pricing cards will have discounts..."
```

**Right**:
```
"Added optional discount prop to PricingCard component (number type,
represents percentage)"
```

---

### ❌ Vague Summaries

**Wrong**:
```
"Made some updates to the component"
```

**Right**:
```
"Added discount badge display to PricingCard component using existing
Badge component and design system tokens"
```

---

## Formatting Guidelines

### Use Markdown

**Structure messages with**:
- Headers (##) for sections
- Lists (- or 1.) for steps
- Code blocks (```) for code
- Bold (**) for emphasis
- Inline code (`) for technical terms

---

### Use Visual Hierarchy

**Good**:
```markdown
## Plan: Add Discount Display

### Changes:
- Update PricingCard component
- Add discount badge UI

### Files to modify:
- `components/PricingCard.tsx`
- `types/pricing.ts`
```

**Poor**:
```
Plan Add Discount Display Changes Update PricingCard component Add
discount badge UI Files to modify components/PricingCard.tsx types/pricing.ts
```

---

### Break Up Long Text

**Good**:
```markdown
I've completed the discount display feature. Here's what changed:

**Component Updates**:
- PricingCard now accepts optional discount prop
- Badge component used for discount display
- Positioned in top-right corner

**Styling**:
- Used accent-green-600 from design system
- Large size badge for prominence
- Bold text per user feedback

**Testing**:
- Verified on mobile (iPhone SE)
- Verified on tablet (iPad)
- Verified on desktop
```

**Poor**:
```
I've completed the discount display feature the PricingCard now accepts
optional discount prop and Badge component is used for discount display
positioned in top-right corner using accent-green-600 from design system
large size badge for prominence bold text per user feedback verified on
mobile iPhone SE and tablet iPad and desktop
```

---

## Response Templates

### Starting Work
```
"I'll [TASK]. This will [VALUE/PURPOSE].

Let me [NEXT STEP - research/plan/create variations]."
```

### Presenting Plan
```markdown
## Plan: [Task Name]

[Structured plan with sections]

Does this approach work for you?
```

### Implementation Update
```
"[COMPLETED ACTION]. [BRIEF CONTEXT/EXPLANATION]."
```

### Completion
```markdown
## Review: [Task Name] Complete

### Summary:
[Overview]

### Changes:
[List]

### Testing:
[What was verified]

### Next Steps:
[Follow-up items]
```

### Asking Question
```
"I need clarification on [QUESTION] before proceeding.

This will affect [IMPACT].

[OPTION A] or [OPTION B]?"
```

---

## Communication Checklist

Before sending a message, verify:

- [ ] **Clear**: User will understand what I'm communicating
- [ ] **Concise**: No unnecessary verbosity
- [ ] **Specific**: Concrete details, not vague statements
- [ ] **Action-oriented**: What was done or will be done
- [ ] **Contextual**: Why this matters or how it fits
- [ ] **Formatted**: Proper markdown, visual hierarchy
- [ ] **Appropriate level**: High-level for updates, detailed for plans/reviews

---

## Summary

**Communication principles**:

1. **High-level explanations** - Not too terse, not too verbose
2. **Clear structure** - Use markdown, headers, lists
3. **Continuous updates** - After each step, not just at end
4. **Context included** - What and why, not just what
5. **Appropriate detail** - Match detail level to phase

**Key templates**:

- Understanding: "I'll [TASK] to [VALUE]. Let me [NEXT STEP]."
- Planning: Structured plan with sections
- Implementing: "[ACTION]. [CONTEXT]."
- Reviewing: Comprehensive summary with next steps
- Clarifying: Clear question with options

**Anti-patterns to avoid**:

- ❌ Silent implementation
- ❌ Tool invocation spam
- ❌ Over-explaining
- ❌ Vague summaries

**Philosophy**:

> "Communicate enough that the user feels informed and in control, but not so much that you overwhelm with detail."

---

**Related resources**:

- **Workflow**: [WORKFLOW.md](./WORKFLOW.md)
- **Principles**: [DEVELOPMENT-PRINCIPLES.md](./DEVELOPMENT-PRINCIPLES.md)
