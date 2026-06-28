"use client";

import { useProjectsPage } from "../hooks/useProjectsPage";
import { ProjectsPageView } from "./ProjectsPageView";

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
    <ProjectsPageView
      projects={projects}
      currentPage={currentPage}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      setPage={setPage}
      sentinelRef={sentinelRef}
      showPagination={showPagination}
      showInfiniteScroll={showInfiniteScroll}
      showLoadingMore={showLoadingMore}
      isEmpty={isEmpty}
      isInitialLoading={isInitialLoading}
    />
  );
}
