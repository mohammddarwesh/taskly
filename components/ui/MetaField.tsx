import { ReactNode } from "react";
import { cn } from "@/libs/utils";

interface MetaFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function MetaField({ label, children, className }: MetaFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
        {label}
      </p>
      {children}
    </div>
  );
}