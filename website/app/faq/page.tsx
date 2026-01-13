import { getPageContent } from '@/lib/content';
import Accordion from '@/components/ui/Accordion';

export const metadata = {
  title: 'FAQ - Lost Monster',
  description: 'Frequently asked questions about Lost Monster\'s services, process, pricing, and approach to web development.',
};

// Parse FAQ content into accordion items
function parseFAQContent(contentHtml: string) {
  // This is a simple parser - in production you might want more robust parsing
  const items: Array<{ id: string; question: string; answer: string }> = [];
  
  // Split by h2 or h3 headings (questions)
  const sections = contentHtml.split(/<h[23][^>]*>/);
  
  sections.forEach((section, index) => {
    if (index === 0) return; // Skip first empty section
    
    const lines = section.split('</h[23]>');
    if (lines.length >= 2) {
      const question = lines[0].replace(/<[^>]*>/g, '').trim();
      const answer = lines.slice(1).join('').trim();
      
      if (question && answer) {
        items.push({
          id: `faq-${index}`,
          question,
          answer,
        });
      }
    }
  });
  
  // Fallback: if parsing fails, show raw content
  if (items.length === 0) {
    return [{
      id: 'faq-1',
      question: 'FAQ',
      answer: contentHtml,
    }];
  }
  
  return items;
}

export default async function FAQPage() {
  const content = await getPageContent('faq');
  const faqItems = parseFAQContent(content.contentHtml);

  return (
    <div className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-700">
            Everything you need to know about working with Lost Monster
          </p>
        </div>
        <Accordion items={faqItems} />
      </div>
    </div>
  );
}

