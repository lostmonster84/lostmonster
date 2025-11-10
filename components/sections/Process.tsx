const phases = [
  {
    number: '1',
    title: 'Discovery',
    duration: 'Week 1-2',
    description: 'Deep-dive into your business, stakeholder interviews, competitive analysis, technical audit. Deliverable: CODA planning document.',
  },
  {
    number: '2',
    title: 'Strategy',
    duration: 'Week 2-3',
    description: 'Information architecture, feature prioritization, technical architecture, project timeline and milestones.',
  },
  {
    number: '3',
    title: 'Design',
    duration: 'Week 3-6',
    description: 'Wireframes, 5 design variations, you choose and we refine, high-fidelity mockups. Deliverable: Complete design system.',
  },
  {
    number: '4',
    title: 'Development',
    duration: 'Week 6-12',
    description: 'Component-driven development, weekly progress demos, continuous feedback, quality checks (80/100 minimum).',
  },
  {
    number: '5',
    title: 'Testing',
    duration: 'Week 11-12',
    description: 'Cross-browser testing, mobile device testing, performance optimization, accessibility audit, UAT.',
  },
  {
    number: '6',
    title: 'Launch & Support',
    duration: 'Week 12+',
    description: 'Deployment to production, DNS configuration, 30-day post-launch support, team training.',
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Six Steps From Brief to Launch
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Our systematic approach ensures quality, clarity, and results at every stage
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="bg-white rounded-lg p-6 border border-neutral-200 hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-heading font-bold text-xl">
                  {phase.number}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-neutral-900">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{phase.duration}</p>
                </div>
              </div>
              <p className="text-neutral-700">{phase.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/process"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            See Full Process →
          </a>
        </div>
      </div>
    </section>
  );
}

