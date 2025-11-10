'use client';

import { useState, useEffect } from 'react';
import ContactForm from '@/components/forms/ContactForm';
import { Mail } from 'lucide-react';

const colors = {
  blue: {
    name: 'Sky Blue',
    bg: 'from-[#1E3A8A] via-[#1E40AF] to-[#1E3A8A]',
    accent: '#60A5FA',
  },
  teal: {
    name: 'Vibrant Teal',
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    accent: '#06B6D4',
  },
  orange: {
    name: 'Bold Orange',
    bg: 'from-neutral-900 via-stone-900 to-neutral-900',
    accent: '#F59E0B',
  },
  purple: {
    name: 'Rich Purple',
    bg: 'from-black via-purple-950 to-black',
    accent: '#A855F7',
  },
  green: {
    name: 'Fresh Green',
    bg: 'from-neutral-950 via-emerald-950 to-neutral-950',
    accent: '#10B981',
  },
};

type ColorKey = keyof typeof colors;

export default function ContactPage() {
  const [selectedColor, setSelectedColor] = useState<ColorKey>('orange');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lostmonster-color') as ColorKey;
    if (saved && colors[saved]) {
      setSelectedColor(saved);
    }
  }, []);

  const color = colors[selectedColor];

  if (!mounted) {
    return null;
  }

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${color.bg} transition-colors duration-700`}>
      {/* Fixed grid pattern background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-none tracking-tighter">
              <span className="text-white">Let's Build</span>
              <br />
              <span className="transition-colors duration-300" style={{ color: color.accent }}>Something</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Tell me about your project. I'll tell you if we're a good fit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative pb-20 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ContactForm accentColor={color.accent} />
          </div>
        </div>
      </section>

      {/* Alternative Contact Section */}
      <section className="relative pb-20 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
                <div className="text-left">
                  <p className="text-sm text-neutral-400 mb-1">Prefer email?</p>
                  <a
                    href="mailto:hello@lostmonster.io"
                    className="text-white font-medium hover:opacity-80 transition-opacity"
                    style={{ color: color.accent }}
                  >
                    hello@lostmonster.io
                  </a>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-400">
                I typically respond within 24 hours
              </p>
            </div>
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
                onClick={() => {
                  setSelectedColor(colorKey);
                  localStorage.setItem('lostmonster-color', colorKey);
                }}
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
