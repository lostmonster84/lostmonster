'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Input } from '@lostmonster/ui';

export function InlineChatInput() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      router.push(`/ancarraig/ai?q=${encodeURIComponent(message.trim())}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          className="h-14 pr-14 text-base rounded-xl border-border/50 bg-card/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
