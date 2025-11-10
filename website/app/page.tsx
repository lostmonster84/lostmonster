'use client';

import { ArrowRight, CheckCircle2, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const colors = {
  blue: {
    name: 'Sky Blue',
    bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]',
    accent: '#60A5FA',
    hoverAccent: '#7CB6FB',
  },
  teal: {
    name: 'Vibrant Teal',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    accent: '#06B6D4',
    hoverAccent: '#08D4F0',
  },
  orange: {
    name: 'Bold Orange',
    bg: 'from-neutral-900 via-stone-900 to-neutral-900',
    accent: '#F59E0B',
    hoverAccent: '#FBBF24',
  },
  purple: {
    name: 'Rich Purple',
    bg: 'from-black via-purple-950 to-black',
    accent: '#A855F7',
    hoverAccent: '#C084FC',
  },
  green: {
    name: 'Fresh Green',
    bg: 'from-neutral-950 via-emerald-950 to-neutral-950',
    accent: '#10B981',
    hoverAccent: '#34D399',
  },
};

type ColorKey = keyof typeof colors;

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('orange');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lostmonster-color') as ColorKey;
    if (saved && colors[saved]) {
      setSelectedColor(saved);
    }
  }, []);

  const handleColorChange = (colorKey: ColorKey) => {
    setSelectedColor(colorKey);
    localStorage.setItem('lostmonster-color', colorKey);
  };

  const color = colors[selectedColor];

  if (!mounted) {
    return null;
  }

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${color.bg} transition-colors duration-700`}>
      {/* Fixed grid pattern background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none -z-10"></div>

      {/* Hero Section - Full Viewport */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 w-full">
          <div className="text-center max-w-6xl mx-auto">
            {/* Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
              <span className="text-white">Built by</span>
              <br />
              <span className="text-white">Someone Who</span>
              <br />
              <span className="transition-colors duration-300" style={{ color: color.accent }}>Runs Businesses</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Not just codes them. I build systems for my own businesses to cut costs.
              I understand your problems because I've lived them.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-12 py-6 text-xl font-bold rounded-lg transition-all shadow-2xl text-black group"
                style={{
                  backgroundColor: color.accent,
                  boxShadow: `0 20px 60px -15px ${color.accent}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = color.hoverAccent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = color.accent;
                }}
              >
                Start Your Project
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section - Separate Below */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-6">
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
                  style={{
                    borderColor: `${color.accent}20`,
                  }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-3 transition-colors duration-300" style={{ color: color.accent }} />
                  <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
                  <div className="text-xs text-neutral-400">{metric.subtext}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Color switcher */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg p-4 shadow-2xl">
          <div className="text-xs font-semibold text-white mb-3 text-center">Choose Your Color</div>
          <div className="flex gap-3">
            {(Object.keys(colors) as ColorKey[]).map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => handleColorChange(colorKey)}
                className={`w-10 h-10 rounded-full transition-all ${
                  selectedColor === colorKey
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: colors[colorKey].accent }}
                title={colors[colorKey].name}
                aria-label={`Switch to ${colors[colorKey].name}`}
              />
            ))}
          </div>
          <div className="text-xs text-neutral-400 mt-2 text-center">
            {color.name}
          </div>
        </div>
      </div>
    </div>
  );
}
