import { getPageContent } from '@/lib/content';
import MarkdownContent from '@/components/ui/MarkdownContent';

export const metadata = {
  title: 'Our Process - Lost Monster',
  description: 'Learn about Lost Monster\'s six-phase process from discovery to launch. Framework-driven, quality-guaranteed.',
};

export default async function ProcessPage() {
  const content = await getPageContent('process');

  return (
    <article className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <MarkdownContent content={content.contentHtml} />
      </div>
    </article>
  );
}

