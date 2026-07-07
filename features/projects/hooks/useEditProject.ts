"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectSchema, AddProjectFormValues } from "../schemas/add-project.schema";
import { getProjectById, updateProject } from "../services/project.service";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useEditProject(projectId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: project = null, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  const form = useForm<AddProjectFormValues>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    if (project) {
      form.reset({ name: project.name, description: project.description || "" });
    }
  }, [project, form]);

  const mutation = useMutation({
    mutationFn: (values: AddProjectFormValues) => updateProject(projectId, values),
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.push("/project");
    },
    onError: (err) => {
      const message = isApiError(err) ? err.msg : "Something went wrong";
      toast.error(`Failed to update project: ${message}`);
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return { form, isSubmitting: mutation.isPending, onSubmit, isLoading, project };
}