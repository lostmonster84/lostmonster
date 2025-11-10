'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, DollarSign, Hotel, Clock, TrendingUp, AlertCircle, Users } from 'lucide-react';
import { useState } from 'react';

const colors = {
  blue: {
    name: 'Sky Blue',
    bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]',
    accent: '#60A5FA',
    accentClass: 'text-[#60A5FA]',
    bgAccentClass: 'bg-[#60A5FA]',
    borderClass: 'border-[#60A5FA]',
    hoverClass: 'hover:bg-[#7CB6FB]',
  },
  teal: {
    name: 'Vibrant Teal',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    accent: '#06B6D4',
    accentClass: 'text-[#06B6D4]',
    bgAccentClass: 'bg-[#06B6D4]',
    borderClass: 'border-[#06B6D4]',
    hoverClass: 'hover:bg-[#08D4F0]',
  },
  orange: {
    name: 'Bold Orange',
    bg: 'from-neutral-900 via-stone-900 to-neutral-900',
    accent: '#F59E0B',
    accentClass: 'text-[#F59E0B]',
    bgAccentClass: 'bg-[#F59E0B]',
    borderClass: 'border-[#F59E0B]',
    hoverClass: 'hover:bg-[#FBBF24]',
  },
  purple: {
    name: 'Rich Purple',
    bg: 'from-black via-purple-950 to-black',
    accent: '#A855F7',
    accentClass: 'text-[#A855F7]',
    bgAccentClass: 'bg-[#A855F7]',
    borderClass: 'border-[#A855F7]',
    hoverClass: 'hover:bg-[#C084FC]',
  },
  green: {
    name: 'Fresh Green',
    bg: 'from-neutral-950 via-emerald-950 to-neutral-950',
    accent: '#10B981',
    accentClass: 'text-[#10B981]',
    bgAccentClass: 'bg-[#10B981]',
    borderClass: 'border-[#10B981]',
    hoverClass: 'hover:bg-[#34D399]',
  },
};

type ColorKey = keyof typeof colors;

export default function FinalDemoPage() {
  const [selectedColors, setSelectedColors] = useState<Record<string, ColorKey>>({
    a: 'blue',
    b: 'teal',
    c: 'orange',
    d: 'purple',
    e: 'green',
  });

  const setColor = (variation: string, color: ColorKey) => {
    setSelectedColors(prev => ({ ...prev, [variation]: color }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-4 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <div className="text-sm font-semibold text-white">
              Final Hero Variations - Real Lost Monster Story
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-gradient-to-b from-neutral-900 to-black border-b border-neutral-800">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              5 Narratives. 5 Colors. Find Your Fit.
            </h1>
            <p className="text-xl text-neutral-300 mb-8">
              Same Lost Monster story, different angles. Click the color buttons to try different palettes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-left">
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <div className="text-green-400 mb-1">✓ Real narrative</div>
                <div className="text-neutral-400">Business owner who codes</div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <div className="text-green-400 mb-1">✓ No BS positioning</div>
                <div className="text-neutral-400">Cost-effective, results-focused</div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <div className="text-green-400 mb-1">✓ Hospitality focus</div>
                <div className="text-neutral-400">Hotels & accommodation</div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <div className="text-green-400 mb-1">✓ Modern tools</div>
                <div className="text-neutral-400">Not "AI" buzzwords</div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <div className="text-green-400 mb-1">✓ Borderless</div>
                <div className="text-neutral-400">No geographic fluff</div>
              </div>
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <div className="text-green-400 mb-1">✓ 5 color options</div>
                <div className="text-neutral-400">Blue, teal, orange, purple, green</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION A: Problem-Focused */}
      <VariationSection
        id="a"
        title="Variation A: Problem-Focused"
        description="Lead with pain point → offer solution"
        color={colors[selectedColors.a]}
        selectedColor={selectedColors.a}
        onColorChange={(c) => setColor('a', c)}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="mb-8">
            <span className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border ${colors[selectedColors.a].borderClass}/30 rounded-full text-sm font-medium text-white`}>
              <AlertCircle className="w-4 h-4" style={{ color: colors[selectedColors.a].accent }} />
              There's a better way
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none tracking-tight">
            <span className="text-white">Tired of Systems</span>
            <br />
            <span className="text-white">That Don't</span>
            <br />
            <span style={{ color: colors[selectedColors.a].accent }}>Actually Work?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We rebuild them. Properly. For a fraction of what agencies charge.
            Built by someone who runs businesses, not just codes them.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#"
              className={`inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold rounded-lg transition-all shadow-2xl text-black ${colors[selectedColors.a].bgAccentClass} ${colors[selectedColors.a].hoverClass}`}
              style={{ boxShadow: `0 20px 60px -15px ${colors[selectedColors.a].accent}40` }}
            >
              Fix Your System
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center px-10 py-5 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all">
              See What We've Fixed
            </a>
          </div>

          {/* Trust metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '50+', label: 'Systems Fixed', icon: CheckCircle2 },
              { value: '70%', label: 'Cost Savings', icon: DollarSign },
              { value: '4.9/5', label: 'Client Rating', icon: TrendingUp },
              { value: '2-4 wks', label: 'Typical Build', icon: Clock },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className={`bg-white/5 backdrop-blur-md border ${colors[selectedColors.a].borderClass}/20 rounded-lg p-6 text-center hover:bg-white/10 transition-all`}>
                  <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: colors[selectedColors.a].accent }} />
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-neutral-300">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </VariationSection>

      {/* VARIATION B: Business Owner Angle */}
      <VariationSection
        id="b"
        title="Variation B: Business Owner Angle"
        description="Credibility through lived experience"
        color={colors[selectedColors.b]}
        selectedColor={selectedColors.b}
        onColorChange={(c) => setColor('b', c)}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 bg-white/5 border ${colors[selectedColors.b].borderClass}/30 rounded-md text-sm font-bold uppercase tracking-widest`} style={{ color: colors[selectedColors.b].accent }}>
                  Different Approach
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none tracking-tight">
                <span className="text-white">Built by</span>
                <br />
                <span className="text-white">Someone Who</span>
                <br />
                <span style={{ color: colors[selectedColors.b].accent }}>Runs Businesses</span>
              </h1>

              <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
                Not just codes them. I build systems for my own businesses to cut costs.
                I understand your problems because I've lived them.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-lg transition-all shadow-lg text-black ${colors[selectedColors.b].bgAccentClass} ${colors[selectedColors.b].hoverClass}`}
                  style={{ boxShadow: `0 10px 40px -10px ${colors[selectedColors.b].accent}40` }}
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-neutral-500 transition-all">
                  My Story
                </a>
              </div>

              {/* Quick stats */}
              <div className="flex gap-8 text-sm">
                <div>
                  <div className="text-2xl font-bold" style={{ color: colors[selectedColors.b].accent }}>Business Owner</div>
                  <div className="text-neutral-400">First, developer second</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: colors[selectedColors.b].accent }}>Real Problems</div>
                  <div className="text-neutral-400">Real solutions</div>
                </div>
              </div>
            </div>

            {/* Right: Value props */}
            <div className="space-y-6">
              <div className={`bg-white/5 backdrop-blur-sm border ${colors[selectedColors.b].borderClass}/20 rounded-xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: `${colors[selectedColors.b].accent}20` }}>
                    <Users className="w-6 h-6" style={{ color: colors[selectedColors.b].accent }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white mb-2">I Run Businesses Too</div>
                    <div className="text-sm text-neutral-400">I build systems to reduce MY costs. The same approach works for you.</div>
                  </div>
                </div>
              </div>

              <div className={`bg-white/5 backdrop-blur-sm border ${colors[selectedColors.b].borderClass}/20 rounded-xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: `${colors[selectedColors.b].accent}20` }}>
                    <DollarSign className="w-6 h-6" style={{ color: colors[selectedColors.b].accent }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white mb-2">Cost-Conscious Development</div>
                    <div className="text-sm text-neutral-400">Modern tools mean I build faster. You pay less. Quality doesn't suffer.</div>
                  </div>
                </div>
              </div>

              <div className={`bg-white/5 backdrop-blur-sm border ${colors[selectedColors.b].borderClass}/20 rounded-xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: `${colors[selectedColors.b].accent}20` }}>
                    <CheckCircle2 className="w-6 h-6" style={{ color: colors[selectedColors.b].accent }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white mb-2">No BS, Just Results</div>
                    <div className="text-sm text-neutral-400">I listen to what you're trying to achieve. We fix what doesn't work.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VariationSection>

      {/* VARIATION C: Cost-Cutting Direct */}
      <VariationSection
        id="c"
        title="Variation C: Cost-Cutting Direct"
        description="Custom systems vs expensive subscriptions"
        color={colors[selectedColors.c]}
        selectedColor={selectedColors.c}
        onColorChange={(c) => setColor('c', c)}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8">
            <span className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border ${colors[selectedColors.c].borderClass}/30 rounded-full text-sm font-medium text-white`}>
              <DollarSign className="w-4 h-4" style={{ color: colors[selectedColors.c].accent }} />
              Stop overpaying for software
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
            <span className="text-white">Replace</span>
            <br />
            <span className="text-white">Expensive</span>
            <br />
            <span style={{ color: colors[selectedColors.c].accent }}>Software</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Custom systems built for your business. Fraction of agency costs.
            No monthly subscriptions. Built to fit, not force-fit.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#"
              className={`inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold rounded-lg transition-all shadow-2xl text-black ${colors[selectedColors.c].bgAccentClass} ${colors[selectedColors.c].hoverClass}`}
              style={{ boxShadow: `0 20px 60px -15px ${colors[selectedColors.c].accent}40` }}
            >
              Calculate Your Savings
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center px-10 py-5 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all">
              See Replacements
            </a>
          </div>

          {/* Cost comparison */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
              <div className="text-red-400 text-sm font-bold mb-4 uppercase">Traditional Approach</div>
              <div className="space-y-3 text-left text-sm text-neutral-300">
                <div className="flex items-start gap-2">
                  <div className="text-red-400 mt-0.5">✗</div>
                  <div>£500+/month subscriptions</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-red-400 mt-0.5">✗</div>
                  <div>Locked into platforms</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-red-400 mt-0.5">✗</div>
                  <div>Force-fit your business to software</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-red-400 mt-0.5">✗</div>
                  <div>£20k+ agency builds</div>
                </div>
              </div>
            </div>

            <div className={`border rounded-xl p-8`} style={{
              backgroundColor: `${colors[selectedColors.c].accent}10`,
              borderColor: `${colors[selectedColors.c].accent}40`
            }}>
              <div className="text-sm font-bold mb-4 uppercase" style={{ color: colors[selectedColors.c].accent }}>Lost Monster Approach</div>
              <div className="space-y-3 text-left text-sm text-neutral-300">
                <div className="flex items-start gap-2">
                  <div style={{ color: colors[selectedColors.c].accent }} className="mt-0.5">✓</div>
                  <div>One-time build cost</div>
                </div>
                <div className="flex items-start gap-2">
                  <div style={{ color: colors[selectedColors.c].accent }} className="mt-0.5">✓</div>
                  <div>Own your system forever</div>
                </div>
                <div className="flex items-start gap-2">
                  <div style={{ color: colors[selectedColors.c].accent }} className="mt-0.5">✓</div>
                  <div>Built to fit YOUR business</div>
                </div>
                <div className="flex items-start gap-2">
                  <div style={{ color: colors[selectedColors.c].accent }} className="mt-0.5">✓</div>
                  <div>70% less than agencies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VariationSection>

      {/* VARIATION D: Hospitality-Specific */}
      <VariationSection
        id="d"
        title="Variation D: Hospitality-Specific"
        description="Hotels & accommodation focus"
        color={colors[selectedColors.d]}
        selectedColor={selectedColors.d}
        onColorChange={(c) => setColor('d', c)}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Content (3 cols) */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border ${colors[selectedColors.d].borderClass}/30 rounded-full text-sm font-medium text-white`}>
                  <Hotel className="w-4 h-4" style={{ color: colors[selectedColors.d].accent }} />
                  Hospitality Specialists
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                <span className="text-white">Hotel Systems</span>
                <br />
                <span className="text-white">That</span>
                <br />
                <span style={{ color: colors[selectedColors.d].accent }}>Actually Work</span>
              </h1>

              <p className="text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl">
                We've fixed booking chaos for 50+ hotels and accommodations.
                Deep dive into your problems. Build what works. Deliver in weeks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#"
                  className={`inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold rounded-lg transition-all shadow-lg text-black ${colors[selectedColors.d].bgAccentClass} ${colors[selectedColors.d].hoverClass}`}
                  style={{ boxShadow: `0 10px 40px -10px ${colors[selectedColors.d].accent}40` }}
                >
                  Fix My Bookings
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-10 py-5 border-2 border-neutral-700 text-white text-lg font-semibold rounded-lg hover:border-neutral-500 transition-all">
                  Hotel Case Studies
                </a>
              </div>

              {/* Common problems */}
              <div className="space-y-3 text-sm">
                <div className="text-neutral-500 font-semibold mb-2">Common problems we fix:</div>
                <div className="flex items-start gap-2 text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors[selectedColors.d].accent }} />
                  <span>Double bookings and overbooking chaos</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors[selectedColors.d].accent }} />
                  <span>Expensive channel manager subscriptions</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors[selectedColors.d].accent }} />
                  <span>Manual processes eating staff time</span>
                </div>
              </div>
            </div>

            {/* Right: Results (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`bg-white/5 backdrop-blur-xl border ${colors[selectedColors.d].borderClass}/30 rounded-2xl p-6`}>
                <div className="text-5xl font-bold text-white mb-2">200%</div>
                <div className="text-sm font-semibold text-white mb-2">Bookings Increase</div>
                <div className="text-xs text-neutral-400">Highland Spa - First month after launch</div>
              </div>

              <div className={`bg-white/5 backdrop-blur-xl border ${colors[selectedColors.d].borderClass}/30 rounded-2xl p-6`}>
                <div className="text-5xl font-bold text-white mb-2">10hrs</div>
                <div className="text-sm font-semibold text-white mb-2">Saved Per Week</div>
                <div className="text-xs text-neutral-400">Automated manual processes</div>
              </div>

              <div className={`bg-white/5 backdrop-blur-xl border ${colors[selectedColors.d].borderClass}/30 rounded-2xl p-6`}>
                <div className="text-5xl font-bold text-white mb-2">£0</div>
                <div className="text-sm font-semibold text-white mb-2">Monthly Fees</div>
                <div className="text-xs text-neutral-400">Own your system, no subscriptions</div>
              </div>
            </div>
          </div>
        </div>
      </VariationSection>

      {/* VARIATION E: Speed + Quality */}
      <VariationSection
        id="e"
        title="Variation E: Speed + Quality"
        description="Fast development without compromise"
        color={colors[selectedColors.e]}
        selectedColor={selectedColors.e}
        onColorChange={(c) => setColor('e', c)}
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="mb-8">
            <span className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border ${colors[selectedColors.e].borderClass}/30 rounded-full text-sm font-medium text-white`}>
              <Zap className="w-4 h-4" style={{ color: colors[selectedColors.e].accent }} />
              Modern development tools
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
            <span className="text-white">Built in Weeks.</span>
            <br />
            <span style={{ color: colors[selectedColors.e].accent }}>Built Right.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Fast development. Meticulous execution. Real results.
            Modern tools mean speed. Experience means quality doesn't suffer.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a
              href="#"
              className={`inline-flex items-center justify-center gap-2 px-12 py-6 text-xl font-bold rounded-lg transition-all shadow-2xl text-black ${colors[selectedColors.e].bgAccentClass} ${colors[selectedColors.e].hoverClass}`}
              style={{ boxShadow: `0 20px 60px -15px ${colors[selectedColors.e].accent}40` }}
            >
              Start Your Project
              <ArrowRight className="w-6 h-6" />
            </a>
            <a href="#" className="inline-flex items-center justify-center px-12 py-6 border-2 border-neutral-700 text-white text-xl font-semibold rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all">
              See Timeline
            </a>
          </div>

          {/* Speed metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: '2-4 wks', label: 'Typical Build Time', subtext: 'Not months', icon: Clock },
              { value: '100%', label: 'On-Time Delivery', subtext: 'Every project', icon: CheckCircle2 },
              { value: '70%', label: 'Cost Savings', subtext: 'vs agencies', icon: DollarSign },
              { value: '4.9/5', label: 'Quality Rating', subtext: '50+ projects', icon: TrendingUp },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className={`bg-white/5 backdrop-blur-md border ${colors[selectedColors.e].borderClass}/20 rounded-xl p-6 hover:bg-white/10 transition-all`}>
                  <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: colors[selectedColors.e].accent }} />
                  <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
                  <div className="text-xs text-neutral-400">{metric.subtext}</div>
                </div>
              );
            })}
          </div>
        </div>
      </VariationSection>

      {/* Comparison Summary */}
      <section className="py-24 bg-neutral-900">
        <div className="container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Which Resonates Most?
            </h2>
            <p className="text-xl text-neutral-400 mb-16 text-center max-w-3xl mx-auto">
              Same Lost Monster story, different angles. Pick the narrative + color that feels right.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-bold text-xl mb-4">A</div>
                <h3 className="text-lg font-bold text-white mb-2">Problem-Focused</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  "Tired of systems that don't work?" → Lead with pain, offer solution
                </p>
                <div className="text-xs text-neutral-500">Best for: Frustrated buyers, broken systems</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xl mb-4">B</div>
                <h3 className="text-lg font-bold text-white mb-2">Business Owner Angle</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  "Built by someone who runs businesses" → Credibility through lived experience
                </p>
                <div className="text-xs text-neutral-500">Best for: Trust-building, differentiation</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 font-bold text-xl mb-4">C</div>
                <h3 className="text-lg font-bold text-white mb-2">Cost-Cutting Direct</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  "Replace expensive software" → Custom vs subscription, cost focus
                </p>
                <div className="text-xs text-neutral-500">Best for: Budget-conscious, ROI-driven</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold text-xl mb-4">D</div>
                <h3 className="text-lg font-bold text-white mb-2">Hospitality-Specific</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  "Hotel systems that work" → Industry focus, proven results
                </p>
                <div className="text-xs text-neutral-500">Best for: Hotels, accommodation, hospitality</div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 lg:col-span-2">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 font-bold text-xl mb-4">E</div>
                <h3 className="text-lg font-bold text-white mb-2">Speed + Quality</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  "Built in weeks. Built right." → Fast without compromise
                </p>
                <div className="text-xs text-neutral-500">Best for: Time-sensitive, efficiency-focused buyers</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">All Variations Share:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-300 mb-3">✓ Real Lost Monster Story</h4>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li>• Business owner who codes</li>
                    <li>• Modern development tools</li>
                    <li>• Cost-effective approach</li>
                    <li>• Deep dive into problems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-300 mb-3">✓ No BS Positioning</h4>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li>• Results-oriented language</li>
                    <li>• Hospitality examples</li>
                    <li>• Borderless, international</li>
                    <li>• No "AI" buzzwords</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-white font-semibold mb-2">
                Pick your favorite narrative + color combination
              </p>
              <p className="text-sm text-neutral-500">
                This is the real Lost Monster. No fluff, no fake Scottish tourism, just honest positioning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Section wrapper component with color switcher
function VariationSection({
  id,
  title,
  description,
  color,
  selectedColor,
  onColorChange,
  children
}: {
  id: string;
  title: string;
  description: string;
  color: typeof colors[ColorKey];
  selectedColor: ColorKey;
  onColorChange: (color: ColorKey) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-t-4 border-neutral-800">
      {/* Background with selected color gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.bg}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-6 py-24">
        {children}
      </div>

      {/* Info badge + color switcher */}
      <div className="absolute top-8 right-8 z-20 space-y-4">
        {/* Info */}
        <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg p-4 max-w-xs">
          <div className="text-xs font-bold text-white mb-2">{title}</div>
          <div className="text-xs text-neutral-400 mb-4">{description}</div>

          {/* Color switcher */}
          <div className="text-xs text-neutral-500 mb-2">Try colors:</div>
          <div className="flex gap-2">
            {(Object.keys(colors) as ColorKey[]).map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => onColorChange(colorKey)}
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === colorKey ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-50 hover:opacity-100'
                }`}
                style={{ backgroundColor: colors[colorKey].accent }}
                title={colors[colorKey].name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
