'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.enum(['booking-system', 'ecommerce', 'custom-app', 'design-system', 'other'], {
    required_error: 'Please select a project type',
  }),
  budget: z.enum(['15-30k', '30-50k', '50-75k', '75k-plus', 'not-sure'], {
    required_error: 'Please select a budget range',
  }),
  message: z.string().min(10, 'Please tell me about your project (at least 10 characters)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  accentColor: string;
}

export default function ContactForm({ accentColor }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        // Scroll to success message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg" role="alert">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-1">Message Sent!</h3>
              <p className="text-neutral-300 text-sm">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg" role="alert">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-1">Something Went Wrong</h3>
              <p className="text-neutral-300 text-sm">
                Please try again or email me directly at{' '}
                <a href="mailto:hello@lostmonster.com" className="underline hover:text-white">
                  hello@lostmonster.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            style={{ ['--tw-ring-color' as any]: accentColor }}
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            style={{ ['--tw-ring-color' as any]: accentColor }}
            placeholder="your@email.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
            Project Type *
          </label>
          <select
            id="projectType"
            {...register('projectType')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer"
            style={{ ['--tw-ring-color' as any]: accentColor }}
            aria-invalid={errors.projectType ? 'true' : 'false'}
          >
            <option value="" className="bg-neutral-900">Select project type...</option>
            <option value="booking-system" className="bg-neutral-900">Booking System</option>
            <option value="ecommerce" className="bg-neutral-900">E-commerce Site</option>
            <option value="custom-app" className="bg-neutral-900">Custom Application</option>
            <option value="design-system" className="bg-neutral-900">Design System</option>
            <option value="other" className="bg-neutral-900">Other</option>
          </select>
          {errors.projectType && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errors.projectType.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
            Budget Range *
          </label>
          <select
            id="budget"
            {...register('budget')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer"
            style={{ ['--tw-ring-color' as any]: accentColor }}
            aria-invalid={errors.budget ? 'true' : 'false'}
          >
            <option value="" className="bg-neutral-900">Select budget range...</option>
            <option value="15-30k" className="bg-neutral-900">£15k - £30k</option>
            <option value="30-50k" className="bg-neutral-900">£30k - £50k</option>
            <option value="50-75k" className="bg-neutral-900">£50k - £75k</option>
            <option value="75k-plus" className="bg-neutral-900">£75k+</option>
            <option value="not-sure" className="bg-neutral-900">Not sure yet</option>
          </select>
          {errors.budget && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errors.budget.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
            Tell me about your project *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
            style={{ ['--tw-ring-color' as any]: accentColor }}
            placeholder="What are you looking to build? What problem are you trying to solve?"
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 text-lg font-bold rounded-lg transition-all shadow-2xl text-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 20px 60px -15px ${accentColor}40`
          }}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
