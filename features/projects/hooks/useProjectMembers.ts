"use client";

import { useQuery } from '@tanstack/react-query';
import { getProjectMembers } from '../services/project.service';
import { isApiError } from '@/types/apiError.types';

export function useProjectMembers(projectId: string) {
  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['project', projectId, 'members'],
    queryFn: () => getProjectMembers(projectId),
    enabled: !!projectId,
  });

  const errorMessage = error ? (isApiError(error) ? error.msg : 'Failed to load project members') : null;

  return { members, isLoading, error: errorMessage };
}