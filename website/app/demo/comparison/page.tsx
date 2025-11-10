import Link from 'next/link';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Design Variations Comparison - Lost Monster',
  description: 'Side-by-side comparison of all 5 design variations with scoring breakdown.',
};

const heroVariations = [
  {
    id: 'a',
    name: 'Conservative',
    description: 'Minimal changes, refined spacing, professional',
    href: '/demo/hero/variation-a',
    estimatedScore: 82,
    strengths: ['Safe', 'Professional', 'Low risk'],
    weaknesses: ['Less differentiation', 'May blend'],
  },
  {
    id: 'b',
    name: 'Modern/Bold',
    description: 'Bold colors, dynamic layouts, push boundaries',
    href: '/demo/hero/variation-b',
    estimatedScore: 75,
    strengths: ['Memorable', 'Creative', 'Stands out'],
    weaknesses: ['Too bold', 'May alienate'],
  },
  {
    id: 'c',
    name: 'Data-Driven',
    description: 'Metrics prominent, trust signals, results-focused',
    href: '/demo/hero/variation-c',
    estimatedScore: 88,
    strengths: ['Credible', 'Results-focused', 'Trust-building'],
    weaknesses: ['May feel cold', 'Less emotional'],
  },
  {
    id: 'd',
    name: 'Minimal/Restrained',
    description: 'Maximum white space, minimal decoration, premium',
    href: '/demo/hero/variation-d',
    estimatedScore: 85,
    strengths: ['Premium feel', 'Timeless', 'Professional'],
    weaknesses: ['May feel empty', 'Less engaging'],
  },
  {
    id: 'e',
    name: 'Experimental',
    description: 'Asymmetric layouts, break the grid, creative',
    href: '/demo/hero/variation-e',
    estimatedScore: 70,
    strengths: ['Highly memorable', 'Unique', 'Innovative'],
    weaknesses: ['May confuse', 'Accessibility concerns', 'Too experimental'],
  },
];

const layoutVariations = [
  {
    id: 'a',
    name: 'Conservative',
    description: 'Current blue refined, centered layouts',
    href: '/demo/layout/variation-a',
    estimatedScore: 80,
  },
  {
    id: 'b',
    name: 'Modern',
    description: 'Bold colors, dynamic grids',
    href: '/demo/layout/variation-b',
    estimatedScore: 78,
  },
  {
    id: 'c',
    name: 'Data-Driven',
    description: 'Professional blue/gray, metrics-focused',
    href: '/demo/layout/variation-c',
    estimatedScore: 86,
  },
  {
    id: 'd',
    name: 'Minimal',
    description: 'Monochromatic, generous white space',
    href: '/demo/layout/variation-d',
    estimatedScore: 83,
  },
  {
    id: 'e',
    name: 'Experimental',
    description: 'Unexpected colors, asymmetric',
    href: '/demo/layout/variation-e',
    estimatedScore: 72,
  },
];

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

function getScoreLabel(score: number) {
  if (score >= 80) return '✅ Meets Threshold';
  if (score >= 70) return '⚠️ Below Threshold';
  return '❌ Needs Work';
}

export default function ComparisonPage() {
  const topHero = heroVariations.reduce((prev, current) => 
    (current.estimatedScore > prev.estimatedScore) ? current : prev
  );
  const topLayout = layoutVariations.reduce((prev, current) => 
    (current.estimatedScore > prev.estimatedScore) ? current : prev
  );

  return (
    <div className="section-padding bg-white">
      <div className="container-custom max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Design Variations Comparison
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Side-by-side comparison of all variations with estimated quality scores. Scores are preliminary and will be finalized after full quality checklist review.
          </p>
        </div>

        {/* Hero Variations */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Hero Section Variations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {heroVariations.map((variation) => {
              const isTop = variation.id === topHero.id;
              return (
                <Card
                  key={variation.id}
                  variant={isTop ? 'elevated' : 'default'}
                  className={isTop ? 'ring-2 ring-primary-600' : ''}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-sm font-semibold text-primary-600">
                        Variation {variation.id.toUpperCase()}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-neutral-900 mt-1">
                        {variation.name}
                      </h3>
                    </div>
                    {isTop && (
                      <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded">
                        TOP SCORE
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-700 mb-4">
                    {variation.description}
                  </p>

                  <div className={`p-3 rounded-lg border-2 mb-4 ${getScoreColor(variation.estimatedScore)}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Estimated Score</span>
                      <span className="text-2xl font-bold">{variation.estimatedScore}/100</span>
                    </div>
                    <div className="text-xs mt-1">{getScoreLabel(variation.estimatedScore)}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-green-700 mb-1">Strengths:</div>
                    <ul className="text-xs text-neutral-700 space-y-1">
                      {variation.strengths.map((s, i) => (
                        <li key={i}>✓ {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-orange-700 mb-1">Weaknesses:</div>
                    <ul className="text-xs text-neutral-700 space-y-1">
                      {variation.weaknesses.map((w, i) => (
                        <li key={i}>⚠ {w}</li>
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
              );
            })}
          </div>
        </div>

        {/* Layout Variations */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
            Layout & Color Scheme Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {layoutVariations.map((variation) => {
              const isTop = variation.id === topLayout.id;
              return (
                <Card
                  key={variation.id}
                  variant={isTop ? 'elevated' : 'default'}
                  className={isTop ? 'ring-2 ring-primary-600' : ''}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-sm font-semibold text-primary-600">
                        Variation {variation.id.toUpperCase()}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-neutral-900 mt-1">
                        {variation.name}
                      </h3>
                    </div>
                    {isTop && (
                      <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded">
                        TOP
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-700 mb-4">
                    {variation.description}
                  </p>

                  <div className={`p-3 rounded-lg border-2 mb-4 ${getScoreColor(variation.estimatedScore)}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Estimated Score</span>
                      <span className="text-2xl font-bold">{variation.estimatedScore}/100</span>
                    </div>
                    <div className="text-xs mt-1">{getScoreLabel(variation.estimatedScore)}</div>
                  </div>

                  <Link
                    href={variation.href}
                    className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    View Variation {variation.id.toUpperCase()} →
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        <Card variant="elevated" className="bg-primary-50 border-2 border-primary-200">
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Preliminary Recommendation
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Top Hero Variation: {topHero.name}</h3>
              <p className="text-sm text-neutral-700 mb-2">
                Estimated Score: <strong>{topHero.estimatedScore}/100</strong>
              </p>
              <p className="text-sm text-neutral-700">
                {topHero.description}. This variation best balances professional appearance with differentiation, and aligns well with Lost Monster's positioning as a premium, systematic agency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Top Layout Variation: {topLayout.name}</h3>
              <p className="text-sm text-neutral-700 mb-2">
                Estimated Score: <strong>{topLayout.estimatedScore}/100</strong>
              </p>
              <p className="text-sm text-neutral-700">
                {topLayout.description}. This layout approach supports the data-driven, results-focused messaging while maintaining professional credibility.
              </p>
            </div>
            <div className="pt-4 border-t border-primary-200">
              <p className="text-sm text-neutral-700">
                <strong>Note:</strong> These are preliminary scores based on initial assessment. Final scores will be calculated after running the complete quality checklist against each variation. All variations scoring 80+/100 will be considered for implementation.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/demo"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Demo Index
          </Link>
        </div>
      </div>
    </div>
  );
}

