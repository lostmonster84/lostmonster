'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@lostmonster/ui';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { AncarraigSeason, AncarraigLodge } from '@lostmonster/database';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isWithinInterval, parseISO } from 'date-fns';

interface SeasonalCalendarProps {
  initialLodges: AncarraigLodge[];
  initialSeasons: AncarraigSeason[];
}

export function SeasonalCalendar({ initialLodges, initialSeasons }: SeasonalCalendarProps) {
  const [lodges] = useState(initialLodges);
  const [seasons, setSeasons] = useState(initialSeasons);
  const [selectedLodge, setSelectedLodge] = useState<string>(lodges[0]?.id || '');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Filter seasons for selected lodge
  const lodgeSeasons = seasons.filter(s => s.lodge_id === selectedLodge);

  // Get color for multiplier
  const getMultiplierColor = (multiplier: number): string => {
    if (multiplier >= 1.5) return 'bg-red-500 text-white'; // Peak (>150%)
    if (multiplier >= 1.2) return 'bg-orange-500 text-white'; // High (120-149%)
    if (multiplier >= 1.0) return 'bg-purple-500 text-white'; // Standard (100-119%)
    if (multiplier >= 0.8) return 'bg-green-500 text-white'; // Low (80-99%)
    return 'bg-gray-500 text-white'; // Off-peak (<80%)
  };

  // Get multiplier for a specific date
  const getMultiplierForDate = (date: Date): { multiplier: number; name: string | null } => {
    let maxMultiplier = 1.0;
    let matchedName: string | null = null;

    for (const season of lodgeSeasons) {
      if (!season.is_active) continue;

      const startDate = parseISO(season.start_date);
      const endDate = parseISO(season.end_date);

      if (isWithinInterval(date, { start: startDate, end: endDate })) {
        const multiplier = Number(season.multiplier);
        if (multiplier > maxMultiplier) {
          maxMultiplier = multiplier;
          matchedName = season.name;
        }
      }
    }

    return { multiplier: maxMultiplier, name: matchedName };
  };

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigate months
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Lodge Selector */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Seasonal Multipliers</CardTitle>
          <CardDescription>View and manage peak/off-peak pricing periods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Lodge</label>
              <select
                value={selectedLodge}
                onChange={(e) => setSelectedLodge(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {lodges.map((lodge) => (
                  <option key={lodge.id} value={lodge.id}>
                    {lodge.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                onClick={() => setViewMode('calendar')}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={previousMonth}>
                  ← Previous
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  Next →
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {days.map((day) => {
                const { multiplier, name } = getMultiplierForDate(day);
                const color = getMultiplierColor(multiplier);
                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                return (
                  <div
                    key={day.toISOString()}
                    className={`
                      relative aspect-square rounded-lg p-2 text-center cursor-pointer
                      transition-all duration-200 hover:scale-105 hover:shadow-md
                      ${color}
                      ${isToday ? 'ring-2 ring-yellow-400' : ''}
                      ${!isSameMonth(day, currentMonth) ? 'opacity-30' : ''}
                    `}
                    title={name || 'Standard pricing'}
                  >
                    <div className="text-xs font-medium">{format(day, 'd')}</div>
                    <div className="text-xs font-bold mt-1">{multiplier}x</div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm font-medium mb-3">Multiplier Legend</p>
              <div className="grid grid-cols-5 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-500"></div>
                  <span className="text-xs text-muted-foreground">&lt;80% Off-peak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">80-99% Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-500"></div>
                  <span className="text-xs text-muted-foreground">100-119% Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500"></div>
                  <span className="text-xs text-muted-foreground">120-149% High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-xs text-muted-foreground">≥150% Peak</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Seasonal Periods</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Season
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {lodgeSeasons.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No seasonal periods configured. Click "Add Season" to create one.
              </div>
            ) : (
              <div className="space-y-3">
                {lodgeSeasons.map((season) => (
                  <div
                    key={season.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getMultiplierColor(Number(season.multiplier))}`}></div>
                        <div>
                          <h4 className="font-medium">{season.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(season.start_date), 'MMM d, yyyy')} -{' '}
                            {format(parseISO(season.end_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{season.multiplier}x</p>
                        <p className="text-xs text-muted-foreground">Multiplier</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-purple-600 hover:text-purple-700"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{lodgeSeasons.length}</p>
            <p className="text-sm text-muted-foreground">Seasonal Periods</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {lodgeSeasons.length > 0
                ? Math.max(...lodgeSeasons.map((s) => Number(s.multiplier))).toFixed(2)
                : '1.00'}x
            </p>
            <p className="text-sm text-muted-foreground">Highest Multiplier</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {lodgeSeasons.length > 0
                ? Math.min(...lodgeSeasons.map((s) => Number(s.multiplier))).toFixed(2)
                : '1.00'}x
            </p>
            <p className="text-sm text-muted-foreground">Lowest Multiplier</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
