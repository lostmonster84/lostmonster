'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnLightSection, setIsOnLightSection] = useState(false);

  useEffect(() => {
    const checkContactSection = () => {
      // Check if contact section exists in DOM (meaning it's been shown)
      const contactSection = document.getElementById('contact-section');
      setIsOnLightSection(!!contactSection);
    };

    // Check immediately
    checkContactSection();

    // Check periodically (in case section gets mounted)
    const interval = setInterval(checkContactSection, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[10000] bg-transparent border-b border-transparent transition-all duration-500">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - stays white, resets to home */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Dispatch event to reset homepage
              window.dispatchEvent(new Event('resetToHome'));
            }}
            className="text-2xl font-heading font-bold transition-colors duration-500 cursor-pointer text-white hover:text-white/80"
          >
            Lost Monster
          </button>

          {/* Start Project Button - link to homepage (button is there) */}
          <Link
            href="/"
            className={cn(
              "px-6 py-3 rounded-lg transition-all duration-500 font-medium text-sm md:text-base",
              isOnLightSection
                ? "bg-black text-white hover:bg-black/90"
                : "bg-white text-black hover:bg-white/90"
            )}
          >
            Start Project
          </Link>
        </div>
      </div>
    </header>
  );
}

