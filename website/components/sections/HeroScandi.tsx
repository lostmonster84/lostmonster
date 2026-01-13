'use client';

import ButtonPremium from '@/components/ui/ButtonPremium';
import { Code2, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

const metrics = [
  { label: 'Framework Lines', value: '20,000+', subtext: 'Battle-tested code', icon: Code2 },
  { label: 'Quality Standard', value: '80/100', subtext: 'Minimum threshold', icon: CheckCircle2 },
  { label: 'Time Saved', value: '7+ hours', subtext: 'Per project', icon: Zap },
  { label: 'Conversion Rate', value: '3-5%', subtext: 'Industry avg: 2%', icon: TrendingUp },
];

export default function HeroScandi() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Overline - Subtle, not loud */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-full">
              Framework-Driven Development Agency
            </span>
          </div>

          {/* Headline - MAX text-5xl (48px) per Scandi-Scot principle */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 text-center mb-6 tracking-tight">
            Systems That Work.
            <br />
            Websites That Convert.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            We build high-performance digital solutions with measurable results, guaranteed quality, and systematic process.
          </p>

          {/* CTAs - Flat buttons, no shine effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <ButtonPremium href="/contact" variant="primary" size="lg">
              Start Your Project
            </ButtonPremium>
            <ButtonPremium href="/case-studies" variant="outline" size="lg">
              See Our Work
            </ButtonPremium>
          </div>

          {/* Metrics Grid - Flat cards with subtle shadows */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 transition-colors duration-200"
                >
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {metric.subtext}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
