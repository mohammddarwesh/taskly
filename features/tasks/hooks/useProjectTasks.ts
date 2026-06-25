"use client";

import { useEffect, useState } from "react";
import { getProjectTasks } from "@/features/tasks/services/task.service";
import { Task, TaskStatusType } from "@/features/tasks/types/task.types";
import { isApiError } from "@/types/apiError.types";


export function useProjectTasks(projectId: string, status?: TaskStatusType | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getProjectTasks({ projectId, status });
        setTasks(res.data);
      } catch (err) {
        const message = isApiError(err) ? err.msg : "Failed to load tasks";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, status]);

  return { tasks, isLoading, error };
}