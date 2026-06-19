'use client';

import { useProjectMembers } from '../hooks/useProjectMembers';
import { MembersTable } from './MembersTable';
import { MembersLoadingSkeleton } from './MembersLoadingSkeleton';
import { ErrorScreen } from '@/components/ErrorScreen';

interface Props {
  projectId: string;
}

export function MembersContent({ projectId }: Props) {
  const { members, isLoading, error } = useProjectMembers(projectId);

  if (isLoading) return <MembersLoadingSkeleton />;
  if (error) return <ErrorScreen message={error} onRetry={() => window.location.reload()} />;

  return <MembersTable members={members} />;
}