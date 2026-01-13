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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lostmonster.com',
    siteName: 'Lost Monster',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lostmonster.com'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Lost Monster - Systems That Work. Websites That Convert.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lost Monster - Systems That Work. Websites That Convert.',
    description: 'Framework-driven development agency specializing in high-performance digital solutions.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://lostmonster.com'}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
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
