'use client';

import { Building2, MessageSquare, Sparkles } from 'lucide-react';

interface AIStatusBadgeProps {
  lodgeCount?: number;
  conversationCount?: number;
}

export function AIStatusBadge({ lodgeCount = 3, conversationCount = 5 }: AIStatusBadgeProps) {
  const hasData = lodgeCount > 0 || conversationCount > 0;

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
      {hasData ? (
        <>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <span>{lodgeCount} lodge{lodgeCount !== 1 ? 's' : ''}</span>
          </div>
          <span className="text-muted-foreground/50">•</span>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>{conversationCount} conversation{conversationCount !== 1 ? 's' : ''}</span>
          </div>
        </>
      ) : (
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Ready to learn about your business
        </span>
      )}
    </div>
  );
}
