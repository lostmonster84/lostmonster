import HeroPremium from '@/components/sections/HeroPremium';
import ButtonPremium from '@/components/ui/ButtonPremium';
import Link from 'next/link';

export const metadata = {
  title: 'Premium Design Demo - Lost Monster',
  description: 'Showcase of premium visual design with color palettes, micro-interactions, and dramatic effects.',
};

export default function PremiumDemoPage() {
  return (
    <div className="min-h-screen">
      {/* Demo header */}
      <div className="bg-neutral-900 text-white py-4 border-b border-white/10">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-bold">Premium Design Demo</h2>
              <p className="text-sm text-neutral-400">Visual impact, micro-interactions, and premium feel</p>
            </div>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Premium Hero */}
      <HeroPremium />

      {/* Button Showcase */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4 text-center">
              Premium Button Variations
            </h2>
            <p className="text-lg text-neutral-700 mb-12 text-center">
              Buttons with personality, micro-interactions, and visual feedback
            </p>

            <div className="space-y-8">
              {/* Primary buttons */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">Primary Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonPremium variant="primary" size="sm">
                    Small Primary
                  </ButtonPremium>
                  <ButtonPremium variant="primary" size="md">
                    Medium Primary
                  </ButtonPremium>
                  <ButtonPremium variant="primary" size="lg">
                    Large Primary
                  </ButtonPremium>
                  <ButtonPremium variant="primary" size="xl">
                    XL Primary
                  </ButtonPremium>
                </div>
              </div>

              {/* Gradient buttons */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">Gradient Magic</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonPremium variant="gradient" size="md" icon="sparkles">
                    Gradient Button
                  </ButtonPremium>
                  <ButtonPremium variant="gradient" size="lg" icon="zap">
                    Start Project
                  </ButtonPremium>
                </div>
              </div>

              {/* Glow buttons */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">Glow Effect</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonPremium variant="glow" size="md">
                    Glow Button
                  </ButtonPremium>
                  <ButtonPremium variant="glow" size="lg" icon="sparkles">
                    Premium CTA
                  </ButtonPremium>
                </div>
              </div>

              {/* Outline buttons */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">Outline Style</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonPremium variant="outline" size="md">
                    Outline Button
                  </ButtonPremium>
                  <ButtonPremium variant="outline" size="lg" icon="arrow">
                    Learn More
                  </ButtonPremium>
                </div>
              </div>

              {/* Icon variations */}
              <div>
                <h3 className="text-xl font-heading font-semibold mb-4">Icon Options</h3>
                <div className="flex flex-wrap gap-4">
                  <ButtonPremium variant="primary" size="md" icon="arrow">
                    Arrow Icon
                  </ButtonPremium>
                  <ButtonPremium variant="primary" size="md" icon="sparkles">
                    Sparkles Icon
                  </ButtonPremium>
                  <ButtonPremium variant="primary" size="md" icon="zap">
                    Zap Icon
                  </ButtonPremium>
                  <ButtonPremium variant="primary" size="md" icon="none">
                    No Icon
                  </ButtonPremium>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Showcase */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4 text-center">
              Color Palette Explorations
            </h2>
            <p className="text-lg text-neutral-700 mb-12 text-center">
              5 distinct palettes to choose from - each with unique personality
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Deep Ocean (Current) */}
              <div className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-primary-600 hover:shadow-xl transition-all duration-300">
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-600"></div>
                  <div className="w-12 h-12 rounded-lg bg-primary-400"></div>
                  <div className="w-12 h-12 rounded-lg bg-neutral-800"></div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Deep Ocean</h3>
                <p className="text-sm text-neutral-600 mb-2">Professional, trustworthy, data-driven</p>
                <p className="text-xs text-neutral-500">Score: 31/40 (Current)</p>
              </div>

              {/* Emerald Authority */}
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600 shadow-xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-700"></div>
                  <div className="w-12 h-12 rounded-lg bg-warning-500"></div>
                  <div className="w-12 h-12 rounded-lg bg-neutral-900"></div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Emerald Authority</h3>
                <p className="text-sm text-neutral-600 mb-2">Premium, growth-focused, confident</p>
                <p className="text-xs text-emerald-700 font-semibold">Score: 33/40 ⭐ Recommended</p>
              </div>

              {/* Midnight Aurora */}
              <div className="bg-white rounded-2xl p-6 border-2 border-indigo-600 shadow-xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500"></div>
                  <div className="w-12 h-12 rounded-lg bg-accent-teal"></div>
                  <div className="w-12 h-12 rounded-lg bg-neutral-950"></div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Midnight Aurora</h3>
                <p className="text-sm text-neutral-600 mb-2">Dark premium, sophisticated, exclusive</p>
                <p className="text-xs text-indigo-700 font-semibold">Score: 33/40 ⭐ Recommended</p>
              </div>

              {/* Digital Lavender */}
              <div className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-lavender-600 hover:shadow-xl transition-all duration-300">
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-lavender-600"></div>
                  <div className="w-12 h-12 rounded-lg bg-accent-teal"></div>
                  <div className="w-12 h-12 rounded-lg bg-neutral-800"></div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Digital Lavender</h3>
                <p className="text-sm text-neutral-600 mb-2">Innovative, calm, creative</p>
                <p className="text-xs text-neutral-500">Score: 32/40</p>
              </div>

              {/* Mocha Sophistication */}
              <div className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-mocha-700 hover:shadow-xl transition-all duration-300">
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-mocha-700"></div>
                  <div className="w-12 h-12 rounded-lg bg-accent-purple"></div>
                  <div className="w-12 h-12 rounded-lg bg-mocha-900"></div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Mocha Sophistication</h3>
                <p className="text-sm text-neutral-600 mb-2">Warm, premium, elegant</p>
                <p className="text-xs text-neutral-500">Score: 30/40</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/demo/comparison"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                See full comparison →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Design Elements Showcase */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-12 text-center">
              Visual Design Elements
            </h2>

            {/* Gradient backgrounds */}
            <div className="space-y-6">
              <div className="h-64 rounded-2xl bg-gradient-mesh p-8 flex items-center justify-center">
                <p className="text-2xl font-heading font-bold text-neutral-900">Gradient Mesh Background</p>
              </div>

              <div className="h-64 rounded-2xl bg-gradient-to-br from-primary-600 via-indigo-600 to-primary-700 p-8 flex items-center justify-center">
                <p className="text-2xl font-heading font-bold text-white">Gradient Background</p>
              </div>

              <div className="h-64 rounded-2xl glass-light p-8 flex items-center justify-center border">
                <p className="text-2xl font-heading font-bold text-neutral-900">Glassmorphism Effect</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
