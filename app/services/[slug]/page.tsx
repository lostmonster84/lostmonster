import { notFound } from 'next/navigation';
import { getServiceContent, getServiceSlugs } from '@/lib/content';
import MarkdownContent from '@/components/ui/MarkdownContent';

export async function generateStaticParams() {
  const slugs = getServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const content = await getServiceContent(slug);
    return {
      title: `${content.title || slug} - Lost Monster Services`,
      description: content.description || `Learn about ${slug} services from Lost Monster.`,
    };
  } catch {
    return {
      title: 'Service Not Found - Lost Monster',
    };
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const content = await getServiceContent(slug);

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

