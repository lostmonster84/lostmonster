import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { saveConversation } from '@/lib/ancarraig/ai-storage';
import { loadAIContext } from '@/lib/ancarraig/ai-context';
import { buildSystemPrompt, buildMinimalSystemPrompt } from '@/lib/ancarraig/ai-prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // For demo purposes, use a demo user ID
    // In production, this would come from authentication
    const userId = 'demo-user-ancarraig';

    // Parse request
    const body = await req.json();
    const { message, fileData } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Please add ANTHROPIC_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey,
    });

    // Save user message
    const userMessage = await saveConversation(userId, 'user', message);

    // Load context for AI
    const context = await loadAIContext(userId);

    // Build system prompt
    const systemPrompt = context.lodgeData && context.lodgeData.length > 0
      ? buildSystemPrompt(context)
      : buildMinimalSystemPrompt();

    // Prepare user message (include file data if present)
    let userPrompt = message;
    if (fileData) {
      userPrompt = `${message}\n\n**Uploaded File Data:**\n\`\`\`\n${fileData}\n\`\`\``;
    }

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Call Claude API with streaming
          const messageStream = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 4096,
            system: systemPrompt,
            messages: [
              {
                role: 'user',
                content: userPrompt,
              },
            ],
            stream: true,
          });

          let fullResponse = '';

          // Stream response chunks
          for await (const event of messageStream) {
            if (event.type === 'content_block_delta') {
              if (event.delta.type === 'text_delta') {
                const text = event.delta.text;
                fullResponse += text;

                // Send chunk to client
                const data = JSON.stringify({
                  type: 'content',
                  content: text,
                });
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
            }
          }

          // Save assistant response
          const assistantMessage = await saveConversation(
            userId,
            'assistant',
            fullResponse,
            {
              model: 'claude-sonnet-4-5-20250929',
              messageId: userMessage.id,
            }
          );

          // Send completion signal
          const doneData = JSON.stringify({
            type: 'done',
            conversationId: assistantMessage.id,
          });
          controller.enqueue(encoder.encode(`data: ${doneData}\n\n`));

          // Trigger knowledge extraction asynchronously (don't await)
          extractKnowledge(userId, userMessage.id).catch(console.error);

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);

          const errorData = JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Trigger knowledge extraction asynchronously
 */
async function extractKnowledge(userId: string, conversationId: string) {
  try {
    // Call extraction endpoint
    await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/ancarraig/ai/extract-knowledge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, conversationId }),
    });
  } catch (error) {
    console.error('Knowledge extraction failed:', error);
    // Fail silently - don't impact user experience
  }
}
