import { Control, Controller, FieldErrors } from "react-hook-form";
import { Select } from "@/components/ui/Select";
import { FormError } from "@/components/ui/FormError";
import { CreateTaskFormValues } from "../../schemas/task.schema";
import { STATUS_OPTIONS } from "../../types/task.types";

const labelClass =
  "text-[11px] font-bold leading-4 tracking-[0.55px] uppercase text-[#434654]";

interface TaskStatusAssigneeFieldsProps {
  control: Control<CreateTaskFormValues>;
  errors: FieldErrors<CreateTaskFormValues>;
  memberOptions: { value: string; label: string }[];
  membersLoading: boolean;
}

export function TaskStatusAssigneeFields({
  control,
  errors,
  memberOptions,
  membersLoading,
}: TaskStatusAssigneeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="status" className={labelClass}>
          Status *
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              id="status"
              placeholder="Select status"
              options={STATUS_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <FormError message={errors.status?.message} showDot />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="assignee_id" className={labelClass}>
          Assignee
        </label>
        <Controller
          name="assignee_id"
          control={control}
          render={({ field }) => (
            <Select
              id="assignee_id"
              placeholder="Select Team Member"
              options={memberOptions}
              value={field.value || ""}
              onChange={(e) =>
                field.onChange(e.target.value === "" ? null : e.target.value)
              }
              disabled={membersLoading}
            />
          )}
        />
        <FormError message={errors.assignee_id?.message} />
      </div>
    </div>
  );
}
