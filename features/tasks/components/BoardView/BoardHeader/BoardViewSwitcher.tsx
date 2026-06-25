"use client";

interface BoardViewSwitcherProps {
  currentView: string;
}

export function BoardViewSwitcher({ currentView }: BoardViewSwitcherProps) {
  return (
    <button
      type="button"
      className="flex items-center lg:gap-2.5 bg-white border border-[#E8EDFF] rounded-md px-4 py-2.5 text-[14px] font-medium text-[#041B3C] hover:bg-[#F9F9FF] transition-colors cursor-pointer"
    >
      {/* Grid Icon */}
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
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>

      <span>Board View</span>

      {/* Down Chevron Icon */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-1"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}
