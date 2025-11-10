'use client';

import { Search, Lightbulb, Palette, Code, TestTube, Rocket } from 'lucide-react';

const phases = [
  {
    number: '1',
    title: 'Discovery',
    duration: 'Week 1-2',
    description: 'Deep-dive into your business, stakeholder interviews, competitive analysis, technical audit.',
    deliverable: 'CODA planning document',
    icon: Search,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '2',
    title: 'Strategy',
    duration: 'Week 2-3',
    description: 'Information architecture, feature prioritization, technical architecture, project timeline and milestones.',
    deliverable: 'Strategy blueprint',
    icon: Lightbulb,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    number: '3',
    title: 'Design',
    duration: 'Week 3-6',
    description: 'Wireframes, 5 design variations, you choose and we refine, high-fidelity mockups.',
    deliverable: 'Complete design system',
    icon: Palette,
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    number: '4',
    title: 'Development',
    duration: 'Week 6-12',
    description: 'Component-driven development, weekly progress demos, continuous feedback, quality checks (80/100 minimum).',
    deliverable: 'Working application',
    icon: Code,
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    number: '5',
    title: 'Testing',
    duration: 'Week 11-12',
    description: 'Cross-browser testing, mobile device testing, performance optimization, accessibility audit, UAT.',
    deliverable: 'Quality report',
    icon: TestTube,
    gradient: 'from-green-500 to-lime-500',
  },
  {
    number: '6',
    title: 'Launch & Support',
    duration: 'Week 12+',
    description: 'Deployment to production, DNS configuration, 30-day post-launch support, team training.',
    deliverable: 'Live website',
    icon: Rocket,
    gradient: 'from-lime-500 to-emerald-500',
  },
];

export default function ProcessPremium() {
  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700 text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full animate-pulse"></span>
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6">
            Six Steps From{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Brief
            </span>
            {' '}to{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Launch
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our systematic approach ensures quality, clarity, and results at every stage.
            No surprises. No guesswork. Just results.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line connecting all steps */}
            <div className="absolute left-8 top-12 bottom-12 w-1 bg-gradient-to-b from-blue-500 via-teal-500 to-emerald-500 hidden lg:block"></div>

            {/* Steps */}
            <div className="space-y-8">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={phase.number}
                    className="relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`flex flex-col lg:flex-row gap-8 items-start ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      {/* Icon circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.gradient} shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        {/* Number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-900 shadow-lg">
                          {phase.number}
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 group">
                        <div className={`bg-white rounded-3xl p-8 border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${isEven ? 'lg:ml-8' : 'lg:mr-8'}`}>
                          {/* Gradient accent */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                          <div className="relative">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-1">
                                  {phase.title}
                                </h3>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${phase.gradient} bg-opacity-10 text-sm font-semibold`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r ${phase.gradient}"></div>
                                  {phase.duration}
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-neutral-600 mb-4 leading-relaxed">
                              {phase.description}
                            </p>

                            {/* Deliverable */}
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${phase.gradient} bg-opacity-10 border border-neutral-200`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-semibold text-neutral-700">
                                Deliverable: {phase.deliverable}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border-2 border-neutral-200 shadow-xl">
            <p className="text-xl font-semibold text-neutral-900">
              Want to see the full process in detail?
            </p>
            <a
              href="/process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              View Complete Process Guide
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
