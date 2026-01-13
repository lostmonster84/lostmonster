# Project Spin-Up Agent - Session Management

> **Purpose**: Complete session lifecycle management including persistence, resume, rollback, and state synchronization.

---

## 🔄 SESSION LIFECYCLE

```
CREATE → DISCOVERY → ARCHITECTURE → CONFIRMATION → GENERATION → COMPLETED
   ↓         ↓            ↓              ↓              ↓            ↓
 SAVE    SAVE SAVE     SAVE SAVE      SAVE SAVE      SAVE SAVE    SAVE
```

**Key Principle**: Save after every interaction to enable seamless resume.

---

## 💾 PERSISTENCE STRATEGY

### Storage Options

**Option 1: File-Based (Development/Local)**
```typescript
// Save session to local filesystem
const sessionPath = `./.spin-up-sessions/${sessionId}.json`;
await fs.writeFile(sessionPath, JSON.stringify(context, null, 2));
```

**Option 2: Database (Production)**
```sql
CREATE TABLE spin_up_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  context jsonb NOT NULL,
  phase text NOT NULL,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  completed_at timestamp,
  INDEX idx_user_sessions (user_id, created_at DESC)
);
```

**Option 3: Redis (High-Performance)**
```typescript
// Cache session in Redis with 24h TTL
await redis.setex(
  `session:${sessionId}`,
  86400, // 24 hours
  JSON.stringify(context)
);
```

---

## 📝 SAVE OPERATIONS

### When to Save

```typescript
enum SaveTrigger {
  QUESTION_ANSWERED = "question_answered",
  DECISION_MADE = "decision_made",
  PHASE_CHANGED = "phase_changed",
  FILE_GENERATED = "file_generated",
  ERROR_OCCURRED = "error_occurred",
  USER_REQUESTED = "user_requested"
}
```

### Save Implementation

```typescript
class SessionManager {
  async save(
    context: QuestionContext,
    trigger: SaveTrigger
  ): Promise<void> {
    // Update timestamp
    context.updated_at = new Date().toISOString();
    
    // Validate context schema
    const validation = validateContext(context);
    if (!validation.valid) {
      console.error("Invalid context:", validation.errors);
      // Still save, but log issue
    }
    
    try {
      // Primary storage
      await this.primaryStorage.save(context.session_id, context);
      
      // Backup storage (optional, for critical data)
      if (this.config.enableBackup) {
        await this.backupStorage.save(context.session_id, context);
      }
      
      // Emit save event (for logging/analytics)
      this.emit('session:saved', {
        session_id: context.session_id,
        trigger,
        phase: context.phase
      });
    } catch (error) {
      console.error("Failed to save session:", error);
      // Handle gracefully - continue session
      this.emit('session:save-failed', {
        session_id: context.session_id,
        error: error.message
      });
    }
  }
  
  async saveAnswer(
    context: QuestionContext,
    questionId: string,
    answer: any
  ): Promise<void> {
    // Update context
    context.answers[questionId] = answer;
    context.progress.questions_asked += 1;
    
    // Derive feature flags if needed
    this.updateFeatureFlags(context, questionId, answer);
    
    // Save
    await this.save(context, SaveTrigger.QUESTION_ANSWERED);
  }
  
  async saveDecision(
    context: QuestionContext,
    decision: Decision
  ): Promise<void> {
    // Log decision with reasoning
    context.decisions[decision.id] = {
      decision_point: decision.point,
      chosen_option: decision.choice,
      reasoning: decision.reasoning,
      alternatives: decision.alternatives,
      timestamp: new Date().toISOString()
    };
    
    await this.save(context, SaveTrigger.DECISION_MADE);
  }
}
```

---

## 🔁 RESUME CAPABILITY

### Resume Detection

```typescript
async function detectExistingSession(
  userId: string
): Promise<SessionContext | null> {
  // Check for incomplete sessions
  const sessions = await db.spinUpSessions.findMany({
    where: {
      user_id: userId,
      completed_at: null,
      created_at: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
      }
    },
    orderBy: {
      updated_at: 'desc'
    }
  });
  
  return sessions[0] || null;
}
```

### Resume Flow

```typescript
async function resumeSession(sessionId: string): Promise<void> {
  // Load context
  const context = await sessionManager.load(sessionId);
  
  if (!context) {
    throw new Error("Session not found");
  }
  
  // Present summary
  await presentSessionSummary(context);
  
  // Confirm with user
  const shouldResume = await confirmResume();
  
  if (shouldResume) {
    // Continue from last phase
    await continueFromPhase(context.phase, context);
  } else {
    // Start fresh
    await startNewSession();
  }
}

async function presentSessionSummary(
  context: QuestionContext
): Promise<void> {
  const response = `
Welcome back! I found your in-progress session from ${formatDate(context.updated_at)}.

## 📍 Session Summary

**Project**: ${context.project.name || "Unnamed Project"}
**Type**: ${context.project.type}

**✓ Progress**: ${context.progress.percentage_complete}% complete

**What we've covered:**
${context.progress.completed_steps.map(s => `- ${s}`).join('\n')}

**Key decisions made:**
${Object.entries(context.decisions).slice(0, 5).map(([key, d]) => 
  `- ${d.decision_point}: ${d.chosen_option}`
).join('\n')}

**⏭️ Next up**: ${context.progress.next_steps[0]}

---

**Would you like to:**
1. **Continue where you left off** (recommended)
2. **Review and change previous answers**
3. **Start a new project**
  `;
  
  await sendMessage(response);
}
```

---

## ⏪ ROLLBACK MECHANISM

### Rollback Single Decision

```typescript
async function rollbackDecision(
  context: QuestionContext,
  decisionId: string
): Promise<void> {
  const decision = context.decisions[decisionId];
  
  if (!decision) {
    throw new Error("Decision not found");
  }
  
  // Identify dependent decisions
  const dependents = findDependentDecisions(context, decisionId);
  
  if (dependents.length > 0) {
    // Warn user
    const confirmed = await confirm(`
Changing "${decision.decision_point}" will also reset:
${dependents.map(d => `- ${d.decision_point}`).join('\n')}

Continue?
    `);
    
    if (!confirmed) {
      return;
    }
    
    // Clear dependent decisions
    dependents.forEach(d => {
      delete context.decisions[d.id];
    });
  }
  
  // Clear the decision
  delete context.decisions[decisionId];
  
  // Clear related answers
  clearRelatedAnswers(context, decisionId);
  
  // Re-ask the question
  await reaskQuestion(context, decisionId);
  
  // Save updated context
  await sessionManager.save(context, SaveTrigger.USER_REQUESTED);
}
```

### Rollback to Phase

```typescript
async function rollbackToPhase(
  context: QuestionContext,
  targetPhase: Phase
): Promise<void> {
  const phaseOrder = ['discovery', 'architecture', 'confirmation', 'generation'];
  const currentIndex = phaseOrder.indexOf(context.phase);
  const targetIndex = phaseOrder.indexOf(targetPhase);
  
  if (targetIndex >= currentIndex) {
    throw new Error("Can only rollback to earlier phase");
  }
  
  // Clear data from phases after target
  if (targetIndex < phaseOrder.indexOf('architecture')) {
    delete context.architecture;
  }
  if (targetIndex < phaseOrder.indexOf('confirmation')) {
    context.decisions = {};
  }
  if (targetIndex < phaseOrder.indexOf('generation')) {
    delete context.generation;
  }
  
  // Update phase
  context.phase = targetPhase;
  
  // Save
  await sessionManager.save(context, SaveTrigger.USER_REQUESTED);
  
  // Resume from that phase
  await continueFromPhase(targetPhase, context);
}
```

---

## 🔍 CONTEXT INSPECTION

### Review Mode

```typescript
async function reviewSession(context: QuestionContext): Promise<void> {
  const response = `
# Session Review

## 📊 Overview

**Project**: ${context.project.name}
**Type**: ${context.project.type}
**Phase**: ${context.phase}
**Progress**: ${context.progress.percentage_complete}%

---

## 📝 Your Answers (${Object.keys(context.answers).length} questions)

${formatAnswersForReview(context)}

---

## 🏗️ Architecture

${context.architecture ? formatArchitecture(context.architecture) : 'Not yet chosen'}

---

## ⚙️ Tech Stack

${context.architecture ? formatTechStack(context.architecture.tech_stack) : 'Not yet determined'}

---

**What would you like to do?**
1. Continue with this setup
2. Change a specific answer
3. Change tech stack component
4. Start over
  `;
  
  await sendMessage(response);
}

function formatAnswersForReview(context: QuestionContext): string {
  return Object.entries(context.answers)
    .map(([qId, answer]) => {
      const question = getQuestionById(qId);
      return `**${question.text}**\nYour answer: ${formatAnswer(answer)}`;
    })
    .join('\n\n');
}
```

---

## 🔐 CONTEXT VALIDATION

### Validation Rules

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

function validateContext(context: QuestionContext): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Required fields
  if (!context.session_id) {
    errors.push({ field: 'session_id', message: 'Missing session ID' });
  }
  
  if (!context.phase) {
    errors.push({ field: 'phase', message: 'Missing phase' });
  }
  
  // Phase-specific validation
  if (context.phase === 'architecture' && !context.answers['Q1.1']) {
    errors.push({ field: 'answers', message: 'Missing project type (Q1.1)' });
  }
  
  if (context.phase === 'generation' && !context.architecture) {
    errors.push({ field: 'architecture', message: 'Missing architecture choice' });
  }
  
  // Feature flag consistency
  if (context.feature_flags.needs_payments && !context.answers['Q2.6']) {
    warnings.push({
      field: 'feature_flags',
      message: 'Payments flag set but no payment question answered'
    });
  }
  
  // Architecture validation
  if (context.architecture) {
    if (context.feature_flags.needs_multi_tenancy && 
        !context.architecture.pattern_id.includes('multi-tenant')) {
      warnings.push({
        field: 'architecture',
        message: 'Multi-tenancy needed but pattern may not support it'
      });
    }
  }
  
  // Progress validation
  if (context.progress) {
    if (context.progress.percentage_complete > 100 || 
        context.progress.percentage_complete < 0) {
      errors.push({
        field: 'progress.percentage_complete',
        message: 'Invalid percentage'
      });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
```

---

## 📤 EXPORT & IMPORT

### Export Session

```typescript
async function exportSession(sessionId: string): Promise<string> {
  const context = await sessionManager.load(sessionId);
  
  if (!context) {
    throw new Error("Session not found");
  }
  
  // Create export package
  const exportData = {
    version: '1.0.0',
    exported_at: new Date().toISOString(),
    context: context,
    metadata: {
      agent_version: process.env.AGENT_VERSION,
      export_reason: 'user_requested'
    }
  };
  
  // Serialize
  const json = JSON.stringify(exportData, null, 2);
  
  // Optionally encrypt sensitive data
  if (context.generation?.files_generated) {
    exportData.context.generation.files_generated = '[REDACTED]';
  }
  
  return json;
}
```

### Import Session

```typescript
async function importSession(json: string, userId: string): Promise<string> {
  // Parse
  const importData = JSON.parse(json);
  
  // Validate version compatibility
  if (!isCompatibleVersion(importData.version)) {
    throw new Error("Incompatible session version");
  }
  
  // Validate context
  const validation = validateContext(importData.context);
  if (!validation.valid) {
    throw new Error(`Invalid context: ${validation.errors.map(e => e.message).join(', ')}`);
  }
  
  // Create new session ID
  const newSessionId = generateUUID();
  importData.context.session_id = newSessionId;
  importData.context.imported_at = new Date().toISOString();
  
  // Associate with current user
  importData.context.user_id = userId;
  
  // Save
  await sessionManager.save(importData.context, SaveTrigger.USER_REQUESTED);
  
  return newSessionId;
}
```

---

## 🗑️ CLEANUP & ARCHIVAL

### Session Cleanup

```typescript
async function cleanupOldSessions(): Promise<void> {
  const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
  
  // Archive completed sessions older than 30 days
  const oldSessions = await db.spinUpSessions.findMany({
    where: {
      completed_at: {
        lt: cutoffDate
      }
    }
  });
  
  for (const session of oldSessions) {
    // Archive to cold storage (S3, etc.)
    await archiveSession(session);
    
    // Delete from database
    await db.spinUpSessions.delete({
      where: { id: session.id }
    });
  }
  
  // Delete abandoned sessions older than 7 days
  const abandonedCutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await db.spinUpSessions.deleteMany({
    where: {
      completed_at: null,
      updated_at: {
        lt: abandonedCutoff
      }
    }
  });
}
```

---

## 🔔 SESSION EVENTS

### Event System

```typescript
enum SessionEvent {
  CREATED = 'session:created',
  UPDATED = 'session:updated',
  RESUMED = 'session:resumed',
  COMPLETED = 'session:completed',
  ABANDONED = 'session:abandoned',
  ROLLED_BACK = 'session:rolled_back',
  EXPORTED = 'session:exported',
  IMPORTED = 'session:imported',
  ERROR = 'session:error'
}

class SessionManager extends EventEmitter {
  // Usage in application
  sessionManager.on(SessionEvent.COMPLETED, async (data) => {
    // Send completion email
    await sendCompletionEmail(data.user_id, data.session_id);
    
    // Track analytics
    await analytics.track('project_setup_completed', {
      session_id: data.session_id,
      project_type: data.context.project.type,
      time_spent_minutes: calculateTimeSpent(data.context),
      questions_asked: data.context.progress.questions_asked
    });
  });
  
  sessionManager.on(SessionEvent.ABANDONED, async (data) => {
    // Send reminder email (after 24h)
    await scheduleReminder(data.user_id, data.session_id, 24 * 60 * 60);
  });
}
```

---

## 📊 SESSION ANALYTICS

### Metrics to Track

```typescript
interface SessionMetrics {
  // Timing
  total_duration_seconds: number;
  time_in_discovery_seconds: number;
  time_in_architecture_seconds: number;
  time_in_generation_seconds: number;
  
  // Engagement
  questions_asked: number;
  questions_skipped: number;
  rollbacks_performed: number;
  customizations_made: number;
  
  // Outcomes
  completed: boolean;
  architecture_chosen: string;
  generation_successful: boolean;
  files_generated_count: number;
  
  // Quality
  recommendation_confidence: string;
  user_satisfied: boolean;
}

async function calculateSessionMetrics(
  context: QuestionContext
): Promise<SessionMetrics> {
  const created = new Date(context.created_at);
  const completed = context.metadata?.completed_at 
    ? new Date(context.metadata.completed_at) 
    : new Date();
  
  return {
    total_duration_seconds: (completed.getTime() - created.getTime()) / 1000,
    questions_asked: context.progress.questions_asked,
    completed: context.phase === 'completed',
    architecture_chosen: context.architecture?.pattern_id || 'none',
    // ... etc
  };
}
```

---

## ✅ SESSION MANAGEMENT CHECKLIST

- [ ] Context saved after every interaction
- [ ] Resume capability tested and working
- [ ] Rollback handles dependent decisions correctly
- [ ] Validation catches common errors
- [ ] Export/import preserves full context
- [ ] Cleanup job runs regularly
- [ ] Events tracked for analytics
- [ ] Session encryption for sensitive data
- [ ] Backup storage configured
- [ ] Recovery from storage failures handled

---

## 🎯 BEST PRACTICES

1. **Save Often**: After every user interaction
2. **Validate Always**: Before saving context
3. **Version Context Schema**: Allow migrations between versions
4. **Keep Backups**: Multiple storage layers for critical data
5. **Enable Resume**: Users should never lose progress
6. **Log Everything**: Events, errors, metrics
7. **Clean Up**: Don't accumulate stale sessions
8. **Test Rollback**: Edge cases in dependency chains
9. **Monitor Performance**: Session save/load times
10. **Privacy First**: Don't store sensitive credentials in context

---

**Session management ensures users never lose progress and can seamlessly continue their project setup across days, devices, or interruptions.**






