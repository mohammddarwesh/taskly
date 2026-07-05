"use client";

import { useQuery } from '@tanstack/react-query';
import { getTasksCalendarStats } from '../services/statistics.service';
import { isApiError } from '@/types/apiError.types';
import { useRouter } from 'next/navigation';

export function useStatisticsCalendar(params: { start: string; end: string; projectId: string | null; status: string | null }) {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['statistics', 'calendar', params.start, params.end, params.projectId, params.status],
        queryFn: async () => {
            try {
                return await getTasksCalendarStats({
                    p_start_date: params.start,
                    p_end_date: params.end,
                    p_project_id: params.projectId,
                    p_status: params.status,
                });
            } catch (err: unknown) {
                if (isApiError(err) && err.code === 401) {
                    router.push('/login');
                    throw err;
                }
                throw err;
            }
        },
        placeholderData: (prev) => prev,
    });

    const errorMessage = error ? (isApiError(error) ? error.msg : 'Failed to load statistics') : null;

    return { stats: data, isLoading, error: errorMessage, refetch };
}