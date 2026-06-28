"use client";

import { useRouter } from "next/navigation";
import { TaskStatusType } from "@/features/tasks/types/task.types";
import { statusConfig } from "@/features/tasks/utils/statusConfig";
import { useProjectTasks } from "@/features/tasks/hooks/useProjectTasks";
import { ColumnHeader } from "./_components/ColumnHeader";
import { TaskListContent } from "./_components/TaskListContent";
import { AddTaskDashedButton } from "./_components/AddTaskDashedButton";

interface TaskColumnProps {
  projectId: string;
  status: TaskStatusType;
  onTaskClick?: (taskId: string) => void;
}

export function TaskColumn({
  projectId,
  status,
  onTaskClick,
}: TaskColumnProps) {
  const router = useRouter();
  const config = statusConfig[status] || statusConfig.TO_DO;
  const { tasks, isLoading, error, sentinelRef, hasMore } = useProjectTasks(
    projectId,
    "infinite",
    status,
  );

  const handleAddTask = () => {
    router.push(`/project/${projectId}/tasks/new?status=${status}`);
  };

  return (
    <div className="flex flex-col min-w-[288px]  w-full h-full bg-[#F9F9FF] border border-[#E8EDFF] rounded-xl p-4 min-h-[300px]">
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
        isLoading={isLoading}
        error={error}
        onTaskClick={onTaskClick}
        sentinelRef={sentinelRef}
        hasMore={hasMore}
        isLoadingMore={isLoading && tasks.length > 0}
      />
    </div>
  );
}
