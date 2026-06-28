"use client";

import { Task } from "@/features/tasks/types/task.types";
import { TaskCard } from "../TaskCard";

interface TaskListContentProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onTaskClick?: (taskId: string) => void;
  sentinelRef?: React.RefObject<HTMLDivElement | null> | null;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export function TaskListContent({
  tasks,
  isLoading,
  error,
  onTaskClick,
  sentinelRef,
  hasMore,
  isLoadingMore,
}: TaskListContentProps) {
  return (
    <div className="flex-1 flex flex-col gap-3 pb-2 h-full overflow-auto">
      {isLoading && tasks.length === 0 && (
        <div className="flex justify-center items-center py-10">
          <div className="w-5 h-5 border-2 border-[#D7E2FF] border-t-[#0052CC] rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="text-center py-10 text-sm text-red-500 font-medium">
          {error}
        </div>
      )}
      {!isLoading && !error && tasks.length === 0 && (
        <div className="text-center py-10 text-sm text-[#737685] font-medium">
          No tasks yet
        </div>
      )}
      {tasks.length > 0 && (
        <>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
          ))}
          {hasMore && <div ref={sentinelRef} className="h-1" />}
          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <div className="w-5 h-5 border-2 border-[#D7E2FF] border-t-[#0052CC] rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
