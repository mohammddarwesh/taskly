"use client";

import { useProjectTasks } from "@/features/tasks/hooks/useProjectTasks";
import { TaskTableHeader } from "./TaskTableHeader";
import { TaskTableRow } from "./TaskTableRow";
import { Pagination } from "@/components/Pagination";

interface ProjectTasksListProps {
  projectId: string;
  onTaskClick?: (taskId: string) => void;
  search?: string;
}

export function ProjectTasksList({
  projectId,
  onTaskClick,
  search,
}: ProjectTasksListProps) {
  const {
    tasks,
    currentPage,
    totalPages,
    setPage,
    totalCount,
    isLoading,
    error,
  } = useProjectTasks({
    projectId,
    mode: "paginate",
    pageSize: 20,
    search,
  });

  return (
    <div className="w-full bg-white rounded-xl border border-[#E8EDFF] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left border-collapse">
          <TaskTableHeader />
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  <div className="w-5 h-5 border-2 border-[#D7E2FF] border-t-[#0052CC] rounded-full animate-spin mx-auto mb-2" />
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!isLoading && !error && tasks.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-[#737685]">
                  {search
                    ? "No tasks found matching your search"
                    : "No tasks found for this project."}
                </td>
              </tr>
            )}
            {!isLoading &&
              !error &&
              tasks.map((task) => (
                <TaskTableRow
                  key={task.id}
                  task={task}
                  onTaskClick={onTaskClick}
                />
              ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
