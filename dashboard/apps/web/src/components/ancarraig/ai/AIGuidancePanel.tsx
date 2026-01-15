'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@lostmonster/ui';
import { Sparkles, Plus, X } from 'lucide-react';
import { AncarraigCost } from '@lostmonster/database';

interface AIGuidancePanelProps {
  existingCosts: AncarraigCost[];
  onAddSuggestedCost: (suggestion: SuggestedCost) => void;
}

export interface SuggestedCost {
  name: string;
  category: 'fixed' | 'variable' | 'per_booking';
  period: 'annual' | 'monthly' | 'per_night' | 'per_booking';
  estimatedAmount?: number;
  reason: string;
}

// Common costs for lodge properties
const COMMON_LODGE_COSTS: SuggestedCost[] = [
  {
    name: 'Mortgage/Loan Repayment',
    category: 'fixed',
    period: 'monthly',
    estimatedAmount: 1500,
    reason: 'Most lodges have mortgage costs that are critical for breakeven calculations',
  },
  {
    name: 'Property Insurance',
    category: 'fixed',
    period: 'annual',
    estimatedAmount: 1800,
    reason: 'Commercial property insurance is essential and usually paid annually',
  },
  {
    name: 'Council Tax/Business Rates',
    category: 'fixed',
    period: 'annual',
    estimatedAmount: 2400,
    reason: 'Local authority taxes are a significant fixed cost for rental properties',
  },
  {
    name: 'Utilities (Electric, Gas, Water)',
    category: 'variable',
    period: 'monthly',
    estimatedAmount: 250,
    reason: 'Variable costs that increase with occupancy but have a baseline',
  },
  {
    name: 'Broadband/Internet',
    category: 'fixed',
    period: 'monthly',
    estimatedAmount: 50,
    reason: 'Essential service for guests, usually a fixed monthly cost',
  },
  {
    name: 'Cleaning Per Stay',
    category: 'per_booking',
    period: 'per_booking',
    estimatedAmount: 120,
    reason: 'Most lodges have professional cleaning between guests',
  },
  {
    name: 'Linen & Towel Service',
    category: 'per_booking',
    period: 'per_booking',
    estimatedAmount: 45,
    reason: 'Cost of providing and laundering linen for each booking',
  },
  {
    name: 'Welcome Pack/Essentials',
    category: 'per_booking',
    period: 'per_booking',
    estimatedAmount: 25,
    reason: 'Toiletries, tea, coffee, and welcome items for each guest',
  },
  {
    name: 'Property Maintenance',
    category: 'variable',
    period: 'monthly',
    estimatedAmount: 200,
    reason: 'Regular maintenance, repairs, and upkeep costs',
  },
  {
    name: 'Booking Platform Commission',
    category: 'variable',
    period: 'per_booking',
    estimatedAmount: 0, // Percentage-based
    reason: 'Airbnb, Booking.com take 12-18% commission on each booking',
  },
  {
    name: 'Property Management Fee',
    category: 'variable',
    period: 'per_booking',
    estimatedAmount: 0,
    reason: 'If using a property manager, usually 15-25% of booking value',
  },
  {
    name: 'Garden/Grounds Maintenance',
    category: 'variable',
    period: 'monthly',
    estimatedAmount: 150,
    reason: 'Keeping outdoor spaces presentable for guests',
  },
  {
    name: 'Hot Tub Maintenance',
    category: 'variable',
    period: 'monthly',
    estimatedAmount: 180,
    reason: 'If you have a hot tub: chemicals, cleaning, servicing',
  },
  {
    name: 'Marketing & Photography',
    category: 'fixed',
    period: 'annual',
    estimatedAmount: 800,
    reason: 'Professional photos and marketing materials',
  },
  {
    name: 'Accountancy/Bookkeeping',
    category: 'fixed',
    period: 'annual',
    estimatedAmount: 600,
    reason: 'Tax returns and financial management',
  },
];

export function AIGuidancePanel({ existingCosts, onAddSuggestedCost }: AIGuidancePanelProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter out costs that already exist
  const existingCostNames = new Set(
    existingCosts.map(c => c.name.toLowerCase().trim())
  );

  const suggestions = COMMON_LODGE_COSTS.filter(suggestion => {
    const suggestionNameLower = suggestion.name.toLowerCase();
    // Check if this cost or similar doesn't already exist
    return !Array.from(existingCostNames).some(existingName =>
      existingName.includes(suggestionNameLower.split(' ')[0]) ||
      suggestionNameLower.includes(existingName.split(' ')[0])
    );
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowSuggestions(true);
    }, 1000);
  };

  if (!showSuggestions) {
    return (
      <Card className="border-cyan-500/20 bg-cyan-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
              <Sparkles className="h-5 w-5 text-cyan-500" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">AI Cost Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Let AI analyze your lodge and suggest costs you might be missing. This helps
                  ensure your breakeven calculations are accurate.
                </p>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze My Costs'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cyan-500/20 bg-cyan-500/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-500" />
            <CardTitle>Suggested Costs</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {suggestions.length > 0
            ? `${suggestions.length} costs you might be missing`
            : 'Great! You\'ve covered all common costs.'}
        </CardDescription>
      </CardHeader>

      {suggestions.length > 0 && (
        <CardContent>
          <div className="space-y-3">
            {suggestions.slice(0, 5).map((suggestion, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{suggestion.name}</h4>
                    {suggestion.estimatedAmount && suggestion.estimatedAmount > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ~£{suggestion.estimatedAmount.toLocaleString()} {suggestion.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddSuggestedCost(suggestion)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}

            {suggestions.length > 5 && (
              <p className="text-sm text-muted-foreground text-center pt-2">
                + {suggestions.length - 5} more suggestions
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
