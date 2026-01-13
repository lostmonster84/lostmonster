'use client';

import ButtonPremium from '@/components/ui/ButtonPremium';
import { useEffect, useState } from 'react';

const metrics = [
  { label: 'Framework Lines', value: '20,000+', subtext: 'Battle-tested code', icon: '🏗️' },
  { label: 'Quality Standard', value: '80/100', subtext: 'Minimum threshold', icon: '⭐' },
  { label: 'Time Saved', value: '7+ hours', subtext: 'Per project', icon: '⚡' },
  { label: 'Conversion Rate', value: '3-5%', subtext: 'Industry avg: 2%', icon: '📈' },
];

export default function HeroPremium() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Overline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Framework-Driven Development Agency
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-6 leading-tight">
              <span className="inline-block animate-slide-up">Systems That</span>{' '}
              <span className="inline-block bg-gradient-to-r from-primary-400 via-indigo-400 to-primary-400 bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Work.
              </span>
              <br />
              <span className="inline-block animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Websites That
              </span>{' '}
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Convert.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-10 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              We build high-performance digital solutions with{' '}
              <span className="text-white font-semibold">measurable results</span>,{' '}
              <span className="text-white font-semibold">guaranteed quality</span>, and{' '}
              <span className="text-white font-semibold">systematic process</span>.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              <ButtonPremium href="/contact" variant="gradient" size="lg" icon="sparkles">
                Start Your Project
              </ButtonPremium>
              <ButtonPremium href="/case-studies" variant="outline" size="lg" icon="arrow">
                See Our Work
              </ButtonPremium>
            </div>
          </div>

          {/* Metrics Grid */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-600/20"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-indigo-600/0 group-hover:from-primary-600/10 group-hover:to-indigo-600/10 rounded-2xl transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-3">{metric.icon}</div>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-white/90 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-white/60">
                    {metric.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust signal */}
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-neutral-400 text-sm">
              Trusted by premium brands • 80/100 quality guaranteed • Framework-driven approach
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
