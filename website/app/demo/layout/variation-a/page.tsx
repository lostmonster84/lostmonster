import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Layout Variation A - Conservative - Lost Monster',
  description: 'Conservative layout: current blue palette refined, centered layouts, balanced visual weight.',
};

export default function LayoutVariationA() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Header */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-primary-600">Layout Variation A - Conservative</span>
              <p className="text-xs text-neutral-600 mt-1">Current blue palette refined, centered layouts</p>
            </div>
            <Link href="/demo" className="text-sm text-primary-600 hover:text-primary-700">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-8 text-center">
            Color Palette & Layout System
          </h1>
          
          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">Primary Colors</h2>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="h-20 bg-primary-50 rounded-lg mb-2 border border-neutral-200"></div>
                <div className="text-xs text-neutral-600">50</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-primary-300 rounded-lg mb-2 border border-neutral-200"></div>
                <div className="text-xs text-neutral-600">300</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-primary-600 rounded-lg mb-2 border border-neutral-200"></div>
                <div className="text-xs text-neutral-600 font-semibold">600 (Primary)</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-primary-800 rounded-lg mb-2 border border-neutral-200"></div>
                <div className="text-xs text-neutral-600">800</div>
              </div>
              <div className="text-center">
                <div className="h-20 bg-primary-900 rounded-lg mb-2 border border-neutral-200"></div>
                <div className="text-xs text-neutral-600">900</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold text-neutral-900 mb-4">Layout Example</h2>
            <div className="space-y-6">
              <Card variant="elevated">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">Centered Content Layout</h3>
                <p className="text-neutral-700 mb-4">
                  This variation uses centered, max-width containers for a balanced, professional appearance. Content is easy to scan and read.
                </p>
                <Button variant="primary">Example CTA</Button>
              </Card>
              
              <Card variant="outlined">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">Balanced Visual Weight</h3>
                <p className="text-neutral-700">
                  Text and visual elements are balanced. No single element dominates, creating a harmonious, professional feel.
                </p>
              </Card>
            </div>
          </div>

          <div className="p-6 bg-neutral-50 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-2">Characteristics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-green-700">Pros:</strong>
                <ul className="text-neutral-700 mt-1 space-y-1">
                  <li>✓ Safe, familiar patterns</li>
                  <li>✓ Professional appearance</li>
                  <li>✓ Easy to implement</li>
                </ul>
              </div>
              <div>
                <strong className="text-orange-700">Cons:</strong>
                <ul className="text-neutral-700 mt-1 space-y-1">
                  <li>⚠ Less differentiation</li>
                  <li>⚠ May blend with competitors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

