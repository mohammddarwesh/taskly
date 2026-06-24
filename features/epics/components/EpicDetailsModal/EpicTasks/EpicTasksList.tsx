"use client";

import { EpicTaskRow } from "../EpicTaskRow";
import { Task } from "@/features/tasks/types/task.types";

interface EpicTasksListProps {
  tasks: Task[];
}

export function EpicTasksList({ tasks }: EpicTasksListProps) {
  return (
    <div className="border border-[#E8EDFF] rounded-xl bg-[#F9F9FF] p-2 divide-y divide-[#E8EDFF]">
      {tasks.map((task) => (
        <EpicTaskRow key={task.id} task={task} />
      ))}
    </div>
  );
}