import Link from 'next/link';
import { Code2, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Scandi-Scot Design Variations - Lost Monster',
  description: '5 variations following Lost Monster\'s own Scandi-Scot design principles',
};

const metrics = [
  { label: 'Framework Lines', value: '20,000+', subtext: 'Battle-tested code', icon: Code2 },
  { label: 'Quality Standard', value: '80/100', subtext: 'Minimum threshold', icon: CheckCircle2 },
  { label: 'Time Saved', value: '7+ hours', subtext: 'Per project', icon: Zap },
  { label: 'Conversion Rate', value: '3-5%', subtext: 'Industry avg: 2%', icon: TrendingUp },
];

export default function ScandiDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo header */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-6">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="text-sm text-primary-600 hover:text-primary-700 mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-3">
              Scandi-Scot Hero Variations
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              5 variations following Lost Monster's own design principles:
            </p>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>✅ NO gradients (solid colors only)</li>
              <li>✅ NO glassmorphism abuse (flat design)</li>
              <li>✅ NO floating orbs (clean backgrounds)</li>
              <li>✅ MAX text-5xl / 48px typography (premium restraint)</li>
              <li>✅ Generous white space (not cluttered)</li>
              <li>✅ Flat design with subtle shadows</li>
            </ul>
          </div>
        </div>
      </div>

      {/* VARIATION A: Conservative Flat */}
      <section className="py-16 border-b-4 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Variation A: Conservative Flat
            </h2>
            <p className="text-neutral-600 mb-4">
              Minimal change from existing patterns. Safe, professional, clean.
            </p>
          </div>

          {/* Implementation */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-full">
                Framework-Driven Development Agency
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 text-center mb-6 tracking-tight">
              Systems That Work.
              <br />
              Websites That Convert.
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              We build high-performance digital solutions with measurable results, guaranteed quality, and systematic process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
                Start Your Project
              </a>
              <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-neutral-700 bg-white border-2 border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors">
                See Our Work
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                    <div className="mb-4">
                      <Icon className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
                    </div>
                    <div className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-neutral-700 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {metric.subtext}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Characteristics */}
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-4">Characteristics:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Strengths:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Clean, professional appearance</li>
                  <li>• Follows Scandi-Scot principles perfectly</li>
                  <li>• Easy to maintain and extend</li>
                  <li>• Accessible and performant</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Considerations:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Less visual drama than gradient approach</li>
                  <li>• May feel "safe" vs innovative</li>
                  <li>• Differentiation through restraint</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong>Best for:</strong> Agencies wanting to demonstrate systematic, professional approach. Practice what we preach.
            </p>
          </div>
        </div>
      </section>

      {/* VARIATION B: Modern Flat */}
      <section className="py-16 bg-neutral-50 border-b-4 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Variation B: Modern Flat
            </h2>
            <p className="text-neutral-600 mb-4">
              Bold solid colors, clean lines, generous spacing. Flat but striking.
            </p>
          </div>

          {/* Implementation */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 text-sm font-bold text-primary-700 bg-primary-50 border-2 border-primary-200 rounded-full uppercase tracking-wider">
                Framework-Driven Agency
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 text-center mb-6 tracking-tight">
              Build Systems.
              <br />
              <span className="text-primary-600">Drive Results.</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              High-performance digital solutions. Measurable outcomes. No surprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="#" className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors shadow-md">
                Start Your Project
              </a>
              <a href="#" className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-primary-600 bg-white border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-colors">
                See Our Work
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 border-2 border-neutral-200 shadow-sm hover:border-primary-600 hover:shadow-md transition-all">
                    <div className="mb-4">
                      <div className="inline-flex p-3 bg-primary-50 rounded-lg">
                        <Icon className="w-6 h-6 text-primary-600" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-bold text-neutral-900 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {metric.subtext}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Characteristics */}
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl border-2 border-neutral-200 shadow-sm">
            <h3 className="font-semibold text-neutral-900 mb-4">Characteristics:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Strengths:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Bold without being loud</li>
                  <li>• Strong visual hierarchy</li>
                  <li>• Follows flat design principle</li>
                  <li>• Modern, confident appearance</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Considerations:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Bolder than conservative approach</li>
                  <li>• May not appeal to ultra-conservative clients</li>
                  <li>• Still restrained vs gradient approach</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong>Best for:</strong> Agencies wanting modern look while following Scandi-Scot principles. Confident but not loud.
            </p>
          </div>
        </div>
      </section>

      {/* VARIATION C: Minimal Restrained */}
      <section className="py-16 border-b-4 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Variation C: Minimal Restrained
            </h2>
            <p className="text-neutral-600 mb-4">
              Maximum white space. Ultimate restraint. Premium through simplicity.
            </p>
          </div>

          {/* Implementation */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-8 tracking-tight leading-tight">
                Systems That Work.
                <br />
                Websites That Convert.
              </h1>

              <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-12">
                Framework-driven development with measurable results.
              </p>

              <div className="inline-flex gap-6">
                <a href="#" className="text-base font-medium text-primary-600 hover:text-primary-700 underline underline-offset-4">
                  Start Your Project →
                </a>
                <a href="#" className="text-base font-medium text-neutral-600 hover:text-neutral-900">
                  See Our Work
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="flex items-start gap-4 py-6 border-b border-neutral-200 last:border-0">
                    <Icon className="w-6 h-6 text-neutral-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-2xl font-heading font-bold text-neutral-900">{metric.value}</span>
                        <span className="text-sm font-medium text-neutral-600">{metric.label}</span>
                      </div>
                      <p className="text-xs text-neutral-500">{metric.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Characteristics */}
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-4">Characteristics:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Strengths:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Ultimate restraint - premium through simplicity</li>
                  <li>• Maximum white space and breathing room</li>
                  <li>• Timeless, won't date</li>
                  <li>• Fastest to load, most accessible</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Considerations:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• May feel sparse to some</li>
                  <li>• Less visual "pop" than others</li>
                  <li>• Relies on content quality</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong>Best for:</strong> Ultimate expression of "premium restraint" principle. Confident enough not to shout.
            </p>
          </div>
        </div>
      </section>

      {/* VARIATION D: Data-Driven Flat */}
      <section className="py-16 bg-neutral-50 border-b-4 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Variation D: Data-Driven Flat
            </h2>
            <p className="text-neutral-600 mb-4">
              Metrics prominent. Results-focused. Flat design with data emphasis.
            </p>
          </div>

          {/* Implementation */}
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-200 rounded-md mb-6">
                  PROVEN RESULTS
                </span>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6 tracking-tight">
                  Systems That Work.
                  <br />
                  Websites That Convert.
                </h1>

                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Framework-driven development with measurable results. 80/100 quality minimum. No guesswork.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
                    Start Your Project
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-neutral-700 border-2 border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors">
                    View Case Studies
                  </a>
                </div>
              </div>

              {/* Right: Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg p-6 border border-neutral-200">
                      <Icon className="w-6 h-6 text-primary-600 mb-3" strokeWidth={1.5} />
                      <div className="text-3xl font-heading font-bold text-neutral-900 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs font-semibold text-neutral-700 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {metric.subtext}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl border-2 border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-4">Characteristics:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Strengths:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Metrics front and center</li>
                  <li>• Appeals to analytical clients</li>
                  <li>• Flat design with data focus</li>
                  <li>• Clear value proposition</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Considerations:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• More structured layout</li>
                  <li>• May feel clinical to some</li>
                  <li>• Works best with strong metrics</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong>Best for:</strong> Data-driven clients who value proof. Metrics without gradient/glass effects.
            </p>
          </div>
        </div>
      </section>

      {/* VARIATION E: Nordic-Inspired */}
      <section className="py-16 border-b-4 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
              Variation E: Nordic-Inspired
            </h2>
            <p className="text-neutral-600 mb-4">
              True Scandi-Scot fusion. Clean typography, subtle accents, generous space.
            </p>
          </div>

          {/* Implementation */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block w-12 h-1 bg-primary-600 mb-8"></div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
                Systems That Work.
                <br />
                Websites That Convert.
              </h1>

              <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-12 leading-relaxed">
                Framework-driven development with measurable results, guaranteed quality, systematic process.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors">
                  Start Your Project
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-neutral-900 hover:text-primary-600 transition-colors">
                  See Our Work →
                </a>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-heading font-bold text-neutral-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-neutral-600 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {metric.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-4">Characteristics:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Strengths:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• True Nordic minimalism aesthetic</li>
                  <li>• Clean, timeless design</li>
                  <li>• Generous white space throughout</li>
                  <li>• Sophisticated without being cold</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Considerations:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>• Very restrained - may feel understated</li>
                  <li>• Requires confidence to pull off</li>
                  <li>• Different from typical agency sites</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              <strong>Best for:</strong> True expression of Scandi-Scot philosophy. Nordic minimalism meets Highland warmth.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Summary */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-8 text-center">
              Which Variation Works Best?
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white border-b-2 border-neutral-300">
                    <th className="text-left p-4 font-semibold text-neutral-900">Variation</th>
                    <th className="text-left p-4 font-semibold text-neutral-900">Personality</th>
                    <th className="text-left p-4 font-semibold text-neutral-900">Best For</th>
                    <th className="text-left p-4 font-semibold text-neutral-900">Scandi-Scot Alignment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="p-4 font-semibold">A: Conservative</td>
                    <td className="p-4 text-sm text-neutral-600">Safe, professional</td>
                    <td className="p-4 text-sm text-neutral-600">Easy transition</td>
                    <td className="p-4 text-sm text-green-700">✅ Perfect</td>
                  </tr>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="p-4 font-semibold">B: Modern Flat</td>
                    <td className="p-4 text-sm text-neutral-600">Bold, confident</td>
                    <td className="p-4 text-sm text-neutral-600">Modern agencies</td>
                    <td className="p-4 text-sm text-green-700">✅ Perfect</td>
                  </tr>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="p-4 font-semibold">C: Minimal</td>
                    <td className="p-4 text-sm text-neutral-600">Ultimate restraint</td>
                    <td className="p-4 text-sm text-neutral-600">Premium positioning</td>
                    <td className="p-4 text-sm text-green-700">✅ Perfect</td>
                  </tr>
                  <tr className="bg-white border-b border-neutral-200">
                    <td className="p-4 font-semibold">D: Data-Driven</td>
                    <td className="p-4 text-sm text-neutral-600">Results-focused</td>
                    <td className="p-4 text-sm text-neutral-600">Analytical clients</td>
                    <td className="p-4 text-sm text-green-700">✅ Perfect</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 font-semibold">E: Nordic</td>
                    <td className="p-4 text-sm text-neutral-600">True Scandi-Scot</td>
                    <td className="p-4 text-sm text-neutral-600">Confident restraint</td>
                    <td className="p-4 text-sm text-green-700">✅ Perfect</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 p-8 bg-white rounded-xl border-2 border-primary-200">
              <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                All Variations Follow Scandi-Scot Principles:
              </h3>
              <ul className="space-y-2 text-neutral-700">
                <li>✅ NO gradients (solid colors only)</li>
                <li>✅ NO glassmorphism abuse (flat cards with subtle shadows)</li>
                <li>✅ NO floating orbs (clean backgrounds)</li>
                <li>✅ MAX text-5xl / 48px (premium restraint)</li>
                <li>✅ Generous white space (not cluttered)</li>
                <li>✅ Flat design language</li>
                <li>✅ Lucide icons (no emojis)</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <p className="text-neutral-600 mb-4">
                <strong>Choose the variation that matches Lost Monster's personality.</strong>
              </p>
              <p className="text-sm text-neutral-500">
                All variations practice what we preach: Scandi-Scot design principles from our Ancarraig success story.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
