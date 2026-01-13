'use client';

import ButtonPremium from '@/components/ui/ButtonPremium';
import { TrendingUp, Users, DollarSign, Star } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: '3-5%',
    label: 'Conversion Rate',
    subtext: 'Industry avg: 2%',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: Users,
    value: '70%',
    label: 'Direct Bookings',
    subtext: 'From 30%',
    gradient: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
  {
    icon: DollarSign,
    value: '£40k+',
    label: 'Annual Savings',
    subtext: 'OTA commissions',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Review Score',
    subtext: '100+ reviews',
    gradient: 'from-teal-500 to-green-500',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
];

export default function CaseStudyPremium() {
  return (
    <section className="section-padding bg-neutral-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-pulse"></span>
              Case Study
            </div>
          </div>

          {/* Main content card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Hospitality • Scotland
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                Ancarraig Highland Lodges
              </h2>

              <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
                Ancarraig operates 12 luxury lodges on the shores of Loch Ness. Stunning location. Premium offering.
                But <span className="text-red-400 font-semibold">70% of bookings came through OTAs</span> (Booking.com, Airbnb)
                charging <span className="text-red-400 font-semibold">15-20% commission</span>.
              </p>

              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-semibold text-white">
                  The Brief: Increase direct bookings to 70%. Reduce dependency on OTAs.
                </span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Gradient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${metric.gradient} mb-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
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
                );
              })}
            </div>

            {/* Testimonial */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
              {/* Quote icon */}
              <div className="absolute top-6 left-6 text-6xl text-white/10 font-serif leading-none">"</div>

              <div className="relative z-10 pl-8">
                <p className="text-lg md:text-xl text-white/90 italic leading-relaxed mb-6">
                  Lost Monster didn't just build us a website. They built us a booking engine that pays for itself every month in saved commissions.
                  The systematic approach meant zero surprises and absolute confidence throughout.
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                    JM
                  </div>
                  <div>
                    <div className="font-semibold text-white">James MacDonald</div>
                    <div className="text-sm text-white/60">Managing Director, Ancarraig Lodges</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <ButtonPremium
                href="/case-studies/ancarraig"
                variant="gradient"
                size="lg"
                icon="arrow"
              >
                Read Full Case Study
              </ButtonPremium>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="text-center mt-10">
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <span>View all case studies</span>
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
