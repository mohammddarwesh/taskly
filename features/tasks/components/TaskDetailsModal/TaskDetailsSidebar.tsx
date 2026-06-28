// TaskDetailsSidebar.tsx
"use client";

import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/libs/utils";
import { Task } from "@/features/tasks/types/task.types";
import { TaskStatusPill } from "../TaskStatusPill";

export function TaskDetailsSidebar({ task }: { task: Task }) {
  const assigneeName = task.assignee?.name || "Unassigned";
  const assigneeDepartment = task.assignee?.department || "Team Member";
  const reporterName = task.created_by?.name || "Unknown";
  const dueDate = task.due_date ? formatDate(task.due_date) : "No due date";
  const createdAt = formatDate(task.created_at);

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#434654] mb-2.5">
          Status
        </h4>
        <div className="w-full">
          <TaskStatusPill
            status={task.status}
            size="md"
            // className="w-full justify-between pr-1"
          />
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#434654] mb-2.5">
          Assignee
        </h4>
        <div className="bg-white border border-[#E8EDFF] rounded-xl p-3.5 flex items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <Avatar
            name={assigneeName}
            size="sm"
            className="w-8 h-8 text-[11px]"
          />
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#041B3C]">
              {assigneeName}
            </span>
            <span className="text-[12px] text-[#434654]">
              {assigneeDepartment}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#434654] mb-2.5">
          Reporter
        </h4>
        <div className="flex items-center gap-2.5">
          <Avatar
            name={reporterName}
            size="sm"
            className="w-8 h-8 text-[11px]"
          />
          <span className="text-[14px] font-semibold text-[#041B3C]">
            {reporterName}
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-6 border-t border-[#E8EDFF]">
        <div className="flex justify-between text-[14px]">
          <span className="text-[#434654]">Due Date</span>
          <span className="font-medium text-[#041B3C]">{dueDate}</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-[#434654]">Created At</span>
          <span className="font-medium text-[#041B3C]">{createdAt}</span>
        </div>
      </div>
    </div>
  );
}
