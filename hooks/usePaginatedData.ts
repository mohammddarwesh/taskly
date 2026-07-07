"use client";

import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useIsMobile } from "@/libs/useIsMobile";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { isApiError } from "@/types/apiError.types";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

interface UsePaginatedDataOptions<T> {
  queryKey: readonly unknown[];
  fetcher: (
    limit: number,
    offset: number,
  ) => Promise<PaginatedResponse<T>>;
  pageSize?: number;
  searchValue?: string;
  mode?: "paginate" | "infinite";
}

export function usePaginatedData<T>({
  queryKey,
  fetcher,
  pageSize = 6,
  searchValue = "",
  mode: explicitMode,
}: UsePaginatedDataOptions<T>) {
  const isMobile = useIsMobile();
  const mode = explicitMode ?? (isMobile ? "infinite" : "paginate");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = Math.max(
    1,
    Number.parseInt(searchParams.get("page") || "1", 10) || 1,
  );

  const paginatedQuery = useQuery({
    queryKey: [...queryKey, "page", pageFromUrl, pageSize],
    queryFn: () => fetcher(pageSize, (pageFromUrl - 1) * pageSize),
    enabled: mode === "paginate",
    placeholderData: keepPreviousData,
  });

  const infiniteQuery = useInfiniteQuery({
    queryKey: [...queryKey, "infinite", pageSize],
    queryFn: ({ pageParam }) => fetcher(pageSize, (pageParam - 1) * pageSize),
    initialPageParam: 1,
    enabled: mode === "infinite",
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce(
        (total, page) => total + page.data.length,
        0,
      );

      return loadedItems < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const data =
    mode === "paginate"
      ? paginatedQuery.data?.data ?? []
      : (infiniteQuery.data?.pages.flatMap((page) => page.data) ?? []);

  const totalCount =
    mode === "paginate"
      ? paginatedQuery.data?.total ?? 0
      : infiniteQuery.data?.pages[0]?.total ?? 0;

  const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0;
  const currentPage =
    mode === "paginate" ? pageFromUrl : infiniteQuery.data?.pages.length ?? 1;
  const isLoading =
    mode === "paginate" ? paginatedQuery.isLoading : infiniteQuery.isLoading;
  const isLoadingMore =
    mode === "infinite" && infiniteQuery.isFetchingNextPage;

  const errorSource =
    mode === "paginate" ? paginatedQuery.error : infiniteQuery.error;

  const error = errorSource
    ? isApiError(errorSource)
      ? errorSource.msg
      : "An unexpected error occurred"
    : null;

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
      if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
        void infiniteQuery.fetchNextPage();
      }
    }
  }, [
    currentPage,
    infiniteQuery,
    mode,
    setPage,
    totalPages,
  ]);

  const { sentinelRef } = useInfiniteScroll(
    isLoadingMore,
    mode === "infinite" && Boolean(infiniteQuery.hasNextPage),
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
    refetch:
      mode === "paginate" ? paginatedQuery.refetch : infiniteQuery.refetch,
    sentinelRef,
    hasMore:
      mode === "paginate"
        ? currentPage < totalPages
        : Boolean(infiniteQuery.hasNextPage),
    isEmpty: !isLoading && !error && totalCount === 0,
    isInitialLoading: isLoading && data.length === 0,
    showPagination: mode === "paginate" && totalPages > 1,
    showInfiniteScroll: mode === "infinite" && Boolean(infiniteQuery.hasNextPage),
    showLoadingMore: isLoadingMore && data.length > 0,
    isFetching:
      mode === "paginate" ? paginatedQuery.isFetching : infiniteQuery.isFetching,
    searchValue,
  };
}
