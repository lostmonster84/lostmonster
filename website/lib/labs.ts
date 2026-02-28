export type LabStatus = 'beta' | 'live' | 'coming-soon';

export interface LabProduct {
  slug: string;
  name: string;
  description: string;
  status: LabStatus;
  icon: string;
  tags: string[];
}

export const labProducts: LabProduct[] = [
  {
    slug: 'bulletproof',
    name: 'BulletProof',
    description: 'Harden your reports before reviewers run them through AI. Simulate their critique, fix the gaps, send with confidence.',
    status: 'coming-soon',
    icon: 'Shield',
    tags: ['ai', 'reports', 'defence'],
  },
];

export function getStatusConfig(status: LabStatus) {
  switch (status) {
    case 'live':
      return { label: 'Live', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    case 'beta':
      return { label: 'Beta', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    case 'coming-soon':
      return { label: 'Coming Soon', className: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30' };
  }
}

export function getLabProduct(slug: string): LabProduct | undefined {
  return labProducts.find((p) => p.slug === slug);
}
