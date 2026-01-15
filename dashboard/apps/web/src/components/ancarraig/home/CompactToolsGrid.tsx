'use client';

import Link from 'next/link';
import { Calculator, DollarSign, CalendarRange, BarChart3, LucideIcon } from 'lucide-react';
import { Card } from '@lostmonster/ui';

interface Tool {
  icon: LucideIcon;
  label: string;
  href: string;
}

const tools: Tool[] = [
  {
    icon: Calculator,
    label: 'Calculator',
    href: '/ancarraig/calculator',
  },
  {
    icon: DollarSign,
    label: 'Costs',
    href: '/ancarraig/costs',
  },
  {
    icon: CalendarRange,
    label: 'Calendar',
    href: '/ancarraig/calendar',
  },
  {
    icon: BarChart3,
    label: 'Comparison',
    href: '/ancarraig/comparison',
  },
];

export function CompactToolsGrid() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">
      {/* Section header */}
      <div className="mb-6">
        <h2 className="text-lg text-muted-foreground">Tools</h2>
      </div>

      {/* Compact tools grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.label} href={tool.href}>
              <Card className="aspect-square cursor-pointer bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <div className="h-full flex flex-col items-center justify-center gap-2 p-3">
                  {/* Icon only - large and centered */}
                  <Icon className="w-6 h-6 text-muted-foreground" />

                  {/* Label below */}
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    {tool.label}
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
