"use client";

import { isApiError } from "@/types/apiError.types";
import { useCallback, useEffect, useState } from "react";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
interface usePaginationOptions<T> {
  fetcher: (limit: number, offset: number) => Promise<PaginatedResponse<T>>;
  pageSize?: number;
  onAuthError?: () => void;
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
}

export function usePagination<T>({
  fetcher,
  pageSize = 10,
  mode = "replace",
  //   onAuthError,
}: usePaginationOptions<T>): UsePaginationReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
        if (mode === "append") {
          setData((prev) => [...prev, ...newData]);
        } else {
          setData(newData);
        }
      } catch (err) {
        if (isApiError(err)) {
          setError(err?.msg || "Failed to get projects");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetcher, mode, pageSize],
  );
  useEffect(() => {
    const initialFetch = async () => {
      await fetchPage(1);
    };
    initialFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        fetchPage(page);
      }
    },
    [totalPages, fetchPage],
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchPage(nextPage);
    }
  }, [currentPage, totalPages, fetchPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      const PrevPage = currentPage - 1;
      fetchPage(PrevPage);
    }
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
  };
}
