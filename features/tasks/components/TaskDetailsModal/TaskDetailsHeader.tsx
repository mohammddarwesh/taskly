"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Task } from "@/features/tasks/types/task.types";
import { EditableField } from "@/components/ui/EditableField";
import { useUpdateTask } from "../../hooks/useUpdateTask";

interface TaskDetailsHeaderProps {
  task: Task;
  projectId: string;
  setTask: (task: Task) => void;
}

export function TaskDetailsHeader({
  task,
  projectId,
  setTask,
}: TaskDetailsHeaderProps) {
  const { updateField, isUpdating } = useUpdateTask(projectId, task, setTask);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);

  const handleTitleSave = async () => {
    const trimmed = titleValue.trim();
    if (!trimmed) {
      toast.error("Title is required");
      return;
    }
    await updateField("title", trimmed);
    setIsTitleEditing(false);
  };

  const epicLabel = task.epic
    ? `${task.epic.epic_id} (${task.epic.title})`
    : "No epic";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
        <span className="px-2.5 py-1 bg-[#E8EDFF] text-[#0052CC] rounded-[4px]">
          {task.task_id || "TASK-"}
        </span>
        {task.epic && (
          <span className="flex items-center gap-1.5 text-[#434654]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>{epicLabel}</span>
          </span>
        )}
      </div>

      <EditableField
        label="Title"
        isEditing={isTitleEditing}
        disabled={isUpdating}
        display={
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#041B3C] leading-[1.15]">
            {task.title}
          </h2>
        }
        editor={
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTitleSave();
              }
            }}
            className="w-full bg-[#D7E2FF] rounded-sm px-4 py-2 text-[28px] md:text-[32px] font-bold text-[#041B3C] border-0 focus:outline-none focus:ring-1 focus:ring-blue-600"
            autoFocus
            placeholder="Enter task title..."
            disabled={isUpdating}
          />
        }
        onStartEdit={() => {
          setTitleValue(task.title);
          setIsTitleEditing(true);
        }}
        onCancel={() => {
          setTitleValue(task.title);
          setIsTitleEditing(false);
        }}
        className="w-full"
      />
    </div>
  );
}
