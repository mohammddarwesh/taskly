"use client";

export function BoardFilterButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-10 h-10 bg-[#D7E2FF] rounded-md text-[#041B3C] hover:opacity-80 transition-opacity"
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
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    </button>
  );
}
