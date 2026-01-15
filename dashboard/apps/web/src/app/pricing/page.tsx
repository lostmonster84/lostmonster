import { DashboardLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@lostmonster/ui';
import { Plus, FileText, Send, Check, X } from 'lucide-react';

export default function PricingPage() {
  // Mock data for now
  const quotes = [
    {
      id: '1',
      number: 'Q-2024-001',
      client: 'Acme Corp',
      total: 15000,
      status: 'sent',
      date: '2024-01-10',
    },
    {
      id: '2',
      number: 'Q-2024-002',
      client: 'Tech Startup Ltd',
      total: 8500,
      status: 'accepted',
      date: '2024-01-08',
    },
    {
      id: '3',
      number: 'Q-2024-003',
      client: 'Local Business',
      total: 3200,
      status: 'draft',
      date: '2024-01-12',
    },
    {
      id: '4',
      number: 'Q-2024-004',
      client: 'Enterprise Inc',
      total: 45000,
      status: 'declined',
      date: '2024-01-05',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'sent':
        return <Badge variant="outline">Sent</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />;
      case 'sent':
        return <Send className="h-4 w-4" />;
      case 'accepted':
        return <Check className="h-4 w-4" />;
      case 'declined':
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title="Pricing Calculator"
      description="Create and manage project quotes"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button variant="secondary">All Quotes</Button>
          <Button variant="ghost">Sent</Button>
          <Button variant="ghost">Accepted</Button>
          <Button variant="ghost">Draft</Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between p-4 hover:bg-card transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    {getStatusIcon(quote.status)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{quote.number}</span>
                      {getStatusBadge(quote.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{quote.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    £{quote.total.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">{quote.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
