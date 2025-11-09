# Design Variations Workflow - CONSTANT

> **Core Workflow Principle - Apply to ALL Design Work**
>
> When proposing any new design or implementation, ALWAYS create 5 variations on a demo page.

## The Rule

**WHENEVER** the user requests:

- A new UI component or section
- A layout change or redesign
- A new feature with visual elements
- Any design implementation or improvement

**YOU MUST**:

1. Create **exactly 5 different variations** of the design
2. Build them on a **live demo page** in your project structure (e.g., `/demo/[feature-name]`, `/prototypes/[feature-name]`, or similar)
3. Present each variation with clear **characteristics** (pros/cons)
4. Include a **comparison summary** at the bottom
5. Wait for the user to **select their preferred version**
6. Only then implement the chosen variation in the actual codebase

> **Note**: Demo page location depends on your project structure. Examples: Next.js App Router uses `app/demo/`, Create React App might use `src/demos/`, Vue might use `src/views/demos/`. Choose what fits your setup.

## Why This Workflow

- **Eliminates guesswork**: User sees actual implementations, not descriptions
- **Prevents rework**: All iteration happens on demo page, not production code
- **Better outcomes**: 5 variations often reveals the best solution isn't the first idea
- **Fast iteration**: Easy to compare side-by-side
- **Design exploration**: Pushes creative thinking beyond first instinct
- **Clear decision**: User picks visually, not from abstract descriptions

## Variation Strategy

**Each of the 5 variations should explore different approaches:**

1. **Variation A**: Conservative/safe approach (minimal change from existing patterns)
2. **Variation B**: Modern/bold approach (push design boundaries)
3. **Variation C**: Data-driven approach (emphasize metrics/proof)
4. **Variation D**: Minimal/restrained approach (maximum simplicity, remove all decoration)
5. **Variation E**: Experimental/asymmetric approach (break the grid)

**OR** explore different dimensions:

- Layout variations (centered vs asymmetric vs grid)
- Visual weight variations (prominent photo vs prominent text)
- Interaction variations (hover effects, animations, transitions)
- Hierarchy variations (what gets emphasis)
- Spacing variations (tight vs generous whitespace)

The goal: **Give the user meaningful choices**, not 5 nearly-identical options.

## Demo Page Structure

Every demo page MUST follow this conceptual structure:

**1. HEADER Section**
- Title: "[Feature Name] - 5 Variations"
- Subtitle: Brief explanation of what's being explored
- Purpose: Set context for the variations

**2-6. FIVE VARIATION Sections** (one per variation)

For each variation:
- **Heading**: "Variation A/B/C/D/E: [Descriptive Name]"
- **Summary**: Brief description of this approach
- **Live Demo**: Actual working implementation
- **Characteristics Card**:
  - ✅ Strengths (2-3 items)
  - ⚠️ Tradeoffs/considerations
  - ❌ Weaknesses (if applicable)
  - 📊 Best suited for: [use case]

**7. COMPARISON SUMMARY Section**
- Side-by-side comparison table or grid
- Decision guidance: "Choose A if...", "Choose B if..."
- Visual quick reference

---

### Example Implementation (React/Next.js)

<details>
<summary>Click to see React/Next.js example</summary>

```tsx
// app/demo/[feature-name]/page.tsx (Next.js App Router)
export default function FeatureVariationsDemo() {
  return (
    <main>
      {/* 1. HEADER */}
      <section>
        <h1>[Feature Name] - 5 Variations</h1>
        <p>Explore different approaches. Choose what works best.</p>
      </section>

      {/* 2. VARIATION A */}
      <section>
        <h2>Variation A: [Descriptive Name]</h2>
        <p>Brief summary</p>
        <div>{/* Live demo */}</div>
        <div>
          <h4>Characteristics:</h4>
          <ul>
            <li>✅ Strength 1</li>
            <li>⚠️ Consideration</li>
          </ul>
        </div>
      </section>

      {/* Repeat for B, C, D, E */}

      {/* 7. COMPARISON */}
      <section>
        <h2>Which Variation Works Best?</h2>
        {/* Comparison grid */}
      </section>
    </main>
  );
}
```
</details>

### Example Implementation (Vue)

<details>
<summary>Click to see Vue 3 example</summary>

```vue
<!-- src/views/demos/FeatureVariations.vue -->
<template>
  <main>
    <!-- 1. HEADER -->
    <section>
      <h1>{{ featureName }} - 5 Variations</h1>
      <p>Explore different approaches. Choose what works best.</p>
    </section>

    <!-- 2-6. VARIATIONS -->
    <section v-for="variation in variations" :key="variation.id">
      <h2>{{ variation.name }}</h2>
      <p>{{ variation.summary }}</p>
      <div>
        <component :is="variation.component" />
      </div>
      <div>
        <h4>Characteristics:</h4>
        <ul>
          <li v-for="char in variation.characteristics" :key="char">
            {{ char }}
          </li>
        </ul>
      </div>
    </section>

    <!-- 7. COMPARISON -->
    <section>
      <h2>Which Variation Works Best?</h2>
      <!-- Comparison grid -->
    </section>
  </main>
</template>

<script setup lang="ts">
const featureName = 'User Profile Card';
const variations = [/* variation configs */];
</script>
```
</details>

> **Adapt to your framework**: The structure is universal, syntax varies. Use your framework's conventions for components, routing, and styling.

## Demo Page Requirements

**EVERY demo page MUST include:**

- ✅ Clear header explaining what's being explored
- ✅ Exactly 5 distinct variations (not 3, not 7 - always 5)
- ✅ Each variation gets its own section with visual separator
- ✅ Each variation has descriptive name (not just "Option 1")
- ✅ Each variation includes characteristics card (pros/cons)
- ✅ Live implementation (not mockups or screenshots)
- ✅ Follows your project's design system
- ✅ Comparison summary at bottom
- ✅ Responsive across all breakpoints

**File naming conventions** (adapt to your project structure):

**Next.js App Router**:
- `app/demo/[feature-name]/page.tsx`
- Examples: `app/demo/hero-layouts/page.tsx`, `app/demo/user-card-variations/page.tsx`

**React (CRA/Vite)**:
- `src/demos/[FeatureName]Variations.tsx`
- Examples: `src/demos/HeroLayoutsVariations.tsx`, `src/demos/UserCardVariations.tsx`

**Vue**:
- `src/views/demos/[FeatureName]Variations.vue`
- Examples: `src/views/demos/HeroLayoutsVariations.vue`, `src/views/demos/UserCardVariations.vue`

**Svelte**:
- `src/routes/demos/[feature-name]/+page.svelte`
- Examples: `src/routes/demos/hero-layouts/+page.svelte`

## Integration with CODA Framework

**CODA + Design Variations workflow:**

1. **CONTEXT**: Understand current state
2. **OBJECTIVE**: Define what we're designing and why
3. **DETAILS**: Instead of choosing one approach, create 5 variations demo page
4. **PRESENT DEMO PAGE**: User reviews 5 options
5. **USER SELECTS**: "I prefer Variation C"
6. **ACCEPTANCE**: Now implement chosen variation with CODA acceptance criteria

The variations demo page IS part of the CODA planning process - it happens in the Details phase.

## Example Workflow

```
User: "I want to improve the team member cards on the about page"

AI: "Let me create 5 different variations for you to choose from. I'll build them on a demo page."

AI: [Creates app/demo/team-card-variations/page.tsx with 5 approaches:
  A. Photo-first with minimal text
  B. Equal weight photo + bio
  C. Text-first with small photo
  D. Glassmorphic overlay on photo
  E. Timeline-style with role history
]

AI: "I've created 5 variations at /demo/team-card-variations. Which approach do you prefer?"

User: "I like Variation D - the glassmorphic overlay approach"

AI: "Perfect! Let me implement Variation D on the actual team page."

AI: [Implements chosen variation in app/about/team/page.tsx]
```

## When to Skip Variations

**ONLY skip the 5-variations workflow for:**

- Obvious bug fixes with one clear solution
- Tiny text changes or typo corrections
- Copy/content updates (not design)
- Implementing a design the user has already fully specified
- Emergency hotfixes where speed is critical

**If in doubt, create the variations.** It's better to explore options than guess wrong.

## Best Practices

**DO:**

- Make variations meaningfully different (not just color changes)
- Include at least one "bold" option that pushes boundaries
- Include at least one "minimal" option that strips away decoration
- Think about different user types/needs with each variation
- Use real content (not Lorem Ipsum) so user sees actual result
- Make variations production-ready (not sketches)

**DON'T:**

- Create 5 nearly-identical options differing only in button color
- Make all 5 variations "safe" - push creative boundaries
- Use placeholder content - show real implementation
- Implement in production before user selects
- Present variations as text descriptions instead of live demos

## Characteristics Card Guidelines

For each variation, the characteristics card should answer:

- ✅ **What are the strengths?** (2-3 pros)
- ⚠️ **What are the tradeoffs?** (what you gain vs lose)
- 📊 **What's this best suited for?** (use case fit)
- 🎯 **Who is this for?** (user type/preference)

Example:

```
✅ Photo gets maximum prominence
✅ Clean, magazine-style layout
✅ Works beautifully with high-quality images
⚠️ Requires excellent photography to shine
⚠️ Less text = less SEO content
📊 Best for: Portfolios, visual-heavy case studies
🎯 For users who: Want bold, image-first impact
```

## Comparison Summary Guidelines

The final comparison section should help the user decide by showing:

1. **Side-by-side strengths**: What makes each unique
2. **Use case fit**: "Best for X situation"
3. **Visual quick reference**: Icons or thumbnails
4. **Decision guidance**: Help user match their needs to variation

Don't just repeat the characteristics - synthesize them into a decision aid.

## Demo Page Lifecycle

1. **Create**: Build demo page with 5 variations
2. **Present**: Show user the demo page
3. **Discuss**: User feedback, questions, preferences
4. **Iterate**: Adjust variations based on feedback (add 6th if needed)
5. **Select**: User picks preferred variation
6. **Implement**: Build chosen variation into actual codebase
7. **Archive**: Demo page stays in repo as design documentation

Demo pages are permanent - they document the design exploration process.

## Real-World Example Scenarios

### Example 1: User Profile Card Variations

**Scenario**: Design a user profile card component

**5 Variations Created**:
- **Variation A**: Centered layout, photo above name
- **Variation B**: Side-by-side layout, photo left of info
- **Variation C**: Compact horizontal, minimal spacing
- **Variation D**: Card-less design, just typography and subtle borders
- **Variation E**: Asymmetric grid, large photo with overlaid text

**User selected**: Variation B (side-by-side) for better use of horizontal space

---

### Example 2: Dashboard Layout Variations

**Scenario**: Design the main dashboard layout

**5 Variations Created**:
- **Variation A**: Traditional sidebar + main content
- **Variation B**: Top horizontal nav + content grid
- **Variation C**: Tab-based navigation with content panels
- **Variation D**: Card-based modular dashboard (drag-and-drop ready)
- **Variation E**: Split-screen (analytics left, actions right)

**User selected**: Variation A for familiarity, with plans to explore D for power users

---

> **Your project's examples**: Once you create variations in your codebase, document them here as reference for future work.

## Quick Reference

| Question                                | Answer                                  |
| --------------------------------------- | --------------------------------------- |
| How many variations?                    | **Always 5**                            |
| Where do they go?                       | `app/demo/[feature-name]/page.tsx`      |
| When do I create them?                  | **Every design/implementation request** |
| What if user wants 3?                   | Create 5 anyway - more options = better |
| What if I'm sure of the right approach? | Create 5 anyway - you might be wrong    |
| Can variations be similar?              | No - make them meaningfully different   |
| Do I implement before user selects?     | **NO - wait for user to choose**        |

## Summary

**The constant**: 5 variations, demo page, user selects, then implement.

This is not optional for design work - it's the standard workflow.

Think of it as:

- **Architect**: Shows client 5 building designs before construction
- **Chef**: Offers 5 tasting menu options before final meal
- **Tailor**: Presents 5 suit styles before cutting fabric

We design in variations, not in assumptions.

---

**Philosophy**: "The best design often isn't the first idea. Give the user 5 choices, and the right answer reveals itself."
