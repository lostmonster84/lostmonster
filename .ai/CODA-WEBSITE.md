# CODA Plan: Lost Monster Website Redesign

> **Heavy CODA Document** - Complete planning framework for website redesign following Lost Monster principles
>
> **Date:** January 2025  
> **Status:** Planning Phase  
> **Purpose:** Transform existing website to demonstrate Lost Monster's framework-driven approach

---

## C - CONTEXT

### Current State
- **Existing Website:** Functional Next.js 15 website with basic components
  - Homepage with Hero, Services, Process, CaseStudy, CTA sections
  - All pages implemented (About, Process, FAQ, Services, Case Studies, Contact)
  - Basic design system using Tailwind CSS templates
  - Components: Header, Footer, Navigation, Button, Card, Accordion, MarkdownContent
  - Markdown content loading from `pages/`, `services/`, `case-studies/` folders

### Existing Design System
- **Colors:** Primary blue (#2563eb), neutral grays, basic accent colors
- **Typography:** Outfit (headings), Inter (body) - configured but not fully utilized
- **Spacing:** 8px base unit system from templates
- **Components:** Basic UI components with variants (primary, secondary, outline)

### Technical Constraints
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Content:** Markdown files with frontmatter
- **Performance:** Must meet Core Web Vitals
- **Accessibility:** WCAG 2.1 AA minimum
- **Browser Support:** Last 2 versions of major browsers

### Problem Statement
**Critical Issue:** The website was built without following Lost Monster's own principles:
- ❌ No CODA plan created before implementation
- ❌ No design variations (only one approach)
- ❌ No quality checklist scoring
- ❌ No domain knowledge capture
- ❌ Doesn't demonstrate the framework-driven approach Lost Monster sells

**Impact:** Website doesn't practice what Lost Monster preaches, undermining credibility and missing opportunity to showcase methodology.

### Where This Fits
- **File Structure:** `website/` directory
- **Related Components:** All section components, layout components, UI components
- **Content:** All markdown files in `pages/`, `services/`, `case-studies/`
- **Design System:** `tailwind.config.ts`, `styles/globals.css`

---

## O - OBJECTIVE

### Primary Goal
Create a website that **demonstrates Lost Monster's framework-driven approach** by:
1. Following CODA planning methodology (this document)
2. Creating 5 design variations before choosing final design
3. Scoring all variations against quality checklist (80/100 minimum)
4. Capturing and reflecting domain knowledge in design decisions
5. Documenting the entire process as proof of methodology

### Secondary Goals
- Showcase quality standards (80/100 minimum)
- Demonstrate systematic process (CODA → Variations → Scoring → Implementation)
- Reflect business understanding (domain knowledge in design)
- Serve as example for future projects
- Build credibility through practice-what-we-preach approach

### Why This Matters
**Business Value:**
- Credibility: Website demonstrates Lost Monster's methodology in action
- Sales Tool: Shows potential clients the systematic approach
- Differentiation: Most agencies don't follow their own advice
- Quality Assurance: Ensures website meets Lost Monster's own standards

**User Value:**
- Better experience: Higher quality design = better user experience
- Clear messaging: Domain knowledge ensures content resonates
- Trust building: Systematic approach builds confidence

### Success Criteria
- ✅ CODA plan documented and reviewed
- ✅ Domain knowledge captured
- ✅ 5 design variations created and visible on demo pages
- ✅ Quality checklist customized and applied
- ✅ Chosen variation scores 80+/100
- ✅ Final website demonstrates Lost Monster principles
- ✅ All documentation complete and accessible

---

## D - DETAILS

### Phase 1: Planning & Knowledge Capture

#### 1.1 CODA Plan (This Document)
- **File:** `website/.ai/CODA-WEBSITE.md`
- **Content:** Complete Context, Objective, Details, Acceptance
- **Status:** ✅ In progress

#### 1.2 Domain Knowledge Capture
- **File:** `website/.ai/DOMAIN-KNOWLEDGE.md`
- **Content:**
  - Lost Monster's business model (framework-driven agency)
  - Target audience (businesses valuing quality, clear goals)
  - Value proposition (systems over heroics, 80/100 quality, CODA)
  - Industry positioning (premium, systematic, results-focused)
  - Key messaging themes
  - Competitive differentiation

#### 1.3 Quality Checklist Customization
- **File:** `website/.ai/PRE-DESIGN-CHECKLIST.md`
- **Structure:** 5 categories, 100 points total
  - Framework Adherence (25 points)
  - Design System Consistency (20 points)
  - Business Goals Alignment (20 points)
  - Technical Quality (20 points)
  - User Experience (15 points)
- **Threshold:** 80/100 minimum

### Phase 2: Design Variations

#### 2.1 Demo Page Structure
- **File:** `website/app/demo/page.tsx`
- **Purpose:** Index page listing all variations
- **Content:** Links to hero variations, layout variations, comparison page

#### 2.2 Hero Section Variations (5)
**Location:** `website/app/demo/hero/variation-[a-e].tsx`

**Variation A - Conservative:**
- Minimal changes from current design
- Refined spacing, improved typography hierarchy
- Safe, professional approach
- Pros: Low risk, familiar patterns
- Cons: Less differentiation, may not showcase innovation

**Variation B - Modern/Bold:**
- Bold colors, dynamic layouts
- Push design boundaries
- Experimental typography
- Pros: Stands out, shows creativity
- Cons: May feel too bold for conservative clients

**Variation C - Data-Driven:**
- Metrics and proof prominent
- Charts, statistics, conversion data
- Trust signals emphasized
- Pros: Builds credibility, results-focused
- Cons: May feel cold, less emotional

**Variation D - Minimal/Restrained:**
- Maximum white space
- Minimal decoration
- Focus on content
- Pros: Premium feel, timeless
- Cons: May feel empty, less engaging

**Variation E - Experimental:**
- Asymmetric layouts
- Break the grid
- Creative, unique approach
- Pros: Memorable, showcases innovation
- Cons: May confuse, accessibility concerns

#### 2.3 Layout/Color Scheme Variations (5)
**Location:** `website/app/demo/layout/variation-[a-e].tsx`

**Each explores:**
- Color palette (primary, secondary, accent)
- Layout structure (centered vs asymmetric vs grid)
- Visual weight (photo vs text prominence)
- Typography hierarchy
- Component styling

**Variation A - Conservative:**
- Current blue palette refined
- Centered layouts
- Balanced visual weight

**Variation B - Modern:**
- Bold color combinations
- Dynamic grid layouts
- Strong visual hierarchy

**Variation C - Data-Driven:**
- Professional blue/gray palette
- Metrics-focused layouts
- Charts and data visualization

**Variation D - Minimal:**
- Monochromatic with single accent
- Generous white space
- Restrained typography

**Variation E - Experimental:**
- Unexpected color combinations
- Asymmetric, creative layouts
- Bold typography choices

#### 2.4 Comparison Page
- **File:** `website/app/demo/comparison/page.tsx`
- **Content:**
  - Side-by-side comparison of all variations
  - Scoring breakdown per variation
  - Recommendation with rationale
  - Selection interface

### Phase 3: Quality Scoring

#### 3.1 Score Each Variation
- **Process:** Run quality checklist against each variation
- **Document:** `website/.ai/QUALITY-SCORES.md`
- **Output:** Scores for each variation, identification of highest scorer

#### 3.2 Refine if Needed
- If chosen variation < 80/100, identify failing criteria
- Make targeted improvements
- Re-score until 80+ achieved

### Phase 4: Implementation

#### 4.1 Implement Chosen Design
- Replace current homepage with chosen hero variation
- Apply chosen layout/color scheme across all pages
- Update components to match chosen design
- Ensure consistency across entire site

#### 4.2 Quality Verification
- All pages meet 80/100 quality score
- Framework adherence verified
- Domain knowledge reflected in content
- CODA plan documented
- Design variations preserved

#### 4.3 Final Polish
- Fix accessibility issues
- Optimize performance (Core Web Vitals)
- Verify SEO metadata
- Test responsive design
- Cross-browser testing

### Phase 5: Documentation

#### 5.1 Document Decisions
- **File:** `website/.ai/DESIGN-DECISIONS.md`
- **Content:**
  - Why chosen variation was selected
  - Quality scores for all variations
  - Trade-offs considered
  - Business goal alignment rationale

#### 5.2 Update README
- **File:** `website/README.md`
- **Add:**
  - Link to CODA plan
  - Design variation demo pages
  - Quality checklist process
  - Domain knowledge reference

### Visual Specifications

#### Color Palettes (To Be Explored in Variations)
- **Current:** Primary blue (#2563eb), neutral grays
- **Variations will explore:** Different primary colors, accent combinations, contrast ratios

#### Typography
- **Headings:** Outfit (configured)
- **Body:** Inter (configured)
- **Variations will explore:** Different sizes, weights, line heights

#### Layout Structure
- **Current:** Centered, max-width containers
- **Variations will explore:** Grid systems, asymmetric layouts, full-bleed sections

#### Component Styling
- **Current:** Basic variants (primary, secondary, outline)
- **Variations will explore:** Different button styles, card treatments, spacing

### Technical Approach

#### Files to Create
- `.ai/` directory for planning documents
- `app/demo/` directory for variation pages
- Component updates based on chosen design

#### Files to Modify
- `app/page.tsx` - Implement chosen hero
- `components/sections/Hero.tsx` - Update to chosen design
- `tailwind.config.ts` - Apply chosen color scheme
- `styles/globals.css` - Update if needed
- `README.md` - Add documentation links

### Responsive Behavior
- **Mobile-first:** All variations must work on mobile
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Testing:** iOS Safari, Android Chrome, desktop browsers

### Performance Considerations
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size:** Keep components lightweight
- **Images:** Optimize, use Next.js Image component
- **Fonts:** Preload critical fonts

### Accessibility Requirements
- **WCAG 2.1 AA:** Minimum standard
- **Keyboard Navigation:** All interactive elements accessible
- **Screen Readers:** Proper ARIA labels
- **Color Contrast:** 4.5:1 for text, 3:1 for UI components
- **Focus Indicators:** Visible focus states

---

## A - ACCEPTANCE

### Success Metrics

#### Planning Phase
- ✅ CODA plan complete and reviewed
- ✅ Domain knowledge captured
- ✅ Quality checklist customized

#### Design Phase
- ✅ 5 hero variations created and visible
- ✅ 5 layout variations created and visible
- ✅ Comparison page functional
- ✅ All variations documented with pros/cons

#### Quality Phase
- ✅ All variations scored against checklist
- ✅ Scores documented
- ✅ Highest scoring variation identified
- ✅ Chosen variation meets 80/100 threshold

#### Implementation Phase
- ✅ Chosen design implemented across site
- ✅ All pages consistent with chosen design
- ✅ Components updated to match
- ✅ No broken functionality

#### Documentation Phase
- ✅ Design decisions documented
- ✅ README updated with links
- ✅ All `.ai/` files complete

### Testing Checklist

#### Functionality
- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Forms submit correctly
- [ ] Markdown content renders properly
- [ ] Links work correctly

#### Design
- [ ] Chosen design applied consistently
- [ ] Colors match chosen palette
- [ ] Typography hierarchy clear
- [ ] Spacing consistent
- [ ] Components match design system

#### Responsive
- [ ] Mobile (375px) - All content readable, no horizontal scroll
- [ ] Tablet (768px) - Layout adapts appropriately
- [ ] Desktop (1280px+) - Full design visible

#### Performance
- [ ] Lighthouse score 90+ (all categories)
- [ ] Core Web Vitals pass
- [ ] Images optimized
- [ ] Fonts load efficiently

#### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast meets standards
- [ ] Focus indicators visible

#### Browser Compatibility
- [ ] Chrome (last 2 versions)
- [ ] Firefox (last 2 versions)
- [ ] Safari (last 2 versions)
- [ ] Edge (last 2 versions)

### Performance Benchmarks
- **Lighthouse Performance:** 90+
- **Lighthouse Accessibility:** 95+
- **Lighthouse Best Practices:** 90+
- **Lighthouse SEO:** 95+
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

### Definition of Done
The website redesign is complete when:

1. ✅ CODA plan documented
2. ✅ Domain knowledge captured
3. ✅ Quality checklist customized
4. ✅ 5 design variations created and visible
5. ✅ All variations scored
6. ✅ Chosen variation scores 80+/100
7. ✅ Chosen design implemented
8. ✅ All pages updated consistently
9. ✅ Quality verified (80+/100)
10. ✅ Documentation complete
11. ✅ All tests passing
12. ✅ Performance benchmarks met
13. ✅ Accessibility verified

**Only when all criteria are met is the project considered complete.**

---

## Notes

- Demo pages remain accessible for future reference
- CODA plan becomes permanent record
- Quality scores demonstrate Lost Monster's systematic approach
- Final website serves as example of framework-driven development
- This document should be referenced throughout implementation

---

**Status:** ✅ CODA Plan Complete  
**Next Step:** Capture Domain Knowledge

