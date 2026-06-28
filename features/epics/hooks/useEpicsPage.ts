"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useIsMobile } from "@/libs/useIsMobile";
import { getProjectEpicsPaginated } from "../services/epic.service";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchParams, useRouter } from "next/navigation";

export function useEpicsPage(projectId: string) {
  const isMobile = useIsMobile();
  const mode = isMobile ? "append" : "replace";
  const pageSize = 6;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const searchFromUrl = searchParams.get("search") || "";

  const hasMounted = useRef(false);
  const lastFetchKeyRef = useRef<string>("");

  const fetcher = useCallback(
    (limit: number, offset: number) =>
      getProjectEpicsPaginated(
        limit,
        offset,
        projectId,
        searchFromUrl || undefined,
      ),
    [projectId, searchFromUrl],
  );

  const {
    data: epics,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    fetchPage,
  } = usePagination({
    fetcher,
    pageSize,
    mode,
  });

  // Fetch whenever page or search changes (after mount)
  useEffect(() => {
    const pageToLoad = !isMobile ? pageFromUrl : 1;
    const key = `${pageToLoad}-${searchFromUrl}`;

    if (!hasMounted.current) {
      hasMounted.current = true;
      lastFetchKeyRef.current = key;
      fetchPage(pageToLoad);
      return;
    }

    if (key !== lastFetchKeyRef.current) {
      lastFetchKeyRef.current = key;
      fetchPage(pageToLoad);
    }
  }, [pageFromUrl, searchFromUrl, isMobile, fetchPage]);

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

  const updateSearch = useCallback(
    (value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();
      if (trimmed) {
        newParams.set("search", trimmed);
      } else {
        newParams.delete("search");
      }
      newParams.set("page", "1");
      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router],
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
    search: searchFromUrl,
    updateSearch,
    isEmpty: !isLoading && !error && totalCount === 0,
    isInitialLoading: isLoading && epics.length === 0,
    showPagination: !isMobile && totalPages > 1,
    showInfiniteScroll: isMobile && currentPage < totalPages,
    showLoadingMore: isLoading && epics.length > 0 && isMobile,
  };
}
