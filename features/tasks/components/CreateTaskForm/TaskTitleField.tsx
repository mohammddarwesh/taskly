import { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "@/components/ui/Input";
import { FormError } from "@/components/ui/FormError";
import { CreateTaskFormValues } from "../../schemas/task.schema";

const labelClass = "text-[11px] font-bold leading-4 tracking-[0.55px] uppercase text-[#434654]";

interface TaskTitleFieldProps {
  register: UseFormRegister<CreateTaskFormValues>;
  errors: FieldErrors<CreateTaskFormValues>;
}

export function TaskTitleField({ register, errors }: TaskTitleFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="title" className={labelClass}>
        Title *
      </label>
      <Input
        id="title"
        placeholder="e.g., Finalize structural schematics"
        {...register("title")}
      />
      <FormError message={errors.title?.message} showDot />
    </div>
  );
}