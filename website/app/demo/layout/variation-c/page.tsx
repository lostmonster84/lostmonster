import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Layout Variation C - Data-Driven - Lost Monster',
  description: 'Data-Driven layout: professional blue/gray palette, metrics-focused layouts, charts and data visualization.',
};

export default function LayoutVariationC() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-600">Layout Variation C - Data-Driven</span>
              <p className="text-xs text-neutral-600 mt-1">Professional blue/gray, metrics-focused</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-600 hover:text-primary-700">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-8 text-center">
            Professional Data-Driven Palette
          </h1>
          
          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">Color Palette</h2>
            <div className="grid grid-cols-6 gap-4">
              <div className="text-center">
                <div className="h-20 bg-blue-600 rounded-lg mb-2 border-2 border-blue-700"></div>
                <div className="text-xs text-neutral-600">Blue Primary</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-slate-600 rounded-lg mb-2 border-2 border-slate-700"></div>
                <div className="text-xs text-neutral-600">Slate</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-emerald-600 rounded-lg mb-2 border-2 border-emerald-700"></div>
                <div className="text-xs text-neutral-600">Success</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-amber-600 rounded-lg mb-2 border-2 border-amber-700"></div>
                <div className="text-xs text-neutral-600">Warning</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-red-600 rounded-lg mb-2 border-2 border-red-700"></div>
                <div className="text-xs text-neutral-600">Error</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-neutral-200 rounded-lg mb-2 border-2 border-neutral-300"></div>
                <div className="text-xs text-neutral-600">Neutral</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">Metrics-Focused Layout</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card variant="elevated" className="border-2 border-blue-200">
                <div className="text-4xl font-heading font-bold text-blue-600 mb-2">20,000+</div>
                <div className="text-sm font-semibold text-neutral-900 mb-1">Framework Lines</div>
                <div className="text-xs text-neutral-600">Battle-tested code</div>
              </Card>
              
              <Card variant="elevated" className="border-2 border-emerald-200">
                <div className="text-4xl font-heading font-bold text-emerald-600 mb-2">80/100</div>
                <div className="text-sm font-semibold text-neutral-900 mb-1">Quality Minimum</div>
                <div className="text-xs text-neutral-600">Enforced standard</div>
              </Card>
            </div>
            
            <Card variant="elevated" className="bg-neutral-900 text-white">
              <h3 className="text-xl font-heading font-bold mb-4">Data Visualization Focus</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">3-5%</div>
                  <div className="text-xs text-neutral-300">Conversion</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">7+</div>
                  <div className="text-xs text-neutral-300">Hours Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <div className="text-xs text-neutral-300">Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">5</div>
                  <div className="text-xs text-neutral-300">Variations</div>
                </div>
              </div>
              <p className="text-sm text-neutral-300">
                Metrics and data are prominently displayed to build credibility and trust.
              </p>
            </Card>
          </div>

          <div className="p-6 bg-neutral-100 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">Characteristics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-green-700">Pros:</strong>
                <ul className="text-neutral-700 mt-1 space-y-1">
                  <li>✓ Builds credibility</li>
                  <li>✓ Results-focused</li>
                  <li>✓ Professional appearance</li>
                </ul>
              </div>
              <div>
                <strong className="text-orange-700">Cons:</strong>
                <ul className="text-neutral-700 mt-1 space-y-1">
                  <li>⚠ May feel clinical</li>
                  <li>⚠ Less emotional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

