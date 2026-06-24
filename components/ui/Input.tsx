import { cn } from "@/libs/utils";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  labelClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, className, labelClassName, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium text-text-primary",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn("input", error && "input-error", className)}
            {...props}
          />
          {icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${id}-error`} className="text-sm text-text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
