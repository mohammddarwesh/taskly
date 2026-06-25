"use client";

import { useEffect, useState } from "react";
import { getProjectTasks } from "@/features/tasks/services/task.service";
import { Task } from "@/features/tasks/types/task.types";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useEpicTasks(projectId: string, epicId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      setTasks([]);

      if (!epicId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProjectTasks({ projectId, epicId });
        setTasks(response.data);
      } catch (err) {
        const message = isApiError(err) ? err.msg : "Failed to load tasks";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId && epicId) {
      fetchTasks();
    }
  }, [projectId, epicId]);

  return { tasks, isLoading, error };
}
