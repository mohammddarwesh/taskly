"use client";

import { SidebarLogo } from "./SidebarLogo";
import { NavItemsList } from "./NavItemsList";
import { BottomActions } from "./BottomActions";
import { SidebarProps } from "./types";

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const sidebarContent = (
    <>
      <SidebarLogo isCollapsed={isCollapsed} />
      <NavItemsList isCollapsed={isCollapsed} onMobileClose={onMobileClose} />
      <BottomActions isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
    </>
  );

  return (
    <>
      <aside
        className={`
          hidden lg:flex lg:flex-col fixed p-4 left-0 top-0 h-full bg-[#F1F3FF] shadow-sm
          transition-all duration-300 z-50
          ${isCollapsed ? "w-20 p-0" : "w-64"}
        `}
      >
        <div className="flex flex-col justify-between h-full">{sidebarContent}</div>
      </aside>

      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onMobileClose}
          />
          <aside
            className={`
              fixed left-0 top-0 w-64 h-full bg-[#F1F3FF] shadow-lg z-40 lg:hidden
              transform transition-transform duration-300
              ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            style={{ padding: "16px" }}
          >
            <div className="flex flex-col justify-between h-full">{sidebarContent}</div>
          </aside>
        </>
      )}
    </>
  );
}