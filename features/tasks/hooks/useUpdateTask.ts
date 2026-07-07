"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../services/task.service";
import { Task, TaskStatusType, UserInfo, EpicInfo } from "../types/task.types";
import { isApiError } from "@/types/apiError.types";
import {
    TaskListCacheData,
    getTaskListFiltersFromKey,
    isInfiniteTaskListKey,
    taskKeys,
    updateTaskListCacheData,
} from "./taskQueries";

type UpdatableField =
    | "title"
    | "description"
    | "status"
    | "assignee"
    | "epic"
    | "due_date";

type FieldValueMap = {
    title: string;
    description: string | null;
    status: TaskStatusType;
    assignee: UserInfo | null;
    epic: EpicInfo | null;
    due_date: string | null;
};

type UpdatePayload = Partial<{
    title: string;
    description: string | null;
    status: TaskStatusType;
    assignee_id: string | null;
    epic_id: string | null;
    due_date: string | null;
}>;

const getPayload = <K extends UpdatableField>(
    field: K,
    value: FieldValueMap[K]
): UpdatePayload => {
    switch (field) {
        case "title":
            return { title: value as string };
        case "description":
            return { description: value as string | null };
        case "status":
            return { status: value as TaskStatusType };
        case "assignee":
            return { assignee_id: (value as UserInfo | null)?.id ?? null };
        case "epic":
            return { epic_id: (value as EpicInfo | null)?.id ?? null };
        case "due_date":
            return { due_date: value as string | null };
    }
};

const getCurrentValue = (task: Task, field: UpdatableField) => {
    switch (field) {
        case "assignee":
            return task.assignee;
        case "epic":
            return task.epic;
        default:
            return task[field as keyof Task];
    }
};

const isSameValue = (field: UpdatableField, a: unknown, b: unknown) => {
    if (field === "assignee" || field === "epic") {
        return (a as { id?: string } | null)?.id === (b as { id?: string } | null)?.id;
    }
    return a === b;
};

export function useUpdateTask(
    projectId: string,
    task: Task,
    setTask: (task: Task) => void
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ field, newValue }: { field: UpdatableField; newValue: FieldValueMap[typeof field] }) => {
            const payload = getPayload(field, newValue);
            return updateTask(projectId, task.id, payload);
        },
        onMutate: async ({ field, newValue }) => {
            await queryClient.cancelQueries({ queryKey: taskKeys.all(projectId) });

            const previousTask = task;
            const updatedTask = {
                ...task,
                [field]: newValue,
            } as unknown as Task;
            const previousDetail = queryClient.getQueryData(taskKeys.detail(projectId, task.id));
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

            setTask(updatedTask);
            queryClient.setQueryData(taskKeys.detail(projectId, task.id), updatedTask);

            return { previousTask, previousDetail, previousTaskLists, updatedTask };
        },
        onError: (err, variables, context) => {
            if (context?.previousTask) {
                setTask(context.previousTask);
            }

            if (context?.previousTaskLists) {
                for (const [queryKey, cachedData] of context.previousTaskLists) {
                    queryClient.setQueryData(queryKey, cachedData);
                }
            }

            if (context?.previousTask) {
                queryClient.setQueryData(
                    taskKeys.detail(projectId, task.id),
                    context.previousDetail ?? context.previousTask,
                );
            }

            const message = isApiError(err)
                ? err.msg
                : "Failed to update task. Please try again.";
            toast.error(message);
        },
        onSuccess: (_data, variables, context) => {
            if (context?.updatedTask) {
                queryClient.setQueryData(
                    taskKeys.detail(projectId, task.id),
                    context.updatedTask,
                );
            }
            toast.success(`${variables.field} updated`);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: taskKeys.detail(projectId, task.id) });
            queryClient.invalidateQueries({ queryKey: taskKeys.all(projectId) });
        },
    });

    const updateField = useCallback(
        async <K extends UpdatableField>(field: K, newValue: FieldValueMap[K]) => {
            const currentValue = getCurrentValue(task, field);
            if (isSameValue(field, currentValue, newValue)) return;
            mutation.mutate({ field, newValue });
        },
        [task, mutation]
    );

    return { updateField, isUpdating: mutation.isPending };
}
