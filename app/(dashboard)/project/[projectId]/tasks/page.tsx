"use client";

import {
  notFound,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation"; // ✅ Correct router import
import { useMemo } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BoardHeader } from "@/features/tasks/components/BoardView/BoardHeader";
import { BoardView } from "@/features/tasks/components/BoardView";
import { ProjectTasksList } from "@/features/tasks/components/ListView";
import FloatingPlusBtn from "@/components/ui/FloatingPlusBtn";
import { TaskDetailsModal } from "@/features/tasks/components/TaskDetailsModal";

export default function ProjectTasksPage() {
  const params = useParams();
  const projectId = params.projectId?.toString();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "board";
  const rawTaskId = searchParams.get("taskId");
  const router = useRouter();

  const modalState = useMemo(() => {
    if (rawTaskId) {
      return { isOpen: true, selectedTaskId: rawTaskId };
    }
    return { isOpen: false, selectedTaskId: null };
  }, [rawTaskId]);

  if (!projectId) notFound();

  const handleTaskClick = (taskId: string) => {
    router.push(`/project/${projectId}/tasks?view=${view}&taskId=${taskId}`);
  };

  const handleCloseModal = () => {
    router.push(`/project/${projectId}/tasks?view=${view}`);
  };

  return (
    <div className="flex flex-col w-full h-full px-4 md:px-6 lg:px-8 pb-4 relative">
      <Breadcrumbs />
      <div className="mt-4 shrink-0">
        <BoardHeader view={view} projectId={projectId} />
      </div>

      <div className="flex-1 min-w-0 w-full h-full mt-2 relative pb-20 md:pb-0">
        {view === "board" ? (
          <BoardView projectId={projectId} onTaskClick={handleTaskClick} />
        ) : view === "list" ? (
          <div className="h-full">
            <ProjectTasksList
              projectId={projectId}
              onTaskClick={handleTaskClick}
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
