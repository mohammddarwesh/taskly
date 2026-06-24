import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import Textarea from "@/components/ui/Textarea";
import { FormError } from "@/components/ui/FormError";
import { CharCounter } from "@/components/ui/CharCounter";
import { CreateTaskFormValues } from "../../schemas/task.schema";

const labelClass = "text-[11px] font-bold leading-4 tracking-[0.55px] uppercase text-[#434654]";

interface TaskDescriptionFieldProps {
  register: UseFormRegister<CreateTaskFormValues>;
  errors: FieldErrors<CreateTaskFormValues>;
  watch: UseFormWatch<CreateTaskFormValues>;
}

export function TaskDescriptionField({
  register,
  errors,
  watch,
}: TaskDescriptionFieldProps) {
  const descriptionValue = watch("description") || "";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="description" className={labelClass}>
        Description
      </label>
      <Textarea
        id="description"
        placeholder="Provide detailed context for this task..."
        maxLength={500}
        className="h-36 bg-[#D7E2FF] rounded-sm px-4 py-3 text-[16px] text-[#041B3C] placeholder:text-[#737685] border-0 resize-none focus:outline-none focus:ring-1 focus:ring-blue-600"
        {...register("description")}
      />
      <div className="flex justify-between items-start">
        <FormError message={errors.description?.message} />
        <CharCounter current={descriptionValue.length} max={500} />
      </div>
    </div>
  );
}