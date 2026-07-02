import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { updateTask } from "../services/task.service";
import { Task, TaskStatusType, UserInfo, EpicInfo } from "../types/task.types";
import { isApiError } from "@/types/apiError.types";

type UpdatableField = "title" | "description" | "status" | "assignee" | "epic" | "due_date";

type UpdatePayload = Partial<{
    title: string;
    description: string | null;
    status: TaskStatusType;
    assignee_id: string | null;
    epic_id: string | null;
    due_date: string | null;
}>;

export function useUpdateTask(
    projectId: string,
    task: Task,
    setTask: (task: Task) => void,
) {
    const [isUpdating, setIsUpdating] = useState(false);

    const updateField = useCallback(
        async <K extends UpdatableField>(
            field: K,
            newValue: K extends "assignee" ? UserInfo | null : K extends "epic" ? EpicInfo | null : Task[K],
        ) => {
            let currentValue: any;
            if (field === "assignee") currentValue = task.assignee;
            else if (field === "epic") currentValue = task.epic;
            else currentValue = task[field as keyof Task];

            if (newValue === currentValue) return;

            const previousTask = { ...task };
            const updatedTask = { ...task, [field]: newValue };
            setTask(updatedTask);
            setIsUpdating(true);

            const payload: UpdatePayload = {};
            if (field === "title") payload.title = newValue as string;
            else if (field === "description") payload.description = (newValue as string | null);
            else if (field === "status") payload.status = newValue as TaskStatusType;
            else if (field === "assignee") {
                payload.assignee_id = (newValue as UserInfo | null)?.id ?? null;
            } else if (field === "epic") {
                payload.epic_id = (newValue as EpicInfo | null)?.id ?? null;
            } else if (field === "due_date") payload.due_date = newValue as string | null;

            try {
                await updateTask(projectId, task.id, payload);
                toast.success(`${String(field)} updated`);
            } catch (err) {
                setTask(previousTask);
                const message = isApiError(err) ? err.msg : "Failed to update task. Please try again.";
                toast.error(message);
            } finally {
                setIsUpdating(false);
            }
        },
        [projectId, task, setTask],
    );

    return { updateField, isUpdating };
}