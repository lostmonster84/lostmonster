# Project Spin-Up Agent - Architecture Recommendation Engine

> **Purpose**: Logic for matching user requirements to optimal architecture patterns with confidence scoring and alternatives.

---

## 🚨 CRITICAL: OUR STACK PREFERENCES

**ALWAYS RECOMMEND THESE:**
- ✅ **Auth**: Custom (bcrypt + cookies) OR Supabase Auth (magic links)
- ✅ **Database**: Supabase, Neon, or Vercel Postgres
- ✅ **Queries**: Raw SQL or Supabase client - NO ORM REQUIRED
- ✅ **Framework**: Next.js (Latest), TypeScript (Latest), Tailwind (Latest)
- ✅ **Payments**: Stripe
- ✅ **Email**: Resend
- ✅ **Hosting**: Vercel

**NEVER RECOMMEND THESE:**
- ❌ **Clerk** - We build our own auth. It's simpler, cheaper, and we own the code.
- ❌ **NextAuth** - Adds complexity, use Supabase Auth or custom instead
- ❌ **Lucia** - Same as above
- ❌ **Drizzle/Prisma as required** - ORMs are optional, not required. Raw SQL is fine.
- ❌ **Firebase** - Vendor lock-in, prefer Supabase
- ❌ **Auth0** - Expensive, use custom auth instead

**WHY WE BUILD CUSTOM AUTH:**
1. Full control - no vendor lock-in
2. Cheaper - no per-MAU costs
3. Simpler - just bcrypt + cookies
4. Flexible - can customize anything
5. Reliable - no third-party outages affecting auth

**WHEN TO USE WHICH AUTH:**
- **Supabase Auth**: Consumer apps, magic links, social login (Google, GitHub)
- **Custom Auth (bcrypt + cookies)**: Admin dashboards, internal tools, password-based

---

## 🎯 RECOMMENDATION ALGORITHM

### Core Matching Logic

```typescript
interface RecommendationScore {
  pattern: ArchitecturePattern;
  score: number;
  confidence: 'high' | 'medium' | 'low';
  matches: MatchReason[];
  concerns: string[];
  alternatives: ArchitecturePattern[];
}

function recommendArchitecture(
  context: QuestionContext
): RecommendationScore[] {
  const patterns = getAllArchitecturePatterns();
  
  const scored = patterns.map(pattern => ({
    pattern,
    ...calculateScore(pattern, context)
  }));
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Top 3
}
```

---

## 📊 SCORING MATRIX

### Primary Factors (High Weight)

| Factor | Weight | Scoring Logic |
|--------|--------|---------------|
| **Project Type Match** | 100 | Exact match to pattern's primary use case |
| **User Model Match** | 50 | B2C vs B2B vs B2B2C |
| **Multi-Tenancy Need** | 40 | Critical feature requirement |
| **Real-time Requirements** | 35 | Core architectural difference |
| **Complexity Match** | 30 | Pattern complexity vs team capability |

### Secondary Factors (Medium Weight)

| Factor | Weight | Scoring Logic |
|--------|--------|---------------|
| **Payment Model** | 25 | Subscription, one-time, usage-based, marketplace |
| **Timeline Fit** | 20 | Pattern MVP time vs user timeline |
| **Team Size Match** | 20 | Solo-friendly vs requires team |
| **Scale Expectations** | 15 | Pattern scales to user's goals |
| **File Storage Needs** | 15 | Simple vs heavy storage requirements |

### Tertiary Factors (Low Weight)

| Factor | Weight | Scoring Logic |
|--------|--------|---------------|
| **Budget Sensitivity** | 10 | Free tier vs paid services |
| **Search Requirements** | 10 | Basic vs advanced search |
| **Email Complexity** | 5 | Transactional vs marketing |
| **Internationalization** | 5 | Multi-language support |

---

## 🧮 SCORING IMPLEMENTATION

### Function: Calculate Score

```typescript
function calculateScore(
  pattern: ArchitecturePattern,
  context: QuestionContext
): {
  score: number;
  confidence: Confidence;
  matches: MatchReason[];
  concerns: string[];
} {
  let score = 0;
  const matches: MatchReason[] = [];
  const concerns: string[] = [];
  
  // 1. PROJECT TYPE MATCH (Weight: 100)
  if (pattern.projectTypes.includes(context.projectType)) {
    score += 100;
    matches.push({
      factor: 'Project Type',
      points: 100,
      reason: `Perfect match for ${context.projectType}`
    });
  } else if (pattern.projectTypes.some(t => isSimilar(t, context.projectType))) {
    score += 60;
    matches.push({
      factor: 'Project Type',
      points: 60,
      reason: `Similar to ${context.projectType}`
    });
  }
  
  // 2. USER MODEL MATCH (Weight: 50)
  if (pattern.userModel === context.answers["Q1.2"]) {
    score += 50;
    matches.push({
      factor: 'User Model',
      points: 50,
      reason: `Built for ${context.answers["Q1.2"]}`
    });
  }
  
  // 3. MULTI-TENANCY (Weight: 40)
  if (context.needsMultiTenancy) {
    if (pattern.features.includes('multi-tenancy')) {
      score += 40;
      matches.push({
        factor: 'Multi-Tenancy',
        points: 40,
        reason: 'Supports organizations/workspaces'
      });
    } else {
      score -= 30; // Penalty for missing critical feature
      concerns.push('Does not support multi-tenancy (critical requirement)');
    }
  }
  
  // 4. REAL-TIME (Weight: 35)
  if (context.needsRealtime) {
    if (pattern.features.includes('realtime')) {
      score += 35;
      matches.push({
        factor: 'Real-Time',
        points: 35,
        reason: 'Built-in WebSocket/real-time support'
      });
    } else if (pattern.realtimeUpgrade) {
      score += 15;
      matches.push({
        factor: 'Real-Time',
        points: 15,
        reason: 'Can add real-time features with modifications'
      });
    } else {
      concerns.push('Limited real-time support (might need architecture changes)');
    }
  }
  
  // 5. COMPLEXITY VS CAPABILITY (Weight: 30)
  const complexityMatch = assessComplexityFit(
    pattern.complexity,
    context.teamSize,
    context.technicalLevel,
    context.timeline
  );
  score += complexityMatch.score;
  if (complexityMatch.score > 20) {
    matches.push({
      factor: 'Complexity',
      points: complexityMatch.score,
      reason: complexityMatch.reason
    });
  } else {
    concerns.push(complexityMatch.reason);
  }
  
  // 6. PAYMENTS (Weight: 25)
  if (context.needsPayments) {
    const paymentMatch = assessPaymentFit(pattern, context);
    score += paymentMatch.score;
    if (paymentMatch.concern) {
      concerns.push(paymentMatch.concern);
    }
  }
  
  // 7. TIMELINE FIT (Weight: 20)
  const timelineMatch = assessTimelineFit(pattern, context);
  score += timelineMatch.score;
  if (timelineMatch.concern) {
    concerns.push(timelineMatch.concern);
  }
  
  // 8. TEAM SIZE (Weight: 20)
  if (context.teamSize === 'solo' && pattern.soloFriendly) {
    score += 20;
    matches.push({
      factor: 'Solo-Friendly',
      points: 20,
      reason: 'Can be built by one person'
    });
  } else if (context.teamSize !== 'solo' && pattern.requiresTeam) {
    score += 15;
  }
  
  // 9. SCALE EXPECTATIONS (Weight: 15)
  const scaleMatch = assessScaleFit(pattern, context);
  score += scaleMatch.score;
  
  // 10. STORAGE NEEDS (Weight: 15)
  if (context.needsStorage) {
    if (pattern.storage.suitable(context.fileSize, context.volume)) {
      score += 15;
    } else {
      concerns.push(pattern.storage.concern);
    }
  }
  
  // 11. BUDGET (Weight: 10)
  if (context.prefersCheap) {
    if (pattern.monthlyCost.growth < 100) {
      score += 10;
      matches.push({
        factor: 'Budget-Friendly',
        points: 10,
        reason: `~$${pattern.monthlyCost.growth}/mo at scale`
      });
    } else if (pattern.monthlyCost.growth < 200) {
      score += 5;
    } else {
      concerns.push(`Higher cost: ~$${pattern.monthlyCost.growth}/mo`);
    }
  }
  
  // 12. SEARCH (Weight: 10)
  if (context.answers["Q2.8"] === "advanced") {
    if (pattern.features.includes('advanced-search')) {
      score += 10;
    } else {
      concerns.push('Basic search only (might need Algolia/Elasticsearch)');
    }
  }
  
  // CALCULATE CONFIDENCE
  const confidence = calculateConfidence(score, concerns.length, matches.length);
  
  return {
    score: Math.max(0, score), // Floor at 0
    confidence,
    matches,
    concerns
  };
}
```

---

### Helper Functions

```typescript
function assessComplexityFit(
  patternComplexity: number,
  teamSize: string,
  technicalLevel: string,
  timeline: string
): { score: number; reason: string } {
  // Ideal: Pattern complexity matches team capability
  const teamCapability = getTeamCapability(teamSize, technicalLevel);
  
  if (patternComplexity <= teamCapability) {
    if (timeline === 'fast' && patternComplexity <= 2) {
      return {
        score: 30,
        reason: 'Low complexity, fast to build'
      };
    }
    return {
      score: 25,
      reason: 'Complexity matches your team's capability'
    };
  } else if (patternComplexity === teamCapability + 1) {
    return {
      score: 15,
      reason: 'Slightly complex but achievable'
    };
  } else {
    return {
      score: 5,
      reason: 'High complexity for your team size/experience'
    };
  }
}

function assessPaymentFit(
  pattern: ArchitecturePattern,
  context: QuestionContext
): { score: number; concern?: string } {
  const paymentType = context.answers["Q2.6"];
  
  if (pattern.paymentModels.includes(paymentType)) {
    return { score: 25 };
  } else if (pattern.paymentModels.includes('flexible')) {
    return { score: 15 };
  } else {
    return {
      score: 5,
      concern: `Optimized for ${pattern.paymentModels[0]}, you need ${paymentType}`
    };
  }
}

function assessTimelineFit(
  pattern: ArchitecturePattern,
  context: QuestionContext
): { score: number; concern?: string } {
  const timeline = context.timeline;
  const patternWeeks = pattern.timeToMVP;
  
  if (timeline === 'fast' && patternWeeks <= 4) {
    return { score: 20 };
  } else if (timeline === 'moderate' && patternWeeks <= 8) {
    return { score: 15 };
  } else if (timeline === 'comprehensive') {
    return { score: 10 }; // Any timeline works
  } else {
    return {
      score: 0,
      concern: `MVP takes ${patternWeeks} weeks, you wanted ${timeline}`
    };
  }
}

function assessScaleFit(
  pattern: ArchitecturePattern,
  context: QuestionContext
): { score: number } {
  const expectedScale = context.answers["Q1.7"];
  const patternMaxScale = pattern.scalesTo;
  
  const scaleMap = {
    small: 100,
    medium: 10000,
    large: 100000,
    massive: 1000000
  };
  
  if (scaleMap[expectedScale] <= patternMaxScale) {
    return { score: 15 };
  } else if (scaleMap[expectedScale] <= patternMaxScale * 2) {
    return { score: 10 };
  } else {
    return { score: 5 };
  }
}

function calculateConfidence(
  score: number,
  concernCount: number,
  matchCount: number
): 'high' | 'medium' | 'low' {
  if (score >= 200 && concernCount === 0 && matchCount >= 5) {
    return 'high';
  } else if (score >= 150 && concernCount <= 2 && matchCount >= 3) {
    return 'medium';
  } else {
    return 'low';
  }
}
```

---

## 🎯 RECOMMENDATION PRESENTATION

### Clear Winner (High Confidence)

```markdown
Perfect! Based on your answers, I recommend **Next.js + Supabase + Vercel** (Simple SaaS architecture).

**Why this is perfect for you:**
✓ Built for B2C SaaS with individual accounts (100 pts)
✓ Low complexity, solo-friendly (30 pts)
✓ Fast MVP timeline: 2-4 weeks (20 pts)
✓ Budget-friendly: ~$100/mo at 5k users (10 pts)
✓ Handles subscriptions with Stripe (25 pts)

**This architecture powers successful products like:** [examples]

**Confidence**: HIGH (285/300 points, 0 concerns)

Ready to proceed?
```

---

### Multiple Good Options (Medium Confidence)

```markdown
Based on your answers, I have 2 great options for you:

---

## Option 1: Multi-Tenant SaaS (Recommended)

**Score**: 240/300 (HIGH confidence)

**Perfect fits:**
✓ B2B with organizations (100 pts)
✓ Built-in RBAC and team management (40 pts)
✓ Stripe per-org billing (25 pts)

**Tradeoffs:**
⚠️ Higher complexity (takes 4-8 weeks vs 2-4 weeks)
⚠️ Slightly higher costs (~$150/mo vs ~$100/mo)

**Best if:** You need organizations from day one

---

## Option 2: Simple SaaS

**Score**: 210/300 (MEDIUM confidence)

**Perfect fits:**
✓ Faster MVP (2-4 weeks) (30 pts)
✓ Lower complexity (30 pts)
✓ Cheaper to run (10 pts)

**Tradeoffs:**
⚠️ Adding organizations later requires refactoring
⚠️ Limited team features

**Best if:** You want to launch fast, add teams later

---

I recommend **Option 1 (Multi-Tenant)** since you mentioned B2B customers. 

Which feels right for you?
```

---

### No Clear Match (Low Confidence)

```markdown
Based on your answers, you have some unique requirements. Let me recommend a custom architecture:

**Your requirements:**
- Real-time collaboration (critical)
- File uploads (large videos)
- B2B with teams
- Advanced search

**Closest match:** Real-Time Collaborative App (180/300 - MEDIUM confidence)

**Why it's good:**
✓ WebSocket infrastructure for real-time
✓ Scales well for collaboration

**What we'll need to customize:**
⚠️ Add video storage (Mux or Cloudflare Stream)
⚠️ Integrate Algolia for advanced search
⚠️ Add B2B team management (from Multi-Tenant pattern)

**Estimated MVP time:** 8-10 weeks (combines 2-3 patterns)

**Alternatively, we could:**
1. Start with Multi-Tenant SaaS, add real-time later (4 weeks initial + 2 weeks real-time)
2. Build custom architecture from scratch (10-12 weeks)

What's your priority: Launch fast or all features from start?
```

---

## 🔄 ALTERNATIVE SUGGESTIONS

### When to Suggest Alternatives

```typescript
function shouldSuggestAlternatives(
  topScore: number,
  secondScore: number
): boolean {
  // If scores are close (within 20 points), show both
  return (topScore - secondScore) < 20;
}

function getAlternatives(
  primary: RecommendationScore,
  context: QuestionContext
): ArchitecturePattern[] {
  // Same category but different tradeoffs
  return architecturePatterns.filter(p => 
    p.category === primary.pattern.category &&
    p.id !== primary.pattern.id &&
    isViable(p, context)
  ).slice(0, 2);
}
```

### Presenting Alternatives

```markdown
**Primary Recommendation**: [Pattern A]

**Good alternative**: [Pattern B]
- Faster to build (saves 2 weeks)
- Lower costs ($50/mo less)
- Trade-off: Simpler feature set

**Good alternative**: [Pattern C]
- More features out of the box
- Better for scale (handles 100k+ users)
- Trade-off: Takes 2 weeks longer, $100/mo more
```

---

## ⚠️ RED FLAGS & WARNINGS

### Detecting Mismatches

```typescript
function detectRedFlags(
  pattern: ArchitecturePattern,
  context: QuestionContext
): RedFlag[] {
  const flags: RedFlag[] = [];
  
  // Critical feature missing
  if (context.needsMultiTenancy && !pattern.features.includes('multi-tenancy')) {
    flags.push({
      severity: 'critical',
      message: 'This pattern does not support multi-tenancy (critical for your use case)'
    });
  }
  
  // Timeline mismatch
  if (context.timeline === 'fast' && pattern.timeToMVP > 6) {
    flags.push({
      severity: 'warning',
      message: `This pattern takes ${pattern.timeToMVP} weeks, you wanted fast (2-4 weeks)`
    });
  }
  
  // Cost concern
  if (context.prefersCheap && pattern.monthlyCost.growth > 200) {
    flags.push({
      severity: 'warning',
      message: `This pattern costs ~$${pattern.monthlyCost.growth}/mo, might exceed budget`
    });
  }
  
  // Complexity mismatch
  if (context.teamSize === 'solo' && pattern.complexity >= 4 && !pattern.soloFriendly) {
    flags.push({
      severity: 'warning',
      message: 'High complexity for solo developer, consider simpler alternative'
    });
  }
  
  return flags;
}
```

### Presenting Warnings

```markdown
⚠️ **Important Considerations:**

1. **Timeline**: This architecture takes 6-8 weeks to build. You mentioned wanting to launch in 4 weeks. Consider starting with Simple SaaS and upgrading later.

2. **Complexity**: As a solo developer, this might be challenging. The multi-tenancy adds significant complexity. Recommend having 2-3 people or allowing more time.

3. **Cost**: At scale (~10k users), this costs ~$250/mo. Make sure you have pricing that supports this.

Still want to proceed? I can simplify some parts to make it more manageable.
```

---

## ✅ VALIDATION CHECKLIST

Before presenting recommendation:

- [ ] Score >= 150 (viable)
- [ ] No critical red flags
- [ ] All critical user requirements met
- [ ] Timeline realistic
- [ ] Cost acceptable
- [ ] Complexity appropriate for team
- [ ] Scaling supports user's goals

If checklist fails, suggest custom architecture or ask clarifying questions.

---

## 📊 EXAMPLE SCORING SCENARIOS

### Scenario 1: Clear Winner

**User Context:**
- B2C SaaS
- Individual accounts
- Subscriptions
- Solo founder
- Fast timeline

**Scoring:**
- Simple SaaS: 285 points (HIGH)
- Multi-Tenant SaaS: 135 points (LOW - no need for orgs)
- E-commerce: 50 points (VERY LOW - wrong type)

**Recommendation:** Simple SaaS (clear winner)

---

### Scenario 2: Close Call

**User Context:**
- B2B SaaS
- Teams, but small initially
- Moderate timeline
- 2-person team

**Scoring:**
- Multi-Tenant SaaS: 220 points (HIGH)
- Simple SaaS: 205 points (MEDIUM) - could add teams later

**Recommendation:** Present both with tradeoffs

---

### Scenario 3: No Great Match

**User Context:**
- Real-time + E-commerce + Marketplace
- Very unique combination

**Scoring:**
- All patterns: 120-160 points (MEDIUM-LOW)

**Recommendation:** Custom architecture combining elements

---

**This recommendation engine ensures users get the optimal architecture for their specific needs while understanding tradeoffs.**






