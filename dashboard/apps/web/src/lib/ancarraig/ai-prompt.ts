import { AIContext } from '@lostmonster/database';

/**
 * Build a comprehensive system prompt for the AI assistant
 * Includes business context, conversation history, and learned knowledge
 */
export function buildSystemPrompt(context: AIContext): string {
  const sections: string[] = [];

  // Core identity
  sections.push(`You are an AI pricing assistant for Ancarraig, a vacation rental business.

Your role:
- Help with pricing decisions, competitor analysis, and revenue optimization
- Provide clear, actionable advice based on business data
- Learn from every conversation to give increasingly personalized recommendations
- Be conversational, professional, and concise`);

  // Business data (lodges, channels, costs)
  if (context.lodgeData && context.lodgeData.length > 0) {
    sections.push(`\n## Current Properties

${context.lodgeData.map(lodge =>
  `**${lodge.name}** (${lodge.code})
- Capacity: ${lodge.capacity_guests} guests, ${lodge.capacity_bedrooms} bedrooms
- Location: ${lodge.location || 'Not specified'}
- Status: ${lodge.is_active ? 'Active' : 'Inactive'}`
).join('\n\n')}`);
  }

  // Channel data (commissions)
  if (context.channelData && context.channelData.length > 0) {
    sections.push(`\n## Booking Channels

${context.channelData.map(channel =>
  `**${channel.channel_name}**
- Base commission: ${channel.base_commission_percent}%
- Charges cleaning commission: ${channel.charges_cleaning_commission ? 'Yes' : 'No'}
${channel.supports_genius ? `- Genius discount: ${channel.genius_discount_percent}%` : ''}
${channel.non_refundable_discount_percent ? `- Non-refundable discount: ${channel.non_refundable_discount_percent}%` : ''}`
).join('\n\n')}`);
  }

  // Cost data
  if (context.costData && context.costData.length > 0) {
    const costsByLodge = context.costData.reduce((acc, cost) => {
      if (!acc[cost.lodge_id]) acc[cost.lodge_id] = [];
      acc[cost.lodge_id].push(cost);
      return acc;
    }, {} as Record<string, typeof context.costData>);

    sections.push(`\n## Operating Costs

${Object.entries(costsByLodge).map(([lodgeId, costs]) => {
  const lodge = context.lodgeData?.find(l => l.id === lodgeId);
  return `**${lodge?.name || 'Unknown Lodge'}**
${costs.map(cost =>
  `- ${cost.name}: $${cost.amount} (${cost.period}, ${cost.category})`
).join('\n')}`;
}).join('\n\n')}`);
  }

  // Learned knowledge base
  if (context.knowledgeBase && context.knowledgeBase.length > 0) {
    const knowledgeByCategory = context.knowledgeBase.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof context.knowledgeBase>);

    sections.push(`\n## Learned Business Knowledge

This is information you've learned from past conversations. Reference it when relevant.

${Object.entries(knowledgeByCategory).map(([category, items]) =>
  `**${category.charAt(0).toUpperCase() + category.slice(1)}s:**
${items.map(item =>
  `- ${item.key}: ${item.value} (confidence: ${Math.round(item.confidence * 100)}%)`
).join('\n')}`
).join('\n\n')}`);
  }

  // Conversation history (recent context)
  if (context.conversationHistory && context.conversationHistory.length > 0) {
    const recentMessages = context.conversationHistory.slice(-10); // Last 10 messages

    sections.push(`\n## Recent Conversation Context

${recentMessages.map(msg =>
  `${msg.role === 'user' ? 'User' : 'You'}: ${msg.message.substring(0, 200)}${msg.message.length > 200 ? '...' : ''}`
).join('\n\n')}`);
  }

  // Instructions
  sections.push(`\n## Instructions

- Base answers on the business data provided above
- Reference learned knowledge when applicable
- If you need information not provided, ask the user
- For pricing questions, consider costs, channels, and seasonality
- For competitor analysis, provide clear comparisons and recommendations
- Always explain your reasoning
- Keep responses concise but thorough
- Use markdown formatting for readability`);

  return sections.join('\n');
}

/**
 * Simplified system prompt when no context is available
 */
export function buildMinimalSystemPrompt(): string {
  return `You are an AI pricing assistant for Ancarraig, a vacation rental business.

Your role:
- Help with pricing decisions and revenue optimization
- Provide clear, actionable advice
- Be conversational, professional, and concise

Since no business data is loaded yet, ask questions to understand the user's needs and provide general pricing advice.`;
}
