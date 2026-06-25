"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Task } from "../../types/task.types";
import { statusConfig } from "../../utils/statusConfig";
import { cn } from "@/libs/utils";
import { formatDate } from "@/libs/utils";
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

const getStatusPillClass = (status: string) => {
  switch (status) {
    case "DONE":
      return "bg-[#E8F5E9] text-[#2E7D32]";
    case "IN_REVIEW":
      return "bg-[#FFF3E0] text-[#E65100]";
    case "BLOCKED":
      return "bg-[#FFEBEE] text-[#C62828]";
    default:
      return "bg-[#F3F4F6] text-[#4B5563]";
  }
};

export function TaskCard({ task }: { task: Task }) {
  const config =
    statusConfig[task.status as keyof typeof statusConfig] ||
    statusConfig.TO_DO;
  const formattedDate = formatCardDate(task.due_date);
  const assigneeName = task.assignee?.name || undefined;

  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 p-4 bg-[#FFFFFF] rounded-lg border border-[#E8EDFF] transition-shadow hover:shadow-sm",
        "md:border-l-4",
        config.borderColor,
      )}
    >
      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden md:flex flex-col gap-2">
        <p className="text-[15px] font-medium text-[#041B3C] leading-5.5 line-clamp-2">
          {task.title}
        </p>
        <div className="flex items-center justify-between mt-auto pt-1">
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

      {/* ================= MOBILE LAYOUT ================= */}
      <div className="flex flex-col gap-1 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] text-[#737685] font-medium uppercase flex-1 min-w-0 truncate">
            {task.task_id || "TASK-001"}
          </p>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex-shrink-0 ${getStatusPillClass(task.status)}`}
          >
            {task.status.replace(/_/g, " ")}
          </span>
        </div>

        <p className="text-[15px] font-semibold text-[#041B3C] leading-5.5 line-clamp-2">
          {task.title}
        </p>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-[#737685]">
            <span className="font-bold uppercase text-[10px] tracking-wider">
              Due date:
            </span>
            <span>
              {task.due_date ? formatDate(task.due_date).toUpperCase() : "N/A"}
            </span>
          </div>
          <button className="text-[#737685] hover:text-[#041B3C] p-1 transition-colors">
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
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
