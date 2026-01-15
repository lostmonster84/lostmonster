import { DashboardLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@lostmonster/ui';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

export default function InvestmentsPage() {
  // Mock data for now
  const portfolioStats = {
    totalValue: 245890,
    totalGain: 32450,
    totalGainPercent: 15.2,
  };

  const investments = [
    {
      id: '1',
      name: 'Vanguard S&P 500',
      ticker: 'VUSA',
      type: 'etf',
      quantity: 150,
      avgCost: 65.20,
      currentPrice: 72.50,
      value: 10875,
      gain: 1095,
      gainPercent: 11.2,
    },
    {
      id: '2',
      name: 'Apple Inc',
      ticker: 'AAPL',
      type: 'stock',
      quantity: 25,
      avgCost: 142.50,
      currentPrice: 185.20,
      value: 4630,
      gain: 1067.50,
      gainPercent: 30.0,
    },
    {
      id: '3',
      name: 'Bitcoin',
      ticker: 'BTC',
      type: 'crypto',
      quantity: 0.5,
      avgCost: 35000,
      currentPrice: 42000,
      value: 21000,
      gain: 3500,
      gainPercent: 20.0,
    },
    {
      id: '4',
      name: 'UK Property Fund',
      ticker: 'UKPF',
      type: 'property',
      quantity: 500,
      avgCost: 120,
      currentPrice: 115,
      value: 57500,
      gain: -2500,
      gainPercent: -4.2,
    },
  ];

  const getTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      stock: 'default',
      etf: 'secondary',
      crypto: 'outline',
      property: 'secondary',
    };
    return (
      <Badge variant={variants[type] || 'secondary'}>
        {type.toUpperCase()}
      </Badge>
    );
  };

  return (
    <DashboardLayout
      title="Investment Tracker"
      description="Monitor your portfolio performance"
    >
      {/* Portfolio Summary */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              £{portfolioStats.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gain/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-green-500">
                +£{portfolioStats.totalGain.toLocaleString()}
              </span>
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Return Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              +{portfolioStats.totalGainPercent}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button variant="secondary">All Holdings</Button>
          <Button variant="ghost">Stocks</Button>
          <Button variant="ghost">ETFs</Button>
          <Button variant="ghost">Crypto</Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </div>

      {/* Holdings List */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {investments.map((investment) => (
              <div
                key={investment.id}
                className="flex items-center justify-between p-4 hover:bg-card transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 font-bold text-sm">
                    {investment.ticker.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{investment.name}</span>
                      {getTypeBadge(investment.type)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {investment.quantity} @ £{investment.avgCost.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    £{investment.value.toLocaleString()}
                  </div>
                  <div
                    className={`flex items-center justify-end gap-1 text-sm ${
                      investment.gain >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {investment.gain >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {investment.gain >= 0 ? '+' : ''}
                    {investment.gainPercent.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
