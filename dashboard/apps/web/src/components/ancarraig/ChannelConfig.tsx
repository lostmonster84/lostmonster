'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@lostmonster/ui';
import { Check, Edit2, Plus, Trash2, X } from 'lucide-react';
import { AncarraigChannel } from '@lostmonster/database';

interface ChannelConfigProps {
  initialChannels: AncarraigChannel[];
}

export function ChannelConfig({ initialChannels }: ChannelConfigProps) {
  const [channels, setChannels] = useState(initialChannels);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AncarraigChannel>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (channel: AncarraigChannel) => {
    setEditingId(channel.id);
    setEditData({ ...channel });
  };

  const handleSave = async (channelId: string) => {
    try {
      const response = await fetch(`/api/ancarraig/channels/${channelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      if (!response.ok) throw new Error('Failed to update channel');

      const updated = await response.json();
      setChannels(channels.map(c => c.id === channelId ? updated : c));
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error('Failed to update channel:', error);
      alert('Failed to update channel. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (channelId: string) => {
    if (!confirm('Are you sure you want to delete this channel?')) return;

    try {
      const response = await fetch(`/api/ancarraig/channels/${channelId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete channel');

      setChannels(channels.filter(c => c.id !== channelId));
    } catch (error) {
      console.error('Failed to delete channel:', error);
      alert('Failed to delete channel. Please try again.');
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/ancarraig/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create channel');
      }

      const newChannel = await response.json();
      setChannels([...channels, newChannel]);
      setShowAddForm(false);
      setEditData({});
    } catch (error: any) {
      console.error('Failed to create channel:', error);
      alert(error.message || 'Failed to create channel. Please try again.');
    }
  };

  const renderField = (
    channel: AncarraigChannel,
    field: keyof AncarraigChannel,
    type: 'text' | 'number' | 'boolean' = 'text'
  ) => {
    const isEditing = editingId === channel.id;
    const value = isEditing ? editData[field] : channel[field];

    if (type === 'boolean') {
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          disabled={!isEditing}
          onChange={(e) => setEditData({ ...editData, [field]: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
        />
      );
    }

    if (!isEditing) {
      if (field === 'base_commission_percent' || field === 'genius_discount_percent' || field === 'non_refundable_discount_percent') {
        return <span>{value !== null ? `${value}%` : '-'}</span>;
      }
      return <span>{String(value || '-')}</span>;
    }

    return (
      <Input
        type={type}
        value={value as string | number || ''}
        onChange={(e) => setEditData({
          ...editData,
          [field]: type === 'number' ? parseFloat(e.target.value) : e.target.value
        })}
        className="h-8 w-full"
        step={type === 'number' ? '0.01' : undefined}
        min={type === 'number' ? '0' : undefined}
        max={type === 'number' && (field.includes('percent') || field.includes('discount')) ? '100' : undefined}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </div>

      {/* Add Channel Form */}
      {showAddForm && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Add New Channel</CardTitle>
            <CardDescription>Configure commission structure for a new OTA channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Channel Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., expedia"
                    value={(editData.channel_name as string) || ''}
                    onChange={(e) => setEditData({ ...editData, channel_name: e.target.value as any })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Base Commission %</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={editData.base_commission_percent || ''}
                    onChange={(e) => setEditData({ ...editData, base_commission_percent: parseFloat(e.target.value) })}
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Genius Discount %</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={editData.genius_discount_percent || ''}
                    onChange={(e) => setEditData({ ...editData, genius_discount_percent: parseFloat(e.target.value) || null })}
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Non-Refundable Discount %</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={editData.non_refundable_discount_percent || ''}
                    onChange={(e) => setEditData({ ...editData, non_refundable_discount_percent: parseFloat(e.target.value) || null })}
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(editData.charges_cleaning_commission)}
                    onChange={(e) => setEditData({ ...editData, charges_cleaning_commission: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  Charges commission on cleaning fee
                </label>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(editData.supports_genius)}
                    onChange={(e) => setEditData({ ...editData, supports_genius: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  Supports Genius program
                </label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAdd}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Channel
                </Button>
                <Button variant="outline" onClick={() => { setShowAddForm(false); setEditData({}); }}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Channels Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Channel Commission Configurations</CardTitle>
          <CardDescription>
            {channels.length} OTA channel(s) configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Channel</th>
                  <th className="text-right py-3 px-4 font-medium">Base %</th>
                  <th className="text-center py-3 px-4 font-medium">Cleaning Fee</th>
                  <th className="text-center py-3 px-4 font-medium">Genius</th>
                  <th className="text-right py-3 px-4 font-medium">Genius %</th>
                  <th className="text-right py-3 px-4 font-medium">Non-Ref %</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr
                    key={channel.id}
                    className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      {editingId === channel.id ? (
                        renderField(channel, 'channel_name', 'text')
                      ) : (
                        <span className="font-medium capitalize">{channel.channel_name}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {renderField(channel, 'base_commission_percent', 'number')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderField(channel, 'charges_cleaning_commission', 'boolean')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderField(channel, 'supports_genius', 'boolean')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {renderField(channel, 'genius_discount_percent', 'number')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {renderField(channel, 'non_refundable_discount_percent', 'number')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === channel.id ? (
                          <>
                            <button
                              onClick={() => handleSave(channel.id)}
                              className="text-green-600 hover:text-green-700"
                              title="Save"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-gray-600 hover:text-gray-700"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(channel)}
                              className="text-purple-600 hover:text-purple-700"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(channel.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {channels.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No channels configured yet. Add your first channel to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Channel Commission Explainer */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Understanding Channel Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Booking.com Example</h4>
              <p className="text-muted-foreground">
                Base commission (15%) + Commission on cleaning fee + Genius discount (10% of reduced price) + Non-refundable discount (10% of further reduced price)
              </p>
              <div className="mt-2 p-3 bg-muted/50 rounded-lg font-mono text-xs">
                Guest pays: £200<br />
                - 15% commission: £30 → £170<br />
                - Genius 10%: £17 → £153<br />
                - Non-refundable 10%: £15.30 → £137.70<br />
                <span className="text-purple-500 font-bold">You receive: £137.70</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Direct Bookings</h4>
              <p className="text-muted-foreground">
                No commission (0%) - you keep the full amount minus payment processing fees
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Airbnb</h4>
              <p className="text-muted-foreground">
                Host fee (15%) - guest also pays service fee separately
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
