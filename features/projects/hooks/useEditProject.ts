import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { addProjectSchema, AddProjectFormValues } from "../schemas/add-project.schema";
import { getProjectById, updateProject } from "../services/project.service";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";
import { Project } from "../types/project.types";

export function useEditProject(projectId: string) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddProjectFormValues>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        form.reset({ name: data.name, description: data.description || "" });
      } catch (err) {
        const message = isApiError(err) ? err.msg : "Failed to load project details";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };
    if (projectId) fetchProject();
  }, [projectId, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      await updateProject(projectId, values);
      toast.success("Project updated successfully");
      router.push("/project");
    } catch (err) {
      const message = isApiError(err) ? err.msg : "Something went wrong";
      toast.error(`Failed to update project: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  });

  return { form, isSubmitting, onSubmit, isLoading, project };
}