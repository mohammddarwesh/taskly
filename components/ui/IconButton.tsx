import { cn } from "@/libs/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label?: string; // for accessibility
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-md",
          "text-text-secondary hover:bg-surface-highest hover:text-text-primary",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "transition-colors",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
