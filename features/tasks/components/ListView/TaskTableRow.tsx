"use client";

import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/libs/utils";
import { Task } from "@/features/tasks/types/task.types";
import { TaskStatusPill } from "../TaskStatusPill"; 

interface TaskTableRowProps {
  task: Task;
  onClick?: (task: Task) => void;
}

export function TaskTableRow({ task, onClick }: TaskTableRowProps) {
  const assigneeName = task.assignee?.name || "Unassigned";

  return (
    <tr
      onClick={() => onClick?.(task)}
      className="border-b border-[#E8EDFF] hover:bg-[#F9F9FF] transition-colors cursor-pointer"
    >
      <td className="py-4 px-4 text-[14px] text-[#0052CC] font-medium">{task.task_id || "N/A"}</td>
      <td className="py-4 px-4 text-[15px] font-medium text-[#041B3C]">{task.title}</td>
      
      <td className="py-4 px-4">
        <TaskStatusPill status={task.status} />
      </td>

      <td className="py-4 px-4 text-[14px] text-[#434654]">{task.due_date ? formatDate(task.due_date) : "-"}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2.5">
          <Avatar name={assigneeName} size="sm" className="w-6 h-6 text-[10px]" />
          <span className="text-[14px] font-medium text-[#041B3C]">{assigneeName}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <button className="text-[#737685] hover:text-[#041B3C] p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </td>
    </tr>
  );
}