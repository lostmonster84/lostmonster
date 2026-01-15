'use client';

import { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Loader2, Calendar, ChevronDown, User } from 'lucide-react';
import { cn } from '@lostmonster/ui';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
    columnId: string;
  }) => Promise<boolean>;
  defaultColumnId?: string;
  teamMembers?: string[];
}

export function NewTaskModal({
  isOpen,
  onClose,
  onSubmit,
  defaultColumnId = 'todo',
  teamMembers = [],
}: NewTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [columnId, setColumnId] = useState(defaultColumnId);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const assigneeDropdownRef = useRef<HTMLDivElement>(null);

  // Update columnId when defaultColumnId or modal opens
  useEffect(() => {
    if (isOpen) {
      setColumnId(defaultColumnId);
      setTimeout(() => titleInputRef.current?.focus(), 100);
    }
  }, [isOpen, defaultColumnId]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setAssignee('');
      setDueDate('');
      setColumnId('todo');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Close assignee dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (assigneeDropdownRef.current && !assigneeDropdownRef.current.contains(e.target as Node)) {
        setShowAssigneeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const success = await onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      assignee: assignee.trim(),
      dueDate: dueDate,
      columnId,
    });

    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  const selectAssignee = (name: string) => {
    setAssignee(name);
    setShowAssigneeDropdown(false);
  };

  const today = new Date().toISOString().split('T')[0];

  const inputStyles = "w-full bg-input border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors";
  const inputErrorStyles = "border-red-400 focus:border-red-400";
  const labelStyles = "mb-1 block text-sm font-medium text-foreground";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className={labelStyles}>
            Task Title <span className="text-primary">*</span>
          </label>
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({});
            }}
            placeholder="Enter task title..."
            className={cn(inputStyles, errors.title && inputErrorStyles)}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-destructive">
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className={labelStyles}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details..."
            rows={3}
            className={inputStyles}
            disabled={isSubmitting}
          />
        </div>

        {/* Column & Priority Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Column */}
          <div>
            <label className={labelStyles}>Column</label>
            <select
              value={columnId}
              onChange={(e) => setColumnId(e.target.value)}
              className={inputStyles}
              disabled={isSubmitting}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className={labelStyles}>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className={inputStyles}
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Assignee & Due Date Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Assignee */}
          <div className="relative" ref={assigneeDropdownRef}>
            <label className={labelStyles}>Assignee</label>
            <div className="relative">
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                onFocus={() => setShowAssigneeDropdown(true)}
                placeholder="Select or type..."
                className={cn(inputStyles, 'pr-8')}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isSubmitting}
              >
                <ChevronDown className={cn('h-4 w-4 transition-transform', showAssigneeDropdown && 'rotate-180')} />
              </button>
            </div>

            {/* Dropdown */}
            {showAssigneeDropdown && teamMembers.length > 0 && (
              <div className="absolute z-10 mt-1 w-full border border-border bg-card rounded-lg py-1 max-h-40 overflow-y-auto shadow-lg">
                {teamMembers
                  .filter(member => member.toLowerCase().includes(assignee.toLowerCase()))
                  .map(member => (
                    <button
                      key={member}
                      type="button"
                      onClick={() => selectAssignee(member)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
                    >
                      <User className="h-3.5 w-3.5" />
                      {member}
                    </button>
                  ))}
                {teamMembers.filter(member => member.toLowerCase().includes(assignee.toLowerCase())).length === 0 && (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No matches
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className={labelStyles}>Due Date</label>
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
                className={cn(inputStyles, '[&::-webkit-calendar-picker-indicator]:opacity-0')}
                disabled={isSubmitting}
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="border border-border bg-secondary rounded-lg px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Task'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
