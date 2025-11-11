'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

// Step-specific schemas for validation
const step1Schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  company: z.string().trim().optional(),
});

const step2Schema = z.object({
  projectType: z.enum(['booking-system', 'ecommerce', 'custom-app', 'design-system', 'other'], {
    message: 'Please select a project type',
  }),
  budget: z.enum(['5-10k', '10-20k', '20-35k', '35k-plus', 'not-sure'], {
    message: 'Please select a budget range',
  }),
  message: z.string().trim().min(10, 'Please tell me about your project (at least 10 characters)'),
});

// Full schema for final submission
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  company: z.string().trim().optional(),
  projectType: z.enum(['booking-system', 'ecommerce', 'custom-app', 'design-system', 'other'], {
    message: 'Please select a project type',
  }),
  budget: z.enum(['5-10k', '10-20k', '20-35k', '35k-plus', 'not-sure'], {
    message: 'Please select a budget range',
  }),
  message: z.string().trim().min(10, 'Please tell me about your project (at least 10 characters)'),
  turnstileToken: z.string().optional(),
  step1Timestamp: z.number().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  accentColor: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function ContactForm({ accentColor, onSuccess, compact = false }: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [step1StartTime, setStep1StartTime] = useState<number>(Date.now());
  
  // Check if Turnstile is properly configured
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isTurnstileConfigured = turnstileSiteKey && turnstileSiteKey !== '1x00000000000000000000AA' && !turnstileSiteKey.startsWith('1x00000000');

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm<ContactFormData>({
    // Don't use resolver - we'll validate manually per step to avoid validating unfilled fields
    mode: 'onChange',
    shouldUnregister: false, // Keep form values when switching steps
  });

  // Track when step 1 starts
  useEffect(() => {
    if (currentStep === 1) {
      setStep1StartTime(Date.now());
    }
  }, [currentStep]);

  const handleNext = async () => {
    // Get current form values
    const formValues = getValues();
    
    // Clear previous errors
    clearErrors(['name', 'email', 'company']);
    
    // Manually validate only step 1 fields
    const result = step1Schema.safeParse({
      name: formValues.name,
      email: formValues.email,
      company: formValues.company,
    });
    
    if (result.success) {
      // If validation passes, move to step 2
      setCurrentStep(2);
      // Store timestamp for bot detection
      setValue('step1Timestamp', Date.now() - step1StartTime);
    } else {
      // Set errors for invalid fields
      result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof ContactFormData;
        setError(field as any, {
          type: 'manual',
          message: err.message,
        });
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow submission on step 2
    if (currentStep !== 2) {
      return;
    }

    // Get all form values
    const formValues = getValues();
    
    // Clear previous errors
    clearErrors();
    
    // Manually validate step 2 fields first
    const step2Result = step2Schema.safeParse({
      projectType: formValues.projectType,
      budget: formValues.budget,
      message: formValues.message,
    });
    
    if (!step2Result.success) {
      // Set errors for invalid step 2 fields
      step2Result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof ContactFormData;
        setError(field as any, {
          type: 'manual',
          message: err.message,
        });
      });
      return;
    }

    // Validate step 1 fields are still present
    const step1Result = step1Schema.safeParse({
      name: formValues.name,
      email: formValues.email,
      company: formValues.company,
    });
    
    if (!step1Result.success) {
      // If step 1 fields are invalid, go back to step 1
      setCurrentStep(1);
      step1Result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof ContactFormData;
        setError(field as any, {
          type: 'manual',
          message: err.message,
        });
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Calculate time spent on form (bot detection)
      const timeSpent = formValues.step1Timestamp || 0;
      
      // Prepare data for submission
      const trimmedData = {
        name: (formValues.name || '').trim(),
        email: (formValues.email || '').trim(),
        company: (formValues.company || '').trim() || '',
        projectType: formValues.projectType!,
        budget: formValues.budget!,
        message: (formValues.message || '').trim(),
        turnstileToken: turnstileToken || undefined,
        // Include timing data for bot detection (server can check if too fast)
        _timing: {
          step1Time: timeSpent,
          totalTime: Date.now() - step1StartTime,
        },
      };

      // Final validation check
      if (!trimmedData.name || !trimmedData.email || !trimmedData.projectType || !trimmedData.budget || !trimmedData.message) {
        setSubmitStatus('error');
        setErrorMessage('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedData),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        // If response is not JSON, use status text
        throw new Error(response.statusText || 'Invalid response from server');
      }

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTurnstileToken('');
        setCurrentStep(1);
        // Scroll to success message
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        // Call onSuccess callback if provided (for modal auto-close)
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setSubmitStatus('error');
        // Extract error message from API response
        if (responseData.error) {
          setErrorMessage(responseData.error);
        } else if (responseData.details && Array.isArray(responseData.details)) {
          // Handle Zod validation errors
          const zodErrors = responseData.details.map((err: any) => err.message).join(', ');
          setErrorMessage(zodErrors);
        } else {
          setErrorMessage('Failed to send message. Please try again.');
        }
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error?.message || 'Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={compact ? "" : "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12"}>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className={`${compact ? 'mb-4 p-4' : 'mb-8 p-6'} bg-green-500/10 border border-green-500/30 rounded-lg`} role="alert">
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
        <div className={`${compact ? 'mb-4 p-4' : 'mb-8 p-6'} bg-red-500/10 border border-red-500/30 rounded-lg`} role="alert">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">Something Went Wrong</h3>
              <p className="text-neutral-300 text-sm">
                {errorMessage || 'Please try again or refresh the page and resubmit.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className={compact ? "space-y-4" : "space-y-6"}>
        {/* Step Indicator */}
        <div className={`flex items-center justify-center gap-2 ${compact ? 'mb-4' : 'mb-6'}`}>
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-white' : 'text-neutral-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 1 ? 'bg-white/20' : 'bg-white/5'
            }`}>
              1
            </div>
            <span className="text-sm hidden sm:inline">Contact</span>
          </div>
          <div className={`h-0.5 w-12 ${currentStep >= 2 ? 'bg-white/20' : 'bg-white/5'}`} />
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-white' : 'text-neutral-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 2 ? 'bg-white/20' : 'bg-white/5'
            }`}>
              2
            </div>
            <span className="text-sm hidden sm:inline">Project</span>
          </div>
        </div>

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className={`${compact ? 'space-y-4' : 'space-y-6'} animate-in fade-in slide-in-from-right-4 duration-300`}>
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

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                Company <span className="text-neutral-400 text-xs">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                {...register('company')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ ['--tw-ring-color' as any]: accentColor }}
                placeholder="Your company name"
                aria-invalid={errors.company ? 'true' : 'false'}
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full px-8 py-4 text-lg font-bold rounded-lg transition-all shadow-2xl text-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 20px 60px -15px ${accentColor}40`
              }}
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className={`${compact ? 'space-y-4' : 'space-y-6'} animate-in fade-in slide-in-from-right-4 duration-300`}>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

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
                <option value="5-10k" className="bg-neutral-900">£5k - £10k</option>
                <option value="10-20k" className="bg-neutral-900">£10k - £20k</option>
                <option value="20-35k" className="bg-neutral-900">£20k - £35k</option>
                <option value="35k-plus" className="bg-neutral-900">£35k+</option>
                <option value="not-sure" className="bg-neutral-900">Not sure yet</option>
              </select>
              {errors.budget && (
                <p className="mt-2 text-sm text-red-400" role="alert">
                  {errors.budget.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                What do you want to achieve? *
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

            {/* Turnstile CAPTCHA - Optional, only show if configured */}
            {isTurnstileConfigured && (
              <div>
                <Turnstile
                  siteKey={turnstileSiteKey!}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setValue('turnstileToken', token);
                  }}
                  onError={() => {
                    setTurnstileToken('');
                    setValue('turnstileToken', '');
                  }}
                  onExpire={() => {
                    setTurnstileToken('');
                    setValue('turnstileToken', '');
                  }}
                  options={{
                    theme: 'dark',
                    size: 'normal',
                  }}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || (isTurnstileConfigured ? !turnstileToken : false)}
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
                  Submit
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
