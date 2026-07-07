"use client";

import { cn } from "@/libs/utils";
import { CalendarStatsResponse } from "../types/statistics.types";
import { ClipboardList, CheckCircle, AlertTriangle } from "lucide-react";

interface KPICardsProps {
  stats: CalendarStatsResponse | undefined;
}

export function KPICards({ stats }: KPICardsProps) {
  const kpis = [
    {
      title: "TOTAL TASKS",
      value: stats?.total_tasks || 0,
      icon: ClipboardList,
      boxColor: "bg-blue-50 text-blue-600",
      numberColor: "text-gray-900",
    },
    {
      title: "COMPLETED TASKS",
      value: stats?.done_tasks || 0,
      icon: CheckCircle,
      boxColor: "bg-green-50 text-green-600",
      numberColor: "text-gray-900",
    },
    {
      title: "OVERDUE TASKS",
      value: stats?.overdue_tasks || 0,
      icon: AlertTriangle,
      boxColor: "bg-red-50 text-red-600",
      numberColor: "text-[#BA1A1A]", // Exact Red from the screenshot
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm"
        >
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {kpi.title}
            </p>
            <p className={cn("text-3xl font-bold mt-1", kpi.numberColor)}>
              {kpi.value}
            </p>
          </div>
          <div className={cn("p-3 rounded-lg", kpi.boxColor)}>
            <kpi.icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
