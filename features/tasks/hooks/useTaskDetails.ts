"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById } from "@/features/tasks/services/task.service";
import { Task } from "@/features/tasks/types/task.types";
import { isApiError } from "@/types/apiError.types";
import { useCallback } from "react";
import { taskKeys } from "./taskQueries";

export function useTaskDetails(projectId: string, taskId: string | null) {
  const queryClient = useQueryClient();
  const queryKey = taskKeys.detail(projectId, taskId);

  const { data: task, isLoading, error } = useQuery<Task>({
    queryKey,
    queryFn: () => getTaskById(projectId, taskId!),
    enabled: !!projectId && !!taskId,
  });

  const setTask = useCallback((updatedTask: Task) => {
    queryClient.setQueryData(queryKey, updatedTask);
  }, [queryClient, queryKey]);

  const errorMessage = error
    ? isApiError(error)
      ? error.msg
      : "Failed to load task details"
    : null;

  return {
    task: task ?? null,
    isLoading,
    error: errorMessage,
    setTask,
  };
}
