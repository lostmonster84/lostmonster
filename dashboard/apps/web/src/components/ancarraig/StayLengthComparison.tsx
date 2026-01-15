'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@lostmonster/ui';
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { AncarraigChannel, AncarraigLodge } from '@lostmonster/database';
import { StayLengthComparison as StayLengthComparisonType } from '@/lib/ancarraig/stay-length-comparison';

interface StayLengthComparisonProps {
  lodges: AncarraigLodge[];
  channels: AncarraigChannel[];
}

interface ComparisonResult {
  comparison: StayLengthComparisonType[];
  upliftRecommendation: {
    recommendedUplift: number;
    explanation: string;
  };
  channelName: string;
}

export function StayLengthComparison({ lodges, channels }: StayLengthComparisonProps) {
  const [selectedLodge, setSelectedLodge] = useState<string>(lodges[0]?.id || '');
  const [selectedChannel, setSelectedChannel] = useState<string>(channels[0]?.id || '');
  const [listingPrice, setListingPrice] = useState<number>(200);
  const [cleaningFee, setCleaningFee] = useState<number>(120);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setIsCalculating(true);
    setError(null);

    try {
      const response = await fetch('/api/ancarraig/calculator/stay-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lodge_id: selectedLodge,
          channel_id: selectedChannel,
          listing_price_per_night: listingPrice,
          cleaning_fee: cleaningFee,
          date,
          stay_lengths: [1, 2, 3, 7, 14],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Comparison failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Comparison error:', err);
      setError(err.message || 'Failed to compare stay lengths. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <TrendingDown className="h-5 w-5 text-orange-500" />;
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <TrendingUp className="h-5 w-5 text-cyan-500" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/20';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/20';
      case 'excellent':
        return 'bg-green-500/10 border-green-500/20';
      default:
        return 'bg-cyan-500/10 border-cyan-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Stay Length Profitability Comparison</CardTitle>
          <CardDescription>
            See how cleaning costs impact profitability across different stay lengths
          </CardDescription>
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

          {/* Pricing Inputs */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Listing Price Per Night (£)
              </label>
              <Input
                type="number"
                value={listingPrice}
                onChange={(e) => setListingPrice(parseFloat(e.target.value))}
                step="1"
                min="0"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Cleaning Fee (£)</label>
              <Input
                type="number"
                value={cleaningFee}
                onChange={(e) => setCleaningFee(parseFloat(e.target.value))}
                step="1"
                min="0"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Compare Button */}
          <Button
            onClick={handleCompare}
            disabled={isCalculating}
            className="w-full"
            size="lg"
          >
            {isCalculating ? 'Calculating...' : 'Compare Stay Lengths'}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Table */}
      {result && (
        <>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Profitability by Stay Length</CardTitle>
              <CardDescription>
                Comparing {result.comparison.length} stay lengths on {result.channelName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Stay Length</th>
                      <th className="text-right py-3 px-4 font-medium">Guest Pays</th>
                      <th className="text-right py-3 px-4 font-medium">Cleaning/Night</th>
                      <th className="text-right py-3 px-4 font-medium">Commission/Night</th>
                      <th className="text-right py-3 px-4 font-medium">Net/Night</th>
                      <th className="text-right py-3 px-4 font-medium">Costs/Night</th>
                      <th className="text-right py-3 px-4 font-medium">Profit/Night</th>
                      <th className="text-right py-3 px-4 font-medium">Margin</th>
                      <th className="text-center py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.comparison.map((row) => (
                      <tr
                        key={row.stayLength}
                        className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${getRiskColor(row.riskLevel)}`}
                      >
                        <td className="py-3 px-4 font-medium">
                          {row.stayLength} night{row.stayLength !== 1 ? 's' : ''}
                        </td>
                        <td className="py-3 px-4 text-right">
                          £{row.listingPricePerNight.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right text-orange-600 dark:text-orange-400">
                          £{row.cleaningFeePerNight.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right text-red-600 dark:text-red-400">
                          -£{row.channelCommissionPerNight.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          £{row.netReceivedPerNight.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">
                          £{row.totalCostsPerNight.toFixed(2)}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-bold ${
                            row.profitPerNight >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          £{row.profitPerNight.toFixed(2)}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-medium ${
                            row.marginPercent >= 30
                              ? 'text-green-600 dark:text-green-400'
                              : row.marginPercent >= 15
                                ? 'text-cyan-600 dark:text-cyan-400'
                                : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {row.marginPercent.toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          {getRiskIcon(row.riskLevel)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Key Insights */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-cyan-500 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">
                      Cleaning Cost Impact
                    </p>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400">
                      1-night: £{result.comparison[0]?.cleaningFeePerNight.toFixed(2)}/night •
                      3-night: £{result.comparison[2]?.cleaningFeePerNight.toFixed(2)}/night •
                      7-night: £{result.comparison[3]?.cleaningFeePerNight.toFixed(2)}/night
                    </p>
                  </div>
                </div>

                {result.comparison[0] && result.comparison[0].riskLevel === 'critical' && (
                  <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-red-700 dark:text-red-400">
                        1-Night Stays are Unprofitable
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        You're losing £{Math.abs(result.comparison[0].profitPerNight).toFixed(2)} per night on 1-night stays.
                        Consider increasing price or implementing minimum stay requirements.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 1-Night Uplift Recommendation */}
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Recommended 1-Night Uplift</h3>
                  <p className="text-3xl font-bold">
                    +{result.upliftRecommendation.recommendedUplift.toFixed(0)}%
                  </p>
                  <p className="text-sm opacity-90">
                    {result.upliftRecommendation.explanation}
                  </p>
                  <div className="pt-2 border-t border-white/20">
                    <p className="text-sm opacity-90">
                      <strong>New 1-night price:</strong> £
                      {(listingPrice * (1 + result.upliftRecommendation.recommendedUplift / 100)).toFixed(2)} per night
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
