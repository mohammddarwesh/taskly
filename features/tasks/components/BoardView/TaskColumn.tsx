"use client";

import { useDroppable } from "@dnd-kit/react";
import { TaskStatusType, Task } from "@/features/tasks/types/task.types";
import { statusConfig } from "@/features/tasks/utils/statusConfig";
import { ColumnHeader } from "./_components/ColumnHeader";
import { TaskListContent } from "./_components/TaskListContent";
import { AddTaskDashedButton } from "./_components/AddTaskDashedButton";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";

interface TaskColumnProps {
  projectId: string;
  status: TaskStatusType;
  tasks: Task[];
  onTaskClick?: (taskId: string) => void;
}

export function TaskColumn({
  projectId,
  status,
  tasks,
  onTaskClick,
}: TaskColumnProps) {
  const router = useRouter();
  const config = statusConfig[status] || statusConfig.TO_DO;
  const { ref, isDropTarget } = useDroppable({ id: status });

  const handleAddTask = () => {
    router.push(`/project/${projectId}/tasks/new?status=${status}`);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col min-w-[288px] w-full h-full bg-[#F9F9FF] border border-[#E8EDFF] rounded-xl p-4 min-h-[300px] transition-colors",
        isDropTarget && "bg-[#E8EDFF] border-[#0052CC]",
      )}
    >
      <ColumnHeader
        status={status}
        count={tasks.length}
        config={config}
        onAddTask={handleAddTask}
      />
      <div className="hidden md:flex mt-auto pt-4">
        <AddTaskDashedButton onClick={handleAddTask} />
      </div>
      <TaskListContent
        tasks={tasks}
        isLoading={false}
        error={null}
        onTaskClick={onTaskClick}
        sentinelRef={null}
        hasMore={false}
        isLoadingMore={false}
      />
    </div>
  );
}
