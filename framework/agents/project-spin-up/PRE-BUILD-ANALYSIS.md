# Pre-Build Analysis Framework

## 🚨 CRITICAL: NEVER BUILD WITHOUT THIS

**Golden Rule**: No code is written until analysis scores 100/100.

This framework ensures thorough planning before any implementation begins.

---

## 📋 **Analysis Process (Mandatory)**

### Phase 1: Requirements Gathering
**Use CODA Framework**

#### Context
- What business problem are we solving?
- Who are the users?
- What's the current state?
- What constraints exist?

#### Objective
- What does success look like?
- What are the measurable outcomes?
- What's the primary goal?
- What are secondary goals?

#### Details
- User flows
- Technical requirements
- Design requirements
- Integration points
- Dependencies

#### Acceptance Criteria
- How do we know it's done?
- What tests must pass?
- What can users do?
- What metrics prove success?

**Score: /25**

---

### Phase 2: Architecture Analysis
**Stress Test the Solution**

#### Technical Feasibility (5 points each)
- [ ] **Scalability**: Will this work at 10x load?
- [ ] **Maintainability**: Can another dev understand this in 6 months?
- [ ] **Security**: Are there obvious vulnerabilities?
- [ ] **Performance**: Will it be fast enough?
- [ ] **Cost**: Is the infrastructure cost sustainable?

#### Design Patterns (5 points each)
- [ ] **Consistency**: Does it match existing patterns?
- [ ] **Navigation**: Can users get from A to B easily?
- [ ] **Error Handling**: What happens when things go wrong?
- [ ] **Mobile Responsiveness**: Does it work on all devices?
- [ ] **Accessibility**: Can everyone use it?

**Score: /50**

---

### Phase 3: User Flow Validation
**Walk Through Every Scenario**

#### Primary User Flow (10 points)
- [ ] Step-by-step flow documented
- [ ] Happy path identified
- [ ] All screens/pages listed
- [ ] CTA buttons clear
- [ ] Success state defined

#### Edge Cases (5 points each)
- [ ] What if user is logged out?
- [ ] What if data doesn't exist?
- [ ] What if network fails?
- [ ] What if user goes back?
- [ ] What if concurrent users?

**Score: /35**

---

### Phase 4: Implementation Readiness
**Checklist Before Building**

#### Planning Complete (2 points each)
- [ ] PRD exists and is approved
- [ ] Wireframes/mockups ready
- [ ] Database schema designed
- [ ] API endpoints defined
- [ ] Component hierarchy mapped

#### Infrastructure Ready (2 points each)
- [ ] Dev environment set up
- [ ] Database provisioned
- [ ] Auth configured
- [ ] APIs accessible
- [ ] Deployment pipeline ready

**Score: /20**

---

## 🎯 **Scoring System**

### Total Score: /130 points

**Requirements**:
- **Minimum to proceed**: 100/130 (77%)
- **Recommended**: 115/130 (88%)
- **Excellent**: 125+/130 (96%+)

### Score Categories

| Score | Status | Action |
|-------|--------|--------|
| 0-50 | ❌ **Not Ready** | Go back to discovery |
| 51-75 | ⚠️ **High Risk** | Address critical gaps |
| 76-99 | 🟡 **Needs Work** | Fill in missing pieces |
| 100-114 | ✅ **Ready** | Proceed with caution |
| 115-124 | 🟢 **Good** | Build with confidence |
| 125-130 | 🔥 **Excellent** | This will be great |

---

## 📝 **Analysis Template**

Use this for every project:

```markdown
# Project Analysis: [PROJECT NAME]

## Phase 1: Requirements (CODA)

### Context
[Business problem, users, current state, constraints]

### Objective
[Success definition, measurable outcomes, primary/secondary goals]

### Details
[User flows, technical requirements, design, integrations, dependencies]

### Acceptance Criteria
[Done definition, tests, user capabilities, success metrics]

**Phase 1 Score**: __/25

---

## Phase 2: Architecture

### Technical Feasibility
- Scalability: [Analysis] - __/5
- Maintainability: [Analysis] - __/5
- Security: [Analysis] - __/5
- Performance: [Analysis] - __/5
- Cost: [Analysis] - __/5

### Design Patterns
- Consistency: [Analysis] - __/5
- Navigation: [Analysis] - __/5
- Error Handling: [Analysis] - __/5
- Mobile Responsive: [Analysis] - __/5
- Accessibility: [Analysis] - __/5

**Phase 2 Score**: __/50

---

## Phase 3: User Flow

### Primary User Flow
[Step-by-step documentation]
**Score**: __/10

### Edge Cases
1. Logged out: [Analysis] - __/5
2. No data: [Analysis] - __/5
3. Network failure: [Analysis] - __/5
4. User goes back: [Analysis] - __/5
5. Concurrent users: [Analysis] - __/5

**Phase 3 Score**: __/35

---

## Phase 4: Implementation Readiness

### Planning Complete
- PRD: __ /2
- Wireframes: __ /2
- Database schema: __ /2
- API endpoints: __ /2
- Component hierarchy: __ /2

### Infrastructure Ready
- Dev environment: __ /2
- Database: __ /2
- Auth: __ /2
- APIs: __ /2
- Deployment: __ /2

**Phase 4 Score**: __/20

---

## 📊 Total Score: __/130

**Status**: [Not Ready / High Risk / Needs Work / Ready / Good / Excellent]

**Decision**: [Proceed / Revise / Stop]

**Gaps to Address**:
1. [Gap 1]
2. [Gap 2]
3. [Gap 3]

**Next Steps**:
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

---

## 🔍 **Stress Testing Questions**

Ask these for EVERY project:

### Scale
- What happens at 10x users?
- What happens at 100x data?
- What breaks first?

### Failure
- What's the worst that can happen?
- How do we recover?
- What data could be lost?

### Users
- What if users do the opposite of expected?
- What if they spam buttons?
- What if they use old browsers?

### Business
- What's the maintenance burden?
- What's the support burden?
- What's the technical debt?

### Team
- Can other devs work on this?
- Is the architecture documented?
- Are there tests?

---

## ❌ **Red Flags (Stop Immediately)**

If ANY of these are true, **do not proceed**:

- [ ] No clear success criteria
- [ ] Users can't complete primary flow
- [ ] Major security vulnerabilities
- [ ] No error handling plan
- [ ] Navigation doesn't work
- [ ] Mobile not considered
- [ ] Database schema not designed
- [ ] No rollback plan
- [ ] Infrastructure not ready
- [ ] Team doesn't understand the plan

---

## ✅ **Green Lights (Safe to Build)**

Proceed when ALL are true:

- [x] Score ≥ 100/130
- [x] PRD approved
- [x] User flows validated
- [x] Architecture stress-tested
- [x] Infrastructure ready
- [x] Team understands the plan
- [x] Success metrics defined
- [x] Rollback plan exists

---

## 🎯 **Integration with Project Spin-Up Agent**

### Updated Workflow

```
1. Discovery Questions (Question Bank)
   ↓
2. PRE-BUILD ANALYSIS ← YOU ARE HERE
   ↓
3. Architecture Selection (Recommendation Engine)
   ↓
4. Infrastructure Setup (Implementation Guides)
   ↓
5. Code Generation (Template Library)
   ↓
6. Testing & Launch (Testing Guide)
```

**Agent MUST**:
- Run analysis before any code
- Score every section
- Block building if score < 100
- Document all gaps
- Provide remediation steps

---

## 📚 **Example: TWIN Platform Analysis**

**What we SHOULD have done**:

### Phase 1: Requirements
- ✅ Context: Internal tool + public site for TWIN
- ✅ Objective: Replace Webflow, centralize workflows
- ✅ Details: Recruitment, tasks, blog, auth
- ✅ Acceptance: Team can use daily, no errors

**Score**: 25/25 ✅

### Phase 2: Architecture
- ✅ Scalability: Low volume, serverless works
- ✅ Maintainability: TypeScript, clear structure
- ✅ Security: Clerk handles auth properly
- ✅ Performance: Static + SSR = fast
- ✅ Cost: ~$60-90/mo sustainable
- ⚠️ Consistency: FAILED - No header/footer planned
- ✅ Navigation: Pages listed
- ✅ Error Handling: React error boundaries
- ✅ Mobile: Tailwind responsive
- ✅ Accessibility: Semantic HTML

**Score**: 45/50 ⚠️ (Missing navigation)

### Phase 3: User Flow
- ✅ Primary flow: Homepage → Pages → Apply
- ⚠️ Edge case missed: What if user can't navigate? FAILED

**Score**: 25/35 ⚠️

### Phase 4: Implementation
- ✅ Planning: All docs exist
- ⚠️ Infrastructure: Should have been set up first

**Score**: 15/20 ⚠️

### Total: 110/130 (85%)

**Analysis**: Would have caught the navigation issue before building!

---

## 🚀 **How to Use This**

### For New Projects
1. Fill out analysis template
2. Score each section honestly
3. Address gaps until score ≥ 100
4. Get approval from stakeholder
5. Then and ONLY then, start building

### For In-Progress Projects
1. Run analysis retroactively
2. Identify what was missed
3. Document lessons learned
4. Fix gaps before continuing

### For Project Spin-Up Agent
1. Agent asks discovery questions
2. Agent fills analysis template
3. Agent scores sections
4. Agent reports score
5. If < 100: Agent suggests fixes
6. If ≥ 100: Agent proceeds to architecture

---

**Remember**: Planning time is never wasted. Building the wrong thing is.

**Score requirement**: 100/130 minimum, no exceptions.






