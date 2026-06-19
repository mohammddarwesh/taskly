'use client';

import { ErrorScreen } from '@/components/ErrorScreen';
import { useProjectEpics } from '../hooks/useProjectEpics';
import { EpicsList } from './EpicsList';
import { EpicsLoadingSkeleton } from './EpicsLoadingSkeleton';
import Image from 'next/image';

interface Props {
  projectId: string;
}

export function EpicsContent({ projectId }: Props) {
  const { epics, isLoading, error } = useProjectEpics(projectId);

  if (isLoading) return <EpicsLoadingSkeleton />;
  if (error) return <ErrorScreen message={error} onRetry={() => window.location.reload()} />;

  const total = epics.length;
  const shown = epics.length > 6 ? 6 : epics.length;

  return (
    <>
      <EpicsList epics={epics} />

      <div className="flex items-center justify-between pt-12 pb-8">
        <span className="text-sm font-medium text-[#434654]">
          Showing {shown} of {total} epics
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-[rgba(195,198,214,0.3)] rounded bg-white hover:bg-gray-50 transition-colors">
            <Image src="/icons/arrowLeft.svg" alt="Previous" width={4.32} height={7} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#003D9B] border border-[rgba(195,198,214,0.3)] rounded text-white font-bold text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white border border-[rgba(195,198,214,0.3)] rounded text-[#434654] font-bold text-sm hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-[rgba(195,198,214,0.3)] rounded bg-white hover:bg-gray-50 transition-colors">
            <Image src="/icons/arrowRight.svg" alt="Next" width={4.32} height={7} />
          </button>
        </div>
      </div>
    </>
  );
}