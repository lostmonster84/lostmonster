'use client';

import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';
import { cn } from '@lostmonster/ui';

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  columnId: string;
  position: number;
}

interface TaskColumnProps {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

// Column colors for visual separation
const columnStyles: Record<string, { bg: string; badge: string }> = {
  todo: {
    bg: 'bg-muted/30',
    badge: 'bg-muted text-muted-foreground',
  },
  'in-progress': {
    bg: 'bg-cyan-50 dark:bg-cyan-500/5',
    badge: 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  },
  review: {
    bg: 'bg-amber-50 dark:bg-amber-500/5',
    badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
  },
  done: {
    bg: 'bg-green-50 dark:bg-green-500/5',
    badge: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
  },
};

export function TaskColumn({ column, onAddTask, onEditTask, onDeleteTask }: TaskColumnProps) {
  const styles = columnStyles[column.id] || columnStyles.todo;

  return (
    <div
      className={cn(
        'flex min-w-[300px] w-[300px] flex-col rounded-xl p-4',
        styles.bg
      )}
    >
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-foreground">
            {column.title}
          </h2>
          <span
            className={cn('px-2 py-0.5 text-xs font-semibold rounded-full', styles.badge)}
          >
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask?.(column.id)}
          className="p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          title="Add task"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Tasks Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 space-y-3 min-h-[200px] rounded-xl transition-all duration-200 relative',
              snapshot.isDraggingOver && 'bg-primary/5'
            )}
          >
            {/* Drop zone indicator */}
            {snapshot.isDraggingOver && (
              <div
                className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-xl pointer-events-none z-10"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            )}

            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={() => onEditTask?.(task)}
                onDelete={() => onDeleteTask?.(task.id)}
              />
            ))}
            {provided.placeholder}

            {/* Empty State */}
            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex h-24 items-center justify-center border border-dashed border-border rounded-xl text-sm text-muted-foreground">
                Drop here or click + to add
              </div>
            )}

            {/* Dragging over empty state */}
            {column.tasks.length === 0 && snapshot.isDraggingOver && (
              <div className="flex h-24 items-center justify-center border-2 border-dashed border-primary rounded-xl text-sm text-primary font-medium">
                Drop here
              </div>
            )}
          </div>
        )}
      </Droppable>

      {/* Add task button at bottom */}
      <button
        onClick={() => onAddTask?.(column.id)}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-dashed border-border rounded-lg hover:border-border-hover transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add task
      </button>
    </div>
  );
}
