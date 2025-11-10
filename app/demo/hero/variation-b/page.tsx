import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Hero Variation B - Modern/Bold - Lost Monster',
  description: 'Modern/Bold hero design: bold colors, dynamic layouts, experimental typography.',
};

const trustSignals = [
  { value: '20,000+', label: 'lines of frameworks' },
  { value: '80/100', label: 'quality minimum' },
  { value: '7+ hours', label: 'saved per project' },
  { value: '3-5%', label: 'conversion rates' },
];

export default function HeroVariationB() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      {/* Demo Header */}
      <div className="bg-primary-900/50 backdrop-blur-sm border-b border-primary-500/30 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-200">Variation B - Modern/Bold</span>
              <p className="text-xs text-primary-200/80 mt-1">Bold colors, dynamic layouts, push boundaries</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-200 hover:text-white">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                  Framework-Driven Development
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 text-balance leading-[1.1]">
                  Systems That Work.
                  <span className="block text-primary-200">Websites That Convert.</span>
                  <span className="block">Built With Precision.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  We're system designers who turn business challenges into high-performance digital solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button href="/contact" size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-white/90">
                    Start Your Project
                  </Button>
                  <Button href="/case-studies" size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                    See Our Work
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {trustSignals.map((signal, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                      {signal.value}
                    </div>
                    <div className="text-sm text-white/80">
                      {signal.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characteristics */}
      <div className="container-custom py-12 border-t border-primary-500/30">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-xl font-heading font-bold mb-4">Design Characteristics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-300 mb-2">Pros:</h3>
              <ul className="text-sm text-white/90 space-y-1">
                <li>✓ Stands out from competitors</li>
                <li>✓ Shows creativity and innovation</li>
                <li>✓ Memorable and bold</li>
                <li>✓ Modern, forward-thinking</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">Cons:</h3>
              <ul className="text-sm text-white/90 space-y-1">
                <li>⚠ May feel too bold for conservative clients</li>
                <li>⚠ Risk of alienating some audience</li>
                <li>⚠ May not convey "systematic" feel</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-sm text-white/90">
              <strong>Business Goal Alignment:</strong> Bold, memorable design that differentiates Lost Monster. May appeal to clients seeking innovation. Risk: may not align with "systematic, reliable" positioning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

