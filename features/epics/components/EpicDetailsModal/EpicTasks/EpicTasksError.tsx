"use client";

export function EpicTasksError() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <p className="text-sm text-red-500 font-medium">Failed to load tasks</p>
    </div>
  );
}