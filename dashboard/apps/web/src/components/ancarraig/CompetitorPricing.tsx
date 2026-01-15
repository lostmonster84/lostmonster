'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@lostmonster/ui';
import { Plus, Edit2, Trash2, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { AncarraigCompetitor, AncarraigCompetitorRate } from '@lostmonster/database';
import { format, parseISO } from 'date-fns';

interface CompetitorPricingProps {
  initialCompetitors: AncarraigCompetitor[];
}

interface CompetitorWithRates extends AncarraigCompetitor {
  latestRate?: AncarraigCompetitorRate;
}

export function CompetitorPricing({ initialCompetitors }: CompetitorPricingProps) {
  const [competitors, setCompetitors] = useState<CompetitorWithRates[]>(initialCompetitors);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRateForm, setShowRateForm] = useState<string | null>(null);
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    type: 'direct',
    location: '',
    capacity_guests: '',
    distance_km: '',
    booking_url: '',
    airbnb_url: '',
    direct_url: '',
    notes: '',
  });
  const [newRate, setNewRate] = useState({
    date: new Date().toISOString().split('T')[0],
    nightly_rate: '',
    weekly_rate: '',
    available: true,
    source: 'manual',
  });

  const handleAddCompetitor = async () => {
    try {
      const response = await fetch('/api/ancarraig/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCompetitor,
          capacity_guests: newCompetitor.capacity_guests ? parseInt(newCompetitor.capacity_guests) : null,
          distance_km: newCompetitor.distance_km ? parseFloat(newCompetitor.distance_km) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to add competitor');

      const competitor = await response.json();
      setCompetitors([...competitors, competitor]);
      setShowAddForm(false);
      setNewCompetitor({
        name: '',
        type: 'direct',
        location: '',
        capacity_guests: '',
        distance_km: '',
        booking_url: '',
        airbnb_url: '',
        direct_url: '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to add competitor:', error);
      alert('Failed to add competitor. Please try again.');
    }
  };

  const handleDeleteCompetitor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competitor?')) return;

    try {
      const response = await fetch(`/api/ancarraig/competitors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete competitor');

      setCompetitors(competitors.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Failed to delete competitor:', error);
      alert('Failed to delete competitor. Please try again.');
    }
  };

  const handleAddRate = async (competitorId: string) => {
    try {
      const response = await fetch(`/api/ancarraig/competitors/${competitorId}/rates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRate,
          nightly_rate: newRate.nightly_rate ? parseFloat(newRate.nightly_rate) : null,
          weekly_rate: newRate.weekly_rate ? parseFloat(newRate.weekly_rate) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to add rate');

      const rate = await response.json();

      // Update competitor with latest rate
      setCompetitors(
        competitors.map((c) =>
          c.id === competitorId ? { ...c, latestRate: rate } : c
        )
      );

      setShowRateForm(null);
      setNewRate({
        date: new Date().toISOString().split('T')[0],
        nightly_rate: '',
        weekly_rate: '',
        available: true,
        source: 'manual',
      });
    } catch (error) {
      console.error('Failed to add rate:', error);
      alert('Failed to add rate. Please try again.');
    }
  };

  // Fetch latest rates for all competitors on mount
  useState(() => {
    const fetchRates = async () => {
      const updatedCompetitors = await Promise.all(
        competitors.map(async (competitor) => {
          try {
            const response = await fetch(`/api/ancarraig/competitors/${competitor.id}/rates`);
            if (response.ok) {
              const rates = await response.json();
              return { ...competitor, latestRate: rates[0] };
            }
          } catch (error) {
            console.error(`Failed to fetch rates for ${competitor.name}:`, error);
          }
          return competitor;
        })
      );
      setCompetitors(updatedCompetitors);
    };

    if (competitors.length > 0) {
      fetchRates();
    }
  });

  const getCompetitorTypeColor = (type: string | null) => {
    switch (type) {
      case 'direct':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'aspirational':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'market':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Competitor Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Competitor Tracking</h2>
          <p className="text-sm text-muted-foreground">
            Monitor competitor rates to optimize your pricing strategy
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Add Competitor Form */}
      {showAddForm && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Add New Competitor</CardTitle>
            <CardDescription>Track pricing from similar properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name *</label>
                <Input
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                  placeholder="e.g., Highland Lodge"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  value={newCompetitor.type}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, type: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="direct">Direct Competitor</option>
                  <option value="aspirational">Aspirational</option>
                  <option value="market">Market Benchmark</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  value={newCompetitor.location}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, location: e.target.value })}
                  placeholder="e.g., Cairngorms"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Guests</label>
                <Input
                  type="number"
                  value={newCompetitor.capacity_guests}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, capacity_guests: e.target.value })}
                  placeholder="e.g., 6"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Distance (km)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={newCompetitor.distance_km}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, distance_km: e.target.value })}
                  placeholder="e.g., 2.5"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Booking.com URL</label>
                <Input
                  value={newCompetitor.booking_url}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, booking_url: e.target.value })}
                  placeholder="https://www.booking.com/..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Airbnb URL</label>
                <Input
                  value={newCompetitor.airbnb_url}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, airbnb_url: e.target.value })}
                  placeholder="https://www.airbnb.com/..."
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddCompetitor}>Add Competitor</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitors List */}
      {competitors.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            No competitors tracked yet. Add your first competitor to start monitoring rates.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {competitors.map((competitor) => (
            <Card key={competitor.id} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{competitor.name}</h3>
                      {competitor.type && (
                        <span className={`text-xs px-2 py-1 rounded-full ${getCompetitorTypeColor(competitor.type)}`}>
                          {competitor.type}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      {competitor.location && <span>📍 {competitor.location}</span>}
                      {competitor.capacity_guests && <span>👥 {competitor.capacity_guests} guests</span>}
                      {competitor.distance_km && <span>📏 {competitor.distance_km} km away</span>}
                    </div>

                    {/* Latest Rate */}
                    {competitor.latestRate ? (
                      <div className="flex items-center gap-6 p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground">Latest Rate</p>
                          <p className="text-2xl font-bold text-foreground">
                            £{competitor.latestRate.nightly_rate?.toFixed(2) || 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(parseISO(competitor.latestRate.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        {competitor.latestRate.available !== null && (
                          <div>
                            <p className="text-xs text-muted-foreground">Availability</p>
                            <p className={`text-sm font-medium ${competitor.latestRate.available ? 'text-green-600' : 'text-red-600'}`}>
                              {competitor.latestRate.available ? 'Available' : 'Booked'}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                        No rates tracked yet. Add a rate to start monitoring.
                      </div>
                    )}

                    {/* Add Rate Form */}
                    {showRateForm === competitor.id && (
                      <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
                        <h4 className="font-medium text-sm">Add New Rate</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-medium mb-1 block">Date</label>
                            <Input
                              type="date"
                              value={newRate.date}
                              onChange={(e) => setNewRate({ ...newRate, date: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Nightly Rate (£)</label>
                            <Input
                              type="number"
                              step="0.01"
                              value={newRate.nightly_rate}
                              onChange={(e) => setNewRate({ ...newRate, nightly_rate: e.target.value })}
                              placeholder="200.00"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Available</label>
                            <select
                              value={newRate.available ? 'true' : 'false'}
                              onChange={(e) => setNewRate({ ...newRate, available: e.target.value === 'true' })}
                              className="w-full px-2 py-1 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAddRate(competitor.id)}>
                            Save Rate
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setShowRateForm(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* URLs */}
                    <div className="mt-4 flex gap-3">
                      {competitor.booking_url && (
                        <a
                          href={competitor.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          Booking.com <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {competitor.airbnb_url && (
                        <a
                          href={competitor.airbnb_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          Airbnb <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {showRateForm !== competitor.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowRateForm(competitor.id)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Rate
                      </Button>
                    )}
                    <button
                      onClick={() => handleDeleteCompetitor(competitor.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Comparison Summary */}
      {competitors.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{competitors.length}</p>
                <p className="text-sm text-muted-foreground">Competitors Tracked</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  £
                  {competitors
                    .filter((c) => c.latestRate?.nightly_rate)
                    .length > 0
                    ? (
                        competitors
                          .filter((c) => c.latestRate?.nightly_rate)
                          .reduce((sum, c) => sum + (c.latestRate?.nightly_rate || 0), 0) /
                        competitors.filter((c) => c.latestRate?.nightly_rate).length
                      ).toFixed(2)
                    : '0.00'}
                </p>
                <p className="text-sm text-muted-foreground">Average Rate</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {competitors.filter((c) => c.latestRate).length}
                </p>
                <p className="text-sm text-muted-foreground">With Recent Rates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
