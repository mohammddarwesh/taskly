"use client";

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/project.service';
import { isApiError } from '@/types/apiError.types';

export function useProjects() {
    const router = useRouter();
    const { data: projects = null, isLoading, error, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            try {
                return await getProjects();
            } catch (err: unknown) {
                if (isApiError(err) && err.code === 401) {
                    router.push('/login');
                    throw err;
                }
                throw err;
            }
        }
    });

    const errorMessage = error ? (isApiError(error) ? error.msg : 'Failed to load projects') : null;

    return { projects, isLoading, error: errorMessage, retry: refetch };
}