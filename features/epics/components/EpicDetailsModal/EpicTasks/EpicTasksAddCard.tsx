"use client";

import Image from "next/image";

interface EpicTasksAddCardProps {
  onAddTask?: () => void;
}

export function EpicTasksAddCard({ onAddTask }: EpicTasksAddCardProps) {
  return (
    <button
      type="button"
      onClick={onAddTask}
      className="  md:hidden w-full border-2 border-dashed border-[#D7E2FF] rounded-xl bg-[#F9F9FF] p-4 flex items-center justify-center gap-2 hover:bg-[#F0F4FF] transition-colors"
    >
      <Image
        src="/icons/plusCircled.svg"
        alt="Add task"
        width={16}
        height={16}
        className="opacity-50"
      />
      <span className="text-[14px] font-bold uppercase text-[#737685] tracking-[0.5px]">
        Add New Task
      </span>
    </button>
  );
}
