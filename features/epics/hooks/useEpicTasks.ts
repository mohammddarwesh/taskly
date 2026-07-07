"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectTasks } from "@/features/tasks/services/task.service";
import { isApiError } from "@/types/apiError.types";

export function useEpicTasks(projectId: string, epicId: string | null) {
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["project", projectId, "epic", epicId, "tasks"],
    queryFn: async () => {
      const response = await getProjectTasks({ projectId, epicId: epicId! });
      return response.data;
    },
    enabled: !!projectId && !!epicId,
  });

  const errorMessage = error ? (isApiError(error) ? error.msg : "Failed to load tasks") : null;

  return { tasks, isLoading, error: errorMessage };
}
