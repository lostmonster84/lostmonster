import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Hero Variation E - Experimental - Lost Monster',
  description: 'Experimental hero design: asymmetric layouts, break the grid, creative approach.',
};

export default function HeroVariationE() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Demo Header */}
      <div className="bg-neutral-800 border-b border-neutral-700 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-400">Variation E - Experimental</span>
              <p className="text-xs text-neutral-400 mt-1">Asymmetric layouts, break the grid, creative</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-400 hover:text-primary-300">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Asymmetric */}
            <div className="md:pt-24">
              <div className="inline-block px-4 py-2 bg-primary-600 rounded-full text-sm font-semibold mb-8 transform -rotate-2">
                Framework-Driven
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 leading-[1.1] transform rotate-[-1deg]">
                Systems
                <span className="block text-primary-400 transform rotate-[2deg]">That Work.</span>
              </h1>
            </div>

            {/* Right Column */}
            <div className="md:pt-48">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 transform rotate-[1deg]">
                Websites That Convert.
                <span className="block text-primary-400 mt-2 transform rotate-[-1deg]">Built With Precision.</span>
              </h2>
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed max-w-md">
                We're system designers who turn your business challenges into high-performance digital solutions.
              </p>
              <div className="flex flex-col gap-4 mb-12">
                <Button href="/contact" size="lg" variant="primary" className="transform hover:rotate-1 transition-transform">
                  Start Your Project
                </Button>
                <Button href="/case-studies" size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 transform hover:-rotate-1 transition-transform">
                  See Our Work
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Signals - Scattered */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-primary-600/20 backdrop-blur-sm rounded-xl p-6 border border-primary-500/30 transform rotate-[-2deg]">
              <div className="text-3xl font-heading font-bold text-white mb-1">20,000+</div>
              <div className="text-sm text-neutral-300">Framework Lines</div>
            </div>
            <div className="bg-primary-600/20 backdrop-blur-sm rounded-xl p-6 border border-primary-500/30 transform rotate-[1deg] md:mt-8">
              <div className="text-3xl font-heading font-bold text-white mb-1">80/100</div>
              <div className="text-sm text-neutral-300">Quality Minimum</div>
            </div>
            <div className="bg-primary-600/20 backdrop-blur-sm rounded-xl p-6 border border-primary-500/30 transform rotate-[-1deg]">
              <div className="text-3xl font-heading font-bold text-white mb-1">7+ hours</div>
              <div className="text-sm text-neutral-300">Time Saved</div>
            </div>
            <div className="bg-primary-600/20 backdrop-blur-sm rounded-xl p-6 border border-primary-500/30 transform rotate-[2deg] md:mt-8">
              <div className="text-3xl font-heading font-bold text-white mb-1">3-5%</div>
              <div className="text-sm text-neutral-300">Conversion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Characteristics */}
      <div className="container-custom py-12 border-t border-neutral-700">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-xl font-heading font-bold mb-4">Design Characteristics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-400 mb-2">Pros:</h3>
              <ul className="text-sm text-neutral-300 space-y-1">
                <li>✓ Highly memorable</li>
                <li>✓ Shows innovation and creativity</li>
                <li>✓ Unique, stands out dramatically</li>
                <li>✓ Appeals to creative clients</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400 mb-2">Cons:</h3>
              <ul className="text-sm text-neutral-300 space-y-1">
                <li>⚠ May confuse visitors</li>
                <li>⚠ Accessibility concerns (rotated text)</li>
                <li>⚠ May not convey "systematic"</li>
                <li>⚠ Risk of being too experimental</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-neutral-800 rounded-lg border border-neutral-700">
            <p className="text-sm text-neutral-300">
              <strong>Business Goal Alignment:</strong> Highly memorable and unique. Shows innovation. Risk: may not align with "systematic, reliable" positioning. Accessibility concerns with rotated text. May alienate conservative clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

