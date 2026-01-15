'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Board } from '@/components/TaskBoard/Board';
import { NewTaskModal } from '@/components/TaskBoard/NewTaskModal';
import { EditTaskModal } from '@/components/TaskBoard/EditTaskModal';
import { deleteWithCountdown } from '@/lib/delete-with-undo';
import { toast } from 'sonner';
import { Plus, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout';

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  dueDateRaw?: string;
  priority: 'low' | 'medium' | 'high';
  columnId: string;
  position: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const COLUMN_ORDER = ['todo', 'in-progress', 'review', 'done'];
const COLUMN_TITLES: Record<string, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'review': 'Review',
  'done': 'Done',
};

const TEAM_MEMBERS = [
  'James',
  'Alex',
  'Sam',
  'Jordan',
  'Taylor',
  'Morgan',
  'Casey',
  'Riley',
];

export default function TasksPage() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState('todo');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Drag state
  const [, setIsDragging] = useState(false);

  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === now.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setError(null);

      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');

      const data = await res.json();

      // Transform API response into columns format
      const columnsData: Column[] = COLUMN_ORDER.map(status => ({
        id: status,
        title: COLUMN_TITLES[status],
        tasks: (data[status] || []).map((task: {
          id: string;
          title: string;
          description?: string;
          assignee_name?: string;
          due_date?: string;
          priority?: string;
          status: string;
          position?: number;
        }) => ({
          id: task.id,
          title: task.title,
          description: task.description || undefined,
          assignee: task.assignee_name || undefined,
          dueDate: task.due_date ? formatDate(task.due_date) : undefined,
          dueDateRaw: task.due_date || undefined,
          priority: task.priority || 'medium',
          columnId: task.status,
          position: task.position || 0,
        })),
      }));

      setColumns(columnsData);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsNewModalOpen(true);
      }

      if (e.key === 'n' && !isNewModalOpen && !isEditModalOpen) {
        e.preventDefault();
        setIsNewModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isNewModalOpen, isEditModalOpen]);

  // Open new task modal
  const handleOpenNewModal = (columnId?: string) => {
    if (columnId) setSelectedColumnId(columnId);
    setIsNewModalOpen(true);
  };

  // Open edit task modal
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Create new task
  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
    columnId: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create task');
      }

      toast.success('Task created');
      await fetchTasks();
      return true;
    } catch (err) {
      console.error('Failed to create task:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to create task');
      return false;
    }
  };

  // Update task
  const handleUpdateTask = async (taskId: string, taskData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 404) {
          toast.error('Task was deleted by another user');
          await fetchTasks();
          return false;
        }
        throw new Error(data.error || 'Failed to update task');
      }

      toast.success('Task updated');
      await fetchTasks();
      return true;
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update task');
      return false;
    }
  };

  // Delete task with 3-second countdown
  const handleRequestDelete = (taskId: string) => {
    let deletedTask: Task | null = null;
    let taskColumnId: string | null = null;
    for (const col of columns) {
      const task = col.tasks.find((t) => t.id === taskId);
      if (task) {
        deletedTask = task;
        taskColumnId = col.id;
        break;
      }
    }
    if (!deletedTask || !taskColumnId) return;

    if (isEditModalOpen && editingTask?.id === taskId) {
      setIsEditModalOpen(false);
      setEditingTask(null);
    }

    setColumns((prev) =>
      prev.map((col) =>
        col.id === taskColumnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );

    const taskTitle = deletedTask.title;
    const savedTask = deletedTask;
    const savedColumnId = taskColumnId;

    deleteWithCountdown({
      message: `"${taskTitle}" deleted`,
      toastId: `delete-task-${taskId}`,
      onDelete: async () => {
        const res = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to delete task');
        }
      },
      onUndo: () => {
        setColumns((prev) =>
          prev.map((col) =>
            col.id === savedColumnId
              ? { ...col, tasks: [...col.tasks, savedTask] }
              : col
          )
        );
      },
    });
  };

  // Move task (drag & drop)
  const handleMoveTask = async (taskId: string, newStatus: string, newPosition: number) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, position: newPosition }),
      });

      if (!res.ok) {
        throw new Error('Failed to move task');
      }
    } catch (err) {
      console.error('Failed to move task:', err);
      toast.error('Failed to move task');
      await fetchTasks();
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Tasks" description="Manage your tasks">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Tasks" description="Manage your tasks">
      <div className="space-y-6">
        {/* Modals */}
        <NewTaskModal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          onSubmit={handleCreateTask}
          defaultColumnId={selectedColumnId}
          teamMembers={TEAM_MEMBERS}
        />

        {editingTask && (
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingTask(null);
            }}
            task={editingTask}
            onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
            onDelete={() => handleRequestDelete(editingTask.id)}
            teamMembers={TEAM_MEMBERS}
          />
        )}

        {/* Header Actions */}
        <div className="flex items-center justify-end">
          <motion.button
            onClick={() => handleOpenNewModal()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground rounded-lg transition-colors hover:bg-primary/90 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Task
          </motion.button>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 border border-destructive/20 bg-destructive/10 text-destructive text-sm rounded-lg">
            {error}
            <button onClick={() => fetchTasks()} className="ml-2 underline">
              Try again
            </button>
          </div>
        )}

        {/* Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 0, 0.2, 1] }}
        >
          <Board
            columns={columns}
            setColumns={setColumns}
            onAddTask={handleOpenNewModal}
            onEditTask={handleEditTask}
            onDeleteTask={handleRequestDelete}
            onMoveTask={handleMoveTask}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
