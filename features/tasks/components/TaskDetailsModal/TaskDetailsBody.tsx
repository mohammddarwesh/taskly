"use client";

import { useState } from "react";
import { Task } from "@/features/tasks/types/task.types";
import { EditableField } from "@/components/ui/EditableField";
import { useUpdateTask } from "../../hooks/useUpdateTask";

interface TaskDetailsBodyProps {
  task: Task;
  projectId: string;
  setTask: (task: Task) => void;
}

export function TaskDetailsBody({
  task,
  projectId,
  setTask,
}: TaskDetailsBodyProps) {
  const { updateField, isUpdating } = useUpdateTask(projectId, task, setTask);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(
    task.description || "",
  );

  const handleDescriptionSave = async () => {
    const value = descriptionValue.trim() || null;
    await updateField("description", value);
    setIsDescriptionEditing(false);
  };

  return (
    <div className="flex-1">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#434654] mb-3">
        Description
      </h4>
      <EditableField
        label="Description"
        isEditing={isDescriptionEditing}
        disabled={isUpdating}
        display={
          <p className="text-[14px] text-[#434654] leading-[24px] whitespace-pre-wrap">
            {task.description || "No description provided."}
          </p>
        }
        editor={
          <textarea
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            onBlur={handleDescriptionSave}
            className="w-full bg-[#D7E2FF] rounded-sm px-4 py-2 text-[16px] text-[#041B3C] border-0 focus:outline-none focus:ring-1 focus:ring-blue-600 min-h-[120px] resize-y"
            autoFocus
            placeholder="Provide detailed context for this task..."
            disabled={isUpdating}
          />
        }
        onStartEdit={() => {
          setDescriptionValue(task.description || "");
          setIsDescriptionEditing(true);
        }}
        onCancel={() => {
          setDescriptionValue(task.description || "");
          setIsDescriptionEditing(false);
        }}
        className="w-full"
      />
    </div>
  );
}
