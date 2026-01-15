import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@lostmonster/database/client';
import { AncarraigAIConversation, AIKnowledgeExtraction } from '@lostmonster/database';
import { buildExtractionPrompt } from '@/lib/ancarraig/ai-extraction-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, conversationId } = body;

    if (!userId || !conversationId) {
      return NextResponse.json(
        { error: 'userId and conversationId are required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const sql = createClient();

    // Get recent conversation context (last 5 messages including the current one)
    const messages = await sql<AncarraigAIConversation[]>`
      SELECT *
      FROM ancarraig_ai_conversations
      WHERE user_id = ${userId}
      AND created_at <= (
        SELECT created_at FROM ancarraig_ai_conversations WHERE id = ${conversationId}
      )
      ORDER BY created_at DESC
      LIMIT 5
    `;

    messages.reverse(); // Oldest first

    if (messages.length === 0) {
      return NextResponse.json({ extracted: 0 });
    }

    // Build extraction prompt
    const extractionPrompt = buildExtractionPrompt(messages);

    // Initialize Anthropic client
    const anthropic = new Anthropic({ apiKey });

    // Call Claude to extract knowledge
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: extractionPrompt,
        },
      ],
    });

    // Parse response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    let extractions: AIKnowledgeExtraction[];
    try {
      extractions = JSON.parse(content.text);
    } catch (parseError) {
      console.error('Failed to parse extraction JSON:', content.text);
      return NextResponse.json({ error: 'Failed to parse extractions', extracted: 0 });
    }

    if (!Array.isArray(extractions)) {
      console.error('Extractions is not an array:', extractions);
      return NextResponse.json({ error: 'Invalid extraction format', extracted: 0 });
    }

    // Save extractions to database
    let savedCount = 0;

    for (const extraction of extractions) {
      try {
        // Validate extraction
        if (
          !extraction.category ||
          !extraction.key ||
          !extraction.value ||
          typeof extraction.confidence !== 'number'
        ) {
          console.warn('Invalid extraction:', extraction);
          continue;
        }

        // Check if similar knowledge already exists
        const existing = await sql`
          SELECT id FROM ancarraig_ai_knowledge
          WHERE user_id = ${userId}
          AND category = ${extraction.category}
          AND key = ${extraction.key}
        `;

        if (existing.length > 0) {
          // Update existing knowledge
          await sql`
            UPDATE ancarraig_ai_knowledge
            SET value = ${extraction.value},
                confidence = ${extraction.confidence},
                source_conversation_id = ${conversationId},
                updated_at = NOW()
            WHERE id = ${existing[0].id}
          `;
        } else {
          // Insert new knowledge
          await sql`
            INSERT INTO ancarraig_ai_knowledge
              (user_id, category, key, value, confidence, source_conversation_id)
            VALUES
              (${userId}, ${extraction.category}, ${extraction.key}, ${extraction.value}, ${extraction.confidence}, ${conversationId})
          `;
        }

        savedCount++;
      } catch (err) {
        console.error('Failed to save extraction:', err, extraction);
      }
    }

    return NextResponse.json({
      extracted: savedCount,
      total: extractions.length,
    });
  } catch (error) {
    console.error('Knowledge extraction error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
