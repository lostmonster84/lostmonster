'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useColor } from '@/contexts/ColorContext';
import ContactModal from '@/components/ContactModal';
import { ScrollMorphButton } from '@/components/ScrollMorphButton';

export default function HomePage() {
  const { selectedColor, setSelectedColor, color, colors } = useColor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContactSection, setShowContactSection] = useState(false);

  // Color navigation helpers
  const colorKeys = Object.keys(colors) as Array<keyof typeof colors>;
  const currentColorIndex = colorKeys.indexOf(selectedColor);

  const nextColor = () => {
    const nextIndex = (currentColorIndex + 1) % colorKeys.length;
    setSelectedColor(colorKeys[nextIndex]);
  };

  const previousColor = () => {
    const prevIndex = (currentColorIndex - 1 + colorKeys.length) % colorKeys.length;
    setSelectedColor(colorKeys[prevIndex]);
  };

  // Listen for events from header
  useEffect(() => {
    const handleReset = () => {
      setShowContactSection(false);
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleTriggerMorph = () => {
      // Programmatically click the main morph button
      const morphButton = document.querySelector('[data-morph-button]') as HTMLElement;
      if (morphButton) {
        morphButton.click();
      }
    };

    window.addEventListener('resetToHome', handleReset);
    window.addEventListener('openContactModal', handleOpenModal);
    window.addEventListener('triggerMorph', handleTriggerMorph);

    return () => {
      window.removeEventListener('resetToHome', handleReset);
      window.removeEventListener('openContactModal', handleOpenModal);
      window.removeEventListener('triggerMorph', handleTriggerMorph);
    };
  }, []);

  return (
    <motion.div
      className="relative"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(event, info) => {
        // Swipe right (positive offset) = previous color
        if (info.offset.x > 50) {
          previousColor();
        }
        // Swipe left (negative offset) = next color
        else if (info.offset.x < -50) {
          nextColor();
        }
      }}
    >
      {/* Section 1: Hero - Dark Background - Hide when contact section shows */}
      {!showContactSection && (
        <section
          id="hero-section"
          className={`relative min-h-screen bg-gradient-to-br ${color.bg} transition-colors duration-700 snap-start`}
        >
        {/* Fixed grid pattern background */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none -z-10"></div>

        <div className="relative h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 w-full">
            <div className="text-center max-w-6xl mx-auto">
              {/* Headline */}
              <h1 className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 leading-none tracking-tighter">
                <span className="text-white">Built by</span>
                <br />
                <span className="text-white">Someone Who</span>
                <br />
                <span className="transition-colors duration-300" style={{ color: color.accent }}>Runs Businesses</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-neutral-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Not just codes them. I build systems for my own businesses to cut costs.
                I understand your problems because I've lived them.
              </p>

              {/* CTA - Morphing Button */}
              <div className="flex justify-center px-4">
                <ScrollMorphButton
                  accentColor={color.accent}
                  onMorphComplete={() => setShowContactSection(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-bold rounded-lg shadow-2xl text-black group cursor-pointer min-h-[44px] w-full sm:w-auto max-w-sm sm:max-w-none"
                  style={{
                    backgroundColor: color.accent,
                    boxShadow: `0 20px 60px -15px ${color.accent}40`,
                  }}
                  data-morph-button="true"
                >
                  <span className="hidden sm:inline">Start Your Project</span>
                  <span className="inline sm:hidden">Start Project</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </ScrollMorphButton>
              </div>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* Section 2: Contact - Light Background (Inverted) - Only shown after button click */}
      {showContactSection && (
        <section
          id="contact-section"
          className="relative min-h-screen snap-start transition-colors duration-700"
          style={{ backgroundColor: color.accent }}
        >
        {/* Fixed grid pattern background */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none -z-10"></div>

        <div className="relative h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 w-full">
            <div className="text-center max-w-6xl mx-auto">
              {/* Headline - slides up + fades in */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 leading-none tracking-tighter px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
              >
                <span className="text-white">Let's Build</span>
                <br />
                <motion.span
                  className="transition-colors duration-300"
                  style={{ color: color.bgDark }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.34, 1.56, 0.64, 1], // Overshoot for emphasis
                  }}
                >
                  Something
                </motion.span>
              </motion.h1>

              {/* Subheadline - slides up + fades in */}
              <motion.p
                className="text-lg sm:text-xl md:text-xl lg:text-2xl text-neutral-700 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
              >
                Tell me about your project. I'll tell you if we're a good fit.
              </motion.p>

              {/* CTA Button - scales in + fades in */}
              <motion.div
                className="flex justify-center px-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
              >
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-lg shadow-2xl text-white group cursor-pointer min-h-[44px] w-full sm:w-auto max-w-md sm:max-w-none"
                  style={{
                    backgroundColor: color.bgDark,
                    boxShadow: `0 20px 60px -15px ${color.bgDark}40`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    opacity: 0.9,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="hidden sm:inline">What Problem Are You Solving?</span>
                  <span className="inline sm:hidden">Start Building</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accentColor={color.accent}
      />

      {/* Color Switcher - Swipeable on Mobile, Dots on Desktop */}

      {/* Mobile: Progress Dots Only - Minimal iOS Style */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 pointer-events-none">
        <div className="flex justify-center gap-2">
          {colorKeys.map((colorKey) => (
            <div
              key={colorKey}
              className={`rounded-full transition-all duration-300 ${
                selectedColor === colorKey
                  ? 'w-2 h-2 bg-white shadow-lg'
                  : 'w-1.5 h-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Click Buttons */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <div className="bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg p-4 shadow-2xl">
          <div className="text-xs font-semibold text-white mb-3 text-center">
            Choose Your Color
          </div>
          <div className="flex gap-3">
            {colorKeys.map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => setSelectedColor(colorKey)}
                className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${
                  selectedColor === colorKey
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                    : 'opacity-50 hover:opacity-100 hover:scale-105 active:scale-95'
                }`}
                style={{ backgroundColor: colors[colorKey].accent }}
                title={colors[colorKey].name}
                aria-label={`Switch to ${colors[colorKey].name}`}
              />
            ))}
          </div>
          <div className="text-xs text-neutral-400 mt-2 text-center">
            {color.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
