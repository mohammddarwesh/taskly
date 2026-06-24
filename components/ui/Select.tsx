import { cn } from "@/libs/utils";
import { forwardRef, SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, error, id, className, placeholder, ...props }, ref) => (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="font-bold text-[11px] leading-4 tracking-[0.55px] uppercase text-[#434654]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full bg-[#D7E2FF] rounded border-0 px-4 py-3 text-[16px] text-[#041B3C] appearance-none",
            error && "ring-1 ring-red-500",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron icon matching Figma */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="rgba(67,70,84,0.6)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  ),
);
Select.displayName = "Select";
