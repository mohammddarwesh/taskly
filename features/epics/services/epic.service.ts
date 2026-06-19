import { apiClient } from "@/libs/api-client";
import { CreateEpicFormValues } from "../schemas/create-epic.schema";
import { Epic } from "../types/epic.types";

interface PaginatedEpics {
  data: Epic[];
  total: number;
}

export async function createEpic(
  projectId: string,
  data: CreateEpicFormValues,
): Promise<Epic> {
  return apiClient<Epic>(`/api/projects/${projectId}/epics`, {
    method: "POST",
    body: {
      project_id: projectId,
      title: data.title,
      description: data.description || "",
      assignee_id: data.assignee_id || null,
      deadline: data.deadline || null,
    },
  });
}

export async function getProjectEpics(
  projectId: string,
): Promise<Epic[]> {
  return apiClient<Epic[]>(`/api/projects/${projectId}/epics`);
}

export async function getProjectEpicsPaginated(
  limit: number,
  offset: number,
  projectId: string,
): Promise<PaginatedEpics> {
  return apiClient<PaginatedEpics>(
    `/api/projects/${projectId}/epics?limit=${limit}&offset=${offset}`
  );
}