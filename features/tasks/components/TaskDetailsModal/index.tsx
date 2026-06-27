// index.tsx
"use client";

import { Modal } from "@/components/ui/Modal";
import { useTaskDetails } from "../../hooks/useTaskDetails";
import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskDetailsBody } from "./TaskDetailsBody";
import { TaskDetailsSidebar } from "./TaskDetailsSidebar";
import { TaskDetailsFooter } from "./TaskDetailsFooter";
import { TaskDetailsSkeleton } from "./TaskDetailsSkeleton";

interface TaskDetailsModalProps {
  projectId: string;
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailsModal({
  projectId,
  taskId,
  isOpen,
  onClose,
}: TaskDetailsModalProps) {
  const { task, isLoading, error } = useTaskDetails(projectId, taskId);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      navigator.clipboard?.writeText(url).catch(() => {});
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
      hideHeader
      className="max-w-6xl h-[90vh] p-0 overflow-hidden rounded-xl bg-white"
    >
      {isLoading && <TaskDetailsSkeleton />}
      {error && (
        <div className="flex items-center justify-center h-full text-red-500 font-medium p-8">
          {error}
        </div>
      )}
      {!isLoading && !error && !task && (
        <div className="flex items-center justify-center h-full text-[#434654] p-8">
          Task not found
        </div>
      )}

      {!isLoading && task && (
        <div className="flex flex-col md:flex-row h-full w-full min-h-0">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col bg-white h-full min-h-0">
            <div className="px-8 py-6 border-b border-[#E8EDFF] shrink-0">
              <TaskDetailsHeader task={task} />
            </div>

            <div className="px-8 py-6 flex-1 bg-white overflow-y-auto">
              <TaskDetailsBody task={task} />
            </div>

            <div className="shrink-0 bg-[#F4F6FF] border-t border-[#E8EDFF]">
              <TaskDetailsFooter
                onClose={onClose}
                onCopyLink={handleCopyLink}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-[320px] h-full flex-shrink-0 bg-[#F4F6FF] border-t md:border-t-0 md:border-l border-[#E8EDFF] overflow-y-auto p-8 flex flex-col gap-6">
            <TaskDetailsSidebar task={task} />
          </div>
        </div>
      )}
    </Modal>
  );
}
