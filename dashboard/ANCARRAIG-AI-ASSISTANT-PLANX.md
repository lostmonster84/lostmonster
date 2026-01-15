# Ancarraig AI Pricing Assistant - PLANX

> **Execution Blueprint for Learning AI Assistant**
> **Created:** 2026-01-15
> **Estimated Timeline:** 5-7 days (phased implementation)

---

## Overview

**Goal:** Build an AI pricing concierge that learns from every conversation, providing increasingly valuable insights about pricing strategy, competitors, and business decisions.

**Framework Used:** CODAX → PLANX
**Tech Stack:** Next.js 15, Claude API (Sonnet 4.5), PostgreSQL (Neon), TypeScript

---

## Milestones

### ✅ Milestone 1: Database Foundation
### ✅ Milestone 2: AI Chat Interface
### ✅ Milestone 3: Claude API Integration
### ✅ Milestone 4: Knowledge Extraction System
### ✅ Milestone 5: Context & Memory System
### ✅ Milestone 6: File Upload & Analysis
### ✅ Milestone 7: Polish & Launch

---

## Milestone 1: Database Foundation

**Goal:** Create database schema for conversation storage and knowledge base

**Todos:**

- [ ] **1.1** Create AI conversations table
  - **Summary:** Add PostgreSQL table for storing all chat messages
  - **What:** Create `ancarraig_ai_conversations` table with user_id, message, role, metadata, timestamps
  - **Why:** Need persistent storage for all conversations to enable learning and context retrieval
  - **How:**
    - Create migration SQL file
    - Include indexes for user_id, created_at for fast queries
    - JSONB metadata field for future expansion (topics, entities, sentiment)
  - **Acceptance:**
    - Table created in database
    - Can insert and query messages
    - Proper foreign key to users table
  - **Dependencies:** None
  - **Files:**
    - `dashboard/scripts/ancarraig-ai-migration.sql`

- [ ] **1.2** Create knowledge base table
  - **Summary:** Add table for extracted business knowledge
  - **What:** Create `ancarraig_ai_knowledge` table with category, key, value, confidence, source tracking
  - **Why:** Store structured knowledge extracted from conversations (preferences, rules, insights, competitors)
  - **How:**
    - Categories: 'preference', 'rule', 'insight', 'competitor'
    - Confidence score 0-1 to track certainty
    - Link back to source conversation for audit trail
  - **Acceptance:**
    - Table created with proper schema
    - Can store/retrieve knowledge entries
    - Indexes on category and key for fast lookups
  - **Dependencies:** None
  - **Files:**
    - `dashboard/scripts/ancarraig-ai-migration.sql`

- [ ] **1.3** Add TypeScript types
  - **Summary:** Define TypeScript interfaces for AI data structures
  - **What:** Create types for Conversation, Message, Knowledge, AIContext
  - **Why:** Type safety across API and UI layers
  - **How:**
    - Add to `dashboard/packages/database/src/types.ts`
    - Export types for use in API and components
  - **Acceptance:**
    - Types defined and exported
    - No TypeScript errors
  - **Dependencies:** 1.1, 1.2
  - **Files:**
    - `dashboard/packages/database/src/types.ts`

- [ ] **1.4** Run database migration
  - **Summary:** Execute migration to create tables in production database
  - **What:** Run migration script against Neon database
  - **Why:** Can't build features without database schema in place
  - **How:**
    - Use existing `run-migration.js` pattern
    - Execute against DATABASE_URL
    - Verify tables created successfully
  - **Acceptance:**
    - Tables exist in database
    - Can query from API
    - Migration logged as complete
  - **Dependencies:** 1.1, 1.2
  - **Files:**
    - `dashboard/scripts/run-ai-migration.js`

**Milestone 1 Complete When:** All database tables created, types defined, migration verified

---

## Milestone 2: AI Chat Interface

**Goal:** Build clean, functional chat UI at `/ancarraig/ai`

**Todos:**

- [ ] **2.1** Create AI chat page route
  - **Summary:** Add new page at `/ancarraig/ai` with authentication
  - **What:** Server component that fetches initial conversation history
  - **Why:** Entry point for AI assistant, needs auth check and initial data
  - **How:**
    - Create `dashboard/apps/web/src/app/ancarraig/ai/page.tsx`
    - Wrap in AncarraigLayout for consistent navigation
    - Auth check with redirect to login if not authenticated
  - **Acceptance:**
    - Page loads at `/ancarraig/ai`
    - Requires authentication
    - Shows loading state properly
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/src/app/ancarraig/ai/page.tsx`

- [ ] **2.2** Build ChatInterface component
  - **Summary:** Client component for chat messages and input
  - **What:** Message list, input field, send button, loading states
  - **Why:** Core UI for interacting with AI
  - **How:**
    - Display messages in scrollable container
    - Markdown rendering for AI responses
    - Auto-scroll to bottom on new messages
    - Loading indicator during AI response
    - Error handling with user-friendly messages
  - **Acceptance:**
    - Messages display properly
    - Can send new messages
    - Loading states work
    - Scrolling smooth
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`

- [ ] **2.3** Build Message component
  - **Summary:** Individual message bubble with role styling
  - **What:** User messages (right-aligned) vs AI messages (left-aligned) with distinct styling
  - **Why:** Clear visual distinction between user and AI
  - **How:**
    - Different background colors (user: cyan, AI: muted)
    - Markdown support for AI responses
    - Timestamp display
    - Copy button for AI responses
  - **Acceptance:**
    - User/AI messages visually distinct
    - Markdown renders correctly
    - Timestamps formatted nicely
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/Message.tsx`

- [ ] **2.4** Build ChatInput component
  - **Summary:** Text input with send button and keyboard shortcuts
  - **What:** Textarea with auto-resize, send button, Enter to send, Shift+Enter for new line
  - **Why:** Smooth UX for composing messages
  - **How:**
    - Auto-resize textarea as user types
    - Disabled while AI is responding
    - Enter sends, Shift+Enter adds line break
    - Clear input after send
  - **Acceptance:**
    - Can type multi-line messages
    - Enter sends message
    - Disabled during loading
    - Input clears after send
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInput.tsx`

- [ ] **2.5** Add navigation link
  - **Summary:** Add "AI Assistant" to Ancarraig sidebar
  - **What:** New nav item in AncarraigLayout sidebar
  - **Why:** Easy access to AI from anywhere in Ancarraig app
  - **How:**
    - Add to navigation array in AncarraigLayout
    - Use Brain or Sparkles icon from lucide-react
    - Active state when on /ancarraig/ai
  - **Acceptance:**
    - Link appears in sidebar
    - Navigates to AI page
    - Active state highlights correctly
  - **Dependencies:** 2.1
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/AncarraigLayout.tsx`

**Milestone 2 Complete When:** Chat UI functional, can type messages, navigation works

---

## Milestone 3: Claude API Integration

**Goal:** Connect to Claude API and enable real AI responses

**Todos:**

- [ ] **3.1** Install Anthropic SDK
  - **Summary:** Add @anthropic-ai/sdk package
  - **What:** Install official Anthropic SDK for Claude API
  - **Why:** Need SDK to communicate with Claude API
  - **How:**
    - `pnpm add @anthropic-ai/sdk` in web app
    - Verify package.json updated
  - **Acceptance:**
    - Package installed
    - No dependency conflicts
    - Can import Anthropic client
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/package.json`

- [ ] **3.2** Add API key to environment
  - **Summary:** Store Anthropic API key securely
  - **What:** Add ANTHROPIC_API_KEY to .env.local
  - **Why:** API key required for Claude API calls
  - **How:**
    - Add to `dashboard/apps/web/.env.local`
    - Document in .env.example
    - Verify not committed to git
  - **Acceptance:**
    - API key accessible via process.env
    - Not in version control
    - Works in both dev and production
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/.env.local`
    - `dashboard/apps/web/.env.example`

- [ ] **3.3** Create chat API route
  - **Summary:** POST endpoint for sending messages to AI
  - **What:** `/api/ancarraig/ai/chat` route that accepts message, returns AI response
  - **Why:** Server-side API call to Claude (can't expose API key to client)
  - **How:**
    - Authenticate user
    - Load conversation context
    - Build system prompt with business data
    - Call Claude API with streaming
    - Store conversation in database
    - Return streamed response to client
  - **Acceptance:**
    - Endpoint returns AI responses
    - Streaming works properly
    - Handles errors gracefully
    - Conversation stored in DB
  - **Dependencies:** 1.4, 3.1, 3.2
  - **Files:**
    - `dashboard/apps/web/src/app/api/ancarraig/ai/chat/route.ts`

- [ ] **3.4** Build system prompt generator
  - **Summary:** Function that creates context-aware system prompt
  - **What:** Load lodge data, channel data, recent conversations → format into prompt
  - **Why:** AI needs context about the business to give relevant advice
  - **How:**
    - Query lodges, costs, channels from database
    - Load recent conversation history (last 10 messages)
    - Format as structured prompt for Claude
    - Include business knowledge when available
  - **Acceptance:**
    - Prompt includes all relevant business data
    - Formatted clearly for Claude
    - Updates dynamically with latest data
  - **Dependencies:** 1.4
  - **Files:**
    - `dashboard/apps/web/src/lib/ancarraig/ai-prompt.ts`

- [ ] **3.5** Implement conversation storage
  - **Summary:** Save all messages to database
  - **What:** After each message exchange, persist to ancarraig_ai_conversations
  - **Why:** Need complete history for learning and context
  - **How:**
    - Save user message before calling Claude
    - Save AI response after receiving
    - Include metadata (model, tokens, duration)
  - **Acceptance:**
    - All messages stored in DB
    - Can query conversation history
    - Metadata captured correctly
  - **Dependencies:** 1.4, 3.3
  - **Files:**
    - `dashboard/apps/web/src/lib/ancarraig/ai-storage.ts`

- [ ] **3.6** Wire up chat client to API
  - **Summary:** Connect ChatInterface to chat API endpoint
  - **What:** Send user messages to API, display streamed responses
  - **Why:** Make the chat actually work end-to-end
  - **How:**
    - Use fetch with streaming response
    - Parse SSE (Server-Sent Events) from API
    - Update UI as tokens arrive
    - Handle errors and retries
  - **Acceptance:**
    - Messages send successfully
    - AI responses stream in real-time
    - Errors display to user
    - Loading states accurate
  - **Dependencies:** 2.2, 3.3
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`

**Milestone 3 Complete When:** Can send messages and receive real AI responses, all conversations stored

---

## Milestone 4: Knowledge Extraction System

**Goal:** AI automatically extracts and stores business knowledge from conversations

**Todos:**

- [ ] **4.1** Create knowledge extraction API
  - **Summary:** POST endpoint to extract knowledge from conversations
  - **What:** `/api/ancarraig/ai/extract-knowledge` that analyzes conversation and saves structured data
  - **Why:** Automate learning from every conversation
  - **How:**
    - Take conversation ID as input
    - Load full conversation messages
    - Ask Claude to extract: preferences, rules, insights, competitors
    - Save to ancarraig_ai_knowledge table
    - Return extracted knowledge for review
  - **Acceptance:**
    - Extracts knowledge from conversations
    - Stores in database properly
    - Handles missing/invalid data
  - **Dependencies:** 1.4, 3.3
  - **Files:**
    - `dashboard/apps/web/src/app/api/ancarraig/ai/extract-knowledge/route.ts`

- [ ] **4.2** Build knowledge extraction prompt
  - **Summary:** Structured prompt for extracting business knowledge
  - **What:** Prompt template that guides Claude to extract specific knowledge types
  - **Why:** Consistent, structured knowledge extraction
  - **How:**
    - Define categories: preference, rule, insight, competitor
    - Request JSON output format
    - Include confidence scoring
    - Request source attribution
  - **Acceptance:**
    - Returns valid JSON
    - Categories correct
    - Confidence scores reasonable
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/src/lib/ancarraig/ai-extraction-prompt.ts`

- [ ] **4.3** Trigger extraction after conversations
  - **Summary:** Auto-run extraction when conversation ends
  - **What:** After each AI response, trigger knowledge extraction
  - **Why:** Build knowledge base without manual effort
  - **How:**
    - Call extraction API after chat response completes
    - Run async (don't block user)
    - Handle failures silently (log errors)
  - **Acceptance:**
    - Extraction runs automatically
    - Doesn't slow down chat
    - Errors logged but don't break UX
  - **Dependencies:** 3.3, 4.1
  - **Files:**
    - `dashboard/apps/web/src/app/api/ancarraig/ai/chat/route.ts`

- [ ] **4.4** Create knowledge viewer
  - **Summary:** UI to see what AI has learned
  - **What:** Page showing all extracted knowledge organized by category
  - **Why:** Transparency into what AI knows, ability to verify/correct
  - **How:**
    - Tabs for each category (preferences, rules, insights, competitors)
    - Display key, value, confidence, source conversation
    - Link to source conversation
    - Search/filter functionality
  - **Acceptance:**
    - Can view all knowledge entries
    - Organized by category
    - Links to source conversations work
  - **Dependencies:** 1.4, 4.1
  - **Files:**
    - `dashboard/apps/web/src/app/ancarraig/ai/knowledge/page.tsx`
    - `dashboard/apps/web/src/components/ancarraig/ai/KnowledgeViewer.tsx`

**Milestone 4 Complete When:** Knowledge auto-extracts from conversations, viewable in UI

---

## Milestone 5: Context & Memory System

**Goal:** AI remembers and uses past conversations in new chats

**Todos:**

- [ ] **5.1** Build conversation history loader
  - **Summary:** Function to load relevant past conversations
  - **What:** Query recent conversations and semantically similar ones
  - **Why:** Provide AI with context from past discussions
  - **How:**
    - Load last 10 conversations (chronological)
    - Format for system prompt
    - Include timestamps for temporal context
  - **Acceptance:**
    - Loads recent history correctly
    - Formatted clearly for prompt
    - Efficient queries (indexed)
  - **Dependencies:** 1.4
  - **Files:**
    - `dashboard/apps/web/src/lib/ancarraig/ai-context.ts`

- [ ] **5.2** Build knowledge base loader
  - **Summary:** Function to load relevant business knowledge
  - **What:** Query knowledge table, format for system prompt
  - **Why:** AI needs to know learned preferences and rules
  - **How:**
    - Load all knowledge entries (should be small dataset)
    - Group by category
    - Format as structured context for AI
  - **Acceptance:**
    - Loads all knowledge correctly
    - Grouped by category
    - Formatted clearly for prompt
  - **Dependencies:** 1.4
  - **Files:**
    - `dashboard/apps/web/src/lib/ancarraig/ai-context.ts`

- [ ] **5.3** Integrate context into system prompt
  - **Summary:** Update prompt generator to include history + knowledge
  - **What:** Enhance system prompt with conversation history and knowledge base
  - **Why:** Make AI actually remember and use past context
  - **How:**
    - Call history loader
    - Call knowledge loader
    - Format into system prompt sections
    - Keep prompt under token limits
  - **Acceptance:**
    - AI references past conversations
    - Uses learned knowledge in responses
    - Prompt stays under limits
  - **Dependencies:** 3.4, 5.1, 5.2
  - **Files:**
    - `dashboard/apps/web/src/lib/ancarraig/ai-prompt.ts`

- [ ] **5.4** Test memory with example conversation
  - **Summary:** Verify AI remembers across multiple chats
  - **What:** Have conversation about preference, start new chat, verify AI recalls
  - **Why:** Validate the learning system works end-to-end
  - **How:**
    - Chat 1: "I prefer direct bookings when margin difference is >10%"
    - Chat 2: "Should I offer a direct booking discount?"
    - Verify AI mentions the 10% preference
  - **Acceptance:**
    - AI recalls information from previous chats
    - References specific past statements
    - Context appropriate and relevant
  - **Dependencies:** 5.3
  - **Files:** None (manual testing)

**Milestone 5 Complete When:** AI demonstrates memory across conversations, uses learned knowledge

---

## Milestone 6: File Upload & Analysis

**Goal:** Upload competitor spreadsheets and get AI analysis

**Todos:**

- [ ] **6.1** Add file upload UI
  - **Summary:** File input in chat interface for CSV/Excel
  - **What:** Upload button, drag-and-drop, file type validation
  - **Why:** Enable spreadsheet analysis without copy-paste
  - **How:**
    - Accept .csv, .xlsx, .xls files
    - Max file size 5MB
    - Show file name after upload
    - Clear file button
  - **Acceptance:**
    - Can select files via button or drag-drop
    - Only accepts valid file types
    - Shows selected file name
  - **Dependencies:** 2.2
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInput.tsx`

- [ ] **6.2** Create file upload API
  - **Summary:** POST endpoint to process uploaded files
  - **What:** `/api/ancarraig/ai/upload` that parses CSV/Excel → text
  - **Why:** Server-side file processing, convert to text for AI
  - **How:**
    - Accept multipart form data
    - Use library to parse CSV/Excel (papaparse, xlsx)
    - Convert to formatted text/JSON
    - Return parsed data to client
  - **Acceptance:**
    - Parses CSV files correctly
    - Parses Excel files correctly
    - Handles malformed files gracefully
    - Returns structured data
  - **Dependencies:** None
  - **Files:**
    - `dashboard/apps/web/src/app/api/ancarraig/ai/upload/route.ts`

- [ ] **6.3** Integrate file data into chat
  - **Summary:** Include uploaded file data in AI message
  - **What:** When file uploaded, add data to next message context
  - **Why:** AI needs to see file contents to analyze
  - **How:**
    - Upload file first
    - Get parsed text/JSON
    - Append to user message or system prompt
    - Send to AI with analysis request
  - **Acceptance:**
    - File data included in AI context
    - AI can analyze spreadsheet data
    - Works for multiple file types
  - **Dependencies:** 6.1, 6.2
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`

- [ ] **6.4** Test with competitor pricing CSV
  - **Summary:** Verify AI can analyze uploaded competitor data
  - **What:** Upload sample CSV with competitor prices, ask AI for analysis
  - **Why:** Validate core value proposition (spreadsheet analysis)
  - **How:**
    - Create sample CSV: competitor, price, dates
    - Upload via chat
    - Ask "Analyze this competitor pricing"
    - Verify AI extracts insights
  - **Acceptance:**
    - AI successfully analyzes CSV
    - Provides meaningful insights
    - Compares to user's pricing
  - **Dependencies:** 6.3
  - **Files:** None (manual testing)

**Milestone 6 Complete When:** Can upload files and get AI analysis of competitor data

---

## Milestone 7: Polish & Launch

**Goal:** Production-ready UI/UX and performance optimization

**Todos:**

- [ ] **7.1** Add loading skeletons
  - **Summary:** Better loading states for chat interface
  - **What:** Skeleton screens for message loading, history loading
  - **Why:** Professional UX, clear feedback during waits
  - **How:**
    - Skeleton for message bubbles while AI responds
    - Skeleton for initial history load
    - Animated pulse effect
  - **Acceptance:**
    - Loading states look polished
    - No jarring content shifts
    - Smooth transitions
  - **Dependencies:** 2.2
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`

- [ ] **7.2** Add error boundaries
  - **Summary:** Graceful error handling for AI failures
  - **What:** React error boundary around chat, API error messages
  - **Why:** AI can fail, need good UX for errors
  - **How:**
    - Catch API errors and display friendly messages
    - "AI is temporarily unavailable" instead of crash
    - Retry button for failed messages
  - **Acceptance:**
    - Errors don't crash the page
    - User-friendly error messages
    - Can retry failed messages
  - **Dependencies:** 3.6
  - **Files:**
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`

- [ ] **7.3** Optimize conversation queries
  - **Summary:** Add database indexes for fast queries
  - **What:** Indexes on user_id, created_at, category for AI tables
  - **Why:** Keep chat responsive as data grows
  - **How:**
    - Add indexes in migration
    - Test query performance
    - Use EXPLAIN ANALYZE to verify
  - **Acceptance:**
    - Queries under 100ms
    - Indexes used in query plans
    - No slow queries logged
  - **Dependencies:** 1.4
  - **Files:**
    - `dashboard/scripts/ancarraig-ai-migration.sql`

- [ ] **7.4** Add conversation deletion
  - **Summary:** Allow users to delete chat history
  - **What:** Delete button on conversations, clear all option
  - **Why:** Privacy, fresh start capability
  - **How:**
    - API endpoint to delete conversations
    - Soft delete (mark as deleted, don't hard delete)
    - Confirmation modal before delete
  - **Acceptance:**
    - Can delete individual conversations
    - Can clear all history
    - Confirmation prevents accidents
  - **Dependencies:** 1.4
  - **Files:**
    - `dashboard/apps/web/src/app/api/ancarraig/ai/conversations/[id]/route.ts`
    - `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`

- [ ] **7.5** Add welcome message
  - **Summary:** Friendly intro when user first visits AI page
  - **What:** Initial message from AI explaining capabilities
  - **Why:** Clear value proposition, guides first interaction
  - **How:**
    - Show welcome only if no conversation history
    - Explain: "I can help you with pricing analysis, competitor research, commission calculations..."
    - Include example questions
  - **Acceptance:**
    - Welcome shows for new users
    - Doesn't show for returning users
    - Clear and helpful
  - **Dependencies:** 2.1
  - **Files:**
    - `dashboard/apps/web/src/app/ancarraig/ai/page.tsx`

- [ ] **7.6** Test end-to-end flow
  - **Summary:** Complete user journey testing
  - **What:** Full flow from login → chat → learn → remember → analyze file
  - **Why:** Verify everything works together
  - **How:**
    - Login as user
    - Navigate to AI
    - Have conversation about pricing
    - Upload competitor CSV
    - Start new conversation
    - Verify AI remembers previous context
  - **Acceptance:**
    - All features work together
    - No errors or crashes
    - Performance acceptable
    - Memory/learning works
  - **Dependencies:** All previous milestones
  - **Files:** None (manual testing)

- [ ] **7.7** Document AI features
  - **Summary:** Add documentation for AI assistant
  - **What:** README explaining features, API key setup, how learning works
  - **Why:** Team knowledge, onboarding future developers
  - **How:**
    - Create ANCARRAIG-AI.md
    - Document architecture
    - Explain knowledge extraction
    - API key setup instructions
  - **Acceptance:**
    - Clear documentation exists
    - Covers all major features
    - Setup instructions work
  - **Dependencies:** All previous milestones
  - **Files:**
    - `dashboard/ANCARRAIG-AI.md`

**Milestone 7 Complete When:** Production-ready, polished, tested, documented

---

## Success Metrics

**Phase 1 (Milestones 1-3):**
- ✅ Can have conversations with AI
- ✅ All messages stored in database
- ✅ AI can access lodge/channel/cost data

**Phase 2 (Milestones 4-5):**
- ✅ Knowledge auto-extracts from conversations
- ✅ AI remembers past conversations
- ✅ References learned knowledge in responses

**Phase 3 (Milestones 6-7):**
- ✅ Can upload and analyze competitor files
- ✅ Polished UI/UX
- ✅ Production-ready performance

**Ultimate Success:**
- User: "This actually helps me make better pricing decisions"
- AI gets smarter with every conversation
- Reduces decision time by 50%+
- Becomes indispensable pricing advisor

---

## Files Created/Modified

### New Files (20+)
**Database:**
- `dashboard/scripts/ancarraig-ai-migration.sql`
- `dashboard/scripts/run-ai-migration.js`

**Types:**
- `dashboard/packages/database/src/types.ts` (updated)

**Pages:**
- `dashboard/apps/web/src/app/ancarraig/ai/page.tsx`
- `dashboard/apps/web/src/app/ancarraig/ai/knowledge/page.tsx`

**API Routes:**
- `dashboard/apps/web/src/app/api/ancarraig/ai/chat/route.ts`
- `dashboard/apps/web/src/app/api/ancarraig/ai/upload/route.ts`
- `dashboard/apps/web/src/app/api/ancarraig/ai/extract-knowledge/route.ts`
- `dashboard/apps/web/src/app/api/ancarraig/ai/conversations/[id]/route.ts`

**Components:**
- `dashboard/apps/web/src/components/ancarraig/ai/ChatInterface.tsx`
- `dashboard/apps/web/src/components/ancarraig/ai/Message.tsx`
- `dashboard/apps/web/src/components/ancarraig/ai/ChatInput.tsx`
- `dashboard/apps/web/src/components/ancarraig/ai/KnowledgeViewer.tsx`

**Lib/Utilities:**
- `dashboard/apps/web/src/lib/ancarraig/ai-prompt.ts`
- `dashboard/apps/web/src/lib/ancarraig/ai-storage.ts`
- `dashboard/apps/web/src/lib/ancarraig/ai-extraction-prompt.ts`
- `dashboard/apps/web/src/lib/ancarraig/ai-context.ts`

**Modified Files:**
- `dashboard/apps/web/src/components/ancarraig/AncarraigLayout.tsx` (add nav link)
- `dashboard/apps/web/package.json` (add @anthropic-ai/sdk)
- `dashboard/apps/web/.env.local` (add ANTHROPIC_API_KEY)
- `dashboard/apps/web/.env.example` (document API key)

**Documentation:**
- `dashboard/ANCARRAIG-AI.md`

---

## Timeline Estimate

**Week 1: Foundation**
- Day 1: Milestones 1-2 (Database + UI)
- Day 2: Milestone 3 (Claude Integration)
- Day 3: Milestone 4 (Knowledge Extraction)

**Week 2: Intelligence**
- Day 4: Milestone 5 (Context & Memory)
- Day 5: Milestone 6 (File Upload)
- Day 6-7: Milestone 7 (Polish & Launch)

**Total:** 5-7 days of focused development

---

## Risk Mitigation

**Risk:** Claude API costs too high
- **Mitigation:** Monitor token usage, implement conversation limits, use caching

**Risk:** Knowledge extraction accuracy low
- **Mitigation:** Start with simple categories, iterate on extraction prompt, add manual review UI

**Risk:** Context window limits with large history
- **Mitigation:** Summarize old conversations, keep only recent + relevant context

**Risk:** Performance degrades with large conversation history
- **Mitigation:** Pagination, indexes, archive old conversations

---

## Next Steps

1. Review PLANX with stakeholder
2. Get API key from Anthropic
3. Start Milestone 1 (Database Foundation)
4. Build incrementally, test each milestone
5. Ship Phase 1 (basic chat) before building learning features

---

**PLANX Complete** ✅
**Ready for Implementation** 🚀
