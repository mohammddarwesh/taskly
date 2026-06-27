"use client";

import { useEffect, useState } from "react";
import { getTaskById } from "@/features/tasks/services/task.service";
import { Task } from "@/features/tasks/types/task.types";
import { isApiError } from "@/types/apiError.types";

export function useTaskDetails(projectId: string, taskId: string | null) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || !taskId) return;

    let isMounted = true;

    const fetchTask = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTaskById(projectId, taskId);
        if (isMounted) {
          setTask(data);
        }
      } catch (err) {
        if (isMounted) {
          const message = isApiError(err) ? err.msg : "Failed to load task details";
          setError(message);
          setTask(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTask();

    return () => {
      isMounted = false;
    };
  }, [projectId, taskId]);

  return { task, isLoading, error };
}