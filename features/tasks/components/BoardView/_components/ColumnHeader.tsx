"use client";

import Image from "next/image";
import { TaskStatusType } from "@/features/tasks/types/task.types";
import { StatusBadge } from "./StatusBadge";

interface ColumnHeaderProps {
  status: TaskStatusType;
  count: number;
  config: { dotColor: string };
  onAddTask: () => void;
}

export function ColumnHeader({
  status,
  count,
  config,
  onAddTask,
}: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <StatusBadge status={status} count={count} config={config} />
      <button
        onClick={onAddTask}
        className="p-1.5 hover:bg-[#D7E2FF] rounded-md transition-colors"
      >
        <Image src="/icons/plus.svg" alt="Add task" width={16} height={16} />
      </button>
    </div>
  );
}
