import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Layout Variation E - Experimental - Lost Monster',
  description: 'Experimental layout: unexpected color combinations, asymmetric creative layouts, bold typography choices.',
};

export default function LayoutVariationE() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-orange-200 to-pink-200 border-b-4 border-yellow-400 py-3">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-orange-900">Layout Variation E - Experimental</span>
              <p className="text-xs text-orange-800 mt-1">Unexpected colors, asymmetric layouts</p>
            </div>
            <Link href="/demo" className="text-sm font-bold text-orange-900 hover:text-orange-700">
              ← Back to Demo Index
            </Link>
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-600 to-yellow-600 mb-4 transform rotate-[-2deg]">
              Experimental Palette
            </h1>
            <p className="text-lg text-neutral-700 transform rotate-[1deg]">
              Unexpected color combinations create unique, memorable experiences
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-orange-900 mb-6 transform rotate-[1deg]">
              Bold Color Combinations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center transform rotate-[-1deg]">
                <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-3 shadow-lg border-4 border-orange-300"></div>
                <div className="text-sm font-bold text-orange-900">Orange</div>
              </div>
              <div className="text-center transform rotate-[1deg] md:mt-8">
                <div className="h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-3 shadow-lg border-4 border-pink-300"></div>
                <div className="text-sm font-bold text-pink-900">Pink</div>
              </div>
              <div className="text-center transform rotate-[-1deg]">
                <div className="h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-3 shadow-lg border-4 border-yellow-300"></div>
                <div className="text-sm font-bold text-yellow-900">Yellow</div>
              </div>
              <div className="text-center transform rotate-[2deg] md:mt-8">
                <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-3 shadow-lg border-4 border-purple-300"></div>
                <div className="text-sm font-bold text-purple-900">Purple</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-pink-900 mb-6 transform rotate-[-1deg]">
              Asymmetric Layout System
            </h2>
            <div className="space-y-6">
              <Card variant="elevated" className="bg-gradient-to-br from-orange-100 to-pink-100 border-4 border-orange-300 transform rotate-[-1deg]">
                <h3 className="text-2xl font-heading font-black text-orange-900 mb-3 transform rotate-[1deg]">
                  Creative Typography
                </h3>
                <p className="text-neutral-800 mb-4 font-medium">
                  Bold, unexpected typography choices create visual interest and break traditional patterns.
                </p>
                <Button variant="primary" className="bg-orange-600 text-white hover:bg-orange-700 transform hover:rotate-2 transition-transform">
                  Experimental CTA
                </Button>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card variant="elevated" className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-300 transform rotate-[1deg]">
                  <h3 className="text-xl font-heading font-bold text-yellow-900 mb-2">Asymmetric Card</h3>
                  <p className="text-neutral-800 text-sm">This card is rotated slightly for visual interest.</p>
                </Card>
                
                <Card variant="elevated" className="bg-gradient-to-br from-pink-100 to-purple-100 border-4 border-pink-300 transform rotate-[-1deg] md:mt-8">
                  <h3 className="text-xl font-heading font-bold text-pink-900 mb-2">Offset Layout</h3>
                  <p className="text-neutral-800 text-sm">Strategic rotation creates dynamic composition.</p>
                </Card>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-orange-200 to-pink-200 rounded-2xl border-4 border-yellow-400 transform rotate-[-1deg]">
            <h3 className="font-bold text-orange-900 mb-3 transform rotate-[1deg]">Characteristics</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-green-800 block mb-2">Pros:</strong>
                <ul className="text-neutral-800 space-y-1">
                  <li>✓ Highly memorable</li>
                  <li>✓ Unique and creative</li>
                  <li>✓ Stands out dramatically</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-800 block mb-2">Cons:</strong>
                <ul className="text-neutral-800 space-y-1">
                  <li>⚠ May confuse visitors</li>
                  <li>⚠ Accessibility concerns</li>
                  <li>⚠ Too experimental for some</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

