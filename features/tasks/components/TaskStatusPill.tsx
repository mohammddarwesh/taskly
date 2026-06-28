"use client";

import { TaskStatusType } from "../types/task.types";
import { statusConfig } from "../utils/statusConfig";
import { cn } from "@/libs/utils";

interface TaskStatusPillProps {
  status: TaskStatusType;
  size?: "sm" | "md";
}

export function TaskStatusPill({ status, size = "md" }: TaskStatusPillProps) {
  const config = statusConfig[status] || statusConfig.TO_DO;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded font-bold uppercase tracking-wide",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1.5 text-[12px]",
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
