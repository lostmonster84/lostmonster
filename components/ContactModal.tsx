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

  // Handle successful form submission
  const handleFormSuccess = () => {
    // Wait 2 seconds to show success message, then close
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" aria-hidden="true" />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-400 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
        style={{
          borderColor: `${accentColor}20`,
          boxShadow: `0 20px 60px -15px ${accentColor}40, 0 0 0 1px ${accentColor}10`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-4 md:mb-6">
            <h2
              id="modal-title"
              className="text-2xl md:text-3xl font-bold mb-2 leading-tight tracking-tight"
            >
              <span className="text-white">Let's Build</span>{' '}
              <span className="transition-colors duration-300" style={{ color: accentColor }}>
                Something
              </span>
            </h2>
            <p className="text-sm md:text-base text-neutral-300 max-w-2xl mx-auto">
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
