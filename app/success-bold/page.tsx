'use client';

import { useState, useEffect } from 'react';

export default function SuccessBoldPage() {
  const [selectedColor, setSelectedColor] = useState('#06B6D4'); // Teal default
  const [cursorVisible, setCursorVisible] = useState(true);
  const [countdown, setCountdown] = useState(86400); // 24 hours in seconds

  const colors = {
    teal: '#06B6D4',
    orange: '#F59E0B',
    purple: '#A855F7',
    blue: '#60A5FA',
    green: '#10B981',
  };

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
          Bold Success Concepts
        </h1>
        <p className="text-xl text-neutral-400 text-center mb-12">
          Distinctive, aggressive options for Lost Monster
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. BRUTALIST/TERMINAL */}
        <div className="bg-black border-2 border-white/20 rounded-xl p-12 hover:border-white/40 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="font-mono text-4xl md:text-6xl font-bold mb-6" style={{ color: selectedColor }}>
              &gt; MESSAGE_RECEIVED
              <span className={`inline-block w-1 h-12 ml-2 bg-current ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <p className="font-mono text-lg text-neutral-400 text-center">
              Reply queued. ETA: 24h
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">1. BRUTALIST/TERMINAL</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Command-line aesthetic. Technical, direct, developer vibe.
              </p>
            </div>
          </div>
        </div>

        {/* 2. GLITCH/TECH */}
        <div className="bg-black border-2 border-white/20 rounded-xl p-12 hover:border-white/40 transition-all relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${selectedColor}20 0px, transparent 1px, transparent 2px, ${selectedColor}20 3px)`,
            }}
          />
          <div className="flex flex-col items-center justify-center py-8 relative">
            <div className="relative">
              <h2
                className="text-6xl md:text-8xl font-black mb-6 animate-pulse"
                style={{
                  color: selectedColor,
                  textShadow: `
                    2px 2px 0 ${selectedColor}40,
                    -2px -2px 0 ${selectedColor}40,
                    0 0 40px ${selectedColor}80
                  `,
                  letterSpacing: '0.1em',
                }}
              >
                LOCKED IN
              </h2>
              {/* Glitch overlay */}
              <div
                className="absolute inset-0 text-6xl md:text-8xl font-black opacity-70 mix-blend-screen"
                style={{
                  color: selectedColor,
                  transform: 'translate(3px, 3px)',
                  clipPath: 'polygon(0 20%, 100% 20%, 100% 21%, 0 21%)',
                }}
              >
                LOCKED IN
              </div>
            </div>
            <p className="text-lg text-neutral-400 text-center" style={{ fontFamily: 'monospace' }}>
              &gt;&gt; Response protocol initiated
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">2. GLITCH/TECH</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Cyberpunk distortion. Digital, edgy, matrix vibe.
              </p>
            </div>
          </div>
        </div>

        {/* 3. STAMP/SEAL */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className="relative transform -rotate-12"
              style={{
                filter: `drop-shadow(0 10px 30px ${selectedColor}60)`,
              }}
            >
              <div
                className="border-8 rounded-full px-16 py-12"
                style={{
                  borderColor: selectedColor,
                  opacity: 0.9,
                }}
              >
                <p
                  className="text-6xl md:text-7xl font-black tracking-wider"
                  style={{
                    color: selectedColor,
                    textTransform: 'uppercase',
                  }}
                >
                  RECEIVED
                </p>
              </div>
            </div>
            <p className="text-lg text-neutral-300 text-center mt-12">
              I'll get back to you within 24 hours
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">3. STAMP/SEAL</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Official document stamp. Direct, businesslike, authoritative.
              </p>
            </div>
          </div>
        </div>

        {/* 4. PROGRESS BAR */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-2xl mb-8">
              <div className="flex justify-between text-sm font-mono text-neutral-400 mb-3">
                <span className="opacity-50">SUBMITTED</span>
                <span className="opacity-50">PROCESSING</span>
                <span style={{ color: selectedColor }}>QUEUED</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 animate-pulse"
                  style={{
                    width: '100%',
                    backgroundColor: selectedColor,
                    boxShadow: `0 0 20px ${selectedColor}80`,
                  }}
                />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">100% Complete</h2>
            <p className="text-lg text-neutral-300 text-center">
              Response in progress. Check your inbox.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">4. PROGRESS BAR</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Developer/technical aesthetic. Shows movement, not static.
              </p>
            </div>
          </div>
        </div>

        {/* 5. HANDWRITTEN/SIGNATURE */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-8">
              <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 50 120 Q 80 60, 120 100 T 200 120 Q 240 140, 280 100 Q 320 60, 350 120"
                  stroke={selectedColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    filter: `drop-shadow(0 0 20px ${selectedColor}80)`,
                  }}
                />
                <text
                  x="120"
                  y="130"
                  fontFamily="cursive"
                  fontSize="64"
                  fontWeight="bold"
                  fill={selectedColor}
                  style={{
                    filter: `drop-shadow(0 0 20px ${selectedColor}60)`,
                  }}
                >
                  Got it
                </text>
              </svg>
            </div>
            <p className="text-lg text-neutral-300 text-center">
              I'll reply within 24 hours
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">5. HANDWRITTEN/SIGNATURE</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Personal, authentic. Human vs corporate. Matches "I not we" voice.
              </p>
            </div>
          </div>
        </div>

        {/* 6. MINIMAL GEOMETRIC */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-12">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 40 100 L 80 160 L 180 40"
                  stroke={selectedColor}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{
                    filter: `drop-shadow(0 0 30px ${selectedColor}80)`,
                  }}
                />
              </svg>
            </div>
            <p className="text-lg text-neutral-300 text-center">
              I'll get back to you within 24 hours
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">6. MINIMAL GEOMETRIC</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Ultra minimal, confident. Less is more. Hand-drawn checkmark.
              </p>
            </div>
          </div>
        </div>

        {/* 7. BRAND MONSTER */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-8">
              <div
                className="absolute inset-0 blur-3xl opacity-50 animate-pulse"
                style={{ backgroundColor: selectedColor }}
              />
              <h2
                className="relative text-7xl md:text-9xl font-black tracking-tighter"
                style={{
                  color: selectedColor,
                  textShadow: `
                    0 0 40px ${selectedColor}80,
                    0 0 80px ${selectedColor}40
                  `,
                }}
              >
                LOST
                <br />
                MONSTER
              </h2>
            </div>
            <p className="text-xl text-white font-semibold text-center mb-2">
              Message received
            </p>
            <p className="text-lg text-neutral-300 text-center">
              I'll get back to you within 24 hours
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">7. BRAND MONSTER</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Owns brand identity. Most distinctive. Pure confidence.
              </p>
            </div>
          </div>
        </div>

        {/* 8. COUNTDOWN/TIME */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Reply Incoming
            </h2>
            <div
              className="font-mono text-6xl md:text-8xl font-black mb-6"
              style={{
                color: selectedColor,
                textShadow: `0 0 40px ${selectedColor}60`,
              }}
            >
              {formatTime(countdown)}
            </div>
            <p className="text-lg text-neutral-400 text-center font-mono">
              &lt; 24:00:00 GUARANTEED
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">8. COUNTDOWN/TIME</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Shows commitment to timeline. Active, not passive. Sets expectation.
              </p>
            </div>
          </div>
        </div>

        {/* 9. RETRO ARCADE */}
        <div className="bg-black border-2 border-white/20 rounded-xl p-12 hover:border-white/40 transition-all relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, ${selectedColor}10 0px, transparent 2px, transparent 4px, ${selectedColor}10 6px),
                repeating-linear-gradient(90deg, ${selectedColor}10 0px, transparent 2px, transparent 4px, ${selectedColor}10 6px)
              `,
            }}
          />
          <div className="flex flex-col items-center justify-center py-8 relative">
            <div
              className="text-6xl md:text-7xl font-black mb-6 pixelated"
              style={{
                color: selectedColor,
                textShadow: `
                  4px 4px 0 ${selectedColor}40,
                  8px 8px 0 ${selectedColor}20
                `,
                fontFamily: 'monospace',
                letterSpacing: '0.2em',
              }}
            >
              ★ LEVEL ★
              <br />
              COMPLETE
            </div>
            <p
              className="text-xl font-mono text-white text-center mb-2"
              style={{ letterSpacing: '0.1em' }}
            >
              SCORE: +1000
            </p>
            <p className="text-sm font-mono text-neutral-400 text-center">
              NEXT_LEVEL: REPLY_24H
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">9. RETRO ARCADE</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                8-bit aesthetic. Gaming energy. Fun but bold.
              </p>
            </div>
          </div>
        </div>

        {/* 10. JUST THE DOTS */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 hover:border-white/20 transition-all">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex gap-12 mb-12">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full animate-pulse"
                  style={{
                    backgroundColor: selectedColor,
                    boxShadow: `0 0 60px ${selectedColor}80`,
                    animationDelay: `${i * 200}ms`,
                  }}
                />
              ))}
            </div>
            <p className="text-lg text-neutral-300 text-center">
              I'll get back to you within 24 hours
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
              <p className="text-sm font-bold text-white text-center">10. JUST THE DOTS</p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Ultra minimal. Modern, confident. Implies "processing" without saying it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-7xl mx-auto mt-16 text-center space-y-4">
        <a
          href="/success-demo"
          className="inline-block px-8 py-4 text-lg font-bold rounded-xl transition-all shadow-2xl text-black hover:scale-105 mr-4"
          style={{
            backgroundColor: selectedColor,
            boxShadow: `0 20px 60px -15px ${selectedColor}40`
          }}
        >
          ← View Standard Options
        </a>
        <a
          href="/"
          className="inline-block px-8 py-4 text-lg font-bold rounded-xl transition-all shadow-2xl bg-white/10 text-white hover:bg-white/20"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
