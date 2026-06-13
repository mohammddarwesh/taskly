'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '../types/project.types';
import { getProjects } from '../services/project.service';
import { isApiError } from '@/types/apiError.types';

export function useProjects() {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);   // start as loading
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Manual retry (for the Error screen button)
    const retry = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err: unknown) {
            if (isApiError(err) && err.code === 401) {
                router.push('/login');
                return;
            }
            setError(isApiError(err) ? err.msg : 'Failed to load projects');
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        let cancelled = false;

        const fetchInitial = async () => {
            try {
                const data = await getProjects();
                if (!cancelled) {
                    setProjects(data);
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    if (isApiError(err) && err.code === 401) {
                        router.push('/login');
                        return;
                    }
                    setError(isApiError(err) ? err.msg : 'Failed to load projects');
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchInitial();
        return () => {
            cancelled = true;
        };
    }, [router]);

    return { projects, isLoading, error, retry };
}