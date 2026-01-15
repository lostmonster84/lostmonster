'use client';

import { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Loader2, Calendar, ChevronDown, User, Trash2 } from 'lucide-react';
import { cn } from '@lostmonster/ui';

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  dueDateRaw?: string;
  priority: 'low' | 'medium' | 'high';
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSubmit: (task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
  }) => Promise<boolean>;
  onDelete: () => void;
  teamMembers?: string[];
}

export function EditTaskModal({
  isOpen,
  onClose,
  task,
  onSubmit,
  onDelete,
  teamMembers = [],
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task.priority);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [dueDate, setDueDate] = useState(task.dueDateRaw || '');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const assigneeDropdownRef = useRef<HTMLDivElement>(null);

  // Update form when task changes
  useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setAssignee(task.assignee || '');
      setDueDate(task.dueDateRaw || '');
      setTimeout(() => titleInputRef.current?.focus(), 100);
    }
  }, [isOpen, task]);

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
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
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
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onDelete}
            disabled={isSubmitting}
            className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Task
          </button>

          <div className="flex items-center gap-3">
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
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
