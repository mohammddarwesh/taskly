"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { isApiError } from "@/types/apiError.types";
import { createTaskSchema, CreateTaskFormValues } from "../schemas/task.schema";
import { TaskStatus } from "../types/task.types";
import { createTask } from "../services/task.service";

export function useCreateTask(
  projectId: string,
  initialEpicId?: string | null,
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: TaskStatus.TO_DO, // Default set here instead of Zod
      description: "",
      epic_id: initialEpicId ?? undefined,
      assignee_id: undefined,
      due_date: undefined,
    },
  });

  const onSubmit = useCallback(
    async (values: CreateTaskFormValues) => {
      setIsSubmitting(true);
      try {
        await createTask(projectId, values);
        form.reset();
        router.push(`/project/${projectId}`);
        toast.success("Task created successfully");
      } catch (err: unknown) {
        const message = isApiError(err) ? err.msg : "Something went wrong";
        toast.error(`Failed to create task: ${message}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, projectId, router],
  );

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
