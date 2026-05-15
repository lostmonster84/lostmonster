# SOFAX Supplement: Pitch Decks & Slide Presentations

> Researched by SCOUTX · Created 2026-05-14
> Last updated: 2026-05-14

---

## What This Covers

Design quality review for pitch decks and slide presentations: investor decks, partner decks, sales decks, conference talks, internal strategy decks. Evaluating slide-level visual craft, narrative arc, readability under projection, and the slidedeck-versus-slidedoc decision - not the copy itself (that is WORDX) or whether it persuades a specific buyer (that is AIDAX).

**This supplement is universal.** It must NEVER reference a specific project, brand, colour, or client. It teaches the craft - the patterns that make deck design work regardless of who it is for. The project's design guide handles brand identity. This handles quality.

**Decks are not web pages.** A deck is read at distance, in sequence, paced by a presenter, in a darkened room - then forwarded as a file. None of the landing-page or platform-UI rubric assumptions hold. This supplement exists because SOFAX kept reviewing decks against a web-UI mental model and missing what actually makes a slide fail.

---

## Related Supplements

| Worker | File | Department |
|--------|------|------------|
| SOFAX | `supplements/SOFAX-decks.md` | reviewers |

Standalone supplement - not part of a multi-worker research set. If a `DEMX-decks` builder supplement or `WORDX-decks` copy supplement is created later, all three MUST be cross-linked and kept in sync from that point.

---

## Studied Examples

| # | Name / URL | Why It's Here | Key Takeaway | Date Accessed |
|---|-----------|---------------|--------------|---------------|
| 1 | Duarte - "The slides you deliver versus the Slidedoc you leave behind" (`duarte.com/blog/the-slides-you-deliver-versus-the-slidedoc-you-leave-behind`) | The canonical statement of the slidedeck-vs-slidedoc split | A projected deck and a leave-behind are different tools. "You wouldn't use your toothbrush to comb your hair." Build the cinematic deck first, then derive the slidedoc | 2026-05-14 |
| 2 | "I Reviewed 50 Startup Pitch Decks" (`focusedchaos.co/p/i-reviewed-50-startup-pitch-decks`) | Concrete failure-mode census across 50 real decks | 93% had design issues: inconsistent fonts/spacing/alignment, AI-generated filler imagery, pixelated logos, messy screenshots, appendix-grade slides projected as main slides | 2026-05-14 |
| 3 | Airbnb (2008 seed deck) | The reference for restraint | Each slide presents one thing quickly. Minimal text, images and charts carry the point. Problem framed first, with data, before the solution | 2026-05-14 |
| 4 | Dropbox (seed deck) | Simplicity plus live proof | Four concise bullets after the problem, then a demo slide showing the product working. The demo is the visual, not a decoration of it | 2026-05-14 |
| 5 | Uber (2008 deck) | One idea per slide at the no-traction stage | Brief bullet points, no charts, compelling idea per slide. Proves a deck can be sparse and still land if each slide asserts exactly one thing | 2026-05-14 |
| 6 | YouTube (2005 deck) | Structure beating polish | Almost no design, but problem / solution / competition / plan are each their own clean slide. A focused structure survives weak styling; styling never rescues a weak structure | 2026-05-14 |
| 7 | Facebook (2004 deck) | White space and hierarchy | Clean visual hierarchy, generous white space, usage stats as the hero content. The slide breathes; the eye knows where to land | 2026-05-14 |
| 8 | Rippling (2020 deck) | A single number given its own slide | Invented one internal metric and dedicated a whole slide to explaining it visually. When a number is the point, the number is the slide | 2026-05-14 |
| 9 | Reddit (2024 IPO deck) | Brand-aligned visual identity | The deck's visual language was built from memes - the thing the company is. Visual identity expressing the product, not decorating it | 2026-05-14 |
| 10 | Tala (2021 deck) | Consistency slide to slide | Every slide carries the same colours, tone, type. No slide looks like it came from a different deck | 2026-05-14 |
| 11 | Perplexity (2024 deck) | Device mockups for a digital product | Interface mockups show exactly how the product looks in use, so the audience can picture it without the presenter describing it | 2026-05-14 |
| 12 | ElevenLabs (2023 deck) | Narrative arc opening | Opens with a personal origin story, narrows hard to one initial market. The deck is a story, not a list of slides | 2026-05-14 |
| 13 | Y Combinator - "How to design a better pitch deck" (`ycombinator.com/library/4T-how-to-design-a-better-pitch-deck`) | Investor-facing baseline craft | One message per slide; legible at distance; the deck supports the speaker, it is not the speaker | 2026-05-14 |
| 14 | Nancy Duarte - planning guidance (via Duarte / Slidedocs body of work) | The pre-design discipline | Do not start in the slide tool. Think the whole arc first; linear tools force linear thinking before the story is set | 2026-05-14 |

---

## Patterns (What the Best All Do)

### Pattern 1: One Idea Per Slide
**What:** Every slide carries exactly one idea - one claim, one number, one image, one moment in the story. If a slide needs "and also", it is two slides. The presented deck's word budget is roughly 30-40 words per slide, and lower is better.
**Applicability:** Universal
**Evidence:** #3 Airbnb (one thing per slide, fast), #5 Uber (sparse bullets, one idea each), #8 Rippling (one metric = one slide), #13 YC ("one message per slide")
**How to review:** For each slide, state its single idea in one sentence. If you cannot - or if it takes "and" - the slide is overloaded. Flag it for a split. Count words on the heaviest three slides; if any clears ~40, flag density.

### Pattern 2: Slidedeck or Slidedoc - Never Both in One Artifact
**What:** A *projected deck* is cinematic, sparse, presenter-paced. A *slidedoc* is a dense, self-explaining leave-behind read without a presenter. They are different tools with different rules. Trying to serve both in one file produces a deck too dense to present and too shallow to read alone.
**Applicability:** Universal
**Evidence:** #1 Duarte (the canonical split), #14 Duarte (think the whole first), #2 focusedchaos (appendix-grade slides projected as main slides was a top failure mode)
**How to review:** First, identify which artifact you are reviewing - ask if it is unclear. Review a projected deck against sparseness and visual impact. Review a slidedoc against standalone comprehension. If one file is trying to be both, that IS the finding: recommend splitting into two artifacts. Never score a dense leave-behind as a failed presentation deck or vice versa.

### Pattern 3: Readable From the Back of the Room
**What:** A projected slide is read at distance, often through a washed-out projector. Body text large, contrast high, never more than a few lines. If the audience has to squint or read fast to keep up, the slide has failed before the presenter speaks.
**Applicability:** Universal (projected decks); relaxed for slidedocs, which are read on a screen at arm's length
**Evidence:** #13 YC (legible at distance), #7 Facebook (clean hierarchy, the eye lands), #2 focusedchaos ("tiny text better suited for appendices" was a recurring fault)
**How to review:** Shrink the slide thumbnail to roughly 25% and check whether the single idea still reads. Check text-to-background contrast as if projected (assume the projector lifts blacks and washes colour). Flag any body text that survives only at full size.

### Pattern 4: Show, Do Not Decorate
**What:** The strongest deck visuals are *proof* - product screenshots, real interface mockups, a live demo frame, an actual chart of real data. The weakest are *decoration* - stock photography, generic icons, AI-generated filler images, abstract shapes that mean nothing.
**Applicability:** Universal
**Evidence:** #4 Dropbox (demo slide as the visual), #11 Perplexity (device mockups show the real thing), #3 Airbnb (charts carry the point), #2 focusedchaos (AI filler imagery and messy screenshots flagged as a 93%-of-decks problem)
**How to review:** For each visual, ask "is this proof, or is this filler?" Filler imagery, decorative stock photos, and AI-generated images are flags. Screenshots must be clean and intentional, not grabbed and dropped. A slide whose only visual is a decorative shape is a slide with no visual.

### Pattern 5: A Narrative Arc, Not a Stack of Slides
**What:** A deck is a story with a shape - it builds. A common arc is make them care, then make them understand, then give them a reason to believe (Hearts, Minds, Wallets). A deck that is a disconnected pile of slides has no momentum, and the audience feels it.
**Applicability:** Universal
**Evidence:** #12 ElevenLabs (origin story then narrow market), #14 Duarte (think the whole arc first), #2 focusedchaos ("disjointed slides rather than a coherent narrative" was a core failure)
**How to review:** Read the slide headlines in sequence, nothing else. They should tell the story on their own. If the headline sequence reads as a coherent argument, the arc holds. If it reads as a table of contents, flag the deck as structurally flat.

### Pattern 6: One Visual Identity, Every Slide
**What:** Type, colour, spacing, and layout grid are constant across every slide. No slide looks imported from another deck. Consistency is what makes a deck feel built rather than assembled.
**Applicability:** Universal
**Evidence:** #10 Tala (every slide carries the same identity), #9 Reddit (one coherent visual language throughout), #2 focusedchaos (inconsistent fonts, spacing, and misalignment were the single most common design fault)
**How to review:** Lay out all slides as a grid (contact-sheet view). Scan for the outlier - a different typeface, a shifted margin, a recoloured heading, a misaligned logo. One typeface family, two to three weights, a fixed colour set. Any drift is a flag.

### Pattern 7: Headlines That Assert, Not Label
**What:** The slide headline states the takeaway, not the topic. "Bookings doubled in two quarters" beats "Traction". "Product Overview" tells the audience nothing; the headline is a wasted line if it only names the slide.
**Applicability:** Universal
**Evidence:** #2 focusedchaos (generic headlines like "Product Overview" flagged explicitly), #13 YC (one *message* per slide - the headline carries it)
**How to review:** Read each headline alone. Does it make a claim, or just name a category? Label-headlines ("Solution", "Market", "Team") are flags - the headline should be the one thing you would want remembered from that slide.

### Pattern 8: When a Number Is the Point, the Number Is the Slide
**What:** A figure that matters - a market size, a growth rate, a key metric - gets scale, space, and isolation. It is the hero element, not a cell in a table or a clause in a paragraph.
**Applicability:** Universal
**Evidence:** #8 Rippling (a metric earns its own slide), #7 Facebook (usage stats as hero content)
**How to review:** Find the deck's most important numbers. Are they sized and placed as heroes, or buried in body text and dense tables? A critical number rendered at body-text size is a flag.

### Pattern 9: Cinematic Restraint on Dark Decks
**What:** Dark-themed projected decks read as premium when the darkness has *atmosphere* - subtle depth, texture, controlled glow - and as cheap when it is flat black or, the opposite failure, busy with competing effects. Restraint is the craft: enough treatment to feel built, never enough to compete with the one idea.
**Applicability:** Universal (dark-themed projected decks)
**Evidence:** #6 YouTube (restraint beats polish), #3 Airbnb (the slide stays calm under its one idea), #2 focusedchaos ("excessive colours without contrast; cluttered layouts")
**How to review:** On dark decks, check the base is not flat pure black and not a noisy field of effects. Background treatment should sit *behind* the idea - if any background element pulls the eye before the headline does, it is over-treated. Never pure `#000000`; never a light show.

---

## Anti-Patterns (What to Avoid)

| # | Anti-Pattern | Why It Fails | Example |
|---|-------------|-------------|---------|
| 1 | Slidedoc projected as a deck | Dense, wordy slides read at distance overwhelm the audience and upstage the presenter. The deck becomes a teleprompter | A slide with three paragraphs of body copy shown on a projector |
| 2 | Filler and degraded imagery | AI-generated stock images, pixelated logos, and messy dropped-in screenshots signal a deck assembled without care - the audience reads that as the company | A blurry competitor logo next to a crisp one; a generic AI "business people" image |
| 3 | Label headlines | "Product Overview", "Our Solution", "Team" waste the most-read line on the slide and flatten the narrative arc into a table of contents | Every slide headline is a one-word category noun |
| 4 | Identity drift across slides | Inconsistent type, colour, spacing, and alignment make the deck feel assembled from parts - the single most common design fault across reviewed decks | Slide 4 uses a different heading font; slide 9's logo sits 20px off the others |
| 5 | Decoration competing with the idea | Background patterns, motion, or colour blocks that pull the eye before the headline does. The slide's one job is the one idea | An animated gradient and floating shapes behind a key metric |
| 6 | The "Thank You" closing slide | The last slide is the one left on screen during Q&A - the highest-dwell slide in the deck - spent on a pleasantry instead of the mission, the ask, or contact details | Final slide reads only "Thank You!" with no contact info |
| 7 | Tiny text and appendix slides in the main flow | Detail tables and dense reference content belong in an appendix or the slidedoc, not projected mid-presentation | A 12-row financial table at 10pt shown as slide 8 of 14 |

---

## Benchmarks

| Metric | Target | Notes |
|--------|--------|-------|
| Slide count (projected deck) | 10-15 | Below 10 often skips the arc; above 15 loses pacing. Investor decks cluster here |
| Words per slide (projected deck) | 30-40 maximum, fewer is better | Slidedocs are exempt - they are read, not projected |
| Ideas per slide | Exactly 1 | If it needs "and also", split it |
| Headline style | Assertion, not label | Every headline states a takeaway |
| Typeface families | 1 (plus an optional mono for data) | 2-3 weights total across the whole deck |
| Body text size (projected) | Legible at ~25% thumbnail scale | Proxy for back-of-room readability |
| Contrast (projected) | High - assume the projector washes it out | Test against a lifted-black, desaturated worst case |
| Critical numbers | Hero-sized, isolated | Never buried in body text or dense tables |
| Closing slide | Mission / ask / contact | Never a bare "Thank You" |
| Leave-behind | A separate artifact (slidedoc) | Decide deck-vs-doc before building, not after |

---

## Mobile Patterns

Decks do not have a "mobile viewport" the way web pages do, but they ARE viewed small and forwarded as files. Treat that as the equivalent constraint.

- **Thumbnail / contact-sheet view.** Decks are scrubbed as thumbnail grids in file browsers and presentation tools. Each slide's single idea should survive at thumbnail size. This is also the fastest consistency check (see Pattern 6).
- **Laptop and phone forwarding.** A deck emailed onward is read on a laptop or phone with no presenter. If the projected deck is genuinely sparse, it will NOT read alone - which is the entire reason the slidedoc leave-behind exists. Do not "fix" a sparse projected deck for small-screen reading; recommend the slidedoc instead.
- **Leave-behind PDF readability.** When reviewing the slidedoc artifact, body text must be comfortable at 100% on a 13-inch laptop screen. That is its native reading context.
- **Aspect ratio.** Confirm one aspect ratio (16:9 standard) across every slide. A single 4:3 slide in a 16:9 deck letterboxes and breaks the grid.

---

## Accessibility Patterns

- **Projection contrast is worse than screen contrast.** Projectors lift blacks and wash colour. Review contrast against that degraded case, not against the pristine file. Text that passes on a monitor can vanish on a projector.
- **Colour must not be the only signal.** Status, comparison, and category encoded in colour alone fail for colour-blind viewers and on poor projectors. Pair colour with label, shape, or position.
- **Charts must carry their own labels.** Direct labels on data beat a separate legend the audience has to cross-reference at distance. A legend-dependent chart is a readability flag.
- **The leave-behind PDF needs real structure.** When a slidedoc is exported to PDF, headings should be real text (not flattened images), reading order should be correct, and meaningful images need alt text. A deck that is only forwarded as image-flattened slides is inaccessible to screen readers.
- **Reduced motion.** Any animation or transition must not be load-bearing - the deck must read identically as a static export.

---

## Performance Patterns

- **File weight for email.** The leave-behind is forwarded by email and hits attachment caps. Compress images; a 40MB deck does not arrive. Target a deck that sends without a file-transfer link.
- **Image compression.** Full-resolution screenshots and photos bloat the file with no visible benefit at slide scale. Export at presentation resolution, not source resolution.
- **Embedded video.** Embedded video balloons file size and breaks across players. Prefer a linked video with a strong poster frame, unless the deck must present offline.
- **Font embedding.** If the deck relies on a specific typeface, it must be embedded or the file must be shared as PDF. A deck that re-flows on the recipient's machine because the font is missing has failed Pattern 6 the moment it is opened.
- **Generated-PDF hygiene.** When a deck PDF is generated by screenshotting a rendered build, confirm no presenter chrome, navigation controls, or dev-tooling overlays are baked into the exported pages.

---

## Planning Implications

What planners (CODAX / PLANX) need to settle before a deck build starts:

- **Decide slidedeck vs slidedoc first.** This is the single most consequential planning decision and it cannot be retrofitted. If both are needed, plan two artifacts: the cinematic projected deck, and the slidedoc derived from it. Scope them separately.
- **Write the narrative arc before any slide is designed.** The story drives the slide list, not the reverse. Duarte's discipline: do not open the slide tool until the whole arc is set.
- **Lock the slide count and the headline list early.** The sequence of assertion-headlines IS the deck's outline. Approve that before visual design starts.
- **Identify which slides are number-heroes and which are proof-visuals.** These need real assets (metrics, screenshots, mockups) sourced during the build, not placeholder imagery that quietly ships.
- **Name the presentation context.** Projected in a dark room, shared on a video call, or read as a file - each shifts the contrast, density, and pacing targets.

---

## Checklist

Before passing, verify. Every item is binary-testable.

- [ ] Artifact type is identified and reviewed against the right ruleset (projected deck vs slidedoc) - **Verify:** state which one; if the file tries to be both, that is the finding
- [ ] Every slide carries exactly one idea - **Verify:** state each slide's single idea in one sentence; flag any that need "and"
- [ ] Projected-deck slides are within ~30-40 words - **Verify:** count words on the three heaviest slides
- [ ] Single idea survives at thumbnail scale - **Verify:** view at ~25% / contact-sheet view
- [ ] Headlines assert a takeaway, not label a topic - **Verify:** read each headline alone; flag category-noun headlines
- [ ] Headline sequence reads as a coherent argument - **Verify:** read only the headlines top to bottom
- [ ] One typeface family, 2-3 weights, consistent colour set across all slides - **Verify:** contact-sheet scan for the outlier slide
- [ ] One aspect ratio across every slide - **Verify:** check for letterboxed slides
- [ ] Visuals are proof, not filler - **Verify:** for each visual, classify as proof or decoration; flag stock/AI/decorative imagery
- [ ] No degraded assets - **Verify:** scan for pixelated logos, blurry or messy screenshots
- [ ] Critical numbers are hero-sized and isolated - **Verify:** locate the key figures; flag any at body-text size
- [ ] Contrast holds under projection - **Verify:** test against a lifted-black, desaturated worst case
- [ ] Closing slide carries mission / ask / contact, not a bare "Thank You" - **Verify:** read the final slide
- [ ] Generated PDF has no presenter chrome or dev overlays baked in - **Verify:** open the exported PDF, scan every page
- [ ] {MANUAL CHECK REQUIRED} - Does the deck feel cinematic and built, or assembled and dense?
- [ ] {MANUAL CHECK REQUIRED} - Dark decks: atmosphere with restraint, not flat black and not a light show

---

## Evolution

| Date | What Changed | Why | Scope | Project | Occurrences |
|------|-------------|-----|-------|---------|-------------|
| 2026-05-14 | Created | SCOUTX research mission: deck design quality review. SOFAX had no deck competency despite decks being a recurring deliverable; was reviewing decks against a web-UI mental model | universal | - | 1 |

**Scope values:**
- `universal` - applies to all projects. Can trigger pattern changes on refresh.
- `project:{name}` - logged for context only. MUST NOT change universal patterns.

**Occurrences:** Incremented when the same issue recurs. TRAINX increments instead of adding duplicate rows.

---

**Source research:** SCOUTX Mode 5 (Supplement Research) - web research conducted 2026-05-14, sources cited in Studied Examples
**Status:** provisional
**Confidence:** Medium - patterns are well-sourced from named decks and the Duarte/YC bodies of work; provisional until validated against 2+ real deck reviews
**Review by:** 2026-11-14
**Consuming worker:** SOFAX
**Worker type:** reviewer
