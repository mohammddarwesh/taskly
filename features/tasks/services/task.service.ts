import { apiClient } from "@/libs/api-client";
import { CreateTaskFormValues } from "../schemas/task.schema";
import { Task } from "../types/task.types";

export async function createTask(
  projectId: string,
  data: CreateTaskFormValues,
): Promise<{ id: string }> {
  return apiClient<{ id: string }>(`/api/projects/${projectId}/tasks`, {
    method: "POST",
    body: {
      project_id: projectId,
      title: data.title,
      status: data.status,
      epic_id: data.epic_id ?? null,
      assignee_id: data.assignee_id ?? null,
      due_date: data.due_date ?? null,
      description: data.description ?? null,
    },
  });
}

export async function getProjectTasks(
  projectId: string,
  epicId?: string | null
): Promise<{ data: Task[]; total: number }> {
  let url = `/api/projects/${projectId}/tasks`;
  if (epicId) {
    url += `?epic_id=${epicId}`;
  }
  return apiClient<{ data: Task[]; total: number }>(url);
}