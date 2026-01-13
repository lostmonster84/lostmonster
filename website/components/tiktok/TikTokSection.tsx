'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TikTokSectionProps {
  backgroundImage?: string
  backgroundColor?: string
  accentColor?: string
  children: ReactNode
  className?: string
}

/**
 * TikTok Section Template
 * 
 * Full-screen section with background image/color, gradient overlay,
 * and content positioned in thumb zone (bottom 40% of screen).
 * 
 * Usage:
 * ```tsx
 * <TikTokSection backgroundImage="/hero.jpg" accentColor="#3b82f6">
 *   <h1>Your headline</h1>
 *   <p>Supporting copy</p>
 *   <button>CTA</button>
 * </TikTokSection>
 * ```
 */
export function TikTokSection({
  backgroundImage,
  backgroundColor = 'from-gray-900 to-black',
  accentColor = '#3b82f6',
  children,
  className = '',
}: TikTokSectionProps) {
  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          quality={90}
        />
      )}

      {/* Background Color (if no image) */}
      {!backgroundImage && (
        <div className={`absolute inset-0 bg-gradient-to-br ${backgroundColor}`} />
      )}

      {/* Gradient Overlay (always present for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {/* Content - Bottom aligned (thumb zone) */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ 
          // Pass accent color to children via CSS variable
          ['--accent-color' as string]: accentColor 
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

