import { getPageContent } from '@/lib/content';
import MarkdownContent from '@/components/ui/MarkdownContent';

export const metadata = {
  title: 'About Us - Lost Monster',
  description: 'We\'re system designers, not code cowboys. Learn about Lost Monster\'s framework-driven approach to web development.',
};

export default async function AboutPage() {
  const content = await getPageContent('about');

  return (
    <article className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <MarkdownContent content={content.contentHtml} />
      </div>
    </article>
  );
}

