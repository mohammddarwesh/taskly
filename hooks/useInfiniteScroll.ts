import { useCallback, useEffect, useRef } from "react";

export function useInfiniteScroll(
  isLoading: boolean,
  hasMore: boolean,
  onLoadMore: () => void,
  rootMargin: string = "0px 0px 150px 0px",
) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore],
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin,
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [handleObserver, rootMargin]);
  return { sentinelRef };
}
