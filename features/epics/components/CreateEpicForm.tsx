"use client";

import { useCreateEpic } from "../hooks/useCreateEpic";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FormError } from "@/components/ui/FormError";
import { CharCounter } from "@/components/ui/CharCounter";
import { FormActions } from "@/features/projects/components/FormActions";
import { ProTipFooter } from "@/features/projects/components/ProTipFooter";
import { useProjectMembers } from "@/features/projects/hooks/useProjectMembers";

interface Props {
  projectId: string;
}

export default function CreateEpicForm({ projectId }: Props) {
  const { form, isSubmitting, onSubmit } = useCreateEpic(projectId);
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const { members, isLoading: membersLoading } = useProjectMembers(projectId);
  const assigneeOptions =
    members?.map((m) => ({ value: m.id, label: m.name })) || [];

  const descriptionValue = watch("description") || "";

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)] border border-[rgba(195,198,214,0.1)]">
      {/* Form Header - matches Figma */}
      <div className="px-8 pt-8 pb-6 border-b border-[rgba(195,198,214,0.1)]">
        <h1 className="text-4xl font-bold tracking-[-0.9px] text-[#041B3C]">
          Create New Epic
        </h1>
        <p className="text-base text-[#434654] mt-2 max-w-lg">
          Define a large body of work that can be broken down into tasks.
        </p>
      </div>

      <form onSubmit={onSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-[180px_1fr] items-start gap-4">
          <label
            htmlFor="title"
            className="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase text-[#434654] pt-2"
          >
            Title *
          </label>
          <div>
            <Input
              id="title"
              placeholder="e.g. Structural Foundation Phase"
              {...register("title")}
              className="bg-[#D7E2FF] border-0 rounded text-[16px]"
              label=""
            />
            <FormError message={errors.title?.message} showDot />
          </div>
        </div>

        {/* Description – row layout */}
        <div className="grid grid-cols-[180px_1fr] items-start gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase text-[#434654] pt-2"
            >
              Description
            </label>
            <span className="text-[10px] text-[rgba(67,70,84,0.5)]">
              Optional
            </span>
          </div>
          <div>
            <Textarea
              id="description"
              placeholder="Describe the scope and objectives of this epic..."
              maxLength={500}
              {...register("description")}
              className="bg-[#D7E2FF] border-0 rounded min-h-30 text-[16px]"
              label=""
            />
            <CharCounter
              current={descriptionValue.length}
              max={500}
              className="block text-right mt-1 text-[10px] text-[rgba(67,70,84,0.6)]"
            />
            <FormError message={errors.description?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Select
            id="assignee_id"
            label="Assignee"
            options={assigneeOptions}
            error={errors.assignee_id?.message}
            {...register("assignee_id")}
            disabled={membersLoading}
          />
          <div>
            <Input
              id="deadline"
              label="Deadline"
              type="date"
              {...register("deadline")}
              className="bg-[#D7E2FF] border-0 rounded text-[16px]"
              labelClassName="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase text-[#434654]"
            />
            <FormError message={errors.deadline?.message} />
          </div>
        </div>

        {/* Actions */}
        <FormActions
          submitLabel="Create Epic"
          isSubmitting={isSubmitting}
          onCancel={() => window.history.back()}
        />
      </form>

      <ProTipFooter text="Pro Tip: Epics help you group related tasks under a common goal." />
    </div>
  );
}
