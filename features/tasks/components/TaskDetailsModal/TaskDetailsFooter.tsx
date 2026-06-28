// TaskDetailsFooter.tsx
"use client";

interface TaskDetailsFooterProps {
  onClose: () => void;
  onCopyLink?: () => void;
}

export function TaskDetailsFooter({
  onClose,
  onCopyLink,
}: TaskDetailsFooterProps) {
  return (
    <div className="flex-shrink-0 py-3.5 px-6 flex items-center justify-between w-full">
      <button
        type="button"
        onClick={onCopyLink}
        className="flex-shrink-0 flex items-center gap-2 text-[14px] font-medium text-[#434654] hover:text-[#0052CC] transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        Copy link
      </button>

      <button
        type="button"
        onClick={onClose}
        className="flex-shrink-0 px-6 py-2 bg-[#D7E2FF] text-[#0052CC] rounded-md text-[14px] font-medium hover:bg-[#C7D2FF] transition-colors"
      >
        Close
      </button>
    </div>
  );
}
