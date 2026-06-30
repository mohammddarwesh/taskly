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
  mode?: "paginate" | "infinite";
}

export function usePaginatedData<T>({
  fetcher,
  pageSize = 6,
  searchValue = "",
  mode: explicitMode,
}: UsePaginatedDataOptions<T>) {
  const isMobile = useIsMobile();
  const mode = explicitMode ?? (isMobile ? "infinite" : "paginate");
  const paginationMode = mode === "infinite" ? "append" : "replace";

  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const hasMounted = useRef(false);
  const lastFetchKeyRef = useRef<string>("");
  const prevSearchRef = useRef(searchValue);

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
    mode: paginationMode,
  });

  useEffect(() => {
    const pageToLoad = mode === "paginate" ? pageFromUrl : 1;
    const key = `${pageToLoad}-${searchValue}`;

    if (!hasMounted.current) {
      hasMounted.current = true;
      lastFetchKeyRef.current = key;
      prevSearchRef.current = searchValue;
      fetchPage(pageToLoad);
      return;
    }

    if (key !== lastFetchKeyRef.current) {
      const isSearchChange = searchValue !== prevSearchRef.current;
      lastFetchKeyRef.current = key;
      prevSearchRef.current = searchValue;
      fetchPage(pageToLoad, { reset: isSearchChange });
    }
  }, [pageFromUrl, searchValue, mode, fetchPage]);

  const setPage = useCallback(
    (page: number) => {
      if (mode === "paginate") {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", page.toString());
        router.push(`?${newParams.toString()}`, { scroll: false });
      }
    },
    [mode, searchParams, router],
  );

  const nextPage = useCallback(() => {
    if (mode === "paginate") {
      if (currentPage < totalPages) setPage(currentPage + 1);
    } else {
      if (currentPage < totalPages) fetchPage(currentPage + 1);
    }
  }, [mode, currentPage, totalPages, setPage, fetchPage]);

  const { sentinelRef } = useInfiniteScroll(
    isLoading,
    mode === "infinite" && currentPage < totalPages,
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
    hasMore: currentPage < totalPages,
    isEmpty: !isLoading && !error && totalCount === 0,
    isInitialLoading: isLoading && data.length === 0,
    showPagination: mode === "paginate" && totalPages > 1,
    showInfiniteScroll: mode === "infinite" && currentPage < totalPages,
    showLoadingMore: isLoading && data.length > 0 && mode === "infinite",
  };
}
