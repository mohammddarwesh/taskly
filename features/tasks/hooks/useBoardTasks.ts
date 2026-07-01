"use client";

import { useState, useCallback, useEffect } from "react";
import {
  TaskStatus,
  TaskStatusType,
  Task,
} from "@/features/tasks/types/task.types";
import {
  getProjectTasks,
  updateTaskStatus,
} from "@/features/tasks/services/task.service";
import { toast } from "react-toastify";

export function useBoardTasks(projectId: string, search?: string) {
  const [tasksByStatus, setTasksByStatus] = useState<
    Record<TaskStatusType, Task[]>
  >(
    Object.values(TaskStatus).reduce(
      (acc, s) => ({ ...acc, [s]: [] }),
      {} as Record<TaskStatusType, Task[]>,
    ),
  );
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getProjectTasks({
        projectId,
        search,
        limit: 1000,
      });
      const grouped = Object.values(TaskStatus).reduce(
        (acc, s) => {
          acc[s] = data.filter((t) => t.status === s);
          return acc;
        },
        {} as Record<TaskStatusType, Task[]>,
      );
      setTasksByStatus(grouped);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [projectId, search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const moveTask = useCallback(
    async (taskId: string, newStatus: TaskStatusType) => {
      // Find current status
      let oldStatus: TaskStatusType | null = null;
      let task: Task | null = null;
      for (const [status, tasks] of Object.entries(tasksByStatus)) {
        const found = tasks.find((t) => t.id === taskId);
        if (found) {
          oldStatus = status as TaskStatusType;
          task = found;
          break;
        }
      }
      if (!oldStatus || !task || oldStatus === newStatus) return;

      // Optimistic update
      const prevState = { ...tasksByStatus };
      setTasksByStatus((prev) => {
        const newState = { ...prev };
        newState[oldStatus] = newState[oldStatus].filter(
          (t) => t.id !== taskId,
        );
        newState[newStatus] = [...newState[newStatus], task];
        return newState;
      });

      // Persist
      try {
        await updateTaskStatus(taskId, projectId, newStatus);
      } catch (error) {
        setTasksByStatus(prevState);
        toast.error("Failed to update task status. Please try again.");
      }
    },
    [projectId, tasksByStatus],
  );

  return { tasksByStatus, loading, moveTask, refetch: fetchTasks };
}
