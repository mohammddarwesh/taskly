import { RefObject } from "react";

interface ProjectsInfiniteScrollLoaderProps {
  sentinelRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  show: boolean;          // only render when there are more pages on mobile
}

export function ProjectsInfiniteScrollLoader({
  sentinelRef,
  isLoading,
  show,
}: ProjectsInfiniteScrollLoaderProps) {
  if (!show) return null;

  return (
    <>
      <div ref={sentinelRef} className="h-10" />
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}
    </>
  );
}