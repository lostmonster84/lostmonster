'use client';

import { useRouter } from 'next/navigation';
import { CalendarDays, ArrowLeftRight, Target, TrendingUp, LucideIcon } from 'lucide-react';
import { Card } from '@lostmonster/ui';

interface QuickAction {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  prompt: string;
}

const quickActions: QuickAction[] = [
  {
    icon: CalendarDays,
    title: 'Weekend Pricing',
    subtitle: 'What to charge',
    prompt: 'What should I charge this weekend?',
  },
  {
    icon: ArrowLeftRight,
    title: 'Compare Channels',
    subtitle: 'Commission impact',
    prompt: 'Compare Airbnb vs Booking.com commissions',
  },
  {
    icon: Target,
    title: 'Strategy',
    subtitle: 'Pricing analysis',
    prompt: 'Help me analyze my pricing strategy',
  },
  {
    icon: TrendingUp,
    title: 'Revenue',
    subtitle: 'Calculate net',
    prompt: 'Calculate net revenue for peak season',
  },
];

export function QuickActionCards() {
  const router = useRouter();

  const handleCardClick = (prompt: string) => {
    router.push(`/ancarraig/ai?q=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="group cursor-pointer bg-card border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              onClick={() => handleCardClick(action.prompt)}
            >
              <div className="p-4 flex flex-col items-center text-center space-y-3">
                {/* Large icon at top */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title and subtitle */}
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">
                    {action.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {action.subtitle}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
