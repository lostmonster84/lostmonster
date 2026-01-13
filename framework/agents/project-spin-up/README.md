# Project Spin-Up Agent

> **An intelligent orchestrating agent that guides users from initial project concept to fully deployed, working infrastructure through strategic questioning, architecture design, automated setup, and intelligent implementation.**

---

## 🎯 WHAT IT DOES

The Project Spin-Up Agent transforms this:

```
"I want to build a B2B SaaS tool for teams"
```

Into this (in ~15 minutes):

```
✅ Complete Next.js project with 52 files
✅ Database schema with migrations
✅ Authentication flow (Clerk with orgs)
✅ Stripe subscriptions configured
✅ API routes with validation
✅ UI components and dashboard
✅ Deployment pipeline (Vercel + GitHub Actions)
✅ Complete documentation
✅ Ready to `npm install && npm run dev`
```

**Time Saved**: 2-3 days of manual setup → 15 minutes

---

## 🚀 KEY FEATURES

### 1. **Intelligent Questioning**
- 25-35 questions via conditional branching
- Smart defaults to reduce decision fatigue
- Progressive disclosure (only ask what matters)
- Contextual explanations for every choice

### 2. **Architecture Recommendation**
- 15+ battle-tested architecture patterns
- Scoring algorithm matches requirements to optimal stack
- Clear explanation of tradeoffs
- Cost estimates and scaling characteristics

### 3. **Complete Project Generation**
- 50-150 production-ready files
- Type-safe, linted, formatted code
- Database schema with migrations
- Auth flow with providers
- Payment integration
- Deployment configuration
- Tests and CI/CD

### 4. **Comprehensive Documentation**
- README with setup instructions
- Architecture diagrams
- API documentation
- Handoff summary with decisions log
- Project-specific AI context (CLAUDE.md, PROJECT.md, etc.)

### 5. **Smart Session Management**
- Resume anytime (never lose progress)
- Rollback decisions without breaking dependencies
- Review and change any answer
- Export/import sessions

---

## 📋 TYPICAL FLOW

### Phase 0: Pre-Build Analysis (10-15 minutes) 🚨 **MANDATORY**

**Requirements Gathering & Stress Testing**

```
Agent: "Before we build anything, let's analyze thoroughly."

→ Fills out CODA framework (Context, Objective, Details, Acceptance)
→ Validates user flows end-to-end
→ Stress tests architecture decisions
→ Identifies edge cases and failure modes
→ Scores readiness: /130 points

Agent: "Analysis complete. Score: 115/130 (Good)"
Agent: "Gap identified: Navigation not planned. Adding to spec..."
Agent: "Updated score: 125/130 (Excellent). Ready to proceed."
```

**Output**:
- Complete analysis document
- Scored across 4 dimensions
- All gaps documented and addressed
- Minimum score 100/130 required to proceed

**Why**: Prevents costly mistakes like missing navigation, unclear requirements, or flawed architecture. The TWIN platform was built without this - had to retrofit navigation after. Never again.

**See**: [`PRE-BUILD-ANALYSIS.md`](./PRE-BUILD-ANALYSIS.md) for complete framework.

---

### Phase 1: Discovery (5-8 minutes)
```
Agent: "What type of project are you building?"
User: "B2B SaaS"

Agent: "Do users work in teams or organizations?"
User: "Yes, teams"

Agent: "Will you charge money?"
User: "Yes, subscriptions"

... 25-30 more questions ...
```

### Phase 2: Architecture Recommendation (2 minutes)
```
Agent: "Perfect! Based on your answers, I recommend:

🏗️ Multi-Tenant B2B SaaS Architecture

Tech Stack:
- Frontend: Next.js 14 + TypeScript + Tailwind
- Database: Postgres (Supabase)
- Auth: Clerk (with org management)
- Payments: Stripe
- Hosting: Vercel

Why this is perfect for you:
✓ Built-in team workspaces
✓ Handles 10k+ users without changes
✓ ~$150/mo at 1k users
✓ 4-6 weeks to MVP

Ready to proceed?"
```

### Phase 3: Generation (3-5 minutes)
```
⚡ Generating project structure...
✓ Created 52 files

⚡ Setting up database schema...
✓ 8 tables with relationships

⚡ Configuring authentication...
✓ Clerk integrated

⚡ Building API routes...
✓ 12 endpoints

🎉 All done! Ready to build.
```

### Phase 4: Handoff (1 minute)
```
Your project is ready!

Next steps:
1. npm install
2. Add API keys (.env.local)
3. npm run dev

Documentation:
- README.md - Quick start
- ARCHITECTURE.md - How it works
- HANDOFF-SUMMARY.md - Every decision I made

🚀 You're ready to build!
```

---

## 🛠️ ARCHITECTURE PATTERNS

Currently documented (2 complete, 13 in progress):

1. **Simple SaaS** - B2C, individual accounts, subscriptions
2. **Multi-Tenant SaaS** - B2B, organizations, RBAC, per-org billing
3. Real-Time Collaborative App *(in progress)*
4. E-commerce Store *(in progress)*
5. Marketplace (Two-Sided) *(in progress)*
6. Content Platform *(in progress)*
7. API Platform *(in progress)*
8. Mobile Backend *(in progress)*
9. Internal Tool *(in progress)*
10. Portfolio/Landing Page *(in progress)*
11-15. Additional patterns *(planned)*

Each pattern includes:
- Complete tech stack specification
- Database schema examples
- Cost breakdown (free tier → scale)
- Scaling characteristics
- Implementation timeline
- File structure
- Known limitations

---

## 📂 PROJECT STRUCTURE

```
.framework/agents/project-spin-up/
├── README.md                          # This file
├── PROJECT-SPIN-UP-AGENT-PLAN.md      # PLANX detailed plan
├── PROGRESS.md                        # Development progress
│
├── personality.md                     # Agent personality & voice
├── conversation-patterns.md           # Phase-specific flows
├── response-templates.md              # 25 reusable templates
│
├── question-bank.md                   # 80 questions
├── decision-trees.md                  # Branching logic
├── conditional-logic.md               # Implementation details
│
├── architectures/
│   ├── README.md                      # Pattern library overview
│   ├── simple-saas.md                 # Complete pattern
│   ├── multi-tenant-saas.md           # Complete pattern
│   └── ... (13 more patterns)
│
├── recommendation-engine.md           # Scoring algorithm
│
├── context-schema.json                # Session state schema
├── session-management.md              # Persistence & resume
├── rollback-logic.md                  # Smart rollback
│
├── templates/                         # File templates (TODO)
├── generators/                        # File generators (TODO)
├── integrations/                      # Service setup guides (TODO)
└── tests/                             # Test scenarios (TODO)
```

---

## 🎯 CURRENT STATUS

**Development Phase**: Milestone 2 (Project Generation Engine)  
**Completion**: 20% (4/20 TODOs, Milestone 1 complete)

### ✅ Completed
- Milestone 1: Agent Core & Intelligence Engine
  - Agent personality and communication protocols
  - Complete question bank with decision trees
  - Architecture pattern library (2 patterns complete)
  - Session management and rollback logic

### 🔄 In Progress
- Milestone 2: Project Generation Engine
  - Template library system (current)
  - File system generator
  - Dependency management
  - Environment configuration

### ⏳ Next Up
- Milestone 3: Infrastructure Automation
- Milestone 4: Documentation Generation
- Milestone 5: Testing & Launch

---

## 💡 DESIGN PRINCIPLES

### 1. **User First**
- Never overwhelming
- Clear explanations
- Smart defaults
- Build trust through transparency

### 2. **Production-Ready**
- No toy code
- Industry best practices
- Type-safe, tested, documented
- Security-conscious

### 3. **Latest Technology Always** 🔥
- **NEVER use outdated packages**
- Always start projects with latest stable versions
- Next.js latest, React latest, TypeScript latest
- All dependencies at current stable releases
- Check npm/registry for latest versions before generating
- No legacy versions unless explicitly required
- Future-proof by default

**Why**: Projects that start outdated are dead on arrival. Every new project deserves the latest, fastest, most secure stack available. No compromises.

### 4. **Flexible But Opinionated**
- Strong recommendations with reasoning
- Allow customization
- Warn about tradeoffs

### 5. **Never Lose Progress**
- Save after every interaction
- Resume anytime
- Rollback any decision
- Export/import sessions

### 6. **Learn From Users**
- Track what works
- Measure satisfaction
- Iterate on patterns
- Improve recommendations

---

## 🎓 HOW TO USE (When Complete)

### As a User

```bash
# Start a new project
npx @framework/spin-up-agent

# Resume existing session
npx @framework/spin-up-agent --resume

# Review session
npx @framework/spin-up-agent --review <session-id>
```

### As a Developer (Extending)

```typescript
import { SpinUpAgent } from '@framework/spin-up-agent';

// Add custom architecture pattern
agent.registerPattern({
  id: 'my-custom-pattern',
  name: 'My Custom Stack',
  projectTypes: ['saas'],
  techStack: { ... },
  templates: [ ... ]
});

// Add custom question
agent.addQuestion({
  id: 'custom-q1',
  tier: 2,
  text: 'Custom question?',
  options: [ ... ]
});

// Hook into events
agent.on('session:completed', async (context) => {
  await notifyTeam(context);
});
```

---

## 🤝 CONTRIBUTING

### Adding Architecture Patterns

1. Copy `architectures/simple-saas.md` as template
2. Fill in all sections thoroughly
3. Test with real project generation
4. Add to `architectures/README.md`
5. Update recommendation engine scoring

### Adding Questions

1. Add to `question-bank.md` with appropriate tier
2. Add branching logic to `decision-trees.md`
3. Update `conditional-logic.md` if needed
4. Test with various scenarios

### Improving Templates

1. Identify missing or outdated templates
2. Update template files
3. Test generation output
4. Ensure linting/type checking passes

---

## 📊 SUCCESS METRICS

**Target Metrics** (when launched):
- ✅ Time to working project: < 20 minutes
- ✅ Generated projects build: > 95%
- ✅ User satisfaction: > 90%
- ✅ Recommendation accuracy: > 95%
- ✅ Session completion rate: > 85%

---

## 🔗 RELATED RESOURCES

- **Framework Documentation**: `../../COMPLETE-SETUP-GUIDE.md`
- **Other Agents**: `../` (code-reviewer, feature-builder, etc.)
- **Planning Frameworks**: `../../frameworks/` (PLANX, PIXELX, etc.)

---

## 📝 LICENSE

Part of the universal AI development framework. See root LICENSE.

---

**Status**: In active development. Milestone 1 complete, Milestone 2 in progress.

**Target Launch**: Q1 2026

**Maintainer**: Framework Team

