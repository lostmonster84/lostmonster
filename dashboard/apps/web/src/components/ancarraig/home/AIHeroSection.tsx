'use client';

import { Sparkles } from 'lucide-react';

export function AIHeroSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 space-y-6 text-center">
      {/* Large centered icon with subtle animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl border border-primary/20 backdrop-blur-sm">
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>
      </div>

      {/* Headline - big and bold */}
      <div className="space-y-3 max-w-2xl px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          AI Pricing Assistant
        </h1>

        {/* Subtitle - short and punchy */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Smart decisions that learn from you
        </p>
      </div>
    </div>
  );
}
