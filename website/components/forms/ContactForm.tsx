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
  timeline: z.enum(['asap', '1-2-months', '2-4-months', 'flexible'], {
    message: 'Please select a timeline',
  }),
  isDecisionMaker: z.boolean().refine((val) => val === true, {
    message: 'We work directly with business owners and decision makers',
  }),
});

const step3Schema = z.object({
  projectType: z.enum(['booking-system', 'ecommerce', 'custom-app', 'design-system', 'other'], {
    message: 'Please select a project type',
  }),
  budget: z.enum(['5-10k', '10-20k', '20-35k', '35k-plus', 'not-sure'], {
    message: 'Please select a budget range',
  }),
  message: z.string().trim().min(10, 'Please tell me what is costing you money (at least 10 characters)'),
});

// Full schema for final submission
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  company: z.string().trim().optional(),
  timeline: z.enum(['asap', '1-2-months', '2-4-months', 'flexible'], {
    message: 'Please select a timeline',
  }),
  isDecisionMaker: z.boolean().refine((val) => val === true, {
    message: 'We work directly with business owners and decision makers',
  }),
  projectType: z.enum(['booking-system', 'ecommerce', 'custom-app', 'design-system', 'other'], {
    message: 'Please select a project type',
  }),
  budget: z.enum(['5-10k', '10-20k', '20-35k', '35k-plus', 'not-sure'], {
    message: 'Please select a budget range',
  }),
  message: z.string().trim().min(10, 'Please tell me what is costing you money (at least 10 characters)'),
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
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  
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

  const handleStep1Next = async () => {
    const formValues = getValues();
    clearErrors(['name', 'email', 'company']);

    const result = step1Schema.safeParse({
      name: formValues.name,
      email: formValues.email,
      company: formValues.company,
    });

    if (result.success) {
      setCurrentStep(2);
      setValue('step1Timestamp', Date.now() - step1StartTime);
    } else {
      result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as keyof ContactFormData;
        setError(field as any, {
          type: 'manual',
          message: err.message,
        });
      });
    }
  };

  const handleStep2Next = async () => {
    const formValues = getValues();
    clearErrors(['timeline', 'isDecisionMaker']);

    const result = step2Schema.safeParse({
      timeline: formValues.timeline,
      isDecisionMaker: formValues.isDecisionMaker,
    });

    if (result.success) {
      setCurrentStep(3);
    } else {
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
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only allow submission on step 3
    if (currentStep !== 3) {
      return;
    }

    // Get all form values
    const formValues = getValues();

    // Clear previous errors
    clearErrors();

    // Manually validate step 3 fields first
    const step3Result = step3Schema.safeParse({
      projectType: formValues.projectType,
      budget: formValues.budget,
      message: formValues.message,
    });

    if (!step3Result.success) {
      // Set errors for invalid step 3 fields
      step3Result.error.issues.forEach((err: z.ZodIssue) => {
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

    // Validate step 2 fields are still present
    const step2Result = step2Schema.safeParse({
      timeline: formValues.timeline,
      isDecisionMaker: formValues.isDecisionMaker,
    });

    if (!step2Result.success) {
      // If step 2 fields are invalid, go back to step 2
      setCurrentStep(2);
      step2Result.error.issues.forEach((err: z.ZodIssue) => {
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
        timeline: formValues.timeline!,
        isDecisionMaker: formValues.isDecisionMaker!,
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
      if (!trimmedData.name || !trimmedData.email || !trimmedData.timeline || !trimmedData.isDecisionMaker || !trimmedData.projectType || !trimmedData.budget || !trimmedData.message) {
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
        setShowSuccessScreen(true);
        reset();
        setTurnstileToken('');
        // Success screen stays open until user manually closes modal
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
      {/* Success Screen */}
      {showSuccessScreen ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-20 animate-in fade-in duration-300">
          <h2
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none tracking-tighter"
            style={{
              color: accentColor,
              textShadow: `0 0 80px ${accentColor}40`
            }}
          >
            Nice one
          </h2>
          <p className="text-2xl md:text-3xl text-white font-medium">
            Thanks for your submission
          </p>
        </div>
      ) : (
        <>
          {/* Success Message */}
          {submitStatus === 'success' && (
        <div className={`${compact ? 'mb-6 p-5' : 'mb-8 p-6'} bg-green-500/10 backdrop-blur-md border border-green-500/30 rounded-xl`} role="alert">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-7 h-7 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-2 text-lg">Message Sent!</h3>
              <p className="text-neutral-300 text-base">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className={`${compact ? 'mb-6 p-5' : 'mb-8 p-6'} bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-xl`} role="alert">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-7 h-7 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-white mb-2 text-lg">Something Went Wrong</h3>
              <p className="text-neutral-300 text-base">
                {errorMessage || 'Please try again or refresh the page and resubmit.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className={compact ? "space-y-5" : "space-y-6"}>
        {/* Step Indicator */}
        <div className={`flex items-center justify-center gap-3 ${compact ? 'mb-6' : 'mb-8'}`}>
          <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'text-white' : 'text-neutral-500'}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold backdrop-blur-md border transition-all ${
                currentStep >= 1 ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
              }`}
            >
              1
            </div>
            <span className="text-base font-medium hidden sm:inline">Contact</span>
          </div>
          <div className={`h-0.5 w-12 rounded-full ${currentStep >= 2 ? 'bg-white/30' : 'bg-white/10'}`} />
          <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'text-white' : 'text-neutral-500'}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold backdrop-blur-md border transition-all ${
                currentStep >= 2 ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
              }`}
            >
              2
            </div>
            <span className="text-base font-medium hidden sm:inline">Timeline</span>
          </div>
          <div className={`h-0.5 w-12 rounded-full ${currentStep >= 3 ? 'bg-white/30' : 'bg-white/10'}`} />
          <div className={`flex items-center gap-3 ${currentStep >= 3 ? 'text-white' : 'text-neutral-500'}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold backdrop-blur-md border transition-all ${
                currentStep >= 3 ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
              }`}
            >
              3
            </div>
            <span className="text-base font-medium hidden sm:inline">Project</span>
          </div>
        </div>

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className={`${compact ? 'space-y-5' : 'space-y-6'} animate-in fade-in slide-in-from-right-4 duration-300`}>
            <div>
              <label htmlFor="name" className="block text-base font-semibold text-white mb-2">
                Name *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
                placeholder="Your name"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-semibold text-white mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
                placeholder="your@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-base font-semibold text-white mb-2">
                Company <span className="text-neutral-400 text-sm font-normal">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                {...register('company')}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
                placeholder="Your company name"
                aria-invalid={errors.company ? 'true' : 'false'}
              />
            </div>

            <button
              type="button"
              onClick={handleStep1Next}
              className="w-full px-8 py-4 text-lg font-bold rounded-xl transition-all shadow-2xl text-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] mt-6"
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

        {/* Step 2: Timeline & Decision Maker */}
        {currentStep === 2 && (
          <div className={`${compact ? 'space-y-5' : 'space-y-6'} animate-in fade-in slide-in-from-right-4 duration-300`}>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-medium">Back</span>
            </button>

            <div>
              <label htmlFor="timeline" className="block text-base font-semibold text-white mb-2">
                When do you need this live? *
              </label>
              <select
                id="timeline"
                {...register('timeline')}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
                aria-invalid={errors.timeline ? 'true' : 'false'}
              >
                <option value="" className="bg-neutral-900">Select timeline...</option>
                <option value="asap" className="bg-neutral-900">ASAP (unrealistic)</option>
                <option value="1-2-months" className="bg-neutral-900">1-2 months</option>
                <option value="2-4-months" className="bg-neutral-900">2-4 months (realistic)</option>
                <option value="flexible" className="bg-neutral-900">Flexible</option>
              </select>
              {errors.timeline && (
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
                  {errors.timeline.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('isDecisionMaker')}
                  className="mt-1 w-5 h-5 rounded bg-white/5 backdrop-blur-md border cursor-pointer focus:outline-none focus:ring-2 focus:border-transparent transition-all checked:bg-current"
                  style={{
                    ['--tw-ring-color' as any]: accentColor,
                    borderColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                  aria-invalid={errors.isDecisionMaker ? 'true' : 'false'}
                />
                <span className="text-base text-white group-hover:text-neutral-300 transition-colors">
                  <span className="font-semibold">I'm the business owner/decision maker</span>
                  <span className="block text-sm text-neutral-400 mt-1">
                    I work directly with owners, not middlemen
                  </span>
                </span>
              </label>
              {errors.isDecisionMaker && (
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
                  {errors.isDecisionMaker.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleStep2Next}
              className="w-full px-8 py-4 text-lg font-bold rounded-xl transition-all shadow-2xl text-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] mt-6"
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

        {/* Step 3: Project Details */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-medium">Back</span>
            </button>

            <div>
              <label htmlFor="projectType" className="block text-base font-semibold text-white mb-1.5">
                Project Type *
              </label>
              <select
                id="projectType"
                {...register('projectType')}
                className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
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
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
                  {errors.projectType.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className="block text-base font-semibold text-white mb-1.5">
                Budget Range *
              </label>
              <select
                id="budget"
                {...register('budget')}
                className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
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
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
                  {errors.budget.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-semibold text-white mb-1.5">
                What's costing you money right now? *
              </label>
              <textarea
                id="message"
                rows={3}
                {...register('message')}
                className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-md border rounded-xl text-white text-base placeholder-neutral-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{
                  ['--tw-ring-color' as any]: accentColor,
                  borderColor: `${accentColor}20`,
                }}
                placeholder="Brief description of the problem..."
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400 font-medium" role="alert">
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
              className="w-full px-8 py-4 text-lg font-bold rounded-xl transition-all shadow-2xl text-black flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
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
          </div>
        )}
      </form>
        </>
      )}
    </div>
  );
}
