import { apiClient } from '@/libs/api-client';
import { AddProjectFormValues } from '../schemas/add-project.schema';

export async function createProject(data: AddProjectFormValues) {
    const response = await apiClient('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    });


    return response
}