import { getCaseStudyContent } from '@/lib/content';
import MarkdownContent from '@/components/ui/MarkdownContent';

export const metadata = {
  title: 'Ancarraig Highland Lodges Case Study - Lost Monster',
  description: 'How Lost Monster helped Ancarraig achieve 70% direct bookings and save £40,000+ annually in OTA commissions.',
};

export default async function AncarraigCaseStudyPage() {
  const content = await getCaseStudyContent('ancarraig');

  return (
    <article className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <MarkdownContent content={content.contentHtml} />
      </div>
    </article>
  );
}

