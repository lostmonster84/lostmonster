'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@lostmonster/ui';
import { Calculator, TrendingUp } from 'lucide-react';
import { AncarraigChannel, AncarraigLodge } from '@lostmonster/database';
import { ReverseCalculatorResult } from '@/lib/ancarraig/reverse-calculator';
import { PriceLeakageWaterfall } from './PriceLeakageWaterfall';

interface ReverseCalculatorProps {
  lodges: AncarraigLodge[];
  channels: AncarraigChannel[];
}

export function ReverseCalculator({ lodges, channels }: ReverseCalculatorProps) {
  const [selectedLodge, setSelectedLodge] = useState<string>(lodges[0]?.id || '');
  const [selectedChannel, setSelectedChannel] = useState<string>(channels[0]?.id || '');
  const [targetNet, setTargetNet] = useState<number>(150);
  const [cleaningFee, setCleaningFee] = useState<number>(120);
  const [stayLength, setStayLength] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [includeMargin, setIncludeMargin] = useState<boolean>(false);
  const [marginPercent, setMarginPercent] = useState<number>(30);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<ReverseCalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetailedWorkings, setShowDetailedWorkings] = useState<boolean>(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    setError(null);

    try {
      const response = await fetch('/api/ancarraig/calculator/reverse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lodge_id: selectedLodge,
          channel_id: selectedChannel,
          target_net_per_night: targetNet,
          cleaning_fee: cleaningFee,
          stay_length: stayLength,
          start_date: startDate,
          include_margin: includeMargin,
          margin_percent: marginPercent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Calculation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Calculator error:', err);
      setError(err.message || 'Failed to calculate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const selectedChannelData = channels.find((c) => c.id === selectedChannel);

  return (
    <div className="space-y-6">
      {/* Calculator Input Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-md">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Reverse Rate Calculator</CardTitle>
              <CardDescription>
                Work backwards from target net income to determine listing price
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lodge & Channel Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Lodge</label>
              <select
                value={selectedLodge}
                onChange={(e) => setSelectedLodge(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {lodges.map((lodge) => (
                  <option key={lodge.id} value={lodge.id}>
                    {lodge.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Channel</label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {channels.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    {channel.channel_name} ({channel.base_commission_percent}%)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Net & Cleaning Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Target Net Per Night (£)
              </label>
              <Input
                type="number"
                value={targetNet}
                onChange={(e) => setTargetNet(parseFloat(e.target.value))}
                step="1"
                min="0"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                How much you want to net per night after all deductions
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Cleaning Fee (£)
              </label>
              <Input
                type="number"
                value={cleaningFee}
                onChange={(e) => setCleaningFee(parseFloat(e.target.value))}
                step="1"
                min="0"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total cleaning fee for entire stay
              </p>
            </div>
          </div>

          {/* Stay Length & Start Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Stay Length (nights)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 7, 14].map((nights) => (
                  <button
                    key={nights}
                    onClick={() => setStayLength(nights)}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                      stayLength === nights
                        ? 'bg-cyan-500 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {nights}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                1-night stays need higher rates due to cleaning costs
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used to apply seasonal multipliers
              </p>
            </div>
          </div>

          {/* Margin Toggle */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="include-margin"
              checked={includeMargin}
              onChange={(e) => setIncludeMargin(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <label htmlFor="include-margin" className="text-sm font-medium flex-1">
              Add profit margin on top of target net
            </label>
            {includeMargin && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(parseFloat(e.target.value))}
                  step="1"
                  min="0"
                  max="100"
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {isCalculating ? (
              'Calculating...'
            ) : (
              <>
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Listing Price
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Result Card - BIG PROMINENT OUTPUT */}
      {result && (
        <>
          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-xl">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide opacity-90 mb-2">
                    List at this price on {result.channelName}
                  </p>
                  <p className="text-6xl font-bold">
                    £{result.listingPricePerNight.toFixed(2)}
                  </p>
                  <p className="text-sm opacity-90 mt-2">per night</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-xs opacity-75">Target Net</p>
                    <p className="text-lg font-semibold">
                      £{result.targetNetPerNight.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Actual Net</p>
                    <p className="text-lg font-semibold">
                      £{result.netReceivedPerNight.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Accuracy</p>
                    <p className="text-lg font-semibold">
                      {result.isAccurate ? '✓ Accurate' : `±£${Math.abs(result.netVsTarget).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Summary Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Calculation Summary</CardTitle>
              <CardDescription>Key numbers at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Total Stay</p>
                  <p className="text-2xl font-bold">£{(result.listingPricePerNight * stayLength).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{stayLength} nights</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Channel Takes</p>
                  <p className="text-2xl font-bold text-red-600">
                    {result.effectiveCommissionPercent.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    £{((result.listingPricePerNight - result.netReceivedPerNight) * stayLength).toFixed(2)} total
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Your Net/Night</p>
                  <p className="text-2xl font-bold text-green-600">
                    £{(result.netReceivedPerNight - result.dailyCosts - result.cleaningFeePerNight).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">After all costs</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">vs Target</p>
                  <p className={`text-2xl font-bold ${result.isAccurate ? 'text-green-600' : 'text-orange-600'}`}>
                    {result.netVsTarget >= 0 ? '+' : ''}£{result.netVsTarget.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.isAccurate ? '✓ On target' : 'Close'}
                  </p>
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowDetailedWorkings(!showDetailedWorkings)}
                className="w-full mt-4 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {showDetailedWorkings ? (
                  <>
                    <span>Hide detailed workings</span>
                    <span>↑</span>
                  </>
                ) : (
                  <>
                    <span>Show detailed workings</span>
                    <span>↓</span>
                  </>
                )}
              </button>
            </CardContent>
          </Card>

          {/* Detailed Step-by-Step (Collapsible) */}
          {showDetailedWorkings && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Detailed Step-by-Step Calculation</CardTitle>
                <CardDescription>
                  Follow the math: how we got from your target net to the listing price
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Starting Point */}
              <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Starting Point: Your Target</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      You want to net <span className="font-medium text-foreground">£{targetNet.toFixed(2)}</span> per night after all costs and commissions.
                    </p>
                    <div className="text-lg font-mono font-bold text-primary">
                      Target Net = £{targetNet.toFixed(2)} /night
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Add Operating Costs */}
              {result.dailyCosts > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Add Daily Operating Costs</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your daily costs (utilities, maintenance, etc.) need to be covered on top of your target net.
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Target Net:</span>
                          <span className="font-mono">£{targetNet.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-orange-600">
                          <span>+ Daily Costs:</span>
                          <span className="font-mono">£{result.dailyCosts.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <div className="flex justify-between font-mono font-bold text-lg">
                          <span>Subtotal:</span>
                          <span>£{(targetNet + result.dailyCosts).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Add Cleaning Per Night */}
              {result.cleaningFeePerNight > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Add Cleaning Cost Per Night</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        £{cleaningFee.toFixed(2)} cleaning fee ÷ {stayLength} night(s) = £{result.cleaningFeePerNight.toFixed(2)} per night
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Previous Subtotal:</span>
                          <span className="font-mono">£{(targetNet + result.dailyCosts).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-blue-600">
                          <span>+ Cleaning per night:</span>
                          <span className="font-mono">£{result.cleaningFeePerNight.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <div className="flex justify-between font-mono font-bold text-lg">
                          <span>Subtotal:</span>
                          <span>£{(targetNet + result.dailyCosts + result.cleaningFeePerNight).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Apply Seasonal Adjustment */}
              {result.seasonalMultiplier !== 1 && (
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white text-xs font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Apply Seasonal Multiplier</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {result.seasonName} season has a {result.seasonalMultiplier}x multiplier
                        {result.seasonalMultiplier > 1 ? ' (high demand)' : ' (lower demand)'}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Previous Subtotal:</span>
                          <span className="font-mono">£{(targetNet + result.dailyCosts + result.cleaningFeePerNight).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-purple-600">
                          <span>× Seasonal Factor:</span>
                          <span className="font-mono">{result.seasonalMultiplier}</span>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <div className="flex justify-between font-mono font-bold text-lg">
                          <span>Subtotal:</span>
                          <span>£{((targetNet + result.dailyCosts + result.cleaningFeePerNight) * result.seasonalMultiplier).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Reverse Calculate Through Commission */}
              <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                    {result.seasonalMultiplier !== 1 ? '5' : '4'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Work Backwards Through {result.channelName} Commissions</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      We need to find the listing price that, after {result.channelName} takes their {result.effectiveCommissionPercent.toFixed(1)}% commission, leaves us with our target.
                    </p>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-2">Commission breakdown:</p>
                      <ul className="text-sm space-y-1">
                        {result.commissionBreakdown.baseCommission > 0 && (
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Base commission:</span>
                            <span className="font-mono text-red-600">-£{(result.commissionBreakdown.baseCommission / stayLength).toFixed(2)} /night</span>
                          </li>
                        )}
                        {result.commissionBreakdown.geniusDiscount > 0 && (
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Genius discount:</span>
                            <span className="font-mono text-red-600">-£{(result.commissionBreakdown.geniusDiscount / stayLength).toFixed(2)} /night</span>
                          </li>
                        )}
                        {result.commissionBreakdown.nonRefundableDiscount > 0 && (
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Non-refundable:</span>
                            <span className="font-mono text-red-600">-£{(result.commissionBreakdown.nonRefundableDiscount / stayLength).toFixed(2)} /night</span>
                          </li>
                        )}
                        {result.commissionBreakdown.cleaningCommission > 0 && (
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Cleaning commission:</span>
                            <span className="font-mono text-red-600">-£{(result.commissionBreakdown.cleaningCommission / stayLength).toFixed(2)} /night</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="mt-3 p-2 bg-red-500/10 rounded border border-red-500/20">
                      <div className="flex justify-between font-mono font-bold text-lg">
                        <span>Base Listing Price:</span>
                        <span>£{(result.listingPricePerNight / (1 + result.stayLengthUplift / 100)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6: Stay Length Uplift */}
              {result.stayLengthUplift > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-cyan-500">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white text-xs font-bold">
                      {result.seasonalMultiplier !== 1 ? '6' : '5'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Apply Stay Length Uplift</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {stayLength === 1 && 'Short 1-night stays need a premium because cleaning costs hit harder.'}
                        {stayLength === 2 && 'Short 2-night stays need a moderate premium.'}
                        {stayLength === 3 && 'Typical 3-night stays need a small premium.'}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Base Listing Price:</span>
                          <span className="font-mono">£{(result.listingPricePerNight / (1 + result.stayLengthUplift / 100)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-cyan-600">
                          <span>+ {result.stayLengthUplift}% uplift:</span>
                          <span className="font-mono">£{result.stayLengthUpliftAmount.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <div className="flex justify-between font-mono font-bold text-lg text-cyan-600">
                          <span>Final Listing Price:</span>
                          <span>£{result.listingPricePerNight.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Validation: Forward Check */}
              <div className="p-4 bg-green-500/10 rounded-lg border-2 border-green-500/30">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  {result.isAccurate ? '✓' : '⚠️'} Validation: Forward Check
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Let's verify by calculating forward from the listing price:
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Guest pays (listing price):</span>
                    <span className="font-mono">£{result.listingPricePerNight.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>− Channel takes {result.effectiveCommissionPercent.toFixed(1)}%:</span>
                    <span className="font-mono">-£{(result.listingPricePerNight - result.netReceivedPerNight).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border my-1" />
                  <div className="flex justify-between font-medium">
                    <span>You receive per night:</span>
                    <span className="font-mono">£{result.netReceivedPerNight.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-orange-600">
                    <span>− Operating costs:</span>
                    <span className="font-mono">-£{result.dailyCosts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-blue-600">
                    <span>− Cleaning per night:</span>
                    <span className="font-mono">-£{result.cleaningFeePerNight.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Your net profit:</span>
                    <span className="font-mono text-green-600">£{(result.netReceivedPerNight - result.dailyCosts - result.cleaningFeePerNight).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2 pt-2 border-t">
                    <span>Target was:</span>
                    <span className="font-mono">£{targetNet.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Difference:</span>
                    <span className={`font-mono ${result.isAccurate ? 'text-green-600' : 'text-orange-600'}`}>
                      {result.netVsTarget >= 0 ? '+' : ''}£{result.netVsTarget.toFixed(2)}
                      {result.isAccurate && ' ✓ Within £1'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          )}

          {/* Price Leakage Waterfall */}
          <PriceLeakageWaterfall
            waterfallSteps={result.waterfallSteps}
            channelName={result.channelName}
          />
        </>
      )}
    </div>
  );
}
