"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/libs/utils";
import { FormError } from "@/components/ui/FormError";

interface EditableFieldProps {
  /** Human label — used in aria-label and wired to FormError */
  label: string;
  isEditing: boolean;
  /** Disables entry into edit mode (another field open, save in flight, etc.) */
  disabled?: boolean;
  /** What the field looks like in read mode */
  display: ReactNode;
  /** The actual input / select / date picker rendered in edit mode */
  editor: ReactNode;
  onStartEdit: () => void;
  onCancel: () => void;
  /**
   * Blur-to-save callback — pass ONLY for fields that should auto-save when
   * focus leaves (title, description). Omit for fields that save on-change
   * (assignee, deadline) to avoid a double save.
   *
   * Uses requestAnimationFrame instead of relatedTarget because native OS
   * popups (date picker, <select> dropdown) report relatedTarget as null even
   * though focus never actually left the field.
   */
  onBlurSave?: () => void;
  error?: string;
  className?: string;
}

export function EditableField({
  label,
  isEditing,
  disabled,
  display,
  editor,
  onStartEdit,
  onCancel,
  onBlurSave,
  error,
  className,
}: EditableFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Native DOM listener so stopPropagation() reaches document BEFORE Modal's
   * own document.addEventListener("keydown") listener. React synthetic events
   * cannot stop native document listeners — they live in different phases.
   */
  useEffect(() => {
    if (!isEditing) return;
    const el = containerRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // cancel field only — Modal stays open
        e.preventDefault();
        onCancel();
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [isEditing, onCancel]);

  const handleBlur = () => {
    if (!onBlurSave) return;
    const el = containerRef.current;
    requestAnimationFrame(() => {
      if (!el?.contains(document.activeElement)) {
        onBlurSave();
      }
    });
  };

  if (!isEditing) {
    return (
      <div
        ref={containerRef}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Edit ${label}`}
        aria-disabled={disabled}
        onClick={() => !disabled && onStartEdit()}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onStartEdit();
          }
        }}
        className={cn(
          "rounded px-2 -mx-2 py-1 transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          !disabled && "cursor-pointer hover:bg-surface-low/40",
          disabled && "cursor-default opacity-60",
          className,
        )}
      >
        {display}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      className={cn("space-y-1", className)}
    >
      {editor}
      <FormError message={error} />
    </div>
  );
}