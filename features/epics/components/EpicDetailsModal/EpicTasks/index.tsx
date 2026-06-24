"use client";

import { Task } from "@/features/tasks/types/task.types";
import { EpicTasksHeader } from "./EpicTasksHeader";
import { EpicTasksLoading } from "./EpicTasksLoading";
import { EpicTasksError } from "./EpicTasksError";
import { EpicTaskItem } from "./EpicTaskItem";
import { EpicTasksAddCard } from "./EpicTasksAddCard";
import { EpicTasksEmpty } from "./EpicTasksEmpty";

interface EpicTasksProps {
  onAddTask?: () => void;
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export function EpicTasks({
  onAddTask,
  tasks,
  isLoading,
  error,
}: EpicTasksProps) {
  return (
    <div className="border-t border-[#E8EDFF] pt-4 space-y-4">
      <EpicTasksHeader count={tasks.length} onAddTask={onAddTask} />

      {isLoading && <EpicTasksLoading />}
      {error && <EpicTasksError />}

      {!isLoading && !error && tasks.length === 0 && <EpicTasksEmpty />}

      {!isLoading && !error && tasks.length > 0 && (
        <div className="flex flex-col gap-3 md:gap-0">
          <div className="md:border md:border-[#E8EDFF] md:rounded-xl md:bg-[#F9F9FF] md:divide-y md:divide-[#E8EDFF]">
            {tasks.map((task) => (
              <EpicTaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
      <EpicTasksAddCard />
    </div>
  );
}
