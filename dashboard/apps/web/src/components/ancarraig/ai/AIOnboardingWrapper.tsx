'use client';

import { useState, useEffect } from 'react';
import { OnboardingWizard } from './OnboardingWizard';

interface AIOnboardingWrapperProps {
  userId: string;
  wizardCompleted: boolean;
  children: React.ReactNode;
}

export function AIOnboardingWrapper({
  userId,
  wizardCompleted: initialCompleted,
  children,
}: AIOnboardingWrapperProps) {
  const [showWizard, setShowWizard] = useState(!initialCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWizardComplete = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/ancarraig/ai/wizard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save wizard data');
      }

      setShowWizard(false);
    } catch (error) {
      console.error('Error saving wizard:', error);
      alert('Failed to save your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    setShowWizard(false);
  };

  return (
    <>
      {showWizard && (
        <OnboardingWizard
          onComplete={handleWizardComplete}
          onSkip={handleSkip}
        />
      )}
      {children}
    </>
  );
}
