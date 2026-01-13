import Link from 'next/link';
import Button from '@/components/ui/Button';
import TrustSignals from '@/components/sections/TrustSignals';

export const metadata = {
  title: 'Hero Variation A - Conservative - Lost Monster',
  description: 'Conservative hero design: minimal changes, refined spacing, improved typography hierarchy.',
};

export default function HeroVariationA() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-600">Variation A - Conservative</span>
              <p className="text-xs text-neutral-600 mt-1">Minimal changes, refined spacing, professional approach</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-600 hover:text-primary-700">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6 text-balance leading-tight">
              Systems That Work. Websites That Convert. Built With Precision.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-700 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              We're not just developers. We're system designers who turn your business challenges into high-performance digital solutions. Framework-driven. Quality-guaranteed. Results-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="/contact" size="lg" variant="primary">
                Start Your Project
              </Button>
              <Button href="/case-studies" size="lg" variant="outline">
                See Our Work
              </Button>
            </div>
            <TrustSignals />
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
                <li>✓ Low risk, familiar patterns</li>
                <li>✓ Professional appearance</li>
                <li>✓ Safe for conservative clients</li>
                <li>✓ Easy to implement</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">Cons:</h3>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>⚠ Less differentiation</li>
                <li>⚠ May not showcase innovation</li>
                <li>⚠ Could blend with competitors</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-700">
              <strong>Business Goal Alignment:</strong> Safe choice that appeals to conservative, quality-focused clients. Professional appearance builds trust. May not differentiate Lost Monster enough from competitors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

