"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useIsMobile } from "@/libs/useIsMobile";
import { getProjectsPaginated } from "../services/project.service";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchParams, useRouter } from "next/navigation";

export function useProjectsPage() {
  const isMobile = useIsMobile();
  const mode = isMobile ? "append" : "replace";
  const pageSize = 6;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const hasMounted = useRef(false);

  const {
    data: projects,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    fetchPage,
  } = usePagination({
    fetcher: getProjectsPaginated,
    pageSize,
    mode,
  });

  useEffect(() => {
    const pageToLoad = !isMobile ? pageFromUrl : 1;
    if (!hasMounted.current) {
      hasMounted.current = true;
      fetchPage(pageToLoad);
      return;
    }
    if (!isMobile && currentPage !== pageFromUrl) {
      fetchPage(pageFromUrl);
    }
  }, [pageFromUrl, isMobile, fetchPage, currentPage]);

  const setPage = useCallback(
    (page: number) => {
      if (!isMobile) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", page.toString());
        router.push(`?${newParams.toString()}`, { scroll: false });
      }
    },
    [isMobile, searchParams, router],
  );

  const nextPage = useCallback(() => {
    if (isMobile) {
      if (currentPage < totalPages) fetchPage(currentPage + 1);
    } else {
      if (currentPage < totalPages) setPage(currentPage + 1);
    }
  }, [isMobile, currentPage, totalPages, fetchPage, setPage]);

  const { sentinelRef } = useInfiniteScroll(
    isLoading,
    isMobile && currentPage < totalPages,
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
