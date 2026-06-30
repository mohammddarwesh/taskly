"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorScreen } from "@/components/ErrorScreen";
import { useEpicsPage } from "../hooks/useEpicsPage";
import { EpicsList } from "./EpicsList";
import { EpicsLoadingSkeleton } from "./EpicsLoadingSkeleton";
import { Pagination } from "@/components/Pagination";
import { ProjectsInfiniteScrollLoader } from "@/features/projects/components/ProjectsInfiniteScrollLoader";
import { EpicDetailsModal } from "./EpicDetailsModal";
import { EpicHeader } from "./EpicHeader";
import { Epic } from "../types/epic.types";

interface EpicsContentInnerProps {
  projectId: string;
}

export function EpicsContentInner({ projectId }: EpicsContentInnerProps) {
  const router = useRouter();
  const [selectedEpic, setSelectedEpic] = useState<Epic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    epics,
    currentPage,
    totalPages,
    totalCount,
    isLoading,
    error,
    setPage,
    sentinelRef,
    isEmpty,
    isInitialLoading,
    showPagination,
    showInfiniteScroll,
    showLoadingMore,
    search,
  } = useEpicsPage(projectId);

  const handleEpicClick = (epic: Epic) => {
    setSelectedEpic(epic);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEpic(null);
  };

  const handleUpdateSuccess = () => {
    setPage(currentPage);
  };

  const handleTaskClick = (taskId: string) => {
    router.push(`/project/${projectId}/tasks?taskId=${taskId}`);
  };

  if (isInitialLoading) return <EpicsLoadingSkeleton />;

  if (error && !isLoading) {
    return <ErrorScreen message={error} onRetry={() => setPage(currentPage)} />;
  }

  if (isEmpty) {
    return (
      <div className="text-center  text-[#434654]">
        {search ? (
          <>
            <EpicHeader projectId={projectId} />
            <p>No epics found matching your search</p>
          </>
        ) : (
          "No epics found for this project."
        )}
      </div>
    );
  }

  return (
    <>
      <EpicHeader projectId={projectId} />

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-[#434654]">
          { `Showing ${epics.length} of ${totalCount} epics`}
          {/* {isMobile && `${totalCount} epics`} */}
        </span>
      </div>

      <EpicsList epics={epics} onEpicClick={handleEpicClick} />

      {showPagination && (
        <div className="hidden md:block mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <ProjectsInfiniteScrollLoader
        sentinelRef={sentinelRef}
        isLoading={showLoadingMore}
        show={showInfiniteScroll}
      />

      {selectedEpic && (
        <EpicDetailsModal
          projectId={projectId}
          epic={selectedEpic}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onUpdate={handleUpdateSuccess}
          onTaskClick={handleTaskClick}
        />
      )}
    </>
  );
}
