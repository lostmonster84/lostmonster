import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Layout Variation B - Modern - Lost Monster',
  description: 'Modern layout: bold color combinations, dynamic grid layouts, strong visual hierarchy.',
};

export default function LayoutVariationB() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Demo Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-purple-300">Layout Variation B - Modern</span>
              <p className="text-xs text-white/70 mt-1">Bold colors, dynamic grids, strong hierarchy</p>
            </div>
            <Link href="/demo" className="text-sm text-purple-300 hover:text-purple-200">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
            Bold Color Palette & Dynamic Layout
          </h1>
          
          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold mb-4">Color Palette</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="h-24 bg-purple-600 rounded-lg mb-2 border-2 border-purple-400"></div>
                <div className="text-xs">Purple</div>
              </div>
              <div className="text-center">
                <div className="h-24 bg-blue-600 rounded-lg mb-2 border-2 border-blue-400"></div>
                <div className="text-xs">Blue</div>
              </div>
              <div className="text-center">
                <div className="h-24 bg-indigo-600 rounded-lg mb-2 border-2 border-indigo-400"></div>
                <div className="text-xs">Indigo</div>
              </div>
              <div className="text-center">
                <div className="h-24 bg-pink-600 rounded-lg mb-2 border-2 border-pink-400"></div>
                <div className="text-xs">Pink Accent</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold mb-4">Dynamic Grid Layout</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card variant="elevated" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <h3 className="text-xl font-heading font-bold mb-3">Bold Typography</h3>
                <p className="text-white/90 mb-4">
                  Strong visual hierarchy with bold colors and dynamic layouts creates memorable impact.
                </p>
                <Button variant="secondary" className="bg-white text-purple-900 hover:bg-white/90">
                  CTA Button
                </Button>
              </Card>
              
              <Card variant="elevated" className="bg-white/10 backdrop-blur-sm border-white/20 text-white md:col-span-2">
                <h3 className="text-xl font-heading font-bold mb-3">Asymmetric Grid</h3>
                <p className="text-white/90">
                  This card spans 2 columns, creating visual interest and breaking the standard grid pattern.
                </p>
              </Card>
              
              <Card variant="elevated" className="bg-white/10 backdrop-blur-sm border-white/20 text-white md:col-span-2">
                <h3 className="text-xl font-heading font-bold mb-3">Full Width Emphasis</h3>
                <p className="text-white/90">
                  Strategic use of grid spans creates emphasis and guides the eye.
                </p>
              </Card>
              
              <Card variant="elevated" className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <h3 className="text-xl font-heading font-bold mb-3">Accent Card</h3>
                <p className="text-white/90">Smaller card for balance.</p>
              </Card>
            </div>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <h3 className="font-semibold mb-2">Characteristics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-green-300">Pros:</strong>
                <ul className="text-white/90 mt-1 space-y-1">
                  <li>✓ Highly memorable</li>
                  <li>✓ Modern, forward-thinking</li>
                  <li>✓ Strong visual impact</li>
                </ul>
              </div>
              <div>
                <strong className="text-orange-300">Cons:</strong>
                <ul className="text-white/90 mt-1 space-y-1">
                  <li>⚠ May be too bold</li>
                  <li>⚠ Risk of overwhelming</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

