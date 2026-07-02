"use client";

import { Avatar } from "@/components/ui/Avatar";
import { MetaField } from "@/components/ui/MetaField";
import { Select } from "@/components/ui/Select";
import { formatDate } from "@/libs/utils";
import { useProjectEpics } from "@/features/epics/hooks/useProjectEpics";
import { useProjectMembers } from "@/features/projects/hooks/useProjectMembers";
import { ProjectMember } from "@/features/projects/types/project.types";
import {
  STATUS_OPTIONS,
  Task,
  TaskStatusType,
  UserInfo,
} from "@/features/tasks/types/task.types";
import { useUpdateTask } from "../../hooks/useUpdateTask";

interface TaskDetailsSidebarProps {
  task: Task;
  projectId: string;
  setTask: (task: Task) => void;
}

export function TaskDetailsSidebar({
  task,
  projectId,
  setTask,
}: TaskDetailsSidebarProps) {
  const { updateField, isUpdating } = useUpdateTask(projectId, task, setTask);

  const { members = [], isLoading: membersLoading } =
    useProjectMembers(projectId);

  const { epics = [], isLoading: epicsLoading } = useProjectEpics(projectId);

  const assigneeName = task.assignee?.name || "Unassigned";
  const assigneeDepartment = task.assignee?.department || "Team Member";
  const reporterName = task.created_by?.name || "Unknown";
  const dueDate = task.due_date ? formatDate(task.due_date) : "No due date";
  const createdAt = formatDate(task.created_at);

  const mapMemberToUserInfo = (member: ProjectMember): UserInfo => ({
    id: member.id,
    name: member.name || member.email || "Unknown",
    email: member.email || "",
    department: null,
  });

  const memberOptions = [
    { value: "", label: "Unassigned" },
    ...members.map((member) => ({
      value: member.id,
      label: member.name || member.email || "Unknown",
    })),
  ];

  const epicOptions = [
    { value: "", label: "No epic" },
    ...epics.map((epic) => ({
      value: epic.id,
      label: `${epic.epic_id} ${
        epic.title.length > 80 ? `${epic.title.slice(0, 77)}...` : epic.title
      }`,
    })),
  ];

  const epicValue =
    task.epic && epics.some((epic) => epic.id === task.epic?.id)
      ? task.epic.id
      : "";

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    await updateField("status", e.target.value as TaskStatusType);
  };

  const handleAssigneeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const userId = e.target.value;

    if (!userId) {
      await updateField("assignee", null);
      return;
    }

    const member = members.find((m) => m.id === userId);
    if (member) {
      await updateField("assignee", mapMemberToUserInfo(member));
    }
  };

  const handleEpicChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const epicId = e.target.value;

    if (!epicId) {
      await updateField("epic", null);
      return;
    }

    const epic = epics.find((item) => item.id === epicId);
    if (epic) {
      await updateField("epic", epic);
    }
  };

  const handleDueDateChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await updateField("due_date", e.target.value || null);
  };

  return (
    <div className="space-y-8">
      <MetaField label="Status">
        <Select
          id="status"
          options={STATUS_OPTIONS}
          value={task.status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className="w-full"
        />
      </MetaField>

      <MetaField label="Assignee">
        <Select
          id="assignee"
          options={memberOptions}
          value={task.assignee?.id ?? ""}
          onChange={handleAssigneeChange}
          disabled={isUpdating || membersLoading}
          className="w-full"
        />

        {task.assignee && (
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E8EDFF] bg-white p-3.5 shadow-sm">
            <Avatar
              name={assigneeName}
              size="sm"
              className="h-8 w-8 text-[11px]"
            />
            <div>
              <span className="text-[14px] font-semibold text-[#041B3C]">
                {assigneeName}
              </span>
              <span className="block text-[12px] text-[#434654]">
                {assigneeDepartment}
              </span>
            </div>
          </div>
        )}
      </MetaField>

      <MetaField label="Epic">
        <Select
          id="epic"
          options={epicOptions}
          value={epicValue}
          onChange={handleEpicChange}
          disabled={isUpdating || epicsLoading}
          className="w-full"
        />
      </MetaField>

      <MetaField label="Reporter">
        <div className="flex items-center gap-2.5">
          <Avatar
            name={reporterName}
            size="sm"
            className="h-8 w-8 text-[11px]"
          />
          <span className="text-[14px] font-semibold text-[#041B3C]">
            {reporterName}
          </span>
        </div>
      </MetaField>

      <MetaField label="Due Date">
        <input
          type="datetime-local"
          value={task.due_date || ""}
          onChange={handleDueDateChange}
          disabled={isUpdating}
          className="w-full rounded-sm border-0 bg-[#D7E2FF] px-4 py-2 text-[16px] text-[#041B3C] focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <div className="mt-1 text-[14px] text-[#434654]">{dueDate}</div>
      </MetaField>

      <MetaField label="Created At">
        <div className="text-[14px] font-medium text-[#041B3C]">
          {createdAt}
        </div>
      </MetaField>
    </div>
  );
}
