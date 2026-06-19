import { useEffect, useState } from 'react';
import { getProjectEpics } from '../services/epic.service';
import { Epic } from '../types/epic.types';
import { isApiError } from '@/types/apiError.types';
import { toast } from 'react-toastify';

export function useProjectEpics(projectId: string) {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpics = async () => {
      try {
        const data = await getProjectEpics(projectId);
        setEpics(data);
        setError(null);
      } catch (err) {
        const message = isApiError(err) ? err.msg : 'Failed to load epics';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) fetchEpics();
  }, [projectId]);

  return { epics, isLoading, error };
}