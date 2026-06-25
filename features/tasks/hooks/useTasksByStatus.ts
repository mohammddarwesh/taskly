"use client";

import { useEffect, useState } from "react";
import { Task, TaskStatusType } from "../types/task.types";
import { getProjectTasks } from "../services/task.service";
import { isApiError } from "@/types/apiError.types";

export function useTasksByStatus(projectId: string, status: TaskStatusType) {
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
        const message = isApiError(err)
          ? err.msg
          : `Failed to load ${status} tasks`;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, status]);

  return { tasks, isLoading, error };
}
