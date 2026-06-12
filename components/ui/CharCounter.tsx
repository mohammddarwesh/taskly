import { cn } from "@/libs/utils";

type Props = {
  current: number;
  max: number;
  className?: string;
};

export function CharCounter({ current, max, className }: Props) {
  return (
    <span
      className={cn(
        "text-[11px] leading-4 text-text-secondary opacity-60  ",
        className,
      )}
    >
      {current}/{max}
    </span>
  );
}
