'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-white/80 transition-colors">
            Lost Monster
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Navigation />
            <Link
              href="/contact"
              className="bg-white text-black px-6 py-2 rounded-lg hover:bg-white/90 transition-colors font-medium"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-white/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-4 border-t border-white/10">
            <Navigation
              className="flex-col items-start gap-4"
              onLinkClick={() => setMobileMenuOpen(false)}
            />
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-white text-black px-6 py-2 rounded-lg hover:bg-white/90 transition-colors font-medium text-center"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

