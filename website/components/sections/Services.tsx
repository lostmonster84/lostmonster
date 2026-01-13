import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const services = [
  {
    slug: 'booking-systems',
    title: 'Booking Systems',
    description: 'Frictionless booking flows, trust-building design, conversion optimization for hotels, lodges, tours, and experiences.',
    results: '3-5% conversion rates, 60-70% direct bookings',
    timeline: '8-12 weeks',
    investment: '£25,000 - £45,000',
  },
  {
    slug: 'ecommerce-systems',
    title: 'E-commerce Systems',
    description: 'Conversion-optimized checkout, trust signals, performance tuning for premium brands and D2C businesses.',
    results: '3-6% conversion rates (industry avg: 2-3%)',
    timeline: '10-16 weeks',
    investment: '£30,000 - £60,000',
  },
  {
    slug: 'custom-applications',
    title: 'Custom Web Applications',
    description: 'Purpose-built systems designed around your exact processes for SaaS products, internal tools, and member platforms.',
    results: '50%+ time savings vs manual processes',
    timeline: '12-20 weeks',
    investment: '£40,000 - £75,000+',
  },
  {
    slug: 'design-systems',
    title: 'Design Systems',
    description: 'Component libraries, design tokens, documented patterns for companies with multiple digital products.',
    results: '40%+ faster feature development',
    timeline: '6-10 weeks',
    investment: '£15,000 - £30,000',
  },
];

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Systems That Solve Business Problems
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            We specialize in high-performance digital solutions where quality and conversion matter
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card key={service.slug} variant="elevated" className="hover-lift">
              <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-700 mb-4">
                {service.description}
              </p>
              <div className="mb-6 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs font-semibold text-blue-900 mb-1">Results</div>
                  <div className="text-sm text-neutral-900">{service.results}</div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-xs font-semibold text-neutral-600 mb-1">Timeline</div>
                    <div className="text-neutral-900 font-medium">{service.timeline}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-600 mb-1">Investment</div>
                    <div className="text-neutral-900 font-medium">{service.investment}</div>
                  </div>
                </div>
              </div>
              <Button href={`/services/${service.slug}`} variant="primary">
                Learn More →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

