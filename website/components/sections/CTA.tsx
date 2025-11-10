import Link from 'next/link';
import Button from '@/components/ui/Button';

interface CTAProps {
  headline?: string;
  subheadline?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function CTA({
  headline = 'Start Your Project',
  subheadline = 'Three ways to begin:',
  primaryAction = {
    label: 'Book Discovery Call',
    href: '/contact',
  },
  secondaryAction = {
    label: 'Download Process Guide',
    href: '/process',
  },
}: CTAProps) {
  return (
    <section className="section-padding bg-primary-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {headline}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {subheadline}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold mb-2">1. Project Brief Call</h3>
              <p className="text-sm text-primary-100 mb-4">30 min, free</p>
              <Button href={primaryAction.href} variant="secondary" size="sm">
                {primaryAction.label}
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold mb-2">2. Written Brief</h3>
              <p className="text-sm text-primary-100 mb-4">Email us your requirements</p>
              <Button href="/contact" variant="secondary" size="sm">
                Send Project Brief
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold mb-2">3. Review Process</h3>
              <p className="text-sm text-primary-100 mb-4">Read our full documentation</p>
              <Button href={secondaryAction.href} variant="secondary" size="sm">
                {secondaryAction.label}
              </Button>
            </div>
          </div>
          <p className="text-sm text-primary-100">
            Typical Timeline: Week 1 (Discovery) → Week 2 (Proposal) → Week 3-4 (Contract & Kickoff) → Week 5+ (Project Begins)
          </p>
        </div>
      </div>
    </section>
  );
}

