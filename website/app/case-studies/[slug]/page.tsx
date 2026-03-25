import { notFound } from 'next/navigation';
import { getCaseStudyContent, getCaseStudySlugs } from '@/lib/content';
import MarkdownContent from '@/components/ui/MarkdownContent';

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const content = await getCaseStudyContent(slug);
    return {
      title: `${content.title || content.client || slug} - Lost Monster Case Study`,
      description: content.results || `See how Lost Monster delivered results for ${slug}.`,
    };
  } catch {
    return {
      title: 'Case Study Not Found - Lost Monster',
    };
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const content = await getCaseStudyContent(slug);

    return (
      <article className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <MarkdownContent content={content.contentHtml} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
