"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { TaskStatus, TaskStatusType } from "@/features/tasks/types/task.types";
import { useBoardTasks } from "@/features/tasks/hooks/useBoardTasks";
import { TaskColumn } from "./TaskColumn";

interface BoardViewProps {
  projectId: string;
  onTaskClick?: (taskId: string) => void;
  search?: string;
}

export function BoardView({ projectId, onTaskClick, search }: BoardViewProps) {
  const { tasksByStatus, loading, moveTask } = useBoardTasks(projectId, search);

  const handleDragEnd = async (event: any) => {
    if (event.canceled) return;
    const { source, target } = event.operation;
    if (!source || !target) return;

    const taskId = source.id;
    const newStatus = target.id as TaskStatusType;
    await moveTask(taskId, newStatus);
  };

  if (loading) {
    return <div className="flex justify-center py-10">Loading board...</div>;
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none lg:flex lg:flex-row lg:flex-nowrap lg:overflow-x-auto gap-4 md:gap-6 w-full h-full">
        {Object.values(TaskStatus).map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status] || []}
            projectId={projectId}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
