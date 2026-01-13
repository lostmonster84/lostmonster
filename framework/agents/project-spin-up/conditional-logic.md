# Project Spin-Up Agent - Conditional Logic

> **Purpose**: Implementation guide for question flow logic, skip conditions, and dynamic branching.

---

## 🔧 IMPLEMENTATION PSEUDOCODE

### Core Question Engine

```typescript
interface QuestionContext {
  answers: Record<string, any>;
  projectType: ProjectType;
  userProfile: UserProfile;
  currentPhase: Phase;
  askedQuestions: string[];
  skippedQuestions: string[];
}

interface Question {
  id: string;
  tier: 1 | 2 | 3 | 4;
  text: string;
  options: Option[];
  defaultValue?: any;
  skipIf?: (context: QuestionContext) => boolean;
  askIf?: (context: QuestionContext) => boolean;
  followUp?: (answer: any, context: QuestionContext) => Question[];
}

function shouldAskQuestion(question: Question, context: QuestionContext): boolean {
  // Already asked
  if (context.askedQuestions.includes(question.id)) {
    return false;
  }
  
  // Skip condition met
  if (question.skipIf && question.skipIf(context)) {
    context.skippedQuestions.push(question.id);
    return false;
  }
  
  // Ask condition not met
  if (question.askIf && !question.askIf(context)) {
    return false;
  }
  
  return true;
}

function getNextQuestion(context: QuestionContext): Question | null {
  const questionBank = getAllQuestions();
  
  // Filter by tier and conditions
  const eligibleQuestions = questionBank.filter(q => 
    shouldAskQuestion(q, context)
  );
  
  if (eligibleQuestions.length === 0) {
    return null; // Done asking questions
  }
  
  // Return highest priority eligible question
  return eligibleQuestions.sort((a, b) => a.tier - b.tier)[0];
}
```

---

## 🎯 CONDITIONAL LOGIC RULES

### Rule 1: Project Type Branching

```typescript
const Q1_1_PROJECT_TYPE: Question = {
  id: "Q1.1",
  tier: 1,
  text: "What type of project are you building?",
  options: [
    { value: "saas", label: "SaaS Application" },
    { value: "ecommerce", label: "E-commerce Store" },
    { value: "content", label: "Content Platform" },
    { value: "marketplace", label: "Marketplace" },
    { value: "internal", label: "Internal Tool" },
    { value: "api", label: "API Platform" },
    { value: "portfolio", label: "Portfolio/Landing Page" },
  ],
  followUp: (answer, context) => {
    context.projectType = answer;
    
    switch (answer) {
      case "saas":
        return [Q1_2_USER_MODEL, Q1_4_MVP_TIMELINE, Q1_5_TEAM_SIZE];
      case "ecommerce":
        return [Q2_20_STORE_TYPE, Q1_5_TEAM_SIZE];
      case "content":
        return [Q2_30_CONTENT_TYPE, Q1_5_TEAM_SIZE];
      case "marketplace":
        return [Q2_40_MARKETPLACE_MODEL, Q1_5_TEAM_SIZE];
      case "internal":
        return [Q1_5_TEAM_SIZE, Q2_1_AUTH];
      case "api":
        return [Q2_60_API_TYPE, Q2_61_API_AUTH];
      case "portfolio":
        return [Q3_3_FRONTEND]; // Skip most questions
      default:
        return [];
    }
  }
};
```

---

### Rule 2: Skip Auth Questions for Static Sites

```typescript
const AUTH_QUESTIONS = [Q2_1_AUTH, Q2_2_ENTERPRISE_AUTH, Q2_3_USER_ROLES];

AUTH_QUESTIONS.forEach(q => {
  q.skipIf = (context) => {
    return context.projectType === "portfolio"; // No auth needed
  };
});
```

---

### Rule 3: Multi-Tenancy Conditional Chain

```typescript
const Q1_3_TEAM_STRUCTURE: Question = {
  id: "Q1.3",
  tier: 1,
  text: "Do users work in teams or organizations?",
  askIf: (context) => {
    // Only ask if B2B or B2B2C
    return ["b2b", "b2b2c"].includes(context.answers["Q1.2"]);
  },
  followUp: (answer, context) => {
    if (answer === "yes" || answer === "both") {
      // Multi-tenancy confirmed, ask billing question
      return [Q1_3b_ORG_BILLING];
    }
    return [];
  }
};

const Q1_3b_ORG_BILLING: Question = {
  id: "Q1.3b",
  tier: 1,
  text: "Who pays for the service?",
  // This question only exists as follow-up from Q1.3
};
```

---

### Rule 4: Payment Cascade

```typescript
const Q2_6_PAYMENTS: Question = {
  id: "Q2.6",
  tier: 2,
  text: "Will you charge users money?",
  followUp: (answer, context) => {
    if (["subscription", "onetime", "usage", "mix"].includes(answer)) {
      // User needs payments
      context.needsPayments = true;
      return [Q2_6b_PAYMENT_DETAILS];
    } else {
      // No payments, skip all payment-related questions
      context.needsPayments = false;
      return [];
    }
  }
};

// All payment questions check this flag
const Q2_6b_PAYMENT_DETAILS: Question = {
  id: "Q2.6b",
  tier: 2,
  text: "Tell me about your pricing...",
  skipIf: (context) => !context.needsPayments
};
```

---

### Rule 5: File Upload Storage Decision

```typescript
const Q2_5_FILE_UPLOADS: Question = {
  id: "Q2.5",
  tier: 2,
  text: "Will users upload files?",
  followUp: (answer, context) => {
    if (answer === "no") {
      context.needsStorage = false;
      return [];
    }
    
    context.needsStorage = true;
    context.fileSize = answer; // "small", "medium", "large"
    
    return [Q2_5b_STORAGE_VOLUME];
  }
};

const Q2_5b_STORAGE_VOLUME: Question = {
  id: "Q2.5b",
  tier: 2,
  text: "How many files per user?",
  skipIf: (context) => !context.needsStorage
};

// Later in architecture recommendations
function getStorageRecommendation(context: QuestionContext) {
  if (!context.needsStorage) {
    return null;
  }
  
  if (context.fileSize === "large") {
    return {
      provider: "Cloudflare R2",
      cdn: "Cloudflare CDN",
      reasoning: "Large files need cost-effective storage and fast delivery"
    };
  } else if (context.fileSize === "medium") {
    return {
      provider: "Supabase Storage",
      cdn: "Built-in",
      reasoning: "Medium files work great with Supabase's integrated storage"
    };
  } else {
    return {
      provider: "Database",
      cdn: "Not needed",
      reasoning: "Small files (like avatars) can live in database"
    };
  }
}
```

---

### Rule 6: Timeline-Based Complexity Reduction

```typescript
const Q1_4_MVP_TIMELINE: Question = {
  id: "Q1.4",
  tier: 1,
  text: "What's your timeline to launch an MVP?",
  followUp: (answer, context) => {
    context.timeline = answer;
    
    if (answer === "fast") {
      // Fast timeline: Skip nice-to-haves, recommend simpler stack
      context.skipTier4 = true;
      context.preferSimpleStack = true;
    }
    
    return [];
  }
};

// Tier 4 questions respect this
const TIER_4_QUESTIONS = [/* ... */];
TIER_4_QUESTIONS.forEach(q => {
  q.skipIf = (context) => context.skipTier4 === true;
});
```

---

### Rule 7: Database Bundling (Supabase)

```typescript
const Q3_2_DATABASE_HOSTING: Question = {
  id: "Q3.2",
  tier: 3,
  text: "Where should I host your database?",
  followUp: (answer, context) => {
    if (answer === "supabase") {
      // Supabase includes auth, storage, realtime
      context.hasSupabase = true;
      
      // Adjust follow-up questions
      // - If Q2.1 (auth) not asked yet, suggest Supabase Auth
      // - If Q2.5 (storage) not asked yet, mention Supabase Storage
      // - If Q2.4 (realtime) = yes, use Supabase Realtime
      
      return [];
    }
    
    return [];
  }
};
```

---

### Rule 8: Tech Stack Smart Defaults

```typescript
function getSmartDefaults(context: QuestionContext): Partial<TechStack> {
  const defaults: Partial<TechStack> = {};
  
  // Based on project type
  if (context.projectType === "saas") {
    defaults.frontend = "nextjs";
    defaults.database = "postgres";
    defaults.hosting = "vercel";
  } else if (context.projectType === "api") {
    defaults.backend = "fastapi"; // or express
    defaults.database = "postgres";
    defaults.hosting = "railway";
  } else if (context.projectType === "portfolio") {
    defaults.frontend = "nextjs-ssg";
    defaults.database = null;
    defaults.hosting = "vercel";
  }
  
  // Based on team size
  if (context.answers["Q1.5"] === "solo") {
    defaults.cicd = "simple"; // Don't overwhelm solo dev
  } else {
    defaults.cicd = "full"; // Team benefits from automation
  }
  
  // Based on budget signals
  if (context.prefersCheap) {
    defaults.databaseHost = "supabase-free";
    defaults.storage = "supabase";
    defaults.auth = "supabase-auth";
  }
  
  return defaults;
}
```

---

## 🚫 SKIP CONDITIONS REFERENCE

### Skip Authentication Questions

```typescript
skipAuth = (context) => {
  return context.projectType === "portfolio" || 
         context.projectType === "static";
};
```

### Skip Database Questions

```typescript
skipDatabase = (context) => {
  return context.projectType === "portfolio" || 
         (context.projectType === "content" && context.answers["Q2.32"] === "markdown");
};
```

### Skip Payment Questions

```typescript
skipPayments = (context) => {
  return context.answers["Q2.6"] === "no" || 
         context.answers["Q2.6"] === "maybe_later" ||
         context.projectType === "internal";
};
```

### Skip Real-time Infrastructure

```typescript
skipRealtime = (context) => {
  return context.answers["Q2.4"] === "no" || 
         context.answers["Q2.4"] === "nice_to_have";
};
```

### Skip File Storage

```typescript
skipStorage = (context) => {
  return context.answers["Q2.5"] === "no" ||
         !context.needsStorage;
};
```

### Skip SEO Questions

```typescript
skipSEO = (context) => {
  return context.projectType === "internal" || 
         context.answers["Q2.1"] === "behind_login";
};
```

### Skip Team/Collaboration Features

```typescript
skipCollaboration = (context) => {
  return context.answers["Q1.5"] === "solo" || 
         context.projectType === "portfolio";
};
```

### Skip Enterprise Features

```typescript
skipEnterprise = (context) => {
  return context.answers["Q1.2"] !== "b2b" ||
         context.answers["Q1.7"] === "small" || // Scale expectation
         context.timeline === "fast";
};
```

---

## 🔄 FOLLOW-UP LOGIC PATTERNS

### Pattern A: Binary Follow-Up

```typescript
const PARENT_QUESTION: Question = {
  id: "parent",
  text: "Do you need feature X?",
  followUp: (answer) => {
    return answer === "yes" ? [CHILD_QUESTION] : [];
  }
};
```

### Pattern B: Multi-Path Follow-Up

```typescript
const PARENT_QUESTION: Question = {
  id: "parent",
  text: "What type of X?",
  followUp: (answer) => {
    const followUps: Question[] = [];
    
    if (answer === "type_a") {
      followUps.push(QUESTION_A1, QUESTION_A2);
    } else if (answer === "type_b") {
      followUps.push(QUESTION_B1, QUESTION_B2, QUESTION_B3);
    } else {
      followUps.push(QUESTION_GENERAL);
    }
    
    return followUps;
  }
};
```

### Pattern C: Conditional Multiple Follow-Ups

```typescript
const PARENT_QUESTION: Question = {
  id: "parent",
  text: "Select all that apply...",
  followUp: (answers, context) => {
    const followUps: Question[] = [];
    
    if (answers.includes("option_a")) {
      followUps.push(QUESTION_A);
    }
    
    if (answers.includes("option_b")) {
      followUps.push(QUESTION_B);
    }
    
    // Both selected? Ask combined question
    if (answers.includes("option_a") && answers.includes("option_b")) {
      followUps.push(QUESTION_AB_COMBINED);
    }
    
    return followUps;
  }
};
```

---

## 📊 CONTEXT MANAGEMENT

### Context State Schema

```typescript
interface QuestionContext {
  // User Profile
  userProfile: {
    technicalLevel: "beginner" | "intermediate" | "expert";
    preferredCommunicationStyle: "technical" | "simple";
  };
  
  // Project Classification
  projectType: ProjectType;
  userModel: "b2c" | "b2b" | "b2b2c" | "internal";
  timeline: "fast" | "moderate" | "comprehensive";
  teamSize: "solo" | "small" | "medium" | "large";
  expectedScale: "small" | "medium" | "large" | "massive";
  
  // Feature Flags
  needsAuth: boolean;
  needsMultiTenancy: boolean;
  needsPayments: boolean;
  needsStorage: boolean;
  needsRealtime: boolean;
  needsSearch: boolean;
  needsEmail: boolean;
  
  // Preferences
  preferSimpleStack: boolean;
  prefersCheap: boolean;
  prefersOpenSource: boolean;
  
  // State
  currentPhase: "discovery" | "architecture" | "confirmation";
  askedQuestions: string[];
  skippedQuestions: string[];
  answers: Record<string, any>;
  
  // Inferred Data
  hasSupabase: boolean;
  databaseType: "postgres" | "mysql" | "mongodb" | null;
  authProvider: "clerk" | "supabase" | "nextauth" | null;
}
```

### Context Updates

```typescript
function updateContext(
  context: QuestionContext,
  questionId: string,
  answer: any
): void {
  // Store answer
  context.answers[questionId] = answer;
  context.askedQuestions.push(questionId);
  
  // Update inferred flags
  if (questionId === "Q2.6") {
    context.needsPayments = ["subscription", "onetime", "usage", "mix"].includes(answer);
  }
  
  if (questionId === "Q2.5") {
    context.needsStorage = answer !== "no";
  }
  
  if (questionId === "Q1.3") {
    context.needsMultiTenancy = ["yes", "both"].includes(answer);
  }
  
  // Detect budget sensitivity
  if (answer.includes("free") || answer.includes("cheap") || answer.includes("cost")) {
    context.prefersCheap = true;
  }
  
  // Detect technical level from language used
  // (This would analyze user's freeform responses)
}
```

---

## 🧪 TEST SCENARIOS

### Test Case 1: Minimum Questions Path

```typescript
const testCase1 = {
  name: "Portfolio Site - Minimum Questions",
  inputs: {
    "Q1.1": "portfolio",
    "Q3.3": "nextjs",
    "Q3.5": "tailwind",
    "Q4.9": "critical",
  },
  expectedQuestions: 8,
  expectedSkips: [
    "Q2.1", "Q2.3", "Q2.6", // All auth, roles, payments
    "Q3.1", "Q3.2", // Database questions
  ],
  expectedRecommendation: {
    stack: "Next.js SSG + Tailwind + Vercel",
    complexity: "low",
  }
};
```

### Test Case 2: Maximum Questions Path

```typescript
const testCase2 = {
  name: "Complex B2B Marketplace - Maximum Questions",
  inputs: {
    "Q1.1": "marketplace",
    "Q1.2": "b2b",
    "Q1.3": "yes",
    "Q2.40": "service",
    "Q2.41": "commission",
    // ... many more answers
  },
  expectedQuestions: 42,
  expectedSkips: [],
  expectedRecommendation: {
    stack: "Next.js + Postgres + Clerk + Stripe Connect + Vercel",
    complexity: "high",
  }
};
```

### Test Case 3: Mid-Complexity Path

```typescript
const testCase3 = {
  name: "Simple SaaS B2C - Mid Complexity",
  inputs: {
    "Q1.1": "saas",
    "Q1.2": "b2c",
    "Q1.4": "moderate",
    "Q2.6": "subscription",
    // ...
  },
  expectedQuestions: 24,
  expectedSkips: [
    "Q1.3", // No multi-tenancy (B2C)
    "Q2.2", // No enterprise auth (B2C)
  ],
  expectedRecommendation: {
    stack: "Next.js + Supabase + Stripe + Vercel",
    complexity: "medium",
  }
};
```

---

## 🎯 OPTIMIZATION STRATEGIES

### Strategy 1: Question Clustering

```typescript
function clusterRelatedQuestions(context: QuestionContext): Question[][] {
  return [
    // Cluster 1: Auth
    [Q2_1_AUTH, Q2_2_ENTERPRISE_AUTH, Q2_3_ROLES],
    
    // Cluster 2: Payments
    [Q2_6_PAYMENTS, Q2_6b_PAYMENT_DETAILS],
    
    // Cluster 3: Storage
    [Q2_5_FILE_UPLOADS, Q2_5b_STORAGE_VOLUME, Q4_1_IMAGE_OPT],
    
    // Cluster 4: Tech Stack
    [Q3_1_DATABASE, Q3_2_DB_HOST, Q3_3_FRONTEND, Q3_5_STYLING],
  ];
}
```

### Strategy 2: Progressive Disclosure

```typescript
function askProgressively(cluster: Question[], context: QuestionContext): void {
  // Start with high-level question
  const mainQuestion = cluster[0];
  const answer = askQuestion(mainQuestion, context);
  
  // Only ask details if needed
  if (requiresDetails(answer)) {
    cluster.slice(1).forEach(detailQ => askQuestion(detailQ, context));
  }
}
```

### Strategy 3: Smart Defaults with Confirmation

```typescript
function offerSmartDefault(question: Question, context: QuestionContext): any {
  const suggestedAnswer = inferBestAnswer(question, context);
  
  const confirmed = confirmWithUser(
    `Based on your answers, I recommend ${suggestedAnswer}. Sound good?`
  );
  
  if (confirmed) {
    return suggestedAnswer; // Skip detailed questions
  } else {
    return askQuestion(question, context); // Let user choose
  }
}
```

---

## ✅ LOGIC VALIDATION CHECKLIST

- [ ] No unreachable questions (every question has a path to it)
- [ ] No infinite loops (follow-ups eventually terminate)
- [ ] No contradictory skip conditions
- [ ] All follow-up questions exist in question bank
- [ ] Context flags updated correctly
- [ ] Smart defaults align with project type
- [ ] Skip logic tested with edge cases
- [ ] Question count within target range (25-35)

---

**Implementation Note**: This logic should be implemented with careful testing to ensure smooth user experience and complete requirements gathering.






