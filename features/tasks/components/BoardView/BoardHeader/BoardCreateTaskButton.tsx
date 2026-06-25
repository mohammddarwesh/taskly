"use client";

interface BoardCreateTaskButtonProps {
  onClick: () => void;
}

export function BoardCreateTaskButton({ onClick }: BoardCreateTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full bg-[#003D9B] hover:bg-[#0052CC] text-white font-semibold rounded-md py-3 text-[16px] shadow-sm transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Create Task
    </button>
  );
}