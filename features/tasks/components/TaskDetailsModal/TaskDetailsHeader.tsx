// TaskDetailsHeader.tsx
"use client";

import { Task } from "@/features/tasks/types/task.types";

export function TaskDetailsHeader({ task }: { task: Task }) {
  const epicLabel = task.epic
    ? `${task.epic.epic_id} (${task.epic.title})`
    : "No epic";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
        <span className="px-2.5 py-1 bg-[#E8EDFF] text-[#0052CC] rounded-[4px]">
          {task.task_id || "TASK-"}
        </span>
        {task.epic && (
          <span className="flex items-center gap-1.5 text-[#434654]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>{epicLabel}</span>
          </span>
        )}
      </div>
      <h2 className="text-[28px] md:text-[32px] font-bold text-[#041B3C] leading-[1.15]">
        {task.title}
      </h2>
    </div>
  );
}
