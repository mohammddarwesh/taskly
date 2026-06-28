"use client";

import { Pagination } from "@/components/Pagination";
import { ProjectListHeader } from "./ProjectListHeader";
import { ProjectListGrid } from "./ProjectListGrid";
import { ProjectsLoadingState } from "./ProjectsLoadingState";
import { ProjectsErrorState } from "./ProjectsErrorState";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import { ProjectsInfiniteScrollLoader } from "./ProjectsInfiniteScrollLoader";
import FloatingPlusBtn from "@/components/ui/FloatingPlusBtn";
import { Project } from "../types/project.types";

interface ProjectsPageViewProps {
  projects: Project[]; // replace with proper Project type
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  showPagination: boolean;
  showInfiniteScroll: boolean;
  showLoadingMore: boolean;
  isEmpty: boolean;
  isInitialLoading: boolean;
}

export function ProjectsPageView({
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
}: ProjectsPageViewProps) {
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
