'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../PageTransition';
import { ColorProvider } from '@/contexts/ColorContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <ColorProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
      {!isHomePage && <Footer />}
    </ColorProvider>
  );
}
