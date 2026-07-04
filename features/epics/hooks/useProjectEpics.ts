"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectEpics } from "../services/epic.service";
import { isApiError } from "@/types/apiError.types";

export function useProjectEpics(projectId: string) {
  const { data: epics = [], isLoading, error } = useQuery({
    queryKey: ["project", projectId, "epics"],
    queryFn: async () => {
      const response = await getProjectEpics(projectId);
      return response.data;
    },
    enabled: !!projectId,
  });

  const errorMessage = error ? (isApiError(error) ? error.msg : "Failed to load epics") : null;

  return { epics, isLoading, error: errorMessage };
}
