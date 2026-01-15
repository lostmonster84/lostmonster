'use client';

import { useState } from 'react';
import { Button, Input } from '@lostmonster/ui';
import { AncarraigLodge } from '@lostmonster/database';

interface CostFormProps {
  lodges: AncarraigLodge[];
  onSubmit: (data: CostFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<CostFormData>;
}

export interface CostFormData {
  lodge_id: string;
  name: string;
  category: 'fixed' | 'variable' | 'per_booking';
  amount: number;
  period: 'annual' | 'monthly' | 'per_night' | 'per_booking';
  start_date?: string;
  end_date?: string;
  notes?: string;
}

export function CostForm({ lodges, onSubmit, onCancel, initialData }: CostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CostFormData>({
    lodge_id: initialData?.lodge_id || lodges[0]?.id || '',
    name: initialData?.name || '',
    category: initialData?.category || 'fixed',
    amount: initialData?.amount || 0,
    period: initialData?.period || 'monthly',
    start_date: initialData?.start_date || new Date().toISOString().split('T')[0],
    end_date: initialData?.end_date || '',
    notes: initialData?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit cost:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof CostFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Lodge Selection */}
      <div className="space-y-2">
        <label htmlFor="lodge" className="text-sm font-medium text-foreground">Lodge</label>
        <select
          id="lodge"
          value={formData.lodge_id}
          onChange={(e) => updateField('lodge_id', e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          required
        >
          {lodges.map(lodge => (
            <option key={lodge.id} value={lodge.id}>
              {lodge.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cost Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">Cost Name</label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="e.g., Mortgage, Utilities, Cleaning"
          required
        />
      </div>

      {/* Category and Period (side by side) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-foreground">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value as CostFormData['category'])}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            required
          >
            <option value="fixed">Fixed (e.g., mortgage)</option>
            <option value="variable">Variable (e.g., utilities)</option>
            <option value="per_booking">Per Booking (e.g., cleaning)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="period" className="text-sm font-medium text-foreground">Period</label>
          <select
            id="period"
            value={formData.period}
            onChange={(e) => updateField('period', e.target.value as CostFormData['period'])}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            required
          >
            <option value="annual">Annual (per year)</option>
            <option value="monthly">Monthly</option>
            <option value="per_night">Per Night</option>
            <option value="per_booking">Per Booking</option>
          </select>
        </div>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-foreground">Amount (£)</label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => updateField('amount', parseFloat(e.target.value))}
          placeholder="0.00"
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter the cost amount for the selected period
        </p>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="start_date" className="text-sm font-medium text-foreground">Start Date</label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => updateField('start_date', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="end_date" className="text-sm font-medium text-foreground">End Date (Optional)</label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => updateField('end_date', e.target.value)}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium text-foreground">Notes (Optional)</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Add any additional details..."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground min-h-[80px]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Cost' : 'Add Cost'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
