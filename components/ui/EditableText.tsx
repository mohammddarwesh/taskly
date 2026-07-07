"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/libs/utils";
import { EditableField } from "./EditableField";
import Input from "./Input";
import Textarea from "./Textarea";

interface EditableTextProps {
  label: string;
  value: string;
  onSave: (val: string | null) => Promise<void>;
  display: ReactNode;
  editorType?: "input" | "textarea";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

export function EditableText({
  label,
  value,
  onSave,
  display,
  editorType = "input",
  placeholder,
  disabled,
  className,
  inputClassName,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = async () => {
    const trimmed = editValue.trim();
    if (editorType === "input" && !trimmed) {
      return;
    }
    await onSave(trimmed || null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const Editor = editorType === "textarea" ? Textarea : Input;

  return (
    <EditableField
      label={label}
      isEditing={isEditing}
      disabled={disabled}
      display={display}
      editor={
        <Editor
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter" && editorType === "input") {
              e.preventDefault();
              handleSave();
            }
          }}
          className={cn(
            editorType === "input" &&
              "text-[28px] md:text-[32px] font-bold text-[#041B3C]",
            editorType === "textarea" && "min-h-[120px] resize-y",
            inputClassName,
          )}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus
        />
      }
      onStartEdit={() => {
        setEditValue(value);
        setIsEditing(true);
      }}
      onCancel={handleCancel}
      className={className}
    />
  );
}
