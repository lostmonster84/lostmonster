'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from './TaskColumn';

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

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface BoardProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onMoveTask?: (taskId: string, newStatus: string, newPosition: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function Board({
  columns,
  setColumns,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDragStart,
  onDragEnd: onDragEndCallback,
}: BoardProps) {
  const handleDragEnd = (result: DropResult) => {
    onDragEndCallback?.();
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find((col) => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      setColumns(
        columns.map((col) =>
          col.id === sourceColumn.id ? { ...col, tasks: newTasks } : col
        )
      );

      // Persist to API
      onMoveTask?.(draggableId, destination.droppableId, destination.index);
    } else {
      // Moving to a different column
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      // Update task's columnId
      movedTask.columnId = destination.droppableId;

      destTasks.splice(destination.index, 0, movedTask);

      setColumns(
        columns.map((col) => {
          if (col.id === sourceColumn.id) {
            return { ...col, tasks: sourceTasks };
          }
          if (col.id === destColumn.id) {
            return { ...col, tasks: destTasks };
          }
          return col;
        })
      );

      // Persist to API
      onMoveTask?.(draggableId, destination.droppableId, destination.index);
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
