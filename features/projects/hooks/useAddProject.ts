"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addProjectSchema,
  AddProjectFormValues,
} from "../schemas/add-project.schema";
import { createProject } from "../services/project.service";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useAddProject() {
  const queryClient = useQueryClient();

  const form = useForm<AddProjectFormValues>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      form.reset();
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: unknown) => {
      const message = isApiError(err) ? err.msg : "Something went wrong";
      toast.error(`Failed to create project: ${message}`);
    }
  });

  const onSubmit = useCallback(
    async (values: AddProjectFormValues) => {
      mutation.mutate(values);
    },
    [mutation],
  );

  return { form, isSubmitting: mutation.isPending, onSubmit: form.handleSubmit(onSubmit) };
}
