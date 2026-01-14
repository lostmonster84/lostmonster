import { DashboardLayout } from '@/components/layout';
import { Card, CardContent, Button, Badge } from '@lostmonster/ui';
import { Plus, GripVertical } from 'lucide-react';

export default function TasksPage() {
  // Mock data for now - Kanban columns
  const columns = [
    {
      id: 'backlog',
      name: 'Backlog',
      color: '#64748b',
      tasks: [
        { id: '1', title: 'Research competitor pricing', priority: 'low' },
        { id: '2', title: 'Set up analytics dashboard', priority: 'medium' },
      ],
    },
    {
      id: 'todo',
      name: 'To Do',
      color: '#3b82f6',
      tasks: [
        { id: '3', title: 'Update client proposal', priority: 'high', dueDate: 'Today' },
        { id: '4', title: 'Review investment portfolio', priority: 'medium' },
      ],
    },
    {
      id: 'in-progress',
      name: 'In Progress',
      color: '#f59e0b',
      tasks: [
        { id: '5', title: 'Build dashboard MVP', priority: 'high', dueDate: 'Tomorrow' },
      ],
    },
    {
      id: 'review',
      name: 'Review',
      color: '#8b5cf6',
      tasks: [
        { id: '6', title: 'Code review for auth flow', priority: 'medium' },
      ],
    },
    {
      id: 'done',
      name: 'Done',
      color: '#10b981',
      tasks: [
        { id: '7', title: 'Set up Turborepo structure', priority: 'high' },
        { id: '8', title: 'Create UI component library', priority: 'medium' },
      ],
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      case 'medium':
        return <Badge variant="outline">Medium</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Task Manager"
      description="Organize and track your work"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button variant="secondary">Board View</Button>
          <Button variant="ghost">List View</Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-72"
          >
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <h3 className="font-medium">{column.name}</h3>
              <span className="text-sm text-white/40">
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-pointer hover:border-white/10 transition-colors"
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-white/20 mt-1 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{task.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {getPriorityBadge(task.priority)}
                          {task.dueDate && (
                            <span className="text-xs text-white/40">
                              Due: {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Task Button */}
              <button className="w-full p-2 text-sm text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-1">
                <Plus className="h-4 w-4" />
                Add task
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
