"use client";

import { useCallback } from "react";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { getProjectEpicsPaginated } from "../services/epic.service";
import { useSearch } from "@/hooks/useSearch";

export function useEpicsPage(projectId: string) {
  const { searchValue: search } = useSearch({
    searchParamKey: "search",
    debounceDelay: 400,
    resetPageOnSearch: true,
    pageParamKey: "page",
  });

  const fetcher = useCallback(
    (limit: number, offset: number) =>
      getProjectEpicsPaginated(limit, offset, projectId, search || undefined),
    [projectId, search],
  );

  const { data, ...rest } = usePaginatedData({
    queryKey: ["project", projectId, "epics", { search }],
    fetcher,
    pageSize: 6,
    searchValue: search,
  });

  return {
    ...rest,
    epics: data,
    search,
  };
}
