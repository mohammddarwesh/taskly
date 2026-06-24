"use client";

import { useSearchParams } from "next/navigation";
import { TaskTitleField } from "./TaskTitleField";
import { TaskStatusAssigneeFields } from "./TaskStatusAssigneeFields";
import { TaskEpicField } from "./TaskEpicField";
import { TaskDueDateField } from "./TaskDueDateField";
import { TaskDescriptionField } from "./TaskDescriptionField";
import { TaskFormActions } from "./TaskFormActions";

import { useCreateTask } from "../../hooks/useCreateTask";
import { useProjectEpics } from "@/features/epics/hooks/useProjectEpics";
import { useProjectMembers } from "@/features/projects/hooks/useProjectMembers";

interface CreateTaskFormProps {
  projectId: string;
}

export function CreateTaskForm({ projectId }: CreateTaskFormProps) {
  const searchParams = useSearchParams();
  const epicIdFromQuery = searchParams.get("epicId");

  const { form, isSubmitting, onSubmit } = useCreateTask(
    projectId,
    epicIdFromQuery,
  );
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = form;

  const { epics = [], isLoading: epicsLoading } = useProjectEpics(projectId);
  const { members = [], isLoading: membersLoading } =
    useProjectMembers(projectId);

  const epicOptions = epics.map((epic) => ({
    value: epic.id,
    label: `${epic.epic_id} ${epic.title.length > 100 ? epic.title.slice(0, 97) + "..." : epic.title}`,
  }));

  const memberOptions = members.map((member) => ({
    value: member.id,
    label: member.name || member.email || "Unknown",
  }));

  return (
    <div className="w-full max-w-232 bg-[#FFFFFF] rounded-lg p-6 flex flex-col gap-8 shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)]">
      <form onSubmit={onSubmit} className="flex flex-col gap-12">
        <TaskTitleField register={register} errors={errors} />

        <TaskStatusAssigneeFields
          control={control}
          errors={errors}
          memberOptions={memberOptions}
          membersLoading={membersLoading}
        />

        <TaskEpicField
          control={control}
          errors={errors}
          epicOptions={epicOptions}
          epicsLoading={epicsLoading}
        />

        <TaskDueDateField register={register} errors={errors} />

        <TaskDescriptionField
          register={register}
          errors={errors}
          watch={watch}
        />

        <TaskFormActions isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
