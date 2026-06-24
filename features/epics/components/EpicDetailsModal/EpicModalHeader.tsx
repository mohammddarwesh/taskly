import Image from "next/image";
import Input from "@/components/ui/Input";
import { EditableField } from "@/components/ui/EditableField";
import type { UseFormRegisterReturn } from "react-hook-form";

interface EpicModalHeaderProps {
  epicId: string;
  titleValue: string;
  isEditing: boolean;
  disabled: boolean;
  isSaving: boolean;
  error?: string;
  titleField: UseFormRegisterReturn<"title">;
  onStartEdit: () => void;
  onCancel: () => void;
  onBlurSave: () => void;
}

export function EpicModalHeader({
  epicId,
  titleValue,
  isEditing,
  disabled,
  isSaving,
  error,
  titleField,
  onStartEdit,
  onCancel,
  onBlurSave,
}: EpicModalHeaderProps) {
  return (
    <div className="border-b border-surface-low pb-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-blue-50 p-1 rounded-sm">
          <Image
            src="/icons/epics.svg"
            alt=""
            width={14}
            height={14}
            className="opacity-60"
          />
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-text-secondary">
          {epicId}
        </span>
      </div>

      <EditableField
        label="Title"
        isEditing={isEditing}
        disabled={disabled}
        error={error}
        onStartEdit={onStartEdit}
        onCancel={onCancel}
        onBlurSave={onBlurSave}
        display={
          <h2 className="text-2xl font-bold text-text-primary leading-tight">
            {titleValue}
          </h2>
        }
        editor={
          <Input
            id="title"
            label=""
            {...titleField}
            autoFocus
            disabled={isSaving}
            aria-invalid={!!error}
            className="text-2xl font-bold"
          />
        }
      />
    </div>
  );
}