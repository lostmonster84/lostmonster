'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@lostmonster/ui';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { AncarraigLodge } from '@lostmonster/database';
import { CashFlowProjection } from '@/lib/ancarraig/cash-flow-planner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';

interface CashFlowPlannerProps {
  lodges: AncarraigLodge[];
}

export function CashFlowPlanner({ lodges }: CashFlowPlannerProps) {
  const [selectedLodge, setSelectedLodge] = useState<string>(lodges[0]?.id || '');
  const [annualRevenue, setAnnualRevenue] = useState<number>(400000);
  const [targetDrawings, setTargetDrawings] = useState<number>(100000);
  const [occupancy, setOccupancy] = useState({
    q1: 35,
    q2: 55,
    q3: 70,
    q4: 40,
  });
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [projection, setProjection] = useState<CashFlowProjection | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Chart colors from CSS variables (theme-aware)
  const colors = {
    revenue: 'hsl(var(--chart-revenue))',
    loss: 'hsl(var(--chart-loss))',
    profit: 'hsl(var(--chart-profit))',
    drawing: 'hsl(var(--chart-drawing))',
    grid: 'hsl(var(--chart-grid))',
    text: 'hsl(var(--chart-text))',
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setError(null);

    try {
      const response = await fetch('/api/ancarraig/cashflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lodge_id: selectedLodge,
          annual_revenue_target: annualRevenue,
          target_drawings: targetDrawings,
          quarterly_occupancy: {
            q1: occupancy.q1 / 100,
            q2: occupancy.q2 / 100,
            q3: occupancy.q3 / 100,
            q4: occupancy.q4 / 100,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Calculation failed');
      }

      const data = await response.json();
      setProjection(data);
    } catch (err: any) {
      console.error('Cash flow error:', err);
      setError(err.message || 'Failed to calculate projection. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  // Chart data
  const chartData = projection?.quarterlyProjections.map((q) => ({
    quarter: q.label,
    revenue: q.projectedRevenue,
    costs: q.projectedCosts,
    profit: q.projectedProfit,
    drawings: projection.drawingsRecommendations.find((d) => d.quarter === q.quarter)?.recommendedDrawing || 0,
  }));

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-md">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Cash Flow Planner</CardTitle>
              <CardDescription>
                Project annual income and determine if target drawings are achievable
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lodge Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Lodge</label>
            <select
              value={selectedLodge}
              onChange={(e) => setSelectedLodge(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {lodges.map((lodge) => (
                <option key={lodge.id} value={lodge.id}>
                  {lodge.name}
                </option>
              ))}
            </select>
          </div>

          {/* Financial Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Annual Revenue Target (£)
              </label>
              <Input
                type="number"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(parseFloat(e.target.value))}
                step="1000"
                min="0"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Expected total revenue for the year
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Target Drawings (£)
              </label>
              <Input
                type="number"
                value={targetDrawings}
                onChange={(e) => setTargetDrawings(parseFloat(e.target.value))}
                step="1000"
                min="0"
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                How much you want to withdraw annually
              </p>
            </div>
          </div>

          {/* Quarterly Occupancy */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Estimated Quarterly Occupancy (%)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'q1', label: 'Q1 (Jan-Mar)' },
                { key: 'q2', label: 'Q2 (Apr-Jun)' },
                { key: 'q3', label: 'Q3 (Jul-Sep)' },
                { key: 'q4', label: 'Q4 (Oct-Dec)' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-xs font-medium mb-1 block">{label}</label>
                  <Input
                    type="number"
                    value={occupancy[key as keyof typeof occupancy]}
                    onChange={(e) =>
                      setOccupancy({ ...occupancy, [key]: parseFloat(e.target.value) })
                    }
                    step="1"
                    min="0"
                    max="100"
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
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
                <TrendingUp className="h-5 w-5 mr-2" />
                Calculate Projection
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

      {/* Results */}
      {projection && (
        <>
          {/* Feasibility Card */}
          <Card
            className={`${
              projection.isDrawingsFeasible
                ? 'bg-gradient-to-br from-green-500 to-green-600'
                : 'bg-gradient-to-br from-red-500 to-red-600'
            } text-white shadow-xl`}
          >
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    {projection.isDrawingsFeasible ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide opacity-90 mb-2">
                    Drawings Feasibility
                  </p>
                  <p className="text-5xl font-bold">
                    {projection.isDrawingsFeasible ? 'ACHIEVABLE' : 'NOT FEASIBLE'}
                  </p>
                  <p className="text-lg opacity-90 mt-2">
                    £{projection.availableForDrawings.toLocaleString()} available after costs
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-xs opacity-75">Revenue Target</p>
                    <p className="text-lg font-semibold">
                      £{projection.annualRevenueTarget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Annual Costs</p>
                    <p className="text-lg font-semibold">
                      £{projection.annualCosts.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Annual Profit</p>
                    <p className="text-lg font-semibold">
                      £{projection.annualProfit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          {projection.warnings.length > 0 && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                  <div className="space-y-2">
                    <p className="font-medium text-orange-700 dark:text-orange-400">Warnings</p>
                    <ul className="space-y-1">
                      {projection.warnings.map((warning, i) => (
                        <li key={i} className="text-sm text-orange-600 dark:text-orange-400">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quarterly Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Quarterly Projection</CardTitle>
              <CardDescription>Revenue, costs, profit, and recommended drawings by quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} opacity={0.3} />
                    <XAxis
                      dataKey="quarter"
                      tick={{ fill: colors.text, fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: colors.text, fontSize: 12 }}
                      tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value: any) => `£${Number(value).toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill={colors.revenue} name="Revenue" />
                    <Bar dataKey="costs" fill={colors.loss} name="Costs" />
                    <Bar dataKey="profit" fill={colors.profit} name="Profit" />
                    <Line
                      type="monotone"
                      dataKey="drawings"
                      stroke={colors.drawing}
                      strokeWidth={3}
                      name="Recommended Drawings"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Drawings Schedule */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Recommended Drawings Schedule</CardTitle>
              <CardDescription>Timing drawings to match seasonal cash flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projection.drawingsRecommendations.map((rec) => (
                  <div
                    key={rec.quarter}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                        <Calendar className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{rec.label}</h4>
                        <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">
                        £{rec.recommendedDrawing.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((rec.recommendedDrawing / projection.targetDrawings) * 100).toFixed(0)}% of total
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Verification */}
              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                <span className="font-medium">Total Recommended Drawings</span>
                <span className="text-2xl font-bold">
                  £
                  {projection.drawingsRecommendations
                    .reduce((sum, rec) => sum + rec.recommendedDrawing, 0)
                    .toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
