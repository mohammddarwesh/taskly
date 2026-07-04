"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isApiError } from "@/types/apiError.types";
import { createTaskSchema, CreateTaskFormValues } from "../schemas/task.schema";
import { TaskStatus, TaskStatusType } from "../types/task.types";
import { createTask } from "../services/task.service";
import { taskKeys } from "./taskQueries";

export function useCreateTask(
  projectId: string,
  initialEpicId?: string | null,
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const initialStatus =
    (searchParams.get("status") as TaskStatusType) || TaskStatus.TO_DO;

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: initialStatus,
      description: "",
      epic_id: initialEpicId ?? undefined,
      assignee_id: undefined,
      due_date: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: CreateTaskFormValues) => createTask(projectId, values),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: taskKeys.all(projectId) });
      router.push(`/project/${projectId}`);
      toast.success("Task created successfully");
    },
    onError: (err: unknown) => {
      const message = isApiError(err) ? err.msg : "Something went wrong";
      toast.error(`Failed to create task: ${message}`);
    }
  });

  const onSubmit = useCallback(
    async (values: CreateTaskFormValues) => {
      mutation.mutate(values);
    },
    [mutation],
  );

  return {
    form,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
