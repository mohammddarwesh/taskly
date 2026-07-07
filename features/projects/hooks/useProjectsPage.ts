"use client";

import { usePaginatedData } from "@/hooks/usePaginatedData";
import { getProjectsPaginated } from "../services/project.service";

export function useProjectsPage() {
  const {
    data: projects,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    nextPage,
    sentinelRef,
    isEmpty,
    isInitialLoading,
    showPagination,
    showInfiniteScroll,
    showLoadingMore,
  } = usePaginatedData({
    queryKey: ["projects", "paginated"],
    fetcher: getProjectsPaginated,
    pageSize: 6,
  });

  return {
    projects,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    nextPage,
    sentinelRef,
    isEmpty,
    isInitialLoading,
    showPagination,
    showInfiniteScroll,
    showLoadingMore,
  };
}
