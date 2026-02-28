import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - Labs | Lost Monster',
    default: 'Labs | Lost Monster',
  },
  description: 'Small tools, experiments, and beta products from Lost Monster.',
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
