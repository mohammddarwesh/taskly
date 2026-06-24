import Image from "next/image";
import { MetaField } from "@/components/ui/MetaField";
import { UserDisplay } from "@/components/ui/UserDisplay";
import { EditableField } from "@/components/ui/EditableField";
import { Select } from "@/components/ui/Select";
import { formatDate } from "@/libs/utils";
import type { ProjectMember } from "@/features/projects/types/project.types";

interface EpicMetaProps {
  // Created By
  createdByName?: string;

  // Assignee
  assigneeEditOpen: boolean;
  assigneeDisabled: boolean;
  isSaving: boolean;
  assigneeId: string;
  members: ProjectMember[];
  membersLoading: boolean;
  onAssigneeStartEdit: () => void;
  onAssigneeCancel: () => void;
  onAssigneeChange: (value: string) => void;

  // Deadline
  deadlineEditOpen: boolean;
  deadlineDisabled: boolean;
  deadlineValue: string;
  deadlineError?: string;
  onDeadlineStartEdit: () => void;
  onDeadlineCancel: () => void;
  onDeadlineChange: (value: string) => void;
}

export function EpicMeta({
  createdByName,
  assigneeEditOpen,
  assigneeDisabled,
  isSaving,
  assigneeId,
  members,
  membersLoading,
  onAssigneeStartEdit,
  onAssigneeCancel,
  onAssigneeChange,
  deadlineEditOpen,
  deadlineDisabled,
  deadlineValue,
  deadlineError,
  onDeadlineStartEdit,
  onDeadlineCancel,
  onDeadlineChange,
}: EpicMetaProps) {
  const assigneeDisplayName =
    members.find((m) => m.id === assigneeId)?.name ?? "Unassigned";

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
      <MetaField label="Created By">
        <UserDisplay name={createdByName} emptyLabel="Unknown" />
      </MetaField>

      <MetaField label="Assignee">
        <EditableField
          label="Assignee"
          isEditing={assigneeEditOpen}
          disabled={assigneeDisabled || membersLoading}
          onStartEdit={onAssigneeStartEdit}
          onCancel={onAssigneeCancel}
          display={<UserDisplay name={assigneeDisplayName} />}
          editor={
            <Select
              id="assignee_id"
              label=""
              autoFocus
              value={assigneeId}
              options={[
                { value: "", label: "Unassigned" },
                ...members.map((m) => ({ value: m.id, label: m.name })),
              ]}
              onChange={(e) => onAssigneeChange(e.target.value)}
              disabled={isSaving || membersLoading}
            />
          }
        />
      </MetaField>

      <MetaField label="Deadline">
        <EditableField
          label="Deadline"
          isEditing={deadlineEditOpen}
          disabled={deadlineDisabled}
          error={deadlineError}
          onStartEdit={onDeadlineStartEdit}
          onCancel={onDeadlineCancel}
          display={
            <div className="flex items-center gap-2.5">
              <Image
                src="/icons/calendar.svg"
                alt=""
                width={14}
                height={14}
                className="opacity-50"
              />
              <span className="text-sm font-medium text-text-primary">
                {deadlineValue ? formatDate(deadlineValue) : "No deadline"}
              </span>
            </div>
          }
          editor={
            <input
              id="deadline"
              type="date"
              autoFocus
              value={deadlineValue}
              min={today}
              disabled={isSaving}
              aria-invalid={!!deadlineError}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || val.length === 10) {
                  onDeadlineChange(val);
                }
              }}
              className="input w-full"
            />
          }
        />
      </MetaField>
    </div>
  );
}