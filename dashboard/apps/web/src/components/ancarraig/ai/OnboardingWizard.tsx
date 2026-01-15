'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lostmonster/ui/card';
import { Button } from '@lostmonster/ui/button';
import { Input } from '@lostmonster/ui/input';
import { Building2, Target, TrendingUp, DollarSign, Calendar, Sparkles } from 'lucide-react';

type WizardStep = 1 | 2 | 3 | 4;

interface WizardData {
  // Step 1: Business Basics
  propertyName?: string;
  propertyLocation?: string;
  propertyType?: string;
  numberOfBedrooms?: string;

  // Step 2: Pricing Goals
  primaryGoal?: 'maximize-revenue' | 'high-occupancy' | 'balanced' | 'premium-positioning';
  averageNightlyRate?: string;
  occupancyTarget?: string;

  // Step 3: Current Challenges
  biggestChallenge?: string;
  competitors?: string;
  seasonalityImpact?: 'high' | 'moderate' | 'low';

  // Step 4: Distribution
  mainChannels?: string[];
  commissionConcern?: 'high' | 'moderate' | 'low';
}

interface OnboardingWizardProps {
  onComplete: (data: WizardData) => Promise<void>;
  onSkip: () => void;
}

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [data, setData] = useState<WizardData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await onComplete(data);
    } catch (error) {
      console.error('Failed to save wizard data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.propertyName && data.propertyType;
      case 2:
        return data.primaryGoal;
      case 3:
        return data.biggestChallenge;
      case 4:
        return data.mainChannels && data.mainChannels.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <Card className="w-full max-w-2xl mx-4 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Let's personalize your AI Assistant</CardTitle>
          <CardDescription className="text-base">
            Answer a few questions so the AI can give you better pricing advice
          </CardDescription>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-8 bg-primary'
                    : s < step
                    ? 'w-2 bg-primary/60'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Business Basics */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Building2 className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Tell us about your property</h3>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Property Name *</label>
                <Input
                  placeholder="e.g., The Highland Retreat"
                  value={data.propertyName || ''}
                  onChange={(e) => updateData({ propertyName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="e.g., Scottish Highlands"
                  value={data.propertyLocation || ''}
                  onChange={(e) => updateData({ propertyLocation: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Property Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Lodge', 'Cabin', 'Villa', 'Cottage'].map((type) => (
                    <button
                      key={type}
                      onClick={() => updateData({ propertyType: type })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        data.propertyType === type
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Number of Bedrooms</label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  value={data.numberOfBedrooms || ''}
                  onChange={(e) => updateData({ numberOfBedrooms: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Pricing Goals */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Target className="h-5 w-5" />
                <h3 className="font-semibold text-lg">What's your pricing strategy?</h3>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Primary Goal *</label>
                <div className="space-y-3">
                  {[
                    { id: 'maximize-revenue', label: 'Maximize Revenue', desc: 'Optimize for highest income' },
                    { id: 'high-occupancy', label: 'High Occupancy', desc: 'Keep the property booked' },
                    { id: 'balanced', label: 'Balanced Approach', desc: 'Mix of revenue and occupancy' },
                    { id: 'premium-positioning', label: 'Premium Positioning', desc: 'Exclusive, high-end pricing' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => updateData({ primaryGoal: goal.id as WizardData['primaryGoal'] })}
                      className={`w-full px-4 py-3 rounded-lg border-2 text-left transition-all ${
                        data.primaryGoal === goal.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{goal.label}</div>
                      <div className="text-sm text-muted-foreground">{goal.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Average Nightly Rate</label>
                  <Input
                    placeholder="e.g., £250"
                    value={data.averageNightlyRate || ''}
                    onChange={(e) => updateData({ averageNightlyRate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Occupancy Target</label>
                  <Input
                    placeholder="e.g., 75%"
                    value={data.occupancyTarget || ''}
                    onChange={(e) => updateData({ occupancyTarget: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Challenges */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 text-primary mb-4">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-semibold text-lg">What are your biggest challenges?</h3>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Biggest Challenge *</label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Competing with larger properties on Airbnb, struggling with off-season bookings..."
                  value={data.biggestChallenge || ''}
                  onChange={(e) => updateData({ biggestChallenge: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Main Competitors (optional)</label>
                <Input
                  placeholder="e.g., Highland Haven, Glen Lodge"
                  value={data.competitors || ''}
                  onChange={(e) => updateData({ competitors: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">How much does seasonality impact you?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'high', label: 'High', desc: 'Major swings' },
                    { id: 'moderate', label: 'Moderate', desc: 'Some variation' },
                    { id: 'low', label: 'Low', desc: 'Fairly consistent' },
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() => updateData({ seasonalityImpact: level.id as WizardData['seasonalityImpact'] })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        data.seasonalityImpact === level.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Distribution */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 text-primary mb-4">
                <DollarSign className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Where do you get bookings?</h3>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Main Booking Channels *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Airbnb', 'Booking.com', 'Direct Bookings', 'VRBO', 'Expedia', 'Other'].map((channel) => {
                    const isSelected = data.mainChannels?.includes(channel);
                    return (
                      <button
                        key={channel}
                        onClick={() => {
                          const current = data.mainChannels || [];
                          const updated = isSelected
                            ? current.filter((c) => c !== channel)
                            : [...current, channel];
                          updateData({ mainChannels: updated });
                        }}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10 text-primary font-medium'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {channel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">How concerned are you about commissions?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'high', label: 'Very Concerned', desc: 'Major cost' },
                    { id: 'moderate', label: 'Somewhat', desc: 'Worth optimizing' },
                    { id: 'low', label: 'Not Much', desc: 'Cost of doing business' },
                  ].map((level) => (
                    <button
                      key={level.id}
                      onClick={() => updateData({ commissionConcern: level.id as WizardData['commissionConcern'] })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        data.commissionConcern === level.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="ghost"
              onClick={step === 1 ? onSkip : handleBack}
              disabled={isSubmitting}
            >
              {step === 1 ? 'Skip for now' : 'Back'}
            </Button>

            {step < 4 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={!canProceed() || isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Complete Setup'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
