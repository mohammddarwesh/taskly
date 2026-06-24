"use client";

import { useEditProject } from "../hooks/useEditProject";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { FormError } from "@/components/ui/FormError";
import { CharCounter } from "@/components/ui/CharCounter";
import { FormActions } from "./FormActions";
import { ProTipFooter } from "./ProTipFooter";
import Head from "@/components/ui/Head";
import Image from "next/image";

interface EditProjectFormProps {
  projectId: string;
}

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const { form, isSubmitting, onSubmit, isLoading, project } =
    useEditProject(projectId);
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const descriptionValue = watch("description") || "";

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="bg-surface-card rounded-lg shadow p-12 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-text-secondary">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="bg-surface-card rounded-lg shadow p-12 text-center">
          <h3 className="text-lg font-semibold text-text-primary">
            Project Not Found
          </h3>
          <p className="text-text-secondary">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-surface-card rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="card">
        <div className="flex items-center gap-4 md:px-8 pt-8 pb-10 border-b border-surface-low">
          <div className="flex items-center justify-center w-11.5 h-11 rounded bg-icon/10 shrink-0">
            <Image
              src="/icons/edit-pencil.svg"
              alt="Edit"
              width={22}
              height={20}
            />
          </div>
          <Head
            head="Edit Project"
            sub="Update the name and description of your project."
            className="p-0"
            headClassName="text-2xl leading-8 font-semibold text-text-primary tracking-normal"
            subClassName="text-sm leading-5 text-text-secondary mt-0"
          />
        </div>

        <form onSubmit={onSubmit} className="md:px-8 pt-8 space-y-8">
          <div>
            <Input
              id="name"
              label="Project Title *"
              placeholder="Enter project title"
              {...register("name")}
              labelClassName="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase !text-text-secondary"
            />
            <FormError message={errors.name?.message} showDot />
          </div>

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
              placeholder="Update the project's architectural objectives and key milestones..."
              maxLength={500}
              {...register("description")}
            />
            <CharCounter
              current={descriptionValue.length}
              max={500}
              className="block text-right"
            />
            <FormError message={errors.description?.message} />
          </div>

          <FormActions
            submitLabel="Save Changes"
            isSubmitting={isSubmitting}
            onCancel={() => window.history.back()}
          />
        </form>
      </div>

      <ProTipFooter text="Pro Tip: Updating the project details will not affect existing epics or members." />
    </div>
  );
}
