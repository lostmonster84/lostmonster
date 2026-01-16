'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AutoLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('No token provided');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    // Use the cross-origin token to sign in directly
    const performLogin = async () => {
      setStatus('Signing you in...');

      const result = await signIn('credentials', {
        crossOriginToken: token,
        redirect: false,
      });

      if (result?.error) {
        setStatus('Authentication failed');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        router.push('/');
        router.refresh();
      }
    };

    performLogin();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}
