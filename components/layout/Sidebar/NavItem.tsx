"use client";

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
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200
        ${isActive
          ? "bg-white text-[#003D9B] shadow-sm"
          : "text-[#041B3C] hover:bg-white/50"
        }
        ${isCollapsed ? "justify-center w-12 h-12" : ""}
      `}
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
        <span className={`text-sm font-medium ${isActive ? "text-[#003D9B]" : "text-[#041B3C]"}`}>
          {label}
        </span>
      )}
    </Link>
  );
}