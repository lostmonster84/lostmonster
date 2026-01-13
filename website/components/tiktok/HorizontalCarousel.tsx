'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselItem {
  id: string
  title: string
  description: string
  image?: string
  icon?: string
  features?: string[]
}

interface HorizontalCarouselProps {
  items: CarouselItem[]
  sectionTitle: string
  sectionSubtitle?: string
  accentColor: string
}

/**
 * Horizontal Carousel Section
 * 
 * Horizontal swipeable carousel within vertical scroll.
 * Used for progressive disclosure (multiple personas, services, etc.)
 * 
 * Usage:
 * ```tsx
 * <HorizontalCarousel
 *   items={personas}
 *   sectionTitle="Who is this for?"
 *   sectionSubtitle="Swipe to explore"
 *   accentColor="#3b82f6"
 * />
 * ```
 */
export function HorizontalCarousel({
  items,
  sectionTitle,
  sectionSubtitle = 'Swipe left/right to explore',
  accentColor,
}: HorizontalCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => setActiveIndex((prev) => (prev + 1) % items.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Section Title */}
      <div className="absolute top-24 left-0 right-0 z-10 text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {sectionTitle}
        </h2>
        <p className="text-white/40 text-sm">
          {sectionSubtitle}
        </p>
      </div>

      {/* Carousel Content */}
      <div className="h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[activeIndex].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg"
          >
            {/* Item Icon (if provided) */}
            {items[activeIndex].icon && (
              <div className="flex justify-center mb-6">
                <div className="text-6xl">
                  {items[activeIndex].icon}
                </div>
              </div>
            )}

            {/* Item Image (if provided) */}
            {items[activeIndex].image && (
              <div className="aspect-video bg-white/5 rounded-xl mb-6 overflow-hidden">
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Item Content */}
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {items[activeIndex].title}
            </h3>
            <p className="text-white/70 text-lg mb-6 text-center">
              {items[activeIndex].description}
            </p>

            {/* Features (if provided) */}
            {items[activeIndex].features && (
              <ul className="space-y-3 max-w-sm mx-auto">
                {items[activeIndex].features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white/60"
                  >
                    <span 
                      className="text-xl flex-shrink-0" 
                      style={{ color: accentColor }}
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-6 px-6">
        <button
          onClick={prev}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: index === activeIndex ? accentColor : 'rgba(255,255,255,0.3)',
                transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

