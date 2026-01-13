'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

interface TikTokScrollProps {
  sections: ReactNode[]
  onSectionChange?: (index: number) => void
}

/**
 * TikTok Scroll Container
 * 
 * Vertical scroll with snap-to-section behavior, haptic feedback,
 * and custom event dispatching for header auto-hide.
 * 
 * Usage:
 * ```tsx
 * <TikTokScroll sections={[
 *   <Section1 />,
 *   <Section2 />,
 *   // ... up to 8 sections
 * ]} />
 * ```
 */
export function TikTokScroll({ sections, onSectionChange }: TikTokScrollProps) {
  const [activeSection, setActiveSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || !isClient) return

    let lastScrollTop = 0

    const handleScroll = () => {
      const scrollY = container.scrollTop
      const sectionHeight = window.innerHeight
      const section = Math.round(scrollY / sectionHeight)

      // Section change detection
      if (section !== activeSection && section >= 0 && section < sections.length) {
        setActiveSection(section)
        onSectionChange?.(section)
        
        // Haptic feedback (mobile only)
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
      }

      // Dispatch custom event for header visibility control
      const scrollingDown = scrollY > lastScrollTop
      const isAtTop = scrollY < 50

      window.dispatchEvent(new CustomEvent('tiktok-scroll', {
        detail: { 
          scrollingDown, 
          isAtTop, 
          scrollY,
          currentSection: section 
        }
      }))

      lastScrollTop = scrollY
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeSection, isClient, sections.length, onSectionChange])

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll overflow-x-hidden"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'none',
        touchAction: 'pan-y',
      }}
    >
      {sections.map((section, index) => (
        <section
          key={index}
          className="h-screen min-h-screen w-full snap-start snap-always"
          data-section-index={index}
        >
          {section}
        </section>
      ))}
      
      {/* Section Indicator - Bottom pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="flex gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          {sections.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === activeSection ? '#ffffff' : 'rgba(255,255,255,0.3)',
                transform: index === activeSection ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

