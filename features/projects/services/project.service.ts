import { apiClient } from '@/libs/api-client';
import { AddProjectFormValues } from '../schemas/add-project.schema';
import { Project } from '../types/project.types';

export async function createProject(data: AddProjectFormValues) {
    const response = await apiClient('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    });


    return response
}

export async function getProjects(): Promise<Project[]> {
    return apiClient<Project[]>('/api/projects');
}


interface PaginatedProjects {
    data: Project[];
    total: number;
}

export async function getProjectsPaginated(limit: number, offset: number): Promise<PaginatedProjects> {
    return apiClient(`/api/projects?limit=${limit}&offset=${offset}`)

}

export async function getProjectById(id: string): Promise<Project> {
  return apiClient<Project>(`/api/projects/${id}`);
}

export async function updateProject(id: string, data: { name: string; description?: string }) {
  return apiClient(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
}