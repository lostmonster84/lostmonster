import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-heading font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-neutral-700 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">
            Go Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}

