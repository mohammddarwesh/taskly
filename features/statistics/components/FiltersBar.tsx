"use client";

import { Select } from "@/components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDays,
  endOfWeek,
  format,
  parseISO,
  startOfWeek,
  subDays,
} from "date-fns";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useProjectsTasksCount } from "../hooks/useProjectsTasksCount";
import { STATUS_OPTIONS } from "../types/statistics.types";
import { DateRangePicker } from "./DateRangePicker";

const filterSchema = z.object({
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  projectId: z.string(),
  status: z.string(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface FiltersBarProps {
  onApply: (params: {
    start: string;
    end: string;
    projectId: string | null;
    status: string | null;
  }) => void;
}

const ALL_PROJECTS_OPTION = { value: "ALL", label: "All Projects" };
const ALL_STATUSES_OPTION = { value: "ALL", label: "All Statuses" };

export function FiltersBar({ onApply }: FiltersBarProps) {
  const defaultStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const defaultEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  const { register, setValue, getValues, control } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      startDate: format(defaultStart, "yyyy-MM-dd"),
      endDate: format(defaultEnd, "yyyy-MM-dd"),
      projectId: "ALL",
      status: "ALL",
    },
  });

  const startDate = useWatch({ control, name: "startDate" }) ?? "";
  const endDate = useWatch({ control, name: "endDate" }) ?? "";
  const projectId = useWatch({ control, name: "projectId" }) ?? "ALL";
  const status = useWatch({ control, name: "status" }) ?? "ALL";

  const { projects: scopedProjects } = useProjectsTasksCount(
    startDate,
    endDate,
  );

  useEffect(() => {
    if (startDate && endDate) {
      onApply({
        start: startDate,
        end: endDate,
        projectId: projectId === "ALL" ? null : projectId,
        status: status === "ALL" ? null : status,
      });
    }
  }, [startDate, endDate, projectId, status, onApply]);

  const handleNavigateWeek = (direction: "prev" | "next") => {
    const currentStart = parseISO(getValues("startDate"));
    const newStart =
      direction === "prev"
        ? subDays(currentStart, 7)
        : addDays(currentStart, 7);
    const newEnd = addDays(newStart, 6);
    setValue("startDate", format(newStart, "yyyy-MM-dd"));
    setValue("endDate", format(newEnd, "yyyy-MM-dd"));
  };

  const projectOptions = useMemo(() => {
    if (!scopedProjects) return [ALL_PROJECTS_OPTION];
    return [
      ALL_PROJECTS_OPTION,
      ...scopedProjects.map((p) => ({
        value: p.project_id,
        label: p.project_name,
      })),
    ];
  }, [scopedProjects]);

  const statusOptions = useMemo(
    () => [ALL_STATUSES_OPTION, ...STATUS_OPTIONS],
    [],
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F0F4FF] rounded-xl px-4 py-3 mb-8 shadow-sm">
      {/* Date Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleNavigateWeek("prev")}
          className="p-1 hover:bg-white/50 rounded text-gray-500 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <DateRangePicker
          startDate={getValues("startDate")}
          endDate={getValues("endDate")}
          onChange={(start: string, end: string) => {
            setValue("startDate", start);
            setValue("endDate", end);
          }}
          maxDays={7}
        />

        <button
          onClick={() => handleNavigateWeek("next")}
          className="p-1 hover:bg-white/50 rounded text-gray-500 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-4">
        <Select
          options={projectOptions}
          className="min-w-[160px] bg-white border-0 rounded-lg py-2 px-3 text-sm font-medium text-gray-800 shadow-sm"
          {...register("projectId")}
        />
        <Select
          options={statusOptions}
          className="min-w-[160px] bg-white border-0 rounded-lg py-2 px-3 text-sm font-medium text-gray-800 shadow-sm"
          {...register("status")}
        />
      </div>
    </div>
  );
}
