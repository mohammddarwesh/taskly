"use client";

import { TaskColumn } from "./TaskColumn";
import { TaskStatus } from "@/features/tasks/types/task.types";

interface BoardViewProps {
  projectId: string;
}

export function BoardView({ projectId }: BoardViewProps) {
  return (
    <div
      className="
      grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-none lg:flex lg:flex-row lg:flex-nowrap lg:overflow-x-auto 
      gap-4 md:gap-6 w-full h-full
    "
    >
      {Object.values(TaskStatus).map((status) => (
        <TaskColumn key={status} projectId={projectId} status={status} />
      ))}
    </div>
  );
}
