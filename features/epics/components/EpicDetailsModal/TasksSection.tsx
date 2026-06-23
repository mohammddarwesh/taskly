"use client";

import Image from "next/image";

export function TasksSection() {
  return (
    <div className="pt-4 border-t border-[#E8EDFF] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Tasks</h3>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          + Add Task
        </button>
      </div>
      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-[#E8EDFF] rounded-xl bg-[#F8F9FF]">
        <div className="w-12 h-12 rounded-xl bg-[#E0E8FF] flex items-center justify-center mb-4">
          <Image src="/icons/list.svg" alt="Tasks" width={20} height={20} className="opacity-60" />
        </div>
        <p className="text-base font-semibold text-text-primary text-center">
          No tasks have been added to this epic yet
        </p>
        <button className="mt-4 flex items-center gap-2 px-5 py-2 bg-[#145CE2] hover:bg-[#114ab8] text-white text-sm font-medium rounded-md transition-colors shadow-sm">
          <Image src="/icons/plus-white.svg" alt="Add" width={16} height={16} />
          Add Task
        </button>
      </div>
    </div>
  );
}