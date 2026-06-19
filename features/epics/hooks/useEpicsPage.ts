import { useCallback } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useIsMobile } from "@/libs/useIsMobile";
import { getProjectEpicsPaginated } from "../services/epic.service";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function useEpicsPage(projectId: string) {
  const isMobile = useIsMobile();
  const mode = isMobile ? "append" : "replace";
  const pageSize = 6;

  // 🔒 Stable fetcher – changes only when projectId changes
  const fetcher = useCallback(
    (limit: number, offset: number) =>
      getProjectEpicsPaginated(limit, offset, projectId),
    [projectId],
  );

  const {
    data: epics,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    nextPage,
  } = usePagination({
    fetcher,
    pageSize,
    mode,
  });

  const { sentinelRef } = useInfiniteScroll(
    isLoading,
    currentPage < totalPages,
    nextPage,
  );

  return {
    epics,
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
    isInitialLoading: isLoading && epics.length === 0,
    showPagination: !isMobile && totalPages > 1,
    showInfiniteScroll: isMobile && currentPage < totalPages,
    showLoadingMore: isLoading && epics.length > 0 && isMobile,
  };
}
