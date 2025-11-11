'use client';

import { useState } from 'react';
import {
  ThumbsUp,
  CheckCircle2,
  Rocket,
  Zap,
  Sparkles,
  Star,
  Trophy,
  Check,
  CircleCheck,
  BadgeCheck,
  PartyPopper
} from 'lucide-react';

export default function SuccessDemoPage() {
  const [selectedColor, setSelectedColor] = useState('#06B6D4'); // Teal default

  const colors = {
    teal: '#06B6D4',
    orange: '#F59E0B',
    purple: '#A855F7',
    blue: '#60A5FA',
    green: '#10B981',
  };

  const iconOptions = [
    {
      name: 'Thumbs Up (Current)',
      component: ThumbsUp,
      description: 'Classic approval gesture'
    },
    {
      name: 'Check Circle',
      component: CheckCircle2,
      description: 'Clean, confirmed completion'
    },
    {
      name: 'Rocket',
      component: Rocket,
      description: 'Launch energy, exciting!'
    },
    {
      name: 'Zap/Lightning',
      component: Zap,
      description: 'Fast, electric, dynamic'
    },
    {
      name: 'Sparkles',
      component: Sparkles,
      description: 'Magic, special moment'
    },
    {
      name: 'Star',
      component: Star,
      description: 'Achievement, quality'
    },
    {
      name: 'Trophy',
      component: Trophy,
      description: 'Winner, accomplished'
    },
    {
      name: 'Simple Check',
      component: Check,
      description: 'Minimal, done'
    },
    {
      name: 'Circle Check',
      component: CircleCheck,
      description: 'Approved, verified'
    },
    {
      name: 'Badge Check',
      component: BadgeCheck,
      description: 'Certified, official'
    },
  ];

  const emojiOptions = [
    { emoji: '🚀', name: 'Rocket', description: 'Launch, exciting!' },
    { emoji: '✨', name: 'Sparkles', description: 'Magic moment' },
    { emoji: '🎉', name: 'Party', description: 'Celebration!' },
    { emoji: '⚡', name: 'Lightning', description: 'Fast, electric' },
    { emoji: '🔥', name: 'Fire', description: 'Hot, awesome' },
    { emoji: '💪', name: 'Muscle', description: 'Strong, confident' },
    { emoji: '👊', name: 'Fist Bump', description: 'Solid, done deal' },
    { emoji: '✅', name: 'Check Mark', description: 'Clean, confirmed' },
    { emoji: '🎯', name: 'Target', description: 'On point, accurate' },
    { emoji: '💥', name: 'Boom', description: 'Impact, explosive' },
    { emoji: '🌟', name: 'Glowing Star', description: 'Shining success' },
    { emoji: '🤝', name: 'Handshake', description: 'Deal made' },
  ];

  const textOnlyOptions = [
    { text: 'DONE!', description: 'Direct, conclusive' },
    { text: 'GOT IT!', description: 'Received, acknowledged' },
    { text: 'LOCKED IN!', description: 'Secured, committed' },
    { text: 'LET\'S GO!', description: 'Energetic, forward' },
    { text: 'BOOM!', description: 'Impact, powerful' },
    { text: 'SORTED!', description: 'UK slang, handled' },
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
          Success Screen Options
        </h1>
        <p className="text-xl text-neutral-400 text-center mb-12">
          Click through to see what works best for Lost Monster
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Lucide Icons Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Lucide Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iconOptions.map((option) => {
              const IconComponent = option.component;
              return (
                <div
                  key={option.name}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col items-center justify-center">
                    {/* Icon Display */}
                    <div className="relative mb-6">
                      <div
                        className="absolute inset-0 blur-3xl opacity-40 animate-pulse"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <IconComponent
                        className="relative w-32 h-32 drop-shadow-2xl"
                        style={{
                          color: selectedColor,
                          filter: `drop-shadow(0 0 30px ${selectedColor}60)`
                        }}
                        strokeWidth={2}
                        fill={selectedColor}
                      />
                    </div>

                    {/* Text */}
                    <h3 className="text-5xl font-bold text-white mb-2 leading-none tracking-tighter">
                      Nice one!
                    </h3>
                    <p className="text-lg text-neutral-300 text-center mb-4">
                      I'll get back to you within 24 hours
                    </p>

                    {/* Info */}
                    <div className="mt-4 pt-4 border-t border-white/10 w-full">
                      <p className="text-sm font-bold text-white">{option.name}</p>
                      <p className="text-xs text-neutral-400">{option.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Emoji Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Emojis (Native)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emojiOptions.map((option) => (
              <div
                key={option.name}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Emoji Display */}
                  <div className="relative mb-6">
                    <div
                      className="absolute inset-0 blur-3xl opacity-40 animate-pulse"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div
                      className="relative text-8xl drop-shadow-2xl"
                      style={{
                        filter: `drop-shadow(0 0 30px ${selectedColor}60)`
                      }}
                    >
                      {option.emoji}
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-5xl font-bold text-white mb-2 leading-none tracking-tighter">
                    Nice one!
                  </h3>
                  <p className="text-lg text-neutral-300 text-center mb-4">
                    I'll get back to you within 24 hours
                  </p>

                  {/* Info */}
                  <div className="mt-4 pt-4 border-t border-white/10 w-full">
                    <p className="text-sm font-bold text-white">{option.name}</p>
                    <p className="text-xs text-neutral-400">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Text Only Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Text Only (No Icon)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textOnlyOptions.map((option) => (
              <div
                key={option.text}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Large Text Display */}
                  <div className="mb-6">
                    <h3
                      className="text-7xl md:text-8xl font-bold leading-none tracking-tighter"
                      style={{
                        color: selectedColor,
                        textShadow: `0 0 60px ${selectedColor}60`
                      }}
                    >
                      {option.text}
                    </h3>
                  </div>

                  <p className="text-lg text-neutral-300 text-center mb-4">
                    I'll get back to you within 24 hours
                  </p>

                  {/* Info */}
                  <div className="mt-4 pt-4 border-t border-white/10 w-full">
                    <p className="text-xs text-neutral-400 text-center">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combined Effects Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Combined Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option: Emoji + Bold Text */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">🚀</div>
                  <h3
                    className="text-6xl font-bold leading-none tracking-tighter"
                    style={{ color: selectedColor }}
                  >
                    SENT!
                  </h3>
                </div>
                <p className="text-lg text-neutral-300 text-center">
                  I'll get back to you within 24 hours
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 w-full">
                  <p className="text-xs text-neutral-400 text-center">Emoji + Bold Text Combo</p>
                </div>
              </div>
            </div>

            {/* Option: Icon + Emoji Stack */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all">
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 blur-3xl opacity-40" style={{ backgroundColor: selectedColor }} />
                  <div className="relative flex flex-col items-center">
                    <Rocket className="w-20 h-20 mb-2" style={{ color: selectedColor }} strokeWidth={2} />
                    <div className="text-4xl">✨</div>
                  </div>
                </div>
                <h3 className="text-5xl font-bold text-white mb-2 leading-none tracking-tighter">
                  Nice one!
                </h3>
                <p className="text-lg text-neutral-300 text-center">
                  I'll get back to you within 24 hours
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 w-full">
                  <p className="text-xs text-neutral-400 text-center">Icon + Emoji Stack</p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
