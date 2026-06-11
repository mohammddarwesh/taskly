"use client";

import Image from "next/image";

interface LogoProps {
  isCollapsed: boolean;
}

export function SidebarLogo({ isCollapsed }: LogoProps) {
  return (
    <div className={`px-2 py-3 ${isCollapsed ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
      >
        <Image src="/icons/logo.svg" width={18} height={20} alt="Logo" />
        {!isCollapsed && (
          <span className="font-bold text-xl tracking-tight text-[#041B3C]">
            TASKLY
          </span>
        )}
      </div>
    </div>
  );
}
