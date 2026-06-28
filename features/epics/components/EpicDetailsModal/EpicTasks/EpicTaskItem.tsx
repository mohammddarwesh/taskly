"use client";

import { Avatar } from "@/components/ui/Avatar";
import { formatDate, cn } from "@/libs/utils";
import { Task } from "@/features/tasks/types/task.types";

const isOverdue = (dueDate: string | null) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

interface EpicTaskItemProps {
  task: Task;
  onTaskClick?: (taskId: string) => void;
}

export function EpicTaskItem({ task, onTaskClick }: EpicTaskItemProps) {
  const assigneeName = task.assignee?.name || undefined;
  const overdue = isOverdue(task.due_date);

  return (
    <div
      onClick={() => onTaskClick?.(task.id)}
      className={cn(
        "flex items-center justify-between py-4 px-2 md:px-4 cursor-pointer",
        "bg-[#F9F9FF] md:bg-transparent",
        "border border-[#E8EDFF] rounded-xl md:border-0 md:border-b md:last:border-0",
      )}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="hidden md:flex shrink-0 w-6 h-6 rounded-full border-2 border-[#D7E2FF] items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#737685"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <h4 className="text-[16px] font-medium text-[#041B3C] truncate leading-6">
            {task.title}
          </h4>
          <div className="flex items-center gap-2">
            <Avatar
              name={assigneeName}
              size="sm"
              className="w-5 h-5 text-[10px]"
            />
            <span className="text-[14px] text-[#434654] font-normal">
              {assigneeName || "Unassigned"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0.5 flex-shrink-0 ml-4">
        <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.5px] text-[#737685]">
          DUE DATE
        </span>

        {overdue ? (
          <div className="flex items-center gap-1 text-[#BA1A1A]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="text-[13px] font-bold uppercase">Overdue</span>
          </div>
        ) : task.due_date ? (
          <span className="text-[14px] font-medium text-[#041B3C]">
            {formatDate(task.due_date)}
          </span>
        ) : null}
      </div>
    </div>
  );
}
