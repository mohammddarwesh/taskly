"use client";

import { TaskStatusType } from "@/features/tasks/types/task.types";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { STATUS_LABELS, StatusCounts } from "../types/statistics.types";
import { getStatusHexColor } from "../utils/statusHelpers";

interface TasksChartProps {
  totals: StatusCounts | undefined;
  totalTasks: number;
}

type ChartDataItem = {
  name: string;
  statusKey: string;
  value: number;
  color: string;
};

type PieShapeProps = PieSectorDataItem & {
  payload?: ChartDataItem;
};

function CustomSlice(props: PieShapeProps) {
  return (
    <Sector {...props} fill={props.payload?.color ?? "#6B7280"} stroke="none" />
  );
}

export function TasksChart({ totals, totalTasks }: TasksChartProps) {
  if (!totals) return null;

  const chartData: ChartDataItem[] = Object.entries(totals)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: STATUS_LABELS[key as TaskStatusType] || key,
      statusKey: key,
      value,
      color: getStatusHexColor(key),
    }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-[#E9EEF8] bg-white text-gray-400 shadow-sm">
        No tasks available
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EEF8] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-[22px] font-bold text-[#0B1B3A] md:text-[24px]">
          Tasks By Status
        </h3>

        <button className="shrink-0 text-sm font-bold text-[#1D4ED8] hover:underline">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-[180px] sm:w-[210px] md:w-[240px] lg:w-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="72%"
                  outerRadius="100%"
                  paddingAngle={0}
                  stroke="none"
                  shape={CustomSlice}
                  isAnimationActive={false}
                />
                <Tooltip
                  formatter={(value) =>
                    typeof value === "number" ? `${value} Tasks` : value
                  }
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[34px] font-bold leading-none text-[#23262F] sm:text-[40px] md:text-[44px]">
                {totalTasks}
              </span>
              <span className="mt-1 text-[14px] font-bold leading-none text-[#A0A8B8] sm:text-[16px] md:text-[18px]">
                Total
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <ul className="flex flex-col gap-4 overflow-y-auto pr-2">
            {chartData.map((entry) => (
              <li key={entry.statusKey} className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span
                      className="truncate text-[16px] font-medium text-[#0B1B3A] md:text-[18px]"
                      title={entry.name}
                    >
                      {entry.name}
                    </span>
                  </div>

                  <span className="shrink-0 text-[16px] font-bold text-[#0B1B3A] md:text-[18px]">
                    {entry.value}
                  </span>
                </div>

                <div className="mt-3 hidden h-2 w-full overflow-hidden rounded-full bg-[#E8EEFF] md:block">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(entry.value / maxValue) * 100}%`,
                      backgroundColor: entry.color,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
