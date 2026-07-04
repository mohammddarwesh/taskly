"use client";

import { useCallback } from "react";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { getProjectTasks } from "../services/task.service";
import { TaskStatusType } from "../types/task.types";
import { taskKeys } from "./taskQueries";

interface UseProjectTasksOptions {
  projectId: string;
  mode?: "paginate" | "infinite";
  status?: TaskStatusType | null;
  pageSize?: number;
  search?: string;
}

export function useProjectTasks({
  projectId,
  mode = "paginate",
  status = null,
  pageSize = 20,
  search,
}: UseProjectTasksOptions) {
  const fetcher = useCallback(
    (limit: number, offset: number) =>
      getProjectTasks({ projectId, status, limit, offset, search }),
    [projectId, status, search],
  );

  const result = usePaginatedData({
    queryKey: taskKeys.list(projectId, { status, search }),
    fetcher,
    pageSize,
    searchValue: search,
    mode,
  });

  const { data, ...rest } = result;

  return {
    tasks: data,
    ...rest,
  };
}
