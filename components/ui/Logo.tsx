import { cn } from "@/libs/utils";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("  flex items-center justify-start gap-2", className)}>
      <Image src="/icons/logo.svg" width={18} height={20} alt="Taskly Logo" />
      <span className="font-bold text-xl">TASKLY</span>
    </div>
  );
};

export default Logo;
