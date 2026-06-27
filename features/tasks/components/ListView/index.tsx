"use client";

import { useProjectTasks } from "@/features/tasks/hooks/useProjectTasks";
import { TaskTableHeader } from "./TaskTableHeader";
import { TaskTableRow } from "./TaskTableRow";
import { TaskTableFooter } from "./TaskTableFooter";
import { Task } from "@/features/tasks/types/task.types";

interface ProjectTasksListProps {
  projectId: string;
  onTaskClick?: (taskId: string) => void;
}

export function ProjectTasksList({
  projectId,
  onTaskClick,
}: ProjectTasksListProps) {
  const { tasks, isLoading, error } = useProjectTasks(projectId);

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
                  No tasks found.
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
      <TaskTableFooter total={tasks.length > 0 ? 24 : 0} shown={tasks.length} />
    </div>
  );
}
