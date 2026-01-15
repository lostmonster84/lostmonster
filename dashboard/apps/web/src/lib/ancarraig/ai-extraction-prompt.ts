import { AncarraigAIConversation } from '@lostmonster/database';

/**
 * Build prompt for extracting business knowledge from conversations
 */
export function buildExtractionPrompt(messages: AncarraigAIConversation[]): string {
  const conversationText = messages
    .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.message}`)
    .join('\n\n');

  return `Analyze this conversation and extract business knowledge that should be remembered for future conversations.

Conversation:
---
${conversationText}
---

Extract knowledge in these categories:

1. **preference**: User preferences about pricing, channels, strategies
   - Example: "User prefers direct bookings when margin difference is >10%"

2. **rule**: Business rules or policies the user follows
   - Example: "Never discount below 15% even during low season"

3. **insight**: Business insights or observations mentioned
   - Example: "Weekends see 40% higher demand than weekdays"

4. **competitor**: Information about competitors
   - Example: "Competitor 'Highland Lodge' prices $20-30 lower in winter"

Output Format:
Return a JSON array of extracted knowledge. Each item should have:
- category: One of ['preference', 'rule', 'insight', 'competitor']
- key: Brief description (5-10 words)
- value: Full details (1-2 sentences)
- confidence: Score 0-1 indicating extraction confidence

Only extract knowledge that:
- Is clearly stated or strongly implied
- Would be useful to remember for future conversations
- Is specific and actionable

If no meaningful knowledge to extract, return empty array: []

Example output:
[
  {
    "category": "preference",
    "key": "Direct booking preference threshold",
    "value": "User prefers promoting direct bookings when margin difference vs OTA is greater than 10%",
    "confidence": 0.95
  }
]

Return ONLY valid JSON, no other text.`;
}
