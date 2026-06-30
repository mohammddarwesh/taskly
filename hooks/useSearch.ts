"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface UseSearchOptions {
  searchParamKey?: string;
  debounceDelay?: number;
  resetPageOnSearch?: boolean;
  pageParamKey?: string;
}

interface UseSearchReturn {
  inputValue: string;
  searchValue: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
  hasSearch: boolean;
  isDebouncing: boolean;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const {
    searchParamKey = "search",
    debounceDelay = 400,
    resetPageOnSearch = true,
    pageParamKey = "page",
  } = options;

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchFromUrl = searchParams.get(searchParamKey) || "";
  const [inputValue, setInputValue] = useState(searchFromUrl);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isInternalUpdate = useRef(false);

  // Sync input when URL changes (back/forward)
  useEffect(() => {
    if (!isInternalUpdate.current) {
      setInputValue(searchFromUrl);
    }
    isInternalUpdate.current = false;
  }, [searchFromUrl]);

  const updateSearchInUrl = useCallback(
    (value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();

      if (trimmed) {
        newParams.set(searchParamKey, trimmed);
      } else {
        newParams.delete(searchParamKey);
      }

      if (resetPageOnSearch) {
        newParams.set(pageParamKey, "1");
      }

      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router, searchParamKey, resetPageOnSearch, pageParamKey],
  );

  const setSearch = useCallback(
    (value: string) => {
      setInputValue(value);
      isInternalUpdate.current = true;
      setIsDebouncing(true);

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setIsDebouncing(false);
        updateSearchInUrl(value);
      }, debounceDelay);
    },
    [debounceDelay, updateSearchInUrl],
  );

  const clearSearch = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  return {
    inputValue,
    searchValue: searchFromUrl,
    setSearch,
    clearSearch,
    hasSearch: searchFromUrl.length > 0,
    isDebouncing,
  };
}
