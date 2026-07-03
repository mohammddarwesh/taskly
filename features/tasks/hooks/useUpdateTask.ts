import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { updateTask } from "../services/task.service";
import { Task, TaskStatusType, UserInfo, EpicInfo } from "../types/task.types";
import { isApiError } from "@/types/apiError.types";

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
    const [isUpdating, setIsUpdating] = useState(false);

    const updateField = useCallback(
        async <K extends UpdatableField>(field: K, newValue: FieldValueMap[K]) => {
            const currentValue = getCurrentValue(task, field);

            if (isSameValue(field, currentValue, newValue)) return;

            const previousTask = task;
            const updatedTask = {
                ...task,
                [field]: newValue,
            } as Task;

            setTask(updatedTask);
            setIsUpdating(true);

            try {
                const payload = getPayload(field, newValue);
                await updateTask(projectId, task.id, payload);
                toast.success(`${field} updated`);
            } catch (err) {
                setTask(previousTask);
                const message = isApiError(err)
                    ? err.msg
                    : "Failed to update task. Please try again.";
                toast.error(message);
            } finally {
                setIsUpdating(false);
            }
        },
        [projectId, task, setTask]
    );

    return { updateField, isUpdating };
}