# Ancarraig AI Pricing Assistant

> **Learning AI that gets smarter with every conversation**

## Overview

The Ancarraig AI Pricing Assistant is an intelligent conversational interface that helps with pricing decisions, competitor analysis, and revenue optimization. It stores every conversation, extracts business knowledge automatically, and uses context from past interactions to provide increasingly personalized advice.

## Features

### Core Capabilities

1. **Conversational AI Interface**
   - Natural language chat powered by Claude Sonnet 4.5
   - Streaming responses for real-time interaction
   - Markdown support for formatted responses
   - Message history persistence

2. **Context-Aware Responses**
   - Automatically loads business data (lodges, channels, costs)
   - References past conversations for continuity
   - Uses learned knowledge to personalize advice
   - Adapts to user preferences over time

3. **Knowledge Extraction**
   - Automatically extracts insights from conversations
   - Categorizes knowledge: preferences, rules, insights, competitors
   - Assigns confidence scores to extracted knowledge
   - Viewable knowledge base with search and filtering

4. **File Analysis**
   - Upload CSV files for competitor analysis
   - Automatic parsing and formatting
   - AI analyzes and provides insights
   - Supports pricing comparisons and strategy recommendations

5. **Memory & Learning**
   - Stores all conversations in database
   - Builds knowledge base from interactions
   - References learned knowledge in future conversations
   - Gets smarter over time

## Architecture

### Database Schema

**Tables:**
- `ancarraig_ai_conversations`: Stores all chat messages
- `ancarraig_ai_knowledge`: Stores extracted business knowledge

**Key Features:**
- UUID primary keys
- User-scoped data (user_id foreign key)
- JSONB metadata for extensibility
- Indexed for fast queries
- Timestamps for audit trail

### API Routes

**Chat API:** `/api/ancarraig/ai/chat`
- POST: Send message, get streaming AI response
- Saves conversations to database
- Triggers knowledge extraction asynchronously

**Knowledge Extraction:** `/api/ancarraig/ai/extract-knowledge`
- POST: Extract knowledge from conversation
- Uses Claude to analyze and structure knowledge
- Saves to knowledge base with confidence scores

**File Upload:** `/api/ancarraig/ai/upload`
- POST: Upload and parse CSV files
- Returns formatted text for AI analysis
- Max file size: 5MB

**Conversation Management:** `/api/ancarraig/ai/conversations`
- DELETE: Clear all conversation history

### Components

**Pages:**
- `/ancarraig/ai` - Main chat interface
- `/ancarraig/ai/knowledge` - Knowledge base viewer

**Components:**
- `ChatInterface` - Main chat UI with message list and input
- `Message` - Individual message bubble with role-based styling
- `ChatInput` - Text input with file upload support
- `KnowledgeViewer` - Searchable knowledge base display

**Utilities:**
- `ai-prompt.ts` - System prompt generation with context
- `ai-storage.ts` - Database operations for conversations
- `ai-context.ts` - Load business context for AI
- `ai-extraction-prompt.ts` - Knowledge extraction prompts

## Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm package manager
- Neon PostgreSQL database
- Anthropic API key

### Installation

1. **Run Database Migration**
   ```bash
   cd dashboard
   DATABASE_URL="your-neon-url" node scripts/run-ai-migration.js
   ```

2. **Install Dependencies**
   ```bash
   cd apps/web
   pnpm install
   ```

3. **Configure Environment**

   Add to `dashboard/apps/web/.env.local`:
   ```env
   ANTHROPIC_API_KEY=sk-ant-xxx...
   ```

   Get your API key from: https://console.anthropic.com/

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

5. **Access AI Assistant**
   - Navigate to `/ancarraig/ai` in your browser
   - Start chatting!

## Usage Guide

### Basic Chat

1. Type your question in the input field
2. Press Enter to send (Shift+Enter for new line)
3. AI responds with streaming text
4. All messages are automatically saved

### File Upload

1. Click the paperclip icon
2. Select a CSV file (max 5MB)
3. File is automatically parsed and included in your message
4. Ask AI to analyze the data

### Knowledge Base

1. Navigate to "Knowledge" page
2. View all extracted knowledge
3. Filter by category (preference, rule, insight, competitor)
4. Search by keyword
5. See confidence scores and sources

### Best Practices

**For Pricing Questions:**
- Be specific about dates and properties
- Mention channels if relevant (Airbnb, Booking.com, direct)
- Ask about tradeoffs and alternatives

**For Competitor Analysis:**
- Upload CSV with competitor names and prices
- Ask comparative questions
- Request strategic recommendations

**For Strategy Advice:**
- Share context about your goals
- Mention constraints (minimum margins, seasonal patterns)
- Ask "what if" questions

## Knowledge Extraction

The AI automatically extracts knowledge from conversations in four categories:

**Preferences:** User preferences about pricing, channels, strategies
- Example: "User prefers direct bookings when margin difference is >10%"

**Rules:** Business rules or policies followed
- Example: "Never discount below 15% even during low season"

**Insights:** Business observations or patterns
- Example: "Weekends see 40% higher demand than weekdays"

**Competitors:** Information about competition
- Example: "Highland Lodge prices $20-30 lower in winter"

Each extraction includes:
- Category
- Key (brief description)
- Value (full details)
- Confidence score (0-1)
- Source conversation reference

## Technical Details

### AI Model

**Model:** Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)
**Max Tokens:** 4096
**Streaming:** Yes (Server-Sent Events)

### Context Window

The AI receives:
- System prompt with business data
- Last 20 conversation messages
- All extracted knowledge
- Current message + optional file data

### Performance

- Database queries optimized with indexes
- Streaming responses for perceived speed
- Knowledge extraction runs asynchronously
- File parsing limited to 5MB

### Security

- User authentication required
- User-scoped data (can only see own conversations)
- API key stored server-side only
- No sensitive data in client

## Troubleshooting

### AI Not Responding

**Check:**
1. ANTHROPIC_API_KEY set in .env.local
2. API key is valid (test at console.anthropic.com)
3. Check browser console for errors
4. Verify database connection

### File Upload Fails

**Common Issues:**
- File size over 5MB
- Invalid file format (only CSV supported)
- Missing or malformed data
- Network timeout

**Solution:** Convert to CSV, reduce file size, check formatting

### Knowledge Not Extracting

**Possible Causes:**
- Conversation too short (needs context)
- No clear preferences/rules stated
- Extraction API error (check logs)

**Solution:** Have longer, more specific conversations

### Performance Issues

**Optimize:**
- Clear old conversation history
- Reduce context window size
- Check database indexes
- Monitor API rate limits

## API Key Management

### Getting an API Key

1. Sign up at https://console.anthropic.com/
2. Go to API Keys section
3. Create new key
4. Copy key to .env.local

### Cost Management

**Approximate Costs:**
- Average conversation: $0.02-0.05
- Knowledge extraction: $0.01-0.02
- File analysis: $0.03-0.10

**Tips:**
- Monitor usage in Anthropic console
- Set monthly budget alerts
- Knowledge extraction is async and optional

## Future Enhancements

**Planned:**
- [ ] Excel file support (.xlsx, .xls)
- [ ] Semantic search for conversation history
- [ ] Knowledge editing and verification UI
- [ ] Export conversations to PDF/CSV
- [ ] Multi-user knowledge sharing
- [ ] Integration with booking platforms
- [ ] Automated competitor tracking
- [ ] Price optimization recommendations

## Support

**Documentation:** See this file
**Issues:** Check browser console and server logs
**Database:** Verify with SQL queries in Neon dashboard
**API:** Test with curl or Postman

## File Structure

```
dashboard/
├── scripts/
│   ├── ancarraig-ai-migration.sql       # Database schema
│   └── run-ai-migration.js              # Migration runner
│
├── apps/web/src/
│   ├── app/
│   │   ├── ancarraig/ai/
│   │   │   ├── page.tsx                 # Chat interface page
│   │   │   └── knowledge/page.tsx       # Knowledge viewer page
│   │   │
│   │   └── api/ancarraig/ai/
│   │       ├── chat/route.ts            # Chat API with streaming
│   │       ├── upload/route.ts          # File upload API
│   │       ├── extract-knowledge/route.ts   # Knowledge extraction
│   │       └── conversations/route.ts   # Conversation management
│   │
│   ├── components/ancarraig/ai/
│   │   ├── ChatInterface.tsx            # Main chat component
│   │   ├── Message.tsx                  # Message bubble
│   │   ├── ChatInput.tsx                # Input with file upload
│   │   └── KnowledgeViewer.tsx          # Knowledge display
│   │
│   └── lib/ancarraig/
│       ├── ai-prompt.ts                 # System prompt generation
│       ├── ai-storage.ts                # Conversation storage
│       ├── ai-context.ts                # Context loading
│       └── ai-extraction-prompt.ts      # Extraction prompts
│
└── packages/database/src/
    └── types.ts                         # TypeScript types
```

## Success Metrics

**Technical:**
- All 7 milestones completed
- All 30 todos completed
- Database migration successful
- All API routes functional
- UI responsive and polished

**User Experience:**
- Can have natural conversations
- AI provides relevant advice
- Knowledge extraction works
- File upload and analysis functional
- Memory persists across sessions

**Business Value:**
- Reduces decision time
- Provides data-driven insights
- Learns user preferences
- Scales knowledge over time
- Improves with every conversation

---

**Status:** Production Ready ✅
**Version:** 1.0.0
**Last Updated:** 2026-01-15
