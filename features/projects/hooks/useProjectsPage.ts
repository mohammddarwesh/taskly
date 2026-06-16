import { usePagination } from "@/hooks/usePagination";
import { useIsMobile } from "@/libs/useIsMobile";
import { getProjectsPaginated } from "../services/project.service";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function useProjectsPage() {
  const isMobile = useIsMobile();
  const mode = isMobile ? "append" : "replace";
  const pageSize = 10;

  const {
    data: projects,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    nextPage,
  } = usePagination({ fetcher: getProjectsPaginated, pageSize, mode });

  const { sentinelRef } = useInfiniteScroll(
    isLoading,
    currentPage < totalPages,
    nextPage,
  );
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
    isMobile,
    isEmpty: !isLoading && !error && totalCount === 0,
    isInitialLoading: isLoading && projects.length === 0,
    showPagination: !isMobile && totalPages > 1,
    showInfiniteScroll: isMobile && currentPage < totalPages,
    showLoadingMore: isLoading && projects.length > 0 && isMobile,
  };
}
