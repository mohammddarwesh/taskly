"use client";

import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { Task, TaskStatusType } from "../types/task.types";

export interface TaskListFilters {
  status?: TaskStatusType | null;
  search?: string;
}

export interface TaskListResponse {
  data: Task[];
  total: number;
}

export type TaskListCacheData =
  | TaskListResponse
  | InfiniteData<TaskListResponse, number>;

const normalizeSearch = (value?: string) => value?.trim() ?? "";

const normalizeFilters = (filters: TaskListFilters = {}) => ({
  status: filters.status ?? null,
  search: normalizeSearch(filters.search),
});

export const taskKeys = {
  all: (projectId: string) => ["project", projectId, "tasks"] as const,
  lists: (projectId: string) =>
    [...taskKeys.all(projectId), "list"] as const,
  list: (projectId: string, filters: TaskListFilters = {}) =>
    [...taskKeys.lists(projectId), normalizeFilters(filters)] as const,
  detail: (projectId: string, taskId: string | null) =>
    ["project", projectId, "task", taskId] as const,
};

export const isInfiniteTaskListData = (
  value: TaskListCacheData | undefined,
): value is InfiniteData<TaskListResponse, number> =>
  Boolean(
    value &&
      typeof value === "object" &&
      "pages" in value &&
      Array.isArray(value.pages),
  );

export const getTaskListFiltersFromKey = (
  queryKey: readonly unknown[],
): TaskListFilters => {
  const rawFilters = queryKey[4];

  if (!rawFilters || typeof rawFilters !== "object") {
    return { status: null, search: "" };
  }

  const filters = rawFilters as TaskListFilters;

  return {
    status: filters.status ?? null,
    search: normalizeSearch(filters.search),
  };
};

export const isInfiniteTaskListKey = (queryKey: readonly unknown[]) =>
  queryKey[5] === "infinite";

export const taskMatchesFilters = (
  task: Task,
  filters: TaskListFilters = {},
) => {
  const { status, search } = normalizeFilters(filters);

  if (status && task.status !== status) {
    return false;
  }

  if (!search) {
    return true;
  }

  return task.title.toLowerCase().includes(search.toLowerCase());
};

const removeTaskFromItems = (items: Task[], taskId: string) =>
  items.filter((task) => task.id !== taskId);

const replaceTaskInItems = (items: Task[], nextTask: Task) =>
  items.map((task) => (task.id === nextTask.id ? nextTask : task));

const updatePaginatedTaskList = (
  data: TaskListResponse,
  filters: TaskListFilters,
  previousTask: Task,
  nextTask: Task,
  isInfiniteList: boolean,
): TaskListResponse => {
  const matchedBefore = taskMatchesFilters(previousTask, filters);
  const matchedAfter = taskMatchesFilters(nextTask, filters);

  if (matchedBefore && matchedAfter) {
    return {
      ...data,
      data: replaceTaskInItems(data.data, nextTask),
    };
  }

  if (matchedBefore && !matchedAfter) {
    return {
      data: removeTaskFromItems(data.data, previousTask.id),
      total: Math.max(0, data.total - 1),
    };
  }

  if (!matchedBefore && matchedAfter) {
    if (!isInfiniteList) {
      return {
        ...data,
        total: data.total + 1,
      };
    }

    return {
      data: [nextTask, ...removeTaskFromItems(data.data, nextTask.id)],
      total: data.total + 1,
    };
  }

  return data;
};

export const updateTaskListCacheData = (
  currentData: TaskListCacheData | undefined,
  filters: TaskListFilters,
  previousTask: Task,
  nextTask: Task,
  isInfiniteList: boolean,
): TaskListCacheData | undefined => {
  if (!currentData) {
    return currentData;
  }

  if (!isInfiniteTaskListData(currentData)) {
    return updatePaginatedTaskList(
      currentData,
      filters,
      previousTask,
      nextTask,
      isInfiniteList,
    );
  }

  const updatedPages =
    currentData.pages.length > 0
      ? currentData.pages.map((page) =>
          updatePaginatedTaskList(
            page,
            filters,
            previousTask,
            nextTask,
            isInfiniteList,
          ),
        )
      : [
          updatePaginatedTaskList(
            { data: [], total: 0 },
            filters,
            previousTask,
            nextTask,
            isInfiniteList,
          ),
        ];

  return {
    ...currentData,
    pages: updatedPages,
  };
};

export const findTaskInTaskCaches = (
  queryClient: QueryClient,
  projectId: string,
  taskId: string,
) => {
  const detailTask = queryClient.getQueryData<Task>(
    taskKeys.detail(projectId, taskId),
  );

  if (detailTask) {
    return detailTask;
  }

  const taskLists = queryClient.getQueriesData<TaskListCacheData>({
    queryKey: taskKeys.lists(projectId),
  });

  for (const [, cachedData] of taskLists) {
    if (!cachedData) {
      continue;
    }

    if (isInfiniteTaskListData(cachedData)) {
      for (const page of cachedData.pages) {
        const foundTask = page.data.find((task) => task.id === taskId);
        if (foundTask) {
          return foundTask;
        }
      }
      continue;
    }

    const foundTask = cachedData.data.find((task) => task.id === taskId);
    if (foundTask) {
      return foundTask;
    }
  }

  return null;
};
