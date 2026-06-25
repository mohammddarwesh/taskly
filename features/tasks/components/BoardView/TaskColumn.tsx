"use client";

import { useRouter } from "next/navigation";
import { TaskStatusType } from "@/features/tasks/types/task.types";
import { statusConfig } from "@/features/tasks/utils/statusConfig";
import { ColumnHeader } from "./_components/ColumnHeader";
import { TaskListContent } from "./_components/TaskListContent";
import { AddTaskDashedButton } from "./_components/AddTaskDashedButton";
import { useProjectTasks } from "../../hooks/useProjectTasks";

interface TaskColumnProps {
  projectId: string;
  status: TaskStatusType;
}

export function TaskColumn({ projectId, status }: TaskColumnProps) {
  const router = useRouter();
  const config = statusConfig[status] || statusConfig.TO_DO;
  const { tasks, isLoading, error } = useProjectTasks(projectId, status);

  const handleAddTask = () => {
    router.push(`/project/${projectId}/tasks/new?status=${status}`);
  };

  return (
    <div className="flex flex-col min-w-[288px] h-full bg-[#F9F9FF] border border-[#E8EDFF] rounded-xl p-4 min-h-75 gap-4">
      <ColumnHeader
        status={status}
        count={tasks.length}
        config={config}
        onAddTask={handleAddTask}
      />
      <div className="hidden md:flex mt-auto pt-4">
        <AddTaskDashedButton onClick={handleAddTask} />
      </div>
      <TaskListContent tasks={tasks} isLoading={isLoading} error={error} />
    </div>
  );
}
