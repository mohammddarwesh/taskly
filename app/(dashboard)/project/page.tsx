"use client";

import { useProjectsPage } from "@/features/projects/hooks/useProjectsPage";
import { Pagination } from "@/components/Pagination";
import { ProjectListHeader } from "@/features/projects/components/ProjectListHeader";
import { ProjectListGrid } from "@/features/projects/components/ProjectListGrid";
import { ProjectsLoadingState } from "@/features/projects/components/ProjectsLoadingState";
import { ProjectsErrorState } from "@/features/projects/components/ProjectsErrorState";
import { ProjectsEmptyState } from "@/features/projects/components/ProjectsEmptyState";
import { ProjectsInfiniteScrollLoader } from "@/features/projects/components/ProjectsInfiniteScrollLoader";
import FloatingPlusBtn from "@/components/ui/FloatingPlusBtn";

export default function ProjectsPage() {
  const {
    projects,
    currentPage,
    totalPages,
    isLoading,
    error,
    setPage,
    sentinelRef,
    showPagination,
    showInfiniteScroll,
    showLoadingMore,
    isEmpty,
    isInitialLoading,
  } = useProjectsPage();

  return (
    <div className="space-y-6 h-full">
      {isInitialLoading && <ProjectsLoadingState count={6} />}

      {error && !isLoading && (
        <ProjectsErrorState
          message={error}
          onRetry={() => setPage(currentPage)}
        />
      )}

      {isEmpty && <ProjectsEmptyState />}

      {projects.length > 0 && !error && (
        <>
          <ProjectListHeader />
          <ProjectListGrid projects={projects} />
        </>
      )}
      <FloatingPlusBtn href="/project/add" />
      {showPagination && (
        <div className="hidden md:block mt-33">
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
    </div>
  );
}
