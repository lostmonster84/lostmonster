'use client';

import { useState, useRef, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Clock, User, Trash2, Pencil, MoreVertical, AlertCircle } from 'lucide-react';
import { cn } from '@lostmonster/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    dueDateRaw?: string;
    priority: 'low' | 'medium' | 'high';
  };
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const priorityStyles = {
    low: {
      dot: 'bg-current opacity-50',
      badge: 'bg-secondary text-secondary-foreground',
    },
    medium: {
      dot: 'bg-amber-600 dark:bg-amber-400',
      badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    },
    high: {
      dot: 'bg-red-600 dark:bg-red-400',
      badge: 'bg-destructive/20 text-destructive',
    },
  };

  // Check if task is overdue
  const isOverdue = task.dueDateRaw ? new Date(task.dueDateRaw) < new Date(new Date().setHours(0, 0, 0, 0)) : false;

  // Check if due today
  const isDueToday = task.dueDateRaw
    ? new Date(task.dueDateRaw).toDateString() === new Date().toDateString()
    : false;

  // Check if due soon (within 3 days)
  const isDueSoon = task.dueDateRaw
    ? (() => {
      const dueDate = new Date(task.dueDateRaw);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
      return dueDate > today && dueDate <= threeDaysFromNow;
    })()
    : false;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        // Extract drag handlers from provided props to avoid conflict with framer-motion
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { onDragStart: _, ...draggablePropsWithoutDragStart } = provided.draggableProps as unknown as Record<string, unknown>;

        return (
        <motion.div
          ref={provided.innerRef}
          {...draggablePropsWithoutDragStart}
          {...(provided.dragHandleProps as unknown as Record<string, unknown>)}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={onEdit}
          className={cn(
            'group relative border rounded-xl bg-card p-4 transition-all cursor-grab active:cursor-grabbing',
            'hover:shadow-md',
            snapshot.isDragging && 'border-primary/40 shadow-lg',
            isOverdue ? 'border-red-400/50 bg-red-500/5' : 'border-border',
          )}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          {/* Overdue indicator */}
          {isOverdue && (
            <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-red-500 rounded-full">
              <AlertCircle className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Header: Title + Actions */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div className={cn('w-2 h-2 mt-1.5 flex-shrink-0 rounded-full', priorityStyles[task.priority].dot)} />
              <h3 className="font-medium text-foreground leading-snug">
                {task.title}
              </h3>
            </div>

            {/* Actions - Desktop (hover) + Mobile (menu) */}
            <div className="flex items-center gap-1">
              {/* Desktop hover actions */}
              <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  title="Edit task"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Mobile menu button (always visible on mobile) */}
              <div className="relative md:hidden" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 top-full z-20 mt-1 w-32 border border-border bg-card rounded-lg py-1 shadow-lg"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          onEdit?.();
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          onDelete?.();
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="mb-3 text-sm text-muted-foreground pl-4 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Footer: Metadata */}
          <div className="flex items-center gap-4 pl-4">
            {task.assignee && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                {task.assignee}
              </span>
            )}
            {task.dueDate && (
              <span
                className={cn(
                  'flex items-center gap-1 text-xs',
                  isOverdue ? 'text-red-600 dark:text-red-400 font-medium' :
                    isDueToday ? 'text-amber-600 dark:text-amber-400' :
                      isDueSoon ? 'text-green-600 dark:text-green-400' :
                        'text-muted-foreground'
                )}
              >
                <Clock className="h-3 w-3" />
                {isOverdue ? 'Overdue' : task.dueDate}
              </span>
            )}
          </div>

          {/* Priority badge (shown for high priority) */}
          {task.priority === 'high' && (
            <div className="absolute top-2 right-2 md:right-auto md:left-2">
              <span
                className={cn('px-1.5 py-0.5 text-[10px] font-semibold uppercase rounded-full', priorityStyles[task.priority].badge)}
              >
                High
              </span>
            </div>
          )}
        </motion.div>
        );
      }}
    </Draggable>
  );
}
