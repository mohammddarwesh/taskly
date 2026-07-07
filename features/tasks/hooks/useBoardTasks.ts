"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatusType, Task } from "@/features/tasks/types/task.types";
import { updateTaskStatus } from "@/features/tasks/services/task.service";
import { toast } from "react-toastify";
import { useCallback } from "react";
import {
  findTaskInTaskCaches,
  getTaskListFiltersFromKey,
  isInfiniteTaskListKey,
  TaskListCacheData,
  taskKeys,
  updateTaskListCacheData,
} from "./taskQueries";

export function useBoardTasks(projectId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, newStatus }: { taskId: string; newStatus: TaskStatusType }) =>
      updateTaskStatus(taskId, projectId, newStatus),
    onMutate: async ({ taskId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all(projectId) });

      const previousTask = findTaskInTaskCaches(queryClient, projectId, taskId);

      if (!previousTask || previousTask.status === newStatus) {
        return null;
      }

      const previousDetail = queryClient.getQueryData(
        taskKeys.detail(projectId, taskId),
      );
      const updatedTask: Task = { ...previousTask, status: newStatus };

      const previousTaskLists = queryClient.getQueriesData<TaskListCacheData>({
        queryKey: taskKeys.lists(projectId),
      });

      for (const [queryKey, cachedData] of previousTaskLists) {
        const key = queryKey as readonly unknown[];
        const filters = getTaskListFiltersFromKey(key);
        const isInfiniteList = isInfiniteTaskListKey(key);

        queryClient.setQueryData(
          queryKey,
          updateTaskListCacheData(
            cachedData,
            filters,
            previousTask,
            updatedTask,
            isInfiniteList,
          ),
        );
      }

      queryClient.setQueryData(taskKeys.detail(projectId, taskId), updatedTask);

      return {
        previousTask,
        previousTaskLists,
        previousDetail,
      };
    },
    onError: (err, variables, context) => {
      if (context?.previousTaskLists) {
        for (const [queryKey, cachedData] of context.previousTaskLists) {
          queryClient.setQueryData(queryKey, cachedData);
        }
      }

      if (context?.previousTask) {
        queryClient.setQueryData(
          taskKeys.detail(projectId, variables.taskId),
          context.previousDetail ?? context.previousTask,
        );
      }

      toast.error("Failed to update task status. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all(projectId) });
    }
  });

  const moveTask = useCallback(
    async (taskId: string, newStatus: TaskStatusType) => {
      return mutation.mutateAsync({ taskId, newStatus });
    },
    [mutation],
  );

  return { moveTask };
}
