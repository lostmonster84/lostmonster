import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Code2, Zap, Shield } from 'lucide-react';

export const metadata = {
  title: 'Blue Hero Variations - Lost Monster',
  description: 'Cinematic heroes optimized for Lost Monster blue',
};

export default function BlueHeroDemoPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Demo Navigation */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-4 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <div className="text-sm text-blue-400 font-semibold">
              Blue Hero Variations
            </div>
          </div>
        </div>
      </div>

      {/* VARIATION A: Navy + Sky Blue - Highland */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background - Navy with subtle Highland elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]">
          {/* Subtle topographic pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="topo-blue" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M 0 50 Q 50 30 100 50 T 200 50" stroke="rgba(96,165,250,0.3)" fill="none" strokeWidth="1"/>
                  <path d="M 0 100 Q 50 80 100 100 T 200 100" stroke="rgba(96,165,250,0.3)" fill="none" strokeWidth="1"/>
                  <path d="M 0 150 Q 50 130 100 150 T 200 150" stroke="rgba(96,165,250,0.3)" fill="none" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topo-blue)"/>
            </svg>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Badge */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-blue-400/30 rounded-full text-sm font-medium text-blue-300">
                  <Sparkles className="w-4 h-4" />
                  Scottish Development Agency
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
                <span className="text-white">Built in the</span>
                <br />
                <span className="text-white">Highlands.</span>
                <br />
                <span className="text-[#60A5FA]">Built to Last.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                We create powerful digital systems for ambitious businesses.
                Scottish values. World-class results.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#60A5FA] text-[#1E3A8A] text-lg font-bold rounded-lg hover:bg-[#7CB6FB] transition-all shadow-2xl shadow-blue-500/25">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-10 py-5 border-2 border-blue-400/30 text-white text-lg font-semibold rounded-lg hover:border-blue-400 hover:bg-white/5 transition-all backdrop-blur-sm">
                  See Our Work
                </a>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '100%', label: 'On-Time Delivery', icon: CheckCircle2 },
                { value: '40%', label: 'Revenue Increase', icon: Zap },
                { value: '4.9', label: 'Client Rating', icon: Sparkles },
                { value: '50+', label: 'Projects', icon: Code2 },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div key={i} className="bg-white/5 backdrop-blur-md border border-blue-400/20 rounded-lg p-6 text-center hover:bg-white/10 transition-all">
                    <Icon className="w-6 h-6 text-[#60A5FA] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-blue-200">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-24 right-8 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">A: Navy + Sky Blue Highland</div>
          <div className="text-xs text-white/60">
            Navy background • Sky blue (#60A5FA) accent • Highland topographic elements • Centered • Confident
          </div>
        </div>
      </section>

      {/* VARIATION B: Dark + Blue - Split Layout */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Pure dark with blue glow */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Typography */}
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-md text-sm font-bold text-[#60A5FA] uppercase tracking-widest">
                    Lost Monster
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none tracking-tighter">
                  <span className="text-white">Systems</span>
                  <br />
                  <span className="text-white">That</span>
                  <br />
                  <span className="text-[#60A5FA]">Work.</span>
                </h1>

                <p className="text-xl md:text-2xl text-neutral-300 mb-10 leading-relaxed">
                  High-performance web applications for businesses that demand excellence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#60A5FA] text-black text-lg font-bold rounded-lg hover:bg-[#7CB6FB] transition-all shadow-lg shadow-blue-500/25">
                    Start Project
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-blue-500 transition-all">
                    Our Work
                  </a>
                </div>

                {/* Quick stats */}
                <div className="flex gap-8 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-[#60A5FA]">100%</div>
                    <div className="text-neutral-400">On-Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#60A5FA]">4.9</div>
                    <div className="text-neutral-400">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#60A5FA]">50+</div>
                    <div className="text-neutral-400">Projects</div>
                  </div>
                </div>
              </div>

              {/* Right: Metrics Cards */}
              <div className="space-y-4">
                {/* Card 1 */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#60A5FA]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-[#60A5FA]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">40%</div>
                      <div className="font-semibold text-white mb-1">Average Revenue Increase</div>
                      <div className="text-sm text-neutral-400">Our clients see measurable growth within 6 months</div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-br from-blue-600/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#60A5FA]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#60A5FA]" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">100%</div>
                      <div className="font-semibold text-white mb-1">On-Time Delivery</div>
                      <div className="text-sm text-neutral-400">Every project delivered on schedule, guaranteed</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-white/5 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-[#60A5FA]" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed italic">
                    "Our bookings tripled in the first month. Lost Monster made it easy."
                  </p>
                  <div className="text-xs text-neutral-400">
                    Sarah MacLeod, Highland Spa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-24 right-8 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">B: Dark + Blue Split</div>
          <div className="text-xs text-white/60">
            Black background • Blue glow effects • Split layout • Metrics cards • Testimonial integrated
          </div>
        </div>
      </section>

      {/* VARIATION C: Minimal Blue - Fueled Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Pure black */}
        <div className="absolute inset-0 bg-black">
          {/* Subtle blue accent glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#60A5FA]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6">
          <div className="max-w-6xl mx-auto">
            {/* Small overline */}
            <div className="mb-8">
              <span className="text-sm font-medium text-[#60A5FA] uppercase tracking-widest">
                Lost Monster Development
              </span>
            </div>

            {/* MASSIVE headline */}
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold mb-12 leading-none tracking-tighter">
              <span className="text-white">Built in</span>
              <br />
              <span className="text-white">Scotland.</span>
              <br />
              <span className="text-[#60A5FA]">Built Right.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-neutral-400 mb-16 max-w-3xl font-light leading-relaxed">
              We create digital systems that work.
              <br />
              No jargon. No surprises. Just results.
            </p>

            {/* Single bold CTA */}
            <div className="mb-24">
              <a href="#" className="group inline-flex items-center gap-3 px-12 py-6 bg-[#60A5FA] text-black text-xl font-bold rounded-lg hover:bg-[#7CB6FB] transition-all shadow-2xl shadow-blue-500/25">
                Start Your Project
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            {/* Minimal metrics - single row */}
            <div className="border-t border-neutral-800 pt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div>
                  <div className="text-5xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">On-Time Delivery</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">40%</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">Revenue Increase</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">4.9</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">Client Rating</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">50+</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-24 right-8 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">C: Minimal Blue Fueled</div>
          <div className="text-xs text-white/60">
            Pure black • MASSIVE type (12rem) • Sky blue only • Maximum confidence • Ultra minimal
          </div>
        </div>
      </section>

      {/* VARIATION D: Navy + White + Blue Accents */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Navy solid */}
        <div className="absolute inset-0 bg-[#1E3A8A]">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-white">
                <Sparkles className="w-4 h-4 text-[#60A5FA]" />
                Framework-Driven Development
              </span>
            </div>

            {/* Headline - white on navy */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tight">
              <span className="text-white">Professional</span>
              <br />
              <span className="text-white">Web Systems</span>
              <br />
              <span className="text-[#60A5FA]">You Can Trust</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              We build booking systems, e-commerce platforms, and custom applications
              for growing Scottish businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#1E3A8A] text-lg font-bold rounded-lg hover:bg-blue-50 transition-all shadow-2xl">
                Get Your Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#" className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/30 text-white text-lg font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm">
                See Case Studies
              </a>
            </div>

            {/* Metrics - card style */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { value: '100%', label: 'On-Time', subtext: 'Every project' },
                { value: '40%', label: 'Revenue Up', subtext: 'Avg increase' },
                { value: '4.9/5', label: 'Rating', subtext: 'Client reviews' },
                { value: '50+', label: 'Projects', subtext: 'Delivered' },
              ].map((metric, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                  <div className="text-4xl font-bold text-[#60A5FA] mb-2">{metric.value}</div>
                  <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
                  <div className="text-xs text-blue-200">{metric.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-24 right-8 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">D: Navy Solid + White</div>
          <div className="text-xs text-white/60">
            Solid navy background • White typography • Sky blue accents • Clean grid • Professional trust
          </div>
        </div>
      </section>

      {/* VARIATION E: Gradient Navy to Blue */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Gradient navy to blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6]">
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <svg className="w-full h-full">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5"/>
            </svg>
          </div>
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left: Content (3 cols) */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-sm font-bold text-white uppercase tracking-wider">
                    Scottish Development Agency
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight text-white">
                  Highland Craft.
                  <br />
                  <span className="text-[#60A5FA]">Global Standards.</span>
                </h1>

                <p className="text-xl text-blue-50 mb-10 leading-relaxed max-w-2xl">
                  We build high-performance web applications from the Scottish Highlands.
                  Local expertise. International quality.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#1E3A8A] text-lg font-bold rounded-lg hover:bg-blue-50 transition-all shadow-2xl">
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all">
                    View Portfolio
                  </a>
                </div>
              </div>

              {/* Right: Stats (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8">
                  <div className="text-6xl font-bold text-white mb-3">100%</div>
                  <div className="text-lg font-semibold text-blue-100 mb-2">On-Time Delivery</div>
                  <div className="text-sm text-blue-200">Every single project delivered when promised</div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8">
                  <div className="text-6xl font-bold text-white mb-3">40%</div>
                  <div className="text-lg font-semibold text-blue-100 mb-2">Revenue Increase</div>
                  <div className="text-sm text-blue-200">Average growth for our clients within 6 months</div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8">
                  <div className="text-6xl font-bold text-white mb-3">4.9★</div>
                  <div className="text-lg font-semibold text-blue-100 mb-2">Client Rating</div>
                  <div className="text-sm text-blue-200">From 50+ completed projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-24 right-8 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">E: Navy to Blue Gradient</div>
          <div className="text-xs text-white/60">
            Gradient background • Split layout • Large stat cards • Glass effects • Immersive depth
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-neutral-900">
        <div className="container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              All Optimized for Your Blue
            </h2>
            <p className="text-xl text-neutral-400 mb-16 text-center">
              Sky blue (#60A5FA) used strategically across all variations
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-neutral-950 border border-blue-500/30 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-lg flex items-center justify-center text-[#1E3A8A] font-bold text-xl mb-4">A</div>
                <h3 className="text-lg font-bold text-white mb-2">Navy + Sky Blue Highland</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Navy background • Topographic elements • Centered • Scottish identity
                </p>
                <div className="text-xs text-[#60A5FA] font-semibold">Best for: Highland pride + professionalism</div>
              </div>

              <div className="bg-neutral-950 border border-blue-500/30 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-lg flex items-center justify-center text-[#1E3A8A] font-bold text-xl mb-4">B</div>
                <h3 className="text-lg font-bold text-white mb-2">Dark + Blue Split</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Black base • Blue glow • Split layout • Metrics cards prominent
                </p>
                <div className="text-xs text-[#60A5FA] font-semibold">Best for: Balance of bold + proof</div>
              </div>

              <div className="bg-neutral-950 border border-blue-500/30 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-lg flex items-center justify-center text-[#1E3A8A] font-bold text-xl mb-4">C</div>
                <h3 className="text-lg font-bold text-white mb-2">Minimal Blue Fueled</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Pure black • MASSIVE typography • Ultra minimal • Maximum confidence
                </p>
                <div className="text-xs text-[#60A5FA] font-semibold">Best for: Bold, distinctive brand</div>
              </div>

              <div className="bg-neutral-950 border border-blue-500/30 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-lg flex items-center justify-center text-[#1E3A8A] font-bold text-xl mb-4">D</div>
                <h3 className="text-lg font-bold text-white mb-2">Navy Solid + White</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Solid navy • White typography • Professional trust • Clean & clear
                </p>
                <div className="text-xs text-[#60A5FA] font-semibold">Best for: Professional credibility</div>
              </div>

              <div className="bg-neutral-950 border border-blue-500/30 rounded-lg p-6 lg:col-span-2">
                <div className="w-12 h-12 bg-[#60A5FA] rounded-lg flex items-center justify-center text-[#1E3A8A] font-bold text-xl mb-4">E</div>
                <h3 className="text-lg font-bold text-white mb-2">Navy to Blue Gradient</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Gradient background • Split layout • Large stat cards • Immersive depth • Glass effects
                </p>
                <div className="text-xs text-[#60A5FA] font-semibold">Best for: Visual impact + metrics prominence</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] border border-blue-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Your Blue: #60A5FA</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-100 mb-3">Used for:</h4>
                  <ul className="space-y-2 text-sm text-blue-50">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      Primary CTAs and action buttons
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      Headline accents and key messaging
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      Icons and visual indicators
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                      Metric highlights and data points
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-100 mb-3">Paired with:</h4>
                  <ul className="space-y-2 text-sm text-blue-50">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-[#1E3A8A] border border-white/30 rounded flex-shrink-0 mt-0.5"></div>
                      Navy #1E3A8A (backgrounds, trust)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-black border border-white/30 rounded flex-shrink-0 mt-0.5"></div>
                      Black (bold contrast, modern)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-white border border-neutral-300 rounded flex-shrink-0 mt-0.5"></div>
                      White (clean, readable, crisp)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-neutral-900 border border-white/30 rounded flex-shrink-0 mt-0.5"></div>
                      Neutral grays (depth, sophistication)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-white font-semibold mb-2">
                Which blue variation feels most "Lost Monster"?
              </p>
              <p className="text-sm text-neutral-500">
                All use your blue (#60A5FA) as the strategic accent. No AI pastels in sight.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
