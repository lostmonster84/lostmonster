# Lost Monster Systems HQ

> The internal engine that powers all Lost Monster projects

---

## What This Is

**Systems HQ** is Lost Monster's internal framework - the operating system that ensures consistent, high-quality delivery across all client projects.

**This is NOT client-facing content.** For client-facing marketing content, see `../website/`

---

## Two Paths, Two Purposes

```
lostmonster/
├── website/              # CLIENT-FACING (what clients see)
│   └── Marketing content for Lost Monster's public website
│
└── systems-hq/           # INTERNAL ENGINE (how we deliver)
    └── Frameworks, templates, and tools for every project
```

### `website/` - The Promise
- What you show prospective clients
- Marketing site content
- Case studies, services, pricing
- Positions Lost Monster as framework-driven agency

### `systems-hq/` - The Delivery
- What you use on every client project
- Internal frameworks and templates
- CODA planning, Design Variations, Quality Checklists
- Makes the promises in `website/` possible

---

## What's Inside

The actual frameworks are located in `../.ai-framework/` directory. This README serves as the guide to using them.

### Core Frameworks

**Location:** `../.ai-framework/core/`

1. **CODA Planning Framework**
   - Context-Objective-Details-Acceptance methodology
   - Eliminates scope creep, ensures alignment
   - Used at start of every project

2. **Design Variations Workflow**
   - Always deliver 5 design options
   - Systematic exploration of design space
   - Faster decisions, more confidence

3. **Pre-Design Quality Checklist**
   - 80/100 minimum score
   - Objective quality standards
   - Enforced at every phase

4. **Development Principles**
   - Code standards, best practices
   - Performance targets, accessibility requirements
   - Testing protocols

---

### Project Templates

**Location:** `../.ai-framework/project-template/`

Files to copy into every new client project:

1. **PROJECT-TEMPLATE.md**
   - Master template for project context
   - Customize for each client
   - AI reads this for project understanding

2. **DOMAIN-KNOWLEDGE.md**
   - Business overview, target audience
   - Messaging, brand voice
   - SEO keywords, content strategy
   - Makes AI 10x better

3. **DESIGN-SYSTEM.md**
   - Design philosophy, tokens
   - Component documentation
   - Accessibility guidelines
   - Single source of truth

4. **DESIGN-BRIEF.md**
   - Visual direction requirements
   - Design principles, constraints
   - Used before Design Variations phase

5. **PRE-DESIGN-CHECKLIST.md**
   - Quality verification before design starts
   - Ensures 80/100 minimum
   - Prevents launching subpar work

---

### Utility Templates

**Location:** `../.ai-framework/templates/`

1. **SETUP-CHECKLIST.md**
   - Step-by-step project setup guide
   - Prevents missing critical customizations
   - 30-40x ROI (30-60 min investment saves hours)

2. **playwright.config.template.ts**
   - Production-ready E2E testing setup
   - CI/CD optimized
   - Screenshot/video on failure

3. **Slash Commands** (`.claude/commands/`)
   - `/coda` - Start CODA planning
   - `/design-variations` - Generate 5 design options
   - `/quality-check` - Run Pre-Design Checklist
   - Custom commands for common workflows

---

### Automation Scripts

**Location:** `../utilities/scripts/`

1. **Git Automation** (`git-automation/`)
   - `release-changelog.ts` - Automated changelog releases
   - `prepare-release.sh` - Complete release workflow
   - `install-git-hooks.sh` - One-command hook setup
   - Saves 8-13 min per release → 10 seconds

---

## How to Use This (Every New Project)

### Step 1: Copy Systems HQ to New Project

```bash
# Start new client project
mkdir client-project-name && cd client-project-name

# Copy internal frameworks
cp -r /path/to/lostmonster/.ai-framework/ .

# Or create symlink (advanced)
ln -s /path/to/lostmonster/.ai-framework/ .ai-framework
```

---

### Step 2: Run Setup Checklist

```bash
# Copy setup checklist to project root
cp .ai-framework/templates/SETUP-CHECKLIST.md.template SETUP-CHECKLIST.md

# Follow the checklist step-by-step
# Customize PROJECT-TEMPLATE.md
# Create DOMAIN-KNOWLEDGE.md (highly recommended!)
# Create DESIGN-SYSTEM.md (if applicable)
```

---

### Step 3: Customize for Client

**Required Customizations:**

1. **PROJECT-TEMPLATE.md**
   - Replace all `[PLACEHOLDER]` text
   - Fill in client business context
   - Define project objectives, tech stack
   - Set acceptance criteria

2. **DOMAIN-KNOWLEDGE.md** (CRITICAL)
   - Business overview (what they do, who they serve)
   - Target audience (demographics, psychographics, pain points)
   - Messaging & brand voice (how they communicate)
   - SEO keywords (what they want to rank for)
   - This makes AI content 10x better

3. **DESIGN-SYSTEM.md** (If applicable)
   - Design philosophy & principles
   - Color palette, typography, spacing
   - Component patterns
   - Accessibility guidelines

---

### Step 4: Use Frameworks Throughout Project

**Discovery Phase:**
- Use CODA framework (`/coda` command)
- Document Context, Objective, Details, Acceptance
- Get client sign-off before proceeding

**Design Phase:**
- Use Design Variations workflow
- Generate 5 options, client picks direction
- Refine chosen direction

**Development Phase:**
- Follow Development Principles
- Weekly demos (show working code)
- Quality checkpoints (80/100 minimum)

**Testing Phase:**
- Cross-browser, mobile, accessibility testing
- Performance optimization (Core Web Vitals)
- Pre-launch checklist

**Launch Phase:**
- Use release automation scripts
- 30-day post-launch support
- Capture learnings for future projects

---

## The Flywheel Effect

Every project improves the system:

```
Client Project → Learnings → Better Frameworks → Better Next Project → More Learnings → ...
```

**How to Contribute Back:**

1. **During Project:** Note what works, what doesn't
2. **After Project:** Document improvements
3. **Update Frameworks:** Add learnings to Lost Monster repo
4. **Share Knowledge:** Update documentation, templates
5. **Next Project:** Benefits from improvements

**Example:**
- Ancarraig project revealed need for DOMAIN-KNOWLEDGE.md template
- Created template, added to systems-hq
- Every future project benefits (10x better AI content)

---

## Framework Stats

**Current Status (January 2025):**
- **Files:** 72 files
- **Lines:** ~20,000+ lines of documentation
- **Frameworks:** 4 core frameworks (CODA, Design Variations, Quality Checklist, Dev Principles)
- **Templates:** 8 project templates
- **Scripts:** 5 automation scripts
- **Time Saved:** 7+ hours per project

**Value Delivered:**
- Setup guidance: 30-60 min saved per project
- Domain knowledge: 1-2 hours documentation, 10+ hours saved in revisions
- Design system: 2-3 hours documentation
- E2E testing: 30-60 min setup
- Release automation: 10 min → 10 seconds per release

**Total:** 6-9 hours saved per project + 10x quality improvement

---

## Competitive Advantage

This is WHY Lost Monster delivers better results:

### Other Agencies
- Rely on individual talent (hire great dev = great work)
- Tribal knowledge (not documented)
- Inconsistent quality (depends on who's assigned)
- Every project starts from scratch

### Lost Monster
- Rely on proven systems (consistent regardless of team)
- Documented frameworks (onboard new team members instantly)
- Enforced quality (80/100 minimum, objectively measured)
- Every project builds on previous learnings

**The Result:**
- Faster delivery (less rework)
- Higher quality (enforced standards)
- Better conversion (business understanding baked in)
- Scalable (systems, not headcount)

---

## When to Update Systems HQ

### After Every Project
- [ ] Document what worked well
- [ ] Note what could be improved
- [ ] Update relevant templates
- [ ] Add new patterns discovered

### Quarterly Review
- [ ] Audit all frameworks (still relevant?)
- [ ] Update tech stack references (new tools?)
- [ ] Refresh best practices (industry changes?)
- [ ] Add new templates (patterns emerged?)

### Major Milestones
- [ ] New service offering (add relevant templates)
- [ ] New industry focus (add domain knowledge guides)
- [ ] Process improvements (update workflows)
- [ ] Tool changes (update templates)

---

## Integration with Website Content

**website/** and **systems-hq/** work together:

### Website Promises
- "Framework-driven development"
- "80/100 quality minimum"
- "CODA planning eliminates surprises"
- "5 design variations, every time"
- "Domain knowledge makes AI 10x better"

### Systems HQ Delivers
- CODA framework (makes the promise real)
- Quality Checklist (enforces 80/100)
- Design Variations workflow (delivers 5 options)
- Domain Knowledge template (captures business context)

**Integrity Check:**
Does our internal delivery (systems-hq) match our external promises (website)?
- If NO: Either improve systems-hq or adjust website claims
- If YES: Maintain alignment as both evolve

---

## Usage Rights

**Internal Use:**
- ✅ Use on all Lost Monster client projects
- ✅ Customize for specific project needs
- ✅ Share with contractors working on Lost Monster projects
- ✅ Evolve based on project learnings

**External Use:**
- ❌ Don't share publicly (competitive advantage)
- ❌ Don't license to competitors
- ⚠️ White-label licensing possible (case-by-case basis)

---

## Questions?

**For clarification on frameworks:**
- Read `.ai-framework/README.md` (comprehensive guide)
- Review `.ai-framework/INDEX.md` (file-by-file breakdown)
- Check specific framework documentation

**For project setup:**
- Use `.ai-framework/templates/SETUP-CHECKLIST.md.template`
- Follow step-by-step
- Verify with checklist at end

**For improvements:**
- Document learnings during projects
- Propose updates to frameworks
- Submit to Lost Monster repo

---

## The Lost Monster Operating System

Think of **systems-hq** as your operating system:

- **Windows/Mac** = The interface you see
- **Unix/Linux kernel** = The system that makes it work
- **Lost Monster website** = The interface clients see
- **Systems HQ** = The system that makes projects work

---

**Your competitive advantage. Use it on every project. Improve it continuously.**

---

**Last Updated:** January 9, 2025
**Version:** 1.0
**Status:** Production-ready, battle-tested through dozens of projects
