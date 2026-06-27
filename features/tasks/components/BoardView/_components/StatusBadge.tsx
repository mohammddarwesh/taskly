"use client";

import { TaskStatusType } from "@/features/tasks/types/task.types";
import { cn } from "@/libs/utils";

interface StatusBadgeProps {
  status: TaskStatusType;
  count: number;
  config: { dotColor: string };
}

export function StatusBadge({ status, count, config }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={cn("w-2.5 h-2.5 rounded-full", config.dotColor)} />
      <span className="text-[13px] font-semibold text-[#434654] uppercase tracking-[0.6px]">
        {status.replace(/_/g, " ")}
      </span>
      <span className="px-2 py-px rounded-full bg-[#E8EDFF] text-[11px] font-bold text-[#434654]">
        {count}
      </span>
    </div>
  );
}