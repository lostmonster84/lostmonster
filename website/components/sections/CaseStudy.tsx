import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CaseStudy() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <Card variant="elevated" className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Case Study: Ancarraig Highland Lodges
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              Ancarraig operates 12 luxury lodges on the shores of Loch Ness. Stunning location. Premium offering. But 70% of bookings came through OTAs (Booking.com, Airbnb) charging 15-20% commission.
            </p>
            <p className="text-lg font-semibold text-neutral-900 mb-6">
              The Brief: Increase direct bookings to 70%. Reduce dependency on OTAs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">The Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-heading font-bold text-primary-600 mb-1">3-5%</div>
                  <div className="text-xs text-neutral-700">Conversion Rate</div>
                  <div className="text-xs text-neutral-600 mt-1">Industry avg: 2%</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-heading font-bold text-emerald-600 mb-1">70%</div>
                  <div className="text-xs text-neutral-700">Direct Bookings</div>
                  <div className="text-xs text-neutral-600 mt-1">From 30%</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-2xl font-heading font-bold text-amber-600 mb-1">£40k+</div>
                  <div className="text-xs text-neutral-700">Annual Savings</div>
                  <div className="text-xs text-neutral-600 mt-1">OTA commissions</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-heading font-bold text-purple-600 mb-1">4.9/5</div>
                  <div className="text-xs text-neutral-700">Review Score</div>
                  <div className="text-xs text-neutral-600 mt-1">100+ reviews</div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-6 border-2 border-neutral-200">
              <p className="text-neutral-700 italic leading-relaxed">
                "Lost Monster didn't just build us a website. They built us a booking engine that pays for itself every month in saved commissions. The systematic approach meant zero surprises and absolute confidence throughout."
              </p>
            </div>
          </div>
          
          <Button href="/case-studies/ancarraig" variant="primary">
            Read Full Case Study →
          </Button>
        </Card>
      </div>
    </section>
  );
}

