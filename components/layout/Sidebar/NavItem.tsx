"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  href: string;
  iconRef: string;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onMobileClose: () => void;
}

export function NavItem({
  href,
  iconRef,
  label,
  isActive,
  isCollapsed,
  onMobileClose,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onMobileClose}
      className={cn(
        `
        flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200`,
        isActive
          ? "bg-white text-primary shadow-sm"
          : "text-[#041B3C] hover:bg-white/50",
        isCollapsed ? "justify-center w-12 h-12" : "",
      )}
      title={isCollapsed ? label : undefined}
    >
      <Image
        src={`/icons/${iconRef}`}
        width={20}
        height={20}
        className={isActive ? "text-primary" : "text-current"}
        alt={`${label} icon`}
      />
      {!isCollapsed && (
        <span
          className={cn(
            `text-sm font-medium`,
            isActive ? "text-primary" : "text-slate-900",
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
