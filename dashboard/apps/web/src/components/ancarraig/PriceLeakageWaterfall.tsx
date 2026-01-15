'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lostmonster/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { WaterfallStep } from '@/lib/ancarraig/reverse-calculator';

interface PriceLeakageWaterfallProps {
  waterfallSteps: WaterfallStep[];
  channelName: string;
}

/**
 * Price Leakage Waterfall Visualization
 *
 * Shows the money flow from guest payment to final net profit.
 * Critical for building trust in the calculator - users can see exactly where money goes.
 *
 * Example:
 * Guest Pays: £220 (green)
 * → -£33 Base Commission (red)
 * → -£18.70 Genius (red)
 * → -£16.83 Non-refundable (red)
 * → -£40 Cleaning (red)
 * → -£60 Daily costs (red)
 * = £51.47 You Net (green if positive, red if negative)
 */
export function PriceLeakageWaterfall({
  waterfallSteps,
  channelName,
}: PriceLeakageWaterfallProps) {
  // Transform waterfall steps into chart data
  const chartData = waterfallSteps.map((step, index) => {
    const isFirst = index === 0;
    const isLast = index === waterfallSteps.length - 1;

    // For waterfall effect, we need to calculate the "base" (where bar starts)
    // and the "value" (height of bar)
    let base = 0;
    let value = step.value;

    if (!isFirst && !isLast) {
      // Middle steps (deductions): start from previous running total
      base = waterfallSteps[index + 1].runningTotal;
      value = step.value; // Deduction amount
    } else if (isLast) {
      // Final net: show from 0 to final value
      base = 0;
      value = step.runningTotal;
    }

    return {
      label: step.label,
      value: step.value,
      runningTotal: step.runningTotal,
      base,
      isDeduction: step.isDeduction,
      isFirst,
      isLast,
      // Color: green for gains, red for deductions
      color: step.isDeduction
        ? '#ef4444' // red-500 for deductions
        : step.runningTotal < 0
          ? '#ef4444' // red-500 for negative net
          : '#22c55e', // green-500 for positive values
    };
  });

  const maxValue = Math.max(...waterfallSteps.map((s) => s.runningTotal)) * 1.1;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Price Leakage Breakdown</CardTitle>
        <CardDescription>
          Where your money goes: from {channelName} guest payment to final net profit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 40, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
              <XAxis
                dataKey="label"
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, maxValue]}
                tickFormatter={(value) => `£${Math.round(value)}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border shadow-lg rounded-lg p-3">
                      <p className="font-medium text-sm mb-1">{data.label}</p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">
                          {data.isDeduction ? 'Deduction: ' : 'Amount: '}
                        </span>
                        <span className={data.isDeduction ? 'text-red-500' : 'text-green-500'}>
                          {data.isDeduction ? '-' : ''}£{data.value.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Running Total: </span>
                        <span className="font-medium">£{data.runningTotal.toFixed(2)}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="runningTotal" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="runningTotal"
                  position="top"
                  formatter={(value: number) => `£${value.toFixed(2)}`}
                  style={{ fill: '#1f2937', fontSize: 12, fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Guest Pays</p>
            <p className="text-lg font-bold text-foreground">
              £{waterfallSteps[0]?.value.toFixed(2) || '0.00'}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Total Deductions</p>
            <p className="text-lg font-bold text-red-500">
              -£
              {waterfallSteps
                .filter((s) => s.isDeduction)
                .reduce((sum, s) => sum + s.value, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">You Net</p>
            <p
              className={`text-lg font-bold ${
                waterfallSteps[waterfallSteps.length - 1]?.runningTotal >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              £{waterfallSteps[waterfallSteps.length - 1]?.runningTotal.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>

        {/* Insight Message */}
        {waterfallSteps.length > 0 && (
          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-400">
              <strong>Insight:</strong>{' '}
              {waterfallSteps[waterfallSteps.length - 1]?.runningTotal >= 0
                ? `You're netting £${waterfallSteps[waterfallSteps.length - 1]?.runningTotal.toFixed(2)} per night after all deductions. This is profitable!`
                : `Warning: You're losing £${Math.abs(waterfallSteps[waterfallSteps.length - 1]?.runningTotal).toFixed(2)} per night at this price. Consider increasing your listing price.`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
