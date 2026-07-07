"use client";

import { useQuery } from '@tanstack/react-query';
import { getTasksCountPerProject } from '../services/statistics.service';
import { isApiError } from '@/types/apiError.types';
import { useRouter } from 'next/navigation';

export function useProjectsTasksCount(startDate: string, endDate: string) {
    const router = useRouter();
    const { data, isLoading, error } = useQuery({
        queryKey: ['statistics', 'projects-count', startDate, endDate],
        queryFn: async () => {
            try {
                return await getTasksCountPerProject({
                    p_start_date: startDate,
                    p_end_date: endDate,
                });
            } catch (err: unknown) {
                if (isApiError(err) && err.code === 401) {
                    router.push('/login');
                    throw err;
                }
                throw err;
            }
        },
    });

    const errorMessage = error ? (isApiError(error) ? error.msg : 'Failed to load projects') : null;

    return { projects: data || [], isLoading, error: errorMessage };
}