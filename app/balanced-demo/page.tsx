import Link from 'next/link';
import { CheckCircle2, TrendingUp, Clock, Shield, Star, Users, Award, Zap } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Balanced Design Variations - Lost Monster',
  description: 'Technical credibility + human approachability for non-technical decision makers',
};

// Business-focused metrics (not technical jargon)
const businessMetrics = [
  { label: 'Average Revenue Increase', value: '40%', subtext: 'For our clients', icon: TrendingUp },
  { label: 'On-Time Delivery', value: '100%', subtext: 'Every project', icon: Clock },
  { label: 'Client Satisfaction', value: '4.9/5', subtext: 'Average rating', icon: Star },
  { label: 'Ongoing Support', value: '12mo+', subtext: 'Average relationship', icon: Shield },
];

const clientLogos = [
  'Ancarraig Highland Cottages',
  'Highland Tours Co',
  'Loch Ness Spa',
  'Scottish Bookshop',
];

const testimonial = {
  quote: "Our bookings tripled in the first month. The system just works, and Lost Monster made the whole process easy to understand.",
  author: "Sarah MacLeod",
  role: "Owner",
  business: "Highland Spa & Wellness"
};

export default function BalancedDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-8">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <Link href="/" className="text-sm text-blue-100 hover:text-white mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Balanced Design Variations
            </h1>
            <p className="text-lg text-blue-50 mb-6">
              Technical credibility + human approachability for non-technical business owners
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-blue-100 text-xs mb-1">TONE</div>
                <div className="font-semibold">Professional & Warm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-blue-100 text-xs mb-1">LANGUAGE</div>
                <div className="font-semibold">Plain English</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-blue-100 text-xs mb-1">FOCUS</div>
                <div className="font-semibold">Business Outcomes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="text-blue-100 text-xs mb-1">TARGET</div>
                <div className="font-semibold">Business Owners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VARIATION A: Shopify-Inspired */}
      <section className="py-24 border-b-8 border-neutral-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">A</div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Shopify-Inspired
                </h2>
                <p className="text-neutral-600">Clean • Friendly • Colorful • Easy to understand at a glance</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-neutral-700">Trusted by Scottish businesses</span>
                </div>

                {/* Headline - benefit-focused */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                  Your Website.
                  <br />
                  <span className="text-green-600">Done Right.</span>
                </h1>

                {/* Subheadline - plain English */}
                <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  We build booking systems, online shops, and custom websites for Scottish businesses.
                  No jargon. No surprises. Just results.
                </p>

                {/* CTAs - clear action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl">
                    Get Your Free Quote
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 bg-white rounded-xl hover:bg-neutral-50 transition-all shadow-md">
                    See Our Work
                  </a>
                </div>

                {/* Trust signal - client logos */}
                <div className="pt-8 border-t border-green-200">
                  <p className="text-sm text-neutral-500 mb-4">Trusted by:</p>
                  <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-600">
                    {clientLogos.map((logo, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        {logo}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid - business outcomes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {businessMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-green-600" strokeWidth={2} />
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-2">
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

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Why This Works:</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="text-sm text-neutral-600 space-y-2">
                    <li>• Clear value in 5 seconds</li>
                    <li>• No technical jargon</li>
                    <li>• Friendly, approachable colors</li>
                    <li>• Business outcomes shown</li>
                    <li>• Obvious CTAs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Target Audience
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Perfect for e-commerce businesses, retail shops, and service providers who want a modern online presence without technical complexity.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Differentiator
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Combines Shopify's ease-of-understanding with proof of real results. Business owners instantly get it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION B: Squarespace-Style */}
      <section className="py-24 bg-neutral-50 border-b-8 border-neutral-200">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">B</div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Squarespace-Style
                </h2>
                <p className="text-neutral-600">Elegant • Minimal • Sophisticated • Beautiful typography</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-12 md:p-16 shadow-xl">
              <div className="max-w-3xl mx-auto text-center">
                {/* Minimal badge */}
                <div className="mb-8">
                  <span className="text-sm uppercase tracking-wider text-neutral-500 font-medium">
                    Development Agency • Since 2020
                  </span>
                </div>

                {/* Elegant headline */}
                <h1 className="text-5xl md:text-6xl font-serif font-light text-neutral-900 mb-8 leading-tight tracking-tight">
                  Websites That
                  <br />
                  <em className="font-medium">Actually Work</em>
                </h1>

                {/* Refined subheadline */}
                <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  We create beautiful, functional websites for ambitious businesses across Scotland.
                  From concept to launch, we handle everything.
                </p>

                {/* Elegant CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <a href="#" className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors">
                    Start a Project
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-neutral-900 border-2 border-neutral-300 hover:border-neutral-900 transition-colors">
                    View Portfolio
                  </a>
                </div>

                {/* Testimonial - trust through social proof */}
                <div className="border-t border-neutral-200 pt-12">
                  <div className="flex gap-1 justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-neutral-700 italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                    <div className="text-neutral-500">{testimonial.role}, {testimonial.business}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 mt-12 rounded-xl overflow-hidden">
              {businessMetrics.map((metric, index) => (
                <div key={index} className="bg-white p-8 text-center">
                  <div className="text-4xl font-light text-neutral-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-neutral-600 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {metric.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Why This Works:</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="text-sm text-neutral-600 space-y-2">
                    <li>• Sophisticated, premium feel</li>
                    <li>• Beautiful, confident typography</li>
                    <li>• Generous white space</li>
                    <li>• Real testimonial builds trust</li>
                    <li>• Not intimidating, just elegant</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Target Audience
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Ideal for premium clients, design-conscious businesses, professional services, and brands that value aesthetics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Differentiator
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Communicates quality and professionalism through restraint. Less is more approach builds confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION C: Professional Trust */}
      <section className="py-24 border-b-8 border-neutral-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">C</div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Professional Trust
                </h2>
                <p className="text-neutral-600">Business-focused • Trust signals • Clear structure • Transparent</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Guaranteed Quality & On-Time Delivery</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                  Professional Websites
                  <br />
                  <span className="text-blue-600">You Can Count On</span>
                </h1>

                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  We build booking systems, e-commerce platforms, and custom websites for growing businesses.
                  Clear pricing. Fixed timelines. No technical headaches.
                </p>

                {/* Value props */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-neutral-900">Know what you're getting</div>
                      <div className="text-sm text-neutral-600">Fixed-price quotes before we start. No hidden costs.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-neutral-900">Delivered on time</div>
                      <div className="text-sm text-neutral-600">We give you a date, and we stick to it. 100% track record.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-neutral-900">Easy to work with</div>
                      <div className="text-sm text-neutral-600">No jargon. Regular updates. We speak your language.</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                    Get Your Quote
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-600 border-2 border-blue-200 rounded-lg hover:border-blue-600 transition-colors">
                    See Case Studies
                  </a>
                </div>
              </div>

              {/* Right: Trust signals */}
              <div className="space-y-6">
                {/* Results card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-neutral-900 mb-1">40% avg</div>
                      <div className="font-semibold text-neutral-900 mb-2">Revenue Increase</div>
                      <div className="text-sm text-neutral-600">
                        Our clients see an average 40% revenue increase within 6 months of launching their new site.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial card */}
                <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="text-sm">
                      <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                      <div className="text-neutral-500">{testimonial.business}</div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                  <div className="text-sm font-semibold text-neutral-900 mb-4">Trusted by:</div>
                  <div className="grid grid-cols-2 gap-3">
                    {clientLogos.slice(0, 4).map((logo, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                        <Award className="w-4 h-4 text-blue-600" />
                        {logo.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Why This Works:</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="text-sm text-neutral-600 space-y-2">
                    <li>• Trust signals everywhere</li>
                    <li>• Clear value propositions</li>
                    <li>• Addresses concerns upfront</li>
                    <li>• Real social proof</li>
                    <li>• Professional but warm</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Target Audience
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Perfect for B2B clients, larger SMBs, risk-averse decision makers who need reassurance and proof before committing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Differentiator
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Removes all uncertainty. Every concern is addressed. Trust is built through transparency and proof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION D: Modern Friendly */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b-8 border-purple-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">D</div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Modern Friendly
                </h2>
                <p className="text-neutral-600">Contemporary • Fresh • Approachable • Conversational</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center max-w-3xl mx-auto">
                {/* Playful badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Your friendly neighborhood web developers
                  </span>
                </div>

                {/* Friendly headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                  Let's Build Something
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Amazing Together
                  </span>
                </h1>

                {/* Conversational copy */}
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  We're a small team in Scotland who love building websites that actually work.
                  Whether you need a booking system, online shop, or something custom — we've got you covered.
                </p>

                {/* Friendly CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg transition-all">
                    Let's Chat About Your Project
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-600 transition-all">
                    See What We've Built
                  </a>
                </div>

                {/* Quick wins */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-neutral-900 mb-2">Fast Turnaround</div>
                    <div className="text-sm text-neutral-600">Most projects done in 4-6 weeks</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-neutral-900 mb-2">No Surprises</div>
                    <div className="text-sm text-neutral-600">Fixed price agreed upfront</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
                    <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold text-neutral-900 mb-2">Easy to Work With</div>
                    <div className="text-sm text-neutral-600">We explain everything clearly</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {businessMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {metric.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Why This Works:</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="text-sm text-neutral-600 space-y-2">
                    <li>• Super approachable tone</li>
                    <li>• Fresh, modern aesthetic</li>
                    <li>• Not intimidating at all</li>
                    <li>• Conversational language</li>
                    <li>• Energetic and optimistic</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Target Audience
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Great for startups, modern brands, younger business owners, creative industries who want energy and personality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Differentiator
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Removes all formality. Makes web development feel fun and accessible, not scary or corporate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VARIATION E: Results-Focused */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">E</div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Results-Focused
                </h2>
                <p className="text-neutral-600">Metrics prominent • ROI-driven • Before/after • Proof-heavy</p>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Left: Big metric */}
              <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center">
                <div className="text-7xl font-bold mb-4">40%</div>
                <div className="text-xl font-semibold mb-2">Average Revenue Increase</div>
                <div className="text-orange-100">For our clients within 6 months</div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg mb-6">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Proven Results</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                  Websites That
                  <br />
                  <span className="text-orange-600">Grow Your Business</span>
                </h1>

                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  We don't just build websites — we build systems that increase your revenue.
                  Our clients see measurable results within months, not years.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors shadow-lg">
                    See The Numbers
                  </a>
                  <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-orange-600 border-2 border-orange-200 rounded-lg hover:border-orange-600 transition-colors">
                    Get Your Quote
                  </a>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">100%</div>
                    <div className="text-sm text-neutral-600">On-time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">4.9/5</div>
                    <div className="text-sm text-neutral-600">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">12mo+</div>
                    <div className="text-sm text-neutral-600">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {/* Before/After card */}
              <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-6">Highland Spa & Wellness</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-neutral-500 mb-2">BEFORE</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-red-600">~10</div>
                        <div className="text-sm text-neutral-600">Bookings/month</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">Manual</div>
                        <div className="text-sm text-neutral-600">Phone only</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-600 mb-2">AFTER</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-green-600">~30</div>
                        <div className="text-sm text-neutral-600">Bookings/month</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">24/7</div>
                        <div className="text-sm text-neutral-600">Online booking</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    3x increase in 1 month
                  </div>
                </div>
              </div>

              {/* Testimonial with metrics */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 pb-6 border-b border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                    <div className="text-sm text-neutral-600">{testimonial.business}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <div className="text-2xl font-bold text-green-600">+200%</div>
                    <div className="text-sm text-neutral-600">Bookings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">10hrs</div>
                    <div className="text-sm text-neutral-600">Saved/week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Why This Works:</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="text-sm text-neutral-600 space-y-2">
                    <li>• Results front and center</li>
                    <li>• Before/after comparisons</li>
                    <li>• Concrete metrics shown</li>
                    <li>• ROI-focused language</li>
                    <li>• Proof everywhere</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Target Audience
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Perfect for data-driven decision makers, growth-focused businesses, skeptical buyers who need proof before investing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Differentiator
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Answers the #1 question: "Will this make me money?" with concrete examples and measurable outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4 text-center">
              Which Style Fits Best?
            </h2>
            <p className="text-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
              All variations are designed for non-technical business owners. Choose based on your brand personality and target audience.
            </p>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-900 text-white">
                      <th className="text-left p-4 font-semibold">Variation</th>
                      <th className="text-left p-4 font-semibold">Personality</th>
                      <th className="text-left p-4 font-semibold">Best For</th>
                      <th className="text-left p-4 font-semibold">Approachability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr className="hover:bg-neutral-50">
                      <td className="p-4 font-semibold text-neutral-900">A: Shopify-Inspired</td>
                      <td className="p-4 text-neutral-600">Clean, friendly, colorful</td>
                      <td className="p-4 text-neutral-600">E-commerce, retail</td>
                      <td className="p-4 text-green-600 font-semibold">★★★★★</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-4 font-semibold text-neutral-900">B: Squarespace-Style</td>
                      <td className="p-4 text-neutral-600">Elegant, minimal, premium</td>
                      <td className="p-4 text-neutral-600">Premium, design-conscious</td>
                      <td className="p-4 text-green-600 font-semibold">★★★★☆</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-4 font-semibold text-neutral-900">C: Professional Trust</td>
                      <td className="p-4 text-neutral-600">Business-focused, transparent</td>
                      <td className="p-4 text-neutral-600">B2B, larger SMBs</td>
                      <td className="p-4 text-green-600 font-semibold">★★★★★</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-4 font-semibold text-neutral-900">D: Modern Friendly</td>
                      <td className="p-4 text-neutral-600">Contemporary, energetic</td>
                      <td className="p-4 text-neutral-600">Startups, modern brands</td>
                      <td className="p-4 text-green-600 font-semibold">★★★★★</td>
                    </tr>
                    <tr className="hover:bg-neutral-50">
                      <td className="p-4 font-semibold text-neutral-900">E: Results-Focused</td>
                      <td className="p-4 text-neutral-600">ROI-driven, proof-heavy</td>
                      <td className="p-4 text-neutral-600">Growth-focused businesses</td>
                      <td className="p-4 text-green-600 font-semibold">★★★★☆</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                All Variations Follow Balanced Principles:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-neutral-700">
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Plain English</strong> — No technical jargon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Business outcomes</strong> — Not technical specs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Trust signals</strong> — Real testimonials & proof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Clear CTAs</strong> — Obvious next steps</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Professional warmth</strong> — Competent but friendly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Mobile-first</strong> — Works great on phones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Visual clarity</strong> — Easy to understand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Not intimidating</strong> — Approachable design</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-neutral-600 text-lg font-medium">
                Which variation feels right for Lost Monster?
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                All designed to appeal to non-technical business owners while showing technical credibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
