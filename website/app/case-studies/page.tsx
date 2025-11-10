import Link from 'next/link';
import { getAllCaseStudies } from '@/lib/content';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Case Studies - Lost Monster',
  description: 'See how Lost Monster has helped clients achieve exceptional results with framework-driven development.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Real results from real projects. See how our framework-driven approach delivers measurable outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((caseStudy) => (
            <Card key={caseStudy.slug} variant="elevated" className="hover-lift">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
                {caseStudy.title || caseStudy.client || caseStudy.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              {caseStudy.industry && (
                <p className="text-sm text-neutral-600 mb-3">Industry: {caseStudy.industry}</p>
              )}
              <div className="prose prose-sm max-w-none mb-6">
                <div dangerouslySetInnerHTML={{ __html: caseStudy.contentHtml.substring(0, 300) + '...' }} />
              </div>
              <Button href={`/case-studies/${caseStudy.slug}`} variant="primary">
                Read Case Study →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

