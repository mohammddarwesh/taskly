"use client";

import { TaskStatusType } from "@/features/tasks/types/task.types";
import { cn } from "@/libs/utils";
import { format, isToday, parseISO } from "date-fns";
import { DailyStats, STATUS_LABELS } from "../types/statistics.types";
import { getStatusStyles } from "../utils/statusHelpers";

interface CalendarViewProps {
  data: DailyStats[];
  startDate: string;
  endDate: string;
}

export function CalendarView({ data, startDate, endDate }: CalendarViewProps) {
  const days = [];
  let current = parseISO(startDate);
  const end = parseISO(endDate);
  while (current <= end) {
    days.push(current);
    current = new Date(current);
    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:divide-x md:divide-gray-100">
        {days.map((day) => {
          const dayStr = format(day, "yyyy-MM-dd");
          const dayData = data.find((d) => d.day === dayStr);
          const isDayToday = isToday(day);
          const statusEntries = dayData
            ? Object.entries(dayData.statuses).filter(([_, count]) => count > 0)
            : [];

          return (
            <div
              key={dayStr}
              className={cn(
                "relative flex-1 rounded-lg border border-gray-100 p-4 flex flex-col bg-white min-h-[230px] transition-colors",
                "md:border-0 md:rounded-none",
                isDayToday &&
                  "md:border-2 md:border-[#0047AB] md:rounded-lg md:shadow-[0_4px_12px_rgba(0,71,171,0.1)]",
              )}
            >
              {/* Today Badge */}
              {isDayToday && (
                <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0047AB] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm tracking-wide z-10">
                  TODAY
                </div>
              )}

              {/* Header */}
              <div className="text-center md:text-left mb-4">
                <p
                  className={cn(
                    "text-xs uppercase font-bold",
                    isDayToday ? "text-[#0047AB]" : "text-gray-400",
                  )}
                >
                  {format(day, "EEE")}
                </p>
                <p
                  className={cn(
                    "text-base font-bold md:text-lg",
                    isDayToday ? "text-[#0B1B3A]" : "text-gray-800",
                  )}
                >
                  {format(day, "d MMM")}
                </p>
              </div>

              {/* Status Pills */}
              <div className="flex flex-col gap-2 flex-1">
                {statusEntries.length > 0 ? (
                  statusEntries.map(([status, count]) => {
                    // ✅ DRY: Pulls bg, text, and borderColor directly from config
                    const config = getStatusStyles(status);
                    return (
                      <div
                        key={status}
                        className={cn(
                          "flex justify-between items-center px-3 py-2.5 rounded-r-md border-l-[4px] shadow-sm bg-white",
                          config.bg,
                          config.borderColor,
                        )}
                      >
                        <span
                          className={cn(
                            "text-[11px] font-extrabold uppercase tracking-wide",
                            config.text,
                          )}
                        >
                          {STATUS_LABELS[status as TaskStatusType] ||
                            status.replace(/_/g, " ")}
                        </span>
                        <span className="text-sm font-bold text-[#0B1B3A] ml-2">
                          {count}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-2 opacity-60 mt-2">
                    <div className="border-2 border-gray-200 rounded-md p-1.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M16 2v4M8 2v4M3 10h18" />
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="18" y1="18" x2="12" y2="12" />
                        <line x1="12" y1="18" x2="18" y2="12" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      NO TASKS
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
