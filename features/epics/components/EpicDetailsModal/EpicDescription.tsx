import Textarea from "@/components/ui/Textarea";
import { CharCounter } from "@/components/ui/CharCounter";
import { EditableField } from "@/components/ui/EditableField";
import type { UseFormRegisterReturn } from "react-hook-form";

const MAX_LENGTH = 500;

interface EpicDescriptionProps {
  value: string | undefined;
  isEditing: boolean;
  disabled: boolean;
  isSaving: boolean;
  error?: string;
  /** Pass the result of register("description") — called once in the parent */
  descriptionField: UseFormRegisterReturn<"description">;
  onStartEdit: () => void;
  onCancel: () => void;
  onBlurSave: () => void;
}

export function EpicDescription({
  value,
  isEditing,
  disabled,
  isSaving,
  error,
  descriptionField,
  onStartEdit,
  onCancel,
  onBlurSave,
}: EpicDescriptionProps) {
  return (
    <EditableField
      label="Description"
      isEditing={isEditing}
      disabled={disabled}
      error={error}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onBlurSave={onBlurSave}
      display={
        <p className="text-sm text-text-secondary leading-relaxed min-h-[1.5rem]">
          {value || "No description provided"}
        </p>
      }
      editor={
        <div className="space-y-1">
          <Textarea
            id="description"
            {...descriptionField}
            autoFocus
            maxLength={MAX_LENGTH}
            placeholder="Add a description..."
            disabled={isSaving}
            aria-invalid={!!error}
            className="text-sm min-h-20"
          />
          <CharCounter
            current={value?.length ?? 0}  
            max={MAX_LENGTH}
            className="block text-right"
          />
        </div>
      }
    />
  );
}