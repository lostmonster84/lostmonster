'use client';

import ButtonPremium from '@/components/ui/ButtonPremium';

export default function CTAPremium() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA card */}
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Gradient mesh overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl"></div>
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-pulse"></span>
                Ready to Start Your Project?
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Let's Build Something{' '}
                <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Exceptional
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
                We're selective about the projects we take on. If you value quality, have clear goals,
                and want a partner who delivers measurable results, let's talk.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <ButtonPremium href="/contact" variant="glow" size="xl" icon="sparkles">
                  Start Your Project
                </ButtonPremium>
                <ButtonPremium
                  href="/case-studies"
                  variant="outline"
                  size="xl"
                  icon="arrow"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  View Our Work
                </ButtonPremium>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-white mb-1">80/100</div>
                  <div className="text-sm text-white/60">Minimum quality guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-white mb-1">8-20 weeks</div>
                  <div className="text-sm text-white/60">Typical project timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-white mb-1">30 days</div>
                  <div className="text-sm text-white/60">Post-launch support included</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
          </div>

          {/* Alternative contact options */}
          <div className="text-center mt-10">
            <p className="text-neutral-600 mb-4">
              Prefer to chat first? Book a 30-minute discovery call
            </p>
            <a
              href="/contact#call"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Schedule a call
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
