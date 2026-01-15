'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@lostmonster/ui';
import { Plus, Upload, Download } from 'lucide-react';
import { AncarraigCost, AncarraigLodge, AncarraigSeason } from '@lostmonster/database';
import { CostForm, CostFormData } from './forms/CostForm';
import { AIGuidancePanel, SuggestedCost } from './ai/AIGuidancePanel';
import { CostsTable } from './CostsTable';
import { calculateTargetRates } from '@/lib/ancarraig/calculations';

interface CostsManagerProps {
  initialLodges: AncarraigLodge[];
  initialCosts: AncarraigCost[];
  initialSeasons: AncarraigSeason[];
}

export function CostsManager({
  initialLodges,
  initialCosts,
  initialSeasons,
}: CostsManagerProps) {
  const [lodges] = useState(initialLodges);
  const [costs, setCosts] = useState(initialCosts);
  const [seasons] = useState(initialSeasons);
  const [showCostForm, setShowCostForm] = useState(false);
  const [editingCost, setEditingCost] = useState<AncarraigCost | null>(null);

  // Calculate today's rates
  const today = new Date();
  const todayResults = lodges.map(lodge => {
    const lodgeCosts = costs.filter(c => c.lodge_id === lodge.id);
    const result = calculateTargetRates(lodgeCosts, seasons, today);
    return { lodge, ...result };
  });

  const handleAddCost = async (data: CostFormData) => {
    try {
      const response = await fetch('/api/ancarraig/costs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create cost');

      const newCost = await response.json();
      setCosts([...costs, newCost]);
      setShowCostForm(false);
    } catch (error) {
      console.error('Failed to add cost:', error);
      alert('Failed to add cost. Please try again.');
    }
  };

  const handleAddSuggestedCost = (suggestion: SuggestedCost) => {
    setEditingCost({
      id: '',
      lodge_id: lodges[0]?.id || '',
      name: suggestion.name,
      category: suggestion.category,
      amount: String(suggestion.estimatedAmount || 0),
      period: suggestion.period,
      start_date: new Date().toISOString().split('T')[0],
      end_date: null,
      notes: suggestion.reason,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any);
    setShowCostForm(true);
  };

  const handleUpdateCost = async (costId: string, data: Partial<AncarraigCost>) => {
    try {
      const response = await fetch(`/api/ancarraig/costs/${costId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update cost');

      const updatedCost = await response.json();
      setCosts(costs.map(c => c.id === costId ? updatedCost : c));
    } catch (error) {
      console.error('Failed to update cost:', error);
      alert('Failed to update cost. Please try again.');
    }
  };

  const handleDeleteCost = async (costId: string) => {
    if (!confirm('Are you sure you want to delete this cost?')) return;

    try {
      const response = await fetch(`/api/ancarraig/costs/${costId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete cost');

      setCosts(costs.filter(c => c.id !== costId));
    } catch (error) {
      console.error('Failed to delete cost:', error);
      alert('Failed to delete cost. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button onClick={() => setShowCostForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Cost
        </Button>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import from Xero
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* AI Guidance Panel */}
      {costs.length < 10 && (
        <AIGuidancePanel
          existingCosts={costs}
          onAddSuggestedCost={handleAddSuggestedCost}
        />
      )}

      {/* Breakeven Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {todayResults.map(result => {
          const { lodge, breakeven, target, costBreakdown } = result;

          return (
            <Card key={lodge.id}>
              <CardHeader className="pb-3">
                <CardDescription>{lodge.name}</CardDescription>
                <CardTitle className="text-3xl">£{breakeven}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Breakeven (today)</span>
                    <span className="font-medium">£{breakeven}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Target (30% margin)</span>
                    <span className="font-medium text-cyan-500">£{target}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="text-muted-foreground">Daily costs</span>
                    <span className="font-medium">£{costBreakdown.totalDaily}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cost Form Modal */}
      {showCostForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-lg mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingCost ? 'Edit Cost' : 'Add New Cost'}
            </h2>
            <CostForm
              lodges={lodges}
              onSubmit={handleAddCost}
              onCancel={() => {
                setShowCostForm(false);
                setEditingCost(null);
              }}
              initialData={editingCost ? {
                lodge_id: editingCost.lodge_id,
                name: editingCost.name,
                category: editingCost.category as any,
                amount: Number(editingCost.amount),
                period: editingCost.period as any,
                start_date: editingCost.start_date || undefined,
                end_date: editingCost.end_date || undefined,
                notes: editingCost.notes || undefined,
              } : undefined}
            />
          </div>
        </div>
      )}

      {/* Costs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Cost Items</CardTitle>
          <CardDescription>
            {costs.length} cost items across {lodges.length} lodge(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CostsTable
            costs={costs}
            lodges={lodges}
            onUpdate={handleUpdateCost}
            onDelete={handleDeleteCost}
          />
        </CardContent>
      </Card>
    </div>
  );
}
