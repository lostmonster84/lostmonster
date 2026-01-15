'use client';

import { useState, useRef, useEffect } from 'react';
import { AncarraigAIConversation } from '@lostmonster/database';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { Loader2, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  initialMessages: AncarraigAIConversation[];
  userId: string;
}

export function ChatInterface({ initialMessages, userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<AncarraigAIConversation[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (message: string, fileData?: string) => {
    setError(null);

    // Add user message immediately
    const userMessage: AncarraigAIConversation = {
      id: `temp-${Date.now()}`,
      user_id: userId,
      role: 'user',
      message,
      metadata: {},
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ancarraig/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, fileData }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream');
      }

      let assistantMessage = '';
      let assistantMessageObj: AncarraigAIConversation | null = null;

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'content') {
                assistantMessage += data.content;

                // Update or create assistant message
                if (!assistantMessageObj) {
                  assistantMessageObj = {
                    id: `temp-assistant-${Date.now()}`,
                    user_id: userId,
                    role: 'assistant',
                    message: assistantMessage,
                    metadata: {},
                    created_at: new Date().toISOString(),
                  };
                  setMessages((prev) => [...prev, assistantMessageObj!]);
                } else {
                  assistantMessageObj.message = assistantMessage;
                  setMessages((prev) => [...prev.slice(0, -1), assistantMessageObj!]);
                }
              } else if (data.type === 'done') {
                // Final message with database ID
                if (data.conversationId && assistantMessageObj) {
                  assistantMessageObj.id = data.conversationId;
                  setMessages((prev) => [...prev.slice(0, -1), assistantMessageObj!]);
                }
              }
            } catch (e) {
              // Skip invalid JSON
              console.error('Failed to parse stream data:', e);
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');

      // Remove the user message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  // Show welcome message if no messages
  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-card rounded-lg border border-border shadow-lg overflow-hidden">
      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {showWelcome && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Welcome to Your AI Pricing Assistant
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-6">
              I can help you with pricing strategy, competitor analysis, commission calculations,
              and more. I learn from every conversation to provide increasingly personalized advice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-foreground mb-1">
                  Pricing Questions
                </p>
                <p className="text-xs text-muted-foreground">
                  "What should I charge for a week-long stay in August?"
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-foreground mb-1">
                  Competitor Analysis
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload a CSV with competitor prices for instant analysis
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-foreground mb-1">
                  Commission Calculations
                </p>
                <p className="text-xs text-muted-foreground">
                  "Compare net revenue between Airbnb and direct bookings"
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-medium text-foreground mb-1">
                  Strategy Advice
                </p>
                <p className="text-xs text-muted-foreground">
                  "Should I offer a direct booking discount during winter?"
                </p>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <Message
            key={msg.id}
            role={msg.role}
            content={msg.message}
            timestamp={msg.created_at}
          />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium">Error: {error}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Please try again or refresh the page if the problem persists.
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
