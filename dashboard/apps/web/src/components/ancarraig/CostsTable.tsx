'use client';

import { useState } from 'react';
import { Button, Input } from '@lostmonster/ui';
import { Trash2, Check, X } from 'lucide-react';
import { AncarraigCost, AncarraigLodge } from '@lostmonster/database';

interface CostsTableProps {
  costs: AncarraigCost[];
  lodges: AncarraigLodge[];
  onUpdate: (costId: string, data: Partial<AncarraigCost>) => Promise<void>;
  onDelete: (costId: string) => Promise<void>;
}

export function CostsTable({ costs, lodges, onUpdate, onDelete }: CostsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AncarraigCost>>({});

  const startEdit = (cost: AncarraigCost) => {
    setEditingId(cost.id);
    setEditData({
      lodge_id: cost.lodge_id,
      name: cost.name,
      category: cost.category,
      amount: cost.amount,
      period: cost.period,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (costId: string) => {
    try {
      // Convert amount to number if it's a string
      const dataToSend = {
        ...editData,
        amount: typeof editData.amount === 'string' ? parseFloat(editData.amount) : editData.amount,
      };
      await onUpdate(costId, dataToSend);
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error('Failed to update cost:', error);
      alert('Failed to update cost. Please try again.');
    }
  };

  if (costs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground mb-4">No costs added yet</p>
        <p className="text-sm text-muted-foreground">
          Click "Add Cost" above or use AI suggestions to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Category
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Period
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Lodge
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {costs.map(cost => {
            const lodge = lodges.find(l => l.id === cost.lodge_id);
            const isEditing = editingId === cost.id;

            return (
              <tr
                key={cost.id}
                className={isEditing ? 'bg-purple-500/5' : 'hover:bg-muted/50'}
              >
                {/* Name */}
                <td className="px-4 py-3">
                  {isEditing ? (
                    <Input
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="h-8 text-sm"
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => startEdit(cost)}
                      className="text-sm font-medium text-foreground hover:text-purple-500 text-left w-full"
                    >
                      {cost.name}
                    </button>
                  )}
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  {isEditing ? (
                    <select
                      value={editData.category || ''}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value as any })}
                      className="h-8 text-sm rounded-lg border border-border bg-background px-2 py-1 text-foreground w-full"
                    >
                      <option value="fixed">Fixed</option>
                      <option value="variable">Variable</option>
                      <option value="per_booking">Per Booking</option>
                    </select>
                  ) : (
                    <button
                      onClick={() => startEdit(cost)}
                      className="text-sm text-muted-foreground hover:text-purple-500 capitalize text-left w-full"
                    >
                      {cost.category.replace('_', ' ')}
                    </button>
                  )}
                </td>

                {/* Amount */}
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editData.amount || ''}
                      onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                      className="h-8 text-sm text-right"
                    />
                  ) : (
                    <button
                      onClick={() => startEdit(cost)}
                      className="text-sm font-medium text-foreground hover:text-purple-500 text-right w-full"
                    >
                      £{Number(cost.amount).toLocaleString()}
                    </button>
                  )}
                </td>

                {/* Period */}
                <td className="px-4 py-3">
                  {isEditing ? (
                    <select
                      value={editData.period || ''}
                      onChange={(e) => setEditData({ ...editData, period: e.target.value as any })}
                      className="h-8 text-sm rounded-lg border border-border bg-background px-2 py-1 text-foreground w-full"
                    >
                      <option value="annual">Annual</option>
                      <option value="monthly">Monthly</option>
                      <option value="per_night">Per Night</option>
                      <option value="per_booking">Per Booking</option>
                    </select>
                  ) : (
                    <button
                      onClick={() => startEdit(cost)}
                      className="text-sm text-muted-foreground hover:text-purple-500 capitalize text-left w-full"
                    >
                      {cost.period.replace('_', ' ')}
                    </button>
                  )}
                </td>

                {/* Lodge */}
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {lodge?.name}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => saveEdit(cost.id)}
                        className="h-8 bg-green-500 hover:bg-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                        className="h-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(cost.id)}
                      className="h-8"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
