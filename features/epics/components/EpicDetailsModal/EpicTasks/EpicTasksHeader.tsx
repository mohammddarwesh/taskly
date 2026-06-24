"use client";

interface EpicTasksHeaderProps {
  count: number;
  onAddTask?: () => void;
}

export function EpicTasksHeader({ count, onAddTask }: EpicTasksHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-[16px] font-semibold text-[#041B3C]">Tasks</h3>

      <div className="flex items-center gap-3">
        {/* Pill Badge - Only Mobile */}
        <div className="block md:hidden px-2.5 py-0.5 rounded-full bg-[#E8EDFF] text-[#434654] text-[11px] font-semibold">
          {count} TASKS
        </div>

        {/* Top-Right Add Button - Only Desktop */}
        <button
          type="button"
          onClick={onAddTask}
          className="hidden md:block text-[14px] font-semibold text-[#003D9B] hover:text-[#0052CC] transition-colors"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
