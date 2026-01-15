'use client';

import { AIMessageRole } from '@lostmonster/database';
import { Copy, User, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@lostmonster/ui';

interface MessageProps {
  role: AIMessageRole;
  content: string;
  timestamp: string;
}

export function Message({ role, content, timestamp }: MessageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = role === 'user';
  const isAssistant = role === 'assistant';

  // Format timestamp
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div
      className={cn(
        'flex gap-3 mb-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center shadow-sm',
          isUser
            ? 'bg-gradient-to-br from-cyan-500 to-cyan-600'
            : 'bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Sparkles className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex-1 max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
          isUser
            ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 dark:from-cyan-500/20 dark:to-cyan-600/20 border border-cyan-500/20'
            : 'bg-card border border-border'
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formattedTime}</span>
            {isAssistant && (
              <button
                onClick={copyToClipboard}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Copy message"
              >
                <Copy className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Message text - Markdown for assistant, plain text for user */}
        {isAssistant ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                // Style markdown elements
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="px-1.5 py-0.5 bg-muted rounded text-sm">{children}</code>
                  ) : (
                    <code className={cn('block p-3 bg-muted rounded-lg text-sm overflow-x-auto', className)}>
                      {children}
                    </code>
                  );
                },
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-foreground whitespace-pre-wrap">{content}</p>
        )}

        {/* Copied feedback */}
        {copied && (
          <div className="mt-2 text-xs text-cyan-600 dark:text-cyan-400">Copied!</div>
        )}
      </div>
    </div>
  );
}
