import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Hero Variation C - Data-Driven - Lost Monster',
  description: 'Data-Driven hero design: metrics and proof prominent, trust signals emphasized.',
};

const metrics = [
  { label: 'Framework Lines', value: '20,000+', subtext: 'Battle-tested code' },
  { label: 'Quality Standard', value: '80/100', subtext: 'Minimum threshold' },
  { label: 'Time Saved', value: '7+ hours', subtext: 'Per project' },
  { label: 'Conversion Rate', value: '3-5%', subtext: 'Industry avg: 2%' },
];

export default function HeroVariationC() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-600">Variation C - Data-Driven</span>
              <p className="text-xs text-neutral-600 mt-1">Metrics prominent, trust signals, results-focused</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-600 hover:text-primary-700">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-4 text-balance">
                Systems That Work. Websites That Convert.
              </h1>
              <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
                Framework-driven development with measurable results
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border-2 border-neutral-200 shadow-sm">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {metric.subtext}
                  </div>
                </div>
              ))}
            </div>

            {/* Value Prop */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200 mb-8">
              <p className="text-lg text-neutral-700 text-center max-w-3xl mx-auto leading-relaxed">
                We're not just developers. We're system designers who turn your business challenges into high-performance digital solutions. Framework-driven. Quality-guaranteed. Results-focused.
              </p>
            </div>

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

      {/* Characteristics */}
      <div className="container-custom py-12 border-t border-neutral-200">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">Design Characteristics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-2">Pros:</h3>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>✓ Builds credibility through proof</li>
                <li>✓ Results-focused messaging</li>
                <li>✓ Trust-building metrics</li>
                <li>✓ Appeals to data-driven clients</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">Cons:</h3>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>⚠ May feel cold or clinical</li>
                <li>⚠ Less emotional connection</li>
                <li>⚠ May overwhelm with numbers</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-700">
              <strong>Business Goal Alignment:</strong> Strong alignment with results-focused positioning. Metrics build trust. May appeal to analytical, data-driven clients. Risk: may feel less warm/human.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

