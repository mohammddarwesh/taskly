"use client";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Head from "@/components/ui/Head";
import { FormError } from "@/components/ui/FormError";
import { CharCounter } from "@/components/ui/CharCounter";
import { useAddProject } from "../hooks/useAddProject";
import { ProTipFooter } from "./ProTipFooter";
import { FormActions } from "./FormActions";
import Image from "next/image";
import { cn } from "@/libs/utils";

export function AddProjectForm() {
  const { form, isSubmitting, onSubmit } = useAddProject();
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const descriptionValue = watch("description", "") || "";

  return (
    <div className="w-full max-w-2xl bg-surface-card rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-4 px-8 pt-8 pb-10 border-b border-surface-low">
          <div
            className={cn(
              " flex items-center justify-center w-11.5 h-11 rounded bg-icon/10 shrink-0",
            )}
          >
            <Image src="/icons/checkPlus.svg" alt="" width={22} height={20} />
          </div>
          <Head
            head="Initialize New Project"
            sub="Define the scope and foundational details of your project."
            className="p-0"
            headClassName="text-2xl leading-8 font-semibold text-text-primary tracking-normal"
            subClassName="text-sm leading-5 text-text-secondary mt-0"
          />
        </div>
        {/* Form */}
        <form onSubmit={onSubmit} className="px-8 pt-8 space-y-8">
          {/* Project Name */}
          <Input
            id="name"
            label="Project Title *"
            placeholder="Enter project title"
            {...register("name")}
            labelClassName="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase !text-text-secondary"
          />
          <FormError message={errors.name?.message} showDot />
          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="description"
                className="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase text-text-secondary"
              >
                Description
              </label>
            </div>
            <Textarea
              id="description"
              label=""
              placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
              maxLength={500}
              {...register("description")}
              // no error prop passed
            />
            <CharCounter
              current={descriptionValue.length}
              max={500}
              className="block text-right"
            />
            <FormError message={errors.description?.message} />
          </div>
          {/* Actions */}
          <FormActions
            submitLabel="Create Project"
            isSubmitting={isSubmitting}
          />
        </form>
      </div>

      {/* Pro Tip */}
      <div className="">
        <ProTipFooter text="Pro Tip: You can invite project members and assign epics immediately after the initial creation process." />
      </div>
    </div>
  );
}
