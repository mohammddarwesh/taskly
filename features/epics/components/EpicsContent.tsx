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
import { Epic } from "../types/epic.types";
import { EpicHeader } from "./EpicHeader";

interface Props {
  projectId: string;
}

export function EpicsContent({ projectId }: Props) {
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
    isMobile,
    isEmpty,
    isInitialLoading,
    showPagination,
    showInfiniteScroll,
    showLoadingMore,
    search,
    updateSearch,
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

  return (
    <>
      <EpicHeader
        projectId={projectId}
        searchValue={search}
        onSearchChange={updateSearch}
      />

      {isEmpty && (
        <div className="text-center py-12 text-[#434654]">
          {search
            ? "No epics found matching your search"
            : "No epics found for this project."}
        </div>
      )}

      {epics.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-[#434654]">
              {!isMobile && `Showing ${epics.length} of ${totalCount} epics`}
              {isMobile && `${totalCount} epics`}
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
        </>
      )}

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
