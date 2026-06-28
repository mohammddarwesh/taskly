"use client";

import { isApiError } from "@/types/apiError.types";
import { useCallback, useState } from "react";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

interface usePaginationOptions<T> {
  fetcher: (limit: number, offset: number) => Promise<PaginatedResponse<T>>;
  pageSize?: number;
  mode?: "replace" | "append";
}

interface UsePaginationReturn<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  fetchPage: (page: number) => Promise<void>;
}

export function usePagination<T>({
  fetcher,
  pageSize = 10,
  mode = "replace",
}: usePaginationOptions<T>): UsePaginationReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchPage = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      setIsLoading(true);
      setError(null);
      try {
        const offset = (page - 1) * pageSize;
        const { data: newData, total } = await fetcher(pageSize, offset);
        setTotalCount(total);
        setData((prev) =>
          mode === "append" ? [...prev, ...newData] : newData,
        );
      } catch (err) {
        setError(isApiError(err) ? err.msg : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [fetcher, mode, pageSize],
  );

  const setPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) fetchPage(page);
    },
    [totalPages, fetchPage],
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) fetchPage(currentPage + 1);
  }, [currentPage, totalPages, fetchPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) fetchPage(currentPage - 1);
  }, [currentPage, fetchPage]);

  return {
    data,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    nextPage,
    prevPage,
    fetchPage,
  };
}
