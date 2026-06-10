import { cn } from "@/libs/utils";

type AvatarProps = {
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export function Avatar({ name = "", size = "md", className }: AvatarProps) {
  const getInitials = (fullName: string): string => {
    if (!fullName) return "??";
    const parts = fullName.trim().split("");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-white font-medium",
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}
