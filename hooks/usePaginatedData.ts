"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePagination } from "./usePagination";
import { useSearchParams, useRouter } from "next/navigation";
import { useIsMobile } from "@/libs/useIsMobile";
import { useInfiniteScroll } from "./useInfiniteScroll";

interface UsePaginatedDataOptions<T> {
  fetcher: (
    limit: number,
    offset: number,
  ) => Promise<{ data: T[]; total: number }>;
  pageSize?: number;
  searchValue?: string;
  projectId?: string;
}

export function usePaginatedData<T>({
  fetcher,
  pageSize = 6,
  searchValue = "",
}: UsePaginatedDataOptions<T>) {
  const isMobile = useIsMobile();
  const mode = isMobile ? "append" : "replace";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const hasMounted = useRef(false);
  const lastFetchKeyRef = useRef<string>("");

  const {
    data,
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

  useEffect(() => {
    const pageToLoad = !isMobile ? pageFromUrl : 1;
    const key = `${pageToLoad}-${searchValue}`;

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
  }, [pageFromUrl, searchValue, isMobile, fetchPage]);

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
    data,
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
    isInitialLoading: isLoading && data.length === 0,
    showPagination: !isMobile && totalPages > 1,
    showInfiniteScroll: isMobile && currentPage < totalPages,
    showLoadingMore: isLoading && data.length > 0 && isMobile,
  };
}
