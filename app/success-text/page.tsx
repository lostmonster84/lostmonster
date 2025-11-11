'use client';

import { useState } from 'react';

export default function SuccessTextDemoPage() {
  const [selectedColor, setSelectedColor] = useState('#06B6D4'); // Teal default

  const colors = {
    teal: '#06B6D4',
    orange: '#F59E0B',
    purple: '#A855F7',
    blue: '#60A5FA',
    green: '#10B981',
  };

  const textOptions = [
    {
      id: 1,
      headline: 'Nice one',
      subtext: 'Thanks for your submission',
      description: 'Current - Direct and friendly',
      vibe: 'Balanced, approachable'
    },
    {
      id: 2,
      headline: 'Got it',
      subtext: "I'll get back to you within 24 hours",
      description: 'Confident/Businesslike',
      vibe: 'Direct, sets expectation'
    },
    {
      id: 3,
      headline: 'Perfect',
      subtext: 'Talk soon',
      description: 'Personal/Casual',
      vibe: 'Friendly, informal'
    },
    {
      id: 4,
      headline: 'Message received',
      subtext: 'Reply incoming',
      description: 'Action-Oriented',
      vibe: 'Technical, status update'
    },
    {
      id: 5,
      headline: 'Done',
      subtext: "I'll be in touch",
      description: 'Minimal/Understated',
      vibe: 'Confident, no fluff'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black p-8">
      {/* Color Picker */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-white font-semibold">Pick a color:</span>
          {Object.entries(colors).map(([name, color]) => (
            <button
              key={name}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-full transition-all ${
                selectedColor === color ? 'ring-4 ring-white scale-110' : 'opacity-50 hover:opacity-100'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select ${name} color`}
            />
          ))}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4">
          Success Message Options
        </h1>
        <p className="text-xl text-neutral-400 text-center mb-12">
          All shown at MASSIVE Lost Monster scale (128px headline)
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {textOptions.map((option) => (
          <div
            key={option.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-white/20 transition-all relative overflow-hidden"
          >
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none"></div>

            {/* Success Screen Preview */}
            <div className="relative flex flex-col items-center justify-center py-16 md:py-20">
              <h2
                className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none tracking-tighter text-center px-4"
                style={{
                  color: selectedColor,
                  textShadow: `0 0 80px ${selectedColor}40`
                }}
              >
                {option.headline}
              </h2>
              <p className="text-2xl md:text-3xl text-white font-medium text-center px-4">
                {option.subtext}
              </p>
            </div>

            {/* Info Footer */}
            <div className="relative border-t border-white/10 p-6 bg-black/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-base font-bold text-white mb-1">
                    Option {option.id}: {option.description}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {option.vibe}
                  </p>
                </div>
                <button
                  className="px-6 py-3 rounded-lg font-bold text-black transition-all hover:scale-105"
                  style={{
                    backgroundColor: selectedColor,
                    boxShadow: `0 10px 30px -10px ${selectedColor}60`
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(`${option.headline}\n${option.subtext}`);
                    alert('Copied to clipboard!');
                  }}
                >
                  Copy Text
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side-by-Side Comparison */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Side-by-Side Comparison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textOptions.map((option) => (
            <div
              key={`compact-${option.id}`}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col items-center justify-center py-8">
                <h3
                  className="text-4xl md:text-5xl font-bold mb-3 leading-none tracking-tighter text-center"
                  style={{
                    color: selectedColor,
                    textShadow: `0 0 40px ${selectedColor}40`
                  }}
                >
                  {option.headline}
                </h3>
                <p className="text-lg text-white font-medium text-center mb-6">
                  {option.subtext}
                </p>
                <div className="pt-4 border-t border-white/10 w-full">
                  <p className="text-xs font-bold text-white text-center">
                    #{option.id}
                  </p>
                  <p className="text-xs text-neutral-400 text-center mt-1">
                    {option.vibe}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Character Analysis */}
      <div className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Character Count Analysis</h2>
        <div className="space-y-4">
          {textOptions.map((option) => (
            <div
              key={`chars-${option.id}`}
              className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
            >
              <div>
                <p className="text-white font-semibold">Option {option.id}</p>
                <p className="text-sm text-neutral-400">"{option.headline}"</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ color: selectedColor }}>
                  {option.headline.length}
                </p>
                <p className="text-xs text-neutral-400">characters</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-neutral-400 text-center">
            Shorter = Bolder. Longer headlines have less impact at massive scale.
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <a
          href="/"
          className="inline-block px-8 py-4 text-lg font-bold rounded-xl transition-all shadow-2xl text-black hover:scale-105"
          style={{
            backgroundColor: selectedColor,
            boxShadow: `0 20px 60px -15px ${selectedColor}40`
          }}
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
