'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-black/40 backdrop-blur-lg border-b border-white/10"
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-white/80 transition-colors">
            Lost Monster
          </Link>

          {/* Start Project Button */}
          <Link
            href="/contact"
            className="bg-white text-black px-6 py-3 rounded-lg hover:bg-white/90 transition-colors font-medium text-sm md:text-base"
          >
            Start Project
          </Link>
        </div>
      </div>
    </header>
  );
}

