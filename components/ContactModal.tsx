'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import ContactForm from './forms/ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export default function ContactModal({ isOpen, onClose, accentColor }: ContactModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Handle backdrop click (close when clicking outside modal)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Form submission success - modal stays open until user manually closes
  const handleFormSuccess = () => {
    // Success screen will show, user closes modal when ready
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300 overflow-hidden"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" aria-hidden="true" />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-400 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0a0a0a 100%)',
        }}
      >
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none rounded-2xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="relative p-6 md:p-10">
          {/* Header - Bold, Massive Typography */}
          <div className="text-center mb-6 md:mb-8">
            <h2
              id="modal-title"
              className="text-4xl md:text-5xl font-bold mb-3 leading-none tracking-tighter"
            >
              <span className="text-white">Let's Build</span>
              <br />
              <span className="transition-colors duration-300" style={{ color: accentColor }}>
                Something
              </span>
            </h2>
            <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto">
              Tell me about your project. I'll tell you if we're a good fit.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm accentColor={accentColor} onSuccess={handleFormSuccess} compact={true} />
        </div>
      </div>
    </div>
  );
}
