"use client";

import Image from "next/image";

interface AddTaskDashedButtonProps {
  onClick: () => void;
}

export function AddTaskDashedButton({ onClick }: AddTaskDashedButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[56px] border-[1.5px] border-dashed border-[#D7E2FF] rounded-lg flex items-center justify-center gap-2 bg-[#F9F9FF] hover:bg-[#D7E2FF]/20 transition-colors"
    >
      <div className="w-6 h-6 rounded-full bg-[#D7E2FF] flex items-center justify-center">
        <Image src="/icons/plus.svg" alt="Add task" width={14} height={14} className="opacity-70" />
      </div>
      <span className="text-[13px] font-semibold uppercase text-[#737685] tracking-[0.5px]">
        Add New Task
      </span>
    </button>
  );
}