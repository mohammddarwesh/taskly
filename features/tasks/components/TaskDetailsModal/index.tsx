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
  const { task, isLoading, error, setTask } = useTaskDetails(projectId, taskId);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      hideHeader
      className="w-[min(1120px,calc(100vw-32px))] overflow-auto rounded-[20px] bg-white p-0 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
    >
      {isLoading && <TaskDetailsSkeleton />}

      {error && (
        <div className="flex h-full items-center justify-center p-8 text-sm font-medium text-red-500">
          {error}
        </div>
      )}

      {!isLoading && !error && !task && (
        <div className="flex h-full items-center justify-center p-8 text-sm text-[#434654]">
          Task not found
        </div>
      )}

      {!isLoading && task && (
        <div className="flex h-full min-h-0 w-full flex-col md:flex-row">
          {/* Left content */}
          <section className="flex min-h-0 flex-1 flex-col bg-white">
            <div className="shrink-0 border-b border-[#E7ECF8] px-8 pt-8 pb-6">
              <TaskDetailsHeader
                task={task}
                projectId={projectId}
                setTask={setTask}
              />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-8 py-7">
              <TaskDetailsBody
                task={task}
                projectId={projectId}
                setTask={setTask}
              />
            </div>

            <div className="hidden md:block shrink-0 border-t border-[#E7ECF8] bg-[#F7F9FF]">
              <TaskDetailsFooter
                onClose={onClose}
                onCopyLink={handleCopyLink}
              />
            </div>
          </section>

          {/* Right sidebar */}
          <aside className="w-full shrink-0 border-t border-[#E7ECF8] bg-[#F7F9FF] md:w-[320px] md:border-l md:border-t-0">
            <div className="h-full overflow-y-auto px-8 py-8">
              <TaskDetailsSidebar
                task={task}
                projectId={projectId}
                setTask={setTask}
              />
            </div>
          </aside>
        </div>
      )}
    </Modal>
  );
}
