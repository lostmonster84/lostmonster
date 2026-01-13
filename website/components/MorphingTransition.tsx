'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useRef, useCallback } from 'react';

interface MorphingTransitionProps {
  href: string;
  children: React.ReactNode;
  accentColor: string;
  backgroundGradient: string; // The destination page gradient
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingButton({
  href,
  children,
  accentColor,
  backgroundGradient,
  className,
  style,
}: MorphingTransitionProps) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (!buttonRef.current || isAnimating) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();

      setIsAnimating(true);

      // Create expanding overlay that stays the accent color
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        left: ${rect.left}px;
        top: ${rect.top}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        background: ${accentColor};
        border-radius: ${window.getComputedStyle(button).borderRadius};
        z-index: 9999;
        pointer-events: none;
        transform-origin: center;
        opacity: 1;
        will-change: transform, opacity;
      `;
      document.body.appendChild(overlay);

      // Animate expansion only (keep accent color throughout)
      const targetWidth = window.innerWidth;
      const targetHeight = window.innerHeight;

      const expansionAnimation = overlay.animate(
        [
          {
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            borderRadius: window.getComputedStyle(button).borderRadius,
            opacity: 1,
          },
          {
            left: '0px',
            top: '0px',
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            borderRadius: '0px',
            opacity: 1,
          },
        ],
        {
          duration: 600, // Slower, smoother expansion
          easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          fill: 'forwards',
        }
      );

      // Navigate when expansion is halfway
      setTimeout(() => {
        router.push(href);
      }, 300);

      // Fade out overlay after expansion
      expansionAnimation.finished.then(() => {
        overlay.animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards',
          }
        ).finished.then(() => {
          overlay.remove();
          setIsAnimating(false);
        });
      });
    },
    [href, router, accentColor, backgroundGradient, isAnimating]
  );

  return (
    <motion.div
      ref={buttonRef}
      onClick={handleClick}
      className={className}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}
