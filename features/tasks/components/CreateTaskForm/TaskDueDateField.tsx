import { UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "@/components/ui/Input";
import { FormError } from "@/components/ui/FormError";
import { CreateTaskFormValues } from "../../schemas/task.schema";

const labelClass =
  "text-[11px] font-bold leading-4 tracking-[0.55px] uppercase text-[#434654]";

interface TaskDueDateFieldProps {
  register: UseFormRegister<CreateTaskFormValues>;
  errors: FieldErrors<CreateTaskFormValues>;
}

export function TaskDueDateField({ register, errors }: TaskDueDateFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="due_date" className={labelClass}>
        Due Date
      </label>
      <Input
        id="due_date"
        type="datetime-local"
        className="h-12 bg-[#D7E2FF] rounded-sm px-4 text-[16px] text-[#041B3C] border-0 focus:outline-none focus:ring-1 focus:ring-blue-600"
        {...register("due_date")}
      />
      <FormError message={errors.due_date?.message} />
    </div>
  );
}
