import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { isApiError } from "@/types/apiError.types";
import { epicFormSchema, EpicFormValues } from "../schemas/epic.schema";
import { updateEpic } from "../services/epic.service";
import { Epic } from "../types/epic.types";
import { useProjectMembers } from "@/features/projects/hooks/useProjectMembers";

export function useEditEpic(projectId: string, epic: Epic) {
  const { members, isLoading: membersLoading } = useProjectMembers(projectId);

  const defaultValues = useMemo(
    () => ({
      title: epic.title,
      description: epic.description || "",
      assignee_id: epic.assignee?.sub ?? "",
      deadline: epic.deadline ?? "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [epic.id], // ✅ only reset when switching to a different epic, not on every render
  );

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicFormSchema),
    defaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (values: EpicFormValues) => {
    // ✅ compute dirty fields inside submit, not via getDirtyValues utility
    const dirtyFields = form.formState.dirtyFields;
    const changedFields = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        values[key as keyof EpicFormValues],
      ]),
    );

    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes to save");
      return;
    }

    try {
      await updateEpic(projectId, epic.id, changedFields);
      toast.success("Epic updated successfully");
      reset(values); // ✅ reset to submitted values so dirtyFields clears
    } catch (err) {
      const message = isApiError(err)
        ? err.msg
        : "Failed to update epic. Please try again.";
      toast.error(message);
      reset(defaultValues); // ✅ revert on error
      throw err;
    }
  };

  return {
    form,
    members,
    membersLoading,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    defaultValues, // ✅ expose for handleCancel in the modal
  };
}