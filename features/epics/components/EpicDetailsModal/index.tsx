"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { MetaField } from "@/components/ui/MetaField";
import { formatDate } from "@/libs/utils";
import { useProjectMembers } from "@/features/projects/hooks/useProjectMembers";
import { Epic } from "../../types/epic.types";
import { useEditEpic } from "../../hooks/useEditEpic";
import { EpicModalHeader } from "./EpicModalHeader";
import { EpicDescription } from "./EpicDescription";
import { EpicMeta } from "./EpicMeta";
import { EpicTasks } from "./EpicTasks";
import { useEpicTasks } from "../../hooks/useEpicTasks";

interface EpicDetailsModalProps {
  projectId: string;
  epic: Epic;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
  onTaskClick?: (taskId: string) => void;
}

export function EpicDetailsModal({
  projectId,
  epic,
  isOpen,
  onClose,
  onUpdate,
  onTaskClick,
}: EpicDetailsModalProps) {
  const router = useRouter();
  const { members, isLoading: membersLoading } = useProjectMembers(projectId);
  const { tasks, isLoading, error } = useEpicTasks(projectId, epic.id);
  const {
    form,
    editingField,
    isSaving,
    isFieldLocked,
    startEditing,
    cancelField,
    saveField,
  } = useEditEpic(projectId, epic, onUpdate);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const titleValue = watch("title");
  const descriptionValue = watch("description");
  const assigneeId = watch("assignee_id");
  const deadlineValue = watch("deadline");

  const titleField = register("title");
  const descriptionField = register("description");

  const handleAddTask = () => {
    router.push(`/project/${projectId}/tasks/new?epicId=${epic.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!isSaving && editingField === null}
    >
      <div className="space-y-6 p-6" onClick={(e) => e.stopPropagation()}>
        <EpicModalHeader
          epicId={epic.epic_id}
          titleValue={titleValue || epic.title}
          isEditing={editingField === "title"}
          disabled={isFieldLocked("title")}
          isSaving={isSaving}
          error={errors.title?.message}
          titleField={titleField}
          onStartEdit={() => startEditing("title")}
          onCancel={() => cancelField("title")}
          onBlurSave={() => saveField("title")}
        />

        <EpicDescription
          value={descriptionValue}
          isEditing={editingField === "description"}
          disabled={isFieldLocked("description")}
          isSaving={isSaving}
          error={errors.description?.message}
          descriptionField={descriptionField}
          onStartEdit={() => startEditing("description")}
          onCancel={() => cancelField("description")}
          onBlurSave={() => saveField("description")}
        />

        <div className="flex   gap-6 w-full flex-col md:flex-row justify-evenly">
          <EpicMeta
            createdByName={epic.created_by?.name}
            assigneeEditOpen={editingField === "assignee_id"}
            assigneeDisabled={isFieldLocked("assignee_id")}
            isSaving={isSaving}
            assigneeId={assigneeId ?? ""}
            members={members}
            membersLoading={membersLoading}
            onAssigneeStartEdit={() => startEditing("assignee_id")}
            onAssigneeCancel={() => cancelField("assignee_id")}
            onAssigneeChange={(value) => {
              setValue("assignee_id", value, { shouldDirty: true });
              saveField("assignee_id", value);
            }}
            deadlineEditOpen={editingField === "deadline"}
            deadlineDisabled={isFieldLocked("deadline")}
            deadlineValue={deadlineValue ?? ""}
            deadlineError={errors.deadline?.message}
            onDeadlineStartEdit={() => startEditing("deadline")}
            onDeadlineCancel={() => cancelField("deadline")}
            onDeadlineChange={(value) => {
              setValue("deadline", value, { shouldDirty: true });
              saveField("deadline", value);
            }}
          />
          <MetaField
            label="Created At"
            className="border-t border-surface-low pt-4"
          >
            <div className="flex items-center gap-2.5">
              <Image
                src="/icons/calendar.svg"
                alt=""
                width={14}
                height={14}
                className="opacity-50"
              />
              <span className="text-sm font-medium text-text-primary">
                {formatDate(epic.created_at)}
              </span>
            </div>
          </MetaField>
        </div>

        <EpicTasks
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          onAddTask={handleAddTask}
          onTaskClick={onTaskClick}
        />
      </div>
    </Modal>
  );
}
