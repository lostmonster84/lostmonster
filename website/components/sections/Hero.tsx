import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface HeroProps {
  headline?: string;
  subheadline?: string;
}

const metrics = [
  { label: 'Framework Lines', value: '20,000+', subtext: 'Battle-tested code' },
  { label: 'Quality Standard', value: '80/100', subtext: 'Minimum threshold' },
  { label: 'Time Saved', value: '7+ hours', subtext: 'Per project' },
  { label: 'Conversion Rate', value: '3-5%', subtext: 'Industry avg: 2%' },
];

export default function Hero({ 
  headline = "Systems That Work. Websites That Convert.",
  subheadline = "Framework-driven development with measurable results"
}: HeroProps) {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-4 text-balance">
              {headline}
            </h1>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              {subheadline}
            </p>
          </div>

          {/* Metrics Grid - Data-Driven Approach */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <Card key={index} variant="elevated" className="border-2 border-blue-200 text-center hover-lift">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-neutral-900 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-neutral-600">
                  {metric.subtext}
                </div>
              </Card>
            ))}
          </div>

          {/* Value Prop */}
          <Card variant="elevated" className="bg-white mb-8">
            <p className="text-lg text-neutral-700 text-center max-w-3xl mx-auto leading-relaxed">
              We're not just developers. We're system designers who turn your business challenges into high-performance digital solutions. Framework-driven. Quality-guaranteed. Results-focused.
            </p>
          </Card>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg" variant="primary">
              Start Your Project
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              See Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

