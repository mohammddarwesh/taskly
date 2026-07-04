"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  epicFormSchema,
  EpicFormValues,
} from "../schemas/epic.schema";
import { createEpic } from "../services/epic.service";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useCreateEpic(projectId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee_id: null,
      deadline: null,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: EpicFormValues) => createEpic(projectId, values),
    onSuccess: () => {
      toast.success('Epic created successfully');
      queryClient.invalidateQueries({ queryKey: ["project", projectId, "epics"] });
      router.push(`/project/${projectId}/epics`);
    },
    onError: (err) => {
      const message = isApiError(err) ? err.msg : "Something went wrong";
      toast.error(`Failed to create epic: ${message}`);
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return { form, isSubmitting: mutation.isPending, onSubmit };
}
