"use client";

import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/libs/utils";
import { Task } from "@/features/tasks/types/task.types";
import { cn } from "@/libs/utils";

const getStatusBadgeStyles = (status: string) => {
  switch (status) {
    case "IN_PROGRESS": return "bg-[#E8EDFF] text-[#0052CC]";
    case "TO_DO": return "bg-[#F3F4F6] text-[#4B5563]";
    case "COMPLETED":
    case "DONE": return "bg-[#E8F5E9] text-[#2E7D32]";
    case "BLOCKED":
    case "URGENT": return "bg-[#FFEBEE] text-[#C62828]";
    default: return "bg-[#F3F4F6] text-[#4B5563]";
  }
};

export function TaskTableRow({ task }: { task: Task }) {
  const assigneeName = task.assignee?.name || "Unassigned";
  return (
    <tr className="border-b border-[#E8EDFF] hover:bg-[#F9F9FF] transition-colors">
      <td className="py-4 px-4 text-[14px] text-[#0052CC] font-medium">{task.task_id || "N/A"}</td>
      <td className="py-4 px-4 text-[15px] font-medium text-[#041B3C]">{task.title}</td>
      <td className="py-4 px-4">
        <span className={cn("px-3 py-1 rounded text-[12px] font-bold uppercase", getStatusBadgeStyles(task.status))}>
          {task.status.replace(/_/g, " ")}
        </span>
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