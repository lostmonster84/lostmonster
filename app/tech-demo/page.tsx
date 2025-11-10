import Link from 'next/link';
import { Code2, Zap, CheckCircle2, TrendingUp, Terminal, Database, Cpu, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'Tech-Oriented Design Variations - Lost Monster',
  description: '5 variations following modern tech company design principles',
};

const metrics = [
  { label: 'Framework Lines', value: '20,000+', subtext: 'Battle-tested', icon: Code2 },
  { label: 'Quality Standard', value: '80/100', subtext: 'Minimum', icon: CheckCircle2 },
  { label: 'Build Time', value: '<47ms', subtext: 'Avg compile', icon: Zap },
  { label: 'Conversion Rate', value: '3-5%', subtext: 'vs 2% avg', icon: TrendingUp },
];

export default function TechDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo header */}
      <div className="bg-neutral-900 text-white py-6 border-b border-neutral-800">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <Link href="/" className="text-sm text-neutral-400 hover:text-white mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-mono font-bold mb-3">
              Tech-Oriented Hero Variations
            </h1>
            <p className="text-lg text-neutral-300 mb-4">
              Based on research from Vercel, Linear, Stripe - 2025 tech company design patterns
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">
                <div className="text-neutral-400 mb-1">PRINCIPLE</div>
                <div>Code-First</div>
              </div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">
                <div className="text-neutral-400 mb-1">TYPOGRAPHY</div>
                <div>Max 48px</div>
              </div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">
                <div className="text-neutral-400 mb-1">AESTHETIC</div>
                <div>Brutalist Min</div>
              </div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700">
                <div className="text-neutral-400 mb-1">FOCUS</div>
                <div>Data-Driven</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VARIATION A: Linear-Inspired */}
      <section className="py-24 border-b-4 border-neutral-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-neutral-900 text-white rounded flex items-center justify-center font-mono text-sm font-bold">A</div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-neutral-900">
                  Linear-Inspired
                </h2>
                <p className="text-sm text-neutral-500">Monochrome • Grid-visible • Maximum restraint • Typography-first</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="border border-neutral-200 rounded-lg p-12 bg-white">
              {/* Subtle badge */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-neutral-600 border border-neutral-300 rounded-md">
                  <Terminal className="w-3 h-3" />
                  Framework-Driven Development
                </span>
              </div>

              {/* Headline - monospace, restrained */}
              <h1 className="text-4xl md:text-5xl font-mono font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
                Systems That Work.
                <br />
                Websites That Convert.
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-neutral-600 max-w-2xl mb-12 leading-relaxed">
                High-performance digital solutions. Measurable results. Guaranteed quality. Systematic process.
              </p>

              {/* CTAs - minimal, text-based */}
              <div className="flex flex-wrap gap-4 mb-16">
                <a href="#" className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors">
                  Start Your Project →
                </a>
                <a href="#" className="inline-flex items-center px-6 py-3 text-sm font-medium text-neutral-900 border border-neutral-300 hover:border-neutral-900 transition-colors">
                  View Case Studies
                </a>
              </div>

              {/* Metrics Grid - minimal, monospace */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="bg-white p-6">
                      <Icon className="w-5 h-5 text-neutral-400 mb-3" strokeWidth={1.5} />
                      <div className="text-2xl font-mono font-bold text-neutral-900 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs font-medium text-neutral-600 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {metric.subtext}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-8">
            <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
              <h3 className="font-mono font-semibold text-neutral-900 mb-4">Analysis:</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Strengths</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Maximum restraint</li>
                    <li>• Grid-visible structure</li>
                    <li>• Monospace typography</li>
                    <li>• Linear-like precision</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">⚠️ Considerations</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Very minimal</li>
                    <li>• Requires confidence</li>
                    <li>• Not for everyone</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">🎯 Best For</h4>
                  <p className="text-neutral-700">Developer tools, SaaS platforms, technical audiences who appreciate restraint</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION B: Vercel-Style */}
      <section className="py-24 bg-neutral-50 border-b-4 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-neutral-900 text-white rounded flex items-center justify-center font-mono text-sm font-bold">B</div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-neutral-900">
                  Vercel-Style
                </h2>
                <p className="text-sm text-neutral-500">B&W with bold accents • Performance metrics • Fast & minimal • Geometric</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-2 border-neutral-900 rounded-lg p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Badge with accent */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-white bg-neutral-900 uppercase tracking-wider">
                  <Zap className="w-3 h-3" />
                  PERFORMANCE-DRIVEN
                </span>
              </div>

              {/* Headline - bold, geometric */}
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
                Build Systems.
                <br />
                <span className="text-blue-600">Ship Fast.</span>
              </h1>

              {/* Subheadline with metric callout */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Framework-driven development with measurable results.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-600 font-mono text-sm font-bold text-blue-600">
                  <Cpu className="w-4 h-4" />
                  80/100 MIN
                </div>
              </div>

              {/* CTAs - bold geometric */}
              <div className="flex flex-wrap gap-4 mb-16">
                <a href="#" className="inline-flex items-center px-8 py-4 text-base font-bold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors">
                  Start Your Project
                </a>
                <a href="#" className="inline-flex items-center px-8 py-4 text-base font-bold text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
                  View Metrics →
                </a>
              </div>

              {/* Metrics Grid - geometric cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="bg-neutral-50 border-2 border-neutral-900 p-6 hover:bg-blue-50 hover:border-blue-600 transition-all group">
                      <div className="mb-4">
                        <div className="inline-flex p-2 bg-neutral-900 group-hover:bg-blue-600 transition-colors">
                          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-neutral-900 mb-1 font-mono">
                        {metric.value}
                      </div>
                      <div className="text-xs font-bold text-neutral-900 mb-1 uppercase tracking-wide">
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

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-8">
            <div className="border-2 border-neutral-900 rounded-lg p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-mono font-semibold text-neutral-900 mb-4">Analysis:</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Strengths</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Bold, confident aesthetic</li>
                    <li>• Strong geometric shapes</li>
                    <li>• Performance-focused</li>
                    <li>• Vercel-inspired clarity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">⚠️ Considerations</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Very bold borders</li>
                    <li>• Strong visual style</li>
                    <li>• Needs commitment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">🎯 Best For</h4>
                  <p className="text-neutral-700">Modern tech companies wanting bold, fast, performance-driven aesthetic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION C: Stripe Developer Docs */}
      <section className="py-24 border-b-4 border-neutral-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-neutral-900 text-white rounded flex items-center justify-center font-mono text-sm font-bold">C</div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-neutral-900">
                  Stripe Developer Docs
                </h2>
                <p className="text-sm text-neutral-500">API documentation • Tables & grids • Technical precision • Clean</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Content */}
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md font-mono">
                    <Database className="w-3 h-3" />
                    api.lostmonster.dev
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6 tracking-tight leading-tight">
                  Developer-First
                  <br />
                  Web Solutions
                </h1>

                <p className="text-base text-neutral-600 mb-8 leading-relaxed">
                  Production-ready frameworks. Type-safe components. Measurable performance. Built for teams who ship.
                </p>

                {/* API-style code block */}
                <div className="bg-neutral-900 rounded-lg p-6 mb-8 font-mono text-sm overflow-x-auto">
                  <div className="text-neutral-500 mb-2">// Quick Start</div>
                  <div className="text-green-400">const project = <span className="text-blue-400">await</span> lostmonster.create({'{'}</div>
                  <div className="text-white pl-4">framework: <span className="text-orange-400">'next.js'</span>,</div>
                  <div className="text-white pl-4">quality: <span className="text-purple-400">80</span>,</div>
                  <div className="text-white pl-4">delivery: <span className="text-orange-400">'on-time'</span></div>
                  <div className="text-green-400">{'}'});</div>
                </div>

                {/* CTAs - documentation style */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                    Get Started
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors">
                    View Documentation
                  </a>
                </div>
              </div>

              {/* Right: Metrics Table */}
              <div>
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-3">
                    <h3 className="text-sm font-mono font-semibold text-neutral-900">Performance Metrics</h3>
                  </div>
                  <table className="w-full">
                    <tbody className="font-mono text-sm">
                      {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                          <tr key={index} className="border-b border-neutral-100 last:border-0">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <Icon className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                                <div>
                                  <div className="text-xs text-neutral-500 mb-0.5">{metric.label}</div>
                                  <div className="text-xs text-neutral-400">{metric.subtext}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="text-lg font-bold text-neutral-900">{metric.value}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Additional info card */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="text-blue-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="text-sm text-blue-900">
                      <div className="font-semibold mb-1">Quality Guaranteed</div>
                      <div className="text-blue-700">All projects meet 80/100 minimum score using our framework-driven approach.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
              <h3 className="font-mono font-semibold text-neutral-900 mb-4">Analysis:</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Strengths</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Developer-focused</li>
                    <li>• Code examples included</li>
                    <li>• Table-based metrics</li>
                    <li>• Documentation aesthetic</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">⚠️ Considerations</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Very technical</li>
                    <li>• Code-heavy approach</li>
                    <li>• May intimidate non-devs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">🎯 Best For</h4>
                  <p className="text-neutral-700">API-first companies, developer tools, technical B2B SaaS products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION D: Brutalist Tech */}
      <section className="py-24 bg-neutral-100 border-b-4 border-neutral-300">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-neutral-900 text-white flex items-center justify-center font-mono text-sm font-bold">D</div>
              <div>
                <h2 className="text-2xl font-mono font-bold text-neutral-900">
                  Brutalist Tech
                </h2>
                <p className="text-sm text-neutral-500">Raw & structural • Visible grids • Monospace headlines • No decoration</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-4 border-neutral-900 p-12">
              {/* Grid visible background */}
              <div className="relative">
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 bg-neutral-900 text-white font-mono text-xs font-bold uppercase tracking-wider border-4 border-neutral-900">
                      &lt;FRAMEWORK_DRIVEN /&gt;
                    </div>
                  </div>

                  <h1 className="text-5xl font-mono font-black text-neutral-900 mb-6 uppercase tracking-tight leading-none">
                    SYSTEMS_
                    <br />
                    THAT_WORK
                  </h1>

                  <div className="bg-yellow-300 border-4 border-neutral-900 px-6 py-4 mb-12 inline-block">
                    <p className="text-base font-mono font-bold text-neutral-900">
                      → High-performance digital solutions
                      <br />
                      → Measurable results guaranteed
                      <br />
                      → 80/100 minimum quality score
                    </p>
                  </div>

                  {/* CTAs - brutalist buttons */}
                  <div className="flex flex-wrap gap-4 mb-16">
                    <a href="#" className="px-8 py-4 bg-neutral-900 text-white font-mono text-sm font-bold uppercase border-4 border-neutral-900 hover:bg-white hover:text-neutral-900 transition-colors">
                      [START_PROJECT]
                    </a>
                    <a href="#" className="px-8 py-4 bg-white text-neutral-900 font-mono text-sm font-bold uppercase border-4 border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
                      [VIEW_WORK]
                    </a>
                  </div>

                  {/* Metrics Grid - raw table */}
                  <div className="border-4 border-neutral-900">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-4 divide-neutral-900">
                      {metrics.map((metric, index) => (
                        <div key={index} className="p-6 bg-white hover:bg-yellow-300 transition-colors">
                          <div className="font-mono text-3xl font-black text-neutral-900 mb-2">
                            {metric.value}
                          </div>
                          <div className="font-mono text-xs font-bold text-neutral-900 uppercase mb-1">
                            {metric.label}
                          </div>
                          <div className="font-mono text-xs text-neutral-600">
                            {metric.subtext}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-8">
            <div className="border-4 border-neutral-900 p-6 bg-white">
              <h3 className="font-mono font-bold text-neutral-900 mb-4 text-lg uppercase">Analysis:</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Strengths</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Maximum impact</li>
                    <li>• Brutally honest aesthetic</li>
                    <li>• Strong brand personality</li>
                    <li>• Impossible to ignore</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">⚠️ Considerations</h4>
                  <ul className="text-neutral-700 space-y-1">
                    <li>• Very polarizing</li>
                    <li>• Not subtle at all</li>
                    <li>• Requires full commitment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">🎯 Best For</h4>
                  <p className="text-neutral-700">Bold brands, anti-establishment positioning, standing out dramatically</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION E: Modern Dev Tools */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white text-neutral-900 rounded flex items-center justify-center font-mono text-sm font-bold">E</div>
              <div>
                <h2 className="text-2xl font-mono font-bold">
                  Modern Dev Tools
                </h2>
                <p className="text-sm text-neutral-400">Terminal-inspired • Syntax colors • Dark mode first • Code aesthetics</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-12">
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-neutral-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-neutral-500 ml-4">~/lostmonster/framework</div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <div className="font-mono text-sm text-neutral-500 mb-2">
                  <span className="text-purple-400">$</span> cat README.md
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 tracking-tight leading-tight">
                <span className="text-blue-400">&lt;Systems</span>
                <span className="text-white"> That </span>
                <span className="text-green-400">Work</span>
                <span className="text-blue-400"> /&gt;</span>
              </h1>

              <p className="text-lg text-neutral-400 mb-8 leading-relaxed font-mono">
                <span className="text-purple-400">const</span> approach = {'{'}
                <br />
                <span className="pl-4 text-neutral-300">framework: </span>
                <span className="text-green-400">'battle-tested'</span>,
                <br />
                <span className="pl-4 text-neutral-300">quality: </span>
                <span className="text-orange-400">80</span>,
                <br />
                <span className="pl-4 text-neutral-300">delivery: </span>
                <span className="text-green-400">'guaranteed'</span>
                <br />
                {'}'};
              </p>

              {/* CTAs - terminal style */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-neutral-900 font-mono text-sm font-bold transition-colors">
                  <Terminal className="w-4 h-4" />
                  npm start project
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 hover:border-neutral-500 text-white font-mono text-sm font-bold transition-colors">
                  <GitBranch className="w-4 h-4" />
                  git clone case-studies
                </a>
              </div>

              {/* Metrics Grid - syntax colored */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { ...metrics[0], color: 'blue' },
                  { ...metrics[1], color: 'purple' },
                  { ...metrics[2], color: 'green' },
                  { ...metrics[3], color: 'orange' },
                ].map((metric, index) => {
                  const Icon = metric.icon;
                  const colorClasses = {
                    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
                    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
                    green: 'bg-green-500/10 border-green-500/30 text-green-400',
                    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
                  };
                  return (
                    <div key={index} className={`border rounded p-5 ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-5 h-5 mb-3" strokeWidth={1.5} />
                      <div className="text-2xl font-mono font-bold mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs font-mono font-semibold text-white mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs font-mono text-neutral-500">
                        {metric.subtext}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-8">
            <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
              <h3 className="font-mono font-semibold mb-4">Analysis:</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">✅ Strengths</h4>
                  <ul className="text-neutral-300 space-y-1">
                    <li>• Developer paradise</li>
                    <li>• Syntax highlighting used well</li>
                    <li>• Dark mode native</li>
                    <li>• Terminal authenticity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">⚠️ Considerations</h4>
                  <ul className="text-neutral-300 space-y-1">
                    <li>• Very niche appeal</li>
                    <li>• Dark mode only shown</li>
                    <li>• Code-heavy approach</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🎯 Best For</h4>
                  <p className="text-neutral-300">Developer-first companies, CLI tools, infrastructure products, technical SaaS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Summary */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-mono font-bold text-neutral-900 mb-12 text-center">
              Comparison Matrix
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-neutral-300">
                <thead>
                  <tr className="bg-neutral-900 text-white">
                    <th className="text-left p-4 font-mono text-sm border border-neutral-700">Variation</th>
                    <th className="text-left p-4 font-mono text-sm border border-neutral-700">Personality</th>
                    <th className="text-left p-4 font-mono text-sm border border-neutral-700">Tech Level</th>
                    <th className="text-left p-4 font-mono text-sm border border-neutral-700">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-neutral-300">
                    <td className="p-4 font-mono font-bold border border-neutral-300">A: Linear</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Restrained, minimal</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">⚡⚡⚡⚡</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">SaaS platforms</td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-neutral-50">
                    <td className="p-4 font-mono font-bold border border-neutral-300">B: Vercel</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Bold, geometric</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">⚡⚡⚡⚡⚡</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Performance focus</td>
                  </tr>
                  <tr className="border-b border-neutral-300">
                    <td className="p-4 font-mono font-bold border border-neutral-300">C: Stripe</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Documentation-like</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">⚡⚡⚡⚡⚡</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">API-first products</td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-neutral-50">
                    <td className="p-4 font-mono font-bold border border-neutral-300">D: Brutalist</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Raw, polarizing</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">⚡⚡⚡</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Bold brands</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono font-bold border border-neutral-300">E: Dev Tools</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">Terminal-inspired</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">⚡⚡⚡⚡⚡</td>
                    <td className="p-4 text-neutral-600 border border-neutral-300">CLI/Infrastructure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 p-8 border-2 border-blue-600 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-mono font-bold text-neutral-900 mb-4">
                All Variations Follow Tech Design Principles:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-700">
                <div>
                  <ul className="space-y-2">
                    <li>✅ Code-first aesthetics</li>
                    <li>✅ Performance visible (metrics shown)</li>
                    <li>✅ Systematic typography (max 48px)</li>
                    <li>✅ Brutalist minimalism</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>✅ Data-driven layouts</li>
                    <li>✅ Developer-grade UI</li>
                    <li>✅ Fault-tolerant design</li>
                    <li>✅ Honest visuals (no stock photos)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-neutral-600 font-mono text-sm">
                <strong>Which variation matches Lost Monster's personality?</strong>
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                All designed for modern tech companies. Pick based on brand personality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
