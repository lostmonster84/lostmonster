# .AI Framework - Complete Index

> **Your complete guide to the Lost Monster AI development framework**
>
> This index helps you navigate the entire framework and understand how all pieces fit together.

---

## 📁 Framework Structure

```
.ai-framework/
├── README.md                    # Framework overview and quick start
├── INDEX.md                     # This file - complete navigation
│
├── core/                        # Universal principles (NEVER change)
│   ├── DEVELOPMENT-PRINCIPLES.md   # The 5 pillars of development
│   ├── WORKFLOW.md                 # 6-step standard workflow
│   └── COMMUNICATION.md            # How to communicate with users
│
├── frameworks/                  # Reusable methodologies
│   ├── coda.md                     # CODA planning (VITAL)
│   └── design-variations.md        # 5 variations workflow (CRITICAL)
│
├── project-template/            # Customize per project
│   ├── PROJECT-TEMPLATE.md         # Project-specific config template
│   ├── PRE-DESIGN-CHECKLIST.md     # Design quality checklist template
│   └── DESIGN-SCORES.md            # Score tracking template
│
├── templates/                   # Boilerplate files (coming soon)
│   ├── CLAUDE.md.template
│   ├── DESIGN-BRIEF.md.template
│   └── README.md.template
│
└── workflows/                   # Process automation (coming soon)
    ├── git-workflow.md
    ├── trello-automation.md
    └── deployment-checklist.md
```

---

## 🎯 Start Here

### New to This Framework?

**Read in this order:**

1. **[README.md](./README.md)** - Framework overview, philosophy, quick start
2. **[core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md)** - The foundation
3. **[core/WORKFLOW.md](./core/WORKFLOW.md)** - Step-by-step process
4. **[frameworks/coda.md](./frameworks/coda.md)** - Planning methodology (VITAL)
5. **[frameworks/design-variations.md](./frameworks/design-variations.md)** - Design approach (CRITICAL)

**Total reading time: ~30 minutes**

After this, you'll understand:
- Why this framework exists
- How to plan complex work
- How to handle design decisions
- How to communicate effectively
- How to maintain quality standards

---

### Setting Up a New Project?

**Follow this checklist:**

- [ ] Copy [project-template/PROJECT-TEMPLATE.md](./project-template/PROJECT-TEMPLATE.md) to your project's `.ai/project/PROJECT.md`
- [ ] Customize with your tech stack, design system, and brand guidelines
- [ ] Copy [project-template/PRE-DESIGN-CHECKLIST.md](./project-template/PRE-DESIGN-CHECKLIST.md) to `.ai/project/PRE-DESIGN-CHECKLIST.md`
- [ ] Customize checklist categories for your project's design principles
- [ ] Copy [project-template/DESIGN-SCORES.md](./project-template/DESIGN-SCORES.md) to `.ai/project/DESIGN-SCORES.md`
- [ ] Create your project's `CLAUDE.md` with link to Pre-Design Checklist
- [ ] Create `.ai/core/` directory and symlink to Lost Monster core files (OR copy them)
- [ ] Create `.ai/frameworks/` directory and symlink to Lost Monster frameworks (OR copy them)

**See:** [README.md - Quick Start](./README.md#quick-start-copy-to-new-project) for detailed setup instructions.

---

## 📚 Complete File Guide

### Core Files (Universal - Never Change)

#### [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md)
**Purpose:** The 5 pillars that guide all development work

**Key Concepts:**
1. Simplicity First
2. Incremental Progress
3. Verification Before Implementation
4. Continuous Communication
5. Quality Scoring

**When to reference:**
- Starting any new project
- Onboarding new team members
- Making architectural decisions
- Reviewing work quality

**Philosophy:** "Think deeply, plan thoroughly, implement simply, document clearly."

---

#### [core/WORKFLOW.md](./core/WORKFLOW.md)
**Purpose:** Step-by-step process for all development work

**The 6 Steps:**
1. THINK - Understand the problem
2. RESEARCH - Explore the codebase
3. PLAN - Write complete approach
4. VERIFY - Get user approval
5. IMPLEMENT - Execute step-by-step
6. REVIEW - Summarize changes

**When to use:**
- Every non-trivial task
- Complex features
- Design work
- Refactoring

**Variations:**
- Simple tasks: Shortened workflow
- Complex features: Add CODA planning
- Design work: Add Design Variations

---

#### [core/COMMUNICATION.md](./core/COMMUNICATION.md)
**Purpose:** How to communicate effectively throughout development

**Key Principles:**
- High-level explanations (not too terse, not verbose)
- Clear structure (markdown, headers, lists)
- Continuous updates (after each step)
- Context included (what AND why)
- Appropriate detail (match detail to phase)

**Templates provided for:**
- Starting work
- Presenting plans
- Implementation updates
- Completion summaries
- Asking clarifying questions

**Anti-patterns to avoid:**
- Silent implementation
- Tool invocation spam
- Over-explaining
- Vague summaries

---

### Framework Files (Reusable Methodologies)

#### [frameworks/coda.md](./frameworks/coda.md) ⭐ VITAL
**Purpose:** Context-Objective-Details-Acceptance planning framework

**What it solves:**
- Catches issues in planning phase (not after coding)
- Reduces wasted iteration
- Ensures shared understanding
- Prevents scope creep

**When to use:**
- New features or major UI sections
- Complex layouts or animations
- Design system changes
- Anything requiring 3+ coordinated changes

**Two modes:**
1. **Light CODA** (default): Think in CODA dimensions, communicate conversationally
2. **Heavy CODA**: Formal document when explicitly needed

**Key philosophy:** "It's easier to change understanding than to change code. Align on thinking before implementing."

---

#### [frameworks/design-variations.md](./frameworks/design-variations.md) ⭐ CRITICAL
**Purpose:** ALWAYS create 5 variations for design work

**The Rule:**
1. Create exactly 5 different variations
2. Build on live demo page
3. Present with characteristics (pros/cons)
4. User selects preferred version
5. THEN implement chosen variation

**Why it works:**
- Eliminates guesswork
- Prevents rework
- Better outcomes (5 options > first idea)
- Clear decision (visual, not abstract)

**Variation strategy:**
- A: Conservative/safe
- B: Modern/bold
- C: Data-driven
- D: Minimal/restrained
- E: Experimental/asymmetric

**When to skip:** Only for obvious bug fixes, tiny text changes, or emergency hotfixes.

**Key philosophy:** "The best design often isn't the first idea. Give the user 5 choices, and the right answer reveals itself."

---

### Project Template Files (Customize Per Project)

#### [project-template/PROJECT-TEMPLATE.md](./project-template/PROJECT-TEMPLATE.md)
**Purpose:** Complete project configuration template

**What it includes:**
- Project overview
- Tech stack
- Design system (colors, typography, spacing, animations)
- Design principles
- Brand voice & tone
- Component patterns
- File structure
- Code conventions
- Performance standards
- Integrations
- Quality checklist
- Development workflow
- Common utilities
- Resources
- Deployment
- Environment variables

**How to use:**
1. Copy to your project's `.ai/project/PROJECT.md`
2. Fill in all [placeholder] sections
3. Customize for your specific project
4. Update as project evolves

---

#### [project-template/PRE-DESIGN-CHECKLIST.md](./project-template/PRE-DESIGN-CHECKLIST.md)
**Purpose:** Mandatory verification before presenting design work

**What it prevents:**
- Design principles forgotten during implementation
- Recurring violations requiring rework
- Inconsistent brand execution
- Quality drift over time

**Structure:**
- 4-6 critical design categories
- Specific, verifiable checklist items per category
- Scoring weights (total 100 points)
- Minimum threshold (typically 80/100)
- Project-specific examples

**Mandatory scoring system:**
- Calculate numerical score (0-100)
- Category breakdown with weights
- Grading scale (A-F)
- Critical failure thresholds
- Scorecard for every presentation

**How to customize:**
1. Read your project's design brief
2. Identify 4-6 critical categories
3. Create specific checklist items
4. Define scoring weights
5. Set minimum threshold
6. Add real examples

**Example included:** Ancarraig Lodges full checklist

---

#### [project-template/DESIGN-SCORES.md](./project-template/DESIGN-SCORES.md)
**Purpose:** Track quality scores over time

**What it tracks:**
- Every design/UI work scored
- Category breakdowns
- Issues and improvements
- Trends over time
- Average scores
- Category performance

**Why track scores:**
- Creates accountability
- Identifies patterns
- Measures improvement
- Prevents regression
- Builds evidence of consistent quality

**Includes:**
- Score tracking template
- Statistics and goals
- Monthly review template
- Improvement analysis framework

**Rules:**
1. Calculate score BEFORE presenting
2. Record in this file
3. If score < 80, redesign before presenting
4. Track improvements over time
5. Review trends monthly

---

## 🔄 How Everything Fits Together

### The Complete Development Flow

```
┌─────────────────────────────────────────────────────┐
│ 1. User Request                                     │
└─────────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 2. THINK (Workflow)                                 │
│    - Understand problem                             │
│    - Check project/PROJECT.md for context           │
└─────────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 3. RESEARCH (Workflow)                              │
│    - Explore codebase                               │
│    - Review design system in PROJECT.md             │
└─────────────────────────────────────────────────────┘
                     ↓
         ┌───────────────────────┐
         │  Is this complex?     │
         │  (3+ coordinated      │
         │   changes?)           │
         └───────────────────────┘
                ↓         ↓
           YES            NO
            ↓              ↓
    ┌───────────┐    ┌──────────┐
    │ Use CODA  │    │ Simple   │
    │ Planning  │    │ Plan     │
    └───────────┘    └──────────┘
            ↓              ↓
         ┌────────────────────────┐
         │  Is this design work?  │
         └────────────────────────┘
                ↓         ↓
           YES            NO
            ↓              ↓
    ┌───────────────┐  ┌────────────┐
    │ Create 5      │  │ Standard   │
    │ Variations    │  │ Implement  │
    └───────────────┘  └────────────┘
            ↓              ↓
┌─────────────────────────────────────────────────────┐
│ 4. VERIFY (Workflow)                                │
│    - Present plan/variations                        │
│    - Get user approval                              │
│    - Iterate if needed                              │
└─────────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ 5. IMPLEMENT (Workflow + Principles)                │
│    - Follow plan step-by-step                       │
│    - Simplicity first                               │
│    - Incremental progress                           │
│    - Continuous communication                       │
└─────────────────────────────────────────────────────┘
                     ↓
         ┌───────────────────────┐
         │  Is this design/UI?   │
         └───────────────────────┘
                ↓         ↓
           YES            NO
            ↓              ↓
    ┌───────────────┐  ┌────────────┐
    │ SCORE using   │  │ Skip to    │
    │ Pre-Design    │  │ Review     │
    │ Checklist     │  │            │
    └───────────────┘  └────────────┘
            ↓
    ┌───────────────┐
    │ Score ≥ 80?   │
    └───────────────┘
         ↓        ↓
      YES         NO
       ↓           ↓
       │    ┌─────────────┐
       │    │ Redesign    │
       │    │ & Re-score  │
       │    └─────────────┘
       ↓           ↓
┌─────────────────────────────────────────────────────┐
│ 6. REVIEW (Workflow + Communication)                │
│    - Summarize changes                              │
│    - Document decisions                             │
│    - Record score (if design work)                  │
│    - Update DESIGN-SCORES.md                        │
└─────────────────────────────────────────────────────┘
```

---

## 🎓 Learning Paths

### For AI Assistants (Claude, etc.)

**First Session with Lost Monster:**
1. Read [README.md](./README.md) - Understand the vision
2. Read [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md) - Learn the foundations
3. Read [core/WORKFLOW.md](./core/WORKFLOW.md) - Understand standard process
4. Skim [frameworks/coda.md](./frameworks/coda.md) and [frameworks/design-variations.md](./frameworks/design-variations.md) - Know when to use them

**Working on a Specific Project:**
1. Read that project's `.ai/project/PROJECT.md` - Get project context
2. Review project's `.ai/project/PRE-DESIGN-CHECKLIST.md` - Understand quality standards
3. Reference framework files as needed during work

**Handling Complex Features:**
1. Use [frameworks/coda.md](./frameworks/coda.md) for planning
2. Follow [core/WORKFLOW.md](./core/WORKFLOW.md) for execution
3. Use [core/COMMUNICATION.md](./core/COMMUNICATION.md) templates

**Handling Design Work:**
1. Use [frameworks/design-variations.md](./frameworks/design-variations.md) to create 5 variations
2. After user selects, score using [project/PRE-DESIGN-CHECKLIST.md](./project-template/PRE-DESIGN-CHECKLIST.md)
3. Record score in [project/DESIGN-SCORES.md](./project-template/DESIGN-SCORES.md)
4. Implement if score ≥ 80

---

### For Developers

**Onboarding:**
1. Read [README.md](./README.md) - Framework overview
2. Read [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md) - Understand philosophy
3. Read your project's `.ai/project/PROJECT.md` - Project specifics

**Daily Development:**
1. Follow [core/WORKFLOW.md](./core/WORKFLOW.md) for all work
2. Use [frameworks/coda.md](./frameworks/coda.md) for complex planning
3. Use [frameworks/design-variations.md](./frameworks/design-variations.md) for design decisions

**Quality Assurance:**
1. Score design work using project's Pre-Design Checklist
2. Track scores in project's DESIGN-SCORES.md
3. Review principles regularly

---

### For Project Managers

**Setting Up New Project:**
1. Copy [project-template/PROJECT-TEMPLATE.md](./project-template/PROJECT-TEMPLATE.md)
2. Work with design team to customize [PRE-DESIGN-CHECKLIST.md](./project-template/PRE-DESIGN-CHECKLIST.md)
3. Set up [DESIGN-SCORES.md](./project-template/DESIGN-SCORES.md) tracking

**Ongoing Management:**
1. Review DESIGN-SCORES.md monthly
2. Check that scores trend upward
3. Identify weak categories for training/focus

---

## 🔍 Quick Reference

### "When do I use...?"

| Situation | Use This |
|-----------|----------|
| Starting any task | [core/WORKFLOW.md](./core/WORKFLOW.md) |
| Complex feature (3+ files) | [frameworks/coda.md](./frameworks/coda.md) |
| Any design/UI work | [frameworks/design-variations.md](./frameworks/design-variations.md) |
| Before presenting design | [project/PRE-DESIGN-CHECKLIST.md](./project-template/PRE-DESIGN-CHECKLIST.md) |
| Need project context | [project/PROJECT.md](./project-template/PROJECT-TEMPLATE.md) |
| Writing messages to user | [core/COMMUNICATION.md](./core/COMMUNICATION.md) |
| Making architectural decisions | [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md) |
| Tracking quality over time | [project/DESIGN-SCORES.md](./project-template/DESIGN-SCORES.md) |

---

### "Where do I find...?"

| Looking for | Location |
|-------------|----------|
| The 5 pillars | [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md) |
| 6-step process | [core/WORKFLOW.md](./core/WORKFLOW.md) |
| CODA template | [frameworks/coda.md](./frameworks/coda.md) |
| Design variations workflow | [frameworks/design-variations.md](./frameworks/design-variations.md) |
| Communication templates | [core/COMMUNICATION.md](./core/COMMUNICATION.md) |
| Project setup template | [project-template/PROJECT-TEMPLATE.md](./project-template/PROJECT-TEMPLATE.md) |
| Quality checklist template | [project-template/PRE-DESIGN-CHECKLIST.md](./project-template/PRE-DESIGN-CHECKLIST.md) |
| Score tracking template | [project-template/DESIGN-SCORES.md](./project-template/DESIGN-SCORES.md) |

---

## 🚀 Advanced Usage

### Linking vs Copying Files

**For universal files (core/, frameworks/):**

**Option 1: Symlink (Recommended)**
```bash
# In your project's .ai/ directory
ln -s /path/to/lostmonster/.ai-framework/core ./core
ln -s /path/to/lostmonster/.ai-framework/frameworks ./frameworks
```

Benefits:
- Always up-to-date with Lost Monster
- Single source of truth
- Less duplication

**Option 2: Copy**
```bash
cp -r /path/to/lostmonster/.ai-framework/core ./core
cp -r /path/to/lostmonster/.ai-framework/frameworks ./frameworks
```

Benefits:
- Self-contained project
- Can customize if needed
- No external dependencies

**For project-specific files (project-template/):**
Always copy and customize - these are meant to be project-specific.

---

### Extending the Framework

**Adding new frameworks:**
1. Create new file in `frameworks/`
2. Follow existing structure
3. Update this INDEX.md
4. Update README.md

**Adding new templates:**
1. Create in `templates/`
2. Use `.template` extension
3. Add placeholder guidance
4. Document in INDEX.md

**Adding new workflows:**
1. Create in `workflows/`
2. Link to relevant frameworks
3. Include examples
4. Update INDEX.md

---

## 📖 Glossary

**CODA:** Context-Objective-Details-Acceptance planning framework

**Design Variations:** The 5-variations workflow for all design work

**Pre-Design Checklist:** Mandatory verification before presenting design work

**Design Scores:** Quality tracking system (0-100 scale)

**Light CODA:** Conversational CODA thinking (default mode)

**Heavy CODA:** Formal CODA document (when explicitly needed)

**Quality Scoring:** Objective measurement system (principle #5)

**The 6 Steps:** Think, Research, Plan, Verify, Implement, Review

**The 5 Pillars:** Simplicity, Incremental, Verification, Communication, Quality Scoring

---

## 🆘 Troubleshooting

**"Which file do I read first?"**
→ Start with [README.md](./README.md), then [core/DEVELOPMENT-PRINCIPLES.md](./core/DEVELOPMENT-PRINCIPLES.md)

**"Do I need to read everything?"**
→ No. Read README + DEVELOPMENT-PRINCIPLES + WORKFLOW first (~20 min). Reference others as needed.

**"How do I set up a new project?"**
→ Follow the "Setting Up a New Project" checklist above

**"When should I use CODA?"**
→ For anything requiring 3+ coordinated changes or complex planning

**"Do I always create 5 design variations?"**
→ Yes, for any design work. Only skip for obvious bug fixes or tiny text changes.

**"What if my design scores below 80?"**
→ Redesign and re-score before presenting. Minimum threshold is 80/100.

**"Can I modify the core files?"**
→ No. Core files are universal. Customize project-specific files instead.

---

## 📝 Version History

**v1.0** (2025-01-09)
- Initial framework extraction from Ancarraig
- Core files: DEVELOPMENT-PRINCIPLES, WORKFLOW, COMMUNICATION
- Framework files: CODA, Design Variations
- Template files: PROJECT, PRE-DESIGN-CHECKLIST, DESIGN-SCORES
- Complete INDEX and README
- Philosophy and integration guide

---

**Next:** Read [README.md](./README.md) for framework overview and quick start guide.
