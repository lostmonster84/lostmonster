'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
    }
    // In production, you could send to an error tracking service like Sentry
  }, [error]);

  return (
    <div className="section-padding bg-white min-h-screen flex items-center">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-heading font-bold text-neutral-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-neutral-700 mb-8">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              {error.message}
            </p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button href="/" variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

