"use client";

import { Task } from "@/features/tasks/types/task.types";
import { EditableText } from "@/components/ui/EditableText";
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

  return (
    <div className="flex-1">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#434654] mb-3">
        Description
      </h4>
      <EditableText
        label="Description"
        value={task.description || ""}
        onSave={(val) => updateField("description", val)}
        display={
          <p className="text-[14px] text-[#434654] leading-6 whitespace-pre-wrap">
            {task.description || "No description provided."}
          </p>
        }
        editorType="textarea"
        placeholder="Provide detailed context for this task..."
        disabled={isUpdating}
        className="w-full"
        inputClassName="min-h-[120px] resize-y"
      />
    </div>
  );
}
