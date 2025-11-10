import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        'prose prose-lg prose-neutral max-w-none',
        'prose-headings:font-heading prose-headings:text-neutral-900',
        'prose-p:text-neutral-700 prose-p:leading-relaxed',
        'prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-neutral-900 prose-strong:font-semibold',
        'prose-ul:list-disc prose-ol:list-decimal',
        'prose-li:text-neutral-700',
        'prose-code:text-primary-600 prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-neutral-900 prose-pre:text-neutral-100',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary-600 prose-blockquote:pl-4 prose-blockquote:italic',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

