import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Cinematic Hero Variations - Lost Monster',
  description: 'Full-screen imagery, bold typography, immersive experiences',
};

export default function CinematicDemoPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Demo Navigation */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-4 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <div className="text-sm text-neutral-500">
              Cinematic Hero Variations
            </div>
          </div>
        </div>
      </div>

      {/* VARIATION 1: Scottish Highlands Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          {/* Simulated moody Highland landscape */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center px-6">
          <div className="max-w-5xl mx-auto">
            {/* Overline */}
            <div className="mb-6 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white">
                <Sparkles className="w-4 h-4" />
                Scottish Development Agency
              </span>
            </div>

            {/* Main Headline - Huge, Cinematic */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none tracking-tight">
              Built in the Highlands.
              <br />
              <span className="text-blue-400">Built to Last.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              We create powerful digital systems for ambitious businesses.
              From the Scottish Highlands to the world.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="#" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-all shadow-2xl">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all">
                <Play className="w-5 h-5" />
                Watch Our Story
              </a>
            </div>

            {/* Trust Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                100% On-Time Delivery
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                40% Avg Revenue Increase
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                4.9/5 Client Rating
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Analysis Badge */}
        <div className="absolute top-24 right-8 z-20 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">VARIATION 1: Highland Cinematic</div>
          <div className="text-xs text-white/60">
            Full-screen moody landscape • Bold white typography • Scottish identity • Immersive depth
          </div>
        </div>
      </section>

      {/* VARIATION 2: Product Showcase Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Dark with project showcase */}
        <div className="absolute inset-0 bg-neutral-950">
          {/* Simulated project screenshot in background (blurred) */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-blue-900/20"></div>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>

        {/* Content - Split layout */}
        <div className="relative z-10 container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Typography */}
            <div>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-md text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  Our Work
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                This Is What
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  We Build
                </span>
              </h1>

              <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                From booking systems that handle thousands of reservations to e-commerce platforms driving millions in revenue.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25">
                  View Case Studies
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all">
                  Get a Quote
                </a>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-neutral-400">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">4.9</div>
                  <div className="text-sm text-neutral-400">Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-neutral-400">On-Time</div>
                </div>
              </div>
            </div>

            {/* Right: Project showcase mockup */}
            <div className="relative">
              {/* Simulated project screenshot */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-neutral-800">
                {/* Browser chrome */}
                <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-neutral-950 rounded px-3 py-1 text-xs text-neutral-500 ml-4">
                    ancarraig-highland-cottages.com
                  </div>
                </div>
                {/* Project content area */}
                <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white/20 text-8xl font-bold mb-4">PREVIEW</div>
                    <div className="text-white/40 text-sm">Ancarraig Highland Cottages</div>
                  </div>
                </div>
              </div>
              {/* Floating metric card */}
              <div className="absolute -bottom-6 -left-6 bg-black/90 backdrop-blur-xl border border-green-500/30 rounded-lg p-4 shadow-2xl">
                <div className="text-green-400 text-xs font-semibold mb-1">RESULT</div>
                <div className="text-white text-2xl font-bold">+200%</div>
                <div className="text-neutral-400 text-xs">Bookings Increase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Badge */}
        <div className="absolute top-24 right-8 z-20 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">VARIATION 2: Product Showcase</div>
          <div className="text-xs text-white/60">
            Split layout • Project mockup prominent • Gradient accents • Results-focused • Dark mode
          </div>
        </div>
      </section>

      {/* VARIATION 3: Abstract Dark Fueled-Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Pure black with subtle accents */}
        <div className="absolute inset-0 bg-black">
          {/* Subtle glow effect */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6">
          <div className="max-w-6xl mx-auto">
            {/* Small overline */}
            <div className="mb-8">
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest">
                Lost Monster Development
              </span>
            </div>

            {/* Massive headline - Fueled style */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
              <span className="text-white">Systems</span>
              <br />
              <span className="text-white">That</span>
              <br />
              <span className="text-cyan-400">Work.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-neutral-400 mb-12 max-w-3xl font-light leading-relaxed">
              We build high-performance web applications
              <br className="hidden md:block" />
              for businesses that demand excellence.
            </p>

            {/* Single bold CTA */}
            <div className="mb-20">
              <a href="#" className="group inline-flex items-center gap-3 px-10 py-5 bg-cyan-500 text-black text-xl font-bold rounded-lg hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/25">
                Start Your Project
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            {/* Minimal metrics - clean row */}
            <div className="border-t border-neutral-800 pt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">40%</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">Avg Revenue Increase</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">On-Time Delivery</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">4.9</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">Client Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">12mo+</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider">Avg Partnership</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Badge */}
        <div className="absolute top-24 right-8 z-20 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">VARIATION 3: Fueled-Inspired Dark</div>
          <div className="text-xs text-white/60">
            Pure black • ONE accent (cyan) • Massive typography • Minimal • Ultra confident • Strategic glow effects
          </div>
        </div>
      </section>

      {/* VARIATION 4: Video Background Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Simulated video background with overlay */}
        <div className="absolute inset-0">
          {/* Simulated video - animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-pulse-slow"></div>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Now Building in Scotland
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Transform Your Business
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                With Digital Excellence
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              We create booking systems, e-commerce platforms, and custom web applications
              that drive real business growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-black text-lg font-bold rounded-lg hover:bg-neutral-100 transition-all shadow-2xl">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-all">
                <Play className="w-5 h-5" />
                Watch Demo
              </a>
            </div>

            {/* Social proof */}
            <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-white/60">Happy Clients</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">£2M+</div>
                <div className="text-xs text-white/60">Revenue Generated</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-xs text-white/60">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Play button overlay (simulated video control) */}
        <div className="absolute bottom-8 right-8 z-20">
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
            <Play className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Analysis Badge */}
        <div className="absolute top-24 right-8 z-20 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">VARIATION 4: Video Background</div>
          <div className="text-xs text-white/60">
            Animated background • Heavy overlay • Centered content • Play button • Apple-like • Immersive motion
          </div>
        </div>
      </section>

      {/* VARIATION 5: Hybrid - Highland Dark Mode */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
        {/* Background - Dark base with subtle Highland elements */}
        <div className="absolute inset-0 bg-neutral-950">
          {/* Subtle Highland texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-neutral-950 to-blue-950/30 opacity-60"></div>
          {/* Topographic lines effect */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="topo" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M 0 50 Q 50 30 100 50 T 200 50" stroke="rgba(34,197,94,0.3)" fill="none" strokeWidth="1"/>
                  <path d="M 0 100 Q 50 80 100 100 T 200 100" stroke="rgba(34,197,94,0.3)" fill="none" strokeWidth="1"/>
                  <path d="M 0 150 Q 50 130 100 150 T 200 150" stroke="rgba(34,197,94,0.3)" fill="none" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topo)"/>
            </svg>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6">
          <div className="max-w-6xl mx-auto">
            {/* Grid layout */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Bold typography */}
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-sm font-bold text-emerald-400 uppercase tracking-widest">
                    Scottish Development
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none tracking-tighter">
                  <span className="text-white">Highland</span>
                  <br />
                  <span className="text-white">Craft.</span>
                  <br />
                  <span className="text-emerald-400">Global</span>
                  <br />
                  <span className="text-emerald-400">Reach.</span>
                </h1>

                <p className="text-xl text-neutral-300 mb-10 leading-relaxed max-w-lg">
                  Precision-engineered web systems built in the Scottish Highlands.
                  Local values. World-class results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-black text-lg font-bold rounded-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25">
                    Start Project
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-emerald-500 hover:text-emerald-400 transition-all">
                    Our Work
                  </a>
                </div>
              </div>

              {/* Right: Metrics + Visual element */}
              <div className="space-y-6">
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
                    <div className="text-sm text-neutral-400">On-Time Delivery</div>
                  </div>
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">40%</div>
                    <div className="text-sm text-neutral-400">Revenue Increase</div>
                  </div>
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">4.9</div>
                    <div className="text-sm text-neutral-400">Client Rating</div>
                  </div>
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">50+</div>
                    <div className="text-sm text-neutral-400">Projects</div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-emerald-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed italic">
                    "Our bookings tripled in the first month. The system just works, and Lost Monster made it all easy to understand."
                  </p>
                  <div className="text-xs text-neutral-400">
                    Sarah MacLeod, Highland Spa & Wellness
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Badge */}
        <div className="absolute top-24 right-8 z-20 bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">VARIATION 5: Hybrid Highland Dark</div>
          <div className="text-xs text-white/60">
            Dark base • Subtle Highland elements • Emerald accent • Split layout • Metrics prominent • Local + Global
          </div>
        </div>
      </section>

      {/* Comparison Summary */}
      <section className="py-24 bg-neutral-900 border-t-4 border-neutral-800">
        <div className="container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Which Cinematic Style?
            </h2>
            <p className="text-xl text-neutral-400 mb-16 text-center max-w-3xl mx-auto">
              All variations use full-screen imagery, bold typography, and immersive experiences.
              Choose based on brand identity and visual impact preference.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Variation cards */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xl mb-4">1</div>
                <h3 className="text-lg font-bold text-white mb-2">Highland Cinematic</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Moody landscape • Scottish identity • Dramatic imagery • Perfect for emphasizing local heritage
                </p>
                <div className="text-xs text-blue-400 font-semibold">BEST FOR: Scottish pride positioning</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xl mb-4">2</div>
                <h3 className="text-lg font-bold text-white mb-2">Product Showcase</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Work front & center • Mockup prominent • Results-focused • Show don't tell approach
                </p>
                <div className="text-xs text-purple-400 font-semibold">BEST FOR: Portfolio-led approach</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-xl mb-4">3</div>
                <h3 className="text-lg font-bold text-white mb-2">Fueled Dark Mode</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Pure black • Single accent • Massive type • Ultra minimal • Maximum confidence
                </p>
                <div className="text-xs text-cyan-400 font-semibold">BEST FOR: Bold, distinctive brand</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 hover:border-pink-500/50 transition-colors">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 font-bold text-xl mb-4">4</div>
                <h3 className="text-lg font-bold text-white mb-2">Video Background</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Motion & depth • Apple-like • Centered content • Immersive experience • Premium feel
                </p>
                <div className="text-xs text-pink-400 font-semibold">BEST FOR: High-end, immersive</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 hover:border-emerald-500/50 transition-colors lg:col-span-2">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-xl mb-4">5</div>
                <h3 className="text-lg font-bold text-white mb-2">Hybrid Highland Dark</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Dark mode + Highland elements • Emerald accent • Split layout • Metrics + testimonial • Local values, global reach
                </p>
                <div className="text-xs text-emerald-400 font-semibold">BEST FOR: Balance of Scottish identity + modern tech aesthetic</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">All Cinematic Variations Include:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Full-screen immersive imagery or backgrounds</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Bold, oversized typography (7xl-9xl headings)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Strategic use of ONE bold accent color</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Dark overlays for text contrast/readability</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Clear, prominent CTAs with strong contrast</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Business metrics and social proof integrated</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>NO "AI stock" pastels or gradients everywhere</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Confident, distinctive brand personality</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-white font-semibold mb-2">
                Which variation captures the Lost Monster essence?
              </p>
              <p className="text-sm text-neutral-500">
                All designed to be cinematic, bold, and nothing like generic AI templates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
