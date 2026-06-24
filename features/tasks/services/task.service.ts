import { apiClient } from "@/libs/api-client";
import { CreateTaskFormValues } from "../schemas/task.schema";

export const taskService = {
  async createTask(
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
  },
};