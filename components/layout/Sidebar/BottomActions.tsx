"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface BottomActionsProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function BottomActions({ isCollapsed, onToggleCollapse }: BottomActionsProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={`mt-auto pt-4 border-t border-[#C3C6D6]/20 ${isCollapsed ? "px-1" : "px-3"} space-y-1`}>
      <button
        onClick={onToggleCollapse}
        className={`
          hidden lg:flex items-center rounded-lg transition-all duration-200
          ${isCollapsed 
            ? "justify-center w-10 h-10 mx-auto" 
            : "gap-3 px-3 py-2.5 w-full"
          }
          hover:bg-white/50 text-[#041B3C]
        `}
        title={isCollapsed ? "Expand" : "Collapse"}
      >
        <div className="relative w-4.5 h-4.5 shrink-0">
          <Image
            src={isCollapsed ? "/icons/arrowRight.svg" : "/icons/arrowLeft.svg"}
            fill
            className="object-contain"
            alt={isCollapsed ? "Expand" : "Collapse"}
          />
        </div>
        {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
      </button>

      <button
        onClick={handleLogout}
        className={`
          flex items-center rounded-lg transition-all duration-200
          ${isCollapsed 
            ? "justify-center w-10 h-10 mx-auto" 
            : "gap-3 px-3 py-2.5 w-full"
          }
          hover:bg-red-50 text-[#BA1A1A] group
        `}
        title={isCollapsed ? "Logout" : undefined}
      >
        <div className="relative w-4.5 h-4.5 shrink-0">
          <Image
            src="/icons/Logout.svg"
            fill
            className="object-contain group-hover:brightness-110"
            alt="logout"
          />
        </div>
        {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
      </button>
    </div>
  );
}