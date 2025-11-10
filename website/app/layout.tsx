import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../styles/globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lost Monster - Systems That Work. Websites That Convert.',
  description: 'Framework-driven development agency specializing in high-performance booking systems, e-commerce, and custom web applications.',
  keywords: ['web development', 'booking systems', 'e-commerce', 'custom applications', 'design systems', 'Next.js', 'React'],
  authors: [{ name: 'Lost Monster Development Agency' }],
  openGraph: {
    title: 'Lost Monster - Systems That Work. Websites That Convert.',
    description: 'Framework-driven development agency specializing in high-performance digital solutions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lost Monster - Systems That Work. Websites That Convert.',
    description: 'Framework-driven development agency specializing in high-performance digital solutions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
