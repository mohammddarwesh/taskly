'use client';

import { ErrorScreen } from '@/components/ErrorScreen';
import { useEpicsPage } from '../hooks/useEpicsPage';
import { EpicsList } from './EpicsList';
import { EpicsLoadingSkeleton } from './EpicsLoadingSkeleton';
import { Pagination } from '@/components/Pagination';
import { ProjectsInfiniteScrollLoader } from '@/features/projects/components/ProjectsInfiniteScrollLoader';

interface Props {
  projectId: string;
}

export function EpicsContent({ projectId }: Props) {
  const {
    epics,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    sentinelRef,
    isMobile,
    isEmpty,
    isInitialLoading,
    showPagination,
    showInfiniteScroll,
    showLoadingMore,
  } = useEpicsPage(projectId);

  if (isInitialLoading) return <EpicsLoadingSkeleton />;

  if (error && !isLoading) {
    return <ErrorScreen message={error} onRetry={() => setPage(currentPage)} />;
  }

  if (isEmpty) {
    return (
      <div className="text-center py-12 text-[#434654]">
        No epics found for this project.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-[#434654]">
          {!isMobile && `Showing ${epics.length} of ${totalCount} epics`}
          {isMobile && `${totalCount} epics`}
        </span>
      </div>

      <EpicsList epics={epics} />

      {showPagination && (
        <div className="hidden md:block mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <ProjectsInfiniteScrollLoader
        sentinelRef={sentinelRef}
        isLoading={showLoadingMore}
        show={showInfiniteScroll}
      />
    </>
  );
}