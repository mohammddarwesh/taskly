"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getProjectTasks } from "../services/task.service";
import { TaskStatusType } from "../types/task.types";

type FetchMode = "paginate" | "infinite";

export function useProjectTasks(
  projectId: string,
  mode: FetchMode = "paginate",
  status?: TaskStatusType | null,
  pageSize: number = 6,
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const hasMounted = useRef(false);

  const {
    data: tasks,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    fetchPage,
  } = usePagination({
    fetcher: (limit, offset) =>
      getProjectTasks({ projectId, status, limit, offset }),
    pageSize,
    mode: mode === "infinite" ? "append" : "replace",
  });

  useEffect(() => {
    const pageToLoad = mode === "paginate" ? pageFromUrl : 1;
    if (!hasMounted.current) {
      hasMounted.current = true;
      fetchPage(pageToLoad);
      return;
    }
    if (mode === "paginate" && currentPage !== pageFromUrl) {
      fetchPage(pageFromUrl);
    }
  }, [pageFromUrl, mode, fetchPage, currentPage]);

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
    "0px 0px 150px 0px",
  );

  return {
    tasks,
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
    isInitialLoading: isLoading && tasks.length === 0,
    showPagination: mode === "paginate" && totalPages > 1,
    showInfiniteScroll: mode === "infinite" && currentPage < totalPages,
    showLoadingMore: isLoading && tasks.length > 0 && mode === "infinite",
  };
}
