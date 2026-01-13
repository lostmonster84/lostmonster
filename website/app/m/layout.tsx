import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevent zoom (TikTok-style)
  userScalable: false,
  viewportFit: 'cover', // iOS safe area
}

export const metadata: Metadata = {
  title: 'Lost Monster - Web Development',
  description: 'Modern web development and design systems',
}

/**
 * Mobile Layout - Optimized for TikTok-Style Experience
 * 
 * Key differences from desktop:
 * - No zoom allowed (maximumScale: 1)
 * - Full viewport coverage
 * - Minimal chrome
 */
export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

