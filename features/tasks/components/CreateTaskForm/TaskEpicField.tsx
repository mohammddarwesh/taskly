import { Control, Controller, FieldErrors } from "react-hook-form";
import { Select } from "@/components/ui/Select";
import { FormError } from "@/components/ui/FormError";
import { CreateTaskFormValues } from "../../schemas/task.schema";

const labelClass =
  "text-[11px] font-bold leading-4 tracking-[0.55px] uppercase text-[#434654]";

interface TaskEpicFieldProps {
  control: Control<CreateTaskFormValues>;
  errors: FieldErrors<CreateTaskFormValues>;
  epicOptions: { value: string; label: string }[];
  epicsLoading: boolean;
}

export function TaskEpicField({
  control,
  errors,
  epicOptions,
  epicsLoading,
}: TaskEpicFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="epic_id" className={labelClass}>
        Epic
      </label>
      <Controller
        name="epic_id"
        control={control}
        render={({ field }) => (
          <Select
            id="epic_id"
            placeholder="Select Epic Link"
            options={epicOptions}
            value={field.value || ""}
            onChange={(e) =>
              field.onChange(e.target.value === "" ? null : e.target.value)
            }
            disabled={epicsLoading}
          />
        )}
      />
      <FormError message={errors.epic_id?.message} />
    </div>
  );
}
