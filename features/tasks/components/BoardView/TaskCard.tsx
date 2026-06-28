"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Task } from "../../types/task.types";
import { statusConfig } from "../../utils/statusConfig";
import { cn } from "@/libs/utils";
import Image from "next/image";

const formatCardDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date.getTime() === today.getTime()) return "TODAY";
  if (date.getTime() < today.getTime()) return "DELAYED";
  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
};

interface TaskCardProps {
  task: Task;
  onTaskClick?: (taskId: string) => void;
}

export function TaskCard({ task, onTaskClick }: TaskCardProps) {
  const config =
    statusConfig[task.status as keyof typeof statusConfig] ||
    statusConfig.TO_DO;
  const formattedDate = formatCardDate(task.due_date);
  const assigneeName = task.assignee?.name || undefined;

  return (
    <div
      onClick={() => onTaskClick?.(task.id)}
      className={cn(
        "flex flex-col gap-3 p-4 bg-[#FFFFFF] rounded-lg border border-[#E8EDFF] border-l-4 transition-shadow hover:shadow-sm cursor-pointer",
        config.borderColor,
      )}
    >
      <p className="text-[15px] font-medium text-[#041B3C] leading-5.5 line-clamp-2">
        {task.title}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {formattedDate === "DELAYED" ? (
            <div className="flex items-center gap-1.5 text-[#BA1A1A]">
              <Image
                src="/icons/alert.svg"
                alt="Alert"
                width={14}
                height={14}
                className="opacity-80"
              />
              <span className="text-[13px] font-medium tracking-wide">
                DELAYED
              </span>
            </div>
          ) : formattedDate === "TODAY" ? (
            <span className="text-[12px] font-medium text-[#041B3C] border border-[#D7E2FF] bg-[#D7E2FF]/30 px-2 py-0.5 rounded-[2px] uppercase tracking-wide">
              {formattedDate}
            </span>
          ) : formattedDate ? (
            <div className="flex items-center gap-1.5 text-[#737685]">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={14}
                height={14}
                className="opacity-60"
              />
              <span className="text-[13px] font-medium">{formattedDate}</span>
            </div>
          ) : null}
        </div>
        <Avatar
          name={assigneeName}
          size="sm"
          className="w-6 h-6 text-[10px] bg-[#D7E2FF] text-[#041B3C]"
        />
      </div>
    </div>
  );
}
