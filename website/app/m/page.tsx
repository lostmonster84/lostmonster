'use client'

import { TikTokScroll } from '@/components/tiktok'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

/**
 * Mobile Home Page - Minimal AIDA Journey
 * 
 * Clean, sophisticated 8-section scroll.
 * AIDA structure with minimal aesthetic.
 */
export default function MobileHomePage() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    // ATTENTION: Hook
    {
      id: 'hook',
      gradient: 'from-blue-950 via-blue-900 to-blue-950',
      title: 'I Cut My Own',
      subtitle: 'Platform Fees',
      hint: true,
    },
    
    // INTEREST: Proof
    {
      id: 'proof',
      gradient: 'from-purple-950 via-purple-900 to-purple-950',
      title: 'WildTrax. Ancarraig. Native.',
      subtitle: 'No Turo. No Booking.com. No fees.',
    },
    
    // INTEREST: How
    {
      id: 'how',
      gradient: 'from-indigo-950 via-indigo-900 to-indigo-950',
      title: 'Custom Booking Engine',
      subtitle: 'Your brand. Your customers. Your profit.',
    },
    
    // DESIRE: Who
    {
      id: 'who',
      gradient: 'from-violet-950 via-violet-900 to-violet-950',
      title: 'Rentals. Lodges.',
      subtitle: 'Hotels. Tours.',
    },
    
    // DESIRE: What
    {
      id: 'what',
      gradient: 'from-fuchsia-950 via-fuchsia-900 to-fuchsia-950',
      title: 'Own Your Bookings',
      subtitle: 'Keep your customers',
    },
    
    // ACTION: Choose
    {
      id: 'choose',
      gradient: 'from-pink-950 via-pink-900 to-pink-950',
      title: '£5k to £30k',
      subtitle: '2-8 weeks',
    },
    
    // ACTION: Trust
    {
      id: 'trust',
      gradient: 'from-rose-950 via-rose-900 to-rose-950',
      title: 'No Demos',
      subtitle: 'Running businesses',
    },
    
    // ACTION: Convert
    {
      id: 'convert',
      gradient: 'from-red-950 via-red-900 to-red-950',
      title: 'Paying Platform Fees?',
      subtitle: "Let's talk",
    },
  ]

  return (
    <TikTokScroll
      sections={sections.map((section, index) => (
        <div
          key={section.id}
          className={`relative h-screen w-full bg-gradient-to-br ${section.gradient}`}
        >
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Section number */}
              <div className="text-white/30 text-xs mb-8 font-mono">
                {String(index + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
                {section.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-white/60 leading-relaxed">
                {section.subtitle}
              </p>

              {/* Swipe hint - only on first section */}
              {section.hint && activeSection === 0 && (
                <motion.div
                  className="flex flex-col items-center gap-2 text-white/30 text-sm mt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <span>Swipe up</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      ))}
      onSectionChange={setActiveSection}
    />
  )
}
