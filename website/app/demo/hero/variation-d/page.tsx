import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Hero Variation D - Minimal/Restrained - Lost Monster',
  description: 'Minimal hero design: maximum white space, minimal decoration, focus on content.',
};

export default function HeroVariationD() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-600">Variation D - Minimal/Restrained</span>
              <p className="text-xs text-neutral-600 mt-1">Maximum white space, minimal decoration, premium feel</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-600 hover:text-primary-700">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="py-24 md:py-32">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-light text-neutral-900 mb-8 text-balance leading-[1.1] tracking-tight">
              Systems That Work.
              <br />
              Websites That Convert.
              <br />
              Built With Precision.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed font-light max-w-2xl">
              We're not just developers. We're system designers who turn your business challenges into high-performance digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button href="/contact" size="lg" variant="primary" className="min-w-[200px]">
                Start Your Project
              </Button>
              <Button href="/case-studies" size="lg" variant="outline" className="min-w-[200px]">
                See Our Work
              </Button>
            </div>
            <div className="pt-12 border-t border-neutral-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-2xl font-heading font-light text-neutral-900 mb-1">20,000+</div>
                  <div className="text-xs text-neutral-600 uppercase tracking-wide">Framework Lines</div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-light text-neutral-900 mb-1">80/100</div>
                  <div className="text-xs text-neutral-600 uppercase tracking-wide">Quality Minimum</div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-light text-neutral-900 mb-1">7+ hours</div>
                  <div className="text-xs text-neutral-600 uppercase tracking-wide">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-light text-neutral-900 mb-1">3-5%</div>
                  <div className="text-xs text-neutral-600 uppercase tracking-wide">Conversion Rate</div>
                </div>
              </div>
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
                <li>✓ Premium, luxurious feel</li>
                <li>✓ Timeless, won't date quickly</li>
                <li>✓ Professional and refined</li>
                <li>✓ Focuses attention on content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">Cons:</h3>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>⚠ May feel empty or sparse</li>
                <li>⚠ Less engaging visually</li>
                <li>⚠ May not stand out enough</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-700">
              <strong>Business Goal Alignment:</strong> Premium positioning aligns with Lost Monster's target audience. Restrained approach conveys confidence. Risk: may not differentiate enough or engage visitors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

