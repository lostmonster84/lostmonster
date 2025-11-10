import Card from '@/components/ui/Card';

export default function TrustSignals() {
  const signals = [
    { value: '20,000+', label: 'Framework Lines', subtext: 'Battle-tested code' },
    { value: '80/100', label: 'Quality Standard', subtext: 'Minimum threshold' },
    { value: '7+ hours', label: 'Time Saved', subtext: 'Per project' },
    { value: '3-5%', label: 'Conversion Rate', subtext: 'Industry avg: 2%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {signals.map((signal, index) => (
        <Card key={index} variant="elevated" className="border-2 border-blue-200 text-center hover-lift">
          <div className="text-2xl md:text-3xl font-heading font-bold text-primary-600 mb-1">
            {signal.value}
          </div>
          <div className="text-sm font-semibold text-neutral-900 mb-1">
            {signal.label}
          </div>
          <div className="text-xs text-neutral-600">
            {signal.subtext}
          </div>
        </Card>
      ))}
    </div>
  );
}

