# AI Slop Test — [PROJECT]

> Detects AI-generated content that looks and reads like generic AI output.
> Referenced by PIXLX during BULLETPROOF. Every UI element must pass.

---

## The Provenance Rule

**Every visual element must trace back to the Design Guide.**

Before any shadow, border, icon, background, or text treatment ships:
1. Find the exact reference in the Design Guide
2. If it's not in the guide, it doesn't ship
3. "It looks good" is not a reference — show the guide entry

If an element has no provenance (can't point to a Design Guide entry), it was invented during this session. Invented elements are AI slop until proven otherwise.

---

## The 10 Red Flags

Score each element. If ANY red flag is present, the element fails and must be fixed.

### 1. Generic Headings
- "Welcome to [PROJECT]" — nobody writes this for a real brand
- "Discover Our Solutions" — says nothing specific
- "Your Trusted Partner" — could be any company in any industry

**Test:** Would this heading work on a competitor's website? If yes, it's slop.

### 2. Filler Paragraphs
- Long descriptions that say nothing specific
- "We are committed to providing exceptional service and value to our customers"
- Paragraphs that could be removed without losing information

**Test:** Delete the paragraph. Did you lose any specific information? If not, it's slop.

### 3. Stock CTAs
- "Learn More" (learn what?)
- "Get Started" (start what?)
- "Contact Us" (about what?)

**Test:** Does the CTA describe exactly what happens when clicked? "Book a 15-min call" passes. "Learn More" fails.

### 4. Gratuitous Gradients
- Gradient backgrounds that aren't in the Design Guide
- Rainbow or multi-colour gradients that don't match the brand
- Gradients used to "make it look modern"

**Test:** Is this gradient in the Design Guide's approved backgrounds? If not, it's slop.

### 5. Decorative Borders
- Coloured accent bars at the top of cards
- Thick coloured borders that aren't in the component spec
- "Design" borders that were invented to fill visual space

**Test:** Can you find this border treatment in the Design Guide's card spec? If not, it's slop.

### 6. Orphan Patterns
- A card style that appears once and nowhere else on the site
- A shadow depth that doesn't match any approved shadow token
- A spacing value that isn't in the spacing scale

**Test:** Does this exact pattern appear on at least one other page? If not, it's an orphan.

### 7. Excessive Icons
- Icons next to every bullet point
- Feature grids where icons add no meaning
- Icons used as decoration rather than communication

**Test:** Remove the icon. Did you lose any information? If not, the icon is decoration.

### 8. Buzzword Copy
- "Leveraging cutting-edge technology"
- "Seamless integration"
- "State-of-the-art platform"
- "Revolutionising the [industry]"

**Test:** Would a human writing copy for this specific brand use this phrase? If it sounds like a press release, it's slop.

### 9. Fake Testimonials
- Suspiciously perfect quotes with generic names
- "John D." with no verifiable identity
- Testimonials that read like they were generated, not spoken

**Test:** Could you find this person on LinkedIn? Is the quote something a real person would actually say?

### 10. Layout Padding
- Empty sections that exist to "balance the page"
- "About Our Values" sections with no specific content
- Sections that repeat what was said above in different words

**Test:** Remove the section. Does the page flow better? If yes, the section was padding.

---

### 11. Em Dashes
- Any use of — (em dash) in shipped content
- "Built by a studio that runs its own products — not just client work"
- "Platforms, marketplaces, and tools — built to last"

**Test:** Search the page for —. If found, it's slop. Rewrite with commas, full stops, or colons.

---

## Project-Specific Red Flags

| Red Flag | Why It's Slop | Industry |
|----------|--------------|----------|
| Em dashes (—) in any copy | AI-flavoured punctuation. Rewrite the sentence. | Universal |

---

## How PIXLX Uses This

During BULLETPROOF, PIXLX checks every visible element against this test:
1. Screenshot the page
2. For each element: does it pass the Provenance Rule? (Can trace to Design Guide)
3. For each element: does it trigger any of the 10 red flags?
4. Any failure = fix before shipping
5. PIXLX cannot score without this document loaded

---

*Customise this for your project. Add industry-specific red flags as you discover them.*
