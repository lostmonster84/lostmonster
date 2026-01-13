# Project Spin-Up Agent - Rollback Logic

> **Purpose**: Intelligent rollback system for changing decisions without breaking dependencies or losing valid work.

---

## 🎯 ROLLBACK SCENARIOS

### 1. Change Single Answer
User wants to change one specific answer without restarting.

### 2. Change Architecture
User wants different tech stack after seeing recommendation.

### 3. Change Major Decision
User realizes they need multi-tenancy after saying "no".

### 4. Restart Phase
User wants to go back to beginning of architecture selection.

---

## 🔗 DEPENDENCY GRAPH

### Understanding Dependencies

```typescript
// Question Q1.3 (Team Structure) depends on Q1.2 (User Model)
// If user changes Q1.2 from "b2b" to "b2c", Q1.3 becomes invalid

const QUESTION_DEPENDENCIES: Record<string, string[]> = {
  'Q1.3': ['Q1.2'],           // Team structure depends on user model
  'Q1.3b': ['Q1.3'],          // Org billing depends on team structure
  'Q2.2': ['Q1.2'],           // Enterprise auth depends on user model
  'Q2.3b': ['Q2.3'],          // Custom permissions depend on roles
  'Q2.5b': ['Q2.5'],          // Storage volume depends on file uploads
  'Q2.6b': ['Q2.6'],          // Payment details depend on payment yes/no
  // ... more dependencies
};

function findDependentQuestions(
  questionId: string,
  allDependencies: Record<string, string[]>
): string[] {
  const dependents: string[] = [];
  
  // Direct dependents
  Object.entries(allDependencies).forEach(([qId, deps]) => {
    if (deps.includes(questionId)) {
      dependents.push(qId);
      // Recursive: find dependents of dependents
      dependents.push(...findDependentQuestions(qId, allDependencies));
    }
  });
  
  return [...new Set(dependents)]; // Deduplicate
}
```

---

## 🔄 ROLLBACK STRATEGIES

### Strategy A: Surgical Rollback (Minimal Impact)

**When**: User changes minor answer that doesn't affect much  
**How**: Clear just that answer and dependents, keep everything else

```typescript
async function surgicalRollback(
  context: QuestionContext,
  questionId: string,
  newAnswer: any
): Promise<void> {
  // Find all dependent questions
  const dependents = findDependentQuestions(questionId, QUESTION_DEPENDENCIES);
  
  // Warn user about impact
  if (dependents.length > 0) {
    const confirmed = await confirmRollback(
      `Changing this will also reset ${dependents.length} other answers`,
      dependents
    );
    
    if (!confirmed) {
      return;
    }
  }
  
  // Clear dependent answers
  dependents.forEach(depId => {
    delete context.answers[depId];
  });
  
  // Update the answer
  context.answers[questionId] = newAnswer;
  
  // Recalculate feature flags
  recalculateFeatureFlags(context);
  
  // If architecture was chosen, validate it still makes sense
  if (context.architecture) {
    const stillValid = validateArchitecture(context);
    if (!stillValid) {
      delete context.architecture;
      await promptForNewArchitecture(context);
    }
  }
  
  // Save
  await sessionManager.save(context, SaveTrigger.USER_REQUESTED);
}
```

---

### Strategy B: Phase Rollback (Clean Slate)

**When**: User wants to reconsider entire phase  
**How**: Reset to beginning of that phase

```typescript
async function phaseRollback(
  context: QuestionContext,
  targetPhase: Phase
): Promise<void> {
  const phases = ['discovery', 'architecture', 'confirmation', 'generation'];
  const currentIdx = phases.indexOf(context.phase);
  const targetIdx = phases.indexOf(targetPhase);
  
  if (targetIdx >= currentIdx) {
    throw new Error("Can only roll back to earlier phase");
  }
  
  // Clear data from later phases
  if (targetIdx < phases.indexOf('architecture')) {
    delete context.architecture;
    delete context.generation;
    // Keep answers but mark for review
  }
  
  if (targetIdx < phases.indexOf('generation')) {
    delete context.generation;
  }
  
  // Update phase
  context.phase = targetPhase;
  
  // Reset progress
  context.progress.percentage_complete = calculateProgress(targetPhase);
  
  // Save and resume
  await sessionManager.save(context, SaveTrigger.USER_REQUESTED);
  await continueFromPhase(targetPhase, context);
}
```

---

### Strategy C: Smart Rollback (Preserve Work)

**When**: User changes something but wants to keep unaffected decisions  
**How**: Analyze dependency tree, keep independent work

```typescript
async function smartRollback(
  context: QuestionContext,
  changeset: Record<string, any>
): Promise<void> {
  // Analyze what's changing
  const changedQuestions = Object.keys(changeset);
  
  // Find all affected questions
  const affected = new Set<string>();
  changedQuestions.forEach(qId => {
    const deps = findDependentQuestions(qId, QUESTION_DEPENDENCIES);
    deps.forEach(d => affected.add(d));
  });
  
  // Categorize impact
  const impact = {
    answers_cleared: Array.from(affected),
    architecture_affected: false,
    generation_affected: false
  };
  
  // Check if architecture choice is still valid
  if (context.architecture) {
    const tempContext = { ...context, answers: { ...context.answers, ...changeset } };
    const archScore = scoreArchitecture(context.architecture.pattern_id, tempContext);
    
    if (archScore < 150) { // Threshold for viability
      impact.architecture_affected = true;
    }
  }
  
  // Check if generation is affected
  if (context.generation) {
    if (impact.architecture_affected || affect.size > 5) {
      impact.generation_affected = true;
    }
  }
  
  // Present impact report
  await presentImpactReport(impact);
  
  const confirmed = await confirmChanges();
  
  if (confirmed) {
    // Apply changes
    Object.entries(changeset).forEach(([qId, answer]) => {
      context.answers[qId] = answer;
    });
    
    // Clear affected data
    impact.answers_cleared.forEach(qId => {
      delete context.answers[qId];
    });
    
    if (impact.architecture_affected) {
      delete context.architecture;
    }
    
    if (impact.generation_affected) {
      delete context.generation;
    }
    
    // Recalculate and save
    recalculateContext(context);
    await sessionManager.save(context, SaveTrigger.USER_REQUESTED);
    
    // Resume from appropriate point
    if (impact.generation_affected) {
      await continueFromPhase('architecture', context);
    } else if (impact.architecture_affected) {
      await continueFromPhase('architecture', context);
    } else {
      // Just re-ask affected questions
      await reaskQuestions(context, Array.from(affected));
    }
  }
}
```

---

## 📊 IMPACT ANALYSIS

### Calculate Impact Score

```typescript
interface RollbackImpact {
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedQuestions: string[];
  affectedDecisions: string[];
  requiresNewArchitecture: boolean;
  requiresRegeneration: boolean;
  estimatedTimeToRecover: number; // minutes
}

function analyzeRollbackImpact(
  context: QuestionContext,
  changedQuestionId: string
): RollbackImpact {
  const affected = findDependentQuestions(changedQuestionId, QUESTION_DEPENDENCIES);
  
  // Calculate severity
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  
  if (affected.length === 0) {
    severity = 'low';
  } else if (affected.length <= 3) {
    severity = 'medium';
  } else if (affected.length <= 10) {
    severity = 'high';
  } else {
    severity = 'critical';
  }
  
  // Check if core decisions affected
  const coreQuestions = ['Q1.1', 'Q1.2', 'Q1.3', 'Q2.6'];
  if (coreQuestions.includes(changedQuestionId)) {
    severity = 'critical';
  }
  
  // Check architecture impact
  let requiresNewArchitecture = false;
  if (context.architecture) {
    const newScore = recalculateArchitectureScore(context, changedQuestionId);
    if (newScore < 150 || severity === 'critical') {
      requiresNewArchitecture = true;
    }
  }
  
  // Check generation impact
  const requiresRegeneration = requiresNewArchitecture || 
    (context.generation && affected.length > 5);
  
  // Estimate time to recover
  const timeToRecover = 
    affected.length * 0.5 + // 30 seconds per question
    (requiresNewArchitecture ? 2 : 0) + // 2 minutes for architecture
    (requiresRegeneration ? 3 : 0); // 3 minutes for regeneration
  
  return {
    severity,
    affectedQuestions: affected,
    affectedDecisions: findAffectedDecisions(context, changedQuestionId),
    requiresNewArchitecture,
    requiresRegeneration,
    estimatedTimeToRecover: Math.ceil(timeToRecover)
  };
}
```

---

## 💬 USER COMMUNICATION

### Present Impact Report

```typescript
async function presentImpactReport(impact: RollbackImpact): Promise<void> {
  let message = '';
  
  if (impact.severity === 'low') {
    message = `
✅ **Low Impact Change**

This change affects only ${impact.affectedQuestions.length} other answer(s).

**Time to recover**: ~${impact.estimatedTimeToRecover} minute

Ready to proceed?
    `;
  } else if (impact.severity === 'medium') {
    message = `
⚠️ **Medium Impact Change**

Changing this will reset:
${impact.affectedQuestions.map(q => `- ${getQuestionText(q)}`).join('\n')}

**Time to recover**: ~${impact.estimatedTimeToRecover} minutes

Your architecture choice will still be valid.

Proceed with changes?
    `;
  } else if (impact.severity === 'high') {
    message = `
⚠️ **High Impact Change**

This is a significant change that affects ${impact.affectedQuestions.length} other answers.

**What will be reset:**
${impact.affectedQuestions.slice(0, 5).map(q => `- ${getQuestionText(q)}`).join('\n')}
${impact.affectedQuestions.length > 5 ? `... and ${impact.affectedQuestions.length - 5} more` : ''}

${impact.requiresNewArchitecture ? '**Architecture recommendation will be re-evaluated.**' : ''}

**Time to recover**: ~${impact.estimatedTimeToRecover} minutes

Are you sure you want to proceed?
    `;
  } else {
    // Critical
    message = `
🚨 **Critical Change**

This change fundamentally alters your project setup.

**Impact:**
- ${impact.affectedQuestions.length} answers will be reset
- ${impact.requiresNewArchitecture ? 'Architecture will be re-selected' : ''}
- ${impact.requiresRegeneration ? 'Files will need to be regenerated' : ''}

**Alternative**: Consider starting a new project setup to keep this one as reference.

**Time to recover**: ~${impact.estimatedTimeToRecover} minutes

**Are you absolutely sure?**
1. Yes, proceed with changes
2. No, cancel
3. Start a new project instead
    `;
  }
  
  await sendMessage(message);
}
```

---

## 🔧 IMPLEMENTATION EXAMPLES

### Example 1: Change Database from Supabase to PlanetScale

```typescript
// User changes Q3.2 (Database Hosting)
const impact = analyzeRollbackImpact(context, 'Q3.2');

// Impact:
// - Low severity (database choice is somewhat independent)
// - Affected: ORM choice might need reconsideration
// - Architecture: Still valid (same pattern works with both)
// - Generation: Needs regeneration (different connection strings, migration syntax)

await surgicalRollback(context, 'Q3.2', 'planetscale');

// Result: Change applied, minimal disruption
```

---

### Example 2: Change from B2C to B2B

```typescript
// User changes Q1.2 (User Model) from "b2c" to "b2b"
const impact = analyzeRollbackImpact(context, 'Q1.2');

// Impact:
// - CRITICAL severity (fundamental change)
// - Affected: Q1.3 (team structure), Q2.2 (SSO), Q2.3 (roles), payments, etc.
// - Architecture: Requires change from "Simple SaaS" to "Multi-Tenant SaaS"
// - Generation: Complete regeneration needed

await smartRollback(context, { 'Q1.2': 'b2b' });

// Result: Architecture re-selected, major restructuring
```

---

### Example 3: Add Payments After Saying "No"

```typescript
// User changes Q2.6 (Payments) from "no" to "subscription"
const impact = analyzeRollbackImpact(context, 'Q2.6');

// Impact:
// - Medium severity
// - Affected: Q2.6b (payment details) needs to be asked
// - Architecture: Still valid (same pattern supports payments)
// - Generation: Partial regeneration (add Stripe integration)

await surgicalRollback(context, 'Q2.6', 'subscription');

// Ask follow-up
await askQuestion(context, 'Q2.6b');

// Update generation plan
context.generation.filesNeedingUpdate = [
  'app/api/webhooks/stripe/route.ts',
  'lib/stripe.ts',
  'components/billing/*',
  '.env.example'
];

// Result: Payments added without disrupting existing work
```

---

## 🎯 ROLLBACK BEST PRACTICES

### 1. Always Show Impact First
Never silently clear data. Users must understand consequences.

### 2. Provide Alternatives
Offer options: "Start new project" vs "Modify this one"

### 3. Preserve What You Can
Don't clear unaffected answers or decisions.

### 4. Make Rollback Easy
One-click "Change this answer" buttons in review mode.

### 5. Track Rollbacks
Log rollback events for analytics and debugging.

### 6. Test Edge Cases
- Circular dependencies (shouldn't exist, but validate)
- Multiple simultaneous changes
- Rollback during generation

### 7. Enable Undo
Keep rollback history so users can undo a rollback.

---

## ✅ ROLLBACK CHECKLIST

- [ ] Dependency graph is accurate and complete
- [ ] Impact analysis shows correct affected items
- [ ] User is always warned before destructive changes
- [ ] Unaffected work is preserved
- [ ] Context remains valid after rollback
- [ ] Phase transitions handled correctly
- [ ] Generation state updated appropriately
- [ ] Events logged for analytics
- [ ] Error handling for edge cases
- [ ] Undo capability available

---

**Smart rollback enables users to iterate on their setup without frustration or losing progress.**






