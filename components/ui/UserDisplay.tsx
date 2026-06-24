import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/libs/utils";

interface UserDisplayProps {
  name?: string;
  /** Fallback label when no user is assigned */
  emptyLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserDisplay({
  name,
  emptyLabel = "Unassigned",
  size = "sm",
  className,
}: UserDisplayProps) {
  const displayName = name || emptyLabel;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Avatar name={displayName} size={size} />
      <span className="text-sm font-medium text-text-primary">{displayName}</span>
    </div>
  );
}