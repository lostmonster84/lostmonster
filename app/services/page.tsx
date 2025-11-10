import Link from 'next/link';
import { getAllServices } from '@/lib/content';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Services - Lost Monster',
  description: 'Lost Monster specializes in booking systems, e-commerce, custom applications, and design systems.',
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            High-performance digital solutions where quality and conversion matter
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card key={service.slug} variant="elevated" className="hover-lift">
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
                {service.title || service.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <div className="prose prose-sm max-w-none mb-6">
                <div dangerouslySetInnerHTML={{ __html: service.contentHtml.substring(0, 300) + '...' }} />
              </div>
              <Button href={`/services/${service.slug}`} variant="primary">
                Learn More →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

