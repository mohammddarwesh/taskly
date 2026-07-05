"use client";

import { CalendarView } from "@/features/statistics/components/CalendarView";
import { FiltersBar } from "@/features/statistics/components/FiltersBar";
import { KPICards } from "@/features/statistics/components/KPICards";
import { ProjectsList } from "@/features/statistics/components/ProjectsList";
import { TasksChart } from "@/features/statistics/components/TasksChart";
import { useProjectsTasksCount } from "@/features/statistics/hooks/useProjectsTasksCount";
import { useStatisticsCalendar } from "@/features/statistics/hooks/useStatisticsCalendar";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { useCallback, useState } from "react";

export default function MyStatisticsPage() {
  const defaultStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const defaultEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  const [filters, setFilters] = useState({
    start: format(defaultStart, "yyyy-MM-dd"),
    end: format(defaultEnd, "yyyy-MM-dd"),
    projectId: null as string | null,
    status: null as string | null,
  });

  const { stats } = useStatisticsCalendar({
    start: filters.start,
    end: filters.end,
    projectId: filters.projectId,
    status: filters.status,
  });

  const { projects } = useProjectsTasksCount(filters.start, filters.end);

  const handleFiltersApply = useCallback(
    (params: {
      start: string;
      end: string;
      projectId: string | null;
      status: string | null;
    }) => {
      setFilters(params);
    },
    [],
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 bg-[#F8F9FE] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Weekly Planner</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your deadlines and track team velocity.
          </p>
        </div>

        <FiltersBar onApply={handleFiltersApply} />
        <KPICards stats={stats} />
        <CalendarView
          data={stats?.daily || []}
          startDate={filters.start}
          endDate={filters.end}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TasksChart
            totals={stats?.totals}
            totalTasks={stats?.total_tasks || 0}
          />
          <ProjectsList projects={projects} />
        </div>
      </div>
    </>
  );
}
