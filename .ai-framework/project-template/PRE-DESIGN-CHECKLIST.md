# Pre-Design Checklist Template

> **Customize this checklist for each project**
>
> This is a TEMPLATE - copy and adapt the checklist categories to match your project's design principles.

---

## 🎯 Purpose

**Problem**: Design principles get forgotten during implementation, leading to:
- Inconsistent brand execution
- Design patterns that don't match project goals
- Recurring violations that require rework
- Quality drift over time

**Solution**: A mandatory checklist ensures design principles are verified BEFORE presenting work to the user.

---

## How to Customize This Template

**Step 1**: Read your project's design brief/brand guidelines
**Step 2**: Identify 4-6 critical design categories
**Step 3**: Create specific, verifiable checklist items for each category
**Step 4**: Define scoring weights (total 100 points)
**Step 5**: Set minimum threshold (typically 80/100)
**Step 6**: Add project-specific examples

---

## ✅ The Checklist Structure

### Category 1: [Category Name] (XX points)

**[Category description and why it matters]**

- [ ] **[Checklist item 1]** - [Specific criteria]
- [ ] **[Checklist item 2]** - [Specific criteria]
- [ ] **[Checklist item 3]** - [Specific criteria]
- [ ] **[Checklist item 4]** - [Specific criteria]

**Why this matters:**
- [Reason 1]
- [Reason 2]
- [Reason 3]

**Red flags:**
- ❌ [What to avoid 1]
- ❌ [What to avoid 2]
- ❌ [What to avoid 3]

**Good examples:**
- ✅ [What to do 1]
- ✅ [What to do 2]
- ✅ [What to do 3]

---

### Category 2: [Category Name] (XX points)

[Repeat structure]

---

### Category 3: [Category Name] (XX points)

[Repeat structure]

---

### Category 4: [Category Name] (XX points)

[Repeat structure]

---

### Category 5: [Category Name] (XX points)

[Repeat structure]

---

### Category 6: [Category Name] (XX points)

[Repeat structure]

---

## 🛑 STOP Checkpoint

**Before presenting your solution to the user, ask yourself:**

1. **Did I check EVERY item above?**
2. **Can I honestly check ALL boxes?**
3. **If this were deployed tomorrow, would it feel authentic to the brand?**
4. **Does it match the project's design principles?**
5. **Would users have the intended experience?**

**If you answer "NO" or "UNSURE" to ANY question:**
- ❌ STOP
- 🔄 Redesign before presenting
- ✅ Then re-check this entire checklist

---

## 📋 How to Use This Checklist

### When to Use
**MANDATORY for:**
- New pages or sections
- Landing pages, promotional offers, sales pages
- Homepage changes
- Component designs that include layout + content
- Any work involving design and content together

**Optional (but recommended) for:**
- Pure technical work (API routes, utilities)
- Simple bug fixes with no design impact
- Backend/data changes with no frontend impact

### Where to Reference This
- **Primary**: `CLAUDE.md` (top of file - link to this checklist)
- **Secondary**: `.ai/project/PROJECT.md` (Design System Requirements section)
- **Detailed version**: This file (`.ai/project/PRE-DESIGN-CHECKLIST.md`)

---

## 📚 Related Documentation

**For full design specifications:**
- `DESIGN-BRIEF.md` - Comprehensive design language, brand principles
- `.ai/project/DESIGN-LANGUAGE.md` - Design philosophy
- `.ai/project/DESIGN-SYSTEM.md` - Technical design specs

**For planning methodology:**
- `.ai/frameworks/coda.md` - Context, Objective, Details, Acceptance planning
- `.ai/frameworks/design-variations.md` - Create 5 variations workflow

---

## 📊 Scoring Your Work (Mandatory)

After completing the checklist, you MUST calculate a numerical quality score out of 100.

### Scoring System

**Total: 100 points distributed across 6 categories**

| Category | Weight | Max Points | Items | Points Per Item |
|----------|--------|------------|-------|-----------------|
| [Category 1] | XX% | XX | X | X.XX each |
| [Category 2] | XX% | XX | X | X.XX each |
| [Category 3] | XX% | XX | X | X.XX each |
| [Category 4] | XX% | XX | X | X.XX each |
| [Category 5] | XX% | XX | X | X.XX each |
| [Category 6] | XX% | XX | X | X.XX each |

### How to Score Each Item

**For every checklist item:**
- ✅ **PASS** = Full points (100% of item value)
- ⚠️ **PARTIAL** = Half points (50% of item value)
- ❌ **FAIL** = Zero points (0% of item value)

### Scoring Example: [Example Page Name]

**Category 1: [Category Name] (XX points)**
```
Item 1 ([criterion]): ✅ PASS = X/X
Item 2 ([criterion]): ⚠️ PARTIAL = X/X
Item 3 ([criterion]): ✅ PASS = X/X
Item 4 ([criterion]): ❌ FAIL = 0/X
Category Total: XX/XX (XX%)
```

[Repeat for all categories]

**TOTAL SCORE: XX/100 (Grade: X)**

**Verdict:** [✅ Ready / ⚠️ Needs work / ❌ Redesign required]

### Grading Scale

| Score Range | Grade | Verdict | Action |
|-------------|-------|---------|--------|
| 90-100 | A - Excellent | ✅ Ready to present |
| 80-89 | B - Good | ✅ Acceptable, minor notes |
| 70-79 | C - Acceptable | ⚠️ Present only if urgent |
| 60-69 | D - Poor | ❌ Major issues - redesign |
| 0-59 | F - Failing | ❌ Complete redesign |

### Critical Failure Thresholds

**Work FAILS automatically if:**
- **[Critical Category 1]** < XX/XX points
- **[Critical Category 2]** < XX/XX points

**These cannot be waived regardless of total score.**

### Scorecard Template

**When presenting design work, include this scorecard:**

```markdown
## 📊 Design Quality Score

**Overall Score: XX/100 (Grade: X)**

### Category Breakdown:
- [Category 1]: XX/XX (XX%) [✅/⚠️/❌]
- [Category 2]: XX/XX (XX%) [✅/⚠️/❌]
- [Category 3]: XX/XX (XX%) [✅/⚠️/❌]
- [Category 4]: XX/XX (XX%) [✅/⚠️/❌]
- [Category 5]: XX/XX (XX%) [✅/⚠️/❌]
- [Category 6]: XX/XX (XX%) [✅/⚠️/❌]

### Verdict: [Status]

### Critical Failures:
[List any auto-fail items]

### Key Issues:
[List specific problems]

### Improvements Needed:
[List changes required]
[Projected score after fixes]
```

### Scoring Rules

**MANDATORY:**
1. Calculate score BEFORE presenting to user
2. Include scorecard with every design presentation
3. DO NOT present work < 80 without justification
4. Track all scores in [`DESIGN-SCORES.md`](./DESIGN-SCORES.md)

**Why scoring matters:**
- Forces honest self-assessment
- Creates accountability for quality
- Enables improvement tracking
- Prevents presenting subpar work
- Builds trust through transparency

---

## ✅ Success Criteria

**This checklist + scoring system is working when:**
- Design violations are caught BEFORE code is written
- User receives solutions that match brand on first presentation
- **No work presented with score < 80**
- **Average scores trend upward over time**
- Recurring issues stop happening
- Each new page/section feels authentically on-brand

**If violations keep recurring:**
- Review this checklist
- Add missing items based on new patterns discovered
- Update examples to clarify ambiguous rules
- **Review score history** to identify patterns

---

## Example: Ancarraig Lodges Checklist

**This is an example of a fully customized checklist. Your project will be different.**

<details>
<summary>Click to see complete Ancarraig example</summary>

### 1. Image-to-Text Ratio (25 points) - Sales/Conversion Pages

- [ ] **60-70% imagery minimum** across the entire page
- [ ] **Every major section has visual support**
- [ ] **NOT relying on text alone to persuade** customers
- [ ] Users can **"see themselves there"** through visuals

**Why this matters:**
- Psychology: Images trigger emotion, text provides logic
- Conversion: Luxury experiences sell through visual immersion
- Trust: Real photos = credibility

### 2. Design Language Violations (20 points) - ZERO TOLERANCE

- [ ] **NO GRADIENTS** → Exception: Ultra-subtle texture overlays only
- [ ] **NO EMOJIS** → Use Lucide icons only
- [ ] **NO STOCK PHOTOS** → Prefer real property imagery
- [ ] **NO ROUNDED FLOATING CARDS** with heavy blur/overlay
- [ ] **NO AI-TEMPLATE PATTERNS**

### 3. Scandi-Scot Aesthetic (15 points)

- [ ] **Generous white space** → Not cramped or cluttered
- [ ] **Clean flat design** → No heavy shadows or gradients
- [ ] **Nature-first imagery** → Let photos breathe
- [ ] **Minimal and understated** → Not fussy or aggressive
- [ ] **Premium restraint** → Quiet confidence

### 4. Voice & Content Principles (15 points)

- [ ] **Personal and warm** → Not corporate speak
- [ ] **Specific property details** → Not generic copy
- [ ] **Understated confidence** → "People tend to come back" energy
- [ ] **Small business tone** → Family-run hospitality

### 5. Conversion Psychology (15 points) - Sales Pages

- [ ] **Emotion first, logic second** → Imagery creates desire
- [ ] **Visual hierarchy** → Clear path to booking
- [ ] **Trust elements present** → Credibility before purchase
- [ ] **Clear value proposition** → Visible immediately

### 6. Mobile-First Design (10 points)

- [ ] **Designed for mobile FIRST** → Enhanced for desktop
- [ ] **Touch-friendly** → 44px minimum tap targets
- [ ] **Readable on small screens** → Text size, contrast
- [ ] **Images optimized** → Responsive, lazy loading

**Scoring weights:**
- Image-to-Text: 25% (critical for conversion)
- Design Language: 20% (zero-tolerance brand rules)
- Aesthetic: 15%
- Voice: 15%
- Conversion: 15%
- Mobile: 10%

**Minimum threshold: 80/100**
**Critical failures: Image-to-Text < 10/25, Design Language < 15/20**

</details>

---

## Version History

**v1.0** (Template Created)
- Initial template structure
- Generic categories and scoring system
- Customization instructions
- Ancarraig example included

---

**Next steps for customization:**

1. Read your project's design brief
2. Identify your 4-6 critical categories
3. Replace template categories with your specifics
4. Add real examples from your project
5. Test the checklist on existing work
6. Refine based on actual usage
