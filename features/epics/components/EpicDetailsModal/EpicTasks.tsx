"use client";

import Image from "next/image";

interface EpicTasksProps {
  onAddTask?: () => void;
}

export function EpicTasks({ onAddTask }: EpicTasksProps) {
  return (
    <div className="border-t border-surface-low pt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Tasks</h3>
        <button
          type="button"
          onClick={onAddTask}
          className="text-xs font-semibold text-primary hover:opacity-75 transition-opacity"
        >
          + Add Task
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-surface-low rounded-xl bg-surface-card">
        <div className="w-12 h-12 rounded-xl bg-surface-low flex items-center justify-center mb-4">
          <Image
            src="/icons/tasks.svg"
            alt="Tasks"
            width={20}
            height={20}
            className="opacity-60"
          />
        </div>
        <p className="text-sm font-semibold text-text-primary text-center mb-4">
          No tasks have been added to this epic yet
        </p>
        <button
          type="button"
          onClick={onAddTask}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-md transition-colors"
        >
          <Image
            src="/icons/plus.svg"
            alt="Add task"
            width={14}
            height={14}
            className="invert"
          />
          Add Task
        </button>
      </div>
    </div>
  );
}