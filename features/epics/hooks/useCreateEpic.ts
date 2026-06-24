import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  epicFormSchema,
  EpicFormValues,
} from "../schemas/epic.schema";
import { createEpic } from "../services/epic.service";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useCreateEpic(projectId: string) {
  const router = useRouter();

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee_id: null,
      deadline: null,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createEpic(projectId, values);
      toast.success('Epic created successfully');
      router.push(`/project/${projectId}/epics`);
    } catch (err) {
      const message = isApiError(err) ? err.msg : "Something went wrong";
      toast.error(`Failed to create epic: ${message}`);
    }
  });

  return { form, isSubmitting: form.formState.isSubmitting, onSubmit };
}
