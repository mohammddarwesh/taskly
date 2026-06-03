import { cn } from "@/libs/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: props) {
  return (
    <button
      className={cn(`btn btn-${variant}`, className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? "loading" : children}
    </button>
  );
}
