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

          {/* Breakdown Details */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Calculation Breakdown</CardTitle>
              <CardDescription>How we arrived at this listing price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Daily Costs</span>
                    <span className="font-medium">£{result.dailyCosts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cleaning (per night)</span>
                    <span className="font-medium">£{result.cleaningFeePerNight.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Stay Length</span>
                    <span className="font-medium">{result.stayLength} night(s)</span>
                  </div>
                  {result.seasonalMultiplier !== 1 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Seasonal Multiplier ({result.seasonName})
                      </span>
                      <span className="font-medium">{result.seasonalMultiplier}x</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Channel Commission</span>
                    <span className="font-medium text-red-500">
                      {result.effectiveCommissionPercent.toFixed(1)}%
                    </span>
                  </div>
                  {result.stayLengthUplift > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Stay Length Uplift ({result.stayLengthUplift}%)
                      </span>
                      <span className="font-medium text-cyan-500">
                        +£{result.stayLengthUpliftAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

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
