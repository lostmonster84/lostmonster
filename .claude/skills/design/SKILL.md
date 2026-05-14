---
name: design
description: Generate or update the /design page from docs/design-config.json - the living design guide.
argument-hint: "[section] - update a specific section, or no args to regenerate the full page"
---

You are the **Design Guide Generator** - you build and maintain a living `/design` page that serves as the single source of truth for the project's visual identity.

## How it works

The design guide is a **config-driven page**. All content lives in `docs/design-config.json`. The page at `src/app/design/page.tsx` reads from this config at build time. Update the config → the page updates automatically.

## State files

- `docs/design-config.json` - **THE source of truth.** All brand content, colours, typography, rules
- `src/app/design/page.tsx` - The page component that renders from the config

## MANDATORY: Every invocation ends with

After ANY work (audit, update, scaffold), ALWAYS:
1. Verify build passes (`npx next build` or equivalent)
2. Print the design guide URL clearly:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Design Guide: http://localhost:3000/design
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

3. If the dev server is running, open it: `open http://localhost:3000/design`

## On invocation

### No arguments - Full audit & regenerate

1. Check if `docs/design-config.json` exists
   - **If NO:** Run the "New project scaffold" flow (see below)
   - **If YES:** Continue with audit
2. Check if `src/app/design/page.tsx` exists
   - **If NO:** Generate the page component from the template (see below)
   - **If YES:** Continue
3. Read `docs/design-config.json`
4. Read the project's actual design token files:
   - `tailwind.config.*` - colours, fonts, border-radius, custom values
   - CSS variable files (search for `design-tokens.css`, `variables.css`, `globals.css`)
   - `src/app/layout.tsx` - font imports
5. **Diff check:** Compare config values against actual codebase values
6. Report any mismatches (e.g., config says `#c41e3a` but CSS var now says `#d41e3a`)
7. Ask user: update config to match code, or flag as intentional?
8. Update `docs/design-config.json` with any corrections
9. Verify build passes
10. Print the URL

### With section argument - Update specific section

Example: `/design colours` or `/design typography`

1. Read `docs/design-config.json`
2. Read the relevant source files for that section
3. Update ONLY that section in the config
4. Verify build passes
5. Report what changed
6. Print the URL

### Available sections

| Section | Config key | Source files |
|---------|-----------|-------------|
| `brand` | `brand` | Project name, tagline - manual |
| `philosophy` | `philosophy` | Manual - brand personality |
| `colours` | `colours` | CSS variables, `tailwind.config.*` |
| `typography` | `typography` | `layout.tsx`, `tailwind.config.*` |
| `layout` | `layout` | `tailwind.config.*` (breakpoints), component patterns |
| `components` | `components` | `globals.css`, component files |
| `motion` | `motion` | Animation CSS, `tailwind.config.*` |
| `photography` | `photography` | Manual - content rules |
| `voice` | `voice` | Manual - tone of voice, persona |
| `antipatterns` | `antiPatterns` | Manual - curated list |
| `files` | `files` | Auto-detect from project structure |
| `socials` | `socials` | OG image specs, social card rules, favicon, social profiles |
| `logos` | `logos` | Logo variants, usage guidelines, clear space, donts, download links |
| `decisions` | `decisions` | DEMX decision timeline - what was chosen, rejected, and why |
| `preferences` | `preferences` | Accumulated likes/dislikes from DEMX sessions and reviews |

## New project scaffold

If `docs/design-config.json` does NOT exist:

1. **Scan the codebase** for design tokens:
   - Find tailwind config → extract colours, fonts, breakpoints, border-radius
   - Find CSS variable files → extract custom properties
   - Find layout.tsx → extract font imports
   - Find animation files → extract easings, keyframes
2. **Ask the user** for brand-specific content:
   - Brand name and tagline
   - Philosophy (headline, description, traits) - or offer to draft from existing docs
   - Voice/persona - who is the target user?
   - Photography rules - what kind of imagery?
3. **Generate `docs/design-config.json`** from scanned + manual content
4. **Generate `src/app/design/page.tsx`** - the page component

### Page component template

The generated page component MUST:
- Be a **server component** (no 'use client', zero client JS)
- Import config: `import designConfig from '../../../docs/design-config.json'`
- Use **inline styles with `style={{ backgroundColor: hex }}`** for colour swatches (works in any project)
- Use **project CSS classes** for layout and typography (read from the project's tailwind config to determine class names)
- Include these helper components: `Swatch`, `Section`, `SectionLabel`, `SectionTitle`, `SectionDesc`, `DoCard`, `DontCard`, `Row`
- Render 10 sections: Hero, Contents, Philosophy, Colours, Typography, Layout, Components, Motion, Photography, Voice, Anti-Patterns, Files
- All content pulled from the config - zero hardcoded brand content

### Live rendered examples (CRITICAL)

Tables and specs are reference material. **Live rendered examples** are what make the design guide actually useful. Every component section MUST include real, interactive examples - not just data tables.

**Buttons - render all variants and sizes:**
- Light background panel: Primary, Secondary, Outline, Ghost buttons with real CTA text
- Dark background panel: Primary, Outline Light, Ghost on dark surface
- Sizes panel: sm, md, lg side by side for scale comparison
- Use real project copy for button text (e.g. "Book Your Adventure", not "Button")

**Cards - render product/content cards:**
- 2-3 cards in a grid on the project's background colour
- Include image placeholder area, title, description, price/metadata, CTA
- Show hover states (shadow-sm → shadow-md transition)
- Use real product names from the project context

**Shadows - render depth comparison:**
- 4 boxes side by side: shadow-sm, shadow-md, shadow-lg, shadow-xl
- Each labelled with its token and usage context

**Typography - render a live type scale:**
- Show every scale token (hero through caption) with real project copy
- Use fluid sizing (`clamp()`) so the user can resize the browser to see responsive behaviour
- Body text sizes separated from heading sizes with a visual divider

**Hover effects - render interactive demos:**
- Cards that demonstrate each hover effect (shadow lift, translate lift, border accent)
- Label says "Hover to see the effect in action"

**General rules for live examples:**
- Wrap each example group in a labelled container (e.g. "Live Examples - Light Background")
- Use the project's actual background colours (chalk/dark) not generic white/gray
- Always pair live examples with the reference table below them - show first, spec second

### Collapsible code blocks (MANDATORY for every component)

Every component section MUST include a copy-paste code block showing the production Tailwind/JSX for that component. These blocks use native HTML `<details>` toggles so they stay collapsed by default and don't push visual examples apart.

**Pattern:**
```jsx
<div className="mt-4 rounded-xl border border-border bg-background p-8">
  <details className="group">
    <summary className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-4
      cursor-pointer select-none list-none flex items-center gap-2
      [&::-webkit-details-marker]:hidden">
      <span className="text-[10px] text-primary transition-transform
        group-open:rotate-90">&#9654;</span> Code - [Component Name]
    </summary>
    <pre className="mt-3 text-xs font-mono leading-relaxed overflow-x-auto
      text-foreground whitespace-pre">{`[production JSX here]`}</pre>
  </details>
</div>
```

**Rules for code blocks:**
- One code block per variant (e.g. Standard Card, Urgent Card, Featured Card are separate blocks)
- Code must match the actual production component, not simplified pseudo-code
- Include Lucide icon imports and Tailwind classes exactly as shipped
- Add JSX comments (`{/* ... */}`) to label sections within the code
- Place code blocks AFTER the visual examples, not before
- If a component has multiple views (grid + list), each view's variants get their own blocks

### Adapting to the project's design language

When generating the page, detect the project's styling approach:
- **If project uses named colour tokens** (e.g., `bg-brand-chalk`, `text-brand-foreground`): use those classes
- **If project uses CSS variables** (e.g., `bg-background`, `text-foreground`): use semantic classes
- **If project uses raw Tailwind** (e.g., `bg-gray-50`, `text-gray-900`): use those directly
- **Detect primary accent colour** from config for section labels, accents, and CTA styling
- **Detect heading font class** (e.g., `font-heading`) from tailwind config or CSS

The goal: the design guide page should look native to the project, not like a generic template.

### SiteFrame / layout considerations

After generating the page, check if the project uses a layout wrapper that adds headers/footers:
- If yes, decide: should `/design` get the standard frame (header + footer) or be standalone?
- Default: include in standard frame (it's a reference page, not an immersive experience)
- If the page renders with unwanted chrome, add it to the frame exclusion list

## Config file format

```json
{
  "brand": { "name": "", "tagline": "", "description": "", "version": "", "date": "" },
  "philosophy": { "headline": "", "description": "", "credo": "", "traits": [] },
  "colours": { "description": "", "brand": [], "semantic": [], "immersive": [], "doRules": [], "dontRules": [] },
  "typography": { "description": "", "fonts": {}, "scale": [], "doRules": [], "dontRules": [] },
  "layout": { "modes": [], "squareEdgeRule": "", "breakpoints": [] },
  "components": { "buttons": {}, "cards": {}, "shadows": [] },
  "motion": { "easings": [], "durations": [], "animations": [], "hoverEffects": [] },
  "photography": { "doRules": [], "dontRules": [], "priority": [] },
  "voice": { "persona": {}, "rule": "", "doExamples": [], "dontExamples": [], "traits": [] },
  "antiPatterns": [],
  "files": [],
  "socials": {
    "ogImage": { "width": 1200, "height": 630, "background": "", "elements": [], "font": "", "example": "" },
    "twitterCard": { "width": 1200, "height": 600, "style": "summary_large_image" },
    "favicon": { "sizes": [], "path": "" },
    "socialProfiles": {},
    "shareCardRules": []
  },
  "logos": {
    "primary": { "path": "", "usage": "", "minSize": "" },
    "variants": [],
    "clearSpace": "",
    "donts": []
  },
  "decisions": [],
  "preferences": {
    "likes": [],
    "dislikes": []
  }
}
```

## Rendering the new sections

### Socials & OG section

Render from `config.socials`:
- **OG Image spec** - dimensions, background style, required elements, font. If `example` path exists, render the actual image inline
- **Social card rules** - bulleted list from `shareCardRules`
- **Favicon** - show the actual favicon if path exists, list sizes
- **Social profiles** - linked icons for each platform

### Logos & Assets section

Render from `config.logos`:
- **Logo variants** - render each logo inline (SVG or img tag). Show primary, wordmark, icon, dark/light background variants
- **Usage table** - which logo goes where
- **Clear space** - visual diagram showing minimum spacing
- **Don'ts** - bulleted list of logo misuse rules
- **Download links** - link directly to the logo files so they're one click away

### Design Decisions timeline

Render from `config.decisions[]`:
- **Timeline layout** - most recent first. Each decision is a card with:
  - Date badge
  - Element name (bold)
  - Chosen approach (with description)
  - Rejected alternatives (muted, collapsed by default)
  - AIDAX score
  - Link to the DEMX demo page (if it still exists)
  - Reason for the choice
- This section grows over time. It's the visual history of the brand evolving

### Design Preferences section

Render from `config.preferences`:
- **Likes** - green-tinted cards, one per item. These are patterns to embrace
- **Dislikes** - red-tinted cards, one per item. These are patterns to avoid
- Both sections are referenced by DEMX before generating variations and by SOFAX during review

---

## DEMX Integration (Automatic)

When DEMX ships a winning variation, the design guide updates automatically as part of the Gaffer's post-ship workflow:

1. **Add decision entry** to `design-config.json → decisions[]`:
   ```json
   {
     "date": "YYYY-MM-DD",
     "element": "What was designed",
     "chosen": "Winning variation name and description",
     "rejected": ["Other approaches and why they lost"],
     "reason": "Why this won - from DEMX recommendation",
     "demxPage": "/demo/[feature]-variations/",
     "aidaxScore": "82/100"
   }
   ```

2. **Capture preferences** - if James expressed likes/dislikes during the DEMX session:
   - "I love this" / "this is exactly right" → add to `preferences.likes`
   - "I hate this" / "never do this" → add to `preferences.dislikes`

3. **Update components** - if the winner established a NEW pattern (new card style, new section layout, new hover effect), add it to the appropriate config section

4. **Regenerate the page** - the /design page auto-updates on next build

This is NOT a separate `/design` invocation - it's baked into the Gaffer's post-ship workflow. The design guide evolves every time a DEMX winner ships.

---

## Design Preferences (Accumulated)

The `preferences` section in `design-config.json` tracks the project owner's design tastes. This accumulates over time across DEMX sessions and design reviews.

**How it feeds the system:**
- **DEMX reads preferences FIRST** (Step 0) - variations that match dislikes are excluded before generation
- **SOFAX checks against dislikes** - any match is a scoring deduction
- **New sessions inherit all previous preferences** - tastes don't reset

**When to update preferences:**
- James says "I love this" / "this is perfect" → capture as a like
- James says "I hate this" / "never do this again" → capture as a dislike
- DEMX rejects a variation James liked → investigate why (scoring mismatch)
- A pattern appears 3+ times across projects → promote to a cross-project rule

---

## Key rules

- **Config is truth.** The page reads from config. Never hardcode values in the page component.
- **Code validates config.** When running a full audit, compare config against actual CSS/Tailwind values.
- **Manual sections stay manual.** Philosophy, voice, photography - these are brand decisions, not code. Don't auto-generate them.
- **Auto sections stay synced.** Colours, typography scale, breakpoints - these should match the code exactly.
- **Build must pass.** Always verify after changes.
- **Always show the URL.** Every invocation ends with the design guide URL printed clearly.
- **Scaffold if missing.** If the page or config doesn't exist, create it. Don't just error out.

## Self-learn focus

- Track which sections go stale fastest (colours change more than philosophy)
- Track common mismatches between config and code
- Track which projects need which sections (SaaS vs marketing site vs adventure brand)
- Track page template adaptations per project (what classes needed changing)
