'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-neutral-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-semibold text-neutral-900 pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-neutral-500 flex-shrink-0 transition-transform',
                  isOpen && 'transform rotate-180'
                )}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-6 py-4 text-neutral-700 prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

