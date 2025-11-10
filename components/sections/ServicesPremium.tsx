'use client';

import ButtonPremium from '@/components/ui/ButtonPremium';
import { ShoppingCart, Calendar, Code2, Palette } from 'lucide-react';

const services = [
  {
    slug: 'booking-systems',
    title: 'Booking Systems',
    description: 'Frictionless booking flows, trust-building design, conversion optimization for hotels, lodges, tours, and experiences.',
    results: '3-5% conversion rates',
    resultsDetail: '60-70% direct bookings',
    timeline: '8-12 weeks',
    investment: '£25,000 - £45,000',
    icon: Calendar,
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue',
  },
  {
    slug: 'ecommerce-systems',
    title: 'E-commerce Systems',
    description: 'Conversion-optimized checkout, trust signals, performance tuning for premium brands and D2C businesses.',
    results: '3-6% conversion rates',
    resultsDetail: 'Industry avg: 2-3%',
    timeline: '10-16 weeks',
    investment: '£30,000 - £60,000',
    icon: ShoppingCart,
    gradient: 'from-emerald-500 to-teal-500',
    color: 'emerald',
  },
  {
    slug: 'custom-applications',
    title: 'Custom Web Applications',
    description: 'Purpose-built systems designed around your exact processes for SaaS products, internal tools, and member platforms.',
    results: '50%+ time savings',
    resultsDetail: 'vs manual processes',
    timeline: '12-20 weeks',
    investment: '£40,000 - £75,000+',
    icon: Code2,
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple',
  },
  {
    slug: 'design-systems',
    title: 'Design Systems',
    description: 'Component libraries, design tokens, documented patterns for companies with multiple digital products.',
    results: '40%+ faster development',
    resultsDetail: 'Feature development',
    timeline: '6-10 weeks',
    investment: '£15,000 - £30,000',
    icon: Palette,
    gradient: 'from-orange-500 to-red-500',
    color: 'orange',
  },
];

export default function ServicesPremium() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6">
            Systems That Solve{' '}
            <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
              Business Problems
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We specialize in high-performance digital solutions where quality and conversion matter.
            Framework-driven. Results-focused. Quality-guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="group relative bg-white rounded-3xl p-8 border-2 border-neutral-100 hover:border-neutral-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Results - Prominent */}
                  <div className={`mb-6 p-5 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-10 border border-${service.color}-200`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="text-3xl font-heading font-bold text-neutral-900">
                        {service.results}
                      </div>
                    </div>
                    <div className="text-sm text-neutral-600">{service.resultsDetail}</div>
                  </div>

                  {/* Timeline & Investment */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Timeline
                      </div>
                      <div className="text-base font-semibold text-neutral-900">
                        {service.timeline}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Investment
                      </div>
                      <div className="text-base font-semibold text-neutral-900">
                        {service.investment}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <ButtonPremium
                    href={`/services/${service.slug}`}
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    Learn More
                  </ButtonPremium>
                </div>

                {/* Decorative corner gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-tr-3xl rounded-bl-full transition-opacity duration-500`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-neutral-600 mb-6">
            Not sure which service fits your needs?
          </p>
          <ButtonPremium href="/contact" variant="primary" size="lg" icon="sparkles">
            Let's Talk About Your Project
          </ButtonPremium>
        </div>
      </div>
    </section>
  );
}
