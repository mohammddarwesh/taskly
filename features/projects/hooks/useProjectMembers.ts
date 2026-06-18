import { useEffect, useState } from 'react';
import { getProjectMembers } from '../services/project.service';
import { ProjectMember } from '../types/project.types';
import { isApiError } from '@/types/apiError.types';
import { toast } from 'react-toastify';

export function useProjectMembers(projectId: string) {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getProjectMembers(projectId);
        setMembers(data);
        setError(null);
      } catch (err) {
        const message = isApiError(err) ? err.msg : 'Failed to load project members';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    if (projectId) fetchMembers();
  }, [projectId]);

  return { members, isLoading, error };
}