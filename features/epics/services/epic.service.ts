import { apiClient } from "@/libs/api-client";
import { EpicFormValues } from "../schemas/epic.schema";
import { Epic } from "../types/epic.types";

interface PaginatedEpics {
  data: Epic[];
  total: number;
}

export async function createEpic(
  projectId: string,
  data: EpicFormValues,
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
): Promise<{ data: Epic[]; total: number }> {
  return apiClient<{ data: Epic[]; total: number }>(
    `/api/projects/${projectId}/epics`,
  );
}

export async function getProjectEpicsPaginated(
  limit: number,
  offset: number,
  projectId: string,
  search?: string,
): Promise<PaginatedEpics> {
  let url = `/api/projects/${projectId}/epics?limit=${limit}&offset=${offset}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  return apiClient<PaginatedEpics>(url);
}

export async function updateEpic(
  projectId: string,
  epicId: string,
  data: Partial<EpicFormValues>,
): Promise<void> {
  await apiClient(`/api/projects/${projectId}/epics/${epicId}`, {
    method: "PATCH",
    body: data,
  });
}
