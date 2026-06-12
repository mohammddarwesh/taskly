type Props = {
  text: string;
};

export function ProTipFooter({ text }: Props) {
  return (
    <div className="flex items-start gap-3 p-6 bg-surface-low rounded-b-lg">
      {/* Info icon placeholder */}
      <svg
        width="12"
        height="15"
        viewBox="0 0 12 15"
        fill="none"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M6 3.5V6.5M6 9.5H6.005M5.5 13.5H6.5C9.26142 13.5 11.5 11.2614 11.5 8.5V6.5C11.5 3.73858 9.26142 1.5 6.5 1.5H5.5C2.73858 1.5 0.5 3.73858 0.5 6.5V8.5C0.5 11.2614 2.73858 13.5 5.5 13.5Z"
          stroke="#4F5F7B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6" cy="12" r="0.5" fill="#4F5F7B" />
      </svg>
      <p className="font-bold text-xs leading-5 text-text-secondary">{text}</p>
    </div>
  );
}