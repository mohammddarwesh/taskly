"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { epicFormSchema, EpicFormValues } from "../schemas/epic.schema";
import { updateEpic } from "../services/epic.service";
import { Epic } from "../types/epic.types";

export type EpicField = keyof EpicFormValues;

export function useEditEpic(
  projectId: string,
  epic: Epic,
  onUpdate?: () => void,
) {
  const [editingField, setEditingField] = useState<EpicField | null>(null);
  const queryClient = useQueryClient();

  const defaultValues = useMemo<EpicFormValues>(
    () => ({
      title: epic.title,
      description: epic.description ?? "",
      assignee_id: epic.assignee?.sub ?? epic.assignee_id ?? "",
      deadline: epic.deadline ?? "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [epic.id, epic.title, epic.description, epic.assignee?.sub, epic.assignee_id, epic.deadline],
  );

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!form.formState.isDirty) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const mutation = useMutation({
    mutationFn: (payload: Partial<EpicFormValues>) => updateEpic(projectId, epic.id, payload),
    onSuccess: () => {
      toast.success("Epic updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project", projectId, "epics"] });
      onUpdate?.();
    },
    onError: () => {
      toast.error("Failed to update epic. Please try again.");
    }
  });

  const isFieldLocked = (field: EpicField) =>
    mutation.isPending || (editingField !== null && editingField !== field);

  const startEditing = (field: EpicField) => {
    if (isFieldLocked(field)) return;
    setEditingField(field);
  };

  const cancelField = (field: EpicField) => {
    form.resetField(field);
    setEditingField(null);
  };

  const saveField = async (field: EpicField, valueOverride?: string) => {
    const raw = valueOverride !== undefined
      ? valueOverride
      : form.getValues(field) as string;

    if (valueOverride === undefined && !form.formState.dirtyFields[field]) {
      setEditingField(null);
      return;
    }

    const valid = await form.trigger(field);
    if (!valid) return;

    const apiValue =
      field === "assignee_id" || field === "deadline" ? raw || null : raw;

    try {
      await mutation.mutateAsync({ [field]: apiValue });
      form.resetField(field, { defaultValue: raw });
    } catch {
      form.resetField(field);
    } finally {
      setEditingField(null);
    }
  };

  return {
    form,
    editingField,
    isSaving: mutation.isPending,
    isFieldLocked,
    startEditing,
    cancelField,
    saveField,
  };
}