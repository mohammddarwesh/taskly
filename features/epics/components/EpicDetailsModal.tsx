"use client";

import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Avatar } from "@/components/ui/Avatar";
import { CharCounter } from "@/components/ui/CharCounter";
import { FormError } from "@/components/ui/FormError";
import { formatDate } from "@/libs/utils";
import { useEditEpic } from "../hooks/useEditEpic";
import { Epic } from "../types/epic.types";
import Image from "next/image";

interface EpicDetailsModalProps {
  projectId: string;
  epic: Epic;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export function EpicDetailsModal({
  projectId,
  epic,
  isOpen,
  onClose,
  onUpdate,
}: EpicDetailsModalProps) {
  const {
    form,
    members,
    membersLoading,
    onSubmit,
    isSubmitting,
    defaultValues,
  } = useEditEpic(projectId, epic);

  const { register, watch, setValue, trigger, formState } = form;
  const { errors } = formState;

  // ✅ watch individual fields to avoid full re-renders
  const titleValue = watch("title");
  const descriptionValue = watch("description");
  const assigneeId = watch("assignee_id");
  const deadlineValue = watch("deadline");

  const [editingField, setEditingField] = useState<
    "title" | "description" | "assignee" | "deadline" | null
  >(null);

  // ✅ Separate refs — don't conflict with register()'s own ref
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const assigneeRef = useRef<HTMLSelectElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (editingField === "title") titleRef.current?.focus();
      if (editingField === "description") descRef.current?.focus();
      if (editingField === "assignee") assigneeRef.current?.focus();
      if (editingField === "deadline") deadlineRef.current?.focus();
    }, 50); // ✅ small delay so the element is mounted before focus
    return () => clearTimeout(timer);
  }, [editingField]);

  const handleSave = async () => {
    const isValid = await trigger();
    if (isValid) {
      await onSubmit();
      onUpdate?.();
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    form.reset(defaultValues); // ✅ always reset to known defaultValues
    setEditingField(null);
  };

  // ✅ Wrapper blur: only save if focus truly left the editing container
  const handleWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleSave();
    }
  };

  const renderEditable = (
    field: "title" | "description" | "assignee" | "deadline",
    display: React.ReactNode,
    edit: React.ReactNode,
  ) => {
    if (editingField === field) {
      return <div onBlur={handleWrapperBlur}>{edit}</div>;
    }
    return (
      <div
        onClick={() => setEditingField(field)}
        className="cursor-pointer hover:bg-surface-low/50 rounded px-2 -mx-2 py-1 transition-colors"
      >
        {display}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      closeOnOverlayClick={!isSubmitting}
      className="max-w-[448px] md:max-w-2xl w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between -mt-6 -mx-6 p-6 pb-2 border-b border-[#E8EDFF]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1 rounded-[3px]">
              <Image
                src="/icons/bookmark.svg"
                alt="Epic"
                width={14}
                height={14}
                className="opacity-70"
              />
            </div>
            <span className="text-[10px] font-bold tracking-[1px] uppercase text-text-secondary">
              {epic.epic_id}
            </span>
          </div>
          {renderEditable(
            "title",
            <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-6 md:leading-8 mt-1">
              {titleValue || epic.title}
            </h2>,
            // ✅ Use useForm's register ref via the `ref` callback merge
            <Input
              id="title"
              label=""
              {...register("title")}
              // ✅ merge our focus ref without overriding register's ref
              ref={(el) => {
                (register("title") as any).ref(el);
                (
                  titleRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = el;
              }}
              disabled={isSubmitting}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  handleCancel();
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
              className="text-xl md:text-2xl font-bold mt-1"
            />,
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6 -mx-6 px-6 pb-6 max-h-[70vh] overflow-y-auto custom-scrollbar mt-4">
        {/* Description */}
        <div className="space-y-1">
          {renderEditable(
            "description",
            <p className="text-sm md:text-base text-text-secondary/80">
              {descriptionValue || "No description provided"}
            </p>,
            <>
              <Textarea
                id="description"
                label=""
                {...register("description")}
                ref={(el) => {
                  (register("description") as any).ref(el);
                  (
                    descRef as React.MutableRefObject<HTMLTextAreaElement | null>
                  ).current = el;
                }}
                placeholder="No description provided"
                disabled={isSubmitting}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    handleCancel();
                  }
                }}
                className="min-h-[80px] text-sm"
              />
              <CharCounter
                current={descriptionValue?.length || 0}
                max={500}
                className="block text-right mt-1 text-[11px]"
              />
              <FormError message={errors.description?.message} />
            </>,
          )}
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Created By */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.5px] text-text-secondary/70">
              Created By
            </label>
            <div className="flex items-center gap-2.5">
              <Avatar name={epic.created_by?.name} size="sm" />
              <span className="text-sm font-medium text-text-primary">
                {epic.created_by?.name}
              </span>
            </div>
          </div>

          {/* Assignee */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.5px] text-text-secondary/70">
              Assignee
            </label>
            {renderEditable(
              "assignee",
              <div className="flex items-center gap-2.5">
                <Avatar name={epic.assignee?.name || "Unassigned"} size="sm" />
                <span className="text-sm font-medium text-text-primary">
                  {/* ✅ show live assignee name from members list */}
                  {members.find((m) => m.id === assigneeId)?.name ||
                    epic.assignee?.name ||
                    "Unassigned"}
                </span>
              </div>,
              <Select
                label=""
                options={[
                  { value: "", label: "Unassigned" },
                  ...members.map((m) => ({ value: m.id, label: m.name })),
                ]}
                value={assigneeId ?? ""}
                onChange={(e) => {
                  setValue("assignee_id", e.target.value || "", {
                    shouldDirty: true, // ✅ mark field dirty so it's included in changedFields
                  });
                }}
                ref={assigneeRef}
                disabled={isSubmitting || membersLoading}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    handleCancel();
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSave();
                  }
                }}
                className="w-full"
              />,
            )}
          </div>

          {/* Deadline */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.5px] text-text-secondary/70">
              Deadline
            </label>
            {renderEditable(
              "deadline",
              <div className="flex items-center gap-2.5">
                <Image
                  src="/icons/calendar.svg"
                  alt="Calendar"
                  width={14}
                  height={14}
                  className="opacity-50"
                />
                <span className="text-sm font-medium text-text-primary">
                  {deadlineValue ? formatDate(deadlineValue) : "No deadline"}
                </span>
              </div>,
              <input
                ref={deadlineRef}
                type="date"
                value={deadlineValue ?? ""}
                onChange={(e) => {
                  setValue("deadline", e.target.value || "", {
                    shouldDirty: true, // ✅ mark dirty
                  });
                }}
                disabled={isSubmitting}
                className="input w-full"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    handleCancel();
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSave();
                  }
                }}
              />,
            )}
            <FormError message={errors.deadline?.message} />
          </div>
        </div>

        {/* Created At */}
        <div className="pt-4 border-t border-[#E8EDFF] space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-[0.5px] text-text-secondary/70">
            Created At
          </label>
          <div className="flex items-center gap-2.5 mt-0.5">
            <Image
              src="/icons/calendar.svg"
              alt="Calendar"
              width={14}
              height={14}
              className="opacity-50"
            />
            <span className="text-sm font-medium text-text-primary">
              {formatDate(epic.created_at)}
            </span>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="pt-4 border-t border-[#E8EDFF] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Tasks</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              + Add Task
            </button>
          </div>
          <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-[#E8EDFF] rounded-xl bg-[#F8F9FF]">
            <div className="w-12 h-12 rounded-xl bg-[#E0E8FF] flex items-center justify-center mb-4">
              <Image
                src="/icons/list.svg"
                alt="Tasks"
                width={20}
                height={20}
                className="opacity-60"
              />
            </div>
            <p className="text-base font-semibold text-text-primary text-center">
              No tasks have been added to this epic yet
            </p>
            <button className="mt-4 flex items-center gap-2 px-5 py-2 bg-[#145CE2] hover:bg-[#114ab8] text-white text-sm font-medium rounded-md transition-colors shadow-sm">
              <Image
                src="/icons/plus-white.svg"
                alt="Add"
                width={16}
                height={16}
              />
              Add Task
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
