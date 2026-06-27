// TaskDetailsBody.tsx
"use client";

import { Task } from "@/features/tasks/types/task.types";

export function TaskDetailsBody({ task }: { task: Task }) {
  return (
    <div className="flex-1">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#434654] mb-3">
        Description
      </h4>
      <p className="text-[14px] text-[#434654] leading-[24px] whitespace-pre-wrap">
        {task.description || "No description provided."}
      </p>
    </div>
  );
}
