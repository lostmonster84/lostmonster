import Link from 'next/link';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Design Variations Demo - Lost Monster',
  description: 'Explore 5 design variations for Lost Monster website, demonstrating our Design Variations methodology.',
};

const heroVariations = [
  {
    id: 'a',
    name: 'Variation A - Conservative',
    description: 'Minimal changes from current design. Refined spacing, improved typography hierarchy. Safe, professional approach.',
    pros: ['Low risk', 'Familiar patterns', 'Professional'],
    cons: ['Less differentiation', 'May not showcase innovation'],
    href: '/demo/hero/variation-a',
  },
  {
    id: 'b',
    name: 'Variation B - Modern/Bold',
    description: 'Bold colors, dynamic layouts. Push design boundaries. Experimental typography.',
    pros: ['Stands out', 'Shows creativity', 'Memorable'],
    cons: ['May feel too bold', 'Risk of alienating conservative clients'],
    href: '/demo/hero/variation-b',
  },
  {
    id: 'c',
    name: 'Variation C - Data-Driven',
    description: 'Metrics and proof prominent. Charts, statistics, conversion data. Trust signals emphasized.',
    pros: ['Builds credibility', 'Results-focused', 'Trust-building'],
    cons: ['May feel cold', 'Less emotional connection'],
    href: '/demo/hero/variation-c',
  },
  {
    id: 'd',
    name: 'Variation D - Minimal/Restrained',
    description: 'Maximum white space. Minimal decoration. Focus on content.',
    pros: ['Premium feel', 'Timeless', 'Professional'],
    cons: ['May feel empty', 'Less engaging'],
    href: '/demo/hero/variation-d',
  },
  {
    id: 'e',
    name: 'Variation E - Experimental',
    description: 'Asymmetric layouts. Break the grid. Creative, unique approach.',
    pros: ['Memorable', 'Shows innovation', 'Unique'],
    cons: ['May confuse', 'Accessibility concerns', 'Risk of being too experimental'],
    href: '/demo/hero/variation-e',
  },
];

const layoutVariations = [
  {
    id: 'a',
    name: 'Variation A - Conservative',
    description: 'Current blue palette refined. Centered layouts. Balanced visual weight.',
    href: '/demo/layout/variation-a',
  },
  {
    id: 'b',
    name: 'Variation B - Modern',
    description: 'Bold color combinations. Dynamic grid layouts. Strong visual hierarchy.',
    href: '/demo/layout/variation-b',
  },
  {
    id: 'c',
    name: 'Variation C - Data-Driven',
    description: 'Professional blue/gray palette. Metrics-focused layouts. Charts and data visualization.',
    href: '/demo/layout/variation-c',
  },
  {
    id: 'd',
    name: 'Variation D - Minimal',
    description: 'Monochromatic with single accent. Generous white space. Restrained typography.',
    href: '/demo/layout/variation-d',
  },
  {
    id: 'e',
    name: 'Variation E - Experimental',
    description: 'Unexpected color combinations. Asymmetric, creative layouts. Bold typography choices.',
    href: '/demo/layout/variation-e',
  },
];

export default function DemoPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Design Variations Demo
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Following Lost Monster's Design Variations methodology, we've created 5 distinct approaches to explore the design space systematically.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Hero Section Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroVariations.map((variation) => (
              <Card key={variation.id} variant="elevated" className="hover-lift">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-primary-600">
                    Variation {variation.id.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-neutral-900 mt-2 mb-2">
                    {variation.name.split(' - ')[1]}
                  </h3>
                  <p className="text-sm text-neutral-700 mb-4">
                    {variation.description}
                  </p>
                </div>
                <div className="mb-4">
                  <div className="text-xs font-semibold text-neutral-600 mb-1">Pros:</div>
                  <ul className="text-xs text-neutral-700 space-y-1 mb-3">
                    {variation.pros.map((pro, i) => (
                      <li key={i}>✓ {pro}</li>
                    ))}
                  </ul>
                  <div className="text-xs font-semibold text-neutral-600 mb-1">Cons:</div>
                  <ul className="text-xs text-neutral-700 space-y-1">
                    {variation.cons.map((con, i) => (
                      <li>⚠ {con}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={variation.href}
                  className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  View Variation {variation.id.toUpperCase()} →
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Layout & Color Scheme Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {layoutVariations.map((variation) => (
              <Card key={variation.id} variant="elevated" className="hover-lift">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-primary-600">
                    Variation {variation.id.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-neutral-900 mt-2 mb-2">
                    {variation.name.split(' - ')[1]}
                  </h3>
                  <p className="text-sm text-neutral-700 mb-4">
                    {variation.description}
                  </p>
                </div>
                <Link
                  href={variation.href}
                  className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  View Variation {variation.id.toUpperCase()} →
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/demo/comparison"
            className="inline-block bg-neutral-900 text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
          >
            View Side-by-Side Comparison →
          </Link>
        </div>

        <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
          <h3 className="text-lg font-heading font-bold text-neutral-900 mb-2">
            About This Process
          </h3>
          <p className="text-sm text-neutral-700">
            This demo showcases Lost Monster's Design Variations methodology. Instead of showing one design option and hoping you like it, we create 5 distinct variations that explore different approaches to the same problem. This systematic exploration ensures we're not missing better solutions and gives you real choice, not just "do you like this?"
          </p>
        </div>
      </div>
    </div>
  );
}

