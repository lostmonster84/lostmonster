import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Layout Variation D - Minimal - Lost Monster',
  description: 'Minimal layout: monochromatic with single accent, generous white space, restrained typography.',
};

export default function LayoutVariationD() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-neutral-600">Layout Variation D - Minimal</span>
              <p className="text-xs text-neutral-500 mt-1">Monochromatic, generous white space</p>
            </div>
            <Link href="/demo" className="text-sm text-neutral-600 hover:text-neutral-900">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="py-24">
            <h1 className="text-4xl md:text-5xl font-heading font-light text-neutral-900 mb-12 text-center tracking-tight">
              Minimal Color Palette
            </h1>
            
            <div className="mb-16">
              <h2 className="text-lg font-heading font-light text-neutral-700 mb-6 text-center uppercase tracking-wider">
                Monochromatic with Single Accent
              </h2>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-neutral-900 rounded-lg mb-3"></div>
                  <div className="text-xs text-neutral-600 uppercase">Black</div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-neutral-600 rounded-lg mb-3"></div>
                  <div className="text-xs text-neutral-600 uppercase">Gray</div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-neutral-200 rounded-lg mb-3 border border-neutral-300"></div>
                  <div className="text-xs text-neutral-600 uppercase">Light Gray</div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-white border-2 border-neutral-900 rounded-lg mb-3"></div>
                  <div className="text-xs text-neutral-600 uppercase">White</div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary-600 rounded-lg mb-3"></div>
                  <div className="text-xs text-neutral-600 uppercase">Accent</div>
                </div>
              </div>
            </div>

            <div className="mb-16 space-y-12">
              <div className="text-center">
                <h2 className="text-2xl font-heading font-light text-neutral-900 mb-4">
                  Generous White Space
                </h2>
                <p className="text-neutral-600 max-w-xl mx-auto leading-relaxed">
                  This variation uses extensive white space to create a premium, luxurious feel. Content breathes, and every element has room to exist.
                </p>
              </div>
              
              <Card variant="outlined" className="bg-neutral-50 border-neutral-200">
                <h3 className="text-lg font-heading font-light text-neutral-900 mb-3">
                  Restrained Typography
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  Typography is light and restrained. No bold declarations, just quiet confidence.
                </p>
                <Button variant="primary" size="sm" className="bg-neutral-900 text-white hover:bg-neutral-800">
                  Minimal CTA
                </Button>
              </Card>
            </div>

            <div className="p-8 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="font-light text-neutral-900 mb-3 text-center">Characteristics</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="text-center">
                  <strong className="text-neutral-700 block mb-2">Pros:</strong>
                  <ul className="text-neutral-600 space-y-1">
                    <li>✓ Premium feel</li>
                    <li>✓ Timeless</li>
                    <li>✓ Professional</li>
                  </ul>
                </div>
                <div className="text-center">
                  <strong className="text-neutral-700 block mb-2">Cons:</strong>
                  <ul className="text-neutral-600 space-y-1">
                    <li>⚠ May feel empty</li>
                    <li>⚠ Less engaging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

