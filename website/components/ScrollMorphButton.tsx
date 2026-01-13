'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

interface ScrollMorphButtonProps {
  children: React.ReactNode;
  accentColor: string;
  onMorphComplete: () => void;
  className?: string;
  style?: React.CSSProperties;
  'data-morph-button'?: string;
}

export function ScrollMorphButton({
  children,
  accentColor,
  onMorphComplete,
  className,
  style,
  ...rest
}: ScrollMorphButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (!buttonRef.current || isAnimating) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    setIsAnimating(true);

    // Create expanding overlay
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
      opacity: 1;
      will-change: transform, opacity;
    `;
    document.body.appendChild(overlay);

    // Animate expansion
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
        duration: 600,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards',
      }
    );

    // Wait for expansion to complete, then show section
    expansionAnimation.finished.then(() => {
      // Show the contact section (triggers parent state update)
      onMorphComplete();

      // Fade out overlay after a brief pause
      setTimeout(() => {
        overlay.animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: 400,
            easing: 'ease-out',
            fill: 'forwards',
          }
        ).finished.then(() => {
          overlay.remove();
          setIsAnimating(false);
        });
      }, 200);
    });
  }, [accentColor, onMorphComplete, isAnimating]);

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
      {...rest}
    >
      {children}
    </motion.div>
  );
}
