'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, DollarSign, Clock, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

const colors = {
  blue: {
    name: 'Sky Blue',
    bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]',
    accent: '#60A5FA',
    accentClass: 'text-[#60A5FA]',
    bgAccentClass: 'bg-[#60A5FA]',
    hoverClass: 'hover:bg-[#7CB6FB]',
  },
  teal: {
    name: 'Vibrant Teal',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    accent: '#06B6D4',
    accentClass: 'text-[#06B6D4]',
    bgAccentClass: 'bg-[#06B6D4]',
    hoverClass: 'hover:bg-[#08D4F0]',
  },
  orange: {
    name: 'Bold Orange',
    bg: 'from-neutral-900 via-stone-900 to-neutral-900',
    accent: '#F59E0B',
    accentClass: 'text-[#F59E0B]',
    bgAccentClass: 'bg-[#F59E0B]',
    hoverClass: 'hover:bg-[#FBBF24]',
  },
  purple: {
    name: 'Rich Purple',
    bg: 'from-black via-purple-950 to-black',
    accent: '#A855F7',
    accentClass: 'text-[#A855F7]',
    bgAccentClass: 'bg-[#A855F7]',
    hoverClass: 'hover:bg-[#C084FC]',
  },
  green: {
    name: 'Fresh Green',
    bg: 'from-neutral-950 via-emerald-950 to-neutral-950',
    accent: '#10B981',
    accentClass: 'text-[#10B981]',
    bgAccentClass: 'bg-[#10B981]',
    hoverClass: 'hover:bg-[#34D399]',
  },
};

type ColorKey = keyof typeof colors;

export default function WinnerDemoPage() {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('orange');
  const color = colors[selectedColor];

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
              Winner: Business Owner Narrative + Clean Layout
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with selected color gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color.bg}`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom px-6 py-24">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge */}
            <div className="mb-8">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border rounded-full text-sm font-medium text-white`}
                style={{ borderColor: `${color.accent}30` }}
              >
                <Users className="w-4 h-4" style={{ color: color.accent }} />
                Different Approach
              </span>
            </div>

            {/* Headline - MASSIVE */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
              <span className="text-white">Built by</span>
              <br />
              <span className="text-white">Someone Who</span>
              <br />
              <span style={{ color: color.accent }}>Runs Businesses</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Not just codes them. I build systems for my own businesses to cut costs.
              I understand your problems because I've lived them.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <a
                href="#"
                className={`inline-flex items-center justify-center gap-2 px-12 py-6 text-xl font-bold rounded-lg transition-all shadow-2xl text-black`}
                style={{
                  backgroundColor: color.accent,
                  boxShadow: `0 20px 60px -15px ${color.accent}40`
                }}
                onMouseEnter={(e) => {
                  const hoverColor = color.accent === '#F59E0B' ? '#FBBF24' :
                                    color.accent === '#60A5FA' ? '#7CB6FB' :
                                    color.accent === '#06B6D4' ? '#08D4F0' :
                                    color.accent === '#A855F7' ? '#C084FC' : '#34D399';
                  e.currentTarget.style.backgroundColor = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = color.accent;
                }}
              >
                Start Your Project
                <ArrowRight className="w-6 h-6" />
              </a>
              <a href="#" className="inline-flex items-center justify-center px-12 py-6 border-2 border-neutral-700 text-white text-xl font-semibold rounded-lg hover:border-neutral-500 hover:bg-neutral-900 transition-all">
                My Story
              </a>
            </div>

            {/* Metrics - Clean Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: '50+', label: 'Projects Built', subtext: 'Delivered on time', icon: CheckCircle2 },
                { value: '70%', label: 'Cost Savings', subtext: 'vs agencies', icon: DollarSign },
                { value: '4.9/5', label: 'Client Rating', subtext: 'Real reviews', icon: TrendingUp },
                { value: '2-4 wks', label: 'Typical Build', subtext: 'Not months', icon: Clock },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-md border rounded-xl p-6 hover:bg-white/10 transition-all"
                    style={{ borderColor: `${color.accent}20` }}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: color.accent }} />
                    <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
                    <div className="text-xs text-neutral-400">{metric.subtext}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Color switcher - top right */}
        <div className="absolute top-8 right-8 z-20">
          <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg p-4 max-w-xs">
            <div className="text-xs font-bold text-white mb-2">Winner Combination</div>
            <div className="text-xs text-neutral-400 mb-4">
              Business Owner narrative + Clean centered layout
            </div>

            <div className="text-xs text-neutral-500 mb-2">Try colors:</div>
            <div className="flex gap-2">
              {(Object.keys(colors) as ColorKey[]).map((colorKey) => (
                <button
                  key={colorKey}
                  onClick={() => setSelectedColor(colorKey)}
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

      {/* Why This Works */}
      <section className="py-24 bg-neutral-900">
        <div className="container-custom px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Why This Combination Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-white mb-3">Unique Positioning</h3>
                <p className="text-sm text-neutral-400">
                  "Business owner who codes" is different from every other dev agency.
                  It's TRUE and it's MEMORABLE.
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="text-3xl mb-4">💪</div>
                <h3 className="text-lg font-bold text-white mb-3">Builds Trust</h3>
                <p className="text-sm text-neutral-400">
                  "I've lived your problems" hits different than "we understand businesses."
                  It's credible because it's authentic.
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-lg font-bold text-white mb-3">Explains Advantage</h3>
                <p className="text-sm text-neutral-400">
                  "Modern tools" + "cost-effective" without saying "AI-powered" or sounding cheap.
                  Fast AND quality.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">The Full Story:</h3>
              <div className="space-y-4 text-neutral-300">
                <p>
                  <strong className="text-white">Headline:</strong> "Built by Someone Who Runs Businesses"
                  <br />
                  <span className="text-sm text-neutral-400">→ Unique differentiator, true to who you are</span>
                </p>
                <p>
                  <strong className="text-white">Subhead:</strong> "I build systems for my own businesses to cut costs. I've lived your problems."
                  <br />
                  <span className="text-sm text-neutral-400">→ Explains WHY you're different (cost-conscious, empathetic)</span>
                </p>
                <p>
                  <strong className="text-white">Layout:</strong> Centered, massive typography, clean metrics grid
                  <br />
                  <span className="text-sm text-neutral-400">→ Bold, confident, lots of breathing room</span>
                </p>
                <p>
                  <strong className="text-white">Color:</strong> Orange recommended (or blue if you prefer safer)
                  <br />
                  <span className="text-sm text-neutral-400">→ Orange = bold, different, warm. Blue = trustworthy, professional</span>
                </p>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-neutral-950 border border-green-800/50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-green-400 mb-4">✓ What This Says</h4>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li>• I'm a business owner first, developer second</li>
                  <li>• I understand costs because I manage them myself</li>
                  <li>• I use modern tools to work faster (not "AI")</li>
                  <li>• I've solved problems like yours for my own businesses</li>
                  <li>• You get business understanding + technical execution</li>
                </ul>
              </div>

              <div className="bg-neutral-950 border border-orange-800/50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-orange-400 mb-4">→ What To Add</h4>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li>• Mention hospitality focus in subhead or value props</li>
                  <li>• "Specializing in hotels & accommodation systems"</li>
                  <li>• Keep metrics: 50+ projects, 70% cost savings, 4.9/5 rating</li>
                  <li>• Show real results: "Fixed booking chaos for X properties"</li>
                  <li>• Optional: Your photo/bio on About page to reinforce "real person"</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-white font-semibold mb-2">
                This is the Lost Monster hero.
              </p>
              <p className="text-sm text-neutral-500 max-w-2xl mx-auto">
                Real story. Bold design. No BS. No fake Scottish tourism. No "AI-powered" buzzwords.
                Just honest positioning from someone who actually runs businesses and codes for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Optional: Alternative Headlines */}
      <section className="py-24 bg-black border-t border-neutral-800">
        <div className="container-custom px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Alternative Headlines (Same Narrative)
            </h2>
            <p className="text-neutral-400 mb-12 text-center">
              If you want to tweak the exact wording, here are variations that keep the same positioning:
            </p>

            <div className="space-y-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">
                  Option 1: "Built by Someone Who Runs Businesses"
                </div>
                <div className="text-sm text-neutral-400">
                  → Current choice. Direct, clear, unique.
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">
                  Option 2: "Built by a Business Owner Who Codes"
                </div>
                <div className="text-sm text-neutral-400">
                  → Slightly different order, same message. More direct about coding.
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">
                  Option 3: "I Run Businesses. I Build Systems."
                </div>
                <div className="text-sm text-neutral-400">
                  → More personal (first person). Bolder, more direct.
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-2">
                  Option 4: "Business Owner First. Developer Second."
                </div>
                <div className="text-sm text-neutral-400">
                  → Very clear hierarchy. Emphasizes business understanding.
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg">
              <p className="text-sm text-neutral-400 text-center">
                <strong className="text-white">Recommendation:</strong> Stick with Option 1. It's the strongest -
                unique, memorable, and doesn't feel like bragging. Options 3 & 4 are more aggressive if you want that.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
