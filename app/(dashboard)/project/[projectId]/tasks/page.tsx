"use client";

import {
  notFound,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useMemo } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BoardHeader } from "@/features/tasks/components/BoardView/BoardHeader";
import { BoardView } from "@/features/tasks/components/BoardView";
import { ProjectTasksList } from "@/features/tasks/components/ListView";
import FloatingPlusBtn from "@/components/ui/FloatingPlusBtn";
import { TaskDetailsModal } from "@/features/tasks/components/TaskDetailsModal";
import { useSearch } from "@/hooks/useSearch";

export default function ProjectTasksPage() {
  const params = useParams();
  const projectId = params.projectId?.toString();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "board";
  const rawTaskId = searchParams.get("taskId");
  const router = useRouter();

  const { inputValue, setSearch, searchValue } = useSearch({
    searchParamKey: "search",
    debounceDelay: 300,
    resetPageOnSearch: true,
    pageParamKey: "page",
  });

  const modalState = useMemo(() => {
    if (rawTaskId) {
      return { isOpen: true, selectedTaskId: rawTaskId };
    }
    return { isOpen: false, selectedTaskId: null };
  }, [rawTaskId]);

  if (!projectId) notFound();

  const handleTaskClick = (taskId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("taskId", taskId);
    router.push(`/project/${projectId}/tasks?${params.toString()}`);
  };

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("taskId");
    router.push(`/project/${projectId}/tasks?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full h-full px-4 md:px-6 lg:px-8 pb-4 relative">
      <Breadcrumbs />
      <div className="mt-4 shrink-0">
        <BoardHeader
          view={view}
          projectId={projectId}
          inputValue={inputValue}
          onSearchChange={setSearch}
        />
      </div>

      <div className="flex-1 min-w-0 w-full h-full mt-2 relative pb-20 md:pb-0">
        {view === "board" ? (
          <BoardView
            projectId={projectId}
            onTaskClick={handleTaskClick}
            search={searchValue}
          />
        ) : view === "list" ? (
          <div className="h-full">
            <ProjectTasksList
              projectId={projectId}
              onTaskClick={handleTaskClick}
              search={searchValue}
            />
            <FloatingPlusBtn href={`/project/${projectId}/tasks/new`} />
          </div>
        ) : (
          <div className="flex justify-center py-20 text-[#434654]">
            View not found.
          </div>
        )}
      </div>

      <TaskDetailsModal
        projectId={projectId}
        taskId={modalState.selectedTaskId}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
