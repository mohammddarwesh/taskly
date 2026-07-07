"use client";

import { useDroppable } from "@dnd-kit/react";
import { TaskStatusType } from "@/features/tasks/types/task.types";
import { statusConfig } from "@/features/tasks/utils/statusConfig";
import { ColumnHeader } from "./_components/ColumnHeader";
import { TaskListContent } from "./_components/TaskListContent";
import { AddTaskDashedButton } from "./_components/AddTaskDashedButton";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import { useProjectTasks } from "@/features/tasks/hooks/useProjectTasks";

interface TaskColumnProps {
  projectId: string;
  status: TaskStatusType;
  search?: string;
  onTaskClick?: (taskId: string) => void;
}

export function TaskColumn({
  projectId,
  status,
  search,
  onTaskClick,
}: TaskColumnProps) {
  const router = useRouter();
  const config = statusConfig[status] || statusConfig.TO_DO;
  const { ref, isDropTarget } = useDroppable({ id: status });

  const {
    tasks,
    totalCount,
    isLoading,
    error,
    sentinelRef,
    hasMore,
    showLoadingMore,
  } = useProjectTasks({
    projectId,
    status,
    search,
    mode: "infinite",
    pageSize: 10,
  });

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
        count={totalCount}
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
        isLoadingMore={showLoadingMore}
      />
    </div>
  );
}
